import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Message, UserProfileData } from '../types';
import { runChat } from '../services/geminiService';
import MicrophoneIcon from './icons/MicrophoneIcon';

// Declare SpeechRecognition types for window object
declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

interface AiAssistantProps {
  userProfile: UserProfileData;
}

const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length === 1) return names[0][0]?.toUpperCase() || '';
    return (names[0][0] + (names[names.length - 1][0] || '')).toUpperCase();
}

const AiAssistant: React.FC<AiAssistantProps> = ({ userProfile }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial',
      text: "Hello! I'm **Aura**, your AI Health Assistant. How can I help you today?\n\nYou can ask me about:\n* Symptoms\n* Health conditions\n* General wellness advice",
      sender: 'ai'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  // Fix: Changed SpeechRecognition to 'any' to resolve the type error.
  const recognitionRef = useRef<any | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      recognitionRef.current?.abort();
    };
  }, []);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await runChat(input);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'ai',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };
  
  const handleToggleListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition. Please try using Chrome or Edge.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(prev => prev ? `${prev} ${transcript}` : transcript);
    };
    
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };


  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-gray-800">AI Health Assistant</h2>
      </div>
      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-end gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'ai' && (
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0">A</div>
            )}
            <div className={`max-w-md md:max-w-lg p-4 rounded-2xl shadow-sm text-sm ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
              {msg.sender === 'ai' ? (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                    ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-1 my-2" {...props} />,
                    ol: ({ node, ...props }) => <ol className="list-decimal list-inside space-y-1 my-2" {...props} />,
                    pre: ({ node, ...props }) => <pre className="bg-gray-800 text-white text-sm p-3 rounded-md my-2 overflow-x-auto" {...props} />,
                    code: ({ node, inline, ...props }) => (
                      <code className={`font-mono ${inline ? 'bg-gray-300 text-gray-800 rounded px-1.5 py-1 text-xs' : 'text-white'}`} {...props} />
                    ),
                    strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                  }}
                >
                  {msg.text}
                </ReactMarkdown>
              ) : (
                 <p className="whitespace-pre-wrap">{msg.text}</p>
              )}
            </div>
            {msg.sender === 'user' && (
               <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-600 flex-shrink-0">
                  {getInitials(userProfile.name)}
               </div>
            )}
          </div>
        ))}
         {isLoading && (
            <div className="flex items-end gap-3 justify-start">
               <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0">A</div>
               <div className="max-w-md md:max-w-lg p-4 rounded-2xl shadow-sm bg-gray-200 text-gray-800 rounded-bl-none">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                     <span>Aura is typing</span>
                     <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                     <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                     <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></div>
                  </div>
               </div>
            </div>
         )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t bg-gray-50">
        <div className="flex items-center bg-white border rounded-full shadow-sm px-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isListening ? 'Listening...' : "Type your message here..."}
            className="flex-1 p-3 bg-transparent focus:outline-none text-sm text-gray-700"
            disabled={isLoading}
          />
           <button
            onClick={handleToggleListening}
            disabled={isLoading}
            className={`p-2.5 rounded-full transition-colors disabled:opacity-50 ${
              isListening
                ? 'text-white bg-red-500 hover:bg-red-600 animate-pulse'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <MicrophoneIcon className="h-5 w-5" />
          </button>
          <button
            onClick={handleSend}
            disabled={isLoading || input.trim() === ''}
            className="bg-blue-600 text-white p-2.5 rounded-full hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors ml-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;