---
sidebar_position: 1
---

# MongoDB Setup

:::warning ⚠️ Important: Regular Backups Required
**Take backups of your MongoDB data every week** to prevent data loss. See [Backup & Restore](/docs/deployment/backup-restore) guide for instructions.
:::

MongoDB is **required** for AI Notes. Your data is stored here.

## Setup Options

### Option 1: Local MongoDB Installation

Install MongoDB directly on your system.

#### macOS

```bash
brew tap mongodb/brew
brew install mongodb-community@7
brew services start mongodb-community@7
```

#### Linux (Ubuntu/Debian)

```bash
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

#### Windows

Download and install from [MongoDB Download Center](https://www.mongodb.com/try/download/community)

**Connection String (Local):**
```
mongodb://localhost:27017/ai-notes-xyz
```

**With Authentication:**
```
mongodb://username:password@localhost:27017/ai-notes-xyz?authSource=admin
```

---

### Option 2: Cloud MongoDB (MongoDB Atlas) - Recommended

Use MongoDB Atlas for a managed, cloud-based solution with automatic backups.

1. Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster (512MB storage available on free tier)
3. Create a database user with strong password
4. Whitelist your IP address or use `0.0.0.0/0` for development (not recommended for production)
5. Get connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/ai-notes-xyz?retryWrites=true&w=majority
   ```

**Benefits of MongoDB Atlas:**
- ✅ Automatic backups included
- ✅ High availability
- ✅ Automatic scaling
- ✅ Security features built-in
- ✅ Free tier available (512MB)

---

## Connection String Format

### Local MongoDB (No Authentication)
```
mongodb://localhost:27017/ai-notes-xyz
```

### Local MongoDB (With Authentication)
```
mongodb://username:password@localhost:27017/ai-notes-xyz?authSource=admin
```

### MongoDB Atlas (Cloud)
```
mongodb+srv://username:password@cluster.mongodb.net/ai-notes-xyz?retryWrites=true&w=majority
```

---

## Security Best Practices

- ✅ **Use strong passwords** (16+ characters, mix of letters, numbers, symbols)
- ✅ **Enable authentication** even for local installations
- ✅ **Use MongoDB Atlas for production** (includes automatic backups and security features)
- ✅ **Regular backups** - Take backups every week (see [Backup & Restore](/docs/deployment/backup-restore))
- ✅ **Use connection string encryption** (SSL/TLS) especially for cloud deployments
- ✅ **Limit network access** - Only allow necessary IP addresses

---

## Troubleshooting

### Connection Refused

**Check MongoDB is running:**
```bash
# Check service status
sudo systemctl status mongod  # Linux
brew services list | grep mongodb  # macOS

# Test connection
mongosh
# or
mongo
```

**Verify port 27017 is open:**
```bash
# Check if port is listening
netstat -tuln | grep 27017  # Linux
lsof -i :27017  # macOS
```

**Check firewall settings:**
```bash
# Linux - Allow MongoDB port
sudo ufw allow 27017/tcp
```

### Authentication Failed

- Verify username and password are correct
- Check `authSource` parameter in connection string
- Ensure user has proper permissions on the database
- For MongoDB Atlas, verify your IP is whitelisted

### Connection String Issues

- Verify the connection string format matches your setup (local vs Atlas)
- For Atlas, ensure the cluster is running and accessible
- Check for typos in username, password, or hostname

---

## Setting Up Authentication (Local Installation)

For local MongoDB installations, it's recommended to enable authentication:

1. Connect to MongoDB without auth:
   ```bash
   mongosh
   ```

2. Switch to admin database:
   ```javascript
   use admin
   ```

3. Create admin user:
   ```javascript
   db.createUser({
     user: "admin",
     pwd: "your-secure-password",
     roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
   })
   ```

4. Enable authentication in MongoDB config:
   ```yaml
   # /etc/mongod.conf (Linux) or /usr/local/etc/mongod.conf (macOS)
   security:
     authorization: enabled
   ```

5. Restart MongoDB:
   ```bash
   sudo systemctl restart mongod  # Linux
   brew services restart mongodb-community@7  # macOS
   ```

---

## Weekly Backup Reminder

:::tip 💾 Don't Forget!
Set a weekly reminder to backup your MongoDB database. See the [Backup & Restore](/docs/deployment/backup-restore) guide for automated backup scripts.
:::
