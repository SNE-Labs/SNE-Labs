import { Copy, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

interface LogEntryProps {
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  message: string;
  source?: string;
}

export function LogEntry({ timestamp, level, message, source }: LogEntryProps) {
  const [copied, setCopied] = useState(false);

  const levelConfig = {
    info: {
      icon: Info,
      color: 'var(--sne-text-secondary)',
      label: 'INFO',
    },
    warn: {
      icon: AlertTriangle,
      color: 'var(--sne-warning)',
      label: 'WARN',
    },
    error: {
      icon: AlertCircle,
      color: 'var(--sne-critical)',
      label: 'ERROR',
    },
  };

  const config = levelConfig[level];
  const Icon = config.icon;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`[${timestamp}] ${level.toUpperCase()}: ${message}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className="flex items-start gap-3 p-3 rounded border group hover:border-opacity-100 transition-all"
      style={{
        backgroundColor: 'var(--sne-surface-1)',
        borderColor: `${config.color}20`,
      }}
    >
      <Icon className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: config.color }} />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <code
            style={{
              fontFamily: 'var(--font-family-mono)',
              fontSize: 'var(--text-small)',
              color: 'var(--sne-text-secondary)',
            }}
          >
            {timestamp}
          </code>
          <span
            className="px-1.5 py-0.5 rounded"
            style={{
              fontSize: 'var(--text-small)',
              backgroundColor: `${config.color}15`,
              color: config.color,
              fontFamily: 'var(--font-family-mono)',
            }}
          >
            {config.label}
          </span>
          {source && (
            <span
              style={{
                fontSize: 'var(--text-small)',
                color: 'var(--sne-text-secondary)',
              }}
            >
              [{source}]
            </span>
          )}
        </div>
        <p
          style={{
            color: 'var(--sne-text-primary)',
            fontSize: 'var(--text-body)',
          }}
        >
          {message}
        </p>
      </div>

      <button
        onClick={handleCopy}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded"
        style={{
          color: copied ? 'var(--sne-success)' : 'var(--sne-text-secondary)',
        }}
      >
        <Copy className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
