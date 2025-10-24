
import React, { useState } from 'react';
import HeadshotGenerator from './components/HeadshotGenerator';
import Chatbot from './components/Chatbot';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { ChatBubbleIcon } from './components/icons/ChatBubbleIcon';

type Tab = 'generator' | 'chatbot';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('generator');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'generator':
        return <HeadshotGenerator />;
      case 'chatbot':
        return <Chatbot />;
      default:
        return null;
    }
  };

  const TabButton: React.FC<{
    tabName: Tab;
    label: string;
    icon: React.ReactNode;
  }> = ({ tabName, label, icon }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
        activeTab === tabName
          ? 'bg-brand-primary text-white'
          : 'text-gray-300 hover:bg-base-300 hover:text-white'
      }`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-base-100 font-sans">
      <header className="bg-base-200/50 backdrop-blur-sm border-b border-base-300 sticky top-0 z-10">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
          <div className="flex items-center gap-3">
             <SparklesIcon className="w-8 h-8 text-brand-primary" />
            <h1 className="text-xl font-bold text-white">AI Headshot Photographer</h1>
          </div>
          <div className="flex items-center gap-2 p-1 bg-base-300 rounded-lg">
            <TabButton tabName="generator" label="Headshot AI" icon={<SparklesIcon className="w-5 h-5" />} />
            <TabButton tabName="chatbot" label="Chatbot" icon={<ChatBubbleIcon className="w-5 h-5" />} />
          </div>
        </nav>
      </header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="animate-fade-in">
          {renderTabContent()}
        </div>
      </main>
      <footer className="text-center py-4 mt-8 text-sm text-gray-500">
        <p>Powered by Gemini AI</p>
      </footer>
    </div>
  );
};

export default App;
