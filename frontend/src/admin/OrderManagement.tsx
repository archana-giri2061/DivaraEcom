import React from 'react';

export const OrderManagement: React.FC = () => {
  const mockOrders = [
    { id: "DIV-92831", customer: "Prashant Sharma", item: "Jantar Pendant", total: 345000, status: "Pending Assay Check" },
    { id: "DIV-88214", customer: "Aayush Shrestha", item: "Moon-Phase Band", total: 45000, status: "Ready for Delivery" }
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-100 pb-2"><h3 className="text-lg font-bold">Client Order Routing Matrix</h3></div>
      <div className="overflow-x-auto border border-gray-100 rounded">
        <table className="w-full text-left border-collapse text-xs">
          <thead><tr className="bg-gray-50 text-gray-400 uppercase text-[10px] p-3 border-b"><th className="p-3">Order ID</th><th className="p-3">Client Profile</th><th className="p-3">Valuation</th><th className="p-3">Routing State</th></tr></thead>
          <tbody className="divide-y divide-gray-50">
            {mockOrders.map(o=>(
              <tr key={o.id} className="hover:bg-gray-50/50">
                <td className="p-3 font-bold text-[#581c24]">{o.id}</td>
                <td className="p-3 font-medium text-gray-700">{o.customer} <span className="text-[10px] text-gray-400 block">{o.item}</span></td>
                <td className="p-3 font-semibold text-gray-900">Rs. {o.total.toLocaleString()}</td>
                <td className="p-3"><span className="bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wide">{o.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};