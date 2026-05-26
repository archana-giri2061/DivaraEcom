import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const AdminDashboard: React.FC = () => {
  const { token, user } = useAuth();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Rings');
  const [imageUrl, setImageUrl] = useState('');
  
  // Single Variant Addition Form State
  const [sku, setSku] = useState('');
  const [weight, setWeight] = useState(0);
  const [purity, setPurity] = useState('22 Karat');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  if (!user || user.role !== 'admin') {
    return <div className="p-12 text-center text-red-600 font-medium">Access Denied. Elevated Administrative Privilege Clearance Required.</div>;
  }

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name,
      description,
      category,
      imageUrl,
      variants: [{ sku, metalWeight: weight, metalPurity: purity, price, stockQuantity: stock }]
    };

    const res = await fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      alert("Premium inventory catalog asset initialized successfully.");
      setName(''); setDescription(''); setImageUrl(''); setSku('');
    } else {
      alert("Failed to write inventory metrics to structural backend nodes.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-12 bg-white p-8 border border-gray-100 rounded-lg shadow-sm">
      <h2 className="font-serif text-3xl text-luxury-gold mb-6 border-b pb-3">Divara Vault Management</h2>
      <form onSubmit={handleCreateProduct} className="space-y-5 text-sm">
        <div>
          <label className="block font-medium mb-1 text-gray-700">Jewelry Core Design Title</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-2 rounded focus:outline-luxury-gold" required />
        </div>
        <div>
          <label className="block font-medium mb-1 text-gray-700">Artisan Narrative Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border p-2 rounded h-24 focus:outline-luxury-gold" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1 text-gray-700">Classification Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border p-2 rounded bg-white">
              <option>Rings</option>
              <option>Necklaces</option>
              <option>Bangles</option>
              <option>Earrings</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-700">High Resolution Image Resource URL</label>
            <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full border p-2 rounded focus:outline-luxury-gold" required />
          </div>
        </div>

        <div className="border-t pt-4 mt-6">
          <h3 className="font-serif text-xl text-luxury-charcoal mb-3">Primary Batch Variant Properties</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1 text-gray-700">Internal Vault SKU Reference</label>
              <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} className="w-full border p-2 rounded" required />
            </div>
            <div>
              <label className="block font-medium mb-1 text-gray-700">Metal Composition Assay Purity</label>
              <input type="text" value={purity} onChange={(e) => setPurity(e.target.value)} className="w-full border p-2 rounded" required />
            </div>
            <div>
              <label className="block font-medium mb-1 text-gray-700">Gross Weight (grams)</label>
              <input type="number" step="0.01" onChange={(e) => setWeight(parseFloat(e.target.value))} className="w-full border p-2 rounded" required />
            </div>
            <div>
              <label className="block font-medium mb-1 text-gray-700">Base Cost Listing (USD)</label>
              <input type="number" onChange={(e) => setPrice(parseFloat(e.target.value))} className="w-full border p-2 rounded" required />
            </div>
          </div>
          <div className="mt-4">
            <label className="block font-medium mb-1 text-gray-700">Vault Allocation Reserve Stock Quantity</label>
            <input type="number" onChange={(e) => setStock(parseInt(e.target.value))} className="w-full border p-2 rounded w-1/2" required />
          </div>
        </div>

        <button type="submit" className="w-full bg-luxury-gold text-white tracking-widest font-medium p-3 rounded mt-6 uppercase hover:bg-luxury-charcoal transition-colors">
          Publish Design Asset to Public Gallery
        </button>
      </form>
    </div>
  );
};