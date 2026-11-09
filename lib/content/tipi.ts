/**
 * Tipi dei testi, ricavati dagli schemi. Stanno in un file a parte perche'
 * li importano anche i componenti client, che non devono trascinarsi
 * dietro Payload e il database.
 */
import type { z } from "zod"

import type { creaSite } from "./site"
import type {
  contattiSchema,
  generaleSchema,
  metodoSchema,
  risultatiSchema,
  serviziSchema,
} from "./schema"

export type Generale = z.infer<typeof generaleSchema>
export type Site = ReturnType<typeof creaSite>
export type NavItem = Generale["navigazione"][number]
export type Service = z.infer<typeof serviziSchema>["elenco"][number]
export type Fase = z.infer<typeof metodoSchema>["fasi"][number]
export type CaseStudy = z.infer<typeof risultatiSchema>["casi"][number]
export type Testimonial = z.infer<typeof risultatiSchema>["testimonianze"][number]
export type Modulo = z.infer<typeof contattiSchema>["modulo"]
