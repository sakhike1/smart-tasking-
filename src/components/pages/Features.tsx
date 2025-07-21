import React from 'react';
import { 
  CheckSquare, 
  Zap, 
  Target, 
  TrendingUp, 
  Calendar, 
  Users, 
  Shield,
  Brain,
  Database,
  Lock,
  Link,
  ArrowRight
} from 'lucide-react';

const FeaturesPage: React.FC = () => {
  const features = [
    {
      icon: <Brain className="text-blue-400" size={28} />,
      title: "AI-Powered Task Analysis",
      description: "Our advanced AI analyzes your tasks, deadlines, and work patterns to provide intelligent recommendations.",
      benefits: ["Automatic priority ranking", "Smart deadline suggestions", "Workload optimization"],
      color: "from-blue-400 to-purple-500"
    },
    {
      icon: <Zap className="text-orange-400" size={28} />,
      title: "Intelligent Automation",
      description: "Set up powerful workflows that automatically create, assign, and track tasks based on your triggers.",
      benefits: ["Custom workflow creation", "Trigger-based automation", "Integration with popular tools"],
      color: "from-orange-400 to-red-500"
    },
    {
      icon: <Target className="text-green-400" size={28} />,
      title: "Goal Tracking & Milestones",
      description: "Set clear goals and track your progress with visual indicators and smart milestone reminders.",
      benefits: ["Visual progress tracking", "Milestone celebrations", "Goal-based task organization"],
      color: "from-green-400 to-teal-500"
    },
    {
      icon: <TrendingUp className="text-purple-400" size={28} />,
      title: "Advanced Analytics",
      description: "Get deep insights into your productivity patterns with detailed reports and performance metrics.",
      benefits: ["Productivity insights", "Performance trends", "Custom reports"],
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: <Calendar className="text-indigo-400" size={28} />,
      title: "Smart Scheduling",
      description: "AI suggests optimal times for tasks based on your calendar, energy levels, and productivity patterns.",
      benefits: ["Energy-based scheduling", "Calendar integration", "Optimal time suggestions"],
      color: "from-indigo-400 to-blue-500"
    },
    {
      icon: <Users className="text-cyan-400" size={28} />,
      title: "Team Collaboration",
      description: "Share tasks, assign responsibilities, and track team progress in real-time with advanced collaboration tools.",
      benefits: ["Real-time collaboration", "Task assignment", "Team performance tracking"],
      color: "from-cyan-400 to-blue-500"
    }
  ];

  const integrations = [
    { name: "Slack", icon: "💬" },
    { name: "Microsoft Teams", icon: "👥" },
    { name: "Google Calendar", icon: "📅" },
    { name: "Notion", icon: "📝" },
    { name: "Trello", icon: "📋" },
    { name: "Asana", icon: "✅" },
    { name: "Jira", icon: "🐛" },
    { name: "GitHub", icon: "💻" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            Powerful
            <span className="block bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Features
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover how TaskSmart's AI-powered features can transform your productivity 
            and help you achieve more in less time.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
                <div className="flex items-start space-x-4 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-white mb-3">Key Benefits:</h4>
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center space-x-3">
                      <CheckSquare className="text-green-400" size={16} />
                      <span className="text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-800/30 to-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl flex items-center justify-center">
                <Link className="text-white" size={32} />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-white mb-6">Seamless Integrations</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Connect Smart Tasking with your favorite tools and platforms for a unified workflow
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {integrations.map((integration, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 text-center group hover:scale-105">
                <div className="text-3xl mb-3">{integration.icon}</div>
                <div className="text-white font-medium text-sm">{integration.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Performance */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Enterprise-Grade Security</h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Your data is protected with bank-level security and compliance standards. 
                We ensure your information stays private and secure.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Shield className="text-green-400" size={20} />
                  <span className="text-gray-300">End-to-end encryption</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Lock className="text-green-400" size={20} />
                  <span className="text-gray-300">SOC 2 Type II compliant</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Database className="text-green-400" size={20} />
                  <span className="text-gray-300">99.9% uptime guarantee</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-3xl p-8 border border-green-500/30">
                <Shield className="text-green-400 mx-auto mb-4" size={48} />
                <h3 className="text-2xl font-bold text-white text-center mb-4">Trusted by Fortune 500</h3>
                <p className="text-gray-300 text-center">
                  Over 1000+ companies trust TaskSmart with their critical business data and workflows.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-800/30 to-gray-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Experience the Future?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Start your free trial today and see how TaskSmart can transform your productivity
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/signup'}
              className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-orange-500 hover:to-red-600 transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Start Free Trial
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
            </button>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="bg-gradient-to-r from-white/20 to-white/10 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-white/30 hover:to-white/20 transition-all duration-300 flex items-center justify-center backdrop-blur-sm border border-white/30 hover:border-white/50 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Schedule Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage; 