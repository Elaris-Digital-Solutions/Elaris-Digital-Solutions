import Link from "next/link";
import { Fragment } from "react";

/** Solo enlaces internos: [texto](/ruta). Nada más se interpreta. */
const LINK_RE = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;

/**
 * Convierte los enlaces markdown de los párrafos de contenido en <Link>.
 * Deliberadamente mínimo: no es un parser de markdown, y por eso no
 * necesitamos ninguna dependencia nueva.
 */
export function RichText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  // exec() sobre un regex global mantiene lastIndex entre llamadas; se crea
  // uno nuevo por invocación para que el componente sea reentrante.
  const re = new RegExp(LINK_RE.source, "g");
  let match: RegExpExecArray | null;

  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<Fragment key={key++}>{text.slice(lastIndex, match.index)}</Fragment>);
    }
    parts.push(
      <Link
        key={key++}
        href={match[2]}
        className="font-semibold text-brand-gradient hover:underline"
      >
        {match[1]}
      </Link>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(<Fragment key={key++}>{text.slice(lastIndex)}</Fragment>);
  }

  return <>{parts}</>;
}
