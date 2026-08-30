---
sidebar_position: 6
---

# Step 6 — Test and reload nginx

Check the config, then reload:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

`nginx -t` must say the syntax is ok. If it fails, fix the site file and test again.

Open `http://notes.example.com` (your domain). You should see the AI Notes website.

:::note Screenshot
Step 6 — add later: `/img/selfhost/ubuntu-nginx-cloud/06-test-reload.png`
:::

**Back:** [Step 5](/docs/selfhost/ubuntu-nginx-cloud/steps/05-enable-site)

**Next:** [Step 7 — Add HTTPS with certbot](/docs/selfhost/ubuntu-nginx-cloud/steps/07-https-certbot)
