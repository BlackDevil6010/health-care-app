import React, { useState, useEffect, useRef } from 'react';
import type { View, UserProfileData } from '../types';
import HomeIcon from './icons/HomeIcon';
import ChatIcon from './icons/ChatIcon';
import CalendarIcon from './icons/CalendarIcon';
import FileTextIcon from './icons/FileTextIcon';
import LogoutIcon from './icons/LogoutIcon';
import UserCircleIcon from './icons/UserCircleIcon';
import SearchIcon from './icons/SearchIcon';
import VideoIcon from './icons/VideoIcon';

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
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const menuRef = useRef<HTMLDivElement>(null);

    const navItems = [
        { view: 'dashboard', icon: HomeIcon, label: 'Dashboard' },
        { view: 'ai-assistant', icon: ChatIcon, label: 'AI Assistant' },
        { view: 'appointments', icon: CalendarIcon, label: 'Appointments' },
        { view: 'health-records', icon: FileTextIcon, label: 'Health Records' },
        { view: 'video-studio', icon: VideoIcon, label: 'Video Studio' },
    ];
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-40 bg-white shadow-md h-20">
            <div className="container mx-auto px-6 flex justify-between items-center h-full">
                <div className="flex items-center gap-8">
                    <h1 className="text-2xl font-bold text-gray-800 tracking-wider">Ethical Elites</h1>
                    <nav className="hidden md:flex items-center space-x-2">
                        {navItems.map(item => (
                            <button
                                key={item.view}
                                onClick={() => setActiveView(item.view as View)}
                                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                                    activeView === item.view
                                    ? 'bg-blue-100 text-blue-600'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <item.icon className="w-5 h-5 mr-2" />
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:block relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <SearchIcon className="w-5 h-5 text-gray-400" />
                        </span>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full max-w-xs pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                        />
                    </div>

                    <div className="relative" ref={menuRef}>
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                                {getInitials(userProfile.name)}
                            </div>
                            <span className="hidden lg:inline font-semibold text-gray-700 pr-2">{userProfile.name}</span>
                        </button>

                        {isMenuOpen && (
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden animate-fade-in-up" style={{ animationDuration: '0.2s' }}>
                                <div className="p-4 border-b border-gray-100">
                                    <p className="font-bold text-gray-800">{userProfile.name}</p>
                                    <p className="text-sm text-gray-500">@{userProfile.username}</p>
                                </div>
                                <div className="py-2">
                                    <button
                                        onClick={() => { setActiveView('profile'); setIsMenuOpen(false); }}
                                        className={`w-full text-left flex items-center px-4 py-2 text-sm ${activeView === 'profile' ? 'text-blue-600 bg-blue-50' : 'text-gray-700'} hover:bg-gray-100`}
                                    >
                                        <UserCircleIcon className="w-5 h-5 mr-3" />
                                        <span>My Profile</span>
                                    </button>
                                    <button
                                        onClick={onLogout}
                                        className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <LogoutIcon className="w-5 h-5 mr-3" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default NavigationBar;