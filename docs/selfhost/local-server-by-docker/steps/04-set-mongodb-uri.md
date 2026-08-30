---
sidebar_position: 4
---

# Step 4 — Set MONGODB_URI

Compose already sets a URL for Mongo on your machine:

```text
mongodb://host.docker.internal:27017/ai-notes-xyz-container
```

`host.docker.internal` means “the computer that runs Docker”. This works if Mongo is on your machine at port 27017.

If you use Atlas or another host, edit `docker-compose.yml` (or pass `-e MONGODB_URI=...`) and put your real URL there.

The app will not start if this URL is wrong.

:::note Screenshot
Step 4 — add later: `/img/selfhost/local-server-by-docker/04-set-mongodb-uri.png`
:::

**Back:** [Step 3](/docs/selfhost/local-server-by-docker/steps/03-clone-api)

**Next:** [Step 5 — Start the app with Docker Compose](/docs/selfhost/local-server-by-docker/steps/05-docker-compose-up)
