---
sidebar_position: 2
---

# Step 2 — Run MongoDB or use Atlas

The app needs **MongoDB**. That is the database.

The Docker Compose file does **not** start Mongo. It expects Mongo on your computer at port **27017**, or a URL you set yourself.

Pick one:

- Install MongoDB locally and start it, or
- Use a hosted Mongo (for example Atlas) and copy the connection URL

If Mongo is on your machine, keep port `27017` free.

:::note Screenshot
Step 2 — add later: `/img/selfhost/local-server-by-docker/02-mongodb.png`
:::

**Back:** [Step 1](/docs/selfhost/local-server-by-docker/steps/01-install-docker)

**Next:** [Step 3 — Clone the API repo](/docs/selfhost/local-server-by-docker/steps/03-clone-api)
