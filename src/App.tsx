import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/ScrollToTop';
import Hero from './components/home/Hero';
import Features from './components/home/Features';
import HowItWorks from './components/home/HowItWorks';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import FeaturesPage from './components/pages/Features';
import Pricing from './components/pages/Pricing';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Dashboard from './components/pages/Dashboard';
import Tasks from './components/pages/Tasks';
import Analytics from './components/pages/Analytics';
import { useAuthStore } from './stores/authStore';
import { Loader2 } from 'lucide-react';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// Public Route Component (redirects to dashboard if logged in)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  console.log('PublicRoute - isAuthenticated:', isAuthenticated);
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

function App() {
  const { user, isAuthenticated, initializeAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize Firebase auth state listener
  useEffect(() => {
    console.log('App component - initializing auth...');
    initializeAuth();
    
    // Set initialized after auth is ready
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 500);
    
    // Total loading time
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(loadingTimer);
    };
  }, [initializeAuth]);

  // Debug authentication state
  useEffect(() => {
    console.log('App component - auth state changed:', { isAuthenticated, user });
  }, [isAuthenticated, user]);

  // Always show loading first, then content
  if (isLoading || !isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center fixed inset-0 z-50">
        <div className="text-center">
          <div className="relative">
            <Loader2 className="w-16 h-16 text-red-400 animate-spin mx-auto mb-6" />
            <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-red-600/20 rounded-full blur-xl"></div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">TaskSmart</h1>
          <h2 className="text-xl font-semibold text-white mb-2">
            {!isInitialized ? 'Initializing...' : 'Loading Application'}
          </h2>
          <p className="text-gray-400">
            {!isInitialized 
              ? 'Setting up authentication...' 
              : 'Please wait while we prepare your productivity workspace...'
            }
          </p>
        </div>
      </div>
    );
  }

  // Only render the app content after loading is complete
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
        <Navigation className="mt-0" />
        <main className="flex-1">
          <Routes>
            {/* Public Routes - redirect to dashboard if logged in */}
            <Route path="/" element={
              <PublicRoute>
                <>
                  <Hero />
                  <Features />
                  <HowItWorks />
                </>
              </PublicRoute>
            } />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route path="/signup" element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            } />
            
            {/* Protected Routes - require authentication */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/tasks" element={
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            } />
            <Route path="/analytics" element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;
