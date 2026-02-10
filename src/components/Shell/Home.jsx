import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PortfolioCard = ({ to, title, category, gradient, description, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
    >
        <Link
            to={to}
            className="group block relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-stone-100"
        >
            {/* Card Header with Gradient */}
            <div className={`h-56 ${gradient} relative overflow-hidden`}>
                {/* Large Letter Background */}
                <span className="absolute -bottom-8 -right-4 text-[180px] font-display font-bold text-white/10 leading-none select-none">
                    {title.charAt(0)}
                </span>

                {/* Category Badge */}
                <div className="absolute top-6 left-6">
                    <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                        {category}
                    </span>
                </div>

                {/* Arrow Icon */}
                <div className="absolute bottom-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300">
                    <span className="material-symbols-outlined text-white group-hover:text-stone-900 transition-colors">arrow_outward</span>
                </div>
            </div>

            {/* Card Body */}
            <div className="p-8">
                <h3 className="text-2xl font-display font-semibold mb-3 text-stone-900 group-hover:text-stone-600 transition-colors">
                    {title}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed">
                    {description}
                </p>
            </div>
        </Link>
    </motion.div>
);

const Home = () => {
    const portfolioItems = [
        {
            to: "/aura",
            title: "Aura",
            category: "Wellness & Spa",
            gradient: "bg-gradient-to-br from-amber-600 via-amber-700 to-yellow-900",
            description: "High-ticket booking engine with immersive parallax effects and luxury typography designed for premium wellness brands."
        },
        {
            to: "/gearhead",
            title: "GearHead",
            category: "Auto & Industrial",
            gradient: "bg-gradient-to-br from-red-700 via-red-800 to-stone-900",
            description: "Complex inventory management with robust vehicle fitment search, filtering, and trust-building product displays."
        },
        {
            to: "/guardian",
            title: "Guardian",
            category: "Security & Corporate",
            gradient: "bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900",
            description: "Trust-building corporate layout with prominent lead generation forms and professional service verification."
        },
        {
            to: "/dynamic-insurance",
            title: "Dynamic",
            category: "Insurance & Financial",
            gradient: "bg-gradient-to-br from-cyan-600 via-blue-700 to-slate-900",
            description: "Insurance-focused digital experience with quote flows, claims pages, trust signals, and a client portal interface."
        },
        {
            to: "/savor",
            title: "Savor",
            category: "Hospitality & Dining",
            gradient: "bg-gradient-to-br from-orange-600 via-orange-700 to-stone-900",
            description: "Visual-first menu design with animated interactions and instant table reservation capabilities."
        },
        {
            to: "/velvet",
            title: "Velvet",
            category: "Events & Weddings",
            gradient: "bg-gradient-to-br from-rose-500 via-rose-600 to-pink-900",
            description: "Emotional storytelling platform with masonry gallery showcases and inquiry management forms."
        }
    ];

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-stone-50">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-5">
                <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/80 backdrop-blur-xl rounded-full px-8 py-4 shadow-lg shadow-stone-200/50 border border-stone-100">
                    <span className="text-2xl font-display font-bold tracking-tight text-stone-900">
                        TOV TECHNOLOGIES<span className="text-amber-500">.</span>
                    </span>
                    <div className="hidden md:flex items-center gap-10">
                        <button
                            onClick={() => scrollToSection('work')}
                            className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                        >
                            Work
                        </button>
                        <button
                            onClick={() => scrollToSection('contact')}
                            className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                        >
                            Contact
                        </button>
                    </div>
                    <button
                        onClick={() => scrollToSection('contact')}
                        className="bg-stone-900 text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-stone-800 hover:scale-105 transition-all shadow-lg shadow-stone-400/30"
                    >
                        Let's Talk
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-40 pb-24 px-6 md:px-12 relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gradient-to-br from-amber-100 to-orange-50 rounded-full blur-3xl opacity-60 -z-10"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-blue-50 to-indigo-100 rounded-full blur-3xl opacity-40 -z-10"></div>

                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-white border border-stone-200 rounded-full px-5 py-2.5 mb-8 shadow-sm">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-xs font-semibold text-stone-600 uppercase tracking-wider">Available for Projects</span>
                        </div>

                        {/* Main Headline */}
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-medium leading-[0.95] mb-8 text-stone-900">
                            We craft digital
                            <br />
                            <span className="italic text-stone-400">experiences</span> that
                            <br />
                            <span className="relative inline-block">
                                convert
                                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                                    <path d="M2 8C50 2 150 2 198 8" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
                                </svg>
                            </span>.
                        </h1>

                        {/* Subheadline */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-lg md:text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed mb-12"
                        >
                            I am Zithe Khosa, Head of TOV Technologies. We build for different industries and
                            offer a wide range of digital solutions, combining strong aesthetics with conversion-focused design.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <button
                                onClick={() => scrollToSection('work')}
                                className="bg-stone-900 text-white px-10 py-5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-stone-800 hover:scale-105 transition-all shadow-xl shadow-stone-300/50 flex items-center justify-center gap-2"
                            >
                                View Our Work
                                <span className="material-symbols-outlined text-lg">arrow_downward</span>
                            </button>
                            <button
                                onClick={() => scrollToSection('contact')}
                                className="bg-white text-stone-900 px-10 py-5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-stone-100 transition-all border border-stone-200 shadow-lg"
                            >
                                Book a Call
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="py-12 px-6 md:px-12 border-y border-stone-200 bg-white">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-4xl md:text-5xl font-display font-bold text-stone-900 mb-2">50+</div>
                        <div className="text-sm text-stone-500 uppercase tracking-wider font-medium">Projects Delivered</div>
                    </div>
                    <div>
                        <div className="text-4xl md:text-5xl font-display font-bold text-stone-900 mb-2">98%</div>
                        <div className="text-sm text-stone-500 uppercase tracking-wider font-medium">Client Satisfaction</div>
                    </div>
                    <div>
                        <div className="text-4xl md:text-5xl font-display font-bold text-stone-900 mb-2">5+</div>
                        <div className="text-sm text-stone-500 uppercase tracking-wider font-medium">Years Experience</div>
                    </div>
                    <div>
                        <div className="text-4xl md:text-5xl font-display font-bold text-stone-900 mb-2">24h</div>
                        <div className="text-sm text-stone-500 uppercase tracking-wider font-medium">Response Time</div>
                    </div>
                </div>
            </section>

            {/* Portfolio Grid */}
            <section id="work" className="py-24 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <span className="text-amber-600 text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Our Portfolio</span>
                        <h2 className="text-4xl md:text-5xl font-display font-medium text-stone-900">
                            Featured <span className="italic text-stone-400">Projects</span>
                        </h2>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {portfolioItems.map((item, index) => (
                            <PortfolioCard key={item.to} {...item} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section id="contact" className="py-24 px-6 md:px-12 bg-stone-900 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 w-full h-full" style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                        backgroundSize: '40px 40px'
                    }}></div>
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-display font-medium text-white mb-6">
                            Ready to elevate your <span className="italic text-amber-400">brand</span>?
                        </h2>
                        <p className="text-stone-400 text-lg mb-10 max-w-xl mx-auto">
                            Talk directly with Zithe Khosa, Head of TOV Technologies. We support different clients with tailored web and digital services.
                        </p>
                        <div className="mb-10 text-stone-300 text-sm md:text-base leading-relaxed space-y-2">
                            <p>
                                Call or WhatsApp:
                                {' '}
                                <a href="tel:76471184" className="underline hover:text-amber-300 transition-colors">76471184</a>
                                {' / '}
                                <a href="tel:76188107" className="underline hover:text-amber-300 transition-colors">76188107</a>
                            </p>
                            <p>
                                Email:
                                {' '}
                                <a href="mailto:zithekhosa4@gmail.com" className="underline hover:text-amber-300 transition-colors">zithekhosa4@gmail.com</a>
                            </p>
                        </div>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="bg-amber-500 text-stone-900 px-12 py-5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-amber-400 hover:scale-105 transition-all shadow-xl shadow-amber-500/30"
                        >
                            Start a Project
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-stone-950 text-white py-16 px-6 md:px-12">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div>
                        <span className="text-2xl font-display font-bold">TOV TECHNOLOGIES<span className="text-amber-500">.</span></span>
                        <p className="text-stone-500 text-sm mt-2">Led by Zithe Khosa, Head of TOV Technologies.</p>
                        <p className="text-stone-500 text-sm mt-1">
                            Contact:
                            {' '}
                            <a href="tel:76471184" className="hover:text-amber-400 transition-colors">76471184</a>
                            {' / '}
                            <a href="tel:76188107" className="hover:text-amber-400 transition-colors">76188107</a>
                        </p>
                        <p className="text-stone-500 text-sm mt-1">
                            <a href="mailto:zithekhosa4@gmail.com" className="hover:text-amber-400 transition-colors">zithekhosa4@gmail.com</a>
                        </p>
                    </div>
                    <div className="flex gap-6">
                        <a href="tel:76471184" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-amber-500 transition-colors" aria-label="Call 76471184">
                            <span className="text-xs font-bold">C1</span>
                        </a>
                        <a href="tel:76188107" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-amber-500 transition-colors" aria-label="Call 76188107">
                            <span className="text-xs font-bold">C2</span>
                        </a>
                        <a href="mailto:zithekhosa4@gmail.com" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-amber-500 transition-colors" aria-label="Email zithekhosa4@gmail.com">
                            <span className="text-xs font-bold">EM</span>
                        </a>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-stone-800 text-center">
                    <p className="text-stone-600 text-xs uppercase tracking-widest">© 2026 TOV Technologies. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
