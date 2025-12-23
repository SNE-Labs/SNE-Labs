# SNE Vault

**Sistema de Nós de Execução** - Infraestrutura soberana para execução verificável em edge computing.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SNE-Labs/SNE-Labs/tree/main/SNE%20VAULT)

## 📋 Sobre o Projeto

SNE Vault é o frontend e documentação do Sistema de Nós de Execução (SNE), uma infraestrutura verificável que fornece:

- **Prova criptográfica de uptime** on-chain
- **Armazenamento criptográfico** com zeroização temporal
- **Gestão de licenças** via smart contracts na Scroll L2
- **Isolamento computacional** para operadores de infraestrutura crítica

## 🚀 Deploy no Vercel

### Opção 1: Deploy via GitHub (Recomendado)

1. **Conecte seu repositório ao Vercel:**
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "Add New Project"
   - Importe o repositório `SNE-Labs/SNE-Labs`
   - Configure o diretório raiz como `SNE VAULT`

2. **Configure as variáveis de ambiente (opcional):**
   ```
   VITE_USE_BACKEND=false
   VITE_SNE_API_URL=https://sne-scroll-pass.vercel.app
   ```

3. **Deploy:**
   - O Vercel detectará automaticamente o Vite
   - O build será executado automaticamente
   - Seu site estará disponível em alguns minutos

### Opção 2: Deploy via CLI

```bash
# Instale o Vercel CLI
npm i -g vercel

# Faça login
vercel login

# Deploy
vercel

# Para produção
vercel --prod
```

## 🛠️ Desenvolvimento Local

### Pré-requisitos

- Node.js >= 18.0.0
- npm >= 9.0.0

### Instalação

```bash
# Clone o repositório
git clone https://github.com/SNE-Labs/SNE-Labs.git
cd "SNE VAULT"

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Lint
npm run lint
```

## 📁 Estrutura do Projeto

```
SNE VAULT/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── sne/          # Componentes do design system SNE
│   │   │   └── ui/           # Componentes shadcn/ui
│   │   └── pages/            # Páginas da aplicação
│   └── styles/               # Estilos globais
├── public/                   # Arquivos estáticos
├── index.html                # Ponto de entrada HTML
├── vite.config.ts            # Configuração do Vite
├── tsconfig.json             # Configuração TypeScript
└── vercel.json               # Configuração do Vercel
```

## 🎨 Design System

O projeto utiliza um design system customizado baseado em:

- **Cores:** Preto (#0B0B0B) + Laranja (#FF6A00)
- **Tipografia:** Inter (UI) + JetBrains Mono (código)
- **Componentes:** shadcn/ui + componentes SNE customizados

Veja a documentação completa em [`SNE-DESIGN-SYSTEM.md`](./SNE-DESIGN-SYSTEM.md)

## 📚 Páginas

- **Home** - Landing page com visão geral do sistema
- **Dashboard** - Interface read-only para inspeção de licenças e chaves
- **Products** - Documentação dos produtos (SNE Radar, Vault, Keys)
- **Docs** - Documentação técnica completa
- **Contracts** - Informações sobre smart contracts

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Habilitar backend (true/false)
VITE_USE_BACKEND=false

# URL da API backend
VITE_SNE_API_URL=https://sne-scroll-pass.vercel.app
```

## 🌐 Tecnologias

- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS v4** - Estilização
- **Viem** - Cliente Ethereum
- **Lucide React** - Ícones
- **shadcn/ui** - Componentes UI

## 📝 Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).

## 🔗 Links

- **Repositório:** [github.com/SNE-Labs/SNE-Labs](https://github.com/SNE-Labs/SNE-Labs)
- **Documentação:** Ver seção Docs na aplicação
- **Design System:** [`SNE-DESIGN-SYSTEM.md`](./SNE-DESIGN-SYSTEM.md)

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📧 Contato

SNE Labs - [GitHub](https://github.com/SNE-Labs)

---

**Desenvolvido com ❤️ pela equipe SNE Labs**

