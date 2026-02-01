
import React from 'react';

interface SignUpProps {
  onBack: () => void;
  onEmailSignUp: () => void;
  onLogin: () => void;
}

export const SignUp: React.FC<SignUpProps> = ({ onBack, onEmailSignUp, onLogin }) => {
  return (
    <div className="flex-1 flex flex-col items-center px-8 pb-12 w-full max-w-sm mx-auto h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="absolute top-16 left-6 z-50 text-white/70 hover:text-white transition-colors p-2"
        aria-label="Geri"
      >
        <span className="material-icons-round text-3xl">chevron_left</span>
      </button>

      <div className="flex-1 flex flex-col items-center justify-center w-full pt-10">
        <div className="relative group text-center">
            <h2 className="text-6xl font-black tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">iWENT</h2>
        </div>
      </div>

      <div className="w-full space-y-4 mb-12">
        <button 
          className="w-full bg-[#1DB954] hover:bg-[#1ed760] active:scale-[0.97] transition-all duration-200 text-black font-extrabold text-[17px] py-[18px] px-6 rounded-2xl flex items-center justify-center gap-4 shadow-[0_8px_30px_rgb(29,185,84,0.3)]"
        >
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.508 17.302c-.216.354-.675.467-1.03.249-2.872-1.755-6.486-2.152-10.742-1.177-.403.092-.807-.16-.9-.562-.091-.403.159-.807.562-.9 4.654-1.064 8.636-.613 11.862 1.357.354.216.467.675.248 1.033zm1.47-3.255c-.272.44-.847.578-1.287.307-3.287-2.02-8.303-2.607-12.192-1.427-.497.151-1.02-.128-1.171-.625-.15-.497.129-1.021.626-1.171 4.444-1.348 9.97-.689 13.717 1.61.441.272.578.847.307 1.306zm.126-3.388c-3.944-2.342-10.457-2.557-14.238-1.41-.606.184-1.24-.163-1.425-.77-.183-.606.163-1.24.77-1.425 4.341-1.318 11.537-1.064 16.05 1.616.545.324.726 1.03.402 1.575-.323.546-1.03.727-1.559.414z"/>
          </svg>
          Spotify ile devam et
        </button>

        <div className="text-center pt-2">
          <button 
            onClick={onEmailSignUp}
            className="text-[11px] font-bold text-white/40 hover:text-white/80 transition-colors uppercase tracking-[0.2em]"
          >
            ya da e-posta kullan
          </button>
        </div>
      </div>

      <div className="w-full text-center">
        <button onClick={onLogin} className="text-white/60 text-[15px] font-medium group">
          Zaten bir hesabın var mı?{' '}
          <span className="text-primary font-bold group-hover:underline ml-1">Giriş Yap</span>
        </button>
      </div>
    </div>
  );
};
