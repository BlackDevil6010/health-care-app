import React, { useState, useRef, useEffect } from 'react';
import type { Message } from '../types';
import { runChat } from '../services/geminiService';
import ChatIcon from './icons/ChatIcon';
import UserIcon from './icons/UserIcon';
import MicrophoneIcon from './icons/MicrophoneIcon';
import ShareIcon from './icons/ShareIcon';
import CheckIcon from './icons/CheckIcon';

const AIMessageBody: React.FC<{ text: string }> = ({ text }) => {
    let html = '';
    const lines = text.split('\n');
    let inList = false;

    const processLine = (line: string): string => {
        // Simple inline markdown for bold text
        return line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>');
    }

    lines.forEach(line => {
        // Handle list logic
        if (line.trim().startsWith('* ')) {
            if (!inList) {
                html += '<ul class="list-disc list-inside space-y-1 my-2 pl-4">';
                inList = true;
            }
            html += `<li>${processLine(line.trim().substring(2))}</li>`;
        } else {
            if (inList) {
                html += '</ul>';
                inList = false;
            }

            // Headings
            if (line.startsWith('### ')) {
                html += `<h3 class="text-md font-bold text-gray-800 mt-4 mb-2">${processLine(line.substring(4))}</h3>`;
            }
            // HR
            else if (line.trim() === '---') {
                html += '<hr class="my-3 border-gray-200" />';
            }
            // Blockquote
            else if (line.startsWith('> ')) {
                html += `<blockquote class="border-l-4 border-gray-300 pl-3 my-2 text-sm text-gray-500 italic">${processLine(line.substring(2))}</blockquote>`;
            }
            // Paragraph
            else if (line.trim() !== '') {
                html += `<p class="my-1">${processLine(line)}</p>`;
            }
        }
    });

    if (inList) {
        html += '</ul>';
    }

    return <div className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: html }} />;
}

const AiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial',
      text: "Hello! I'm Aura, your AI health assistant. How are you feeling today? Please describe your symptoms.",
      sender: 'ai',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const aiResponseText = await runChat(input);
    
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: aiResponseText,
      sender: 'ai',
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };
  
  const handleCopy = (text: string, id: string) => {
      navigator.clipboard.writeText(text).then(() => {
          setCopiedMessageId(id);
          setTimeout(() => setCopiedMessageId(null), 2000);
      });
  };

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">AI Health Assistant</h1>
      <div className="flex-1 bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          {messages.map((message) => (
            <div key={message.id} className={`flex items-start gap-4 ${message.sender === 'user' ? 'justify-end' : ''}`}>
              {message.sender === 'ai' && (
                <>
                    <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0">
                      <ChatIcon className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col items-start">
                        <div className="max-w-md p-4 rounded-2xl bg-gray-100 text-gray-800 rounded-tl-none">
                            <AIMessageBody text={message.text} />
                        </div>
                        <button
                            onClick={() => handleCopy(message.text, message.id)}
                            className="mt-2 flex items-center text-xs text-gray-500 hover:text-blue-600 transition"
                        >
                            {copiedMessageId === message.id ? (
                                <>
                                    <CheckIcon className="w-4 h-4 mr-1 text-green-500"/>
                                    <span>Copied!</span>
                                </>
                            ) : (
                                <>
                                    <ShareIcon className="w-4 h-4 mr-1"/>
                                    <span>Share</span>
                                </>
                            )}
                        </button>
                    </div>
                </>
              )}
              {message.sender === 'user' && (
                <>
                    <div className="max-w-md p-4 rounded-2xl bg-blue-600 text-white rounded-br-none">
                      <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{message.text}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                      <UserIcon className="w-6 h-6 text-gray-600" />
                    </div>
                </>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-4">
               <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0">
                  <ChatIcon className="w-6 h-6" />
                </div>
               <div className="max-w-md p-4 rounded-2xl bg-gray-100 text-gray-800 rounded-tl-none">
                  <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <form onSubmit={handleSend} className="flex items-center space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your symptoms..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
            <button
                type="button"
                className="p-3 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full transition"
                aria-label="Use microphone"
                >
                <MicrophoneIcon className="w-6 h-6" />
            </button>
            <button
              type="submit"
              disabled={isLoading || input.trim() === ''}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;