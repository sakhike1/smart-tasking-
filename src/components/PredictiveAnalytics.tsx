import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Brain, 
  Target, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  Calendar,
  BarChart3,
  Sparkles,
  Zap,
  Trophy,
  Lightbulb
} from 'lucide-react';
import { motion } from 'framer-motion';

interface PredictiveAnalyticsProps {
  onClose: () => void;
}

interface NotificationRule {
  id: string;
  type: 'task' | 'reminder' | 'achievement' | 'insight';
  condition: string;
  timing: 'immediate' | 'smart' | 'scheduled';
  channels: string[];
  enabled: boolean;
}

const PredictiveAnalytics: React.FC<PredictiveAnalyticsProps> = ({ onClose }) => {
  const [predictions, setPredictions] = useState<any>({
    completionProbability: {
      'Complete project proposal': 0.85,
      'Review team feedback': 0.92,
      'Schedule client meeting': 0.78,
      'Prepare presentation': 0.65,
      'Update documentation': 0.88
    },
    productivityTrends: {
      currentWeek: 78,
      lastWeek: 72,
      predictedNextWeek: 82
    },
    optimalWorkTimes: [
      { day: 'Monday', time: '9:00 AM - 11:00 AM', productivity: 92 },
      { day: 'Tuesday', time: '2:00 PM - 4:00 PM', productivity: 88 },
      { day: 'Wednesday', time: '10:00 AM - 12:00 PM', productivity: 85 },
      { day: 'Thursday', time: '3:00 PM - 5:00 PM', productivity: 79 },
      { day: 'Friday', time: '9:00 AM - 11:00 AM', productivity: 76 }
    ],
    riskFactors: [
      { factor: 'High task load', risk: 'Medium', impact: 'May affect quality' },
      { factor: 'Upcoming deadline', risk: 'High', impact: 'Consider delegation' },
      { factor: 'Complex task complexity', risk: 'Low', impact: 'Good progress expected' }
    ],
    recommendations: [
      'Schedule complex tasks during your peak productivity hours (9-11 AM)',
      'Consider breaking down "Prepare presentation" into smaller subtasks',
      'You\'re most productive on Mondays - plan important tasks accordingly',
      'Your completion rate is improving by 6% weekly - great progress!'
    ],
    aiInsights: {
      burnoutRisk: 'Low',
      efficiencyScore: 8.2,
      improvementAreas: ['Time management', 'Task prioritization'],
      strengths: ['Consistency', 'Quality of work', 'Meeting deadlines']
    }
  });

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high': return 'text-red-400 bg-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getRankColor = (rank: string) => {
    if (rank.includes('Master')) return 'text-yellow-400';
    if (rank.includes('Expert')) return 'text-purple-400';
    if (rank.includes('Pro')) return 'text-blue-400';
    return 'text-green-400';
  };

  const progressPercentage = (predictions.productivityTrends.currentWeek / 100) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
              <Brain className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">AI Predictive Analytics</h1>
              <p className="text-gray-400">AI-powered insights to optimize your productivity</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Task Completion Predictions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <Target className="text-purple-400" size={24} />
              <h2 className="text-xl font-semibold text-white">Task Completion Predictions</h2>
            </div>
            
            <div className="space-y-4">
              {Object.entries(predictions.completionProbability).map(([task, probability]: [string, any]) => (
                <div key={task} className="bg-gray-800/30 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-sm font-medium">{task}</span>
                    <span className="text-purple-400 font-semibold">{Math.round(probability * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${probability * 100}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Productivity Trends */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="text-green-400" size={24} />
              <h2 className="text-xl font-semibold text-white">Productivity Trends</h2>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-400 mb-1">{predictions.productivityTrends.lastWeek}%</div>
                  <div className="text-sm text-gray-500">Last Week</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">{predictions.productivityTrends.currentWeek}%</div>
                  <div className="text-sm text-gray-500">This Week</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-1">{predictions.productivityTrends.predictedNextWeek}%</div>
                  <div className="text-sm text-gray-500">Predicted</div>
                </div>
              </div>
              
              <div className="bg-gray-800/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="text-yellow-400" size={16} />
                  <span className="text-white font-medium">AI Prediction</span>
                </div>
                <p className="text-gray-300 text-sm">
                  Based on your patterns, you're expected to improve by {predictions.productivityTrends.predictedNextWeek - predictions.productivityTrends.currentWeek}% next week!
                </p>
              </div>
            </div>
          </motion.div>

          {/* Optimal Work Times */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <Clock className="text-blue-400" size={24} />
              <h2 className="text-xl font-semibold text-white">Optimal Work Times</h2>
            </div>
            
            <div className="space-y-3">
              {predictions.optimalWorkTimes.map((timeSlot: any, index: number) => (
                <motion.div
                  key={timeSlot.day}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center justify-between bg-gray-800/30 rounded-xl p-4"
                >
                  <div>
                    <div className="text-white font-medium">{timeSlot.day}</div>
                    <div className="text-gray-400 text-sm">{timeSlot.time}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-semibold">{timeSlot.productivity}%</div>
                    <div className="text-gray-500 text-sm">Productivity</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Risk Assessment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="text-orange-400" size={24} />
              <h2 className="text-xl font-semibold text-white">Risk Assessment</h2>
            </div>
            
            <div className="space-y-4">
              {predictions.riskFactors.map((risk: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-gray-800/30 rounded-xl p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{risk.factor}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(risk.risk)}`}>
                      {risk.risk}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">{risk.impact}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* AI Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50"
        >
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="text-yellow-400" size={24} />
            <h2 className="text-xl font-semibold text-white">AI Recommendations</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {predictions.recommendations.map((recommendation: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-start gap-3 bg-gray-800/30 rounded-xl p-4"
              >
                <Zap className="text-purple-400 mt-1 flex-shrink-0" size={16} />
                <p className="text-gray-300 text-sm">{recommendation}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Insights Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl p-6 border border-purple-500/30"
        >
          <div className="flex items-center gap-3 mb-6">
            <Brain className="text-purple-400" size={24} />
            <h2 className="text-xl font-semibold text-white">AI Insights Summary</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">{predictions.aiInsights.efficiencyScore}/10</div>
              <div className="text-gray-400 text-sm">Efficiency Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">{predictions.aiInsights.burnoutRisk}</div>
              <div className="text-gray-400 text-sm">Burnout Risk</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{predictions.aiInsights.improvementAreas.length}</div>
              <div className="text-gray-400 text-sm">Areas to Improve</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">{predictions.aiInsights.strengths.length}</div>
              <div className="text-gray-400 text-sm">Key Strengths</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PredictiveAnalytics; 