---
sidebar_position: 10
---

# Step 10 — Add nginx for the workspace

Add two more server names (or two files). Replace the example domains.

The desktop needs **WebSockets** (a live connection). Keep the `Upgrade` headers.

```nginx
server {
    listen 80;
    server_name workspace-api.example.com;

    client_max_body_size 16m;

    location / {
        proxy_pass http://127.0.0.1:2001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}

server {
    listen 80;
    server_name workspace.example.com;

    location / {
        proxy_pass http://127.0.0.1:3010;
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

Point both DNS names at this server. You can put this in `/etc/nginx/sites-available/ai-notes-workspace` and enable it the same way as the app site.

:::note Screenshot
Step 10 — add later: `/img/selfhost/ubuntu-nginx-cloud/10-nginx-workspace.png`
:::

**Back:** [Step 9](/docs/selfhost/ubuntu-nginx-cloud/steps/09-run-workspace)

**Next:** [Step 11 — Test and reload nginx again](/docs/selfhost/ubuntu-nginx-cloud/steps/11-test-reload-workspace)
