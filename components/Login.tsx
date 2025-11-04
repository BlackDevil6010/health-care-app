import React, { useState } from 'react';
import EnvelopeIcon from './icons/EnvelopeIcon';
import LockIcon from './icons/LockIcon';
import EyeIcon from './icons/EyeIcon';
import EyeOffIcon from './icons/EyeOffIcon';
import HealthcareIllustration from './HealthcareIllustration';

interface LoginProps {
  onLogin: () => void;
  onSwitchToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onSwitchToRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('alex.doe@example.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setError('');
      onLogin();
    } else {
      setError('Please enter both email and password.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 pt-12 md:pt-0">Welcome Back</h1>
            <p className="text-gray-500 mt-2">Sign in to continue to your health dashboard.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
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
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition-shadow"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
            
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <div className="flex items-center justify-between">
                <a href="#" className="text-sm font-medium text-teal-600 hover:underline">
                    Forgot password?
                </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 transition-transform transform hover:scale-105"
            >
              Sign In
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button onClick={onSwitchToRegister} className="font-medium text-teal-600 hover:underline">
              Sign up
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

export default Login;