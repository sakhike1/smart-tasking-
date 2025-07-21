import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Clock, 
  Zap, 
  Heart, 
  Lightbulb, 
  BarChart3, 
  MessageSquare,
  X,
  Mic,
  Eye,
  Activity,
  Award,
  Crown,
  Star,
  Sparkles,
  BrainCircuit,
  Thermometer,
  Gauge,
  Target as TargetIcon,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Loader2,
  Battery
} from 'lucide-react';
import { useTaskStore } from '../stores/taskStore';
import { useAuthStore } from '../stores/authStore';

interface AIInsight {
  id: string;
  type: 'priority' | 'deadline' | 'categorization' | 'motivation' | 'energy' | 'stress' | 'productivity';
  title: string;
  description: string;
  confidence: number;
  action?: string;
  icon: React.ReactNode;
  color: string;
  urgency: 'low' | 'medium' | 'high';
}

interface PsychologicalProfile {
  energyLevel: number; // 0-100
  stressLevel: number; // 0-100
  motivationLevel: number; // 0-100
  focusMode: 'deep' | 'shallow' | 'distracted';
  cognitiveState: 'optimal' | 'good' | 'tired' | 'overwhelmed';
  productivityTrend: 'increasing' | 'stable' | 'decreasing';
}

interface GamificationData {
  level: number;
  experience: number;
  experienceToNext: number;
  achievements: string[];
  streak: number;
  totalTasksCompleted: number;
  weeklyGoal: number;
  weeklyProgress: number;
}

