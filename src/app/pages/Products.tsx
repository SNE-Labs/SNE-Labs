import { useCallback } from 'react';
import { Activity, Shield, Key, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ArchitectureDiagram } from '../components/sne/ArchitectureDiagram';
import { MerkleTreeViz } from '../components/sne/MerkleTreeViz';
import { CodeBlock } from '../components/sne/CodeBlock';
import { StatusBadge } from '../components/sne/StatusBadge';

export function Products() {
  // Abre /docs#<id> sem recarregar quando já estamos em /docs,
  // ou faz navegação completa para /docs#<id> quando estamos em outra rota.
  const openDoc = useCallback((id: string) => {
    if (typeof window === 'undefined') return;
    const targetHash = `#${id}`;
    const targetPath = `/docs${targetHash}`;

    // Se já estamos em /docs, atualiza só o hash (spa, sem reload)
    if (window.location.pathname === '/docs') {
      if (window.location.hash !== targetHash) {
        window.history.pushState({}, '', targetPath);
        // notifica listeners (Docs page deve escutar 'hashchange')
        window.dispatchEvent(new HashChangeEvent('hashchange'));
      }
      // rola suavemente (Docs também faz scroll ao mudar selectedDoc)
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch {
        /* noop */
      }
      return;
    }

    // Caso contrário, faça navegação completa para /docs#id (garante que o roteador carregue a página)
    // uso assign para permitir back/forward normal; replace se preferir não adicionar ao histórico.
    window.location.assign(targetPath);
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="py-16 px-6 lg:px-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-4">
            <StatusBadge status="active">Produtos</StatusBadge>
          </div>
          <h1 className="mb-4" style={{ color: 'var(--sne-text-primary)' }}>
            Stack de Infraestrutura SNE
          </h1>
          <p className="max-w-3xl" style={{ color: 'var(--sne-text-secondary)', fontSize: 'var(--text-body-lg)' }}>
            Componentes modulares para construir infraestrutura verificável, auditável e soberana
          </p>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="py-16 px-6 lg:px-24" style={{ backgroundColor: 'var(--sne-surface-1)' }}>
        <div className="max-w-[1200px] mx-auto">
          <h2 className="mb-6" style={{ color: 'var(--sne-text-primary)' }}>
            Arquitetura do Sistema
          </h2>
          <div
            className="rounded-lg border p-8"
            style={{
              backgroundColor: 'var(--sne-bg)',
              borderColor: 'var(--border)',
            }}
          >
            <ArchitectureDiagram />
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              className="p-4 rounded border"
              style={{
                backgroundColor: 'var(--sne-bg)',
                borderColor: 'var(--border)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: 'var(--sne-accent)' }} />
                <span style={{ color: 'var(--sne-text-primary)', fontSize: 'var(--text-body)' }}>
                  On-chain
                </span>
              </div>
              <p style={{ fontSize: 'var(--text-small)', color: 'var(--sne-text-secondary)' }}>
                Contratos na Scroll L2, licenças, provas Merkle
              </p>
            </div>
            <div
              className="p-4 rounded border"
              style={{
                backgroundColor: 'var(--sne-bg)',
                borderColor: 'var(--border)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: 'var(--sne-success)' }} />
                <span style={{ color: 'var(--sne-text-primary)', fontSize: 'var(--text-body)' }}>
                  Relayers
                </span>
              </div>
              <p style={{ fontSize: 'var(--text-small)', color: 'var(--sne-text-secondary)' }}>
                Agregação de provas e submissão batch
              </p>
            </div>
            <div
              className="p-4 rounded border"
              style={{
                backgroundColor: 'var(--sne-bg)',
                borderColor: 'var(--border)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: 'var(--sne-warning)' }} />
                <span style={{ color: 'var(--sne-text-primary)', fontSize: 'var(--text-body)' }}>
                  Edge
                </span>
              </div>
              <p style={{ fontSize: 'var(--text-small)', color: 'var(--sne-text-secondary)' }}>
                Nós de execução distribuídos geograficamente
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SNE Radar */}
      <section className="py-16 px-6 lg:px-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div
                className="w-16 h-16 rounded flex items-center justify-center mb-6"
                style={{
                  backgroundColor: 'var(--sne-surface-1)',
                  border: '2px solid var(--sne-accent)',
                }}
              >
                <Activity className="w-8 h-8" style={{ color: 'var(--sne-accent)' }} />
              </div>
              <h2 className="mb-4" style={{ color: 'var(--sne-text-primary)' }}>
                SNE Radar
              </h2>
              <p className="mb-6" style={{ color: 'var(--sne-text-secondary)' }}>
                Sistema distribuído de monitoramento com provas de uptime verificáveis on-chain.
              </p>

              <div className="space-y-3 mb-6">
                {[
                  'Heartbeat periódico com timestamps verificáveis',
                  'Agregação de provas em Merkle trees',
                  'Submissão batch à Scroll L2 via relayers',
                  'Challenge-response para auditoria',
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--sne-success)' }} />
                    <p style={{ color: 'var(--sne-text-primary)' }}>{feature}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => openDoc('radar')}
                  className="flex items-center gap-2 px-4 py-2 rounded transition-colors"
                  style={{
                    backgroundColor: 'var(--sne-accent)',
                    color: 'var(--sne-text-primary)',
                  }}
                >
                  Ver Documentação
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="https://github.com/SNE-Labs/SNE-Labs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded border transition-colors"
                  style={{
                    borderColor: 'var(--border)',
                    color: 'var(--sne-text-primary)',
                  }}
                >
                  GitHub
                </a>
              </div>
            </div>

            <div>
              <div className="mb-6">
                <h3 className="mb-4" style={{ color: 'var(--sne-text-primary)' }}>
                  Visualização de Merkle Tree
                </h3>
                <div
                  className="rounded-lg border p-6"
                  style={{
                    backgroundColor: 'var(--sne-surface-1)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <MerkleTreeViz />
                </div>
                <p className="mt-3" style={{ fontSize: 'var(--text-small)', color: 'var(--sne-text-secondary)' }}>
                  Provas individuais são agregadas em roots Merkle e submetidas em batch
                </p>
              </div>

              <div className="overflow-auto">
                <CodeBlock
                  language="typescript"
                  code={`// Verificar uptime de nó
import { SNERadar } from '@sne/sdk';

const radar = new SNERadar({
  provider: scrollProvider,
  contract: '0x...',
});

// Verificar prova de uptime
const proof = await radar.verifyUptime({
  nodeId: '0x4a7b...c3f9',
  period: 7 * 24 * 60 * 60, // 7 dias
});

if (proof.valid) {
  console.log(\`Uptime: \${proof.percentage}%\`);
  console.log(\`Provas: \${proof.count}\`);
}`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SNE Vault */}
      <section className="py-16 px-6 lg:px-24" style={{ backgroundColor: 'var(--sne-surface-1)' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="overflow-auto">
                <CodeBlock
                  language="rust"
                  code={`// Ativar vault com handshake on-chain
use sne_vault::{Vault, KDFConfig};

let vault = Vault::new(KDFConfig {
    chain: Chain::Scroll,
    license_id: 42,
});

// Handshake on-chain gera chave transitória
let session = vault.activate(
    wallet_signature,
    ttl: Duration::from_secs(300)
)?;

// Chave é zeroizada após TTL ou comando
session.store_secret(data)?;
drop(session); // zeroização imediata`}
                />
              </div>
            </div>

            <div>
              <div
                className="w-16 h-16 rounded flex items-center justify-center mb-6"
                style={{
                  backgroundColor: 'var(--sne-surface-elevated)',
                  border: '2px solid var(--sne-accent)',
                }}
              >
                <Shield className="w-8 h-8" style={{ color: 'var(--sne-accent)' }} />
              </div>
              <h2 className="mb-4" style={{ color: 'var(--sne-text-primary)' }}>
                SNE Vault
              </h2>
              <p className="mb-6" style={{ color: 'var(--sne-text-secondary)' }}>
                Storage criptográfico com chaves derivadas de handshake on-chain e zeroização temporal.
              </p>

              <div className="space-y-3 mb-6">
                {[
                  'KDF derivado de assinatura on-chain',
                  'Chaves transitórias com TTL configurável',
                  'Zeroização automática em memória',
                  'Threat model contra side-channel attacks',
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--sne-success)' }} />
                    <p style={{ color: 'var(--sne-text-primary)' }}>{feature}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => openDoc('vault')}
                  className="flex items-center gap-2 px-4 py-2 rounded transition-colors"
                  style={{
                    backgroundColor: 'var(--sne-accent)',
                    color: 'var(--sne-text-primary)',
                  }}
                >
                  Ver Especificação
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    openDoc('sne-pass');
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded border transition-colors"
                  style={{
                    borderColor: 'var(--border)',
                    color: 'var(--sne-text-primary)',
                  }}
                >
                  Threat Model
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SNE Keys */}
      <section className="py-16 px-6 lg:px-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div
                className="w-16 h-16 rounded flex items-center justify-center mb-6"
                style={{
                  backgroundColor: 'var(--sne-surface-1)',
                  border: '2px solid var(--sne-accent)',
                }}
              >
                <Key className="w-8 h-8" style={{ color: 'var(--sne-accent)' }} />
              </div>
              <h2 className="mb-4" style={{ color: 'var(--sne-text-primary)' }}>
                SNE Keys
              </h2>
              <p className="mb-6" style={{ color: 'var(--sne-text-secondary)' }}>
                Sistema de licenças on-chain com gestão de chaves transitórias e revogação via smart contracts.
              </p>

              <div className="space-y-3 mb-6">
                {[
                  'Licenças NFT on-chain (ERC-721)',
                  'Revogação instantânea via contrato',
                  'Rotation automática de chaves',
                  'Auditoria completa de acessos',
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--sne-success)' }} />
                    <p style={{ color: 'var(--sne-text-primary)' }}>{feature}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => openDoc('contracts')}
                  className="flex items-center gap-2 px-4 py-2 rounded transition-colors"
                  style={{
                    backgroundColor: 'var(--sne-accent)',
                    color: 'var(--sne-text-primary)',
                  }}
                >
                  Ver Contratos
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); openDoc('governance'); }}
                  className="flex items-center gap-2 px-4 py-2 rounded border transition-colors"
                  style={{
                    borderColor: 'var(--border)',
                    color: 'var(--sne-text-primary)',
                  }}
                >
                  Auditorias
                </a>
              </div>
            </div>

            <div>
              <div className="overflow-auto">
                <CodeBlock
                  language="solidity"
                  code={`// Contrato de licenças SNE
contract SNELicense is ERC721 {
  mapping(uint256 => bool) public revoked;
  
  function isValid(uint256 tokenId) 
    public view returns (bool) 
  {
    return _exists(tokenId) && 
           !revoked[tokenId] &&
           ownerOf(tokenId) != address(0);
  }
  
  function revoke(uint256 tokenId) 
    public onlyOwner 
  {
    revoked[tokenId] = true;
    emit LicenseRevoked(tokenId, block.timestamp);
  }
}`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specs Table */}
      <section className="py-16 px-6 lg:px-24" style={{ backgroundColor: 'var(--sne-surface-1)' }}>
        <div className="max-w-[1200px] mx-auto">
          <h2 className="mb-6" style={{ color: 'var(--sne-text-primary)' }}>
            Comparativo de Especificações
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <th className="text-left py-3 px-4" style={{ color: 'var(--sne-text-primary)' }}>
                    Feature
                  </th>
                  <th className="text-left py-3 px-4" style={{ color: 'var(--sne-text-primary)' }}>
                    SNE Radar
                  </th>
                  <th className="text-left py-3 px-4" style={{ color: 'var(--sne-text-primary)' }}>
                    SNE Vault
                  </th>
                  <th className="text-left py-3 px-4" style={{ color: 'var(--sne-text-primary)' }}>
                    SNE Keys
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['On-chain', 'Provas Merkle', 'Handshake', 'Licenças NFT'],
                  ['Off-chain', 'Heartbeat', 'Storage', 'Key rotation'],
                  ['Latência', '30s', '<100ms', 'Instantâneo'],
                  ['Gas cost', 'Batch', 'Uma vez', 'Mint + Revoke'],
                ].map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                    {row.map((cell, cellIdx) => (
                      <td
                        key={cellIdx}
                        className="py-3 px-4"
                        style={{
                          color: cellIdx === 0 ? 'var(--sne-text-secondary)' : 'var(--sne-text-primary)',
                          fontFamily: cellIdx === 0 ? 'var(--font-family-ui)' : 'var(--font-family-mono)',
                          fontSize: 'var(--text-body)',
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
