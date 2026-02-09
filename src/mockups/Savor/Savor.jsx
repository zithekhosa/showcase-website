import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const MENU_CATEGORIES = ['Starters', 'Mains', 'Steaks', 'Desserts', 'Cocktails'];

const MENU_ITEMS = {
    Starters: [
        {
            id: 's1',
            name: 'Wagyu Beef Carpaccio',
            price: 'P240',
            desc: 'Truffle oil, parmesan shavings, capers.',
            image: 'https://images.unsplash.com/photo-1546241072-48010ad2862c?w=800&fit=crop',
            rating: 4.9,
            reviews: [{ user: 'Elena R.', text: 'Absolutely melts in your mouth.', rating: 5 }]
        },
        {
            id: 's2',
            name: 'Pan-Seared Scallops',
            price: 'P220',
            desc: 'Cauliflower purée, crispy pancetta.',
            image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=800&fit=crop',
            rating: 4.7,
            reviews: [{ user: 'James L.', text: 'Perfectly seared.', rating: 5 }]
        },
        {
            id: 's3',
            name: 'Burrata & Heirloom',
            price: 'P190',
            desc: 'Basil pesto, balsamic glaze, sourdough.',
            image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=800&fit=crop',
            rating: 4.8,
            reviews: [{ user: 'Chloe M.', text: 'Fresh and vibrant flavors.', rating: 5 }]
        },
    ],
    Mains: [
        {
            id: 'm1',
            name: 'Miso Glazed Black Cod',
            price: 'P420',
            desc: 'Bok choy, ginger dashi broth.',
            image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&fit=crop',
            rating: 5.0,
            reviews: [{ user: 'Kenji O.', text: 'Authentic and buttery.', rating: 5 }]
        },
        {
            id: 'm2',
            name: 'Herb-Crusted Lamb Rack',
            price: 'P380',
            desc: 'Fondant potato, red wine jus.',
            image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&fit=crop',
            rating: 4.8,
            reviews: [{ user: 'Gordon R.', text: 'Cooked to pink perfection.', rating: 5 }]
        },
        {
            id: 'm3',
            name: 'Wild Mushroom Risotto',
            price: 'P320',
            desc: 'Porcini dust, truffle oil, parmesan crisp.',
            image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&fit=crop',
            rating: 4.6,
            reviews: [{ user: 'Vegan Lover', text: 'Rich and creamy without the dairy feel.', rating: 5 }]
        },
    ],
    Steaks: [
        {
            id: 'st1',
            name: 'Ribeye (12oz)',
            price: 'P550',
            desc: 'Dry-aged 45 days, grass-fed.',
            image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&fit=crop',
            rating: 4.9,
            reviews: []
        },
        {
            id: 'st2',
            name: 'Fillet Mignon (8oz)',
            price: 'P620',
            desc: 'Center cut, tender and lean.',
            image: 'https://images.unsplash.com/photo-1558030006-4b50986be430?w=800&fit=crop',
            rating: 4.8,
            reviews: []
        },
    ],
    Desserts: [
        {
            id: 'd1',
            name: 'Dark Chocolate Fondant',
            price: 'P160',
            desc: 'Salted caramel center, vanilla bean ice cream.',
            image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&fit=crop',
            rating: 5.0,
            reviews: []
        },
        {
            id: 'd2',
            name: 'Lemon Basil Tart',
            price: 'P140',
            desc: 'Italian meringue, raspberry coulis.',
            image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=800&fit=crop',
            rating: 4.7,
            reviews: []
        },
    ],
    Cocktails: [
        {
            id: 'c1',
            name: 'Smoked Old Fashioned',
            price: 'P180',
            desc: 'Bourbon, maple syrup, angostura bitters, oak smoke.',
            image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&fit=crop',
            rating: 5.0,
            reviews: []
        },
        {
            id: 'c2',
            name: 'Lychee Martini',
            price: 'P160',
            desc: 'Vodka, lychee liqueur, lime juice.',
            image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&fit=crop',
            rating: 4.8,
            reviews: []
        },
    ]
};

