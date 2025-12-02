# PRD 003: Painel Administrativo (`painel-admin`)

## 1. Introdução
O Painel Administrativo é o centro de comando para lojistas e administradores da plataforma. É uma aplicação segura e de alta produtividade para gerenciar inventário, leilões e usuários.

## 2. Principais Recursos

### 2.1 Gestão de Veículos
*   **Operações CRUD**: Criar, Ler, Atualizar, Deletar veículos.
*   **Formulários Complexos**: Wizards de múltiplas etapas para detalhes do veículo (especificações, fotos, laudo).
*   **Ações em Massa**: Importar/Exportar CSV de inventário.

### 2.2 Gestão de Leilões
*   **Agendamento**: Definir horários de início/fim, preços de reserva e incrementos de lance.
*   **Monitoramento ao Vivo**: Dashboard para ver leilões ativos e atividade de lances em tempo real.
*   **Moderação**: Capacidade de cancelar lances ou pausar leilões em emergências.

### 2.3 Gestão de Usuários
*   **CRM**: Ver usuários registrados, histórico de lances e status de verificação.
*   **KYC**: Ferramentas para aprovar/rejeitar documentos de usuários.

### 2.4 Dashboard & Analytics
*   **Métricas**: Vendas Totais, Lances Ativos, Receita, Crescimento de Usuários.
*   **Visualizações**: Gráficos usando bibliotecas como Recharts.

## 3. Requisitos Técnicos
*   **Renderização**: **CSR (Client-Side Rendering)**. SEO não é necessário.
*   **Gestão de Estado**: **TanStack Query** para cache eficiente de estado do servidor e atualizações otimistas.
*   **Biblioteca de UI**: Componentes compartilhados do `ui-kit` para consistência.
*   **Performance**: Transições rápidas entre visualizações (sensação de SPA).

## 4. Papéis de Usuário
*   **Super Admin**: Acesso total ao sistema.
*   **Admin da Loja**: Acesso apenas aos dados da sua própria loja.
*   **Agente de Suporte**: Acesso somente leitura aos dados de usuários para tickets de suporte.
