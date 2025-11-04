import React, { useState } from 'react';
import { appointments as initialAppointments, doctors } from '../constants';
import type { Appointment } from '../types';

const AppointmentCard: React.FC<{ appointment: Appointment }> = ({ appointment }) => (
    <div className="bg-white p-5 rounded-lg shadow-md flex items-start space-x-4">
        <img src={appointment.doctor.avatar} alt={appointment.doctor.name} className="w-16 h-16 rounded-full flex-shrink-0" />
        <div className="flex-1">
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-bold text-lg text-gray-800">{appointment.doctor.name}</p>
                    <p className="text-sm text-gray-500">{appointment.doctor.specialty}</p>
                </div>
                <div className="text-right ml-4 flex-shrink-0">
                    <p className="font-semibold text-teal-600">{new Date(appointment.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    <p className="text-gray-600">{appointment.time}</p>
                </div>
            </div>
            {appointment.reason && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-sm text-gray-600">
                        <span className="font-semibold text-gray-800">Reason for visit:</span> {appointment.reason}
                    </p>
                </div>
            )}
        </div>
    </div>
);


const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [showBookingForm, setShowBookingForm] = useState(false);

  // State for form fields and validation
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [reasonForVisit, setReasonForVisit] = useState('');
  const [errors, setErrors] = useState<{ doctor?: string; date?: string; time?: string }>({});
  
  const upcomingAppointments = appointments.filter(a => a.type === 'upcoming');
  const pastAppointments = appointments.filter(a => a.type === 'past');

  const resetForm = () => {
    setSelectedDoctorId('');
    setSelectedDate('');
    setSelectedTime('');
    setReasonForVisit('');
    setErrors({});
  };

  const handleToggleForm = () => {
    // If we're closing the form, reset its state
    if (showBookingForm) {
      resetForm();
    }
    setShowBookingForm(!showBookingForm);
  };

  const validateForm = () => {
    const newErrors: { doctor?: string; date?: string; time?: string } = {};
    if (!selectedDoctorId) newErrors.doctor = 'Please select a doctor.';
    if (!selectedDate) newErrors.date = 'Please select a date.';
    if (!selectedTime) newErrors.time = 'Please select a time.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
        return;
    }

    const doctor = doctors.find(d => d.id === selectedDoctorId);
    if (!doctor) return; // Should not happen with validation

    const newAppointment: Appointment = {
      id: (appointments.length + 1).toString(),
      doctor,
      date: selectedDate,
      time: selectedTime,
      type: 'upcoming',
      reason: reasonForVisit.trim(),
    };
    setAppointments(prev => [newAppointment, ...prev]);
    setShowBookingForm(false);
    resetForm();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Appointments</h1>
        <button 
          onClick={handleToggleForm}
          className="bg-teal-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-teal-700 transition-colors"
        >
          {showBookingForm ? 'Cancel' : 'Book New'}
        </button>
      </div>

      {showBookingForm && (
        <div className="bg-white p-6 rounded-xl shadow-lg animate-fade-in-down">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Book a New Appointment</h2>
            <form noValidate onSubmit={handleBooking} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">Doctor</label>
                    <select 
                        id="doctor" 
                        value={selectedDoctorId}
                        onChange={e => setSelectedDoctorId(e.target.value)}
                        className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md ${errors.doctor ? 'border-red-500' : ''}`}
                    >
                        <option value="" disabled>Select a specialist</option>
                        {doctors.map(doc => <option key={doc.id} value={doc.id}>{doc.name} - {doc.specialty}</option>)}
                    </select>
                     {errors.doctor && <p className="text-red-600 text-xs mt-1">{errors.doctor}</p>}
                </div>
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                    <input 
                        type="date" 
                        id="date" 
                        value={selectedDate}
                        onChange={e => setSelectedDate(e.target.value)}
                        className={`mt-1 block w-full pl-3 pr-2 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md ${errors.date ? 'border-red-500' : ''}`} 
                    />
                    {errors.date && <p className="text-red-600 text-xs mt-1">{errors.date}</p>}
                </div>
                <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                    <input 
                        type="time" 
                        id="time" 
                        value={selectedTime}
                        onChange={e => setSelectedTime(e.target.value)}
                        className={`mt-1 block w-full pl-3 pr-2 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md ${errors.time ? 'border-red-500' : ''}`}
                    />
                    {errors.time && <p className="text-red-600 text-xs mt-1">{errors.time}</p>}
                </div>
                <div className="md:col-span-3">
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason for visit (optional)</label>
                    <textarea
                        id="reason"
                        rows={3}
                        value={reasonForVisit}
                        onChange={e => setReasonForVisit(e.target.value)}
                        className="mt-1 block w-full text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md shadow-sm"
                        placeholder="Briefly describe the reason for your appointment..."
                    ></textarea>
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