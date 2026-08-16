import { NextResponse } from "next/server";

export const runtime = "nodejs";

type CreativeRequest = {
  session_id?: string;
};

type RawCreativeOption = {
  id?: string;
  creative_option_id?: string;
  index?: number;
  image_url?: string | null;
  primary_text?: string;
  headline?: string;
};

type N8nCreativeResponse = {
  ok?: boolean;
  session_id?: string;
  reply?: string;
  error?: string;
  options?: RawCreativeOption[];
};

function parseN8nResponse(value: string): N8nCreativeResponse {
  const parsed = JSON.parse(value) as N8nCreativeResponse | N8nCreativeResponse[];
  return Array.isArray(parsed) ? parsed[0] ?? {} : parsed;
}

export async function POST(request: Request) {
  const n8nBaseUrl = process.env.N8N_BASE_URL?.replace(/\/$/, "");
  const apiKey = process.env.N8N_FRONTEND_API_KEY;

  if (!n8nBaseUrl || !apiKey) {
    return NextResponse.json(
      { ok: false, error: "Integração de criativos indisponível. Fale com o suporte." },
      { status: 503 },
    );
  }

  let body: CreativeRequest;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Dados inválidos." }, { status: 400 });
  }

  const sessionId = String(body.session_id || "").trim();

  if (!/^[0-9a-f-]{36}$/i.test(sessionId)) {
    return NextResponse.json({ ok: false, error: "Sessão inválida." }, { status: 400 });
  }

  try {
    const response = await fetch(`${n8nBaseUrl}/webhook/anuncia/v1/creative/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({ session_id: sessionId }),
      cache: "no-store",
      signal: AbortSignal.timeout(300000),
    });

    const responseText = await response.text();
    let result: N8nCreativeResponse;

    try {
      result = parseN8nResponse(responseText);
    } catch {
      throw new Error("O gerador retornou uma resposta inválida.");
    }

    if (!response.ok || !result.ok) {
      return NextResponse.json(
        { ok: false, error: result.reply || result.error || "Não foi possível gerar os criativos." },
        { status: response.status >= 400 ? response.status : 502 },
      );
    }

    const options = (result.options || [])
      .map((option, position) => ({
        id: String(option.id || option.creative_option_id || "").trim(),
        index: Number.isFinite(Number(option.index)) ? Number(option.index) : position,
        image_url: String(option.image_url || "").trim(),
        primary_text: String(option.primary_text || "").trim(),
        headline: String(option.headline || "").trim(),
      }))
      .filter((option) => option.id && option.image_url);

    if (!options.length) {
      throw new Error("O gerador concluiu sem devolver imagens válidas.");
    }

    return NextResponse.json({
      ok: true,
      session_id: result.session_id || sessionId,
      reply: result.reply,
      options,
    });
  } catch (error) {
    console.error("Creative generation integration error", error);

    const message = error instanceof Error && error.name === "TimeoutError"
      ? "A geração está levando mais tempo que o esperado. Tente novamente em alguns instantes."
      : error instanceof Error
        ? error.message
        : "Não foi possível gerar os criativos.";

    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}
