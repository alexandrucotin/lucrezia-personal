import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

/* Il ritmo verticale cambia da sezione a sezione: e' il modo piu' efficace
   di rompere la cadenza uniforme che tradisce i siti generati da template. */
const RHYTHM = {
  tight: "py-14 sm:py-16",
  normal: "py-20 sm:py-24",
  loose: "py-24 sm:py-32",
  vast: "py-28 sm:py-40",
} as const;

const TONE = {
  paper: "bg-paper",
  deep: "bg-paper-deep",
  surface: "bg-surface",
  ink: "bg-ink text-paper",
  sage: "bg-sage-deep text-paper",
} as const;

type SectionProps = {
  children: ReactNode;
  id?: string;
  as?: ElementType;
  rhythm?: keyof typeof RHYTHM;
  tone?: keyof typeof TONE;
  /** Filetto superiore da 1px: l'unica separazione del sistema. */
  ruled?: boolean;
  className?: string;
};

export function Section({
  children,
  id,
  as: Tag = "section",
  rhythm = "normal",
  tone = "paper",
  ruled = false,
  className,
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(RHYTHM[rhythm], TONE[tone], ruled && "border-t border-rule", className)}
    >
      {children}
    </Tag>
  );
}

export function Eyebrow({
  children,
  className,
  numbered,
}: {
  children: ReactNode;
  className?: string;
  /** Numero di sezione, stile indice di una monografia. */
  numbered?: string;
}) {
  return (
    <p className={cn("eyebrow flex items-center gap-3 text-sage", className)}>
      {numbered ? (
        <span className="tnum opacity-50" aria-hidden="true">
          {numbered}
        </span>
      ) : null}
      <span>{children}</span>
    </p>
  );
}

export function Display({
  children,
  level = 2,
  size = "d2",
  className,
}: {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4;
  size?: "d1" | "d2" | "d3" | "d4";
  className?: string;
}) {
  const Tag = `h${level}` as ElementType;
  const sizes = { d1: "text-d1", d2: "text-d2", d3: "text-d3", d4: "text-d4" };

  return <Tag className={cn("display", sizes[size], className)}>{children}</Tag>;
}

export function Lead({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("measure text-lead text-ink-soft", className)}>{children}</p>;
}
