import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  -- Converte un testo semplice nel formato dell'editor (Lexical): un solo
  -- paragrafo, con gli a capo trasformati in spazi, esattamente come il sito
  -- lo mostrava prima.
  CREATE FUNCTION pg_temp.lexical_da_testo(t text) RETURNS jsonb LANGUAGE sql IMMUTABLE AS $$
    SELECT CASE WHEN t IS NULL THEN NULL ELSE jsonb_build_object('root', jsonb_build_object(
      'type', 'root', 'format', '', 'indent', 0, 'version', 1, 'direction', 'ltr',
      'children', jsonb_build_array(jsonb_build_object(
        'type', 'paragraph', 'format', '', 'indent', 0, 'version', 1, 'direction', 'ltr',
        'textFormat', 0, 'textStyle', '',
        'children', jsonb_build_array(jsonb_build_object(
          'type', 'text', 'text', btrim(regexp_replace(t, '\\s+', ' ', 'g')),
          'format', 0, 'detail', 0, 'mode', 'normal', 'style', '', 'version', 1
        ))
      ))
    )) END
  $$;
   CREATE TYPE "public"."enum_home_ordine_sezione" AS ENUM('clienti', 'diagnosi', 'servizi', 'risultati', 'metodo', 'chiSono', 'contatti');
  CREATE TYPE "public"."enum_home_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_v_version_ordine_sezione" AS ENUM('clienti', 'diagnosi', 'servizi', 'risultati', 'metodo', 'chiSono', 'contatti');
  CREATE TYPE "public"."enum__home_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_servizi_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__servizi_v_version_elenco_diagram" AS ENUM('matrix', 'calendar', 'kpi');
  CREATE TYPE "public"."enum__servizi_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_metodo_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__metodo_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_risultati_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__risultati_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_chi_sono_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__chi_sono_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_contatti_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__contatti_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_generale_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__generale_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "home_ordine" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sezione" "enum_home_ordine_sezione"
  );
  
  CREATE TABLE "_home_v_version_ordine" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sezione" "enum__home_v_version_ordine_sezione",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_hero_scheda" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"voce" varchar,
  	"valore" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_diagnosi_sintomi" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"indice" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_chi_sono_paragrafi" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"testo" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_contatti_passi" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"testo" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_meta_titolo" varchar,
  	"version_meta_descrizione" varchar,
  	"version_hero_occhiello" varchar,
  	"version_hero_titolo" varchar,
  	"version_hero_titolo_evidenziato" varchar,
  	"version_hero_sottotitolo" varchar,
  	"version_hero_pulsante_primario" varchar,
  	"version_hero_pulsante_secondario" varchar,
  	"version_clienti_occhiello" varchar,
  	"version_clienti_nota" varchar,
  	"version_diagnosi_occhiello" varchar,
  	"version_diagnosi_titolo" varchar,
  	"version_diagnosi_commento_grafico" varchar,
  	"version_diagnosi_commento_grafico_secondario" varchar,
  	"version_servizi_occhiello" varchar,
  	"version_servizi_titolo" varchar,
  	"version_servizi_link" varchar,
  	"version_risultati_occhiello" varchar,
  	"version_risultati_titolo" varchar,
  	"version_risultati_istruzione" varchar,
  	"version_risultati_nota" varchar,
  	"version_metodo_occhiello" varchar,
  	"version_metodo_titolo" varchar,
  	"version_metodo_sottotitolo" varchar,
  	"version_metodo_link" varchar,
  	"version_chi_sono_occhiello" varchar,
  	"version_chi_sono_titolo" varchar,
  	"version_chi_sono_immagine_id" integer,
  	"version_chi_sono_immagine_descrizione" varchar,
  	"version__status" "enum__home_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_servizi_v_version_pagina_scheda" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"voce" varchar,
  	"valore" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_servizi_v_version_prezzi_pacchetti_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"testo" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_servizi_v_version_prezzi_pacchetti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"unit" varchar,
  	"duration" varchar,
  	"body" varchar,
  	"highlight" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_servizi_v_version_elenco_deliverables" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"testo" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_servizi_v_version_elenco_for_whom" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"testo" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_servizi_v_version_elenco_needs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"testo" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_servizi_v_version_elenco_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"q" varchar,
  	"a" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_servizi_v_version_elenco" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"index" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"claim" varchar,
  	"summary" varchar,
  	"lead" varchar,
  	"not_for" jsonb,
  	"diagram" "enum__servizi_v_version_elenco_diagram",
  	"keyword" varchar,
  	"duration" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_servizi_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_meta_titolo" varchar,
  	"version_meta_descrizione" varchar,
  	"version_pagina_occhiello" varchar,
  	"version_pagina_titolo" varchar,
  	"version_pagina_sottotitolo" varchar,
  	"version_prezzi_occhiello" varchar,
  	"version_prezzi_titolo" varchar,
  	"version_prezzi_testo" jsonb,
  	"version__status" "enum__servizi_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_metodo_v_version_pagina_scheda" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"voce" varchar,
  	"valore" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_metodo_v_version_fasi" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"index" varchar,
  	"title" varchar,
  	"duration" varchar,
  	"body" varchar,
  	"detail" jsonb,
  	"output" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_metodo_v_version_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"q" varchar,
  	"a" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_metodo_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_meta_titolo" varchar,
  	"version_meta_descrizione" varchar,
  	"version_pagina_occhiello" varchar,
  	"version_pagina_titolo" varchar,
  	"version_pagina_sottotitolo" varchar,
  	"version_grafico_occhiello" varchar,
  	"version_grafico_titolo" varchar,
  	"version_grafico_testo" jsonb,
  	"version__status" "enum__metodo_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_risultati_v_version_pagina_scheda" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"voce" varchar,
  	"valore" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_risultati_v_version_lettura_paragrafi" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"testo" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_risultati_v_version_numeri" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"note" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_risultati_v_version_casi_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_risultati_v_version_casi" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"client" varchar,
  	"units" numeric,
  	"market" varchar,
  	"horizon" varchar,
  	"problem" varchar,
  	"action" varchar,
  	"quote" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_risultati_v_version_testimonianze" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"role" varchar,
  	"detail" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_risultati_v_version_clienti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"city" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_risultati_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_meta_titolo" varchar,
  	"version_meta_descrizione" varchar,
  	"version_pagina_occhiello" varchar,
  	"version_pagina_titolo" varchar,
  	"version_pagina_sottotitolo" varchar,
  	"version_lettura_occhiello" varchar,
  	"version_lettura_titolo" varchar,
  	"version_invito_titolo" varchar,
  	"version_invito_testo" varchar,
  	"version__status" "enum__risultati_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_chi_sono_v_version_percorso_tappe" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anno" varchar,
  	"titolo" varchar,
  	"testo" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_chi_sono_v_version_credenziali" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"voce" varchar,
  	"valore" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_chi_sono_v_version_tecnologia_progetti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"stato" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_chi_sono_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_meta_titolo" varchar,
  	"version_meta_descrizione" varchar,
  	"version_pagina_occhiello" varchar,
  	"version_pagina_titolo" varchar,
  	"version_pagina_sottotitolo" varchar,
  	"version_foto_immagine_id" integer,
  	"version_foto_descrizione" varchar,
  	"version_percorso_occhiello" varchar,
  	"version_tecnologia_occhiello" varchar,
  	"version_tecnologia_titolo" varchar,
  	"version_tecnologia_testo" jsonb,
  	"version_tecnologia_collaborazione" varchar,
  	"version_testimonianze_occhiello" varchar,
  	"version__status" "enum__chi_sono_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_contatti_v_version_passi" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"testo" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contatti_v_version_modulo_dimensioni" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"testo" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contatti_v_version_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"q" varchar,
  	"a" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contatti_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_meta_titolo" varchar,
  	"version_meta_descrizione" varchar,
  	"version_pagina_occhiello" varchar,
  	"version_pagina_titolo" varchar,
  	"version_pagina_sottotitolo" varchar,
  	"version_nota" varchar,
  	"version_modulo_etichette_nome" varchar,
  	"version_modulo_etichette_email" varchar,
  	"version_modulo_etichette_azienda" varchar,
  	"version_modulo_etichette_unita" varchar,
  	"version_modulo_etichette_mercato" varchar,
  	"version_modulo_etichette_messaggio" varchar,
  	"version_modulo_segnaposto_email" varchar,
  	"version_modulo_segnaposto_messaggio" varchar,
  	"version_modulo_consenso" varchar,
  	"version_modulo_invia" varchar,
  	"version_modulo_invia_in_corso" varchar,
  	"version_grazie_occhiello" varchar,
  	"version_grazie_titolo" varchar,
  	"version_grazie_testo" varchar,
  	"version__status" "enum__contatti_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_generale_v_version_mercati" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"testo" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_generale_v_version_strumenti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"testo" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_generale_v_version_navigazione" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"href" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_generale_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_identita_nome" varchar,
  	"version_identita_monogramma" varchar,
  	"version_identita_ruolo" varchar,
  	"version_identita_tagline" varchar,
  	"version_identita_url" varchar,
  	"version_identita_descrizione" varchar,
  	"version_contatti_email" varchar,
  	"version_contatti_telefono" varchar,
  	"version_contatti_telefono_href" varchar,
  	"version_contatti_linkedin" varchar,
  	"version_legale_entita" varchar,
  	"version_legale_partita_iva" varchar,
  	"version_legale_citta" varchar,
  	"version_legale_paese" varchar,
  	"version_footer_descrizione" varchar,
  	"version_invito_finale_occhiello" varchar,
  	"version_invito_finale_titolo" varchar,
  	"version_invito_finale_testo" varchar,
  	"version_invito_finale_pulsante" varchar,
  	"version_intestazione_pulsante" varchar,
  	"version__status" "enum__generale_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "home_hero_scheda" ALTER COLUMN "voce" DROP NOT NULL;
  ALTER TABLE "home_hero_scheda" ALTER COLUMN "valore" DROP NOT NULL;
  ALTER TABLE "home_diagnosi_sintomi" ALTER COLUMN "indice" DROP NOT NULL;
  ALTER TABLE "home_diagnosi_sintomi" ALTER COLUMN "titolo" DROP NOT NULL;
  ALTER TABLE "home_diagnosi_sintomi" ALTER COLUMN "testo" DROP NOT NULL;
  ALTER TABLE "home_chi_sono_paragrafi" ALTER COLUMN "testo" SET DATA TYPE jsonb USING pg_temp.lexical_da_testo("testo");
  ALTER TABLE "home_chi_sono_paragrafi" ALTER COLUMN "testo" DROP NOT NULL;
  ALTER TABLE "home_contatti_passi" ALTER COLUMN "testo" DROP NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "meta_titolo" DROP NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "meta_descrizione" DROP NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "hero_occhiello" DROP NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "hero_titolo" DROP NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "hero_sottotitolo" DROP NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "hero_pulsante_primario" DROP NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "hero_pulsante_secondario" DROP NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "clienti_occhiello" DROP NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "clienti_nota" DROP NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "diagnosi_occhiello" DROP NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "diagnosi_titolo" DROP NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "diagnosi_commento_grafico" DROP NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "diagnosi_commento_grafico_secondario" DROP NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "servizi_occhiello" DROP NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "servizi_titolo" DROP NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "servizi_link" DROP NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "risultati_occhiello" DROP NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "risultati_titolo" DROP NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "risultati_istruzione" DROP NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "risultati_nota" DROP NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "metodo_occhiello" DROP NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "metodo_titolo" DROP NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "metodo_sottotitolo" DROP NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "metodo_link" DROP NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "chi_sono_occhiello" DROP NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "chi_sono_titolo" DROP NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "chi_sono_immagine_id" DROP NOT NULL;
  ALTER TABLE "servizi_pagina_scheda" ALTER COLUMN "voce" DROP NOT NULL;
  ALTER TABLE "servizi_pagina_scheda" ALTER COLUMN "valore" DROP NOT NULL;
  ALTER TABLE "servizi_prezzi_pacchetti_items" ALTER COLUMN "testo" DROP NOT NULL;
  ALTER TABLE "servizi_prezzi_pacchetti" ALTER COLUMN "name" DROP NOT NULL;
  ALTER TABLE "servizi_prezzi_pacchetti" ALTER COLUMN "price" DROP NOT NULL;
  ALTER TABLE "servizi_prezzi_pacchetti" ALTER COLUMN "unit" DROP NOT NULL;
  ALTER TABLE "servizi_prezzi_pacchetti" ALTER COLUMN "duration" DROP NOT NULL;
  ALTER TABLE "servizi_prezzi_pacchetti" ALTER COLUMN "body" DROP NOT NULL;
  ALTER TABLE "servizi_elenco_deliverables" ALTER COLUMN "testo" DROP NOT NULL;
  ALTER TABLE "servizi_elenco_for_whom" ALTER COLUMN "testo" DROP NOT NULL;
  ALTER TABLE "servizi_elenco_needs" ALTER COLUMN "testo" DROP NOT NULL;
  ALTER TABLE "servizi_elenco_faq" ALTER COLUMN "q" DROP NOT NULL;
  ALTER TABLE "servizi_elenco_faq" ALTER COLUMN "a" SET DATA TYPE jsonb USING pg_temp.lexical_da_testo("a");
  ALTER TABLE "servizi_elenco_faq" ALTER COLUMN "a" DROP NOT NULL;
  ALTER TABLE "servizi_elenco" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "servizi_elenco" ALTER COLUMN "index" DROP NOT NULL;
  ALTER TABLE "servizi_elenco" ALTER COLUMN "eyebrow" DROP NOT NULL;
  ALTER TABLE "servizi_elenco" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "servizi_elenco" ALTER COLUMN "claim" DROP NOT NULL;
  ALTER TABLE "servizi_elenco" ALTER COLUMN "summary" DROP NOT NULL;
  ALTER TABLE "servizi_elenco" ALTER COLUMN "lead" DROP NOT NULL;
  ALTER TABLE "servizi_elenco" ALTER COLUMN "not_for" SET DATA TYPE jsonb USING pg_temp.lexical_da_testo("not_for");
  ALTER TABLE "servizi_elenco" ALTER COLUMN "not_for" DROP NOT NULL;
  ALTER TABLE "servizi_elenco" ALTER COLUMN "keyword" DROP NOT NULL;
  ALTER TABLE "servizi_elenco" ALTER COLUMN "duration" DROP NOT NULL;
  ALTER TABLE "servizi_elenco" ALTER COLUMN "meta_title" DROP NOT NULL;
  ALTER TABLE "servizi_elenco" ALTER COLUMN "meta_description" DROP NOT NULL;
  ALTER TABLE "servizi" ALTER COLUMN "meta_titolo" DROP NOT NULL;
  ALTER TABLE "servizi" ALTER COLUMN "meta_descrizione" DROP NOT NULL;
  ALTER TABLE "servizi" ALTER COLUMN "pagina_occhiello" DROP NOT NULL;
  ALTER TABLE "servizi" ALTER COLUMN "pagina_titolo" DROP NOT NULL;
  ALTER TABLE "servizi" ALTER COLUMN "pagina_sottotitolo" DROP NOT NULL;
  ALTER TABLE "servizi" ALTER COLUMN "prezzi_occhiello" DROP NOT NULL;
  ALTER TABLE "servizi" ALTER COLUMN "prezzi_titolo" DROP NOT NULL;
  ALTER TABLE "servizi" ALTER COLUMN "prezzi_testo" SET DATA TYPE jsonb USING pg_temp.lexical_da_testo("prezzi_testo");
  ALTER TABLE "servizi" ALTER COLUMN "prezzi_testo" DROP NOT NULL;
  ALTER TABLE "metodo_pagina_scheda" ALTER COLUMN "voce" DROP NOT NULL;
  ALTER TABLE "metodo_pagina_scheda" ALTER COLUMN "valore" DROP NOT NULL;
  ALTER TABLE "metodo_fasi" ALTER COLUMN "index" DROP NOT NULL;
  ALTER TABLE "metodo_fasi" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "metodo_fasi" ALTER COLUMN "duration" DROP NOT NULL;
  ALTER TABLE "metodo_fasi" ALTER COLUMN "body" DROP NOT NULL;
  ALTER TABLE "metodo_fasi" ALTER COLUMN "detail" SET DATA TYPE jsonb USING pg_temp.lexical_da_testo("detail");
  ALTER TABLE "metodo_fasi" ALTER COLUMN "detail" DROP NOT NULL;
  ALTER TABLE "metodo_fasi" ALTER COLUMN "output" DROP NOT NULL;
  ALTER TABLE "metodo_faq" ALTER COLUMN "q" DROP NOT NULL;
  ALTER TABLE "metodo_faq" ALTER COLUMN "a" SET DATA TYPE jsonb USING pg_temp.lexical_da_testo("a");
  ALTER TABLE "metodo_faq" ALTER COLUMN "a" DROP NOT NULL;
  ALTER TABLE "metodo" ALTER COLUMN "meta_titolo" DROP NOT NULL;
  ALTER TABLE "metodo" ALTER COLUMN "meta_descrizione" DROP NOT NULL;
  ALTER TABLE "metodo" ALTER COLUMN "pagina_occhiello" DROP NOT NULL;
  ALTER TABLE "metodo" ALTER COLUMN "pagina_titolo" DROP NOT NULL;
  ALTER TABLE "metodo" ALTER COLUMN "pagina_sottotitolo" DROP NOT NULL;
  ALTER TABLE "metodo" ALTER COLUMN "grafico_occhiello" DROP NOT NULL;
  ALTER TABLE "metodo" ALTER COLUMN "grafico_titolo" DROP NOT NULL;
  ALTER TABLE "metodo" ALTER COLUMN "grafico_testo" SET DATA TYPE jsonb USING pg_temp.lexical_da_testo("grafico_testo");
  ALTER TABLE "metodo" ALTER COLUMN "grafico_testo" DROP NOT NULL;
  ALTER TABLE "risultati_pagina_scheda" ALTER COLUMN "voce" DROP NOT NULL;
  ALTER TABLE "risultati_pagina_scheda" ALTER COLUMN "valore" DROP NOT NULL;
  ALTER TABLE "risultati_lettura_paragrafi" ALTER COLUMN "testo" SET DATA TYPE jsonb USING pg_temp.lexical_da_testo("testo");
  ALTER TABLE "risultati_lettura_paragrafi" ALTER COLUMN "testo" DROP NOT NULL;
  ALTER TABLE "risultati_numeri" ALTER COLUMN "value" DROP NOT NULL;
  ALTER TABLE "risultati_numeri" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "risultati_casi_results" ALTER COLUMN "value" DROP NOT NULL;
  ALTER TABLE "risultati_casi_results" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "risultati_casi" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "risultati_casi" ALTER COLUMN "client" DROP NOT NULL;
  ALTER TABLE "risultati_casi" ALTER COLUMN "units" DROP NOT NULL;
  ALTER TABLE "risultati_casi" ALTER COLUMN "market" DROP NOT NULL;
  ALTER TABLE "risultati_casi" ALTER COLUMN "horizon" DROP NOT NULL;
  ALTER TABLE "risultati_casi" ALTER COLUMN "problem" DROP NOT NULL;
  ALTER TABLE "risultati_casi" ALTER COLUMN "action" DROP NOT NULL;
  ALTER TABLE "risultati_testimonianze" ALTER COLUMN "quote" DROP NOT NULL;
  ALTER TABLE "risultati_testimonianze" ALTER COLUMN "role" DROP NOT NULL;
  ALTER TABLE "risultati_testimonianze" ALTER COLUMN "detail" DROP NOT NULL;
  ALTER TABLE "risultati_clienti" ALTER COLUMN "name" DROP NOT NULL;
  ALTER TABLE "risultati_clienti" ALTER COLUMN "city" DROP NOT NULL;
  ALTER TABLE "risultati" ALTER COLUMN "meta_titolo" DROP NOT NULL;
  ALTER TABLE "risultati" ALTER COLUMN "meta_descrizione" DROP NOT NULL;
  ALTER TABLE "risultati" ALTER COLUMN "pagina_occhiello" DROP NOT NULL;
  ALTER TABLE "risultati" ALTER COLUMN "pagina_titolo" DROP NOT NULL;
  ALTER TABLE "risultati" ALTER COLUMN "pagina_sottotitolo" DROP NOT NULL;
  ALTER TABLE "risultati" ALTER COLUMN "lettura_occhiello" DROP NOT NULL;
  ALTER TABLE "risultati" ALTER COLUMN "lettura_titolo" DROP NOT NULL;
  ALTER TABLE "risultati" ALTER COLUMN "invito_titolo" DROP NOT NULL;
  ALTER TABLE "risultati" ALTER COLUMN "invito_testo" DROP NOT NULL;
  ALTER TABLE "chi_sono_percorso_tappe" ALTER COLUMN "anno" DROP NOT NULL;
  ALTER TABLE "chi_sono_percorso_tappe" ALTER COLUMN "titolo" DROP NOT NULL;
  ALTER TABLE "chi_sono_percorso_tappe" ALTER COLUMN "testo" SET DATA TYPE jsonb USING pg_temp.lexical_da_testo("testo");
  ALTER TABLE "chi_sono_percorso_tappe" ALTER COLUMN "testo" DROP NOT NULL;
  ALTER TABLE "chi_sono_credenziali" ALTER COLUMN "voce" DROP NOT NULL;
  ALTER TABLE "chi_sono_credenziali" ALTER COLUMN "valore" DROP NOT NULL;
  ALTER TABLE "chi_sono_tecnologia_progetti" ALTER COLUMN "stato" DROP NOT NULL;
  ALTER TABLE "chi_sono_tecnologia_progetti" ALTER COLUMN "titolo" DROP NOT NULL;
  ALTER TABLE "chi_sono_tecnologia_progetti" ALTER COLUMN "testo" DROP NOT NULL;
  ALTER TABLE "chi_sono" ALTER COLUMN "meta_titolo" DROP NOT NULL;
  ALTER TABLE "chi_sono" ALTER COLUMN "meta_descrizione" DROP NOT NULL;
  ALTER TABLE "chi_sono" ALTER COLUMN "pagina_occhiello" DROP NOT NULL;
  ALTER TABLE "chi_sono" ALTER COLUMN "pagina_titolo" DROP NOT NULL;
  ALTER TABLE "chi_sono" ALTER COLUMN "pagina_sottotitolo" DROP NOT NULL;
  ALTER TABLE "chi_sono" ALTER COLUMN "foto_immagine_id" DROP NOT NULL;
  ALTER TABLE "chi_sono" ALTER COLUMN "percorso_occhiello" DROP NOT NULL;
  ALTER TABLE "chi_sono" ALTER COLUMN "tecnologia_occhiello" DROP NOT NULL;
  ALTER TABLE "chi_sono" ALTER COLUMN "tecnologia_titolo" DROP NOT NULL;
  ALTER TABLE "chi_sono" ALTER COLUMN "tecnologia_testo" SET DATA TYPE jsonb USING pg_temp.lexical_da_testo("tecnologia_testo");
  ALTER TABLE "chi_sono" ALTER COLUMN "tecnologia_testo" DROP NOT NULL;
  ALTER TABLE "chi_sono" ALTER COLUMN "tecnologia_collaborazione" DROP NOT NULL;
  ALTER TABLE "chi_sono" ALTER COLUMN "testimonianze_occhiello" DROP NOT NULL;
  ALTER TABLE "contatti_passi" ALTER COLUMN "testo" DROP NOT NULL;
  ALTER TABLE "contatti_modulo_dimensioni" ALTER COLUMN "testo" DROP NOT NULL;
  ALTER TABLE "contatti_faq" ALTER COLUMN "q" DROP NOT NULL;
  ALTER TABLE "contatti_faq" ALTER COLUMN "a" SET DATA TYPE jsonb USING pg_temp.lexical_da_testo("a");
  ALTER TABLE "contatti_faq" ALTER COLUMN "a" DROP NOT NULL;
  ALTER TABLE "contatti" ALTER COLUMN "meta_titolo" DROP NOT NULL;
  ALTER TABLE "contatti" ALTER COLUMN "meta_descrizione" DROP NOT NULL;
  ALTER TABLE "contatti" ALTER COLUMN "pagina_occhiello" DROP NOT NULL;
  ALTER TABLE "contatti" ALTER COLUMN "pagina_titolo" DROP NOT NULL;
  ALTER TABLE "contatti" ALTER COLUMN "pagina_sottotitolo" DROP NOT NULL;
  ALTER TABLE "contatti" ALTER COLUMN "nota" DROP NOT NULL;
  ALTER TABLE "contatti" ALTER COLUMN "modulo_etichette_nome" DROP NOT NULL;
  ALTER TABLE "contatti" ALTER COLUMN "modulo_etichette_email" DROP NOT NULL;
  ALTER TABLE "contatti" ALTER COLUMN "modulo_etichette_azienda" DROP NOT NULL;
  ALTER TABLE "contatti" ALTER COLUMN "modulo_etichette_unita" DROP NOT NULL;
  ALTER TABLE "contatti" ALTER COLUMN "modulo_etichette_mercato" DROP NOT NULL;
  ALTER TABLE "contatti" ALTER COLUMN "modulo_etichette_messaggio" DROP NOT NULL;
  ALTER TABLE "contatti" ALTER COLUMN "modulo_segnaposto_email" DROP NOT NULL;
  ALTER TABLE "contatti" ALTER COLUMN "modulo_segnaposto_messaggio" DROP NOT NULL;
  ALTER TABLE "contatti" ALTER COLUMN "modulo_consenso" DROP NOT NULL;
  ALTER TABLE "contatti" ALTER COLUMN "modulo_invia" DROP NOT NULL;
  ALTER TABLE "contatti" ALTER COLUMN "modulo_invia_in_corso" DROP NOT NULL;
  ALTER TABLE "contatti" ALTER COLUMN "grazie_occhiello" DROP NOT NULL;
  ALTER TABLE "contatti" ALTER COLUMN "grazie_titolo" DROP NOT NULL;
  ALTER TABLE "contatti" ALTER COLUMN "grazie_testo" DROP NOT NULL;
  ALTER TABLE "generale_mercati" ALTER COLUMN "testo" DROP NOT NULL;
  ALTER TABLE "generale_strumenti" ALTER COLUMN "testo" DROP NOT NULL;
  ALTER TABLE "generale_navigazione" ALTER COLUMN "href" DROP NOT NULL;
  ALTER TABLE "generale_navigazione" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "generale" ALTER COLUMN "identita_nome" DROP NOT NULL;
  ALTER TABLE "generale" ALTER COLUMN "identita_monogramma" DROP NOT NULL;
  ALTER TABLE "generale" ALTER COLUMN "identita_ruolo" DROP NOT NULL;
  ALTER TABLE "generale" ALTER COLUMN "identita_tagline" DROP NOT NULL;
  ALTER TABLE "generale" ALTER COLUMN "identita_url" DROP NOT NULL;
  ALTER TABLE "generale" ALTER COLUMN "identita_descrizione" DROP NOT NULL;
  ALTER TABLE "generale" ALTER COLUMN "contatti_email" DROP NOT NULL;
  ALTER TABLE "generale" ALTER COLUMN "contatti_telefono" DROP NOT NULL;
  ALTER TABLE "generale" ALTER COLUMN "contatti_telefono_href" DROP NOT NULL;
  ALTER TABLE "generale" ALTER COLUMN "contatti_linkedin" DROP NOT NULL;
  ALTER TABLE "generale" ALTER COLUMN "legale_entita" DROP NOT NULL;
  ALTER TABLE "generale" ALTER COLUMN "legale_partita_iva" DROP NOT NULL;
  ALTER TABLE "generale" ALTER COLUMN "legale_citta" DROP NOT NULL;
  ALTER TABLE "generale" ALTER COLUMN "legale_paese" DROP NOT NULL;
  ALTER TABLE "generale" ALTER COLUMN "footer_descrizione" DROP NOT NULL;
  ALTER TABLE "generale" ALTER COLUMN "invito_finale_occhiello" DROP NOT NULL;
  ALTER TABLE "generale" ALTER COLUMN "invito_finale_titolo" DROP NOT NULL;
  ALTER TABLE "generale" ALTER COLUMN "invito_finale_testo" DROP NOT NULL;
  ALTER TABLE "generale" ALTER COLUMN "invito_finale_pulsante" DROP NOT NULL;
  ALTER TABLE "generale" ALTER COLUMN "intestazione_pulsante" DROP NOT NULL;
  ALTER TABLE "home" ADD COLUMN "_status" "enum_home_status" DEFAULT 'draft';
  ALTER TABLE "servizi" ADD COLUMN "_status" "enum_servizi_status" DEFAULT 'draft';
  ALTER TABLE "metodo" ADD COLUMN "_status" "enum_metodo_status" DEFAULT 'draft';
  ALTER TABLE "risultati" ADD COLUMN "_status" "enum_risultati_status" DEFAULT 'draft';
  ALTER TABLE "chi_sono" ADD COLUMN "_status" "enum_chi_sono_status" DEFAULT 'draft';
  ALTER TABLE "contatti" ADD COLUMN "_status" "enum_contatti_status" DEFAULT 'draft';
  ALTER TABLE "generale" ADD COLUMN "_status" "enum_generale_status" DEFAULT 'draft';

  -- I contenuti gia' online sono pubblicati, non bozze.
  UPDATE "home" SET "_status" = 'published';
  UPDATE "servizi" SET "_status" = 'published';
  UPDATE "metodo" SET "_status" = 'published';
  UPDATE "risultati" SET "_status" = 'published';
  UPDATE "chi_sono" SET "_status" = 'published';
  UPDATE "contatti" SET "_status" = 'published';
  UPDATE "generale" SET "_status" = 'published';

  -- La home parte con tutte le sezioni, nell'ordine di sempre.
  INSERT INTO "home_ordine" ("_order", "_parent_id", "id", "sezione")
  SELECT o.n, h.id, substr(md5(random()::text || o.n::text), 1, 24), o.s::"enum_home_ordine_sezione"
  FROM "home" h
  CROSS JOIN (VALUES (1, 'clienti'), (2, 'diagnosi'), (3, 'servizi'), (4, 'risultati'),
                     (5, 'metodo'), (6, 'chiSono'), (7, 'contatti')) AS o(n, s);
  ALTER TABLE "home_ordine" ADD CONSTRAINT "home_ordine_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_ordine" ADD CONSTRAINT "_home_v_version_ordine_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_hero_scheda" ADD CONSTRAINT "_home_v_version_hero_scheda_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_diagnosi_sintomi" ADD CONSTRAINT "_home_v_version_diagnosi_sintomi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_chi_sono_paragrafi" ADD CONSTRAINT "_home_v_version_chi_sono_paragrafi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_contatti_passi" ADD CONSTRAINT "_home_v_version_contatti_passi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_chi_sono_immagine_id_media_id_fk" FOREIGN KEY ("version_chi_sono_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_servizi_v_version_pagina_scheda" ADD CONSTRAINT "_servizi_v_version_pagina_scheda_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_servizi_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_servizi_v_version_prezzi_pacchetti_items" ADD CONSTRAINT "_servizi_v_version_prezzi_pacchetti_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_servizi_v_version_prezzi_pacchetti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_servizi_v_version_prezzi_pacchetti" ADD CONSTRAINT "_servizi_v_version_prezzi_pacchetti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_servizi_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_servizi_v_version_elenco_deliverables" ADD CONSTRAINT "_servizi_v_version_elenco_deliverables_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_servizi_v_version_elenco"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_servizi_v_version_elenco_for_whom" ADD CONSTRAINT "_servizi_v_version_elenco_for_whom_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_servizi_v_version_elenco"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_servizi_v_version_elenco_needs" ADD CONSTRAINT "_servizi_v_version_elenco_needs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_servizi_v_version_elenco"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_servizi_v_version_elenco_faq" ADD CONSTRAINT "_servizi_v_version_elenco_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_servizi_v_version_elenco"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_servizi_v_version_elenco" ADD CONSTRAINT "_servizi_v_version_elenco_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_servizi_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_metodo_v_version_pagina_scheda" ADD CONSTRAINT "_metodo_v_version_pagina_scheda_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_metodo_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_metodo_v_version_fasi" ADD CONSTRAINT "_metodo_v_version_fasi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_metodo_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_metodo_v_version_faq" ADD CONSTRAINT "_metodo_v_version_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_metodo_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_risultati_v_version_pagina_scheda" ADD CONSTRAINT "_risultati_v_version_pagina_scheda_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_risultati_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_risultati_v_version_lettura_paragrafi" ADD CONSTRAINT "_risultati_v_version_lettura_paragrafi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_risultati_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_risultati_v_version_numeri" ADD CONSTRAINT "_risultati_v_version_numeri_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_risultati_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_risultati_v_version_casi_results" ADD CONSTRAINT "_risultati_v_version_casi_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_risultati_v_version_casi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_risultati_v_version_casi" ADD CONSTRAINT "_risultati_v_version_casi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_risultati_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_risultati_v_version_testimonianze" ADD CONSTRAINT "_risultati_v_version_testimonianze_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_risultati_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_risultati_v_version_clienti" ADD CONSTRAINT "_risultati_v_version_clienti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_risultati_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_chi_sono_v_version_percorso_tappe" ADD CONSTRAINT "_chi_sono_v_version_percorso_tappe_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_chi_sono_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_chi_sono_v_version_credenziali" ADD CONSTRAINT "_chi_sono_v_version_credenziali_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_chi_sono_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_chi_sono_v_version_tecnologia_progetti" ADD CONSTRAINT "_chi_sono_v_version_tecnologia_progetti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_chi_sono_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_chi_sono_v" ADD CONSTRAINT "_chi_sono_v_version_foto_immagine_id_media_id_fk" FOREIGN KEY ("version_foto_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_contatti_v_version_passi" ADD CONSTRAINT "_contatti_v_version_passi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contatti_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contatti_v_version_modulo_dimensioni" ADD CONSTRAINT "_contatti_v_version_modulo_dimensioni_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contatti_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contatti_v_version_faq" ADD CONSTRAINT "_contatti_v_version_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contatti_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_generale_v_version_mercati" ADD CONSTRAINT "_generale_v_version_mercati_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_generale_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_generale_v_version_strumenti" ADD CONSTRAINT "_generale_v_version_strumenti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_generale_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_generale_v_version_navigazione" ADD CONSTRAINT "_generale_v_version_navigazione_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_generale_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_ordine_order_idx" ON "home_ordine" USING btree ("_order");
  CREATE INDEX "home_ordine_parent_id_idx" ON "home_ordine" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_ordine_order_idx" ON "_home_v_version_ordine" USING btree ("_order");
  CREATE INDEX "_home_v_version_ordine_parent_id_idx" ON "_home_v_version_ordine" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_hero_scheda_order_idx" ON "_home_v_version_hero_scheda" USING btree ("_order");
  CREATE INDEX "_home_v_version_hero_scheda_parent_id_idx" ON "_home_v_version_hero_scheda" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_diagnosi_sintomi_order_idx" ON "_home_v_version_diagnosi_sintomi" USING btree ("_order");
  CREATE INDEX "_home_v_version_diagnosi_sintomi_parent_id_idx" ON "_home_v_version_diagnosi_sintomi" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_chi_sono_paragrafi_order_idx" ON "_home_v_version_chi_sono_paragrafi" USING btree ("_order");
  CREATE INDEX "_home_v_version_chi_sono_paragrafi_parent_id_idx" ON "_home_v_version_chi_sono_paragrafi" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_contatti_passi_order_idx" ON "_home_v_version_contatti_passi" USING btree ("_order");
  CREATE INDEX "_home_v_version_contatti_passi_parent_id_idx" ON "_home_v_version_contatti_passi" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_chi_sono_version_chi_sono_immagine_idx" ON "_home_v" USING btree ("version_chi_sono_immagine_id");
  CREATE INDEX "_home_v_version_version__status_idx" ON "_home_v" USING btree ("version__status");
  CREATE INDEX "_home_v_created_at_idx" ON "_home_v" USING btree ("created_at");
  CREATE INDEX "_home_v_updated_at_idx" ON "_home_v" USING btree ("updated_at");
  CREATE INDEX "_home_v_latest_idx" ON "_home_v" USING btree ("latest");
  CREATE INDEX "_servizi_v_version_pagina_scheda_order_idx" ON "_servizi_v_version_pagina_scheda" USING btree ("_order");
  CREATE INDEX "_servizi_v_version_pagina_scheda_parent_id_idx" ON "_servizi_v_version_pagina_scheda" USING btree ("_parent_id");
  CREATE INDEX "_servizi_v_version_prezzi_pacchetti_items_order_idx" ON "_servizi_v_version_prezzi_pacchetti_items" USING btree ("_order");
  CREATE INDEX "_servizi_v_version_prezzi_pacchetti_items_parent_id_idx" ON "_servizi_v_version_prezzi_pacchetti_items" USING btree ("_parent_id");
  CREATE INDEX "_servizi_v_version_prezzi_pacchetti_order_idx" ON "_servizi_v_version_prezzi_pacchetti" USING btree ("_order");
  CREATE INDEX "_servizi_v_version_prezzi_pacchetti_parent_id_idx" ON "_servizi_v_version_prezzi_pacchetti" USING btree ("_parent_id");
  CREATE INDEX "_servizi_v_version_elenco_deliverables_order_idx" ON "_servizi_v_version_elenco_deliverables" USING btree ("_order");
  CREATE INDEX "_servizi_v_version_elenco_deliverables_parent_id_idx" ON "_servizi_v_version_elenco_deliverables" USING btree ("_parent_id");
  CREATE INDEX "_servizi_v_version_elenco_for_whom_order_idx" ON "_servizi_v_version_elenco_for_whom" USING btree ("_order");
  CREATE INDEX "_servizi_v_version_elenco_for_whom_parent_id_idx" ON "_servizi_v_version_elenco_for_whom" USING btree ("_parent_id");
  CREATE INDEX "_servizi_v_version_elenco_needs_order_idx" ON "_servizi_v_version_elenco_needs" USING btree ("_order");
  CREATE INDEX "_servizi_v_version_elenco_needs_parent_id_idx" ON "_servizi_v_version_elenco_needs" USING btree ("_parent_id");
  CREATE INDEX "_servizi_v_version_elenco_faq_order_idx" ON "_servizi_v_version_elenco_faq" USING btree ("_order");
  CREATE INDEX "_servizi_v_version_elenco_faq_parent_id_idx" ON "_servizi_v_version_elenco_faq" USING btree ("_parent_id");
  CREATE INDEX "_servizi_v_version_elenco_order_idx" ON "_servizi_v_version_elenco" USING btree ("_order");
  CREATE INDEX "_servizi_v_version_elenco_parent_id_idx" ON "_servizi_v_version_elenco" USING btree ("_parent_id");
  CREATE INDEX "_servizi_v_version_version__status_idx" ON "_servizi_v" USING btree ("version__status");
  CREATE INDEX "_servizi_v_created_at_idx" ON "_servizi_v" USING btree ("created_at");
  CREATE INDEX "_servizi_v_updated_at_idx" ON "_servizi_v" USING btree ("updated_at");
  CREATE INDEX "_servizi_v_latest_idx" ON "_servizi_v" USING btree ("latest");
  CREATE INDEX "_metodo_v_version_pagina_scheda_order_idx" ON "_metodo_v_version_pagina_scheda" USING btree ("_order");
  CREATE INDEX "_metodo_v_version_pagina_scheda_parent_id_idx" ON "_metodo_v_version_pagina_scheda" USING btree ("_parent_id");
  CREATE INDEX "_metodo_v_version_fasi_order_idx" ON "_metodo_v_version_fasi" USING btree ("_order");
  CREATE INDEX "_metodo_v_version_fasi_parent_id_idx" ON "_metodo_v_version_fasi" USING btree ("_parent_id");
  CREATE INDEX "_metodo_v_version_faq_order_idx" ON "_metodo_v_version_faq" USING btree ("_order");
  CREATE INDEX "_metodo_v_version_faq_parent_id_idx" ON "_metodo_v_version_faq" USING btree ("_parent_id");
  CREATE INDEX "_metodo_v_version_version__status_idx" ON "_metodo_v" USING btree ("version__status");
  CREATE INDEX "_metodo_v_created_at_idx" ON "_metodo_v" USING btree ("created_at");
  CREATE INDEX "_metodo_v_updated_at_idx" ON "_metodo_v" USING btree ("updated_at");
  CREATE INDEX "_metodo_v_latest_idx" ON "_metodo_v" USING btree ("latest");
  CREATE INDEX "_risultati_v_version_pagina_scheda_order_idx" ON "_risultati_v_version_pagina_scheda" USING btree ("_order");
  CREATE INDEX "_risultati_v_version_pagina_scheda_parent_id_idx" ON "_risultati_v_version_pagina_scheda" USING btree ("_parent_id");
  CREATE INDEX "_risultati_v_version_lettura_paragrafi_order_idx" ON "_risultati_v_version_lettura_paragrafi" USING btree ("_order");
  CREATE INDEX "_risultati_v_version_lettura_paragrafi_parent_id_idx" ON "_risultati_v_version_lettura_paragrafi" USING btree ("_parent_id");
  CREATE INDEX "_risultati_v_version_numeri_order_idx" ON "_risultati_v_version_numeri" USING btree ("_order");
  CREATE INDEX "_risultati_v_version_numeri_parent_id_idx" ON "_risultati_v_version_numeri" USING btree ("_parent_id");
  CREATE INDEX "_risultati_v_version_casi_results_order_idx" ON "_risultati_v_version_casi_results" USING btree ("_order");
  CREATE INDEX "_risultati_v_version_casi_results_parent_id_idx" ON "_risultati_v_version_casi_results" USING btree ("_parent_id");
  CREATE INDEX "_risultati_v_version_casi_order_idx" ON "_risultati_v_version_casi" USING btree ("_order");
  CREATE INDEX "_risultati_v_version_casi_parent_id_idx" ON "_risultati_v_version_casi" USING btree ("_parent_id");
  CREATE INDEX "_risultati_v_version_testimonianze_order_idx" ON "_risultati_v_version_testimonianze" USING btree ("_order");
  CREATE INDEX "_risultati_v_version_testimonianze_parent_id_idx" ON "_risultati_v_version_testimonianze" USING btree ("_parent_id");
  CREATE INDEX "_risultati_v_version_clienti_order_idx" ON "_risultati_v_version_clienti" USING btree ("_order");
  CREATE INDEX "_risultati_v_version_clienti_parent_id_idx" ON "_risultati_v_version_clienti" USING btree ("_parent_id");
  CREATE INDEX "_risultati_v_version_version__status_idx" ON "_risultati_v" USING btree ("version__status");
  CREATE INDEX "_risultati_v_created_at_idx" ON "_risultati_v" USING btree ("created_at");
  CREATE INDEX "_risultati_v_updated_at_idx" ON "_risultati_v" USING btree ("updated_at");
  CREATE INDEX "_risultati_v_latest_idx" ON "_risultati_v" USING btree ("latest");
  CREATE INDEX "_chi_sono_v_version_percorso_tappe_order_idx" ON "_chi_sono_v_version_percorso_tappe" USING btree ("_order");
  CREATE INDEX "_chi_sono_v_version_percorso_tappe_parent_id_idx" ON "_chi_sono_v_version_percorso_tappe" USING btree ("_parent_id");
  CREATE INDEX "_chi_sono_v_version_credenziali_order_idx" ON "_chi_sono_v_version_credenziali" USING btree ("_order");
  CREATE INDEX "_chi_sono_v_version_credenziali_parent_id_idx" ON "_chi_sono_v_version_credenziali" USING btree ("_parent_id");
  CREATE INDEX "_chi_sono_v_version_tecnologia_progetti_order_idx" ON "_chi_sono_v_version_tecnologia_progetti" USING btree ("_order");
  CREATE INDEX "_chi_sono_v_version_tecnologia_progetti_parent_id_idx" ON "_chi_sono_v_version_tecnologia_progetti" USING btree ("_parent_id");
  CREATE INDEX "_chi_sono_v_version_foto_version_foto_immagine_idx" ON "_chi_sono_v" USING btree ("version_foto_immagine_id");
  CREATE INDEX "_chi_sono_v_version_version__status_idx" ON "_chi_sono_v" USING btree ("version__status");
  CREATE INDEX "_chi_sono_v_created_at_idx" ON "_chi_sono_v" USING btree ("created_at");
  CREATE INDEX "_chi_sono_v_updated_at_idx" ON "_chi_sono_v" USING btree ("updated_at");
  CREATE INDEX "_chi_sono_v_latest_idx" ON "_chi_sono_v" USING btree ("latest");
  CREATE INDEX "_contatti_v_version_passi_order_idx" ON "_contatti_v_version_passi" USING btree ("_order");
  CREATE INDEX "_contatti_v_version_passi_parent_id_idx" ON "_contatti_v_version_passi" USING btree ("_parent_id");
  CREATE INDEX "_contatti_v_version_modulo_dimensioni_order_idx" ON "_contatti_v_version_modulo_dimensioni" USING btree ("_order");
  CREATE INDEX "_contatti_v_version_modulo_dimensioni_parent_id_idx" ON "_contatti_v_version_modulo_dimensioni" USING btree ("_parent_id");
  CREATE INDEX "_contatti_v_version_faq_order_idx" ON "_contatti_v_version_faq" USING btree ("_order");
  CREATE INDEX "_contatti_v_version_faq_parent_id_idx" ON "_contatti_v_version_faq" USING btree ("_parent_id");
  CREATE INDEX "_contatti_v_version_version__status_idx" ON "_contatti_v" USING btree ("version__status");
  CREATE INDEX "_contatti_v_created_at_idx" ON "_contatti_v" USING btree ("created_at");
  CREATE INDEX "_contatti_v_updated_at_idx" ON "_contatti_v" USING btree ("updated_at");
  CREATE INDEX "_contatti_v_latest_idx" ON "_contatti_v" USING btree ("latest");
  CREATE INDEX "_generale_v_version_mercati_order_idx" ON "_generale_v_version_mercati" USING btree ("_order");
  CREATE INDEX "_generale_v_version_mercati_parent_id_idx" ON "_generale_v_version_mercati" USING btree ("_parent_id");
  CREATE INDEX "_generale_v_version_strumenti_order_idx" ON "_generale_v_version_strumenti" USING btree ("_order");
  CREATE INDEX "_generale_v_version_strumenti_parent_id_idx" ON "_generale_v_version_strumenti" USING btree ("_parent_id");
  CREATE INDEX "_generale_v_version_navigazione_order_idx" ON "_generale_v_version_navigazione" USING btree ("_order");
  CREATE INDEX "_generale_v_version_navigazione_parent_id_idx" ON "_generale_v_version_navigazione" USING btree ("_parent_id");
  CREATE INDEX "_generale_v_version_version__status_idx" ON "_generale_v" USING btree ("version__status");
  CREATE INDEX "_generale_v_created_at_idx" ON "_generale_v" USING btree ("created_at");
  CREATE INDEX "_generale_v_updated_at_idx" ON "_generale_v" USING btree ("updated_at");
  CREATE INDEX "_generale_v_latest_idx" ON "_generale_v" USING btree ("latest");
  CREATE INDEX "home__status_idx" ON "home" USING btree ("_status");
  CREATE INDEX "servizi__status_idx" ON "servizi" USING btree ("_status");
  CREATE INDEX "metodo__status_idx" ON "metodo" USING btree ("_status");
  CREATE INDEX "risultati__status_idx" ON "risultati" USING btree ("_status");
  CREATE INDEX "chi_sono__status_idx" ON "chi_sono" USING btree ("_status");
  CREATE INDEX "contatti__status_idx" ON "contatti" USING btree ("_status");
  CREATE INDEX "generale__status_idx" ON "generale" USING btree ("_status");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "home_ordine" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_ordine" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_hero_scheda" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_diagnosi_sintomi" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_chi_sono_paragrafi" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_contatti_passi" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_servizi_v_version_pagina_scheda" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_servizi_v_version_prezzi_pacchetti_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_servizi_v_version_prezzi_pacchetti" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_servizi_v_version_elenco_deliverables" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_servizi_v_version_elenco_for_whom" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_servizi_v_version_elenco_needs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_servizi_v_version_elenco_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_servizi_v_version_elenco" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_servizi_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_metodo_v_version_pagina_scheda" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_metodo_v_version_fasi" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_metodo_v_version_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_metodo_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_risultati_v_version_pagina_scheda" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_risultati_v_version_lettura_paragrafi" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_risultati_v_version_numeri" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_risultati_v_version_casi_results" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_risultati_v_version_casi" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_risultati_v_version_testimonianze" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_risultati_v_version_clienti" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_risultati_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_chi_sono_v_version_percorso_tappe" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_chi_sono_v_version_credenziali" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_chi_sono_v_version_tecnologia_progetti" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_chi_sono_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contatti_v_version_passi" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contatti_v_version_modulo_dimensioni" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contatti_v_version_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contatti_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_generale_v_version_mercati" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_generale_v_version_strumenti" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_generale_v_version_navigazione" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_generale_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "home_ordine" CASCADE;
  DROP TABLE "_home_v_version_ordine" CASCADE;
  DROP TABLE "_home_v_version_hero_scheda" CASCADE;
  DROP TABLE "_home_v_version_diagnosi_sintomi" CASCADE;
  DROP TABLE "_home_v_version_chi_sono_paragrafi" CASCADE;
  DROP TABLE "_home_v_version_contatti_passi" CASCADE;
  DROP TABLE "_home_v" CASCADE;
  DROP TABLE "_servizi_v_version_pagina_scheda" CASCADE;
  DROP TABLE "_servizi_v_version_prezzi_pacchetti_items" CASCADE;
  DROP TABLE "_servizi_v_version_prezzi_pacchetti" CASCADE;
  DROP TABLE "_servizi_v_version_elenco_deliverables" CASCADE;
  DROP TABLE "_servizi_v_version_elenco_for_whom" CASCADE;
  DROP TABLE "_servizi_v_version_elenco_needs" CASCADE;
  DROP TABLE "_servizi_v_version_elenco_faq" CASCADE;
  DROP TABLE "_servizi_v_version_elenco" CASCADE;
  DROP TABLE "_servizi_v" CASCADE;
  DROP TABLE "_metodo_v_version_pagina_scheda" CASCADE;
  DROP TABLE "_metodo_v_version_fasi" CASCADE;
  DROP TABLE "_metodo_v_version_faq" CASCADE;
  DROP TABLE "_metodo_v" CASCADE;
  DROP TABLE "_risultati_v_version_pagina_scheda" CASCADE;
  DROP TABLE "_risultati_v_version_lettura_paragrafi" CASCADE;
  DROP TABLE "_risultati_v_version_numeri" CASCADE;
  DROP TABLE "_risultati_v_version_casi_results" CASCADE;
  DROP TABLE "_risultati_v_version_casi" CASCADE;
  DROP TABLE "_risultati_v_version_testimonianze" CASCADE;
  DROP TABLE "_risultati_v_version_clienti" CASCADE;
  DROP TABLE "_risultati_v" CASCADE;
  DROP TABLE "_chi_sono_v_version_percorso_tappe" CASCADE;
  DROP TABLE "_chi_sono_v_version_credenziali" CASCADE;
  DROP TABLE "_chi_sono_v_version_tecnologia_progetti" CASCADE;
  DROP TABLE "_chi_sono_v" CASCADE;
  DROP TABLE "_contatti_v_version_passi" CASCADE;
  DROP TABLE "_contatti_v_version_modulo_dimensioni" CASCADE;
  DROP TABLE "_contatti_v_version_faq" CASCADE;
  DROP TABLE "_contatti_v" CASCADE;
  DROP TABLE "_generale_v_version_mercati" CASCADE;
  DROP TABLE "_generale_v_version_strumenti" CASCADE;
  DROP TABLE "_generale_v_version_navigazione" CASCADE;
  DROP TABLE "_generale_v" CASCADE;
  DROP INDEX "home__status_idx";
  DROP INDEX "servizi__status_idx";
  DROP INDEX "metodo__status_idx";
  DROP INDEX "risultati__status_idx";
  DROP INDEX "chi_sono__status_idx";
  DROP INDEX "contatti__status_idx";
  DROP INDEX "generale__status_idx";
  ALTER TABLE "home_hero_scheda" ALTER COLUMN "voce" SET NOT NULL;
  ALTER TABLE "home_hero_scheda" ALTER COLUMN "valore" SET NOT NULL;
  ALTER TABLE "home_diagnosi_sintomi" ALTER COLUMN "indice" SET NOT NULL;
  ALTER TABLE "home_diagnosi_sintomi" ALTER COLUMN "titolo" SET NOT NULL;
  ALTER TABLE "home_diagnosi_sintomi" ALTER COLUMN "testo" SET NOT NULL;
  ALTER TABLE "home_chi_sono_paragrafi" ALTER COLUMN "testo" SET DATA TYPE varchar USING (SELECT string_agg(x #>> '{}', ' ') FROM jsonb_path_query("testo", 'strict $.**.text') AS x);
  ALTER TABLE "home_chi_sono_paragrafi" ALTER COLUMN "testo" SET NOT NULL;
  ALTER TABLE "home_contatti_passi" ALTER COLUMN "testo" SET NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "meta_titolo" SET NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "meta_descrizione" SET NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "hero_occhiello" SET NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "hero_titolo" SET NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "hero_sottotitolo" SET NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "hero_pulsante_primario" SET NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "hero_pulsante_secondario" SET NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "clienti_occhiello" SET NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "clienti_nota" SET NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "diagnosi_occhiello" SET NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "diagnosi_titolo" SET NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "diagnosi_commento_grafico" SET NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "diagnosi_commento_grafico_secondario" SET NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "servizi_occhiello" SET NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "servizi_titolo" SET NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "servizi_link" SET NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "risultati_occhiello" SET NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "risultati_titolo" SET NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "risultati_istruzione" SET NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "risultati_nota" SET NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "metodo_occhiello" SET NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "metodo_titolo" SET NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "metodo_sottotitolo" SET NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "metodo_link" SET NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "chi_sono_occhiello" SET NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "chi_sono_titolo" SET NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "chi_sono_immagine_id" SET NOT NULL;
  ALTER TABLE "servizi_pagina_scheda" ALTER COLUMN "voce" SET NOT NULL;
  ALTER TABLE "servizi_pagina_scheda" ALTER COLUMN "valore" SET NOT NULL;
  ALTER TABLE "servizi_prezzi_pacchetti_items" ALTER COLUMN "testo" SET NOT NULL;
  ALTER TABLE "servizi_prezzi_pacchetti" ALTER COLUMN "name" SET NOT NULL;
  ALTER TABLE "servizi_prezzi_pacchetti" ALTER COLUMN "price" SET NOT NULL;
  ALTER TABLE "servizi_prezzi_pacchetti" ALTER COLUMN "unit" SET NOT NULL;
  ALTER TABLE "servizi_prezzi_pacchetti" ALTER COLUMN "duration" SET NOT NULL;
  ALTER TABLE "servizi_prezzi_pacchetti" ALTER COLUMN "body" SET NOT NULL;
  ALTER TABLE "servizi_elenco_deliverables" ALTER COLUMN "testo" SET NOT NULL;
  ALTER TABLE "servizi_elenco_for_whom" ALTER COLUMN "testo" SET NOT NULL;
  ALTER TABLE "servizi_elenco_needs" ALTER COLUMN "testo" SET NOT NULL;
  ALTER TABLE "servizi_elenco_faq" ALTER COLUMN "q" SET NOT NULL;
  ALTER TABLE "servizi_elenco_faq" ALTER COLUMN "a" SET DATA TYPE varchar USING (SELECT string_agg(x #>> '{}', ' ') FROM jsonb_path_query("a", 'strict $.**.text') AS x);
  ALTER TABLE "servizi_elenco_faq" ALTER COLUMN "a" SET NOT NULL;
  ALTER TABLE "servizi_elenco" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "servizi_elenco" ALTER COLUMN "index" SET NOT NULL;
  ALTER TABLE "servizi_elenco" ALTER COLUMN "eyebrow" SET NOT NULL;
  ALTER TABLE "servizi_elenco" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "servizi_elenco" ALTER COLUMN "claim" SET NOT NULL;
  ALTER TABLE "servizi_elenco" ALTER COLUMN "summary" SET NOT NULL;
  ALTER TABLE "servizi_elenco" ALTER COLUMN "lead" SET NOT NULL;
  ALTER TABLE "servizi_elenco" ALTER COLUMN "not_for" SET DATA TYPE varchar USING (SELECT string_agg(x #>> '{}', ' ') FROM jsonb_path_query("not_for", 'strict $.**.text') AS x);
  ALTER TABLE "servizi_elenco" ALTER COLUMN "not_for" SET NOT NULL;
  ALTER TABLE "servizi_elenco" ALTER COLUMN "keyword" SET NOT NULL;
  ALTER TABLE "servizi_elenco" ALTER COLUMN "duration" SET NOT NULL;
  ALTER TABLE "servizi_elenco" ALTER COLUMN "meta_title" SET NOT NULL;
  ALTER TABLE "servizi_elenco" ALTER COLUMN "meta_description" SET NOT NULL;
  ALTER TABLE "servizi" ALTER COLUMN "meta_titolo" SET NOT NULL;
  ALTER TABLE "servizi" ALTER COLUMN "meta_descrizione" SET NOT NULL;
  ALTER TABLE "servizi" ALTER COLUMN "pagina_occhiello" SET NOT NULL;
  ALTER TABLE "servizi" ALTER COLUMN "pagina_titolo" SET NOT NULL;
  ALTER TABLE "servizi" ALTER COLUMN "pagina_sottotitolo" SET NOT NULL;
  ALTER TABLE "servizi" ALTER COLUMN "prezzi_occhiello" SET NOT NULL;
  ALTER TABLE "servizi" ALTER COLUMN "prezzi_titolo" SET NOT NULL;
  ALTER TABLE "servizi" ALTER COLUMN "prezzi_testo" SET DATA TYPE varchar USING (SELECT string_agg(x #>> '{}', ' ') FROM jsonb_path_query("prezzi_testo", 'strict $.**.text') AS x);
  ALTER TABLE "servizi" ALTER COLUMN "prezzi_testo" SET NOT NULL;
  ALTER TABLE "metodo_pagina_scheda" ALTER COLUMN "voce" SET NOT NULL;
  ALTER TABLE "metodo_pagina_scheda" ALTER COLUMN "valore" SET NOT NULL;
  ALTER TABLE "metodo_fasi" ALTER COLUMN "index" SET NOT NULL;
  ALTER TABLE "metodo_fasi" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "metodo_fasi" ALTER COLUMN "duration" SET NOT NULL;
  ALTER TABLE "metodo_fasi" ALTER COLUMN "body" SET NOT NULL;
  ALTER TABLE "metodo_fasi" ALTER COLUMN "detail" SET DATA TYPE varchar USING (SELECT string_agg(x #>> '{}', ' ') FROM jsonb_path_query("detail", 'strict $.**.text') AS x);
  ALTER TABLE "metodo_fasi" ALTER COLUMN "detail" SET NOT NULL;
  ALTER TABLE "metodo_fasi" ALTER COLUMN "output" SET NOT NULL;
  ALTER TABLE "metodo_faq" ALTER COLUMN "q" SET NOT NULL;
  ALTER TABLE "metodo_faq" ALTER COLUMN "a" SET DATA TYPE varchar USING (SELECT string_agg(x #>> '{}', ' ') FROM jsonb_path_query("a", 'strict $.**.text') AS x);
  ALTER TABLE "metodo_faq" ALTER COLUMN "a" SET NOT NULL;
  ALTER TABLE "metodo" ALTER COLUMN "meta_titolo" SET NOT NULL;
  ALTER TABLE "metodo" ALTER COLUMN "meta_descrizione" SET NOT NULL;
  ALTER TABLE "metodo" ALTER COLUMN "pagina_occhiello" SET NOT NULL;
  ALTER TABLE "metodo" ALTER COLUMN "pagina_titolo" SET NOT NULL;
  ALTER TABLE "metodo" ALTER COLUMN "pagina_sottotitolo" SET NOT NULL;
  ALTER TABLE "metodo" ALTER COLUMN "grafico_occhiello" SET NOT NULL;
  ALTER TABLE "metodo" ALTER COLUMN "grafico_titolo" SET NOT NULL;
  ALTER TABLE "metodo" ALTER COLUMN "grafico_testo" SET DATA TYPE varchar USING (SELECT string_agg(x #>> '{}', ' ') FROM jsonb_path_query("grafico_testo", 'strict $.**.text') AS x);
  ALTER TABLE "metodo" ALTER COLUMN "grafico_testo" SET NOT NULL;
  ALTER TABLE "risultati_pagina_scheda" ALTER COLUMN "voce" SET NOT NULL;
  ALTER TABLE "risultati_pagina_scheda" ALTER COLUMN "valore" SET NOT NULL;
  ALTER TABLE "risultati_lettura_paragrafi" ALTER COLUMN "testo" SET DATA TYPE varchar USING (SELECT string_agg(x #>> '{}', ' ') FROM jsonb_path_query("testo", 'strict $.**.text') AS x);
  ALTER TABLE "risultati_lettura_paragrafi" ALTER COLUMN "testo" SET NOT NULL;
  ALTER TABLE "risultati_numeri" ALTER COLUMN "value" SET NOT NULL;
  ALTER TABLE "risultati_numeri" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "risultati_casi_results" ALTER COLUMN "value" SET NOT NULL;
  ALTER TABLE "risultati_casi_results" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "risultati_casi" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "risultati_casi" ALTER COLUMN "client" SET NOT NULL;
  ALTER TABLE "risultati_casi" ALTER COLUMN "units" SET NOT NULL;
  ALTER TABLE "risultati_casi" ALTER COLUMN "market" SET NOT NULL;
  ALTER TABLE "risultati_casi" ALTER COLUMN "horizon" SET NOT NULL;
  ALTER TABLE "risultati_casi" ALTER COLUMN "problem" SET NOT NULL;
  ALTER TABLE "risultati_casi" ALTER COLUMN "action" SET NOT NULL;
  ALTER TABLE "risultati_testimonianze" ALTER COLUMN "quote" SET NOT NULL;
  ALTER TABLE "risultati_testimonianze" ALTER COLUMN "role" SET NOT NULL;
  ALTER TABLE "risultati_testimonianze" ALTER COLUMN "detail" SET NOT NULL;
  ALTER TABLE "risultati_clienti" ALTER COLUMN "name" SET NOT NULL;
  ALTER TABLE "risultati_clienti" ALTER COLUMN "city" SET NOT NULL;
  ALTER TABLE "risultati" ALTER COLUMN "meta_titolo" SET NOT NULL;
  ALTER TABLE "risultati" ALTER COLUMN "meta_descrizione" SET NOT NULL;
  ALTER TABLE "risultati" ALTER COLUMN "pagina_occhiello" SET NOT NULL;
  ALTER TABLE "risultati" ALTER COLUMN "pagina_titolo" SET NOT NULL;
  ALTER TABLE "risultati" ALTER COLUMN "pagina_sottotitolo" SET NOT NULL;
  ALTER TABLE "risultati" ALTER COLUMN "lettura_occhiello" SET NOT NULL;
  ALTER TABLE "risultati" ALTER COLUMN "lettura_titolo" SET NOT NULL;
  ALTER TABLE "risultati" ALTER COLUMN "invito_titolo" SET NOT NULL;
  ALTER TABLE "risultati" ALTER COLUMN "invito_testo" SET NOT NULL;
  ALTER TABLE "chi_sono_percorso_tappe" ALTER COLUMN "anno" SET NOT NULL;
  ALTER TABLE "chi_sono_percorso_tappe" ALTER COLUMN "titolo" SET NOT NULL;
  ALTER TABLE "chi_sono_percorso_tappe" ALTER COLUMN "testo" SET DATA TYPE varchar USING (SELECT string_agg(x #>> '{}', ' ') FROM jsonb_path_query("testo", 'strict $.**.text') AS x);
  ALTER TABLE "chi_sono_percorso_tappe" ALTER COLUMN "testo" SET NOT NULL;
  ALTER TABLE "chi_sono_credenziali" ALTER COLUMN "voce" SET NOT NULL;
  ALTER TABLE "chi_sono_credenziali" ALTER COLUMN "valore" SET NOT NULL;
  ALTER TABLE "chi_sono_tecnologia_progetti" ALTER COLUMN "stato" SET NOT NULL;
  ALTER TABLE "chi_sono_tecnologia_progetti" ALTER COLUMN "titolo" SET NOT NULL;
  ALTER TABLE "chi_sono_tecnologia_progetti" ALTER COLUMN "testo" SET NOT NULL;
  ALTER TABLE "chi_sono" ALTER COLUMN "meta_titolo" SET NOT NULL;
  ALTER TABLE "chi_sono" ALTER COLUMN "meta_descrizione" SET NOT NULL;
  ALTER TABLE "chi_sono" ALTER COLUMN "pagina_occhiello" SET NOT NULL;
  ALTER TABLE "chi_sono" ALTER COLUMN "pagina_titolo" SET NOT NULL;
  ALTER TABLE "chi_sono" ALTER COLUMN "pagina_sottotitolo" SET NOT NULL;
  ALTER TABLE "chi_sono" ALTER COLUMN "foto_immagine_id" SET NOT NULL;
  ALTER TABLE "chi_sono" ALTER COLUMN "percorso_occhiello" SET NOT NULL;
  ALTER TABLE "chi_sono" ALTER COLUMN "tecnologia_occhiello" SET NOT NULL;
  ALTER TABLE "chi_sono" ALTER COLUMN "tecnologia_titolo" SET NOT NULL;
  ALTER TABLE "chi_sono" ALTER COLUMN "tecnologia_testo" SET DATA TYPE varchar USING (SELECT string_agg(x #>> '{}', ' ') FROM jsonb_path_query("tecnologia_testo", 'strict $.**.text') AS x);
  ALTER TABLE "chi_sono" ALTER COLUMN "tecnologia_testo" SET NOT NULL;
  ALTER TABLE "chi_sono" ALTER COLUMN "tecnologia_collaborazione" SET NOT NULL;
  ALTER TABLE "chi_sono" ALTER COLUMN "testimonianze_occhiello" SET NOT NULL;
  ALTER TABLE "contatti_passi" ALTER COLUMN "testo" SET NOT NULL;
  ALTER TABLE "contatti_modulo_dimensioni" ALTER COLUMN "testo" SET NOT NULL;
  ALTER TABLE "contatti_faq" ALTER COLUMN "q" SET NOT NULL;
  ALTER TABLE "contatti_faq" ALTER COLUMN "a" SET DATA TYPE varchar USING (SELECT string_agg(x #>> '{}', ' ') FROM jsonb_path_query("a", 'strict $.**.text') AS x);
  ALTER TABLE "contatti_faq" ALTER COLUMN "a" SET NOT NULL;
  ALTER TABLE "contatti" ALTER COLUMN "meta_titolo" SET NOT NULL;
  ALTER TABLE "contatti" ALTER COLUMN "meta_descrizione" SET NOT NULL;
  ALTER TABLE "contatti" ALTER COLUMN "pagina_occhiello" SET NOT NULL;
  ALTER TABLE "contatti" ALTER COLUMN "pagina_titolo" SET NOT NULL;
  ALTER TABLE "contatti" ALTER COLUMN "pagina_sottotitolo" SET NOT NULL;
  ALTER TABLE "contatti" ALTER COLUMN "nota" SET NOT NULL;
  ALTER TABLE "contatti" ALTER COLUMN "modulo_etichette_nome" SET NOT NULL;
  ALTER TABLE "contatti" ALTER COLUMN "modulo_etichette_email" SET NOT NULL;
  ALTER TABLE "contatti" ALTER COLUMN "modulo_etichette_azienda" SET NOT NULL;
  ALTER TABLE "contatti" ALTER COLUMN "modulo_etichette_unita" SET NOT NULL;
  ALTER TABLE "contatti" ALTER COLUMN "modulo_etichette_mercato" SET NOT NULL;
  ALTER TABLE "contatti" ALTER COLUMN "modulo_etichette_messaggio" SET NOT NULL;
  ALTER TABLE "contatti" ALTER COLUMN "modulo_segnaposto_email" SET NOT NULL;
  ALTER TABLE "contatti" ALTER COLUMN "modulo_segnaposto_messaggio" SET NOT NULL;
  ALTER TABLE "contatti" ALTER COLUMN "modulo_consenso" SET NOT NULL;
  ALTER TABLE "contatti" ALTER COLUMN "modulo_invia" SET NOT NULL;
  ALTER TABLE "contatti" ALTER COLUMN "modulo_invia_in_corso" SET NOT NULL;
  ALTER TABLE "contatti" ALTER COLUMN "grazie_occhiello" SET NOT NULL;
  ALTER TABLE "contatti" ALTER COLUMN "grazie_titolo" SET NOT NULL;
  ALTER TABLE "contatti" ALTER COLUMN "grazie_testo" SET NOT NULL;
  ALTER TABLE "generale_mercati" ALTER COLUMN "testo" SET NOT NULL;
  ALTER TABLE "generale_strumenti" ALTER COLUMN "testo" SET NOT NULL;
  ALTER TABLE "generale_navigazione" ALTER COLUMN "href" SET NOT NULL;
  ALTER TABLE "generale_navigazione" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "generale" ALTER COLUMN "identita_nome" SET NOT NULL;
  ALTER TABLE "generale" ALTER COLUMN "identita_monogramma" SET NOT NULL;
  ALTER TABLE "generale" ALTER COLUMN "identita_ruolo" SET NOT NULL;
  ALTER TABLE "generale" ALTER COLUMN "identita_tagline" SET NOT NULL;
  ALTER TABLE "generale" ALTER COLUMN "identita_url" SET NOT NULL;
  ALTER TABLE "generale" ALTER COLUMN "identita_descrizione" SET NOT NULL;
  ALTER TABLE "generale" ALTER COLUMN "contatti_email" SET NOT NULL;
  ALTER TABLE "generale" ALTER COLUMN "contatti_telefono" SET NOT NULL;
  ALTER TABLE "generale" ALTER COLUMN "contatti_telefono_href" SET NOT NULL;
  ALTER TABLE "generale" ALTER COLUMN "contatti_linkedin" SET NOT NULL;
  ALTER TABLE "generale" ALTER COLUMN "legale_entita" SET NOT NULL;
  ALTER TABLE "generale" ALTER COLUMN "legale_partita_iva" SET NOT NULL;
  ALTER TABLE "generale" ALTER COLUMN "legale_citta" SET NOT NULL;
  ALTER TABLE "generale" ALTER COLUMN "legale_paese" SET NOT NULL;
  ALTER TABLE "generale" ALTER COLUMN "footer_descrizione" SET NOT NULL;
  ALTER TABLE "generale" ALTER COLUMN "invito_finale_occhiello" SET NOT NULL;
  ALTER TABLE "generale" ALTER COLUMN "invito_finale_titolo" SET NOT NULL;
  ALTER TABLE "generale" ALTER COLUMN "invito_finale_testo" SET NOT NULL;
  ALTER TABLE "generale" ALTER COLUMN "invito_finale_pulsante" SET NOT NULL;
  ALTER TABLE "generale" ALTER COLUMN "intestazione_pulsante" SET NOT NULL;
  ALTER TABLE "home" DROP COLUMN "_status";
  ALTER TABLE "servizi" DROP COLUMN "_status";
  ALTER TABLE "metodo" DROP COLUMN "_status";
  ALTER TABLE "risultati" DROP COLUMN "_status";
  ALTER TABLE "chi_sono" DROP COLUMN "_status";
  ALTER TABLE "contatti" DROP COLUMN "_status";
  ALTER TABLE "generale" DROP COLUMN "_status";
  DROP TYPE "public"."enum_home_ordine_sezione";
  DROP TYPE "public"."enum_home_status";
  DROP TYPE "public"."enum__home_v_version_ordine_sezione";
  DROP TYPE "public"."enum__home_v_version_status";
  DROP TYPE "public"."enum_servizi_status";
  DROP TYPE "public"."enum__servizi_v_version_elenco_diagram";
  DROP TYPE "public"."enum__servizi_v_version_status";
  DROP TYPE "public"."enum_metodo_status";
  DROP TYPE "public"."enum__metodo_v_version_status";
  DROP TYPE "public"."enum_risultati_status";
  DROP TYPE "public"."enum__risultati_v_version_status";
  DROP TYPE "public"."enum_chi_sono_status";
  DROP TYPE "public"."enum__chi_sono_v_version_status";
  DROP TYPE "public"."enum_contatti_status";
  DROP TYPE "public"."enum__contatti_v_version_status";
  DROP TYPE "public"."enum_generale_status";
  DROP TYPE "public"."enum__generale_v_version_status";`)
}
