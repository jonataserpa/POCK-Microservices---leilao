# Tarefa: Implementação de Conteúdo & Campanhas
**PRD Fonte**: `docs/prd/005-gestao-conteudo-campanhas.md`

## Descrição
Tarefas de implementação para Gestão de Campanhas, Internacionalização (i18n) e Configuração Avançada de Tenants.

## Convenções
- **Campanhas**: Agrega veículos sob um slug.
- **i18n**: Baseado em banco de dados, dinâmico.
- **Theming**: Configuração baseada em JSON.

## Tarefas

### Modelagem de Campanhas [Estimativa: 2025-12-22 a 2025-12-24]
- [ ] Implementar Estrutura de Dados de Campanha <!-- id: 0 -->
    - [ ] Campos: `id`, `tenantId`, `slug`, `lang`, `title`, `description`, `ctaLabel`, `heroImage`, `validUntil`.
    - [ ] Associação de Veículos: array `cars`.
- [ ] Implementar API de Campanhas <!-- id: 1 -->
    - [ ] Filtrar por `tenantId` e `lang`.
    - [ ] Implementar estratégia de Fallback.

### Internacionalização (i18n) [Estimativa: 2025-12-24 a 2025-12-25]
- [ ] Implementar Estrutura de Dados de Tradução (`key`, `tenantId`, `lang`, `value`) <!-- id: 2 -->
- [ ] Criar Endpoint de API `/api/i18n` <!-- id: 3 -->
- [ ] Implementar Provider i18n no Frontend para consumir API <!-- id: 4 -->

### Configuração de Tenant [Estimativa: 2025-12-25 a 2025-12-26]
- [ ] Implementar Estrutura de Dados de Tenant (`defaultLang`, `supportedLangs`, `country`) <!-- id: 5 -->
- [ ] Implementar Configuração de Tema do Cabeçalho (JSON) <!-- id: 6 -->
    - [ ] Opções de Layout: `horizontal-left`, `vertical-stacked`, `horizontal-center`.
    - [ ] Estilização: Cores, padding, sombra.
- [ ] Criar Endpoint de API `/tenants/:domain` <!-- id: 7 -->

### Performance [Estimativa: 2025-12-26]
- [ ] Configurar Cache para Config de Tenant & Traduções (CDN/Edge/ISR) <!-- id: 8 -->
- [ ] Configurar Cache com TTL Curto para Campanhas <!-- id: 9 -->
