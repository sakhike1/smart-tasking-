import React, { useState } from 'react';
import { 
  Plus, 
  Target, 
  Zap, 
  Lightbulb,
  Sparkles,
  X,
  CheckCircle
} from 'lucide-react';
import { useTaskStore } from '../stores/taskStore';
import { useAuthStore } from '../stores/authStore';
import type { NewTask } from '../stores/taskStore';

interface SmartSuggestion {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  confidence: number;
  reason: string;
}

const SmartTaskCreator: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { addTask, getUserTasks } = useTaskStore();
  const { user } = useAuthStore();
  

  const [naturalLanguage, setNaturalLanguage] = useState('');
  const [parsedTask, setParsedTask] = useState<NewTask>({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    category: 'Work'
  });
  const [suggestions, setSuggestions] = useState<SmartSuggestion[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Get user's task history for smart suggestions
  const userTasks = user?.email ? getUserTasks(user.email) : [];

  // Parse natural language input
  const parseNaturalLanguage = (input: string) => {
    setIsProcessing(true);
    
    // Simple NLP parsing (in a real app, this would use a proper NLP service)
    const lowerInput = input.toLowerCase();
    
    // Extract priority
    let priority: 'low' | 'medium' | 'high' = 'medium';
    if (lowerInput.includes('urgent') || lowerInput.includes('asap') || lowerInput.includes('critical')) {
      priority = 'high';
    } else if (lowerInput.includes('low priority') || lowerInput.includes('when possible')) {
      priority = 'low';
    }

    // Extract category
    let category = 'Work';
    if (lowerInput.includes('personal') || lowerInput.includes('home') || lowerInput.includes('family')) {
      category = 'Personal';
    } else if (lowerInput.includes('health') || lowerInput.includes('gym') || lowerInput.includes('exercise')) {
      category = 'Health';
    } else if (lowerInput.includes('finance') || lowerInput.includes('money') || lowerInput.includes('budget')) {
      category = 'Finance';
    } else if (lowerInput.includes('learning') || lowerInput.includes('study') || lowerInput.includes('course')) {
      category = 'Learning';
    }

    // Extract due date
    let dueDate = '';
    const today = new Date();
    if (lowerInput.includes('today')) {
      dueDate = today.toISOString().slice(0, 16);
    } else if (lowerInput.includes('tomorrow')) {
      const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
      dueDate = tomorrow.toISOString().slice(0, 16);
    } else if (lowerInput.includes('next week')) {
      const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      dueDate = nextWeek.toISOString().slice(0, 16);
    }

    // Extract title and description
    const title = input.split(' ').slice(0, 5).join(' '); // First 5 words as title
    const description = input;

    setParsedTask({
      title,
      description,
      dueDate,
      priority,
      category
    });

    // Generate smart suggestions
    generateSuggestions();
    
    setIsProcessing(false);
  };

  // Generate smart suggestions based on user patterns
  const generateSuggestions = () => {
    const userCategories = userTasks.reduce((acc, task) => {
      acc[task.category] = (acc[task.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const mostUsedCategory = Object.entries(userCategories)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'Work';

    const suggestions: SmartSuggestion[] = [
      {
        id: '1',
        title: 'Follow up on previous task',
        description: 'Check status of recent incomplete tasks',
        category: mostUsedCategory,
        priority: 'medium',
        confidence: 0.8,
        reason: 'Based on your task completion patterns'
      },
      {
        id: '2',
        title: 'Review weekly progress',
        description: 'Analyze this week\'s productivity and plan next week',
        category: 'Work',
        priority: 'high',
        confidence: 0.7,
        reason: 'It\'s the end of your typical review cycle'
      },
      {
        id: '3',
        title: 'Schedule break time',
        description: 'Plan a short break to maintain productivity',
        category: 'Personal',
        priority: 'low',
        confidence: 0.6,
        reason: 'You\'ve been working for several hours'
      }
    ];

    setSuggestions(suggestions);
  };

  const handleSubmit = () => {
    if (!parsedTask.title.trim()) return;
    
    addTask(parsedTask);
    setNaturalLanguage('');
    setParsedTask({
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium',
      category: 'Work'
    });
    setSuggestions([]);
    onClose();
  };

  const applySuggestion = (suggestion: SmartSuggestion) => {
    setParsedTask({
      title: suggestion.title,
      description: suggestion.description,
      dueDate: '',
      priority: suggestion.priority,
      category: suggestion.category
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 max-w-2xl w-full border border-gray-700/50 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
              <Sparkles className="text-white" size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Smart Task Creator</h2>
              <p className="text-gray-400 text-sm">AI-powered task creation with intelligent suggestions</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-300"
          >
            <X size={20} />
          </button>
        </div>

        {/* Natural Language Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-3">
            <Lightbulb className="inline mr-2 text-orange-400" size={16} />
            Describe your task naturally
          </label>
          <textarea
            value={naturalLanguage}
            onChange={(e) => setNaturalLanguage(e.target.value)}
            onBlur={() => naturalLanguage && parseNaturalLanguage(naturalLanguage)}
            rows={3}
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300 resize-none"
            placeholder="e.g., 'Urgent meeting with client tomorrow at 3pm about project proposal'"
          />
          {isProcessing && (
            <div className="flex items-center gap-2 mt-2 text-orange-400 text-sm">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-400"></div>
              Processing your request...
            </div>
          )}
        </div>

        {/* Smart Suggestions */}
        {suggestions.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Zap className="text-yellow-400" size={18} />
              Smart Suggestions
            </h3>
            <div className="space-y-3">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/30 hover:border-orange-500/50 transition-all duration-300 cursor-pointer group"
                  onClick={() => applySuggestion(suggestion)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-white font-medium mb-1">{suggestion.title}</h4>
                      <p className="text-gray-300 text-sm mb-2">{suggestion.description}</p>
                      <div className="flex items-center gap-3 text-xs">
                        <span className={`px-2 py-1 rounded-full ${
                          suggestion.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                          suggestion.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {suggestion.priority}
                        </span>
                        <span className="text-gray-400">{suggestion.category}</span>
                        <span className="text-gray-400">{suggestion.confidence * 100}% confidence</span>
                      </div>
                    </div>
                    <CheckCircle className="text-gray-400 group-hover:text-orange-400 transition-colors duration-300" size={20} />
                  </div>
                  <p className="text-gray-500 text-xs mt-2 italic">{suggestion.reason}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Parsed Task Preview */}
        {parsedTask.title && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Target className="text-blue-400" size={18} />
              Task Preview
            </h3>
            <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/30">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Task Title</label>
                  <input
                    type="text"
                    value={parsedTask.title}
                    onChange={(e) => setParsedTask(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea
                    value={parsedTask.description}
                    onChange={(e) => setParsedTask(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Due Date</label>
                    <input
                      type="datetime-local"
                      value={parsedTask.dueDate}
                      onChange={(e) => setParsedTask(prev => ({ ...prev, dueDate: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
                    <select
                      value={parsedTask.priority}
                      onChange={(e) => setParsedTask(prev => ({ ...prev, priority: e.target.value as any }))}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                    <select
                      value={parsedTask.category}
                      onChange={(e) => setParsedTask(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300"
                    >
                      <option value="Work">Work</option>
                      <option value="Personal">Personal</option>
                      <option value="Health">Health</option>
                      <option value="Finance">Finance</option>
                      <option value="Learning">Learning</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gray-700/50 text-gray-300 rounded-xl font-medium hover:bg-gray-600/50 transition-all duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!parsedTask.title.trim()}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-xl font-medium hover:from-orange-500 hover:to-red-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            Create Smart Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmartTaskCreator; 