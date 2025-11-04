import React from 'react';
import type { View } from '../types';
import HomeIcon from './icons/HomeIcon';
import ChatIcon from './icons/ChatIcon';
import CalendarIcon from './icons/CalendarIcon';
import FileTextIcon from './icons/FileTextIcon';
import LogoutIcon from './icons/LogoutIcon';

interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, onLogout }) => {
  const navItems = [
    { view: 'dashboard', icon: HomeIcon, label: 'Dashboard' },
    { view: 'ai-assistant', icon: ChatIcon, label: 'AI Assistant' },
    { view: 'appointments', icon: CalendarIcon, label: 'Appointments' },
    { view: 'health-records', icon: FileTextIcon, label: 'Health Records' },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-gray-300 flex flex-col flex-shrink-0 h-screen sticky top-0">
      <div className="h-20 flex items-center justify-center px-6 bg-gray-900">
        <h1 className="text-2xl font-bold text-white tracking-wider">Health+</h1>
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
