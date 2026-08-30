---
sidebar_position: 4
---

# Step 3 — Add the workspace app from Git and deploy

This step is optional. Skip it if you only want notes, tasks, and chat.

The workspace is a **second Coolify app**. It is not the main website. It gives you the agent desktop and the workspace API.

## Table of contents

1. [Add a resource](#add-a-resource)
2. [Pick Public Repository](#pick-public-repository)
3. [Enter the workspace repo URL](#enter-the-workspace-repo-url)
4. [Use Dockerfile and continue](#use-dockerfile-and-continue)
5. [Set ports 2001 and 3000](#set-ports-2001-and-3000)
6. [Set API_TOKEN and a strong password](#set-api_token-and-a-strong-password)
7. [Add disk at /config](#add-disk-at-config)
8. [Set shared memory to 1gb](#set-shared-memory-to-1gb)
9. [Attach two domains](#attach-two-domains)
10. [Deploy and wait](#deploy-and-wait)
11. [Connect Settings](#connect-settings)

## Add a resource {#add-a-resource}

In the same Coolify project, click **+ Add Resource** (or **+ New**).

:::note Screenshot
Add later: `./img-step-1-add-resource.png`
:::

## Pick Public Repository {#pick-public-repository}

Under **Git Based**, click **Public Repository**.

:::note Screenshot
Add later: `./img-step-2-public-repository.png`
:::

## Enter the workspace repo URL {#enter-the-workspace-repo-url}

Set the repository URL to:

`https://github.com/thenbthoughts/ai-notes-xyz-agent-workspace`

Click **Check repository**.

:::note Screenshot
Add later: `./img-step-3-enter-repo-url.png`
:::

## Use Dockerfile and continue {#use-dockerfile-and-continue}

Set **Build Pack** to **Dockerfile**. Leave the Dockerfile at the repo root. Leave **Base Directory** as `/`.

Do not set a custom start command. The image already starts the desktop and the workspace API.

Click **Continue**.

The first build can take 10 to 20 minutes. The image is large (desktop, browser, and tools).

:::note Screenshot
Add later: `./img-step-4-dockerfile.png`
:::

## Set ports 2001 and 3000 {#set-ports-2001-and-3000}

Set **Ports Exposes** to:

`2001,3000`

- **2001** is the workspace API
- **3000** is the desktop in the browser (inside the container)

Do not put port **3001** on the public proxy. That port is a self-signed HTTPS desktop. Coolify already handles HTTPS.

:::note Screenshot
Add later: `./img-step-5-ports.png`
:::

## Set API_TOKEN and a strong password {#set-api_token-and-a-strong-password}

Open **Environment Variables**. Add these. Mark secrets as secret.

| Name | What it is |
| --- | --- |
| `API_TOKEN` | A long random string. The main app sends this as `X-API-Token`. If it is empty, protected routes fail. |
| `PASSWORD` | Login password for the desktop. Do **not** use the default `agentworkspace` on the public internet. |
| `CUSTOM_USER` | Desktop login name. Default is `abc`. You can leave this. |

Pick a strong password. Anyone who can open the desktop can run commands in that container.

:::note Screenshot
Add later: `./img-step-6-token-password.png`
:::

## Add disk at /config {#add-disk-at-config}

Open **Storages**. Add a volume.

Set the path **inside the container** to `/config`.

This folder keeps the desktop home and agent files. If you skip this, files can disappear when you redeploy.

:::note Screenshot
Add later: `./img-step-7-disk.png`
:::

## Set shared memory to 1gb {#set-shared-memory-to-1gb}

The browser desktop needs extra shared memory.

In **Advanced** (or custom Docker options), set:

`--shm-size=1gb`

Without this, the desktop is often black or unstable.

The server should have enough RAM (about 8 GB is a safe minimum for this image).

:::note Screenshot
Add later: `./img-step-8-shm.png`
:::

## Attach two domains {#attach-two-domains}

Add two public URLs:

| Example | Port | What it is |
| --- | --- | --- |
| `https://workspace-api.example.com:2001` | 2001 | Workspace API |
| `https://workspace.example.com:3000` | 3000 | Desktop in the browser |

If Coolify only shows one port, put `2001,3000` in **Ports Exposes** first, then add the second domain with `:3000`.

The desktop uses WebSockets (a live connection). Coolify’s proxy usually allows this. If the page loads but the screen stays black, check that WebSockets are not blocked.

Set the health check to port **2001** and path `/api/` (or `/api/shell-engine/about`). Do not health-check `/` on the desktop.

:::note Screenshot
Add later: `./img-step-9-domains.png`
:::

## Deploy and wait {#deploy-and-wait}

Save and click **Deploy**. Wait for the image to build.

Check:

1. Open the API domain at `/api/`. You should see a welcome text.
2. Open the desktop domain. Log in with `CUSTOM_USER` (default `abc`) and your `PASSWORD`.

:::note Screenshot
Add later: `./img-step-10-deploy.png`
:::

## Connect Settings {#connect-settings}

Open the main AI Notes app. Go to **Settings → Agent Workspace** and paste:

- **Desktop URL** — your desktop domain, like `https://workspace.example.com/`
- **Desktop username and password** — same as `CUSTOM_USER` / `PASSWORD`
- **API URL** — the API origin only, like `https://workspace-api.example.com/` (no `/api` at the end)
- **API token** — the same `API_TOKEN` you set in Coolify

If you want the agent to call back into the app, also set the MCP token in Settings.

You are done.

:::note Screenshot
Add later: `./img-step-11-connect-settings.png`
:::

**Back:** [Step 2](/docs/selfhost/coolify-cloud/coolify-cloud-step-02-add-app-from-git-and-deploy)

**Overview:** [Coolify Cloud](/docs/selfhost/coolify-cloud/coolify-cloud-intro)
