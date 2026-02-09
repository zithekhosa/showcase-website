import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const SECTIONS = [
    {
        id: 'intro',
        title: 'Radiance Redefined',
        subtitle: 'Welcome',
        text: "A masterclass in dermatology tailored for melanated skin. Where Botswana's heritage meets high-fashion science.",
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGJ5rO-R1F2SSbx6CmUJX0HDkuz6DrlUWLHf3x22LK6S7_wT9ZeY8Jnbgb5RzZtewoZKqubxEwQxv2Wv8ivmUNyFFCmgizhRRVbzGFBrLfYIW4364JxvhYxzoV0rcPzGcPpDSu_u2jlfAYkUCNkZUTL4M-a_EbvupWKygM1Y07_wS1LtCl4pq9i0M27qOvRKdGOfNuKPHGO4L3qtNZMg6lJ_SDMlHiTc5UIZpoKwsbIQurR2Okym49vMo9W0htK6OEHOt5lBguhn0',
    },
    {
        id: 'facials',
        title: 'Cellular Correction',
        subtitle: 'Facials',
        text: 'Signature facials designed to target stubborn pigment and restore the skin barrier with botanically-derived lipids.',
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&fit=crop',
    },
    {
        id: 'massage',
        title: 'Sculpting Rituals',
        subtitle: 'Body',
        text: 'Full body massages combining sculpting movements with deep-stratum hydration for absolute sensory deprivation.',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&fit=crop',
    },
    {
        id: 'products',
        title: 'The Melanin Science',
        subtitle: 'Science',
        text: 'Clinical-grade infusions targeting cellular turnover. Non-aggressive, enzyme-based protocols to unify skin tone.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdoJz9mJwJIJluSdLczJFdaiCg1vpzHe0PuxQl9yIQ8wpHifx2QFJ_J1DRvMyCvsLyZck1oSkYujKQdX9vjqgTYH94oT4jWHxeYQGrnfBpm74z1VkT6-TIJbuvGCPTdZaD-P250yXgZF2RTe3CkEZTNPd0WWIdbORLiPiAZr3aKMk981m38MPkUza2yCL6u3HX1AlAWrKChQzwCX8YjWHzzLtY2dQe-LZK1mUUNQTLB-BB4B9fEPjJLDZHKPl36JIKyY-W6n8b4S4',
    },
];

const SERVICES = [
    { id: 'glow', name: 'Aura Glow Facial', duration: '60 min', price: 'P850' },
    { id: 'clarity', name: 'Pigment Clarity Peel', duration: '45 min', price: 'P780' },
    { id: 'sculpt', name: 'Body Sculpt Ritual', duration: '90 min', price: 'P1200' },
    { id: 'restore', name: 'Deep Restore Massage', duration: '75 min', price: 'P950' },
    { id: 'science', name: 'Melanin Science Consultation', duration: '30 min', price: 'P400' },
];

const MOTION = {
    ease: [0.22, 1, 0.36, 1],
    fast: 0.22,
    base: 0.3,
};

