/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USE_BACKEND?: string;
  readonly VITE_SNE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

