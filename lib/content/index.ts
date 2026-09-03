/**
 * Punto unico di accesso ai testi del sito.
 *
 * I contenuti vivono in content/*.json e si modificano dal pannello su
 * /keystatic — oppure a mano, sono file di testo normali. Qui vengono
 * validati e tipizzati: da questo momento in poi il resto del codice non sa
 * piu' che arrivano da un file.
 */

import chiSonoData from "@/content/chi-sono.json";
import contattiData from "@/content/contatti.json";
import generaleData from "@/content/generale.json";
import homeData from "@/content/home.json";
import metodoData from "@/content/metodo.json";
import risultatiData from "@/content/risultati.json";
import serviziData from "@/content/servizi.json";

import {
  chiSonoSchema,
  contattiSchema,
  generaleSchema,
  homeSchema,
  load,
  metodoSchema,
  risultatiSchema,
  serviziSchema,
} from "./schema";

export const generale = load("generale", generaleSchema, generaleData);
export const home = load("home", homeSchema, homeData);
export const serviziContenuto = load("servizi", serviziSchema, serviziData);
export const metodoContenuto = load("metodo", metodoSchema, metodoData);
export const risultatiContenuto = load("risultati", risultatiSchema, risultatiData);
export const contattiContenuto = load("contatti", contattiSchema, contattiData);
export const chiSonoContenuto = load("chi-sono", chiSonoSchema, chiSonoData);

/* Scorciatoie per i dati usati in piu' pagine. */
export const services = serviziContenuto.elenco;
export const packages = serviziContenuto.prezzi.pacchetti;
export const method = metodoContenuto.fasi;
export const stats = risultatiContenuto.numeri;
export const caseStudies = risultatiContenuto.casi;
export const testimonials = risultatiContenuto.testimonianze;
export const clients = risultatiContenuto.clienti;
export const faqs = contattiContenuto.faq;
export const tools = generale.strumenti;

export type Service = (typeof services)[number];
export type CaseStudy = (typeof caseStudies)[number];
export type Testimonial = (typeof testimonials)[number];
