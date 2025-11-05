import React, { useState } from 'react';
import GoogleIcon from './icons/GoogleIcon';
import FacebookIcon from './icons/FacebookIcon';
import GithubIcon from './icons/GithubIcon';
import LinkedinIcon from './icons/LinkedinIcon';
import UserIcon from './icons/UserIcon';
import LockIcon from './icons/LockIcon';


interface LoginProps {
  onLogin: () => void;
  onSwitchToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onSwitchToRegister }) => {
  const [username, setUsername] = useState('alexdoe');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      setError('');
      onLogin();
    } else {
      setError('Please enter both username and password.');
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center p-4 animate-fade-in-up">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Decorative Panel */}
        <div className="w-full md:w-5/12 bg-blue-600 text-white p-12 flex flex-col justify-center items-center text-center animate-float">
          <h2 className="text-3xl font-bold mb-3">Hello, Welcome!</h2>
          <p className="mb-6 text-blue-200">Don't have an account?</p>
          <button
            onClick={onSwitchToRegister}
            className="border-2 border-white rounded-full px-10 py-2 font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-300"
          >
            Register
          </button>
        </div>

        {/* Form Panel */}
        <div className="w-full md:w-7/12 p-8 sm:p-12 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Login</h1>
          
          <form onSubmit={handleLogin} className="space-y-5 mt-6">
            <div className="relative">
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
                className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition"
                placeholder="Username"
              />
            </div>

            <div className="relative">
               <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockIcon className="h-5 w-5 text-gray-400" />
              </span>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition"
                placeholder="Password"
              />
            </div>
            
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <div className="text-right">
                <button type="button" className="text-sm font-medium text-blue-600 hover:underline">
                    Forgot password?
                </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition transform hover:-translate-y-0.5"
            >
              Login
            </button>
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-400 text-sm">or login with social platforms</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          
          <div className="flex justify-center gap-4">
              <SocialButton icon={<GoogleIcon className="h-5 w-5" />} />
              <SocialButton icon={<FacebookIcon className="h-5 w-5" />} />
              <SocialButton icon={<GithubIcon className="h-5 w-5" />} />
              <SocialButton icon={<LinkedinIcon className="h-5 w-5" />} />
          </div>
        </div>
      </div>
    </div>
  );
};

const SocialButton: React.FC<{ icon: React.ReactNode }> = ({ icon }) => (
  <button className="h-10 w-10 flex items-center justify-center border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100 hover:border-blue-500 hover:text-blue-600 transition">
    {icon}
  </button>
);

export default Login;