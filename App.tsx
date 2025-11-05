import React, { useState, useEffect } from 'react';
import NavigationBar from './components/NavigationBar';
import Dashboard from './components/Dashboard';
import AiAssistant from './components/AiAssistant';
import Appointments from './components/Appointments';
import HealthRecords from './components/HealthRecords';
import UserProfile from './components/UserProfile';
import Login from './components/Login';
import Register from './components/Register';
import Tour from './components/Tour';
import VideoStudio from './components/VideoStudio';
import ConfirmationModal from './components/ConfirmationModal';
import type { View, UserProfileData } from './types';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'register'>('login');
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [userProfile, setUserProfile] = useState<UserProfileData>({
    name: 'Alex Doe',
    email: 'alex.doe@example.com',
    username: 'alexdoe',
    avatar: 'https://picsum.photos/id/1005/200/200',
  });
  const [loading, setLoading] = useState(true);
  const [showTour, setShowTour] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  useEffect(() => {
    // Simulate checking auth status
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
      // check if tour was completed
      const tourCompleted = localStorage.getItem('tourCompleted');
      if (tourCompleted !== 'true') {
          setShowTour(true);
      }
    }
    const timer = setTimeout(() => setLoading(false), 1500); // Simulate initial load
    return () => clearTimeout(timer);
  }, []);
  
  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
    const tourCompleted = localStorage.getItem('tourCompleted');
    if (tourCompleted !== 'true') {
        setShowTour(true);
    }
  };

  const executeLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setActiveView('dashboard');
    setIsLogoutModalOpen(false);
  };

  const requestLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const handleRegister = () => {
    // In a real app, this would likely log the user in automatically
    setAuthView('login');
  };
  
  const handleProfileUpdate = (newProfile: UserProfileData) => {
    setUserProfile(newProfile);
    // Here you would also make an API call to save the data
  };

  const handleTourComplete = () => {
    localStorage.setItem('tourCompleted', 'true');
    setShowTour(false);
  };
  
  if (loading && !isLoggedIn) {
      // Don't show a skeleton for login, just wait.
      return <div className="min-h-screen bg-gray-100" />;
  }

  if (!isLoggedIn) {
    if (authView === 'login') {
      return <Login onLogin={handleLogin} onSwitchToRegister={() => setAuthView('register')} />;
    }
    return <Register onRegister={handleRegister} onSwitchToLogin={() => setAuthView('login')} />;
  }

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard setActiveView={setActiveView} />;
      case 'ai-assistant':
        return <AiAssistant />;
      case 'appointments':
        return <Appointments />;
      case 'health-records':
        return <HealthRecords />;
      case 'profile':
        return <UserProfile userProfile={userProfile} onProfileUpdate={handleProfileUpdate} />;
      case 'video-studio':
        return <VideoStudio />;
      default:
        return <Dashboard setActiveView={setActiveView} />;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavigationBar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        onLogout={requestLogout}
        userProfile={userProfile}
      />
      <main className="p-8 pt-28 container mx-auto">
        {renderView()}
      </main>
      {showTour && <Tour onComplete={handleTourComplete} />}
      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={executeLogout}
        title="Confirm Logout"
        confirmText="Logout"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
      >
        <p>Are you sure you want to log out of your account?</p>
      </ConfirmationModal>
    </div>
  );
};

export default App;
