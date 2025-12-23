# 📖 SNE Dashboard API - Guia do Desenvolvedor

## 🚀 Quick Start

### Base URL
- **Production**: `https://pass.snelabs.space/api`
- **Development**: `http://localhost:5173/api`

### Autenticação
Atualmente, a API é **pública e read-only**. Não requer autenticação.

Para endpoints futuros que requerem autenticação, será usado:
- API Key via header `Authorization: Bearer {api_key}`
- Ou wallet signature para operações on-chain

### Rate Limits
- **Lookup**: 100 req/min por IP
- **Balance**: 200 req/min por IP
- **Gas**: 60 req/min por IP
- **Products**: 10 req/min por IP

### Retry Strategy (Recomendado)

Implemente retry com exponential backoff:

```typescript
async function fetchWithRetry(url: string, options: RequestInit, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      
      // Não retryar em erros client-side
      if (response.status === 400 || response.status === 401 || 
          response.status === 403 || response.status === 404) {
        return response;
      }
      
      // Retryar em erros server-side e rate limits
      if (response.ok || (response.status >= 500 && response.status < 600)) {
        return response;
      }
      
      // Rate limit - respeitar Retry-After
      if (response.status === 429) {
        const retryAfter = parseInt(response.headers.get('Retry-After') || '60');
        await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
        continue;
      }
      
      return response;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      // Exponential backoff: 1s, 2s, 4s
      const delay = Math.pow(2, i) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
```

## 📚 Documentação

### OpenAPI Spec
A especificação completa está disponível em:
- **YAML**: Ver `API_CONTRACT.md` (seção OpenAPI Schema)
- **Swagger UI**: `/api/docs` (quando implementado)

### Endpoints Principais

#### 1. Health Check
```bash
GET /health
```

#### 2. Lookup de Endereço
```bash
GET /sne/lookup?addr=0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
```

#### 3. Verificar Licença
```bash
GET /sne/check?node=0x4a7b...c3f9
```

#### 4. Balance
```bash
GET /balance?addr=0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
```

#### 5. Gas Price
```bash
GET /gas
```

#### 6. Produtos
```bash
GET /sne/products
```

## 🔍 Headers de Resposta

Todos os endpoints retornam headers úteis:

- `X-Cache-Status`: Status do cache (HIT/MISS/BYPASS)
- `X-Cache-Expiry`: Quando o cache expira (ISO 8601)
- `X-RateLimit-Limit`: Limite total
- `X-RateLimit-Remaining`: Requisições restantes
- `X-RateLimit-Reset`: Quando o rate limit reseta (Unix timestamp)
- `X-Request-ID`: ID único para debugging

## ⚠️ Códigos de Erro

| Código | HTTP | Ação |
|--------|------|------|
| `INVALID_PARAMETER` | 400 | Verificar formato do parâmetro |
| `ADDRESS_NOT_FOUND` | 404 | Endereço não tem dados |
| `RATE_LIMIT` | 429 | Aguardar `retryAfter` segundos |
| `RPC_ERROR` | 502 | Retryar após backoff |
| `INTERNAL_ERROR` | 500 | Retryar após backoff |

## 💡 Boas Práticas

### 1. Cache Client-side
Use cache local para reduzir requisições:
- Respeitar `X-Cache-Expiry` header
- Cache por 5 minutos (TTL padrão)
- Invalidar cache quando necessário

### 2. Validação de Endereços
Valide endereços antes de enviar:
```typescript
import { isAddress } from 'viem';

if (!isAddress(address) && !address.endsWith('.eth')) {
  throw new Error('Invalid address format');
}
```

### 3. Error Handling
Sempre trate erros adequadamente:
```typescript
try {
  const response = await fetchWithRetry(url);
  if (!response.ok) {
    const error = await response.json();
    console.error(`API Error: ${error.code} - ${error.message}`);
    // Tratar erro específico
  }
} catch (error) {
  // Tratar erro de rede
}
```

### 4. Rate Limiting
Respeite rate limits:
- Monitorar `X-RateLimit-Remaining`
- Implementar backoff quando próximo do limite
- Usar cache para evitar requisições desnecessárias

## 🧪 Exemplos de Uso

### TypeScript/JavaScript

```typescript
const API_BASE = 'https://pass.snelabs.space/api';

// Lookup de endereço
async function lookupAddress(address: string) {
  const response = await fetch(`${API_BASE}/sne/lookup?addr=${encodeURIComponent(address)}`);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return await response.json();
}

// Buscar balance
async function getBalance(address: string) {
  const response = await fetch(`${API_BASE}/balance?addr=${encodeURIComponent(address)}`);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return await response.json();
}

// Gas price
async function getGasPrice() {
  const response = await fetch(`${API_BASE}/gas`);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return await response.json();
}
```

### cURL

```bash
# Health check
curl https://pass.snelabs.space/api/health

# Lookup
curl "https://pass.snelabs.space/api/sne/lookup?addr=0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"

# Balance
curl "https://pass.snelabs.space/api/balance?addr=0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"

# Gas
curl https://pass.snelabs.space/api/gas
```

## 🔗 Links Úteis

- **API Contract**: `API_CONTRACT.md`
- **Plano de Integração**: `PLANO_INTEGRACAO_DASHBOARD_PASSPORT.md`
- **SNE Scroll Passport**: https://github.com/SNE-Labs/SNE-Scroll-Passport
- **Viem Docs**: https://viem.sh/
- **Scroll L2 Docs**: https://docs.scroll.io/

## 📞 Suporte

Para questões sobre a API:
- **GitHub Issues**: [SNE-Labs/SNE-Scroll-Passport](https://github.com/SNE-Labs/SNE-Scroll-Passport/issues)
- **Documentação**: Ver `API_CONTRACT.md` para detalhes completos

---

**Versão**: 1.0.0  
**Última atualização**: 2025-01-27

