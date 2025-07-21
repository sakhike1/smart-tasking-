import React from 'react';
import { CheckSquare, Zap, Target, TrendingUp, Calendar, Users, Star, Shield } from 'lucide-react';

const Features: React.FC = () => {

  const features = [
    {
      icon: <CheckSquare className="text-orange-400" size={24} />,
      title: "Smart Task Prioritization",
      description: "AI automatically ranks your tasks based on deadlines, importance, and your work patterns.",
      color: "from-orange-400 to-red-500"
    },
    {
      icon: <Zap className="text-blue-400" size={24} />,
      title: "Intelligent Automation",
      description: "Set up workflows that automatically create, assign, and track tasks based on triggers.",
      color: "from-blue-400 to-purple-500"
    },
    {
      icon: <Target className="text-green-400" size={24} />,
      title: "Goal Tracking",
      description: "Set milestones and track progress with visual indicators and smart reminders.",
      color: "from-green-400 to-teal-500"
    },
    {
      icon: <TrendingUp className="text-purple-400" size={24} />,
      title: "Progress Analytics",
      description: "Get insights into your productivity patterns with detailed reports and charts.",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: <Calendar className="text-indigo-400" size={24} />,
      title: "Smart Scheduling",
      description: "AI suggests optimal times for tasks based on your calendar and energy levels.",
      color: "from-indigo-400 to-blue-500"
    },
    {
      icon: <Users className="text-cyan-400" size={24} />,
      title: "Team Collaboration",
      description: "Share tasks, assign responsibilities, and track team progress in real-time.",
      color: "from-cyan-400 to-blue-500"
    }
  ];

  const stats = [
    { number: "500K+", label: "Tasks Completed", icon: <CheckSquare size={20} /> },
    { number: "50K+", label: "Active Users", icon: <Users size={20} /> },
    { number: "95%", label: "Success Rate", icon: <Star size={20} /> },
    { number: "24/7", label: "AI Support", icon: <Shield size={20} /> }
  ];

  return (
    <section id="features-section" className="features-section py-20 pb-32 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden w-full">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 pt-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Powerful Features for
            <span className="block bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Smart Tasking
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Transform how you work with AI-powered features that adapt to your workflow and boost productivity
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Gradient Border Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Trusted by Teams Worldwide</h3>
            <p className="text-gray-300">Join thousands of users who have transformed their productivity</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-orange-400">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
};

export default Features; 