import React, { useState, useEffect } from 'react';
import type { HealthRecord } from '../types';
import { healthRecords as mockHealthRecords } from '../constants';
import HealthRecordsSkeleton from './HealthRecordsSkeleton';
import FileTextIcon from './icons/FileTextIcon';
import BeakerIcon from './icons/BeakerIcon';
import HeartPulseIcon from './icons/HeartPulseIcon';

const HealthRecords: React.FC = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000); // Simulate data fetching
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <HealthRecordsSkeleton />;
    }
    
    const getIcon = (type: string) => {
        if (type.toLowerCase().includes('blood pressure')) return <HeartPulseIcon className="w-5 h-5 text-red-500" />;
        if (type.toLowerCase().includes('test')) return <BeakerIcon className="w-5 h-5 text-blue-500" />;
        return <FileTextIcon className="w-5 h-5 text-gray-500" />;
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-gray-800">Health Records</h1>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-4">Record Type</th>
                                <th scope="col" className="px-6 py-4">Date</th>
                                <th scope="col" className="px-6 py-4">Details</th>
                                <th scope="col" className="px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockHealthRecords.map((record) => (
                                <tr key={record.id} className="bg-white border-b hover:bg-gray-50">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex items-center">
                                        <div className="mr-3">{getIcon(record.type)}</div>
                                        {record.type}
                                    </th>
                                    <td className="px-6 py-4">{record.date}</td>
                                    <td className="px-6 py-4">{record.details}</td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={record.status} />
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

const StatusBadge: React.FC<{ status: 'Normal' | 'Action Required' | 'Stable' }> = ({ status }) => {
    const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full inline-block";
    const statusClasses = {
        'Normal': 'bg-green-100 text-green-800',
        'Action Required': 'bg-red-100 text-red-800',
        'Stable': 'bg-yellow-100 text-yellow-800',
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
}

export default HealthRecords;
