---
sidebar_position: 3
---

# Step 2 — Add the app from Git and deploy

This step adds the main app (website + API) and deploys it. Follow the screens in order.

## Table of contents

1. [Add a resource](#add-a-resource)
2. [Pick Public Repository](#pick-public-repository)
3. [Enter the repo URL](#enter-the-repo-url)
4. [Use Dockerfile and continue](#use-dockerfile-and-continue)
5. [Set the name and domain](#set-the-name-and-domain)
6. [Set port 2000](#set-port-2000)
7. [Add MONGODB_URI](#add-mongodb_uri)
8. [Check the env is saved](#check-the-env-is-saved)
9. [Deploy and wait](#deploy-and-wait)
10. [Open the live website](#open-the-live-website)
11. [Add an AI key](#add-an-ai-key)

## 2.1 Add a resource {#add-a-resource}

In the project, click **+ Add Resource**.

![Click + Add Resource](./img-step-1-click-on-add-resource.png)

## 2.2 Pick Public Repository {#pick-public-repository}

Under **Git Based**, click **Public Repository**.

Coolify will clone the code from GitHub and build it.

![Click Public Repository](./img-step-2-click-on-public-repository.png)

## 2.3 Enter the repo URL {#enter-the-repo-url}

Set the repository URL to:

`https://github.com/thenbthoughts/ai-notes-xyz-deploy`

Click **Check repository**.

This image builds the website and the API together. When Docker builds, it clones the client and API from GitHub. It does not use folders on your laptop.

![Enter the repo URL](./img-step-3-enter-repo-url.png)

## 2.4 Use Dockerfile and continue {#use-dockerfile-and-continue}

Set **Build Pack** to **Dockerfile**. Leave **Base Directory** as `/`.

Click **Continue**.

![Select Dockerfile and click Continue](./img-step-4-select-buildpack-as-dockerfile-and-click-on-continue.png)

## 2.5 Set the name and domain {#set-the-name-and-domain}

On **General**, set a name (for example `ai-notes-xyz-demo`).

Set **Domains** to your public URL, for example `https://notes.example.com`.

Point that domain at your Coolify server (DNS A record). Coolify can put HTTPS in front of the app.

Click **Save**.

![Enter name and domain](./img-step-5-enter-name-and-domain.png)

## 2.6 Set port 2000 {#set-port-2000}

Find **Ports Exposes**. Set it to `2000`.

The app listens on port **2000**. That is both the website and `/api`. Do not use port 3000.

![Set Ports Exposes to 2000](./img-step-6-add-port-as-2000.png)

## 2.7 Add MONGODB_URI {#add-mongodb_uri}

Open **Environment Variables**. Click **+ Add**.

Add one required variable:

- **Name:** `MONGODB_URI`
- **Value:** your MongoDB URL, for example:

```text
mongodb://USERNAME:PASSWORD@HOST:27017/ai-notes-xyz?authSource=admin&directConnection=true
```

Replace `USERNAME`, `PASSWORD`, and `HOST` with your values.

Keep **Available at Buildtime** and **Available at Runtime** checked. Click **Save**.

**MongoDB** is the database. The app will not start without a working URL. Coolify does not create MongoDB for you.

![Add MONGODB_URI](./img-step-7-add-env-mongodb-uri.png)

## 2.8 Check the env is saved {#check-the-env-is-saved}

You should see `MONGODB_URI` in the list. The value is hidden. That is normal.

![Verify MONGODB_URI is saved](./img-step-8-verify-env-mongodb-uri.png)

## 2.9 Deploy and wait {#deploy-and-wait}

Click **Deploy**.

The first build is slow. Coolify clones GitHub, builds the website, then builds the API. Wait until the deploy is green.

If it fails, read the build log. A common cause is a bad `MONGODB_URI`, or a Git clone error.

![Click Deploy](./img-step-9-click-on-deploy.png)

When it is done, **Deployments** should show **Success**, and the app should say **Running**.

![Deployed successfully](./img-step-10-deployed-successfully.png)

## 2.10 Open the live website {#open-the-live-website}

Open your domain in a browser. You should see the AI Notes login page.

Create an account, or log in if you already have one.

![Live website login](./img-step-11-live-website.png)

## 2.11 Add an AI key {#add-an-ai-key}

Go to **Settings → API keys**.

Add a key for chat:

- OpenRouter, or
- Groq, or
- Ollama, or
- an OpenAI-compatible key

Click **Verify and save**. A green **Valid** badge means it worked.

The app is now running. Stop here if you only want notes, tasks, and chat.

![Add an API key in Settings](./img-step-12-add-api-key.png)
