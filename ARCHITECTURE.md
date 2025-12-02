# Visão Geral da Arquitetura - Pock Microservices

## Visão Geral do Sistema
Este projeto implementa um sistema complexo de leilões e vendas projetado para alta performance, SEO agressivo e multi-tenancy. Ele atende múltiplas concessionárias (tenants) a partir de uma única base de código, fornecendo uma aparência única para cada uma, enquanto compartilha a lógica central e componentes.

## Arquitetura de Alto Nível

A solução é construída como um **Monorepo** para equilibrar compartilhamento de código, produtividade do desenvolvedor e flexibilidade de implantação.

### Componentes Principais

1.  **Portal Público (`apps/portal-publico`)**:
    *   **Tecnologia**: Next.js (App Router).
    *   **Propósito**: A vitrine voltada para o cliente.
    *   **Principais Recursos**:
        *   **Multi-tenancy**: Usa Middleware do Next.js para reescrever URLs com base no hostname (ex: `loja-a.com` -> `/loja-a`).
        *   **Temas Dinâmicos**: Injeta temas específicos do tenant (cores, logos) em tempo de execução.
        *   **Estratégia de SEO**:
            *   **SSR (Server-Side Rendering)**: Para Páginas de Detalhes do Veículo (VDP) para garantir indexação de preço/status em tempo real.
            *   **ISR (Incremental Static Regeneration)**: Para Homepages das Lojas e Listagens para garantir carregamento rápido com atualizações periódicas (ex: a cada 60s).
        *   **Tempo Real**: WebSockets para atualizações de lances ao vivo na página de listagem.

2.  **Painel Administrativo (`apps/painel-admin`)**:
    *   **Tecnologia**: Next.js (ou Vite SPA).
    *   **Propósito**: Interface de gestão para lojistas e administradores da plataforma.
    *   **Principais Recursos**:
        *   **CSR (Client-Side Rendering)**: Foco em interatividade e gestão de estado complexo (formulários, dashboards).
        *   **Auth**: Rotas protegidas, RBAC.
        *   **Gestão de Estado**: TanStack Query para estado do servidor.

3.  **Serviços de Backend**:
    *   **Tecnologia**: Runtime Bun + Framework Elysia.js.
    *   **Arquitetura**: Clean Architecture (Domain, Application, Infrastructure).
    *   **Banco de Dados**: PostgreSQL com Drizzle ORM.
    *   **Principais Recursos**:
        *   **Performance**: API de alto throughput otimizada para Bun.
        *   **Multi-tenancy**: Isolamento de dados por tenant.
        *   **Observabilidade**: OpenTelemetry, Prometheus, Grafana.

4.  **Pacotes Compartilhados (`packages/*`)**:
    *   `ui-kit`: Componentes do Design System (Botões, Cards, Inputs) estilizados com Tailwind CSS.
    *   `utils`: Funções auxiliares compartilhadas (formatadores, validadores).
    *   `api-client`: Clientes de API tipados (schemas Zod, fetchers).

## Stack Tecnológica

| Categoria | Tecnologia | Motivação |
| :--- | :--- | :--- |
| **Gerenciador de Monorepo** | Turborepo / Nx | Cache de build eficiente, orquestração de tarefas. |
| **Framework Frontend** | Next.js (App Router) | Melhor suporte a SSR/ISR da classe, middleware poderoso. |
| **Estilização** | Tailwind CSS | Utility-first, fácil de criar temas dinâmicos via variáveis CSS. |
| **Runtime Backend** | Bun | Inicialização e execução extremamente rápidas, ferramentas integradas. |
| **Framework Backend** | Elysia.js | Moderno, type-safe, framework de alta performance para Bun. |
| **Banco de Dados** | PostgreSQL | Armazenamento de dados relacional confiável. |
| **ORM** | Drizzle ORM | TypeScript-first, leve, ótima DX. |
| **Gestão de Estado** | TanStack Query | Gestão eficiente de estado do servidor e cache. |
| **Tempo Real** | WebSockets | Atualizações ao vivo para leilões. |

## Diagrama

```mermaid
graph TD
    subgraph "Monorepo"
        subgraph "apps"
            Public[portal-publico (Next.js)]
            Admin[painel-admin (Next.js/Vite)]
        end
        subgraph "packages"
            UI[ui-kit]
            Utils[utils]
            API[api-client]
        end
    end

    subgraph "Infraestrutura Backend"
        LB[Load Balancer]
        API_GW[Gateway API Elysia]
        DB[(PostgreSQL)]
        Redis[(Cache Redis)]
    end

    User((Usuário)) --> LB
    LB --> Public
    LB --> Admin

    Public --> UI
    Public --> Utils
    Public --> API
    Admin --> UI
    Admin --> Utils
    Admin --> API

    Public -- SSR/ISR --> API_GW
    Admin -- CSR --> API_GW

    API_GW --> DB
    API_GW --> Redis
```
