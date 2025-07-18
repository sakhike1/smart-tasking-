import React, { useState } from 'react';
import { 
  Check, 
  X, 
  Star, 
  Zap, 
  Users, 
  Shield, 
  ArrowRight,
  Crown,
  Sparkles,
  TrendingUp
} from 'lucide-react';

const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState<boolean>(true);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for individuals getting started with task management",
      price: isAnnual ? 180 : 240,
      originalPrice: isAnnual ? 240 : 240,
      features: [
        "Up to 100 tasks per month",
        "Basic AI task prioritization",
        "Simple goal tracking",
        "Email support",
        "Mobile app access",
        "Basic integrations (3 apps)"
      ],
      notIncluded: [
        "Advanced analytics",
        "Team collaboration",
        "Custom workflows",
        "Priority support"
      ],
      popular: false,
      color: "from-blue-400 to-blue-600",
      bgColor: "from-blue-500/10 to-blue-600/10"
    },
    {
      name: "Professional",
      description: "Ideal for professionals and small teams",
      price: isAnnual ? 580 : 780,
      originalPrice: isAnnual ? 780 : 780,
      features: [
        "Unlimited tasks",
        "Advanced AI prioritization",
        "Goal tracking & milestones",
        "Team collaboration (up to 5 members)",
        "Advanced analytics & reports",
        "Priority email support",
        "All integrations (10+ apps)",
        "Custom workflows",
        "API access"
      ],
      notIncluded: [
        "Enterprise security",
        "Dedicated account manager"
      ],
      popular: true,
      color: "from-orange-400 to-red-500",
      bgColor: "from-orange-500/10 to-red-500/10"
    },
    {
      name: "Enterprise",
      description: "For large teams and organizations",
      price: isAnnual ? 1980 : 2580,
      originalPrice: isAnnual ? 2580 : 2580,
      features: [
        "Everything in Professional",
        "Unlimited team members",
        "Enterprise security & compliance",
        "Dedicated account manager",
        "Custom integrations",
        "Advanced reporting & analytics",
        "24/7 phone support",
        "SSO & advanced permissions",
        "Custom training sessions",
        "SLA guarantees"
      ],
      notIncluded: [],
      popular: false,
      color: "from-purple-400 to-purple-600",
      bgColor: "from-purple-500/10 to-purple-600/10"
    }
  ];

  const savings = plans.map(plan => ({
    ...plan,
    savings: Math.round(((plan.originalPrice - plan.price) / plan.originalPrice) * 100)
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            Simple,
            <span className="block bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Transparent Pricing
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Choose the perfect plan for your needs. All plans include our core AI-powered features 
            with no hidden fees or surprises.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-16">
            <span className={`text-lg ${!isAnnual ? 'text-white' : 'text-gray-400'}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-12 w-24 items-center rounded-full transition-colors duration-300 ${
                isAnnual ? 'bg-gradient-to-r from-orange-400 to-red-500' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-8 w-8 transform rounded-full bg-white transition-transform duration-300 ${
                  isAnnual ? 'translate-x-12' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-lg ${isAnnual ? 'text-white' : 'text-gray-400'}`}>
              Annual
              {isAnnual && (
                <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                  Save up to 25%
                </span>
              )}
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {savings.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-3xl p-8 border transition-all duration-300 hover:scale-105 ${
                  plan.popular
                    ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-orange-500/50 shadow-2xl shadow-orange-500/20'
                    : 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50 hover:border-gray-600/50'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center">
                      <Crown className="mr-2" size={16} />
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-300 mb-6">{plan.description}</p>
                  
                  {/* Pricing */}
                  <div className="mb-6">
                                      <div className="flex items-center justify-center space-x-2">
                    <span className="text-4xl font-bold text-white">R{plan.price}</span>
                    <span className="text-gray-400">/month</span>
                  </div>
                  {isAnnual && plan.savings > 0 && (
                    <div className="flex items-center justify-center space-x-2 mt-2">
                      <span className="text-gray-400 line-through">R{plan.originalPrice}</span>
                      <span className="text-green-400 text-sm font-medium">Save {plan.savings}%</span>
                    </div>
                  )}
                  </div>

                  {/* CTA Button */}
                  <button className={`w-full py-3 px-6 rounded-full font-semibold text-white transition-all duration-300 flex items-center justify-center group ${
                    plan.popular
                      ? 'bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 shadow-lg hover:shadow-xl'
                      : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600'
                  }`}>
                    {plan.popular ? 'Start Free Trial' : 'Get Started'}
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={16} />
                  </button>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white mb-4">What's included:</h4>
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <Check className="text-green-400 flex-shrink-0" size={18} />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.notIncluded.length > 0 && (
                    <>
                      <h4 className="text-lg font-semibold text-white mb-4 mt-6">Not included:</h4>
                      {plan.notIncluded.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3">
                          <X className="text-gray-500 flex-shrink-0" size={18} />
                          <span className="text-gray-500">{feature}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-800/30 to-gray-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-300">
              Everything you need to know about our pricing and plans
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-semibold text-white mb-3">Can I change plans anytime?</h3>
              <p className="text-gray-300">
                Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-semibold text-white mb-3">Is there a free trial?</h3>
              <p className="text-gray-300">
                Yes, all plans come with a 14-day free trial. No credit card required to start.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-semibold text-white mb-3">What payment methods do you accept?</h3>
              <p className="text-gray-300">
                We accept all major credit cards, PayPal, and bank transfers for annual plans.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-semibold text-white mb-3">Can I cancel anytime?</h3>
              <p className="text-gray-300">
                Absolutely. You can cancel your subscription at any time with no cancellation fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-3xl p-12 border border-orange-500/30">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of users who have transformed their productivity with TaskSmart
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-orange-500 hover:to-red-600 transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl transform hover:scale-105">
                Get Started Free
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
              </button>
              <button className="bg-gradient-to-r from-white/20 to-white/10 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-white/30 hover:to-white/20 transition-all duration-300 flex items-center justify-center backdrop-blur-sm border border-white/30 hover:border-white/50 shadow-lg hover:shadow-xl transform hover:scale-105">
                Get Started Free
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
              </button>
            </div>
            <p className="text-gray-400 mt-4">No credit card required • 14-day free trial</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing; 