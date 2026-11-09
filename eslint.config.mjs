import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // File generati da Payload: si rigenerano, non si toccano a mano.
    "app/(payload)/**",
    "payload/payload-types.ts",
    "payload/migrazioni/**",
  ]),
]);

export default eslintConfig;
