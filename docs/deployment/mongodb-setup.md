---
sidebar_position: 1
---

# MongoDB Setup

MongoDB is **required** for AI Notes. Your data is stored here.

## Quick Setup Options

### Option 1: Docker Compose (Recommended for Development)

Add MongoDB to your `docker-compose.yml`:

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
      - "53535:2000"
    environment:
      - MONGODB_URI=mongodb://admin:your-secure-password@mongodb:27017/ai-notes-xyz?authSource=admin
    depends_on:
      - mongodb
    container_name: ai-notes-app

volumes:
  mongodb_data:
```

### Option 2: Local MongoDB Installation

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community@7
brew services start mongodb-community@7
```

**Linux (Ubuntu/Debian):**
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

**Windows:**
Download and install from [MongoDB Download Center](https://www.mongodb.com/try/download/community)

### Option 3: Cloud MongoDB (Atlas)

1. Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Get connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/ai-notes-xyz?retryWrites=true&w=majority
   ```

## Connection String Format

### Local MongoDB (No Auth)
```
mongodb://localhost:27017/ai-notes-xyz
```

### Local MongoDB (With Auth)
```
mongodb://username:password@localhost:27017/ai-notes-xyz?authSource=admin
```

### Docker Internal
```
mongodb://admin:password@mongodb:27017/ai-notes-xyz?authSource=admin
```

### MongoDB Atlas (Cloud)
```
mongodb+srv://username:password@cluster.mongodb.net/ai-notes-xyz?retryWrites=true&w=majority
```

## Security Best Practices

- ✅ Use strong passwords
- ✅ Enable authentication (even for local)
- ✅ Use MongoDB Atlas for production (free tier available)
- ✅ Regular backups (see [Backup & Restore](/docs/deployment/backup-restore))
- ✅ Use connection string encryption (SSL/TLS)

## Troubleshooting

**Connection refused:**
- Check MongoDB is running: `mongosh` or `mongo`
- Verify port 27017 is open
- Check firewall settings

**Authentication failed:**
- Verify username/password
- Check `authSource` parameter
- Ensure user has proper permissions

**Docker network issues:**
- Use service name instead of `localhost` in connection string
- Check `depends_on` in docker-compose
- Verify Docker network is created

