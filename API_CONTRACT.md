# 📋 API Contract - SNE Dashboard ↔ Passport Integration

## Base URL
- **Development**: `http://localhost:5173/api`
- **Production**: `https://pass.snelabs.space/api`

## Health Check

### `GET /health`

Endpoint para monitoramento e verificação de saúde da API.

**Response 200:**
```json
{
  "status": "healthy",
  "timestamp": "2025-01-27T10:30:00Z",
  "services": {
    "rpc": "healthy",
    "cache": "healthy",
    "database": "healthy"
  },
  "version": "1.0.0"
}
```

**Response 503:**
```json
{
  "status": "unhealthy",
  "timestamp": "2025-01-27T10:30:00Z",
  "services": {
    "rpc": "degraded",
    "cache": "healthy",
    "database": "healthy"
  }
}
```

---

## Endpoints

### 1. Lookup de Endereço (On-Chain Data)

#### `GET /sne/lookup?addr={address}`

Busca dados públicos de licenças, keys e boxes para um endereço.

**Query Parameters:**
- `addr` (required, string): Endereço Ethereum/Scroll ou ENS. O servidor valida o formato usando biblioteca (viem/ethers.js). Aceita:
  - Endereços Ethereum/Scroll (0x... com ou sem checksum)
  - Nomes ENS (ex: `vitalik.eth`)

**Response 200:**
```json
{
  "licenses": [
    {
      "id": "SNE-PRO-001",
      "nodeId": "0x4a7b...c3f9",
      "name": "Pro Node",
      "status": "active",
      "power": "Pro Node",
      "lastChecked": "2025-01-27T10:30:00Z",
      "contractAddress": "0x...",
      "tokenId": "1"
    }
  ],
  "keys": [
    {
      "id": "phys-01",
      "type": "physical",
      "boundTo": "0x...",
      "status": "bound",
      "contractAddress": "0x...",
      "tokenId": "2"
    }
  ],
  "boxes": [
    {
      "id": "box-1",
      "tier": "tier3",
      "provisioned": true,
      "lastSeen": "2025-01-27T10:30:00Z",
      "contractAddress": "0x...",
      "tokenId": "3"
    }
  ],
  "pou": {
    "nodesPublic": 12
  },
  "metadata": {
    "cached": true,
    "cacheExpiry": "2025-01-27T10:35:00Z",
    "source": "on-chain"
  }
}
```

**Response 400:**
```json
{
  "error": "Invalid parameter",
  "code": "INVALID_PARAMETER",
  "message": "Address format is invalid. Expected Ethereum/Scroll address (0x...) or ENS name."
}
```

**Response 404:**
```json
{
  "error": "Address not found",
  "code": "ADDRESS_NOT_FOUND",
  "message": "No data found for the provided address"
}
```

**Response 429:**
```json
{
  "error": "Rate limit exceeded",
  "code": "RATE_LIMIT",
  "message": "Too many requests. Please try again later.",
  "retryAfter": 60
}
```

**Response 502:**
```json
{
  "error": "RPC connection failed",
  "code": "RPC_ERROR",
  "message": "Unable to connect to Scroll L2 RPC. Please try again later."
}
```

**Response 500:**
```json
{
  "error": "Internal server error",
  "code": "INTERNAL_ERROR",
  "message": "An unexpected error occurred"
}
```

**TTL:** 5 minutos (300s) para dados on-chain

---

### 2. Verificar Licença Específica

#### `GET /sne/check?node={nodeId}`

Verifica status de acesso de uma licença específica.

**Query Parameters:**
- `node` (required, string): Node ID ou token ID

**Response 200:**
```json
{
  "access": true,
  "nodeId": "0x4a7b...c3f9",
  "status": "active",
  "expiry": "2025-12-31T23:59:59Z",
  "metadata": {
    "cached": false,
    "source": "on-chain"
  }
}
```

**TTL:** 1 minuto (60s) - dados mais voláteis

---

### 3. Buscar Balance

#### `GET /balance?addr={address}`

Busca balance ETH e tokens para um endereço.

**Query Parameters:**
- `addr` (required, string): Endereço Ethereum/Scroll

**Response 200:**
```json
{
  "address": "0x...",
  "eth": {
    "value": "1.234567890123456789",
    "formatted": "1.2346 ETH"
  },
  "tokens": [
    {
      "address": "0x...",
      "symbol": "USDC",
      "name": "USD Coin",
      "decimals": 6,
      "balance": "1000000",
      "formatted": "1.0 USDC",
      "spam": false
    }
  ],
  "metadata": {
    "cached": true,
    "cacheExpiry": "2025-01-27T10:35:00Z",
    "source": "rpc"
  }
}
```

**TTL:** 60-300s (5min padrão)

