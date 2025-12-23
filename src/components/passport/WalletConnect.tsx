import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { Button } from '../../app/components/ui/button';
import { Wallet, LogOut } from 'lucide-react';

/**
 * Componente de conexão de wallet
 * PoC para Sprint 1 - integração básica com Wagmi
 */
export function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded" style={{ backgroundColor: 'var(--sne-surface-1)' }}>
          <Wallet className="w-4 h-4" style={{ color: 'var(--sne-accent)' }} />
          <span style={{ color: 'var(--sne-text-primary)', fontSize: '0.9rem' }}>
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        </div>
        <Button
          onClick={() => disconnect()}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Desconectar
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={() => connect({ connector: injected() })}
      disabled={isPending}
      style={{ backgroundColor: 'var(--sne-accent)', color: '#0B0B0B' }}
      className="flex items-center gap-2"
    >
      <Wallet className="w-4 h-4" />
      {isPending ? 'Conectando...' : 'Conectar Wallet'}
    </Button>
  );
}

