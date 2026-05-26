import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, Heart, User, ShoppingBag, MapPin, Grid, Layers, 
  Users, Image, Ticket, Package, BarChart3
} from 'lucide-react';

// Import Storefront Components
import { Home } from './pages/Home';
import { Collection } from './pages/Collection';
import { ProductDetails } from './pages/ProductDetails';
import { Wishlist } from './pages/Wishlist';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { LoginRegister } from './pages/LoginRegister';
import { UserProfile } from './pages/UserProfile';
import { Orders } from './pages/Orders';
import { AboutUs } from './pages/AboutUs';
import { ContactUs } from './pages/ContactUs';

// Import Administrative Panels Components
import { DashboardAnalytics } from './admin/DashboardAnalytics';
import { ProductCrud } from './admin/ProductCrud';
import { CategoryCrud } from './admin/CategoryCrud';
import { OrderManagement } from './admin/OrderManagement';
import { UserManagement } from './admin/UserManagement';
import { BannerManagement } from './admin/BannerManagement';
import { CouponManagement } from './admin/CouponManagement';
import { InventoryManagement } from './admin/InventoryManagement';

// Global Data Matrix types
export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  occasion: string;
  imageUrl: string;
  price: number;
  purity: string;
  stock: number;
}

export interface Coupon {
  code: string;
  discount: number;
}

export default function App() {
  // Global Shared States for Prototype Demonstration
  const [cart, setCart] = useState<{product: Product, quantity: number}[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Global Mock Product Ledger matching Nepalese Luxury Archetypes
  const [globalProducts, setGlobalProducts] = useState<Product[]>([
    { id: "1", name: "Aurelia Solis Jantar Pendant", description: "Traditional Nepali carving motifs met with modern structural design. Handcrafted with 24K pure fine gold framing a high-clarity diamond cluster.", category: "Necklaces", occasion: "Wedding", imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80", price: 345000, purity: "24K Fine", stock: 3 },
    { id: "2", name: "Celestial Moon-Phase Band", description: "Sleek, polished luxury profile mapping traditional geometric moon cycles. Perfectly balanced wedding ring band.", category: "Rings", occasion: "Daily Wear", imageUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80", price: 45000, purity: "22K Gold", stock: 8 },
    { id: "3", name: "Astral Radiant Jhumkas", description: "Stunning dangling drops balancing heritage filigree styling with contemporary lightweight solitaire settings.", category: "Earrings", occasion: "Wedding", imageUrl: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=600&q=80", price: 185000, purity: "22K Gold", stock: 4 },
    { id: "4", name: "Elysian Diamond Solitaire Studs", description: "Brilliant cut natural diamonds set tightly against an elegant, minimalist 18K white gold crown layout.", category: "Earrings", occasion: "Daily Wear", imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80", price: 95000, purity: "18K Gold", stock: 12 }
  ]);

  const [categories, setCategories] = useState<string[]>(['Rings', 'Necklaces', 'Earrings']);
  const [coupons, setCoupons] = useState<Coupon[]>([
    { code: "DIVARANEW", discount: 10 },
    { code: "FESTIVEरु", discount: 15 }
  ]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) return prev.map(item => item.product.id === product.id ? {...item, quantity: item.quantity + 1} : item);
      return [...prev, { product, quantity: 1 }];
    });
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => prev.some(p => p.id === product.id) ? prev.filter(p => p.id !== product.id) : [...prev, product]);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* --- PUBLIC SITE ROUTING MODULE --- */}
        <Route path="/*" element={
          <PublicLayout searchQuery={searchQuery} setSearchQuery={setSearchQuery} cartCount={cart.reduce((a,c)=>a+c.quantity,0)} wishlistCount={wishlist.length}>
            <Routes>
              <Route path="/" element={<Home products={globalProducts} toggleWishlist={toggleWishlist} addToCart={addToCart} searchQuery={searchQuery} />} />
              <Route path="/collection" element={<Collection products={globalProducts} toggleWishlist={toggleWishlist} addToCart={addToCart} />} />
              <Route path="/product/:id" element={<ProductDetails products={globalProducts} addToCart={addToCart} toggleWishlist={toggleWishlist} />} />
              <Route path="/wishlist" element={<Wishlist wishlist={wishlist} addToCart={addToCart} toggleWishlist={toggleWishlist} />} />
              <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
              <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} coupons={coupons} />} />
              <Route path="/login" element={<LoginRegister />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
            </Routes>
          </PublicLayout>
        } />

        {/* --- ADMIN PANEL ROUTING MODULE --- */}
        <Route path="/admin/*" element={
          <AdminLayout>
            <Routes>
              <Route path="dashboard" element={<DashboardAnalytics products={globalProducts} />} />
              <Route path="products" element={<ProductCrud products={globalProducts} setProducts={setGlobalProducts} categories={categories} />} />
              <Route path="categories" element={<CategoryCrud categories={categories} setCategories={setCategories} />} />
              <Route path="orders" element={<OrderManagement />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="banners" element={<BannerManagement />} />
              <Route path="coupons" element={<CouponManagement coupons={coupons} setCoupons={setCoupons} />} />
              <Route path="inventory" element={<InventoryManagement products={globalProducts} setProducts={setGlobalProducts} />} />
            </Routes>
          </AdminLayout>
        } />
      </Routes>
    </BrowserRouter>
  );
}

