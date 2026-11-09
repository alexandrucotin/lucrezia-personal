import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/* tailwind-merge non conosce le dimensioni di testo del sito (text-d1,
   text-lead...): senza dirglielo le scambia per colori, e unendo
   "text-d1" con "text-paper" butterebbe via la dimensione. */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["eyebrow", "d1", "d2", "d3", "d4", "lead"],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
