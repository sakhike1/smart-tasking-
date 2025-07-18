import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Target,
  BarChart3,
  PieChart,
  Activity,
  Users,
  Zap,
  Award
} from 'lucide-react';
import { useTaskStore } from '../../stores/taskStore';
import { useAuthStore } from '../../stores/authStore';
import type { Task } from '../../stores/taskStore';

const Analytics: React.FC = () => {
  const { getUserTasks } = useTaskStore();
  const { user } = useAuthStore();
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter'>('month');

  // Get user-specific tasks
  const tasks = user?.email ? getUserTasks(user.email) : [];

  // Calculate analytics
  const analytics = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    overdue: tasks.filter(t => t.dueDate < new Date() && t.status !== 'completed').length,
    completionRate: tasks.length > 0 ? Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100) : 0,
    averageCompletionTime: calculateAverageCompletionTime(),
    productivityScore: calculateProductivityScore(),
    categoryBreakdown: getCategoryBreakdown(),
    priorityBreakdown: getPriorityBreakdown(),
    weeklyProgress: getWeeklyProgress()
  };

  function calculateAverageCompletionTime() {
    const completedTasks = tasks.filter(t => t.status === 'completed' && t.completedAt);
    if (completedTasks.length === 0) return 0;
    
    const totalTime = completedTasks.reduce((sum, task) => {
      const completionTime = task.completedAt!.getTime() - task.createdAt.getTime();
      return sum + completionTime;
    }, 0);
    
    return Math.round(totalTime / completedTasks.length / (1000 * 60 * 60 * 24)); // Days
  }

  function calculateProductivityScore() {
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const totalTasks = tasks.length;
    const onTimeTasks = tasks.filter(t => 
      t.status === 'completed' && 
      t.completedAt && 
      t.completedAt <= t.dueDate
    ).length;
    
    if (totalTasks === 0) return 0;
    
    const completionScore = (completedTasks / totalTasks) * 50;
    const timelinessScore = (onTimeTasks / totalTasks) * 50;
    
    return Math.round(completionScore + timelinessScore);
  }

  function getCategoryBreakdown() {
    const categories = tasks.reduce((acc, task) => {
      acc[task.category] = (acc[task.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(categories).map(([category, count]) => ({
      category,
      count,
      percentage: Math.round((count / tasks.length) * 100)
    }));
  }

  function getPriorityBreakdown() {
    const priorities = tasks.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(priorities).map(([priority, count]) => ({
      priority,
      count,
      percentage: Math.round((count / tasks.length) * 100)
    }));
  }

  function getWeeklyProgress() {
    const now = new Date();
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const weeklyTasks = tasks.filter(task => 
      task.createdAt >= weekStart || 
      (task.completedAt && task.completedAt >= weekStart)
    );
    
    return {
      created: weeklyTasks.length,
      completed: weeklyTasks.filter(t => t.status === 'completed').length,
      pending: weeklyTasks.filter(t => t.status === 'pending').length
    };
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Header */}
      <div className="pt-32 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Analytics & Insights</h1>
              <p className="text-gray-300">Track your productivity and task performance</p>
            </div>
            <div className="flex gap-2 mt-4 sm:mt-0">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as any)}
                className="px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
              </select>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-6 border border-blue-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm">Productivity Score</p>
                  <p className="text-3xl font-bold text-white">{analytics.productivityScore}%</p>
                </div>
                <Award className="text-blue-400" size={24} />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-2xl p-6 border border-green-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm">Completion Rate</p>
                  <p className="text-3xl font-bold text-white">{analytics.completionRate}%</p>
                </div>
                <CheckCircle className="text-green-400" size={24} />
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl p-6 border border-orange-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-300 text-sm">Avg. Completion Time</p>
                  <p className="text-3xl font-bold text-white">{analytics.averageCompletionTime}d</p>
                </div>
                <Clock className="text-orange-400" size={24} />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm">Weekly Progress</p>
                  <p className="text-3xl font-bold text-white">{analytics.weeklyProgress.completed}/{analytics.weeklyProgress.created}</p>
                </div>
                <TrendingUp className="text-purple-400" size={24} />
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Category Breakdown */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-semibold text-white mb-6">Tasks by Category</h3>
              <div className="space-y-4">
                {analytics.categoryBreakdown.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-red-500"></div>
                      <span className="text-gray-300">{item.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-white font-medium text-sm">{item.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Priority Breakdown */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-semibold text-white mb-6">Tasks by Priority</h3>
              <div className="space-y-4">
                {analytics.priorityBreakdown.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        item.priority === 'high' ? 'bg-red-400' :
                        item.priority === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                      }`}></div>
                      <span className="text-gray-300 capitalize">{item.priority} Priority</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            item.priority === 'high' ? 'bg-red-400' :
                            item.priority === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                          }`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-white font-medium text-sm">{item.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Task Status Overview */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-white mb-4">Task Status Overview</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Total Tasks</span>
                  <span className="text-white font-semibold">{analytics.total}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-400">Completed</span>
                  <span className="text-white font-semibold">{analytics.completed}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-400">In Progress</span>
                  <span className="text-white font-semibold">{analytics.inProgress}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-orange-400">Pending</span>
                  <span className="text-white font-semibold">{analytics.pending}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-red-400">Overdue</span>
                  <span className="text-white font-semibold">{analytics.overdue}</span>
                </div>
              </div>
            </div>

            {/* Performance Insights */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-white mb-4">Performance Insights</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">{analytics.productivityScore}%</div>
                  <div className="text-gray-400 text-sm">Productivity Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">{analytics.averageCompletionTime}d</div>
                  <div className="text-gray-400 text-sm">Avg. Completion Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">{analytics.weeklyProgress.completed}</div>
                  <div className="text-gray-400 text-sm">Tasks Completed This Week</div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-white mb-4">Recommendations</h3>
              <div className="space-y-3">
                {analytics.overdue > 0 && (
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="text-red-400 mt-1" size={16} />
                    <span className="text-gray-300 text-sm">You have {analytics.overdue} overdue tasks. Consider reprioritizing.</span>
                  </div>
                )}
                {analytics.completionRate < 70 && (
                  <div className="flex items-start gap-2">
                    <Target className="text-orange-400 mt-1" size={16} />
                    <span className="text-gray-300 text-sm">Your completion rate is below 70%. Focus on finishing tasks.</span>
                  </div>
                )}
                {analytics.averageCompletionTime > 7 && (
                  <div className="flex items-start gap-2">
                    <Clock className="text-blue-400 mt-1" size={16} />
                    <span className="text-gray-300 text-sm">Tasks are taking longer than a week on average. Consider breaking them down.</span>
                  </div>
                )}
                {analytics.completionRate >= 80 && analytics.overdue === 0 && (
                  <div className="flex items-start gap-2">
                    <Award className="text-green-400 mt-1" size={16} />
                    <span className="text-gray-300 text-sm">Excellent performance! Keep up the great work.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 