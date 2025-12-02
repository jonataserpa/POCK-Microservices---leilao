# PRD 007: Especificação de CRUDs do Painel Administrativo

## 1. Introdução
Este documento detalha os requisitos funcionais e de interface para os módulos de gestão (CRUD) de **Campanhas** e **Veículos** no Painel Administrativo (`painel-admin`). O objetivo é fornecer uma interface intuitiva e eficiente para que os administradores das lojas possam gerenciar seu conteúdo.

## 2. Padrões de Interface (UI/UX)
Seguindo o **PRD 006**, todas as telas devem respeitar os seguintes padrões:

*   **Layout**: Sidebar lateral fixa, Header com breadcrumbs e ações principais.
*   **Listagens**: Tabela com paginação, busca e filtros. Ações por linha (Editar, Excluir).
*   **Formulários**: Cards brancos com sombras suaves, inputs validados, botões de ação (Salvar, Cancelar) no rodapé ou topo.
*   **Feedback**: Toasts de sucesso/erro após operações.

## 3. Gestão de Campanhas

### 3.1 Listagem de Campanhas
*   **Rota**: `/[tenantId]/campaigns`
*   **Elementos da Tabela**:
    *   **Nome/Título**: Exibir `title` (ou `slug` se vazio).
    *   **Slug**: URL amigável.
    *   **Idioma**: Badge indicando o idioma (`lang`).
    *   **Validade**: Data `validUntil` formatada.
    *   **Veículos**: Contador de veículos associados.
    *   **Ações**: Botão Editar (ícone lápis), Botão Excluir (ícone lixeira).
*   **Ações da Página**: Botão "Nova Campanha" (Primary Purple).

### 3.2 Cadastro/Edição de Campanha
*   **Rota**: `/[tenantId]/campaigns/new` ou `/[tenantId]/campaigns/[id]/edit`
*   **Campos do Formulário**:
    1.  **Identificação**:
        *   `slug` (Texto, obrigatório, único por tenant/lang).
        *   `lang` (Select: pt-BR, en-US, es-ES).
    2.  **Conteúdo**:
        *   `title` (Texto, obrigatório).
        *   `description` (Textarea, curto).
        *   `ctaLabel` (Texto, ex: "Ver Ofertas").
    3.  **Mídia & Configuração**:
        *   `heroImage` (URL da imagem).
        *   `validUntil` (Date Picker).

### 3.3 Associação de Veículos
*   Na edição da campanha, deve haver uma seção ou aba para gerenciar os veículos (`cars`) associados a ela.
*   **Lista de Veículos da Campanha**: Tabela interna mostrando os carros já adicionados.
*   **Adicionar Veículo**: Botão que abre um Modal ou redireciona para formulário de criação de veículo vinculado a esta campanha.

## 4. Gestão de Veículos (Carros)

Os veículos são, na estrutura atual do `db.json`, sub-recursos de uma campanha.

### 4.1 Formulário de Veículo
*   **Contexto**: Um veículo pertence a uma campanha específica.
*   **Campos**:
    1.  **Dados do Carro**:
        *   `model` (Texto, ex: "ACME Trail 2.0").
        *   `year` (Número, ex: 2025).
        *   `priceFrom` (Número/Moeda).
        *   `currency` (Select: BRL, USD - default baseado no tenant/lang).
    2.  **Mídia**:
        *   `image` (URL da imagem).
    3.  **Destaque**:
        *   `highlight` (Switch/Checkbox): Define se o carro aparece com destaque na landing page.

## 5. Integração com API (Mock Server)

As operações devem refletir no `db.json` via `json-server`.

*   **Listar Campanhas**: `GET /campaigns?tenantId={tenantId}`
*   **Obter Campanha**: `GET /campaigns/{id}`
*   **Criar Campanha**: `POST /campaigns` (Payload deve incluir `tenantId`)
*   **Atualizar Campanha**: `PUT /campaigns/{id}`
*   **Excluir Campanha**: `DELETE /campaigns/{id}`

> **Nota**: Como a estrutura do `db.json` aninha `cars` dentro de `campaigns`, a gestão de veículos será feita atualizando o objeto da campanha inteira (adicionando/removendo itens do array `cars`), ou, idealmente, se o backend suportasse, via endpoints aninhados. Para o MVP com `json-server`, editaremos a campanha completa.

## 6. Fluxos de Usuário

1.  **Criar Campanha**:
    *   Admin clica em "Nova Campanha".
    *   Preenche dados básicos (Slug, Título, Validade).
    *   Salva.
    *   É redirecionado para a lista ou para a edição para adicionar carros.

2.  **Adicionar Carro**:
    *   Admin entra na edição da campanha.
    *   Na seção "Veículos", clica em "Adicionar Carro".
    *   Preenche modelo, ano, preço e imagem.
    *   Salva (o frontend atualiza o array `cars` da campanha e envia o PUT da campanha completa).

## 7. Requisitos Técnicos
*   **Validação**: Uso de `react-hook-form` e `zod` para validação de schemas.
*   **Feedback Visual**: Loading states nos botões durante requisições.
*   **Tratamento de Erro**: Exibir mensagens amigáveis se a API falhar.
