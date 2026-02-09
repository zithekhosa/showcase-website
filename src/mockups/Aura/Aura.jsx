import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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

const HorizontalSection = ({ section, index }) => (
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

                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.45, delay: 0.15 }}
                    className="mt-12 group flex items-center gap-4 text-white uppercase tracking-widest text-xs hover:text-amber-500 transition-colors"
                >
                    Explore {section.subtitle}
                    <span className="w-12 h-[1px] bg-white group-hover:w-24 group-hover:bg-amber-500 transition-all"></span>
                </motion.button>
            </div>
        </div>
    </section>
);

const Aura = () => {
    const carouselRef = useRef(null);
    const touchStartY = useRef(0);
    const wheelDeltaRef = useRef(0);
    const lockRef = useRef(false);
    const [activeIndex, setActiveIndex] = useState(0);

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
        wheelDeltaRef.current += event.deltaY;
        if (Math.abs(wheelDeltaRef.current) < 70) return;

        const direction = wheelDeltaRef.current > 0 ? 1 : -1;
        wheelDeltaRef.current = 0;
        const moved = requestSlide(direction);
        if (moved) event.preventDefault();
    }, [requestSlide]);

    useEffect(() => {
        const clearWheelAccumulator = () => {
            wheelDeltaRef.current = 0;
        };
        window.addEventListener('scroll', clearWheelAccumulator, { passive: true });
        return () => window.removeEventListener('scroll', clearWheelAccumulator);
    }, []);

    const progress = (activeIndex + 1) / SECTIONS.length;

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
                onWheel={handleWheel}
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
                        <HorizontalSection key={section.id} section={section} index={index} />
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

            <div className="h-screen flex items-center justify-center bg-stone-900 border-t border-stone-800 relative z-10">
                <div className="text-center">
                    <h2 className="text-6xl font-display mb-8">Begin Your Ritual</h2>
                    <p className="text-stone-500 mb-12 max-w-md mx-auto">Gaborone, Botswana - +267 71 000 000</p>
                    <button className="bg-white text-stone-900 px-12 py-4 uppercase tracking-widest text-sm font-bold hover:bg-amber-500 transition-colors">
                        Book Appointment
                    </button>
                    <p className="mt-24 text-stone-600 text-xs uppercase tracking-widest">© 2026 Aura Wellness.</p>
                </div>
            </div>
        </div>
    );
};

export default Aura;
