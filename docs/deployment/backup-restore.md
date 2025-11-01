---
sidebar_position: 8
---

# Backup & Restore

:::warning ⚠️ Critical: Weekly Backups Required
**Take backups of your MongoDB data every week** to prevent data loss. Set up automated backups and test restore procedures regularly.
:::

How to backup and restore your AI Notes data.

## MongoDB Backup

:::tip 💾 Backup Frequency
**Recommended:** Take backups at least once per week. For production systems, consider daily backups.
:::

### Manual Backup

:::info 📋 Before Starting
Make sure you have enough disk space for the backup. A typical backup is 10-50% of your database size (compressed).
:::

**Using mongodump:**

```bash
# Backup entire database
mongodump --uri="mongodb://username:password@localhost:27017/ai-notes-xyz?authSource=admin" --out=/backup/ai-notes-$(date +%Y%m%d)

# Backup specific database
mongodump --uri="mongodb://username:password@localhost:27017/ai-notes-xyz?authSource=admin" --db=ai-notes-xyz --out=/backup/

# Compressed backup
mongodump --uri="mongodb://username:password@localhost:27017/ai-notes-xyz?authSource=admin" --archive=/backup/ai-notes-$(date +%Y%m%d).gz --gzip
```

### Docker Backup

```bash
# Backup MongoDB container
docker exec ai-notes-mongodb mongodump --uri="mongodb://admin:password@localhost:27017/ai-notes-xyz?authSource=admin" --archive=/backup/ai-notes-$(date +%Y%m%d).gz --gzip

# Copy backup out of container
docker cp ai-notes-mongodb:/backup/ai-notes-20250101.gz ./backups/
```

### Automated Backup Script

:::tip 🔄 Automated Weekly Backups
Set up this script with cron to run weekly backups automatically. Don't rely on manual backups.
:::

Create `backup.sh`:

```bash
#!/bin/bash

BACKUP_DIR="/backups/ai-notes"
DATE=$(date +%Y%m%d-%H%M%S)
RETENTION_DAYS=30

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup MongoDB
mongodump \
  --uri="mongodb://username:password@localhost:27017/ai-notes-xyz?authSource=admin" \
  --archive=$BACKUP_DIR/ai-notes-$DATE.gz \
  --gzip

# Remove old backups
find $BACKUP_DIR -name "ai-notes-*.gz" -mtime +$RETENTION_DAYS -delete

echo "Backup completed: ai-notes-$DATE.gz"
```

**Schedule with cron:**
```bash
# Weekly backup every Sunday at 2 AM (recommended minimum)
0 2 * * 0 /path/to/backup.sh

# Or daily backup at 2 AM (for production)
0 2 * * * /path/to/backup.sh
```

### Docker Compose Backup Service

Add to `docker-compose.yml`:

```yaml
services:
  backup:
    image: mongo:7
    volumes:
      - mongodb_data:/data/db:ro
      - ./backups:/backups
    command: >
      bash -c "
      mongodump --uri='mongodb://admin:password@mongodb:27017/ai-notes-xyz?authSource=admin'
      --archive=/backups/ai-notes-$$(date +%Y%m%d).gz --gzip
      && echo 'Backup completed'
      "
    depends_on:
      - mongodb
    restart: "no"
```

Run backup:
```bash
docker-compose run --rm backup
```

## Restore

:::warning ⚠️ Before Restoring
**Always backup current data before restoring** to prevent accidental data loss. Test restore procedures in a test environment first.
:::

### From mongodump Archive

```bash
# Restore entire database
mongorestore --uri="mongodb://username:password@localhost:27017/ai-notes-xyz?authSource=admin" --archive=/backup/ai-notes-20250101.gz --gzip

# Restore specific database
mongorestore --uri="mongodb://username:password@localhost:27017/ai-notes-xyz?authSource=admin" --db=ai-notes-xyz --archive=/backup/ai-notes-20250101.gz --gzip --drop
```

**Warning:** `--drop` removes existing data before restore.

### Docker Restore

```bash
# Copy backup into container
docker cp ./backups/ai-notes-20250101.gz ai-notes-mongodb:/backup/

# Restore
docker exec ai-notes-mongodb mongorestore \
  --uri="mongodb://admin:password@localhost:27017/ai-notes-xyz?authSource=admin" \
  --archive=/backup/ai-notes-20250101.gz \
  --gzip \
  --drop
```

## S3 File Backup

If using S3-compatible storage:

### Backup S3 Files

```bash
# Using AWS CLI
aws s3 sync s3://your-bucket-name/ ./local-backup/

# Using rclone
rclone sync s3-bucket:ai-notes-files ./local-backup/
```

### Restore S3 Files

```bash
# Using AWS CLI
aws s3 sync ./local-backup/ s3://your-bucket-name/

# Using rclone
rclone sync ./local-backup/ s3-bucket:ai-notes-files
```

## Complete Backup Strategy

### 1. Database Backup

```bash
# Daily MongoDB backup
mongodump --archive=/backups/db-$(date +%Y%m%d).gz --gzip
```

### 2. Files Backup

```bash
# Daily S3 backup
aws s3 sync s3://bucket-name ./backups/files-$(date +%Y%m%d)/
```

### 3. Off-site Storage

```bash
# Upload to remote storage
rsync -avz /backups/ user@remote-server:/backups/ai-notes/
```

## Automated Backup Solution

### Using Cron

```bash
# Edit crontab
crontab -e

# Add daily backup at 2 AM
0 2 * * * /path/to/backup.sh >> /var/log/ai-notes-backup.log 2>&1
```

## Backup Verification

Always verify backups:

```bash
# List backup contents
mongorestore --uri="mongodb://localhost:27017/test" --archive=/backup/ai-notes-20250101.gz --gzip --dryRun

# Test restore to temporary database
mongorestore --uri="mongodb://localhost:27017/test-restore" --archive=/backup/ai-notes-20250101.gz --gzip
```

## Best Practices

- ✅ **Weekly backups minimum:** Take backups at least once per week (daily for production)
- ✅ **Automated backups:** Don't rely on manual backups - use cron or scheduled tasks
- ✅ **Regular testing:** Test restore process monthly to ensure backups are valid
- ✅ **Multiple copies:** Keep backups in multiple locations (local + off-site/cloud)
- ✅ **Retention policy:** Keep backups for 30-90 days minimum
- ✅ **Encryption:** Encrypt backups before storage for security
- ✅ **Documentation:** Document backup and restore procedures for team members
- ✅ **Monitoring:** Monitor backup success/failure with alerts/notifications
- ✅ **Backup verification:** Always verify backups can be restored after creation

---

## See Also

- [MongoDB Setup](/docs/deployment/mongodb-setup)
- [Production Best Practices](/docs/deployment/production)
- [Security Guide](/docs/deployment/security)

