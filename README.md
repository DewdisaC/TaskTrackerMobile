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

</div>

## Overview

TaskTracker Mobile is a clean task-management application designed around fast task creation, prioritisation, progress tracking and persistent local storage.

## Features

- Create, complete and delete tasks
- Low / medium / high priority
- Optional due dates
- Pending / completed filtering
- Task detail screens
- Productivity statistics
- Local persistence with AsyncStorage
- Android, iOS and web-ready Expo structure

## Tech Stack

- React Native
- Expo 54
- TypeScript
- Expo Router
- AsyncStorage
- Expo Vector Icons

## Project Structure

```text
app/
├── (tabs)/
├── add-task.tsx
├── _layout.tsx
└── task/[id].tsx

components/
└── TaskCard.tsx

context/
└── TaskContext.tsx

types/
└── task.ts

utils/
└── storage.ts
```

## Getting Started

```bash
npm install
npx expo start
```

Then launch the project through Expo on Android, iOS or the web.

## Roadmap

- Task editing
- Categories and tags
- Search and advanced filtering
- Notifications and reminders
- Accessibility improvements
- Automated testing
- Production release workflow

## Author

**Chanul Dewdisa**

[GitHub](https://github.com/DewdisaC) • [Portfolio](https://chanul-portfolio-2027.vercel.app/)
