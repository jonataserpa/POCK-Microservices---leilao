# PRD 006: Padrões de UI/UX e Layouts

## 1. Introdução
Este documento define os padrões visuais e de layout para as principais interfaces do sistema, baseando-se nos mockups aprovados. O objetivo é garantir uma experiência de usuário consistente, moderna e de alta conversão.

## 2. Painel Administrativo (Dashboard)
Referência: `uploaded_image_0` (PulseFlow)

### 2.1 Estilo Visual
*   **Tema**: Dark/Purple moderno.
*   **Paleta**: Fundo claro/cinza para área de conteúdo, Sidebar roxa vibrante (`#6366f1` a `#a855f7`), Cards brancos com sombras suaves.
*   **Tipografia**: Sans-serif limpa (Inter ou Roboto).

### 2.2 Estrutura do Layout
*   **Sidebar (Esquerda)**:
    *   Logo "PulseFlow" no topo.
    *   Menu de navegação vertical: Dashboard, Campanhas, Analytics, Audiência, Orçamento, Configurações.
    *   Perfil do usuário no rodapé da sidebar.
*   **Área Principal (Direita)**:
    *   **Header**: Saudação ("Visão Geral"), Barra de busca, Notificações.
    *   **Cards de Métricas (Topo)**: 4 cards coloridos (Azul, Roxo, Rosa, Laranja) exibindo métricas chave (Impressões, Cliques, Taxa de Conversão, Receita). Cada card mostra o valor total e a variação percentual.
    *   **Gráfico de Desempenho (Centro)**: Gráfico de linha grande mostrando evolução temporal. Filtros de período (Diário, Semanal, Mensal).
    *   **Distribuição de Tráfego (Direita)**: Gráfico de rosca (Donut chart) detalhando fontes de tráfego (Instagram, Facebook, TikTok, etc.).
    *   **Campanhas Ativas (Inferior Esquerdo)**: Lista de campanhas com status (Ativo, Planejado), barra de progresso de orçamento e valor gasto.
    *   **Métricas de Engajamento (Inferior Direito)**: Gráfico de barras comparativo.

## 3. Portal Público - Listagem de Leilões
Referência: `uploaded_image_1` (Active Auctions)

### 3.1 Estilo Visual
*   **Tema**: Clean/Light para listagem, Dark/Purple para área de ação (bidding).
*   **Cards**: Design de card elevado com imagem de destaque grande.

### 3.2 Componentes
*   **Header de Busca**: Título "Active Auctions", Barra de busca, Dropdown de categorias.
*   **Cards de Leilão**:
    *   **Badges**: Tags como "Hot", "Featured", "Premium" no canto superior esquerdo da imagem.
    *   **Timer**: Contador regressivo (ex: 02:45:30) sobre a imagem.
    *   **Info**: Título do item, Descrição curta, Lance Atual (destacado em verde), Número de Licitantes.
    *   **Ação**: Botão "Place Bid" de largura total (Roxo/Laranja).
*   **Painel de Lances ao Vivo (Live Bidding Experience)**:
    *   Seção escura com gradiente roxo.
    *   **Esquerda**: Proposta de valor (Notificações instantâneas, Histórico, Auto-bidding).
    *   **Direita (Quick Bid Panel)**:
        *   Dropdown para selecionar leilão ativo.
        *   Input de valor de lance.
        *   Botões de incremento rápido (+100, +500, +1000).
        *   Botão de ação principal "Place Bid Now" (Verde vibrante).

## 4. Portal Público - Landing Page / Detalhe
Referência: `uploaded_image_2` (AutoLux)

### 4.1 Estilo Visual
*   **Tema**: "Premium Dark". Fundo roxo profundo com gradientes suaves.
*   **Estética**: Glassmorphism (efeito de vidro fosco) nos containers.

### 4.2 Hero Section
*   **Header**: Logo "AutoLux", Menu horizontal (Premium, Sport, SUV, Electric), Botão "Contact" (Cílindrico).
*   **Título**: "Discover Your Dream Ride" com a palavra "Ride" em gradiente/destaque.
*   **Subtítulo**: Texto descritivo centralizado.

### 4.3 Card de Destaque (Feature Card)
*   **Layout**: Container largo com bordas arredondadas e brilho externo (glow).
*   **Esquerda (Info)**:
    *   Tag "PERFORMANCE BEAST".
    *   Nome do Veículo (ex: Ferrari F8 Tributo).
    *   Descrição textual.
    *   **Specs Grid**: 3 blocos com ícones (Potência/HP, Velocidade Máxima, Ano).
    *   **Preço e Ação**: Preço grande em branco, Botão "View Details" laranja com seta.
*   **Direita (Visual)**:
    *   Imagem do veículo em alta resolução, recortada ou em estúdio, ocupando toda a altura do card.

## 5. Diretrizes de Implementação
*   **Responsividade**: Todos os layouts devem se adaptar para Mobile (stack vertical).
*   **Acessibilidade**: Garantir contraste suficiente nos textos sobre fundos roxos/escuros.
*   **Animações**:
    *   Hover effects nos cards (leve elevação).
    *   Transições suaves nos gráficos.
    *   Micro-interações nos botões de "Quick Bid".
