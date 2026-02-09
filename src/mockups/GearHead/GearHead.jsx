import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Comprehensive Parts Database
const ALL_PARTS = [
    // Engine
    { id: 1, name: 'High-Flow Air Filter', category: 'Engine', zone: 'engine', price: 455, brand: 'K&N', stock: 'In Stock', image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=400&h=400&fit=crop&q=80' },
    { id: 2, name: 'Synthetic Motor Oil 5W-30', category: 'Engine', zone: 'engine', price: 320, brand: 'Mobil 1', stock: 'In Stock', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&q=80' },
    { id: 3, name: 'Performance Spark Plugs', category: 'Engine', zone: 'engine', price: 280, brand: 'NGK', stock: 'Low Stock', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=400&fit=crop&q=80' },
    // Brakes
    { id: 4, name: 'Ceramic Brake Pads', category: 'Brakes', zone: 'brakes', price: 899, brand: 'Brembo', stock: 'In Stock', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=400&fit=crop&q=80' },
    { id: 5, name: 'Brake Rotors (Pair)', category: 'Brakes', zone: 'brakes', price: 1250, brand: 'Brembo', stock: 'In Stock', image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=400&h=400&fit=crop&q=80' },
    { id: 6, name: 'Brake Fluid DOT 4', category: 'Brakes', zone: 'brakes', price: 180, brand: 'Castrol', stock: 'In Stock', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&q=80' },
    // Suspension
    { id: 7, name: 'Suspension Strut Assembly', category: 'Suspension', zone: 'suspension', price: 1550, brand: 'Monroe', stock: 'In Stock', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=400&fit=crop&q=80' },
    { id: 8, name: 'Coil Springs (Set)', category: 'Suspension', zone: 'suspension', price: 980, brand: 'Eibach', stock: 'In Stock', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=400&fit=crop&q=80' },
    // Electrical
    { id: 9, name: 'Performance Alternator', category: 'Electrical', zone: 'electrical', price: 2100, brand: 'Bosch', stock: 'In Stock', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=400&fit=crop&q=80' },
    { id: 10, name: 'LED Headlight Kit', category: 'Electrical', zone: 'electrical', price: 1200, brand: 'Philips', stock: 'In Stock', image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=400&fit=crop&q=80' },
    { id: 11, name: 'Car Battery 12V', category: 'Electrical', zone: 'electrical', price: 1450, brand: 'Optima', stock: 'Low Stock', image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=400&h=400&fit=crop&q=80' },
];

const ZONES = [
    { id: 'engine', name: 'Engine Bay', x: '35%', y: '40%', color: 'from-red-500 to-orange-500', icon: 'settings' },
    { id: 'brakes', name: 'Brakes', x: '20%', y: '70%', color: 'from-yellow-500 to-amber-500', icon: 'trip_origin' },
    { id: 'suspension', name: 'Suspension', x: '50%', y: '75%', color: 'from-blue-500 to-cyan-500', icon: 'swap_vert' },
    { id: 'electrical', name: 'Electrical', x: '65%', y: '35%', color: 'from-purple-500 to-pink-500', icon: 'bolt' },
];

const GearHead = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [activeZone, setActiveZone] = useState(null);

    // Filter parts based on search, category, and active zone
    const filteredParts = ALL_PARTS.filter(part => {
        const matchesSearch = part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            part.brand.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'All' || part.category === categoryFilter;
        const matchesZone = !activeZone || part.zone === activeZone;
        return matchesSearch && matchesCategory && matchesZone;
    });

    return (
        <div className="font-sans antialiased text-slate-900 bg-slate-950 min-h-screen">
            {/* Back to Portfolio */}
            <Link to="/" className="fixed bottom-8 right-8 z-50 bg-red-600 text-white px-6 py-3 rounded shadow-lg font-bold uppercase tracking-wider text-xs hover:bg-red-700 transition-colors">
                Exit Showcase
            </Link>

            {/* Header */}
            <header className="bg-slate-900 text-white border-b border-red-600/30 sticky top-0 z-40 shadow-xl">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-600 transform -skew-x-12 flex items-center justify-center font-black text-xl italic shadow-lg">G</div>
                        <span className="text-2xl font-black italic tracking-tighter uppercase">GearHead<span className="text-red-500">.</span></span>
                    </div>
                    <div className="flex gap-4">
                        <button className="text-sm font-bold uppercase text-slate-400 hover:text-white transition-colors hidden md:block">Parts</button>
                        <button className="bg-red-600 px-6 py-2 rounded text-sm font-bold uppercase hover:bg-red-700 transition-colors shadow-lg shadow-red-900/30">
                            Cart (0)
                        </button>
                    </div>
                </div>
            </header>

            {/* Vehicle Selector */}
            <section className="bg-slate-900 py-6 px-4 border-b border-slate-800">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row gap-3 items-center">
                        <span className="text-white font-bold text-sm uppercase tracking-wider whitespace-nowrap">Select Your Vehicle:</span>
                        <div className="flex-1 flex flex-col md:flex-row gap-2 w-full">
                            <select className="bg-slate-800 text-white p-3 rounded font-bold text-sm border border-slate-700 focus:border-red-500 focus:outline-none flex-1">
                                <option>Year</option>
                                <option>2024</option>
                                <option>2023</option>
                                <option>2022</option>
                            </select>
                            <select className="bg-slate-800 text-white p-3 rounded font-bold text-sm border border-slate-700 focus:border-red-500 focus:outline-none flex-1">
                                <option>Make</option>
                                <option>Ford</option>
                                <option>Toyota</option>
                                <option>BMW</option>
                            </select>
                            <select className="bg-slate-800 text-white p-3 rounded font-bold text-sm border border-slate-700 focus:border-red-500 focus:outline-none flex-1">
                                <option>Model</option>
                                <option>F-150</option>
                                <option>Camry</option>
                            </select>
                            <button className="bg-red-600 text-white font-black uppercase tracking-widest px-8 py-3 rounded hover:bg-red-700 transition-colors shadow-lg">
                                Go
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Layout: Diagram + Products */}
            <div className="flex flex-col lg:flex-row min-h-screen">

                {/* LEFT: Interactive Diagram (Sticky) */}
                <div className="lg:w-2/5 bg-slate-900 border-b lg:border-b-0 lg:border-r border-slate-800 lg:sticky lg:top-[73px] lg:h-[calc(100vh-73px)] overflow-hidden">
                    <div className="p-4 md:p-6 border-b border-slate-800">
                        <h2 className="text-lg md:text-xl font-black text-white uppercase mb-1">Browse by Component</h2>
                        <p className="text-slate-400 text-xs md:text-sm">Click zones to filter parts</p>
                    </div>

                    <div className="p-4 md:p-6">
                        <div className="relative aspect-[4/3] bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
                            {/* Grid Background */}
                            <div className="absolute inset-0 opacity-5">
                                <div className="w-full h-full" style={{
                                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                                    backgroundSize: '40px 40px'
                                }}></div>
                            </div>

                            {/* Car Silhouette */}
                            <div className="absolute inset-0 flex items-center justify-center p-12">
                                <svg viewBox="0 0 800 400" className="w-full h-full opacity-10">
                                    <path d="M 100 250 L 150 200 L 250 180 L 400 180 L 550 180 L 650 200 L 700 250 L 680 280 L 650 280 L 640 300 L 600 300 L 590 280 L 210 280 L 200 300 L 160 300 L 150 280 L 120 280 Z"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        className="text-slate-700"
                                    />
                                    <circle cx="220" cy="300" r="30" fill="none" stroke="currentColor" strokeWidth="3" className="text-slate-700" />
                                    <circle cx="620" cy="300" r="30" fill="none" stroke="currentColor" strokeWidth="3" className="text-slate-700" />
                                </svg>
                            </div>

                            {/* Hoverable Zones */}
                            {ZONES.map((zone) => (
                                <motion.button
                                    key={zone.id}
                                    onClick={() => setActiveZone(activeZone === zone.id ? null : zone.id)}
                                    onMouseEnter={() => setActiveZone(zone.id)}
                                    className="absolute cursor-pointer group"
                                    style={{ left: zone.x, top: zone.y, transform: 'translate(-50%, -50%)' }}
                                >
                                    <motion.div
                                        animate={{
                                            scale: activeZone === zone.id ? [1, 1.3, 1] : 1,
                                            opacity: activeZone === zone.id ? [0.5, 0, 0.5] : 0.3,
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className={`absolute w-24 h-24 rounded-full bg-gradient-to-br ${zone.color} blur-xl -z-10`}
                                    />

                                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${zone.color} flex items-center justify-center shadow-2xl border-4 transition-all duration-300 ${activeZone === zone.id ? 'scale-125 border-white' : 'border-slate-900'}`}>
                                        <span className="material-symbols-outlined text-white text-2xl">{zone.icon}</span>
                                    </div>

                                    <div className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-800 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-opacity ${activeZone === zone.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                        {zone.name}
                                    </div>
                                </motion.button>
                            ))}
                        </div>

                        {/* Active Zone Info */}
                        <AnimatePresence mode="wait">
                            {activeZone ? (
                                <motion.div
                                    key={activeZone}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="mt-4 bg-slate-800 rounded-lg p-4 border border-slate-700"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Filtering by:</div>
                                            <div className="text-white font-black uppercase">{ZONES.find(z => z.id === activeZone)?.name}</div>
                                        </div>
                                        <button
                                            onClick={() => setActiveZone(null)}
                                            className="text-slate-400 hover:text-white transition-colors"
                                        >
                                            <span className="material-symbols-outlined">close</span>
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="default"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mt-4 text-center py-6"
                                >
                                    <p className="text-slate-500 text-sm font-bold uppercase tracking-widest animate-pulse">
                                        Hover or Click Zones
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* RIGHT: Products Grid */}
                <div className="lg:w-3/5 bg-slate-50">
                    <div className="p-4 md:p-6 space-y-4 md:space-y-6">

                        {/* Search + Filters */}
                        <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    placeholder="Search parts or brands..."
                                    className="w-full pl-4 pr-12 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none placeholder:text-slate-400 text-sm font-medium bg-white"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-lg">search</span>
                            </div>
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="bg-white border border-slate-300 p-3 rounded-lg font-bold text-sm focus:ring-2 focus:ring-red-600 focus:outline-none"
                            >
                                <option value="All">All Categories</option>
                                <option>Engine</option>
                                <option>Brakes</option>
                                <option>Suspension</option>
                                <option>Electrical</option>
                            </select>
                        </div>

                        {/* Results Count */}
                        <div className="flex items-center justify-between">
                            <div className="text-slate-600 text-sm font-bold">
                                Showing {filteredParts.length} of {ALL_PARTS.length} parts
                            </div>
                            {(searchTerm || categoryFilter !== 'All' || activeZone) && (
                                <button
                                    onClick={() => { setSearchTerm(''); setCategoryFilter('All'); setActiveZone(null); }}
                                    className="text-red-600 text-sm font-bold hover:underline"
                                >
                                    Clear Filters
                                </button>
                            )}
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                            {filteredParts.length > 0 ? filteredParts.map(part => (
                                <motion.div
                                    key={part.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="bg-white rounded-lg border border-slate-200 hover:border-red-600 hover:shadow-lg transition-all group overflow-hidden"
                                >
                                    <div className="aspect-square bg-slate-50 relative p-4 flex items-center justify-center">
                                        <img src={part.image} alt={part.name} className="max-h-full mix-blend-multiply opacity-70 group-hover:opacity-100 transition-opacity" />
                                        <span className={`absolute top-2 right-2 text-[10px] uppercase font-bold px-2 py-1 rounded ${part.stock === 'In Stock' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                            {part.stock}
                                        </span>
                                    </div>
                                    <div className="p-4">
                                        <div className="text-[10px] text-slate-400 uppercase font-black tracking-wider mb-1">{part.category}</div>
                                        <h3 className="font-bold text-slate-800 leading-tight mb-1 group-hover:text-red-600 transition-colors">{part.name}</h3>
                                        <div className="text-xs text-slate-500 mb-4">by <span className="font-semibold text-slate-700">{part.brand}</span></div>
                                        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                                            <span className="text-2xl font-black text-slate-900">P{part.price}</span>
                                            <button className="bg-slate-900 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors flex items-center gap-1 text-sm font-bold">
                                                <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )) : (
                                <div className="col-span-full py-16 text-center">
                                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="material-symbols-outlined text-slate-400 text-4xl">search_off</span>
                                    </div>
                                    <p className="text-lg font-bold text-slate-700 mb-2">No parts found</p>
                                    <p className="text-slate-500 text-sm mb-4">Try adjusting your filters or search term</p>
                                    <button
                                        onClick={() => { setSearchTerm(''); setCategoryFilter('All'); setActiveZone(null); }}
                                        className="text-red-600 underline text-sm font-bold hover:text-red-700"
                                    >
                                        Clear All Filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GearHead;
