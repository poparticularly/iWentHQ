
import React, { useState, useEffect, useRef } from 'react';
import { ChatItem } from './Messages';
import { ChatInfo } from './ChatInfo';
import { Language } from '../App';

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'them' | 'system';
  time: string;
}

interface ChatDetailProps {
  chat: ChatItem;
  onBack: () => void;
  onCreateInstantGroup: (name: string) => void;
  language?: Language;
}

const SimpleGroupInput: React.FC<{
  onClose: () => void;
  onConfirm: (name: string) => void;
  language: Language;
}> = ({ onClose, onConfirm, language }) => {
  const [name, setName] = useState('');

  return (
    <div className="fixed inset-0 z-[2000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="w-full max-w-sm bg-[#1a1a1a] border border-white/10 rounded-[32px] p-6 shadow-2xl scale-100 animate-in zoom-in-95 duration-300">
        <h3 className="text-xl font-black text-white mb-2 text-center">
          {language === 'TR' ? 'Grup Oluştur' : 'Create Group'}
        </h3>
        <p className="text-white/50 text-sm text-center mb-6 leading-relaxed">
          {language === 'TR' 
            ? 'Bu sohbet için yeni bir grup oluşturulacak ve bildirim gönderilecek.' 
            : 'A new group will be created for this chat and a notification will be sent.'}
        </p>
        
        <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 mb-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <span className="material-icons-round">groups</span>
          </div>
          <input 
            autoFocus
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={language === 'TR' ? "Grup Adı" : "Group Name"}
            className="bg-transparent border-none text-white font-bold placeholder-white/20 focus:outline-none w-full"
          />
        </div>

        <div className="flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-4 rounded-xl bg-white/5 text-white font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-colors"
          >
            {language === 'TR' ? 'İptal' : 'Cancel'}
          </button>
          <button 
            onClick={() => {
              if (name.trim()) onConfirm(name);
            }}
            disabled={!name.trim()}
            className={`flex-1 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
              name.trim() ? 'bg-primary text-black hover:brightness-110' : 'bg-white/5 text-white/20'
            }`}
          >
            {language === 'TR' ? 'Oluştur' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
};

export const ChatDetail: React.FC<ChatDetailProps> = ({ chat, onBack, onCreateInstantGroup, language = 'TR' }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Selam!', sender: 'them', time: '12:20' },
    { id: 2, text: 'Naber, biletleri alabildin mi? Çok az kalmış diyorlar.', sender: 'them', time: '12:22' },
    { id: 3, text: 'Selam Zeynep, henüz almadım ama şimdi bakıyorum.', sender: 'me', time: '12:25' },
    { id: 4, text: 'Acele etsen iyi olur, grup dolmak üzere.', sender: 'them', time: '12:26' },
    { id: 5, text: chat.lastMessage, sender: 'them', time: chat.time }
  ]);
  const [inputText, setInputText] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const [showGroupInput, setShowGroupInput] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const newMessage: Message = {
      id: Date.now(),
      text: inputText,
      sender: 'me',
      time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMessage]);
    setInputText('');
  };

  const handleCreateGroupConfirm = (name: string) => {
    // 1. Create the group in parent
    onCreateInstantGroup(name);
    
    // 2. Add system message
    const systemMsg: Message = {
      id: Date.now(),
      text: language === 'TR' 
        ? `"${name}" grubu oluşturuldu. Katılımcılara istek gönderildi.` 
        : `Group "${name}" created. Requests sent to participants.`,
      sender: 'system',
      time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, systemMsg]);
    setShowGroupInput(false);
  };

  if (showInfo) {
    return <ChatInfo chat={chat} onBack={() => setShowInfo(false)} />;
  }

  return (
    <div className="fixed inset-0 z-[500] bg-black flex flex-col animate-in fade-in slide-in-from-right-4 duration-500 font-display">
      {/* Header */}
      <header className="px-6 pt-14 pb-5 bg-black/95 backdrop-blur-3xl border-b border-white/10 flex items-center gap-4 z-10 shrink-0">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white transition-all active:scale-90"
        >
          <span className="material-icons-round text-2xl">arrow_back</span>
        </button>
        
        <div className="flex items-center gap-3 flex-1 min-w-0" onClick={() => setShowInfo(true)}>
          <div className="relative shrink-0">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
              <img src={chat.avatar} className="w-full h-full object-cover" alt={chat.name} />
            </div>
            {chat.isOnline && (
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-primary rounded-full border-[3px] border-black"></div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-[20px] font-black text-white truncate leading-tight tracking-tighter">{chat.name}</h2>
            <p className="text-[11px] font-black text-primary uppercase tracking-[0.2em] leading-none mt-1">
              {chat.isTyping ? 'Yazıyor...' : 'Çevrimiçi'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Create Group Button (Instant) */}
          <button 
            onClick={() => setShowGroupInput(true)}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-primary/20 hover:text-primary transition-all active:scale-90"
          >
            <span className="material-icons-round text-2xl">group_add</span>
          </button>
          
          <button 
            onClick={() => setShowInfo(true)}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white transition-all active:scale-90"
          >
            <span className="material-icons-round text-2xl">more_vert</span>
          </button>
        </div>
      </header>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6 pb-40"
      >
        <div className="text-center py-4">
          <span className="px-5 py-2 bg-white/5 rounded-full text-[11px] font-black text-white/40 uppercase tracking-[0.25em]">BUGÜN</span>
        </div>

        {messages.map((msg) => {
          if (msg.sender === 'system') {
             return (
               <div key={msg.id} className="flex justify-center my-4 px-8">
                 <div className="bg-primary/10 border border-primary/20 rounded-2xl p-3 text-center">
                    <p className="text-primary text-[13px] font-bold leading-tight">{msg.text}</p>
                    <span className="text-[10px] text-white/30 font-bold mt-1 block">{msg.time}</span>
                 </div>
               </div>
             );
          }

          return (
            <div 
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'} max-w-[90%] ${msg.sender === 'me' ? 'ml-auto' : 'mr-auto'}`}
            >
              <div 
                className={`px-6 py-4 rounded-[30px] border-2 shadow-xl ${
                  msg.sender === 'me' 
                    ? 'bg-primary text-black border-primary font-black rounded-tr-lg' 
                    : 'bg-white/[0.1] text-white border-white/5 font-bold rounded-tl-lg'
                } text-[16px] leading-relaxed tracking-tight`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] font-black text-white/30 mt-2 px-3 uppercase tracking-tighter">{msg.time}</span>
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="absolute bottom-12 left-6 right-6 z-20">
        <div className="bg-white/[0.08] backdrop-blur-3xl border-2 border-white/10 rounded-[36px] p-2 flex items-center gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <button className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-primary transition-colors">
            <span className="material-icons-round">attach_file</span>
          </button>
          
          <input 
            type="text" 
            placeholder="Mesaj yaz..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 bg-transparent border-none text-white placeholder-white/30 font-bold text-[17px] py-3 focus:outline-none"
          />

          <button 
            onClick={handleSendMessage}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-400 ${
              inputText.trim() 
                ? 'bg-primary text-black shadow-[0_0_20px_rgba(0,230,118,0.5)] scale-110' 
                : 'bg-white/10 text-white/30'
            }`}
          >
            <span className="material-icons-round text-[26px]">{inputText.trim() ? 'send' : 'mic'}</span>
          </button>
        </div>
      </div>

      {/* Modal */}
      {showGroupInput && (
        <SimpleGroupInput 
          language={language}
          onClose={() => setShowGroupInput(false)}
          onConfirm={handleCreateGroupConfirm}
        />
      )}
    </div>
  );
};
