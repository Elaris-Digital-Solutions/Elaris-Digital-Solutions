import crypto from "crypto";

const hash = (value) =>
  value
    ? crypto.createHash("sha256").update(value.toLowerCase().trim()).digest("hex")
    : undefined;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

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
  } = req.body;

  if (!pixel_id) {
    return res.status(400).json({ error: "pixel_id is required" });
  }

  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket?.remoteAddress;

  const payload = {
    data: [
      {
        event_name: event_name || "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: event_id,
        action_source: "website",
        event_source_url:
          page_url || req.headers.referer || "https://elarisdigitalsolutions.com",
        user_data: {
          em: email ? [hash(email)] : undefined,
          ph: phone ? [hash(phone)] : undefined,
          fn: first_name ? [hash(first_name)] : undefined,
          ln: last_name ? [hash(last_name)] : undefined,
          fbp: fbp || undefined,
          fbc: fbc || undefined,
          client_ip_address: ip,
          client_user_agent: req.headers["user-agent"],
        },
        custom_data: {
          value: value || 0,
          currency: "PEN",
        },
      },
    ],
  };

  try {
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
      return res.status(502).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Meta CAPI fetch failed:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
