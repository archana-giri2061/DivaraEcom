import React, { useState } from 'react';
import type { Product } from '../App';
import { PlusCircle, Trash2 } from 'lucide-react';

interface CrudProps { products: Product[]; setProducts: React.Dispatch<React.SetStateAction<Product[]>>; categories: string[]; }
export const ProductCrud: React.FC<CrudProps> = ({ products, setProducts, categories }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(categories[0] || 'Rings');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;
    const newProduct: Product = {
      id: Date.now().toString(),
      name,
      description: "Custom handcrafted structural back office allocation entry.",
      category,
      occasion: "Daily Wear",
      imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
      price: Number(price),
      purity: "22K Gold",
      stock: 5
    };
    setProducts(prev => [newProduct, ...prev]);
    setName(''); setPrice('');
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-100 pb-2"><h3 className="text-lg font-bold">Product Catalog Management Console</h3></div>
      <form onSubmit={handleAdd} className="bg-gray-50 p-4 rounded border border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <input required placeholder="Item Title" value={name} onChange={(e)=>setName(e.target.value)} className="bg-white border p-1.5 rounded text-xs focus:outline-none" />
        <input required placeholder="Price (NPR)" type="number" value={price} onChange={(e)=>setPrice(e.target.value)} className="bg-white border p-1.5 rounded text-xs focus:outline-none" />
        <select value={category} onChange={(e)=>setCategory(e.target.value)} className="bg-white border p-1.5 rounded text-xs focus:outline-none">
          {categories.map(c=><option key={c} value={c}>{c}</option>)}
        </select>
        <button type="submit" className="bg-[#1e2229] text-[#bfa363] text-xs font-bold uppercase p-2 rounded flex items-center justify-center gap-1 hover:bg-[#bfa363] hover:text-gray-900 transition-all"><PlusCircle size={14}/> Inject Asset</button>
      </form>
      <div className="overflow-x-auto border border-gray-100 rounded">
        <table className="w-full text-left border-collapse text-xs">
          <thead><tr className="bg-gray-50 text-gray-400 uppercase text-[10px] tracking-wider border-b border-gray-100"><th className="p-3">Design Identity</th><th className="p-3">Category Suite</th><th className="p-3">Valuation Index</th><th className="p-3 text-center">Actions</th></tr></thead>
          <tbody className="divide-y divide-gray-50">
            {products.map(p=>(
              <tr key={p.id} className="hover:bg-gray-50/50">
                <td className="p-3 font-medium text-gray-800">{p.name}</td>
                <td className="p-3 text-gray-500">{p.category}</td>
                <td className="p-3 font-semibold">Rs. {p.price.toLocaleString()}</td>
                <td className="p-3 text-center"><button onClick={()=>setProducts(prev=>prev.filter(x=>x.id!==p.id))} className="text-red-600 hover:text-red-800"><Trash2 size={13}/></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};