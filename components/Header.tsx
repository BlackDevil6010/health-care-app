
import React from 'react';
import type { UserProfileData } from '../types';

interface HeaderProps {
  userProfile: UserProfileData;
}

const Header: React.FC<HeaderProps> = ({ userProfile }) => {
  return (
    <header className="flex items-center justify-between h-20 px-6 bg-white shadow-sm flex-shrink-0">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Welcome back, {userProfile.name}!</h2>
        <p className="text-sm text-gray-500">Here's your health summary for today.</p>
      </div>
      <div className="flex items-center space-x-4">
        <button className="relative text-gray-500 hover:text-gray-700">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={userProfile.avatar}
          alt="User avatar"
        />
      </div>
    </header>
  );
};

export default Header;