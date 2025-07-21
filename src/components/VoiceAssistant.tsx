import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Loader2, Sparkles, X, Volume2, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VoiceAssistantProps {
  onClose: () => void;
  onTaskCreate: (task: any) => void;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ onClose, onTaskCreate }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [aiResponse, setAiResponse] = useState('');
  const [confidence, setConfidence] = useState(0);

  // Natural language processing for task creation
  const processVoiceCommand = (text: string) => {
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let task = {
        title: '',
        description: '',
        dueDate: '',
        priority: 'medium',
        category: 'Work'
      };

      // Extract task title
      if (lowerText.includes('remind me to') || lowerText.includes('create task')) {
        task.title = text.replace(/remind me to|create task/gi, '').trim();
      } else if (lowerText.includes('task')) {
        task.title = text.replace(/task/gi, '').trim();
      } else {
        task.title = text;
      }

      // Extract due date/time
      const timePatterns = [
        { pattern: /tomorrow/i, value: () => {
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          return tomorrow.toISOString().slice(0, 16);
        }},
        { pattern: /next week/i, value: () => {
          const nextWeek = new Date();
          nextWeek.setDate(nextWeek.getDate() + 7);
          return nextWeek.toISOString().slice(0, 16);
        }},
        { pattern: /(\d{1,2}):(\d{2})\s*(am|pm)?/i, value: (match: any) => {
          const today = new Date();
          let hours = parseInt(match[1]);
          const minutes = parseInt(match[2]);
          const period = match[3]?.toLowerCase();
          
          if (period === 'pm' && hours !== 12) hours += 12;
          if (period === 'am' && hours === 12) hours = 0;
          
          today.setHours(hours, minutes, 0, 0);
          return today.toISOString().slice(0, 16);
        }}
      ];

      for (const pattern of timePatterns) {
        const match = text.match(pattern.pattern);
        if (match) {
          task.dueDate = typeof pattern.value === 'function' ? pattern.value(match) : pattern.value;
          break;
        }
      }

      // Extract priority
      if (lowerText.includes('urgent') || lowerText.includes('high priority')) {
        task.priority = 'high';
      } else if (lowerText.includes('low priority')) {
        task.priority = 'low';
      }

      // Extract category
      if (lowerText.includes('personal') || lowerText.includes('home')) {
        task.category = 'Personal';
      } else if (lowerText.includes('health') || lowerText.includes('exercise')) {
        task.category = 'Health';
      } else if (lowerText.includes('finance') || lowerText.includes('money')) {
        task.category = 'Finance';
      } else if (lowerText.includes('learning') || lowerText.includes('study')) {
        task.category = 'Learning';
      }

      // Generate AI response
      const responses = [
        `I've created a task: "${task.title}"${task.dueDate ? ` due ${new Date(task.dueDate).toLocaleString()}` : ''}`,
        `Perfect! I've added "${task.title}" to your tasks${task.priority === 'high' ? ' with high priority' : ''}`,
        `Task created successfully! "${task.title}" is now in your ${task.category} category`,
        `Got it! "${task.title}" has been added to your task list`
      ];

      setAiResponse(responses[Math.floor(Math.random() * responses.length)]);
      setConfidence(0.85 + Math.random() * 0.1);
      
      // Create the task
      onTaskCreate(task);
      setIsProcessing(false);
    }, 1500);
  };

  // Simulate speech recognition
  const startListening = () => {
    setIsListening(true);
    setTranscript('');
    setAiResponse('');
    
    // Simulate voice input
    setTimeout(() => {
      const sampleCommands = [
        "Remind me to call John tomorrow at 3 PM",
        "Create a task to review the project proposal by Friday",
        "Add a high priority task to finish the presentation",
        "Schedule a meeting with the team next week",
        "Create a personal task to go to the gym tomorrow morning"
      ];
      
      const randomCommand = sampleCommands[Math.floor(Math.random() * sampleCommands.length)];
      setTranscript(randomCommand);
      processVoiceCommand(randomCommand);
      setIsListening(false);
    }, 2000);
  };

  const stopListening = () => {
    setIsListening(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl p-8 max-w-2xl w-full border border-gray-700/50 shadow-2xl relative overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10 animate-pulse"></div>
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                <Brain className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">AI Voice Assistant</h2>
                <p className="text-gray-400 text-sm">Speak naturally to create tasks</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
            >
              <X size={20} />
            </button>
          </div>

          {/* Voice Interface */}
          <div className="text-center mb-8">
            <motion.div
              animate={isListening ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 1, repeat: isListening ? Infinity : 0 }}
              className="relative inline-block"
            >
              <button
                onClick={isListening ? stopListening : startListening}
                disabled={isProcessing}
                className={`w-24 h-24 rounded-full flex items-center justify-center text-white font-semibold text-lg transition-all duration-300 ${
                  isListening 
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 shadow-lg shadow-red-500/50' 
                    : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
                } ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
              >
                {isProcessing ? (
                  <Loader2 className="animate-spin" size={32} />
                ) : isListening ? (
                  <MicOff size={32} />
                ) : (
                  <Mic size={32} />
                )}
              </button>
              
              {/* Ripple Effect */}
              {isListening && (
                <div className="absolute inset-0 rounded-full bg-red-500/30 animate-ping"></div>
              )}
            </motion.div>
            
            <p className="text-gray-400 mt-4">
              {isListening ? 'Listening... Speak now!' : 
               isProcessing ? 'Processing your request...' : 
               'Click the microphone to start'}
            </p>
          </div>

          {/* Transcript Display */}
          <AnimatePresence>
            {transcript && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6"
              >
                <div className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Volume2 className="text-purple-400" size={16} />
                    <span className="text-sm font-medium text-gray-400">You said:</span>
                  </div>
                  <p className="text-white text-lg">{transcript}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* AI Response */}
          <AnimatePresence>
            {aiResponse && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6"
              >
                <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl p-4 border border-purple-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="text-purple-400" size={16} />
                    <span className="text-sm font-medium text-purple-400">AI Assistant:</span>
                    <div className="flex items-center gap-1 ml-auto">
                      <span className="text-xs text-gray-400">Confidence:</span>
                      <span className="text-xs text-green-400">{Math.round(confidence * 100)}%</span>
                    </div>
                  </div>
                  <p className="text-white">{aiResponse}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Suggestions */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white mb-3">Try saying:</h3>
            <div className="grid grid-cols-1 gap-2">
              {[
                "Remind me to call John tomorrow at 3 PM",
                "Create a high priority task to finish the presentation",
                "Add a personal task to go to the gym",
                "Schedule a meeting with the team next week"
              ].map((suggestion, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setTranscript(suggestion);
                    processVoiceCommand(suggestion);
                  }}
                  className="text-left p-3 bg-gray-800/30 rounded-xl border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300"
                >
                  <p className="text-gray-300 text-sm">{suggestion}</p>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VoiceAssistant; 