const HorizontalSection = ({ section, index, onOpenServices, onBook }) => (
    <section className="w-screen h-screen flex-shrink-0 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
            <img
                src={section.image}
                alt={section.title}
                className="w-full h-full object-cover grayscale-[0.2] brightness-[0.4]"
            />
        </div>

        <div className="relative z-10 max-w-4xl px-8 flex flex-col md:flex-row items-center gap-12 md:gap-24">
            <div className="text-white">
                <motion.span
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45 }}
                    className="block text-amber-500 tracking-[0.4em] text-xs uppercase mb-6"
                >
                    {String(index + 1).padStart(2, '0')} - {section.subtitle}
                </motion.span>

                <motion.h2
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.05 }}
                    className="text-6xl md:text-9xl font-display font-light leading-none mb-10 text-white mix-blend-overlay"
                >
                    {section.title}
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.45, delay: 0.1 }}
                    className="text-stone-300 text-lg md:text-2xl font-light leading-relaxed max-w-xl border-l border-amber-500/50 pl-8"
                >
                    {section.text}
                </motion.p>

                <div className="mt-12 flex flex-wrap items-center gap-4">
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.45, delay: 0.15 }}
                        onClick={onOpenServices}
                        className="group flex items-center gap-4 text-white uppercase tracking-widest text-xs hover:text-amber-500 transition-colors"
                    >
                        View Services & Prices
                        <span className="w-12 h-[1px] bg-white group-hover:w-24 group-hover:bg-amber-500 transition-all"></span>
                    </motion.button>
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.45, delay: 0.2 }}
                        onClick={onBook}
                        className="bg-white text-stone-900 px-5 py-2.5 rounded-full uppercase tracking-widest text-xs font-bold hover:bg-amber-500 transition-colors"
                    >
                        Book Appointment
                    </motion.button>
                </div>
            </div>
        </div>
    </section>
);

