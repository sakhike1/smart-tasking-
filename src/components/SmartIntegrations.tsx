import React, { useState } from 'react';
import { 
  Mail, 
  Calendar, 
  MessageSquare, 
  Zap, 
  Settings,
  CheckCircle,
  X,
  RefreshCw,
  Globe,
  Database,
  Activity
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: 'connected' | 'disconnected' | 'pending';
  category: 'communication' | 'productivity' | 'calendar' | 'storage';
  features: string[];
  setupSteps: string[];
  isPopular?: boolean;
}

const SmartIntegrations: React.FC = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'gmail',
      name: 'Gmail',
      description: 'Convert emails to tasks automatically',
      icon: <Mail className="text-red-400" size={24} />,
      status: 'disconnected',
      category: 'communication',
      features: ['Email-to-task conversion', 'Smart categorization', 'Auto-priority detection'],
      setupSteps: ['Connect Gmail account', 'Configure filters', 'Set up auto-rules'],
      isPopular: true
    },
    {
      id: 'google-calendar',
      name: 'Google Calendar',
      description: 'Sync tasks with your calendar',
      icon: <Calendar className="text-blue-400" size={24} />,
      status: 'disconnected',
      category: 'calendar',
      features: ['Two-way sync', 'Smart scheduling', 'Conflict detection'],
      setupSteps: ['Connect Google account', 'Select calendars', 'Configure sync settings'],
      isPopular: true
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Create tasks from Slack messages',
      icon: <MessageSquare className="text-purple-400" size={24} />,
      status: 'disconnected',
      category: 'communication',
      features: ['Message-to-task conversion', 'Team collaboration', 'Real-time updates'],
      setupSteps: ['Install Slack app', 'Configure channels', 'Set up triggers'],
      isPopular: true
    },
    {
      id: 'outlook',
      name: 'Outlook',
      description: 'Integrate with Microsoft Outlook',
      icon: <Mail className="text-blue-500" size={24} />,
      status: 'disconnected',
      category: 'communication',
      features: ['Email integration', 'Calendar sync', 'Meeting tasks'],
      setupSteps: ['Connect Outlook account', 'Configure permissions', 'Set up rules']
    },
    {
      id: 'apple-calendar',
      name: 'Apple Calendar',
      description: 'Sync with Apple Calendar',
      icon: <Calendar className="text-gray-400" size={24} />,
      status: 'disconnected',
      category: 'calendar',
      features: ['iCloud sync', 'iOS integration', 'Siri shortcuts'],
      setupSteps: ['Connect iCloud account', 'Enable calendar sync', 'Configure notifications']
    },
    {
      id: 'discord',
      name: 'Discord',
      description: 'Create tasks from Discord messages',
      icon: <MessageSquare className="text-indigo-400" size={24} />,
      status: 'disconnected',
      category: 'communication',
      features: ['Message parsing', 'Server integration', 'Bot commands'],
      setupSteps: ['Add bot to server', 'Configure channels', 'Set up commands']
    },
    {
      id: 'zapier',
      name: 'Zapier',
      description: 'Connect with 1000+ apps',
      icon: <Zap className="text-orange-400" size={24} />,
      status: 'disconnected',
      category: 'productivity',
      features: ['1000+ app connections', 'Custom workflows', 'Automation'],
      setupSteps: ['Connect Zapier account', 'Create zaps', 'Test workflows'],
      isPopular: true
    },
    {
      id: 'notion',
      name: 'Notion',
      description: 'Sync with Notion databases',
      icon: <Database className="text-black" size={24} />,
      status: 'disconnected',
      category: 'productivity',
      features: ['Database sync', 'Page integration', 'Template sync'],
      setupSteps: ['Connect Notion account', 'Select databases', 'Configure mapping']
    },
    {
      id: 'trello',
      name: 'Trello',
      description: 'Sync with Trello boards',
      icon: <Globe className="text-blue-500" size={24} />,
      status: 'disconnected',
      category: 'productivity',
      features: ['Board sync', 'Card conversion', 'List mapping'],
      setupSteps: ['Connect Trello account', 'Select boards', 'Configure sync']
    }
  ]);

  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [showSetup, setShowSetup] = useState(false);
  const [setupStep, setSetupStep] = useState(0);

  const connectIntegration = (integrationId: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { ...integration, status: 'pending' as const }
        : integration
    ));
    
    const integration = integrations.find(i => i.id === integrationId);
    if (integration) {
      setSelectedIntegration(integration);
      setShowSetup(true);
      setSetupStep(0);
    }
  };

  const disconnectIntegration = (integrationId: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { ...integration, status: 'disconnected' as const }
        : integration
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-400 bg-green-500/20';
      case 'pending': return 'text-yellow-400 bg-yellow-500/20';
      case 'disconnected': return 'text-gray-400 bg-gray-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle size={16} />;
      case 'pending': return <RefreshCw size={16} className="animate-spin" />;
      case 'disconnected': return <X size={16} />;
      default: return <X size={16} />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'communication': return 'from-blue-500/20 to-purple-500/20 border-blue-500/30';
      case 'productivity': return 'from-green-500/20 to-teal-500/20 border-green-500/30';
      case 'calendar': return 'from-orange-500/20 to-red-500/20 border-orange-500/30';
      case 'storage': return 'from-purple-500/20 to-pink-500/20 border-purple-500/30';
      default: return 'from-gray-500/20 to-gray-600/20 border-gray-500/30';
    }
  };

  const popularIntegrations = integrations.filter(i => i.isPopular);
  const connectedIntegrations = integrations.filter(i => i.status === 'connected');

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
            <Zap className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Smart Integrations</h2>
            <p className="text-gray-400 text-sm">Connect your favorite tools and automate your workflow</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">
            {connectedIntegrations.length} connected
          </span>
        </div>
      </div>

      {/* Popular Integrations */}
      {popularIntegrations.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Activity className="text-orange-400" size={20} />
            Popular Integrations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularIntegrations.map((integration) => (
              <div
                key={integration.id}
                className={`bg-gradient-to-br ${getCategoryColor(integration.category)} rounded-2xl p-6 border shadow-lg`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {integration.icon}
                    <div>
                      <h4 className="text-white font-semibold">{integration.name}</h4>
                      <p className="text-gray-300 text-sm">{integration.description}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(integration.status)}`}>
                    {getStatusIcon(integration.status)}
                    {integration.status}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  {integration.features.slice(0, 2).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle size={14} className="text-green-400" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  {integration.status === 'disconnected' ? (
                    <button
                      onClick={() => connectIntegration(integration.id)}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-xl font-medium hover:from-blue-500 hover:to-purple-600 transition-all duration-300"
                    >
                      Connect
                    </button>
                  ) : (
                    <button
                      onClick={() => disconnectIntegration(integration.id)}
                      className="flex-1 px-4 py-2 bg-gray-700/50 text-gray-300 rounded-xl font-medium hover:bg-gray-600/50 transition-all duration-300"
                    >
                      Disconnect
                    </button>
                  )}
                  <button className="px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300">
                    <Settings size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Integrations */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Globe className="text-blue-400" size={20} />
          All Integrations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrations.map((integration) => (
            <div
              key={integration.id}
              className="bg-gray-700/30 rounded-2xl p-6 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {integration.icon}
                  <div>
                    <h4 className="text-white font-semibold">{integration.name}</h4>
                    <p className="text-gray-300 text-sm">{integration.description}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(integration.status)}`}>
                  {getStatusIcon(integration.status)}
                  {integration.status}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                {integration.features.slice(0, 2).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle size={14} className="text-green-400" />
                    {feature}
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                {integration.status === 'disconnected' ? (
                  <button
                    onClick={() => connectIntegration(integration.id)}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-xl font-medium hover:from-blue-500 hover:to-purple-600 transition-all duration-300"
                  >
                    Connect
                  </button>
                ) : (
                  <button
                    onClick={() => disconnectIntegration(integration.id)}
                    className="flex-1 px-4 py-2 bg-gray-700/50 text-gray-300 rounded-xl font-medium hover:bg-gray-600/50 transition-all duration-300"
                  >
                    Disconnect
                  </button>
                )}
                <button className="px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300">
                  <Settings size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Setup Modal */}
      {showSetup && selectedIntegration && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 max-w-2xl w-full border border-gray-700/50 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                {selectedIntegration.icon}
                <div>
                  <h2 className="text-2xl font-bold text-white">Connect {selectedIntegration.name}</h2>
                  <p className="text-gray-400 text-sm">Follow these steps to complete the integration</p>
                </div>
              </div>
              <button
                onClick={() => setShowSetup(false)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-300"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Progress */}
              <div className="flex items-center gap-4">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${((setupStep + 1) / selectedIntegration.setupSteps.length) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-400">
                  {setupStep + 1} of {selectedIntegration.setupSteps.length}
                </span>
              </div>

              {/* Current Step */}
              <div className="bg-gray-700/30 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Step {setupStep + 1}: {selectedIntegration.setupSteps[setupStep]}
                </h3>
                <p className="text-gray-300 mb-4">
                  {setupStep === 0 && "Click the button below to authorize the connection with your account."}
                  {setupStep === 1 && "Configure the integration settings to match your preferences."}
                  {setupStep === 2 && "Test the connection to ensure everything is working properly."}
                </p>
                
                <div className="flex gap-4">
                  {setupStep > 0 && (
                    <button
                      onClick={() => setSetupStep(prev => prev - 1)}
                      className="px-6 py-3 bg-gray-700/50 text-gray-300 rounded-xl font-medium hover:bg-gray-600/50 transition-all duration-300"
                    >
                      Previous
                    </button>
                  )}
                  
                  {setupStep < selectedIntegration.setupSteps.length - 1 ? (
                    <button
                      onClick={() => setSetupStep(prev => prev + 1)}
                      className="px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-xl font-medium hover:from-blue-500 hover:to-purple-600 transition-all duration-300"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setIntegrations(prev => prev.map(integration => 
                          integration.id === selectedIntegration.id 
                            ? { ...integration, status: 'connected' as const }
                            : integration
                        ));
                        setShowSetup(false);
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-green-400 to-teal-500 text-white rounded-xl font-medium hover:from-green-500 hover:to-teal-600 transition-all duration-300"
                    >
                      Complete Setup
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartIntegrations; 