---
sidebar_position: 2
---

# Environment Variables

Complete list of all environment variables for AI Notes.

## Required Variables

### `MONGODB_URI`

**Required:** Yes  
**Description:** MongoDB connection string  
**Example:**
```bash
MONGODB_URI=mongodb://username:password@localhost:27017/ai-notes-xyz?authSource=admin
```

**See:** [MongoDB Setup Guide](/docs/deployment/mongodb-setup) for detailed setup instructions.

---

## Optional Variables

### S3-Compatible Storage

For file uploads (images, documents, voice notes).

#### `S3_ENDPOINT`

**Required:** No (if using S3)  
**Description:** S3-compatible storage endpoint  
**Examples:**
```bash
# Cloudflare R2
S3_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com

# DigitalOcean Spaces
S3_ENDPOINT=https://nyc3.digitaloceanspaces.com

# AWS S3
S3_ENDPOINT=https://s3.amazonaws.com

# MinIO (Self-hosted)
S3_ENDPOINT=http://localhost:9000
```

#### `S3_ACCESS_KEY_ID`

**Required:** No (if using S3)  
**Description:** S3 access key ID  
**Example:**
```bash
S3_ACCESS_KEY_ID=your-access-key-id
```

#### `S3_SECRET_ACCESS_KEY`

**Required:** No (if using S3)  
**Description:** S3 secret access key  
**Example:**
```bash
S3_SECRET_ACCESS_KEY=your-secret-access-key
```

#### `S3_BUCKET_NAME`

**Required:** No (if using S3)  
**Description:** S3 bucket name  
**Example:**
```bash
S3_BUCKET_NAME=ai-notes-files
```

#### `S3_REGION`

**Required:** No (if using S3)  
**Description:** S3 region  
**Example:**
```bash
S3_REGION=us-east-1
```

