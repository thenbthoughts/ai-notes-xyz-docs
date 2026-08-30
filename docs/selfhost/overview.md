---
sidebar_position: 1
---
import GetStartedSection from '@site/src/components/GetStartedSection';

# How to deploy AI Notes

Pick **one** way to run the app. All three ways run the same app.

The app is the **website and the API together**, on port **2000**. You also need **MongoDB** (the database). Docker builds the app by cloning GitHub. It does not use folders on your laptop.

**Agent Workspace** is optional. Skip it if you only want notes, tasks, and chat.

## Pick a way

| Way | Use this when |
| --- | --- |
| [Local server by Docker](/docs/selfhost/local-server-by-docker/overview) | You want it on your own computer. |
| [Coolify Cloud](/docs/selfhost/coolify-cloud/coolify-cloud-intro) | You have a VPS with Coolify. |
| [Ubuntu + nginx Cloud](/docs/selfhost/ubuntu-nginx-cloud/overview) | You have an Ubuntu server and will use nginx as the door to the app. |

Each folder has a short overview, then numbered steps.

<GetStartedSection />
