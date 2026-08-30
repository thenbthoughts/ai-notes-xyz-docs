---
sidebar_position: 1
---
import GetStartedSection from '@site/src/components/GetStartedSection';

# Ubuntu + nginx Cloud

Use this if you have an Ubuntu server. You run the app in Docker. **Nginx** is the door on ports 80 and 443. It forwards traffic to the app.

The app still listens on `127.0.0.1:2000`. That is the **website and the API together**.

You still need **MongoDB**. That is the database. Docker does not start it for you.

When Docker builds the app, it clones GitHub. It does not use folders on your laptop.

**Agent Workspace** is optional. Do steps 1 to 8 to run the app. Do steps 9 to 12 only if you want the agent desktop.

## What you need

- An Ubuntu server you can SSH into
- Docker on that server
- A MongoDB URL
- A domain name (for HTTPS)

## Steps

**App (required)**

1. [Install nginx](/docs/selfhost/ubuntu-nginx-cloud/steps/01-install-nginx)
2. [Run MongoDB or use Atlas](/docs/selfhost/ubuntu-nginx-cloud/steps/02-mongodb)
3. [Run the app container on port 2000](/docs/selfhost/ubuntu-nginx-cloud/steps/03-run-app-container)
4. [Create the nginx site file](/docs/selfhost/ubuntu-nginx-cloud/steps/04-nginx-site-file)
5. [Enable the site](/docs/selfhost/ubuntu-nginx-cloud/steps/05-enable-site)
6. [Test and reload nginx](/docs/selfhost/ubuntu-nginx-cloud/steps/06-test-reload)
7. [Add HTTPS with certbot](/docs/selfhost/ubuntu-nginx-cloud/steps/07-https-certbot)
8. [Open the site and add an AI key](/docs/selfhost/ubuntu-nginx-cloud/steps/08-open-site-settings)

**Agent Workspace (optional)**

9. [Run the workspace container](/docs/selfhost/ubuntu-nginx-cloud/steps/09-run-workspace)
10. [Add nginx for the workspace](/docs/selfhost/ubuntu-nginx-cloud/steps/10-nginx-workspace)
11. [Test and reload nginx again](/docs/selfhost/ubuntu-nginx-cloud/steps/11-test-reload-workspace)
12. [Connect workspace in Settings](/docs/selfhost/ubuntu-nginx-cloud/steps/12-workspace-settings)

Start here: [Step 1](/docs/selfhost/ubuntu-nginx-cloud/steps/01-install-nginx).

<GetStartedSection />
