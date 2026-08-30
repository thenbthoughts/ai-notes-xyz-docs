---
sidebar_position: 12
---

# Step 12 — Connect workspace in Settings

Open the main AI Notes app. Go to **Settings → Agent Workspace** and paste:

- **Desktop URL** — `https://workspace.example.com/`
- **Desktop username and password** — same as `CUSTOM_USER` / `PASSWORD` (default user is `abc`)
- **API URL** — `https://workspace-api.example.com/` (no `/api` at the end)
- **API token** — the same `API_TOKEN` you set in `.env`

If you want the agent to call back into the app, also set the MCP token in Settings.

You are done.

:::note Screenshot
Step 12 — add later: `/img/selfhost/ubuntu-nginx-cloud/12-workspace-settings.png`
:::

**Back:** [Step 11](/docs/selfhost/ubuntu-nginx-cloud/steps/11-test-reload-workspace)

**Overview:** [Ubuntu + nginx Cloud](/docs/selfhost/ubuntu-nginx-cloud/overview)
