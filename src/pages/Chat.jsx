import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import MainChatArea from '../components/MainChatArea';
import SettingsModal from '../components/SettingsModal';

const Chat = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeChatId, setActiveChatId] = useState(null);
  const [chatsRefreshKey, setChatsRefreshKey] = useState(0); 
  const [activeTab, setActiveTab] = useState('chat'); 

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChatCreated = (newChatId) => {
    setActiveChatId(newChatId);
    setChatsRefreshKey(prev => prev + 1);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white dark:bg-[#212121] transition-colors duration-200 relative">
      
      {/* Mobile Backdrop */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - unconditionally rendered, visibility managed by CSS transform in Sidebar.jsx for mobile */}
      <Sidebar 
        onOpenSettings={() => setIsSettingsOpen(true)} 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        activeChatId={activeChatId}
        onSelectChat={(id) => {
          setActiveChatId(id);
          if (isMobile) setIsSidebarOpen(false);
        }}
        onNewChat={() => {
          setActiveChatId(null);
          if (isMobile) setIsSidebarOpen(false);
        }}
        refreshKey={chatsRefreshKey}
        activeTab={activeTab}
        isOpen={isSidebarOpen}
        isMobile={isMobile}
      />
      
      <MainChatArea 
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        activeChatId={activeChatId}
        onChatCreated={handleChatCreated}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
};

export default Chat;