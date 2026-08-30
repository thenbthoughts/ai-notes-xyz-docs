---
sidebar_position: 5
---

# Step 5 — Start the app with Docker Compose

From the `ai-notes-xyz-api` folder, run:

```bash
docker compose up -d --build
```

The first build is slow. Docker clones the client and API from GitHub, then builds them. It does not use other folders on your computer.

To stop later:

```bash
docker compose down
```

:::note Screenshot
Step 5 — add later: `/img/selfhost/local-server-by-docker/05-docker-compose-up.png`
:::

**Back:** [Step 4](/docs/selfhost/local-server-by-docker/steps/04-set-mongodb-uri)

**Next:** [Step 6 — Wait until the container is up](/docs/selfhost/local-server-by-docker/steps/06-wait-container)
