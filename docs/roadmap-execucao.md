# Roadmap de Execução

Este documento define a ordem de implementação dos PRDs e a estruturação do projeto, priorizando o desenvolvimento do Frontend conforme solicitado.

## Estrutura de Diretórios
Conforme definido, a raiz do projeto foi organizada em:
*   `/frontend`: Conterá o Monorepo Frontend (Next.js, UI Kit, Utils).
*   `/backend`: Conterá os serviços de Backend (Bun, Elysia).
*   `/k8s`: Conterá os manifestos de Kubernetes e Helm charts.

## Fases de Execução

### Fase 1: Fundação Frontend (Prioridade Alta)
**Objetivo**: Estabelecer a base visual e a estrutura das aplicações Next.js.

1.  **Setup do Monorepo Frontend (`/frontend`)**
    *   Inicializar Turborepo.
    *   Configurar ESLint, Prettier, TypeScript (Baseado nos arquivos de regras).
    *   Criar pacotes compartilhados: `ui-kit`, `utils`.

2.  **Implementação do UI Kit (Baseado no PRD 006)**
    *   Configurar Tailwind CSS.
    *   Criar componentes base: Botões, Inputs, Cards (Leilão, Veículo).
    *   Implementar layout do Dashboard (Sidebar, Header).
    *   Implementar layout do Portal Público (Header Dinâmico, Footer).

3.  **Portal Público (`apps/portal-publico` - PRD 002 & 005)**
    *   Configurar Next.js com Middleware para Multi-tenancy.
    *   Implementar sistema de rotas e slugs.
    *   Criar páginas: Home (Campanhas), Detalhe do Veículo (VDP).
    *   *Mockar* dados da API inicialmente (usando os JSONs do PRD 005).

4.  **Painel Administrativo (`apps/painel-admin` - PRD 003)**
    *   Criar estrutura do Dashboard.
    *   Implementar telas de CRUD de Veículos e Campanhas.

### Fase 2: Backend e Integração
**Objetivo**: Tornar o frontend funcional com dados reais.

1.  **Setup do Backend (`/backend` - PRD 004)**
    *   Inicializar projeto Bun + Elysia.
    *   Configurar Drizzle ORM e PostgreSQL.
    *   Implementar Autenticação (JWT).

2.  **API de Campanhas e Conteúdo (PRD 005)**
    *   Criar endpoints para servir as configurações de Tenant e Campanhas.
    *   Integrar Frontend com Backend (substituir mocks).

3.  **Funcionalidades Core (PRD 001)**
    *   Finalizar fluxo de login e multi-tenancy no backend.

### Fase 3: Infraestrutura e Deploy
**Objetivo**: Levar a aplicação para produção.

1.  **Containerização**
    *   Criar Dockerfiles para `frontend` e `backend`.

2.  **Kubernetes (`/k8s`)**
    *   Criar manifestos de Deployment, Service, Ingress.
    *   Configurar CI/CD.

## Próximos Passos Imediatos
1.  Inicializar o Monorepo dentro da pasta `frontend`.
2.  Criar o pacote `ui-kit`.
