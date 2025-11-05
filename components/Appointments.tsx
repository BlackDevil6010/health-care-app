import React, { useState, useEffect } from 'react';
import type { Appointment } from '../types';
import { appointments as mockAppointments } from '../constants';
import AppointmentsSkeleton from './AppointmentsSkeleton';
import ScheduleAppointmentModal from './ScheduleAppointmentModal';
import CalendarIcon from './icons/CalendarIcon';
import ClockIcon from './icons/ClockIcon';

const Appointments: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Filter and sort appointments based on the current date
    const now = new Date();
    const upcomingAppointments = appointments
      .filter(a => new Date(a.date) >= now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const pastAppointments = appointments
      .filter(a => new Date(a.date) < now)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());


    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000); // Simulate data fetching
        return () => clearTimeout(timer);
    }, []);

    const handleSchedule = (newAppointmentData: Omit<Appointment, 'id' | 'type'>) => {
        const newAppointment: Appointment = {
            id: `app-${Date.now()}`,
            ...newAppointmentData,
            type: 'upcoming',
        };
        setAppointments(prev => [newAppointment, ...prev]);
        setIsModalOpen(false);
    };

    if (loading) {
        return <AppointmentsSkeleton />;
    }
    
    return (
        <>
            <div className="max-w-5xl mx-auto space-y-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 flex flex-col md:flex-row justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">My Appointments</h1>
                        <p className="text-gray-500 mt-1">View your upcoming and past appointments, or schedule a new one.</p>
                    </div>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center gap-2 mt-4 md:mt-0 animate-pulse-glow"
                    >
                        <CalendarIcon className="w-6 h-6" />
                        <span>Schedule New Appointment</span>
                    </button>
                </div>


                {/* Upcoming Appointments */}
                <div>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4 pb-2 border-b-2 border-gray-200">Upcoming</h2>
                    {upcomingAppointments.length > 0 ? (
                        <div className="space-y-4">
                            {upcomingAppointments.map(app => <AppointmentCard key={app.id} appointment={app} />)}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 bg-white p-8 rounded-2xl shadow-lg">
                            <CalendarIcon className="w-12 h-12 mx-auto text-gray-300 mb-2"/>
                            <p className="font-medium">No upcoming appointments</p>
                            <p className="text-sm mt-1">Click "Schedule New" to book your next visit.</p>
                        </div>
                    )}
                </div>

                {/* Past Appointments */}
                <div>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4 pb-2 border-b-2 border-gray-200">Past</h2>
                    {pastAppointments.length > 0 ? (
                        <div className="space-y-4">
                            {pastAppointments.map(app => <AppointmentCard key={app.id} appointment={app} />)}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 bg-white p-8 rounded-2xl shadow-lg">
                            <p>No past appointments to show.</p>
                        </div>
                    )}
                </div>
            </div>

            <ScheduleAppointmentModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSchedule={handleSchedule}
            />
        </>
    );
};

const AppointmentCard: React.FC<{ appointment: Appointment }> = ({ appointment }) => (
    <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row items-start sm:items-center gap-6 animate-fade-in-up" style={{ animationDelay: '100ms', animationFillMode: 'backwards' }}>
        <img 
            src={appointment.doctor.avatar} 
            alt={appointment.doctor.name} 
            className="w-20 h-20 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1">
            <p className="font-bold text-lg text-gray-800">{appointment.doctor.name}</p>
            <p className="text-sm text-gray-600">{appointment.doctor.specialty}</p>
            {appointment.reason && (
                <p className="text-sm text-gray-500 mt-2 pt-2 border-t border-gray-100">
                    <span className="font-semibold text-gray-600">Reason:</span> {appointment.reason}
                </p>
            )}
        </div>
        <div className="text-left sm:text-right flex-shrink-0 mt-4 sm:mt-0">
            <div className="flex items-center gap-2 text-gray-700 font-medium">
                <CalendarIcon className="w-5 h-5 text-gray-400"/>
                <span>{new Date(appointment.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 font-medium mt-1">
                <ClockIcon className="w-5 h-5 text-gray-400"/>
                <span>{appointment.time}</span>
            </div>
        </div>
    </div>
);

export default Appointments;