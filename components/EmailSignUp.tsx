
import React, { useState } from 'react';
import { api, setAuthToken } from '../api';

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
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [city, setCity] = useState('');

  const inputClasses = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/15 transition-all duration-300 text-[15px]";
  const labelClasses = "text-[12px] font-bold text-white/40 uppercase tracking-widest mb-1.5 ml-1 block";

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Şifreler eşleşmiyor.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const fullName = `${name} ${surname}`.trim();
      // Call real API
      const response = await api.auth.register({
        name: fullName,
        email,
        password,
        city: city || 'Istanbul' // Default or input
      });

      // Store token
      setAuthToken(response.accessToken);

      setIsSuccess(true);
      
      setTimeout(() => {
        onSignUpSuccess();
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Kayıt sırasında bir hata oluştu.');
    } finally {
      setIsSubmitting(false);
    }
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

      <div className="w-full text-center mb-6">
        <h2 className="text-3xl font-serif font-bold text-white mb-2">Aramıza Katıl</h2>
      </div>

      <button 
        type="button"
        className="w-full bg-[#4285F4] hover:bg-[#5a95f5] active:scale-[0.97] transition-all duration-200 text-white font-extrabold text-[17px] py-[16px] px-6 rounded-2xl flex items-center justify-center gap-4 shadow-[0_8px_30px_rgb(66,133,244,0.3)] mb-6"
      >
        <div className="bg-white rounded-full p-1 flex items-center justify-center">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"/>
          </svg>
        </div>
        Google ile devam et
      </button>

      <div className="flex items-center gap-4 w-full mb-6">
        <div className="h-[1px] bg-white/10 flex-1"></div>
        <span className="text-white/40 text-xs font-bold uppercase tracking-widest">VEYA</span>
        <div className="h-[1px] bg-white/10 flex-1"></div>
      </div>

      <form className="w-full space-y-5" onSubmit={handleSignUp}>
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-xl text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>İsim</label>
            <input 
              required 
              type="text" 
              placeholder="Can" 
              className={inputClasses} 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className={labelClasses}>Soyisim</label>
            <input 
              required 
              type="text" 
              placeholder="Yılmaz" 
              className={inputClasses} 
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className={labelClasses}>E-posta</label>
          <input 
            required 
            type="email" 
            placeholder="can@ornek.com" 
            className={inputClasses} 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className={labelClasses}>Şifre</label>
          <div className="relative">
            <input 
              required
              type={showPassword ? "text" : "password"} 
              placeholder="••••••••" 
              className={inputClasses} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <PasswordToggle 
              isVisible={showConfirmPassword} 
              onToggle={() => setShowConfirmPassword(!showConfirmPassword)} 
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>Şehir</label>
            <input 
              type="text" 
              placeholder="İstanbul" 
              className={inputClasses}
              value={city}
              onChange={(e) => setCity(e.target.value)} 
            />
          </div>
          <div>
            <label className={labelClasses}>Yaş</label>
            <input type="number" placeholder="24" className={inputClasses} />
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

      <div className="w-full text-center mt-6">
        <button onClick={onLogin} className="text-white/60 text-[15px] font-medium group">
          Zaten bir hesabın var mı?{' '}
          <span className="text-primary font-bold group-hover:underline ml-1">Giriş Yap</span>
        </button>
      </div>
    </div>
  );
};