const AIProductivityCoach: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { getUserTasks, addTask, updateTaskStatus } = useTaskStore();
  const { user } = useAuthStore();
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [psychologicalProfile, setPsychologicalProfile] = useState<PsychologicalProfile>({
    energyLevel: 75,
    stressLevel: 30,
    motivationLevel: 80,
    focusMode: 'deep',
    cognitiveState: 'optimal',
    productivityTrend: 'increasing'
  });
  const [gamification, setGamification] = useState<GamificationData>({
    level: 12,
    experience: 2450,
    experienceToNext: 500,
    achievements: ['Early Bird', 'Task Master', 'Focus Champion'],
    streak: 7,
    totalTasksCompleted: 156,
    weeklyGoal: 20,
    weeklyProgress: 15
  });
  const [activeTab, setActiveTab] = useState<'insights' | 'psychology' | 'gamification' | 'visualization'>('insights');
  const [voiceInput, setVoiceInput] = useState('');
  const [isListening, setIsListening] = useState(false);

  const userTasks = user?.email ? getUserTasks(user.email) : [];

  // AI Analysis Functions
  const analyzeTaskPrioritization = (): AIInsight[] => {
    const highPriorityTasks = userTasks.filter(t => t.priority === 'high' && t.status !== 'completed');
    const overdueTasks = userTasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'completed');
    
    const insights: AIInsight[] = [];
    
    if (highPriorityTasks.length > 3) {
      insights.push({
        id: 'priority-overload',
        type: 'priority',
        title: 'Priority Overload Detected',
        description: `You have ${highPriorityTasks.length} high-priority tasks. Consider delegating or breaking them down.`,
        confidence: 0.92,
        action: 'Review and reprioritize tasks',
        icon: <Target className="text-red-400" size={20} />,
        color: 'from-red-500/20 to-red-600/20',
        urgency: 'high'
      });
    }
    
    if (overdueTasks.length > 0) {
      insights.push({
        id: 'overdue-tasks',
        type: 'deadline',
        title: 'Overdue Tasks Alert',
        description: `${overdueTasks.length} tasks are overdue. This may impact your productivity score.`,
        confidence: 0.98,
        action: 'Address overdue tasks immediately',
        icon: <Clock className="text-orange-400" size={20} />,
        color: 'from-orange-500/20 to-orange-600/20',
        urgency: 'high'
      });
    }
    
    return insights;
  };

  const analyzePsychologicalState = (): AIInsight[] => {
    const insights: AIInsight[] = [];
    
    if (psychologicalProfile.stressLevel > 70) {
      insights.push({
        id: 'high-stress',
        type: 'stress',
        title: 'High Stress Level Detected',
        description: 'Your stress level is elevated. Consider taking breaks and practicing mindfulness.',
        confidence: 0.85,
        action: 'Take a 10-minute break',
        icon: <Heart className="text-red-400" size={20} />,
        color: 'from-red-500/20 to-red-600/20',
        urgency: 'high'
      });
    }
    
    if (psychologicalProfile.energyLevel < 40) {
      insights.push({
        id: 'low-energy',
        type: 'energy',
        title: 'Low Energy Level',
        description: 'Your energy is low. Focus on lighter tasks or take a power nap.',
        confidence: 0.78,
        action: 'Switch to low-energy tasks',
        icon: <Battery className="text-yellow-400" size={20} />,
        color: 'from-yellow-500/20 to-yellow-600/20',
        urgency: 'medium'
      });
    }
    
    return insights;
  };

  const generatePredictiveSuggestions = (): AIInsight[] => {
    const insights: AIInsight[] = [];
    
    // Predict optimal task scheduling
    const optimalTime = new Date();
    optimalTime.setHours(10, 0, 0, 0); // 10 AM
    
    insights.push({
      id: 'optimal-scheduling',
      type: 'productivity',
      title: 'Optimal Task Scheduling',
      description: `Based on your patterns, ${optimalTime.toLocaleTimeString()} is your peak productivity time.`,
      confidence: 0.82,
      action: 'Schedule important tasks for 10 AM',
      icon: <Clock className="text-blue-400" size={20} />,
      color: 'from-blue-500/20 to-blue-600/20',
      urgency: 'medium'
    });
    
    return insights;
  };

  const runAIAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const priorityInsights = analyzeTaskPrioritization();
    const psychologyInsights = analyzePsychologicalState();
    const predictiveInsights = generatePredictiveSuggestions();
    
    setInsights([...priorityInsights, ...psychologyInsights, ...predictiveInsights]);
    setIsAnalyzing(false);
  };

  useEffect(() => {
    runAIAnalysis();
  }, [userTasks]);

  const handleVoiceInput = () => {
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      setVoiceInput('Create a new task for tomorrow');
      setIsListening(false);
    }, 3000);
  };

  const getCognitiveStateColor = (state: string) => {
    switch (state) {
      case 'optimal': return 'text-green-400';
      case 'good': return 'text-blue-400';
      case 'tired': return 'text-yellow-400';
      case 'overwhelmed': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getEnergyBarColor = (level: number) => {
    if (level > 70) return 'bg-green-400';
    if (level > 40) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900/95 via-black/95 to-gray-800/95 rounded-3xl p-8 max-w-6xl w-full max-h-[90vh] overflow-hidden border border-gray-700/50 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Brain className="text-4xl text-purple-400 animate-pulse" size={40} />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">AI Productivity Coach</h1>
              <p className="text-gray-400">Your intelligent productivity companion</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
          >
            <X size={24} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          {[
            { id: 'insights', label: 'AI Insights', icon: <Brain size={18} /> },
            { id: 'psychology', label: 'Psychology', icon: <Heart size={18} /> },
            { id: 'gamification', label: 'Gamification', icon: <Award size={18} /> },
            { id: 'visualization', label: 'Visualization', icon: <BarChart3 size={18} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[60vh]">
          {activeTab === 'insights' && (
            <div className="space-y-6">
              {/* Voice Input */}
              <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl p-6 border border-purple-500/20">
                <div className="flex items-center gap-4 mb-4">
                  <Mic className="text-purple-400" size={24} />
                  <h3 className="text-xl font-semibold text-white">Voice Task Creation</h3>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleVoiceInput}
                    disabled={isListening}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-400 rounded-xl hover:bg-purple-500/30 transition-all duration-300 disabled:opacity-50"
                  >
                    {isListening ? <Loader2 className="animate-spin" size={16} /> : <Mic size={16} />}
                    {isListening ? 'Listening...' : 'Start Voice Input'}
                  </button>
                  {voiceInput && (
                    <div className="flex-1 bg-gray-800/50 rounded-xl p-3 text-gray-300">
                      "{voiceInput}"
                    </div>
                  )}
                </div>
              </div>

              {/* AI Insights */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {isAnalyzing ? (
                  <div className="col-span-full flex items-center justify-center py-12">
                    <div className="text-center">
                      <Loader2 className="w-12 h-12 text-purple-400 animate-spin mx-auto mb-4" />
                      <p className="text-gray-400">AI is analyzing your productivity patterns...</p>
                    </div>
                  </div>
                ) : (
                  insights.map(insight => (
                    <div
                      key={insight.id}
                      className={`bg-gradient-to-br ${insight.color} rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {insight.icon}
                          <h3 className="text-lg font-semibold text-white">{insight.title}</h3>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          insight.urgency === 'high' ? 'bg-red-500/20 text-red-400' :
                          insight.urgency === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {insight.urgency} priority
                        </span>
                      </div>
                      <p className="text-gray-300 mb-4">{insight.description}</p>
                      {insight.action && (
                        <button className="text-purple-400 hover:text-purple-300 text-sm font-medium">
                          {insight.action} →
                        </button>
                      )}
                      <div className="mt-3">
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <span>AI Confidence:</span>
                          <div className="flex-1 bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-purple-400 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${insight.confidence * 100}%` }}
                            ></div>
                          </div>
                          <span>{Math.round(insight.confidence * 100)}%</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'psychology' && (
            <div className="space-y-6">
              {/* Psychological Profile */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Energy Level */}
                <div className="bg-gradient-to-br from-green-500/10 to-teal-500/10 rounded-2xl p-6 border border-green-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <Activity className="text-green-400" size={24} />
                    <h3 className="text-lg font-semibold text-white">Energy Level</h3>
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{psychologicalProfile.energyLevel}%</div>
                  <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                    <div 
                      className={`h-3 rounded-full transition-all duration-300 ${getEnergyBarColor(psychologicalProfile.energyLevel)}`}
                      style={{ width: `${psychologicalProfile.energyLevel}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-300 text-sm">Optimal for complex tasks</p>
                </div>

                {/* Stress Level */}
                <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-2xl p-6 border border-red-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <Thermometer className="text-red-400" size={24} />
                    <h3 className="text-lg font-semibold text-white">Stress Level</h3>
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{psychologicalProfile.stressLevel}%</div>
                  <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                    <div 
                      className="bg-red-400 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${psychologicalProfile.stressLevel}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-300 text-sm">Manageable stress level</p>
                </div>

                {/* Motivation Level */}
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <TargetIcon className="text-purple-400" size={24} />
                    <h3 className="text-lg font-semibold text-white">Motivation</h3>
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{psychologicalProfile.motivationLevel}%</div>
                  <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                    <div 
                      className="bg-purple-400 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${psychologicalProfile.motivationLevel}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-300 text-sm">High motivation state</p>
                </div>
              </div>

              {/* Cognitive State */}
              <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-2xl p-6 border border-blue-500/20">
                <h3 className="text-xl font-semibold text-white mb-4">Cognitive State Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <Brain className="text-blue-400" size={20} />
                      <span className="text-gray-300">Focus Mode:</span>
                      <span className={`font-semibold ${getCognitiveStateColor(psychologicalProfile.focusMode)}`}>
                        {psychologicalProfile.focusMode.charAt(0).toUpperCase() + psychologicalProfile.focusMode.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <Eye className="text-blue-400" size={20} />
                      <span className="text-gray-300">Cognitive State:</span>
                      <span className={`font-semibold ${getCognitiveStateColor(psychologicalProfile.cognitiveState)}`}>
                        {psychologicalProfile.cognitiveState.charAt(0).toUpperCase() + psychologicalProfile.cognitiveState.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <TrendingUp className="text-blue-400" size={20} />
                      <span className="text-gray-300">Productivity Trend:</span>
                      <span className={`font-semibold ${
                        psychologicalProfile.productivityTrend === 'increasing' ? 'text-green-400' :
                        psychologicalProfile.productivityTrend === 'stable' ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {psychologicalProfile.productivityTrend.charAt(0).toUpperCase() + psychologicalProfile.productivityTrend.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <h4 className="text-white font-semibold mb-2">Recommendations</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>• Take a 5-minute break every 25 minutes</li>
                      <li>• Focus on high-priority tasks during peak energy</li>
                      <li>• Practice deep breathing exercises</li>
                      <li>• Stay hydrated and maintain good posture</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'gamification' && (
            <div className="space-y-6">
              {/* Level and Progress */}
              <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-2xl p-6 border border-yellow-500/20">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Crown className="text-yellow-400" size={32} />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Level {gamification.level}</h3>
                      <p className="text-gray-300">Productivity Master</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">{gamification.experience}</div>
                    <p className="text-gray-300 text-sm">Total XP</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-300 mb-2">
                    <span>Progress to Level {gamification.level + 1}</span>
                    <span>{Math.round((gamification.experience / (gamification.experience + gamification.experienceToNext)) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${(gamification.experience / (gamification.experience + gamification.experienceToNext)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-green-500/20 text-center">
                  <CheckCircle className="text-green-400 mx-auto mb-2" size={24} />
                  <div className="text-2xl font-bold text-white">{gamification.totalTasksCompleted}</div>
                  <p className="text-gray-300 text-sm">Tasks Completed</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl p-4 border border-blue-500/20 text-center">
                  <Star className="text-blue-400 mx-auto mb-2" size={24} />
                  <div className="text-2xl font-bold text-white">{gamification.streak}</div>
                  <p className="text-gray-300 text-sm">Day Streak</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-500/20 text-center">
                  <Award className="text-purple-400 mx-auto mb-2" size={24} />
                  <div className="text-2xl font-bold text-white">{gamification.achievements.length}</div>
                  <p className="text-gray-300 text-sm">Achievements</p>
                </div>
                <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl p-4 border border-orange-500/20 text-center">
                  <TargetIcon className="text-orange-400 mx-auto mb-2" size={24} />
                  <div className="text-2xl font-bold text-white">{gamification.weeklyProgress}/{gamification.weeklyGoal}</div>
                  <p className="text-gray-300 text-sm">Weekly Goal</p>
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-2xl p-6 border border-purple-500/20">
                <h3 className="text-xl font-semibold text-white mb-4">Recent Achievements</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {gamification.achievements.map((achievement, index) => (
                    <div key={index} className="bg-gray-800/50 rounded-xl p-4 text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Award className="text-white" size={24} />
                      </div>
                      <h4 className="text-white font-semibold">{achievement}</h4>
                      <p className="text-gray-400 text-sm">Unlocked!</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'visualization' && (
            <div className="space-y-6">
              {/* 3D Task Landscape */}
              <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl p-6 border border-indigo-500/20">
                <h3 className="text-xl font-semibold text-white mb-4">3D Task Landscape</h3>
                <div className="h-64 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10"></div>
                  <div className="relative z-10 text-center">
                    <BarChart3 className="text-indigo-400 mx-auto mb-4" size={48} />
                    <p className="text-gray-300">Interactive 3D visualization coming soon</p>
                    <p className="text-gray-400 text-sm">Visualize your tasks in 3D space</p>
                  </div>
                </div>
              </div>

              {/* Heat Map */}
              <div className="bg-gradient-to-br from-green-500/10 to-teal-500/10 rounded-2xl p-6 border border-green-500/20">
                <h3 className="text-xl font-semibold text-white mb-4">Productivity Heat Map</h3>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 49 }, (_, i) => {
                    const intensity = Math.random() * 100;
                    return (
                      <div
                        key={i}
                        className="aspect-square rounded-lg transition-all duration-300 hover:scale-110"
                        style={{
                          backgroundColor: `rgba(34, 197, 94, ${intensity / 100})`,
                          border: '1px solid rgba(34, 197, 94, 0.3)'
                        }}
                      ></div>
                    );
                  })}
                </div>
                <div className="flex justify-between text-sm text-gray-300 mt-2">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIProductivityCoach; 