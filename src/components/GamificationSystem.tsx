import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Star, 
  Zap, 
  Target, 
  Flame, 
  Crown,
  Medal,
  Award,
  TrendingUp,
  Calendar,
  Clock,
  CheckCircle,
  Gift,
  Sparkles,
  Brain,
  Rocket
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GamificationSystemProps {
  onClose: () => void;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'productivity' | 'consistency' | 'milestone' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  unlockedAt?: Date;
  points: number;
}

interface UserStats {
  level: number;
  experience: number;
  experienceToNext: number;
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  tasksCompleted: number;
  achievementsUnlocked: number;
  rank: string;
  badges: string[];
}

const GamificationSystem: React.FC<GamificationSystemProps> = ({ onClose }) => {
  const [userStats, setUserStats] = useState<UserStats>({
    level: 15,
    experience: 1250,
    experienceToNext: 1500,
    totalPoints: 2840,
    currentStreak: 7,
    longestStreak: 23,
    tasksCompleted: 156,
    achievementsUnlocked: 12,
    rank: 'Productivity Master',
    badges: ['Early Bird', 'Night Owl', 'Weekend Warrior', 'Consistency King']
  });

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first task',
      icon: '🎯',
      category: 'milestone',
      rarity: 'common',
      progress: 1,
      maxProgress: 1,
      unlocked: true,
      unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      points: 10
    },
    {
      id: '2',
      title: 'Streak Master',
      description: 'Maintain a 7-day task completion streak',
      icon: '🔥',
      category: 'consistency',
      rarity: 'rare',
      progress: 7,
      maxProgress: 7,
      unlocked: true,
      unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      points: 50
    },
    {
      id: '3',
      title: 'Speed Demon',
      description: 'Complete 10 tasks in a single day',
      icon: '⚡',
      category: 'productivity',
      rarity: 'epic',
      progress: 8,
      maxProgress: 10,
      unlocked: false,
      points: 100
    },
    {
      id: '4',
      title: 'Century Club',
      description: 'Complete 100 tasks',
      icon: '🏆',
      category: 'milestone',
      rarity: 'rare',
      progress: 156,
      maxProgress: 100,
      unlocked: true,
      unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
      points: 200
    },
    {
      id: '5',
      title: 'Early Bird',
      description: 'Complete 5 tasks before 9 AM',
      icon: '🌅',
      category: 'productivity',
      rarity: 'common',
      progress: 3,
      maxProgress: 5,
      unlocked: false,
      points: 25
    },
    {
      id: '6',
      title: 'AI Collaborator',
      description: 'Use AI features 50 times',
      icon: '🤖',
      category: 'special',
      rarity: 'epic',
      progress: 42,
      maxProgress: 50,
      unlocked: false,
      points: 150
    },
    {
      id: '7',
      title: 'Perfect Week',
      description: 'Complete all planned tasks for 7 consecutive days',
      icon: '⭐',
      category: 'consistency',
      rarity: 'legendary',
      progress: 5,
      maxProgress: 7,
      unlocked: false,
      points: 500
    },
    {
      id: '8',
      title: 'Task Architect',
      description: 'Create 50 tasks with detailed descriptions',
      icon: '🏗️',
      category: 'productivity',
      rarity: 'rare',
      progress: 47,
      maxProgress: 50,
      unlocked: false,
      points: 75
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);
  const [recentUnlock, setRecentUnlock] = useState<Achievement | null>(null);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-400 border-gray-400';
      case 'rare': return 'text-blue-400 border-blue-400';
      case 'epic': return 'text-purple-400 border-purple-400';
      case 'legendary': return 'text-yellow-400 border-yellow-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getRarityBg = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500/10';
      case 'rare': return 'bg-blue-500/10';
      case 'epic': return 'bg-purple-500/10';
      case 'legendary': return 'bg-yellow-500/10';
      default: return 'bg-gray-500/10';
    }
  };

  const getRankColor = (rank: string) => {
    if (rank.includes('Master')) return 'text-yellow-400';
    if (rank.includes('Expert')) return 'text-purple-400';
    if (rank.includes('Pro')) return 'text-blue-400';
    return 'text-green-400';
  };

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  const progressPercentage = (userStats.experience / userStats.experienceToNext) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center">
              <Trophy className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Achievements & Rewards</h1>
              <p className="text-gray-400">Level up your productivity game</p>
            </div>
          </div>
        </div>

        {/* User Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {/* Level Card */}
          <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl p-6 border border-yellow-500/30">
            <div className="flex items-center justify-between mb-4">
              <Crown className="text-yellow-400" size={24} />
              <span className="text-yellow-400 font-bold text-2xl">Lv.{userStats.level}</span>
            </div>
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300">Experience</span>
                <span className="text-white">{userStats.experience}/{userStats.experienceToNext}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full"
                />
              </div>
            </div>
            <p className="text-gray-300 text-sm">Next level in {userStats.experienceToNext - userStats.experience} XP</p>
          </div>

          {/* Streak Card */}
          <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-2xl p-6 border border-red-500/30">
            <div className="flex items-center justify-between mb-4">
              <Flame className="text-red-400" size={24} />
              <span className="text-red-400 font-bold text-2xl">{userStats.currentStreak}</span>
            </div>
            <p className="text-white font-medium mb-2">Day Streak</p>
            <p className="text-gray-300 text-sm">Longest: {userStats.longestStreak} days</p>
          </div>

          {/* Points Card */}
          <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-6 border border-blue-500/30">
            <div className="flex items-center justify-between mb-4">
              <Star className="text-blue-400" size={24} />
              <span className="text-blue-400 font-bold text-2xl">{userStats.totalPoints}</span>
            </div>
            <p className="text-white font-medium mb-2">Total Points</p>
            <p className="text-gray-300 text-sm">{userStats.achievementsUnlocked} achievements</p>
          </div>

          {/* Rank Card */}
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30">
            <div className="flex items-center justify-between mb-4">
              <Medal className="text-purple-400" size={24} />
              <span className={`font-bold text-lg ${getRankColor(userStats.rank)}`}>{userStats.rank}</span>
            </div>
            <p className="text-white font-medium mb-2">Current Rank</p>
            <p className="text-gray-300 text-sm">{userStats.tasksCompleted} tasks completed</p>
          </div>
        </motion.div>

        {/* Badges Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50"
        >
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Award className="text-yellow-400" size={20} />
            Your Badges
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {userStats.badges.map((badge, index) => (
              <motion.div
                key={badge}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-gradient-to-br from-gray-700/30 to-gray-800/30 rounded-xl p-4 border border-gray-600/30 text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Trophy className="text-white" size={20} />
                </div>
                <p className="text-white text-sm font-medium">{badge}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Sparkles className="text-purple-400" size={20} />
              Achievements
            </h2>
            <div className="flex gap-2">
              {['all', 'productivity', 'consistency', 'milestone', 'special'].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {filteredAchievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`p-4 rounded-xl border-2 ${getRarityColor(achievement.rarity)} ${getRarityBg(achievement.rarity)} ${
                    achievement.unlocked ? 'ring-2 ring-yellow-400/30' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-white font-medium">{achievement.title}</h3>
                        <span className="text-yellow-400 text-sm font-bold">{achievement.points} pts</span>
                      </div>
                      <p className="text-gray-300 text-sm mb-3">{achievement.description}</p>
                      
                      {achievement.unlocked ? (
                        <div className="flex items-center gap-2 text-green-400 text-sm">
                          <CheckCircle size={14} />
                          <span>Unlocked {achievement.unlockedAt && formatTimeAgo(achievement.unlockedAt)}</span>
                        </div>
                      ) : (
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Progress</span>
                            <span className="text-white">{achievement.progress}/{achievement.maxProgress}</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                              transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                              className="bg-gradient-to-r from-purple-400 to-blue-400 h-2 rounded-full"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50"
        >
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="text-green-400" size={20} />
            Recent Activity
          </h2>
          
          <div className="space-y-4">
            {[
              { action: 'Completed task "Review project proposal"', points: 10, time: '2 hours ago' },
              { action: 'Unlocked achievement "Streak Master"', points: 50, time: '3 days ago' },
              { action: 'Reached level 15', points: 100, time: '1 week ago' },
              { action: 'Completed 100 tasks milestone', points: 200, time: '1 week ago' }
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-center justify-between bg-gray-800/30 rounded-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                    <Star className="text-white" size={14} />
                  </div>
                  <div>
                    <p className="text-white text-sm">{activity.action}</p>
                    <p className="text-gray-400 text-xs">{activity.time}</p>
                  </div>
                </div>
                <span className="text-yellow-400 font-bold">+{activity.points}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Achievement Unlock Animation */}
      <AnimatePresence>
        {showUnlockAnimation && recentUnlock && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, rotate: 180 }}
              className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-3xl p-8 border-2 border-yellow-400/50 text-center max-w-md mx-4"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 0.5, repeat: 2 }}
                className="text-6xl mb-4"
              >
                {recentUnlock.icon}
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-2">Achievement Unlocked!</h3>
              <p className="text-yellow-400 font-semibold mb-2">{recentUnlock.title}</p>
              <p className="text-gray-300 mb-4">{recentUnlock.description}</p>
              <div className="text-yellow-400 font-bold text-xl">+{recentUnlock.points} Points</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  return `${Math.floor(days / 30)} months ago`;
};

export default GamificationSystem; 