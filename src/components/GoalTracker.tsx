import React, { useState, useEffect } from 'react';
import { 
  Target, 
  Trophy, 
  Award, 
  Star, 
  Zap, 
  TrendingUp,
  Calendar,
  CheckCircle,
  Clock,
  Gift,
  Crown,
  Medal,
  Badge,
  Sparkles,
  ArrowRight,
  Plus,
  Settings,
  BarChart3,
  Activity,
  Flame,
  Sun,
  Moon
} from 'lucide-react';
import { useTaskStore } from '../stores/taskStore';
import { useAuthStore } from '../stores/authStore';

interface Goal {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  deadline: Date;
  category: 'daily' | 'weekly' | 'monthly' | 'custom';
  status: 'active' | 'completed' | 'overdue';
  streak: number;
  reward?: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  unlockedAt?: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  progress?: number;
  maxProgress?: number;
}

interface Streak {
  type: string;
  current: number;
  best: number;
  lastDate: Date;
}

const GoalTracker: React.FC = () => {
  const { getUserTasks } = useTaskStore();
  const { user } = useAuthStore();
  
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Complete 10 Tasks This Week',
      description: 'Maintain high productivity throughout the week',
      target: 10,
      current: 7,
      unit: 'tasks',
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      category: 'weekly',
      status: 'active',
      streak: 3,
      reward: 'Productivity Master Badge'
    },
    {
      id: '2',
      title: 'Maintain 7-Day Streak',
      description: 'Complete at least one task every day',
      target: 7,
      current: 5,
      unit: 'days',
      deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      category: 'daily',
      status: 'active',
      streak: 5
    },
    {
      id: '3',
      title: 'Focus Sessions',
      description: 'Complete 20 focused work sessions',
      target: 20,
      current: 15,
      unit: 'sessions',
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      category: 'custom',
      status: 'active',
      streak: 2,
      reward: 'Focus Champion Trophy'
    }
  ]);

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first task',
      icon: <Star className="text-yellow-400" size={20} />,
      unlocked: true,
      unlockedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      rarity: 'common'
    },
    {
      id: '2',
      title: 'Streak Master',
      description: 'Maintain a 7-day task completion streak',
      icon: <Flame className="text-orange-400" size={20} />,
      unlocked: false,
      rarity: 'rare',
      progress: 5,
      maxProgress: 7
    },
    {
      id: '3',
      title: 'Productivity Guru',
      description: 'Complete 50 tasks in a month',
      icon: <Trophy className="text-yellow-500" size={20} />,
      unlocked: false,
      rarity: 'epic',
      progress: 23,
      maxProgress: 50
    },
    {
      id: '4',
      title: 'Early Bird',
      description: 'Complete 5 tasks before 9 AM',
      icon: <Sun className="text-yellow-400" size={20} />,
      unlocked: false,
      rarity: 'common',
      progress: 2,
      maxProgress: 5
    },
    {
      id: '5',
      title: 'Night Owl',
      description: 'Complete 10 tasks after 8 PM',
      icon: <Moon className="text-blue-400" size={20} />,
      unlocked: false,
      rarity: 'common',
      progress: 7,
      maxProgress: 10
    },
    {
      id: '6',
      title: 'Speed Demon',
      description: 'Complete 3 tasks in under 30 minutes',
      icon: <Zap className="text-purple-400" size={20} />,
      unlocked: false,
      rarity: 'rare',
      progress: 1,
      maxProgress: 3
    },
    {
      id: '7',
      title: 'Consistency King',
      description: 'Complete tasks for 30 consecutive days',
      icon: <Crown className="text-yellow-500" size={20} />,
      unlocked: false,
      rarity: 'legendary',
      progress: 12,
      maxProgress: 30
    }
  ]);

  const [streaks, setStreaks] = useState<Streak[]>([
    {
      type: 'Daily Tasks',
      current: 5,
      best: 12,
      lastDate: new Date()
    },
    {
      type: 'Weekly Goals',
      current: 3,
      best: 8,
      lastDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      type: 'Focus Sessions',
      current: 2,
      best: 5,
      lastDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    }
  ]);

  const [showAddGoal, setShowAddGoal] = useState(false);
  const [currentView, setCurrentView] = useState<'goals' | 'achievements' | 'streaks'>('goals');

  const userTasks = user?.email ? getUserTasks(user.email) : [];

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getGoalStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-500/20';
      case 'overdue': return 'text-red-400 bg-red-500/20';
      case 'active': return 'text-blue-400 bg-blue-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30';
      case 'epic': return 'from-purple-500/20 to-pink-500/20 border-purple-500/30';
      case 'rare': return 'from-blue-500/20 to-cyan-500/20 border-blue-500/30';
      case 'common': return 'from-gray-500/20 to-gray-600/20 border-gray-500/30';
      default: return 'from-gray-500/20 to-gray-600/20 border-gray-500/30';
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return <Crown className="text-yellow-500" size={16} />;
      case 'epic': return <Trophy className="text-purple-400" size={16} />;
      case 'rare': return <Star className="text-blue-400" size={16} />;
      case 'common': return <Badge className="text-gray-400" size={16} />;
      default: return <Badge className="text-gray-400" size={16} />;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const getDaysRemaining = (deadline: Date) => {
    const diff = deadline.getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
            <Target className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Goals & Achievements</h2>
            <p className="text-gray-400 text-sm">Track your progress and unlock achievements</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddGoal(true)}
          className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl font-medium hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 flex items-center gap-2"
        >
          <Plus size={16} />
          Add Goal
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-gray-700/50 rounded-xl p-1 mb-8">
        <button
          onClick={() => setCurrentView('goals')}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            currentView === 'goals' 
              ? 'bg-yellow-500 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          <Target className="inline mr-2" size={16} />
          Goals
        </button>
        <button
          onClick={() => setCurrentView('achievements')}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            currentView === 'achievements' 
              ? 'bg-yellow-500 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          <Trophy className="inline mr-2" size={16} />
          Achievements
        </button>
        <button
          onClick={() => setCurrentView('streaks')}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            currentView === 'streaks' 
              ? 'bg-yellow-500 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          <Flame className="inline mr-2" size={16} />
          Streaks
        </button>
      </div>

      {/* Goals View */}
      {currentView === 'goals' && (
        <div className="space-y-6">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className="bg-gradient-to-br from-gray-700/30 to-gray-800/30 rounded-2xl p-6 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{goal.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGoalStatusColor(goal.status)}`}>
                      {goal.status}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">{goal.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>Due: {formatDate(goal.deadline)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame size={14} />
                      <span>Streak: {goal.streak} days</span>
                    </div>
                    {goal.reward && (
                      <div className="flex items-center gap-1">
                        <Gift size={14} />
                        <span>Reward: {goal.reward}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-300">
                    {goal.current} / {goal.target} {goal.unit}
                  </span>
                  <span className="text-gray-400">
                    {Math.round(getProgressPercentage(goal.current, goal.target))}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${getProgressPercentage(goal.current, goal.target)}%` }}
                  ></div>
                </div>
              </div>

              {/* Days Remaining */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <Clock size={14} className="text-gray-400" />
                  <span className="text-gray-300">
                    {getDaysRemaining(goal.deadline)} days remaining
                  </span>
                </div>
                <button className="px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-xl hover:bg-yellow-500/30 transition-all duration-300">
                  Update Progress
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Achievements View */}
      {currentView === 'achievements' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`bg-gradient-to-br ${getRarityColor(achievement.rarity)} rounded-2xl p-6 border shadow-lg ${
                achievement.unlocked ? 'opacity-100' : 'opacity-60'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {achievement.icon}
                  <div>
                    <h4 className="text-white font-semibold">{achievement.title}</h4>
                    <p className="text-gray-300 text-sm">{achievement.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {getRarityIcon(achievement.rarity)}
                  <span className="text-xs text-gray-400 capitalize">{achievement.rarity}</span>
                </div>
              </div>

              {achievement.unlocked ? (
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <CheckCircle size={16} />
                  Unlocked {achievement.unlockedAt && formatDate(achievement.unlockedAt)}
                </div>
              ) : (
                <div className="space-y-2">
                  {achievement.progress !== undefined && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">Progress</span>
                      <span className="text-gray-400">
                        {achievement.progress} / {achievement.maxProgress}
                      </span>
                    </div>
                  )}
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: achievement.progress && achievement.maxProgress 
                          ? `${(achievement.progress / achievement.maxProgress) * 100}%` 
                          : '0%' 
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Streaks View */}
      {currentView === 'streaks' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl p-6 border border-orange-500/30">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Flame className="text-orange-400" size={20} />
              Your Streaks
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {streaks.map((streak, index) => (
                <div key={index} className="bg-white/10 rounded-xl p-4 text-center">
                  <h4 className="text-white font-medium mb-2">{streak.type}</h4>
                  <div className="text-3xl font-bold text-orange-400 mb-1">
                    {streak.current}
                  </div>
                  <div className="text-sm text-gray-300 mb-2">Current Streak</div>
                  <div className="text-sm text-gray-400">
                    Best: {streak.best} days
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="text-purple-400" size={20} />
              Streak Insights
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl">
                <div>
                  <h4 className="text-white font-medium">Longest Streak</h4>
                  <p className="text-gray-300 text-sm">Daily Tasks - 12 days</p>
                </div>
                <div className="text-2xl font-bold text-purple-400">12</div>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl">
                <div>
                  <h4 className="text-white font-medium">Total Streaks</h4>
                  <p className="text-gray-300 text-sm">Combined across all categories</p>
                </div>
                <div className="text-2xl font-bold text-purple-400">20</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalTracker; 