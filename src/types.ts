export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
  dueDate: string | null;
  createdAt: string;
  points: number;
}

export interface UserStats {
  totalPoints: number;
  level: number;
  tasksCompleted: number;
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate: string | null;
}
