---
sidebar_position: 5
---

# Selfhost by Coolify

## Note:
1. The following instructions describe how to set up self-hosted ai-notes.xyz using Coolify.
2. (Optional) For improved search performance, consider adding Ollama and Qdrant.

For detailed information about environment variables, see [Environment Variables](/docs/deployment/environment-variables).

## Step 1: Docker file
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

## Step 2: Env file

Note: Only one environment variable is required: MONGODB_URI

```
MONGODB_URI=mongodb://USERNAME:PASSWORD@HOST:27017/ai-notes-xyz-YOURUSERNAME?authSource=admin&directConnection=true
```

For other optional environment variables, see [Environment Variables](/docs/deployment/environment-variables).

