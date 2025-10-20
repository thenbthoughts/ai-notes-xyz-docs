# How to Build and Self-Host AI Notes Using Docker from Scratch

Follow these steps to set up AI Notes on your local machine or server using Docker.

## Prerequisites
1. Install MongoDB and ensure it is running locally.
2. Install [Docker](https://www.docker.com/).
3. Install [Docker Compose](https://docs.docker.com/compose/).
4. Set up an **S3-compatible storage** like [Cloudflare R2](https://www.cloudflare.com/products/r2/), [DigitalOcean Spaces](https://www.digitalocean.com/products/spaces/), or [Fly.io](https://fly.io/).
5. Obtain API keys for **OpenRouter** if for AI features.
6. Obtain API keys for **Groq** if for AI features.

---

## Steps to Self-Host Using Docker

## Step 1: Build a docker image

### Step 1.1 Create a file docker image
Filename: `Dockerfile`
```
# Stage 1: Clone
FROM alpine:latest as gitclone
RUN apk add --no-cache git
WORKDIR /app
RUN git clone https://github.com/thenbthoughts/ai-notes-xyz-client.git
RUN git clone https://github.com/thenbthoughts/ai-notes-xyz-api.git
RUN ls

# Stage 2: Build frontend
FROM node:18 AS buildfrontend
WORKDIR /app
COPY --from=gitclone /app/ai-notes-xyz-client/package*.json ./
RUN npm install
COPY --from=gitclone /app/ai-notes-xyz-client ./
RUN npm run build

# Stage 3: Build api
FROM node:18 AS buildapi
WORKDIR /app
COPY --from=gitclone /app/ai-notes-xyz-api/package*.json ./
RUN npm install
COPY --from=gitclone /app/ai-notes-xyz-api/src ./src
COPY --from=gitclone /app/ai-notes-xyz-api/tsconfig.json ./tsconfig.json
RUN npm run build

# Stage 4: Production
FROM node:18-alpine AS production
RUN apk add --no-cache bash
WORKDIR /app
COPY --from=buildapi /app/build ./build
COPY --from=buildapi /app/package*.json ./
COPY --from=buildfrontend /app/dist ./dist
RUN node -e "require('fs').writeFileSync('./dist/DEPLOY_DATE.txt', new Date().toISOString())"
RUN npm install --only=production
RUN ls -al
EXPOSE 2000
CMD ["npm", "start"]
```

### Step 1.2 Build the docker image
```bash
docker build -t ai-notes-xyz .
```

## Step 2: Run the docker compose

### Step 2.1 Create a docker compose file
Filename: `docker-compose.yml`
```
version: '3.8'

services:
  app:
    image: ai-notes-xyz:latest
    ports:
      - "53535:2000"
    environment:
      - MONGODB_URI=mongodb://host.docker.internal:27017/ai-notes-advance-temp
    container_name: ai-notes-app-username-aio
    extra_hosts:
      - "host.docker.internal:host-gateway"
```

### Step 2.2 Run the docker compose
```bash
docker-compose up -d
```

## Step 3: Access the Application
Open your browser and go to:
```bash
http://localhost:53535
```

## Step 4: Stop application
To stop and remove the containers, run:
```
docker-compose down
```