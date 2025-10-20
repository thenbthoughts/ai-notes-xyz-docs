# Dockerfile for AI Notes XYZ Self-Hosted Deployment

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