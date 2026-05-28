```md
![CI](https://github.com/danileslie/group2-capstone/actions/workflows/ci.yml/badge.svg)
```


# PeerConnect

A peer study group and resource sharing platform for students. PeerConnect helps students collaborate through study groups, resource sharing, scheduling, and AI-generated quizzes.

## Tech Stack

- **Frontend**: React 18 + Vite (port 5173)
- **Backend**: Node.js + Express (port 5000)
- **Database**: MongoDB (local, `peerconnect` database)
- **Auth**: JWT
- **Deployment**: Docker on EC2

## Project Structure

```
group2-capstone/
├── client/          # React + Vite frontend
│   ├── src/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── vite.config.js
├── server/          # Express backend
│   └── src/
│       ├── app.js
│       ├── db/
│       │   └── connection.js
│       └── routes/
│           └── health.js
├── .env.example
└── package.json     # Root workspace scripts
```

## Quick Start

```bash
# 1. Copy environment variables
cp .env.example server/.env

# 2. Install all dependencies
npm run install:all

# 3. Start both servers
npm run dev
```

## Health Check

```
GET http://localhost:5000/health
→ {"status":"ok","version":"0.1.0"}
```

## Environment Variables

See `.env.example` for all required variables. Copy it to `server/.env` before running.
