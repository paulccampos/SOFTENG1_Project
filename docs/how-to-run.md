# How to Run

## Prerequisites

Install the following before running the project:

- Node.js 18 or newer
- npm
- MongoDB running locally, or a MongoDB connection string

## First-time setup

Open PowerShell in the project root:

```powershell
cd C:\school\softeng1
```

Install backend dependencies:

```powershell
cd backend
npm install
```

Install frontend dependencies:

```powershell
cd ..\frontend
npm install
```

## Configure the backend

Create a local environment file from the safe example:

```powershell
cd ..\backend
Copy-Item .env.example .env
```

Keep `.env` private. It is ignored by Git. Update `MONGODB_URI` in `.env` if MongoDB is not using the default local connection.

## Start the backend

Open a terminal in the project root and run:

```powershell
cd backend
npm run dev
```

The API runs at:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/api/health
```

The backend can start without MongoDB for the health check, but database-backed features require a working MongoDB connection.

## Start the frontend

Open a second terminal and run:

```powershell
cd C:\school\softeng1\frontend
npm run dev
```

Open the URL printed by Vite, normally:

```text
http://localhost:5173
```

## Verify the frontend

Build the frontend for a production check:

```powershell
cd C:\school\softeng1\frontend
npm run build
```

Run the frontend linter:

```powershell
npm run lint
```

## Stop the applications

Press `Ctrl+C` in each terminal running the backend or frontend.

## Security reminder

Do not commit `.env`, API keys, passwords, tokens, private keys, or uploaded photos. Use `.env.example` only for safe placeholder configuration.
