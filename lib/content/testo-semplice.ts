import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { convertLexicalToPlaintext } from "@payloadcms/richtext-lexical/plaintext";

/** Il testo senza formattazione, per i dati strutturati e i metadati. */
export function testoSemplice(data: SerializedEditorState): string {
  return convertLexicalToPlaintext({ data }).replace(/\s+/g, " ").trim();
}
