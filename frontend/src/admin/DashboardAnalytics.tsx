import React from 'react';
import type { Product } from '../App';
import { TrendingUp, DollarSign, Package, Star } from 'lucide-react';

export const DashboardAnalytics: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 tracking-wide">Analytics Console Dashboard</h2>
        <p className="text-xs text-gray-400 uppercase mt-0.5 tracking-wider">Atelier Core Performance Metric Reports</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="border border-gray-200 p-4 rounded bg-white flex items-center justify-between shadow-3xs">
          <div><span className="text-[10px] uppercase font-bold text-gray-400">Gross Vault Valuation</span><h3 className="text-lg font-extrabold text-gray-900 mt-1">Rs. 2,492,000</h3></div>
          <div className="bg-amber-50 text-[#8c763e] p-2 rounded"><DollarSign size={18}/></div>
        </div>
        <div className="border border-gray-200 p-4 rounded bg-white flex items-center justify-between shadow-3xs">
          <div><span className="text-[10px] uppercase font-bold text-gray-400">Total Live Catalog</span><h3 className="text-lg font-extrabold text-gray-900 mt-1">{products.length} Designs</h3></div>
          <div className="bg-blue-50 text-blue-600 p-2 rounded"><Package size={18}/></div>
        </div>
        <div className="border border-gray-200 p-4 rounded bg-white flex items-center justify-between shadow-3xs">
          <div><span className="text-[10px] uppercase font-bold text-gray-400">Dispatched Requests</span><h3 className="text-lg font-extrabold text-gray-900 mt-1">42 Orders</h3></div>
          <div className="bg-emerald-50 text-emerald-600 p-2 rounded"><TrendingUp size={18}/></div>
        </div>
        <div className="border border-gray-200 p-4 rounded bg-white flex items-center justify-between shadow-3xs">
          <div><span className="text-[10px] uppercase font-bold text-gray-400">Premium Membership</span><h3 className="text-lg font-extrabold text-gray-900 mt-1">118 Clients</h3></div>
          <div className="bg-purple-50 text-purple-600 p-2 rounded"><Star size={18}/></div>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200/60 p-4 rounded text-xs space-y-2">
        <h4 className="font-bold uppercase tracking-wider text-gray-500 text-[10px]">Active Operations Log Monitor</h4>
        <p className="text-gray-600 font-light">• Terminal initialized securely under administrative session tokens...</p>
        <p className="text-gray-600 font-light">• FENEGOSIDA gold rate ledger feed synchronized successfully at current index marks...</p>
      </div>
    </div>
  );
};