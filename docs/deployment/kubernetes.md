---
sidebar_position: 6
---

# Kubernetes Deployment

Deploy AI Notes on Kubernetes clusters.

## Prerequisites

- Kubernetes cluster (v1.20+)
- `kubectl` configured
- MongoDB (can be deployed separately or use managed service)

## Quick Start

### 1. Create Namespace

```bash
kubectl create namespace ai-notes
```

### 2. Create MongoDB Secret

```bash
kubectl create secret generic mongodb-secret \
  --from-literal=username=admin \
  --from-literal=password=your-secure-password \
  -n ai-notes
```

### 3. Create MongoDB Deployment

Save as `mongodb.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mongodb
  namespace: ai-notes
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mongodb
  template:
    metadata:
      labels:
        app: mongodb
    spec:
      containers:
      - name: mongodb
        image: mongo:7
        ports:
        - containerPort: 27017
        env:
        - name: MONGO_INITDB_ROOT_USERNAME
          valueFrom:
            secretKeyRef:
              name: mongodb-secret
              key: username
        - name: MONGO_INITDB_ROOT_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mongodb-secret
              key: password
        volumeMounts:
        - name: mongodb-data
          mountPath: /data/db
      volumes:
      - name: mongodb-data
        persistentVolumeClaim:
          claimName: mongodb-pvc
---
apiVersion: v1
kind: Service
metadata:
  name: mongodb
  namespace: ai-notes
spec:
  selector:
    app: mongodb
  ports:
  - port: 27017
    targetPort: 27017
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mongodb-pvc
  namespace: ai-notes
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
```

### 4. Create AI Notes Secret

```bash
kubectl create secret generic ai-notes-secret \
  --from-literal=mongodb-uri='mongodb://admin:your-secure-password@mongodb:27017/ai-notes-xyz?authSource=admin' \
  --from-literal=openrouter-api-key='' \
  --from-literal=groq-api-key='' \
  -n ai-notes
```

### 5. Create AI Notes Deployment

Save as `ai-notes.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ai-notes
  namespace: ai-notes
spec:
  replicas: 2
  selector:
    matchLabels:
      app: ai-notes
  template:
    metadata:
      labels:
        app: ai-notes
    spec:
      containers:
      - name: app
        image: your-registry/ai-notes-xyz:latest
        ports:
        - containerPort: 2000
        env:
        - name: MONGODB_URI
          valueFrom:
            secretKeyRef:
              name: ai-notes-secret
              key: mongodb-uri
        - name: PORT
          value: "2000"
        livenessProbe:
          httpGet:
            path: /health
            port: 2000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 2000
          initialDelaySeconds: 10
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: ai-notes
  namespace: ai-notes
spec:
  selector:
    app: ai-notes
  ports:
  - port: 80
    targetPort: 2000
  type: LoadBalancer
```

### 6. Deploy

```bash
kubectl apply -f mongodb.yaml
kubectl apply -f ai-notes.yaml
```

---

## Using Helm Chart

Create `values.yaml`:

```yaml
mongodb:
  enabled: true
  auth:
    username: admin
    password: your-secure-password

app:
  replicas: 2
  image:
    repository: your-registry/ai-notes-xyz
    tag: latest
  env:
    mongodbUri: "mongodb://admin:your-secure-password@mongodb:27017/ai-notes-xyz?authSource=admin"
```

---

## Ingress Configuration

Save as `ingress.yaml`:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ai-notes-ingress
  namespace: ai-notes
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  tls:
  - hosts:
    - ai-notes.yourdomain.com
    secretName: ai-notes-tls
  rules:
  - host: ai-notes.yourdomain.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: ai-notes
            port:
              number: 80
```

Apply:
```bash
kubectl apply -f ingress.yaml
```

---

## Scaling

Scale horizontally:
```bash
kubectl scale deployment ai-notes --replicas=3 -n ai-notes
```

---

## Monitoring

### Check Pod Status
```bash
kubectl get pods -n ai-notes
```

### View Logs
```bash
kubectl logs -f deployment/ai-notes -n ai-notes
```

### Describe Pod
```bash
kubectl describe pod <pod-name> -n ai-notes
```

### Resource Usage
```bash
kubectl top pods -n ai-notes
```

---

## Troubleshooting

**Pod not starting:**
- Check logs: `kubectl logs <pod-name> -n ai-notes`
- Describe pod: `kubectl describe pod <pod-name> -n ai-notes`
- Check events: `kubectl get events -n ai-notes`

**MongoDB connection issues:**
- Verify MongoDB service is running: `kubectl get svc -n ai-notes`
- Check connection string in secret
- Test MongoDB connection from pod

**Service not accessible:**
- Check service type (LoadBalancer vs ClusterIP)
- Verify ingress configuration
- Check firewall rules

---

## See Also

- [Docker Compose Deployment](/docs/deployment/docker-compose)
- [Production Best Practices](/docs/deployment/production)
- [Security Guide](/docs/deployment/security)

