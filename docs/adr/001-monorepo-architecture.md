# ADR 001: Estratégia de Arquitetura Monorepo

## Status
Aceito

## Contexto
Estamos construindo um sistema de leilão complexo que requer:
1.  **Múltiplos Frontends**: Um portal público com SEO agressivo e um painel administrativo separado e altamente interativo.
2.  **Lógica Compartilhada**: Ambas as aplicações compartilham componentes de UI, funções utilitárias e tipos de API.
3.  **Multi-tenancy**: O portal público deve atender a múltiplas lojas distintas (tenants) com marcas únicas, mas lógica subjacente compartilhada.
4.  **Experiência do Desenvolvedor Unificada**: Queremos simplificar linting, testes e build em toda a stack.

Consideramos Micro-frontends (Module Federation), mas rejeitamos devido à alta complexidade de implementar SSR robusto (crítico para SEO) e ao risco de "hydration mismatches".

## Decisão
Adotaremos uma arquitetura **Monorepo** gerenciada pelo **Turborepo** (ou Nx).

### Componentes Principais:
*   **`apps/portal-publico`**: Aplicação Next.js focada em SEO (SSR/ISR) e multi-tenancy via Middleware.
*   **`apps/painel-admin`**: Aplicação Next.js (ou Vite) focada em gestão interna (CSR).
*   **`packages/ui-kit`**: Componentes React compartilhados estilizados com Tailwind CSS.
*   **`packages/utils`**: Lógica de negócios e auxiliares compartilhados.
*   **`packages/api-client`**: Definições de API e tipos compartilhados.

## Consequências

### Positivas
*   **Compartilhamento de Código**: "Escreva uma vez, use em todo lugar" para componentes de UI e lógica.
*   **Mudanças Atômicas**: Pode refatorar um componente compartilhado e atualizar ambos os apps em um único commit.
*   **Ferramentas Unificadas**: Configuração única para ESLint, Prettier, TypeScript.
*   **Gestão de Dependências Simplificada**: Um `package.json` (na raiz) ou dependências "hoisted" reduzem conflitos de versão.
*   **SEO & Performance**: Permite usar as otimizações nativas do Next.js (SSR, ISR) sem o overhead de orquestração de micro-frontends.

### Negativas
*   **Complexidade de Build**: Requer configuração de uma ferramenta de monorepo (Turborepo) para lidar com cache e execução de tarefas eficientemente.
*   **CI/CD**: Pipelines precisam ser inteligentes o suficiente para construir/testar apenas projetos afetados (Turborepo lida com isso).
*   **Tamanho do Repositório**: O repositório crescerá com o tempo, potencialmente tornando operações git mais lentas (embora gerenciável com higiene adequada).

## Compliance
*   Todos os novos projetos frontend devem ser criados dentro do diretório `apps/`.
*   Código compartilhado deve ser extraído para `packages/`.
*   Importações diretas entre `apps` são proibidas; eles devem se comunicar via pacotes compartilhados ou APIs.
