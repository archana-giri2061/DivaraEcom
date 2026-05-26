import React from 'react';

export const BannerManagement: React.FC = () => {
  return (
    <div className="max-w-xl space-y-6">
      <div className="border-b border-gray-100 pb-2"><h3 className="text-lg font-bold">Storefront Banner Management</h3></div>
      <div className="bg-gray-50 border p-4 rounded text-xs text-gray-500 space-y-4">
        <p className="font-medium">Active Banner Array Configuration:</p>
        <div className="p-3 bg-white border border-gray-200 rounded flex justify-between items-center">
          <div><h4 className="font-bold text-gray-800">Banner Slot 1: Stunning Every Ear</h4><span className="text-[10px] text-gray-400">Target URL: /collection</span></div>
          <span className="text-emerald-700 text-[10px] font-bold uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded">Active Live</span>
        </div>
      </div>
    </div>
  );
};