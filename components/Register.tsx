import React, { useState } from 'react';
import EnvelopeIcon from './icons/EnvelopeIcon';
import LockIcon from './icons/LockIcon';
import UserIcon from './icons/UserIcon';
import EyeIcon from './icons/EyeIcon';
import EyeOffIcon from './icons/EyeOffIcon';
import HealthcareIllustration from './HealthcareIllustration';

interface RegisterProps {
    onRegister: () => void;
    onSwitchToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister, onSwitchToLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && email && password) {
            onRegister();
        }
    };

    return (
        <div className="min-h-screen bg-[#5cacee] flex items-center justify-center p-4 relative overflow-hidden">
            <HealthcareIllustration />
            <div className="relative z-10 w-full max-w-md p-8 space-y-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800">Create Your Account</h2>
                    <p className="mt-2 text-sm text-gray-600">Get started with your personal health journey.</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <UserIcon className="h-5 w-5 text-gray-400" />
                        </span>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
                            required
                        />
                    </div>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                        </span>
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
                            required
                        />
                    </div>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <LockIcon className="h-5 w-5 text-gray-400" />
                        </span>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-10 py-3 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? (
                                <EyeOffIcon className="h-5 w-5 text-gray-500" />
                            ) : (
                                <EyeIcon className="h-5 w-5 text-gray-500" />
                            )}
                        </button>
                    </div>
                    
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 shadow-md"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                
                <p className="text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <button onClick={onSwitchToLogin} className="font-medium text-blue-600 hover:text-blue-500 hover:underline">
                        Sign In
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Register;