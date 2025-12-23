# Troubleshooting: Vercel não reconhece commits

## ✅ Verificações Iniciais

### 1. Verificar se os commits estão no GitHub

```bash
git log --oneline -5
git remote -v
```

Os commits devem estar em `origin/main` (GitHub).

### 2. Verificar configuração do projeto no Vercel

1. Acesse [vercel.com/dashboard](https://vercel.com/dashboard)
2. Selecione o projeto **SNE Vault**
3. Vá em **Settings** → **Git**
4. Verifique:
   - ✅ Repositório conectado: `SNE-Labs/SNE-Labs`
   - ✅ Branch de produção: `main`
   - ✅ Root Directory: `SNE VAULT` (IMPORTANTE!)

### 3. Verificar Webhooks do GitHub

1. No GitHub: `SNE-Labs/SNE-Labs` → **Settings** → **Webhooks**
2. Deve haver um webhook do Vercel
3. Verifique os últimos deliveries - devem estar com status 200

### 4. Forçar novo deploy

**Opção A: Via Dashboard Vercel**
1. Vá em **Deployments**
2. Clique nos três pontos (⋯) no último deployment
3. Selecione **Redeploy**

**Opção B: Via CLI**
```bash
npm i -g vercel
vercel login
vercel --prod
```

**Opção C: Criar commit vazio**
```bash
git commit --allow-empty -m "trigger vercel deploy"
git push origin main
```

## 🔧 Problemas Comuns e Soluções

### Problema 1: Root Directory incorreto

**Sintoma:** Vercel não encontra `package.json` ou `vite.config.ts`

**Solução:**
1. Vercel Dashboard → Settings → General
2. Root Directory: `SNE VAULT` (com espaço)
3. Salvar e fazer redeploy

### Problema 2: Webhook não está funcionando

**Sintoma:** Commits não disparam deploy automático

**Solução:**
1. Vercel Dashboard → Settings → Git
2. Clique em **Disconnect** e depois **Connect Git Repository**
3. Reconecte o repositório
4. Isso recria o webhook automaticamente

### Problema 3: Build Command ou Output Directory incorretos

**Verificar em `vercel.json`:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

**No Vercel Dashboard:**
- Build Command: `npm run build` (ou deixar vazio para auto-detect)
- Output Directory: `dist`

### Problema 4: Branch de produção diferente

**Verificar:**
- Vercel Dashboard → Settings → Git
- Production Branch deve ser `main`

## 🚀 Deploy Manual (Solução Rápida)

Se nada funcionar, faça deploy manual:

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy para produção
vercel --prod --cwd "SNE VAULT"
```

## 📋 Checklist de Verificação

- [ ] Commits estão no GitHub (`origin/main`)
- [ ] Projeto Vercel está conectado ao repositório correto
- [ ] Root Directory está configurado como `SNE VAULT`
- [ ] Webhook do GitHub está ativo e funcionando
- [ ] Build Command está correto (`npm run build`)
- [ ] Output Directory está correto (`dist`)
- [ ] Branch de produção é `main`
- [ ] Não há erros nos últimos deployments no Vercel

## 🔍 Verificar Logs de Deploy

1. Vercel Dashboard → Deployments
2. Clique no deployment mais recente
3. Veja os logs de build
4. Procure por erros ou avisos

## 📞 Se ainda não funcionar

1. Verifique se há conflitos de merge no README.md (vejo marcadores `<<<<<<< HEAD`)
2. Resolva os conflitos e faça commit
3. Tente fazer um commit vazio para forçar deploy:
   ```bash
   git commit --allow-empty -m "force vercel deploy"
   git push origin main
   ```

