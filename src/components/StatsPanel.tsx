import { UserStats } from '../types';
import { Trophy, Zap, Flame, Star } from 'lucide-react';

interface StatsPanelProps {
  stats: UserStats;
}

export default function StatsPanel({ stats }: StatsPanelProps) {
  const progressToNextLevel = (stats.totalPoints % 100) / 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-xl rounded-2xl p-6 border border-yellow-500/30 transform hover:scale-105 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-gradient-to-br from-yellow-400 to-orange-400 p-3 rounded-xl">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-white">{stats.level}</div>
            <div className="text-yellow-200 text-sm">Level</div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-yellow-100">
            <span>Progress</span>
            <span>{Math.round(progressToNextLevel * 100)}%</span>
          </div>
          <div className="h-2 bg-yellow-900/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-500 ease-out"
              style={{ width: `${progressToNextLevel * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/30 transform hover:scale-105 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-gradient-to-br from-blue-400 to-cyan-400 p-3 rounded-xl">
            <Star className="w-6 h-6 text-white" />
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-white">{stats.totalPoints}</div>
            <div className="text-blue-200 text-sm">Total XP</div>
          </div>
        </div>
        <div className="text-blue-100 text-sm">
          {100 - (stats.totalPoints % 100)} XP to level {stats.level + 1}
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl rounded-2xl p-6 border border-green-500/30 transform hover:scale-105 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-gradient-to-br from-green-400 to-emerald-400 p-3 rounded-xl">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-white">{stats.tasksCompleted}</div>
            <div className="text-green-200 text-sm">Completed</div>
          </div>
        </div>
        <div className="text-green-100 text-sm">
          Quests conquered
        </div>
      </div>

      <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl p-6 border border-red-500/30 transform hover:scale-105 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-gradient-to-br from-red-400 to-pink-400 p-3 rounded-xl">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-white">{stats.currentStreak}</div>
            <div className="text-red-200 text-sm">Day Streak</div>
          </div>
        </div>
        <div className="text-red-100 text-sm">
          Best: {stats.longestStreak} days
        </div>
      </div>
    </div>
  );
}
