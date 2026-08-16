import { NextResponse } from "next/server";

export const runtime = "nodejs";

type OnboardingBody = {
  customer_phone?: string;
  business_name?: string;
  niche_category?: string;
  offer_description?: string;
};

type N8nResponse = {
  ok?: boolean;
  session_id?: string;
  next_step?: string;
  reply?: string;
};

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  const n8nBaseUrl = process.env.N8N_BASE_URL?.replace(/\/$/, "");
  const apiKey = process.env.N8N_FRONTEND_API_KEY;

  if (!n8nBaseUrl || !apiKey) {
    return NextResponse.json({ ok: false, error: "Integração indisponível. Fale com o suporte." }, { status: 503 });
  }

  let body: OnboardingBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Dados inválidos." }, { status: 400 });
  }

  const customerPhone = cleanText(body.customer_phone, 15).replace(/\D/g, "");
  const businessName = cleanText(body.business_name, 120);
  const nicheCategory = cleanText(body.niche_category, 80);
  const offerDescription = cleanText(body.offer_description, 240);

  if (customerPhone.length < 10 || !businessName || !nicheCategory || !offerDescription) {
    return NextResponse.json({ ok: false, error: "Preencha corretamente todos os campos." }, { status: 400 });
  }

  const callN8n = async (payload: Record<string, string>): Promise<N8nResponse> => {
    const response = await fetch(`${n8nBaseUrl}/webhook/chat-onboarding`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      throw new Error(`O onboarding respondeu com status ${response.status}.`);
    }

    return response.json() as Promise<N8nResponse>;
  };

  try {
    let result = await callN8n({ session_id: "", customer_phone: customerPhone, message: "" });
    const sessionId = result.session_id;

    if (!sessionId) throw new Error("O onboarding não criou uma sessão.");

    for (const message of [businessName, nicheCategory, offerDescription]) {
      result = await callN8n({ session_id: sessionId, customer_phone: customerPhone, message });
    }

    if (result.next_step !== "gerar_criativo") {
      throw new Error(result.reply || "Não foi possível concluir o cadastro.");
    }

    return NextResponse.json({
      ok: true,
      session_id: sessionId,
      next_step: result.next_step,
      reply: result.reply,
    });
  } catch (error) {
    console.error("Onboarding integration error", error);
    return NextResponse.json(
      { ok: false, error: "Não conseguimos salvar seus dados. Tente novamente em instantes." },
      { status: 502 },
    );
  }
}
