import React from 'react';
import type { View, UserProfileData } from '../types';
import HomeIcon from './icons/HomeIcon';
import ChatIcon from './icons/ChatIcon';
import CalendarIcon from './icons/CalendarIcon';
import FileTextIcon from './icons/FileTextIcon';
import LogoutIcon from './icons/LogoutIcon';
import UserCircleIcon from './icons/UserCircleIcon';

interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
  onLogout: () => void;
  userProfile: UserProfileData;
}

const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length === 1) return names[0][0]?.toUpperCase() || '';
    return (names[0][0] + (names[names.length - 1][0] || '')).toUpperCase();
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, onLogout, userProfile }) => {
  const navItems = [
    { view: 'dashboard', icon: HomeIcon, label: 'Dashboard' },
    { view: 'ai-assistant', icon: ChatIcon, label: 'AI Assistant' },
    { view: 'appointments', icon: CalendarIcon, label: 'Appointments' },
    { view: 'health-records', icon: FileTextIcon, label: 'Health Records' },
    { view: 'profile', icon: UserCircleIcon, label: 'Profile' },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-gray-300 flex flex-col flex-shrink-0 h-screen sticky top-0">
      <div className="h-20 flex items-center justify-center px-6 bg-gray-900">
        <h1 className="text-2xl font-bold text-white tracking-wider">Ethical Elites</h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.view}
            onClick={() => setActiveView(item.view as View)}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
              activeView === item.view
                ? 'bg-blue-600 text-white'
                : 'hover:bg-gray-700 hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="px-4 py-6 border-t border-gray-700">
         <div className="flex items-center mb-4 px-4">
            <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold mr-3 flex-shrink-0">
                {getInitials(userProfile.name)}
            </div>
            <div>
              <p className="font-semibold text-white text-sm">{userProfile.name}</p>
              <p className="text-xs text-gray-400">@{userProfile.username}</p>
            </div>
          </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-200"
        >
          <LogoutIcon className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;