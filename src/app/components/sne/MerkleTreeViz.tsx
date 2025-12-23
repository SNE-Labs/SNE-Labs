interface MerkleNode {
  hash: string;
  level: number;
  position: number;
  verified?: boolean;
  isProof?: boolean;
}

interface MerkleTreeVizProps {
  nodes?: MerkleNode[];
}

export function MerkleTreeViz({ nodes }: MerkleTreeVizProps) {
  // Default demo tree
  const defaultNodes: MerkleNode[] = [
    // Level 0 (leaves)
    { hash: '0x4a7b', level: 0, position: 0 },
    { hash: '0x8d2e', level: 0, position: 1, isProof: true },
    { hash: '0x1f9c', level: 0, position: 2 },
    { hash: '0x6b3a', level: 0, position: 3, isProof: true },
    // Level 1
    { hash: '0x9f2d', level: 1, position: 0, verified: true },
    { hash: '0x5c8a', level: 1, position: 1, verified: true },
    // Level 2 (root)
    { hash: '0x3e7f', level: 2, position: 0, verified: true },
  ];

  const treeNodes = nodes || defaultNodes;
  const maxLevel = Math.max(...treeNodes.map(n => n.level));

  return (
    <div className="w-full py-8">
      <svg
        viewBox="0 0 800 400"
        className="w-full h-auto"
        style={{ backgroundColor: 'transparent' }}
      >
        {/* Grid background */}
        <pattern id="merkle-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="var(--border)"
            strokeWidth="0.5"
            opacity="0.2"
          />
        </pattern>
        <rect width="800" height="400" fill="url(#merkle-grid)" />

        {/* Connections */}
        {treeNodes.map((node) => {
          if (node.level === maxLevel) return null; // root has no parent

          const childX = 100 + node.position * 180 + (180 * Math.pow(2, maxLevel - node.level - 1)) / 2;
          const childY = 350 - node.level * 120;

          // Find parent
          const parentPosition = Math.floor(node.position / 2);
          const parentNode = treeNodes.find(n => n.level === node.level + 1 && n.position === parentPosition);
          
          if (!parentNode) return null;

          const parentX = 100 + parentNode.position * 180 + (180 * Math.pow(2, maxLevel - parentNode.level - 1)) / 2;
          const parentY = 350 - parentNode.level * 120;

          return (
            <line
              key={`${node.level}-${node.position}`}
              x1={childX}
              y1={childY}
              x2={parentX}
              y2={parentY}
              stroke={node.verified ? 'var(--sne-success)' : 'var(--border)'}
              strokeWidth="2"
              opacity={node.verified ? 0.8 : 0.3}
            />
          );
        })}

        {/* Nodes */}
        {treeNodes.map((node) => {
          const x = 100 + node.position * 180 + (180 * Math.pow(2, maxLevel - node.level - 1)) / 2;
          const y = 350 - node.level * 120;

          let nodeColor = 'var(--sne-surface-elevated)';
          let strokeColor = 'var(--border)';

          if (node.level === maxLevel) {
            // Root node
            nodeColor = 'var(--sne-accent)';
            strokeColor = 'var(--sne-accent)';
          } else if (node.verified) {
            nodeColor = 'var(--sne-success)';
            strokeColor = 'var(--sne-success)';
          } else if (node.isProof) {
            strokeColor = 'var(--sne-accent)';
          }

          return (
            <g key={`node-${node.level}-${node.position}`}>
              {/* Node circle */}
              <circle
                cx={x}
                cy={y}
                r="20"
                fill={nodeColor}
                stroke={strokeColor}
                strokeWidth="2"
              />
              
              {/* Hash label */}
              <text
                x={x}
                y={y + 35}
                textAnchor="middle"
                fill="var(--sne-text-secondary)"
                fontSize="11"
                fontFamily="var(--font-family-mono)"
              >
                {node.hash}
              </text>

              {/* Level indicator */}
              {node.level === maxLevel && (
                <text
                  x={x}
                  y={y - 30}
                  textAnchor="middle"
                  fill="var(--sne-accent)"
                  fontSize="12"
                  fontWeight="600"
                >
                  Root
                </text>
              )}
            </g>
          );
        })}

        {/* Legend */}
        <g transform="translate(600, 20)">
          <text
            x="0"
            y="0"
            fill="var(--sne-text-secondary)"
            fontSize="11"
            fontWeight="600"
          >
            Legenda
          </text>
          
          <circle cx="10" cy="20" r="6" fill="var(--sne-success)" />
          <text x="25" y="24" fill="var(--sne-text-secondary)" fontSize="10">
            Verificado
          </text>

          <circle cx="10" cy="40" r="6" fill="var(--sne-surface-elevated)" stroke="var(--sne-accent)" strokeWidth="2" />
          <text x="25" y="44" fill="var(--sne-text-secondary)" fontSize="10">
            Proof node
          </text>

          <circle cx="10" cy="60" r="6" fill="var(--sne-accent)" />
          <text x="25" y="64" fill="var(--sne-text-secondary)" fontSize="10">
            Merkle root
          </text>
        </g>
      </svg>
    </div>
  );
}
