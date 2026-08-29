import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  PanelLeftClose, 
  SquarePen, 
  Library, 
  FolderOpen, 
  Clock, 
  Puzzle, 
  Code, 
  MoreHorizontal,
  FolderPlus,
  ChevronRight,
  ChevronDown,
  Folder as FolderIcon,
  X
} from 'lucide-react';
import { createPortal } from 'react-dom';
import ProfileMenu from './ProfileMenu';
import UpgradeModal from './UpgradeModal';

const Sidebar = ({ onOpenSettings, toggleSidebar, activeChatId, onSelectChat, onNewChat, refreshKey, activeTab, isOpen, isMobile }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [recentChats, setRecentChats] = useState([]);
  const [folders, setFolders] = useState([]);
  const [expandedFolders, setExpandedFolders] = useState({});
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isProUser, setIsProUser] = useState(false); // Local state for Pro status

  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/api/chats')
      .then(res => res.json())
      .then(data => setRecentChats(data))
      .catch(err => console.error('Failed to fetch chats:', err));

    if (activeTab === 'work') {
      fetch('http://localhost:3001/api/folders')
        .then(res => res.json())
        .then(data => setFolders(data))
        .catch(err => console.error('Failed to fetch folders:', err));
    }
  }, [refreshKey, activeTab]);

  const toggleFolder = (folderId) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  };

  const handleCreateFolder = async (e) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;
    
    try {
      const res = await fetch('http://localhost:3001/api/folders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newFolderName.trim() })
      });
      const data = await res.json();
      setFolders(prev => [data, ...prev]);
      setIsCreatingFolder(false);
      setNewFolderName('');
    } catch (err) {
      console.error('Failed to create folder:', err);
    }
  };

  const menuItems = [
    { icon: <Library size={18} />, label: 'Library' },
    { icon: <FolderOpen size={18} />, label: 'Projects' },
    { icon: <Clock size={18} />, label: 'Scheduled' },
    { icon: <Puzzle size={18} />, label: 'Plugins' },
    { icon: <Code size={18} />, label: 'Codex' },
    { icon: <MoreHorizontal size={18} />, label: 'More' },
  ];

  return (
    <div className={`w-[260px] h-screen flex-shrink-0 bg-gray-50 dark:bg-[#171717] text-gray-900 dark:text-[#ececec] flex flex-col font-sans text-sm transition-all duration-300 z-50 ${isMobile ? 'absolute top-0 left-0 shadow-2xl' : 'relative'} ${isOpen ? 'translate-x-0' : '-translate-x-full absolute'}`}>
      <div className="flex items-center justify-between p-3 h-14">
        {isSearching ? (
          <div className="flex items-center gap-2 px-2 w-full bg-gray-200 dark:bg-[#2f2f2f] rounded-lg py-1.5">
            <Search size={16} className="text-gray-500 shrink-0" />
            <input 
              autoFocus
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chats..."
              className="w-full bg-transparent border-none outline-none text-sm text-gray-900 dark:text-[#ececec]"
            />
            <button 
              onClick={() => { setIsSearching(false); setSearchQuery(''); }} 
              className="p-1 hover:bg-gray-300 dark:hover:bg-[#424242] rounded-md transition-colors text-gray-500 shrink-0"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 px-2">
              <span className="font-semibold text-base">ChatGPT</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500 dark:text-[#b4b4b4]">
              <button 
                onClick={() => setIsSearching(true)}
                className="p-2 hover:bg-gray-200 dark:hover:bg-[#212121] rounded-md transition-colors"
              >
                <Search size={18} />
              </button>
              <button 
                onClick={toggleSidebar}
                className="p-2 hover:bg-gray-200 dark:hover:bg-[#212121] rounded-md transition-colors"
              >
                <PanelLeftClose size={18} />
              </button>
            </div>
          </>
        )}
      </div>

      <div className="px-3 pb-3">
        <button 
          onClick={onNewChat}
          className="w-full flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#212121] hover:bg-gray-100 dark:hover:bg-[#2f2f2f] rounded-lg transition-colors font-medium border border-gray-200 dark:border-transparent"
        >
          <SquarePen size={18} />
          New chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3">
        {searchQuery.trim() !== '' ? (
          <div className="flex flex-col">
            <span className="px-3 text-xs font-semibold text-gray-500 dark:text-[#b4b4b4] mb-2 mt-2">Search Results</span>
            {recentChats.filter(chat => chat.title.toLowerCase().includes(searchQuery.toLowerCase())).length > 0 ? (
              recentChats.filter(chat => chat.title.toLowerCase().includes(searchQuery.toLowerCase())).map((chat) => (
                <button 
                  key={chat._id} 
                  onClick={() => onSelectChat(chat._id)}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors text-gray-900 dark:text-[#ececec] w-full text-left truncate ${
                    activeChatId === chat._id ? 'bg-gray-200 dark:bg-[#424242]' : 'hover:bg-gray-200 dark:hover:bg-[#212121]'
                  }`}
                >
                  <span className="truncate">{chat.title}</span>
                </button>
              ))
            ) : (
              <div className="px-3 py-4 text-center text-gray-500 dark:text-[#b4b4b4] text-xs">
                No chats found for "{searchQuery}"
              </div>
            )}
          </div>
        ) : activeTab === 'chat' ? (
          <>
            <div className="flex flex-col gap-1 mb-6">
              {menuItems.map((item, index) => (
                <button key={index} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#212121] transition-colors text-gray-900 dark:text-[#ececec] w-full text-left font-medium">
                  <span className="text-gray-500 dark:text-[#b4b4b4]">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex flex-col">
              <span className="px-3 text-xs font-semibold text-gray-500 dark:text-[#b4b4b4] mb-2">Recents</span>
              {recentChats.map((chat) => (
                <button 
                  key={chat._id} 
                  onClick={() => onSelectChat(chat._id)}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors text-gray-900 dark:text-[#ececec] w-full text-left truncate ${
                    activeChatId === chat._id ? 'bg-gray-200 dark:bg-[#424242]' : 'hover:bg-gray-200 dark:hover:bg-[#212121]'
                  }`}
                >
                  <span className="truncate">{chat.title}</span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col">
            <div className="flex items-center justify-between px-3 mb-2">
              <span className="text-xs font-semibold text-gray-500 dark:text-[#b4b4b4]">Work Folders</span>
              <button 
                onClick={() => setIsCreatingFolder(true)}
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                title="New Folder"
              >
                <FolderPlus size={16} />
              </button>
            </div>
            
            {isCreatingFolder && (
              <form onSubmit={handleCreateFolder} className="px-3 py-2 mb-2">
                <input
                  autoFocus
                  type="text"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  onBlur={() => setIsCreatingFolder(false)}
                  placeholder="Folder name..."
                  className="w-full bg-white dark:bg-[#212121] border border-gray-300 dark:border-[#424242] rounded-md px-2 py-1 text-sm outline-none focus:border-blue-500 transition-colors"
                />
              </form>
            )}

            {folders.length === 0 && !isCreatingFolder && (
              <div className="px-3 py-4 text-center text-gray-500 dark:text-[#b4b4b4] text-xs">
                No folders yet. Create one to organize your work.
              </div>
            )}

            {folders.map(folder => (
              <div key={folder._id} className="flex flex-col mb-1">
                <div className="flex items-center group px-1">
                  <button 
                    onClick={() => toggleFolder(folder._id)}
                    className="flex-1 flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#212121] transition-colors text-gray-900 dark:text-[#ececec] text-left font-medium"
                  >
                    <span className="text-gray-500">
                      {expandedFolders[folder._id] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </span>
                    <FolderIcon size={16} className="text-blue-500" />
                    <span className="truncate">{folder.name}</span>
                  </button>
                  <button
                    onClick={async (e) => {
                      e.stopPropagation();
                      try {
                        const res = await fetch('http://localhost:3001/api/chats', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ folderId: folder._id })
                        });
                        const newChat = await res.json();
                        setRecentChats(prev => [newChat, ...prev]);
                        onSelectChat(newChat._id);
                        setExpandedFolders(prev => ({ ...prev, [folder._id]: true }));
                      } catch (err) {
                        console.error('Failed to create chat in folder:', err);
                      }
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-[#2f2f2f] rounded-md transition-all"
                    title="New chat in folder"
                  >
                    <FolderPlus size={14} />
                  </button>
                </div>
                {expandedFolders[folder._id] && (
                  <div className="pl-9 pr-3 py-1 flex flex-col gap-1">
                    {recentChats.filter(c => c.folderId === folder._id).length > 0 ? (
                      recentChats.filter(c => c.folderId === folder._id).map(chat => (
                        <button 
                          key={chat._id} 
                          onClick={() => onSelectChat(chat._id)}
                          className={`flex items-center px-3 py-1.5 rounded-lg transition-colors text-gray-900 dark:text-[#ececec] w-full text-left truncate text-xs ${
                            activeChatId === chat._id ? 'bg-gray-200 dark:bg-[#424242]' : 'hover:bg-gray-200 dark:hover:bg-[#212121]'
                          }`}
                        >
                          <span className="truncate">{chat.title}</span>
                        </button>
                      ))
                    ) : (
                      <span className="text-xs text-gray-500 px-3 py-1">Empty folder</span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-3 relative" ref={profileRef}>
        {isProfileMenuOpen && (
          <ProfileMenu 
            onClose={() => setIsProfileMenuOpen(false)} 
            onOpenSettings={() => {
              setIsProfileMenuOpen(false);
              onOpenSettings();
            }}
            onOpenUpgrade={() => {
              setIsProfileMenuOpen(false);
              setIsUpgradeModalOpen(true);
            }}
          />
        )}
        <button 
          onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          className="flex items-center gap-3 px-3 py-2 w-full hover:bg-gray-200 dark:hover:bg-[#212121] rounded-lg transition-colors"
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white ${isProUser ? 'bg-[#10a37f]' : 'bg-gray-400 dark:bg-[#424242]'}`}>
            JD
          </div>
          <div className="flex-1 text-left flex flex-col">
            <span className="text-sm font-medium leading-tight">John Doe</span>
            <span className="text-xs text-gray-500 dark:text-[#b4b4b4] leading-tight">
              {isProUser ? 'Pro Plan' : 'Free Plan'}
            </span>
          </div>
          <MoreHorizontal size={18} className="text-gray-500 dark:text-[#b4b4b4]" />
        </button>
      </div>

      {isUpgradeModalOpen && createPortal(
        <UpgradeModal 
          isOpen={isUpgradeModalOpen} 
          onClose={() => setIsUpgradeModalOpen(false)} 
          onUpgradeSuccess={() => setIsProUser(true)}
        />,
        document.body
      )}
    </div>
  );
};

export default Sidebar;