# 🎯 Sprint 3: Wallet & Balance Completo

## 📊 Status Atual

### ✅ Já Implementado (Sprint 1):
- ✅ Wallet connection básica (WalletConnect component)
- ✅ Balance display básico (BalanceDisplay - apenas ETH)
- ✅ Gas tracker (GasTracker component)
- ✅ Auto-preenchimento de endereço

### ⏳ O que falta (Sprint 3):

## 🎯 Objetivos do Sprint 3

### 1. Melhorar Balance Display
- [ ] Mostrar tokens além de ETH (quando API retornar)
- [ ] Filtrar tokens spam/poeira (mesma lógica do Passport)
- [ ] Mostrar balance de endereço pesquisado (read-only, não só wallet conectada)
- [ ] Adicionar loading states melhores
- [ ] Adicionar formatação de valores (decimais, símbolos)

### 2. Melhorar Wallet Connection UI
- [ ] Melhorar design do componente WalletConnect
- [ ] Adicionar dropdown com opções de wallet
- [ ] Mostrar network (Scroll L2)
- [ ] Adicionar indicador de conexão
- [ ] Melhorar feedback visual

### 3. Balance de Endereço Pesquisado
- [ ] Quando usuário pesquisa endereço, mostrar balance dele
- [ ] Usar `useBalance()` hook com endereço pesquisado
- [ ] Exibir em seção separada ou junto com lookup

### 4. Filtro de Tokens Spam
- [ ] Implementar lógica de filtro (balance < X && transfers < Y)
- [ ] Adicionar toggle "Mostrar tokens spam"
- [ ] Cache de tokens filtrados

## 📋 Tarefas Detalhadas

### Tarefa 1: Melhorar BalanceDisplay
**Arquivo**: `src/components/passport/BalanceDisplay.tsx`

**Mudanças**:
```typescript
// Adicionar suporte a tokens
// Filtrar spam tokens
// Melhorar formatação
```

### Tarefa 2: Adicionar Balance de Endereço Pesquisado
**Arquivo**: `src/app/pages/Dashboard.tsx`

**Mudanças**:
```typescript
// Quando queryAddr mudar, buscar balance
const balanceQuery = useBalance(queryAddr ? queryAddr as Address : null);
// Exibir balance na seção de lookup
```

### Tarefa 3: Melhorar WalletConnect UI
**Arquivo**: `src/components/passport/WalletConnect.tsx`

**Mudanças**:
- Adicionar dropdown de wallets
- Melhorar design
- Adicionar indicadores visuais

### Tarefa 4: Implementar Filtro de Spam
**Arquivo**: `src/hooks/usePassportData.ts` ou novo arquivo

**Mudanças**:
- Função para filtrar tokens spam
- Hook ou util para aplicar filtro

## 🎨 Melhorias de UX

1. **Balance Display**:
   - Mostrar múltiplos tokens
   - Toggle para mostrar/ocultar spam
   - Formatação melhor de valores

2. **Wallet Connection**:
   - Dropdown com opções
   - Indicador de network
   - Feedback visual melhor

3. **Balance Pesquisado**:
   - Exibir junto com lookup results
   - Loading state
   - Error handling

## 📊 Prioridades

### Alta Prioridade:
1. ✅ Balance de endereço pesquisado (read-only)
2. ✅ Melhorar formatação de valores
3. ✅ Loading states melhores

### Média Prioridade:
4. ⏳ Filtro de tokens spam
5. ⏳ Melhorar UI do WalletConnect

### Baixa Prioridade:
6. ⏳ Dropdown de wallets
7. ⏳ Indicador de network

## 🧪 Critérios de Aceitação

- [ ] Balance de endereço pesquisado é exibido
- [ ] Tokens são formatados corretamente
- [ ] Loading states funcionam
- [ ] Error handling robusto
- [ ] UI melhorada e consistente

## ⏱️ Estimativa

- **Tarefa 1**: 2-3 horas
- **Tarefa 2**: 1-2 horas
- **Tarefa 3**: 2-3 horas
- **Tarefa 4**: 1-2 horas

**Total**: 6-10 horas

---

**Status**: 📋 Planejado
**Próximo**: Iniciar implementação do Sprint 3

