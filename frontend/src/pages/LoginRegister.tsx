import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginRegister: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="max-w-sm mx-auto my-16 bg-white p-6 border border-gray-100 rounded space-y-6 shadow-2xs">
      <div className="text-center space-y-1">
        <h3 className="font-serif text-xl font-medium">{isLogin ? 'Sign In to Atelier' : 'Create Vault Access'}</h3>
        <p className="text-[10px] text-gray-400 uppercase tracking-wider">Access personalized configurations ledger</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div className="space-y-1">
            <label className="text-[10px] uppercase text-gray-400 tracking-wider block">Full Name</label>
            <input required type="text" className="w-full bg-gray-50 border border-gray-200 text-xs p-2 rounded focus:outline-none" />
          </div>
        )}
        <div className="space-y-1">
          <label className="text-[10px] uppercase text-gray-400 tracking-wider block">Email Address</label>
          <input required type="email" className="w-full bg-gray-50 border border-gray-200 text-xs p-2 rounded focus:outline-none" />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] uppercase text-gray-400 tracking-wider block">Security Password</label>
          <input required type="password" className="w-full bg-gray-50 border border-gray-200 text-xs p-2 rounded focus:outline-none" />
        </div>
        <button type="submit" className="w-full bg-[#581c24] text-white text-xs uppercase tracking-widest font-semibold py-2.5 rounded hover:bg-[#8c763e] transition-all">{isLogin ? 'Authenticate' : 'Register Account'}</button>
      </form>
      <div className="text-center">
        <button onClick={() => setIsLogin(!isLogin)} className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold underline hover:text-[#8c763e]">{isLogin ? 'Need a workspace card? Register' : 'Have security authorization? Sign In'}</button>
      </div>
    </div>
  );
};