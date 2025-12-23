# 🔧 Corrigir Instalação de Dependências

## ❌ Problema Atual

Os erros mostram que as dependências não foram instaladas:
- `Cannot find module 'wagmi'`
- `Cannot find module '@tanstack/react-query'`
- `Cannot find module '@wagmi/connectors'`

## ✅ Solução

### Opção 1: Aguardar pnpm instalar (RECOMENDADO)

Você está instalando `pnpm` globalmente. Após completar:

```powershell
# 1. Verificar se pnpm foi instalado
pnpm --version

# 2. Instalar dependências
pnpm install

# 3. Verificar se funcionou
npm run build
```

### Opção 2: Usar npm (se pnpm não funcionar)

```powershell
# Limpar e reinstalar
Remove-Item -Recurse -Force node_modules, package-lock.json -ErrorAction SilentlyContinue
npm install
```

### Opção 3: Verificar se node_modules existe

```powershell
# Verificar se node_modules existe
Test-Path node_modules

# Se retornar False, instalar:
npm install
```

## 🔍 Erros TypeScript Corrigidos

Já corrigi os erros de TypeScript:
- ✅ `attemptIndex` agora tem tipo `number`
- ✅ Imports não usados comentados (serão usados no Sprint 5)
- ✅ Parâmetros não usados prefixados com `_`

## 📋 Após Instalação

Depois que as dependências forem instaladas, teste:

```powershell
# Verificar build
npm run build

# Ou rodar dev
npm run dev
```

---

**Status**: Aguardando instalação do pnpm ou npm install completar

