
export type View = 'dashboard' | 'ai-assistant' | 'appointments' | 'health-records';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
}

export interface Appointment {
  id: string;
  doctor: Doctor;
  date: string;
  time: string;
  type: 'upcoming' | 'past';
}

export interface HealthRecord {
  id: string;
  type: string;
  date: string;
  details: string;
  status: 'Normal' | 'Action Required' | 'Stable';
}
