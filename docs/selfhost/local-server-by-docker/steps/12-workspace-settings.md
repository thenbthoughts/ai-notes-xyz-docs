---
sidebar_position: 12
---

# Step 12 — Connect workspace in Settings

Open the main app at [http://localhost:2000](http://localhost:2000). Go to **Settings → Agent Workspace** and paste:

- **Desktop URL** — `http://localhost:3010/`
- **Desktop username and password** — same as `CUSTOM_USER` / `PASSWORD`
- **API URL** — `http://localhost:2001/` (no `/api` at the end)
- **API token** — the same `API_TOKEN` you set in `.env`

If you want the agent to call back into the app, also set the MCP token in Settings.

You are done.

:::note Screenshot
Step 12 — add later: `/img/selfhost/local-server-by-docker/12-workspace-settings.png`
:::

**Back:** [Step 11](/docs/selfhost/local-server-by-docker/steps/11-workspace-compose-up)

**Overview:** [Local server by Docker](/docs/selfhost/local-server-by-docker/overview)
