import React from 'react';

export const AboutUs: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 space-y-8 text-center">
      <div className="space-y-2">
        <span className="text-xs uppercase tracking-[0.3em] text-[#8c763e] font-semibold block">The House Lore</span>
        <h2 className="font-serif text-3xl md:text-4xl font-light">Sculpting Precision Geometry</h2>
      </div>
      <p className="text-xs text-gray-500 font-light leading-relaxed max-w-xl mx-auto text-justify">
        Founded inside the historic cultural boundaries of Kathmandu, **DIVARA** is an architectural exploration of symmetry, astronomy, and rare metallurgy. Every component profile passing through our design workshop undergoes rigorous manual alignment validation under expert craftsmen.
      </p>
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pt-4 text-left">
        <div className="border border-gray-100 p-4 rounded bg-white"><h4 className="font-serif text-sm font-medium text-[#581c24]">Ethical Assay</h4><p className="text-[10px] text-gray-400 font-light mt-1">100% trace-verified conflict free diamonds.</p></div>
        <div className="border border-gray-100 p-4 rounded bg-white"><h4 className="font-serif text-sm font-medium text-[#581c24]">Pure Recycling</h4><p className="text-[10px] text-gray-400 font-light mt-1">Refined eco-conscious gold sourcing metrics.</p></div>
      </div>
    </div>
  );
};