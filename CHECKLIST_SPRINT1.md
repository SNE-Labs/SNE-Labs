# ✅ Checklist Técnico - Sprint 1: Preparação e Infraestrutura

## 📋 Pré-requisitos

### 1. Alinhamento de Dependências
- [ ] Verificar versão atual de `viem` no SNE Vault
- [ ] Verificar versão atual de `viem` no SNE Scroll Passport
- [ ] Alinhar versões (recomendado: `viem@^2.0.0`)
- [ ] Verificar versão de `wagmi` no Passport
- [ ] Instalar `wagmi@^2.0.0` no SNE Vault (se não existir)
- [ ] Instalar `@tanstack/react-query@^5.0.0` no SNE Vault
- [ ] Verificar compatibilidade de versões React (deve ser 18+)

**Comando de verificação:**
```bash
cd "SNE VAULT"
npm list viem wagmi @tanstack/react-query
```

### 2. Definir API Contract
- [ ] Revisar `API_CONTRACT.md` criado
- [ ] Validar endpoints com equipe
- [ ] Definir schemas JSON finais
- [ ] Documentar códigos de erro
- [ ] Definir TTLs por endpoint
- [ ] Criar OpenAPI spec (YAML/JSON)

### 3. Configuração Wagmi/Viem

#### Criar `src/lib/wagmi.ts`
- [ ] Criar arquivo de configuração Wagmi
- [ ] Configurar chain Scroll L2
- [ ] Configurar connectors (injected, walletConnect)
- [ ] Configurar RPC endpoint (Scroll L2)
- [ ] Exportar `wagmiConfig`

**Template:**
```typescript
import { createConfig, http } from 'wagmi';
import { scroll } from 'wagmi/chains';
import { injected, walletConnect } from '@wagmi/connectors';

export const wagmiConfig = createConfig({
  chains: [scroll],
  connectors: [
    injected(),
    walletConnect({ projectId: process.env.VITE_WALLETCONNECT_PROJECT_ID }),
  ],
  transports: {
    [scroll.id]: http('https://rpc.scroll.io'),
  },
});
```

#### Criar `src/lib/viem-client.ts`
- [ ] Criar cliente Viem público para leituras on-chain
- [ ] Configurar chain Scroll
- [ ] Exportar `publicClient`

**Template:**
```typescript
import { createPublicClient, http } from 'viem';
import { scroll } from 'viem/chains';

export const publicClient = createPublicClient({
  chain: scroll,
  transport: http('https://rpc.scroll.io'),
});
```

### 4. Provider Setup

#### Atualizar `src/main.tsx`
- [ ] Importar `WagmiProvider` e `QueryClientProvider`
- [ ] Envolver App com providers
- [ ] Configurar QueryClient com default options

**Template:**
```typescript
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { wagmiConfig } from './lib/wagmi';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      gcTime: 10 * 60 * 1000, // 10 minutos (antigo cacheTime)
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <WagmiProvider config={wagmiConfig}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </WagmiProvider>
);
```

### 5. PoC: Wallet Connection + Balance

#### Criar componente de teste
- [ ] Criar `src/components/passport/WalletConnect.tsx`
- [ ] Usar `useAccount`, `useConnect`, `useDisconnect` do Wagmi
- [ ] Exibir botão "Connect Wallet"
- [ ] Mostrar address quando conectado
- [ ] Testar conexão end-to-end

**Template básico:**
```typescript
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from '@wagmi/connectors';

export function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div>
        <p>Connected: {address}</p>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );
  }

  return (
    <button onClick={() => connect({ connector: injected() })}>
      Connect Wallet
    </button>
  );
}
```

#### Criar hook de balance
- [ ] Criar `src/hooks/useBalance.ts`
- [ ] Usar `useBalance` do Wagmi
- [ ] Formatar valor ETH
- [ ] Testar exibição de balance

### 6. Service: SNE Contracts

#### Criar `src/services/sne-contracts.ts`
- [ ] Criar arquivo de service
- [ ] Importar `publicClient` do viem-client
- [ ] Definir endereços de contratos (stub por enquanto)
- [ ] Criar função `getLicensesForAddress(address)` (stubbed)
- [ ] Criar função `getKeysForAddress(address)` (stubbed)
- [ ] Criar função `getBoxesForAddress(address)` (stubbed)
- [ ] Adicionar tipos TypeScript

**Template:**
```typescript
import { publicClient } from '../lib/viem-client';
import type { Address } from 'viem';

// Stub - será implementado na Sprint 5
const SNELicenseRegistry = '0x...' as Address;

export async function getLicensesForAddress(address: Address) {
  // TODO: Implementar leitura on-chain
  // Por enquanto retorna array vazio
  return [];
}

export async function getKeysForAddress(address: Address) {
  return [];
}

export async function getBoxesForAddress(address: Address) {
  return [];
}
```

