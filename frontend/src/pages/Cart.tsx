import React from 'react';
import type { Product } from '../App';
import { Trash2 } from 'lucide-react';

export const Cart: React.FC<{ cart: {product: Product, quantity: number}[], setCart: React.Dispatch<React.SetStateAction<{product: Product, quantity: number}[]>> }> = ({ cart, setCart }) => {
  const totalPrice = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const dropItem = (id: string) => setCart(prev => prev.filter(item => item.product.id !== id));

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
      <div className="border-b border-gray-100 pb-3"><h2 className="font-serif text-2xl font-medium">Your Shopping Bag</h2></div>
      {cart.length === 0 ? (
        <div className="text-center py-16 space-y-4">
          <p className="text-xs tracking-wider text-gray-400 uppercase italic">Your configuration bag is empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.product.id} className="bg-white border border-gray-100 rounded p-4 flex gap-4 items-center justify-between shadow-3xs">
                <img src={item.product.imageUrl} alt={item.product.name} className="h-16 w-16 object-cover rounded" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-sm font-medium text-gray-900 truncate">{item.product.name}</h4>
                  <p className="text-[10px] text-gray-400 font-medium">Qty: {item.quantity} • {item.product.purity}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-xs font-bold text-gray-900">Rs. {(item.product.price * item.quantity).toLocaleString()}</p>
                  <button onClick={() => dropItem(item.product.id)} className="text-gray-400 hover:text-red-700"><Trash2 size={13}/></button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white border border-gray-100 p-5 rounded space-y-4 h-fit shadow-2xs">
            <h3 className="font-bold text-xs uppercase tracking-widest text-gray-800">Order Summary</h3>
            <div className="flex justify-between text-xs border-b border-gray-50 pb-2"><span>Subtotal Value</span><span className="font-bold">Rs. {totalPrice.toLocaleString()}</span></div>
            <div className="flex justify-between text-sm pt-2 text-[#581c24] font-bold"><span>Total Matrix</span><span>Rs. {totalPrice.toLocaleString()}</span></div>
          </div>
        </div>
      )}
    </div>
  );
};