import { Task } from '../types';
import TaskCard from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export default function TaskList({ tasks, onToggleComplete, onDelete, onEdit }: TaskListProps) {
  const activeTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  if (tasks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/10 max-w-md mx-auto">
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-2xl font-bold text-white mb-2">No Quests Yet</h3>
          <p className="text-blue-200">Start your journey by creating your first quest!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {activeTasks.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-blue-200 mb-4">
            Active Quests ({activeTasks.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeTasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onDelete={onDelete}
                onEdit={onEdit}
                index={index}
              />
            ))}
          </div>
        </div>
      )}

      {completedTasks.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-green-200 mb-4">
            Completed ({completedTasks.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedTasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onDelete={onDelete}
                onEdit={onEdit}
                index={index}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
