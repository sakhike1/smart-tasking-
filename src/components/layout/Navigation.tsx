import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import LoginForm from '../auth/LoginForm';
import RegisterForm from '../auth/RegisterForm';
import { scrollToTop } from '../../utils/scrollUtils';
import { 
  Home, 
  CheckSquare, 
  BarChart3, 
  TrendingUp, 
  Bot, 
  X, 
  Menu,
  User,
  LogOut,
  LogIn,
  UserPlus,
  Zap,
  Target,
  MessageSquare
} from 'lucide-react';

// TypeScript interfaces for props and state
interface NavigationProps {
  className?: string;
  variant?: 'default' | 'minimal';
}

interface MenuItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  requiresAuth?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ 
  className = '', 
  variant = 'default' 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [showLoginForm, setShowLoginForm] = useState<boolean>(false);
  const [showRegisterForm, setShowRegisterForm] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const { user, isAuthenticated, logout } = useAuthStore();

  // Navigation items with TypeScript typing
  const menuItems: MenuItem[] = isAuthenticated ? [
    { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: <BarChart3 size={18} /> },
    { id: 'tasks', label: 'Tasks', href: '/tasks', icon: <CheckSquare size={18} /> },
    { id: 'analytics', label: 'Analytics', href: '/analytics', icon: <TrendingUp size={18} /> },
  ] : [
    { id: 'home', label: 'Home', href: '/', icon: <Home size={18} /> },
    { id: 'features', label: 'Features', href: '/features', icon: <Zap size={18} /> },
    { id: 'pricing', label: 'Pricing', href: '/pricing', icon: <Target size={18} /> },
    { id: 'about', label: 'About', href: '/about', icon: <TrendingUp size={18} /> },
    { id: 'contact', label: 'Contact', href: '/contact', icon: <MessageSquare size={18} /> },
  ];

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
    setIsMobileMenuOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleLoginClick = (): void => {
    setShowLoginForm(true);
    setShowRegisterForm(false);
  };

  const handleRegisterClick = (): void => {
    setShowRegisterForm(true);
    setShowLoginForm(false);
  };

  const handleCloseAuthForms = (): void => {
    setShowLoginForm(false);
    setShowRegisterForm(false);
  };

  const handleSwitchToRegister = (): void => {
    setShowLoginForm(false);
    setShowRegisterForm(true);
  };

  const handleSwitchToLogin = (): void => {
    setShowRegisterForm(false);
    setShowLoginForm(true);
  };

  const filteredMenuItems = menuItems.filter(item => 
    !item.requiresAuth || isAuthenticated
  );

  // Close mobile menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobileMenuOpen]);

  // Debug: Log menu items to console
  console.log('Mobile menu state:', isMobileMenuOpen);
  console.log('Filtered menu items:', filteredMenuItems);
  console.log('Is authenticated:', isAuthenticated);

  return (
    <>
      <nav className={`relative overflow-hidden w-full z-50 ${className}`}>
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black animate-gradient-x"></div>
        
        {/* Animated Particles Effect */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-10 w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
          <div className="absolute top-8 right-20 w-1 h-1 bg-gray-300 rounded-full animate-ping"></div>
          <div className="absolute bottom-6 left-1/4 w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></div>
          <div className="absolute top-12 right-1/3 w-1 h-1 bg-gray-200 rounded-full animate-pulse"></div>
        </div>

        {/* Glass Effect Overlay */}
        <div className="relative bg-white/10 dark:bg-gray-900/20 backdrop-blur-md border-b border-white/20 dark:border-gray-700/50">
          <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and Brand - Only show when not authenticated */}
            {!isAuthenticated && (
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => {
                  if (location.pathname === '/') {
                    scrollToTop();
                  } else {
                    navigate('/');
                  }
                }}>
                    <div className="relative">
                      <Bot className="text-3xl mr-3 text-white animate-pulse" size={32} />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xl font-bold text-white drop-shadow-lg">
                        Smart Tasking
                  </span>
                    </div>
                </div>
              </div>
            )}

            {/* Dashboard Header - Only show when authenticated */}
            {isAuthenticated && (
              <div className="flex items-center">
                <div className="flex items-center">
                  <div className="relative">
                    <Bot className="text-2xl mr-3 text-white animate-pulse" size={28} />
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full animate-ping"></div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-white drop-shadow-lg">
                      Dashboard
                    </span>
                    <span className="text-xs text-gray-300">
                      Welcome back, {user?.name || 'User'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Desktop Navigation */}
            <div className={`hidden md:flex ${isAuthenticated ? 'flex-1 justify-center' : ''} items-center space-x-8`}>
              {filteredMenuItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center group relative ${
                      location.pathname === item.href 
                        ? 'text-white' 
                        : 'text-white/90 hover:text-white'
                    }`}
                >
                    <span className="mr-2 group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
                  {item.label}
                    <div className={`absolute bottom-0 left-0 h-0.5 bg-gray-400 transition-all duration-300 ${
                      location.pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></div>
                </Link>
              ))}
            </div>

            {/* User Menu / Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-r from-gray-800 via-black to-gray-900 rounded-full flex items-center justify-center shadow-lg border border-gray-600/30">
                          <User className="text-white" size={18} />
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white font-semibold text-sm">
                          {user?.name || 'User'}
                        </span>
                        <span className="text-gray-300 text-xs">
                          Account
                        </span>
                      </div>
                  </div>
                  <button
                    onClick={handleLogout}
                      className="bg-gradient-to-r from-gray-500/20 to-gray-600/20 hover:from-gray-500/30 hover:to-gray-600/30 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm border border-gray-400/40 hover:border-gray-400/60 flex items-center shadow-lg hover:shadow-xl hover:scale-105 transform"
                  >
                      <LogOut size={16} className="mr-2 animate-pulse" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link 
                    to="/login"
                      className="text-white/90 hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-white/10 backdrop-blur-sm flex items-center"
                  >
                      <LogIn size={16} className="mr-2" />
                    Login
                  </Link>
                  <Link 
                    to="/signup"
                      className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm border border-white/30 hover:border-white/50 shadow-lg hover:shadow-xl flex items-center"
                  >
                      <UserPlus size={16} className="mr-2" />
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-white hover:text-cyan-300 p-2 rounded-lg transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
                aria-label="Toggle mobile menu"
                >
                  {isMobileMenuOpen ? (
                    <X size={24} />
                  ) : (
                    <Menu size={24} />
                  )}
              </button>
            </div>
          </div>
    </div>

        </div>
      </nav>

      {/* Mobile Navigation Menu - Outside nav container */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 z-40 bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-md border-b border-gray-700/50 shadow-2xl">
          {/* Navigation Links */}
          <div className="px-4 py-4 space-y-2">
            {filteredMenuItems.map((item) => (
              <Link
                key={item.id}
                to={item.href}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 flex items-center ${
                  location.pathname === item.href 
                    ? 'text-white bg-gradient-to-r from-orange-400/20 to-red-500/20 border border-orange-400/30' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>

          {/* User Section */}
          <div className="px-4 pb-4 border-t border-gray-700/50 pt-4">
            {isAuthenticated ? (
              <div className="space-y-3">
                <div className="flex items-center px-3 py-3 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-600/30">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-r from-gray-800 via-black to-gray-900 rounded-full flex items-center justify-center mr-3 shadow-lg border border-gray-600/30">
                      <User className="text-white" size={18} />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-semibold text-sm">
                      {user?.name || 'User'}
                    </span>
                    <span className="text-gray-300 text-xs">
                      Account
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-gray-300 hover:text-gray-200 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 hover:bg-gradient-to-r hover:from-gray-500/20 hover:to-gray-600/20 backdrop-blur-sm flex items-center border border-gray-400/30 hover:border-gray-400/50 shadow-md hover:shadow-lg"
                >
                  <LogOut size={18} className="mr-3 animate-pulse" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link 
                  to="/login"
                  className="w-full text-left text-white/90 hover:text-white px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 hover:bg-white/10 backdrop-blur-sm flex items-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LogIn size={18} className="mr-3" />
                  Login
                </Link>
                <Link 
                  to="/signup"
                  className="w-full bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 backdrop-blur-sm border border-orange-400/30 hover:border-orange-400/50 flex items-center shadow-lg hover:shadow-xl"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <UserPlus size={18} className="mr-3" />
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Authentication Forms */}
      {showLoginForm && (
        <LoginForm 
          onSwitchToRegister={handleSwitchToRegister}
          onClose={handleCloseAuthForms}
        />
      )}
      
      {showRegisterForm && (
        <RegisterForm 
          onSwitchToLogin={handleSwitchToLogin}
          onClose={handleCloseAuthForms}
        />
      )}
    </>
  );
};

export default Navigation;
