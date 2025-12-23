// src/pages/Dashboard.tsx
import { useCallback, useEffect, useState } from 'react';
import { MetricCard } from '../components/sne/MetricCard';
import { StatusBadge } from '../components/sne/StatusBadge';
import { WalletConnect } from '../../components/passport/WalletConnect';
import { BalanceDisplay } from '../../components/passport/BalanceDisplay';
import { GasTracker } from '../../components/passport/GasTracker';
import { useLookupAddress, useProducts, useCheckLicense } from '../../hooks/usePassportData';
import { useAccount } from 'wagmi';
import { Activity, Shield, Zap, Clock, AlertCircle } from 'lucide-react';
import { Skeleton } from '../components/ui/skeleton';

/**
 * Consumer-focused Read-only Dashboard for SNE (SNE Pass / SNE Keys / SNE Box)
 *
 * Behavior controlled by env:
 * VITE_USE_BACKEND = "true" | "false" (default: false)
 * VITE_SNE_API_URL = optional backend proxy for on-chain reads
 *
 * Read-only: user can paste an address/ENS and inspect public state (licenses, keys, boxes).
 * Purchase flows and management remain in separate checkout / app flows (wallet required).
 */

// API_BASE e USE_BACKEND removidos - agora usa hooks do Passport diretamente

type License = {
  id: string;
  nodeId?: string;
  name?: string;
  status: 'active' | 'revoked' | 'unknown';
  power?: string;
  lastChecked?: string | null;
};

type KeyRecord = {
  id: string;
  type: 'physical' | 'virtual';
  boundTo?: string | null; // address
  status: 'bound' | 'unbound';
};

type BoxRecord = {
  id: string;
  tier: 'tier1' | 'tier2' | 'tier3';
  provisioned: boolean;
  lastSeen?: string | null;
};

type LookupResult = {
  licenses: License[];
  keys: KeyRecord[];
  boxes: BoxRecord[];
  pou?: { nodesPublic: number };
};

// PRODUCTS removido - agora usa useProducts() hook do Passport

const LOCAL_KEY = 'sne_dashboard_public_v1';

// small helpers for local cache
function loadLocalPublic(): LookupResult | null {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? (JSON.parse(raw) as LookupResult) : null;
  } catch {
    return null;
  }
}
function saveLocalPublic(s: Partial<LookupResult>) {
  try {
    const cur = loadLocalPublic() ?? { licenses: [], keys: [], boxes: [], pou: { nodesPublic: 0 } };
    const merged = { ...cur, ...s };
    localStorage.setItem(LOCAL_KEY, JSON.stringify(merged));
  } catch (e) {
    // ignore
  }
}

