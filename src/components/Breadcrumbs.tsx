import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  name: string;
  path: string;
}

/**
 * Migas de pan visibles. Los mismos `items` deben pasarse a
 * `buildBreadcrumbSchema` para que el JSON-LD y lo que ve el usuario
 * coincidan — Google penaliza que difieran.
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Ruta de navegación" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-600">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 flex-shrink-0 text-slate-400" />
              )}
              {isLast ? (
                <span aria-current="page" className="font-medium text-[#071540]">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className="rounded transition-colors hover:text-[#0855FD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0855FD] focus-visible:ring-offset-2"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
