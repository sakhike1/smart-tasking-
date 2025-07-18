import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Activity,
  LineChart,
  Zap,
  Award,
  Clock4,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Minus,
  Eye,
  RefreshCw
} from 'lucide-react';
import { useTaskStore } from '../stores/taskStore';
import { useAuthStore } from '../stores/authStore';

interface AnalyticsData {
  productivityScore: number;
  tasksCompleted: number;
  averageCompletionTime: number;
  focusTime: number;
  breaksTaken: number;
  efficiency: number;
  trends: {
    daily: number[];
    weekly: number[];
    monthly: number[];
  };
  categories: {
    name: string;
    count: number;
    percentage: number;
    color: string;
  }[];
  timeDistribution: {
    work: number;
    personal: number;
    health: number;
    learning: number;
  };
  predictions: {
    weeklyCompletion: number;
    monthlyGoal: number;
    efficiencyTrend: 'up' | 'down' | 'stable';
  };
}

const AdvancedAnalytics: React.FC = () => {
  const { getUserTasks } = useTaskStore();
  const { user } = useAuthStore();
  
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    productivityScore: 78,
    tasksCompleted: 45,
    averageCompletionTime: 2.3,
    focusTime: 6.5,
    breaksTaken: 8,
    efficiency: 0.85,
    trends: {
      daily: [65, 72, 68, 85, 78, 82, 75],
      weekly: [70, 75, 68, 82, 79, 85, 78],
      monthly: [72, 75, 78, 81, 79, 82, 85, 78]
    },
    categories: [
      { name: 'Work', count: 25, percentage: 55.6, color: '#3B82F6' },
      { name: 'Personal', count: 12, percentage: 26.7, color: '#10B981' },
      { name: 'Health', count: 5, percentage: 11.1, color: '#F59E0B' },
      { name: 'Learning', count: 3, percentage: 6.7, color: '#8B5CF6' }
    ],
    timeDistribution: {
      work: 65,
      personal: 20,
      health: 10,
      learning: 5
    },
    predictions: {
      weeklyCompletion: 85,
      monthlyGoal: 92,
      efficiencyTrend: 'up'
    }
  });

  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter'>('week');
  const [selectedMetric, setSelectedMetric] = useState<'productivity' | 'completion' | 'efficiency'>('productivity');
  const [isLoading, setIsLoading] = useState(false);

  const userTasks = user?.email ? getUserTasks(user.email) : [];

  useEffect(() => {
    if (userTasks.length > 0) {
      calculateAnalytics();
    }
  }, [userTasks, timeRange]);

  const calculateAnalytics = () => {
    setIsLoading(true);
    // Simulate analytics calculation
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <ArrowUp className="text-green-400" size={16} />;
      case 'down': return <ArrowDown className="text-red-400" size={16} />;
      case 'stable': return <Minus className="text-gray-400" size={16} />;
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-400';
      case 'stable': return 'text-gray-400';
    }
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 0.8) return 'text-green-400';
    if (efficiency >= 0.6) return 'text-yellow-400';
    return 'text-red-400';
  };

  const formatTime = (hours: number) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
            <BarChart3 className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Advanced Analytics</h2>
            <p className="text-gray-400 text-sm">Deep insights into your productivity patterns</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
          <button
            onClick={calculateAnalytics}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-all duration-300 disabled:opacity-50"
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-6 border border-blue-500/30">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm">Productivity Score</p>
              <p className="text-3xl font-bold text-white">{analyticsData.productivityScore}%</p>
            </div>
            <Activity className="text-blue-400" size={24} />
          </div>
          <div className="flex items-center gap-2 text-sm">
            {getTrendIcon('up')}
            <span className="text-green-400">+5.2% from last week</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-2xl p-6 border border-green-500/30">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm">Tasks Completed</p>
              <p className="text-3xl font-bold text-white">{analyticsData.tasksCompleted}</p>
            </div>
            <CheckCircle className="text-green-400" size={24} />
          </div>
          <div className="flex items-center gap-2 text-sm">
            {getTrendIcon('up')}
            <span className="text-green-400">+12 from last week</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl p-6 border border-orange-500/30">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm">Focus Time</p>
              <p className="text-3xl font-bold text-white">{formatTime(analyticsData.focusTime)}</p>
            </div>
            <Clock4 className="text-orange-400" size={24} />
          </div>
          <div className="flex items-center gap-2 text-sm">
            {getTrendIcon('up')}
            <span className="text-green-400">+1.2h from last week</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm">Efficiency</p>
              <p className={`text-3xl font-bold ${getEfficiencyColor(analyticsData.efficiency)}`}>
                {Math.round(analyticsData.efficiency * 100)}%
              </p>
            </div>
            <Zap className="text-purple-400" size={24} />
          </div>
          <div className="flex items-center gap-2 text-sm">
            {getTrendIcon(analyticsData.predictions.efficiencyTrend)}
            <span className={getTrendColor(analyticsData.predictions.efficiencyTrend)}>
              {analyticsData.predictions.efficiencyTrend === 'up' ? '+3.1%' : 
               analyticsData.predictions.efficiencyTrend === 'down' ? '-1.2%' : 'Stable'}
            </span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Productivity Trend */}
        <div className="bg-gray-700/30 rounded-2xl p-6 border border-gray-600/30">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Productivity Trend</h3>
            <div className="flex gap-2">
              {['productivity', 'completion', 'efficiency'].map((metric) => (
                <button
                  key={metric}
                  onClick={() => setSelectedMetric(metric as any)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300 ${
                    selectedMetric === metric 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-600/50 text-gray-300 hover:bg-gray-500/50'
                  }`}
                >
                  {metric.charAt(0).toUpperCase() + metric.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          {/* Chart Placeholder */}
          <div className="h-64 bg-gray-800/50 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <LineChart className="mx-auto text-gray-400 mb-2" size={48} />
              <p className="text-gray-400">Interactive chart showing {selectedMetric} trends</p>
            </div>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-gray-700/30 rounded-2xl p-6 border border-gray-600/30">
          <h3 className="text-lg font-semibold text-white mb-6">Task Categories</h3>
          
          <div className="space-y-4">
            {analyticsData.categories.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="text-white font-medium">{category.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 bg-gray-700 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${category.percentage}%`,
                        backgroundColor: category.color
                      }}
                    ></div>
                  </div>
                  <span className="text-gray-300 text-sm w-12 text-right">
                    {category.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Time Distribution & Predictions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Time Distribution */}
        <div className="bg-gray-700/30 rounded-2xl p-6 border border-gray-600/30">
          <h3 className="text-lg font-semibold text-white mb-6">Time Distribution</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-500/20 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span className="text-white">Work</span>
              </div>
              <span className="text-blue-400 font-semibold">{analyticsData.timeDistribution.work}%</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-green-500/20 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-white">Personal</span>
              </div>
              <span className="text-green-400 font-semibold">{analyticsData.timeDistribution.personal}%</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-orange-500/20 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                <span className="text-white">Health</span>
              </div>
              <span className="text-orange-400 font-semibold">{analyticsData.timeDistribution.health}%</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-purple-500/20 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                <span className="text-white">Learning</span>
              </div>
              <span className="text-purple-400 font-semibold">{analyticsData.timeDistribution.learning}%</span>
            </div>
          </div>
        </div>

        {/* Predictions */}
        <div className="bg-gray-700/30 rounded-2xl p-6 border border-gray-600/30">
          <h3 className="text-lg font-semibold text-white mb-6">AI Predictions</h3>
          
          <div className="space-y-6">
            <div className="p-4 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-xl border border-green-500/30">
                              <div className="flex items-center gap-3 mb-2">
                  <Award className="text-green-400" size={20} />
                  <h4 className="text-white font-medium">Weekly Completion</h4>
                </div>
              <p className="text-3xl font-bold text-green-400 mb-1">
                {analyticsData.predictions.weeklyCompletion}%
              </p>
              <p className="text-gray-300 text-sm">Predicted completion rate for this week</p>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/30">
              <div className="flex items-center gap-3 mb-2">
                <Award className="text-blue-400" size={20} />
                <h4 className="text-white font-medium">Monthly Goal</h4>
              </div>
              <p className="text-3xl font-bold text-blue-400 mb-1">
                {analyticsData.predictions.monthlyGoal}%
              </p>
              <p className="text-gray-300 text-sm">Likelihood of reaching monthly targets</p>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl border border-orange-500/30">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="text-orange-400" size={20} />
                <h4 className="text-white font-medium">Efficiency Trend</h4>
              </div>
              <div className="flex items-center gap-2">
                {getTrendIcon(analyticsData.predictions.efficiencyTrend)}
                <span className={`text-lg font-semibold ${getTrendColor(analyticsData.predictions.efficiencyTrend)}`}>
                  {analyticsData.predictions.efficiencyTrend === 'up' ? 'Improving' : 
                   analyticsData.predictions.efficiencyTrend === 'down' ? 'Declining' : 'Stable'}
                </span>
              </div>
              <p className="text-gray-300 text-sm">Based on your current patterns</p>
            </div>
          </div>
        </div>
      </div>

      {/* Insights & Recommendations */}
      <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Eye className="text-purple-400" size={20} />
          AI Insights & Recommendations
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-white/10 rounded-xl">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
              <div>
                <h4 className="text-white font-medium mb-1">Peak Performance Time</h4>
                <p className="text-gray-300 text-sm">You're most productive between 9-11 AM. Schedule important tasks during this window.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-white/10 rounded-xl">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
              <div>
                <h4 className="text-white font-medium mb-1">Focus Optimization</h4>
                <p className="text-gray-300 text-sm">Your optimal focus session is 45 minutes. Take 15-minute breaks between deep work.</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-white/10 rounded-xl">
              <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
              <div>
                <h4 className="text-white font-medium mb-1">Category Balance</h4>
                <p className="text-gray-300 text-sm">Consider allocating more time to Health and Learning categories for better work-life balance.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-white/10 rounded-xl">
              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
              <div>
                <h4 className="text-white font-medium mb-1">Weekly Planning</h4>
                <p className="text-gray-300 text-sm">Plan complex tasks for Tuesdays and Thursdays when your productivity peaks.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnalytics; 