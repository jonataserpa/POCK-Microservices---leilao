# Guia de Instalação do Kubernetes com Kubeadm - Single Control Plane

Este guia tem como objetivo auxiliar na criação de um cluster Kubernetes utilizando o kubeadm em uma arquitetura Single Control Plane (sem alta disponibilidade). Serão abordados desde os requisitos até a configuração do ambiente e os passos para inicialização e configuração do cluster.

Esta abordagem é ideal para ambientes de desenvolvimento, aprendizado ou testes, onde a simplicidade é a prioridade. Porém, é importante entender as limitações desse modelo para tomar decisões informadas ao migrar para ambientes de produção.

Aqui, vamos utilizar o kubeadm. O kubeadm é uma ferramenta projetada para simplificar a configuração do Kubernetes. Ele fornece comandos padronizados para inicializar e configurar clusters, reduzindo significativamente o esforço necessário para colocar um cluster em funcionamento. Este guia detalha cada etapa, desde a preparação do ambiente até a execução de uma aplicação no cluster, fornecendo também explicações sobre os conceitos fundamentais para garantir um aprendizado sólido.

## Requisitos

Para criar o cluster Kubernetes, você deve ter os requisitos de hardware e de rede.

### Requisitos de Hardware
*   3 Máquinas Linux (aqui no caso vou utilizar Ubuntu 24.04 LTS)
*   2 GB de memória RAM
*   2 CPUs
*   Conexão de rede entre as máquinas
*   Hostname, endereço MAC e product_uuid únicos pra cada nó.
*   Swap desabilitado
*   Acesso SSH a todas as máquinas

### Requisitos de rede

#### Control Plane
O control plane tem como requisito a liberação das seguintes portas:

| Protocol | Direction | Port Range | Purpose | Used By |
| :--- | :--- | :--- | :--- | :--- |
| TCP | Inbound | 6443 | Kubernetes API server | All |
| TCP | Inbound | 2379-2380 | etcd server client API | kube-apiserver, etcd |
| TCP | Inbound | 10250 | Kubelet API | Self, Control plane |
| TCP | Inbound | 10259 | kube-scheduler | Self |
| TCP | Inbound | 10257 | kube-controller-manager | Self |

#### Worker Nodes
Os worker nodes tem como requisito a liberação das seguintes portas:

| Protocol | Direction | Port Range | Purpose | Used By |
| :--- | :--- | :--- | :--- | :--- |
| TCP | Inbound | 10250 | Kubelet API | Self, Control plane |
| TCP | Inbound | 10256 | kube-proxy | Self, Load balancers |
| TCP | Inbound | 30000-32767 | NodePort Services† | All |

## Passos da Instalação

Para a instalação e criação do cluster Kubernetes, vamos executar as seguintes etapas:

1.  Instalação do Container Runtime (ContainerD)
2.  Instalação do kubeadm, kubelet e kubectl
3.  Inicialização do cluster Kubernetes
4.  Instalação do CNI Calico
5.  Incluir os worker nodes no cluster Kubernetes

### Instalação Automática (Script)

Para facilitar a instalação na VPS (Ubuntu 24.04), criamos um script `setup_vps.sh` que automatiza todo o processo de preparação e inicialização do Control Plane.

Execute o script na máquina:

```bash
chmod +x setup_vps.sh
sudo ./setup_vps.sh
```

### Instalação Manual

#### Instalação do Container Runtime
O Container Runtime é a base para executar contêineres no Kubernetes. O ContainerD é uma escolha popular devido à sua simplicidade, desempenho e suporte oficial do Kubernetes.

**OBS: Essa etapa deve ser executada em todas as máquinas que vão fazer parte do cluster Kubernetes.**

#### Instalação dos módulos de Kernel do Linux
Para seguir com a instalação, primeiro é preciso habilitar 2 módulos no kernel do Linux:

*   **overlay** ⇒ Usado pra unir camadas de file system.
*   **br_netfilter** ⇒ Modulo de rede usado pra garantir a comunicação dos containers e do Kubernetes.