const DishModal = ({ item, onClose }) => {
    if (!item) return null;
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-stone-900 w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl flex flex-col md:flex-row shadow-2xl border border-stone-800"
                onClick={e => e.stopPropagation()}
            >
                <div className="md:w-1/2 h-64 md:h-auto relative">
                    <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-500/10 px-3 py-1 rounded-full">Chef's Selection</span>
                        <button onClick={onClose} className="text-stone-500 hover:text-white transition-colors">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-thin italic mb-4 mt-4">{item.name}</h2>
                    <p className="text-stone-400 font-sans leading-relaxed mb-8 text-lg">{item.desc}</p>
                    <div className="flex items-center justify-between mb-8 border-y border-stone-800 py-6">
                        <span className="text-3xl font-sans font-light text-white">{item.price}</span>
                    </div>

                    <div className="space-y-6">
                        <h3 className="font-sans font-bold uppercase tracking-widest text-sm text-stone-500">Guest Reviews</h3>
                        {item.reviews.length > 0 ? (
                            item.reviews.map((review, i) => (
                                <div key={i} className="bg-stone-800/50 p-4 rounded-xl">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-bold text-white text-sm">{review.user}</span>
                                        <div className="flex text-yellow-500 text-[10px]">
                                            {[...Array(review.rating)].map((_, r) => <span key={r} className="material-symbols-outlined text-sm">star</span>)}
                                        </div>
                                    </div>
                                    <p className="text-stone-400 text-sm italic">"{review.text}"</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-stone-600 italic">No written reviews yet. Be the first!</p>
                        )}
                    </div>

                    <button className="w-full mt-8 bg-white text-black font-sans font-bold uppercase tracking-widest py-4 hover:bg-orange-500 hover:text-white transition-all rounded-xl">
                        Add to Order
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

const Savor = () => {
    const [activeCategory, setActiveCategory] = useState('Mains');
    const [hoveredItem, setHoveredItem] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isReservationOpen, setIsReservationOpen] = useState(false);
    const [bookingStep, setBookingStep] = useState('form');

    const handleBookingSubmit = (e) => {
        e.preventDefault();
        setBookingStep('success');
    };

    // Default to the first item of the active category if nothing is hovered
    const activeImage = hoveredItem ? hoveredItem.image : MENU_ITEMS[activeCategory][0].image;

    return (
        <div className="font-serif bg-stone-950 text-stone-100 min-h-screen selection:bg-orange-500 selection:text-white">
            {/* Back to Portfolio */}
            <Link to="/" className="fixed bottom-8 right-8 z-50 bg-orange-600/90 text-white px-6 py-3 rounded-full shadow-lg font-sans font-bold uppercase tracking-wider text-xs hover:bg-orange-500 transition-colors backdrop-blur-sm">
                Exit Showcase
            </Link>

            {/* Nav */}
            <nav className="fixed w-full z-40 px-8 py-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent text-white pointer-events-none">
                <span className="text-3xl font-black tracking-tighter pointer-events-auto">SAVOR.</span>
                <button
                    onClick={() => { setIsReservationOpen(true); setBookingStep('form'); }}
                    className="bg-white text-black px-8 py-3 rounded-none font-sans font-bold uppercase tracking-widest text-xs hover:bg-orange-200 transition-colors pointer-events-auto shadow-lg"
                >
                    Book a Table
                </button>
            </nav>

            <div className="flex flex-col md:flex-row min-h-screen">
                {/* Left Side: Content & Menu */}
                <div className="w-full md:w-1/2 p-8 md:p-24 pt-32 md:pt-40 flex flex-col justify-center relative z-10 bg-stone-950">
                    <header className="mb-16">
                        <span className="text-orange-500 font-sans text-xs font-bold uppercase tracking-widest mb-4 block">The Menu</span>
                        <h1 className="text-5xl md:text-7xl font-thin italic"> Culinary <br /> Selections </h1>
                    </header>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap gap-6 mb-12 border-b border-stone-800 pb-6">
                        {MENU_CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`font-sans text-xs uppercase tracking-[0.2em] transition-all duration-300 ${activeCategory === cat ? 'text-orange-500 font-bold' : 'text-stone-600 hover:text-stone-300'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Menu List */}
                    <div className="space-y-4">
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={activeCategory}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-2"
                            >
                                {MENU_ITEMS[activeCategory].map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        onMouseEnter={() => setHoveredItem(item)}
                                        onMouseLeave={() => setHoveredItem(null)}
                                        onClick={() => setSelectedItem(item)}
                                        className="group flex items-center justify-between py-6 border-b border-stone-900 hover:border-orange-500 transition-colors cursor-pointer"
                                    >
                                        <div className="flex items-center gap-6">
                                            <span className="font-sans text-xs text-stone-600 group-hover:text-orange-500 transition-colors">0{index + 1}</span>
                                            <h3 className="text-2xl md:text-3xl font-thin text-stone-300 group-hover:text-white transition-colors">{item.name}</h3>
                                        </div>
                                        <div className="text-lg font-sans font-light text-stone-500 group-hover:text-orange-400 transition-colors">
                                            {item.price}
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Right Side: Fixed Image Preview */}
                <div className="hidden md:block w-1/2 fixed top-0 right-0 h-screen overflow-hidden">
                    <AnimatePresence mode="popLayout">
                        <motion.img
                            key={activeImage}
                            src={activeImage}
                            alt="Dish Preview"
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-stone-950/20"></div>
                </div>
            </div>

            {/* Detailed Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <DishModal item={selectedItem} onClose={() => setSelectedItem(null)} />
                )}
            </AnimatePresence>

            {/* Reservation Overlay */}
            <AnimatePresence>
                {isReservationOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center px-4"
                    >
                        <div className="bg-stone-900 p-8 md:p-12 w-full max-w-lg border border-stone-800 relative rounded-2xl shadow-2xl">
                            <button onClick={() => setIsReservationOpen(false)} className="absolute top-4 right-4 text-stone-400 hover:text-white">
                                <span className="material-symbols-outlined text-3xl">close</span>
                            </button>

                            <AnimatePresence mode="wait">
                                {bookingStep === 'form' ? (
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                    >
                                        <div className="text-center mb-10">
                                            <h3 className="text-3xl font-thin italic">Reserve Your Table</h3>
                                            <p className="text-stone-500 font-sans text-sm mt-2">Join us for an unforgettable evening.</p>
                                        </div>

                                        <form className="space-y-6 font-sans" onSubmit={handleBookingSubmit}>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs uppercase text-stone-500 mb-2 font-bold tracking-wider">Date</label>
                                                    <input required type="date" className="w-full bg-stone-950 border border-stone-800 text-white p-4 rounded-lg focus:border-orange-500 focus:outline-none transition-colors" />
                                                </div>
                                                <div>
                                                    <label className="block text-xs uppercase text-stone-500 mb-2 font-bold tracking-wider">Time</label>
                                                    <select className="w-full bg-stone-950 border border-stone-800 text-white p-4 rounded-lg focus:border-orange-500 focus:outline-none transition-colors">
                                                        <option>18:00</option>
                                                        <option>19:00</option>
                                                        <option>20:00</option>
                                                        <option>21:00</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs uppercase text-stone-500 mb-2 font-bold tracking-wider">Guests</label>
                                                <div className="flex gap-2">
                                                    {[2, 4, 6, 8].map(num => (
                                                        <button type="button" key={num} className="flex-1 bg-stone-950 border border-stone-800 py-4 rounded-lg hover:bg-orange-900 hover:border-orange-500 hover:text-orange-500 transition-colors focus:bg-orange-900 focus:border-orange-500 focus:text-orange-500">{num}</button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs uppercase text-stone-500 mb-2 font-bold tracking-wider">Name</label>
                                                <input required type="text" className="w-full bg-stone-950 border border-stone-800 text-white p-4 rounded-lg focus:border-orange-500 focus:outline-none transition-colors" placeholder="Your Full Name" />
                                            </div>
                                            <button type="submit" className="w-full bg-orange-600 text-white font-bold uppercase tracking-widest py-5 rounded-xl hover:bg-orange-700 transition-colors shadow-lg shadow-orange-900/20">
                                                Confirm Reservation
                                            </button>
                                        </form>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-12"
                                    >
                                        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                                            <span className="material-symbols-outlined text-4xl">check</span>
                                        </div>
                                        <h3 className="text-3xl font-display italic mb-4">Confirmed!</h3>
                                        <p className="text-stone-400 font-sans mb-8">We look forward to hosting you. A confirmation email has been sent.</p>
                                        <button
                                            onClick={() => setIsReservationOpen(false)}
                                            className="bg-stone-800 text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-stone-700 transition-colors"
                                        >
                                            Close
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Savor;
