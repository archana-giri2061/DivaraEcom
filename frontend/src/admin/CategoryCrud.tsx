import React, { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

interface CatProps { categories: string[]; setCategories: React.Dispatch<React.SetStateAction<string[]>>; }
export const CategoryCrud: React.FC<CatProps> = ({ categories, setCategories }) => {
  const [newCat, setNewCat] = useState('');

  return (
    <div className="max-w-md space-y-6">
      <div className="border-b border-gray-100 pb-2"><h3 className="text-lg font-bold">Category Architecture Mapping</h3></div>
      <div className="flex gap-2">
        <input placeholder="New Suite Name" value={newCat} onChange={(e)=>setNewCat(e.target.value)} className="bg-gray-50 border text-xs p-2 rounded flex-1 focus:outline-none" />
        <button onClick={()=>{ if(newCat){ setCategories(p=>[...p, newCat]); setNewCat(''); } }} className="bg-[#1e2229] text-[#bfa363] text-xs font-bold uppercase px-4 rounded hover:bg-[#bfa363] hover:text-gray-900 transition-all flex items-center gap-1"><PlusCircle size={14}/> Append</button>
      </div>
      <div className="border border-gray-100 rounded divide-y divide-gray-50 bg-white">
        {categories.map(c => (
          <div key={c} className="p-3 flex justify-between items-center text-xs">
            <span className="font-medium text-gray-700">{c} Suite</span>
            <button onClick={()=>setCategories(p=>p.filter(x=>x!==c))} className="text-red-600 hover:text-red-800"><Trash2 size={13}/></button>
          </div>
        ))}
      </div>
    </div>
  );
};