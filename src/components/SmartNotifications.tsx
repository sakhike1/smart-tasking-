import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  BellOff, 
  Clock, 
  Brain, 
  Settings, 
  Zap, 
  Eye, 
  EyeOff,
  Smartphone,
  Mail,
  MessageSquare,
  Calendar,
  AlertTriangle,
  CheckCircle,
  X,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SmartNotificationsProps {
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

const SmartNotifications: React.FC<SmartNotificationsProps> = ({ onClose }) => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [rules, setRules] = useState<NotificationRule[]>([
    {
      id: '1',
      type: 'task',
      condition: 'High priority task due within 2 hours',
      timing: 'smart',
      channels: ['app', 'email'],
      enabled: true
    },
    {
      id: '2',
      type: 'reminder',
      condition: 'Task overdue by more than 1 day',
      timing: 'immediate',
      channels: ['app', 'push'],
      enabled: true
    },
    {
      id: '3',
      type: 'achievement',
      condition: 'Completed 5 tasks in a day',
      timing: 'immediate',
      channels: ['app'],
      enabled: true
    },
    {
      id: '4',
      type: 'insight',
      condition: 'Productivity dropped by 20%',
      timing: 'smart',
      channels: ['app', 'email'],
      enabled: true
    }
  ]);
  const [aiInsights, setAiInsights] = useState<any>(null);
  const [showAddRule, setShowAddRule] = useState(false);
  const [newRule, setNewRule] = useState<Partial<NotificationRule>>({
    type: 'task',
    timing: 'smart',
    channels: ['app'],
    enabled: true
  });

  useEffect(() => {
    // Simulate AI analysis
    setTimeout(() => {
      setAiInsights({
        optimalNotificationTimes: [
          { time: '9:00 AM', reason: 'Peak productivity start' },
          { time: '2:00 PM', reason: 'Post-lunch energy boost' },
          { time: '4:00 PM', reason: 'Pre-evening motivation' }
        ],
        userPreferences: {
          prefersQuietHours: true,
          quietHoursStart: '10:00 PM',
          quietHoursEnd: '8:00 AM',
          preferredChannels: ['app', 'push'],
          responseRate: {
            immediate: 0.85,
            smart: 0.92,
            scheduled: 0.78
          }
        },
        recommendations: [
          'You respond best to notifications during work hours (9 AM - 5 PM)',
          'Consider reducing email notifications - you check them less frequently',
          'Push notifications have 40% higher engagement rate for you',
          'Weekend notifications should be limited to urgent tasks only'
        ]
      });

      // Simulate recent notifications
      setNotifications([
        {
          id: '1',
          title: 'High Priority Task Due Soon',
          message: 'Project proposal is due in 2 hours',
          type: 'task',
          timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
          read: false,
          priority: 'high'
        },
        {
          id: '2',
          title: 'Productivity Achievement Unlocked!',
          message: 'You completed 5 tasks today - great work!',
          type: 'achievement',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
          read: true,
          priority: 'medium'
        },
        {
          id: '3',
          title: 'AI Insight: Optimal Work Time',
          message: 'You\'re most productive between 9-11 AM. Schedule important tasks then.',
          type: 'insight',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
          read: false,
          priority: 'low'
        }
      ]);
    }, 1000);
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'task': return <Calendar className="text-blue-400" size={16} />;
      case 'achievement': return <CheckCircle className="text-green-400" size={16} />;
      case 'insight': return <Brain className="text-purple-400" size={16} />;
      case 'reminder': return <AlertTriangle className="text-orange-400" size={16} />;
      default: return <Bell className="text-gray-400" size={16} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500/50 bg-red-500/10';
      case 'medium': return 'border-yellow-500/50 bg-yellow-500/10';
      case 'low': return 'border-green-500/50 bg-green-500/10';
      default: return 'border-gray-500/50 bg-gray-500/10';
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const toggleRule = (ruleId: string) => {
    setRules(rules.map(rule => 
      rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const addRule = () => {
    if (newRule.condition && newRule.type) {
      const rule: NotificationRule = {
        id: Date.now().toString(),
        type: newRule.type as 'task' | 'reminder' | 'achievement' | 'insight',
        condition: newRule.condition,
        timing: newRule.timing as 'immediate' | 'smart' | 'scheduled',
        channels: newRule.channels || ['app'],
        enabled: newRule.enabled || true
      };
      setRules([...rules, rule]);
      setNewRule({
        type: 'task',
        timing: 'smart',
        channels: ['app'],
        enabled: true
      });
      setShowAddRule(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
              <Bell className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Smart Notifications</h1>
              <p className="text-gray-400">AI-powered notification management</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Notifications */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Recent Notifications</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">{notifications.filter(n => !n.read).length} unread</span>
                </div>
              </div>

              <div className="space-y-4">
                <AnimatePresence>
                  {notifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-xl border ${getPriorityColor(notification.priority)} ${
                        !notification.read ? 'ring-2 ring-blue-500/30' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-white font-medium">{notification.title}</h3>
                            <span className="text-gray-400 text-sm">{formatTimeAgo(notification.timestamp)}</span>
                          </div>
                          <p className="text-gray-300 text-sm">{notification.message}</p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* AI Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {/* Optimal Times */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="text-purple-400" size={20} />
                <h3 className="text-lg font-semibold text-white">Optimal Notification Times</h3>
              </div>
              
              <div className="space-y-3">
                {aiInsights?.optimalNotificationTimes.map((time: any, index: number) => (
                  <div key={index} className="flex items-center justify-between bg-gray-800/30 rounded-lg p-3">
                    <div>
                      <div className="text-white font-medium">{time.time}</div>
                      <div className="text-gray-400 text-xs">{time.reason}</div>
                    </div>
                    <Clock className="text-purple-400" size={16} />
                  </div>
                ))}
              </div>
            </div>

            {/* User Preferences */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="text-blue-400" size={20} />
                <h3 className="text-lg font-semibold text-white">Your Preferences</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Quiet Hours</span>
                  <span className="text-white text-sm">{aiInsights?.userPreferences.quietHoursStart} - {aiInsights?.userPreferences.quietHoursEnd}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Preferred Channel</span>
                  <span className="text-white text-sm">Push Notifications</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Response Rate</span>
                  <span className="text-green-400 text-sm">{Math.round(aiInsights?.userPreferences.responseRate.smart * 100)}%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Notification Rules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Notification Rules</h2>
            <button
              onClick={() => setShowAddRule(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center gap-2"
            >
              <Plus size={16} />
              Add Rule
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rules.map((rule) => (
              <div key={rule.id} className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/30">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Zap className="text-yellow-400" size={16} />
                    <span className="text-white font-medium capitalize">{rule.type}</span>
                  </div>
                  <button
                    onClick={() => toggleRule(rule.id)}
                    className={`p-1 rounded-lg transition-all duration-300 ${
                      rule.enabled 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-gray-500/20 text-gray-400'
                    }`}
                  >
                    {rule.enabled ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                </div>
                
                <p className="text-gray-300 text-sm mb-3">{rule.condition}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="text-gray-400" size={14} />
                    <span className="text-gray-400 text-xs capitalize">{rule.timing}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {rule.channels.map((channel) => (
                      <div key={channel} className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl p-6 border border-purple-500/30"
        >
          <div className="flex items-center gap-3 mb-6">
            <Brain className="text-purple-400" size={24} />
            <h2 className="text-xl font-semibold text-white">AI Recommendations</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiInsights?.recommendations.map((recommendation: string, index: number) => (
              <div key={index} className="flex items-start gap-3 bg-gray-800/30 rounded-xl p-4">
                <Brain className="text-purple-400 mt-1 flex-shrink-0" size={16} />
                <p className="text-gray-300 text-sm">{recommendation}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Add Rule Modal */}
        <AnimatePresence>
          {showAddRule && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700/50 shadow-2xl max-w-md w-full"
              >
                <h3 className="text-xl font-semibold text-white mb-4">Add Notification Rule</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                    <select
                      value={newRule.type}
                      onChange={(e) => setNewRule({...newRule, type: e.target.value as any})}
                      className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                      <option value="task">Task</option>
                      <option value="reminder">Reminder</option>
                      <option value="achievement">Achievement</option>
                      <option value="insight">Insight</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Condition</label>
                    <input
                      type="text"
                      value={newRule.condition || ''}
                      onChange={(e) => setNewRule({...newRule, condition: e.target.value})}
                      placeholder="e.g., High priority task due within 2 hours"
                      className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Timing</label>
                    <select
                      value={newRule.timing}
                      onChange={(e) => setNewRule({...newRule, timing: e.target.value as any})}
                      className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                      <option value="immediate">Immediate</option>
                      <option value="smart">Smart (AI Optimized)</option>
                      <option value="scheduled">Scheduled</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowAddRule(false)}
                    className="flex-1 px-4 py-2 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-600/50 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addRule}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                  >
                    Add Rule
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SmartNotifications; 