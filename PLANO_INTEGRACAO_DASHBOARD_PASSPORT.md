# 📋 Plano de Integração: SNE Vault Dashboard ↔ SNE Scroll Passport

## 🔍 Análise da Situação Atual

### SNE Vault Dashboard (`snelabs.space/dashboard`)
**Problemas identificados:**
- ✅ **Dados hardcoded**: Array `PRODUCTS` (linhas 52-71) com preços e features fixos
- ✅ **Mock data**: Função `MOCK_LOOKUP` (linhas 122-136) retorna dados determinísticos falsos
- ✅ **API desconectada**: Tenta buscar de `https://snelabs.space/api` mas não existe backend real
- ✅ **Sem integração blockchain**: Não usa Viem/Wagmi para leituras on-chain diretas
- ✅ **Cache local simples**: Apenas localStorage básico, sem TTL inteligente
- ✅ **Sem wallet connection**: Não permite conectar wallet para ver dados próprios
- ✅ **Sem funcionalidades do Passport**: Não usa balance, gas tracker, watchlist do Scroll Passport

**Estrutura atual:**
```typescript
- API_BASE: 'https://snelabs.space/api' (não existe)
- USE_BACKEND: false (default) → sempre usa mock
- Endpoints esperados:
  - GET /api/onchain/lookup?addr={address}
  - GET /api/onchain/check?node={nodeId}
```

### SNE Scroll Passport (`pass.snelabs.space`)
**Funcionalidades disponíveis:**
- ✅ **Wallet Connection**: MetaMask, WalletConnect, Injected
- ✅ **Balance Display**: ETH + Tokens com cache (5min TTL)
- ✅ **Gas Tracker**: Preços de gas em tempo real (on-demand)
- ✅ **Public Address Spy**: Visualizar qualquer endereço sem wallet
- ✅ **Watchlist**: Gerenciar lista de endereços monitorados
- ✅ **Stack moderna**: Viem + Wagmi + TanStack Query + Zustand
- ✅ **Cache inteligente**: TTL configurável, fallback em rate limits
- ✅ **RPC otimizado**: Proxy Vite em dev, direto em produção

**Estrutura do Passport:**
```
src/
├── components/
│   ├── Balance/     # Exibição de saldo
│   ├── Gas/         # Gas tracker
│   ├── Public/      # Visualização pública
│   ├── Spy/         # Watchlist/Modo Spy
│   ├── Wallet/      # Conexão de wallet
│   └── Pro/         # Funcionalidades Pro
├── hooks/           # Custom hooks
├── lib/             # Configurações (Wagmi, etc.)
└── utils/           # Funções utilitárias
```

## 🎯 Objetivos da Integração

### 1. **Eliminar Dados Hardcoded**
- Remover array `PRODUCTS` hardcoded
- Remover função `MOCK_LOOKUP`
- Buscar dados reais do Scroll Passport ou on-chain

### 2. **Integrar Funcionalidades do Passport**
- Usar componentes do Passport (Balance, Gas, Wallet)
- Reutilizar hooks e utilities do Passport
- Compartilhar configuração Wagmi/Viem

### 3. **Conectar com Blockchain Real**
- Usar Viem para leituras on-chain diretas
- Integrar com Scroll L2 RPC
- Buscar dados de contratos SNE (licenças, keys, boxes)

### 4. **Melhorar UX**
- Adicionar wallet connection
- Mostrar balance real do usuário
- Gas tracker integrado
- Watchlist compartilhada

## 📐 Arquitetura Proposta

### Opção A: Integração via API Proxy (Recomendada para início)
```
SNE Vault Dashboard
    ↓ fetch
SNE Scroll Passport API (/api/*)
    ↓ Viem/Wagmi
Scroll L2 RPC
    ↓
Smart Contracts (SNELicenseRegistry, etc.)
```

**Vantagens:**
- Separação de responsabilidades
- Passport pode servir múltiplos clientes
- Cache centralizado
- Rate limiting centralizado

