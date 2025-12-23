import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded overflow-hidden" style={{ backgroundColor: 'var(--sne-surface-1)' }}>
      {language && (
        <div
          className="px-4 py-2 border-b"
          style={{
            backgroundColor: 'var(--sne-bg)',
            borderColor: 'var(--border)',
            color: 'var(--sne-text-secondary)',
          }}
        >
          <span style={{ fontSize: 'var(--text-small)' }}>{language}</span>
        </div>
      )}
      <div className="relative">
        <pre className="p-4 overflow-x-auto">
          <code
            style={{
              fontFamily: 'var(--font-family-mono)',
              fontSize: 'var(--text-code)',
              color: 'var(--sne-text-primary)',
            }}
          >
            {code}
          </code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-2 rounded transition-all"
          style={{
            backgroundColor: 'var(--sne-surface-elevated)',
            color: copied ? 'var(--sne-success)' : 'var(--sne-text-secondary)',
            border: '1px solid var(--border)',
          }}
          onMouseEnter={(e) => {
            if (!copied) e.currentTarget.style.color = 'var(--sne-text-primary)';
          }}
          onMouseLeave={(e) => {
            if (!copied) e.currentTarget.style.color = 'var(--sne-text-secondary)';
          }}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
