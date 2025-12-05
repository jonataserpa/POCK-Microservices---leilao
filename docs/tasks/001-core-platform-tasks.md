# Tarefa: Implementação da Plataforma Central
**PRD Fonte**: `docs/prd/001-core-platform.md`

## Descrição
Tarefas de implementação para a Plataforma Central, cobrindo multi-tenancy, autenticação e infraestrutura compartilhada.

## Convenções
- **Stack**: Next.js Middleware para resolução de domínio.
- **Auth**: Baseado em JWT, RBAC.
- **Infra**: OpenTelemetry, Prometheus.

## Tarefas

### Multi-tenancy [Estimativa: 2025-12-08 a 2025-12-10]
- [ ] Implementar Middleware de Resolução de Domínio <!-- id: 0 -->
    - [ ] Inspecionar cabeçalho `Host`.
    - [ ] Mapear domínio/subdomínio para `tenantId`.
    - [ ] Reescrever URL para roteamento específico do tenant.
- [ ] Implementar Temas Dinâmicos <!-- id: 1 -->
    - [ ] Criar Server Component `layout.tsx` para buscar config do tenant.
    - [ ] Criar Client Component `ThemeProvider`.
    - [ ] Aplicar variáveis CSS ao `:root`.

### Autenticação & Autorização [Estimativa: 2025-12-10 a 2025-12-12]
- [ ] Implementar Sistema de Autenticação JWT <!-- id: 2 -->
- [ ] Implementar RBAC (Papéis: SuperAdmin, TenantAdmin, User) <!-- id: 3 -->
- [ ] Implementar Gestão Segura de Sessão (Cookies HTTP-only) <!-- id: 4 -->

### Infraestrutura Compartilhada [Estimativa: 2025-12-11 a 2025-12-12]
- [ ] Configurar Logging Centralizado (OpenTelemetry) <!-- id: 5 -->
- [ ] Configurar Monitoramento (Métricas Prometheus) <!-- id: 6 -->
