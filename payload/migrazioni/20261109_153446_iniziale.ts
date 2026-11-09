import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_servizi_elenco_diagram" AS ENUM('matrix', 'calendar', 'kpi');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "home_hero_scheda" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"voce" varchar NOT NULL,
  	"valore" varchar NOT NULL
  );
  
  CREATE TABLE "home_diagnosi_sintomi" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"indice" varchar NOT NULL,
  	"titolo" varchar NOT NULL,
  	"testo" varchar NOT NULL
  );
  
  CREATE TABLE "home_chi_sono_paragrafi" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"testo" varchar NOT NULL
  );
  
  CREATE TABLE "home_contatti_passi" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"testo" varchar NOT NULL
  );
  
  CREATE TABLE "home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"meta_titolo" varchar NOT NULL,
  	"meta_descrizione" varchar NOT NULL,
  	"hero_occhiello" varchar NOT NULL,
  	"hero_titolo" varchar NOT NULL,
  	"hero_titolo_evidenziato" varchar,
  	"hero_sottotitolo" varchar NOT NULL,
  	"hero_pulsante_primario" varchar NOT NULL,
  	"hero_pulsante_secondario" varchar NOT NULL,
  	"clienti_occhiello" varchar NOT NULL,
  	"clienti_nota" varchar NOT NULL,
  	"diagnosi_occhiello" varchar NOT NULL,
  	"diagnosi_titolo" varchar NOT NULL,
  	"diagnosi_commento_grafico" varchar NOT NULL,
  	"diagnosi_commento_grafico_secondario" varchar NOT NULL,
  	"servizi_occhiello" varchar NOT NULL,
  	"servizi_titolo" varchar NOT NULL,
  	"servizi_link" varchar NOT NULL,
  	"risultati_occhiello" varchar NOT NULL,
  	"risultati_titolo" varchar NOT NULL,
  	"risultati_istruzione" varchar NOT NULL,
  	"risultati_nota" varchar NOT NULL,
  	"metodo_occhiello" varchar NOT NULL,
  	"metodo_titolo" varchar NOT NULL,
  	"metodo_sottotitolo" varchar NOT NULL,
  	"metodo_link" varchar NOT NULL,
  	"chi_sono_occhiello" varchar NOT NULL,
  	"chi_sono_titolo" varchar NOT NULL,
  	"chi_sono_immagine_id" integer NOT NULL,
  	"chi_sono_immagine_descrizione" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "servizi_pagina_scheda" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"voce" varchar NOT NULL,
  	"valore" varchar NOT NULL
  );
  
  CREATE TABLE "servizi_prezzi_pacchetti_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"testo" varchar NOT NULL
  );
  
  CREATE TABLE "servizi_prezzi_pacchetti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"price" varchar NOT NULL,
  	"unit" varchar NOT NULL,
  	"duration" varchar NOT NULL,
  	"body" varchar NOT NULL,
  	"highlight" boolean DEFAULT false
  );
  
  CREATE TABLE "servizi_elenco_deliverables" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"testo" varchar NOT NULL
  );
  
  CREATE TABLE "servizi_elenco_for_whom" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"testo" varchar NOT NULL
  );
  
  CREATE TABLE "servizi_elenco_needs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"testo" varchar NOT NULL
  );
  
  CREATE TABLE "servizi_elenco_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar NOT NULL,
  	"a" varchar NOT NULL
  );
  
  CREATE TABLE "servizi_elenco" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"index" varchar NOT NULL,
  	"eyebrow" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"claim" varchar NOT NULL,
  	"summary" varchar NOT NULL,
  	"lead" varchar NOT NULL,
  	"not_for" varchar NOT NULL,
  	"diagram" "enum_servizi_elenco_diagram",
  	"keyword" varchar NOT NULL,
  	"duration" varchar NOT NULL,
  	"meta_title" varchar NOT NULL,
  	"meta_description" varchar NOT NULL
  );
  
  CREATE TABLE "servizi" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"meta_titolo" varchar NOT NULL,
  	"meta_descrizione" varchar NOT NULL,
  	"pagina_occhiello" varchar NOT NULL,
  	"pagina_titolo" varchar NOT NULL,
  	"pagina_sottotitolo" varchar NOT NULL,
  	"prezzi_occhiello" varchar NOT NULL,
  	"prezzi_titolo" varchar NOT NULL,
  	"prezzi_testo" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "metodo_pagina_scheda" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"voce" varchar NOT NULL,
  	"valore" varchar NOT NULL
  );
  
  CREATE TABLE "metodo_fasi" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"index" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"duration" varchar NOT NULL,
  	"body" varchar NOT NULL,
  	"detail" varchar NOT NULL,
  	"output" varchar NOT NULL
  );
  
  CREATE TABLE "metodo_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar NOT NULL,
  	"a" varchar NOT NULL
  );
  
  CREATE TABLE "metodo" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"meta_titolo" varchar NOT NULL,
  	"meta_descrizione" varchar NOT NULL,
  	"pagina_occhiello" varchar NOT NULL,
  	"pagina_titolo" varchar NOT NULL,
  	"pagina_sottotitolo" varchar NOT NULL,
  	"grafico_occhiello" varchar NOT NULL,
  	"grafico_titolo" varchar NOT NULL,
  	"grafico_testo" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "risultati_pagina_scheda" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"voce" varchar NOT NULL,
  	"valore" varchar NOT NULL
  );
  
  CREATE TABLE "risultati_lettura_paragrafi" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"testo" varchar NOT NULL
  );
  
  CREATE TABLE "risultati_numeri" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"note" varchar
  );
  
  CREATE TABLE "risultati_casi_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "risultati_casi" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"client" varchar NOT NULL,
  	"units" numeric NOT NULL,
  	"market" varchar NOT NULL,
  	"horizon" varchar NOT NULL,
  	"problem" varchar NOT NULL,
  	"action" varchar NOT NULL,
  	"quote" varchar
  );
  
  CREATE TABLE "risultati_testimonianze" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"detail" varchar NOT NULL
  );
  
  CREATE TABLE "risultati_clienti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"city" varchar NOT NULL
  );
  
  CREATE TABLE "risultati" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"meta_titolo" varchar NOT NULL,
  	"meta_descrizione" varchar NOT NULL,
  	"pagina_occhiello" varchar NOT NULL,
  	"pagina_titolo" varchar NOT NULL,
  	"pagina_sottotitolo" varchar NOT NULL,
  	"lettura_occhiello" varchar NOT NULL,
  	"lettura_titolo" varchar NOT NULL,
  	"invito_titolo" varchar NOT NULL,
  	"invito_testo" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "chi_sono_percorso_tappe" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anno" varchar NOT NULL,
  	"titolo" varchar NOT NULL,
  	"testo" varchar NOT NULL
  );
  
  CREATE TABLE "chi_sono_credenziali" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"voce" varchar NOT NULL,
  	"valore" varchar NOT NULL
  );
  
  CREATE TABLE "chi_sono_tecnologia_progetti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"stato" varchar NOT NULL,
  	"titolo" varchar NOT NULL,
  	"testo" varchar NOT NULL
  );
  
  CREATE TABLE "chi_sono" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"meta_titolo" varchar NOT NULL,
  	"meta_descrizione" varchar NOT NULL,
  	"pagina_occhiello" varchar NOT NULL,
  	"pagina_titolo" varchar NOT NULL,
  	"pagina_sottotitolo" varchar NOT NULL,
  	"foto_immagine_id" integer NOT NULL,
  	"foto_descrizione" varchar,
  	"percorso_occhiello" varchar NOT NULL,
  	"tecnologia_occhiello" varchar NOT NULL,
  	"tecnologia_titolo" varchar NOT NULL,
  	"tecnologia_testo" varchar NOT NULL,
  	"tecnologia_collaborazione" varchar NOT NULL,
  	"testimonianze_occhiello" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contatti_passi" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"testo" varchar NOT NULL
  );
  
  CREATE TABLE "contatti_modulo_dimensioni" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"testo" varchar NOT NULL
  );
  
  CREATE TABLE "contatti_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar NOT NULL,
  	"a" varchar NOT NULL
  );
  
  CREATE TABLE "contatti" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"meta_titolo" varchar NOT NULL,
  	"meta_descrizione" varchar NOT NULL,
  	"pagina_occhiello" varchar NOT NULL,
  	"pagina_titolo" varchar NOT NULL,
  	"pagina_sottotitolo" varchar NOT NULL,
  	"nota" varchar NOT NULL,
  	"modulo_etichette_nome" varchar NOT NULL,
  	"modulo_etichette_email" varchar NOT NULL,
  	"modulo_etichette_azienda" varchar NOT NULL,
  	"modulo_etichette_unita" varchar NOT NULL,
  	"modulo_etichette_mercato" varchar NOT NULL,
  	"modulo_etichette_messaggio" varchar NOT NULL,
  	"modulo_segnaposto_email" varchar NOT NULL,
  	"modulo_segnaposto_messaggio" varchar NOT NULL,
  	"modulo_consenso" varchar NOT NULL,
  	"modulo_invia" varchar NOT NULL,
  	"modulo_invia_in_corso" varchar NOT NULL,
  	"grazie_occhiello" varchar NOT NULL,
  	"grazie_titolo" varchar NOT NULL,
  	"grazie_testo" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "generale_mercati" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"testo" varchar NOT NULL
  );
  
  CREATE TABLE "generale_strumenti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"testo" varchar NOT NULL
  );
  
  CREATE TABLE "generale_navigazione" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "generale" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"identita_nome" varchar NOT NULL,
  	"identita_monogramma" varchar NOT NULL,
  	"identita_ruolo" varchar NOT NULL,
  	"identita_tagline" varchar NOT NULL,
  	"identita_url" varchar NOT NULL,
  	"identita_descrizione" varchar NOT NULL,
  	"contatti_email" varchar NOT NULL,
  	"contatti_telefono" varchar NOT NULL,
  	"contatti_telefono_href" varchar NOT NULL,
  	"contatti_linkedin" varchar NOT NULL,
  	"legale_entita" varchar NOT NULL,
  	"legale_partita_iva" varchar NOT NULL,
  	"legale_citta" varchar NOT NULL,
  	"legale_paese" varchar NOT NULL,
  	"footer_descrizione" varchar NOT NULL,
  	"invito_finale_occhiello" varchar NOT NULL,
  	"invito_finale_titolo" varchar NOT NULL,
  	"invito_finale_testo" varchar NOT NULL,
  	"invito_finale_pulsante" varchar NOT NULL,
  	"intestazione_pulsante" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_hero_scheda" ADD CONSTRAINT "home_hero_scheda_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_diagnosi_sintomi" ADD CONSTRAINT "home_diagnosi_sintomi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_chi_sono_paragrafi" ADD CONSTRAINT "home_chi_sono_paragrafi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_contatti_passi" ADD CONSTRAINT "home_contatti_passi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_chi_sono_immagine_id_media_id_fk" FOREIGN KEY ("chi_sono_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "servizi_pagina_scheda" ADD CONSTRAINT "servizi_pagina_scheda_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."servizi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "servizi_prezzi_pacchetti_items" ADD CONSTRAINT "servizi_prezzi_pacchetti_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."servizi_prezzi_pacchetti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "servizi_prezzi_pacchetti" ADD CONSTRAINT "servizi_prezzi_pacchetti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."servizi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "servizi_elenco_deliverables" ADD CONSTRAINT "servizi_elenco_deliverables_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."servizi_elenco"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "servizi_elenco_for_whom" ADD CONSTRAINT "servizi_elenco_for_whom_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."servizi_elenco"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "servizi_elenco_needs" ADD CONSTRAINT "servizi_elenco_needs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."servizi_elenco"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "servizi_elenco_faq" ADD CONSTRAINT "servizi_elenco_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."servizi_elenco"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "servizi_elenco" ADD CONSTRAINT "servizi_elenco_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."servizi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "metodo_pagina_scheda" ADD CONSTRAINT "metodo_pagina_scheda_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."metodo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "metodo_fasi" ADD CONSTRAINT "metodo_fasi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."metodo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "metodo_faq" ADD CONSTRAINT "metodo_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."metodo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "risultati_pagina_scheda" ADD CONSTRAINT "risultati_pagina_scheda_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."risultati"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "risultati_lettura_paragrafi" ADD CONSTRAINT "risultati_lettura_paragrafi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."risultati"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "risultati_numeri" ADD CONSTRAINT "risultati_numeri_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."risultati"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "risultati_casi_results" ADD CONSTRAINT "risultati_casi_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."risultati_casi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "risultati_casi" ADD CONSTRAINT "risultati_casi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."risultati"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "risultati_testimonianze" ADD CONSTRAINT "risultati_testimonianze_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."risultati"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "risultati_clienti" ADD CONSTRAINT "risultati_clienti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."risultati"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "chi_sono_percorso_tappe" ADD CONSTRAINT "chi_sono_percorso_tappe_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."chi_sono"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "chi_sono_credenziali" ADD CONSTRAINT "chi_sono_credenziali_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."chi_sono"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "chi_sono_tecnologia_progetti" ADD CONSTRAINT "chi_sono_tecnologia_progetti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."chi_sono"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "chi_sono" ADD CONSTRAINT "chi_sono_foto_immagine_id_media_id_fk" FOREIGN KEY ("foto_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contatti_passi" ADD CONSTRAINT "contatti_passi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contatti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contatti_modulo_dimensioni" ADD CONSTRAINT "contatti_modulo_dimensioni_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contatti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contatti_faq" ADD CONSTRAINT "contatti_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contatti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "generale_mercati" ADD CONSTRAINT "generale_mercati_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."generale"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "generale_strumenti" ADD CONSTRAINT "generale_strumenti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."generale"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "generale_navigazione" ADD CONSTRAINT "generale_navigazione_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."generale"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "home_hero_scheda_order_idx" ON "home_hero_scheda" USING btree ("_order");
  CREATE INDEX "home_hero_scheda_parent_id_idx" ON "home_hero_scheda" USING btree ("_parent_id");
  CREATE INDEX "home_diagnosi_sintomi_order_idx" ON "home_diagnosi_sintomi" USING btree ("_order");
  CREATE INDEX "home_diagnosi_sintomi_parent_id_idx" ON "home_diagnosi_sintomi" USING btree ("_parent_id");
  CREATE INDEX "home_chi_sono_paragrafi_order_idx" ON "home_chi_sono_paragrafi" USING btree ("_order");
  CREATE INDEX "home_chi_sono_paragrafi_parent_id_idx" ON "home_chi_sono_paragrafi" USING btree ("_parent_id");
  CREATE INDEX "home_contatti_passi_order_idx" ON "home_contatti_passi" USING btree ("_order");
  CREATE INDEX "home_contatti_passi_parent_id_idx" ON "home_contatti_passi" USING btree ("_parent_id");
  CREATE INDEX "home_chi_sono_chi_sono_immagine_idx" ON "home" USING btree ("chi_sono_immagine_id");
  CREATE INDEX "servizi_pagina_scheda_order_idx" ON "servizi_pagina_scheda" USING btree ("_order");
  CREATE INDEX "servizi_pagina_scheda_parent_id_idx" ON "servizi_pagina_scheda" USING btree ("_parent_id");
  CREATE INDEX "servizi_prezzi_pacchetti_items_order_idx" ON "servizi_prezzi_pacchetti_items" USING btree ("_order");
  CREATE INDEX "servizi_prezzi_pacchetti_items_parent_id_idx" ON "servizi_prezzi_pacchetti_items" USING btree ("_parent_id");
  CREATE INDEX "servizi_prezzi_pacchetti_order_idx" ON "servizi_prezzi_pacchetti" USING btree ("_order");
  CREATE INDEX "servizi_prezzi_pacchetti_parent_id_idx" ON "servizi_prezzi_pacchetti" USING btree ("_parent_id");
  CREATE INDEX "servizi_elenco_deliverables_order_idx" ON "servizi_elenco_deliverables" USING btree ("_order");
  CREATE INDEX "servizi_elenco_deliverables_parent_id_idx" ON "servizi_elenco_deliverables" USING btree ("_parent_id");
  CREATE INDEX "servizi_elenco_for_whom_order_idx" ON "servizi_elenco_for_whom" USING btree ("_order");
  CREATE INDEX "servizi_elenco_for_whom_parent_id_idx" ON "servizi_elenco_for_whom" USING btree ("_parent_id");
  CREATE INDEX "servizi_elenco_needs_order_idx" ON "servizi_elenco_needs" USING btree ("_order");
  CREATE INDEX "servizi_elenco_needs_parent_id_idx" ON "servizi_elenco_needs" USING btree ("_parent_id");
  CREATE INDEX "servizi_elenco_faq_order_idx" ON "servizi_elenco_faq" USING btree ("_order");
  CREATE INDEX "servizi_elenco_faq_parent_id_idx" ON "servizi_elenco_faq" USING btree ("_parent_id");
  CREATE INDEX "servizi_elenco_order_idx" ON "servizi_elenco" USING btree ("_order");
  CREATE INDEX "servizi_elenco_parent_id_idx" ON "servizi_elenco" USING btree ("_parent_id");
  CREATE INDEX "metodo_pagina_scheda_order_idx" ON "metodo_pagina_scheda" USING btree ("_order");
  CREATE INDEX "metodo_pagina_scheda_parent_id_idx" ON "metodo_pagina_scheda" USING btree ("_parent_id");
  CREATE INDEX "metodo_fasi_order_idx" ON "metodo_fasi" USING btree ("_order");
  CREATE INDEX "metodo_fasi_parent_id_idx" ON "metodo_fasi" USING btree ("_parent_id");
  CREATE INDEX "metodo_faq_order_idx" ON "metodo_faq" USING btree ("_order");
  CREATE INDEX "metodo_faq_parent_id_idx" ON "metodo_faq" USING btree ("_parent_id");
  CREATE INDEX "risultati_pagina_scheda_order_idx" ON "risultati_pagina_scheda" USING btree ("_order");
  CREATE INDEX "risultati_pagina_scheda_parent_id_idx" ON "risultati_pagina_scheda" USING btree ("_parent_id");
  CREATE INDEX "risultati_lettura_paragrafi_order_idx" ON "risultati_lettura_paragrafi" USING btree ("_order");
  CREATE INDEX "risultati_lettura_paragrafi_parent_id_idx" ON "risultati_lettura_paragrafi" USING btree ("_parent_id");
  CREATE INDEX "risultati_numeri_order_idx" ON "risultati_numeri" USING btree ("_order");
  CREATE INDEX "risultati_numeri_parent_id_idx" ON "risultati_numeri" USING btree ("_parent_id");
  CREATE INDEX "risultati_casi_results_order_idx" ON "risultati_casi_results" USING btree ("_order");
  CREATE INDEX "risultati_casi_results_parent_id_idx" ON "risultati_casi_results" USING btree ("_parent_id");
  CREATE INDEX "risultati_casi_order_idx" ON "risultati_casi" USING btree ("_order");
  CREATE INDEX "risultati_casi_parent_id_idx" ON "risultati_casi" USING btree ("_parent_id");
  CREATE INDEX "risultati_testimonianze_order_idx" ON "risultati_testimonianze" USING btree ("_order");
  CREATE INDEX "risultati_testimonianze_parent_id_idx" ON "risultati_testimonianze" USING btree ("_parent_id");
  CREATE INDEX "risultati_clienti_order_idx" ON "risultati_clienti" USING btree ("_order");
  CREATE INDEX "risultati_clienti_parent_id_idx" ON "risultati_clienti" USING btree ("_parent_id");
  CREATE INDEX "chi_sono_percorso_tappe_order_idx" ON "chi_sono_percorso_tappe" USING btree ("_order");
  CREATE INDEX "chi_sono_percorso_tappe_parent_id_idx" ON "chi_sono_percorso_tappe" USING btree ("_parent_id");
  CREATE INDEX "chi_sono_credenziali_order_idx" ON "chi_sono_credenziali" USING btree ("_order");
  CREATE INDEX "chi_sono_credenziali_parent_id_idx" ON "chi_sono_credenziali" USING btree ("_parent_id");
  CREATE INDEX "chi_sono_tecnologia_progetti_order_idx" ON "chi_sono_tecnologia_progetti" USING btree ("_order");
  CREATE INDEX "chi_sono_tecnologia_progetti_parent_id_idx" ON "chi_sono_tecnologia_progetti" USING btree ("_parent_id");
  CREATE INDEX "chi_sono_foto_foto_immagine_idx" ON "chi_sono" USING btree ("foto_immagine_id");
  CREATE INDEX "contatti_passi_order_idx" ON "contatti_passi" USING btree ("_order");
  CREATE INDEX "contatti_passi_parent_id_idx" ON "contatti_passi" USING btree ("_parent_id");
  CREATE INDEX "contatti_modulo_dimensioni_order_idx" ON "contatti_modulo_dimensioni" USING btree ("_order");
  CREATE INDEX "contatti_modulo_dimensioni_parent_id_idx" ON "contatti_modulo_dimensioni" USING btree ("_parent_id");
  CREATE INDEX "contatti_faq_order_idx" ON "contatti_faq" USING btree ("_order");
  CREATE INDEX "contatti_faq_parent_id_idx" ON "contatti_faq" USING btree ("_parent_id");
  CREATE INDEX "generale_mercati_order_idx" ON "generale_mercati" USING btree ("_order");
  CREATE INDEX "generale_mercati_parent_id_idx" ON "generale_mercati" USING btree ("_parent_id");
  CREATE INDEX "generale_strumenti_order_idx" ON "generale_strumenti" USING btree ("_order");
  CREATE INDEX "generale_strumenti_parent_id_idx" ON "generale_strumenti" USING btree ("_parent_id");
  CREATE INDEX "generale_navigazione_order_idx" ON "generale_navigazione" USING btree ("_order");
  CREATE INDEX "generale_navigazione_parent_id_idx" ON "generale_navigazione" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "home_hero_scheda" CASCADE;
  DROP TABLE "home_diagnosi_sintomi" CASCADE;
  DROP TABLE "home_chi_sono_paragrafi" CASCADE;
  DROP TABLE "home_contatti_passi" CASCADE;
  DROP TABLE "home" CASCADE;
  DROP TABLE "servizi_pagina_scheda" CASCADE;
  DROP TABLE "servizi_prezzi_pacchetti_items" CASCADE;
  DROP TABLE "servizi_prezzi_pacchetti" CASCADE;
  DROP TABLE "servizi_elenco_deliverables" CASCADE;
  DROP TABLE "servizi_elenco_for_whom" CASCADE;
  DROP TABLE "servizi_elenco_needs" CASCADE;
  DROP TABLE "servizi_elenco_faq" CASCADE;
  DROP TABLE "servizi_elenco" CASCADE;
  DROP TABLE "servizi" CASCADE;
  DROP TABLE "metodo_pagina_scheda" CASCADE;
  DROP TABLE "metodo_fasi" CASCADE;
  DROP TABLE "metodo_faq" CASCADE;
  DROP TABLE "metodo" CASCADE;
  DROP TABLE "risultati_pagina_scheda" CASCADE;
  DROP TABLE "risultati_lettura_paragrafi" CASCADE;
  DROP TABLE "risultati_numeri" CASCADE;
  DROP TABLE "risultati_casi_results" CASCADE;
  DROP TABLE "risultati_casi" CASCADE;
  DROP TABLE "risultati_testimonianze" CASCADE;
  DROP TABLE "risultati_clienti" CASCADE;
  DROP TABLE "risultati" CASCADE;
  DROP TABLE "chi_sono_percorso_tappe" CASCADE;
  DROP TABLE "chi_sono_credenziali" CASCADE;
  DROP TABLE "chi_sono_tecnologia_progetti" CASCADE;
  DROP TABLE "chi_sono" CASCADE;
  DROP TABLE "contatti_passi" CASCADE;
  DROP TABLE "contatti_modulo_dimensioni" CASCADE;
  DROP TABLE "contatti_faq" CASCADE;
  DROP TABLE "contatti" CASCADE;
  DROP TABLE "generale_mercati" CASCADE;
  DROP TABLE "generale_strumenti" CASCADE;
  DROP TABLE "generale_navigazione" CASCADE;
  DROP TABLE "generale" CASCADE;
  DROP TYPE "public"."enum_servizi_elenco_diagram";`)
}
