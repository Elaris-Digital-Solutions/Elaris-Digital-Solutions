/**
 * Captura del lead antes de abrir WhatsApp.
 *
 * El formulario de contacto nunca guardó nada: componía un mensaje y abría
 * wa.me. Si el navegador bloqueaba la ventana emergente y el visitante no
 * usaba el enlace de respaldo, el contacto se perdía sin dejar rastro en
 * ninguna parte. Entre el 8 de agosto y el 20 de octubre de 2026 el
 * formulario no produjo un solo envío real, así que el agujero nunca se vio.
 *
 * Esta ruta existe para que el lead quede registrado SIEMPRE, pase lo que
 * pase después con la ventana de WhatsApp:
 *
 *  1. Lo escribe en el log del servidor, que en Netlify queda en los logs de
 *     la función. Eso ya es un registro durable sin configurar nada.
 *  2. Si existe LEAD_WEBHOOK_URL, lo reenvía ahí. Deliberadamente no elegimos
 *     proveedor: esa URL puede apuntar a Make, Zapier, n8n, un canal de Slack
 *     o un endpoint propio, y se cambia sin tocar código.
 *
 * Nunca lanza y nunca devuelve error al cliente. Si algo falla aquí, el
 * visitante igual tiene que poder seguir a WhatsApp: perder la copia es malo,
 * perder la conversación es peor.
 */

export const runtime = "nodejs";

const MAX_FIELD = 2000;

/** Recorta y normaliza: el payload viene del navegador, no es de fiar. */
const clean = (value: unknown): string =>
  typeof value === "string" ? value.trim().slice(0, MAX_FIELD) : "";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    const lead = {
      recibidoEn: new Date().toISOString(),
      nombre: clean(body?.fullName),
      email: clean(body?.email),
      motivo: clean(body?.reason),
      pagina: clean(body?.pageUrl) || req.headers.get("referer") || "",
      origen: clean(body?.source) || "formulario_contacto",
      userAgent: req.headers.get("user-agent") ?? "",
    };

    // Sin nombre ni correo no hay lead que guardar: es ruido o un bot.
    if (!lead.nombre && !lead.email) {
      return new Response(null, { status: 204 });
    }

    // console.error y no console.log: Netlify conserva el nivel error por
    // defecto, y este registro es justamente el que no se puede perder.
    console.error("[LEAD]", JSON.stringify(lead));

    const webhook = process.env.LEAD_WEBHOOK_URL;
    if (webhook) {
      try {
        await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(lead),
        });
      } catch (error) {
        console.error(
          "[LEAD] fallo el reenvio al webhook:",
          error instanceof Error ? error.message : String(error)
        );
      }
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error(
      "[LEAD] fallo la captura:",
      error instanceof Error ? error.message : String(error)
    );
    // 204 igual: el cliente no debe cambiar de comportamiento por esto.
    return new Response(null, { status: 204 });
  }
}
