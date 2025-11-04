import React from 'react';
import type { View, UserProfileData } from '../types';
import { appointments, healthRecords } from '../constants';
import ArrowRightIcon from './icons/ArrowRightIcon';
import ClockIcon from './icons/ClockIcon';
import HeartPulseIcon from './icons/HeartPulseIcon';
import BeakerIcon from './icons/BeakerIcon';
import DropletIcon from './icons/DropletIcon';
import WalkingIcon from './icons/WalkingIcon';

interface DashboardProps {
  setActiveView: (view: View) => void;
  userProfile: UserProfileData;
}

const Dashboard: React.FC<DashboardProps> = ({ setActiveView, userProfile }) => {
  const upcomingAppointment = appointments.find(a => a.type === 'upcoming');
  const recentRecord = healthRecords[0];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Welcome back, {userProfile.name}!</h1>
        <p className="text-md text-gray-500">Here's your health summary for today.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={HeartPulseIcon} title="Heart Rate" value="72 bpm" trend="Normal" />
        <StatCard icon={DropletIcon} title="Blood Sugar" value="95 mg/dL" trend="Stable" />
        <StatCard icon={WalkingIcon} title="Steps Today" value="8,230" trend="Good" />
        <StatCard icon={BeakerIcon} title="Last Lab Test" value="Normal" trend="July 15" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Appointment */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Upcoming Appointment</h2>
            <button onClick={() => setActiveView('appointments')} className="text-sm font-semibold text-teal-600 hover:underline flex items-center">
              View All <ArrowRightIcon className="w-4 h-4 ml-1" />
            </button>
          </div>
          {upcomingAppointment ? (
            <div className="flex items-center space-x-4">
              <img src={upcomingAppointment.doctor.avatar} alt={upcomingAppointment.doctor.name} className="w-16 h-16 rounded-full" />
              <div className="flex-1">
                <p className="font-bold text-lg text-gray-800">{upcomingAppointment.doctor.name}</p>
                <p className="text-sm text-gray-500">{upcomingAppointment.doctor.specialty}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-teal-600">{new Date(upcomingAppointment.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
                <p className="text-gray-600 flex items-center justify-end">
                  <ClockIcon className="w-4 h-4 mr-1.5" />
                  {upcomingAppointment.time}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 mt-4">No upcoming appointments. Time to relax!</p>
          )}
        </div>
        
        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="space-y-3">
             <ActionButton onClick={() => setActiveView('ai-assistant')} text="Ask AI Assistant" />
             <ActionButton onClick={() => setActiveView('appointments')} text="Book Appointment" />
             <ActionButton onClick={() => setActiveView('health-records')} text="View Records" />
          </div>
        </div>
      </div>

      {/* Recent Health Record */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
         <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Recent Health Record</h2>
             <button onClick={() => setActiveView('health-records')} className="text-sm font-semibold text-teal-600 hover:underline flex items-center">
              View All <ArrowRightIcon className="w-4 h-4 ml-1" />
            </button>
          </div>
          {recentRecord ? (
            <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-700">{recentRecord.type}</p>
                  <p className="text-sm text-gray-500">{recentRecord.details}</p>
                </div>
                <div className="text-right">
                  <p className={`px-3 py-1 text-xs font-semibold rounded-full ${recentRecord.status === 'Normal' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {recentRecord.status}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{new Date(recentRecord.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
                </div>
            </div>
          ) : (
             <p className="text-gray-500 mt-4">No recent records found.</p>
          )}
      </div>

    </div>
  );
};

const StatCard: React.FC<{ icon: React.FC<any>, title: string, value: string, trend: string }> = ({ icon: Icon, title, value, trend }) => (
  <div className="bg-white p-5 rounded-2xl shadow-lg flex items-center space-x-4">
    <div className="p-3 bg-teal-100 rounded-full">
      <Icon className="w-6 h-6 text-teal-600" />
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-bold text-gray-800">{value}</p>
      <p className="text-xs text-green-600">{trend}</p>
    </div>
  </div>
);

const ActionButton: React.FC<{ onClick: () => void, text: string }> = ({ onClick, text }) => (
  <button onClick={onClick} className="w-full text-left bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-3 rounded-lg transition-colors flex justify-between items-center">
    <span>{text}</span>
    <ArrowRightIcon className="w-5 h-5" />
  </button>
);


export default Dashboard;