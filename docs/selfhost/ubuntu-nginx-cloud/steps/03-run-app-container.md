---
sidebar_position: 3
---

# Step 3 — Run the app container on port 2000

Install Docker if it is not already on the server.

Clone the API repo and start the image:

```bash
git clone https://github.com/thenbthoughts/ai-notes-xyz-api.git
cd ai-notes-xyz-api
```

The compose file talks to Mongo on the host. Set `MONGODB_URI` to your real URL.

Example run (replace the URL):

```bash
docker build -t ai-notes-docker .
docker run -d --name ai-notes-xyz --restart unless-stopped \
  -p 127.0.0.1:2000:2000 \
  -e MONGODB_URI="mongodb://USERNAME:PASSWORD@HOST:27017/ai-notes-xyz?authSource=admin&directConnection=true" \
  ai-notes-docker
```

Bind to `127.0.0.1:2000` so only nginx (on this machine) can reach the app. Do not open port 2000 to the public internet if nginx will be the door.

The first build clones GitHub and can take several minutes.

:::note Screenshot
Step 3 — add later: `/img/selfhost/ubuntu-nginx-cloud/03-run-app-container.png`
:::

**Back:** [Step 2](/docs/selfhost/ubuntu-nginx-cloud/steps/02-mongodb)

**Next:** [Step 4 — Create the nginx site file](/docs/selfhost/ubuntu-nginx-cloud/steps/04-nginx-site-file)
