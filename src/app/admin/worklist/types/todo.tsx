// types/todo.d.ts
export interface Todo {
    id: number;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    projectName: string;
    category: string;
    dueDate: string;
    createdAt: string;
    type: string;
    status: 'pending' | 'in-progress' | 'completed';
    completed: boolean;
  }
  