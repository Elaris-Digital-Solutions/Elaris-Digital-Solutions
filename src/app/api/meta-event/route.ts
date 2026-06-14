import crypto from "crypto";

export const runtime = "nodejs";

const hash = (value?: string) =>
  value
    ? crypto.createHash("sha256").update(value.toLowerCase().trim()).digest("hex")
    : undefined;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      email,
      phone,
      first_name,
      last_name,
      value,
      event_id,
      event_name,
      pixel_id,
      fbp,
      fbc,
      page_url,
    } = body ?? {};

    if (!pixel_id) {
      return Response.json({ error: "pixel_id is required" }, { status: 400 });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined;
    const userAgent = req.headers.get("user-agent") || undefined;

    const payload = {
      data: [
        {
          event_name: event_name || "Lead",
          event_time: Math.floor(Date.now() / 1000),
          event_id,
          action_source: "website",
          event_source_url:
            page_url || req.headers.get("referer") || "https://elarisdigitalsolutions.com",
          user_data: {
            em: email ? [hash(email)] : undefined,
            ph: phone ? [hash(phone)] : undefined,
            fn: first_name ? [hash(first_name)] : undefined,
            ln: last_name ? [hash(last_name)] : undefined,
            fbp: fbp || undefined,
            fbc: fbc || undefined,
            client_ip_address: ip,
            client_user_agent: userAgent,
          },
          custom_data: { value: value || 0, currency: "PEN" },
        },
      ],
    };

    const response = await fetch(
      `https://graph.facebook.com/v21.0/${pixel_id}/events?access_token=${process.env.META_ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      console.error("Meta CAPI error:", JSON.stringify(data));
      return Response.json(data, { status: 502 });
    }
    return Response.json(data);
  } catch (error: any) {
    console.error("Meta CAPI fetch failed:", error?.message);
    return Response.json({ error: error?.message ?? "Unknown error" }, { status: 500 });
  }
}
