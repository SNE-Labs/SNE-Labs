# SNE Design System - Sistema de Nós de Execução

Design system técnico para infraestrutura verificável. Preto + Laranja. Sóbrio, denso, confiável.

## Tokens

### Cores

```css
/* Base */
--sne-bg: #0B0B0B                    /* Fundo principal */
--sne-surface-1: #111216             /* Surface escura */
--sne-surface-elevated: #1B1B1F      /* Surface elevada */
--sne-text-primary: #F7F7F8          /* Texto principal */
--sne-text-secondary: #A6A6A6        /* Texto secundário */

/* Accent */
--sne-accent: #FF6A00                /* Laranja principal */
--sne-accent-hover: #E65A00          /* Laranja hover */

/* Status */
--sne-success: #00C48C               /* Verde sucesso */
--sne-warning: #FFC857               /* Amarelo aviso */
--sne-critical: #FF4D4F              /* Vermelho crítico */
```

### Tipografia

```css
/* Famílias */
--font-family-ui: 'Inter', sans-serif
--font-family-mono: 'JetBrains Mono', monospace

/* Tamanhos */
--text-h1: 40px      /* 700 / line-height 1.25 / letter-spacing -0.02em */
--text-h2: 28px      /* 600 / line-height 1.35 */
--text-h3: 20px      /* 600 / line-height 1.4 */
--text-body-lg: 16px /* 400 / line-height 1.45 */
--text-body: 14px    /* 400 / line-height 1.5 */
--text-small: 12px   /* 400 */
--text-code: 13px    /* 400 / JetBrains Mono */
```

### Spacing (sistema 8px)

```css
--spacing-1: 8px
--spacing-2: 16px
--spacing-3: 24px
--spacing-4: 32px
--spacing-5: 40px
--spacing-6: 48px
--spacing-8: 64px
--spacing-12: 96px
--spacing-15: 120px
```

### Radius

```css
--radius-sm: 6px
--radius-md: 10px
--radius-pill: 9999px
```

## Componentes

### Navigation
Top navigation com logo SNE, links e wallet button
- Variantes: `default` | `dashboard`
- Props: `onNavigate`

### StatusBadge
Badge de status com dot indicador
- Status: `active` | `violated` | `pending` | `offline` | `success` | `warning` | `critical`

### CodeBlock
Bloco de código com syntax highlight e copy button
- Props: `code`, `language`

### NodeCard
Card de nó de execução com métricas
- Props: `node` (id, name, status, lastProof, heartbeat, uptime, proofs)

### LogEntry
Entrada de log com timestamp, level e mensagem
- Level: `info` | `warn` | `error`

### MetricCard
Card de métrica com valor e trend
- Props: `label`, `value`, `trend`, `trendValue`, `icon`

### ContractCard
Card de smart contract com endereço e link explorer
- Props: `name`, `address`, `chain`, `verified`, `deployedAt`, `abi`

### Timeline
Timeline vertical de eventos
- Props: `events` (array de eventos com status)

### ArchitectureDiagram
Diagrama SVG da arquitetura do sistema

## Grid System

```
Desktop (1440px):
- Container: 1200px
- 12 colunas
- Gutter: 24px
- Margins: 96px

Tablet (768px):
- 8 colunas
- Gutter: 20px
- Margins: 48px

Mobile (320px):
- 4 colunas
- Gutter: 16px
- Margins: 16px
```

## Páginas

1. **Home** - Hero + produtos + logs + quickstart
2. **Dashboard** - Nós + métricas + logs operacionais
3. **Products** - SNE Radar / Vault / Keys + arquitetura
4. **Docs** - Documentação técnica com sidebar
5. **Contracts** - Smart contracts + SDK + exemplos

## Princípios

1. **Densidade de Informação**: máxima legibilidade sem floreio
2. **Técnico First**: código, specs, diagramas em destaque
3. **Contraste Alto**: preto + laranja para hierarquia clara
4. **Monospace para Dados**: endereços, hashes, logs em JetBrains Mono
5. **Status Visual**: cores de status consistentes em todo sistema
6. **Keyboard Navigation**: focus states visíveis, atalhos documentados

## Acessibilidade

- Contraste texto/fundo >= 4.5:1 (AA)
- Focus ring: 2px #FF6A00 com 8px offset
- Navegação por teclado completa
- Alt text em diagramas

## Motion

- Hover transitions: 120ms cubic-bezier(.2,.9,.3,1)
- Modal fade + slide: 160–200ms
- Toast appear: 220ms com rise
- Heartbeat pulse: sutil anel laranja/verde em node tiles

## Uso

```tsx
import { Navigation } from './components/sne/Navigation';
import { StatusBadge } from './components/sne/StatusBadge';
import { CodeBlock } from './components/sne/CodeBlock';

// Em qualquer página
<Navigation variant="default" onNavigate={setPage} />
<StatusBadge status="active">Sistema Operacional</StatusBadge>
<CodeBlock language="bash" code="sne start --heartbeat 30s" />
```

## Responsividade

Todos os componentes são responsivos mobile-first:
- Cards empilham verticalmente em mobile
- Navigation colapsa em hamburger menu
- Tabelas com scroll horizontal
- Grids adaptativos (4 → 8 → 12 cols)

---

**Maintained by**: SNE Core Team  
**Version**: 1.0.0  
**License**: MIT  
**Network**: Scroll L2 Mainnet
