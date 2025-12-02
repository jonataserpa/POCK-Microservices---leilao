# PRD 005: Gestão de Conteúdo, Campanhas e Internacionalização

## 1. Introdução
Este documento detalha a estrutura de dados e requisitos para o sistema de Campanhas, Internacionalização (i18n) e Configuração Avançada de Tenants. O sistema deve ser altamente flexível, permitindo que cada tenant tenha campanhas específicas por idioma e uma aparência totalmente customizável via JSON.

## 2. Modelagem de Campanhas

O sistema deve suportar campanhas promocionais que agregam veículos específicos sob uma URL amigável (slug).

### 2.1 Estrutura da Campanha
Cada campanha é definida por:
*   **Identificação**: `id`, `tenantId`, `slug` (URL).
*   **Localização**: `lang` (ex: `pt-BR`, `en-US`). A mesma campanha lógica pode ter múltiplas entradas para diferentes idiomas.
*   **Conteúdo**:
    *   `title`: Título da campanha.
    *   `description`: Descrição curta.
    *   `ctaLabel`: Texto do botão de ação.
    *   `heroImage`: Imagem de destaque.
    *   `validUntil`: Data de validade.
*   **Veículos (`cars`)**: Lista de veículos associados à campanha.
    *   `model`, `year`, `priceFrom`, `currency`.
    *   `image`: Foto do veículo.
    *   `highlight`: Booleano para destacar ofertas principais.

### 2.2 Requisitos Funcionais
*   **Filtragem por Tenant e Idioma**: A API deve retornar apenas as campanhas do tenant atual e no idioma selecionado pelo usuário.
*   **Fallback**: Se não houver campanha no idioma do usuário, deve-se considerar uma estratégia de fallback (ex: mostrar em inglês ou no idioma padrão do tenant).

## 3. Internacionalização (i18n)

O sistema de tradução deve ser dinâmico e gerenciável via banco de dados, não apenas arquivos estáticos, para permitir updates sem deploy.

### 3.1 Estrutura de Tradução
*   **Chave**: `key` (ex: `campaign.title`, `page.detail.validUntil`).
*   **Contexto**: `tenantId` e `lang`.
*   **Valor**: `value` (O texto traduzido).

### 3.2 Exemplo de Uso
O frontend deve consultar um endpoint (ex: `/api/i18n?tenantId=acme&lang=pt-BR`) que retorna um objeto chave-valor para hidratar o provedor de i18n.

## 4. Configuração de Tenant (Theming Avançado)

Cada loja (tenant) possui uma configuração profunda que vai além de cores básicas, controlando o layout do cabeçalho e rodapé.

### 4.1 Dados do Tenant
*   `id`, `name`, `domain` (para resolução via Middleware).
*   `defaultLang`, `supportedLangs`.
*   `country`: Código do país (ex: BR, US, CL).

### 4.2 Header Theme (`headerTheme`)
O cabeçalho é totalmente configurável via JSON:
*   **Layout**: `horizontal-left`, `vertical-stacked`, `horizontal-center`. Define a disposição dos elementos.
*   **Logo**: URL, posição, dimensões.
*   **Menu**: Lista de itens de navegação (`label`, `href`, `target`) e posição (`left`, `center`, `right`).
*   **Info Bar**: Configuração para mostrar seletor de país/idioma.
*   **Estilos**: `backgroundColor`, `textColor`, `padding`, `boxShadow`, `borderRadius`.
*   **Conteúdo Adicional**: Capacidade de injetar elementos extras (texto, imagens/bandeiras) em posições específicas.

### 4.3 Exemplo de Flexibilidade
*   **ACME Motors**: Layout horizontal simples, azul.
*   **Globex Auto**: Layout vertical empilhado (logo em cima, título embaixo), verde, com bordas arredondadas.
*   **Andina Cars**: Layout centralizado, laranja, com bandeira do país.

## 5. API e Integração

### 5.1 Endpoints Sugeridos
*   `GET /tenants/:domain`: Retorna a configuração completa do tenant (incluindo tema e idiomas suportados).
*   `GET /campaigns`: Parâmetros `tenantId` e `lang`. Retorna lista de campanhas ativas.
*   `GET /translations`: Parâmetros `tenantId` e `lang`. Retorna dicionário de traduções.

### 5.2 Considerações de Performance
*   As configurações de tenant e traduções devem ser **fortemente cacheadas** (CDN/Edge) ou usar **ISR**, pois mudam com pouca frequência.
*   As campanhas podem ter cache com TTL menor (ex: 60 segundos) para refletir mudanças de preço ou disponibilidade.
