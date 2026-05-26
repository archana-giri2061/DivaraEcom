import React from 'react';

export const UserManagement: React.FC = () => {
  const usersList = [
    { name: "Prashant Sharma", email: "prashant@domain.np", type: "Premium VIP Tier" },
    { name: "Aayush Shrestha", email: "aayush@domain.np", type: "Standard Member" }
  ];

  return (
    <div className="max-w-2xl space-y-6">
      <div className="border-b border-gray-100 pb-2"><h3 className="text-lg font-bold">Client Security Access Database</h3></div>
      <div className="border border-gray-100 rounded divide-y divide-gray-50 bg-white">
        {usersList.map((u, i) => (
          <div key={i} className="p-4 flex justify-between items-center text-xs">
            <div><h4 className="font-bold text-gray-800">{u.name}</h4><p className="text-gray-400 text-[10px] font-light">{u.email}</p></div>
            <span className="bg-purple-50 text-purple-700 font-semibold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">{u.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
};