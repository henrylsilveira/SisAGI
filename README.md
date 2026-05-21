# 🪖 SisAGI — Sistema de Apoio à Gestão Interna

> Aplicação web desenvolvida por um militar desenvolvedor com o objetivo de aperfeiçoar a administração interna de uma Organização Militar (OM), centralizando o controle de armamento, material, pessoal, veículos e muito mais.

---

## ⚠️ Status do Projeto

![Status](https://img.shields.io/badge/status-descontinuado-red)
![Contribuições](https://img.shields.io/badge/contribuições-bem--vindas-brightgreen)

**Este projeto está descontinuado.** O desenvolvimento foi iniciado em **2021** e, após ser submetido ao **PREMIA 2024** (Prêmio do Exército Brasileiro de Inovação e Melhoria Administrativa), o trabalho foi encerrado. O código permanece aberto para quem quiser retomá-lo, corrigir bugs, refatorar ou implementar as funcionalidades ainda pendentes.

Por se tratar de um projeto de grande escopo desenvolvido durante as fases iniciais do autor como desenvolvedor, podem existir **falhas, bugs e pontos de melhoria** — qualquer contribuição é muito bem-vinda!

> 🏆 Este projeto foi **submetido ao PREMIA 2024**, reconhecendo o seu potencial de contribuição para a modernização da administração militar brasileira.

---

## 📋 Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Execução](#instalação-e-execução)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Roadmap](#roadmap)
- [Contribuição](#contribuição)

---

## Sobre o Projeto

O **SisAGI** (**Sistema de Apoio à Gestão Interna**) é uma aplicação web iniciada em **2021** por um militar com perfil de desenvolvedor, com o objetivo de digitalizar e aperfeiçoar os processos administrativos internos de uma Organização Militar (OM).

**Este não é um projeto oficial do Exército Brasileiro.** Trata-se de uma iniciativa individual, nascida da vontade de modernizar a gestão interna da unidade e facilitar o dia a dia dos militares responsáveis pelas áreas administrativas — como a Ajudância Geral, o Furriel, o Armeiro e outros setores.

O sistema é composto por **dois repositórios**:

- **Frontend** (este repositório): aplicação web construída com **Next.js 13 + TypeScript**
- **Backend**: servidor **Node.js** responsável pela API e regras de negócio → [henrylsilveira/SisAGIServer](https://github.com/henrylsilveira/SisAGIServer)

O sistema oferece controle de cautelas de armamento, gerenciamento de materiais, cadastro e localização geográfica de militares, geração de QR Codes para visitantes e muito mais.

---

## Funcionalidades

### 🔫 Armamento
- Cautela e devolução de armamento
- Controle da situação atual de cada arma (cautelada ou disponível)
- Registro da finalidade da cautela (Missão, Serviço, etc.)
- Histórico de manutenções (data e tipo)

### 📦 Material
- Controle de estoque de materiais
- Bloqueio automático de cautela quando o estoque está esgotado

### 👤 Pessoal
- Cadastro completo de militares e civis
- Armazenamento de localização geográfica (latitude/longitude) da residência
- Visualização de todos os militares no mapa interativo
- Cálculo da distância de cada militar até o batalhão

### ⛽ Furriel
- Controle de consumo de combustível
- Controle de munição

### 📅 Calendário
- Agenda de eventos e escalas com visualização em calendário (FullCalendar)

### 📊 Dashboards
- Gráficos e relatórios com ApexCharts

### 🔐 Autenticação
- Login com controle de acesso via NextAuth

### 🔲 QR Code
- Geração de QR Code para cartões de visitante
- Registro de abertura e encerramento do acesso

---

## Tecnologias

### Frontend

| Categoria | Tecnologia |
|---|---|
| Framework | [Next.js 13](https://nextjs.org/) |
| Linguagem | [TypeScript](https://www.typescriptlang.org/) |
| UI | [Chakra UI](https://chakra-ui.com/) + [Framer Motion](https://www.framer.com/motion/) |
| Autenticação | [NextAuth.js](https://next-auth.js.org/) |
| Requisições | [Axios](https://axios-http.com/) + [React Query](https://tanstack.com/query/v3) |
| Formulários | [React Hook Form](https://react-hook-form.com/) + [Yup](https://github.com/jquense/yup) |
| Mapas | [Leaflet](https://leafletjs.com/) + [React Leaflet](https://react-leaflet.js.org/) |
| Calendário | [FullCalendar](https://fullcalendar.io/) |
| Gráficos | [ApexCharts](https://apexcharts.com/) |
| QR Code | [react-qrcode-logo](https://github.com/gcoro/react-qrcode-logo) |
| Criptografia | [bcrypt](https://github.com/kelektiv/node.bcrypt.js) |
| Ícones | [React Icons](https://react-icons.github.io/react-icons/) |
| PDF | [react-to-pdf](https://github.com/ivmarcos/react-to-pdf) |

### Backend

| Categoria | Tecnologia |
|---|---|
| Runtime | [Node.js](https://nodejs.org/) |
| Linguagem | JavaScript / TypeScript |

> 🔗 Repositório do servidor (backend): [henrylsilveira/SisAGIServer](https://github.com/henrylsilveira/SisAGIServer)

---

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) >= 16.x
- [pnpm](https://pnpm.io/) (recomendado) ou npm/yarn
- Banco de dados configurado (verifique as variáveis de ambiente)

---

## Instalação e Execução

### 1. Clone o repositório

```bash
git clone https://github.com/henrylsilveira/SisAGI.git
cd SisAGI
```

### 2. Instale as dependências

```bash
pnpm install
# ou
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
# Banco de dados
DATABASE_URL="sua_string_de_conexão"

# NextAuth
NEXTAUTH_SECRET="sua_chave_secreta"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Execute o projeto

```bash
# Ambiente de desenvolvimento
pnpm dev

# Build de produção
pnpm build
pnpm start
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## Estrutura do Projeto

```
SisAGI/
├── public/
│   └── img/             # Imagens estáticas
├── src/
│   ├── pages/           # Páginas Next.js (roteamento)
│   ├── components/      # Componentes reutilizáveis
│   ├── styles/          # Estilos globais
│   └── ...
├── .eslintrc.json
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## Roadmap

### 🔧 Ajustes Pendentes

- [ ] Exibir a situação atual do armamento na tela de cautelas (cautelado/disponível)
- [ ] Bloquear cautela de material quando o estoque estiver zerado
- [ ] Persistir a finalidade da cautela no banco de dados
- [ ] Corrigir bug na exibição da foto do civil (aparecendo apenas a foto do documento)

### 🚀 Funcionalidades Futuras

- [ ] Controle de combustível pelo Furriel
- [ ] Controle de munição pelo Furriel
- [ ] Registro de manutenções do armamento (data, tipo e ID)
- [ ] Mapa interativo com localização geográfica dos militares e distância ao batalhão
- [ ] Gerador de QR Code para cartões de visitante com registro de abertura/encerramento
- [ ] Tabela de veículos (civis e militares)

---

## Contribuição

O projeto está **aberto para qualquer pessoa que queira contribuir**, seja para corrigir bugs, refatorar o código, atualizar dependências ou implementar as funcionalidades ainda pendentes listadas no roadmap.

Se você é militar, desenvolvedor, ou os dois — sua ajuda é especialmente bem-vinda para que essa ferramenta possa um dia ser útil a outras unidades.

### Como contribuir

1. Faça um **fork** do projeto
2. Crie uma branch para sua feature ou correção: `git checkout -b feature/minha-feature`
3. Commit suas mudanças: `git commit -m 'feat: adiciona minha feature'`
4. Faça o push para a branch: `git push origin feature/minha-feature`
5. Abra um **Pull Request** descrevendo o que foi feito

Dúvidas ou sugestões? Abra uma [issue](https://github.com/henrylsilveira/SisAGI/issues) ou entre em contato diretamente pelo GitHub.

---

## Aviso

Este é um projeto **pessoal e independente**, desenvolvido por um militar com perfil de desenvolvedor. **Não possui vínculo oficial com o Exército Brasileiro** nem com qualquer Organização Militar. O código é disponibilizado livremente para fins de estudo, melhoria e eventual uso por quem se interessar.

---

Desenvolvido por [henrylsilveira](https://github.com/henrylsilveira) - Portfolio: https://hleao.dev
