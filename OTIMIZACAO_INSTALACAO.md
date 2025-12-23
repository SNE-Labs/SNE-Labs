# ⚡ Otimização de Instalação NPM

## 🐌 Problema
`npm install` está levando muito tempo devido ao grande número de dependências (especialmente @radix-ui).

## ✅ Soluções Rápidas

### 1. Usar `npm ci` (mais rápido)
```bash
npm ci
```
- Mais rápido que `npm install`
- Usa `package-lock.json` existente
- Instalação determinística

### 2. Limpar cache e reinstalar
```bash
npm cache clean --force
npm install
```

### 3. Usar `--prefer-offline` (se já instalou antes)
```bash
npm install --prefer-offline
```

### 4. Instalar apenas dependências de produção primeiro
```bash
npm install --production
npm install --save-dev
```

### 5. Usar Yarn (geralmente mais rápido)
```bash
# Instalar Yarn globalmente (se não tiver)
npm install -g yarn

# Usar Yarn
yarn install
```

### 6. Usar PNPM (mais rápido e eficiente)
```bash
# Instalar PNPM globalmente
npm install -g pnpm

# Usar PNPM
pnpm install
```

## 🚀 Recomendação: Usar PNPM

PNPM é mais rápido e usa menos espaço em disco:

```bash
# 1. Instalar PNPM
npm install -g pnpm

# 2. Instalar dependências
pnpm install

# 3. Usar normalmente
pnpm dev
pnpm build
```

## 📊 Comparação de Tempo Estimado

- **npm install**: ~3-5 minutos (muitas dependências)
- **npm ci**: ~2-3 minutos (mais rápido)
- **yarn install**: ~2-3 minutos
- **pnpm install**: ~1-2 minutos (mais rápido)

## ⚠️ Nota Importante

Se você já iniciou `npm install`, pode deixar terminar. Cancelar no meio pode deixar o `node_modules` em estado inconsistente.

Se cancelou, limpe antes de tentar novamente:
```bash
rm -rf node_modules package-lock.json
npm install
```

Ou no Windows PowerShell:
```powershell
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
```

