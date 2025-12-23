import { ContractCard } from '../components/sne/ContractCard';
import { CodeBlock } from '../components/sne/CodeBlock';
import { StatusBadge } from '../components/sne/StatusBadge';
import { Timeline } from '../components/sne/Timeline';
import { Code, Book, Package } from 'lucide-react';

export function Contracts() {
  const contracts = [
    {
      name: 'SNERegistry',
      address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0',
      chain: 'Scroll Mainnet',
      verified: true,
      deployedAt: '2024-11-15',
      abi: '/abi/SNERegistry.json',
    },
    {
      name: 'SNELicense',
      address: '0x8d2e9f3a1b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e',
      chain: 'Scroll Mainnet',
      verified: true,
      deployedAt: '2024-11-15',
      abi: '/abi/SNELicense.json',
    },
    {
      name: 'MerkleProofVerifier',
      address: '0x1f9c8a7b6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b',
      chain: 'Scroll Mainnet',
      verified: true,
      deployedAt: '2024-11-16',
      abi: '/abi/MerkleProofVerifier.json',
    },
  ];

  const deploymentTimeline = [
    {
      id: '1',
      title: 'Contratos base deployed',
      description: 'SNERegistry e SNELicense deployed na Scroll Mainnet',
      timestamp: '2024-11-15',
      status: 'completed' as const,
    },
    {
      id: '2',
      title: 'Verificação on-chain',
      description: 'Contratos verificados no Scrollscan',
      timestamp: '2024-11-16',
      status: 'completed' as const,
    },
    {
      id: '3',
      title: 'Auditoria Certik',
      description: 'Auditoria de segurança iniciada',
      timestamp: '2024-12-01',
      status: 'current' as const,
    },
    {
      id: '4',
      title: 'Mainnet público',
      description: 'Abertura para registro de operadores',
      timestamp: '2025-01-15',
      status: 'pending' as const,
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="py-16 px-6 lg:px-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-4">
            <StatusBadge status="active">Developer Portal</StatusBadge>
          </div>
          <h1 className="mb-4" style={{ color: 'var(--sne-text-primary)' }}>
            Contratos e SDK
          </h1>
          <p className="max-w-3xl" style={{ color: 'var(--sne-text-secondary)', fontSize: 'var(--text-body-lg)' }}>
            Integre provas de uptime e infraestrutura verificável em seus contratos e aplicações
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 px-6 lg:px-24" style={{ backgroundColor: 'var(--sne-surface-1)' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="#"
              className="flex items-center gap-3 p-4 rounded border transition-all hover:border-opacity-100"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--sne-bg)' }}
            >
              <Code className="w-5 h-5" style={{ color: 'var(--sne-accent)' }} />
              <div>
                <h4 style={{ color: 'var(--sne-text-primary)' }}>API Reference</h4>
                <p style={{ fontSize: 'var(--text-small)', color: 'var(--sne-text-secondary)' }}>
                  Documentação completa
                </p>
              </div>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 p-4 rounded border transition-all hover:border-opacity-100"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--sne-bg)' }}
            >
              <Package className="w-5 h-5" style={{ color: 'var(--sne-accent)' }} />
              <div>
                <h4 style={{ color: 'var(--sne-text-primary)' }}>NPM Package</h4>
                <p style={{ fontSize: 'var(--text-small)', color: 'var(--sne-text-secondary)' }}>
                  @sne/sdk
                </p>
              </div>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 p-4 rounded border transition-all hover:border-opacity-100"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--sne-bg)' }}
            >
              <Book className="w-5 h-5" style={{ color: 'var(--sne-accent)' }} />
              <div>
                <h4 style={{ color: 'var(--sne-text-primary)' }}>Examples</h4>
                <p style={{ fontSize: 'var(--text-small)', color: 'var(--sne-text-secondary)' }}>
                  Código de exemplo
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Contracts */}
      <section className="py-16 px-6 lg:px-24">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="mb-6" style={{ color: 'var(--sne-text-primary)' }}>
            Smart Contracts (Scroll Mainnet)
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {contracts.map((contract) => (
              <ContractCard key={contract.address} {...contract} />
            ))}
          </div>
        </div>
      </section>

      {/* SDK Examples */}
      <section className="py-16 px-6 lg:px-24" style={{ backgroundColor: 'var(--sne-surface-1)' }}>
        <div className="max-w-[1200px] mx-auto">
          <h2 className="mb-6" style={{ color: 'var(--sne-text-primary)' }}>
            SDK - Exemplos de Uso
          </h2>

          <div className="space-y-8">
            {/* Example 1 */}
            <div>
              <h3 className="mb-4" style={{ color: 'var(--sne-text-primary)' }}>
                Instalação
              </h3>
              <CodeBlock
                language="bash"
                code={`npm install @sne/sdk ethers@^6.0.0
# ou
yarn add @sne/sdk ethers@^6.0.0`}
              />
            </div>

            {/* Example 2 */}
            <div>
              <h3 className="mb-4" style={{ color: 'var(--sne-text-primary)' }}>
                Verificar Uptime de Nó
              </h3>
              <CodeBlock
                language="typescript"
                code={`import { SNEClient } from '@sne/sdk';
import { ethers } from 'ethers';

// Configurar provider
const provider = new ethers.JsonRpcProvider('https://rpc.scroll.io');

// Inicializar cliente SNE
const sne = new SNEClient({
  provider,
  registryAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0',
});

// Verificar uptime de um nó
const nodeId = '0x4a7b...c3f9';
const uptime = await sne.getNodeUptime(nodeId, {
  period: 7 * 24 * 60 * 60, // 7 dias
});

console.log(\`Uptime: \${uptime.percentage}%\`);
console.log(\`Provas válidas: \${uptime.proofsCount}\`);
console.log(\`Última prova: \${new Date(uptime.lastProof * 1000)}\`);`}
              />
            </div>

            {/* Example 3 */}
            <div>
              <h3 className="mb-4" style={{ color: 'var(--sne-text-primary)' }}>
                Integrar em Smart Contract
              </h3>
              <CodeBlock
                language="solidity"
                code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@sne/contracts/interfaces/ISNERegistry.sol";

contract OrderExecutor {
    ISNERegistry public immutable sne;
    uint256 public constant MIN_UPTIME_DAYS = 7;
    
    constructor(address _sne) {
        sne = ISNERegistry(_sne);
    }
    
    modifier onlyReliableNode(bytes32 nodeId) {
        require(
            sne.verifyUptime(nodeId, MIN_UPTIME_DAYS * 1 days),
            "Node uptime violated"
        );
        _;
    }
    
    function executeOrder(
        bytes32 nodeId, 
        bytes calldata orderData
    ) 
        external 
        onlyReliableNode(nodeId) 
    {
        // Lógica de execução apenas se nó tiver uptime comprovado
        // ...
    }
}`}
              />
            </div>

            {/* Example 4 */}
            <div>
              <h3 className="mb-4" style={{ color: 'var(--sne-text-primary)' }}>
                Verificar Licença
              </h3>
              <CodeBlock
                language="typescript"
                code={`import { SNELicense } from '@sne/sdk';

const license = new SNELicense({
  provider,
  contractAddress: '0x8d2e9f3a1b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e',
});

// Verificar se carteira tem licença válida
const wallet = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0';
const hasLicense = await license.isValid(wallet);

if (hasLicense) {
  const tokenId = await license.getTokenId(wallet);
  const metadata = await license.getMetadata(tokenId);
  console.log(\`Licença #\${tokenId}: \${metadata.tier}\`);
} else {
  console.log('Wallet não possui licença válida');
}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Deployment Timeline */}
      <section className="py-16 px-6 lg:px-24">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="mb-6" style={{ color: 'var(--sne-text-primary)' }}>
            Roadmap de Deploy
          </h2>
          <div
            className="p-8 rounded-lg border"
            style={{
              backgroundColor: 'var(--sne-surface-1)',
              borderColor: 'var(--border)',
            }}
          >
            <Timeline events={deploymentTimeline} />
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 px-6 lg:px-24" style={{ backgroundColor: 'var(--sne-surface-1)' }}>
        <div className="max-w-[1200px] mx-auto">
          <h2 className="mb-6" style={{ color: 'var(--sne-text-primary)' }}>
            Recursos Adicionais
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className="p-6 rounded-lg border"
              style={{
                backgroundColor: 'var(--sne-bg)',
                borderColor: 'var(--border)',
              }}
            >
              <h3 className="mb-3" style={{ color: 'var(--sne-text-primary)' }}>
                Auditorias de Segurança
              </h3>
              <p className="mb-4" style={{ color: 'var(--sne-text-secondary)', fontSize: 'var(--text-body)' }}>
                Contratos auditados por Certik, Trail of Bits e Code4rena
              </p>
              <a href="#" className="text-sm" style={{ color: 'var(--sne-accent)' }}>
                Ver relatórios →
              </a>
            </div>

            <div
              className="p-6 rounded-lg border"
              style={{
                backgroundColor: 'var(--sne-bg)',
                borderColor: 'var(--border)',
              }}
            >
              <h3 className="mb-3" style={{ color: 'var(--sne-text-primary)' }}>
                Bug Bounty Program
              </h3>
              <p className="mb-4" style={{ color: 'var(--sne-text-secondary)', fontSize: 'var(--text-body)' }}>
                Até $50,000 para vulnerabilidades críticas
              </p>
              <a href="#" className="text-sm" style={{ color: 'var(--sne-accent)' }}>
                Responsible Disclosure →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
