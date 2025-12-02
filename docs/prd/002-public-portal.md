# PRD 002: Portal Público (`portal-publico`)

## 1. Introdução
O Portal Público é a vitrine voltada para o cliente onde os usuários navegam pelos veículos, veem detalhes e dão lances. Prioriza SEO, performance e interatividade em tempo real.

## 2. Principais Recursos

### 2.1 Homepage da Loja
*   **Conteúdo**: Veículos em destaque, filtros de busca, marca da loja.
*   **Estratégia de Renderização**: **ISR (Incremental Static Regeneration)**.
    *   Revalida a cada 60 segundos.
    *   Garante TTFB (Time to First Byte) instantâneo enquanto mantém o conteúdo relativamente fresco.

### 2.2 Página de Detalhes do Veículo (VDP)
*   **Conteúdo**: Imagens em alta resolução, especificações detalhadas, preço atual, histórico de lances, botão "Dar Lance".
*   **Estratégia de Renderização**: **SSR (Server-Side Rendering)**.
    *   Crítico para SEO: O bot do Google deve ver o preço exato e status (Vendido/Disponível) atual.
    *   Busca os dados mais recentes da API em cada requisição.

### 2.3 Busca & Listagem
*   **Recursos**: Busca facetada (Marca, Modelo, Ano, Faixa de Preço).
*   **Renderização**: Filtragem no lado do cliente para velocidade, com estado inicial hidratado do servidor.

### 2.4 Lances em Tempo Real
*   **Mecanismo**: WebSockets (Socket.io ou similar).
*   **Comportamento**:
    *   Quando um usuário dá um lance, todos os clientes conectados naquela VDP recebem uma atualização.
    *   O preço atualiza instantaneamente sem refresh da página.
    *   Contagens regressivas de "Leilão Terminando em Breve" devem ser sincronizadas.

## 3. Requisitos de SEO
*   **Meta Tags**: Título dinâmico, descrição e tags OpenGraph baseadas nos dados do veículo.
*   **Dados Estruturados**: Schemas JSON-LD para `Product` e `Offer`.
*   **Sitemap**: Sitemap.xml gerado automaticamente para cada tenant.
*   **Performance**: Core Web Vitals (LCP, CLS, FID) devem estar na zona "Verde".

## 4. Fluxos de Usuário
1.  **Visitante**: Acessa Home -> Busca Veículo -> Vê VDP -> Clica "Login para Dar Lance".
2.  **Usuário Logado**: Vê VDP -> Dá Lance -> Recebe Notificação "Lance Superado" -> Dá Lance Maior.
