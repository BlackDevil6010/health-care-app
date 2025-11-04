import React, { useState, useEffect } from 'react';
import type { UserProfileData } from '../types';
import UserIcon from './icons/UserIcon';
import EnvelopeIcon from './icons/EnvelopeIcon';

interface UserProfileProps {
  userProfile: UserProfileData;
  onProfileUpdate: (newProfile: UserProfileData) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ userProfile, onProfileUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfileData>(userProfile);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Reset form data if user profile prop changes (e.g., on initial load)
  useEffect(() => {
    setFormData(userProfile);
  }, [userProfile]);
  
  useEffect(() => {
    if (saveSuccess) {
      const timer = setTimeout(() => setSaveSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [saveSuccess]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onProfileUpdate(formData);
    setIsEditing(false);
    setSaveSuccess(true);
  };
  
  const handleCancel = () => {
    setFormData(userProfile);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
      
      {saveSuccess && (
         <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md" role="alert">
          <p className="font-bold">Success</p>
          <p>Your profile has been updated successfully.</p>
        </div>
      )}

      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <div className="w-full">
          {!isEditing ? (
            <div className="space-y-4 text-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{formData.name}</h2>
                <p className="text-lg text-gray-600">@{formData.username}</p>
                <p className="text-gray-500 mt-1">{formData.email}</p>
              </div>
              <button 
                onClick={() => setIsEditing(true)} 
                className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <div className="space-y-6 max-w-md mx-auto">
              <div className="relative">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </span>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
               <div className="relative">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </span>
                  <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
              <div className="relative">
                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                 <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                    </span>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                 </div>
              </div>
              <div className="flex items-center space-x-4">
                <button onClick={handleSave} className="bg-green-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors">
                  Save Changes
                </button>
                <button onClick={handleCancel} className="text-gray-600 font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;