// src/pages/Dashboard.tsx
import { useCallback, useEffect, useState } from 'react';
import { MetricCard } from '../components/sne/MetricCard';
import { StatusBadge } from '../components/sne/StatusBadge';
import { Activity, Shield, Zap, Clock } from 'lucide-react';

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

const API_BASE =
  (import.meta.env?.VITE_SNE_API_URL as string | undefined) ?? 'https://snelabs.space/api';
const USE_BACKEND = ((import.meta.env?.VITE_USE_BACKEND as string | undefined) ?? 'false') === 'true';

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

const PRODUCTS = [
  {
    id: 'box-tier3',
    title: 'SNE Box — Tier 3',
    priceUSD: '3,499',
    features: ['Secure Enclave', 'Starlink-ready', 'Tamper Line'],
  },
  {
    id: 'key-physical',
    title: 'SNE Physical Key',
    priceUSD: '199',
    features: ['FIDO2', 'Tamper-proof', 'Reprovisioning'],
  },
  {
    id: 'license-pro',
    title: 'SNE Pro License',
    priceUSD: '499',
    features: ['Pro Node Access', 'Governance Voting', 'Priority Support'],
  },
];

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
  // query state
  const [queryAddr, setQueryAddr] = useState<string>('');
  const [lookup, setLookup] = useState<LookupResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // a small local audit log - read-only for consumer UI
  const [logs, setLogs] = useState<{ ts: string; msg: string }[]>(() => {
    const raw = loadLocalPublic();
    return raw ? [{ ts: new Date().toISOString(), msg: 'Cached public state loaded' }] : [];
  });

  // hydrate cached public result on mount
  useEffect(() => {
    const cached = loadLocalPublic();
    if (cached) setLookup(cached);
  }, []);

  const appendLog = useCallback((msg: string) => {
    const entry = { ts: new Date().toISOString(), msg };
    setLogs((l) => {
      const next = [entry, ...l].slice(0, 200);
      return next;
    });
  }, []);

  // Mock fallback (when no backend) — deterministic sample
  const MOCK_LOOKUP = useCallback((addr: string): LookupResult => {
    return {
      licenses: [
        { id: 'SNE-PRO-001', nodeId: '0x4a7b...c3f9', name: 'Pro Node', status: 'active', power: 'Pro Node', lastChecked: null },
        { id: 'SNE-EDGE-22', nodeId: '0x8d2e...f7a1', name: 'Edge Node', status: 'active', power: 'Edge', lastChecked: null },
      ],
      keys: [
        { id: 'phys-01', type: 'physical', boundTo: Math.random() > 0.5 ? addr : null, status: Math.random() > 0.5 ? 'bound' : 'unbound' },
      ],
      boxes: [
        { id: 'box-1', tier: 'tier3', provisioned: Math.random() > 0.5, lastSeen: new Date().toISOString() },
      ],
      pou: { nodesPublic: 12 },
    };
  }, []);

  // perform a public lookup (read-only). Prefer backend proxy for on-chain reads.
  const performLookup = useCallback(
    async (addr: string) => {
      setLoading(true);
      setErr(null);
      setLookup(null);
      appendLog(`Lookup started for ${addr}`);
      try {
        if (USE_BACKEND) {
          const res = await fetch(`${API_BASE}/api/onchain/lookup?addr=${encodeURIComponent(addr)}`);
          if (!res.ok) {
            const txt = await res.text().catch(() => '');
            throw new Error(`HTTP ${res.status} ${txt}`);
          }
          const data = await res.json();
          // expect structure: { licenses:[], keys:[], boxes:[], pou: { nodesPublic } }
          setLookup(data);
          saveLocalPublic(data);
          appendLog(`Lookup succeeded (backend) for ${addr}`);
        } else {
          // backendless: use deterministic mock and inform user
          const mock = MOCK_LOOKUP(addr);
          setLookup(mock);
          saveLocalPublic(mock);
          appendLog(`Lookup fallback (mock) used for ${addr}`);
        }
      } catch (e: any) {
        const msg = String(e?.message ?? e);
        setErr(msg);
        appendLog(`Lookup failed: ${msg}`);
      } finally {
        setLoading(false);
      }
    },
    [appendLog, MOCK_LOOKUP]
  );

  // call checkAccess for a specific nodeId (on-chain read). Only available if backend configured.
  const checkLicenseOnChain = useCallback(
    async (nodeId: string, onResult: (ok: boolean | null, err?: string) => void) => {
      appendLog(`checkAccess requested for ${nodeId}`);
      if (!USE_BACKEND) {
        onResult(null, 'On-chain check unavailable (backend disabled).');
        return;
      }
      try {
        const res = await fetch(`${API_BASE}/api/onchain/check?node=${encodeURIComponent(nodeId)}`);
        if (!res.ok) {
          const txt = await res.text().catch(() => '');
          throw new Error(`HTTP ${res.status} ${txt}`);
        }
        const data = await res.json();
        onResult(Boolean(data?.access ?? null));
        appendLog(`checkAccess(${nodeId}) => ${String(data?.access)}`);
      } catch (e: any) {
        const msg = String(e?.message ?? e);
        onResult(null, msg);
        appendLog(`checkAccess failed for ${nodeId}: ${msg}`);
      }
    },
    [appendLog]
  );

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
          <div style={{ marginLeft: 'auto' }}>
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
              disabled={!queryAddr || loading}
              className="px-4 py-2 rounded"
              style={{ backgroundColor: 'var(--sne-surface-elevated)' }}
            >
              {loading ? 'Verificando…' : 'Verificar'}
            </button>

            <button
              onClick={() => {
                setQueryAddr('');
                setLookup(null);
                setErr(null);
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
                    <button
                      onClick={() => {
                        checkLicenseOnChain(lic.nodeId ?? lic.id, (ok, e) => {
                          if (ok === null) {
                            alert(e ?? 'On-chain unavailable.');
                            return;
                          }
                          alert(`checkAccess: ${ok ? 'OK' : 'NÃO'}`);
                          // update UI state
                          setLookup((prev) => {
                            if (!prev) return prev;
                            return {
                              ...prev,
                              licenses: prev.licenses.map((l) =>
                                l.id === lic.id ? { ...l, lastChecked: new Date().toISOString() } : l
                              ),
                            };
                          });
                        });
                      }}
                      className="px-3 py-1 rounded"
                      style={{ backgroundColor: 'var(--sne-surface-elevated)' }}
                    >
                      Verificar on-chain
                    </button>

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
            <div className="space-y-3">
              {PRODUCTS.map((p) => (
                <div key={p.id} className="p-3 rounded border" style={{ backgroundColor: 'var(--sne-bg)', borderColor: 'var(--border)' }}>
                  <div style={{ fontWeight: 700 }}>{p.title}</div>
                  <div style={{ color: 'var(--sne-text-secondary)', fontSize: '0.9rem' }}>{p.features.join(' • ')}</div>
                  <div className="mt-2 flex items-center justify-between">
                    <div style={{ fontWeight: 600 }}>USD ${p.priceUSD}</div>
                    <a href={`/checkout/${p.id}`} className="px-3 py-1 rounded" style={{ backgroundColor: 'var(--sne-surface-elevated)' }}>
                      Comprar
                    </a>
                  </div>
                </div>
              ))}
            </div>
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
