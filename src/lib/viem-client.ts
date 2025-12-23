import { createPublicClient, http } from 'viem';
import { scroll } from 'viem/chains';

// Scroll RPC URL - pode ser configurado via env
const SCROLL_RPC_URL = 
  (import.meta.env?.VITE_SCROLL_RPC_URL as string | undefined) ?? 'https://rpc.scroll.io';

/**
 * Cliente Viem público para leituras on-chain
 * Usado para ler dados de contratos sem necessidade de wallet
 */
export const publicClient = createPublicClient({
  chain: scroll,
  transport: http(SCROLL_RPC_URL),
});

