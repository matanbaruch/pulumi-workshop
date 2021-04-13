## pulumi-workshop

## NOTE: MAKE SURE YOU ARE LOGGED IN OneLogin

### Install kubectl
```
brew install kubectl
```
### Clone this repository
```
git clone https://github.com/matanbaruch/pulumi-workshop.git
```

### Install package dependencies
```
npm install
```

### Use Stack
```
pulumi stack select ironsource-aura/dev
```

### Configure Kubernetes Config - This will overwrite any existing KubeConfig you have
```
pulumi stack output kubeconfig > ~/.kube/config
```

### Verify
```
kubectl get nodes
```
