---
sidebar_position: 9
---

# Troubleshooting

Common issues and solutions for self-hosting AI Notes.

## Connection Issues

### MongoDB Connection Failed

**Error:** `MongoNetworkError: connect ECONNREFUSED`

**Solutions:**
1. Check MongoDB is running:
   ```bash
   docker ps | grep mongo
   # or
   systemctl status mongod
   ```

2. Verify connection string:
   ```bash
   # Test connection
   mongosh "mongodb://username:password@localhost:27017/ai-notes-xyz?authSource=admin"
   ```

3. Check Docker network:
   ```bash
   # If using Docker, use service name instead of localhost
   MONGODB_URI=mongodb://admin:password@mongodb:27017/ai-notes-xyz?authSource=admin
   ```

4. Check firewall:
   ```bash
   # Linux
   sudo ufw allow 27017
   
   # macOS
   # Check System Preferences > Security & Privacy > Firewall
   ```

### Application Won't Start

**Error:** `Cannot find module` or `EADDRINUSE`

**Solutions:**
1. Check port is available:
   ```bash
   # Linux/macOS
   lsof -i :2000
   # or
   netstat -tulpn | grep 2000
   ```

2. Change port in environment:
   ```bash
   PORT=3000
   ```

3. Check Docker logs:
   ```bash
   docker logs ai-notes-app
   ```

## Performance Issues

### Slow AI Responses

**Solutions:**
1. Check API provider status
2. Use faster models (Groq, Ollama)
3. Enable Qdrant for better search
4. Check network latency

### High Memory Usage

**Solutions:**
1. Increase container memory limits:
   ```yaml
   services:
     app:
       deploy:
         resources:
           limits:
             memory: 2G
   ```

2. Monitor with:
   ```bash
   docker stats ai-notes-app
   ```

## File Upload Issues

### S3 Upload Fails

**Error:** `Access Denied` or `Invalid Credentials`

**Solutions:**
1. Verify S3 credentials:
   ```bash
   aws s3 ls s3://your-bucket-name
   ```

2. Check bucket permissions
3. Verify endpoint URL
4. Check region setting

### Files Not Appearing

**Solutions:**
1. Check S3 bucket name
2. Verify CORS configuration
3. Check application logs for errors

## AI Features Not Working

### Chat Returns Errors

**Solutions:**
1. Verify API keys are set:
   ```bash
   echo $OPENROUTER_API_KEY
   echo $GROQ_API_KEY
   ```

2. Check API key validity
3. Check API provider status
4. Review API usage limits

### Ollama Not Responding

**Solutions:**
1. Check Ollama is running:
   ```bash
   curl http://localhost:11434/api/tags
   ```

2. Verify model is downloaded:
   ```bash
   ollama list
   ```

3. Check environment variable:
   ```bash
   echo $OLLAMA_BASE_URL
   ```

## Docker Issues

### Container Won't Start

**Solutions:**
1. Check Docker logs:
   ```bash
   docker logs ai-notes-app
   ```

2. Verify image exists:
   ```bash
   docker images | grep ai-notes
   ```

3. Rebuild image:
   ```bash
   docker-compose build --no-cache
   ```

### Volume Permission Issues

**Solutions:**
1. Fix MongoDB volume permissions:
   ```bash
   sudo chown -R 999:999 /path/to/mongodb/data
   ```

2. Use named volumes instead of bind mounts

## Database Issues

### MongoDB Authentication Failed

**Solutions:**
1. Reset MongoDB password:
   ```bash
   docker exec -it mongodb mongosh -u admin -p
   use admin
   db.changeUserPassword("admin", "new-password")
   ```

2. Check authSource parameter
3. Verify user exists and has permissions

### Database Corruption

**Solutions:**
1. Restore from backup (see Backup & Restore guide)
2. Run MongoDB repair:
   ```bash
   docker exec mongodb mongod --repair
   ```

## Getting Help

### Check Logs

**Application logs:**
```bash
docker logs ai-notes-app
docker logs ai-notes-app --follow
```

**MongoDB logs:**
```bash
docker logs mongodb
```

### Debug Mode

Enable debug logging:
```bash
NODE_ENV=development
DEBUG=*
```

### Community Support

- GitHub Issues: [Link to repo]
- Documentation: [Link to docs]
- Discord: [Link if available]

## Common Commands

```bash
# View running containers
docker ps

# View logs
docker-compose logs -f

# Restart service
docker-compose restart app

# Rebuild and restart
docker-compose up -d --build

# Remove and recreate
docker-compose down
docker-compose up -d

# Check MongoDB connection
mongosh "mongodb://username:password@localhost:27017/ai-notes-xyz"

# Test API endpoint
curl http://localhost:2000/health

# View environment variables
docker exec ai-notes-app env
```

---

## See Also

- [MongoDB Setup](/docs/deployment/mongodb-setup)
- [Environment Variables](/docs/deployment/environment-variables)
- [Backup & Restore](/docs/deployment/backup-restore)
- [Security Guide](/docs/deployment/security)

