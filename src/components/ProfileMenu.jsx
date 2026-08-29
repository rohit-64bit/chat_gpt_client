import React from 'react';
import { Settings, LogOut, Check, Monitor, Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const ProfileMenu = ({ onClose, onOpenSettings, onOpenUpgrade }) => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="absolute bottom-16 left-3 w-64 bg-white dark:bg-[#2f2f2f] rounded-xl shadow-xl border border-gray-200 dark:border-[#424242] py-2 z-50 text-gray-900 dark:text-[#ececec] font-sans text-sm">
      <button 
        onClick={onOpenUpgrade}
        className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#424242] transition-colors font-medium text-emerald-600 dark:text-emerald-400"
      >
        <div className="flex items-center gap-3">
          <Sparkles size={16} />
          <span>Upgrade to Pro</span>
        </div>
      </button>

      <div className="h-px bg-gray-200 dark:bg-[#424242] my-2" />

      <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-[#b4b4b4]">
        Theme
      </div>
      
      <button 
        onClick={() => setTheme('system')}
        className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#424242] transition-colors"
      >
        <div className="flex items-center gap-3">
          <Monitor size={16} className="text-gray-500 dark:text-[#b4b4b4]" />
          <span>System</span>
        </div>
        {theme === 'system' && <Check size={16} />}
      </button>

      <button 
        onClick={() => setTheme('light')}
        className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#424242] transition-colors"
      >
        <div className="flex items-center gap-3">
          <Sun size={16} className="text-gray-500 dark:text-[#b4b4b4]" />
          <span>Light</span>
        </div>
        {theme === 'light' && <Check size={16} />}
      </button>

      <button 
        onClick={() => setTheme('dark')}
        className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#424242] transition-colors"
      >
        <div className="flex items-center gap-3">
          <Moon size={16} className="text-gray-500 dark:text-[#b4b4b4]" />
          <span>Dark</span>
        </div>
        {theme === 'dark' && <Check size={16} />}
      </button>

      <div className="h-px bg-gray-200 dark:bg-[#424242] my-2" />

      <button 
        onClick={onOpenSettings}
        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#424242] transition-colors"
      >
        <Settings size={16} className="text-gray-500 dark:text-[#b4b4b4]" />
        <span>Settings</span>
      </button>

      <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#424242] transition-colors text-red-600 dark:text-red-400">
        <LogOut size={16} />
        <span>Log out</span>
      </button>
    </div>
  );
};

export default ProfileMenu;
