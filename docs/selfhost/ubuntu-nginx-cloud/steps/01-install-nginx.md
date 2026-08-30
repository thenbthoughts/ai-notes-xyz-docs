---
sidebar_position: 1
---

# Step 1 — Install nginx

SSH into your Ubuntu server.

Install nginx. Nginx is the web server that will sit in front of the app.

```bash
sudo apt-get update
sudo apt-get install -y nginx
```

If you want HTTPS later, also install certbot:

```bash
sudo apt-get install -y certbot python3-certbot-nginx
```

Check that nginx is running:

```bash
sudo systemctl status nginx
```

:::note Screenshot
Step 1 — add later: `/img/selfhost/ubuntu-nginx-cloud/01-install-nginx.png`
:::

**Next:** [Step 2 — Run MongoDB or use Atlas](/docs/selfhost/ubuntu-nginx-cloud/steps/02-mongodb)
