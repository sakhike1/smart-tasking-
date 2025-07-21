import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp,
  Target,
  Zap,
  BarChart3,
  Search,
  Bell,
  X,
  Sparkles,
  Timer,
  Brain,
  Trophy,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { useTaskStore } from '../../stores/taskStore';
import { useAuthStore } from '../../stores/authStore';
import type { NewTask } from '../../stores/taskStore';
import SmartTaskCreator from '../SmartTaskCreator';
import TimeTracker from '../TimeTracker';
import AIProductivityCoach from '../AIProductivityCoach';
import SmartIntegrations from '../SmartIntegrations';
import GoalTracker from '../GoalTracker';
import AdvancedAnalytics from '../AdvancedAnalytics';
import VoiceAssistant from '../VoiceAssistant';
import PredictiveAnalytics from '../PredictiveAnalytics';
import SmartNotifications from '../SmartNotifications';
import GamificationSystem from '../GamificationSystem';
import SimpleDropdown from '../ui/SimpleDropdown';

const Dashboard: React.FC = () => {
  const { addTask, getStats, getUserTasks, getUserStats } = useTaskStore();
  const { user } = useAuthStore();
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);
  const [showSmartCreator, setShowSmartCreator] = useState(false);
  const [showTimeTracker, setShowTimeTracker] = useState(false);
  const [showAICoach, setShowAICoach] = useState(false);
  const [showIntegrations, setShowIntegrations] = useState(false);
  const [showGoalTracker, setShowGoalTracker] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);
  const [showPredictiveAnalytics, setShowPredictiveAnalytics] = useState(false);
  const [showSmartNotifications, setShowSmartNotifications] = useState(false);
  const [showGamification, setShowGamification] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newTask, setNewTask] = useState<NewTask>({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    category: 'Work'
  });

  // Simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Get user-specific tasks
  const userTasks = user?.email ? getUserTasks(user.email) : [];
  const userStats = user?.email ? getUserStats(user.email) : getStats();

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <Loader2 className="w-12 h-12 text-red-400 animate-spin mx-auto mb-4" />
            <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-red-600/20 rounded-full blur-xl"></div>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Loading Dashboard</h2>
          <p className="text-gray-400">Please wait while we fetch your data...</p>
        </div>
      </div>
    );
  }

  const handleAddTask = () => {
    if (!newTask.title.trim() || !newTask.description.trim() || !newTask.dueDate) {
      return;
    }

    addTask(newTask);
    setNewTask({
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium',
      category: 'Work'
    });
    setShowAddTask(false);
  };

  const handleInputChange = (field: keyof NewTask, value: string) => {
    setNewTask(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const filteredTasks = userTasks.filter(task => {
    const matchesFilter = filter === 'all' || task.status === filter;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-500/20';
      case 'in-progress': return 'text-blue-400 bg-blue-500/20';
      case 'pending': return 'text-orange-400 bg-orange-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const formatDate = (date: Date | string) => {
    try {
      const dateObj = date instanceof Date ? date : new Date(date);
      
      // Check if the date is valid
      if (isNaN(dateObj.getTime())) {
        return 'Invalid date';
      }
      
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(dateObj);
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  const isOverdue = (dueDate: Date | string) => {
    try {
      const dateObj = dueDate instanceof Date ? dueDate : new Date(dueDate);
      
      // Check if the date is valid
      if (isNaN(dateObj.getTime())) {
        return false;
      }
      
      return dateObj < new Date();
    } catch (error) {
      console.error('Error checking if overdue:', error);
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Header */}
      <div className="pt-32 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
              <p className="text-gray-300">Welcome back! Here's your task overview</p>
            </div>
                      <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0">
            <button
              onClick={() => setShowSmartCreator(true)}
              className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-500 hover:to-pink-600 transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Sparkles className="mr-2" size={20} />
              Smart Create
            </button>
            <button
              onClick={() => setShowTimeTracker(true)}
              className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-cyan-600 transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Timer className="mr-2" size={20} />
              Time Tracker
            </button>
            <button
              onClick={() => setShowVoiceAssistant(true)}
              className="bg-gradient-to-r from-indigo-400 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-500 hover:to-purple-600 transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Brain className="mr-2" size={20} />
              Voice AI
            </button>
            <button
              onClick={() => setShowAICoach(true)}
              className="bg-gradient-to-r from-green-400 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-500 hover:to-teal-600 transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Brain className="mr-2" size={20} />
              AI Coach
            </button>
            <button
              onClick={() => setShowAddTask(true)}
              className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-500 hover:to-red-600 transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus className="mr-2" size={20} />
              Add Task
            </button>
          </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Tasks</p>
                  <p className="text-3xl font-bold text-white">{userStats.total}</p>
                </div>
                <Target className="text-orange-400" size={24} />
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Pending</p>
                  <p className="text-3xl font-bold text-orange-400">{userStats.pending}</p>
                </div>
                <Clock className="text-orange-400" size={24} />
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">In Progress</p>
                  <p className="text-3xl font-bold text-blue-400">{userStats.inProgress}</p>
                </div>
                <Zap className="text-blue-400" size={24} />
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Completed</p>
                  <p className="text-3xl font-bold text-green-400">{userStats.completed}</p>
                </div>
                <CheckCircle className="text-green-400" size={24} />
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Overdue</p>
                  <p className="text-3xl font-bold text-red-400">{userStats.overdue}</p>
                </div>
                <AlertTriangle className="text-red-400" size={24} />
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Completion</p>
                  <p className="text-3xl font-bold text-purple-400">{userStats.completionRate}%</p>
                </div>
                <TrendingUp className="text-purple-400" size={24} />
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  filter === 'all' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  filter === 'pending' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  filter === 'completed' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                }`}
              >
                Completed
              </button>
            </div>
          </div>

          {/* Tasks List */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700/50 overflow-hidden">
            <div className="p-6 border-b border-gray-700/50">
              <h2 className="text-xl font-semibold text-white">Recent Tasks</h2>
            </div>
            <div className="divide-y divide-gray-700/50">
              {filteredTasks.length === 0 ? (
                <div className="p-8 text-center">
                  <Target className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-gray-400 mb-2">No tasks found</p>
                  {userTasks.length === 0 ? (
                    <div className="mt-4">
                      <p className="text-gray-500 text-sm mb-4">Welcome to TaskSmart! Start by creating your first task.</p>
                      <button
                        onClick={() => setShowAddTask(true)}
                        className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-500 hover:to-red-600 transition-all duration-300 flex items-center mx-auto shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <Plus className="mr-2" size={20} />
                        Create Your First Task
                      </button>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
                  )}
                </div>
              ) : (
                filteredTasks.map((task) => (
                  <div key={task.id} className="p-6 hover:bg-gray-700/30 transition-all duration-300">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">{task.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                            {task.status}
                          </span>
                        </div>
                        <p className="text-gray-300 mb-3">{task.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            <span>Due: {formatDate(task.dueDate)}</span>
                            {isOverdue(task.dueDate) && task.status !== 'completed' && (
                              <span className="text-red-400 ml-1">(Overdue)</span>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <span>Category: {task.category}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-300">
                          <Bell size={16} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-300">
                          <BarChart3 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* AI-Powered Features Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Sparkles className="text-purple-400" size={24} />
              AI-Powered Features
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-gray-700/30 to-gray-800/30 rounded-2xl p-6 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 cursor-pointer"
                   onClick={() => setShowVoiceAssistant(true)}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center">
                    <Brain className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Voice AI Assistant</h3>
                    <p className="text-gray-400 text-sm">Create tasks with natural language</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Speak naturally to create tasks, set reminders, and get AI-powered insights through voice commands.
                </p>
                <div className="flex items-center gap-2 text-indigo-400 text-sm">
                  <ArrowRight size={16} />
                  Try Voice Commands
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-700/30 to-gray-800/30 rounded-2xl p-6 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 cursor-pointer"
                   onClick={() => setShowPredictiveAnalytics(true)}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center">
                    <TrendingUp className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Predictive Analytics</h3>
                    <p className="text-gray-400 text-sm">AI-powered predictions and insights</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Get AI predictions for task completion, optimal work times, and personalized productivity insights.
                </p>
                <div className="flex items-center gap-2 text-blue-400 text-sm">
                  <ArrowRight size={16} />
                  View Predictions
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-700/30 to-gray-800/30 rounded-2xl p-6 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 cursor-pointer"
                   onClick={() => setShowAICoach(true)}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-teal-500 rounded-xl flex items-center justify-center">
                    <Brain className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">AI Productivity Coach</h3>
                    <p className="text-gray-400 text-sm">Get personalized insights and recommendations</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Analyze your patterns, optimize your schedule, and boost productivity with AI-powered insights.
                </p>
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <ArrowRight size={16} />
                  Explore AI Insights
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-700/30 to-gray-800/30 rounded-2xl p-6 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 cursor-pointer"
                   onClick={() => setShowIntegrations(true)}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                    <Zap className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Smart Integrations</h3>
                    <p className="text-gray-400 text-sm">Connect with your favorite tools</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Automate your workflow with Gmail, Calendar, Slack, and 1000+ other integrations.
                </p>
                <div className="flex items-center gap-2 text-blue-400 text-sm">
                  <ArrowRight size={16} />
                  Connect Apps
                </div>
              </div>
            </div>
          </div>

          {/* Goals & Analytics Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Target className="text-yellow-400" size={24} />
              Goals & Analytics
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-gray-700/30 to-gray-800/30 rounded-2xl p-6 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 cursor-pointer"
                   onClick={() => setShowGamification(true)}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                    <Trophy className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Achievements & Rewards</h3>
                    <p className="text-gray-400 text-sm">Level up and unlock achievements</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Earn points, unlock achievements, and compete with yourself to stay motivated and productive.
                </p>
                <div className="flex items-center gap-2 text-yellow-400 text-sm">
                  <ArrowRight size={16} />
                  View Achievements
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-700/30 to-gray-800/30 rounded-2xl p-6 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 cursor-pointer"
                   onClick={() => setShowSmartNotifications(true)}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                    <Bell className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Smart Notifications</h3>
                    <p className="text-gray-400 text-sm">AI-optimized notification timing</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Get notifications at the perfect time based on your productivity patterns and preferences.
                </p>
                <div className="flex items-center gap-2 text-blue-400 text-sm">
                  <ArrowRight size={16} />
                  Manage Notifications
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-700/30 to-gray-800/30 rounded-2xl p-6 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 cursor-pointer"
                   onClick={() => setShowGoalTracker(true)}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-teal-500 rounded-xl flex items-center justify-center">
                    <Target className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Goal Tracker</h3>
                    <p className="text-gray-400 text-sm">Track progress and unlock achievements</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Set goals, build streaks, and earn rewards to stay motivated and productive.
                </p>
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <ArrowRight size={16} />
                  View Goals
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-700/30 to-gray-800/30 rounded-2xl p-6 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 cursor-pointer"
                   onClick={() => setShowAnalytics(true)}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                    <BarChart3 className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Advanced Analytics</h3>
                    <p className="text-gray-400 text-sm">Deep insights into your productivity</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Get detailed analytics, trends, and AI predictions to optimize your workflow.
                </p>
                <div className="flex items-center gap-2 text-purple-400 text-sm">
                  <ArrowRight size={16} />
                  View Analytics
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-black/80 backdrop-blur-xl rounded-3xl p-8 max-w-lg w-full border border-gray-700/50 shadow-2xl relative overflow-hidden">
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-transparent to-black/20 rounded-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">Add New Task</h2>
                  <p className="text-gray-400 text-sm mt-1">Create a new task to boost your productivity</p>
                </div>
                <button
                  onClick={() => setShowAddTask(false)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Task Title</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300 hover:bg-white/15"
                    placeholder="Enter task title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Description</label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={2}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300 resize-none hover:bg-white/15"
                    placeholder="Brief description of the task"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Due Date</label>
                    <div className="relative">
                      <input
                        type="datetime-local"
                        value={newTask.dueDate}
                        onChange={(e) => handleInputChange('dueDate', e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300 hover:bg-white/15"
                      />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Priority</label>
                    <SimpleDropdown
                      value={newTask.priority}
                      onChange={(value) => handleInputChange('priority', value as 'low' | 'medium' | 'high')}
                      options={[
                        { value: 'low', label: 'Low' },
                        { value: 'medium', label: 'Medium' },
                        { value: 'high', label: 'High' }
                      ]}
                      placeholder="Select Priority"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Category</label>
                  <SimpleDropdown
                    value={newTask.category}
                    onChange={(value) => handleInputChange('category', value)}
                    options={[
                      { value: 'Work', label: 'Work' },
                      { value: 'Personal', label: 'Personal' },
                      { value: 'Health', label: 'Health' },
                      { value: 'Finance', label: 'Finance' },
                      { value: 'Learning', label: 'Learning' }
                    ]}
                    placeholder="Select Category"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowAddTask(false)}
                    className="flex-1 px-6 py-3 bg-white/10 backdrop-blur-sm text-gray-300 rounded-xl font-medium hover:bg-white/20 transition-all duration-300 border border-gray-600/50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddTask}
                    disabled={!newTask.title.trim() || !newTask.description.trim() || !newTask.dueDate}
                    className="flex-1 px-6 py-3 bg-white text-black rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Create Task
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Smart Task Creator Modal */}
      {showSmartCreator && (
        <SmartTaskCreator onClose={() => setShowSmartCreator(false)} />
      )}

      {/* Time Tracker Modal */}
      {showTimeTracker && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 border border-gray-700/50 shadow-2xl max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Time Tracker</h2>
              <button
                onClick={() => setShowTimeTracker(false)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-300"
              >
                <X size={20} />
              </button>
            </div>
            <TimeTracker />
          </div>
        </div>
      )}

      {/* AI Productivity Coach Modal */}
      {showAICoach && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 border border-gray-700/50 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">AI Productivity Coach</h2>
              <button
                onClick={() => setShowAICoach(false)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-300"
              >
                <X size={20} />
              </button>
            </div>
            <AIProductivityCoach onClose={() => setShowAICoach(false)} />
          </div>
        </div>
      )}

      {/* Smart Integrations Modal */}
      {showIntegrations && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 border border-gray-700/50 shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Smart Integrations</h2>
              <button
                onClick={() => setShowIntegrations(false)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-300"
              >
                <X size={20} />
              </button>
            </div>
            <SmartIntegrations />
          </div>
        </div>
      )}

      {/* Goal Tracker Modal */}
      {showGoalTracker && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 border border-gray-700/50 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Goals & Achievements</h2>
              <button
                onClick={() => setShowGoalTracker(false)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-300"
              >
                <X size={20} />
              </button>
            </div>
            <GoalTracker />
          </div>
        </div>
      )}

      {/* Advanced Analytics Modal */}
      {showAnalytics && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 border border-gray-700/50 shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Advanced Analytics</h2>
              <button
                onClick={() => setShowAnalytics(false)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-300"
              >
                <X size={20} />
              </button>
            </div>
            <AdvancedAnalytics />
          </div>
        </div>
      )}

      {/* Voice Assistant Modal */}
      {showVoiceAssistant && (
        <VoiceAssistant 
          onClose={() => setShowVoiceAssistant(false)}
          onTaskCreate={(task) => {
            addTask(task);
            setShowVoiceAssistant(false);
          }}
        />
      )}

      {/* Predictive Analytics Modal */}
      {showPredictiveAnalytics && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 border border-gray-700/50 shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Predictive Analytics</h2>
              <button
                onClick={() => setShowPredictiveAnalytics(false)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-300"
              >
                <X size={20} />
              </button>
            </div>
            <PredictiveAnalytics onClose={() => setShowPredictiveAnalytics(false)} />
          </div>
        </div>
      )}

      {/* Smart Notifications Modal */}
      {showSmartNotifications && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 border border-gray-700/50 shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Smart Notifications</h2>
              <button
                onClick={() => setShowSmartNotifications(false)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-300"
              >
                <X size={20} />
              </button>
            </div>
            <SmartNotifications onClose={() => setShowSmartNotifications(false)} />
          </div>
        </div>
      )}

      {/* Gamification System Modal */}
      {showGamification && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 border border-gray-700/50 shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Achievements & Rewards</h2>
              <button
                onClick={() => setShowGamification(false)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-300"
              >
                <X size={20} />
              </button>
            </div>
            <GamificationSystem onClose={() => setShowGamification(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 