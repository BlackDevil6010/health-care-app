import React, { useState } from 'react';
import type { View, UserProfileData } from '../types';
import HomeIcon from './icons/HomeIcon';
import ChatIcon from './icons/ChatIcon';
import CalendarIcon from './icons/CalendarIcon';
import FileTextIcon from './icons/FileTextIcon';
import LogoutIcon from './icons/LogoutIcon';
import UserCircleIcon from './icons/UserCircleIcon';

interface NavigationBarProps {
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

const NavigationBar: React.FC<NavigationBarProps> = ({ activeView, setActiveView, onLogout, userProfile }) => {
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);

  const navItems = [
    { view: 'dashboard', icon: HomeIcon, label: 'Dashboard' },
    { view: 'ai-assistant', icon: ChatIcon, label: 'AI Assistant' },
    { view: 'appointments', icon: CalendarIcon, label: 'Appointments' },
    { view: 'health-records', icon: FileTextIcon, label: 'Health Records' },
  ];

  const mobileNavItems = [...navItems, { view: 'profile' as View, icon: UserCircleIcon, label: 'Profile' }];

  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveView('profile');
    setProfileMenuOpen(false);
  };

  return (
    <>
      <header className="w-full bg-gray-800 text-gray-300 flex items-center justify-between px-4 sm:px-6 h-20 shadow-md z-40">
        {/* Left section: Brand and Desktop Nav */}
        <div className="flex items-center space-x-8">
          <span className="text-2xl font-bold text-white tracking-wider">Ethical Elites</span>
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => setActiveView(item.view as View)}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  activeView === item.view
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-700 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5 mr-2" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Right section: User Menu */}
        <div className="flex items-center space-x-4">
          <button className="relative text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="relative">
            <button onClick={() => setProfileMenuOpen(!isProfileMenuOpen)} className="block">
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold ring-2 ring-gray-600 hover:ring-blue-500 transition-all">
                {getInitials(userProfile.name)}
              </div>
            </button>
            {isProfileMenuOpen && (
              <div 
                  className="absolute right-0 mt-3 w-56 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50"
                  onMouseLeave={() => setProfileMenuOpen(false)}
              >
                <div className="px-4 py-3 border-b border-gray-200">
                   <p className="text-sm font-semibold text-gray-900">{userProfile.name}</p>
                   <p className="text-xs text-gray-500 truncate">@{userProfile.username}</p>
                </div>
                <div className="py-1">
                    <a
                        href="#"
                        onClick={handleProfileClick}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        <UserCircleIcon className="w-5 h-5 mr-3 text-gray-500" />
                        My Profile
                    </a>
                    <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); onLogout(); }}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        <LogoutIcon className="w-5 h-5 mr-3 text-gray-500" />
                        Logout
                    </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Bottom nav for small screens */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-800 flex justify-around p-2 border-t border-gray-700 z-40">
        {mobileNavItems.map((item) => (
          <button
            key={item.view}
            onClick={() => setActiveView(item.view as View)}
            className={`flex flex-col items-center justify-center w-full p-1 rounded-lg transition-colors duration-200 ${
              activeView === item.view
                ? 'text-blue-400'
                : 'text-gray-400 hover:text-white'
            }`}
            aria-label={item.label}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
};

export default NavigationBar;