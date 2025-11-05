import React, { useState, useEffect } from 'react';
import type { View } from '../types';
import { appointments, healthRecords } from '../constants';
import DashboardSkeleton from './DashboardSkeleton';
import ArrowRightIcon from './icons/ArrowRightIcon';
import CalendarIcon from './icons/CalendarIcon';
import FileTextIcon from './icons/FileTextIcon';
import ChatIcon from './icons/ChatIcon';

interface DashboardProps {
  setActiveView: (view: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setActiveView }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate data fetching
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  const upcomingAppointment = appointments.find(a => a.type === 'upcoming');
  const latestRecord = healthRecords[0];

  return (
    <div className="space-y-8">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ActionCard
          title="AI Symptom Checker"
          description="Get quick health insights from our AI assistant."
          icon={<ChatIcon className="w-8 h-8 text-white" />}
          color="bg-blue-500"
          onClick={() => setActiveView('ai-assistant')}
        />
        <ActionCard
          title="Schedule Appointment"
          description="Book a new appointment with one of our specialists."
          icon={<CalendarIcon className="w-8 h-8 text-white" />}
          color="bg-green-500"
          onClick={() => setActiveView('appointments')}
        />
        <ActionCard
          title="View Health Records"
          description="Access your complete medical history and test results."
          icon={<FileTextIcon className="w-8 h-8 text-white" />}
          color="bg-purple-500"
          onClick={() => setActiveView('health-records')}
        />
      </div>

      {/* Summaries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Appointment */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Next Appointment</h2>
          {upcomingAppointment ? (
            <div>
              <div className="flex items-center space-x-4">
                <img src={upcomingAppointment.doctor.avatar} alt={upcomingAppointment.doctor.name} className="w-16 h-16 rounded-full" />
                <div>
                  <p className="font-semibold text-gray-700">{new Date(upcomingAppointment.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <p className="text-gray-500">{upcomingAppointment.time}</p>
                  <p className="font-bold text-lg text-gray-800 mt-1">{upcomingAppointment.doctor.name}</p>
                  <p className="text-sm text-gray-600">{upcomingAppointment.doctor.specialty}</p>
                </div>
              </div>
              <button onClick={() => setActiveView('appointments')} className="mt-4 w-full text-blue-600 font-semibold py-2 rounded-lg hover:bg-blue-50 transition flex items-center justify-center">
                View All Appointments <ArrowRightIcon className="w-4 h-4 ml-2" />
              </button>
            </div>
          ) : (
            <p className="text-gray-500">You have no upcoming appointments.</p>
          )}
        </div>

        {/* Latest Health Record */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Latest Health Record</h2>
          {latestRecord ? (
             <div>
              <p className="text-gray-500 mb-2">{new Date(latestRecord.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <h3 className="text-lg font-bold text-gray-800">{latestRecord.type}</h3>
              <p className="text-gray-600 my-2">{latestRecord.details}</p>
              <div className="flex justify-between items-center mt-4">
                 <StatusBadge status={latestRecord.status} />
                 <button onClick={() => setActiveView('health-records')} className="text-blue-600 font-semibold py-2 rounded-lg hover:bg-blue-50 transition flex items-center justify-center px-4">
                    View All Records <ArrowRightIcon className="w-4 h-4 ml-2" />
                 </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No health records found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const ActionCard: React.FC<{ title: string; description: string; icon: React.ReactNode; color: string; onClick: () => void; }> = ({ title, description, icon, color, onClick }) => (
    <button onClick={onClick} className={`p-6 rounded-2xl shadow-lg text-white ${color} flex flex-col justify-between hover:scale-105 transform transition-transform duration-300`}>
        <div className="w-14 h-14 rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-4">
            {icon}
        </div>
        <div>
            <h3 className="text-xl font-bold text-left">{title}</h3>
            <p className="text-sm text-left opacity-90 mt-1">{description}</p>
        </div>
    </button>
);


const StatusBadge: React.FC<{ status: 'Normal' | 'Action Required' | 'Stable' }> = ({ status }) => {
    const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full inline-block";
    const statusClasses = {
        'Normal': 'bg-green-100 text-green-800',
        'Action Required': 'bg-red-100 text-red-800',
        'Stable': 'bg-yellow-100 text-yellow-800',
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
}

export default Dashboard;
