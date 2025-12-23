export function ArchitectureDiagram() {
  return (
    <svg
      viewBox="0 0 800 400"
      className="w-full h-auto"
      style={{ backgroundColor: 'var(--sne-surface-1)' }}
    >
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3, 0 6"
            fill="var(--sne-accent)"
          />
        </marker>
      </defs>

      {/* Background Grid */}
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path
          d="M 40 0 L 0 0 0 40"
          fill="none"
          stroke="var(--border)"
          strokeWidth="0.5"
          opacity="0.3"
        />
      </pattern>
      <rect width="800" height="400" fill="url(#grid)" />

      {/* Edge Nodes Layer */}
      <g id="edge-nodes">
        <rect
          x="50"
          y="50"
          width="120"
          height="80"
          rx="8"
          fill="var(--sne-surface-elevated)"
          stroke="var(--sne-accent)"
          strokeWidth="2"
        />
        <text
          x="110"
          y="85"
          textAnchor="middle"
          fill="var(--sne-text-primary)"
          fontSize="14"
          fontWeight="600"
        >
          Edge Nodes
        </text>
        <text
          x="110"
          y="105"
          textAnchor="middle"
          fill="var(--sne-text-secondary)"
          fontSize="11"
          fontFamily="var(--font-family-mono)"
        >
          Operadores
        </text>
      </g>

      {/* Scroll L2 */}
      <g id="scroll-l2">
        <rect
          x="250"
          y="50"
          width="120"
          height="80"
          rx="8"
          fill="var(--sne-surface-elevated)"
          stroke="var(--sne-success)"
          strokeWidth="2"
        />
        <text
          x="310"
          y="85"
          textAnchor="middle"
          fill="var(--sne-text-primary)"
          fontSize="14"
          fontWeight="600"
        >
          Scroll L2
        </text>
        <text
          x="310"
          y="105"
          textAnchor="middle"
          fill="var(--sne-text-secondary)"
          fontSize="11"
          fontFamily="var(--font-family-mono)"
        >
          On-chain
        </text>
      </g>

      {/* Relayers */}
      <g id="relayers">
        <rect
          x="450"
          y="50"
          width="120"
          height="80"
          rx="8"
          fill="var(--sne-surface-elevated)"
          stroke="var(--sne-warning)"
          strokeWidth="2"
        />
        <text
          x="510"
          y="85"
          textAnchor="middle"
          fill="var(--sne-text-primary)"
          fontSize="14"
          fontWeight="600"
        >
          Relayers
        </text>
        <text
          x="510"
          y="105"
          textAnchor="middle"
          fill="var(--sne-text-secondary)"
          fontSize="11"
          fontFamily="var(--font-family-mono)"
        >
          Agregação
        </text>
      </g>

      {/* Vault */}
      <g id="vault">
        <rect
          x="50"
          y="220"
          width="120"
          height="80"
          rx="8"
          fill="var(--sne-surface-elevated)"
          stroke="var(--sne-accent)"
          strokeWidth="2"
        />
        <text
          x="110"
          y="255"
          textAnchor="middle"
          fill="var(--sne-text-primary)"
          fontSize="14"
          fontWeight="600"
        >
          SNE Vault
        </text>
        <text
          x="110"
          y="275"
          textAnchor="middle"
          fill="var(--sne-text-secondary)"
          fontSize="11"
          fontFamily="var(--font-family-mono)"
        >
          Storage
        </text>
      </g>

      {/* Market Feeds */}
      <g id="market-feeds">
        <rect
          x="250"
          y="220"
          width="120"
          height="80"
          rx="8"
          fill="var(--sne-surface-elevated)"
          stroke="var(--sne-accent)"
          strokeWidth="2"
        />
        <text
          x="310"
          y="255"
          textAnchor="middle"
          fill="var(--sne-text-primary)"
          fontSize="14"
          fontWeight="600"
        >
          Market Feeds
        </text>
        <text
          x="310"
          y="275"
          textAnchor="middle"
          fill="var(--sne-text-secondary)"
          fontSize="11"
          fontFamily="var(--font-family-mono)"
        >
          Dados
        </text>
      </g>

      {/* Radar */}
      <g id="radar">
        <rect
          x="450"
          y="220"
          width="120"
          height="80"
          rx="8"
          fill="var(--sne-surface-elevated)"
          stroke="var(--sne-accent)"
          strokeWidth="2"
        />
        <text
          x="510"
          y="255"
          textAnchor="middle"
          fill="var(--sne-text-primary)"
          fontSize="14"
          fontWeight="600"
        >
          SNE Radar
        </text>
        <text
          x="510"
          y="275"
          textAnchor="middle"
          fill="var(--sne-text-secondary)"
          fontSize="11"
          fontFamily="var(--font-family-mono)"
        >
          Analytics
        </text>
      </g>

      {/* Connections */}
      <line
        x1="170"
        y1="90"
        x2="250"
        y2="90"
        stroke="var(--sne-accent)"
        strokeWidth="2"
        markerEnd="url(#arrowhead)"
      />
      <line
        x1="370"
        y1="90"
        x2="450"
        y2="90"
        stroke="var(--sne-accent)"
        strokeWidth="2"
        markerEnd="url(#arrowhead)"
      />
      <line
        x1="110"
        y1="130"
        x2="110"
        y2="220"
        stroke="var(--sne-accent)"
        strokeWidth="2"
        markerEnd="url(#arrowhead)"
      />
      <line
        x1="310"
        y1="130"
        x2="310"
        y2="220"
        stroke="var(--sne-accent)"
        strokeWidth="2"
        markerEnd="url(#arrowhead)"
      />
      <line
        x1="510"
        y1="130"
        x2="510"
        y2="220"
        stroke="var(--sne-accent)"
        strokeWidth="2"
        markerEnd="url(#arrowhead)"
      />

      {/* Labels */}
      <text
        x="210"
        y="80"
        textAnchor="middle"
        fill="var(--sne-accent)"
        fontSize="10"
        fontFamily="var(--font-family-mono)"
      >
        Proofs
      </text>
      <text
        x="410"
        y="80"
        textAnchor="middle"
        fill="var(--sne-accent)"
        fontSize="10"
        fontFamily="var(--font-family-mono)"
      >
        Merkle
      </text>
    </svg>
  );
}
