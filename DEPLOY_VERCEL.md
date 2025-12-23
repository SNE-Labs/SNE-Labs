# 🚀 Guia de Deploy no Vercel - SNE Vault

## ✅ Checklist Pré-Deploy

Todos os arquivos essenciais foram criados:

- ✅ `package.json` - Dependências e scripts
- ✅ `tsconfig.json` - Configuração TypeScript
- ✅ `index.html` - Ponto de entrada HTML
- ✅ `src/main.tsx` - Inicialização React
- ✅ `vercel.json` - Configuração do Vercel
- ✅ `.gitignore` - Arquivos ignorados
- ✅ `README.md` - Documentação
- ✅ Variáveis de ambiente corrigidas (Next.js → Vite)

## 📦 Passo a Passo para Deploy

### 1. Preparar o Repositório

```bash
# Certifique-se de que todos os arquivos estão commitados
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Deploy via Dashboard do Vercel (Recomendado)

1. **Acesse [vercel.com](https://vercel.com)** e faça login
2. **Clique em "Add New Project"**
3. **Importe o repositório:**
   - Selecione `SNE-Labs/SNE-Labs`
   - Ou conecte seu repositório GitHub
4. **Configure o projeto:**
   - **Framework Preset:** Vite (deve ser detectado automaticamente)
   - **Root Directory:** `SNE VAULT` (importante!)
   - **Build Command:** `npm run build` (já configurado)
   - **Output Directory:** `dist` (já configurado)
   - **Install Command:** `npm install` (já configurado)

5. **Variáveis de Ambiente (Opcional):**
   - Clique em "Environment Variables"
   - Adicione se necessário:
     ```
     VITE_USE_BACKEND=false
     VITE_SNE_API_URL=https://sne-scroll-pass.vercel.app
     ```

6. **Deploy:**
   - Clique em "Deploy"
   - Aguarde o build completar (2-5 minutos)
   - Seu site estará disponível em `https://seu-projeto.vercel.app`

### 3. Deploy via CLI

```bash
# Instale o Vercel CLI globalmente
npm i -g vercel

# Faça login
vercel login

# Navegue até a pasta do projeto
cd "SNE VAULT"

# Deploy de preview
vercel

# Deploy para produção
vercel --prod
```

### 4. Configuração de Domínio Customizado (Opcional)

1. No dashboard do Vercel, vá em **Settings > Domains**
2. Adicione seu domínio customizado
3. Siga as instruções de DNS fornecidas

## 🔧 Configurações do Vercel

O arquivo `vercel.json` já está configurado com:

- **Framework:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **SPA Routing:** Todas as rotas redirecionam para `index.html`
- **Cache:** Assets estáticos com cache de 1 ano

## 🌍 Variáveis de Ambiente

### Variáveis Disponíveis

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `VITE_USE_BACKEND` | Habilitar chamadas à API backend | `false` |
| `VITE_SNE_API_URL` | URL da API backend | `https://sne-scroll-pass.vercel.app` |

### Como Configurar no Vercel

1. Vá em **Settings > Environment Variables**
2. Adicione cada variável:
   - **Name:** `VITE_USE_BACKEND`
   - **Value:** `false` ou `true`
   - **Environment:** Production, Preview, Development
3. Repita para `VITE_SNE_API_URL` se necessário

## 🐛 Troubleshooting

### Erro: "Cannot find module"

**Solução:** Certifique-se de que o `Root Directory` está configurado como `SNE VAULT`

### Erro: "Build failed"

**Solução:**
1. Verifique os logs de build no Vercel
2. Teste localmente: `npm run build`
3. Verifique se todas as dependências estão no `package.json`

### Erro: "404 on routes"

**Solução:** O `vercel.json` já está configurado com rewrites para SPA. Se persistir, verifique se o arquivo está na raiz do projeto.

### Erro: "Environment variables not found"

**Solução:** 
- Variáveis do Vite devem começar com `VITE_`
- Configure no dashboard do Vercel em Settings > Environment Variables

## 📊 Monitoramento

Após o deploy, você pode:

- **Ver logs:** Dashboard > Deployments > [seu deploy] > Logs
- **Ver métricas:** Dashboard > Analytics
- **Configurar webhooks:** Settings > Git > Webhooks

## 🔄 Atualizações Automáticas

O Vercel faz deploy automático quando você:

- Faz push para a branch `main` (produção)
- Faz push para outras branches (preview)
- Abre um Pull Request (preview)

## 📝 Próximos Passos

Após o deploy bem-sucedido:

1. ✅ Teste todas as páginas
2. ✅ Verifique se os links do GitHub estão funcionando
3. ✅ Teste a integração MetaMask (se aplicável)
4. ✅ Configure domínio customizado (opcional)
5. ✅ Configure analytics (opcional)

## 🎉 Pronto!

Seu projeto SNE Vault está pronto para deploy no Vercel! 🚀

---

**Dúvidas?** Consulte a [documentação do Vercel](https://vercel.com/docs) ou abra uma issue no repositório.

