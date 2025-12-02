# Pock Microservices - Leilão Automotivo

Plataforma de leilões automotivos desenvolvida com arquitetura de microsserviços e monorepo.

## 🚀 Sobre o Projeto

Este projeto é uma plataforma completa para gestão e participação em leilões de veículos. O sistema é composto por um portal público para os usuários finais e um painel administrativo para gestão.

### Estrutura do Monorepo

O projeto utiliza **Turborepo** para gerenciamento do monorepo:

*   **Apps**:
    *   `frontend/apps/portal-publico`: Portal voltado para o cliente final (Next.js, Tailwind CSS).
    *   `frontend/apps/painel-admin`: Painel de administração para gestores (Next.js, Tailwind CSS).
    *   `frontend/apps/mock-server`: Servidor de dados simulados (JSON Server).
*   **Packages**:
    *   `frontend/packages/ui-kit`: Biblioteca de componentes de UI compartilhada.
    *   `frontend/packages/eslint-config`: Configurações de linting compartilhadas.
    *   `frontend/packages/typescript-config`: Configurações TypeScript compartilhadas.

## 🛠️ Tecnologias

*   **Frontend**: Next.js 16, React, Tailwind CSS v3.
*   **Gerenciamento de Pacotes**: npm, Turborepo.
*   **Linguagem**: TypeScript.
*   **Mocking**: JSON Server.

## 📦 Como Rodar

### Pré-requisitos

*   Node.js (versão LTS recomendada)
*   npm

### Instalação

Na raiz do projeto, instale as dependências:

```bash
npm install
```

### Executando em Desenvolvimento

Para rodar todas as aplicações simultaneamente:

```bash
npm run dev
```

Isso iniciará:
*   **Portal Público**: [http://localhost:3000](http://localhost:3000)
*   **Mock Server**: [http://localhost:3001](http://localhost:3001)
*   **Painel Admin**: [http://localhost:3002](http://localhost:3002)

## 📚 Documentação

A documentação detalhada do projeto encontra-se na pasta `docs/`:

*   [Arquitetura](./docs/adr/001-monorepo-architecture.md)
*   [Roadmap](./docs/roadmap-execucao.md)
*   [Padrões de UI/UX](./docs/prd/006-padroes-ui-ux.md)

## 🔗 Funcionalidades Implementadas

*   **Multi-tenancy**: Suporte a múltiplos clientes (tenants) via rotas dinâmicas.
*   **Internacionalização (i18n)**: Suporte a múltiplos idiomas.
*   **Catálogo de Veículos**: Listagem e detalhes de veículos com fotos e informações.
*   **Menus Dinâmicos**: Navegação contextual por tenant.

## 📝 Licença

Este projeto é privado e proprietário.
