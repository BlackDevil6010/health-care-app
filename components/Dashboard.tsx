
import React from 'react';
import type { View } from '../types';
import { appointments } from '../constants';
import ChatIcon from './icons/ChatIcon';
import CalendarIcon from './icons/CalendarIcon';

interface DashboardProps {
  setActiveView: (view: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setActiveView }) => {
  const upcomingAppointment = appointments.find(a => a.type === 'upcoming');

  return (
    <div className="space-y-8 pb-16 md:pb-0">
      {/* Welcome Banner */}
      <div className="bg-blue-600 rounded-xl shadow-lg p-8 text-white flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Good Morning, Alex</h2>
          <p className="mt-2 text-blue-100">Let's check on your health today. How can we help?</p>
        </div>
        <img src="https://picsum.photos/seed/health/150/150" alt="Wellness" className="hidden sm:block rounded-full w-24 h-24 border-4 border-blue-500"/>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => setActiveView('ai-assistant')}
                className="group flex flex-col items-center justify-center p-6 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-300 text-center"
              >
                <div className="bg-blue-200 p-3 rounded-full mb-3">
                    <ChatIcon className="w-6 h-6 text-blue-700" />
                </div>
                <p className="font-semibold text-blue-800">Check Symptoms</p>
                <p className="text-sm text-blue-600">with our AI Assistant</p>
              </button>
              <button
                onClick={() => setActiveView('appointments')}
                className="group flex flex-col items-center justify-center p-6 bg-green-50 hover:bg-green-100 rounded-lg transition-all duration-300 text-center"
              >
                 <div className="bg-green-200 p-3 rounded-full mb-3">
                    <CalendarIcon className="w-6 h-6 text-green-700" />
                </div>
                <p className="font-semibold text-green-800">Book Appointment</p>
                <p className="text-sm text-green-600">Find a specialist</p>
              </button>
            </div>
          </div>
        </div>

        {/* Side Column */}
        <div className="space-y-8">
          {/* Upcoming Appointment */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Appointment</h3>
            {upcomingAppointment ? (
              <div className="flex items-start space-x-4">
                <img src={upcomingAppointment.doctor.avatar} alt={upcomingAppointment.doctor.name} className="w-16 h-16 rounded-full"/>
                <div>
                    <p className="font-bold text-gray-800">{upcomingAppointment.doctor.name}</p>
                    <p className="text-sm text-gray-500">{upcomingAppointment.doctor.specialty}</p>
                    <p className="text-sm font-medium text-blue-600 mt-2">{new Date(upcomingAppointment.date).toDateString()} at {upcomingAppointment.time}</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No upcoming appointments.</p>
            )}
          </div>
          
           {/* Health Tip */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Health Tip of the Day</h3>
             <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-r-lg">
                <p className="font-bold">Stay Hydrated!</p>
                <p className="text-sm">Drinking enough water daily is crucial for many reasons: to regulate body temperature, keep joints lubricated, prevent infections, deliver nutrients to cells, and keep organs functioning properly.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