**Desvantagens:**
- Requer backend/API no Passport
- Latência adicional

### Opção B: Integração Direta (Recomendada para longo prazo)
```
SNE Vault Dashboard
    ↓ importa componentes/hooks do Passport
    ↓ Viem/Wagmi direto
Scroll L2 RPC
    ↓
Smart Contracts
```

**Vantagens:**
- Zero latência de API
- Reutilização completa de código
- Componentes compartilhados
- Melhor performance

**Desvantagens:**
- Acoplamento entre projetos
- Requer monorepo ou package compartilhado

### Opção C: Híbrida (Melhor solução)
```
SNE Vault Dashboard
    ├─→ Importa componentes UI do Passport (Balance, Gas, Wallet)
    ├─→ Usa hooks do Passport (useBalance, useGasPrice)
    └─→ API Proxy para dados SNE específicos (licenças, keys, boxes)
```

## 🛠️ Plano de Implementação

### Fase 1: Preparação e Infraestrutura
**Tarefas:**
1. ✅ Analisar estrutura do SNE Scroll Passport
2. ✅ Identificar componentes/hooks reutilizáveis
3. ✅ Definir API contract entre Dashboard e Passport
4. ✅ Configurar monorepo ou package compartilhado (opcional)

**Arquivos a criar:**
- `src/lib/passport-integration.ts` - Cliente para API do Passport
- `src/hooks/usePassportData.ts` - Hook para buscar dados do Passport
- `src/types/passport.ts` - Types compartilhados

### Fase 2: Remover Dados Hardcoded
**Tarefas:**
1. Remover array `PRODUCTS` hardcoded
2. Remover função `MOCK_LOOKUP`
3. Criar service para buscar produtos de API/on-chain
4. Implementar fallback graceful quando API indisponível

**Mudanças em `Dashboard.tsx`:**
```typescript
// REMOVER:
const PRODUCTS = [ ... ]; // linhas 52-71
const MOCK_LOOKUP = useCallback(...); // linhas 122-136

// ADICIONAR:
import { usePassportProducts } from '../hooks/usePassportData';
import { usePassportLookup } from '../hooks/usePassportData';
```

### Fase 3: Integrar Wallet Connection
**Tarefas:**
1. Instalar dependências: `wagmi`, `@tanstack/react-query`, `viem`
2. Configurar Wagmi provider (mesma config do Passport)
3. Adicionar componente Wallet do Passport
4. Mostrar balance quando wallet conectada
5. Auto-preenchimento de endereço quando wallet conectada

**Mudanças:**
```typescript
// Adicionar em Dashboard.tsx
import { useAccount, useBalance } from 'wagmi';
import { WalletConnect } from '../components/passport/Wallet';

// No componente:
const { address, isConnected } = useAccount();
const { data: balance } = useBalance({ address });
```

### Fase 4: Integrar Gas Tracker
**Tarefas:**
1. Importar componente Gas do Passport
2. Mostrar gas price no Dashboard
3. Atualizar quando usuário vai fazer transação

**Mudanças:**
```typescript
import { GasTracker } from '../components/passport/Gas';
// Adicionar no UI do Dashboard
```

### Fase 5: Integrar Balance e Token Display
**Tarefas:**
1. Importar componente Balance do Passport
2. Mostrar balance quando wallet conectada
3. Filtrar tokens spam/poeira (mesma lógica do Passport)
4. Cache compartilhado (5min TTL)

**Mudanças:**
```typescript
import { BalanceDisplay } from '../components/passport/Balance';
// Mostrar balance quando address está conectado
```

### Fase 6: Integrar Watchlist/Spy Mode
**Tarefas:**
1. Importar componente Spy do Passport
2. Permitir adicionar endereços à watchlist
3. Sincronizar watchlist entre Dashboard e Passport (localStorage compartilhado)
4. Quick access a endereços salvos

