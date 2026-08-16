import { NextResponse } from "next/server";

export const runtime = "nodejs";

type UploadRequest = {
  session_id?: string;
  image_data_url?: string;
  file_name?: string;
};

type RawCreativeOption = {
  id?: string;
  creative_option_id?: string;
  index?: number;
  image_url?: string | null;
  primary_text?: string;
  headline?: string;
};

type N8nUploadResponse = {
  ok?: boolean;
  session_id?: string;
  reply?: string;
  error?: string;
  options?: RawCreativeOption[];
};

function parseN8nResponse(value: string): N8nUploadResponse {
  const parsed = JSON.parse(value) as N8nUploadResponse | N8nUploadResponse[];
  return Array.isArray(parsed) ? parsed[0] ?? {} : parsed;
}

export async function POST(request: Request) {
  const n8nBaseUrl = process.env.N8N_BASE_URL?.replace(/\/$/, "");
  const apiKey = process.env.N8N_FRONTEND_API_KEY;

  if (!n8nBaseUrl || !apiKey) {
    return NextResponse.json(
      { ok: false, error: "Integração de imagens indisponível. Fale com o suporte." },
      { status: 503 },
    );
  }

  let body: UploadRequest;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Dados inválidos." }, { status: 400 });
  }

  const sessionId = String(body.session_id || "").trim();
  const imageDataUrl = String(body.image_data_url || "").trim();
  const fileName = String(body.file_name || "arte-enviada").trim().slice(0, 160);
  const imageMatch = imageDataUrl.match(/^data:image\/(png|jpeg|webp);base64,([A-Za-z0-9+/=]+)$/);

  if (!/^[0-9a-f-]{36}$/i.test(sessionId)) {
    return NextResponse.json({ ok: false, error: "Sessão inválida." }, { status: 400 });
  }

  if (!imageMatch) {
    return NextResponse.json({ ok: false, error: "Envie uma imagem PNG, JPG ou WEBP válida." }, { status: 400 });
  }

  const estimatedBytes = Math.floor((imageMatch[2].length * 3) / 4);
  if (estimatedBytes > 8 * 1024 * 1024) {
    return NextResponse.json({ ok: false, error: "A imagem deve ter no máximo 8 MB." }, { status: 413 });
  }

  try {
    const response = await fetch(`${n8nBaseUrl}/webhook/anuncia/v1/creative/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        session_id: sessionId,
        image_data_url: imageDataUrl,
        file_name: fileName,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(180000),
    });

    const responseText = await response.text();
    let result: N8nUploadResponse;

    try {
      result = parseN8nResponse(responseText);
    } catch {
      throw new Error("O envio da imagem retornou uma resposta inválida.");
    }

    if (!response.ok || !result.ok) {
      return NextResponse.json(
        { ok: false, error: result.reply || result.error || "Não foi possível enviar sua imagem." },
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
      throw new Error("A imagem foi processada sem criar uma opção válida.");
    }

    return NextResponse.json({
      ok: true,
      session_id: result.session_id || sessionId,
      reply: result.reply,
      options,
    });
  } catch (error) {
    console.error("Own creative upload integration error", error);

    const message = error instanceof Error && error.name === "TimeoutError"
      ? "O envio está levando mais tempo que o esperado. Tente novamente em instantes."
      : error instanceof Error
        ? error.message
        : "Não foi possível enviar sua imagem.";

    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}