---

### 4. Gas Price

#### `GET /gas`

Retorna preço atual de gas na Scroll L2.

**Response 200:**
```json
{
  "gasPrice": "1000000000",
  "maxFeePerGas": "2000000000",
  "maxPriorityFeePerGas": "100000000",
  "formatted": {
    "gasPrice": "1.0 Gwei",
    "maxFeePerGas": "2.0 Gwei"
  },
  "metadata": {
    "cached": false,
    "source": "rpc",
    "timestamp": "2025-01-27T10:30:00Z"
  }
}
```

**TTL:** 10-30s (on-demand)

---

### 5. Produtos Disponíveis

#### `GET /sne/products`

Lista produtos SNE disponíveis (Box, Keys, Licenses).

**Response 200:**
```json
{
  "products": [
    {
      "id": "box-tier3",
      "title": "SNE Box — Tier 3",
      "priceUSD": "3499",
      "priceETH": "0.1234",
      "features": ["Secure Enclave", "Starlink-ready", "Tamper Line"],
      "available": true,
      "contractAddress": "0x...",
      "metadata": {
        "cached": true,
        "cacheExpiry": "2025-01-27T11:00:00Z"
      }
    }
  ]
}
```

**TTL:** 30 minutos (1800s) - dados menos voláteis

---

## Códigos de Erro Padronizados

| Código | HTTP Status | Descrição |
|--------|-------------|-----------|
| `INVALID_PARAMETER` | 400 | Parâmetro inválido (ex: endereço malformado) |
| `ADDRESS_NOT_FOUND` | 404 | Endereço não encontrado ou sem dados |
| `RATE_LIMIT` | 429 | Rate limit excedido |
| `RPC_ERROR` | 502 | Erro na conexão RPC ou timeout |
| `CONTRACT_ERROR` | 500 | Erro ao ler contrato on-chain |
| `INTERNAL_ERROR` | 500 | Erro interno do servidor |

## Headers de Resposta

Todos os endpoints retornam os seguintes headers quando aplicável:

```
X-Cache-Status: HIT | MISS | BYPASS
X-Cache-Expiry: 2025-01-27T10:35:00Z
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1643284800
X-Request-ID: abc123def456  # Para rastreamento de requisições
```

**Descrição dos Headers:**
- `X-Cache-Status`: Status do cache (HIT = servido do cache, MISS = buscado, BYPASS = cache ignorado)
- `X-Cache-Expiry`: Timestamp ISO 8601 de quando o cache expira
- `X-RateLimit-Limit`: Limite total de requisições no período
- `X-RateLimit-Remaining`: Requisições restantes no período atual
- `X-RateLimit-Reset`: Unix timestamp de quando o rate limit reseta
- `X-Request-ID`: ID único da requisição para debugging/logging

## Rate Limits

- **Lookup**: 100 requests/minuto por IP
- **Balance**: 200 requests/minuto por IP
- **Gas**: 60 requests/minuto por IP
- **Products**: 10 requests/minuto por IP

**Mecanismos de Proteção:**
- Rate limiting por IP (sliding window)
- IP blocking temporário após múltiplas violações
- API key opcional para endpoints heavy (futuro)
- Circuit breaker para proteger RPC de sobrecarga

## Retry Strategy

**Client-side (recomendado):**
- **Max Retries**: 3
- **Backoff**: Exponential (1s, 2s, 4s)
- **Retryable Errors**: 429, 502, 503, 504
- **Non-retryable**: 400, 401, 403, 404

**Nota**: Sempre respeite o header `Retry-After` quando presente (especialmente em 429).

## CORS

```
Access-Control-Allow-Origin: https://snelabs.space
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 86400
```

**Nota**: Para endpoints de checkout (POST), pode ser necessário autenticação via header `Authorization` (futuro).

---

## OpenAPI Schema (YAML)

