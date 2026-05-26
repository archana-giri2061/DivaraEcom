import React from 'react';
import type { Product } from '../App';

interface InvProps { 
  products: Product[]; 
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>; 
}

export const InventoryManagement: React.FC<InvProps> = ({ products, setProducts }) => {
  const handleStockAdjust = (id: string, newStock: number) => {
    setProducts((prev) => prev.map(p => p.id === id ? { ...p, stock: Math.max(0, newStock) } : p));
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-100 pb-2"><h3 className="text-lg font-bold">Catalog Inventory Stock Audits</h3></div>
      <div className="overflow-x-auto border border-gray-100 rounded">
        <table className="w-full text-left border-collapse text-xs">
          <thead><tr className="bg-gray-50 text-gray-400 uppercase text-[10px] p-3 border-b"><th className="p-3">Asset Title</th><th className="p-3">Hallmark Carat</th><th className="p-3 text-center">Allocated Stock</th></tr></thead>
          <tbody className="divide-y divide-gray-50">
            {products.map(p=>(
              <tr key={p.id} className="hover:bg-gray-50/50">
                <td className="p-3 font-medium text-gray-800">{p.name}</td>
                <td className="p-3 text-gray-400">{p.purity}</td>
                <td className="p-3 text-center flex items-center justify-center gap-2">
                  <button onClick={()=>handleStockAdjust(p.id, p.stock - 1)} className="bg-gray-100 text-gray-800 font-bold h-6 w-6 rounded hover:bg-gray-200">-</button>
                  <span className="font-bold w-6">{p.stock}</span>
                  <button onClick={()=>handleStockAdjust(p.id, p.stock + 1)} className="bg-gray-100 text-gray-800 font-bold h-6 w-6 rounded hover:bg-gray-200">+</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};