Comandos para habilitar:

```bash
cat <<EOF | sudo tee /etc/modules-load.d/containerd.conf
overlay
br_netfilter
EOF

sudo modprobe overlay
sudo modprobe br_netfilter
```

Ajustes de definições do Kernel:

```bash
# Configuração dos parâmetros do sysctl, fica mantido mesmo com reebot da máquina.
cat <<EOF | sudo tee /etc/sysctl.d/99-kubernetes-cri.conf
net.bridge.bridge-nf-call-iptables  = 1
net.ipv4.ip_forward                 = 1
net.bridge.bridge-nf-call-ip6tables = 1
EOF

# Aplica as definições do sysctl sem reiniciar a máquina
sudo sysctl --system
```

*   `net.bridge.bridge-nf-call-iptables = 1` ⇒ Ativo as redes bridges pra passarem pelo iptables e assim as regras de firewall vão passar por essas redes também.
*   `net.ipv4.ip_forward = 1` ⇒ Habilita o encaminhamento de pacotes IPv4 no sistema. Isso é essencial para que o host funcione como um roteador, encaminhando pacotes de rede de uma interface para outra.
*   `net.bridge.bridge-nf-call-ip6tables = 1` ⇒ Similar ao bridge-nf-call-iptables, mas para tráfego IPv6.

#### Instalação do ContainerD
OBS: A partir da versão 1.26 do Kubernetes, foi removido o suporte ao CRI v1alpha2 e ao Containerd 1.5. Vamos usar o repositório do Docker para instalar uma versão recente.

```bash
# Instalação de pré requisitos
sudo apt-get update -y
sudo apt-get install ca-certificates curl gnupg --yes
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Configurando o repositório
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

sudo apt update -y && sudo apt install containerd.io -y
```

Configuração padrão do Containerd:

```bash
sudo mkdir -p /etc/containerd && containerd config default | sudo tee /etc/containerd/config.toml
```

Alterar o arquivo de configuração pra configurar o systemd cgroup driver. Sem isso o Containerd não gerencia corretamente os recursos computacionais e vai reiniciar em loop.

```bash
sudo sed -i 's/SystemdCgroup = false/SystemdCgroup = true/g' /etc/containerd/config.toml

# Alterar a imagem do sandbox
sudo sed -i 's|sandbox_image = ".*"|sandbox_image = "registry.k8s.io/pause:3.10"|' /etc/containerd/config.toml
```

Agora é preciso reiniciar o containerd:

```bash
sudo systemctl restart containerd
```

#### Instalação do kubeadm, kubelet and kubectl
Com o containerd instalado, agora é preciso instalar o kubeadm, kubelet e o kubectl.

```bash
# Instalação dos pacotes necessários
sudo apt-get update && \
sudo apt-get install -y apt-transport-https ca-certificates curl

# Download da chave pública do Repositório do Kubernetes
# Nota: Ajustado para v1.31 conforme solicitado, mas verifique a versão desejada.
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.31/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg

# Adicionando o repositório apt do Kubernetes
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.31/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list

# Atualização do repositório apt e instalação das ferramentas
sudo apt-get update && \
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl
```

#### Iniciando o Cluster Kubernetes
Inicializo o cluster Kubernetes.

**OBS: Esse comando precisa ser executado apenas no control plane**

```bash
# Inicialização do cluster Kubernetes
# Substitua o IP abaixo pelo IP da sua VPS (38.242.232.109)
sudo kubeadm init \
    --apiserver-advertise-address=38.242.232.109 \
    --pod-network-cidr=192.168.0.0/16
```

#### Configuração do kubectl
Com o Kubernetes iniciado, agora é preciso configurar o kubectl para se comunicar com o Api Server:

