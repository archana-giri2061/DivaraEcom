import React, { useState, useMemo } from 'react';
import type { Product } from '../App';
import { Heart, SlidersHorizontal } from 'lucide-react';

export const Collection: React.FC<{ products: Product[], toggleWishlist: (p: Product) => void, addToCart: (p: Product) => void }> = ({ products, toggleWishlist, addToCart }) => {
  const [catFilter, setCatFilter] = useState('All');

  const filtered = useMemo(() => {
    return products.filter(p => catFilter === 'All' || p.category === catFilter);
  }, [products, catFilter]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
      <aside className="space-y-4 bg-white p-4 border border-gray-100 rounded h-fit">
        <h3 className="font-bold text-xs uppercase tracking-widest text-gray-800 flex items-center gap-1"><SlidersHorizontal size={13}/> Filter Ledger</h3>
        <div className="space-y-2 pt-2 border-t border-gray-50">
          <h4 className="text-[10px] font-bold uppercase text-gray-400">Suites</h4>
          {['All', 'Rings', 'Necklaces', 'Earrings'].map(c => (
            <label key={c} className="flex items-center text-xs text-gray-600 cursor-pointer block py-0.5">
              <input type="radio" checked={catFilter === c} onChange={() => setCatFilter(c)} className="mr-2" /> {c}
            </label>
          ))}
        </div>
      </aside>
      <main className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map(product => (
          <div key={product.id} className="bg-white border border-gray-100 rounded overflow-hidden flex flex-col justify-between">
            <div className="aspect-[4/5] bg-gray-50 relative">
              <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
              <button onClick={() => toggleWishlist(product)} className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full text-[#581c24]"><Heart size={14} /></button>
            </div>
            <div className="p-4 space-y-3">
              <h4 className="font-serif text-sm font-medium text-gray-900">{product.name}</h4>
              <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                <span className="text-xs font-bold text-gray-900">Rs. {product.price.toLocaleString()}</span>
                <button onClick={() => addToCart(product)} className="bg-[#8c763e] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded">Add to Bag</button>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};