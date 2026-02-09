import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion';

const MENU_CATEGORIES = ['Starters', 'Mains', 'Steaks', 'Desserts', 'Cocktails'];

const MENU_ITEMS = {
    Starters: [
        {
            id: 's1',
            name: 'Wagyu Beef Carpaccio',
            price: 'P240',
            desc: 'Truffle oil, parmesan shavings, capers.',
            image: 'https://images.unsplash.com/photo-1546241072-48010ad2862c?w=1400&fit=crop',
            prep: '8 min',
            heat: 'Mild',
            badge: 'Signature',
            featured: true,
        },
        {
            id: 's2',
            name: 'Pan-Seared Scallops',
            price: 'P220',
            desc: 'Cauliflower puree, crispy pancetta.',
            image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=1400&fit=crop',
            prep: '10 min',
            heat: 'None',
            badge: 'Chef Pick',
            featured: false,
        },
        {
            id: 's3',
            name: 'Burrata & Heirloom',
            price: 'P190',
            desc: 'Basil pesto, balsamic glaze, sourdough.',
            image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=1400&fit=crop',
            prep: '7 min',
            heat: 'None',
            badge: 'Fresh',
            featured: false,
        },
    ],
    Mains: [
        {
            id: 'm1',
            name: 'Miso Glazed Black Cod',
            price: 'P420',
            desc: 'Bok choy, ginger dashi broth.',
            image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=1400&fit=crop',
            prep: '18 min',
            heat: 'Mild',
            badge: 'Popular',
            featured: true,
        },
        {
            id: 'm2',
            name: 'Herb-Crusted Lamb Rack',
            price: 'P380',
            desc: 'Fondant potato, red wine jus.',
            image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=1400&fit=crop',
            prep: '22 min',
            heat: 'Medium',
            badge: 'House Special',
            featured: false,
        },
        {
            id: 'm3',
            name: 'Wild Mushroom Risotto',
            price: 'P320',
            desc: 'Porcini dust, truffle oil, parmesan crisp.',
            image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=1400&fit=crop',
            prep: '16 min',
            heat: 'None',
            badge: 'Vegetarian',
            featured: false,
        },
    ],
    Steaks: [
        {
            id: 'st1',
            name: 'Ribeye (12oz)',
            price: 'P550',
            desc: 'Dry-aged 45 days, grass-fed.',
            image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1400&fit=crop',
            prep: '24 min',
            heat: 'Custom',
            badge: 'Prime Cut',
            featured: true,
        },
        {
            id: 'st2',
            name: 'Fillet Mignon (8oz)',
            price: 'P620',
            desc: 'Center cut, tender and lean.',
            image: 'https://images.unsplash.com/photo-1558030006-4b50986be430?w=1400&fit=crop',
            prep: '20 min',
            heat: 'Custom',
            badge: 'Premium',
            featured: false,
        },
    ],
    Desserts: [
        {
            id: 'd1',
            name: 'Dark Chocolate Fondant',
            price: 'P160',
            desc: 'Salted caramel center, vanilla bean ice cream.',
            image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=1400&fit=crop',
            prep: '9 min',
            heat: 'Warm',
            badge: 'Top Rated',
            featured: true,
        },
        {
            id: 'd2',
            name: 'Lemon Basil Tart',
            price: 'P140',
            desc: 'Italian meringue, raspberry coulis.',
            image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=1400&fit=crop',
            prep: '7 min',
            heat: 'Chilled',
            badge: 'Seasonal',
            featured: false,
        },
    ],
    Cocktails: [
        {
            id: 'c1',
            name: 'Smoked Old Fashioned',
            price: 'P180',
            desc: 'Bourbon, maple syrup, angostura bitters, oak smoke.',
            image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1400&fit=crop',
            prep: '6 min',
            heat: 'Smoked',
            badge: 'Classic',
            featured: true,
        },
        {
            id: 'c2',
            name: 'Lychee Martini',
            price: 'P160',
            desc: 'Vodka, lychee liqueur, lime juice.',
            image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=1400&fit=crop',
            prep: '5 min',
            heat: 'Cold',
            badge: 'Signature',
            featured: false,
        },
    ],
};

const FLUID = {
    fast: 0.22,
    base: 0.36,
    slow: 0.55,
    ease: [0.22, 1, 0.36, 1],
};

