/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly RENDERER_VITE_SENTRY_DSN?: string
  readonly BITQUERY_API_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
