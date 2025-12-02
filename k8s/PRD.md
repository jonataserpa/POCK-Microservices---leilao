# Product Requirement Document (PRD) - Infraestrutura Kubernetes

## 1. Visão Geral
Este documento descreve a infraestrutura Kubernetes necessária para hospedar os microserviços do projeto Pock, especificamente as aplicações frontend (`painel-admin` e `portal-publico`) e o API Gateway (Traefik).

## 2. Objetivos
- Implantar um cluster Kubernetes funcional.
- Configurar o Traefik como Ingress Controller para gerenciamento de tráfego e terminação SSL.
- Implantar as aplicações frontend com alta disponibilidade e escalabilidade.
- Configurar roteamento baseado em domínio para `painel-admin` e `portal-publico`.

## 3. Arquitetura

### 3.1. Domínios
- **Painel Administrativo**: `https://painel-admin.jonataserpa.com.br`
- **Portal Público**: `https://portal.jonataserpa.com.br`

### 3.2. Componentes
1.  **Traefik (Ingress Controller)**:
    - Responsável por receber todo o tráfego externo (Portas 80 e 443).
    - Gerenciamento de certificados SSL (Let's Encrypt - *A configurar*).
    - Middlewares para redirecionamento HTTPS e segurança.
2.  **Frontend - Painel Admin**:
    - Aplicação Next.js.
    - Imagem: `registry.gitlab.com/jonataserpa/painel-admin:latest` (Exemplo).
    - Responsável pela gestão dos leilões e tenants.
3.  **Frontend - Portal Público**:
    - Aplicação Next.js.
    - Imagem: `registry.gitlab.com/jonataserpa/portal-publico:latest` (Exemplo).
    - Interface pública para visualização dos leilões.

## 4. Estrutura de Diretórios (Kubernetes Manifests)

```
k8s/
├── configmap/       # Configurações gerais
├── deployment/      # Deployments das aplicações (frontend, backend)
├── ingress/         # Regras de Ingress (IngressRoute)
├── service/         # Services (ClusterIP)
├── setup/           # Scripts e manifestos de inicialização
└── traefik/         # Manifestos do Traefik (CRDs, Deployment, RBAC)
```

## 5. Especificações Técnicas

### 5.1. Traefik
- **Versão**: v2.10+ ou v3.
- **Service**: LoadBalancer (ou NodePort com IP fixo).
- **CRDs**: IngressRoute, Middleware, TLSOption.

### 5.2. Deployments
- **Réplicas**: Mínimo de 1 (Recomendado 2 para HA).
- **Resources**: Definir requests e limits de CPU/Memory.
- **Probes**: Liveness e Readiness probes configurados.

### 5.3. Ingress
- Roteamento baseado em Host (`Host(domain)`).
- Redirecionamento automático de HTTP para HTTPS.

## 6. Plano de Implementação
1.  Criar estrutura de pastas.
2.  Configurar Traefik (CRDs, RBAC, Deployment).
3.  Criar Deployments e Services das aplicações frontend.
4.  Configurar IngressRoutes para os domínios.
5.  Validar acesso e roteamento.
