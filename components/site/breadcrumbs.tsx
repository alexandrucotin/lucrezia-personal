import Link from "next/link";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Percorso" className="eyebrow flex flex-wrap items-center gap-2 text-ink-faint">
      {trail.map((step, index) => {
        const last = index === trail.length - 1;
        return (
          <span key={step.path} className="flex items-center gap-2">
            {last ? (
              <span aria-current="page" className="text-ink-soft">
                {step.name}
              </span>
            ) : (
              <Link href={step.path} className="transition-colors hover:text-ink">
                {step.name}
              </Link>
            )}
            {last ? null : <span aria-hidden="true">/</span>}
          </span>
        );
      })}
    </nav>
  );
}
