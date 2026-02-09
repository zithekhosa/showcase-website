import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Guardian = () => {
    const [formStatus, setFormStatus] = useState('idle');

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus('submitting');
        // Simulate API call
        setTimeout(() => setFormStatus('success'), 1500);
    };

    return (
        <div className="font-sans antialiased text-slate-800 bg-white">
            {/* Back to Portfolio (Floating) */}
            <Link to="/" className="fixed bottom-8 right-8 z-50 bg-slate-900 text-white px-6 py-3 rounded shadow-lg font-bold uppercase tracking-wider text-xs hover:bg-slate-800 transition-colors">
                Exit Showcase
            </Link>

            {/* Nav */}
            <nav className="bg-slate-900 text-white sticky top-0 z-40 shadow-xl">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-cyan-400 text-4xl">shield_lock</span>
                        <div>
                            <span className="block text-xl font-bold tracking-tight leading-none">GUARDIAN</span>
                            <span className="block text-[10px] text-slate-400 uppercase tracking-[0.2em] leading-none">Security Systems</span>
                        </div>
                    </div>
                    <div className="hidden md:flex gap-8 text-sm font-medium">
                        <a href="#" className="hover:text-cyan-400 transition-colors">Services</a>
                        <a href="#" className="hover:text-cyan-400 transition-colors">Enterprise</a>
                        <a href="#" className="hover:text-cyan-400 transition-colors">Residential</a>
                        <a href="#" className="hover:text-cyan-400 transition-colors">About Us</a>
                    </div>
                    <button className="bg-cyan-600 px-6 py-2 rounded text-sm font-bold uppercase hover:bg-cyan-500 transition-colors shadow-[0_0_20px_rgba(8,145,178,0.4)]">
                        Client Portal
                    </button>
                </div>
            </nav>

            {/* Hero */}
            <header className="relative bg-slate-900 h-[600px] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&h=1080&fit=crop&q=80" alt="Security Grid" className="w-full h-full object-cover opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-slate-800/50 rounded-full px-4 py-1 border border-slate-700 mb-6">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-xs text-slate-300 font-medium uppercase tracking-wider">24/7 Monitoring Active</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Uncompromising <br />
                            <span className="text-cyan-400">Security Solutions.</span>
                        </h1>
                        <p className="text-slate-400 text-lg mb-10 max-w-lg leading-relaxed">
                            Trusted by Fortune 500 companies to protect physical and digital assets with military-grade precision.
                        </p>
                        <div className="flex gap-4">
                            <button className="bg-cyan-600 text-white px-8 py-4 rounded font-bold uppercase tracking-wider hover:bg-cyan-500 transition-colors">
                                Get a Quote
                            </button>
                            <button className="border border-slate-600 text-slate-300 px-8 py-4 rounded font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors flex items-center gap-2">
                                <span className="material-symbols-outlined">play_circle</span> Watch Video
                            </button>
                        </div>
                    </motion.div>

                    {/* Lead Gen Form - Floating */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="bg-white rounded-xl shadow-2xl p-8 max-w-md ml-auto border-t-4 border-cyan-500"
                    >
                        {formStatus === 'success' ? (
                            <div className="text-center py-12">
                                <span className="material-symbols-outlined text-6xl text-green-500 mb-4">check_circle</span>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">Request Received</h3>
                                <p className="text-slate-500">A security consultant will contact you within 15 minutes.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <h3 className="text-xl font-bold text-slate-800 mb-1">Request Assessment</h3>
                                <p className="text-sm text-slate-500 mb-6">Free consultation for commercial properties.</p>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Company Name</label>
                                        <input type="text" required className="w-full bg-slate-50 border border-slate-200 rounded p-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">First Name</label>
                                            <input type="text" required className="w-full bg-slate-50 border border-slate-200 rounded p-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone</label>
                                            <input type="tel" required className="w-full bg-slate-50 border border-slate-200 rounded p-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Service Interest</label>
                                        <select className="w-full bg-slate-50 border border-slate-200 rounded p-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none">
                                            <option>Access Control Systems</option>
                                            <option>CCTV & Surveillance</option>
                                            <option>Manned Guarding</option>
                                            <option>Cybersecurity</option>
                                        </select>
                                    </div>
                                    <button disabled={formStatus === 'submitting'} className="w-full bg-slate-900 text-white font-bold py-4 rounded hover:bg-slate-800 transition-colors uppercase tracking-widest text-xs mt-2 disabled:opacity-50">
                                        {formStatus === 'submitting' ? 'Sending...' : 'Secure My Quote'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </motion.div>
                </div>
            </header>

            {/* Trust Strip */}
            <div className="bg-slate-100 py-12 border-y border-slate-200">
                <div className="container mx-auto px-6 flex flex-wrap justify-center gap-12 lg:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all">
                    {/* Placeholder Logos */}
                    {['TechCorp', 'IndusReal', 'BankSecure', 'GovSystem', 'DataFort'].map(brand => (
                        <div key={brand} className="text-xl font-black text-slate-400 uppercase tracking-tighter cursor-default">{brand}</div>
                    ))}
                </div>
            </div>

            {/* Services Grid */}
            <section className="py-24 container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="text-cyan-600 font-bold uppercase tracking-widest text-xs block mb-4">Our Expertise</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Comprehensive Protection for Modern Threats</h2>
                    <p className="text-slate-500 text-lg">We integrated physical presence with advanced monitoring technology to create an impenetrable security ecosystem.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: 'videocam', title: 'Smart Surveillance', desc: 'AI-powered analytic cameras with facial recognition and license plate tracking.' },
                        { icon: 'lock', title: 'Access Control', desc: 'Biometric and keycard entry systems managed centrally via our secure cloud portal.' },
                        { icon: 'local_police', title: 'Executive Protection', desc: 'Elite highly-trained personnel for high-risk individuals and transport protection.' },
                        { icon: 'detector_smoke', title: 'Fire & Safety', desc: 'Integrated alarm systems that automatically dispatch emergency services instantly.' },
                        { icon: 'hub', title: 'Cyber-Physical', desc: 'Bridging the gap between IT security and physical premises protection.' },
                        { icon: 'support_agent', title: '24/7 Command', desc: 'Our centralized operations center monitors your assets every second of the day.' },
                    ].map(service => (
                        <div key={service.title} className="p-8 border border-slate-200 rounded-lg hover:shadow-xl hover:border-cyan-200 transition-all group">
                            <div className="w-14 h-14 bg-slate-50 rounded-lg flex items-center justify-center mb-6 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-3xl">{service.icon}</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">{service.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Guardian;
