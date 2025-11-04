import React from 'react';

const HealthRecordsSkeleton: React.FC = () => {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-8 bg-gray-200 rounded-md w-1/3"></div>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-5"><div className="h-4 bg-gray-200 rounded w-24"></div></th>
                <th className="px-6 py-5"><div className="h-4 bg-gray-200 rounded w-16"></div></th>
                <th className="px-6 py-5"><div className="h-4 bg-gray-200 rounded w-32"></div></th>
                <th className="px-6 py-5"><div className="h-4 bg-gray-200 rounded w-20"></div></th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 4 }).map((_, i) => (
                <tr key={i} className="border-b">
                  <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-3/4"></div></td>
                  <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-1/2"></div></td>
                  <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-full"></div></td>
                  <td className="px-6 py-4"><div className="h-6 bg-gray-200 rounded-full w-24"></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HealthRecordsSkeleton;
