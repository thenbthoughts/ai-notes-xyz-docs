---
sidebar_position: 1
---
import GetStartedSection from '@site/src/components/GetStartedSection';

# Local server by Docker

Use this if you want AI Notes on your own computer.

**Docker** is a tool that runs the app in a box, so you do not install Node by hand.

The app is the **website and the API together**, on port **2000**. Open `http://localhost:2000`. Do not use port 3000 for this path.

You still need **MongoDB**. That is the database. Docker Compose does not start it for you.

When Docker builds, it clones GitHub. It does not use other folders on your computer.

**Agent Workspace** is optional. Do steps 1 to 8 to run the app. Do steps 9 to 12 only if you want the agent desktop.

## What you need

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- MongoDB on your machine, or a hosted Mongo URL (for example Atlas)

## Steps

**App (required)**

1. [Install Docker Desktop](/docs/selfhost/local-server-by-docker/steps/01-install-docker)
2. [Run MongoDB or use Atlas](/docs/selfhost/local-server-by-docker/steps/02-mongodb)
3. [Clone the API repo](/docs/selfhost/local-server-by-docker/steps/03-clone-api)
4. [Set MONGODB_URI](/docs/selfhost/local-server-by-docker/steps/04-set-mongodb-uri)
5. [Start the app with Docker Compose](/docs/selfhost/local-server-by-docker/steps/05-docker-compose-up)
6. [Wait until the container is up](/docs/selfhost/local-server-by-docker/steps/06-wait-container)
7. [Open http://localhost:2000](/docs/selfhost/local-server-by-docker/steps/07-open-localhost)
8. [Create an account and add an AI key](/docs/selfhost/local-server-by-docker/steps/08-account-settings)

**Agent Workspace (optional)**

9. [Clone the workspace repo](/docs/selfhost/local-server-by-docker/steps/09-clone-workspace)
10. [Set API_TOKEN](/docs/selfhost/local-server-by-docker/steps/10-set-api-token)
11. [Start the workspace with Docker Compose](/docs/selfhost/local-server-by-docker/steps/11-workspace-compose-up)
12. [Connect workspace in Settings](/docs/selfhost/local-server-by-docker/steps/12-workspace-settings)

Start here: [Step 1](/docs/selfhost/local-server-by-docker/steps/01-install-docker).

<GetStartedSection />
