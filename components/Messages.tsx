
import React, { useState } from 'react';
import { ChatDetail } from './ChatDetail';

export interface ChatItem {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  isOnline: boolean;
  isGroup: boolean;
  isTyping: boolean;
  avatar: string;
  type: 'personal' | 'group' | 'support';
}

const CHATS: ChatItem[] = [
  {
    id: 1,
    name: 'Zeynep Demir',
    lastMessage: 'Biletleri aldın mı?',
    time: '12:30',
    unreadCount: 2,
    isOnline: true,
    isGroup: false,
    isTyping: false,
    avatar: 'https://i.pravatar.cc/150?u=zeynep',
    type: 'personal'
  },
  {
    id: 2,
    name: 'Festival Tayfası 🤘',
    lastMessage: 'Yazıyor...',
    time: 'Şimdi',
    unreadCount: 0,
    isOnline: false,
    isGroup: true,
    isTyping: true,
    avatar: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=100',
    type: 'group'
  },
  {
    id: 3,
    name: 'Biletix Support',
    lastMessage: 'İade işleminiz onaylandı.',
    time: 'Cuma',
    unreadCount: 1,
    isOnline: true,
    isGroup: false,
    isTyping: false,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100',
    type: 'support'
  },
  {
    id: 4,
    name: 'Mert Yılmaz',
    lastMessage: 'Konum attım kanka, bekliyorum.',
    time: '11:45',
    unreadCount: 0,
    isOnline: false,
    isGroup: false,
    isTyping: false,
    avatar: 'https://i.pravatar.cc/150?u=mert',
    type: 'personal'
  },
  {
    id: 5,
    name: 'After Party Grubu',
    lastMessage: 'Selam millet, mekan belli oldu mu?',
    time: 'Dün',
    unreadCount: 0,
    isOnline: false,
    isGroup: true,
    isTyping: false,
    avatar: 'https://images.unsplash.com/photo-1514525253344-f81f3c749b1a?auto=format&fit=crop&q=80&w=100',
    type: 'group'
  }
];

export const Messages: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('Tümü');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState<ChatItem | null>(null);

  const filters = ['Tümü', 'Okunmamış', 'Gruplar', 'Destek'];

  if (selectedChat) {
    return <ChatDetail chat={selectedChat} onBack={() => setSelectedChat(null)} />;
  }

  return (
    <div className="flex-1 flex flex-col bg-black h-full animate-in fade-in slide-in-from-right-4 duration-500 font-display">
      {/* Sticky Header with Search */}
      <header className="px-6 pt-14 pb-4 sticky top-0 bg-black/95 backdrop-blur-3xl z-50 border-b border-white/5">
        <div className="relative group mb-6">
          <span className="material-icons-round absolute left-5 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-primary transition-colors">search</span>
          <input 
            type="text" 
            placeholder="Sohbetlerde ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/[0.08] border-2 border-white/10 rounded-[28px] pl-14 pr-6 py-4 text-white placeholder-white/40 font-bold focus:outline-none focus:border-primary/60 focus:bg-white/[0.12] transition-all duration-300 text-[16px]"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-3">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-7 py-3 rounded-full font-black text-[15px] transition-all duration-300 whitespace-nowrap border-2 tracking-tighter ${
                activeFilter === filter 
                  ? 'bg-primary text-black border-primary shadow-[0_4px_16px_rgba(0,230,118,0.25)] scale-105' 
                  : 'bg-white/5 border-white/5 text-white/60 hover:text-white hover:border-white/30'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </header>

      {/* Chat List */}
      <div className="flex-1 px-4 space-y-3 mt-6 pb-40">
        {CHATS.map((chat) => (
          <div 
            key={chat.id}
            onClick={() => setSelectedChat(chat)}
            className={`group relative p-5 rounded-[36px] flex items-center gap-6 transition-all duration-300 cursor-pointer active:scale-[0.96] border-2 ${
              chat.unreadCount > 0 ? 'bg-white/[0.05] border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.4)]' : 'bg-transparent border-transparent hover:bg-white/[0.03] hover:border-white/10'
            }`}
          >
            {/* Avatar Container */}
            <div className="relative shrink-0">
              <div className="w-[76px] h-[76px] rounded-[30px] overflow-hidden border-2 border-white/15 group-hover:border-primary/50 transition-all duration-500 shadow-xl">
                <img src={chat.avatar} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-110" alt={chat.name} />
              </div>
              
              {chat.type === 'support' && (
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full border-[3px] border-black flex items-center justify-center shadow-2xl">
                  <span className="material-icons-round text-[18px] text-white font-black">headset_mic</span>
                </div>
              )}

              {chat.isOnline && !chat.isGroup && chat.type !== 'support' && (
                <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 bg-primary rounded-full border-[4px] border-black shadow-2xl"></div>
              )}

              {chat.isGroup && (
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white/10 backdrop-blur-xl rounded-full border-[3px] border-black flex items-center justify-center shadow-2xl">
                  <span className="material-icons-round text-[18px] text-white font-black">groups</span>
                </div>
              )}
            </div>

            {/* Info Container */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <h3 className={`text-[21px] font-black truncate tracking-tighter leading-tight transition-colors ${chat.unreadCount > 0 ? 'text-white' : 'text-white/90'}`}>
                  {chat.name}
                </h3>
                <span className={`text-[13px] font-black tracking-tighter shrink-0 ml-4 ${chat.unreadCount > 0 ? 'text-primary' : 'text-white/30'}`}>
                  {chat.time}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <p className={`text-[16px] truncate tracking-tight leading-snug transition-colors ${
                  chat.isTyping ? 'text-primary font-black italic' : 
                  chat.unreadCount > 0 ? 'text-white font-extrabold' : 'text-white/40 font-bold'
                }`}>
                  {chat.lastMessage}
                </p>
                
                {chat.unreadCount > 0 && (
                  <div className="min-w-[26px] h-[26px] px-2 rounded-full bg-primary flex items-center justify-center shadow-[0_6px_15px_rgba(0,230,118,0.6)] shrink-0 ml-4">
                    <span className="text-black text-[12px] font-black">{chat.unreadCount}</span>
                  </div>
                )}

                {!chat.unreadCount && !chat.isTyping && (
                  <span className="material-icons-round text-[20px] text-white/20 shrink-0 ml-4">done_all</span>
                )}
              </div>
            </div>

            {/* Unread Glow Accent */}
            {chat.unreadCount > 0 && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-12 bg-primary rounded-r-full shadow-[6px_0_20px_rgba(0,230,118,0.7)]"></div>
            )}
          </div>
        ))}

        {/* Security / Info Footer */}
        <div className="pt-12 pb-16 text-center">
           <div className="inline-flex items-center gap-3 px-5 py-3 bg-white/[0.03] rounded-full border border-white/5 backdrop-blur-md">
              <span className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse shadow-[0_0_8px_#00E676]"></span>
              <p className="text-[12px] font-black text-white/40 uppercase tracking-[0.25em]">Uçtan Uca Şifreli</p>
           </div>
        </div>
      </div>
    </div>
  );
};
