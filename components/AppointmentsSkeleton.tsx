import React from 'react';

const AppointmentCardSkeleton: React.FC = () => (
    <div className="bg-white p-4 rounded-lg shadow-md h-24 flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-gray-200"></div>
        <div className="flex-1 space-y-2">
            <div className="h-5 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="w-1/3 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
    </div>
);

const AppointmentsSkeleton: React.FC = () => {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-8 bg-gray-200 rounded-md w-1/3"></div>
        <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
      </div>

      <div>
        <div className="h-7 bg-gray-200 rounded-md w-1/4 mb-4"></div>
        <div className="space-y-4">
          <AppointmentCardSkeleton />
          <AppointmentCardSkeleton />
        </div>
      </div>

      <div>
        <div className="h-7 bg-gray-200 rounded-md w-1/4 mb-4"></div>
        <div className="space-y-4">
          <AppointmentCardSkeleton />
          <AppointmentCardSkeleton />
        </div>
      </div>
    </div>
  );
};

export default AppointmentsSkeleton;