**Mudanças:**
```typescript
import { SpyMode, Watchlist } from '../components/passport/Spy';
// Adicionar seção de watchlist no Dashboard
```

### Fase 7: Buscar Dados On-Chain Reais
**Tarefas:**
1. Criar service para ler contratos SNE na Scroll L2
2. Buscar licenças do `SNELicenseRegistry`
3. Buscar keys e boxes de contratos correspondentes
4. Substituir mock por dados reais

**Novo arquivo: `src/services/sne-contracts.ts`:**
```typescript
import { createPublicClient, http } from 'viem';
import { scroll } from 'viem/chains';

const client = createPublicClient({
  chain: scroll,
  transport: http('https://rpc.scroll.io'),
});

export async function getLicensesForAddress(address: string) {
  // Ler do SNELicenseRegistry
}

export async function getKeysForAddress(address: string) {
  // Ler do contrato de keys
}

export async function getBoxesForAddress(address: string) {
  // Ler do contrato de boxes
}
```

### Fase 8: API Proxy (Opcional)
**Tarefas:**
1. Criar endpoints no Passport para dados SNE:
   - `GET /api/sne/licenses?addr={address}`
   - `GET /api/sne/keys?addr={address}`
   - `GET /api/sne/boxes?addr={address}`
2. Cache no backend (Redis ou similar)
3. Rate limiting
4. Dashboard usa API quando disponível, fallback para on-chain direto

## 📦 Dependências Necessárias

### Adicionar ao `package.json`:
```json
{
  "dependencies": {
    "wagmi": "^2.0.0",
    "@tanstack/react-query": "^5.0.0",
    "viem": "^2.0.0", // já existe, verificar versão
    "@wagmi/core": "^2.0.0",
    "@wagmi/connectors": "^2.0.0"
  }
}
```

### Configuração Wagmi (criar `src/lib/wagmi.ts`):
```typescript
import { createConfig, http } from 'wagmi';
import { scroll } from 'wagmi/chains';
import { injected, walletConnect } from '@wagmi/connectors';

export const wagmiConfig = createConfig({
  chains: [scroll],
  connectors: [
    injected(),
    walletConnect({ projectId: 'YOUR_PROJECT_ID' }),
  ],
  transports: {
    [scroll.id]: http('https://rpc.scroll.io'),
  },
});
```

## 🔄 Fluxo de Dados Proposto

### Cenário 1: Usuário sem Wallet (Read-only)
```
1. Usuário digita endereço
2. Dashboard busca:
   - Balance → Passport API ou Viem direto
   - Licenças → Contrato SNELicenseRegistry (Viem)
   - Keys → Contrato SNEKeys (Viem)
   - Boxes → Contrato SNEBoxes (Viem)
3. Cache local (5min TTL)
4. Exibe dados
```

### Cenário 2: Usuário com Wallet Conectada
```
1. Usuário conecta wallet
2. Dashboard auto-preenche endereço
3. Busca balance próprio (Wagmi hook)
4. Busca licenças/keys/boxes próprias
5. Mostra gas tracker
6. Permite adicionar à watchlist
```

### Cenário 3: Watchlist
```
1. Usuário adiciona endereço à watchlist
2. Salva no localStorage (chave compartilhada com Passport)
3. Dashboard mostra quick access
4. Passport também mostra na watchlist
```

## 🎨 Mudanças na UI

### Adicionar ao Dashboard:
1. **Header com Wallet Connection**
   - Botão "Connect Wallet" (componente do Passport)
   - Quando conectado: mostrar address + balance

2. **Gas Tracker Widget**
   - Pequeno widget no topo
   - Atualiza on-demand

3. **Balance Display**
   - Quando wallet conectada: mostrar balance próprio
   - Quando endereço pesquisado: mostrar balance do endereço

4. **Watchlist Sidebar**
   - Lista de endereços salvos
   - Quick lookup
   - Sincronizado com Passport

5. **Remover Seção de Produtos Hardcoded**
   - Substituir por busca dinâmica
   - Ou remover completamente se não for necessário

