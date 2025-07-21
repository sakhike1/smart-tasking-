import React, { useState } from 'react';
import { 
  BarChart3, 
  Calendar,
  Zap,
  Award,
  Activity,
  Settings,
  Plus
} from 'lucide-react';

interface Widget {
  id: string;
  type: 'productivity' | 'tasks' | 'calendar' | 'streaks' | 'quickActions' | 'motivation';
  title: string;
  enabled: boolean;
  size: 'small' | 'medium' | 'large';
  position: number;
}

interface DashboardWidgetsProps {
  userStats: any;
  userTasks: any[];
}

const DashboardWidgets: React.FC<DashboardWidgetsProps> = ({ userStats, userTasks }) => {
  const [widgets, setWidgets] = useState<Widget[]>([
    { id: '1', type: 'productivity', title: 'Productivity Score', enabled: true, size: 'medium', position: 1 },
    { id: '2', type: 'tasks', title: 'Task Overview', enabled: true, size: 'large', position: 2 },
    { id: '3', type: 'calendar', title: 'Upcoming Deadlines', enabled: true, size: 'medium', position: 3 },
    { id: '4', type: 'streaks', title: 'Productivity Streaks', enabled: true, size: 'small', position: 4 },
    { id: '5', type: 'quickActions', title: 'Quick Actions', enabled: true, size: 'small', position: 5 },
    { id: '6', type: 'motivation', title: 'Daily Motivation', enabled: true, size: 'medium', position: 6 },
  ]);
  const [showSettings, setShowSettings] = useState(false);

  const toggleWidget = (widgetId: string) => {
    setWidgets(prev => prev.map(w => 
      w.id === widgetId ? { ...w, enabled: !w.enabled } : w
    ));
  };

  const changeWidgetSize = (widgetId: string, size: 'small' | 'medium' | 'large') => {
    setWidgets(prev => prev.map(w => 
      w.id === widgetId ? { ...w, size } : w
    ));
  };

  const getWidgetContent = (widget: Widget) => {
    switch (widget.type) {
      case 'productivity':
        return (
          <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-6 border border-blue-500/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Productivity Score</h3>
              <Award className="text-blue-400" size={24} />
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">
                {Math.round((userStats.completionRate + (100 - userStats.overdue * 10)) / 2)}%
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3 mb-3">
                <div 
                  className="bg-gradient-to-r from-blue-400 to-purple-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${Math.round((userStats.completionRate + (100 - userStats.overdue * 10)) / 2)}%` }}
                ></div>
              </div>
              <p className="text-gray-300 text-sm">
                {userStats.completionRate > 80 ? 'Excellent work!' : 
                 userStats.completionRate > 60 ? 'Good progress!' : 'Keep going!'}
              </p>
            </div>
          </div>
        );

      case 'tasks':
        return (
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">Task Overview</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{userStats.completed}</div>
                <div className="text-gray-400 text-sm">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">{userStats.pending}</div>
                <div className="text-gray-400 text-sm">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{userStats.inProgress}</div>
                <div className="text-gray-400 text-sm">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">{userStats.overdue}</div>
                <div className="text-gray-400 text-sm">Overdue</div>
              </div>
            </div>
          </div>
        );

      case 'calendar':
        return (
          <div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-2xl p-6 border border-green-500/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Upcoming Deadlines</h3>
              <Calendar className="text-green-400" size={24} />
            </div>
            <div className="space-y-3">
              {userTasks
                .filter(task => task.status !== 'completed' && new Date(task.dueDate) > new Date())
                .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                .slice(0, 3)
                .map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
                    <div>
                      <div className="text-white font-medium text-sm">{task.title}</div>
                      <div className="text-gray-300 text-xs">
                        {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                      task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                ))}
              {userTasks.filter(task => task.status !== 'completed' && new Date(task.dueDate) > new Date()).length === 0 && (
                <div className="text-center text-gray-400 text-sm py-4">
                  No upcoming deadlines! 🎉
                </div>
              )}
            </div>
          </div>
        );

      case 'streaks':
        return (
          <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl p-6 border border-orange-500/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Productivity Streak</h3>
              <Zap className="text-orange-400" size={24} />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {Math.min(userStats.completed, 7)} 🔥
              </div>
              <p className="text-gray-300 text-sm">
                {userStats.completed >= 7 ? 'Amazing streak!' : 
                 userStats.completed >= 3 ? 'Great momentum!' : 'Building up!'}
              </p>
            </div>
          </div>
        );

      case 'quickActions':
        return (
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full p-3 bg-white/10 rounded-xl text-white text-sm hover:bg-white/20 transition-all duration-300 flex items-center gap-2">
                <Plus size={16} />
                Add Task
              </button>
              <button className="w-full p-3 bg-white/10 rounded-xl text-white text-sm hover:bg-white/20 transition-all duration-300 flex items-center gap-2">
                <Calendar size={16} />
                View Calendar
              </button>
              <button className="w-full p-3 bg-white/10 rounded-xl text-white text-sm hover:bg-white/20 transition-all duration-300 flex items-center gap-2">
                <BarChart3 size={16} />
                Analytics
              </button>
            </div>
          </div>
        );

      case 'motivation':
        return (
          <div className="bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-2xl p-6 border border-indigo-500/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Daily Motivation</h3>
              <Activity className="text-indigo-400" size={24} />
            </div>
            <div className="text-center">
              <p className="text-gray-300 text-sm italic mb-3">
                "The only way to do great work is to love what you do."
              </p>
              <div className="text-indigo-400 text-xs">- Steve Jobs</div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getWidgetSizeClass = (size: string) => {
    switch (size) {
      case 'small': return 'col-span-1';
      case 'medium': return 'col-span-1 md:col-span-2';
      case 'large': return 'col-span-1 md:col-span-2 lg:col-span-3';
      default: return 'col-span-1';
    }
  };

  return (
    <div className="mb-8">
      {/* Widget Settings Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 text-gray-300 rounded-xl hover:bg-gray-600/50 transition-all duration-300"
        >
          <Settings size={16} />
          Customize Dashboard
        </button>
      </div>

      {/* Widget Settings Panel */}
      {showSettings && (
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Dashboard Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {widgets.map((widget) => (
              <div key={widget.id} className="bg-gray-700/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-medium">{widget.title}</h4>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={widget.enabled}
                      onChange={() => toggleWidget(widget.id)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </label>
                </div>
                <div className="flex gap-2">
                  {(['small', 'medium', 'large'] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => changeWidgetSize(widget.id, size)}
                      className={`px-2 py-1 rounded text-xs ${
                        widget.size === size
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                      }`}
                    >
                      {size.charAt(0).toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {widgets
          .filter(widget => widget.enabled)
          .sort((a, b) => a.position - b.position)
          .map((widget) => (
            <div key={widget.id} className={getWidgetSizeClass(widget.size)}>
              {getWidgetContent(widget)}
            </div>
          ))}
      </div>
    </div>
  );
};

export default DashboardWidgets; 