import { useState } from 'react';
import { useBalance } from '../../hooks/usePassportData';
import { Skeleton } from '../../app/components/ui/skeleton';
import { Wallet, AlertCircle, Eye, EyeOff } from 'lucide-react';
import type { Address } from '../../types/passport';
import { formatTokenValue } from '../../utils/format';
import { filterSpamTokens, countSpamTokens } from '../../utils/tokenFilter';
import { Button } from '../../app/components/ui/button';

/**
 * Componente para exibir balance de um endereço pesquisado (read-only)
 * Sprint 3 - Balance de endereço pesquisado
 */
interface AddressBalanceProps {
  address: Address | null;
  label?: string;
}

export function AddressBalance({ address, label = 'Balance' }: AddressBalanceProps) {
  const [showSpam, setShowSpam] = useState(false);
  const { data: balance, isLoading, error } = useBalance(address);

  if (!address) {
    return null;
  }

  // Filtrar tokens spam
  const filteredBalance = balance ? filterSpamTokens(balance, showSpam) : null;
  const spamCount = balance ? countSpamTokens(balance) : 0;

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 p-3 rounded" style={{ backgroundColor: 'var(--sne-surface-1)' }}>
        <Wallet className="w-4 h-4" style={{ color: 'var(--sne-text-secondary)' }} />
        <div className="flex-1">
          <div style={{ color: 'var(--sne-text-secondary)', fontSize: '0.85rem' }}>{label}</div>
          <Skeleton className="h-4 w-24 mt-1" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 p-3 rounded" style={{ backgroundColor: 'var(--sne-surface-1)' }}>
        <AlertCircle className="w-4 h-4" style={{ color: 'var(--sne-critical)' }} />
        <span className="text-sm" style={{ color: 'var(--sne-critical)' }}>
          Erro ao carregar balance
        </span>
      </div>
    );
  }

  if (!balance || !filteredBalance) {
    return null;
  }

  return (
    <div className="p-3 rounded border" style={{ backgroundColor: 'var(--sne-surface-1)', borderColor: 'var(--border)' }}>
      <div className="flex items-center gap-2 mb-2">
        <Wallet className="w-4 h-4" style={{ color: 'var(--sne-accent)' }} />
        <span style={{ color: 'var(--sne-text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>
          {label}
        </span>
      </div>
      
      <div className="space-y-1">
        {/* ETH Balance */}
        <div className="flex items-center justify-between">
          <span style={{ color: 'var(--sne-text-secondary)', fontSize: '0.9rem' }}>ETH</span>
          <span style={{ color: 'var(--sne-text-primary)', fontWeight: 600, fontFamily: 'var(--font-family-mono)' }}>
            {formatTokenValue(filteredBalance.eth.value, 18, 4)}
          </span>
        </div>

        {/* Tokens (se houver) */}
        {filteredBalance.tokens && filteredBalance.tokens.length > 0 && (
          <div className="mt-2 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center justify-between mb-2">
              <span style={{ color: 'var(--sne-text-secondary)', fontSize: '0.85rem' }}>
                Tokens ({filteredBalance.tokens.length}
                {balance.tokens && balance.tokens.length > filteredBalance.tokens.length && (
                  <span style={{ color: 'var(--sne-text-secondary)', opacity: 0.7 }}>
                    {' '}/ {balance.tokens.length} total
                  </span>
                )})
              </span>
              {spamCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSpam(!showSpam)}
                  className="h-6 px-2 text-xs"
                >
                  {showSpam ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  <span className="ml-1">{showSpam ? 'Ocultar' : 'Mostrar'} spam ({spamCount})</span>
                </Button>
              )}
            </div>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {filteredBalance.tokens.slice(0, 5).map((token, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span style={{ 
                    color: token.spam ? 'var(--sne-text-secondary)' : 'var(--sne-text-primary)', 
                    fontSize: '0.85rem',
                    opacity: token.spam ? 0.6 : 1
                  }}>
                    {token.symbol}
                    {token.spam && <span className="ml-1 text-xs" style={{ color: 'var(--sne-text-secondary)' }}>(spam)</span>}
                  </span>
                  <span style={{ 
                    color: token.spam ? 'var(--sne-text-secondary)' : 'var(--sne-text-primary)', 
                    fontSize: '0.85rem', 
                    fontFamily: 'var(--font-family-mono)',
                    opacity: token.spam ? 0.6 : 1
                  }}>
                    {formatTokenValue(token.balance, token.decimals, 4)}
                  </span>
                </div>
              ))}
              {filteredBalance.tokens.length > 5 && (
                <div style={{ color: 'var(--sne-text-secondary)', fontSize: '0.8rem', fontStyle: 'italic' }}>
                  +{filteredBalance.tokens.length - 5} mais
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

