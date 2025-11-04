import React from 'react';
import { healthRecords } from '../constants';

const statusColorMap = {
  Normal: 'bg-green-100 text-green-800',
  'Action Required': 'bg-red-100 text-red-800',
  Stable: 'bg-yellow-100 text-yellow-800',
};

const HealthRecords: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Health Records</h1>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3">Record Type</th>
                <th scope="col" className="px-6 py-3">Date</th>
                <th scope="col" className="px-6 py-3">Details</th>
                <th scope="col" className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {healthRecords.map((record) => (
                <tr key={record.id} className="bg-white border-b hover:bg-gray-50">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {record.type}
                  </th>
                  <td className="px-6 py-4">{record.date}</td>
                  <td className="px-6 py-4">{record.details}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColorMap[record.status]}`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HealthRecords;