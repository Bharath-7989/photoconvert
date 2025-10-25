import React, { useState, useRef, useEffect } from 'react';
import { getChatResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Spinner } from './Spinner';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [thinkingDots, setThinkingDots] = useState<string>('.');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined;
    if (isLoading) {
      intervalId = setInterval(() => {
        setThinkingDots((dots) => {
          if (dots.length >= 3) return '.';
          return dots + '.';
        });
      }, 400);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
      setThinkingDots('.'); // Reset
    };
  }, [isLoading]);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      role: 'user',
      text: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const prompt = messages.map(msg => `${msg.role}: ${msg.text}`).join('\n') + `\nuser: ${input}`;
      const responseText = await getChatResponse(prompt);
      const modelMessage: ChatMessage = {
        id: Date.now() + 1,
        role: 'model',
        text: responseText,
      };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: Date.now() + 1,
        role: 'model',
        text: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const MessageBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
    const isModel = message.role === 'model';
    return (
      <div className={`flex ${isModel ? 'justify-start' : 'justify-end'}`}>
        <div
          className={`max-w-md lg:max-w-2xl px-4 py-3 rounded-2xl ${
            isModel
              ? 'bg-base-300 text-gray-200 rounded-bl-none'
              : 'bg-brand-primary text-white rounded-br-none'
          }`}
        >
          <p className="whitespace-pre-wrap">{message.text}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-[70vh] max-w-4xl mx-auto bg-base-200 rounded-lg shadow-xl">
      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        {messages.length === 0 && (
          <div className="text-center text-gray-400">
            <p>Ask me anything!</p>
            <p className="text-sm">For example: "What are some tips for a good headshot?"</p>
          </div>
        )}
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-base-300 text-gray-200 rounded-2xl rounded-bl-none px-4 py-3 inline-flex items-center gap-2">
                <Spinner className="w-5 h-5" />
                <span style={{ minWidth: '75px', textAlign: 'left' }}>Thinking{thinkingDots}</span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-base-300">
        <form onSubmit={handleSendMessage} className="flex items-center gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 w-full bg-base-300 border border-base-100 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-brand-primary text-white rounded-lg p-2 disabled:bg-base-300 disabled:cursor-not-allowed transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;