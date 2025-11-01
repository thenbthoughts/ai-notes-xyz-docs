---
sidebar_position: 3
---

# Docker Compose Deployment

Complete Docker Compose setup with MongoDB and all optional services.

## Quick Start

### Minimal Setup (MongoDB Only)

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:7
    container_name: ai-notes-mongodb
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: your-secure-password
    restart: unless-stopped

  app:
    image: ai-notes-xyz:latest
    ports:
      - "2000:2000"
    environment:
      - MONGODB_URI=mongodb://admin:your-secure-password@mongodb:27017/ai-notes-xyz?authSource=admin
    depends_on:
      - mongodb
    restart: unless-stopped

volumes:
  mongodb_data:
```

Run with:
```bash
docker-compose up -d
```

Access at: `http://localhost:2000`

---

## Complete Setup (All Services)

### Full docker-compose.yml

```yaml
version: '3.8'

services:
  # MongoDB - Required
  mongodb:
    image: mongo:7
    container_name: ai-notes-mongodb
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_PASSWORD:-change-me}
    restart: unless-stopped
    healthcheck:
      test: echo 'db.runCommand("ping").ok' | mongosh localhost:27017/test --quiet
      interval: 10s
      timeout: 5s
      retries: 5

  # Ollama - Optional (Local AI)
  ollama:
    image: ollama/ollama:latest
    container_name: ai-notes-ollama
    ports:
      - "11434:11434"
    volumes:
      - ollama_data:/root/.ollama
    restart: unless-stopped

  # Qdrant - Optional (Vector Database)
  qdrant:
    image: qdrant/qdrant:latest
    container_name: ai-notes-qdrant
    ports:
      - "6333:6333"
    volumes:
      - qdrant_data:/qdrant/storage
    restart: unless-stopped

  # AI Notes Application
  app:
    image: ai-notes-xyz:latest
    container_name: ai-notes-app
    ports:
      - "2000:2000"
    environment:
      # Required
      - MONGODB_URI=mongodb://admin:${MONGO_PASSWORD:-change-me}@mongodb:27017/ai-notes-xyz?authSource=admin
      
      # Optional - S3 Storage
      - S3_ENDPOINT=${S3_ENDPOINT:-}
      - S3_ACCESS_KEY_ID=${S3_ACCESS_KEY_ID:-}
      - S3_SECRET_ACCESS_KEY=${S3_SECRET_ACCESS_KEY:-}
      - S3_BUCKET_NAME=${S3_BUCKET_NAME:-}
      - S3_REGION=${S3_REGION:-auto}
      
      # Optional - AI Providers
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY:-}
      - GROQ_API_KEY=${GROQ_API_KEY:-}
      
      # Optional - Local AI
      - OLLAMA_BASE_URL=http://ollama:11434
      
      # Optional - Vector Database
      - QDRANT_URL=http://qdrant:6333
      
      # Optional - Email
      - SMTP_HOST=${SMTP_HOST:-}
      - SMTP_PORT=${SMTP_PORT:-587}
      - SMTP_SECURE=${SMTP_SECURE:-true}
      - SMTP_USER=${SMTP_USER:-}
      - SMTP_PASS=${SMTP_PASS:-}
      
      # Application
      - PORT=2000
      - NODE_ENV=production
    depends_on:
      mongodb:
        condition: service_healthy
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:2000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

volumes:
  mongodb_data:
  ollama_data:
  qdrant_data:
```

### .env File

Create a `.env` file in the same directory:

```bash
# MongoDB
MONGO_PASSWORD=your-secure-password

# S3 Storage (Optional)
S3_ENDPOINT=https://account-id.r2.cloudflarestorage.com
S3_ACCESS_KEY_ID=your-access-key-id
S3_SECRET_ACCESS_KEY=your-secret-access-key
S3_BUCKET_NAME=ai-notes-files
S3_REGION=auto

# AI Providers (Optional)
OPENROUTER_API_KEY=sk-or-v1-...
GROQ_API_KEY=gsk_...

# SMTP (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=true
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

---

## Production Setup

### With Reverse Proxy (Nginx)

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:7
    volumes:
      - mongodb_data:/data/db
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_PASSWORD}
    networks:
      - ai-notes-network
    restart: unless-stopped

  app:
    image: ai-notes-xyz:latest
    environment:
      - MONGODB_URI=mongodb://admin:${MONGO_PASSWORD}@mongodb:27017/ai-notes-xyz?authSource=admin
      - S3_ENDPOINT=${S3_ENDPOINT}
      - S3_ACCESS_KEY_ID=${S3_ACCESS_KEY_ID}
      - S3_SECRET_ACCESS_KEY=${S3_SECRET_ACCESS_KEY}
      - S3_BUCKET_NAME=${S3_BUCKET_NAME}
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
      - GROQ_API_KEY=${GROQ_API_KEY}
    depends_on:
      - mongodb
    networks:
      - ai-notes-network
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    networks:
      - ai-notes-network
    restart: unless-stopped

volumes:
  mongodb_data:

networks:
  ai-notes-network:
    driver: bridge
```

### Nginx Configuration

Create `nginx.conf`:

```nginx
upstream ai_notes {
    server app:2000;
}

server {
    listen 80;
    server_name ai-notes.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name ai-notes.yourdomain.com;

    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;

    location / {
        proxy_pass http://ai_notes;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

---

## Commands

### Start Services
```bash
docker-compose up -d
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f app
```

### Stop Services
```bash
docker-compose stop
```

### Stop and Remove
```bash
docker-compose down
```

### Stop and Remove Volumes (⚠️ Deletes Data)
```bash
docker-compose down -v
```

### Restart Service
```bash
docker-compose restart app
```

### Update Application
```bash
docker-compose pull
docker-compose up -d
```

---

## Health Checks

Check service status:
```bash
docker-compose ps
```

Test MongoDB connection:
```bash
docker-compose exec mongodb mongosh -u admin -p
```

Test application:
```bash
curl http://localhost:2000/health
```

---

## Troubleshooting

**Port already in use:**
- Change port mapping: `"3000:2000"` instead of `"2000:2000"`

**MongoDB connection failed:**
- Check MongoDB is running: `docker-compose ps`
- Verify password in `.env` matches MongoDB setup
- Check connection string format

**Application won't start:**
- Check logs: `docker-compose logs app`
- Verify all environment variables are set
- Check MongoDB is healthy: `docker-compose ps`

See [Troubleshooting Guide](/docs/deployment/troubleshooting) for more help.

---

## See Also

- [MongoDB Setup](/docs/deployment/mongodb-setup)
- [Environment Variables](/docs/deployment/environment-variables)
- [Production Best Practices](/docs/deployment/production)
- [Security Guide](/docs/deployment/security)

