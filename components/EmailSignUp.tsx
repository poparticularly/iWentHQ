
import React, { useState } from 'react';

interface EmailSignUpProps {
  onBack: () => void;
  onLogin: () => void;
  onSignUpSuccess: () => void;
}

export const EmailSignUp: React.FC<EmailSignUpProps> = ({ onBack, onLogin, onSignUpSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const inputClasses = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/15 transition-all duration-300 text-[15px]";
  const labelClasses = "text-[12px] font-bold text-white/40 uppercase tracking-widest mb-1.5 ml-1 block";

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Show success screen for a bit then redirect
      setTimeout(() => {
        onSignUpSuccess();
      }, 2000);
    }, 1500);
  };

  const PasswordToggle = ({ isVisible, onToggle }: { isVisible: boolean, onToggle: () => void }) => (
    <button 
      type="button" 
      onClick={onToggle}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors flex items-center justify-center h-full pr-1"
    >
      <span className="material-icons-round text-xl">
        {isVisible ? 'visibility_off' : 'visibility'}
      </span>
    </button>
  );

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center px-8 animate-in fade-in duration-500">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(0,230,118,0.5)] animate-bounce relative z-10">
            <span className="material-icons-round text-black text-5xl">check</span>
          </div>
        </div>
        <h2 className="text-3xl font-black text-white text-center mb-4 tracking-tight">Hoş Geldin!</h2>
        <p className="text-white/60 text-center font-medium leading-relaxed">
          Hesabın başarıyla oluşturuldu.<br />Harika etkinlikler seni bekliyor.
        </p>
        <div className="mt-12 flex gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-[bounce_1s_infinite_100ms]"></div>
          <div className="w-2 h-2 rounded-full bg-primary animate-[bounce_1s_infinite_200ms]"></div>
          <div className="w-2 h-2 rounded-full bg-primary animate-[bounce_1s_infinite_300ms]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center px-8 pb-12 pt-24 w-full max-w-sm mx-auto h-full animate-in fade-in slide-in-from-right-4 duration-500">
      <button 
        onClick={onBack}
        className="absolute top-16 left-6 z-50 text-white/70 hover:text-white transition-colors p-2"
        aria-label="Geri"
      >
        <span className="material-icons-round text-3xl">chevron_left</span>
      </button>

      <div className="w-full text-center mb-10">
        <h2 className="text-3xl font-serif font-bold text-white mb-2">Aramıza Katıl</h2>
      </div>

      <form className="w-full space-y-5" onSubmit={handleSignUp}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>İsim</label>
            <input required type="text" placeholder="Can" className={inputClasses} />
          </div>
          <div>
            <label className={labelClasses}>Soyisim</label>
            <input required type="text" placeholder="Yılmaz" className={inputClasses} />
          </div>
        </div>

        <div>
          <label className={labelClasses}>E-posta</label>
          <input required type="email" placeholder="can@ornek.com" className={inputClasses} />
        </div>

        <div>
          <label className={labelClasses}>Şifre</label>
          <div className="relative">
            <input 
              required
              type={showPassword ? "text" : "password"} 
              placeholder="••••••••" 
              className={inputClasses} 
            />
            <PasswordToggle 
              isVisible={showPassword} 
              onToggle={() => setShowPassword(!showPassword)} 
            />
          </div>
        </div>

        <div>
          <label className={labelClasses}>Şifre Tekrar</label>
          <div className="relative">
            <input 
              required
              type={showConfirmPassword ? "text" : "password"} 
              placeholder="••••••••" 
              className={inputClasses} 
            />
            <PasswordToggle 
              isVisible={showConfirmPassword} 
              onToggle={() => setShowConfirmPassword(!showConfirmPassword)} 
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>Cinsiyet</label>
            <div className="relative">
              <select required className={`${inputClasses} appearance-none cursor-pointer bg-black/40 backdrop-blur-sm`}>
                <option value="" disabled selected className="text-white/20">Seçiniz</option>
                <option value="male">Erkek</option>
                <option value="female">Kadın</option>
                <option value="none">Belirtmek istemiyorum</option>
                <option value="other">Diğer</option>
                <option value="nonbinary">Non-binary</option>
              </select>
              <span className="material-icons-round absolute right-3 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none">
                expand_more
              </span>
            </div>
          </div>
          <div>
            <label className={labelClasses}>Yaş</label>
            <input required type="number" placeholder="24" className={inputClasses} />
          </div>
        </div>

        <button 
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-primary text-black font-extrabold text-[17px] py-[18px] rounded-2xl shadow-[0_8px_30px_rgb(0,230,118,0.3)] hover:brightness-110 active:scale-[0.98] transition-all duration-200 mt-4 flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
              Oluşturuluyor...
            </>
          ) : 'Hesap Oluştur'}
        </button>
      </form>

      <div className="w-full flex items-center gap-4 my-8">
        <div className="flex-1 h-[1px] bg-white/10"></div>
        <span className="text-[11px] font-bold text-white/20 uppercase tracking-widest">Ya da şunlarla</span>
        <div className="flex-1 h-[1px] bg-white/10"></div>
      </div>

      <div className="w-full grid grid-cols-2 gap-4 mb-8">
        <button className="flex items-center justify-center bg-[#1DB954] hover:bg-[#1ed760] text-black h-14 rounded-xl transition-all active:scale-95 shadow-md">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.508 17.302c-.216.354-.675.467-1.03.249-2.872-1.755-6.486-2.152-10.742-1.177-.403.092-.807-.16-.9-.562-.091-.403.159-.807.562-.9 4.654-1.064 8.636-.613 11.862 1.357.354.216.467.675.248 1.033zm1.47-3.255c-.272.44-.847.578-1.287.307-3.287-2.02-8.303-2.607-12.192-1.427-.497.151-1.02-.128-1.171-.625-.15-.497.129-1.021.626-1.171 4.444-1.348 9.97-.689 13.717 1.61.441.272.578.847.307 1.306zm.126-3.388c-3.944-2.342-10.457-2.557-14.238-1.41-.606.184-1.24-.163-1.425-.77-.183-.606.163-1.24.77-1.425 4.341-1.318 11.537-1.064 16.05 1.616.545.324.726 1.03.402 1.575-.323.546-1.03.727-1.559.414z"/>
          </svg>
        </button>
        <button className="flex items-center justify-center bg-[#4285F4] hover:bg-[#5a95f5] text-white h-14 rounded-xl transition-all active:scale-95 shadow-md">
          <div className="bg-white rounded-full p-0.5">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"/>
            </svg>
          </div>
        </button>
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
