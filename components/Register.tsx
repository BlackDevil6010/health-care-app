import React, { useState } from 'react';
import UserIcon from './icons/UserIcon';
import EnvelopeIcon from './icons/EnvelopeIcon';
import LockIcon from './icons/LockIcon';

interface RegisterProps {
  onRegister: () => void;
  onSwitchToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && password) {
      setError('');
      onRegister();
    } else {
      setError('Please fill in all fields.');
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center p-4 animate-fade-in-up">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Form Panel */}
        <div className="w-full md:w-7/12 p-8 sm:p-12 flex flex-col justify-center order-2 md:order-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Registration</h1>
          
          <form onSubmit={handleRegister} className="space-y-5 mt-6">
            <div className="relative">
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
                className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition"
                placeholder="Username"
              />
            </div>

            <div className="relative">
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
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition"
                  placeholder="Email"
                />
            </div>

            <div className="relative">
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
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition"
                  placeholder="Password"
                />
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition transform hover:-translate-y-0.5"
            >
              Register
            </button>
          </form>
        </div>

        {/* Decorative Panel */}
        <div className="w-full md:w-5/12 bg-blue-600 text-white p-12 flex flex-col justify-center items-center text-center order-1 md:order-2 animate-float">
          <h2 className="text-3xl font-bold mb-3">Welcome Back!</h2>
          <p className="mb-6 text-blue-200">Already have an account?</p>
          <button
            onClick={onSwitchToLogin}
            className="border-2 border-white rounded-full px-12 py-2 font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-300"
          >
            Login
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default Register;