## 🚨 Considerações Importantes

### 1. **Rate Limiting & RPC Quotas**
- **Problema**: Leituras on-chain massivas podem estourar quotas RPC
- **Solução**: 
  - Implementar retries com exponential backoff
  - Circuit breakers para evitar cascata de falhas
  - Usar multicall (Viem) para reduzir chamadas RPC
  - Cache agressivo (TTLs por tipo de dado)
  - Rate limiting no proxy (se usar API)

### 2. **TTLs por Tipo de Dado**
- **Balances/tokens**: 60-300s (5min padrão do Passport)
- **Gas price**: 10-30s (on-demand, muito volátil)
- **Licenças/keys/boxes**: 5-30min (dados menos voláteis, dependendo de frequência de mudanças)
- **Produtos**: 30min (dados quase estáticos)

### 3. **CORS & Autenticação**
- Em dev: Vite proxy (`/api/rpc`) resolve CORS automaticamente
- Em produção: RPC deve aceitar requests do domínio
- Se expor API proxy: configurar CORS adequadamente
- Proteção contra abuso: rate limits, CSP, logging

### 4. **Error Handling & Resilience**
- Fallback graceful quando API/on-chain falha
- Mostrar mensagem clara ao usuário
- Não quebrar UI completamente
- Retry strategy: 3 tentativas, exponential backoff (1s, 2s, 4s)
- Circuit breaker: parar tentativas após X falhas consecutivas

### 5. **Caching & Performance**
- **TanStack Query**: Cache client-side com TTLs configuráveis
- **Redis** (no proxy): Cache server-side para reduzir carga RPC
- **localStorage**: Fallback quando API indisponível
- **BroadcastChannel**: Sincronização cross-tab
- Lazy load componentes do Passport
- Code splitting para reduzir bundle inicial

### 6. **Dependências & Versões**
- **CRÍTICO**: Alinhar versões de `viem`/`wagmi` entre projetos antes de importar
- Verificar compatibilidade de versões React (deve ser 18+)
- Documentar versões exatas no `package.json`
- Considerar lock file compartilhado se usar monorepo

### 7. **Monorepo vs Packages**
- **Acoplamento**: Aumenta se não houver estratégia de versionamento
- **Monorepo**: Facilita compartilhamento mas exige ajustes na pipeline
- **Packages**: Mais isolamento mas requer versionamento semântico
- **Recomendação**: Começar com imports diretos, migrar para package/monorepo se necessário

### 8. **Testes On-Chain**
- **Ferramentas**: Anvil (fork local) ou Hardhat
- **Cobertura**: Testar leitura de contratos SNE reais
- **E2E**: Testar fluxo completo com wallet real (testnet)
- Ver `TESTING_STRATEGY.md` para detalhes

### 9. **Observabilidade**
- **Sentry**: Error tracking e monitoring
- **Métricas**: Prometheus/Grafana para cache hits/miss, latency, error rates
- **Logging**: Estruturado, sem dados sensíveis
- **Alertas**: Rate limit excedido, RPC falhas, cache miss alto

### 10. **Security**
- **Validação**: Sanitizar e validar endereços (regex, checksum)
- **Rate Limits**: Proteger endpoints públicos
- **CSP**: Content Security Policy adequado
- **XSS**: Proteção contra injection
- **Logging**: Não expor chaves privadas ou dados sensíveis

### 11. **Compatibilidade**
- Manter modo "backendless" como fallback
- Variável `VITE_USE_BACKEND` ainda funciona
- Mas agora também tenta on-chain direto quando backend desabilitado
- Graceful degradation: mostrar dados disponíveis mesmo se alguns falharem

## 📊 Métricas de Sucesso

### Antes da Integração:
- ❌ 100% dados mock/hardcoded
- ❌ 0% integração com blockchain
- ❌ 0% funcionalidades do Passport

