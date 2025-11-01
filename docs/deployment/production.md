---
sidebar_position: 10
---

# Production Best Practices

Essential guidelines for running AI Notes in production.

## Infrastructure

### Server Requirements

**Minimum:**
- CPU: 2 cores
- RAM: 4GB
- Storage: 20GB SSD
- Network: 100 Mbps

**Recommended:**
- CPU: 4+ cores
- RAM: 8GB+
- Storage: 50GB+ SSD
- Network: 1 Gbps

### MongoDB Production Setup

**Options:**
1. **MongoDB Atlas** (Recommended)
   - Managed service
   - Automatic backups
   - Scaling
   - Free tier available

2. **Self-hosted MongoDB**
   - Replica set for high availability
   - Regular backups
   - Monitoring

3. **Docker MongoDB**
   - Use persistent volumes
   - Enable authentication
   - Regular backups

## Deployment

### Docker Compose Production

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:7
    restart: always
    volumes:
      - mongodb_data:/data/db
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_USERNAME}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_PASSWORD}
    networks:
      - ai-notes-network
    healthcheck:
      test: echo 'db.runCommand("ping").ok' | mongosh localhost:27017/test --quiet
      interval: 10s
      timeout: 5s
      retries: 5

  app:
    image: ai-notes-xyz:latest
    restart: always
    ports:
      - "2000:2000"
    environment:
      - MONGODB_URI=mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@mongodb:27017/ai-notes-xyz?authSource=admin
      - NODE_ENV=production
      - PORT=2000
    depends_on:
      mongodb:
        condition: service_healthy
    networks:
      - ai-notes-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:2000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  nginx:
    image: nginx:alpine
    restart: always
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

volumes:
  mongodb_data:

networks:
  ai-notes-network:
    driver: bridge
```

### Reverse Proxy (Nginx)

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
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;

    location / {
        limit_req zone=api_limit burst=20;
        proxy_pass http://ai_notes;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # WebSocket support
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

## Monitoring

### Health Checks

**Application endpoint:**
```bash
curl http://localhost:2000/health
```

**MongoDB:**
```bash
mongosh "mongodb://..." --eval "db.adminCommand('ping')"
```

### Logging

**Docker Compose logging:**
```yaml
services:
  app:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

**Centralized logging:**
- Use ELK stack (Elasticsearch, Logstash, Kibana)
- Or cloud services: Datadog, Papertrail, etc.

### Metrics

Monitor:
- CPU usage
- Memory usage
- Disk space
- Network traffic
- Response times
- Error rates
- MongoDB performance

**Tools:**
- Prometheus + Grafana
- Docker stats
- MongoDB monitoring tools

## Scaling

### Horizontal Scaling

**Multiple app instances:**
```yaml
services:
  app:
    deploy:
      replicas: 3
```

**Load balancer:**
```yaml
services:
  nginx:
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
```

### Vertical Scaling

Increase resources:
- More CPU cores
- More RAM
- Faster storage (SSD)

## Security

### SSL/TLS

- Use Let's Encrypt for free SSL certificates
- Automate renewal with certbot
- Use strong ciphers

### Firewall

```bash
# Allow only necessary ports
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
sudo ufw enable
```

### Updates

**Automated updates:**
```bash
# Docker Compose
docker-compose pull
docker-compose up -d
```

**Update strategy:**
- Test updates in staging first
- Backup before updates
- Schedule maintenance windows
- Monitor after updates

## Backup Strategy

### Automated Backups

1. **Database:** Daily MongoDB backups
2. **Files:** Daily S3 sync
3. **Off-site:** Weekly backup copies

### Backup Testing

- Test restore monthly
- Verify backup integrity
- Document restore procedures

## Performance Optimization

### MongoDB

- Create indexes for frequently queried fields
- Use connection pooling
- Monitor slow queries

### Application

- Enable caching where possible
- Optimize database queries
- Use CDN for static assets

### Network

- Use CDN for file delivery
- Enable compression
- Optimize images

## Disaster Recovery

### Plan

1. **Backup strategy:** Automated daily backups
2. **Recovery time objective (RTO):** < 4 hours
3. **Recovery point objective (RPO):** < 24 hours
4. **Testing:** Monthly restore tests

### Procedures

1. Document all steps
2. Test regularly
3. Keep backups accessible
4. Maintain contact list

## Maintenance

### Regular Tasks

- **Daily:** Monitor logs and alerts
- **Weekly:** Review performance metrics
- **Monthly:** Test backups, review security
- **Quarterly:** Review and update documentation

### Updates

- **Application:** Update when new versions released
- **Dependencies:** Regular security updates
- **OS:** Monthly security patches
- **MongoDB:** Quarterly updates

## Checklist

Before going live:

- [ ] SSL/TLS configured
- [ ] MongoDB authentication enabled
- [ ] Backups automated
- [ ] Monitoring setup
- [ ] Logging configured
- [ ] Firewall configured
- [ ] Security headers set
- [ ] Rate limiting enabled
- [ ] Health checks configured
- [ ] Documentation updated

---

## See Also

- [Docker Compose Deployment](/docs/deployment/docker-compose)
- [Security Guide](/docs/deployment/security)
- [Backup & Restore](/docs/deployment/backup-restore)
- [Troubleshooting](/docs/deployment/troubleshooting)

