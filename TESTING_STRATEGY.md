# 🧪 Estratégia de Testes - Integração Dashboard ↔ Passport

## 📋 Visão Geral

Estratégia de testes para garantir que a integração entre SNE Vault Dashboard e SNE Scroll Passport funcione corretamente, especialmente para leituras on-chain e interações com contratos.

## 🎯 Objetivos

1. **Garantir leituras on-chain corretas** (contratos SNE)
2. **Validar integração com Passport** (API, componentes, hooks)
3. **Prevenir regressões** durante desenvolvimento
4. **Validar performance** (cache, rate limits, TTLs)
5. **Garantir segurança** (validação de endereços, sanitização)

## 🏗️ Arquitetura de Testes

### Camadas de Testes

```
┌─────────────────────────────────────┐
│   E2E Tests (Playwright/Cypress)   │  ← Testes de UI completos
├─────────────────────────────────────┤
│   Integration Tests (Vitest)       │  ← Testes de integração API/on-chain
├─────────────────────────────────────┤
│   Unit Tests (Vitest)              │  ← Testes de funções isoladas
├─────────────────────────────────────┤
│   Contract Tests (Hardhat/Anvil)   │  ← Testes de contratos SNE
└─────────────────────────────────────┘
```

## 🧪 Tipos de Testes

### 1. Unit Tests

**O que testar:**
- Funções utilitárias (formatação, validação)
- Hooks customizados (useBalance, useCachedLookup)
- Services (sne-contracts.ts)
- Helpers de cache

**Ferramentas:**
- Vitest
- @testing-library/react-hooks

**Exemplo:**
```typescript
// src/services/__tests__/sne-contracts.test.ts
import { describe, it, expect, vi } from 'vitest';
import { getLicensesForAddress } from '../sne-contracts';
import { publicClient } from '../../lib/viem-client';

vi.mock('../../lib/viem-client');

describe('getLicensesForAddress', () => {
  it('should return empty array for address with no licenses', async () => {
    vi.mocked(publicClient.readContract).mockResolvedValue([]);
    const result = await getLicensesForAddress('0x123...');
    expect(result).toEqual([]);
  });
});
```

### 2. Integration Tests

**O que testar:**
- Integração com API do Passport
- Integração com RPC Scroll L2
- Cache behavior (TTL, invalidation)
- Retry logic e error handling
- Rate limiting

**Ferramentas:**
- Vitest
- MSW (Mock Service Worker) para mock de API
- Anvil (fork local de Scroll)

**Exemplo:**
```typescript
// src/__tests__/integration/passport-api.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { server } from '../mocks/server';
import { lookupAddress } from '../../services/passport-api';

describe('Passport API Integration', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  it('should fetch address data from API', async () => {
    const result = await lookupAddress('0x123...');
    expect(result.licenses).toBeDefined();
    expect(result.keys).toBeDefined();
  });
});
```

### 3. Contract Tests (On-Chain)

**O que testar:**
- Leitura de contratos SNE reais
- Validação de ABI
- Parsing de dados on-chain
- Multicall functionality
- Error handling de contratos

**Ferramentas:**
- Hardhat ou Anvil
- Fork de Scroll L2 (ou testnet)
- Viem para interações

**Setup:**
```typescript
// test/setup/scroll-fork.ts
import { createTestClient, http } from 'viem';
import { scroll } from 'viem/chains';
import { anvil } from 'viem/chains';

// Fork Scroll L2 para testes
export const testClient = createTestClient({
  chain: scroll,
  mode: 'anvil',
  transport: http('http://localhost:8545'),
});
```

**Exemplo:**
```typescript
// src/services/__tests__/sne-contracts-onchain.test.ts
import { describe, it, expect } from 'vitest';
import { testClient } from '../../../test/setup/scroll-fork';
import { getLicensesForAddress } from '../sne-contracts';

describe('SNE Contracts On-Chain', () => {
  it('should read licenses from SNELicenseRegistry', async () => {
    const address = '0x...'; // Endereço de teste conhecido
    const licenses = await getLicensesForAddress(address);
    expect(licenses.length).toBeGreaterThan(0);
    expect(licenses[0]).toHaveProperty('id');
    expect(licenses[0]).toHaveProperty('status');
  });
});
```

### 4. E2E Tests

**O que testar:**
- Fluxo completo de wallet connection
- Busca de endereço e exibição de dados
- Interações de UI (cliques, inputs)
- Navegação entre páginas
- Responsividade

**Ferramentas:**
- Playwright (recomendado) ou Cypress
- Test wallets (MetaMask test accounts)

**Exemplo:**
```typescript
// e2e/dashboard.spec.ts
import { test, expect } from '@playwright/test';

test('should connect wallet and display balance', async ({ page }) => {
  await page.goto('http://localhost:5173/dashboard');
  
  // Clicar em Connect Wallet
  await page.click('text=Connect Wallet');
  
  // Aprovar conexão no MetaMask (mock)
  // ...
  
  // Verificar se balance é exibido
  await expect(page.locator('[data-testid="balance"]')).toBeVisible();
});
```

