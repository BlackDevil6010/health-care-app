import React from 'react';

const DashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header */}
      <div>
        <div className="h-8 bg-gray-200 rounded-md w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="h-24 bg-white rounded-2xl shadow-lg p-5 flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-5 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
        <div className="h-24 bg-white rounded-2xl shadow-lg p-5 flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-5 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
        <div className="h-24 bg-white rounded-2xl shadow-lg p-5 flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-5 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
        <div className="h-24 bg-white rounded-2xl shadow-lg p-5 flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-5 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Appointment */}
        <div className="lg:col-span-2 h-40 bg-white p-6 rounded-2xl shadow-lg space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            <div className="h-16 bg-gray-200 rounded-lg"></div>
        </div>
        
        {/* Quick Actions */}
        <div className="h-40 bg-white p-6 rounded-2xl shadow-lg space-y-3">
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-10 bg-gray-200 rounded-lg"></div>
            <div className="h-10 bg-gray-200 rounded-lg"></div>
        </div>
      </div>

      {/* Recent Health Record */}
      <div className="h-28 bg-white p-6 rounded-2xl shadow-lg">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
