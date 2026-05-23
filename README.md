<div align="center">

# 🪖 SisAGI — Sistema de Apoio à Gestão Interna

[![Português](https://img.shields.io/badge/lang-PT--BR-009c3b?style=for-the-badge)](https://github.com/henrylsilveira/SisAGI#-versão-em-português)
[![English](https://img.shields.io/badge/lang-EN-002776?style=for-the-badge)](https://github.com/henrylsilveira/SisAGI#-english-version)

</div>



# 🇺🇸 English Version

> Web application developed by a soldier-developer with the goal of improving internal administration within a Military Organization (MO), centralizing the control of weapons, supplies, personnel, vehicles, and more.

## ⚠️ Project Status

![Status](https://img.shields.io/badge/status-discontinued-red)
![Contributions](https://img.shields.io/badge/contributions-welcome-brightgreen)

**This project is discontinued.** Development started in **2021** and was halted after being submitted to **PREMIA 2024** (Brazilian Army Innovation and Administrative Improvement Award). The code remains open for anyone who wants to pick it up, fix bugs, refactor, or implement the pending features.

Since this is a large-scope project built during the author's early stages as a developer, there may be **bugs, flaws, and room for improvement** — any contribution is very welcome!

> 🏆 This project was **submitted to PREMIA 2024**, recognizing its potential contribution to modernizing Brazilian military administration.

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Roadmap](#roadmap-1)
- [Contributing](#contributing)
- [About the Author](#about-the-author)

## About the Project

**SisAGI** (**Sistema de Apoio à Gestão Interna** / Internal Management Support System) is a web application started in **2021** by a soldier with a developer mindset, aimed at digitalizing and improving the internal administrative processes of a Military Organization (MO).

**This is not an official Brazilian Army project.** It is an individual initiative born from the desire to modernize the unit's internal management and ease the daily work of military personnel in administrative roles — such as the General Aide, Supply Sergeant, Armorer, and other departments.

The system consists of **two repositories**:

- **Frontend** (this repository): web application built with **Next.js 13 + TypeScript**
- **Backend**: **Node.js** server responsible for the API and business logic → [henrylsilveira/SisAGIServer](https://github.com/henrylsilveira/SisAGIServer)

The system provides weapon custody control, supply management, personnel registration with geolocation, visitor QR Code generation, and much more.

## ⚙️ Features

### 🔫 Weapons
- Weapon custody and return tracking
- Real-time status of each weapon (checked out or available)
- Purpose logging per custody (Mission, Duty, etc.)
- Maintenance history (date and type)

### 📦 Supplies
- Supply inventory control
- Automatic block on custody when stock is depleted

### 👤 Personnel
- Full registration of military and civilian staff
- Geographic location storage (latitude/longitude) of residence
- Interactive map with all personnel plotted
- Distance calculation from each person to the battalion

### ⛽ Supply Sergeant (Furriel)
- Fuel consumption tracking
- Ammunition control

### 📅 Calendar
- Events and duty schedule with calendar view (FullCalendar)

### 📊 Dashboards
- Charts and reports powered by ApexCharts

### 🔐 Authentication
- Login with access control via NextAuth

### 🔲 QR Code
- QR Code generation for visitor cards
- Access open/close event logging

## 🛠️ Tech Stack

### Frontend

| Category | Technology |
|---|---|
| Framework | [Next.js 13](https://nextjs.org/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| UI | [Chakra UI](https://chakra-ui.com/) + [Framer Motion](https://www.framer.com/motion/) |
| Authentication | [NextAuth.js](https://next-auth.js.org/) |
| HTTP Requests | [Axios](https://axios-http.com/) + [React Query](https://tanstack.com/query/v3) |
| Forms | [React Hook Form](https://react-hook-form.com/) + [Yup](https://github.com/jquense/yup) |
| Maps | [Leaflet](https://leafletjs.com/) + [React Leaflet](https://react-leaflet.js.org/) |
| Calendar | [FullCalendar](https://fullcalendar.io/) |
| Charts | [ApexCharts](https://apexcharts.com/) |
| QR Code | [react-qrcode-logo](https://github.com/gcoro/react-qrcode-logo) |
| Cryptography | [bcrypt](https://github.com/kelektiv/node.bcrypt.js) |
| Icons | [React Icons](https://react-icons.github.io/react-icons/) |
| PDF | [react-to-pdf](https://github.com/ivmarcos/react-to-pdf) |

### Backend

| Category | Technology |
|---|---|
| Runtime | [Node.js](https://nodejs.org/) |
| Language | JavaScript / TypeScript |

> 🔗 Backend repository: [henrylsilveira/SisAGIServer](https://github.com/henrylsilveira/SisAGIServer)

## 📦 Prerequisites

- [Node.js](https://nodejs.org/) >= 16.x
- [pnpm](https://pnpm.io/) (recommended) or npm/yarn
- Database configured (check environment variables)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/henrylsilveira/SisAGI.git
cd SisAGI
```

### 2. Install dependencies

```bash
pnpm install
# or
npm install
```

### 3. Set up environment variables

Create a `.env.local` file at the project root:

```env
# Database
DATABASE_URL="your_connection_string"

# NextAuth
NEXTAUTH_SECRET="your_secret_key"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Run the project

```bash
# Development
pnpm dev

# Production
pnpm build
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
SisAGI/
├── public/
│   └── img/             # Static images
├── src/
│   ├── pages/           # Next.js pages (routing)
│   ├── components/      # Reusable components
│   ├── styles/          # Global styles
│   └── ...
├── .eslintrc.json
├── next.config.js
├── tsconfig.json
└── package.json
```

## 🗺️ Roadmap

### 🔧 Pending Fixes

- [ ] Show current weapon status on the custody screen (checked out / available)
- [ ] Block supply custody when stock is empty
- [ ] Persist custody purpose in the database
- [ ] Fix bug showing only document photo instead of civilian's profile photo

### 🚀 Upcoming Features

- [ ] Fuel consumption control by the Supply Sergeant
- [ ] Ammunition control by the Supply Sergeant
- [ ] Weapon maintenance log (date, type, and ID)
- [ ] Interactive map with personnel geolocation and distance to the battalion
- [ ] QR Code generator for visitor cards with open/close event tracking
- [ ] Vehicle table (civilian and military)

## 🤝 Contributing

This project is **open to anyone who wants to contribute** — whether to fix bugs, refactor code, update dependencies, or implement any of the pending features listed in the roadmap.

If you are a soldier, a developer, or both — your help is especially welcome so this tool can one day be useful to other units.

1. **Fork** the repository
2. Create your branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'feat: my contribution'`
4. Push: `git push origin feature/my-feature`
5. Open a **Pull Request**

Questions? Open an [issue](https://github.com/henrylsilveira/SisAGI/issues).

## 👨‍💻 About the Author

**Henry Leão** is a Brazilian Army soldier who taught himself software development to solve real problems he faced in his daily military duties. Over time, his side projects grew from internal tools into public platforms used by soldiers across Brazil.

His work sits at the intersection of **software engineering** and **military operations** — building tools that modernize administrative processes and improve the day-to-day lives of military personnel. Beyond web development, he also studies **offensive security and Red Team** techniques.

**Stack:** TypeScript · JavaScript · React · Next.js · Node.js · Prisma · PostgreSQL · React Native · Tailwind CSS

**Other projects:**
- 🧮 [ebcalc.net](https://ebcalc.net) — Military pay calculator platform for Brazilian Army soldiers

[![Portfolio](https://img.shields.io/badge/Portfolio-000?style=for-the-badge&logo=vercel&logoColor=white)](https://hleao.dev)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/henryleao)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/henrylsilveira)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:henrylsilveira@gmail.com)

## ⚖️ Disclaimer

This is a **personal and independent project**, developed by a soldier with a developer mindset. It has **no official affiliation with the Brazilian Army** or any Military Organization. The code is freely available for study, improvement, and eventual use by anyone interested.

---

Built with 🖥️ + 🪖 by [henrylsilveira](https://github.com/henrylsilveira)

---

# 🇧🇷 Versão em Português

> Aplicação web desenvolvida por um militar desenvolvedor com o objetivo de aperfeiçoar a administração interna de uma Organização Militar (OM), centralizando o controle de armamento, material, pessoal, veículos e muito mais.

## ⚠️ Status do Projeto

![Status](https://img.shields.io/badge/status-descontinuado-red)
![Contribuições](https://img.shields.io/badge/contribuições-bem--vindas-brightgreen)

**Este projeto está descontinuado.** O desenvolvimento foi iniciado em **2021** e, após ser submetido ao **PREMIA 2024** (Prêmio do Exército Brasileiro de Inovação e Melhoria Administrativa), o trabalho foi encerrado. O código permanece aberto para quem quiser retomá-lo, corrigir bugs, refatorar ou implementar as funcionalidades ainda pendentes.

Por se tratar de um projeto de grande escopo desenvolvido durante as fases iniciais do autor como desenvolvedor, podem existir **falhas, bugs e pontos de melhoria** — qualquer contribuição é muito bem-vinda!

> 🏆 Este projeto foi **submetido ao PREMIA 2024**, reconhecendo o seu potencial de contribuição para a modernização da administração militar brasileira.

## 📋 Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Execução](#instalação-e-execução)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Roadmap](#roadmap)
- [Contribuição](#contribuição)
- [Sobre o Autor](#sobre-o-autor)

## Sobre o Projeto

O **SisAGI** (**Sistema de Apoio à Gestão Interna**) é uma aplicação web iniciada em **2021** por um militar com perfil de desenvolvedor, com o objetivo de digitalizar e aperfeiçoar os processos administrativos internos de uma Organização Militar (OM).

**Este não é um projeto oficial do Exército Brasileiro.** Trata-se de uma iniciativa individual, nascida da vontade de modernizar a gestão interna da unidade e facilitar o dia a dia dos militares responsáveis pelas áreas administrativas — como a Ajudância Geral, o Furriel, o Armeiro e outros setores.

O sistema é composto por **dois repositórios**:

- **Frontend** (este repositório): aplicação web construída com **Next.js 13 + TypeScript**
- **Backend**: servidor **Node.js** responsável pela API e regras de negócio → [henrylsilveira/SisAGIServer](https://github.com/henrylsilveira/SisAGIServer)

O sistema oferece controle de cautelas de armamento, gerenciamento de materiais, cadastro e localização geográfica de militares, geração de QR Codes para visitantes e muito mais.

## ⚙️ Funcionalidades

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

## 🛠️ Tecnologias

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

## 📦 Pré-requisitos

- [Node.js](https://nodejs.org/) >= 16.x
- [pnpm](https://pnpm.io/) (recomendado) ou npm/yarn
- Banco de dados configurado (verifique as variáveis de ambiente)

## 🚀 Instalação e Execução

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

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Banco de dados
DATABASE_URL="sua_string_de_conexão"

# NextAuth
NEXTAUTH_SECRET="sua_chave_secreta"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Execute o projeto

```bash
# Desenvolvimento
pnpm dev

# Produção
pnpm build
pnpm start
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## 📁 Estrutura do Projeto

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

## 🗺️ Roadmap

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

## 🤝 Contribuição

O projeto está **aberto para qualquer pessoa que queira contribuir**, seja para corrigir bugs, refatorar o código, atualizar dependências ou implementar as funcionalidades ainda pendentes listadas no roadmap.

Se você é militar, desenvolvedor, ou os dois — sua ajuda é especialmente bem-vinda para que essa ferramenta possa um dia ser útil a outras unidades.

1. Faça um **fork** do projeto
2. Crie uma branch: `git checkout -b feature/minha-feature`
3. Commit: `git commit -m 'feat: minha contribuição'`
4. Push: `git push origin feature/minha-feature`
5. Abra um **Pull Request**

Dúvidas? Abra uma [issue](https://github.com/henrylsilveira/SisAGI/issues).

## 👨‍💻 Sobre o Autor

**Henry Leão** é um militar do Exército Brasileiro que aprendeu desenvolvimento de software para resolver problemas reais do serviço. Com o tempo, seus projetos pessoais cresceram de ferramentas internas para plataformas públicas utilizadas por militares em todo o Brasil.

Seu trabalho está na interseção entre **engenharia de software** e **operações militares** — construindo ferramentas que modernizam processos administrativos e facilitam o dia a dia do serviço militar. Além do desenvolvimento web, também estuda **segurança ofensiva e Red Team**.

**Stack:** TypeScript · JavaScript · React · Next.js · Node.js · Prisma · PostgreSQL · React Native · Tailwind CSS

**Outros projetos:**
- 🧮 [ebcalc.net](https://ebcalc.net) — Plataforma de cálculo de proventos para militares do EB

[![Portfólio](https://img.shields.io/badge/Portfólio-000?style=for-the-badge&logo=vercel&logoColor=white)](https://hleao.dev)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/henryleao)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/henrylsilveira)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:henrylsilveira@gmail.com)

## ⚖️ Aviso

Este é um projeto **pessoal e independente**, desenvolvido por um militar com perfil de desenvolvedor. **Não possui vínculo oficial com o Exército Brasileiro** nem com qualquer Organização Militar. O código é disponibilizado livremente para fins de estudo, melhoria e eventual uso por quem se interessar.

---
---
