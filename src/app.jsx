import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  PlusCircle, 
  ShoppingBag, 
  Trash2, 
  Camera, 
  MapPin, 
  X,
  CheckCircle2,
  Check,
  CreditCard,
  Sun,
  Moon,
  Mail,
  Recycle,
  Heart,
  Bike,
  ShieldCheck,
  ChevronLeft,
  ExternalLink,
  ShieldAlert,
  UserCheck,
  Terminal,
  Upload,
  MessageCircle,
  Phone,
  Instagram,
  Globe,
  Coffee
} from 'lucide-react';

const DEFAULT_AVATAR = "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix";

const INITIAL_CYCLES = [
  {
    id: 1,
    brand: "Hercules",
    model: "Roadeo A50",
    price: 4500,
    color: "Black",
    condition: "Good",
    seller: "Arjun V.",
    whatsapp: "6296039058",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=1000&auto=format&fit=crop",
    verified: true,
  },
  {
    id: 2,
    brand: "Btwin",
    model: "Rockrider ST10",
    price: 7200,
    color: "White",
    condition: "Like New",
    seller: "Sarthak",
    whatsapp: "6296039058",
    image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=1000&auto=format&fit=crop",
    verified: true,
  }
];

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [view, setView] = useState('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [cycles, setCycles] = useState(INITIAL_CYCLES);
  const [bag, setBag] = useState([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  
  const [adminAvatar, setAdminAvatar] = useState(DEFAULT_AVATAR);
  
  const [sellForm, setSellForm] = useState({ brand: '', model: '', price: '', whatsapp: '', color: '', condition: 'Good', image: null });
  const [handoverMethod, setHandoverMethod] = useState('cod');

  const [filters, setFilters] = useState({
    maxPrice: 20000,
    condition: 'All',
    brand: 'All',
    color: 'All'
  });

  useEffect(() => {
    const trigger = searchQuery.trim().toLowerCase();
    if (trigger === 'pixrad@2007') {
      setShowAuthModal(true);
      setSearchQuery('');
    }
  }, [searchQuery]);

  const handleLogin = () => {
    if (passwordInput === 'Pixrad@2007') {
      setIsAdmin(true);
      setShowAuthModal(false);
      setView('admin');
      setPasswordInput('');
    } else {
      setPasswordInput('');
    }
  };

  const toggleBag = (cycle) => {
    setBag(prevBag => {
      const isInBag = prevBag.find(item => item.id === cycle.id);
      if (isInBag) return prevBag.filter(item => item.id !== cycle.id);
      return [...prevBag, cycle];
    });
  };

  const removeFromBag = (id) => setBag(bag.filter(item => item.id !== id));

  const handleListing = (e) => {
    e.preventDefault();
    const newCycle = { 
      ...sellForm, 
      id: Date.now(), 
      verified: false, 
      seller: "Student User",
      image: sellForm.image || "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=1000&auto=format&fit=crop"
    };
    setCycles([newCycle, ...cycles]);
    setView('browse');
    setSellForm({ brand: '', model: '', price: '', whatsapp: '', color: '', condition: 'Good', image: null });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSellForm({ ...sellForm, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAdminAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const deleteCycle = (id) => setCycles(cycles.filter(c => c.id !== id));
  const toggleVerify = (id) => {
    setCycles(cycles.map(c => c.id === id ? { ...c, verified: !c.verified } : c));
  };

  const brandOptions = useMemo(() => ['All', ...new Set(cycles.map(c => c.brand))], [cycles]);
  const colorOptions = useMemo(() => ['All', ...new Set(cycles.map(c => c.color))], [cycles]);

  const filteredCycles = cycles.filter(c => {
    const matchesSearch = c.brand.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         c.model.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = Number(c.price) <= filters.maxPrice;
    const matchesCondition = filters.condition === 'All' || c.condition === filters.condition;
    const matchesBrand = filters.brand === 'All' || c.brand === filters.brand;
    const matchesColor = filters.color === 'All' || c.color === filters.color;
    return matchesSearch && matchesPrice && matchesCondition && matchesBrand && matchesColor;
  });

  const totalValue = bag.reduce((acc, curr) => acc + Number(curr.price), 0);

  const contactSupport = () => {
    const message = encodeURIComponent("Hi Support! I have a query regarding HostelCycles marketplace.");
    window.open(`https://wa.me/6296039058?text=${message}`, '_blank');
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ${isDarkMode ? 'bg-[#020617] text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 border-b backdrop-blur-xl ${isDarkMode ? 'bg-[#020617]/80 border-white/5' : 'bg-white/80 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 cursor-pointer group shrink-0" onClick={() => setView('browse')}>
            <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center shadow-lg shadow-yellow-500/20 transition-transform group-hover:scale-110">
              <Bike className="text-black w-5 h-5" />
            </div>
            <h1 className={`text-xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>HostelCycles</h1>
          </div>

          <div className="flex-1 flex items-center gap-4">
            <div className="hidden md:flex flex-1 max-w-2xl relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search cycles..."
                className={`w-full border rounded-2xl py-2.5 pl-11 pr-4 text-sm outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:ring-2 ring-yellow-500/50' : 'bg-slate-100 border-slate-200 text-slate-900 focus:ring-2 ring-yellow-500/30'}`}
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className={`relative w-14 h-8 rounded-full p-1 cursor-pointer transition-colors ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`} onClick={() => setIsDarkMode(!isDarkMode)}>
              <div className={`absolute top-1 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 transform ${isDarkMode ? 'translate-x-6 bg-slate-900' : 'translate-x-0 bg-white shadow-md'}`}>
                {isDarkMode ? <Moon size={14} className="text-yellow-400" /> : <Sun size={14} className="text-orange-500" />}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {isAdmin && (
               <button onClick={() => setView('admin')} className={`p-2 rounded-xl border border-yellow-500/20 text-yellow-500 ${view === 'admin' ? 'bg-yellow-500/10' : ''}`}>
                 <ShieldCheck size={20} />
               </button>
            )}
            <button onClick={() => setView('bag')} className={`relative p-2 active:scale-95 transition-colors ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>
              <ShoppingBag size={22} />
              {bag.length > 0 && <span className="absolute top-0 right-0 w-4 h-4 bg-orange-500 text-white text-[9px] font-bold flex items-center justify-center rounded-full ring-2 ring-inherit">{bag.length}</span>}
            </button>
            <button onClick={() => setView('sell')} className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 active:scale-95 transition-all">
              <PlusCircle size={18} /><span className="hidden sm:inline">List Cycle</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-20 max-w-7xl mx-auto px-6">
        {view === 'browse' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="relative h-20 rounded-[20px] overflow-hidden bg-gradient-to-br from-yellow-500 to-orange-500 px-8 flex flex-col justify-center shadow-2xl shadow-yellow-500/10 transition-all hover:shadow-yellow-500/20 group">
                <div className="flex items-center justify-between z-10">
                  <h2 className="text-2xl font-black text-black italic tracking-tighter group-hover:translate-x-1 transition-transform">Cycle Smarter.</h2>
                  <p className="text-black/80 text-[14px] font-bold text-right hidden sm:block">VIT's P2P marketplace for cycles</p>
                </div>
                <div className="absolute -bottom-6 -right-6 opacity-10 rotate-12 group-hover:scale-110 transition-transform duration-700">
                  <Bike size={100} className="text-black" />
                </div>
              </div>

              <div className={`relative h-20 border rounded-[20px] px-8 flex flex-col justify-center transition-all ${isDarkMode ? 'bg-[#0A0D1E] border-white/5' : 'bg-white border-slate-200 shadow-xl'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Recycle size={18} className="text-yellow-500" />
                    <h3 className="text-2xl font-black italic text-white tracking-tighter">Ready to Ride?</h3>
                  </div>
                  <span className="text-yellow-500 font-black uppercase tracking-[0.2em] text-[8px] hidden sm:block">Campus Safe Ecosystem with circular economy and sustainability kept in mind</span>
                </div>
              </div>
            </div>

            <div className={`border rounded-[32px] p-6 flex flex-wrap gap-6 items-end shadow-2xl transition-colors ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
              <div className="flex-1 min-w-[180px] space-y-3">
                <div className="flex justify-between items-center">
                  <label className={`text-[9px] uppercase tracking-widest font-black ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Budget Cap</label>
                  <span className="text-sm font-black text-yellow-500">₹{filters.maxPrice}</span>
                </div>
                <input 
                  type="range" min="500" max="20000" step="500"
                  className="w-full accent-yellow-500 h-1 bg-slate-700/30 rounded-lg cursor-pointer"
                  value={filters.maxPrice} onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                />
              </div>
              {[
                { label: 'Brand', key: 'brand', options: brandOptions },
                { label: 'Color', key: 'color', options: colorOptions },
                { label: 'Condition', key: 'condition', options: ['All', 'Like New', 'Good', 'Fair'] }
              ].map(filter => (
                <div key={filter.key} className="space-y-1.5">
                  <label className={`text-[9px] uppercase tracking-widest font-black ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{filter.label}</label>
                  <select 
                    className={`border rounded-xl px-4 py-2 text-xs font-bold outline-none focus:ring-2 ring-yellow-500/30 cursor-pointer min-w-[120px] transition-colors ${isDarkMode ? 'bg-slate-900 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                    value={filters[filter.key]} onChange={(e) => setFilters({...filters, [filter.key]: e.target.value})}
                  >
                    {filter.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCycles.map((cycle) => {
                const isInBag = bag.some(item => item.id === cycle.id);
                return (
                  <div key={cycle.id} className={`group border rounded-[40px] p-4 transition-all duration-500 ${isDarkMode ? 'bg-white/5 border-white/10 hover:border-white/20' : 'bg-white border-slate-200 hover:shadow-2xl'}`}>
                    <div className="aspect-[4/5] rounded-[32px] overflow-hidden mb-4 relative shadow-inner bg-slate-800">
                      <img src={cycle.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={cycle.model} />
                      {cycle.verified && <div className="absolute top-4 left-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-[9px] font-black flex items-center gap-1.5 shadow-2xl"><CheckCircle2 size={10} /> VERIFIED</div>}
                    </div>
                    <div className="px-2">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <h4 className="font-black text-lg leading-tight italic tracking-tighter">{cycle.brand}</h4>
                          <p className={`text-[10px] font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{cycle.model}</p>
                        </div>
                        <p className="text-yellow-500 font-black text-lg">₹{cycle.price}</p>
                      </div>
                      <div className="flex gap-2 mb-6">
                        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'bg-white/5 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>{cycle.color}</span>
                        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'bg-white/5 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>{cycle.condition}</span>
                      </div>
                      <button 
                        onClick={() => toggleBag(cycle)}
                        className={`w-full py-3.5 rounded-[22px] text-xs font-black flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg ${isInBag ? (isDarkMode ? "bg-white text-black" : "bg-slate-900 text-white") : "bg-yellow-500 text-black hover:bg-yellow-400"}`}
                      >
                        {isInBag ? <Check size={16} /> : <ShoppingBag size={16} />}
                        {isInBag ? "In Your Bag" : "Add to Bag"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {view === 'admin' && (
          <div className="space-y-8 animate-in slide-in-from-left-8 duration-500">
            <div className={`p-10 rounded-[56px] border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6 text-center md:text-left">
                  <div className="relative group">
                    <img src={adminAvatar} className="w-24 h-24 rounded-[40px] object-cover border-4 border-yellow-500 shadow-2xl" alt="Admin" />
                    <button onClick={() => document.getElementById('adminAvatarInput').click()} className="absolute -bottom-2 -right-2 bg-black text-yellow-500 p-2 rounded-xl shadow-xl hover:scale-110 transition-transform">
                      <Camera size={16} />
                    </button>
                    <input type="file" id="adminAvatarInput" hidden accept="image/*" onChange={handleAvatarUpload} />
                  </div>
                  <div>
                    <h2 className="text-4xl font-black italic tracking-tighter mb-1">Felix Pixrad</h2>
                    <p className="text-[10px] font-black uppercase text-yellow-500 tracking-[0.3em]">Lead Architect & System Admin</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setView('browse')} className="flex items-center gap-2 px-8 py-4 rounded-[24px] font-black text-sm border border-white/10 hover:bg-white/5 transition-colors">
                    <ChevronLeft size={18} /> Exit Admin
                  </button>
                </div>
              </div>
            </div>

            <div className={`border rounded-[56px] overflow-hidden ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className={`border-b ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50'}`}>
                    <th className="px-10 py-6 text-[10px] uppercase font-black tracking-widest text-slate-500">Listing Asset</th>
                    <th className="px-10 py-6 text-[10px] uppercase font-black tracking-widest text-slate-500 text-center">Value</th>
                    <th className="px-10 py-6 text-[10px] uppercase font-black tracking-widest text-slate-500 text-center">Protocol Status</th>
                    <th className="px-10 py-6 text-[10px] uppercase font-black tracking-widest text-slate-500 text-right">Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {cycles.map(c => (
                    <tr key={c.id} className="group hover:bg-white/5 transition-colors">
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-6">
                          <img src={c.image} className="w-16 h-16 rounded-2xl object-cover shadow-2xl" />
                          <div>
                            <p className="font-black text-lg italic leading-tight tracking-tighter">{c.brand} {c.model}</p>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">ID: {c.id.toString().slice(-6)} • Seller: {c.seller}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8 text-center font-black text-yellow-500 text-xl tracking-tighter">₹{c.price}</td>
                      <td className="px-10 py-8 text-center">
                        <button 
                          onClick={() => toggleVerify(c.id)}
                          className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${c.verified ? 'bg-green-500/10 text-green-500 border border-green-500/20 shadow-green-500/5' : 'bg-orange-500/10 text-orange-500 border border-orange-500/20'}`}
                        >
                          {c.verified ? <span className="flex items-center justify-center gap-2"><UserCheck size={12}/> Verified Active</span> : <span className="flex items-center justify-center gap-2"><ShieldAlert size={12}/> Security Pending</span>}
                        </button>
                      </td>
                      <td className="px-10 py-8 text-right">
                        <button onClick={() => deleteCycle(c.id)} className="p-4 text-slate-600 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all">
                          <Trash2 size={24} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {view === 'sell' && (
          <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className={`p-12 rounded-[64px] border ${isDarkMode ? 'bg-[#0A0D1E] border-white/5 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'}`}>
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-5xl font-black italic tracking-tighter mb-2">Sell Your Cycle.</h2>
                  <p className="text-[10px] font-black uppercase text-yellow-500 tracking-[0.2em]">Contact the admin for verification</p>
                </div>
                <button onClick={() => setView('browse')} className="p-4 rounded-3xl bg-white/5 text-slate-500 hover:text-red-500 transition-colors">
                  <X size={32} />
                </button>
              </div>

              <form onSubmit={handleListing} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 ml-4">Brand / Manufacturer</label>
                    <input required className={`w-full px-8 py-5 rounded-[28px] outline-none transition-all ${isDarkMode ? 'bg-white/5 focus:bg-white/10 text-white' : 'bg-slate-50 focus:bg-white text-slate-900 border'}`} placeholder="e.g. Hercules, Btwin" value={sellForm.brand} onChange={e => setSellForm({...sellForm, brand: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 ml-4">Model Name</label>
                    <input required className={`w-full px-8 py-5 rounded-[28px] outline-none transition-all ${isDarkMode ? 'bg-white/5 focus:bg-white/10 text-white' : 'bg-slate-50 focus:bg-white text-slate-900 border'}`} placeholder="e.g. Roadeo A50" value={sellForm.model} onChange={e => setSellForm({...sellForm, model: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 ml-4">Asking Price (₹)</label>
                      <input required type="number" className={`w-full px-8 py-5 rounded-[28px] outline-none transition-all ${isDarkMode ? 'bg-white/5 focus:bg-white/10 text-white' : 'bg-slate-50 focus:bg-white text-slate-900 border'}`} placeholder="4500" value={sellForm.price} onChange={e => setSellForm({...sellForm, price: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 ml-4">Color</label>
                      <input required className={`w-full px-8 py-5 rounded-[28px] outline-none transition-all ${isDarkMode ? 'bg-white/5 focus:bg-white/10 text-white' : 'bg-slate-50 focus:bg-white text-slate-900 border'}`} placeholder="Black" value={sellForm.color} onChange={e => setSellForm({...sellForm, color: e.target.value})} />
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 ml-4">Cycle Image</label>
                    <div onClick={() => document.getElementById('cycleUpload').click()} className={`h-48 rounded-[40px] border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden ${sellForm.image ? 'border-yellow-500/50' : (isDarkMode ? 'border-white/10 hover:border-yellow-500/30' : 'border-slate-200 hover:border-yellow-500/30')}`}>
                      {sellForm.image ? <img src={sellForm.image} className="w-full h-full object-cover" /> : <><Upload size={32} className="text-slate-600 mb-2" /><p className="text-xs font-black uppercase text-slate-500 tracking-widest">Click to Upload</p></>}
                      <input id="cycleUpload" type="file" hidden accept="image/*" onChange={handleImageUpload} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 ml-4">WhatsApp Connection</label>
                    <input required className={`w-full px-8 py-5 rounded-[28px] outline-none transition-all ${isDarkMode ? 'bg-white/5 focus:bg-white/10 text-white' : 'bg-slate-50 focus:bg-white text-slate-900 border'}`} placeholder="+91 XXX XXX XXXX" value={sellForm.whatsapp} onChange={e => setSellForm({...sellForm, whatsapp: e.target.value})} />
                  </div>
                  <button type="submit" className="w-full py-6 rounded-[32px] bg-yellow-500 text-black font-black text-xl shadow-2xl shadow-yellow-500/20 active:scale-95 transition-all">Publish Listing</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {view === 'bag' && (
          <div className="max-w-7xl mx-auto px-6 animate-in fade-in slide-in-from-right-8 duration-500">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-7 space-y-8">
                <h2 className="text-5xl font-black italic tracking-tighter mb-4">Bag.</h2>
                {bag.length === 0 ? (
                  <div className={`border rounded-[56px] p-24 text-center ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
                    <div className="bg-white/5 w-20 h-20 rounded-[32px] flex items-center justify-center mx-auto mb-8"><ShoppingBag size={40} className="text-slate-700" /></div>
                    <p className="text-slate-500 font-black text-xl mb-8 italic">Your cycle bag is empty</p>
                    <button onClick={() => setView('browse')} className="bg-yellow-500 text-black px-12 py-4 rounded-[28px] font-black text-base shadow-xl active:scale-95 transition-all">Find a Ride</button>
                  </div>
                ) : (
                  bag.map(item => (
                    <div key={item.id} className={`group border rounded-[48px] p-8 flex flex-col sm:flex-row gap-8 items-center ${isDarkMode ? 'bg-white/5 border-white/10 hover:border-white/20' : 'bg-white border-slate-200 shadow-xl'}`}>
                      <img src={item.image} className="w-32 h-32 rounded-[32px] object-cover shadow-2xl ring-4 ring-white/5" alt={item.model} />
                      <div className="flex-1 text-center sm:text-left">
                        <h4 className="text-2xl font-black italic tracking-tighter">{item.brand} {item.model}</h4>
                        <p className="text-yellow-500 font-black text-xl mt-1">₹{item.price}</p>
                        <div className="flex gap-2 mt-4 justify-center sm:justify-start">
                           <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{item.condition}</span>
                           <span className="text-slate-700">•</span>
                           <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{item.color}</span>
                        </div>
                      </div>
                      <button onClick={() => removeFromBag(item.id)} className="p-5 text-slate-600 hover:text-red-500 bg-white/5 rounded-3xl transition-all"><Trash2 size={28} /></button>
                    </div>
                  ))
                )}
              </div>

              {bag.length > 0 && (
                <div className={`lg:col-span-5 border rounded-[56px] p-10 transition-colors shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] ${isDarkMode ? 'bg-[#0A0D1E] border-white/5' : 'bg-white border-slate-200 shadow-2xl'}`}>
                  <h3 className="text-3xl font-black mb-10 italic tracking-tighter">Handover Flow</h3>
                  <div className="space-y-6 mb-12">
                    <div onClick={() => setHandoverMethod('cod')} className={`p-8 rounded-[40px] border-2 cursor-pointer transition-all flex items-center gap-6 group ${handoverMethod === 'cod' ? 'border-yellow-500 bg-yellow-500/5' : (isDarkMode ? 'border-white/5 hover:bg-white/5' : 'border-slate-100')}`}>
                      <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center transition-all ${handoverMethod === 'cod' ? 'bg-yellow-500 text-black shadow-2xl shadow-yellow-500/30' : 'bg-slate-800 text-slate-500'}`}><CreditCard size={32} /></div>
                      <div>
                        <p className="font-black text-xl italic tracking-tighter">UPI (contact seller after that)</p>
                        <p className={`text-xs font-bold tracking-wide italic mt-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Best for direct campus meetups</p>
                      </div>
                    </div>
                    <div onClick={() => setHandoverMethod('location')} className={`p-8 rounded-[40px] border-2 cursor-pointer transition-all flex items-center gap-6 group ${handoverMethod === 'location' ? 'border-yellow-500 bg-yellow-500/5' : (isDarkMode ? 'border-white/5 hover:bg-white/5' : 'border-slate-100')}`}>
                      <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center transition-all ${handoverMethod === 'location' ? 'bg-yellow-500 text-black shadow-2xl shadow-yellow-500/30' : 'bg-slate-800 text-slate-500'}`}><MapPin size={32} /></div>
                      <div>
                        <p className="font-black text-xl italic tracking-tighter">cash (contact seller after that)</p>
                        <p className={`text-xs font-bold tracking-wide italic mt-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>If seller is not in VIT anymore (placed/interning) then attempt a money order from post office, VIT. </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-end mb-10 px-4 pt-8 border-t border-white/5">
                    <div>
                      <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] mb-2">Checkout Total</p>
                      <p className="text-5xl font-black text-yellow-500 tracking-tighter italic">₹{totalValue}</p>
                    </div>
                  </div>
                  <button onClick={() => { const text = encodeURIComponent(`Hi, I'm interested in buying your cycle (${bag[0].brand} ${bag[0].model}) via HostelCycles!`); window.open(`https://wa.me/${bag[0].whatsapp}?text=${text}`, '_blank'); }} className="w-full py-6 rounded-[32px] bg-yellow-500 text-black font-black text-xl flex items-center justify-center gap-4 active:scale-95 transition-all shadow-2xl shadow-yellow-500/20">
                    <MessageCircle size={24} /> Contact Seller
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* FOOTER AREA */}
      <footer className={`mt-auto pt-24 pb-12 px-6 border-t transition-colors ${isDarkMode ? 'bg-[#020617] border-white/5' : 'bg-slate-50 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto">
          {/* Logo Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-yellow-500/20">
                <Bike className="text-black w-7 h-7" />
              </div>
              <div>
                <h2 className={`text-3xl font-black tracking-tighter italic ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>HostelCycles</h2>
                <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>VIT Vellore Student Hub</p>
              </div>
            </div>
            {/* Buy Me a Coffee Button */}
            <button 
              onClick={() => window.open('https://wa.me/6296039058?text=Hey! I really like HostelCycles. Coffee is on me! ☕', '_blank')}
              className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-500 font-black text-sm hover:bg-orange-500 hover:text-black transition-all active:scale-95 group shadow-lg shadow-orange-500/5"
            >
              <Coffee size={20} className="group-hover:rotate-12 transition-transform" />
              Buy me a coffee
            </button>
          </div>

          {/* Lead Support Section */}
          <div className={`p-10 rounded-[56px] border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'} mb-16`}>
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
              <div className="relative group shrink-0 self-center lg:self-start">
                <div className="w-32 h-32 rounded-[40px] overflow-hidden border-4 border-yellow-500 shadow-2xl">
                  <img 
                    src={adminAvatar} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                    alt="Lead Support" 
                    onError={(e) => e.target.src = DEFAULT_AVATAR}
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-black p-2 rounded-xl">
                  <Heart size={16} fill="currentColor" />
                </div>
              </div>
              <div className="flex-1 text-center lg:text-left">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-2">
                  <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Lead Support</span>
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'bg-white/10' : 'bg-slate-100'}`}>Chem-Eng 2028</span>
                </div>
                <h3 className="text-3xl font-black italic tracking-tighter mb-4">Dheemayee Bhadra</h3>
                <p className={`text-sm font-bold leading-relaxed max-w-xl ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Managing campus logistics, verification protocols, and student support. 
                  Reach out for listing approvals or marketplace assistance.
                </p>
                <div className="mt-8">
                  <button 
                    onClick={contactSupport}
                    className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-yellow-500 text-black rounded-3xl font-black text-sm active:scale-95 transition-all shadow-xl shadow-yellow-500/20"
                  >
                    <MessageCircle size={18} /> Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* System Credits */}
          <div className="flex items-start justify-start py-8 border-t border-white/5">
            <p className={`text-[10px] font-black uppercase tracking-[0.6em] transition-colors ${isDarkMode ? 'text-slate-800 hover:text-slate-600' : 'text-slate-300 hover:text-slate-400'}`}>
              PIXRAD LABS SYSTEM • MMXXIV
            </p>
          </div>
        </div>
      </footer>

      {/* Admin Gateway Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#020617]/95 backdrop-blur-3xl animate-in zoom-in-95 duration-300">
          <div className={`w-full max-w-md rounded-[64px] p-12 relative text-center shadow-[0_80px_160px_-20px_rgba(0,0,0,1)] border ${isDarkMode ? 'bg-[#0A0D1E] border-white/10' : 'bg-white border-slate-200'}`}>
            <button onClick={() => setShowAuthModal(false)} className="absolute top-10 right-10 text-slate-600 hover:text-red-500 transition-colors p-2 rounded-2xl hover:bg-white/5"><X size={28} /></button>
            <div className="w-16 h-16 bg-yellow-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8"><Terminal size={32} className="text-yellow-500" /></div>
            <div className="relative group w-36 h-36 mx-auto mb-10">
              <div className="w-full h-full rounded-[48px] overflow-hidden border-4 border-yellow-500 shadow-2xl relative ring-8 ring-yellow-500/10">
                <img src={adminAvatar} className="w-full h-full object-cover" alt="Admin Preview" />
              </div>
            </div>
            <h2 className="text-4xl font-black mb-1 italic tracking-tighter text-white">System Access.</h2>
            <p className="text-[10px] font-black text-slate-500 mb-10 uppercase tracking-[0.3em]">Administrator Privileges Required</p>
            <div className="space-y-4">
              <input type="password" placeholder="••••••••" className={`w-full rounded-[28px] px-8 py-5 outline-none focus:ring-4 ring-yellow-500/10 mb-2 text-2xl tracking-[0.3em] text-center font-mono ${isDarkMode ? 'bg-white/5 border border-white/10 text-white placeholder:text-slate-700' : 'bg-slate-100 border border-slate-200 text-slate-900'}`} value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleLogin()} autoFocus />
              <button onClick={handleLogin} className={`w-full py-5 rounded-[28px] font-black text-xl active:scale-95 transition-all shadow-xl ${isDarkMode ? 'bg-yellow-500 text-black hover:bg-yellow-400' : 'bg-slate-900 text-white'}`}>Unlock Terminal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
