---
sidebar_position: 11
---

# Step 11 — Test and reload nginx again

```bash
sudo nginx -t
sudo systemctl reload nginx
```

If you use HTTPS, run certbot for the new names too:

```bash
sudo certbot --nginx -d workspace-api.example.com -d workspace.example.com
```

Check:

1. `https://workspace-api.example.com/api/` shows a welcome text
2. `https://workspace.example.com` shows the desktop login

If the desktop page loads but the screen is black, WebSockets are likely blocked.

:::note Screenshot
Step 11 — add later: `/img/selfhost/ubuntu-nginx-cloud/11-test-reload-workspace.png`
:::

**Back:** [Step 10](/docs/selfhost/ubuntu-nginx-cloud/steps/10-nginx-workspace)

**Next:** [Step 12 — Connect workspace in Settings](/docs/selfhost/ubuntu-nginx-cloud/steps/12-workspace-settings)
