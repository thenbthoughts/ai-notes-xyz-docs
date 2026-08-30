---
sidebar_position: 10
---

# Step 10 — Set API_TOKEN

Create a `.env` file in the workspace folder (or edit one if it exists).

Set a long random `API_TOKEN`. The main app will send this as `X-API-Token`.

If `API_TOKEN` is empty, protected workspace routes fail.

You can also set `PASSWORD` for the desktop login. The default is `abc` / `agentworkspace`. That is fine on your own computer. Do not use those defaults if other people can reach your machine.

:::note Screenshot
Step 10 — add later: `/img/selfhost/local-server-by-docker/10-set-api-token.png`
:::

**Back:** [Step 9](/docs/selfhost/local-server-by-docker/steps/09-clone-workspace)

**Next:** [Step 11 — Start the workspace with Docker Compose](/docs/selfhost/local-server-by-docker/steps/11-workspace-compose-up)
