---
sidebar_position: 11
---

# Step 11 — Start the workspace with Docker Compose

From the workspace folder:

```bash
docker compose --env-file .env up -d --build
```

The first build is slow. The image is large.

When it is up:

| What | Address |
| --- | --- |
| Desktop | [http://localhost:3010](http://localhost:3010) |
| Workspace API | [http://localhost:2001/api/](http://localhost:2001/api/) |

Log in to the desktop with `CUSTOM_USER` / `PASSWORD` (defaults `abc` / `agentworkspace`).

To stop later:

```bash
docker compose down
```

:::note Screenshot
Step 11 — add later: `/img/selfhost/local-server-by-docker/11-workspace-compose-up.png`
:::

**Back:** [Step 10](/docs/selfhost/local-server-by-docker/steps/10-set-api-token)

**Next:** [Step 12 — Connect workspace in Settings](/docs/selfhost/local-server-by-docker/steps/12-workspace-settings)
