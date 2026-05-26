import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product, Coupon } from '../App';
import { CheckCircle2 } from 'lucide-react';

interface CheckoutProps {
  cart: { product: Product; quantity: number }[];
  setCart: React.Dispatch<React.SetStateAction<{ product: Product; quantity: number }[]>>;
  coupons: Coupon[];
}

export const Checkout: React.FC<CheckoutProps> = ({ cart, setCart, coupons }) => {
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [orderComplete, setOrderComplete] = useState(false);

  const grossTotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const discountAmount = (grossTotal * appliedDiscount) / 100;
  const netTotal = grossTotal - discountAmount;

  const handleApplyCoupon = () => {
    const match = coupons.find(c => c.code.toUpperCase() === couponCode.trim().toUpperCase());
    if (match) setAppliedDiscount(match.discount);
    else alert("Invalid Coupon Entry");
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderComplete(true);
    setTimeout(() => { setCart([]); navigate('/orders'); }, 2500);
  };

  if (orderComplete) return (
    <div className="max-w-md mx-auto text-center py-24 space-y-3 px-6">
      <CheckCircle2 size={44} className="text-emerald-600 mx-auto" />
      <h3 className="font-serif text-xl font-medium">Order Dispatched Safely</h3>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
      <form onSubmit={handlePlaceOrder} className="bg-white p-5 border border-gray-100 rounded space-y-4 shadow-3xs">
        <h3 className="font-serif text-lg font-medium border-b border-gray-50 pb-2">Shipping Declarations</h3>
        <div className="space-y-1">
          <label className="text-[10px] uppercase text-gray-400 tracking-wider block">Full Name</label>
          <input required type="text" className="w-full bg-gray-50 border border-gray-200 text-xs p-2 rounded focus:outline-none" />
        </div>
        <button type="submit" className="w-full bg-[#8c763e] text-white text-xs uppercase tracking-widest font-semibold py-3 rounded hover:bg-[#581c24] transition-all">Authorize Dispatch Allocation</button>
      </form>

      <div className="bg-white p-5 border border-gray-100 rounded h-fit space-y-4 shadow-3xs">
        <h3 className="font-serif text-base font-medium">Summary</h3>
        <div className="flex gap-2">
          <input type="text" placeholder="Promo Code" value={couponCode} onChange={(e)=>setCouponCode(e.target.value)} className="flex-1 bg-gray-50 border border-gray-200 text-xs px-3 rounded focus:outline-none" />
          <button type="button" onClick={handleApplyCoupon} className="bg-gray-100 text-gray-700 text-[10px] font-bold uppercase tracking-widest px-3 py-2 rounded">Apply</button>
        </div>
        <div className="space-y-1.5 text-xs pt-2 border-t border-gray-50">
          <div className="flex justify-between text-gray-500"><span>Gross Subtotal</span><span>Rs. {grossTotal.toLocaleString()}</span></div>
          <div className="flex justify-between font-bold text-sm text-[#581c24] pt-2 border-t border-gray-50"><span>Total Payable</span><span>Rs. {netTotal.toLocaleString()}</span></div>
        </div>
      </div>
    </div>
  );
};