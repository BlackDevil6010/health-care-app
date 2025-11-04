
import type { Doctor, Appointment, HealthRecord } from './types';

export const doctors: Doctor[] = [
  { id: '1', name: 'Dr. Evelyn Reed', specialty: 'Cardiologist', avatar: 'https://picsum.photos/id/1005/200/200' },
  { id: '2', name: 'Dr. Marcus Chen', specialty: 'Neurologist', avatar: 'https://picsum.photos/id/1011/200/200' },
  { id: '3', name: 'Dr. Sofia Garcia', specialty: 'Pediatrician', avatar: 'https://picsum.photos/id/1027/200/200' },
];

export const appointments: Appointment[] = [
  {
    id: '1',
    doctor: doctors[0],
    date: '2024-08-15',
    time: '10:30 AM',
    type: 'upcoming',
    reason: 'Annual check-up and follow-up on recent blood work.',
  },
  {
    id: '2',
    doctor: doctors[2],
    date: '2024-07-20',
    time: '02:00 PM',
    type: 'past',
    reason: 'Follow-up regarding allergy symptoms.',
  },
   {
    id: '3',
    doctor: doctors[1],
    date: '2024-06-11',
    time: '09:00 AM',
    type: 'past',
  },
];

export const healthRecords: HealthRecord[] = [
    { id: '1', type: 'Blood Pressure', date: '2024-07-28', details: '120/80 mmHg', status: 'Normal' },
    { id: '2', type: 'Cholesterol Test', date: '2024-07-15', details: 'Total: 190 mg/dL', status: 'Normal' },
    { id: '3', type: 'Allergy Test', date: '2024-05-02', details: 'Positive for pollen', status: 'Stable' },
    { id: '4', type: 'X-Ray (Right Arm)', date: '2024-03-10', details: 'No fractures found', status: 'Normal' },
];