const Savor = () => {
    const prefersReducedMotion = useReducedMotion();
    const [activeCategory, setActiveCategory] = useState('Mains');
    const [selectedDishId, setSelectedDishId] = useState(MENU_ITEMS.Mains[0].id);
    const [isReservationOpen, setIsReservationOpen] = useState(false);
    const [bookingStep, setBookingStep] = useState('form');
    const [guestCount, setGuestCount] = useState(2);

    const activeItems = MENU_ITEMS[activeCategory];

    const selectedItem = useMemo(
        () => activeItems.find((item) => item.id === selectedDishId) ?? activeItems[0],
        [activeItems, selectedDishId],
    );

    const handleBookingSubmit = (event) => {
        event.preventDefault();
        setBookingStep('success');
    };

    return (
        <div className="font-serif bg-stone-950 text-stone-100 min-h-screen selection:bg-orange-500 selection:text-white relative overflow-hidden">
            <motion.div
                aria-hidden
                className="pointer-events-none absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-orange-500/10 blur-[120px]"
                animate={prefersReducedMotion ? {} : { x: [0, 35, -20, 0], y: [0, -18, 24, 0] }}
                transition={prefersReducedMotion ? {} : { duration: 18, ease: 'easeInOut', repeat: Infinity }}
            />
            <motion.div
                aria-hidden
                className="pointer-events-none absolute -bottom-24 -right-20 w-[460px] h-[460px] rounded-full bg-amber-400/10 blur-[120px]"
                animate={prefersReducedMotion ? {} : { x: [0, -25, 20, 0], y: [0, 22, -18, 0] }}
                transition={prefersReducedMotion ? {} : { duration: 20, ease: 'easeInOut', repeat: Infinity }}
            />

            <Link to="/" className="fixed bottom-8 right-8 z-50 bg-orange-600/90 text-white px-6 py-3 rounded-full shadow-lg font-sans font-bold uppercase tracking-wider text-xs hover:bg-orange-500 transition-colors backdrop-blur-sm">
                Exit Showcase
            </Link>

            <nav className="fixed w-full z-40 px-6 md:px-8 py-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent text-white pointer-events-none">
                <span className="text-3xl font-black tracking-tighter pointer-events-auto">SAVOR.</span>
                <button
                    onClick={() => { setIsReservationOpen(true); setBookingStep('form'); }}
                    className="bg-white text-black px-8 py-3 rounded-full font-sans font-bold uppercase tracking-widest text-xs hover:bg-orange-200 transition-colors pointer-events-auto shadow-lg"
                >
                    Book a Table
                </button>
            </nav>

            <header className="pt-28 md:pt-32 px-6 md:px-10 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-end mb-8">
                        <div>
                            <span className="font-sans text-orange-400 text-xs uppercase tracking-[0.25em] font-bold">Fine Dining Experience</span>
                            <h1 className="text-5xl md:text-7xl font-thin italic mt-4 leading-[0.95]">A fluid menu crafted around mood, season, and fire.</h1>
                            <p className="font-sans text-stone-400 max-w-2xl mt-6 text-base md:text-lg leading-relaxed">
                                Signature plates move from raw elegance to slow heat. Select a dish to explore details and reserve instantly.
                            </p>
                        </div>
                        <div className="bg-stone-900/70 border border-stone-800 rounded-2xl p-5 font-sans">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-stone-400">Tonight</span>
                                <span className="text-orange-400 font-bold uppercase tracking-wider">8 tables left</span>
                            </div>
                            <div className="grid grid-cols-3 gap-3 mt-4 text-center text-xs uppercase tracking-wider">
                                <div className="bg-stone-950 rounded-xl py-3 border border-stone-800">
                                    <p className="text-stone-500">Rating</p>
                                    <p className="mt-1 text-white font-bold">4.9/5</p>
                                </div>
                                <div className="bg-stone-950 rounded-xl py-3 border border-stone-800">
                                    <p className="text-stone-500">Kitchen</p>
                                    <p className="mt-1 text-white font-bold">Open</p>
                                </div>
                                <div className="bg-stone-950 rounded-xl py-3 border border-stone-800">
                                    <p className="text-stone-500">Dress</p>
                                    <p className="mt-1 text-white font-bold">Smart</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-stone-800 bg-stone-900/70 p-4 md:p-5 mb-8 md:mb-10">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 font-sans">
                            <div>
                                <p className="text-[11px] uppercase tracking-[0.22em] text-orange-400 font-bold">Tasting Flight</p>
                                <p className="text-stone-300 text-sm mt-1">Carpaccio + Black Cod + Chocolate Fondant + Smoked Old Fashioned</p>
                            </div>
                            <button className="bg-orange-500 text-black px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-orange-400 transition-colors">
                                Reserve Flight
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="relative z-10 pb-20 px-6 md:px-10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-8 lg:gap-10">
                    <section className="rounded-3xl border border-stone-800 bg-stone-900/60 backdrop-blur-sm p-5 md:p-7">
                        <LayoutGroup id="savor-tabs">
                            <div className="flex flex-wrap gap-2 md:gap-3 mb-6">
                                {MENU_CATEGORIES.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => {
                                            setActiveCategory(category);
                                            setSelectedDishId(MENU_ITEMS[category][0].id);
                                        }}
                                        className={`relative px-4 py-2 rounded-full font-sans text-[11px] uppercase tracking-[0.16em] transition-colors ${activeCategory === category ? 'text-black' : 'text-stone-300 hover:text-white bg-stone-800/70'}`}
                                    >
                                        {activeCategory === category && (
                                            <motion.span
                                                layoutId="tab-pill"
                                                className="absolute inset-0 rounded-full bg-orange-400"
                                                transition={{ duration: FLUID.base, ease: FLUID.ease }}
                                            />
                                        )}
                                        <span className="relative z-10">{category}</span>
                                    </button>
                                ))}
                            </div>
                        </LayoutGroup>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCategory}
                                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                                exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
                                transition={{ duration: FLUID.base, ease: FLUID.ease }}
                                className="space-y-3"
                            >
                                {activeItems.map((item, index) => (
                                    <motion.button
                                        key={item.id}
                                        onClick={() => setSelectedDishId(item.id)}
                                        initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                                        animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                                        transition={prefersReducedMotion ? {} : { duration: FLUID.base, delay: index * 0.04, ease: FLUID.ease }}
                                        className={`w-full text-left rounded-2xl border p-4 md:p-5 transition-all ${selectedDishId === item.id ? 'border-orange-400 bg-stone-950 shadow-[0_0_0_1px_rgba(251,146,60,0.25)]' : 'border-stone-800 bg-stone-900/60 hover:border-stone-700'}`}
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="font-sans text-[10px] uppercase tracking-[0.18em] text-stone-400">0{index + 1}</span>
                                                    <span className="font-sans text-[10px] uppercase tracking-wider bg-orange-500/15 text-orange-300 px-2 py-1 rounded-full">{item.badge}</span>
                                                    {item.featured && <span className="font-sans text-[10px] uppercase tracking-wider bg-white/10 text-white px-2 py-1 rounded-full">Featured</span>}
                                                </div>
                                                <h3 className="text-2xl md:text-3xl font-thin text-stone-100 leading-tight">{item.name}</h3>
                                                <p className="font-sans text-stone-400 text-sm mt-2">{item.desc}</p>
                                                <div className="font-sans text-[11px] text-stone-500 uppercase tracking-[0.16em] mt-3">Prep {item.prep} • {item.heat}</div>
                                            </div>
                                            <p className="font-sans text-xl md:text-2xl text-orange-300 whitespace-nowrap">{item.price}</p>
                                        </div>
                                    </motion.button>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </section>

                    <section className="rounded-3xl border border-stone-800 bg-stone-900/65 overflow-hidden">
                        <div className="relative h-[290px] md:h-[420px]">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={selectedItem.id}
                                    src={selectedItem.image}
                                    alt={selectedItem.name}
                                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 1.03, y: 10 }}
                                    animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
                                    exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 1.02, y: -8 }}
                                    transition={{ duration: FLUID.slow, ease: FLUID.ease }}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </AnimatePresence>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                                <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-orange-300">{selectedItem.badge}</p>
                                <h2 className="text-4xl md:text-5xl font-thin italic mt-2">{selectedItem.name}</h2>
                                <p className="font-sans text-stone-300 mt-2 max-w-lg">{selectedItem.desc}</p>
                            </div>
                        </div>

                        <div className="p-5 md:p-7 border-t border-stone-800">
                            <div className="grid grid-cols-3 gap-3 font-sans text-xs uppercase tracking-wider">
                                <div className="bg-stone-950 border border-stone-800 rounded-xl p-3 text-center">
                                    <p className="text-stone-500">Price</p>
                                    <p className="text-white mt-1">{selectedItem.price}</p>
                                </div>
                                <div className="bg-stone-950 border border-stone-800 rounded-xl p-3 text-center">
                                    <p className="text-stone-500">Prep</p>
                                    <p className="text-white mt-1">{selectedItem.prep}</p>
                                </div>
                                <div className="bg-stone-950 border border-stone-800 rounded-xl p-3 text-center">
                                    <p className="text-stone-500">Kitchen</p>
                                    <p className="text-white mt-1">{selectedItem.heat}</p>
                                </div>
                            </div>

                            <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={() => { setIsReservationOpen(true); setBookingStep('form'); }}
                                    className="flex-1 bg-orange-500 text-black font-sans font-bold uppercase tracking-widest py-3.5 rounded-xl hover:bg-orange-400 transition-colors text-xs"
                                >
                                    Reserve a Table
                                </button>
                                <button className="flex-1 bg-white/10 border border-stone-700 text-white font-sans font-bold uppercase tracking-widest py-3.5 rounded-xl hover:bg-white/15 transition-colors text-xs">
                                    Add to Order
                                </button>
                            </div>

                            <div className="mt-6 pt-5 border-t border-stone-800 font-sans text-sm text-stone-400">
                                Open daily: 12:00 - 23:00 • Reservations: +267 76 471 184
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <AnimatePresence>
                {isReservationOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: FLUID.fast }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center px-4"
                    >
                        <motion.div
                            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24, scale: 0.98 }}
                            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16, scale: 0.98 }}
                            transition={{ duration: FLUID.base, ease: FLUID.ease }}
                            className="bg-stone-900 p-8 md:p-10 w-full max-w-lg border border-stone-800 relative rounded-2xl shadow-2xl"
                        >
                            <button onClick={() => setIsReservationOpen(false)} className="absolute top-4 right-4 text-stone-400 hover:text-white">
                                <span className="material-symbols-outlined text-3xl">close</span>
                            </button>

                            <AnimatePresence mode="wait">
                                {bookingStep === 'form' ? (
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 0, x: -12 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 12 }}
                                        transition={{ duration: FLUID.base }}
                                    >
                                        <div className="text-center mb-8">
                                            <h3 className="text-3xl font-thin italic">Reserve Your Table</h3>
                                            <p className="text-stone-500 font-sans text-sm mt-2">For {selectedItem.name} and more.</p>
                                        </div>

                                        <form className="space-y-5 font-sans" onSubmit={handleBookingSubmit}>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs uppercase text-stone-500 mb-2 font-bold tracking-wider">Date</label>
                                                    <input required type="date" className="w-full bg-stone-950 border border-stone-800 text-white p-3.5 rounded-lg focus:border-orange-500 focus:outline-none transition-colors" />
                                                </div>
                                                <div>
                                                    <label className="block text-xs uppercase text-stone-500 mb-2 font-bold tracking-wider">Time</label>
                                                    <select className="w-full bg-stone-950 border border-stone-800 text-white p-3.5 rounded-lg focus:border-orange-500 focus:outline-none transition-colors">
                                                        <option>18:00</option>
                                                        <option>19:00</option>
                                                        <option>20:00</option>
                                                        <option>21:00</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs uppercase text-stone-500 mb-2 font-bold tracking-wider">Guests</label>
                                                <div className="grid grid-cols-4 gap-2">
                                                    {[2, 4, 6, 8].map((num) => (
                                                        <button
                                                            type="button"
                                                            key={num}
                                                            onClick={() => setGuestCount(num)}
                                                            className={`py-3 rounded-lg border transition-colors ${guestCount === num ? 'bg-orange-500/20 border-orange-500 text-orange-300' : 'bg-stone-950 border-stone-800 text-white hover:border-stone-600'}`}
                                                        >
                                                            {num}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs uppercase text-stone-500 mb-2 font-bold tracking-wider">Name</label>
                                                <input required type="text" className="w-full bg-stone-950 border border-stone-800 text-white p-3.5 rounded-lg focus:border-orange-500 focus:outline-none transition-colors" placeholder="Your Full Name" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs uppercase text-stone-500 mb-2 font-bold tracking-wider">Phone</label>
                                                    <input required type="tel" className="w-full bg-stone-950 border border-stone-800 text-white p-3.5 rounded-lg focus:border-orange-500 focus:outline-none transition-colors" placeholder="+267..." />
                                                </div>
                                                <div>
                                                    <label className="block text-xs uppercase text-stone-500 mb-2 font-bold tracking-wider">Email</label>
                                                    <input required type="email" className="w-full bg-stone-950 border border-stone-800 text-white p-3.5 rounded-lg focus:border-orange-500 focus:outline-none transition-colors" placeholder="name@email.com" />
                                                </div>
                                            </div>
                                            <button type="submit" className="w-full bg-orange-600 text-white font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-orange-500 transition-colors text-xs">
                                                Confirm for {guestCount} Guests
                                            </button>
                                        </form>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: FLUID.base }}
                                        className="text-center py-12"
                                    >
                                        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                                            <span className="material-symbols-outlined text-4xl">check</span>
                                        </div>
                                        <h3 className="text-3xl font-display italic mb-4">Confirmed!</h3>
                                        <p className="text-stone-400 font-sans mb-8">Table reserved for {guestCount}. Confirmation is on the way.</p>
                                        <button
                                            onClick={() => setIsReservationOpen(false)}
                                            className="bg-stone-800 text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-stone-700 transition-colors"
                                        >
                                            Close
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Savor;
