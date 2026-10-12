/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_API_URL: string
  readonly VITE_APP_VERSION: string
  // Ajoutez vos variables d'environnement ici
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Types globaux pour l'application
declare global {
  interface Window {
    __APP_VERSION__: string
  }
}

export {}
