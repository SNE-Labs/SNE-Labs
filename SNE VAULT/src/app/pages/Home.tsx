import React from "react";
import { Activity, Shield, Key, ArrowRight, Github, FileText } from "lucide-react";
import { Button } from "../components/ui/button";
import { StatusBadge } from "../components/sne/StatusBadge";
import { CodeBlock } from "../components/sne/CodeBlock";

interface HomeProps {
  onNavigate: (page: "home" | "dashboard" | "products" | "docs") => void;
}

export function Home({ onNavigate }: HomeProps) {
  const currentYear = new Date().getFullYear();

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      {/* Decorative fluid gradient background (behind content) */}
      <div
        aria-hidden="true"
        className="sne-bg-grad"
        style={{
          position: "absolute",
          inset: "-10%",
          zIndex: -1,
          pointerEvents: "none",
          filter: "blur(80px) saturate(120%)",
          opacity: 0.9,
        }}
      />

      {/* Inline styles for animated gradient (scoped to this component) */}
      <style>
        {`
          .sne-bg-grad {
            background-image:
              radial-gradient(closest-corner at 10% 20%, rgba(255,106,0,0.14), transparent 12%),
              radial-gradient(closest-corner at 80% 30%, rgba(0,196,140,0.10), transparent 12%),
              radial-gradient(closest-corner at 30% 80%, rgba(255,200,87,0.06), transparent 12%),
              linear-gradient(120deg, rgba(15,15,20,0.6), rgba(2,6,12,0.3));
            background-size: 160% 160%;
            transform-origin: center;
            animation: sneBgFloat 18s linear infinite;
            mix-blend-mode: screen;
          }

          @keyframes sneBgFloat {
            0% {
              transform: translate3d(-6%, -4%, 0) scale(1);
              background-position: 0% 0%;
            }
            50% {
              transform: translate3d(6%, 4%, 0) scale(1.03);
              background-position: 100% 100%;
            }
            100% {
              transform: translate3d(-6%, -4%, 0) scale(1);
              background-position: 0% 0%;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .sne-bg-grad { animation: none; }
          }
        `}
      </style>

      {/* Hero Section */}
      <section className="py-24 px-6 lg:px-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-6">
            <StatusBadge status="active">Sistema Operacional</StatusBadge>
          </div>

          <h1 className="mb-6 max-w-3xl" style={{ color: "var(--sne-text-primary)" }}>
            Infraestrutura soberana para execução verificável em edge
          </h1>

          <p className="mb-8 max-w-2xl" style={{ color: "var(--sne-text-secondary)", fontSize: "var(--text-body-lg)" }}>
            Sistema de Nós de Execução (SNE) fornece prova criptográfica de uptime, integridade de dados e isolamento
            computacional para operadores de infraestrutura crítica.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Button
              onClick={() => onNavigate("dashboard")}
              className="rounded"
              style={{
                backgroundColor: "var(--sne-accent)",
                color: "var(--sne-text-primary)",
              }}
            >
              Acessar Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              onClick={() => onNavigate("docs")}
              variant="outline"
              className="rounded"
              style={{
                borderColor: "var(--border)",
                color: "var(--sne-text-primary)",
              }}
            >
              <FileText className="w-4 h-4 mr-2" />
              Documentação Técnica
            </Button>
            <Button
              variant="outline"
              className="rounded"
              style={{
                borderColor: "var(--border)",
                color: "var(--sne-text-primary)",
              }}
              onClick={() => window.open("https://github.com/your-org/sne", "_blank", "noopener")}
            >
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 px-6 lg:px-24" style={{ backgroundColor: "var(--sne-surface-1)" }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-12">
            <h2 className="mb-4" style={{ color: "var(--sne-text-primary)" }}>
              Stack de Produtos
            </h2>
            <p style={{ color: "var(--sne-text-secondary)" }}>Componentes modulares para infraestrutura verificável</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* SNE Radar */}
            <div
              role="button"
              tabIndex={0}
              className="border rounded-lg p-8 hover:border-opacity-100 transition-all group cursor-pointer"
              style={{ borderColor: "var(--border)" }}
              onClick={() => onNavigate("products")}
              onKeyDown={(e) => e.key === "Enter" && onNavigate("products")}
            >
              <div
                className="w-12 h-12 rounded flex items-center justify-center mb-6"
                style={{
                  backgroundColor: "var(--sne-surface-elevated)",
                  border: "1px solid var(--sne-accent)",
                }}
              >
                <Activity className="w-6 h-6" style={{ color: "var(--sne-accent)" }} />
              </div>
              <h3 className="mb-3" style={{ color: "var(--sne-text-primary)" }}>
                SNE Radar
              </h3>
              <p className="mb-4" style={{ color: "var(--sne-text-secondary)" }}>
                Sistema de monitoramento distribuído com agregação de provas em Merkle trees e submissão on-chain.
              </p>
              <div className="flex items-center gap-2 text-sm group-hover:gap-3 transition-all" style={{ color: "var(--sne-accent)" }}>
                Ver especificação
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* SNE Vault */}
            <div
              role="button"
              tabIndex={0}
              className="border rounded-lg p-8 hover:border-opacity-100 transition-all group cursor-pointer"
              style={{ borderColor: "var(--border)" }}
              onClick={() => onNavigate("products")}
              onKeyDown={(e) => e.key === "Enter" && onNavigate("products")}
            >
              <div
                className="w-12 h-12 rounded flex items-center justify-center mb-6"
                style={{
                  backgroundColor: "var(--sne-surface-elevated)",
                  border: "1px solid var(--sne-accent)",
                }}
              >
                <Shield className="w-6 h-6" style={{ color: "var(--sne-accent)" }} />
              </div>
              <h3 className="mb-3" style={{ color: "var(--sne-text-primary)" }}>
                SNE Vault
              </h3>
              <p className="mb-4" style={{ color: "var(--sne-text-secondary)" }}>
                Armazenamento criptográfico com KDF derivado de handshake on-chain e zeroização temporal.
              </p>
              <div className="flex items-center gap-2 text-sm group-hover:gap-3 transition-all" style={{ color: "var(--sne-accent)" }}>
                Ver especificação
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* SNE Keys */}
            <div
              role="button"
              tabIndex={0}
              className="border rounded-lg p-8 hover:border-opacity-100 transition-all group cursor-pointer"
              style={{ borderColor: "var(--border)" }}
              onClick={() => onNavigate("products")}
              onKeyDown={(e) => e.key === "Enter" && onNavigate("products")}
            >
              <div
                className="w-12 h-12 rounded flex items-center justify-center mb-6"
                style={{
                  backgroundColor: "var(--sne-surface-elevated)",
                  border: "1px solid var(--sne-accent)",
                }}
              >
                <Key className="w-6 h-6" style={{ color: "var(--sne-accent)" }} />
              </div>
              <h3 className="mb-3" style={{ color: "var(--sne-text-primary)" }}>
                SNE Keys
              </h3>
              <p className="mb-4" style={{ color: "var(--sne-text-secondary)" }}>
                Gestão de chaves transitórias com licenças on-chain e regime de revogação via smart contracts.
              </p>
              <div className="flex items-center gap-2 text-sm group-hover:gap-3 transition-all" style={{ color: "var(--sne-accent)" }}>
                Ver especificação
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-16 px-6 lg:px-24" style={{ backgroundColor: "var(--sne-surface-1)" }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="mb-4" style={{ color: "var(--sne-text-primary)" }}>
                Para Operadores
              </h2>
              <p className="mb-6" style={{ color: "var(--sne-text-secondary)" }}>
                Instale o cliente SNE e registre seu nó na Scroll L2
              </p>
              <CodeBlock
                language="bash"
                code={`# Instalar cliente SNE
curl -fsSL https://sne.network/install.sh | sh

# Registrar nó (requer licença on-chain)
sne register --wallet 0x... --license-id 42

# Iniciar operação
sne start --heartbeat 30s`}
              />
            </div>

            <div>
              <h2 className="mb-4" style={{ color: "var(--sne-text-primary)" }}>
                Para Desenvolvedores
              </h2>
              <p className="mb-6" style={{ color: "var(--sne-text-secondary)" }}>
                Integre provas de uptime em seus contratos
              </p>
              <CodeBlock
                language="solidity"
                code={`// Verificar prova de uptime
contract Consumer {
  ISNERegistry registry;
  
  function checkNode(bytes32 nodeId) public view {
    require(
      registry.verifyUptime(nodeId, 7 days),
      "Node uptime violated"
    );
  }
}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-24 border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono" style={{ color: "var(--sne-text-primary)", fontWeight: 700 }}>
                  SNE Labs
                </span>
              </div>
              <p style={{ fontSize: "var(--text-small)", color: "var(--sne-text-secondary)" }}>
                Infraestrutura verificável para edge computing
              </p>
            </div>

            <div>
              <h4 className="mb-3" style={{ color: "var(--sne-text-primary)" }}>
                Produtos
              </h4>
              <ul className="space-y-2" style={{ fontSize: "var(--text-body)" }}>
                <li>
                  <a href="#" style={{ color: "var(--sne-text-secondary)" }}>
                    SNE Radar
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: "var(--sne-text-secondary)" }}>
                    SNE Vault
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: "var(--sne-text-secondary)" }}>
                    SNE Keys
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3" style={{ color: "var(--sne-text-primary)" }}>
                Recursos
              </h4>
              <ul className="space-y-2" style={{ fontSize: "var(--text-body)" }}>
                <li>
                  <a href="#" style={{ color: "var(--sne-text-secondary)" }}>
                    Documentação
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: "var(--sne-text-secondary)" }}>
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: "var(--sne-text-secondary)" }}>
                    Contratos
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: "var(--sne-text-secondary)" }}>
                    GitHub
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3" style={{ color: "var(--sne-text-primary)" }}>
                Legal
              </h4>
              <ul className="space-y-2" style={{ fontSize: "var(--text-body)" }}>
                <li>
                  <a href="#" style={{ color: "var(--sne-text-secondary)" }}>
                    Licenças
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: "var(--sne-text-secondary)" }}>
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: "var(--sne-text-secondary)" }}>
                    Responsible Disclosure
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t" style={{ borderColor: "var(--border)" }}>
            <p style={{ fontSize: "var(--text-small)", color: "var(--sne-text-secondary)" }}>
              © {currentYear} SNE Labs. Licença MIT. Sistema operando em mainnet Scroll.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
