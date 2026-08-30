# TaskTracker Mobile

A clean cross-platform task management application built with **Expo, React Native, TypeScript, and Expo Router**.

## ✨ Features

- Create tasks with a title and description
- Set low, medium, or high priority
- Add optional due dates
- Mark tasks as completed or pending
- Filter tasks by all, pending, or completed
- View task details
- Delete tasks with confirmation
- Productivity statistics and completion rate
- Persistent local task storage
- Android, iOS, and web-ready Expo project structure

## 🛠️ Tech Stack

- React Native
- Expo 54
- TypeScript
- Expo Router
- React Navigation
- AsyncStorage
- Expo Vector Icons

## 📁 Project Structure

```text
app/
├── (tabs)/
│   ├── _layout.tsx
│   ├── index.tsx
│   └── explore.tsx
├── _layout.tsx
├── add-task.tsx
└── task/
    └── [id].tsx

components/
└── TaskCard.tsx

context/
└── TaskContext.tsx

types/
└── task.ts

utils/
└── storage.ts
```

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm
- Expo-compatible development environment

### Installation

```bash
npm install
npx expo start
```

Then use the Expo CLI to open the application on Android, iOS, or the web.

## 📱 Available Scripts

```bash
npm start
npm run android
npm run ios
npm run web
npm run lint
```

## 💾 Data Storage

Tasks are stored locally on the device using **AsyncStorage**, allowing task data to remain available after the application is closed and reopened.

## 🎯 Roadmap

- Task editing UI
- Better date selection with a native date picker
- Categories and tags
- Search and advanced filtering
- Notifications and reminders
- Improved accessibility
- Automated testing
- Production builds and release workflow

## 👨‍💻 Author

**Chanul Dewdisa**

Software Engineer | Full-Stack Developer | AI Researcher | Game Developer

## 📄 License

This project is currently a personal development project. Licensing can be added when the project is prepared for wider distribution.
