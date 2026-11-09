import { withPayload } from "@payloadcms/next/withPayload"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: {
    /* Da Next 16.3 Turbopack salva una cache del build su disco, e dentro ci
       finiscono le variabili d'ambiente lette durante il build, chiavi di R2
       comprese. Il controllo dei segreti di Netlify la trova e blocca il
       deploy. Su Netlify la cache non accelera quasi niente: la si spegne. */
    turbopackFileSystemCacheForBuild: false,
  },
  images: {
    /* Le foto della libreria le serve Payload da /api/media/file/...;
       quelle fisse del sito stanno in /images. */
    localPatterns: [{ pathname: "/api/media/file/**" }, { pathname: "/images/**" }],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
