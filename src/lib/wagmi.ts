import { createConfig, http } from 'wagmi';
import { scroll } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';
import { walletConnect } from 'wagmi/connectors';

// WalletConnect Project ID - pode ser configurado via env
const WALLETCONNECT_PROJECT_ID = 
  (import.meta.env?.VITE_WALLETCONNECT_PROJECT_ID as string | undefined) ?? '';

// Scroll RPC URL - pode ser configurado via env
const SCROLL_RPC_URL = 
  (import.meta.env?.VITE_SCROLL_RPC_URL as string | undefined) ?? 'https://rpc.scroll.io';

export const wagmiConfig = createConfig({
  chains: [scroll],
  connectors: [
    injected(),
    ...(WALLETCONNECT_PROJECT_ID ? [walletConnect({ 
      projectId: WALLETCONNECT_PROJECT_ID 
    })] : []),
  ],
  transports: {
    [scroll.id]: http(SCROLL_RPC_URL),
  },
});