**Recommended Providers:**
- [Cloudflare R2](https://www.cloudflare.com/products/r2/) - Free tier: 10GB storage, 1M operations/month
- [DigitalOcean Spaces](https://www.digitalocean.com/products/spaces) - $5/month for 250GB
- [AWS S3](https://aws.amazon.com/s3/) - Pay as you go
- [MinIO](https://min.io/) - Self-hosted S3-compatible storage

---

### AI Providers

For AI chat and features. At least one provider is recommended.

#### OpenRouter

**Required:** No  
**Description:** OpenRouter API key for accessing multiple AI models  

```bash
OPENROUTER_API_KEY=sk-or-v1-...
```

**Setup:**
1. Sign up at [OpenRouter.ai](https://openrouter.ai/)
2. Create API key
3. Add to environment variables

**Supported Models:** GPT-4, Claude, Llama, Mistral, and 100+ others

#### Groq

**Required:** No  
**Description:** Groq API key for fast inference  

```bash
GROQ_API_KEY=gsk_...
```

**Setup:**
1. Sign up at [Groq.com](https://groq.com/)
2. Get API key from dashboard
3. Add to environment variables

**Supported Models:** Llama 3, Mixtral, Gemma

**Note:** Users can also configure API keys directly in the Settings page after deployment.

---

### Ollama (Local AI)

**Required:** No  
**Description:** For running AI models locally without external API calls  

#### `OLLAMA_BASE_URL`

**Required:** No  
**Description:** Ollama server URL  
**Example:**
```bash
OLLAMA_BASE_URL=http://localhost:11434
```

**Setup:**
1. Install Ollama: `curl -fsSL https://ollama.ai/install.sh | sh`
2. Run model: `ollama run llama3`
3. Set environment variable to Ollama URL

**Benefits:**
- ✅ No API costs
- ✅ Complete privacy
- ✅ Works offline
- ✅ No rate limits

**Docker Compose Example:**
```yaml
services:
  ollama:
    image: ollama/ollama:latest
    ports:
      - "11434:11434"
    volumes:
      - ollama_data:/root/.ollama
```

---

### Qdrant (Vector Database)

**Required:** No  
**Description:** For advanced semantic search and vector embeddings  

#### `QDRANT_URL`

**Required:** No  
**Description:** Qdrant server URL  
**Example:**
```bash
QDRANT_URL=http://localhost:6333
```

**Setup:**
1. Run Qdrant: `docker run -p 6333:6333 qdrant/qdrant`
2. Set environment variable

**Benefits:**
- ✅ Improved search performance
- ✅ Better AI context retrieval
- ✅ Semantic search capabilities

**Docker Compose Example:**
```yaml
services:
  qdrant:
    image: qdrant/qdrant:latest
    ports:
      - "6333:6333"
    volumes:
      - qdrant_data:/qdrant/storage
```

---

### SMTP (Email)

**Required:** No  
**Description:** For email notifications and reminders  

#### `SMTP_HOST`

**Required:** No  
**Description:** SMTP server hostname  
**Example:**
```bash
SMTP_HOST=smtp.gmail.com
```

#### `SMTP_PORT`

**Required:** No  
**Description:** SMTP server port  
**Example:**
```bash
SMTP_PORT=587
```

#### `SMTP_SECURE`

**Required:** No  
**Description:** Use TLS/SSL  
**Example:**
```bash
SMTP_SECURE=true
```

#### `SMTP_USER`

**Required:** No  
**Description:** SMTP username (usually email)  
**Example:**
```bash
SMTP_USER=your-email@gmail.com
```

#### `SMTP_PASS`

**Required:** No  
**Description:** SMTP password or app password  
**Example:**
```bash
SMTP_PASS=your-app-password
```

**Popular Providers:**
- **Gmail:** Use App Password (not regular password)
- **SendGrid:** Free tier available
- **Mailgun:** Free tier available
- **AWS SES:** Pay as you go

---

### Other Optional Variables

#### `PORT`

**Required:** No  
**Default:** `2000`  
**Description:** Application port  
**Example:**
```bash
PORT=3000
```

#### `NODE_ENV`

**Required:** No  
**Default:** `production`  
**Description:** Node environment  
**Example:**
```bash
NODE_ENV=production
```

---

## Complete Example

```bash
# Required
MONGODB_URI=mongodb://admin:password@mongodb:27017/ai-notes-xyz?authSource=admin

# Optional - S3 Storage
S3_ENDPOINT=https://account-id.r2.cloudflarestorage.com
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key
S3_BUCKET_NAME=ai-notes-files
S3_REGION=auto

# Optional - AI Providers
OPENROUTER_API_KEY=sk-or-v1-...
GROQ_API_KEY=gsk_...

# Optional - Local AI
OLLAMA_BASE_URL=http://ollama:11434

# Optional - Vector Database
QDRANT_URL=http://qdrant:6333

# Optional - Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=true
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Optional - Application
PORT=2000
NODE_ENV=production
```

---

## Docker Compose Example

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:7
    volumes:
      - mongodb_data:/data/db
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: secure-password

  app:
    image: ai-notes-xyz:latest
    ports:
      - "2000:2000"
    environment:
      # Required
      - MONGODB_URI=mongodb://admin:secure-password@mongodb:27017/ai-notes-xyz?authSource=admin
      
      # Optional - S3
      - S3_ENDPOINT=https://account-id.r2.cloudflarestorage.com
      - S3_ACCESS_KEY_ID=${S3_ACCESS_KEY_ID}
      - S3_SECRET_ACCESS_KEY=${S3_SECRET_ACCESS_KEY}
      - S3_BUCKET_NAME=ai-notes-files
      
      # Optional - AI
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
      - GROQ_API_KEY=${GROQ_API_KEY}
      
      # Optional - Email
      - SMTP_HOST=${SMTP_HOST}
      - SMTP_PORT=${SMTP_PORT}
      - SMTP_USER=${SMTP_USER}
      - SMTP_PASS=${SMTP_PASS}
    depends_on:
      - mongodb
    restart: unless-stopped

volumes:
  mongodb_data:
```

**Note:** Use `.env` file for sensitive values and reference them with `${VARIABLE_NAME}` syntax.

