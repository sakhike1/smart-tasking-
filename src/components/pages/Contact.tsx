import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare, 
  Globe,
  CheckCircle,
  ArrowRight,
  Building,
  Headphones,
  Zap,
  Loader2
} from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <Loader2 className="w-12 h-12 text-red-400 animate-spin mx-auto mb-4" />
            <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-red-600/20 rounded-full blur-xl"></div>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Loading Contact</h2>
          <p className="text-gray-400">Preparing contact form...</p>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const contactMethods = [
    {
      icon: <Mail className="text-blue-400" size={24} />,
      title: "Email Support",
      description: "Get help via email",
      contact: "support@tasksmart.com",
      response: "Response within 24 hours"
    },
    {
      icon: <Phone className="text-green-400" size={24} />,
      title: "Phone Support",
      description: "Speak with our team",
      contact: "+1 (555) 123-4567",
      response: "Available Mon-Fri, 9AM-6PM EST"
    },
    {
      icon: <MessageSquare className="text-purple-400" size={24} />,
      title: "Live Chat",
      description: "Instant messaging support",
      contact: "Chat with us",
      response: "Available 24/7"
    }
  ];

  const officeLocations = [
    {
      city: "San Francisco",
      address: "123 Innovation Drive, Suite 100",
      state: "CA 94105",
      country: "United States",
      icon: <Building className="text-orange-400" size={20} />
    },
    {
      city: "New York",
      address: "456 Tech Avenue, Floor 15",
      state: "NY 10001",
      country: "United States",
      icon: <Building className="text-blue-400" size={20} />
    },
    {
      city: "London",
      address: "789 Digital Street, Office 3",
      state: "EC1A 1BB",
      country: "United Kingdom",
      icon: <Building className="text-green-400" size={20} />
    }
  ];

  const faqs = [
    {
      question: "How do I get started with TaskSmart?",
      answer: "Sign up for a free trial, complete the onboarding process, and our AI will help you set up your first tasks and workflows."
    },
    {
      question: "What integrations are available?",
      answer: "We integrate with popular tools like Slack, Google Calendar, Notion, Trello, and many more. Check our integrations page for the full list."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we use enterprise-grade encryption and are SOC 2 Type II compliant. Your data is protected with bank-level security standards."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Absolutely! You can cancel your subscription at any time with no penalties. Your data will be available for 30 days after cancellation."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-2xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl mb-8 shadow-2xl">
            <MessageSquare className="text-white" size={32} />
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            Get in
            <span className="block bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent animate-pulse">
              Touch
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Have questions about TaskSmart? We're here to help! Reach out to our team 
            and we'll get back to you as soon as possible.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-green-400" size={16} />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-green-400" size={16} />
              <span>Quick Response</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-green-400" size={16} />
              <span>Expert Team</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Multiple Ways to Connect</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Choose the most convenient way to reach our support team. We're here to help you succeed.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-r from-gray-700 to-gray-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {method.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{method.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{method.description}</p>
                <p className="text-white font-medium mb-2 text-lg">{method.contact}</p>
                <p className="text-gray-300 text-sm flex items-center">
                  <Clock className="mr-2" size={14} />
                  {method.response}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Office Locations */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-800/30 to-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl flex items-center justify-center mr-4">
                  <Send className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-white">Send us a Message</h2>
                  <p className="text-gray-400 text-sm">We'll respond within 24 hours</p>
                </div>
              </div>
              <p className="text-xl text-gray-300 mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
              
              {isSubmitted ? (
                <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl p-8 border border-green-500/30 text-center">
                  <CheckCircle className="text-green-400 mx-auto mb-4" size={48} />
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-300">
                    Thank you for contacting us. We'll get back to you soon!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-white font-medium mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-all duration-300"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-white font-medium mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-all duration-300"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-white font-medium mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-all duration-300"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="billing">Billing Question</option>
                      <option value="feature">Feature Request</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-white font-medium mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-all duration-300 resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-orange-400 to-red-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-orange-500 hover:to-red-600 transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Office Locations */}
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                  <Building className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-white">Our Offices</h2>
                  <p className="text-gray-400 text-sm">Global presence, local support</p>
                </div>
              </div>
              <p className="text-xl text-gray-300 mb-8">
                Visit us at one of our global offices or reach out remotely.
              </p>
              
              <div className="space-y-6">
                {officeLocations.map((office, index) => (
                  <div key={index} className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-gray-700 to-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        {office.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-3">{office.city}</h3>
                      <p className="text-gray-300 mb-1">{office.address}</p>
                      <p className="text-gray-300 mb-1">{office.state}</p>
                      <p className="text-gray-400 text-sm flex items-center justify-center">
                        <MapPin className="mr-1" size={12} />
                        {office.country}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Info */}
              <div className="mt-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-6 border border-blue-500/30">
                <div className="flex items-center space-x-3 mb-4">
                  <Globe className="text-blue-400" size={24} />
                  <h3 className="text-xl font-semibold text-white">Global Support</h3>
                </div>
                <p className="text-gray-300 mb-4">
                  Our support team is available 24/7 to help you with any questions or issues.
                </p>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Clock size={16} />
                  <span className="text-sm">24/7 Support Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl mb-6">
              <Zap className="text-white" size={28} />
            </div>
            <h2 className="text-4xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-300">
              Find quick answers to common questions about TaskSmart
            </p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">{faq.question}</h3>
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-800/30 to-gray-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of users who have transformed their productivity with TaskSmart
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-orange-500 hover:to-red-600 transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl transform hover:scale-105">
              Start Free Trial
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
            </button>
            <button className="bg-gradient-to-r from-gray-600/20 to-gray-700/20 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-gray-600/30 hover:to-gray-700/30 transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl transform hover:scale-105 border border-gray-600/50">
              Schedule Demo
              <Headphones className="ml-2 group-hover:scale-110 transition-transform duration-300" size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 