# PRD - CRUD de Tenants

## 1. Visão Geral
Este documento descreve os requisitos para a implementação do gerenciamento de Tenants (Clientes/Empresas) no Painel Administrativo (`painel-admin`). O objetivo é permitir que administradores da plataforma criem, visualizem, editem e excluam tenants.

## 2. Objetivos
- Permitir o cadastro de novos tenants.
- Permitir a edição de informações de tenants existentes (nome, domínio, cores, logo).
- Permitir a listagem de todos os tenants cadastrados.
- Permitir a exclusão de tenants (com confirmação).

## 3. Especificações Funcionais

### 3.1. Listagem de Tenants
- **Rota:** `/[tenantId]/tenants` (ou uma rota global `/admin/tenants` se for super-admin, mas assumindo contexto atual).
- **Interface:** Tabela contendo:
  - ID
  - Nome
  - Domínio
  - Ações (Editar, Excluir)
- **Integração:** `GET /tenants`

### 3.2. Criação de Tenant
- **Ação:** Botão "Novo Tenant" na listagem.
- **Formulário:**
  - ID (slug único, ex: `nova_empresa`)
  - Nome (ex: `Nova Empresa Ltda`)
  - Domínio (ex: `nova.localhost`)
  - Idioma Padrão (Select: `pt-BR`, `en-US`, `es-ES`)
  - Cores (Primary, Secondary)
- **Integração:** `POST /tenants`

### 3.3. Edição de Tenant
- **Ação:** Botão "Editar" na linha do tenant.
- **Formulário:** Mesmo da criação, pré-preenchido.
- **Integração:** `PUT /tenants/:id` ou `PATCH /tenants/:id`

### 3.4. Exclusão de Tenant
- **Ação:** Botão "Excluir" na linha do tenant.
- **Confirmação:** Modal ou alert perguntando "Tem certeza?".
- **Integração:** `DELETE /tenants/:id`

## 4. Especificações Técnicas
- **Frontend:** `apps/painel-admin`
- **Backend:** `apps/mock-server` (já suporta CRUD básico via `json-server`).
- **Componentes UI:** Reutilizar `Table`, `Button`, `Input`, `Modal` do `@repo/ui-kit`.

## 5. Critérios de Aceite
- [ ] Listagem exibe todos os tenants do `db.json`.
- [ ] Criar um tenant adiciona registro no `db.json`.
- [ ] Editar reflete mudanças na listagem e no `db.json`.
- [ ] Excluir remove o registro do `db.json`.
