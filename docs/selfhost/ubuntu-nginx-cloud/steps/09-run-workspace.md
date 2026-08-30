---
sidebar_position: 9
---

# Step 9 — Run the workspace container

This step is optional. Skip it if you do not want the agent desktop.

Clone the workspace repo and start it. Bind ports to localhost so nginx is the public door.

```bash
git clone https://github.com/thenbthoughts/ai-notes-xyz-agent-workspace.git
cd ai-notes-xyz-agent-workspace
```

Create a `.env` file with a long random `API_TOKEN` and a strong `PASSWORD`. Do not use the default desktop password on the public internet.

```bash
docker compose up -d --build
```

The compose file maps:

- **2001** — workspace API
- **3010** — desktop in the browser (container port 3000)
- **4096** — OpenCode (used inside the container)

The first build is slow. The image is large. Shared memory is already set to `1gb` in compose.

If you want nginx to be the only public port, you can change the compose ports to `127.0.0.1:2001:2001` and `127.0.0.1:3010:3000`.

:::note Screenshot
Step 9 — add later: `/img/selfhost/ubuntu-nginx-cloud/09-run-workspace.png`
:::

**Back:** [Step 8](/docs/selfhost/ubuntu-nginx-cloud/steps/08-open-site-settings)

**Next:** [Step 10 — Add nginx for the workspace](/docs/selfhost/ubuntu-nginx-cloud/steps/10-nginx-workspace)
