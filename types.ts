import type { View as OriginalView } from './types';

export type View = 'dashboard' | 'ai-assistant' | 'appointments' | 'health-records' | 'profile';

export interface UserProfileData {
  name: string;
  email: string;
  username: string;
}

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
  reason?: string;
}

export interface HealthRecord {
  id:string;
  type: string;
  date: string;
  details: string;
  status: 'Normal' | 'Action Required' | 'Stable';
}