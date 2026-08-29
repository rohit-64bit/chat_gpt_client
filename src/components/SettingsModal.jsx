import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const SettingsModal = ({ isOpen, onClose }) => {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('General');

  if (!isOpen) return null;

  const tabs = ['General', 'Personalization', 'Data controls'];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'General':
        return (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Theme</span>
              <select 
                value={theme} 
                onChange={(e) => setTheme(e.target.value)}
                className="bg-white dark:bg-[#2f2f2f] border border-gray-200 dark:border-[#424242] rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="system">System</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            
            <div className="h-px bg-gray-200 dark:bg-[#424242]" />
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Always show code when using data analyst</span>
              <div className="w-10 h-6 bg-gray-200 dark:bg-[#424242] rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform" />
              </div>
            </div>

            <div className="h-px bg-gray-200 dark:bg-[#424242]" />
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Language</span>
              <select className="bg-white dark:bg-[#2f2f2f] border border-gray-200 dark:border-[#424242] rounded-md px-3 py-1.5 text-sm focus:outline-none">
                <option>Auto-detect</option>
                <option>English</option>
              </select>
            </div>
          </div>
        );
      case 'Personalization':
        return (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Custom instructions</span>
                <span className="text-xs text-gray-500 dark:text-[#b4b4b4]">Customize how ChatGPT responds to you</span>
              </div>
              <div className="w-10 h-6 bg-blue-500 rounded-full relative cursor-pointer">
                <div className="absolute left-5 top-1 w-4 h-4 bg-white rounded-full transition-transform" />
              </div>
            </div>
            <div className="h-px bg-gray-200 dark:bg-[#424242]" />
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Memory</span>
                <span className="text-xs text-gray-500 dark:text-[#b4b4b4]">ChatGPT will become more helpful as it remembers details and preferences from your chats.</span>
              </div>
              <button className="px-4 py-2 bg-gray-100 dark:bg-[#424242] hover:bg-gray-200 dark:hover:bg-[#525252] rounded-md text-sm transition-colors">
                Manage
              </button>
            </div>
          </div>
        );
      case 'Data controls':
        return (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Chat history & training</span>
                <span className="text-xs text-gray-500 dark:text-[#b4b4b4]">Save new chats on this browser to your history and allow them to be used to improve our models.</span>
              </div>
              <div className="w-10 h-6 bg-blue-500 rounded-full relative cursor-pointer">
                <div className="absolute left-5 top-1 w-4 h-4 bg-white rounded-full transition-transform" />
              </div>
            </div>
            <div className="h-px bg-gray-200 dark:bg-[#424242]" />
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Shared links</span>
              <button className="px-4 py-2 border border-gray-200 dark:border-[#424242] hover:bg-gray-50 dark:hover:bg-[#2f2f2f] rounded-md text-sm transition-colors">
                Manage
              </button>
            </div>
            <div className="h-px bg-gray-200 dark:bg-[#424242]" />
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Export data</span>
              <button className="px-4 py-2 border border-gray-200 dark:border-[#424242] hover:bg-gray-50 dark:hover:bg-[#2f2f2f] rounded-md text-sm transition-colors">
                Export
              </button>
            </div>
            <div className="h-px bg-gray-200 dark:bg-[#424242]" />
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-red-600 dark:text-red-400">Delete account</span>
              <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm transition-colors">
                Delete
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50 dark:bg-black/60 transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-[680px] h-[80vh] max-h-[600px] bg-white dark:bg-[#212121] rounded-2xl shadow-2xl flex flex-col sm:flex-row overflow-hidden text-gray-900 dark:text-[#ececec] font-sans">
        
        <div className="w-full sm:w-[240px] bg-gray-50 dark:bg-[#171717] p-4 flex flex-col gap-1 border-r border-gray-200 dark:border-[#424242]">
          <h2 className="text-lg font-semibold mb-4 px-2">Settings</h2>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab 
                  ? 'bg-gray-200 dark:bg-[#424242] text-gray-900 dark:text-white' 
                  : 'text-gray-600 dark:text-[#b4b4b4] hover:bg-gray-200/50 dark:hover:bg-[#2f2f2f]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex-1 flex flex-col p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-8 sm:hidden">
            <h2 className="text-lg font-semibold">{activeTab}</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-[#2f2f2f] rounded-full transition-colors text-gray-500 dark:text-[#b4b4b4]">
              <X size={20} />
            </button>
          </div>
          
          <div className="hidden sm:flex items-center justify-end mb-2">
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-[#2f2f2f] rounded-full transition-colors text-gray-500 dark:text-[#b4b4b4]">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
