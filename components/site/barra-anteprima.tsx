"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Compare solo in anteprima: ricorda che si stanno guardando le bozze, non
 * il sito pubblicato.
 */
export function BarraAnteprima() {
  const pathname = usePathname();

  return (
    <div
      role="status"
      className="fixed inset-x-0 bottom-0 z-[90] flex flex-wrap items-center justify-center gap-x-6 gap-y-2 bg-ochre px-5 py-3 text-sm text-paper"
    >
      <span>Anteprima: stai vedendo le bozze, non il sito pubblicato.</span>
      {/* prefetch spento: un prefetch chiuderebbe l'anteprima da solo. */}
      <Link
        href={`/anteprima/esci?percorso=${encodeURIComponent(pathname)}`}
        prefetch={false}
        className="underline underline-offset-4"
      >
        Esci dall&apos;anteprima
      </Link>
    </div>
  );
}
