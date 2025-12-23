# Forçar Vercel a usar o commit mais recente

## Problema
O Vercel está usando o commit `f1c5e14` (antigo) ao invés dos commits mais recentes que têm warnings.

## Solução

### Opção 1: Redeploy Manual no Vercel Dashboard
1. Acesse [vercel.com/dashboard](https://vercel.com/dashboard)
2. Selecione o projeto **SNE Vault**
3. Vá em **Deployments**
4. Clique nos três pontos (⋯) no deployment do commit `f1c5e14`
5. Selecione **Redeploy**
6. Isso forçará o Vercel a usar o commit mais recente

### Opção 2: Forçar novo commit
```bash
git commit --allow-empty -m "force vercel to use latest commit"
git push origin main
```

### Opção 3: Verificar configurações do projeto
1. Vercel Dashboard → Settings → Git
2. Verifique se **Production Branch** está como `main`
3. Verifique se **Root Directory** está como `SNE VAULT`
4. Se estiver incorreto, corrija e salve

### Opção 4: Reconectar repositório
1. Vercel Dashboard → Settings → Git
2. Clique em **Disconnect**
3. Clique em **Connect Git Repository**
4. Reconecte `SNE-Labs/SNE-Labs`
5. Configure Root Directory como `SNE VAULT`
6. Isso recriará o webhook e forçará novo deploy

## Verificar se funcionou
1. Vercel Dashboard → Deployments
2. O deployment mais recente deve mostrar o commit `53c8f10` ou mais recente
3. Verifique os logs de build para confirmar que não há erros

