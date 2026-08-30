---
sidebar_position: 1
---
import GetStartedSection from '@site/src/components/GetStartedSection';

# Coolify Cloud

Use this if you have a VPS (a rented server) with [Coolify](https://coolify.io/). Coolify builds the app from GitHub and can add HTTPS for you.

You still need **MongoDB**. That is the database. Coolify does not create it.

The app image is the **website and the API together**, on port **2000**. Docker clones GitHub when it builds. It does not use folders on your laptop.

**Agent Workspace** is optional. Do steps 1 and 2 to run the app. Do step 3 only if you want the agent desktop.

## What you need

- A Coolify server
- A MongoDB URL (your own Mongo or a hosted one like Atlas)
- A domain name for the app

## Steps

1. [Create or open a Coolify project](/docs/selfhost/coolify-cloud/coolify-cloud-step-01-create-project)
2. [Add the app from Git and deploy](/docs/selfhost/coolify-cloud/coolify-cloud-step-02-add-app-from-git-and-deploy)
3. [Add the workspace app from Git and deploy](/docs/selfhost/coolify-cloud/coolify-cloud-step-03-add-workspace-app-from-git-and-deploy) (optional)

Start here: [Step 1](/docs/selfhost/coolify-cloud/coolify-cloud-step-01-create-project).

<GetStartedSection />
