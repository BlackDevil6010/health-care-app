import React, { useState, useEffect } from 'react';
import type { View, UserProfileData } from './types';
import Login from './components/Login';
import Register from './components/Register';
import NavigationBar from './components/NavigationBar';
import Dashboard from './components/Dashboard';
import AiAssistant from './components/AiAssistant';
import Appointments from './components/Appointments';
import HealthRecords from './components/HealthRecords';
import UserProfile from './components/UserProfile';
import DashboardSkeleton from './components/DashboardSkeleton';
import AppointmentsSkeleton from './components/AppointmentsSkeleton';
import HealthRecordsSkeleton from './components/HealthRecordsSkeleton';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'register'>('login');
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [userProfile, setUserProfile] = useState<UserProfileData>({
    name: 'Alex Doe',
    email: 'alex.doe@example.com',
    username: 'alexdoe',
  });

  useEffect(() => {
    if (isAuthenticated) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000); // Simulate data fetching
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, activeView]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setActiveView('dashboard');
  };

  const handleRegister = () => {
    // In a real app, this would involve API calls. Here we'll just log in.
    setIsAuthenticated(true);
    setActiveView('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthView('login');
  };
  
  const handleProfileUpdate = (newProfile: UserProfileData) => {
    setUserProfile(newProfile);
  };

  const renderContent = () => {
    if (isLoading) {
      switch (activeView) {
        case 'dashboard':
          return <DashboardSkeleton />;
        case 'appointments':
          return <AppointmentsSkeleton />;
        case 'health-records':
          return <HealthRecordsSkeleton />;
        default:
          return <DashboardSkeleton />; // Fallback skeleton for other views during load
      }
    }

    switch (activeView) {
      case 'dashboard':
        return <Dashboard setActiveView={setActiveView} userProfile={userProfile} />;
      case 'ai-assistant':
        return <AiAssistant userProfile={userProfile} />;
      case 'appointments':
        return <Appointments />;
      case 'health-records':
        return <HealthRecords />;
      case 'profile':
        return <UserProfile userProfile={userProfile} onProfileUpdate={handleProfileUpdate} />;
      default:
        return <Dashboard setActiveView={setActiveView} userProfile={userProfile} />;
    }
  };

  if (!isAuthenticated) {
    return authView === 'login' ? (
      <Login onLogin={handleLogin} onSwitchToRegister={() => setAuthView('register')} />
    ) : (
      <Register onRegister={handleRegister} onSwitchToLogin={() => setAuthView('login')} />
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
        <NavigationBar
          activeView={activeView}
          setActiveView={(view) => {
            setIsLoading(true); // show loader when switching views
            setActiveView(view);
          }}
          onLogout={handleLogout}
          userProfile={userProfile}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-20 md:pb-8">
          {renderContent()}
        </main>
    </div>
  );
};

export default App;