# Tarefa: Implementação de Especificações CRUD Admin
**PRD Fonte**: `docs/prd/007-especificacao-crud-admin.md`

## Descrição
Tarefas de implementação para módulos CRUD de Campanhas e Veículos no Painel Administrativo.

## Convenções
- **UI**: Layout Sidebar, Breadcrumbs, Toasts.
- **Validação**: `react-hook-form` + `zod`.

## Tarefas

### Gestão de Campanhas [Estimativa: 2025-12-22 a 2025-12-24]
- [ ] Implementar Página de Lista de Campanhas (`/[tenantId]/campaigns`) <!-- id: 0 -->
    - [ ] Tabela com Nome, Slug, Lang, Validade, Contagem de Veículos.
- [ ] Implementar Formulário de Campanha (`/new` & `/edit`) <!-- id: 1 -->
    - [ ] Campos: Slug, Lang, Título, Descrição, CTA, HeroImage, Validade.
- [ ] Implementar Associação de Veículos no Formulário de Campanha <!-- id: 2 -->
    - [ ] Listar veículos associados.
    - [ ] Ações de Adicionar/Remover veículo.

### Gestão de Veículos [Estimativa: 2025-12-24 a 2025-12-25]
- [ ] Implementar Formulário de Veículo (Modal ou Sub-página) <!-- id: 3 -->
    - [ ] Campos: Modelo, Ano, PreçoBase, Moeda, Imagem, Destaque.

### Integração com API [Estimativa: 2025-12-25 a 2025-12-26]
- [ ] Integrar com `GET /campaigns` <!-- id: 4 -->
- [ ] Integrar com `POST /campaigns` <!-- id: 5 -->
- [ ] Integrar com `PUT /campaigns/{id}` <!-- id: 6 -->
- [ ] Integrar com `DELETE /campaigns/{id}` <!-- id: 7 -->

### UX/UI [Estimativa: 2025-12-26]
- [ ] Adicionar Estados de Carregamento <!-- id: 8 -->
- [ ] Adicionar Tratamento de Erros & Toasts <!-- id: 9 -->
