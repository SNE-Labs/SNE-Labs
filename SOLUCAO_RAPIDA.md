# ⚡ Solução Rápida para Instalação

## 🚨 Problema
Instalação está demorando muito (mais de 5 minutos).

## ✅ Solução Imediata

### Opção 1: Otimizar npm e reinstalar (RECOMENDADO)

Execute estes comandos no PowerShell:

```powershell
# 1. Otimizar configuração do npm
npm config set registry https://registry.npmjs.org/
npm config set fetch-timeout 60000
npm config set fetch-retries 3
npm config set progress false

# 2. Limpar cache (se necessário)
npm cache clean --force

# 3. Instalar com otimizações
npm install --no-progress --prefer-offline
```

**Tempo estimado**: 2-3 minutos

### Opção 2: Usar script automatizado

Execute o script que criei:

```powershell
.\INSTALACAO_RAPIDA.ps1
```

### Opção 3: Instalar apenas dependências críticas primeiro

```powershell
# Instalar apenas as novas dependências
npm install wagmi@^2.0.0 @tanstack/react-query@^5.0.0 @wagmi/core@^2.0.0 @wagmi/connectors@^2.0.0 --no-save

# Depois instalar tudo
npm install
```

### Opção 4: Verificar se há problema de rede

```powershell
# Testar conexão com registry
npm ping

# Se falhar, tentar outro registry
npm config set registry https://registry.npmmirror.com/
npm install
```

## 🔍 Diagnóstico

Se ainda estiver lento, verifique:

1. **Velocidade de internet:**
   ```powershell
   # Testar velocidade
   npm ping
   ```

2. **Cache corrompido:**
   ```powershell
   npm cache clean --force
   npm install
   ```

3. **Antivírus bloqueando:**
   - Adicionar `node_modules` e `npm cache` às exceções

4. **Espaço em disco:**
   ```powershell
   Get-PSDrive C | Select-Object Used,Free
   ```

## ⚡ Alternativa: Instalar dependências essenciais apenas

Se precisar testar rápido, instale só o essencial:

```powershell
npm install wagmi@^2.0.0 @tanstack/react-query@^5.0.0 @wagmi/core@^2.0.0 @wagmi/connectors@^2.0.0
```

Depois instale o resto:
```powershell
npm install
```

## 🎯 Comando Rápido (Copie e Cole)

```powershell
npm config set registry https://registry.npmjs.org/ && npm config set progress false && npm install --no-progress
```

---

**Dica**: Se estiver demorando mais de 5 minutos, pode haver problema de rede ou cache. Use `npm cache clean --force` e tente novamente.

