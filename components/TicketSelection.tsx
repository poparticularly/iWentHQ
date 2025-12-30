
import React, { useState } from 'react';

interface TicketType {
  id: string;
  name: string;
  price: number;
  description: string;
  remaining?: number;
}

interface TicketSelectionProps {
  eventTitle: string;
  onBack: () => void;
  onConfirm: (selectedTickets: Record<string, number>) => void;
}

const TICKET_TYPES: TicketType[] = [
  {
    id: 'general',
    name: 'Genel Giriş',
    price: 450,
    description: 'Standart giriş hakkı ve etkinlik alanına erişim.',
  },
  {
    id: 'vip',
    name: 'VIP Lounge',
    price: 1200,
    description: 'Özel oturma alanı, hoşgeldin içeceği ve hızlı giriş.',
  },
  {
    id: 'backstage',
    name: 'Backstage Pass',
    price: 2500,
    description: 'Sanatçılarla tanışma şansı ve sahne arkası turu.',
    remaining: 5
  }
];

export const TicketSelection: React.FC<TicketSelectionProps> = ({ eventTitle, onBack, onConfirm }) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [isVisible, setIsVisible] = useState(true);

  const updateQuantity = (id: string, delta: number) => {
    setQuantities(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const totalPrice = TICKET_TYPES.reduce((sum, ticket) => {
    return sum + (ticket.price * (quantities[ticket.id] || 0));
  }, 0);

  const hasSelected = totalPrice > 0;

  return (
    <div className="fixed inset-0 z-[400] bg-black flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="px-6 pt-14 pb-6 flex items-center sticky top-0 bg-black/80 backdrop-blur-xl z-[410]">
        <button onClick={onBack} className="text-white hover:text-primary transition-colors">
          <span className="material-icons-round text-3xl">arrow_back</span>
        </button>
        <div className="flex-1 text-center mr-8">
           <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-1">BİLET SEÇİMİ</p>
           <h2 className="text-lg font-black tracking-tight line-clamp-1">{eventTitle}</h2>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar px-6 space-y-6 pt-4 pb-40">
        {TICKET_TYPES.map((ticket) => {
          const qty = quantities[ticket.id] || 0;
          return (
            <div 
              key={ticket.id}
              className={`p-6 rounded-[32px] border transition-all duration-300 ${
                qty > 0 
                ? 'bg-primary/5 border-primary/50 shadow-[0_0_20px_rgba(0,230,118,0.1)]' 
                : 'bg-white/5 border-white/10'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-black text-white">{ticket.name}</h3>
                  <p className="text-primary font-black mt-1">₺{ticket.price}</p>
                </div>
                {ticket.remaining && (
                  <span className="bg-red-500/10 text-red-500 text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wider">
                    Son {ticket.remaining} Bilet
                  </span>
                )}
              </div>
              <p className="text-sm text-white/50 mb-6 leading-relaxed">
                {ticket.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 bg-black/40 rounded-2xl p-2 border border-white/5">
                  <button 
                    onClick={() => updateQuantity(ticket.id, -1)}
                    disabled={qty === 0}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                      qty === 0 ? 'text-white/10' : 'bg-white/5 text-white hover:bg-white/10'
                    }`}
                  >
                    <span className="material-icons-round">remove</span>
                  </button>
                  <span className="text-xl font-black w-4 text-center">{qty}</span>
                  <button 
                    onClick={() => updateQuantity(ticket.id, 1)}
                    className="w-10 h-10 rounded-xl bg-primary text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
                  >
                    <span className="material-icons-round">add</span>
                  </button>
                </div>
                {qty > 0 && (
                  <div className="text-right animate-in fade-in zoom-in duration-300">
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">TOPLAM</p>
                    <p className="text-lg font-black text-white">₺{qty * ticket.price}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Sticky Checkout Bar */}
      <div className={`fixed bottom-0 left-0 right-0 p-8 pt-10 bg-gradient-to-t from-black via-black to-transparent z-[450] transition-all duration-500 ${hasSelected ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="flex items-center justify-between mb-6 px-2">
          <div>
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Toplam Tutar</p>
            <h4 className="text-3xl font-black text-white">₺{totalPrice}</h4>
          </div>
          <div className="text-right">
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Bilet Sayısı</p>
            {/* Added explicit number types to resolve "Operator '+' cannot be applied to types 'unknown' and 'unknown'" error */}
            <h4 className="text-xl font-black text-primary">{Object.values(quantities).reduce((a: number, b: number) => a + b, 0)} Adet</h4>
          </div>
        </div>
        
        <button 
          onClick={() => onConfirm(quantities)}
          className="w-full h-20 bg-primary rounded-[28px] flex items-center justify-center gap-3 shadow-[0_20px_40px_-10px_rgba(0,230,118,0.5)] group overflow-hidden relative active:scale-95 transition-transform"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          <span className="text-black font-black text-xl relative z-10">Ödemeye Geç</span>
          <span className="material-icons-round text-black relative z-10 group-hover:translate-x-1 transition-transform">arrow_forward</span>
          
          <div className="absolute inset-0 bg-primary animate-pulse opacity-20 group-hover:opacity-40 transition-opacity"></div>
        </button>
      </div>
    </div>
  );
};
