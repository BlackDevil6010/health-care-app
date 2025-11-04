import React, { useState } from 'react';
import type { View } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AiAssistant from './components/AiAssistant';
import Appointments from './components/Appointments';
import HealthRecords from './components/HealthRecords';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const [activeView, setActiveView] = useState<View>('dashboard');

  const handleLogin = () => {
    setIsAuthenticated(true);
    setActiveView('dashboard'); // Reset to dashboard on login
  };

  const handleRegister = () => {
    // For simplicity, directly log in after registration
    setIsAuthenticated(true);
    setActiveView('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsLoginView(true); // Go back to login screen on logout
  };
  
  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard setActiveView={setActiveView} />;
      case 'ai-assistant':
        return <AiAssistant />;
      case 'appointments':
        return <Appointments />;
      case 'health-records':
        return <HealthRecords />;
      default:
        return <Dashboard setActiveView={setActiveView} />;
    }
  };

  if (!isAuthenticated) {
    return isLoginView ? (
      <Login onLogin={handleLogin} onSwitchToRegister={() => setIsLoginView(false)} />
    ) : (
      <Register onRegister={handleRegister} onSwitchToLogin={() => setIsLoginView(true)} />
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeView={activeView} setActiveView={setActiveView} onLogout={handleLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6 md:p-8">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
}

export default App;
