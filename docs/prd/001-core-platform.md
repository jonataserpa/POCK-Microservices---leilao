# PRD 001: Requisitos da Plataforma Central

## 1. Introdução
A Plataforma Central serve como base para todo o ecossistema de leilões. Ela lida com preocupações transversais, como autenticação, resolução de multi-tenancy e infraestrutura compartilhada.

## 2. Estratégia de Multi-tenancy
O sistema deve suportar múltiplas lojas independentes (tenants) rodando na mesma infraestrutura.

### 2.1 Resolução de Domínio
*   **Mecanismo**: Middleware do Next.js.
*   **Lógica**:
    *   Inspecionar o cabeçalho `Host`.
    *   Mapear domínio/subdomínio para um `tenantId`.
    *   Reescrever a URL para lidar com roteamento específico do tenant se necessário (ou apenas passar `tenantId` via headers).
*   **Exemplo**:
    *   `loja-a.com` -> Middleware identifica Tenant A -> Injeta `X-Tenant-ID: tenant-a`.

### 2.2 Temas Dinâmicos
*   **Requisito**: Cada tenant deve ter sua própria marca (Logo, Cor Primária, Cor Secundária, Fontes).
*   **Implementação**:
    *   Server Component (`layout.tsx`) busca configuração do tenant baseada no `tenantId`.
    *   Passa configuração para um Client Component (`ThemeProvider`).
    *   `ThemeProvider` aplica variáveis CSS ao `:root` ou a um wrapper de nível superior.

## 3. Autenticação & Autorização
*   **Sistema de Auth**: Autenticação baseada em JWT.
*   **Papéis (RBAC)**:
    *   `SuperAdmin`: Pode gerenciar todos os tenants e configurações do sistema.
    *   `TenantAdmin`: Pode gerenciar sua loja específica (veículos, usuários).
    *   `User`: Pode navegar e dar lances em veículos.
*   **Gestão de Sessão**: Cookies HTTP-only seguros para tokens.

## 4. Infraestrutura Compartilhada
*   **Logging**: Logging centralizado via OpenTelemetry.
*   **Monitoramento**: Métricas Prometheus para latência de requisição, taxas de erro e conexões ativas.