const Aura = () => {
    const carouselRef = useRef(null);
    const touchStartY = useRef(0);
    const wheelDeltaRef = useRef(0);
    const lockRef = useRef(false);
    const lastSlideAtRef = useRef(0);
    const wheelResetTimerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [showServices, setShowServices] = useState(false);
    const [showBooking, setShowBooking] = useState(false);
    const [bookingSent, setBookingSent] = useState(false);
    const [selectedService, setSelectedService] = useState(SERVICES[0].id);

    const scrollToIndex = useCallback((nextIndex) => {
        const safeIndex = Math.max(0, Math.min(nextIndex, SECTIONS.length - 1));
        setActiveIndex(safeIndex);
    }, []);

    const requestSlide = useCallback((direction) => {
        if (lockRef.current) return false;
        const nextIndex = Math.max(0, Math.min(activeIndex + direction, SECTIONS.length - 1));
        if (nextIndex === activeIndex) return false;

        scrollToIndex(nextIndex);
        lockRef.current = true;
        window.setTimeout(() => {
            lockRef.current = false;
        }, 560);
        return true;
    }, [activeIndex, scrollToIndex]);

    const handleWheel = useCallback((event) => {
        const now = Date.now();
        const SLIDE_COOLDOWN_MS = 700;
        if (now - lastSlideAtRef.current < SLIDE_COOLDOWN_MS) return;

        wheelDeltaRef.current += event.deltaY;
        if (Math.abs(wheelDeltaRef.current) < 100) return;

        const direction = wheelDeltaRef.current > 0 ? 1 : -1;
        wheelDeltaRef.current = 0;
        const moved = requestSlide(direction);
        if (moved) {
            lastSlideAtRef.current = now;
        }
        return moved;
    }, [requestSlide]);

    useEffect(() => {
        const container = carouselRef.current;
        if (!container) return undefined;

        const onWheel = (event) => {
            const direction = event.deltaY > 0 ? 1 : -1;
            const isAtFirst = activeIndex === 0 && direction < 0;
            const isAtLast = activeIndex === SECTIONS.length - 1 && direction > 0;

            if (isAtFirst || isAtLast) {
                wheelDeltaRef.current = 0;
                return;
            }

            event.preventDefault();
            handleWheel(event);

            if (wheelResetTimerRef.current) {
                window.clearTimeout(wheelResetTimerRef.current);
            }
            wheelResetTimerRef.current = window.setTimeout(() => {
                wheelDeltaRef.current = 0;
            }, 120);
        };

        container.addEventListener('wheel', onWheel, { passive: false });
        return () => {
            container.removeEventListener('wheel', onWheel);
            if (wheelResetTimerRef.current) {
                window.clearTimeout(wheelResetTimerRef.current);
            }
        };
    }, [activeIndex, handleWheel]);

    const progress = (activeIndex + 1) / SECTIONS.length;

    const openBooking = () => {
        setBookingSent(false);
        setShowBooking(true);
    };

    const submitBooking = (event) => {
        event.preventDefault();
        setBookingSent(true);
    };

    return (
        <div className="bg-stone-950 font-sans text-stone-100 selection:bg-amber-500 selection:text-black">
            <style>{`
                .font-display { font-family: 'Cormorant Garamond', serif; }
                ::-webkit-scrollbar { width: 0px; background: transparent; }
            `}</style>

            <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-8 mix-blend-exclusion text-white pointer-events-none">
                <Link to="/" className="text-3xl font-display font-semibold tracking-tighter pointer-events-auto">AURA</Link>
                <div className="flex gap-4 items-center">
                    <span className="text-xs uppercase tracking-widest hidden md:inline">Scroll to Explore</span>
                    <div className="w-16 h-[1px] bg-white/30 hidden md:block"></div>
                </div>
                <Link to="/" className="bg-white text-black px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-amber-200 transition-colors pointer-events-auto">
                    Exit
                </Link>
            </nav>

            <div
                ref={carouselRef}
                onTouchStart={(event) => { touchStartY.current = event.touches[0].clientY; }}
                onTouchEnd={(event) => {
                    const delta = touchStartY.current - event.changedTouches[0].clientY;
                    if (Math.abs(delta) < 40) return;
                    requestSlide(delta > 0 ? 1 : -1);
                }}
                className="h-screen overflow-hidden"
            >
                <motion.div
                    className="flex h-full"
                    animate={{ x: `-${activeIndex * 100}vw` }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                    {SECTIONS.map((section, index) => (
                        <HorizontalSection
                            key={section.id}
                            section={section}
                            index={index}
                            onOpenServices={() => setShowServices(true)}
                            onBook={openBooking}
                        />
                    ))}
                </motion.div>
            </div>

            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3">
                {SECTIONS.map((section, index) => (
                    <button
                        key={section.id}
                        onClick={() => scrollToIndex(index)}
                        className={`h-2 rounded-full transition-all ${index === activeIndex ? 'w-10 bg-amber-500' : 'w-2 bg-white/40 hover:bg-white/70'}`}
                        aria-label={`Go to ${section.subtitle}`}
                    />
                ))}
            </div>

            <div className="fixed bottom-0 left-0 h-1 bg-amber-500 z-50 origin-left transition-all duration-300" style={{ width: `${progress * 100}%` }} />

            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: activeIndex === SECTIONS.length - 1 ? 1 : 0, y: activeIndex === SECTIONS.length - 1 ? 0 : 12 }}
                transition={{ duration: MOTION.fast, ease: MOTION.ease }}
                className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
            >
                <div className="pointer-events-auto bg-stone-950/70 border border-white/10 backdrop-blur-xl rounded-2xl px-5 py-4 md:px-6 md:py-5 text-center shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
                    <p className="text-xs uppercase tracking-[0.2em] text-amber-400 mb-2">Begin Your Ritual</p>
                    <p className="text-stone-300 text-sm mb-3">Gaborone, Botswana - +267 71 000 000</p>
                    <button
                        onClick={openBooking}
                        className="bg-white text-stone-900 px-6 py-2.5 uppercase tracking-widest text-xs font-bold hover:bg-amber-500 transition-colors rounded-full"
                    >
                        Book Appointment
                    </button>
                </div>
            </motion.div>

            <AnimatePresence>
                {showServices && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: MOTION.fast }}
                        className="fixed inset-0 z-[70] bg-black/45 backdrop-blur-[2px]"
                        onClick={() => setShowServices(false)}
                    >
                        <motion.aside
                            initial={{ x: 380, opacity: 0 }}
                            animate={{ x: 0 }}
                            exit={{ x: 380, opacity: 0 }}
                            transition={{ duration: MOTION.base, ease: MOTION.ease }}
                            onClick={(event) => event.stopPropagation()}
                            className="absolute right-0 top-0 h-full w-full max-w-md bg-stone-950/74 border-l border-white/10 backdrop-blur-2xl p-6 md:p-8 overflow-y-auto shadow-[-30px_0_80px_rgba(0,0,0,0.45)]"
                        >
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.08] via-transparent to-transparent" />
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-3xl font-display text-white leading-none">Services & Prices</h3>
                                <button
                                    onClick={() => setShowServices(false)}
                                    className="text-stone-400 hover:text-white"
                                    aria-label="Close services"
                                >
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>

                            <p className="text-stone-300/85 text-sm leading-relaxed mb-6">
                                Tailored rituals for melanated skin. Calm results, measured care, and premium protocols.
                            </p>

                            <div className="space-y-2.5 relative">
                                {SERVICES.map((service, index) => (
                                    <motion.div
                                        key={service.id}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: MOTION.fast, delay: index * 0.035, ease: MOTION.ease }}
                                        whileHover={{ y: -2 }}
                                        className="rounded-xl border border-white/10 bg-stone-900/55 p-4 transition-colors hover:border-amber-300/40"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <p className="text-white text-sm md:text-[15px] font-semibold">{service.name}</p>
                                                <p className="text-stone-400 text-[11px] uppercase tracking-[0.14em] mt-1">{service.duration}</p>
                                            </div>
                                            <p className="text-amber-300 text-[15px] font-semibold">{service.price}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <button
                                onClick={() => {
                                    setShowServices(false);
                                    openBooking();
                                }}
                                className="mt-6 w-full bg-white text-stone-900 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-amber-200 transition-colors"
                            >
                                Book a Service
                            </button>
                        </motion.aside>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showBooking && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: MOTION.fast }}
                        className="fixed inset-0 z-[80] bg-black/55 backdrop-blur-[2px] px-4 flex items-center justify-center"
                        onClick={() => setShowBooking(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 14, scale: 0.99 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.99 }}
                            transition={{ duration: MOTION.base, ease: MOTION.ease }}
                            onClick={(event) => event.stopPropagation()}
                            className="w-full max-w-xl rounded-2xl border border-white/10 bg-stone-950/78 backdrop-blur-2xl p-6 md:p-8 shadow-[0_30px_70px_rgba(0,0,0,0.5)]"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-display text-white">Book Appointment</h3>
                                <button
                                    onClick={() => setShowBooking(false)}
                                    className="text-stone-400 hover:text-white"
                                    aria-label="Close booking"
                                >
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>

                            {bookingSent ? (
                                <div className="text-center py-10">
                                    <p className="text-amber-400 uppercase tracking-[0.2em] text-xs mb-3">Request Sent</p>
                                    <p className="text-stone-200">Your appointment request was received. We will contact you shortly.</p>
                                </div>
                            ) : (
                                <form onSubmit={submitBooking} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">Name</label>
                                            <input required type="text" className="w-full bg-stone-900 border border-stone-700 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-500" />
                                        </div>
                                        <div>
                                            <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">Phone</label>
                                            <input required type="tel" className="w-full bg-stone-900 border border-stone-700 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-500" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">Service</label>
                                            <select
                                                value={selectedService}
                                                onChange={(event) => setSelectedService(event.target.value)}
                                                className="w-full bg-stone-900 border border-stone-700 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-500"
                                            >
                                                {SERVICES.map((service) => (
                                                    <option key={service.id} value={service.id}>{service.name} - {service.price}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">Date</label>
                                            <input required type="date" className="w-full bg-stone-900 border border-stone-700 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-500" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">Notes</label>
                                        <textarea rows="3" className="w-full bg-stone-900 border border-stone-700 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-500 resize-none" placeholder="Preferred time, skin concerns, or special requests." />
                                    </div>
                                    <button className="w-full bg-white text-stone-900 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-amber-500 transition-colors">
                                        Confirm Booking Request
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Aura;