### 7. Configuração de Cache

#### TanStack Query Setup
- [ ] Configurar `staleTime` padrão (5min)
- [ ] Configurar `gcTime` (10min)
- [ ] Configurar retry strategy (3 tentativas, exponential backoff)
- [ ] Configurar `refetchOnWindowFocus: false` (opcional)

#### Criar hook de cache compartilhado
- [ ] Criar `src/hooks/useCachedLookup.ts`
- [ ] Usar TanStack Query para cache
- [ ] Implementar TTL de 5 minutos
- [ ] Implementar fallback para localStorage

### 8. Variáveis de Ambiente

#### Criar `.env.example`
- [ ] Adicionar `VITE_WALLETCONNECT_PROJECT_ID`
- [ ] Adicionar `VITE_SCROLL_RPC_URL` (opcional, com default)
- [ ] Adicionar `VITE_PASSPORT_API_URL` (default: `https://pass.snelabs.space/api`)
- [ ] Adicionar `VITE_USE_BACKEND` (manter compatibilidade)

#### Atualizar `.env.local` (se necessário)
- [ ] Configurar WalletConnect Project ID
- [ ] Testar variáveis de ambiente

### 9. Estrutura de Pastas

#### Criar estrutura de integração
- [ ] Criar `src/lib/` (se não existir)
- [ ] Criar `src/hooks/passport/` para hooks compartilhados
- [ ] Criar `src/components/passport/` para componentes
- [ ] Criar `src/services/` para services
- [ ] Criar `src/types/passport.ts` para tipos compartilhados

### 10. Testes Básicos

#### Teste de Wallet Connection
- [ ] Testar conexão com MetaMask
- [ ] Testar desconexão
- [ ] Testar mudança de conta
- [ ] Testar mudança de rede (Scroll L2)

#### Teste de Balance
- [ ] Testar exibição de balance quando conectado
- [ ] Testar formatação de valores
- [ ] Testar atualização quando balance muda

#### Teste de RPC
- [ ] Testar conexão com Scroll RPC
- [ ] Testar leitura básica (ex: `getBlockNumber`)
- [ ] Verificar rate limits

### 11. Documentação

#### Atualizar README
- [ ] Adicionar seção de integração com Passport
- [ ] Documentar variáveis de ambiente novas
- [ ] Adicionar instruções de setup

#### Criar docs de desenvolvimento
- [ ] Documentar estrutura de pastas
- [ ] Documentar hooks disponíveis
- [ ] Documentar services

### 12. CI/CD (Opcional mas recomendado)

#### Verificar build
- [ ] Testar `npm run build` após mudanças
- [ ] Verificar se não quebrou build existente
- [ ] Testar em modo desenvolvimento

#### Verificar lint
- [ ] Executar `npm run lint`
- [ ] Corrigir erros de lint
- [ ] Manter padrões de código

---

## 🎯 Critérios de Aceitação - Sprint 1

### Funcionalidades
- ✅ Wallet connection funciona (MetaMask)
- ✅ Balance é exibido quando wallet conectada
- ✅ Estrutura de integração criada
- ✅ Wagmi/Viem configurados corretamente
- ✅ TanStack Query configurado com cache

### Técnico
- ✅ Sem erros de build
- ✅ Sem erros de lint
- ✅ Types TypeScript corretos
- ✅ Variáveis de ambiente documentadas

### Documentação
- ✅ API Contract definido
- ✅ README atualizado
- ✅ Estrutura de pastas documentada

---

## 🚨 Riscos e Mitigações

### Risco: Incompatibilidade de versões
**Mitigação:** Verificar e alinhar versões antes de começar

### Risco: RPC rate limits
**Mitigação:** Implementar cache desde o início, usar multicall quando possível

### Risco: Wallet não conecta
**Mitigação:** Testar com múltiplos wallets, ter fallback para modo read-only

### Risco: Build quebra
**Mitigação:** Testar build após cada mudança, manter compatibilidade com código existente

---

## 📊 Métricas de Sucesso

- ✅ Wallet connection: 100% funcional
- ✅ Balance display: Funciona quando conectado
- ✅ Zero erros de build
- ✅ Zero erros de lint
- ✅ Documentação completa

---

**Status**: 📋 Checklist criado - Pronto para execução
**Tempo estimado**: 1 semana (Sprint 1)
**Próximo passo**: Iniciar item 1 (Alinhamento de Dependências)

