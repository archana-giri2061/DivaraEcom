import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export const ContactUs: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-1 space-y-4 bg-white p-5 border border-gray-100 rounded shadow-3xs">
        <h3 className="font-serif text-xl font-medium text-gray-900">Boutique Desks</h3>
        <p className="text-xs text-gray-400 font-light leading-relaxed">Reach out to coordinate virtual configurations consultations with a diamond specialist.</p>
        <div className="space-y-3 text-xs text-gray-600 pt-4 border-t border-gray-50">
          <p className="flex items-center gap-2"><Phone size={13} className="text-[#8c763e]"/> +977-1-4428391</p>
          <p className="flex items-center gap-2"><Mail size={13} className="text-[#8c763e]"/> atelier@divara.com</p>
          <p className="flex items-center gap-2"><MapPin size={13} className="text-[#8c763e]"/> Gairidhara, Kathmandu</p>
        </div>
      </div>
      <form onSubmit={(e)=>e.preventDefault()} className="md:col-span-2 bg-white p-5 border border-gray-100 rounded space-y-4 shadow-3xs">
        <h4 className="font-serif text-base font-medium">Leave an Inquiry Note</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input placeholder="Your Name" type="text" className="bg-gray-50 border border-gray-200 text-xs p-2 rounded focus:outline-none" />
          <input placeholder="Email Address" type="email" className="bg-gray-50 border border-gray-200 text-xs p-2 rounded focus:outline-none" />
        </div>
        <textarea rows={4} placeholder="Describe the structural collection design profile you require..." className="w-full bg-gray-50 border border-gray-200 text-xs p-2 rounded focus:outline-none" />
        <button className="bg-[#1a1a1a] text-white text-xs uppercase tracking-widest font-semibold px-6 py-2.5 rounded hover:bg-[#8c763e] transition-all">Submit Inquiry</button>
      </form>
    </div>
  );
};