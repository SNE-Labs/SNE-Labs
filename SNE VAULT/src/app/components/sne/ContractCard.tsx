import { FileText, ExternalLink, CheckCircle2, Copy } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { useState } from 'react';

interface ContractCardProps {
  name: string;
  address: string;
  chain: string;
  verified: boolean;
  deployedAt: string;
  abi?: string;
}

export function ContractCard({ name, address, chain, verified, deployedAt, abi }: ContractCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="rounded border p-6 transition-all hover:border-opacity-100"
      style={{
        backgroundColor: 'var(--sne-surface-1)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded flex items-center justify-center"
            style={{
              backgroundColor: 'var(--sne-surface-elevated)',
              border: '1px solid var(--border)',
            }}
          >
            <FileText className="w-5 h-5" style={{ color: 'var(--sne-accent)' }} />
          </div>
          <div>
            <h3 className="mb-1" style={{ color: 'var(--sne-text-primary)' }}>
              {name}
            </h3>
            <span
              className="px-2 py-0.5 rounded"
              style={{
                fontSize: 'var(--text-small)',
                backgroundColor: 'var(--sne-surface-elevated)',
                color: 'var(--sne-text-secondary)',
                fontFamily: 'var(--font-family-mono)',
              }}
            >
              {chain}
            </span>
          </div>
        </div>
        {verified && <StatusBadge status="success">Verificado</StatusBadge>}
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span style={{ fontSize: 'var(--text-small)', color: 'var(--sne-text-secondary)' }}>
            Endereço
          </span>
          <button
            onClick={handleCopy}
            className="p-1 rounded transition-colors"
            style={{ color: copied ? 'var(--sne-success)' : 'var(--sne-text-secondary)' }}
          >
            <Copy className="w-3 h-3" />
          </button>
        </div>
        <code
          className="block"
          style={{
            fontFamily: 'var(--font-family-mono)',
            fontSize: 'var(--text-code)',
            color: 'var(--sne-text-primary)',
            wordBreak: 'break-all',
          }}
        >
          {address}
        </code>
      </div>

      <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
        <span style={{ fontSize: 'var(--text-small)', color: 'var(--sne-text-secondary)' }}>
          Deployed {deployedAt}
        </span>
        <div className="flex items-center gap-2">
          {abi && (
            <a
              href={abi}
              className="flex items-center gap-1 px-3 py-1.5 rounded transition-colors"
              style={{
                fontSize: 'var(--text-small)',
                color: 'var(--sne-text-primary)',
                backgroundColor: 'var(--sne-surface-elevated)',
              }}
            >
              ABI
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
          <a
            href={`https://scrollscan.com/address/${address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 rounded transition-colors"
            style={{
              fontSize: 'var(--text-small)',
              color: 'var(--sne-accent)',
              border: '1px solid var(--border)',
            }}
          >
            Explorer
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
