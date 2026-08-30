---
sidebar_position: 2
---

# Step 2 — Run MongoDB or use Atlas

The app needs **MongoDB**. That is the database. The app Docker file does not start Mongo for you.

Pick one:

- Install MongoDB on this server, or
- Use a hosted Mongo (for example Atlas) and copy the connection URL

You will need a URL like:

```text
mongodb://USERNAME:PASSWORD@HOST:27017/ai-notes-xyz?authSource=admin&directConnection=true
```

Keep this URL ready for the next step.

:::note Screenshot
Step 2 — add later: `/img/selfhost/ubuntu-nginx-cloud/02-mongodb.png`
:::

**Back:** [Step 1](/docs/selfhost/ubuntu-nginx-cloud/steps/01-install-nginx)

**Next:** [Step 3 — Run the app container](/docs/selfhost/ubuntu-nginx-cloud/steps/03-run-app-container)
