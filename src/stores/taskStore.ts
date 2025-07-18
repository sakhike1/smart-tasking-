import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useAuthStore } from './authStore';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  category: string;
  assignedTo?: string;
  tags: string[];
  reminder: Date;
  createdAt: Date;
  completedAt?: Date;
  userEmail: string;
  // New fields for enhanced features
  recurring?: {
    type: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number;
    endDate?: Date;
  };
  timeEstimate?: number; // in minutes
  actualTime?: number; // in minutes
  attachments?: string[];
  comments?: Array<{
    id: string;
    text: string;
    author: string;
    timestamp: Date;
  }>;
  dependencies?: string[]; // IDs of tasks this task depends on
}

export interface NewTask {
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
  assignedTo?: string;
  tags?: string[];
  reminder?: string;
}

interface TaskStore {
  tasks: Task[];
  addTask: (task: NewTask) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  updateTaskStatus: (id: string, status: Task['status']) => void;
  getTaskById: (id: string) => Task | undefined;
  getTasksByStatus: (status: Task['status']) => Task[];
  getTasksByPriority: (priority: Task['priority']) => Task[];
  getTasksByCategory: (category: string) => Task[];
  getOverdueTasks: () => Task[];
  getCompletionRate: () => number;
  getStats: () => {
    total: number;
    pending: number;
    inProgress: number;
    completed: number;
    overdue: number;
    completionRate: number;
  };
  getUserTasks: (userEmail: string) => Task[];
  getUserStats: (userEmail: string) => {
    total: number;
    pending: number;
    inProgress: number;
    completed: number;
    overdue: number;
    completionRate: number;
  };
}

// Initialize with empty tasks - users will create their own tasks
const initialTasks: Task[] = [];

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: initialTasks,

      addTask: (newTask: NewTask) => {
        // Get current user email from auth store
        const userEmail = useAuthStore.getState().user?.email;
        if (!userEmail) {
          console.error('No user email found. Cannot create task.');
          return;
        }

        const task: Task = {
          id: Date.now().toString(),
          title: newTask.title,
          description: newTask.description,
          dueDate: new Date(newTask.dueDate),
          priority: newTask.priority,
          status: 'pending',
          category: newTask.category,
          assignedTo: newTask.assignedTo,
          tags: newTask.tags || [],
          reminder: newTask.reminder ? new Date(newTask.reminder) : new Date(Date.now() + 24 * 60 * 60 * 1000),
          createdAt: new Date(),
          userEmail: userEmail
        };

        set((state) => ({
          tasks: [task, ...state.tasks]
        }));
      },

      updateTask: (id: string, updates: Partial<Task>) => {
        set((state) => ({
          tasks: state.tasks.map(task =>
            task.id === id ? { ...task, ...updates } : task
          )
        }));
      },

      deleteTask: (id: string) => {
        set((state) => ({
          tasks: state.tasks.filter(task => task.id !== id)
        }));
      },

      updateTaskStatus: (id: string, status: Task['status']) => {
        set((state) => ({
          tasks: state.tasks.map(task =>
            task.id === id
              ? {
                  ...task,
                  status,
                  completedAt: status === 'completed' ? new Date() : undefined
                }
              : task
          )
        }));
      },

      getTaskById: (id: string) => {
        return get().tasks.find(task => task.id === id);
      },

      getTasksByStatus: (status: Task['status']) => {
        return get().tasks.filter(task => task.status === status);
      },

      getTasksByPriority: (priority: Task['priority']) => {
        return get().tasks.filter(task => task.priority === priority);
      },

      getTasksByCategory: (category: string) => {
        return get().tasks.filter(task => task.category === category);
      },

      getOverdueTasks: () => {
        return get().tasks.filter(task => 
          task.dueDate < new Date() && task.status !== 'completed'
        );
      },

      getCompletionRate: () => {
        const tasks = get().tasks;
        if (tasks.length === 0) return 0;
        return Math.round((tasks.filter(task => task.status === 'completed').length / tasks.length) * 100);
      },

      getStats: () => {
        const tasks = get().tasks;
        return {
          total: tasks.length,
          pending: tasks.filter(t => t.status === 'pending').length,
          inProgress: tasks.filter(t => t.status === 'in-progress').length,
          completed: tasks.filter(t => t.status === 'completed').length,
          overdue: tasks.filter(t => t.dueDate < new Date() && t.status !== 'completed').length,
          completionRate: tasks.length > 0 ? Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100) : 0
        };
      },

      getUserTasks: (userEmail: string) => {
        return get().tasks.filter(task => task.userEmail === userEmail);
      },

      getUserStats: (userEmail: string) => {
        const userTasks = get().tasks.filter(task => task.userEmail === userEmail);
        return {
          total: userTasks.length,
          pending: userTasks.filter(t => t.status === 'pending').length,
          inProgress: userTasks.filter(t => t.status === 'in-progress').length,
          completed: userTasks.filter(t => t.status === 'completed').length,
          overdue: userTasks.filter(t => t.dueDate < new Date() && t.status !== 'completed').length,
          completionRate: userTasks.length > 0 ? Math.round((userTasks.filter(t => t.status === 'completed').length / userTasks.length) * 100) : 0
        };
      }
    }),
    {
      name: 'task-storage',
      partialize: (state) => ({ tasks: state.tasks }),
      // Custom deserializer to convert date strings back to Date objects
      onRehydrateStorage: () => (state) => {
        if (state && state.tasks) {
          state.tasks = state.tasks.map(task => ({
            ...task,
            dueDate: new Date(task.dueDate),
            reminder: new Date(task.reminder),
            createdAt: new Date(task.createdAt),
            completedAt: task.completedAt ? new Date(task.completedAt) : undefined
          }));
        }
      },
    }
  )
); 