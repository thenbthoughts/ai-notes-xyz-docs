---
sidebar_position: 6
---

# Step 6 — Wait until the container is up

Check that the container is running:

```bash
docker compose ps
```

It should show the app on port **2000**.

If it keeps restarting, look at the logs:

```bash
docker compose logs
```

A common problem is MongoDB. If Mongo is not running, or port `27017` is busy, the app exits.

If port `2000` is already in use, change the port in `docker-compose.yml`.

:::note Screenshot
Step 6 — add later: `/img/selfhost/local-server-by-docker/06-wait-container.png`
:::

**Back:** [Step 5](/docs/selfhost/local-server-by-docker/steps/05-docker-compose-up)

**Next:** [Step 7 — Open http://localhost:2000](/docs/selfhost/local-server-by-docker/steps/07-open-localhost)
