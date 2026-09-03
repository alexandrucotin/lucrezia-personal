import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* La procedura guidata di Keystatic reindirizza a 127.0.0.1, che GitHub
     accetta come callback OAuth. Senza questa riga Next blocca le risorse di
     sviluppo servite a quell'origine e il pannello resta una pagina bianca.
     Vale solo per `next dev`. */
  allowedDevOrigins: ["127.0.0.1"],
}

export default nextConfig
