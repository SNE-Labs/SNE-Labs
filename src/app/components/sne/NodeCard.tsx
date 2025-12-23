import { Activity, AlertTriangle, Shield, Zap } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { Button } from '../ui/button';

interface NodeCardProps {
  node: {
    id: string;
    name: string;
    status: 'active' | 'offline' | 'violated';
    lastProof: string;
    heartbeat: number;
    uptime: number;
    proofs: number;
  };
  onViewDetails?: () => void;
}

export function NodeCard({ node, onViewDetails }: NodeCardProps) {
  const statusMap = {
    active: 'active' as const,
    offline: 'offline' as const,
    violated: 'violated' as const,
  };

  return (
    <div
      className="rounded border p-6 transition-all duration-200 hover:border-opacity-100 relative overflow-hidden"
      style={{
        backgroundColor: 'var(--sne-surface-1)',
        borderColor: 'var(--border)',
      }}
    >
      {/* Heartbeat pulse animation for active nodes */}
      {node.status === 'active' && (
        <div
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
          style={{
            backgroundColor: 'var(--sne-success)',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }}
        />
      )}
      
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded flex items-center justify-center"
            style={{
              backgroundColor: 'var(--sne-surface-elevated)',
              border: '1px solid var(--border)',
            }}
          >
            <Shield className="w-5 h-5" style={{ color: 'var(--sne-accent)' }} />
          </div>
          <div>
            <h3 className="mb-1" style={{ color: 'var(--sne-text-primary)' }}>
              {node.name}
            </h3>
            <code
              className="block"
              style={{
                fontFamily: 'var(--font-family-mono)',
                fontSize: 'var(--text-small)',
                color: 'var(--sne-text-secondary)',
              }}
            >
              {node.id}
            </code>
          </div>
        </div>
        <StatusBadge status={statusMap[node.status]}>
          {node.status === 'active' ? 'Ativo' : node.status === 'offline' ? 'Offline' : 'Violado'}
        </StatusBadge>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-3.5 h-3.5" style={{ color: 'var(--sne-text-secondary)' }} />
            <span style={{ fontSize: 'var(--text-small)', color: 'var(--sne-text-secondary)' }}>
              Heartbeat
            </span>
          </div>
          <p style={{ color: 'var(--sne-text-primary)' }}>{node.heartbeat}s</p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-3.5 h-3.5" style={{ color: 'var(--sne-text-secondary)' }} />
            <span style={{ fontSize: 'var(--text-small)', color: 'var(--sne-text-secondary)' }}>
              Uptime
            </span>
          </div>
          <p style={{ color: 'var(--sne-text-primary)' }}>{node.uptime}%</p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-3.5 h-3.5" style={{ color: 'var(--sne-text-secondary)' }} />
            <span style={{ fontSize: 'var(--text-small)', color: 'var(--sne-text-secondary)' }}>
              Provas
            </span>
          </div>
          <p style={{ color: 'var(--sne-text-primary)' }}>{node.proofs.toLocaleString()}</p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-3.5 h-3.5" style={{ color: 'var(--sne-text-secondary)' }} />
            <span style={{ fontSize: 'var(--text-small)', color: 'var(--sne-text-secondary)' }}>
              Última Prova
            </span>
          </div>
          <p style={{ fontSize: 'var(--text-small)', color: 'var(--sne-text-primary)' }}>
            {node.lastProof}
          </p>
        </div>
      </div>

      {/* Actions */}
      <Button
        onClick={onViewDetails}
        className="w-full rounded transition-colors"
        variant="outline"
        style={{
          borderColor: 'var(--border)',
          color: 'var(--sne-text-primary)',
        }}
      >
        Ver Detalhes
      </Button>
      
      {/* CSS keyframes for pulse animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.5);
          }
        }
      `}</style>
    </div>
  );
}