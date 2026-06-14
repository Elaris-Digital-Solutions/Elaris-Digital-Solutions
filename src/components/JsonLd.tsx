/**
 * Server component that serializes JSON-LD structured data into the initial
 * HTML. Because this is NOT a client component, the schema is present for
 * crawlers and AI agents on the very first request — no JS execution required.
 *
 * Security: the input is always trusted, statically-built schema (see
 * `@/seo/site`), never user input. As defense-in-depth we still escape `<` to
 * its unicode form so a value can never break out of the <script> element
 * (the only realistic injection vector for JSON-LD). This is the canonical
 * Next.js pattern for structured data.
 */
const toSafeJson = (value: object) =>
  JSON.stringify(value).replace(/</g, "\u003c");

export default function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: toSafeJson(item) }}
        />
      ))}
    </>
  );
}
