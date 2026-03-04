import { useState } from 'react';
import { Task } from '../types';
import { CheckCircle2, Circle, Trash2, Edit, Calendar, Tag, Sparkles } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  index: number;
}

export default function TaskCard({ task, onToggleComplete, onDelete, onEdit, index }: TaskCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const priorityColors = {
    low: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
    medium: 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30',
    high: 'from-red-500/20 to-pink-500/20 border-red-500/30',
  };

  const priorityBadgeColors = {
    low: 'bg-green-500/20 text-green-200 border-green-500/30',
    medium: 'bg-yellow-500/20 text-yellow-200 border-yellow-500/30',
    high: 'bg-red-500/20 text-red-200 border-red-500/30',
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => onDelete(task.id), 300);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div
      className={`bg-gradient-to-br ${priorityColors[task.priority]} backdrop-blur-xl rounded-2xl p-6 border transition-all duration-300 ${
        isDeleting ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
      } ${task.completed ? 'opacity-60' : 'hover:scale-105 hover:shadow-2xl'}`}
      style={{
        animationDelay: `${index * 50}ms`,
        animation: 'slideIn 0.3s ease-out forwards',
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <button
          onClick={() => onToggleComplete(task.id)}
          className="flex-shrink-0 transition-all duration-200 hover:scale-110"
          aria-label={task.completed ? 'Mark quest incomplete' : 'Mark quest complete'}
        >
          {task.completed ? (
            <CheckCircle2 className="w-6 h-6 text-green-400" aria-hidden="true" />
          ) : (
            <Circle className="w-6 h-6 text-blue-300 hover:text-blue-400" aria-hidden="true" />
          )}
        </button>

        <div className="flex space-x-2 ml-auto">
          {!task.completed && (
            <button
              onClick={() => onEdit(task)}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
              aria-label="Edit quest"
            >
              <Edit className="w-4 h-4 text-blue-300" aria-hidden="true" />
            </button>
          )}
          <button
            onClick={handleDelete}
            className="p-2 bg-white/10 hover:bg-red-500/20 rounded-lg transition-all"
            aria-label="Delete quest"
          >
            <Trash2 className="w-4 h-4 text-red-300" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h3 className={`text-lg font-semibold text-white mb-2 ${task.completed ? 'line-through' : ''}`}>
          {task.title}
        </h3>
        {task.description && (
          <p className={`text-sm text-blue-200 ${task.completed ? 'line-through' : ''}`}>
            {task.description}
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${priorityBadgeColors[task.priority]}`}>
          {task.priority.toUpperCase()}
        </span>
        {task.category && (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-200 border border-blue-500/30 flex items-center space-x-1">
            <Tag className="w-3 h-3" />
            <span>{task.category}</span>
          </span>
        )}
        {task.dueDate && (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-200 border border-cyan-500/30 flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(task.dueDate)}</span>
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span className="text-yellow-400 font-bold text-sm">{task.points} XP</span>
        </div>
        {task.completed && (
          <span className="text-green-400 text-xs font-semibold">COMPLETED</span>
        )}
      </div>
    </div>
  );
}
