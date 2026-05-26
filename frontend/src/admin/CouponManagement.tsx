import React, { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import type { Coupon } from '../App';

interface CouponProps { 
  coupons: Coupon[]; 
  setCoupons: React.Dispatch<React.SetStateAction<Coupon[]>>; 
}

export const CouponManagement: React.FC<CouponProps> = ({ coupons, setCoupons }) => {
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState('');

  return (
    <div className="max-w-md space-y-6">
      <div className="border-b border-gray-100 pb-2"><h3 className="text-lg font-bold">Promo Coupon Management Vault</h3></div>
      <div className="flex gap-2">
        <input placeholder="COUPONCODE" value={code} onChange={(e)=>setCode(e.target.value.toUpperCase())} className="bg-gray-50 border text-xs p-2 rounded flex-1 focus:outline-none" />
        <input placeholder="Discount %" type="number" value={discount} onChange={(e)=>setDiscount(e.target.value)} className="bg-gray-50 border text-xs p-2 rounded w-24 focus:outline-none" />
        <button onClick={()=>{ if(code && discount){ setCoupons((p) => [...p, {code, discount: Number(discount)}]); setCode(''); setDiscount(''); } }} className="bg-[#1e2229] text-[#bfa363] text-xs font-bold uppercase px-4 rounded hover:bg-[#bfa363] hover:text-gray-900 transition-all flex items-center gap-1"><PlusCircle size={14}/> Apply</button>
      </div>
      <div className="border border-gray-100 rounded divide-y divide-gray-50 bg-white">
        {coupons.map(c => (
          <div key={c.code} className="p-3 flex justify-between items-center text-xs">
            <span className="font-mono font-bold text-gray-800">{c.code} <strong className="text-emerald-700 font-sans font-medium text-[11px]">({c.discount}% Off)</strong></span>
            <button onClick={()=>setCoupons((p) => p.filter((x) => x.code !== c.code))} className="text-red-600 hover:text-red-800"><Trash2 size={13}/></button>
          </div>
        ))}
      </div>
    </div>
  );
};