import React, { useEffect } from 'react';
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

  // Initialize Firebase auth state listener
  useEffect(() => {
    console.log('App component - initializing auth...');
    initializeAuth();
  }, [initializeAuth]);

  // Debug authentication state
  useEffect(() => {
    console.log('App component - auth state changed:', { isAuthenticated, user });
  }, [isAuthenticated, user]);

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
