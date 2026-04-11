import crypto from "crypto";

const hash = (value) =>
  value
    ? crypto.createHash("sha256").update(value.toLowerCase().trim()).digest("hex")
    : undefined;

export default async function handler(req, res) {
  // Allow only POST
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { email, phone, value, event_id, event_name, pixel_id } = req.body;

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
          event_source_url: req.headers.referer || "unknown",
          user_data: {
            em: email ? [hash(email)] : undefined,
            ph: phone ? [hash(phone)] : undefined,
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

    // Use passed pixel_id to sync with frontend event or fallback to the env variable
    const targetPixelId = pixel_id || process.env.META_PIXEL_ID;

    // Use native fetch (Node 18+)
    const response = await fetch(
      `https://graph.facebook.com/v19.0/${targetPixelId}/events?access_token=${process.env.META_ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
