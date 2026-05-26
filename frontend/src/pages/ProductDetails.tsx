import React from 'react';
import { useParams } from 'react-router-dom';
import type { Product } from '../App';
import { Heart, ShoppingBag, ShieldCheck, RefreshCw } from 'lucide-react';

export const ProductDetails: React.FC<{ products: Product[], addToCart: (p: Product) => void, toggleWishlist: (p: Product) => void }> = ({ products, addToCart, toggleWishlist }) => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);

  if (!product) return <div className="text-center py-20 text-xs uppercase tracking-widest text-gray-400">Design Not Located</div>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="bg-gray-50 aspect-[4/5] rounded overflow-hidden border border-gray-100">
        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <div className="space-y-6 flex flex-col justify-center">
        <h2 className="font-serif text-2xl md:text-3xl font-medium text-gray-900">{product.name}</h2>
        <p className="text-xl font-bold text-gray-900">Rs. {product.price.toLocaleString()}</p>
        <p className="text-xs text-gray-500 font-light leading-relaxed">{product.description}</p>
        
        <div className="grid grid-cols-2 gap-3 text-[10px] text-gray-400 uppercase tracking-wider font-medium pt-2">
          <div className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-emerald-600"/> 100% Certified Purity</div>
          <div className="flex items-center gap-1.5"><RefreshCw size={14} className="text-emerald-600"/> Lifetime Exchange Values</div>
        </div>

        <div className="flex gap-4 pt-4 border-t border-gray-100">
          <button onClick={() => addToCart(product)} className="flex-1 bg-[#8c763e] text-white text-xs uppercase tracking-widest font-semibold py-3.5 rounded flex items-center justify-center gap-2"><ShoppingBag size={14}/> Secure Vault Order</button>
          <button onClick={() => toggleWishlist(product)} className="border text-[#581c24] p-3 rounded"><Heart size={16}/></button>
        </div>
      </div>
    </div>
  );
};