# Tarefa: Implementação do Portal Público
**PRD Fonte**: `docs/prd/002-public-portal.md`

## Descrição
Tarefas de implementação para o Portal Público, focando em SEO, performance e interatividade em tempo real.

## Convenções
- **Renderização**: ISR para Home, SSR para VDP, CSR para Busca.
- **Tempo Real**: WebSockets (Socket.io).

## Tarefas

### Homepage [Estimativa: 2025-12-15 a 2025-12-16]
- [ ] Implementar Homepage com ISR (revalidação de 60s) <!-- id: 0 -->
- [ ] Exibir veículos em destaque e filtros de busca <!-- id: 1 -->

### Página de Detalhes do Veículo (VDP) [Estimativa: 2025-12-16 a 2025-12-18]
- [ ] Implementar VDP com SSR <!-- id: 2 -->
- [ ] Exibir imagens em alta resolução, especificações, preço, histórico de lances <!-- id: 3 -->

### Busca & Listagem [Estimativa: 2025-12-18 a 2025-12-19]
- [ ] Implementar Busca Facetada (Marca, Modelo, Ano, Preço) <!-- id: 4 -->
- [ ] Implementar Filtragem no Lado do Cliente <!-- id: 5 -->

### Lances em Tempo Real [Estimativa: 2025-12-22 a 2025-12-24]
- [ ] Configurar Servidor WebSocket <!-- id: 6 -->
- [ ] Implementar Atualizações de Lances em Tempo Real na VDP <!-- id: 7 -->
- [ ] Sincronizar contagens regressivas "Leilão Terminando em Breve" <!-- id: 8 -->

### SEO [Estimativa: 2025-12-24 a 2025-12-26]
- [ ] Implementar Meta Tags Dinâmicas (Título, Descrição, OpenGraph) <!-- id: 9 -->
- [ ] Implementar Dados Estruturados JSON-LD (Product, Offer) <!-- id: 10 -->
- [ ] Gerar Sitemap.xml por tenant <!-- id: 11 -->
- [ ] Otimizar Core Web Vitals <!-- id: 12 -->
