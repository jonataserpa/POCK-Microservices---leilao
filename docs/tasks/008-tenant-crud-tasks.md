# Tarefa: Implementação de CRUD de Tenants
**PRD Fonte**: `docs/prd/008-tenant_crud_prd.md`

## Descrição
Tarefas de implementação para Gestão de Tenants no Painel Administrativo.

## Convenções
- **Frontend**: `apps/painel-admin`.
- **Backend**: `apps/mock-server` (json-server).

## Tarefas

### Lista de Tenants [Estimativa: 2025-12-29]
- [ ] Implementar Página de Lista de Tenants (`/[tenantId]/tenants`) <!-- id: 0 -->
    - [ ] Colunas: ID, Nome, Domínio, Ações.
    - [ ] Integrar `GET /tenants`.

### Criação de Tenant [Estimativa: 2025-12-30]
- [ ] Implementar Formulário de Criação de Tenant <!-- id: 1 -->
    - [ ] Campos: ID (slug), Nome, Domínio, Lang Padrão, Cores.
    - [ ] Integrar `POST /tenants`.

### Edição de Tenant [Estimativa: 2025-12-31]
- [ ] Implementar Formulário de Edição de Tenant <!-- id: 2 -->
    - [ ] Pré-preencher dados existentes.
    - [ ] Integrar `PUT/PATCH /tenants/:id`.

### Exclusão de Tenant [Estimativa: 2025-01-02]
- [ ] Implementar Ação de Exclusão com Confirmação <!-- id: 3 -->
    - [ ] Integrar `DELETE /tenants/:id`.

### Critérios de Aceite [Estimativa: 2025-01-02]
- [ ] Verificar se Lista exibe todos os tenants <!-- id: 4 -->
- [ ] Verificar se Criar adiciona ao `db.json` <!-- id: 5 -->
- [ ] Verificar se Editar atualiza o `db.json` <!-- id: 6 -->
- [ ] Verificar se Excluir remove do `db.json` <!-- id: 7 -->
