
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pill, Lock, User, ArrowRight, Loader2 } from 'lucide-react';

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        <div className="bg-blue-600 p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Pill size={120} className="text-white -rotate-45" />
          </div>
          <div className="inline-flex p-3 rounded-2xl bg-white/20 mb-4 backdrop-blur-md">
            <Pill className="text-white w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Store Portal</h2>
          <p className="text-blue-100 text-sm">Update inventory and help your community find life-saving meds.</p>
        </div>
        
        <form onSubmit={handleLogin} className="p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 ml-1">Store Email</label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="email" 
                  required
                  defaultValue="admin@citypharmacy.com"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-slate-800"
                  placeholder="name@pharmacy.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 ml-1">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="password" 
                  required
                  defaultValue="password123"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-slate-800"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
              <input type="checkbox" className="rounded text-blue-600" />
              Remember me
            </label>
            <a href="#" className="text-blue-600 font-bold hover:underline">Forgot password?</a>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-all disabled:opacity-70 group"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                Login to Dashboard
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          <p className="text-center text-slate-500 text-xs">
            Not registered? <a href="#" className="text-blue-600 font-bold hover:underline">Apply for verification</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
