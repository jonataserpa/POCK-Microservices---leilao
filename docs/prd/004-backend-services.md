# PRD 004: Serviços de Backend

## 1. Introdução
O Backend fornece a API, persistência de dados e lógica de negócios para toda a plataforma. É construído para alta performance e escalabilidade.

## 2. Stack Tecnológica
*   **Runtime**: **Bun** (para velocidade e ferramentas integradas).
*   **Framework**: **Elysia.js** (Type-safe, rápido).
*   **Banco de Dados**: **PostgreSQL**.
*   **ORM**: **Drizzle ORM**.

## 3. Arquitetura da API
*   **Estilo**: API RESTful (com potencial para compartilhamento de tipos estilo Trpc via Elysia Eden).
*   **Documentação**: Swagger/OpenAPI (gerado automaticamente pelo Elysia).

## 4. Módulos Principais

### 4.1 Autenticação
*   **Endpoints**: `/auth/login`, `/auth/register`, `/auth/refresh`.
*   **Segurança**: JWT com expiração curta + Refresh Token HTTP-only.

### 4.2 Multi-tenancy
*   **Isolamento de Dados**: Row-level security ou coluna `tenant_id` em cada tabela.
*   **Middleware**: Extrair `tenant_id` dos headers da requisição e escopar queries do DB de acordo.

### 4.3 Pagamentos
*   **Integração**: Stripe (e potencialmente Pagar.me para o Brasil).
*   **Webhooks**: Lidar com eventos de sucesso/falha de pagamento de forma segura.

### 4.4 Notificações
*   **Canais**: Email (Transacional), SMS, In-app.
*   **Gatilhos**: "Você foi superado", "Leilão ganho", "Pagamento recebido".

## 5. Esquema do Banco de Dados (Alto Nível)
*   **Tenants**: `id`, `name`, `domain`, `theme_config`.
*   **Users**: `id`, `email`, `password_hash`, `role`, `tenant_id`.
*   **Vehicles**: `id`, `title`, `specs`, `status`, `tenant_id`.
*   **Auctions**: `id`, `vehicle_id`, `start_time`, `end_time`, `reserve_price`.
*   **Bids**: `id`, `auction_id`, `user_id`, `amount`, `timestamp`.

## 6. Observabilidade
*   **Métricas**: Endpoint Prometheus exposto pelo Elysia.
*   **Tracing**: Instrumentação OpenTelemetry para rastreamento de requisições entre serviços.
