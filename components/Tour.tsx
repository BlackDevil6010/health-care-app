import React, { useState } from 'react';
import HomeIcon from './icons/HomeIcon';
import ChatIcon from './icons/ChatIcon';
import CalendarIcon from './icons/CalendarIcon';
import FileTextIcon from './icons/FileTextIcon';
import UserCircleIcon from './icons/UserCircleIcon';

interface TourProps {
    onComplete: () => void;
}

const tourSteps = [
    {
        title: 'Welcome to Your Health Dashboard!',
        content: 'This is your central hub for managing your health. Let\'s take a quick tour of the key features.',
        icon: HomeIcon,
        targetId: 'tour-step-1'
    },
    {
        title: 'AI Health Assistant',
        content: 'Have a health question? Use our AI assistant "Aura" to check your symptoms and get quick, helpful information.',
        icon: ChatIcon,
        targetId: 'tour-step-2'
    },
    {
        title: 'Manage Appointments',
        content: 'View your upcoming and past appointments, and schedule new ones with ease.',
        icon: CalendarIcon,
        targetId: 'tour-step-3'
    },
    {
        title: 'Access Health Records',
        content: 'Securely access all your medical records, test results, and reports in one place.',
        icon: FileTextIcon,
        targetId: 'tour-step-4'
    },
    {
        title: 'Your Profile',
        content: 'Keep your personal information up to date here.',
        icon: UserCircleIcon,
        targetId: 'tour-step-5'
    },
];

const Tour: React.FC<TourProps> = ({ onComplete }) => {
    const [step, setStep] = useState(0);
    const currentStep = tourSteps[step];

    const handleNext = () => {
        if (step < tourSteps.length - 1) {
            setStep(step + 1);
        } else {
            onComplete();
        }
    };

    const handleSkip = () => {
        onComplete();
    };

    if (!currentStep) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 animate-fade-in-up" style={{ animationDuration: '0.3s' }}>
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm text-center">
                <div className="w-16 h-16 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                    <currentStep.icon className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentStep.title}</h2>
                <p className="text-gray-600 mb-6">{currentStep.content}</p>

                <div className="flex justify-center items-center mb-6 space-x-2">
                    {tourSteps.map((_, index) => (
                        <div key={index} className={`w-2 h-2 rounded-full transition-colors ${index === step ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                    ))}
                </div>

                <div className="space-y-3">
                     <button
                        onClick={handleNext}
                        className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
                    >
                        {step === tourSteps.length - 1 ? 'Finish Tour' : 'Next'}
                    </button>
                    <button
                        onClick={handleSkip}
                        className="w-full text-sm text-gray-500 hover:text-gray-700 font-medium py-2"
                    >
                        Skip Tour
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Tour;
