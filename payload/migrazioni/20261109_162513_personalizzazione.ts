import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "home" ADD COLUMN "hero_sfondo_id" integer;
  ALTER TABLE "home" ADD COLUMN "diagnosi_immagine_grafico_id" integer;
  ALTER TABLE "_home_v" ADD COLUMN "version_hero_sfondo_id" integer;
  ALTER TABLE "_home_v" ADD COLUMN "version_diagnosi_immagine_grafico_id" integer;
  ALTER TABLE "servizi_elenco" ADD COLUMN "mostra_per_chi_non_e" boolean DEFAULT false;
  ALTER TABLE "_servizi_v_version_elenco" ADD COLUMN "mostra_per_chi_non_e" boolean DEFAULT false;
  ALTER TABLE "metodo" ADD COLUMN "grafico_immagine_id" integer;
  ALTER TABLE "_metodo_v" ADD COLUMN "version_grafico_immagine_id" integer;
  ALTER TABLE "risultati" ADD COLUMN "lettura_mostra" boolean DEFAULT false;
  ALTER TABLE "_risultati_v" ADD COLUMN "version_lettura_mostra" boolean DEFAULT false;
  ALTER TABLE "home" ADD CONSTRAINT "home_hero_sfondo_id_media_id_fk" FOREIGN KEY ("hero_sfondo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_diagnosi_immagine_grafico_id_media_id_fk" FOREIGN KEY ("diagnosi_immagine_grafico_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_hero_sfondo_id_media_id_fk" FOREIGN KEY ("version_hero_sfondo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_diagnosi_immagine_grafico_id_media_id_fk" FOREIGN KEY ("version_diagnosi_immagine_grafico_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "metodo" ADD CONSTRAINT "metodo_grafico_immagine_id_media_id_fk" FOREIGN KEY ("grafico_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_metodo_v" ADD CONSTRAINT "_metodo_v_version_grafico_immagine_id_media_id_fk" FOREIGN KEY ("version_grafico_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "home_hero_hero_sfondo_idx" ON "home" USING btree ("hero_sfondo_id");
  CREATE INDEX "home_diagnosi_diagnosi_immagine_grafico_idx" ON "home" USING btree ("diagnosi_immagine_grafico_id");
  CREATE INDEX "_home_v_version_hero_version_hero_sfondo_idx" ON "_home_v" USING btree ("version_hero_sfondo_id");
  CREATE INDEX "_home_v_version_diagnosi_version_diagnosi_immagine_grafi_idx" ON "_home_v" USING btree ("version_diagnosi_immagine_grafico_id");
  CREATE INDEX "metodo_grafico_grafico_immagine_idx" ON "metodo" USING btree ("grafico_immagine_id");
  CREATE INDEX "_metodo_v_version_grafico_version_grafico_immagine_idx" ON "_metodo_v" USING btree ("version_grafico_immagine_id");`)

  /* Il piè di pagina prima aggiungeva dal codice "Verona, Milano, Torino e
     remoto." dopo il testo del pannello. Ora mostra solo il testo del
     pannello: la frase la si sposta li', cosi' il sito resta identico e
     Lucrezia la vede e la puo' cambiare. Sia nel testo pubblicato sia
     nell'ultima versione, che e' quella che il pannello apre. */
  await db.execute(sql`
   UPDATE "generale"
     SET "footer_descrizione" = rtrim("footer_descrizione") || ' Verona, Milano, Torino e remoto.'
     WHERE "footer_descrizione" NOT ILIKE '%remoto%';
   UPDATE "_generale_v"
     SET "version_footer_descrizione" = rtrim("version_footer_descrizione") || ' Verona, Milano, Torino e remoto.'
     WHERE "latest" = true AND "version_footer_descrizione" NOT ILIKE '%remoto%';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "home" DROP CONSTRAINT "home_hero_sfondo_id_media_id_fk";
  
  ALTER TABLE "home" DROP CONSTRAINT "home_diagnosi_immagine_grafico_id_media_id_fk";
  
  ALTER TABLE "_home_v" DROP CONSTRAINT "_home_v_version_hero_sfondo_id_media_id_fk";
  
  ALTER TABLE "_home_v" DROP CONSTRAINT "_home_v_version_diagnosi_immagine_grafico_id_media_id_fk";
  
  ALTER TABLE "metodo" DROP CONSTRAINT "metodo_grafico_immagine_id_media_id_fk";
  
  ALTER TABLE "_metodo_v" DROP CONSTRAINT "_metodo_v_version_grafico_immagine_id_media_id_fk";
  
  DROP INDEX "home_hero_hero_sfondo_idx";
  DROP INDEX "home_diagnosi_diagnosi_immagine_grafico_idx";
  DROP INDEX "_home_v_version_hero_version_hero_sfondo_idx";
  DROP INDEX "_home_v_version_diagnosi_version_diagnosi_immagine_grafi_idx";
  DROP INDEX "metodo_grafico_grafico_immagine_idx";
  DROP INDEX "_metodo_v_version_grafico_version_grafico_immagine_idx";
  ALTER TABLE "home" DROP COLUMN "hero_sfondo_id";
  ALTER TABLE "home" DROP COLUMN "diagnosi_immagine_grafico_id";
  ALTER TABLE "_home_v" DROP COLUMN "version_hero_sfondo_id";
  ALTER TABLE "_home_v" DROP COLUMN "version_diagnosi_immagine_grafico_id";
  ALTER TABLE "servizi_elenco" DROP COLUMN "mostra_per_chi_non_e";
  ALTER TABLE "_servizi_v_version_elenco" DROP COLUMN "mostra_per_chi_non_e";
  ALTER TABLE "metodo" DROP COLUMN "grafico_immagine_id";
  ALTER TABLE "_metodo_v" DROP COLUMN "version_grafico_immagine_id";
  ALTER TABLE "risultati" DROP COLUMN "lettura_mostra";
  ALTER TABLE "_risultati_v" DROP COLUMN "version_lettura_mostra";`)
}
