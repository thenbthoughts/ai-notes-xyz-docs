---
sidebar_position: 1
---
import GetStartedSection from '@site/src/components/GetStartedSection';

# 🛠️ Easy Install

**Get AI Notes running in 5 minutes.**

All you need is [Docker Desktop](https://www.docker.com/products/docker-desktop/).

## 1. Copy & Paste This

Open your terminal (PowerShell or Bash) and run:

```bash
git clone https://github.com/thenbthoughts/ai-notes-xyz-api.git
cd ai-notes-xyz-api
docker-compose up -d --build
```

**That's it.**
The app will be available at `http://localhost:3000`.

## 2. Configure (Optional)

Once running, visit `http://localhost:3000` and go to **Settings** to:
1.  Add your **OpenRouter, Groq, Ollama or Openai compatible API Key** (for AI chat).
2.  Set your timezone.

---

## 🏗️ Troubleshooting

-   **MongoDB Error?** Ensure port `27017` is free.
-   **Port Conflict?** Change the ports in `docker-compose.yml`.

[👉 Full Config Guide](/docs/selfhost/selfhost-docker-build)

<GetStartedSection />