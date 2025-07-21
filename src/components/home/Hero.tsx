import React from 'react';
import { CheckSquare, Zap, Target, TrendingUp, ArrowRight, Play } from 'lucide-react';
import { scrollToPage, scrollToSection } from '../../utils/scrollUtils';

const Hero: React.FC = () => {

  return (
    <div className="hero-section relative min-h-screen bg-gradient-to-r from-black via-gray-900 to-orange-900 overflow-hidden w-full">
      {/* Dot Pattern Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-orange-900/40"></div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-48 items-center max-w-7xl mx-auto">
          {/* Left Side - Content */}
          <div className="space-y-10 text-center lg:text-left lg:mr-16">
            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                <span className="block">Smart</span>
                <span className="block text-orange-400 leading-none pb-4 mb-2">
                  Tasking
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-300 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Transform your productivity with AI-powered task management that adapts to your workflow
              </p>
            </div>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => scrollToPage('/signup')}
                className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-8 py-3 rounded-full font-semibold text-lg hover:from-orange-500 hover:to-red-600 transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Get Started Free
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
              </button>
              <button 
                onClick={() => scrollToSection('features-section')}
                className="bg-gradient-to-r from-white/20 to-white/10 text-white px-8 py-3 rounded-full font-semibold text-lg hover:from-white/30 hover:to-white/20 transition-all duration-300 flex items-center justify-center backdrop-blur-sm border border-white/30 hover:border-white/50 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Play className="mr-2" size={20} />
                Watch Demo
              </button>
            </div>

            {/* Feature List */}
            <div className="space-y-4">
              <p className="text-gray-400 text-lg font-medium">Discover intelligent features:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
                <div className="flex items-center space-x-3 text-white bg-white/5 backdrop-blur-sm rounded-full p-3">
                  <CheckSquare className="text-orange-400 flex-shrink-0" size={20} />
                  <span className="text-sm font-medium">AI Task Prioritization</span>
                </div>
                <div className="flex items-center space-x-3 text-white bg-white/5 backdrop-blur-sm rounded-full p-3">
                  <Zap className="text-orange-400 flex-shrink-0" size={20} />
                  <span className="text-sm font-medium">Smart Automation</span>
                </div>
                <div className="flex items-center space-x-3 text-white bg-white/5 backdrop-blur-sm rounded-full p-3">
                  <Target className="text-orange-400 flex-shrink-0" size={20} />
                  <span className="text-sm font-medium">Goal Tracking</span>
                </div>
                <div className="flex items-center space-x-3 text-white bg-white/5 backdrop-blur-sm rounded-full p-3">
                  <TrendingUp className="text-orange-400 flex-shrink-0" size={20} />
                  <span className="text-sm font-medium">Progress Analytics</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Smartphone Mockups */}
          <div className="relative flex justify-center lg:justify-end lg:ml-24">
            <div className="flex space-x-6 transform rotate-12">
              {/* Phone 1 - Task List */}
              <div className="relative">
                <div className="w-64 h-96 bg-gradient-to-br from-gray-800 via-black to-gray-900 rounded-3xl p-2 shadow-2xl border border-gray-600/50 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shine"></div>
                  <div className="w-full h-full bg-gradient-to-b from-gray-900 to-black rounded-2xl p-4 relative z-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-white font-semibold">Today's Tasks</h3>
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">3</span>
                      </div>
                    </div>
                    
                    {/* Task Items */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                        <div className="w-4 h-4 border-2 border-orange-400 rounded-full"></div>
                        <span className="text-white text-sm">Complete project proposal</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                        <div className="w-4 h-4 border-2 border-orange-400 rounded-full"></div>
                        <span className="text-white text-sm">Review team feedback</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                        <div className="w-4 h-4 border-2 border-orange-400 rounded-full"></div>
                        <span className="text-white text-sm">Schedule client meeting</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone 2 - Analytics */}
              <div className="relative -mt-8">
                <div className="w-64 h-96 bg-gradient-to-br from-gray-800 via-black to-gray-900 rounded-3xl p-2 shadow-2xl border border-gray-600/50 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shine"></div>
                  <div className="w-full h-full bg-gradient-to-b from-gray-900 to-black rounded-2xl p-4 relative z-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-white font-semibold">Productivity</h3>
                      <div className="text-orange-400 text-sm">+23%</div>
                    </div>
                    
                    {/* Chart */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-8 bg-orange-400 rounded-full"></div>
                        <div className="w-2 h-12 bg-orange-500 rounded-full"></div>
                        <div className="w-2 h-6 bg-orange-400 rounded-full"></div>
                        <div className="w-2 h-10 bg-orange-500 rounded-full"></div>
                        <div className="w-2 h-8 bg-orange-400 rounded-full"></div>
                      </div>
                      <div className="text-center text-gray-400 text-xs">This Week</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone 3 - AI Assistant */}
              <div className="relative -mt-4">
                <div className="w-64 h-96 bg-gradient-to-br from-gray-800 via-black to-gray-900 rounded-3xl p-2 shadow-2xl border border-gray-600/50 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shine"></div>
                  <div className="w-full h-full bg-gradient-to-b from-gray-900 to-black rounded-2xl p-4 relative z-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-white font-semibold">AI Assistant</h3>
                      <div className="w-6 h-6 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    
                    {/* Chat */}
                    <div className="space-y-3">
                      <div className="bg-orange-500/20 p-3 rounded-lg">
                        <p className="text-white text-sm">I've prioritized your tasks based on deadlines and importance.</p>
                      </div>
                      <div className="bg-gray-700/50 p-3 rounded-lg">
                        <p className="text-gray-300 text-sm">Thanks! What should I focus on first?</p>
                      </div>
                      <div className="bg-orange-500/20 p-3 rounded-lg">
                        <p className="text-white text-sm">Start with the project proposal - it's due tomorrow!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
