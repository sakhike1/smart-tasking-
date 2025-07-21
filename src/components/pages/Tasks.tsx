import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Calendar, 
  CheckCircle, 
  AlertTriangle, 
  Search,
  Bell,
  X,
  Edit,
  Trash2,
  Tag,
  User,
  Save,
  Loader2
} from 'lucide-react';
import { useTaskStore } from '../../stores/taskStore';
import { useAuthStore } from '../../stores/authStore';
import type { Task, NewTask } from '../../stores/taskStore';
import SimpleDropdown from '../ui/SimpleDropdown';
import KanbanBoard from '../KanbanBoard';

const Tasks: React.FC = () => {
  const { addTask, updateTask, deleteTask, updateTaskStatus, getUserTasks } = useTaskStore();
  const { user } = useAuthStore();
  
  // Get user-specific tasks
  const userTasks = user?.email ? getUserTasks(user.email) : [];
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority' | 'created'>('dueDate');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const [newTask, setNewTask] = useState<NewTask>({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    category: 'Work',
    assignedTo: '',
    tags: [],
    reminder: ''
  });

  const [editForm, setEditForm] = useState<{
    title?: string;
    description?: string;
    dueDate?: string;
    priority?: 'low' | 'medium' | 'high';
    category?: string;
    assignedTo?: string;
    tags?: string[];
    reminder?: string;
  }>({});

  const handleAddTask = () => {
    if (!newTask.title.trim() || !newTask.description.trim() || !newTask.dueDate) {
      return;
    }

    addTask(newTask);
    setNewTask({
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium',
      category: 'Work',
      assignedTo: '',
      tags: [],
      reminder: ''
    });
    setShowAddTask(false);
  };

  const handleEditTask = () => {
    if (!editingTask || !editForm.title?.trim() || !editForm.description?.trim()) {
      return;
    }

    updateTask(editingTask.id, {
      ...editForm,
      dueDate: editForm.dueDate ? new Date(editForm.dueDate as string) : editingTask.dueDate,
      reminder: editForm.reminder ? new Date(editForm.reminder as string) : editingTask.reminder
    });

    setEditingTask(null);
    setEditForm({});
  };

  const handleStartEdit = (task: Task) => {
    setEditingTask(task);
    setEditForm({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate.toISOString().slice(0, 16),
      priority: task.priority,
      category: task.category,
      assignedTo: task.assignedTo,
      tags: task.tags,
      reminder: task.reminder.toISOString().slice(0, 16)
    });
  };

  const handleInputChange = (field: keyof NewTask, value: string | string[]) => {
    setNewTask(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEditInputChange = (field: keyof typeof editForm, value: string | string[]) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const filteredTasks = userTasks.filter(task => {
    const matchesStatusFilter = filter === 'all' || task.status === filter;
    const matchesPriorityFilter = priorityFilter === 'all' || task.priority === priorityFilter;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatusFilter && matchesPriorityFilter && matchesSearch;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'in-progress': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'pending': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const isOverdue = (dueDate: Date) => {
    return dueDate < new Date();
  };



  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <Loader2 className="w-12 h-12 text-red-400 animate-spin mx-auto mb-4" />
            <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-red-600/20 rounded-full blur-xl"></div>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Loading Tasks</h2>
          <p className="text-gray-400">Please wait while we fetch your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Header */}
      <div className="pt-32 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Task Management</h1>
              <p className="text-gray-300">Manage and organize your tasks efficiently</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0">
              <div className="flex bg-gray-700/50 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    viewMode === 'list' 
                      ? 'bg-orange-500 text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  List View
                </button>
                <button
                  onClick={() => setViewMode('kanban')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    viewMode === 'kanban' 
                      ? 'bg-orange-500 text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Kanban Board
                </button>
              </div>
              <button
                onClick={() => setShowAddTask(true)}
                className="bg-gradient-to-r from-red-400 to-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-500 hover:to-red-700 transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Plus className="mr-2" size={20} />
                Add New Task
              </button>
            </div>
          </div>



          {/* View Mode Content */}
          {viewMode === 'list' ? (
            <>
              {/* Filters */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300"
                  />
                </div>

                {/* Status Filter */}
                <SimpleDropdown
                  value={filter}
                  onChange={(value) => setFilter(value as any)}
                  options={[
                    { value: 'all', label: 'All Status' },
                    { value: 'pending', label: 'Pending' },
                    { value: 'in-progress', label: 'In Progress' },
                    { value: 'completed', label: 'Completed' }
                  ]}
                  placeholder="All Status"
                />

                {/* Priority Filter */}
                <SimpleDropdown
                  value={priorityFilter}
                  onChange={(value) => setPriorityFilter(value as any)}
                  options={[
                    { value: 'all', label: 'All Priorities' },
                    { value: 'high', label: 'High Priority' },
                    { value: 'medium', label: 'Medium Priority' },
                    { value: 'low', label: 'Low Priority' }
                  ]}
                  placeholder="All Priorities"
                />

                {/* Sort */}
                <SimpleDropdown
                  value={sortBy}
                  onChange={(value) => setSortBy(value as 'dueDate' | 'priority' | 'created')}
                  options={[
                    { value: 'dueDate', label: 'Sort by Due Date' },
                    { value: 'priority', label: 'Sort by Priority' },
                    { value: 'created', label: 'Sort by Created' }
                  ]}
                  placeholder="Sort by Due Date"
                />
              </div>

              {/* Tasks Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTasks.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl p-8 border border-gray-700/50">
                  <CheckCircle className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-gray-400 text-lg">No tasks found</p>
                  <p className="text-gray-500">Create your first task to get started</p>
                </div>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div key={task.id} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group">
                  {/* Task Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">{task.title}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => handleStartEdit(task)}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(task.id)}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Task Description */}
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">{task.description}</p>

                  {/* Task Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Calendar size={14} />
                      <span>Due: {formatDate(task.dueDate)}</span>
                      {isOverdue(task.dueDate) && task.status !== 'completed' && (
                        <span className="text-red-400">(Overdue)</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Tag size={14} />
                      <span>{task.category}</span>
                    </div>
                    {task.assignedTo && (
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <User size={14} />
                        <span>{task.assignedTo}</span>
                      </div>
                    )}
                    {task.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {task.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                        {task.tags.length > 3 && (
                          <span className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full">
                            +{task.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Task Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateTaskStatus(task.id, 'pending')}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300 ${
                          task.status === 'pending' 
                            ? 'bg-orange-500 text-white' 
                            : 'bg-gray-700/50 text-gray-300 hover:bg-orange-500/20'
                        }`}
                      >
                        Pending
                      </button>
                      <button
                        onClick={() => updateTaskStatus(task.id, 'in-progress')}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300 ${
                          task.status === 'in-progress' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-700/50 text-gray-300 hover:bg-blue-500/20'
                        }`}
                      >
                        In Progress
                      </button>
                      <button
                        onClick={() => updateTaskStatus(task.id, 'completed')}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300 ${
                          task.status === 'completed' 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-700/50 text-gray-300 hover:bg-green-500/20'
                        }`}
                      >
                        Complete
                      </button>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-300">
                      <Bell size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <KanbanBoard />
      )}

      {/* Add Task Modal */}
      {showAddTask && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-black/80 backdrop-blur-xl rounded-3xl p-8 max-w-lg w-full border border-gray-700/50 shadow-2xl relative overflow-hidden">
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-transparent to-black/20 rounded-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">Add New Task</h2>
                  <p className="text-gray-400 text-sm mt-1">Create a new task to boost your productivity</p>
                </div>
                <button
                  onClick={() => setShowAddTask(false)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Task Title</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300 hover:bg-white/15"
                    placeholder="Enter task title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Description</label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={2}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300 resize-none hover:bg-white/15"
                    placeholder="Brief description of the task"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Due Date</label>
                    <div className="relative">
                      <input
                        type="datetime-local"
                        value={newTask.dueDate}
                        onChange={(e) => handleInputChange('dueDate', e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300 hover:bg-white/15"
                      />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Priority</label>
                    <SimpleDropdown
                      value={newTask.priority}
                      onChange={(value) => handleInputChange('priority', value as 'low' | 'medium' | 'high')}
                      options={[
                        { value: 'low', label: 'Low' },
                        { value: 'medium', label: 'Medium' },
                        { value: 'high', label: 'High' }
                      ]}
                      placeholder="Select Priority"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Category</label>
                  <SimpleDropdown
                    value={newTask.category}
                    onChange={(value) => handleInputChange('category', value)}
                    options={[
                      { value: 'Work', label: 'Work' },
                      { value: 'Personal', label: 'Personal' },
                      { value: 'Health', label: 'Health' },
                      { value: 'Finance', label: 'Finance' },
                      { value: 'Learning', label: 'Learning' }
                    ]}
                    placeholder="Select Category"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowAddTask(false)}
                    className="flex-1 px-6 py-3 bg-white/10 backdrop-blur-sm text-gray-300 rounded-xl font-medium hover:bg-white/20 transition-all duration-300 border border-gray-600/50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddTask}
                    disabled={!newTask.title.trim() || !newTask.description.trim() || !newTask.dueDate}
                    className="flex-1 px-6 py-3 bg-white text-black rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Create Task
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Task Modal */}
      {editingTask && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 max-w-md w-full border border-gray-700/50 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Edit Task</h2>
              <button
                onClick={() => {
                  setEditingTask(null);
                  setEditForm({});
                }}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-300"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Task Title</label>
                <input
                  type="text"
                  value={editForm.title || ''}
                  onChange={(e) => handleEditInputChange('title', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300"
                  placeholder="Enter task title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  value={editForm.description || ''}
                  onChange={(e) => handleEditInputChange('description', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300 resize-none"
                  placeholder="Enter task description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Due Date</label>
                <input
                  type="datetime-local"
                  value={editForm.dueDate || ''}
                  onChange={(e) => handleEditInputChange('dueDate', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
                <select
                  value={editForm.priority || 'medium'}
                  onChange={(e) => handleEditInputChange('priority', e.target.value as 'low' | 'medium' | 'high')}
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
                  value={editForm.category || 'Work'}
                  onChange={(e) => handleEditInputChange('category', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300"
                >
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Health">Health</option>
                  <option value="Finance">Finance</option>
                  <option value="Learning">Learning</option>
                </select>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => {
                    setEditingTask(null);
                    setEditForm({});
                  }}
                  className="flex-1 px-6 py-3 bg-gray-700/50 text-gray-300 rounded-xl font-medium hover:bg-gray-600/50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditTask}
                  disabled={!editForm.title?.trim() || !editForm.description?.trim()}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-xl font-medium hover:from-orange-500 hover:to-red-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Save className="mr-2" size={16} />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 max-w-md w-full border border-gray-700/50 shadow-2xl">
            <div className="text-center">
              <AlertTriangle className="mx-auto text-red-400 mb-4" size={48} />
              <h2 className="text-2xl font-bold text-white mb-4">Delete Task</h2>
              <p className="text-gray-300 mb-8">Are you sure you want to delete this task? This action cannot be undone.</p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 px-6 py-3 bg-gray-700/50 text-gray-300 rounded-xl font-medium hover:bg-gray-600/50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    deleteTask(showDeleteConfirm);
                    setShowDeleteConfirm(null);
                  }}
                  className="flex-1 px-6 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-all duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
  );
};

export default Tasks; 