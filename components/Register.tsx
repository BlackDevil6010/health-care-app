import React, { useState } from 'react';
import UserIcon from './icons/UserIcon';
import EnvelopeIcon from './icons/EnvelopeIcon';
import LockIcon from './icons/LockIcon';
import HealthcareIllustration from './HealthcareIllustration';

interface RegisterProps {
  onRegister: () => void;
  onSwitchToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && username && email && password) {
      setError('');
      onRegister();
    } else {
      setError('Please fill in all fields.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row-reverse bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 pt-12 md:pt-0">Create Your Account</h1>
            <p className="text-gray-500 mt-2">Get started with your personalized health journey.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="relative">
              <label htmlFor="name" className="sr-only">Full Name</label>
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </span>
              <input
                id="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition-shadow"
                placeholder="Full Name"
              />
            </div>

            <div className="relative">
              <label htmlFor="username" className="sr-only">Username</label>
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </span>
              <input
                id="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition-shadow"
                placeholder="Username"
              />
            </div>

            <div className="relative">
              <label htmlFor="email" className="sr-only">Email</label>
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
              </span>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition-shadow"
                placeholder="Email address"
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="sr-only">Password</label>
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockIcon className="h-5 w-5 text-gray-400" />
              </span>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition-shadow"
                placeholder="Password"
              />
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 px-4 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 transition-transform transform hover:scale-105"
            >
              Create Account
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <button onClick={onSwitchToLogin} className="font-medium text-teal-600 hover:underline">
              Sign in
            </button>
          </p>
        </div>

        {/* Right Side - Illustration */}
        <div className="hidden md:flex w-1/2 bg-teal-500 items-center justify-center p-8">
            <HealthcareIllustration className="w-full h-auto max-w-sm" />
        </div>
      </div>
    </div>
  );
};

export default Register;