```bash
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

#### Joins dos Worker Nodes
Para adicionar worker nodes futuramente:

```bash
kubeadm token create --print-join-command
```

#### Instalação do CNI
Agora, é preciso adicionar o Calico para gerenciar a rede dos pods e dos containers:

```bash
kubectl create -f https://raw.githubusercontent.com/projectcalico/calico/v3.29.0/manifests/tigera-operator.yaml
kubectl create -f https://raw.githubusercontent.com/projectcalico/calico/v3.29.0/manifests/custom-resources.yaml
```

## Verificando a Instalação

Após a execução do script, verifique se o cluster está saudável com os seguintes comandos:

1.  **Verificar os Nós**:
    ```bash
    kubectl get nodes
    ```
    *O status deve estar como `Ready` após alguns minutos.*

2.  **Verificar os Pods do Sistema e Aplicação**:
    ```bash
    kubectl get pods -A
    ```
    *Verifique se os pods `frontend`, `backend`, `postgres` e `traefik` estão com status `Running`.*

3.  **Verificar Ingress**:
    ```bash
    kubectl get ingress
    ```
    *Deve listar o `app-ingress` com o endereço IP da VPS.*

## Acessando a Aplicação

A aplicação deve estar acessível diretamente pelo IP da sua VPS:

*   **Frontend**: `http://38.242.232.109`
*   **Backend API**: `http://38.242.232.109/api`

## Acessando o Traefik Dashboard

O painel do Traefik roda na porta 8080, mas por segurança não é exposto publicamente por padrão. Para acessar via navegador:

1.  **Na sua máquina local** (onde você tem o `kubectl` configurado com o arquivo da VPS), rode:
    ```bash
    kubectl port-forward -n traefik $(kubectl get pods -n traefik -l app=traefik -o jsonpath='{.items[0].metadata.name}') 8080:8080
    ```

2.  Acesse no navegador:
    *   **Dashboard**: [http://localhost:8080/dashboard/](http://localhost:8080/dashboard/) (Atenção para a barra no final)
    *   **API**: [http://localhost:8080/api](http://localhost:8080/api)

## Acessando o Banco de Dados (PostgreSQL)

O banco de dados não é exposto publicamente por segurança. Para acessar via DBeaver ou PgAdmin da sua máquina local:

1.  **Crie um túnel seguro**:
    ```bash
    kubectl port-forward svc/postgres 5432:5432
    ```

2.  **Configure o DBeaver**:
    *   **Host**: `localhost`
    *   **Port**: `5432`
    *   **Database**: `payment_api`
    *   **Username**: `postgres`
    *   **Password**: `password`

## Rodando a aplicação
Teste o cluster Kubernetes usando o manifesto abaixo:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
spec:
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        resources:
          limits:
            memory: "128Mi"
            cpu: "500m"
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: nginx
spec:
  selector:
    app: nginx
  ports:
  - port: 80
    targetPort: 80
  type: LoadBalancer
```


## 🐙 Instalação do ArgoCD (Material Complementar)

Abaixo estão os comandos e referências para a instalação do ArgoCD no seu cluster Kubernetes.

### 📄 Documentação Oficial
- [Manual de Instalação](https://argo-cd.readthedocs.io/en/stable/operator-manual/installation/)
- [Instalação sem Alta Disponibilidade (Non-HA)](https://argo-cd.readthedocs.io/en/stable/operator-manual/installation/#non-high-availability)
- [Instalação com Alta Disponibilidade (HA)](https://argo-cd.readthedocs.io/en/stable/operator-manual/installation/#high-availability)

### 🛠️ Comandos de Instalação (Manifestos)

#### Instalação Padrão (Non-HA)
Recomendado para testes e demonstrações.

```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

#### Instalação com Alta Disponibilidade (HA)
Recomendado para produção.

```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/ha/install.yaml
```

### 📦 Instalação via Helm

Para instalação via Helm, consulte os seguintes recursos:

- **Documentação**: [ArgoCD Helm Installation](https://argo-cd.readthedocs.io/en/stable/operator-manual/installation/#helm)
- **Artifact Hub**: [argo-cd Helm Chart](https://artifacthub.io/packages/helm/argo/argo-cd#installing-the-chart)
- **GitHub**: [argo-helm Repository](https://github.com/argoproj/argo-helm/tree/main/charts/argo-cd#installing-the-chart)