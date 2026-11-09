import { withPayload } from "@payloadcms/next/withPayload"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    /* Le foto della libreria le serve Payload da /api/media/file/...;
       quelle fisse del sito stanno in /images. */
    localPatterns: [{ pathname: "/api/media/file/**" }, { pathname: "/images/**" }],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
