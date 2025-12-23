# SNE Vault

**Sistema de Nós de Execução** - Infraestrutura soberana para execução verificável em edge computing.

## 📋 Sobre o Projeto

SNE Vault é o frontend e documentação técnica do **Sistema de Nós de Execução (SNE)**, uma infraestrutura verificável de nível enterprise que fornece:

- **Prova criptográfica de uptime** on-chain via Merkle trees e Proof of Uptime (PoU)
- **Armazenamento criptográfico** com AES-256, KDF derivado de handshake on-chain e zeroização temporal
- **Gestão de licenças** via smart contracts (ERC-721) na Scroll L2
- **Isolamento computacional** com Secure Element (TPM/TEE) e hardware tamper-resistant
- **Arquitetura híbrida** ARM + ASIC (BitAxe) com Root of Trust

### ⚠️ Nível Técnico

**Este projeto é altamente técnico e requer conhecimento avançado em:**

- Criptografia aplicada (AES-256, KDF, assinaturas digitais)
- Blockchain e smart contracts (Ethereum, Scroll L2, ERC-721)
- Arquitetura de sistemas distribuídos
- Hardware de segurança (Secure Elements, TPM, TEE)
- Programação de sistemas (Rust, memória volátil, IPC)
- Edge computing e processamento em tempo real

**Público-alvo:** Engenheiros de sistemas, especialistas em segurança criptográfica, desenvolvedores de blockchain, operadores de infraestrutura crítica e pesquisadores em edge computing.

**Não recomendado para:** Iniciantes em programação ou desenvolvedores sem experiência em sistemas de baixo nível e criptografia.

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
   VITE_SNE_API_URL=https://snelabs.space/api
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


Veja a documentação completa em [`SNE-DESIGN-SYSTEM.md`](./SNE-DESIGN-SYSTEM.md)

## 📚 Páginas e Conteúdo Técnico

- **Home** - Landing page com visão geral do sistema e quick start
- **Dashboard** - Interface read-only para inspeção de licenças, chaves e SNE Boxes via endereço Ethereum/ENS
- **Products** - Documentação técnica dos produtos com exemplos de código (Rust, Solidity, TypeScript)
- **Docs** - Documentação técnica completa cobrindo:
  - Arquitetura de rede e topologia mesh
  - SNE Radar (processamento de tensor Vt, AVX-512)
  - SNE Vault (AES-256, Secure Element, zeroização)
  - SNE Keys (ERC-721, revogação on-chain)
  - NTE (Motor de Inferência Determinístico)
  - Proof of Uptime (PoU) com fórmulas
  - SNE Pass (custódia no Secure Element)
  - SNE Box (hardware híbrido ARM + ASIC)
  - Governança e SNIPs
- **Contracts** - Informações sobre smart contracts, SDK e exemplos de integração

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Habilitar backend (true/false)
# Quando false, o Dashboard usa dados mock para demonstração
VITE_USE_BACKEND=false

# URL da API backend para leitura on-chain
# Deve apontar para um serviço que faz proxy para Scroll L2
VITE_SNE_API_URL=https://snelabs.space/api
```

> **Importante:** Para produção, você precisará de um backend que:
> - Conecte-se à Scroll L2 via RPC
> - Leia dados do contrato `SNELicenseRegistry`
> - Implemente endpoints `/api/onchain/lookup` e `/api/onchain/check`

## 🌐 Stack Tecnológica

### Blockchain & Web3
- **Viem** - Cliente Ethereum/Scroll L2 (TypeScript)
- **Scroll L2** - Layer 2 blockchain para smart contracts
- **ERC-721** - Padrão NFT para licenças

### Documentação Técnica
- Exemplos de código em **Rust** (SNE Vault)
- Exemplos de código em **Solidity** (Smart Contracts)
- Exemplos de código em **TypeScript** (SDK)
- Diagramas SVG de arquitetura
- Visualizações de Merkle trees

## 📝 Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).

## 🔗 Links

- **Website:** [snelabs.space](https://snelabs.space)
- **Repositório:** [github.com/SNE-Labs/SNE-Labs](https://github.com/SNE-Labs/SNE-Labs)
- **Documentação:** Ver seção Docs na aplicação
- **Design System:** [`SNE-DESIGN-SYSTEM.md`](./SNE-DESIGN-SYSTEM.md)

## 📧 Contato

SNE Labs - [GitHub](https://github.com/SNE-Labs)

## 📖 Recursos Adicionais

### Documentação Técnica Completa
- [Design System](./SNE-DESIGN-SYSTEM.md) - Guia completo do design system
- [Guia de Deploy](./DEPLOY_VERCEL.md) - Instruções detalhadas para Vercel
- [Verificação do Repositório](./VERIFICACAO_REPOSITORIO.md) - Checklist de arquivos

### Conceitos Técnicos Avançados

O SNE Labs implementa conceitos avançados de:

- **Criptografia:** AES-256, KDF, assinaturas ECDSA, Merkle proofs
- **Hardware Security:** Secure Elements, TPM, TEE, tamper detection
- **Blockchain:** Smart contracts, Layer 2, gas optimization, batch submissions
- **Sistemas Distribuídos:** Mesh networks, P2P, consensus, uptime proofs
- **Edge Computing:** Low-latency processing, AVX-512, deterministic execution

### Para Aprender Mais

Se você é novo nesses conceitos, recomendamos estudar:

1. **Criptografia:** "Applied Cryptography" de Bruce Schneier
2. **Blockchain:** Documentação do Ethereum, Scroll L2 docs
3. **Hardware Security:** TPM/TEE specifications, HSM documentation
4. **Sistemas Distribuídos:** "Designing Data-Intensive Applications" de Martin Kleppmann

---

**Desenvolvido com ❤️ pela equipe SNE Labs**

