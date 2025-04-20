# How to Self-Host AI Notes Locally

Follow these steps to set up AI Notes on your local machine:

## Prerequisites
1. Install [Git](https://git-scm.com/).
2. Install [Node.js](https://nodejs.org/) (LTS version recommended).
3. Install [npm](https://www.npmjs.com/) (comes with Node.js).
4. Install [MongoDB](https://www.mongodb.com/try/download/community) and ensure it is running locally.

## Steps to Self-Host

### Step 1: Client side

1. **Clone the Repository**  
Open your terminal and run:
```bash
git clone https://github.com/thenbthoughts/ai-notes-client.git
```

This will download the AI Notes code to your computer.

2. **Navigate to the Project Folder**  
Move into the project directory:

```bash
cd ai-notes-client
```

3. **Create env file**  
create a file `.env`
```bash
VITE_API_URL="http://localhost:3000"
```

4. **Install Dependencies**  
Install the required packages:
```bash
npm install
```

5. **Start the Application**  
Run the app locally:
```bash
npm start
```

This will start the development server. Open your browser and go to:

```bash
http://localhost:3000
```

### Step 2: API Side

1. **Clone the API Repository**  
Open your terminal and run:
```bash
git clone https://github.com/thenbthoughts/ai-notes-api.git
```
This will download the API code to your computer.

2. **Navigate to the API Folder**  
Move into the project directory:
```bash
cd ai-notes-api
```

3. **Create an Environment File**  
Create a file named .env in the project folder and add the following:
```bash
CUSTOM_NODE_ENV=prod
EXPRESS_PORT=2000
FRONTEND_CLIENT_URL="localhost:3000"
MONGODB_URI="mongodb://localhost:27017/ai-notes-advance"
```

4. **Install Dependencies**  
Install the required packages:
```bash
npm install
```

4. **Start the API Server**
Run the API server locally:
```bash
npm start
```

The API server will start on http://localhost:2000.

## You're All Set!
You can now use AI Notes locally on your machine.

For any issues, refer to the GitHub repository.