// --- SHARED FRONTEND WRAPPER LAYOUT ---
interface PublicLayoutProps { children: React.ReactNode; searchQuery: string; setSearchQuery: (s: string) => void; cartCount: number; wishlistCount: number; }
const PublicLayout: React.FC<PublicLayoutProps> = ({ children, searchQuery, setSearchQuery, cartCount, wishlistCount }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#fbfaf7] min-h-screen text-[#1a1a1a] font-sans antialiased flex flex-col justify-between">
      <div>
        {/* Tanishq-Inspired Market Live Ticker Bar */}
        <div className="bg-[#1a1a1a] text-[#fbfaf7] py-2 px-6 text-[10px] sm:text-[11px] tracking-widest uppercase border-b border-[#bfa363]/20 font-light">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 items-center">
              <span className="text-[#bfa363] font-medium animate-pulse">● LIVE FENEGOSIDA RATE:</span>
              <span>24K Gold: <strong>Rs. 293,700</strong></span>
              <span>22K Gold: <strong>Rs. 293,100</strong></span>
              <span>Silver: <strong>Rs. 5,115</strong></span>
            </div>
            <div className="hidden lg:flex items-center space-x-4 text-gray-400">
              <span className="flex items-center gap-1"><MapPin size={12} className="text-[#bfa363]" /> Kathmandu Showroom</span>
              <span>| 100% BIS Hallmarked Purity Assurance</span>
            </div>
          </div>
        </div>

        {/* Global Front Office Navigation Header */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 px-6 py-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-6 w-full md:w-auto justify-between md:justify-start">
              <Link to="/" className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-[#581c24] rounded-full flex items-center justify-center text-white font-serif font-bold text-xs">D</div>
                <span className="font-serif text-xl font-semibold tracking-[0.25em] text-[#8c763e]">DIVARA</span>
              </Link>
              <div className="flex space-x-4 text-xs uppercase tracking-widest font-semibold text-gray-600">
                <Link to="/collection" className="hover:text-[#8c763e] transition-colors">Collection</Link>
                <Link to="/about" className="hover:text-[#8c763e] transition-colors">About</Link>
                <Link to="/contact" className="hover:text-[#8c763e] transition-colors">Contact</Link>
              </div>
            </div>

            {/* Search Routing Input */}
            <div className="relative w-full md:w-1/3">
              <input 
                type="text" 
                placeholder="Search matching gold carats, jhumkas, bands..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); navigate('/'); }}
                className="w-full bg-gray-50 border border-gray-200 rounded-full py-1.5 px-4 pl-10 text-xs focus:outline-none focus:border-[#8c763e] focus:bg-white text-[#1a1a1a]"
              />
              <Search className="absolute left-3.5 top-2.5 text-gray-400" size={13} />
            </div>

            {/* Account Management & Cart Actions Group */}
            <div className="flex items-center space-x-5 text-gray-700">
              <Link to="/wishlist" className="relative hover:text-[#581c24]">
                <Heart size={18} />
                {wishlistCount > 0 && <span className="absolute -top-1.5 -right-2 bg-[#581c24] text-white text-[8px] h-3.5 w-3.5 rounded-full flex items-center justify-center font-bold">{wishlistCount}</span>}
              </Link>
              <Link to="/cart" className="relative hover:text-[#8c763e]">
                <ShoppingBag size={18} />
                {cartCount > 0 && <span className="absolute -top-1.5 -right-2 bg-[#8c763e] text-white text-[8px] h-3.5 w-3.5 rounded-full flex items-center justify-center font-bold">{cartCount}</span>}
              </Link>
              <Link to="/login" className="hover:text-[#8c763e]"><User size={18} /></Link>
              <Link to="/admin/dashboard" className="text-[10px] border border-gray-300 text-gray-500 rounded px-2 py-0.5 hover:bg-gray-50 transition-all font-medium uppercase tracking-wider">Staff Desk</Link>
            </div>
          </div>
        </header>

        <div>{children}</div>
      </div>

      <footer className="bg-white border-t border-gray-100 py-8 text-center text-[10px] text-gray-400 tracking-widest uppercase">
        © 2026 DIVARA ATELIER INC. KATHMANDU, NEPAL. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
};

// --- SHARED BACKEND WRAPPER LAYOUT ---
const AdminLayout: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const location = useLocation();
  const menuItems = [
    { path: '/admin/dashboard', label: 'Analytics Hub', icon: <BarChart3 size={15} /> },
    { path: '/admin/products', label: 'Product Manager', icon: <Grid size={15} /> },
    { path: '/admin/categories', label: 'Category Matrix', icon: <Layers size={15} /> },
    { path: '/admin/orders', label: 'Order Processing', icon: <ShoppingBag size={15} /> },
    { path: '/admin/users', label: 'User Database', icon: <Users size={15} /> },
    { path: '/admin/banners', label: 'Banner System', icon: <Image size={15} /> },
    { path: '/admin/coupons', label: 'Coupon Vault', icon: <Ticket size={15} /> },
    { path: '/admin/inventory', label: 'Stock Audits', icon: <Package size={15} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col md:flex-row">
      {/* Admin Sidebar Panel */}
      <aside className="w-full md:w-64 bg-[#1e2229] text-gray-300 flex flex-col justify-between p-4 flex-shrink-0">
        <div className="space-y-6">
          <div className="flex items-center space-x-3 border-b border-gray-700/60 pb-4">
            <div className="h-7 w-7 bg-[#bfa363] text-gray-900 rounded flex items-center justify-center font-bold text-xs">A</div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">DIVARA CONTROL</h4>
              <span className="text-[10px] uppercase text-gray-400 tracking-widest font-semibold">Store Management Suite</span>
            </div>
          </div>

          <nav className="space-y-1">
            {menuItems.map(item => {
              const active = location.pathname === item.path;
              return (
                <Link 
                  key={item.path} 
                  to={item.path} 
                  className={`flex items-center space-x-3 px-3 py-2 rounded text-xs transition-all ${active ? 'bg-[#bfa363] text-gray-900 font-bold shadow-sm' : 'hover:bg-gray-800/60 text-gray-400 hover:text-white'}`}
                >
                  {item.icon} <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-gray-700/60 flex items-center justify-between text-[10px] text-gray-500 uppercase tracking-wider font-medium">
          <span>Role: Head Admin</span>
          <Link to="/" className="text-[#bfa363] hover:underline">Exit Desk →</Link>
        </div>
      </aside>

      {/* Main Console Content View */}
      <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full overflow-x-hidden">
        <div className="bg-white rounded border border-gray-200/80 p-6 min-h-[80vh] shadow-3xs">{children}</div>
      </main>
    </div>
  );
};