---
sidebar_position: 7
---

# Step 7 — Add HTTPS with certbot

HTTPS encrypts the site. Skip this step only if you are on a private network and HTTP is enough.

```bash
sudo certbot --nginx -d notes.example.com
```

Follow the prompts. Certbot will edit the nginx file and add a certificate.

Open `https://notes.example.com` and check that the lock icon is there.

:::note Screenshot
Step 7 — add later: `/img/selfhost/ubuntu-nginx-cloud/07-https-certbot.png`
:::

**Back:** [Step 6](/docs/selfhost/ubuntu-nginx-cloud/steps/06-test-reload)

**Next:** [Step 8 — Open the site and add an AI key](/docs/selfhost/ubuntu-nginx-cloud/steps/08-open-site-settings)