## 🔧 Setup de Ambiente de Testes

### 1. Instalar Dependências

```bash
npm install -D vitest @testing-library/react @testing-library/react-hooks @testing-library/jest-dom
npm install -D @playwright/test
npm install -D msw
npm install -D hardhat @nomicfoundation/hardhat-toolbox
```

### 2. Configurar Vitest

**`vitest.config.ts`:**
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### 3. Configurar MSW (Mock Service Worker)

**`test/mocks/handlers.ts`:**
```typescript
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://pass.snelabs.space/api/sne/lookup', ({ request }) => {
    const url = new URL(request.url);
    const addr = url.searchParams.get('addr');
    
    return HttpResponse.json({
      licenses: [],
      keys: [],
      boxes: [],
      pou: { nodesPublic: 0 },
    });
  }),
];
```

**`test/mocks/server.ts`:**
```typescript
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
```

### 4. Configurar Anvil (Fork Local)

**`test/setup/anvil.ts`:**
```typescript
import { createTestClient, http } from 'viem';
import { scroll } from 'viem/chains';
import { anvil } from 'viem/chains';

// Iniciar Anvil fork de Scroll
export async function startAnvilFork() {
  // Configurar fork de Scroll L2
  // Retornar testClient configurado
}
```

## 📝 Casos de Teste Prioritários

### Alta Prioridade

#### 1. Wallet Connection
- [ ] Conectar MetaMask
- [ ] Conectar WalletConnect
- [ ] Desconectar wallet
- [ ] Mudança de conta
- [ ] Mudança de rede (deve ser Scroll L2)

#### 2. Balance Display
- [ ] Exibir balance quando conectado
- [ ] Formatação correta de valores
- [ ] Atualização quando balance muda
- [ ] Tratamento de erro quando RPC falha

#### 3. Address Lookup
- [ ] Buscar endereço válido
- [ ] Buscar endereço inválido (erro)
- [ ] Buscar ENS (resolver)
- [ ] Cache funciona (não busca novamente dentro de TTL)
- [ ] Invalidação de cache após TTL

#### 4. On-Chain Reads
- [ ] Ler licenças de contrato
- [ ] Ler keys de contrato
- [ ] Ler boxes de contrato
- [ ] Multicall funciona
- [ ] Retry em caso de falha RPC

### Média Prioridade

#### 5. API Integration
- [ ] Buscar dados da API do Passport
- [ ] Fallback para on-chain quando API falha
- [ ] Rate limiting respeitado
- [ ] CORS funciona

#### 6. Cache Behavior
- [ ] TTLs corretos por tipo de dado
- [ ] Invalidação de cache
- [ ] localStorage sync
- [ ] Cross-tab sync (BroadcastChannel)

#### 7. Error Handling
- [ ] Erro de RPC (exibe mensagem clara)
- [ ] Erro de API (fallback)
- [ ] Rate limit (retry after)
- [ ] Endereço inválido (validação)

### Baixa Prioridade (Nice to Have)

#### 8. Performance
- [ ] Tempo de resposta < 2s
- [ ] Cache hit rate > 80%
- [ ] Sem memory leaks
- [ ] Bundle size não aumenta significativamente

#### 9. Security
- [ ] Validação de endereços (sanitização)
- [ ] Proteção XSS
- [ ] Rate limiting funciona
- [ ] Logs não expõem dados sensíveis

## 🚀 Executar Testes

### Desenvolvimento (Watch Mode)
```bash
npm run test:watch
```

### Uma vez
```bash
npm run test
```

### Coverage
```bash
npm run test:coverage
```

### E2E
```bash
npm run test:e2e
```

### On-Chain (requer Anvil rodando)
```bash
# Terminal 1: Iniciar Anvil
anvil --fork https://rpc.scroll.io

# Terminal 2: Rodar testes
npm run test:onchain
```

## 📊 Métricas de Qualidade

### Cobertura Mínima
- **Unit Tests**: 80%+
- **Integration Tests**: 70%+
- **E2E Tests**: Fluxos críticos 100%

### Performance
- **Tempo de teste**: < 30s para suite completa
- **Tempo de build**: Não aumentar significativamente

## 🔄 CI/CD Integration

### GitHub Actions

**`.github/workflows/test.yml`:**
```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run test
      - run: npm run test:e2e
```

## 🐛 Debugging

### Debug Unit Tests
```bash
npm run test:debug
```

### Debug E2E Tests
```bash
npm run test:e2e:debug
```

### Visualizar Coverage
```bash
npm run test:coverage
open coverage/index.html
```

---

## 📚 Recursos

- [Vitest Docs](https://vitest.dev/)
- [Playwright Docs](https://playwright.dev/)
- [MSW Docs](https://mswjs.io/)
- [Hardhat Docs](https://hardhat.org/)
- [Anvil Docs](https://book.getfoundry.sh/anvil/)

---

**Status**: 📋 Estratégia definida - Pronto para implementação
**Próximo passo**: Configurar ambiente de testes (Sprint 1)

