import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Square, 
  RotateCcw, 
  Clock, 
  Timer,
  Coffee,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useTaskStore } from '../stores/taskStore';
import { useAuthStore } from '../stores/authStore';

interface TimeTrackerProps {
  taskId?: string;
  onTimeUpdate?: (minutes: number) => void;
}

const TimeTracker: React.FC<TimeTrackerProps> = ({ taskId, onTimeUpdate }) => {
  const { getTaskById, updateTask } = useTaskStore();
  const { user } = useAuthStore();
  
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0); // in seconds
  const [mode, setMode] = useState<'work' | 'break' | 'longBreak'>('work');
  const [cycles, setCycles] = useState(0);
  const [isPomodoro, setIsPomodoro] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const task = taskId ? getTaskById(taskId) : null;

  // Pomodoro settings
  const WORK_TIME = 25 * 60; // 25 minutes
  const BREAK_TIME = 5 * 60; // 5 minutes
  const LONG_BREAK_TIME = 15 * 60; // 15 minutes
  const CYCLES_BEFORE_LONG_BREAK = 4;

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => {
          if (prevTime <= 1) {
            // Timer finished
            handleTimerComplete();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    
    if (mode === 'work') {
      setCycles(prev => prev + 1);
      
      // Check if it's time for a long break
      if ((cycles + 1) % CYCLES_BEFORE_LONG_BREAK === 0) {
        setMode('longBreak');
        setTime(LONG_BREAK_TIME);
      } else {
        setMode('break');
        setTime(BREAK_TIME);
      }
      
      // Update task time if tracking for a specific task
      if (taskId && task) {
        const currentActualTime = task.actualTime || 0;
        const newActualTime = currentActualTime + (WORK_TIME / 60); // Convert to minutes
        updateTask(taskId, { actualTime: newActualTime });
        onTimeUpdate?.(newActualTime);
      }
    } else {
      // Break finished, back to work
      setMode('work');
      setTime(WORK_TIME);
    }
  };

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(WORK_TIME);
    setMode('work');
  };

  const skipTimer = () => {
    handleTimerComplete();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getModeColor = () => {
    switch (mode) {
      case 'work': return 'from-red-500/20 to-orange-500/20 border-red-500/30';
      case 'break': return 'from-green-500/20 to-blue-500/20 border-green-500/30';
      case 'longBreak': return 'from-purple-500/20 to-pink-500/20 border-purple-500/30';
      default: return 'from-gray-500/20 to-gray-600/20 border-gray-500/30';
    }
  };

  const getModeIcon = () => {
    switch (mode) {
      case 'work': return <Timer className="text-red-400" size={24} />;
      case 'break': return <Coffee className="text-green-400" size={24} />;
      case 'longBreak': return <CheckCircle className="text-purple-400" size={24} />;
      default: return <Clock className="text-gray-400" size={24} />;
    }
  };

  const getModeTitle = () => {
    switch (mode) {
      case 'work': return 'Focus Time';
      case 'break': return 'Short Break';
      case 'longBreak': return 'Long Break';
      default: return 'Timer';
    }
  };

  const getProgressPercentage = () => {
    const totalTime = mode === 'work' ? WORK_TIME : mode === 'break' ? BREAK_TIME : LONG_BREAK_TIME;
    return ((totalTime - time) / totalTime) * 100;
  };

  return (
    <div className={`bg-gradient-to-br ${getModeColor()} rounded-2xl p-6 border shadow-xl`}>
      <div className="text-center">
        {/* Mode Header */}
        <div className="flex items-center justify-center gap-3 mb-4">
          {getModeIcon()}
          <h3 className="text-xl font-semibold text-white">{getModeTitle()}</h3>
        </div>

        {/* Timer Display */}
        <div className="mb-6">
          <div className="text-6xl font-bold text-white mb-4 font-mono">
            {formatTime(time)}
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-3 mb-4">
            <div 
              className="bg-white h-3 rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
          
          {/* Cycles Counter */}
          <div className="text-gray-300 text-sm">
            Cycle {cycles + 1} of {CYCLES_BEFORE_LONG_BREAK}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-6">
          {!isRunning ? (
            <button
              onClick={startTimer}
              className="w-16 h-16 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
            >
              <Play size={24} />
            </button>
          ) : (
            <button
              onClick={pauseTimer}
              className="w-16 h-16 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
            >
              <Pause size={24} />
            </button>
          )}
          
          <button
            onClick={resetTimer}
            className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300"
          >
            <RotateCcw size={20} />
          </button>
          
          <button
            onClick={skipTimer}
            className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300"
          >
            <Square size={20} />
          </button>
        </div>

        {/* Task Info */}
        {task && (
          <div className="bg-white/10 rounded-xl p-4">
            <h4 className="text-white font-medium mb-2">{task.title}</h4>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-300">
                Estimated: {task.timeEstimate || 0} min
              </span>
              <span className="text-gray-300">
                Actual: {task.actualTime || 0} min
              </span>
            </div>
            {task.timeEstimate && task.actualTime && (
              <div className="mt-2">
                <div className="flex items-center gap-2 text-sm">
                  {task.actualTime > task.timeEstimate ? (
                    <AlertCircle className="text-red-400" size={14} />
                  ) : (
                    <CheckCircle className="text-green-400" size={14} />
                  )}
                  <span className={task.actualTime > task.timeEstimate ? 'text-red-400' : 'text-green-400'}>
                    {task.actualTime > task.timeEstimate ? 'Over' : 'Under'} by {Math.abs(task.actualTime - task.timeEstimate)} min
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Pomodoro Toggle */}
        <div className="mt-4">
          <label className="flex items-center justify-center gap-2 text-sm text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={isPomodoro}
              onChange={(e) => {
                setIsPomodoro(e.target.checked);
                if (e.target.checked) {
                  setTime(WORK_TIME);
                  setMode('work');
                } else {
                  setTime(0);
                  setMode('work');
                }
              }}
              className="w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500 focus:ring-2"
            />
            <span>Pomodoro Mode</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default TimeTracker; 