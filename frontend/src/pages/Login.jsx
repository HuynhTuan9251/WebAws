import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Lock, User, AlertCircle, TerminalSquare } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    const result = await login(username, password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Glowing Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md p-8 sm:p-10 rounded-[2rem] glass-panel border border-slate-700/50 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-[0_0_20px_rgba(59,130,246,0.4)]">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">AWS Security</h2>
          <p className="text-blue-400 mt-2 text-xs font-semibold tracking-widest uppercase">Cloud Operation Center</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-start gap-3 animate-in zoom-in duration-300">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <p className="text-sm text-rose-300 font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1">Tài khoản truy cập</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
              </div>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-slate-900/60 border border-slate-700/50 rounded-xl focus:outline-none focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/80 text-white transition-all placeholder:text-slate-600 font-medium"
                placeholder="netadmin / secops / manager"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1">Mật mã (Password)</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-slate-900/60 border border-slate-700/50 rounded-xl focus:outline-none focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/80 text-white transition-all placeholder:text-slate-600 font-medium tracking-widest"
                placeholder="••••••"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-4 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold tracking-wide rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] disabled:opacity-50 disabled:cursor-not-allowed mt-4 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <><TerminalSquare className="w-5 h-5" /> AUTHENTICATE</>
            )}
          </button>
        </form>
        
        <div className="mt-8 text-center bg-slate-800/30 p-4 rounded-xl border border-slate-700/30">
          <p className="text-xs text-slate-400 font-medium mb-2">Tài khoản Demo (Pass: 123456)</p>
          <div className="flex flex-wrap justify-center gap-2 text-xs font-mono text-slate-500">
            <span className="bg-slate-900 px-2 py-1 rounded border border-slate-700">netadmin</span>
            <span className="bg-slate-900 px-2 py-1 rounded border border-slate-700">secops</span>
            <span className="bg-slate-900 px-2 py-1 rounded border border-slate-700">manager</span>
            <span className="bg-slate-900 px-2 py-1 rounded border border-slate-700 text-rose-400">admin</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
