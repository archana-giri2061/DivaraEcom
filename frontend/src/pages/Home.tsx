import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import type { Product } from '../App';

interface HomeProps { products: Product[]; toggleWishlist: (p: Product) => void; addToCart: (p: Product) => void; searchQuery: string; }
export const Home: React.FC<HomeProps> = ({ products, toggleWishlist, addToCart, searchQuery }) => {
  const priceBuckets = [
    { label: "Under Rs. 50K", desc: "Minimalist Staples" },
    { label: "Rs. 50K - 1.5 Lakh", desc: "Premium Statements" },
    { label: "Rs. 1.5 - 3 Lakh", desc: "Heritage Luxury" },
    { label: "Rs. 3 Lakh & Above", desc: "Bridal Masterpieces" }
  ];

  const viewItems = products.filter(p => !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-12 pb-12">
      <section className="relative bg-[#581c24] text-white py-24 px-8 text-center space-y-4">
        <h1 className="font-serif text-4xl md:text-6xl font-light tracking-wide leading-tight">Heirlooms for the Modern Vanguard</h1>
        <div className="pt-4"><Link to="/collection" className="bg-[#8c763e] text-white text-xs uppercase tracking-widest font-semibold px-8 py-3 rounded">Explore Vault Matrix</Link></div>
      </section>

      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {priceBuckets.map((b, i) => (
            <div key={i} className="bg-white border border-gray-100 p-4 rounded text-center">
              <h4 className="text-xs font-bold text-gray-800">{b.label}</h4>
              <p className="text-[10px] text-gray-400 uppercase mt-0.5 tracking-wider">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {viewItems.map(product => (
            <div key={product.id} className="group bg-white border border-gray-100 rounded overflow-hidden flex flex-col justify-between">
              <div className="aspect-[4/5] bg-gray-50 relative">
                <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
                <button onClick={() => toggleWishlist(product)} className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full text-[#581c24]"><Heart size={14} /></button>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <h4 className="font-serif text-sm font-medium text-gray-900">{product.name}</h4>
                <div className="flex items-center justify-between border-t border-gray-50 pt-3">
                  <span className="text-xs font-bold text-gray-900">Rs. {product.price.toLocaleString()}</span>
                  <div className="flex gap-1.5">
                    <Link to={`/product/${product.id}`} className="border p-1.5 rounded"><Eye size={12} /></Link>
                    <button onClick={() => addToCart(product)} className="bg-[#8c763e] text-white text-[10px] font-bold uppercase px-2.5 py-1.5 rounded flex items-center gap-1"><ShoppingBag size={10} /> Add</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};