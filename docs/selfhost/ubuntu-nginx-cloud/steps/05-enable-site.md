---
sidebar_position: 5
---

# Step 5 — Enable the site

Link the site into `sites-enabled`:

```bash
sudo ln -s /etc/nginx/sites-available/ai-notes-xyz /etc/nginx/sites-enabled/ai-notes-xyz
```

If the default nginx page is in the way, you can remove it:

```bash
sudo rm -f /etc/nginx/sites-enabled/default
```

Point your domain’s DNS A record at this server’s public IP.

:::note Screenshot
Step 5 — add later: `/img/selfhost/ubuntu-nginx-cloud/05-enable-site.png`
:::

**Back:** [Step 4](/docs/selfhost/ubuntu-nginx-cloud/steps/04-nginx-site-file)

**Next:** [Step 6 — Test and reload nginx](/docs/selfhost/ubuntu-nginx-cloud/steps/06-test-reload)
