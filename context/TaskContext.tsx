import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import type { Task, TaskPriority } from '@/types/task';
import { loadTasks, saveTasks } from '@/utils/storage';

type NewTask = Omit<Task, 'id' | 'completed' | 'createdAt'>;

type TaskContextValue = {
  tasks: Task[];
  loading: boolean;
  addTask: (task: NewTask) => void;
  updateTask: (id: string, changes: Partial<NewTask>) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  getTask: (id: string) => Task | undefined;
};

const TaskContext = createContext<TaskContextValue | null>(null);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks().then((saved) => {
      setTasks(saved);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!loading) saveTasks(tasks).catch(() => undefined);
  }, [tasks, loading]);

  const addTask = (task: NewTask) => {
    const newTask: Task = {
      ...task,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((current) => [newTask, ...current]);
  };

  const updateTask = (id: string, changes: Partial<NewTask>) => {
    setTasks((current) => current.map((task) => (task.id === id ? { ...task, ...changes } : task)));
  };

  const toggleTask = (id: string) => {
    setTasks((current) => current.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const deleteTask = (id: string) => {
    setTasks((current) => current.filter((task) => task.id !== id));
  };

  const value = useMemo(
    () => ({ tasks, loading, addTask, updateTask, toggleTask, deleteTask, getTask: (id: string) => tasks.find((task) => task.id === id) }),
    [tasks, loading],
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used inside TaskProvider');
  return context;
}

export const PRIORITIES: TaskPriority[] = ['low', 'medium', 'high'];
