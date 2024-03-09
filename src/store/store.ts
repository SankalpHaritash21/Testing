import create from "zustand";

interface Task {
  id: number;
  text: string;
  isCompleted: boolean;
}

interface TodoState {
  tasks: Task[];
  addTask: (text: string) => void;
  deleteTask: (id: number) => void;
  toggleTaskCompletion: (id: number) => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  tasks: [],
  addTask: (text: string) =>
    set((state) => ({
      tasks: [...state.tasks, { id: Date.now(), text, isCompleted: false }],
    })),
  deleteTask: (id: number) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  toggleTaskCompletion: (id: number) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      ),
    })),
}));
