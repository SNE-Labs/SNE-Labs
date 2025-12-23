# Produtos Definidos Localmente

## Mudança de Arquitetura

**Antes**: Produtos carregados via API (`/api/sne/products`)  
**Agora**: Produtos definidos localmente em `src/data/products.ts`

## Motivação

Como o usuário corretamente apontou:
> "não faz sentido carregar os produtos a partir de jsons, o contrato só servirá para assinar a transação, não para gerar produtos"

Os produtos são **catálogo estático** que não muda frequentemente. O contrato blockchain serve apenas para:
- Assinar a transação de compra
- Validar a transação
- Registrar a compra on-chain

## Estrutura

### Arquivo: `src/data/products.ts`

```typescript
export const PRODUCTS: Product[] = [
  {
    id: 'sne-box-tier3',
    title: 'SNE Box — Tier 3',
    priceUSD: '3499',
    priceETH: '0.1234',
    features: [...],
    available: true,
    contractAddress: '0x...', // TODO: Adicionar endereço real
  },
  // ... mais produtos
];
```

## Benefícios

1. ✅ **Sem dependência de API** — produtos sempre disponíveis
2. ✅ **Performance** — sem requisições HTTP desnecessárias
3. ✅ **Simplicidade** — fácil de atualizar preços/features
4. ✅ **Offline-first** — funciona mesmo se API estiver down
5. ✅ **Contratos apenas para transações** — arquitetura correta

## Próximos Passos

1. Adicionar endereços reais dos contratos quando disponíveis
2. Integrar `useWriteContract` do Wagmi para transações reais
3. Adicionar validação de balance antes de permitir compra

