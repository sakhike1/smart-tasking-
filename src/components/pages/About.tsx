import React from 'react';
import { 
  Users, 
  Target, 
  Zap, 
  Award, 
  Globe, 
  Heart,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const About: React.FC = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      description: "Former product manager at Google, passionate about AI and productivity.",
      avatar: "👩‍💼"
    },
    {
      name: "Michael Chen",
      role: "CTO",
      description: "AI researcher with 10+ years in machine learning and automation.",
      avatar: "👨‍💻"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Design",
      description: "UX expert focused on creating intuitive user experiences.",
      avatar: "👩‍🎨"
    },
    {
      name: "David Kim",
      role: "Lead Developer",
      description: "Full-stack developer specializing in React and AI integration.",
      avatar: "👨‍🔧"
    }
  ];

  const values = [
    {
      icon: <Target className="text-orange-400" size={24} />,
      title: "Innovation First",
      description: "We constantly push the boundaries of what's possible with AI and productivity."
    },
    {
      icon: <Users className="text-blue-400" size={24} />,
      title: "User-Centric",
      description: "Every feature is designed with our users' needs and feedback in mind."
    },
    {
      icon: <Zap className="text-green-400" size={24} />,
      title: "Efficiency",
      description: "We believe in making every second count with intelligent automation."
    },
    {
      icon: <Heart className="text-red-400" size={24} />,
      title: "Passion",
      description: "We're passionate about helping people achieve their goals and dreams."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            About
            <span className="block bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              TaskSmart
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to revolutionize how people manage tasks and boost productivity 
            through intelligent AI-powered solutions that adapt to your unique workflow.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">50K+</div>
              <div className="text-gray-400">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">1M+</div>
              <div className="text-gray-400">Tasks Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">95%</div>
              <div className="text-gray-400">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-400">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-800/30 to-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                We believe that everyone deserves to work smarter, not harder. Our AI-powered 
                platform helps individuals and teams achieve more by automating routine tasks, 
                providing intelligent insights, and adapting to your unique work style.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-green-400" size={20} />
                  <span className="text-gray-300">Reduce task management time by 60%</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-green-400" size={20} />
                  <span className="text-gray-300">Boost productivity with AI insights</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-green-400" size={20} />
                  <span className="text-gray-300">Adapt to your unique workflow</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-3xl p-8 border border-orange-500/30">
                <Globe className="text-orange-400 mx-auto mb-4" size={48} />
                <h3 className="text-2xl font-bold text-white text-center mb-4">Global Impact</h3>
                <p className="text-gray-300 text-center">
                  Helping teams across 50+ countries work more efficiently and achieve their goals faster.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Our Values</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The principles that guide everything we do at TaskSmart
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-800/30 to-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The passionate minds behind TaskSmart's innovative solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 text-center">
                <div className="text-4xl mb-4">{member.avatar}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                <p className="text-orange-400 font-medium mb-3">{member.role}</p>
                <p className="text-gray-300 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of users who have transformed their productivity with TaskSmart
          </p>
          <button className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-orange-500 hover:to-red-600 transition-all duration-300 flex items-center justify-center mx-auto group shadow-lg hover:shadow-xl transform hover:scale-105">
            Start Your Free Trial
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default About; 