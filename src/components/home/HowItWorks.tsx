import React from 'react';
import { 
  CheckCircle, 
  ArrowRight, 
  Sparkles,
  Brain,
  Zap,
  Target,
  TrendingUp
} from 'lucide-react';
import { scrollToPage } from '../../utils/scrollUtils';

const HowItWorks: React.FC = () => {

  const steps = [
    {
      number: "01",
      icon: <Brain className="text-blue-400" size={28} />,
      title: "AI Analyzes Your Tasks",
      description: "Our intelligent system learns your work patterns and automatically categorizes and prioritizes your tasks.",
      color: "from-blue-400 to-purple-500",
      bgColor: "from-blue-500/10 to-purple-500/10"
    },
    {
      number: "02",
      icon: <Target className="text-orange-400" size={28} />,
      title: "Smart Prioritization",
      description: "Tasks are ranked based on deadlines, importance, and your productivity patterns for optimal workflow.",
      color: "from-orange-400 to-red-500",
      bgColor: "from-orange-500/10 to-red-500/10"
    },
    {
      number: "03",
      icon: <Zap className="text-green-400" size={28} />,
      title: "Automated Execution",
      description: "Set up intelligent workflows that automatically create, assign, and track tasks based on your triggers.",
      color: "from-green-400 to-teal-500",
      bgColor: "from-green-500/10 to-teal-500/10"
    },
    {
      number: "04",
      icon: <TrendingUp className="text-purple-400" size={28} />,
      title: "Track & Optimize",
      description: "Monitor your progress with detailed analytics and get AI-powered suggestions for continuous improvement.",
      color: "from-purple-400 to-pink-500",
      bgColor: "from-purple-500/10 to-pink-500/10"
    }
  ];

  return (
    <section id="how-it-works-section" className="how-it-works-section py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden w-full">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-green-500/5 to-teal-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 pt-32">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 px-4 py-2 rounded-full border border-orange-500/30 mb-6">
            <Sparkles className="text-orange-400" size={16} />
            <span className="text-orange-400 text-sm font-medium">How It Works</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Transform Your Workflow in
            <span className="block bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              4 Simple Steps
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience the future of task management with our AI-powered platform that adapts to your unique workflow
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="group relative"
            >
              {/* Step Card */}
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500 hover:transform hover:scale-105">
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${step.bgColor} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  {/* Step Number and Icon */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-white font-bold text-lg">{step.number}</span>
                    </div>
                    <div className={`w-12 h-12 bg-gradient-to-r ${step.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      {step.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {step.description}
                  </p>

                  {/* Arrow for connection */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                        <ArrowRight className="text-white" size={16} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Demo Section */}
        <div className="bg-gradient-to-r from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">See It In Action</h3>
            <p className="text-gray-300 text-lg">We will help you task smart by all means</p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Image Display */}
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden aspect-video">
              <img 
                src="/image1.jpg" 
                alt="TaskSmart App Interface" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10"></div>
              
              {/* Floating Elements */}
              <div className="absolute top-8 left-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl p-4 border border-blue-500/30">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-blue-400" size={20} />
                  <span className="text-white font-medium">Task Completed</span>
                </div>
              </div>
              
              <div className="absolute bottom-8 right-8 bg-gradient-to-r from-green-500/20 to-teal-500/20 backdrop-blur-sm rounded-xl p-4 border border-green-500/30">
                <div className="flex items-center gap-3">
                  <TrendingUp className="text-green-400" size={20} />
                  <span className="text-white font-medium">+25% Productivity</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 mb-32">
          <div 
            onClick={() => scrollToPage('/signup')}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 px-8 py-4 rounded-full text-white font-semibold text-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            <span>Get Started Free</span>
            <ArrowRight size={20} />
          </div>
          <p className="text-gray-400 mt-4">No credit card required • 14-day free trial</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 