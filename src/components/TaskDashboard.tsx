import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { Task, UserStats } from '../types';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import StatsPanel from './StatsPanel';
import { LogOut, Plus } from 'lucide-react';

export default function TaskDashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<UserStats>({
    totalPoints: 0,
    level: 1,
    tasksCompleted: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastCompletedDate: null,
  });
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    const savedTasks = localStorage.getItem(`tasks_${auth.currentUser?.uid}`);
    const savedStats = localStorage.getItem(`stats_${auth.currentUser?.uid}`);

    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedStats) setStats(JSON.parse(savedStats));
  }, []);

  useEffect(() => {
    if (auth.currentUser) {
      localStorage.setItem(`tasks_${auth.currentUser.uid}`, JSON.stringify(tasks));
      localStorage.setItem(`stats_${auth.currentUser.uid}`, JSON.stringify(stats));
    }
  }, [tasks, stats]);

  const calculatePoints = (priority: string): number => {
    switch (priority) {
      case 'high': return 50;
      case 'medium': return 30;
      case 'low': return 10;
      default: return 10;
    }
  };

  const calculateLevel = (points: number): number => {
    return Math.floor(points / 100) + 1;
  };

  const updateStreak = () => {
    const today = new Date().toDateString();
    const lastCompleted = stats.lastCompletedDate
      ? new Date(stats.lastCompletedDate).toDateString()
      : null;

    if (lastCompleted === today) {
      return stats.currentStreak;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    if (lastCompleted === yesterdayStr) {
      return stats.currentStreak + 1;
    }

    return 1;
  };

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'points'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      points: calculatePoints(taskData.priority),
    };
    setTasks([...tasks, newTask]);
    setShowTaskForm(false);
  };

  const updateTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'points'>) => {
    if (!editingTask) return;

    setTasks(tasks.map(task =>
      task.id === editingTask.id
        ? { ...task, ...taskData, points: calculatePoints(taskData.priority) }
        : task
    ));
    setEditingTask(null);
    setShowTaskForm(false);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const wasCompleted = task.completed;
    const newCompleted = !wasCompleted;

    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: newCompleted } : t
    ));

    if (newCompleted && !wasCompleted) {
      const newStreak = updateStreak();
      const newPoints = stats.totalPoints + task.points;
      const newLevel = calculateLevel(newPoints);

      setStats({
        ...stats,
        totalPoints: newPoints,
        level: newLevel,
        tasksCompleted: stats.tasksCompleted + 1,
        currentStreak: newStreak,
        longestStreak: Math.max(stats.longestStreak, newStreak),
        lastCompletedDate: new Date().toISOString(),
      });
    } else if (!newCompleted && wasCompleted) {
      setStats({
        ...stats,
        totalPoints: Math.max(0, stats.totalPoints - task.points),
        tasksCompleted: Math.max(0, stats.tasksCompleted - 1),
      });
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch {
      // Sign out failed; user remains on dashboard
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvZz48L3N2Zz4=')] opacity-20"></div>

      <div className="relative max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Task Quest</h1>
            <p className="text-blue-200">{auth.currentUser?.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all border border-white/20"
            aria-label="Sign out"
          >
            <LogOut className="w-4 h-4" aria-hidden="true" />
            <span>Sign Out</span>
          </button>
        </div>

        <StatsPanel stats={stats} />

        <div className="mt-8 flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Your Quests</h2>
          <button
            onClick={() => {
              setEditingTask(null);
              setShowTaskForm(true);
            }}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
            <span>New Quest</span>
          </button>
        </div>

        <TaskList
          tasks={tasks}
          onToggleComplete={toggleComplete}
          onDelete={deleteTask}
          onEdit={handleEditTask}
        />

        {showTaskForm && (
          <TaskForm
            task={editingTask}
            onSubmit={editingTask ? updateTask : addTask}
            onClose={() => {
              setShowTaskForm(false);
              setEditingTask(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
