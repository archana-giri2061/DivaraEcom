import React from 'react';
import type { Product } from '../App';
import { Trash2, ShoppingBag } from 'lucide-react';

export const Wishlist: React.FC<{ wishlist: Product[], addToCart: (p: Product) => void, toggleWishlist: (p: Product) => void }> = ({ wishlist, addToCart, toggleWishlist }) => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
      <div className="border-b border-gray-100 pb-3"><h2 className="font-serif text-2xl font-medium">Your Wishlist Ledger</h2></div>
      {wishlist.length === 0 ? (
        <p className="text-center py-16 text-xs tracking-wider text-gray-400 uppercase italic">No designs saved in your workspace vault.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlist.map(product => (
            <div key={product.id} className="bg-white border border-gray-100 rounded overflow-hidden p-3 space-y-3 shadow-3xs">
              <img src={product.imageUrl} alt={product.name} className="aspect-square w-full object-cover rounded-sm" />
              <h4 className="font-serif text-sm font-medium text-gray-900 line-clamp-1">{product.name}</h4>
              <div className="flex items-center justify-between border-t border-gray-50 pt-3">
                <span className="text-xs font-bold text-gray-900">Rs. {product.price.toLocaleString()}</span>
                <div className="flex gap-1">
                  <button onClick={() => addToCart(product)} className="bg-[#8c763e] text-white text-[10px] p-1.5 rounded"><ShoppingBag size={12}/></button>
                  <button onClick={() => toggleWishlist(product)} className="border text-gray-400 p-1.5 rounded"><Trash2 size={12}/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};