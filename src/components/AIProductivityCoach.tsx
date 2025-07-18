import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  TrendingUp, 
  Clock, 
  Target, 
  Zap, 
  Lightbulb,
  BarChart3,
  Calendar,
  Coffee,
  Moon,
  Sun,
  Activity,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Play,
  Pause
} from 'lucide-react';
import { useTaskStore } from '../stores/taskStore';
import { useAuthStore } from '../stores/authStore';

interface ProductivityInsight {
  id: string;
  type: 'energy' | 'focus' | 'efficiency' | 'pattern' | 'recommendation';
  title: string;
  description: string;
  confidence: number;
  actionable: boolean;
  action?: string;
  icon: React.ReactNode;
  color: string;
}

interface EnergyPattern {
  timeSlot: string;
  energyLevel: number;
  taskType: 'creative' | 'analytical' | 'administrative' | 'communication';
  productivity: number;
}

const AIProductivityCoach: React.FC = () => {
  const { getUserTasks } = useTaskStore();
  const { user } = useAuthStore();
  
  const [insights, setInsights] = useState<ProductivityInsight[]>([]);
  const [energyPatterns, setEnergyPatterns] = useState<EnergyPattern[]>([]);
  const [currentFocus, setCurrentFocus] = useState<'insights' | 'patterns' | 'recommendations'>('insights');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const userTasks = user?.email ? getUserTasks(user.email) : [];

  useEffect(() => {
    if (userTasks.length > 0) {
      analyzeProductivity();
    }
  }, [userTasks]);

  const analyzeProductivity = () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const newInsights: ProductivityInsight[] = [
        {
          id: '1',
          type: 'energy',
          title: 'Peak Energy Window',
          description: 'You\'re most productive between 9-11 AM. Schedule your most important tasks during this time.',
          confidence: 0.89,
          actionable: true,
          action: 'Schedule high-priority tasks for 9-11 AM',
          icon: <Sun className="text-yellow-400" size={20} />,
          color: 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30'
        },
        {
          id: '2',
          type: 'focus',
          title: 'Focus Duration',
          description: 'Your optimal focus sessions are 45 minutes. Take 15-minute breaks between deep work.',
          confidence: 0.76,
          actionable: true,
          action: 'Set 45-minute focus timers',
          icon: <Target className="text-blue-400" size={20} />,
          color: 'from-blue-500/20 to-purple-500/20 border-blue-500/30'
        },
        {
          id: '3',
          type: 'efficiency',
          title: 'Task Completion Rate',
          description: 'You complete 78% of tasks on time. High-priority tasks have 92% completion rate.',
          confidence: 0.94,
          actionable: false,
          icon: <CheckCircle className="text-green-400" size={20} />,
          color: 'from-green-500/20 to-teal-500/20 border-green-500/30'
        },
        {
          id: '4',
          type: 'pattern',
          title: 'Weekly Pattern',
          description: 'Tuesdays and Thursdays are your most productive days. Mondays need more structure.',
          confidence: 0.82,
          actionable: true,
          action: 'Plan complex tasks for Tues/Thurs',
          icon: <Calendar className="text-purple-400" size={20} />,
          color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30'
        },
        {
          id: '5',
          type: 'recommendation',
          title: 'Break Optimization',
          description: 'You work best with 15-minute breaks every 90 minutes. Consider using the Pomodoro technique.',
          confidence: 0.71,
          actionable: true,
          action: 'Start Pomodoro session',
          icon: <Coffee className="text-orange-400" size={20} />,
          color: 'from-orange-500/20 to-red-500/20 border-orange-500/30'
        }
      ];

      const newEnergyPatterns: EnergyPattern[] = [
        { timeSlot: '6-9 AM', energyLevel: 0.6, taskType: 'administrative', productivity: 0.7 },
        { timeSlot: '9-11 AM', energyLevel: 0.9, taskType: 'creative', productivity: 0.95 },
        { timeSlot: '11-1 PM', energyLevel: 0.7, taskType: 'communication', productivity: 0.8 },
        { timeSlot: '1-3 PM', energyLevel: 0.5, taskType: 'analytical', productivity: 0.6 },
        { timeSlot: '3-5 PM', energyLevel: 0.8, taskType: 'creative', productivity: 0.85 },
        { timeSlot: '5-8 PM', energyLevel: 0.4, taskType: 'administrative', productivity: 0.5 }
      ];

      setInsights(newInsights);
      setEnergyPatterns(newEnergyPatterns);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'energy': return <Zap className="text-yellow-400" size={16} />;
      case 'focus': return <Target className="text-blue-400" size={16} />;
      case 'efficiency': return <TrendingUp className="text-green-400" size={16} />;
      case 'pattern': return <BarChart3 className="text-purple-400" size={16} />;
      case 'recommendation': return <Lightbulb className="text-orange-400" size={16} />;
      default: return <Activity className="text-gray-400" size={16} />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-400';
    if (confidence >= 0.6) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
            <Brain className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">AI Productivity Coach</h2>
            <p className="text-gray-400 text-sm">Personalized insights to boost your productivity</p>
          </div>
        </div>
        <button
          onClick={analyzeProductivity}
          disabled={isAnalyzing}
          className="px-4 py-2 bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-xl font-medium hover:from-purple-500 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
        >
          {isAnalyzing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles size={16} />
              Refresh Analysis
            </>
          )}
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-gray-700/50 rounded-xl p-1 mb-8">
        <button
          onClick={() => setCurrentFocus('insights')}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            currentFocus === 'insights' 
              ? 'bg-purple-500 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          <Lightbulb className="inline mr-2" size={16} />
          Insights
        </button>
        <button
          onClick={() => setCurrentFocus('patterns')}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            currentFocus === 'patterns' 
              ? 'bg-purple-500 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          <BarChart3 className="inline mr-2" size={16} />
          Energy Patterns
        </button>
        <button
          onClick={() => setCurrentFocus('recommendations')}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            currentFocus === 'recommendations' 
              ? 'bg-purple-500 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          <Target className="inline mr-2" size={16} />
          Recommendations
        </button>
      </div>

      {/* Content */}
      {currentFocus === 'insights' && (
        <div className="space-y-6">
          {insights.map((insight) => (
            <div
              key={insight.id}
              className={`bg-gradient-to-br ${insight.color} rounded-2xl p-6 border shadow-lg`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {insight.icon}
                  <h3 className="text-lg font-semibold text-white">{insight.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${getConfidenceColor(insight.confidence)}`}>
                    {Math.round(insight.confidence * 100)}% confidence
                  </span>
                  {insight.actionable && (
                    <span className="px-2 py-1 bg-white/20 text-white text-xs rounded-full">
                      Actionable
                    </span>
                  )}
                </div>
              </div>
              <p className="text-gray-300 mb-4 leading-relaxed">{insight.description}</p>
              {insight.actionable && insight.action && (
                <button className="flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-all duration-300">
                  {insight.action}
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {currentFocus === 'patterns' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-6 border border-blue-500/30">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Activity className="text-blue-400" size={20} />
              Daily Energy Patterns
            </h3>
            <div className="space-y-4">
              {energyPatterns.map((pattern, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/10 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-16 text-sm text-gray-300">{pattern.timeSlot}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">Energy:</span>
                      <div className="w-20 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${pattern.energyLevel * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-300">{Math.round(pattern.energyLevel * 100)}%</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      pattern.taskType === 'creative' ? 'bg-purple-500/20 text-purple-400' :
                      pattern.taskType === 'analytical' ? 'bg-blue-500/20 text-blue-400' :
                      pattern.taskType === 'communication' ? 'bg-green-500/20 text-green-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {pattern.taskType}
                    </span>
                    <span className="text-sm text-gray-300">
                      {Math.round(pattern.productivity * 100)}% productive
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {currentFocus === 'recommendations' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-2xl p-6 border border-green-500/30">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Target className="text-green-400" size={20} />
              Personalized Recommendations
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-white/10 rounded-xl">
                <h4 className="text-white font-medium mb-2">Optimize Your Schedule</h4>
                <p className="text-gray-300 text-sm mb-3">
                  Based on your energy patterns, schedule creative tasks for 9-11 AM and 3-5 PM.
                </p>
                <button className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-all duration-300">
                  Apply to Schedule
                </button>
              </div>
              
              <div className="p-4 bg-white/10 rounded-xl">
                <h4 className="text-white font-medium mb-2">Focus Session Setup</h4>
                <p className="text-gray-300 text-sm mb-3">
                  Your optimal focus duration is 45 minutes. Set up automatic break reminders.
                </p>
                <button className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-all duration-300">
                  Configure Focus Timer
                </button>
              </div>
              
              <div className="p-4 bg-white/10 rounded-xl">
                <h4 className="text-white font-medium mb-2">Weekly Planning</h4>
                <p className="text-gray-300 text-sm mb-3">
                  Plan complex tasks for Tuesdays and Thursdays when you're most productive.
                </p>
                <button className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-all duration-300">
                  Plan This Week
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIProductivityCoach; 