### Depois da Integração:
- ✅ 0% dados hardcoded (tudo vem de on-chain/API)
- ✅ 100% integração com blockchain (Viem/Wagmi)
- ✅ 100% funcionalidades do Passport (wallet, balance, gas, watchlist)

## 🗺️ Roadmap de Implementação

### Sprint 1 (Semana 1): Preparação e Infraestrutura ⚡ PRIORITÁRIO
**Objetivo**: Setup completo para integração, PoC funcional

- [ ] **Alinhar dependências** (`viem`, `wagmi`, `@tanstack/react-query`)
- [ ] **Definir API Contract** (ver `API_CONTRACT.md`)
- [ ] **Configurar Wagmi/Viem** (`src/lib/wagmi.ts`, `src/lib/viem-client.ts`)
- [ ] **Setup Providers** (WagmiProvider, QueryClientProvider)
- [ ] **PoC Wallet Connection** (componente funcional + balance display)
- [ ] **Criar estrutura** (`src/services/sne-contracts.ts` stubbed)
- [ ] **Configurar cache** (TanStack Query com TTLs)
- [ ] **Variáveis de ambiente** (`.env.example` atualizado)

**Deliverables:**
- ✅ Wallet conecta e mostra balance
- ✅ Estrutura de integração criada
- ✅ API Contract definido
- ✅ Zero erros de build

**Ver checklist detalhado**: `CHECKLIST_SPRINT1.md`

### Sprint 2 (Semana 2): Remover Hardcoded
**Objetivo**: Eliminar todos os dados mock/hardcoded

- [ ] Remover array `PRODUCTS` hardcoded
- [ ] Remover função `MOCK_LOOKUP`
- [ ] Criar service `getProducts()` (busca de API ou on-chain)
- [ ] Implementar fallback graceful quando API indisponível
- [ ] Atualizar UI para usar dados dinâmicos
- [ ] Testes unitários para services

**Deliverables:**
- ✅ Zero dados hardcoded
- ✅ Fallback funcional
- ✅ UI atualizada

### Sprint 3 (Semana 3): Wallet & Balance Completo
**Objetivo**: Integração completa de wallet e balance

- [ ] Integrar componente Wallet do Passport (ou criar próprio)
- [ ] Mostrar balance quando wallet conectada
- [ ] Auto-preenchimento de endereço quando conectado
- [ ] Mostrar balance de endereço pesquisado (read-only)
- [ ] Filtrar tokens spam/poeira (mesma lógica do Passport)
- [ ] Cache compartilhado (5min TTL)

**Deliverables:**
- ✅ Wallet connection completa
- ✅ Balance display funcional
- ✅ Auto-preenchimento

### Sprint 4 (Semana 4): Gas Tracker & Watchlist
**Objetivo**: Funcionalidades adicionais do Passport

- [ ] Integrar componente Gas Tracker
- [ ] Mostrar gas price no Dashboard
- [ ] Atualização on-demand
- [ ] Integrar componente Watchlist/Spy
- [ ] Sincronização localStorage entre Dashboard e Passport
- [ ] Quick access a endereços salvos
- [ ] BroadcastChannel para cross-tab sync

**Deliverables:**
- ✅ Gas tracker funcional
- ✅ Watchlist sincronizada
- ✅ Cross-tab sync

### Sprint 5 (Semana 5): On-Chain Real
**Objetivo**: Buscar dados reais de contratos SNE

- [ ] Implementar `getLicensesForAddress()` (leitura real)
- [ ] Implementar `getKeysForAddress()` (leitura real)
- [ ] Implementar `getBoxesForAddress()` (leitura real)
- [ ] Usar multicall para reduzir chamadas RPC
- [ ] Substituir todos os mocks por dados reais
- [ ] Testes on-chain (Anvil/Hardhat)

**Deliverables:**
- ✅ Dados 100% reais (on-chain)
- ✅ Multicall implementado
- ✅ Testes on-chain passando

### Sprint 6 (Semana 6): Polimento & Otimização
**Objetivo**: Performance, testes, documentação

