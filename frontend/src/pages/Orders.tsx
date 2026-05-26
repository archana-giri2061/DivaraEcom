import React from 'react';

export const Orders: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
      <div className="border-b border-gray-100 pb-3">
        <h2 className="font-serif text-2xl font-medium">Your Order History</h2>
      </div>
      <div className="bg-white border border-gray-100 rounded p-8 text-center text-xs text-gray-400 uppercase tracking-wider shadow-3xs">
        No recent dispatches allocated to your profile.
      </div>
    </div>
  );
};