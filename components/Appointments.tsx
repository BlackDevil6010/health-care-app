
import React, { useState } from 'react';
import { appointments as initialAppointments, doctors } from '../constants';
import type { Appointment } from '../types';

const AppointmentCard: React.FC<{ appointment: Appointment }> = ({ appointment }) => (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
        <img src={appointment.doctor.avatar} alt={appointment.doctor.name} className="w-16 h-16 rounded-full" />
        <div className="flex-1">
            <p className="font-bold text-lg text-gray-800">{appointment.doctor.name}</p>
            <p className="text-sm text-gray-500">{appointment.doctor.specialty}</p>
        </div>
        <div className="text-right">
            <p className="font-semibold text-blue-600">{new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p className="text-gray-600">{appointment.time}</p>
        </div>
    </div>
);


const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [showBookingForm, setShowBookingForm] = useState(false);
  
  const upcomingAppointments = appointments.filter(a => a.type === 'upcoming');
  const pastAppointments = appointments.filter(a => a.type === 'past');

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to a backend. Here we just add to the local state.
    const newAppointment: Appointment = {
      id: (appointments.length + 1).toString(),
      doctor: doctors[0], // Mock booking with first doctor
      date: '2024-09-10', // Mock date
      time: '11:00 AM',
      type: 'upcoming'
    };
    setAppointments(prev => [newAppointment, ...prev]);
    setShowBookingForm(false);
  };

  return (
    <div className="space-y-8 pb-16 md:pb-0">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Appointments</h1>
        <button 
          onClick={() => setShowBookingForm(!showBookingForm)}
          className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          {showBookingForm ? 'Cancel' : 'Book New'}
        </button>
      </div>

      {showBookingForm && (
        <div className="bg-white p-6 rounded-xl shadow-lg animate-fade-in-down">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Book a New Appointment</h2>
            <form onSubmit={handleBooking} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">Doctor</label>
                    <select id="doctor" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                        {doctors.map(doc => <option key={doc.id}>{doc.name} - {doc.specialty}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                    <input type="date" id="date" className="mt-1 block w-full pl-3 pr-2 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" />
                </div>
                <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                    <input type="time" id="time" className="mt-1 block w-full pl-3 pr-2 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" />
                </div>
                <div className="md:col-span-3 text-right">
                    <button type="submit" className="bg-green-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors">
                        Confirm Booking
                    </button>
                </div>
            </form>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Upcoming</h2>
        <div className="space-y-4">
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map(app => <AppointmentCard key={app.id} appointment={app} />)
          ) : (
            <p className="text-gray-500 bg-white p-4 rounded-lg">No upcoming appointments.</p>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Past</h2>
        <div className="space-y-4">
           {pastAppointments.length > 0 ? (
            pastAppointments.map(app => <AppointmentCard key={app.id} appointment={app} />)
          ) : (
            <p className="text-gray-500 bg-white p-4 rounded-lg">No past appointments.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
