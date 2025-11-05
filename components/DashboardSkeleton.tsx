import React from 'react';

const DashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Quick Actions Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="h-48 bg-gray-200 rounded-2xl"></div>
        <div className="h-48 bg-gray-200 rounded-2xl"></div>
        <div className="h-48 bg-gray-200 rounded-2xl"></div>
      </div>

      {/* Summaries Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Appointment Skeleton */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gray-200"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-5 bg-gray-200 rounded w-3/4 mt-1"></div>
            </div>
          </div>
          <div className="h-10 bg-gray-100 rounded-lg mt-4"></div>
        </div>

        {/* Latest Health Record Skeleton */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
           <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-5 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="flex justify-between items-center pt-2">
                 <div className="h-6 bg-gray-200 rounded-full w-24"></div>
                 <div className="h-8 bg-gray-100 rounded-lg w-36"></div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
