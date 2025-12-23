import { useConnectedBalance } from '../../hooks/usePassportData';
import { Skeleton } from '../../app/components/ui/skeleton';
import { Wallet } from 'lucide-react';
import { formatTokenValue } from '../../utils/format';

/**
 * Componente para exibir balance da wallet conectada
 * PoC para Sprint 1
 */
export function BalanceDisplay() {
  const { data: balance, isLoading, error } = useConnectedBalance();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <Wallet className="w-4 h-4" style={{ color: 'var(--sne-text-secondary)' }} />
        <Skeleton className="h-4 w-24" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-sm" style={{ color: 'var(--sne-critical)' }}>
        Erro ao carregar balance
      </div>
    );
  }

  if (!balance) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded" style={{ backgroundColor: 'var(--sne-surface-1)' }}>
      <Wallet className="w-4 h-4" style={{ color: 'var(--sne-accent)' }} />
      <span style={{ color: 'var(--sne-text-primary)', fontWeight: 600, fontFamily: 'var(--font-family-mono)' }}>
        {formatTokenValue(balance.eth.value, 18, 4)} ETH
      </span>
      {balance.tokens && balance.tokens.length > 0 && (
        <span style={{ color: 'var(--sne-text-secondary)', fontSize: '0.85rem' }}>
          +{balance.tokens.length} token{balance.tokens.length > 1 ? 's' : ''}
        </span>
      )}
    </div>
  );
}

