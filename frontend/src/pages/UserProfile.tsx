import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, MapPin, ClipboardList } from 'lucide-react';

export const UserProfile: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto px-6 my-12 space-y-6">
      <div className="bg-white p-6 border border-gray-100 rounded flex items-center space-x-4 shadow-3xs">
        <div className="h-12 w-12 bg-[#8c763e] text-white font-bold rounded-full flex items-center justify-center text-lg">P</div>
        <div>
          <h3 className="font-serif text-lg font-medium">Prashant Sharma</h3>
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider flex items-center gap-1"><Shield size={12} className="text-emerald-600"/> Verified Premium Client Account</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-4 border border-gray-100 rounded space-y-2 shadow-3xs">
          <h4 className="text-xs font-bold text-gray-800 flex items-center gap-1"><MapPin size={13} className="text-[#8c763e]" /> Default Boutique Destination</h4>
          <p className="text-xs text-gray-500 font-light">Gairidhara Marg, Ward 2,<br/>Kathmandu, Bagmati, Nepal</p>
        </div>
        <div className="bg-white p-4 border border-gray-100 rounded space-y-2 shadow-3xs">
          <h4 className="text-xs font-bold text-gray-800 flex items-center gap-1"><ClipboardList size={13} className="text-[#8c763e]" /> Core Account Options</h4>
          <div className="space-y-1 pt-1"><Link to="/orders" className="text-[11px] text-[#581c24] font-semibold underline uppercase tracking-wider block">Review Order Tracking Ledger →</Link></div>
        </div>
      </div>
    </div>
  );
};