import React, { useState } from 'react';
import { 
  Plus, 
  MoreVertical, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Target,
  Move,
  Edit,
  Trash2
} from 'lucide-react';
import { useTaskStore } from '../stores/taskStore';
import { useAuthStore } from '../stores/authStore';
import type { Task } from '../stores/taskStore';

interface KanbanColumn {
  id: string;
  title: string;
  status: Task['status'];
  color: string;
  icon: React.ReactNode;
}

const KanbanBoard: React.FC = () => {
  const { getUserTasks, updateTaskStatus, deleteTask } = useTaskStore();
  const { user } = useAuthStore();
  
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [showAddTask, setShowAddTask] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const userTasks = user?.email ? getUserTasks(user.email) : [];

  const columns: KanbanColumn[] = [
    {
      id: 'pending',
      title: 'To Do',
      status: 'pending',
      color: 'from-orange-500/20 to-red-500/20 border-orange-500/30',
      icon: <Target className="text-orange-400" size={20} />
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      status: 'in-progress',
      color: 'from-blue-500/20 to-purple-500/20 border-blue-500/30',
      icon: <Clock className="text-blue-400" size={20} />
    },
    {
      id: 'completed',
      title: 'Done',
      status: 'completed',
      color: 'from-green-500/20 to-teal-500/20 border-green-500/30',
      icon: <CheckCircle className="text-green-400" size={20} />
    }
  ];

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, status: Task['status']) => {
    e.preventDefault();
    if (draggedTask && draggedTask.status !== status) {
      updateTaskStatus(draggedTask.id, status);
    }
    setDraggedTask(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const isOverdue = (dueDate: Date) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Kanban Board</h1>
          <p className="text-gray-300">Drag and drop tasks to manage your workflow</p>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {columns.map((column) => (
            <div
              key={column.id}
              className={`bg-gradient-to-br ${column.color} rounded-2xl p-6 border shadow-xl`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  {column.icon}
                  <h2 className="text-xl font-semibold text-white">{column.title}</h2>
                  <span className="bg-white/20 text-white text-sm px-2 py-1 rounded-full">
                    {userTasks.filter(task => task.status === column.status).length}
                  </span>
                </div>
                {column.status === 'pending' && (
                  <button
                    onClick={() => setShowAddTask(true)}
                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                  >
                    <Plus size={20} />
                  </button>
                )}
              </div>

              {/* Tasks */}
              <div
                className="space-y-4 min-h-[400px]"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.status)}
              >
                {userTasks
                  .filter(task => task.status === column.status)
                  .map((task) => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task)}
                      className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 cursor-move group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-white font-medium text-sm leading-tight">{task.title}</h3>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button
                            onClick={() => setEditingTask(task)}
                            className="p-1 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded transition-all duration-300"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="p-1 text-gray-400 hover:text-red-400 hover:bg-red-500/20 rounded transition-all duration-300"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 text-xs mb-3 line-clamp-2">{task.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                          <span className="text-gray-400 text-xs">{task.category}</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <span className={`text-xs ${
                            isOverdue(task.dueDate) && task.status !== 'completed' 
                              ? 'text-red-400' 
                              : 'text-gray-400'
                          }`}>
                            {formatDate(task.dueDate)}
                          </span>
                          {isOverdue(task.dueDate) && task.status !== 'completed' && (
                            <AlertTriangle className="text-red-400" size={12} />
                          )}
                        </div>
                      </div>

                      {/* Tags */}
                      {task.tags && task.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {task.tags.slice(0, 2).map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                          {task.tags.length > 2 && (
                            <span className="px-2 py-1 bg-gray-700/50 text-gray-400 text-xs rounded-full">
                              +{task.tags.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                
                {/* Empty State */}
                {userTasks.filter(task => task.status === column.status).length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <div className="w-12 h-12 bg-gray-700/50 rounded-xl flex items-center justify-center mx-auto mb-3">
                      {column.icon}
                    </div>
                    <p className="text-sm">No tasks here</p>
                    {column.status === 'pending' && (
                      <button
                        onClick={() => setShowAddTask(true)}
                        className="mt-2 text-orange-400 hover:text-orange-300 text-sm"
                      >
                        Add your first task
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Drag Instructions */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-xl text-gray-400 text-sm">
            <Move size={16} />
            Drag tasks between columns to update their status
          </div>
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard; 