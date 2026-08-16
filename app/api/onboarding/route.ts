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
  status?: string;
  next_step?: string;
  reply?: string;
  error?: string;
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
  const offerDescription = cleanText(body.offer_description, 500);

  if (customerPhone.length < 10 || !businessName || !nicheCategory || !offerDescription) {
    return NextResponse.json({ ok: false, error: "Preencha corretamente todos os campos." }, { status: 400 });
  }

  const callN8n = async (payload: Record<string, string>): Promise<N8nResponse> => {
    const response = await fetch(`${n8nBaseUrl}/webhook/anuncia/v1/session`, {
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

    const responseText = await response.text();
    let responseBody: N8nResponse | N8nResponse[];

    try {
      responseBody = JSON.parse(responseText) as N8nResponse | N8nResponse[];
    } catch {
      throw new Error("O onboarding retornou uma resposta inválida.");
    }

    return Array.isArray(responseBody) ? responseBody[0] : responseBody;
  };

  try {
    const result = await callN8n({
      customer_phone: customerPhone,
      business_name: businessName,
      niche_category: nicheCategory,
      offer_description: offerDescription,
    });
    const sessionId = result.session_id;

    if (!sessionId) throw new Error(result.error || result.reply || "O onboarding não criou uma sessão.");

    return NextResponse.json({
      ok: true,
      session_id: sessionId,
      status: result.status,
      next_step: result.next_step || "gerar_criativo",
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
