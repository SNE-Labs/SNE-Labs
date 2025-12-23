import { useGasPrice } from '../../hooks/usePassportData';
import { Skeleton } from '../../app/components/ui/skeleton';
import { Zap } from 'lucide-react';

/**
 * Componente para exibir preço de gas atual
 * PoC para Sprint 1
 */
export function GasTracker() {
  const { data: gas, isLoading, error } = useGasPrice();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4" style={{ color: 'var(--sne-text-secondary)' }} />
        <Skeleton className="h-4 w-16" />
      </div>
    );
  }

  if (error || !gas) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded" style={{ backgroundColor: 'var(--sne-surface-1)' }}>
      <Zap className="w-4 h-4" style={{ color: 'var(--sne-accent)' }} />
      <span style={{ color: 'var(--sne-text-primary)', fontSize: '0.9rem' }}>
        {gas.formatted.gasPrice}
      </span>
    </div>
  );
}

