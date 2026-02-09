import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const TESTIMONIALS = [
    { text: "Velvet tailored our wedding to perfection. Every detail was a masterpiece.", author: "Sarah & James, 2023" },
    { text: "The most professional catering team we've ever worked with for our gala.", author: "TechCorp Annual Summit" },
    { text: "Stunning florals, impeccable timing, and memories that will last forever.", author: "Elena M." }
];

const GALLERY_IMAGES = [
    { url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=1200&fit=crop', alt: 'Floral Design', label: 'Floral Design' },
    { url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&h=800&fit=crop', alt: 'Table Setting', label: 'Table Scapes' },
    { url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&h=800&fit=crop', alt: 'Venue', label: 'Venue Styling' },
    { url: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&h=1200&fit=crop', alt: 'Details', label: 'Fine Details' }
];

const Velvet = () => {
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [formData, setFormData] = useState({ name: '', email: '', date: '', message: '' });
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        setTimeout(() => setFormSubmitted(false), 3000);
    };

    return (
        <div className="font-serif text-stone-800 bg-[#FFF5F5] min-h-screen selection:bg-rose-300 selection:text-rose-900">
            {/* Back to Portfolio (Floating) */}
            <Link to="/" className="fixed bottom-8 right-8 z-50 bg-rose-500 text-white px-6 py-3 rounded-full shadow-xl font-sans font-bold uppercase tracking-wider text-xs hover:bg-rose-600 transition-all hover:scale-105">
                ← Back to Portfolio
            </Link>

            {/* Hero */}
            <header className="min-h-screen relative flex flex-col justify-center items-center text-center px-4 overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50">
                <div className="absolute inset-4 md:inset-12 border-2 border-rose-200 z-10 pointer-events-none rounded-3xl"></div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5 }}
                    className="relative z-20 max-w-4xl"
                >
                    <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 mb-8 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                        <span className="font-sans text-rose-600 tracking-[0.4em] text-xs uppercase font-semibold">Est. 2018</span>
                    </div>

                    <h1 className="text-7xl md:text-8xl lg:text-9xl text-stone-900 mb-8 font-light leading-none">
                        Velvet <span className="text-rose-400">&</span><br /> Vine
                    </h1>

                    <p className="font-sans text-stone-600 max-w-lg mx-auto leading-relaxed mb-10 text-lg">
                        Curating timeless events for the modern romantic. We turn fleeting moments into everlasting memories.
                    </p>

                    <button className="bg-stone-900 text-white px-12 py-5 font-sans text-xs font-bold uppercase tracking-widest hover:bg-rose-500 transition-all rounded-full shadow-xl hover:scale-105">
                        Inquire for 2025
                    </button>
                </motion.div>

                {/* Background Decorative Elements */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-rose-300 rounded-full blur-[150px] opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-200 rounded-full blur-[150px] opacity-40 translate-x-1/3 translate-y-1/3"></div>
            </header>

            {/* Gallery Masonry */}
            <section className="py-24 px-4 md:px-12 container mx-auto">
                <div className="text-center mb-16">
                    <span className="text-rose-500 font-sans text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Our Work</span>
                    <h2 className="text-4xl md:text-5xl font-light text-stone-900">
                        Recent <span className="italic text-rose-400">Celebrations</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[400px]">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-1 row-span-1 bg-stone-200 overflow-hidden relative group rounded-2xl"
                    >
                        <img src={GALLERY_IMAGES[0].url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={GALLERY_IMAGES[0].alt} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                            <span className="text-white font-sans text-sm tracking-widest uppercase font-semibold">{GALLERY_IMAGES[0].label}</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="md:col-span-2 row-span-1 bg-stone-200 overflow-hidden relative group rounded-2xl"
                    >
                        <img src={GALLERY_IMAGES[1].url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={GALLERY_IMAGES[1].alt} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                            <span className="text-white font-sans text-sm tracking-widest uppercase font-semibold">{GALLERY_IMAGES[1].label}</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="md:col-span-2 row-span-1 bg-stone-200 overflow-hidden relative group rounded-2xl"
                    >
                        <img src={GALLERY_IMAGES[2].url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={GALLERY_IMAGES[2].alt} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                            <span className="text-white font-sans text-sm tracking-widest uppercase font-semibold">{GALLERY_IMAGES[2].label}</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="md:col-span-1 row-span-1 bg-stone-200 overflow-hidden relative group rounded-2xl"
                    >
                        <img src={GALLERY_IMAGES[3].url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={GALLERY_IMAGES[3].alt} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                            <span className="text-white font-sans text-sm tracking-widest uppercase font-semibold">{GALLERY_IMAGES[3].label}</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-32 bg-white text-center px-6">
                <div className="container mx-auto max-w-3xl">
                    <span className="material-symbols-outlined text-rose-300 text-6xl mb-8">format_quote</span>
                    <div className="h-56 flex items-center justify-center relative">
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={activeTestimonial}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0 flex flex-col items-center justify-center px-4"
                            >
                                <p className="text-2xl md:text-3xl italic text-stone-800 mb-8 leading-relaxed">"{TESTIMONIALS[activeTestimonial].text}"</p>
                                <cite className="not-italic font-sans text-xs font-bold uppercase tracking-widest text-rose-500">— {TESTIMONIALS[activeTestimonial].author}</cite>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                    <div className="flex justify-center gap-3 mt-12">
                        {TESTIMONIALS.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveTestimonial(i)}
                                className={`w-3 h-3 rounded-full transition-all ${i === activeTestimonial ? 'bg-rose-500 w-8' : 'bg-stone-200 hover:bg-stone-300'}`}
                                aria-label={`View testimonial ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Inquiry Form */}
            <section className="bg-stone-900 text-stone-200 py-24 px-6">
                <div className="container mx-auto max-w-5xl grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl text-white mb-6 font-light">Save the Date.</h2>
                        <p className="font-sans text-stone-400 leading-relaxed mb-8 text-lg">
                            We accept a limited number of commissions per season to ensure unwavering attention to detail for every celebration.
                        </p>
                        <div className="space-y-5 font-sans text-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-rose-500/10 rounded-full flex items-center justify-center">
                                    <span className="material-symbols-outlined text-rose-400">mail</span>
                                </div>
                                <span>hello@velvetandvine.com</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-rose-500/10 rounded-full flex items-center justify-center">
                                    <span className="material-symbols-outlined text-rose-400">call</span>
                                </div>
                                <span>+1 (555) 000-0000</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-rose-500/10 rounded-full flex items-center justify-center">
                                    <span className="material-symbols-outlined text-rose-400">location_on</span>
                                </div>
                                <span>New York, NY</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl">
                        {formSubmitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12"
                            >
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="material-symbols-outlined text-4xl text-green-600">check_circle</span>
                                </div>
                                <h3 className="text-xl font-semibold text-stone-800 mb-2">Thank You!</h3>
                                <p className="text-stone-500 font-sans text-sm">We'll be in touch within 24 hours.</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5 font-sans">
                                <div>
                                    <h3 className="text-2xl font-semibold text-stone-800 mb-2">Request Consultation</h3>
                                    <p className="text-sm text-stone-500">Let's create something unforgettable together.</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-stone-700 uppercase mb-2 tracking-wider">Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-stone-50 border border-stone-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none focus:border-transparent transition-all"
                                            placeholder="Jane Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-stone-700 uppercase mb-2 tracking-wider">Email</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-stone-50 border border-stone-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none focus:border-transparent transition-all"
                                            placeholder="jane@email.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-stone-700 uppercase mb-2 tracking-wider">Event Date</label>
                                    <input
                                        type="date"
                                        required
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="w-full bg-stone-50 border border-stone-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none focus:border-transparent transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-stone-700 uppercase mb-2 tracking-wider">Tell Us About Your Vision</label>
                                    <textarea
                                        placeholder="Describe your dream celebration..."
                                        rows="4"
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full bg-stone-50 border border-stone-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none focus:border-transparent transition-all resize-none"
                                    ></textarea>
                                </div>

                                <button className="w-full bg-rose-500 text-white font-bold uppercase tracking-widest p-4 rounded-lg hover:bg-rose-600 transition-all text-xs shadow-lg hover:shadow-xl hover:scale-[1.02]">
                                    Check Availability
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-stone-950 text-white py-16 px-6">
                <div className="container mx-auto max-w-5xl text-center">
                    <h3 className="text-3xl font-light mb-4">Velvet <span className="text-rose-400">&</span> Vine</h3>
                    <p className="text-stone-500 font-sans text-sm mb-8">Creating memories that last a lifetime.</p>
                    <div className="flex justify-center gap-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-rose-500 transition-colors text-xs font-bold">IG</a>
                        <a href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-rose-500 transition-colors text-xs font-bold">PI</a>
                        <a href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-rose-500 transition-colors text-xs font-bold">FB</a>
                    </div>
                    <div className="mt-12 pt-8 border-t border-stone-800">
                        <p className="text-stone-600 text-xs uppercase tracking-widest font-sans">© 2024 Velvet & Vine. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Velvet;