```yaml
openapi: 3.0.0
info:
  title: SNE Dashboard API
  version: 1.0.0
  description: API contract for SNE Dashboard ↔ Passport integration
  contact:
    name: SNE Labs
    url: https://snelabs.space

servers:
  - url: https://pass.snelabs.space/api
    description: Production
  - url: http://localhost:5173/api
    description: Development

paths:
  /health:
    get:
      summary: Health check endpoint
      description: Returns API health status and service availability
      responses:
        '200':
          description: API is healthy
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/HealthResponse'
        '503':
          description: API is unhealthy
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/HealthResponse'

  /sne/lookup:
    get:
      summary: Lookup address data
      description: Busca dados públicos de licenças, keys e boxes para um endereço
      parameters:
        - name: addr
          in: query
          required: true
          schema:
            type: string
          description: "Ethereum/Scroll address (0x...) or ENS name. Server validates format using viem/ethers.js."
          example: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
      responses:
        '200':
          description: Success
          headers:
            X-Cache-Status:
              schema:
                type: string
                enum: [HIT, MISS, BYPASS]
            X-Cache-Expiry:
              schema:
                type: string
                format: date-time
            X-RateLimit-Limit:
              schema:
                type: integer
            X-RateLimit-Remaining:
              schema:
                type: integer
            X-RateLimit-Reset:
              schema:
                type: integer
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/LookupResult'
              examples:
                success:
                  value:
                    licenses:
                      - id: "SNE-PRO-001"
                        nodeId: "0x4a7b...c3f9"
                        name: "Pro Node"
                        status: "active"
                        power: "Pro Node"
                        lastChecked: "2025-01-27T10:30:00Z"
                        contractAddress: "0x..."
                        tokenId: "1"
                    keys: []
                    boxes: []
                    pou:
                      nodesPublic: 12
                    metadata:
                      cached: true
                      cacheExpiry: "2025-01-27T10:35:00Z"
                      source: "on-chain"
        '400':
          description: Invalid parameter
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '404':
          $ref: '#/components/responses/NotFound'
        '429':
          $ref: '#/components/responses/RateLimit'
        '502':
          description: RPC connection failed
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '500':
          description: Internal server error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'

  /sne/check:
    get:
      summary: Check license access
      description: Verifica status de acesso de uma licença específica
      parameters:
        - name: node
          in: query
          required: true
          schema:
            type: string
          description: Node ID or token ID
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CheckResponse'
        '400':
          description: Invalid parameter
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '502':
          description: RPC connection failed
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'

  /balance:
    get:
      summary: Get address balance
      description: Busca balance ETH e tokens para um endereço
      parameters:
        - name: addr
          in: query
          required: true
          schema:
            type: string
          description: "Ethereum/Scroll address"
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BalanceResponse'
        '400':
          description: Invalid parameter
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'

  /gas:
    get:
      summary: Get current gas price
      description: Retorna preço atual de gas na Scroll L2
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GasResponse'
        '502':
          description: RPC connection failed
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'

  /sne/products:
    get:
      summary: Get available products
      description: Lista produtos SNE disponíveis (Box, Keys, Licenses)
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ProductsResponse'

components:
  schemas:
    Metadata:
      type: object
      properties:
        cached:
          type: boolean
          example: true
        cacheExpiry:
          type: string
          format: date-time
          example: "2025-01-27T10:35:00Z"
        source:
          type: string
          enum: [on-chain, rpc, api, cache]
          example: "on-chain"

    License:
      type: object
      required: [id, status]
      properties:
        id:
          type: string
          example: "SNE-PRO-001"
        nodeId:
          type: string
          example: "0x4a7b...c3f9"
        name:
          type: string
          example: "Pro Node"
        status:
          type: string
          enum: [active, revoked, unknown]
          example: "active"
        power:
          type: string
          example: "Pro Node"
        lastChecked:
          type: string
          format: date-time
          nullable: true
          example: "2025-01-27T10:30:00Z"
        contractAddress:
          type: string
          example: "0x..."
        tokenId:
          type: string
          example: "1"

    Key:
      type: object
      required: [id, type, status]
      properties:
        id:
          type: string
          example: "phys-01"
        type:
          type: string
          enum: [physical, virtual]
          example: "physical"
        boundTo:
          type: string
          nullable: true
          example: "0x..."
        status:
          type: string
          enum: [bound, unbound]
          example: "bound"
        contractAddress:
          type: string
          example: "0x..."
        tokenId:
          type: string
          example: "2"

    Box:
      type: object
      required: [id, tier, provisioned]
      properties:
        id:
          type: string
          example: "box-1"
        tier:
          type: string
          enum: [tier1, tier2, tier3]
          example: "tier3"
        provisioned:
          type: boolean
          example: true
        lastSeen:
          type: string
          format: date-time
          nullable: true
          example: "2025-01-27T10:30:00Z"
        contractAddress:
          type: string
          example: "0x..."
        tokenId:
          type: string
          example: "3"

    LookupResult:
      type: object
      properties:
        licenses:
          type: array
          items:
            $ref: '#/components/schemas/License'
        keys:
          type: array
          items:
            $ref: '#/components/schemas/Key'
        boxes:
          type: array
          items:
            $ref: '#/components/schemas/Box'
        pou:
          type: object
          properties:
            nodesPublic:
              type: integer
              example: 12
        metadata:
          $ref: '#/components/schemas/Metadata'

    CheckResponse:
      type: object
      properties:
        access:
          type: boolean
          example: true
        nodeId:
          type: string
          example: "0x4a7b...c3f9"
        status:
          type: string
          enum: [active, revoked, unknown]
          example: "active"
        expiry:
          type: string
          format: date-time
          nullable: true
          example: "2025-12-31T23:59:59Z"
        metadata:
          $ref: '#/components/schemas/Metadata'

    BalanceResponse:
      type: object
      properties:
        address:
          type: string
          example: "0x..."
        eth:
          type: object
          properties:
            value:
              type: string
              example: "1.234567890123456789"
            formatted:
              type: string
              example: "1.2346 ETH"
        tokens:
          type: array
          items:
            type: object
            properties:
              address:
                type: string
              symbol:
                type: string
              name:
                type: string
              decimals:
                type: integer
              balance:
                type: string
              formatted:
                type: string
              spam:
                type: boolean
        metadata:
          $ref: '#/components/schemas/Metadata'

    GasResponse:
      type: object
      properties:
        gasPrice:
          type: string
          example: "1000000000"
        maxFeePerGas:
          type: string
          example: "2000000000"
        maxPriorityFeePerGas:
          type: string
          example: "100000000"
        formatted:
          type: object
          properties:
            gasPrice:
              type: string
              example: "1.0 Gwei"
            maxFeePerGas:
              type: string
              example: "2.0 Gwei"
        metadata:
          $ref: '#/components/schemas/Metadata'

    Product:
      type: object
      properties:
        id:
          type: string
          example: "box-tier3"
        title:
          type: string
          example: "SNE Box — Tier 3"
        priceUSD:
          type: string
          example: "3499"
        priceETH:
          type: string
          example: "0.1234"
        features:
          type: array
          items:
            type: string
          example: ["Secure Enclave", "Starlink-ready", "Tamper Line"]
        available:
          type: boolean
          example: true
        contractAddress:
          type: string
          example: "0x..."
        metadata:
          $ref: '#/components/schemas/Metadata'

    ProductsResponse:
      type: object
      properties:
        products:
          type: array
          items:
            $ref: '#/components/schemas/Product'

    HealthResponse:
      type: object
      properties:
        status:
          type: string
          enum: [healthy, unhealthy, degraded]
          example: "healthy"
        timestamp:
          type: string
          format: date-time
          example: "2025-01-27T10:30:00Z"
        services:
          type: object
          properties:
            rpc:
              type: string
              enum: [healthy, degraded, down]
            cache:
              type: string
              enum: [healthy, degraded, down]
            database:
              type: string
              enum: [healthy, degraded, down]
        version:
          type: string
          example: "1.0.0"

    ErrorResponse:
      type: object
      required: [error, code]
      properties:
        error:
          type: string
          example: "Invalid parameter"
        code:
          type: string
          enum: [INVALID_PARAMETER, ADDRESS_NOT_FOUND, RATE_LIMIT, RPC_ERROR, CONTRACT_ERROR, INTERNAL_ERROR]
          example: "INVALID_PARAMETER"
        message:
          type: string
          example: "Address format is invalid. Expected Ethereum/Scroll address (0x...) or ENS name."
        retryAfter:
          type: integer
          description: "Seconds to wait before retrying (for 429 responses)"
          example: 60

  responses:
    NotFound:
      description: Address not found
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
          examples:
            notFound:
              value:
                error: "Address not found"
                code: "ADDRESS_NOT_FOUND"
                message: "No data found for the provided address"
    
    RateLimit:
      description: Rate limit exceeded
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
          examples:
            rateLimit:
              value:
                error: "Rate limit exceeded"
                code: "RATE_LIMIT"
                message: "Too many requests. Please try again later."
                retryAfter: 60
```

---

## 📝 Notas de Implementação

### Validação de Endereços

**Não confiar apenas em regex** - usar biblioteca para validação:
- **Viem**: `isAddress()`, `isAddressEqual()`
- **Ethers.js**: `isAddress()`
- **ENS**: Resolver usando provider

### Checkout / Purchase (Futuro)

O contract atual é **read-only**. Para checkout on-chain:

**Opção 1: Direto on-chain (recomendado)**
- Cliente faz transação diretamente na blockchain
- API não precisa de endpoints de checkout
- Mais seguro e descentralizado

**Opção 2: API de Orders (se necessário fulfillment off-chain)**
- `POST /sne/orders` - Criar order
- `GET /sne/orders/{orderId}` - Status da order
- Requer autenticação (API key ou wallet signature)

### Documentação Interativa

Expor Swagger UI em `/api/docs` para facilitar onboarding de desenvolvedores.

### Retry Strategy (Client-side)

Documentar no README da API que clients devem implementar:
- Max 3 retries
- Exponential backoff: 1s, 2s, 4s
- Respeitar header `Retry-After` quando presente
- Não retryar em 400, 401, 403, 404

