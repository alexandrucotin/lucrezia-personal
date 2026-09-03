import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

/* Bottoni rettangolari, senza ombra: la gerarchia e' data dal colore
   e dal peso del bordo, non dalla profondita'. */
const base =
  "inline-flex items-center justify-center gap-2.5 text-sm font-medium tracking-tight transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-sage";

const VARIANT = {
  solid: "bg-terra px-7 py-4 text-paper hover:bg-terra-deep",
  outline: "border border-ink px-7 py-4 text-ink hover:bg-ink hover:text-paper",
  ghost: "border border-ink/30 px-7 py-4 text-ink hover:border-ink hover:bg-ink/[0.03]",
  inverse: "bg-paper px-7 py-4 text-ink hover:bg-paper-deep",
} as const;

type ActionProps = {
  variant?: keyof typeof VARIANT;
  className?: string;
  children: ReactNode;
};

export function ActionLink({
  href,
  variant = "solid",
  className,
  children,
  ...rest
}: ActionProps & ComponentProps<typeof Link>) {
  return (
    <Link href={href} className={cn(base, VARIANT[variant], className)} {...rest}>
      {children}
    </Link>
  );
}

export function ActionButton({
  variant = "solid",
  className,
  children,
  ...rest
}: ActionProps & ComponentProps<"button">) {
  return (
    <button className={cn(base, VARIANT[variant], className)} {...rest}>
      {children}
    </button>
  );
}

/* Link testuale con sottolineatura che si "apre" al passaggio:
   dettaglio piccolo, ma e' il tipo di cura che si nota. */
export function TextLink({
  href,
  children,
  className,
  ...rest
}: ComponentProps<typeof Link> & { children: ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-baseline gap-2 text-sm font-medium text-ink underline decoration-rule-strong decoration-1 underline-offset-[6px] transition-colors hover:decoration-ink",
        className,
      )}
      {...rest}
    >
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-300 ease-editorial group-hover:translate-x-1"
      >
        &rarr;
      </span>
    </Link>
  );
}