- [ ] Testes E2E (Playwright)
- [ ] Performance optimization (bundle size, lazy loading)
- [ ] Error handling completo (retry, circuit breaker)
- [ ] Observabilidade (Sentry, métricas)
- [ ] Documentação final
- [ ] Code review e refactoring

**Deliverables:**
- ✅ Testes completos (unit, integration, E2E)
- ✅ Performance otimizada
- ✅ Documentação completa
- ✅ Pronto para produção

## 📚 Documentos Relacionados

- **`API_CONTRACT.md`**: Especificação completa da API (endpoints, schemas, TTLs, rate limits)
- **`CHECKLIST_SPRINT1.md`**: Checklist técnico detalhado para Sprint 1
- **`TESTING_STRATEGY.md`**: Estratégia completa de testes (unit, integration, E2E, on-chain)

## 🔗 Links e Referências

- **SNE Scroll Passport**: https://github.com/SNE-Labs/SNE-Scroll-Passport
- **Passport Live**: https://pass.snelabs.space/
- **Dashboard Atual**: https://snelabs.space/dashboard
- **Viem Docs**: https://viem.sh/
- **Wagmi Docs**: https://wagmi.sh/
- **Scroll L2 Docs**: https://docs.scroll.io/
- **TanStack Query**: https://tanstack.com/query/latest
- **MSW (Mock Service Worker)**: https://mswjs.io/
- **Anvil (Fork Local)**: https://book.getfoundry.sh/anvil/

## ✅ Melhorias UX Recomendadas (MVP+)

### Incluir já no MVP:
- ✅ **Status de transações**: Mostrar pending / 0-confirm / confirmed
- ✅ **ENS Resolution**: Auto-resolver ENS e reverse lookup
- ✅ **Copy buttons**: Botão "copiar endereço / tx" e link para explorer
- ✅ **Fallback visual**: Skeletons / mensagens claras quando API/offchain indisponível
- ✅ **Spam filtering**: Dedup tokens spam com heurística (balance < X && transfers < Y)

### Para versões futuras:
- 📊 **PnL Cards**: Cards compartilháveis de PnL (viral feature)
- 🔄 **Transaction History**: Histórico completo de transações
- 📝 **Contract Decoder**: Transações legíveis por humanos
- 🎯 **Intelligent Token Filtering**: Filtragem inteligente avançada

---

## 🎯 Conclusão e Próximos Passos

### Status Atual
✅ **Planejamento Completo** - Documentação detalhada criada:
- Diagnóstico completo do estado atual
- Arquitetura híbrida (Opção C) definida
- Roadmap por sprints com tarefas específicas
- Considerações práticas (cache, CORS, TTL, rate limits)
- API Contract especificado
- Checklist técnico para Sprint 1
- Estratégia de testes completa

### Recomendações Prioritárias
1. **Adotar Opção C (Híbrida)** como ponto de partida
2. **Criar API Contract** (já criado em `API_CONTRACT.md`)
3. **Alinhar dependências** antes de começar
4. **PoC rápido**: Wallet + Balance + Lookup on-chain

### Próximos Passos Imediatos
1. ✅ Revisar `API_CONTRACT.md` e validar com equipe
2. ✅ Revisar `CHECKLIST_SPRINT1.md` e iniciar Sprint 1
3. ✅ Configurar ambiente de desenvolvimento (Wagmi/Viem)
4. ✅ Fazer PoC de wallet connection + balance

### Riscos Mitigados
- ✅ Versões de dependências: Checklist inclui verificação
- ✅ API Contract: Documento completo criado
- ✅ Rate limits: Estratégias de cache e retry definidas
- ✅ Testes: Estratégia completa documentada
- ✅ Performance: TTLs e caching strategy definidos

---

**Status**: 📋 Planejamento Completo e Aprimorado - Pronto para implementação
**Próximo Passo**: Iniciar Sprint 1 seguindo `CHECKLIST_SPRINT1.md`