export function Dashboard() {
  // Wallet state
  const { address: connectedAddress, isConnected } = useAccount();
  
  // query state
  const [queryAddr, setQueryAddr] = useState<string>('');
  const [manualLookup, setManualLookup] = useState<string | null>(null);
  
  // Auto-preenchimento quando wallet conectada
  useEffect(() => {
    if (isConnected && connectedAddress && !queryAddr) {
      setQueryAddr(connectedAddress);
    }
  }, [isConnected, connectedAddress, queryAddr]);

  // Hooks do Passport
  const lookupQuery = useLookupAddress(manualLookup);
  const productsQuery = useProducts();
  
  // Estado derivado dos hooks
  const lookup = lookupQuery.data || null;
  const loading = lookupQuery.isLoading;
  const err = lookupQuery.error ? String(lookupQuery.error) : null;

  // a small local audit log - read-only for consumer UI
  const [logs, setLogs] = useState<{ ts: string; msg: string }[]>(() => {
    const raw = loadLocalPublic();
    return raw ? [{ ts: new Date().toISOString(), msg: 'Cached public state loaded' }] : [];
  });

  // hydrate cached public result on mount - removido, agora usa lookupQuery.data

  const appendLog = useCallback((msg: string) => {
    const entry = { ts: new Date().toISOString(), msg };
    setLogs((l) => {
      const next = [entry, ...l].slice(0, 200);
      return next;
    });
  }, []);

  // MOCK_LOOKUP removido - agora usa useLookupAddress() hook do Passport

  // perform a public lookup usando hook do Passport
  const performLookup = useCallback(
    (addr: string) => {
      const trimmed = addr.trim();
      if (!trimmed) return;
      
      setManualLookup(trimmed);
      appendLog(`Lookup started for ${trimmed}`);
      
      // Salvar no localStorage quando dados chegarem
      if (lookupQuery.data) {
        saveLocalPublic(lookupQuery.data);
        appendLog(`Lookup succeeded for ${trimmed}`);
      }
    },
    [appendLog, lookupQuery.data]
  );

  // Salvar lookup no localStorage quando dados mudarem
  useEffect(() => {
    if (lookupQuery.data && manualLookup) {
      saveLocalPublic(lookupQuery.data);
    }
  }, [lookupQuery.data, manualLookup]);

  // Componente para verificar licença on-chain usando hook
  function LicenseCheckButton({ nodeId, licenseId }: { nodeId: string; licenseId: string }) {
    const [isChecking, setIsChecking] = useState(false);
    const checkQuery = useCheckLicense(isChecking ? nodeId : null);
    
    useEffect(() => {
      if (checkQuery.data && isChecking) {
        const access = checkQuery.data.access;
        alert(`checkAccess: ${access ? 'OK' : 'NÃO'}`);
        appendLog(`checkAccess(${nodeId}) => ${String(access)}`);
        setIsChecking(false);
      } else if (checkQuery.error && isChecking) {
        const msg = String(checkQuery.error);
        alert(`Erro: ${msg}`);
        appendLog(`checkAccess failed for ${nodeId}: ${msg}`);
        setIsChecking(false);
      }
    }, [checkQuery.data, checkQuery.error, isChecking, nodeId]);
    
    return (
      <button
        onClick={() => {
          setIsChecking(true);
          appendLog(`checkAccess requested for ${nodeId}`);
        }}
        disabled={isChecking || checkQuery.isLoading}
        className="px-3 py-1 rounded"
        style={{ backgroundColor: 'var(--sne-surface-elevated)' }}
      >
        {isChecking || checkQuery.isLoading ? 'Verificando…' : 'Verificar on-chain'}
      </button>
    );
  }

  // small helpers for metrics
  const licensesCount = lookup?.licenses?.length ?? 0;
  const keysCount = lookup?.keys?.length ?? 0;
  const boxesCount = lookup?.boxes?.length ?? 0;
  const publicNodes = lookup?.pou?.nodesPublic ?? 0;

  return (
    <div className="min-h-screen py-8 px-6 lg:px-24">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-start gap-4">
          <div>
            <h1 style={{ color: 'var(--sne-text-primary)' }}>SNE · Scroll Pass</h1>
            <div style={{ color: 'var(--sne-text-secondary)' }}>Camada pública read-only — verifique licenças, chaves e SNE Box.</div>
          </div>
          <div style={{ marginLeft: 'auto' }} className="flex items-center gap-3">
            {isConnected && <BalanceDisplay />}
            <GasTracker />
            <WalletConnect />
            <StatusBadge status="active">Privacidade • Read-only</StatusBadge>
          </div>
        </div>

        {/* Lookup / Search */}
        <div className="mb-6 rounded border p-4" style={{ backgroundColor: 'var(--sne-surface-1)', borderColor: 'var(--border)' }}>
          <h3 style={{ color: 'var(--sne-text-primary)' }}>Inspecionar endereço público</h3>
          <p style={{ color: 'var(--sne-text-secondary)', marginBottom: 8 }}>
            Cole um endereço Ethereum/Scroll ou ENS para ver licenças públicas, SNE Keys vinculadas e SNE Box associadas. Nenhuma wallet necessária.
          </p>

          <div className="flex gap-2 items-center">
            <input
              value={queryAddr}
              onChange={(e) => setQueryAddr(e.target.value)}
              placeholder="Ex: 0xAbc... ou nome.eth"
              className="input px-3 py-2 rounded w-full"
              aria-label="Endereco ou ENS"
            />
            <button
              onClick={() => performLookup(queryAddr.trim())}
              disabled={!queryAddr.trim() || loading}
              className="px-4 py-2 rounded"
              style={{ backgroundColor: 'var(--sne-surface-elevated)' }}
            >
              {loading ? 'Verificando…' : 'Verificar'}
            </button>

            <button
              onClick={() => {
                setQueryAddr('');
                setManualLookup(null);
                appendLog('Lookup cleared by user');
              }}
              className="px-3 py-2 rounded"
              style={{ backgroundColor: 'transparent', color: 'var(--sne-text-secondary)' }}
            >
              Limpar
            </button>
          </div>

          {err && <div style={{ color: 'var(--sne-critical)', marginTop: 8 }}>Erro: {err}</div>}
        </div>

        {/* Top metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <MetricCard label="Licenças Públicas" value={licensesCount} icon={<Shield className="w-5 h-5" />} />
          <MetricCard label="SNE Keys (públicas)" value={keysCount} icon={<Activity className="w-5 h-5" />} />
          <MetricCard label="SNE Boxes associadas" value={boxesCount} icon={<Zap className="w-5 h-5" />} />
          <MetricCard label="Nós públicos (PoU)" value={publicNodes} icon={<Clock className="w-5 h-5" />} />
        </div>

        {/* Licenses (full width now that heatmap removed) */}
        <div className="rounded border p-6 mb-8" style={{ backgroundColor: 'var(--sne-surface-1)', borderColor: 'var(--border)' }}>
          <h3 style={{ color: 'var(--sne-text-primary)', marginBottom: 8 }}>Licenças públicas</h3>
          <p style={{ color: 'var(--sne-text-secondary)', marginBottom: 12 }}>
            Licenças atreladas ao endereço/ENS inserido. Clique em "Verificar on-chain" para confirmar via Scroll L2 (requer backend).
          </p>

          {!lookup ? (
            <div style={{ color: 'var(--sne-text-secondary)' }}>Insira um endereço e clique em Verificar para ver licenças públicas.</div>
          ) : lookup.licenses.length === 0 ? (
            <div style={{ color: 'var(--sne-text-secondary)' }}>Nenhuma licença pública encontrada para este endereço.</div>
          ) : (
            <div className="space-y-3">
              {lookup.licenses.map((lic) => (
                <div key={lic.id} className="p-4 rounded border flex items-center justify-between" style={{ backgroundColor: 'var(--sne-bg)', borderColor: 'var(--border)' }}>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--sne-text-primary)' }}>{lic.name ?? lic.id}</div>
                    <div style={{ color: 'var(--sne-text-secondary)', fontSize: '0.9rem' }}>
                      Node: <code style={{ fontFamily: 'var(--font-family-mono)' }}>{lic.nodeId ?? '—'}</code> · Status: {lic.status}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <LicenseCheckButton 
                      nodeId={lic.nodeId ?? lic.id} 
                      licenseId={lic.id}
                    />

                    <a
                      href={`/licenses/${encodeURIComponent(lic.id)}`}
                      className="px-3 py-1 rounded"
                      style={{ backgroundColor: 'transparent', color: 'var(--sne-text-secondary)', border: '1px solid var(--border)' }}
                    >
                      Detalhes
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Keys + Boxes + Products */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Keys */}
          <div className="rounded border p-6" style={{ backgroundColor: 'var(--sne-surface-1)', borderColor: 'var(--border)' }}>
            <h4 style={{ color: 'var(--sne-text-primary)' }}>SNE Keys públicas</h4>
            <p style={{ color: 'var(--sne-text-secondary)', marginBottom: 8 }}>Chaves físicas/virtuais associadas publicamente ao endereço.</p>

            {!lookup ? (
              <div style={{ color: 'var(--sne-text-secondary)' }}>Use a busca para visualizar chaves públicas.</div>
            ) : lookup.keys.length === 0 ? (
              <div style={{ color: 'var(--sne-text-secondary)' }}>Nenhuma chave pública encontrada.</div>
            ) : (
              <div className="space-y-3">
                {lookup.keys.map((k) => (
                  <div key={k.id} className="p-3 rounded border" style={{ backgroundColor: 'var(--sne-bg)', borderColor: 'var(--border)' }}>
                    <div style={{ fontWeight: 600, color: 'var(--sne-text-primary)' }}>{k.id}</div>
                    <div style={{ color: 'var(--sne-text-secondary)', fontSize: '0.9rem' }}>
                      Tipo: {k.type} · Estado: {k.status} {k.boundTo ? `· Bound: ${k.boundTo}` : ''}
                    </div>
                    <div style={{ marginTop: 8 }}>
                      <a href={`/keys/${k.id}`} className="px-3 py-1 rounded" style={{ backgroundColor: 'var(--sne-surface-elevated)' }}>
                        Ver
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Boxes */}
          <div className="rounded border p-6" style={{ backgroundColor: 'var(--sne-surface-1)', borderColor: 'var(--border)' }}>
            <h4 style={{ color: 'var(--sne-text-primary)' }}>SNE Box</h4>
            <p style={{ color: 'var(--sne-text-secondary)', marginBottom: 8 }}>Hardware público associado (quando aplicável).</p>

            {!lookup ? (
              <div style={{ color: 'var(--sne-text-secondary)' }}>Use a busca para visualizar SNE Boxes públicas.</div>
            ) : lookup.boxes.length === 0 ? (
              <div style={{ color: 'var(--sne-text-secondary)' }}>Nenhuma SNE Box associada.</div>
            ) : (
              <div className="space-y-3">
                {lookup.boxes.map((b) => (
                  <div key={b.id} className="p-3 rounded border" style={{ backgroundColor: 'var(--sne-bg)', borderColor: 'var(--border)' }}>
                    <div style={{ fontWeight: 600, color: 'var(--sne-text-primary)' }}>{b.id} · {b.tier.toUpperCase()}</div>
                    <div style={{ color: 'var(--sne-text-secondary)', fontSize: '0.9rem' }}>
                      Provisionado: {b.provisioned ? 'Sim' : 'Não'} {b.lastSeen ? `· Última vez: ${new Date(b.lastSeen).toLocaleString()}` : ''}
                    </div>
                    <div style={{ marginTop: 8 }}>
                      <a href={`/box/${b.id}`} className="px-3 py-1 rounded" style={{ backgroundColor: 'var(--sne-surface-elevated)' }}>
                        Ver
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product catalog */}
          <div className="rounded border p-6" style={{ backgroundColor: 'var(--sne-surface-1)', borderColor: 'var(--border)' }}>
            <h4 style={{ color: 'var(--sne-text-primary)' }}>Comprar / Adquirir</h4>
            <p style={{ color: 'var(--sne-text-secondary)', marginBottom: 8 }}>Adquira SNE Box, SNE Keys e Licenças. O checkout requer wallet/flow de compra.</p>
            {productsQuery.isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </div>
            ) : productsQuery.error ? (
              <div className="flex items-center gap-2 p-3 rounded" style={{ backgroundColor: 'var(--sne-surface-elevated)', color: 'var(--sne-critical)' }}>
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">Erro ao carregar produtos. Tente novamente mais tarde.</span>
              </div>
            ) : productsQuery.data?.products && productsQuery.data.products.length > 0 ? (
              <div className="space-y-3">
                {productsQuery.data.products.map((p) => (
                  <div key={p.id} className="p-3 rounded border" style={{ backgroundColor: 'var(--sne-bg)', borderColor: 'var(--border)' }}>
                    <div style={{ fontWeight: 700 }}>{p.title}</div>
                    <div style={{ color: 'var(--sne-text-secondary)', fontSize: '0.9rem' }}>
                      {p.features?.join(' • ') || 'Ver detalhes'}
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div style={{ fontWeight: 600 }}>
                        USD ${p.priceUSD}
                        {p.priceETH && <span className="text-sm ml-2" style={{ color: 'var(--sne-text-secondary)' }}>({p.priceETH} ETH)</span>}
                      </div>
                      <a 
                        href={`/checkout/${p.id}`} 
                        className="px-3 py-1 rounded" 
                        style={{ backgroundColor: 'var(--sne-surface-elevated)' }}
                      >
                        {p.available ? 'Comprar' : 'Indisponível'}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ color: 'var(--sne-text-secondary)' }}>Nenhum produto disponível no momento.</div>
            )}
          </div>
        </div>

        {/* Audit / Activity (local-only) */}
        <div className="rounded border p-6" style={{ backgroundColor: 'var(--sne-surface-1)', borderColor: 'var(--border)' }}>
          <h4 style={{ color: 'var(--sne-text-primary)' }}>Histórico (local)</h4>
          <p style={{ color: 'var(--sne-text-secondary)', marginBottom: 8 }}>Entradas locais de auditoria (buscas / verificações) — armazenado no seu navegador.</p>
          <div className="space-y-2 max-h-48 overflow-auto">
            {logs.map((l, idx) => (
              <div key={idx} style={{ color: 'var(--sne-text-secondary)', fontSize: '0.9rem' }}>
                <strong style={{ color: 'var(--sne-text-primary)' }}>{new Date(l.ts).toLocaleString()}</strong> — {l.msg}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
