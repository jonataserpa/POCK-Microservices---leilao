# Tarefa: Implementação de Serviços de Backend
**PRD Fonte**: `docs/prd/004-backend-services.md`

## Descrição
Tarefas de implementação para a API Backend, banco de dados e serviços principais.

## Convenções
- **Stack**: Bun, Elysia.js, PostgreSQL, Drizzle ORM.
- **API**: RESTful, Swagger/OpenAPI.

## Tarefas

### Configuração [Estimativa: 2025-12-08 a 2025-12-09]
- [ ] Inicializar projeto Bun + Elysia.js <!-- id: 0 -->
- [ ] Configurar PostgreSQL e Drizzle ORM <!-- id: 1 -->
- [ ] Configurar geração Swagger/OpenAPI <!-- id: 2 -->

### Módulo de Autenticação [Estimativa: 2025-12-09 a 2025-12-11]
- [ ] Implementar Endpoint de Login (`/auth/login`) <!-- id: 3 -->
- [ ] Implementar Endpoint de Registro (`/auth/register`) <!-- id: 4 -->
- [ ] Implementar Endpoint de Refresh Token (`/auth/refresh`) <!-- id: 5 -->

### Módulo de Multi-tenancy [Estimativa: 2025-12-11 a 2025-12-12]
- [ ] Implementar Isolamento de Dados (RLS ou coluna `tenant_id`) <!-- id: 6 -->
- [ ] Criar Middleware de Tenant <!-- id: 7 -->

### Módulo de Pagamentos [Estimativa: 2025-12-15 a 2025-12-16]
- [ ] Integrar Stripe/Pagar.me <!-- id: 8 -->
- [ ] Implementar Handlers de Webhook <!-- id: 9 -->

### Módulo de Notificações [Estimativa: 2025-12-16 a 2025-12-17]
- [ ] Implementar Notificações por Email (Transacional) <!-- id: 10 -->
- [ ] Implementar Notificações SMS/In-app <!-- id: 11 -->

### Esquema do Banco de Dados [Estimativa: 2025-12-17 a 2025-12-19]
- [ ] Definir Esquema de Tenants <!-- id: 12 -->
- [ ] Definir Esquema de Users <!-- id: 13 -->
- [ ] Definir Esquema de Vehicles <!-- id: 14 -->
- [ ] Definir Esquema de Auctions <!-- id: 15 -->
- [ ] Definir Esquema de Bids <!-- id: 16 -->

### Observabilidade [Estimativa: 2025-12-19]
- [ ] Expor Métricas Prometheus <!-- id: 17 -->
- [ ] Configurar Rastreamento OpenTelemetry <!-- id: 18 -->
