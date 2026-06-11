# CLAUDE.md — Project Context

## Project Overview

PeerConnect is a peer study group and resource sharing platform for students. The platform helps students collaborate through study groups, resource sharing, scheduling, and AI-generated quizzes.

## Tech Stack

Frontend: React
Backend: Node.js + Express
Database: MongoDB
Authentication: JWT
Deployment: Docker on EC2

## Architecture Decisions

- React chosen for reusable UI components and fast development
- Node.js + Express chosen for API flexibility and JavaScript consistency
- MongoDB chosen for flexible document storage
- JWT chosen for secure stateless authentication
- Docker on EC2 chosen for deployment consistency

## Epics

1. Authentication & User Profiles
2. Group Management
3. Resource Sharing
4. Search System
5. Study Sessions
6. AI Quiz Generator
7. Group Chat
8. Progress Dashboard
9. Testing & Security
10. Deployment & Documentation

## Coding Conventions

- Use camelCase for variables
- Use PascalCase for React components
- Keep components modular
- Use GitHub pull requests for all changes

## Branch Naming Convention

feature/PROJ-XX-short-description
bugfix/PROJ-XX-short-description

# Examples:
# feature/ETG2-12-user-login
# bugfix/ETG2-31-null-pointer-on-login
# Never push directly to dev or main.

## What Claude Should NOT Do

- Do not install packages without approval
- Do not push directly to main
- Do not modify production configs without confirmation
