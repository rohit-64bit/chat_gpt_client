import React, { useState, useEffect, useRef, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  Plus, 
  Brain, 
  Mic, 
  AudioLines,
  Image as ImageIcon, 
  PenLine, 
  Globe,
  CircleDashed,
  PanelLeft,
  Send,
  Copy,
  Check
} from 'lucide-react';

const MainChatArea = ({ isSidebarOpen, toggleSidebar, activeChatId, onChatCreated, activeTab, setActiveTab }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    if (hour < 21) return 'Good evening';
    return 'Good night';
  }, []);

  const quote = useMemo(() => {
    const quotes = [
      "First, solve the problem. Then, write the code.",
      "Make it work, make it right, make it fast.",
      "Every great developer you know got there by solving problems they were unqualified to solve until they actually did it.",
      "The only way to do great work is to love what you do.",
      "Code is like humor. When you have to explain it, it’s bad.",
      "Small daily improvements over time lead to stunning results."
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  }, []);

  const handleCopy = (id, content) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  useEffect(() => {
    if (activeChatId) {
      fetch(`http://localhost:3001/api/chats/${activeChatId}/messages`)
        .then(res => res.json())
        .then(data => setMessages(data))
        .catch(err => console.error('Failed to fetch messages:', err));
    } else {
      setMessages([]);
    }
  }, [activeChatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setIsLoading(true);

    // Optimistically add user message
    setMessages(prev => [...prev, { role: 'user', content: userMsg, _id: Date.now().toString() }]);

    let targetChatId = activeChatId;

    try {
      if (!targetChatId) {
        const chatRes = await fetch('http://localhost:3001/api/chats', { method: 'POST' });
        const chatData = await chatRes.json();
        targetChatId = chatData._id;
        onChatCreated(targetChatId);
      }

      const msgRes = await fetch(`http://localhost:3001/api/chats/${targetChatId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: userMsg })
      });
      
      const msgData = await msgRes.json();
      
      if (!msgRes.ok) {
        throw new Error(msgData.error || 'Failed to send message');
      }
      
      // Update with real messages from server
      setMessages(prev => {
        const filtered = prev.filter(m => m._id !== Date.now().toString()); // remove optimistic
        if (msgData.aiMessage) {
          return [...filtered, msgData.aiMessage];
        }
        return filtered;
      });

    } catch (err) {
      console.error('Failed to send message:', err);
      // Remove optimistic user message on failure
      setMessages(prev => prev.filter(m => m._id !== Date.now().toString()));
      alert('Error: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-white dark:bg-[#212121] h-screen flex flex-col relative text-gray-900 dark:text-[#ececec] font-sans transition-colors duration-200">
      <div className="absolute top-0 w-full p-4 flex justify-between items-center z-10 bg-white/80 dark:bg-[#212121]/80 backdrop-blur-md">
        <div className="flex-1 flex items-center gap-2">
          {!isSidebarOpen && (
            <button 
              onClick={toggleSidebar}
              className="p-2 hover:bg-gray-100 dark:hover:bg-[#2f2f2f] rounded-md transition-colors text-gray-500 dark:text-[#b4b4b4]"
            >
              <PanelLeft size={18} />
            </button>
          )}
        </div>
        <div className="flex bg-gray-100 dark:bg-[#171717] rounded-full p-1 border border-gray-200 dark:border-transparent">
          <button 
            onClick={() => setActiveTab('chat')}
            className={`px-6 py-1.5 text-sm font-medium rounded-full transition-colors ${
              activeTab === 'chat' 
                ? 'bg-white dark:bg-[#2f2f2f] text-gray-900 dark:text-white shadow-sm dark:shadow-none' 
                : 'text-gray-500 dark:text-[#b4b4b4] hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Chat
          </button>
          <button 
            onClick={() => setActiveTab('work')}
            className={`px-6 py-1.5 text-sm font-medium transition-colors flex items-center gap-1 rounded-full ${
              activeTab === 'work'
                ? 'bg-white dark:bg-[#2f2f2f] text-gray-900 dark:text-white shadow-sm dark:shadow-none' 
                : 'text-gray-500 dark:text-[#b4b4b4] hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <span className="text-blue-500 dark:text-blue-400">✦</span> Work
          </button>
        </div>
        <div className="flex-1 flex justify-end">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-[#2f2f2f] rounded-full transition-colors text-gray-500 dark:text-[#b4b4b4]">
            <CircleDashed size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pt-20 pb-4 px-4 flex flex-col items-center">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center w-full max-w-3xl text-center px-4">
            <h1 className="text-3xl font-semibold mb-2 tracking-tight">
              {greeting}, Someone!
            </h1>
            <p className="text-gray-500 dark:text-[#b4b4b4] text-sm font-medium mb-8 max-w-md">
              "{quote}"
            </p>
            
            <div className="flex flex-col md:flex-row items-center gap-3 mt-2 flex-wrap justify-center w-full">
              <button className="w-full md:w-auto flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#212121] border border-gray-200 dark:border-[#424242] hover:bg-gray-50 dark:hover:bg-[#2f2f2f] rounded-full transition-colors text-sm font-medium text-gray-700 dark:text-[#ececec]">
                <ImageIcon size={16} className="text-gray-400 dark:text-[#b4b4b4] shrink-0" />
                <span className="truncate">Create an image or sticker</span>
              </button>
              <button className="w-full md:w-auto flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#212121] border border-gray-200 dark:border-[#424242] hover:bg-gray-50 dark:hover:bg-[#2f2f2f] rounded-full transition-colors text-sm font-medium text-gray-700 dark:text-[#ececec]">
                <PenLine size={16} className="text-gray-400 dark:text-[#b4b4b4] shrink-0" />
                <span className="truncate">Write or edit</span>
              </button>
              <button className="w-full md:w-auto flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#212121] border border-gray-200 dark:border-[#424242] hover:bg-gray-50 dark:hover:bg-[#2f2f2f] rounded-full transition-colors text-sm font-medium text-gray-700 dark:text-[#ececec]">
                <Globe size={16} className="text-gray-400 dark:text-[#b4b4b4] shrink-0" />
                <span className="truncate">Search the web</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-3xl flex flex-col gap-6">
            {messages.map((msg, idx) => (
              <div key={msg._id || idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'user' ? (
                  <div className="max-w-[90%] md:max-w-[80%] rounded-3xl px-5 py-3 bg-gray-100 dark:bg-[#2f2f2f] text-gray-900 dark:text-[#ececec]">
                    <p className="whitespace-pre-wrap leading-relaxed break-words">{msg.content}</p>
                  </div>
                ) : (
                  <div className="w-full text-gray-900 dark:text-[#ececec] pr-4 flex flex-col group">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({node, ...props}) => <p className="mb-4 leading-relaxed" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4 space-y-1" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4 space-y-1" {...props} />,
                        li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
                        h1: ({node, ...props}) => <h1 className="text-2xl font-bold mb-4 mt-6" {...props} />,
                        h2: ({node, ...props}) => <h2 className="text-xl font-bold mb-3 mt-5" {...props} />,
                        h3: ({node, ...props}) => <h3 className="text-lg font-bold mb-2 mt-4" {...props} />,
                        code: ({node, inline, ...props}) => 
                          inline ? (
                            <code className="bg-gray-100 dark:bg-[#2f2f2f] rounded-md px-1.5 py-0.5 font-mono text-sm" {...props} />
                          ) : (
                            <pre className="bg-gray-100 dark:bg-[#2f2f2f] rounded-xl p-4 overflow-x-auto mb-4 font-mono text-sm"><code {...props} /></pre>
                          ),
                        strong: ({node, ...props}) => <strong className="font-semibold" {...props} />
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                    <div className="flex justify-start opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleCopy(msg._id || idx, msg.content)}
                        className="p-1.5 hover:bg-gray-200 dark:hover:bg-[#2f2f2f] rounded-md text-gray-500 dark:text-[#b4b4b4] transition-colors"
                        title="Copy message"
                      >
                        {copiedId === (msg._id || idx) ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-[#2f2f2f] animate-pulse flex items-center justify-center">
                  <div className="w-3 h-3 bg-gray-400 dark:bg-[#b4b4b4] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="w-full px-2 md:px-4 pb-4 md:pb-6 pt-2 flex justify-center bg-gradient-to-t from-white via-white dark:from-[#212121] dark:via-[#212121] to-transparent">
        <form onSubmit={handleSubmit} className="w-full max-w-3xl bg-white dark:bg-[#2f2f2f] rounded-[24px] p-2 md:p-3 flex flex-col gap-2 shadow-md dark:shadow-sm border border-gray-200 dark:border-transparent focus-within:border-gray-300 dark:focus-within:border-[#424242] transition-colors relative">
          <div className="flex flex-col flex-1 px-2 pt-1 pb-6 md:pb-10">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything"
              className="bg-transparent border-none outline-none text-base md:text-lg placeholder:text-gray-400 dark:placeholder:text-[#b4b4b4] text-gray-900 dark:text-white w-full"
            />
          </div>

          <div className="flex items-center justify-between">
            <button type="button" className="p-2 hover:bg-gray-100 dark:hover:bg-[#424242] rounded-full transition-colors text-gray-500 dark:text-[#b4b4b4]">
              <Plus size={22} />
            </button>

            <div className="flex items-center gap-1 md:gap-2">
              <button type="button" className="flex items-center gap-1.5 px-2 md:px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-[#424242] rounded-full transition-colors text-gray-500 dark:text-[#b4b4b4] text-sm font-medium">
                <Brain size={18} />
                <span className="hidden md:inline">Think</span>
              </button>
              <button type="button" className="p-2 hover:bg-gray-100 dark:hover:bg-[#424242] rounded-full transition-colors text-gray-500 dark:text-[#b4b4b4]">
                <Mic size={20} />
              </button>
              <button 
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2 bg-black dark:bg-white disabled:opacity-50 text-white dark:text-black rounded-full transition-colors flex items-center justify-center"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MainChatArea;
