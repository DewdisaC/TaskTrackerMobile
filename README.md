# TaskTracker Mobile

<p align="center">
  <img src="./assets/banner.svg" alt="TaskTracker Mobile banner" width="100%">
</p>

<p align="center">
  Cross-platform task management built with React Native, Expo and TypeScript.
</p>

<div align="center">

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![CI](https://img.shields.io/github/actions/workflow/status/DewdisaC/TaskTrackerMobile/quality.yml?branch=master&style=for-the-badge&label=quality)

</div>

## Overview

TaskTracker Mobile is a polished cross-platform productivity app focused on practical mobile engineering: task creation, editing, priorities, due dates, completion workflows, local persistence and productivity analytics.

The project demonstrates **React Native architecture, typed state management, navigation, reusable components and automated quality checks** rather than a simple UI mock-up.

## Features

- Create, edit, complete and delete tasks
- Low / medium / high priority
- Optional due dates with input validation
- Pending / completed filtering
- Task detail screens
- Productivity statistics and completion rate
- Local persistence with AsyncStorage
- Responsive Expo Router navigation
- Native-friendly interactions and confirmation flows
- TypeScript strict mode
- Automated lint and typecheck workflow

## Tech Stack

- React Native
- Expo 54
- TypeScript
- Expo Router
- AsyncStorage
- Expo Vector Icons
- ESLint
- GitHub Actions

## Architecture

```text
app/
├── (tabs)/
│   ├── index.tsx
│   └── explore.tsx
├── add-task.tsx
├── edit-task/[id].tsx
├── task/[id].tsx
└── _layout.tsx

components/
└── TaskCard.tsx

context/
└── TaskContext.tsx

types/
└── task.ts

utils/
└── storage.ts

.github/
└── workflows/
    └── quality.yml
```

## Getting Started

Requirements:

- Node.js 20+
- npm
- Expo-compatible Android/iOS environment, or a web browser for the web target

Install dependencies and start the project:

```bash
npm install
npx expo start
```

Quality checks:

```bash
npm run lint
npm run typecheck
```

## Engineering Notes

The application keeps task state behind a typed React Context and persists it through a small storage abstraction. Task IDs, creation timestamps and completion state are managed centrally so screens remain focused on presentation and user interaction.

The repository also includes a GitHub Actions workflow that runs linting and TypeScript checks on pushes and pull requests.

## Project Status

**Active portfolio project — core feature set implemented.**

Future enhancements can be added without changing the current core workflow, such as cloud sync, authentication, notifications and shared task lists.

## Author

**Chanul Dewdisa**

[GitHub](https://github.com/DewdisaC) • [Portfolio](https://chanul-portfolio-2027.vercel.app/)
