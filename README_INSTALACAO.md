# 🚀 Instalação Rápida - SNE Vault

## ⚡ Comando Mais Rápido

```powershell
npm install --no-progress --legacy-peer-deps
```

**Tempo estimado**: 2-3 minutos (vs 5-10 minutos normal)

## 🔧 O que foi otimizado

1. ✅ Registry configurado para npm oficial
2. ✅ Timeout aumentado para 60s
3. ✅ Progress desabilitado (mais rápido)
4. ✅ Legacy peer deps habilitado (evita conflitos)

## 📋 Passos Rápidos

### 1. Se npm install está rodando:
- **Deixe terminar** OU **Ctrl+C** para cancelar
- Se cancelar, execute: `npm cache clean --force`

### 2. Instalar com otimizações:
```powershell
npm install --no-progress --legacy-peer-deps
```

### 3. Testar:
```powershell
npm run build
```

## ⚠️ Se ainda estiver lento

### Verificar processos Node:
```powershell
Get-Process node | Stop-Process -Force
npm install --no-progress --legacy-peer-deps
```

### Limpar tudo e começar de novo:
```powershell
Remove-Item -Recurse -Force node_modules, package-lock.json -ErrorAction SilentlyContinue
npm cache clean --force
npm install --no-progress --legacy-peer-deps
```

## 🎯 Alternativa: Instalar só o essencial

Se precisar testar rápido:

```powershell
# Só as novas dependências
npm install wagmi@^2.0.0 @tanstack/react-query@^5.0.0 @wagmi/core@^2.0.0 @wagmi/connectors@^2.0.0 --legacy-peer-deps --no-save

# Depois instalar tudo
npm install --no-progress --legacy-peer-deps
```

---

**Dica**: O flag `--legacy-peer-deps` evita conflitos de versão e acelera a instalação.

