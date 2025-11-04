import React from 'react';
import type { View, UserProfileData } from '../types';
import { appointments, healthRecords } from '../constants';
import ArrowRightIcon from './icons/ArrowRightIcon';
import ChatIcon from './icons/ChatIcon';
import FileTextIcon from './icons/FileTextIcon';
import MedicalHistoryIcon from './icons/MedicalHistoryIcon';

interface DashboardProps {
  setActiveView: (view: View) => void;
  userProfile: UserProfileData;
}

const Dashboard: React.FC<DashboardProps> = ({ setActiveView, userProfile }) => {
  const upcomingAppointment = appointments.find(a => a.type === 'upcoming');
  const recentRecord = healthRecords[0];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div 
        className="relative bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl shadow-xl overflow-hidden p-8 sm:p-12 text-white animate-fade-in-up" 
      >
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Hello, {userProfile.name.split(' ')[0]}!</h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8">
            Welcome to your personal health dashboard. Here you can manage appointments, view your records, and connect with our AI assistant.
          </p>
          <button
            onClick={() => setActiveView('appointments')}
            className="bg-white text-blue-700 font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-blue-50 transition-transform transform hover:scale-105"
          >
            Book an Appointment
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ActionCard 
          icon={ChatIcon} 
          title="AI Assistant" 
          description="Ask questions and get health insights." 
          onClick={() => setActiveView('ai-assistant')}
          color="bg-blue-500"
        />
        <ActionCard 
          icon={FileTextIcon} 
          title="Health Records" 
          description="Access your test results and reports." 
          onClick={() => setActiveView('health-records')}
          color="bg-cyan-500"
        />
        <ActionCard 
          icon={MedicalHistoryIcon} 
          title="Medical History" 
          description="View your complete medical timeline." 
          onClick={() => setActiveView('health-records')} /* Assuming this leads to records for now */
          color="bg-sky-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Upcoming Appointment */}
        <div className="lg:col-span-3 bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Appointment</h2>
          {upcomingAppointment ? (
            <div className="flex items-center space-x-4">
              <img src={upcomingAppointment.doctor.avatar} alt={upcomingAppointment.doctor.name} className="w-16 h-16 rounded-full object-cover" />
              <div className="flex-1">
                <p className="font-bold text-lg text-gray-900">{upcomingAppointment.doctor.name}</p>
                <p className="text-sm text-gray-500">{upcomingAppointment.doctor.specialty}</p>
                <p className="text-sm text-gray-500 mt-1">{new Date(upcomingAppointment.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {upcomingAppointment.time}</p>
              </div>
              <button onClick={() => setActiveView('appointments')} className="text-sm font-semibold text-blue-600 hover:underline flex items-center">
                  Details <ArrowRightIcon className="w-4 h-4 ml-1" />
              </button>
            </div>
          ) : (
            <p className="text-gray-500 mt-4 text-center py-8">You have no upcoming appointments. Enjoy your day!</p>
          )}
        </div>
        
        {/* Recent Health Record */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Record</h2>
          {recentRecord ? (
            <div>
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-800">{recentRecord.type}</p>
                  <p className={`px-3 py-1 text-xs font-semibold rounded-full ${recentRecord.status === 'Normal' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {recentRecord.status}
                  </p>
                </div>
                <p className="text-sm text-gray-500 mt-1">{new Date(recentRecord.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                <p className="text-md text-gray-700 mt-2">{recentRecord.details}</p>
            </div>
          ) : (
             <p className="text-gray-500 mt-4 text-center py-8">No recent health records found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const ActionCard: React.FC<{ icon: React.FC<any>, title: string, description: string, onClick: () => void, color: string }> = ({ icon: Icon, title, description, onClick, color }) => (
  <button 
    onClick={onClick} 
    className="bg-white p-6 rounded-2xl shadow-lg text-left hover:shadow-xl hover:-translate-y-1 transition-all group"
  >
    <div className={`p-3 ${color} rounded-lg inline-block mb-4`}>
      <Icon className="w-7 h-7 text-white" />
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-1">{title}</h3>
    <p className="text-gray-500 mb-4">{description}</p>
    <div className="flex items-center text-blue-600 font-semibold">
      <span>Get Started</span>
      <ArrowRightIcon className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1" />
    </div>
  </button>
);

export default Dashboard;