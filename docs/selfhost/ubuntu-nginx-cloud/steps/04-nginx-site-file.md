---
sidebar_position: 4
---

# Step 4 — Create the nginx site file

Create a site file. Replace `notes.example.com` with your domain.

```bash
sudo nano /etc/nginx/sites-available/ai-notes-xyz
```

Paste this:

```nginx
server {
    listen 80;
    server_name notes.example.com;

    client_max_body_size 16m;

    location / {
        proxy_pass http://127.0.0.1:2000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

This sends `/` and `/api` to the app on port 2000.

:::note Screenshot
Step 4 — add later: `/img/selfhost/ubuntu-nginx-cloud/04-nginx-site-file.png`
:::

**Back:** [Step 3](/docs/selfhost/ubuntu-nginx-cloud/steps/03-run-app-container)

**Next:** [Step 5 — Enable the site](/docs/selfhost/ubuntu-nginx-cloud/steps/05-enable-site)
