# pulumi-workshop

## Install kubectl
```
brew install kubectl
```

## Clone this repository
```
git clone https://github.com/matanbaruch/pulumi-workshop.git
```

## Install package dependencies
```
npm install
```

## Configure Kubernetes Config
```
pulumi stack output kubeconfig > ~/.kube/config
```

## Verify
```
kubectl get nodes
```
