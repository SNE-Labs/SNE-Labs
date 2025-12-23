# ⚡ Guia de Instalação Rápida

## 🐌 Por que está lento?

O projeto tem **muitas dependências**:
- 25+ pacotes `@radix-ui/*` (componentes UI)
- Wagmi, Viem, TanStack Query (blockchain)
- React, Vite, TypeScript (core)
- Total: ~60+ pacotes

## ✅ Soluções (do mais rápido ao mais lento)

### 🚀 Opção 1: PNPM (RECOMENDADO - Mais rápido)
```bash
# Instalar PNPM globalmente
npm install -g pnpm

# Instalar dependências (muito mais rápido)
pnpm install

# Usar normalmente
pnpm dev
pnpm build
```
**Tempo estimado**: 1-2 minutos

### ⚡ Opção 2: Yarn (Boa alternativa)
```bash
# Instalar Yarn globalmente
npm install -g yarn

# Instalar dependências
yarn install

# Usar normalmente
yarn dev
yarn build
```
**Tempo estimado**: 2-3 minutos

### 🐢 Opção 3: NPM CI (Se já tem package-lock.json)
```bash
npm ci
```
**Tempo estimado**: 2-3 minutos (mais rápido que `npm install`)

### 🐌 Opção 4: NPM Install (Mais lento)
```bash
npm install
```
**Tempo estimado**: 3-5 minutos

## 🔧 Se já iniciou npm install

### Se ainda está rodando:
- **Deixe terminar** - cancelar pode deixar node_modules inconsistente
- Pode levar 3-5 minutos, é normal

### Se cancelou:
```powershell
# Limpar e tentar novamente
Remove-Item -Recurse -Force node_modules, package-lock.json -ErrorAction SilentlyContinue
npm install
```

## 💡 Dica: Instalação em Background

Se você tem muitas dependências, pode instalar em background enquanto trabalha:

```powershell
# Windows PowerShell
Start-Process npm -ArgumentList "install" -NoNewWindow
```

## 📊 Comparação

| Método | Tempo | Espaço Disco | Recomendado |
|--------|-------|--------------|-------------|
| **pnpm** | 1-2 min | Menor | ✅ Sim |
| **yarn** | 2-3 min | Médio | ✅ Sim |
| **npm ci** | 2-3 min | Médio | ✅ Sim |
| **npm install** | 3-5 min | Maior | ⚠️ Funciona |

## 🎯 Recomendação Final

**Use PNPM** - é mais rápido, usa menos espaço e é compatível com npm/yarn.

```bash
npm install -g pnpm
pnpm install
```

---

**Nota**: Se `npm install` já está rodando, deixe terminar. É seguro e vai funcionar, só demora mais.

