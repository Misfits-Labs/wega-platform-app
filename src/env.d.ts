/// <reference types="vite/client" />

 interface ImportMetaEnv {
 readonly VITE_APP_TITLE: string
 readonly VITE_BACKEND_API_URL: string;
 readonly NPM_TOKEN: string;
 readonly GSAP_TOKEN: string;
 readonly VITE_RPC_PROVIDER_ALCHEMY: string;
 readonly VITE_WALLET_CONNECT_ID: string;

 readonly VITE_FIREBASE_API_KEY: string
 readonly VITE_FIREBASE_AUTH_DOMAIN: string
 readonly VITE_FIREBASE_DB_URL: string
 readonly VITE_FIREBASE_PROJECT_ID: string
 readonly VITE_FIREBASE_STORAGE_BUCKET: string
 readonly VITE_FIREBASE_MESSAGING_SENDER_ID: number;
 readonly VITE_FIREBASE_APP_ID: string
 // more env variables...
}

interface ImportMeta {
 readonly env: ImportMetaEnv
}

interface Window {
  ethereum?: any
}
