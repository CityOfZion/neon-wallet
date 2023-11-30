/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MAIN_VITE_SENTRY_DSN?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
