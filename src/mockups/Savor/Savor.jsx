import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

const MENU_CATEGORIES = ['Starters', 'Mains', 'Steaks', 'Desserts', 'Cocktails'];

const MENU_ITEMS = {
    Starters: [
        {
            id: 's1',
            name: 'Wagyu Beef Carpaccio',
            price: 'P240',
            desc: 'Truffle oil, parmesan shavings, capers.',
            ingredients: ['Wagyu beef', 'Truffle oil', 'Parmesan', 'Capers'],
            image: 'https://images.unsplash.com/photo-1546241072-48010ad2862c?w=1400&fit=crop',
            prep: '8 min',
            heat: 'Mild',
            badge: 'Signature',
            dietary: ['Gluten Free'],
        },
        {
            id: 's2',
            name: 'Pan-Seared Scallops',
            price: 'P220',
            desc: 'Cauliflower puree, crispy pancetta.',
            ingredients: ['Scallops', 'Cauliflower puree', 'Pancetta', 'Lemon butter'],
            image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=1400&fit=crop',
            prep: '10 min',
            heat: 'None',
            badge: 'Chef Pick',
            dietary: ['High Protein'],
        },
        {
            id: 's3',
            name: 'Burrata & Heirloom',
            price: 'P190',
            desc: 'Basil pesto, balsamic glaze, sourdough.',
            ingredients: ['Burrata', 'Heirloom tomato', 'Basil pesto', 'Sourdough'],
            image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=1400&fit=crop',
            prep: '7 min',
            heat: 'None',
            badge: 'Fresh',
            dietary: ['Vegetarian'],
        },
    ],
    Mains: [
        {
            id: 'm1',
            name: 'Miso Glazed Black Cod',
            price: 'P420',
            desc: 'Bok choy, ginger dashi broth.',
            ingredients: ['Black cod', 'White miso', 'Bok choy', 'Ginger dashi'],
            image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=1400&fit=crop',
            prep: '18 min',
            heat: 'Mild',
            badge: 'Popular',
            dietary: ['Contains Fish'],
        },
        {
            id: 'm2',
            name: 'Herb-Crusted Lamb Rack',
            price: 'P380',
            desc: 'Fondant potato, red wine jus.',
            ingredients: ['Lamb rack', 'Fresh herbs', 'Fondant potato', 'Red wine jus'],
            image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=1400&fit=crop',
            prep: '22 min',
            heat: 'Medium',
            badge: 'House Special',
            dietary: ['Spicy'],
        },
        {
            id: 'm3',
            name: 'Wild Mushroom Risotto',
            price: 'P320',
            desc: 'Porcini dust, truffle oil, parmesan crisp.',
            ingredients: ['Arborio rice', 'Wild mushrooms', 'Truffle oil', 'Parmesan'],
            image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=1400&fit=crop',
            prep: '16 min',
            heat: 'None',
            badge: 'Vegetarian',
            dietary: ['Vegetarian'],
        },
    ],
    Steaks: [
        {
            id: 'st1',
            name: 'Ribeye (12oz)',
            price: 'P550',
            desc: 'Dry-aged 45 days, grass-fed.',
            ingredients: ['12oz ribeye', 'Sea salt', 'Cracked pepper', 'Garlic butter'],
            image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1400&fit=crop',
            prep: '24 min',
            heat: 'Custom',
            badge: 'Prime Cut',
            dietary: ['High Protein'],
        },
        {
            id: 'st2',
            name: 'Fillet Mignon (8oz)',
            price: 'P620',
            desc: 'Center cut, tender and lean.',
            ingredients: ['8oz fillet', 'Thyme', 'Butter', 'Pan jus'],
            image: 'https://images.unsplash.com/photo-1558030006-4b50986be430?w=1400&fit=crop',
            prep: '20 min',
            heat: 'Custom',
            badge: 'Premium',
            dietary: ['Lean Cut'],
        },
    ],
    Desserts: [
        {
            id: 'd1',
            name: 'Dark Chocolate Fondant',
            price: 'P160',
            desc: 'Salted caramel center, vanilla bean ice cream.',
            ingredients: ['Dark chocolate', 'Salted caramel', 'Vanilla bean ice cream', 'Cocoa'],
            image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=1400&fit=crop',
            prep: '9 min',
            heat: 'Warm',
            badge: 'Top Rated',
            dietary: ['Contains Dairy'],
        },
        {
            id: 'd2',
            name: 'Lemon Basil Tart',
            price: 'P140',
            desc: 'Italian meringue, raspberry coulis.',
            ingredients: ['Lemon curd', 'Basil', 'Italian meringue', 'Raspberry coulis'],
            image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=1400&fit=crop',
            prep: '7 min',
            heat: 'Chilled',
            badge: 'Seasonal',
            dietary: ['Vegetarian'],
        },
    ],
    Cocktails: [
        {
            id: 'c1',
            name: 'Smoked Old Fashioned',
            price: 'P180',
            desc: 'Bourbon, maple syrup, angostura bitters, oak smoke.',
            ingredients: ['Bourbon', 'Maple syrup', 'Angostura bitters', 'Oak smoke'],
            image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1400&fit=crop',
            prep: '6 min',
            heat: 'Smoked',
            badge: 'Classic',
            dietary: ['Contains Alcohol'],
        },
        {
            id: 'c2',
            name: 'Lychee Martini',
            price: 'P160',
            desc: 'Vodka, lychee liqueur, lime juice.',
            ingredients: ['Vodka', 'Lychee liqueur', 'Lime juice', 'Lychee fruit'],
            image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=1400&fit=crop',
            prep: '5 min',
            heat: 'Cold',
            badge: 'Signature',
            dietary: ['Contains Alcohol'],
        },
    ],
};

const DISH_REVIEWS = {
    s1: [
        { name: 'Ruth M.', rating: 5, text: 'Paper-thin wagyu and truffle aroma, best starter tonight.' },
        { name: 'Dwayne T.', rating: 5, text: 'Light, rich, balanced. Exactly what I wanted before mains.' },
    ],
    m1: [
        { name: 'Tanya K.', rating: 5, text: 'Cod was buttery and perfectly glazed, texture was unreal.' },
        { name: 'Victor L.', rating: 4, text: 'Great depth in the broth, portion felt just right.' },
    ],
    st1: [
        { name: 'Lebo P.', rating: 5, text: 'Cooked exactly medium-rare, deep dry-aged flavor.' },
        { name: 'Ari N.', rating: 5, text: 'Prime cut quality. Easily my favorite ribeye this month.' },
    ],
    d1: [
        { name: 'Nono S.', rating: 5, text: 'Fondant center was molten and not overly sweet.' },
        { name: 'Palesa R.', rating: 4, text: 'Great finish to dinner. Ice cream worked very well.' },
    ],
};

const STAFF_TEAM = [
    {
        id: 'chef-1',
        name: 'Chef Amara',
        role: 'Executive Chef',
        focus: 'Fire-Grilled Signatures',
        shift: 'Kitchen Lead',
        photo: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=900&fit=crop',
    },
    {
        id: 'waiter-1',
        name: 'Kabelo M.',
        role: 'Senior Waiter',
        focus: 'Steak & Pairing Guide',
        shift: 'Dinner Service',
        photo: 'https://images.unsplash.com/photo-1614890085619-0e1054ddf6cc?w=900&fit=crop',
    },
    {
        id: 'waiter-2',
        name: 'Naledi R.',
        role: 'Service Captain',
        focus: 'Guest Experience',
        shift: 'Floor Manager',
        photo: 'https://images.unsplash.com/photo-1600488992020-8ba2726fd7b9?w=900&fit=crop',
    },
    {
        id: 'sommelier-1',
        name: 'Thabo L.',
        role: 'Sommelier',
        focus: 'Wine & Cocktail Pairings',
        shift: 'Evening Pairings',
        photo: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=900&fit=crop',
    },
];

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const DAILY_SPECIALS = {
    Monday: [
        { id: 'mon-1', name: 'Truffle Mushroom Toast', price: 'P145', badge: 'Lunch Kickoff', hook: 'Light, earthy, and ideal for a Monday reset.' },
        { id: 'mon-2', name: 'Citrus Black Cod Bowl', price: 'P290', badge: 'Chef Pick', hook: 'Bright citrus glaze over silky cod and greens.' },
    ],
    Tuesday: [
        { id: 'tue-1', name: 'Seared Steak Tacos', price: 'P210', badge: 'Limited', hook: 'Smoky ribeye slices, house salsa, crispy slaw.' },
        { id: 'tue-2', name: 'Lychee Ginger Spritz', price: 'P120', badge: 'Pairing', hook: 'Fresh and aromatic with a ginger finish.' },
    ],
    Wednesday: [
        { id: 'wed-1', name: 'Midweek Lamb Cutlet', price: 'P260', badge: 'Popular', hook: 'Charred cutlets with rosemary jus and potato fondant.' },
        { id: 'wed-2', name: 'Chocolate Salt Tart', price: 'P135', badge: 'Dessert Drop', hook: 'Dark cocoa richness balanced with sea salt.' },
    ],
    Thursday: [
        { id: 'thu-1', name: 'Garlic Butter Prawn Plate', price: 'P275', badge: 'Seafood Night', hook: 'Buttery prawns with lemon herb rice.' },
        { id: 'thu-2', name: 'Basil Citrus Cooler', price: 'P95', badge: 'Fresh', hook: 'Clean herbal finish, perfect pre-dinner sip.' },
    ],
    Friday: [
        { id: 'fri-1', name: 'Fire-Grilled Ribeye Board', price: 'P380', badge: 'Weekend Start', hook: 'Bold crust, juicy center, and smoky potato wedges.' },
        { id: 'fri-2', name: 'Signature Espresso Fondant', price: 'P160', badge: 'Top Rated', hook: 'Warm center with espresso caramel drizzle.' },
    ],
    Saturday: [
        { id: 'sat-1', name: 'Chef Amara Tasting Plate', price: 'P420', badge: 'Chef Signature', hook: 'Three mini courses crafted around seasonal mood.' },
        { id: 'sat-2', name: 'Smoked Old Fashioned Flight', price: 'P260', badge: 'Bar Special', hook: 'Two oak-smoked variations and one classic pour.' },
    ],
    Sunday: [
        { id: 'sun-1', name: 'Slow Roast Family Board', price: 'P450', badge: 'Sunday Table', hook: 'Roast cuts, warm sides, and rich house gravy.' },
        { id: 'sun-2', name: 'Vanilla Citrus Parfait', price: 'P130', badge: 'Sunday Sweet', hook: 'Soft cream layers with bright fruit zest.' },
    ],
};

const STAFF_RATINGS = [
    { memberId: 'waiter-1', average: 4.9, votes: 38, highlight: 'Fast service and excellent pairings.' },
    { memberId: 'waiter-2', average: 4.8, votes: 34, highlight: 'Warm welcome and strong attention to detail.' },
    { memberId: 'sommelier-1', average: 4.7, votes: 29, highlight: 'Great drink recommendations for each course.' },
];

const FLUID = {
    fast: 0.22,
    base: 0.36,
    ease: [0.22, 1, 0.36, 1],
};

const stars = (rating) => String.fromCharCode(9733).repeat(rating);
const PRIMARY_TABS = ['Menu', 'Daily Specials', 'Meet Team'];
const FALLBACK_REVIEWS = [
    { name: 'Guest', rating: 5, text: 'Beautiful presentation and great flavor balance.' },
    { name: 'Table 6', rating: 4, text: 'Would order this again, very well executed dish.' },
];

const VIEW_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
};

const STAGGER_VARIANTS = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.06,
        },
    },
};

const REVEAL_VARIANTS = {
    hidden: { opacity: 0, y: 14 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: FLUID.base,
            ease: FLUID.ease,
        },
    },
};

const Savor = () => {
    const prefersReducedMotion = useReducedMotion();
    const { scrollYProgress } = useScroll();
    const smoothScrollProgress = useSpring(scrollYProgress, {
        stiffness: 180,
        damping: 30,
        mass: 0.32,
    });
    const [activeView, setActiveView] = useState('Menu');
    const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0]);
    const [activeSpecialDay, setActiveSpecialDay] = useState(() => {
        const today = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());
        return WEEK_DAYS.includes(today) ? today : 'Monday';
    });
    const [detailsItem, setDetailsItem] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const stickyHeaderRef = useRef(null);

    const ratedStaff = useMemo(() => {
        const memberMap = Object.fromEntries(STAFF_TEAM.map((member) => [member.id, member]));
        return STAFF_RATINGS
            .map((entry) => ({ ...entry, member: memberMap[entry.memberId] }))
            .filter((entry) => entry.member)
            .sort((a, b) => (b.average - a.average) || (b.votes - a.votes));
    }, []);

    const waiterOfWeek = ratedStaff[0] ?? null;
    const ratingsByMemberId = useMemo(
        () => Object.fromEntries(ratedStaff.map((entry) => [entry.memberId, entry])),
        [ratedStaff],
    );

    useEffect(() => {
        if (activeView !== 'Menu') {
            return undefined;
        }

        const setupObserver = () => {
            const headerOffset = (stickyHeaderRef.current?.offsetHeight ?? 0) + 24;
            const sections = MENU_CATEGORIES
                .map((category) => document.getElementById(`menu-category-${category}`))
                .filter(Boolean);

            if (!sections.length) {
                return () => {};
            }

            const observer = new IntersectionObserver(
                (entries) => {
                    const visible = entries
                        .filter((entry) => entry.isIntersecting)
                        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

                    if (!visible) return;
                    const nextCategory = visible.target.getAttribute('data-category');
                    if (!nextCategory) return;
                    setActiveCategory((prev) => (prev === nextCategory ? prev : nextCategory));
                },
                {
                    root: null,
                    rootMargin: `-${headerOffset}px 0px -55% 0px`,
                    threshold: [0.1, 0.35, 0.6],
                },
            );

            sections.forEach((section) => observer.observe(section));

            return () => observer.disconnect();
        };

        let cleanupObserver = setupObserver();
        const handleResize = () => {
            cleanupObserver();
            cleanupObserver = setupObserver();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cleanupObserver();
            window.removeEventListener('resize', handleResize);
        };
    }, [activeView]);

    useEffect(() => {
        const previous = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = 'auto';

        return () => {
            document.documentElement.style.scrollBehavior = previous;
        };
    }, []);

    useEffect(() => {
        const previousOverflow = document.body.style.overflow;

        if (isDetailsOpen) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isDetailsOpen]);

    useEffect(() => {
        if (!isDetailsOpen) {
            return undefined;
        }

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsDetailsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isDetailsOpen]);

    const openDetails = (item) => {
        setDetailsItem(item);
        setIsDetailsOpen(true);
    };

    const closeDetails = () => setIsDetailsOpen(false);

    const activeReviews = detailsItem
        ? (DISH_REVIEWS[detailsItem.id] ?? FALLBACK_REVIEWS)
        : [];

    const scrollToCategory = (category) => {
        const section = document.getElementById(`menu-category-${category}`);
        if (!section) return;

        const headerHeight = stickyHeaderRef.current?.offsetHeight ?? 0;
        const top = section.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
        const distance = Math.abs(window.scrollY - top);
        const useSmooth = !prefersReducedMotion && distance < window.innerHeight * 1.5;

        if (useSmooth) {
            window.scrollTo({ top, behavior: 'smooth' });
        } else {
            // Use numeric signature for deterministic long jumps.
            window.scrollTo(0, top);
        }
    };

    return (
        <div className="font-serif bg-stone-950 text-stone-100 min-h-screen selection:bg-orange-500 selection:text-white relative overflow-x-hidden">
            <motion.div
                aria-hidden
                className="fixed top-0 left-0 right-0 h-[2px] z-[70] origin-left bg-gradient-to-r from-orange-500 via-amber-300 to-orange-500"
                style={{ scaleX: smoothScrollProgress }}
            />
            <motion.div
                aria-hidden
                className="pointer-events-none absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-orange-500/10 blur-[120px] hidden md:block"
                animate={prefersReducedMotion ? {} : { x: [0, 35, -20, 0], y: [0, -18, 24, 0] }}
                transition={prefersReducedMotion ? {} : { duration: 18, ease: 'easeInOut', repeat: Infinity }}
            />
            <motion.div
                aria-hidden
                className="pointer-events-none absolute -bottom-24 -right-20 w-[460px] h-[460px] rounded-full bg-amber-400/10 blur-[120px] hidden md:block"
                animate={prefersReducedMotion ? {} : { x: [0, -25, 20, 0], y: [0, 22, -18, 0] }}
                transition={prefersReducedMotion ? {} : { duration: 20, ease: 'easeInOut', repeat: Infinity }}
            />

            <motion.div whileHover={prefersReducedMotion ? {} : { y: -2, scale: 1.02 }} transition={{ duration: FLUID.fast, ease: FLUID.ease }}>
                <Link to="/" className="fixed bottom-8 right-8 z-50 bg-orange-600/90 text-white px-6 py-3 rounded-full shadow-lg font-sans font-bold uppercase tracking-wider text-xs hover:bg-orange-500 transition-colors backdrop-blur-sm">
                    Exit Showcase
                </Link>
            </motion.div>

            <section className="pt-24 px-5 md:px-10 relative z-10">
                <motion.div
                    initial={prefersReducedMotion ? false : 'hidden'}
                    animate={prefersReducedMotion ? undefined : 'visible'}
                    variants={STAGGER_VARIANTS}
                    className="max-w-7xl mx-auto mb-10"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-7 lg:gap-12 items-end">
                        <motion.div variants={REVEAL_VARIANTS}>
                            <motion.span variants={REVEAL_VARIANTS} className="font-sans text-orange-400 text-xs uppercase tracking-[0.25em] font-bold block">
                                Fine Dining Experience
                            </motion.span>
                            <motion.h1 variants={REVEAL_VARIANTS} className="text-4xl md:text-7xl font-thin italic mt-4 leading-[0.95]">
                                A fluid menu crafted around mood, season, and fire.
                            </motion.h1>
                            <motion.p variants={REVEAL_VARIANTS} className="font-sans text-stone-400 max-w-2xl mt-5 text-sm md:text-lg leading-relaxed">
                                Signature plates move from raw elegance to slow heat. Tap any dish to open a full detail view with guest reviews.
                            </motion.p>
                        </motion.div>
                        <motion.div
                            variants={REVEAL_VARIANTS}
                            whileHover={prefersReducedMotion ? {} : { y: -3 }}
                            transition={{ duration: FLUID.fast, ease: FLUID.ease }}
                            className="bg-stone-900/70 border border-stone-800 rounded-2xl p-4 md:p-5 font-sans"
                        >
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
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            <header ref={stickyHeaderRef} className="sticky top-0 z-50 bg-stone-950/95 backdrop-blur-md border-b border-stone-800">
                <div className="flex items-center justify-between px-5 md:px-8 py-4">
                    <span className="text-xl md:text-2xl font-black tracking-tighter">SAVOR.</span>
                    <span className="font-sans text-[11px] uppercase tracking-[0.22em] text-stone-400">Digital Menu</span>
                </div>

                <div className="px-5 md:px-8 pb-3">
                    <LayoutGroup id="primary-tabs">
                        <div className="inline-flex rounded-full border border-stone-800 bg-stone-900/80 p-1">
                            {PRIMARY_TABS.map((tab) => (
                                <motion.button
                                    type="button"
                                    key={tab}
                                    whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
                                    whileHover={prefersReducedMotion ? {} : { y: -1 }}
                                    transition={{ duration: FLUID.fast, ease: FLUID.ease }}
                                    onClick={() => {
                                        setActiveView(tab);
                                        closeDetails();
                                        if (tab === 'Menu' && activeView === 'Menu') {
                                            scrollToCategory(activeCategory);
                                        }
                                    }}
                                    className={`relative px-4 py-2 rounded-full font-sans text-[11px] font-bold uppercase tracking-[0.16em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70 ${activeView === tab ? 'text-black' : 'text-stone-400 hover:text-stone-200'}`}
                                >
                                    {activeView === tab && (
                                        <motion.span
                                            layoutId="primary-tab-indicator"
                                            className="absolute inset-0 rounded-full bg-orange-500 shadow-[0_0_24px_rgba(249,115,22,0.32)]"
                                            transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10">{tab}</span>
                                </motion.button>
                            ))}
                        </div>
                    </LayoutGroup>
                </div>

                {activeView === 'Menu' && (
                    <div className="overflow-x-auto pb-4 px-5 md:px-8">
                        <LayoutGroup id="menu-categories">
                            <div className="flex gap-2 w-max">
                                {MENU_CATEGORIES.map((category) => (
                                    <motion.button
                                        type="button"
                                        key={category}
                                        whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
                                        whileHover={prefersReducedMotion ? {} : { y: -1 }}
                                        transition={{ duration: FLUID.fast, ease: FLUID.ease }}
                                        onClick={() => {
                                            setActiveCategory(category);
                                            scrollToCategory(category);
                                        }}
                                        className={`relative px-5 py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70 ${activeCategory === category ? 'text-black' : 'text-stone-400 bg-stone-900 border border-stone-800'}`}
                                    >
                                        {activeCategory === category && (
                                            <motion.span
                                                layoutId="menu-category-indicator"
                                                className="absolute inset-0 rounded-full bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.28)]"
                                                transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 350, damping: 28 }}
                                            />
                                        )}
                                        <span className="relative z-10">{category}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </LayoutGroup>
                    </div>
                )}
            </header>

            <main className="px-5 md:px-8 pt-6 pb-20 max-w-4xl mx-auto">
                <AnimatePresence mode="wait" initial={false}>
                    {activeView === 'Menu' ? (
                        <motion.div
                            key="menu-view"
                            variants={VIEW_VARIANTS}
                            initial={prefersReducedMotion ? false : 'hidden'}
                            animate={prefersReducedMotion ? undefined : 'visible'}
                            exit={prefersReducedMotion ? undefined : 'exit'}
                            transition={{ duration: FLUID.base, ease: FLUID.ease }}
                            className="space-y-10"
                        >
                            {MENU_CATEGORIES.map((category) => (
                                <section key={category} id={`menu-category-${category}`} data-category={category} className="scroll-mt-40">
                                    <motion.h2
                                        initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                                        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.6 }}
                                        transition={{ duration: FLUID.base, ease: FLUID.ease }}
                                        className="text-2xl md:text-3xl font-thin italic mb-5 text-stone-500"
                                    >
                                        {category}
                                    </motion.h2>
                                    <motion.div
                                        variants={STAGGER_VARIANTS}
                                        initial={prefersReducedMotion ? false : 'hidden'}
                                        whileInView={prefersReducedMotion ? undefined : 'visible'}
                                        viewport={{ once: true, amount: 0.25 }}
                                        className="space-y-4 md:space-y-5"
                                    >
                                        {MENU_ITEMS[category].map((item) => (
                                            <motion.button
                                                type="button"
                                                key={item.id}
                                                layoutId={`dish-card-${item.id}`}
                                                variants={REVEAL_VARIANTS}
                                                whileTap={prefersReducedMotion ? {} : { scale: 0.99 }}
                                                whileHover={prefersReducedMotion ? {} : { y: -2 }}
                                                transition={{ duration: FLUID.fast, ease: FLUID.ease }}
                                                onClick={() => openDetails(item)}
                                                className="group w-full text-left border-b border-stone-800 pb-5 px-1 rounded-lg touch-manipulation hover:bg-stone-900/35 hover:border-orange-400/35 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70"
                                            >
                                                <div className="w-full">
                                                    <div className="flex justify-between items-start mb-2 gap-3">
                                                        <h3 className="text-lg md:text-xl font-medium text-stone-200 leading-tight">{item.name}</h3>
                                                        <div className="text-right shrink-0">
                                                            <p className="text-orange-300 font-sans text-sm md:text-base whitespace-nowrap">{item.price}</p>
                                                            <p className="font-sans text-[10px] uppercase tracking-[0.14em] text-stone-500 mt-1 inline-flex items-center gap-1">
                                                                tap to view
                                                                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">{'->'}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <p className="text-stone-500 text-xs md:text-sm font-sans leading-relaxed">{item.desc}</p>
                                                </div>
                                            </motion.button>
                                        ))}
                                    </motion.div>
                                </section>
                            ))}
                        </motion.div>
                    ) : activeView === 'Daily Specials' ? (
                        <motion.section
                            key="specials-view"
                            variants={VIEW_VARIANTS}
                            initial={prefersReducedMotion ? false : 'hidden'}
                            animate={prefersReducedMotion ? undefined : 'visible'}
                            exit={prefersReducedMotion ? undefined : 'exit'}
                            transition={{ duration: FLUID.base, ease: FLUID.ease }}
                            className="rounded-2xl border border-stone-800 bg-stone-900/60 p-4 md:p-6"
                        >
                            <motion.div variants={REVEAL_VARIANTS} initial={prefersReducedMotion ? false : 'hidden'} animate={prefersReducedMotion ? undefined : 'visible'} className="mb-4">
                                <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-orange-300">Daily Specials</p>
                                <h2 className="text-2xl md:text-3xl font-thin italic mt-2">Monday to Sunday Highlights</h2>
                                <p className="font-sans text-sm text-stone-400 mt-2">Fresh rotations and limited picks to keep every visit exciting.</p>
                            </motion.div>

                            <div className="overflow-x-auto pb-2">
                                <LayoutGroup id="special-day-tabs">
                                    <div className="flex gap-2 w-max">
                                        {WEEK_DAYS.map((day) => (
                                            <motion.button
                                                type="button"
                                                key={day}
                                                whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
                                                whileHover={prefersReducedMotion ? {} : { y: -1 }}
                                                transition={{ duration: FLUID.fast, ease: FLUID.ease }}
                                                onClick={() => setActiveSpecialDay(day)}
                                                className={`relative px-4 py-2 rounded-full font-sans text-[11px] font-bold uppercase tracking-[0.14em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70 ${activeSpecialDay === day ? 'text-black' : 'text-stone-400 bg-stone-900 border border-stone-800'}`}
                                            >
                                                {activeSpecialDay === day && (
                                                    <motion.span
                                                        layoutId="special-day-indicator"
                                                        className="absolute inset-0 rounded-full bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.28)]"
                                                        transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 350, damping: 28 }}
                                                    />
                                                )}
                                                <span className="relative z-10">{day.slice(0, 3)}</span>
                                            </motion.button>
                                        ))}
                                    </div>
                                </LayoutGroup>
                            </div>

                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key={activeSpecialDay}
                                    variants={STAGGER_VARIANTS}
                                    initial={prefersReducedMotion ? false : 'hidden'}
                                    animate={prefersReducedMotion ? undefined : 'visible'}
                                    exit={prefersReducedMotion ? undefined : 'hidden'}
                                    className="mt-5 space-y-3"
                                >
                                    {(DAILY_SPECIALS[activeSpecialDay] ?? []).map((special) => (
                                        <motion.article
                                            key={special.id}
                                            variants={REVEAL_VARIANTS}
                                            whileHover={prefersReducedMotion ? {} : { y: -2 }}
                                            transition={{ duration: FLUID.fast, ease: FLUID.ease }}
                                            className="rounded-xl border border-stone-800 bg-stone-950/80 p-4 md:p-5"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-orange-300">{special.badge}</p>
                                                    <h3 className="text-xl md:text-2xl font-thin mt-1">{special.name}</h3>
                                                </div>
                                                <p className="font-sans text-orange-300 whitespace-nowrap">{special.price}</p>
                                            </div>
                                            <p className="font-sans text-sm text-stone-400 mt-2">{special.hook}</p>
                                        </motion.article>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        </motion.section>
                    ) : (
                        <motion.section
                            key="team-view"
                            variants={VIEW_VARIANTS}
                            initial={prefersReducedMotion ? false : 'hidden'}
                            animate={prefersReducedMotion ? undefined : 'visible'}
                            exit={prefersReducedMotion ? undefined : 'exit'}
                            transition={{ duration: FLUID.base, ease: FLUID.ease }}
                            className="rounded-2xl border border-stone-800 bg-stone-900/60 p-4 md:p-6"
                        >
                            <motion.div variants={REVEAL_VARIANTS} initial={prefersReducedMotion ? false : 'hidden'} animate={prefersReducedMotion ? undefined : 'visible'} className="mb-4 md:mb-5">
                                <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-orange-300">Meet the Team</p>
                                <h2 className="text-2xl md:text-3xl font-thin italic mt-2">Waiters, Staff, and Chef on Duty</h2>
                            </motion.div>

                            {waiterOfWeek && (
                                <motion.div
                                    initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                                    animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                                    transition={{ duration: FLUID.base, ease: FLUID.ease }}
                                    className="mb-5 rounded-xl border border-orange-400/30 bg-orange-500/10 p-4"
                                >
                                    <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-orange-200">Waiter of the Week</p>
                                    <div className="flex items-center justify-between gap-4 mt-2">
                                        <div>
                                            <h3 className="text-2xl font-thin">{waiterOfWeek.member.name}</h3>
                                            <p className="font-sans text-xs text-stone-300 mt-1">{waiterOfWeek.highlight}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-sans text-orange-200 text-sm">{stars(Math.round(waiterOfWeek.average))}</p>
                                            <p className="font-sans text-xs text-stone-300">{waiterOfWeek.average.toFixed(1)} ({waiterOfWeek.votes} ratings)</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <motion.div
                                variants={STAGGER_VARIANTS}
                                initial={prefersReducedMotion ? false : 'hidden'}
                                animate={prefersReducedMotion ? undefined : 'visible'}
                                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4"
                            >
                                {STAFF_TEAM.map((member) => {
                                    const memberRating = ratingsByMemberId[member.id];
                                    return (
                                        <motion.article
                                            key={member.id}
                                            variants={REVEAL_VARIANTS}
                                            whileHover={prefersReducedMotion ? {} : { y: -3 }}
                                            transition={{ duration: FLUID.fast, ease: FLUID.ease }}
                                            className="group rounded-xl border border-stone-800 bg-stone-950/80 overflow-hidden"
                                        >
                                            <img
                                                src={member.photo}
                                                alt={member.name}
                                                className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                            <div className="p-4">
                                                <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-orange-300">{member.role}</p>
                                                <h3 className="text-xl font-thin mt-1">{member.name}</h3>
                                                <p className="font-sans text-xs text-stone-400 mt-2">{member.focus}</p>
                                                <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-stone-500 mt-3">{member.shift}</p>
                                                {memberRating && (
                                                    <p className="font-sans text-[11px] text-orange-200 mt-2">
                                                        {stars(Math.round(memberRating.average))} {memberRating.average.toFixed(1)}
                                                    </p>
                                                )}
                                            </div>
                                        </motion.article>
                                    );
                                })}
                            </motion.div>
                        </motion.section>
                    )}
                </AnimatePresence>
            </main>

            <AnimatePresence mode="wait" initial={false}>
                {isDetailsOpen && detailsItem && (
                    <motion.div
                        key={`details-overlay-${detailsItem.id}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: FLUID.fast, ease: FLUID.ease }}
                        className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-sm"
                        onClick={closeDetails}
                    >
                        <motion.div
                            layoutId={`dish-card-${detailsItem.id}`}
                            onClick={(event) => event.stopPropagation()}
                            initial={prefersReducedMotion ? { y: 0 } : { y: 18, opacity: 0.94 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={prefersReducedMotion ? { y: 0 } : { y: 16, opacity: 0.96 }}
                            transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 240, damping: 30, mass: 0.85 }}
                            className="h-full bg-stone-950 overflow-y-auto"
                        >
                            <div className="relative h-[48vh] md:h-[55vh]">
                                <motion.img
                                    src={detailsItem.image}
                                    alt={detailsItem.name}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    decoding="async"
                                    initial={prefersReducedMotion ? false : { scale: 1.06 }}
                                    animate={prefersReducedMotion ? undefined : { scale: 1 }}
                                    transition={{ duration: 0.8, ease: FLUID.ease }}
                                />
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-t from-stone-950 via-black/35 to-black/10"
                                    initial={prefersReducedMotion ? false : { opacity: 0.88 }}
                                    animate={prefersReducedMotion ? undefined : { opacity: 1 }}
                                    transition={{ duration: FLUID.base, ease: FLUID.ease }}
                                />
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-14 h-1 rounded-full bg-white/45 md:hidden" />
                                <motion.button
                                    type="button"
                                    onClick={closeDetails}
                                    whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                                    whileTap={prefersReducedMotion ? {} : { scale: 0.94 }}
                                    className="absolute top-4 right-4 w-10 h-10 rounded-full border border-white/15 bg-black/45 text-white flex items-center justify-center"
                                    aria-label="Close details"
                                >
                                    <span className="material-symbols-outlined">close</span>
                                </motion.button>
                            </div>

                            <motion.div
                                variants={STAGGER_VARIANTS}
                                initial={prefersReducedMotion ? false : 'hidden'}
                                animate={prefersReducedMotion ? undefined : 'visible'}
                                className="px-6 md:px-8 pb-16 -mt-10 relative z-10 max-w-4xl mx-auto"
                            >
                                <motion.p variants={REVEAL_VARIANTS} className="font-sans text-[11px] uppercase tracking-[0.2em] text-orange-300">
                                    {detailsItem.badge}
                                </motion.p>
                                <motion.h2 variants={REVEAL_VARIANTS} className="text-4xl md:text-5xl font-thin italic mt-2">
                                    {detailsItem.name}
                                </motion.h2>
                                <motion.p variants={REVEAL_VARIANTS} className="text-2xl md:text-3xl text-orange-300 font-sans mt-1">
                                    {detailsItem.price}
                                </motion.p>
                                <motion.p variants={REVEAL_VARIANTS} className="text-stone-300 font-sans leading-relaxed text-sm md:text-base mt-6">
                                    {detailsItem.desc}
                                </motion.p>

                                <motion.div variants={REVEAL_VARIANTS} className="grid grid-cols-2 gap-3 mt-6">
                                    <div className="bg-stone-900/70 border border-stone-800 rounded-xl p-4">
                                        <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-stone-500">Prep</p>
                                        <p className="font-sans text-stone-100 mt-1">{detailsItem.prep}</p>
                                    </div>
                                    <div className="bg-stone-900/70 border border-stone-800 rounded-xl p-4">
                                        <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-stone-500">Heat</p>
                                        <p className="font-sans text-stone-100 mt-1">{detailsItem.heat}</p>
                                    </div>
                                </motion.div>

                                <motion.div variants={REVEAL_VARIANTS} className="flex flex-wrap gap-2 mt-6">
                                    {detailsItem.dietary?.map((tag) => (
                                        <motion.span
                                            key={tag}
                                            whileHover={prefersReducedMotion ? {} : { y: -1 }}
                                            className="text-[10px] uppercase font-bold tracking-wider text-stone-300 bg-stone-900 px-3 py-1 rounded-full border border-stone-700"
                                        >
                                            {tag}
                                        </motion.span>
                                    ))}
                                </motion.div>

                                <motion.section variants={REVEAL_VARIANTS} className="mt-8">
                                    <h3 className="font-sans text-xs uppercase tracking-[0.22em] text-stone-400">Ingredients</h3>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {detailsItem.ingredients?.map((ingredient) => (
                                            <motion.span
                                                key={ingredient}
                                                whileHover={prefersReducedMotion ? {} : { y: -1 }}
                                                className="font-sans text-xs text-stone-200 bg-stone-900/80 border border-stone-800 rounded-full px-3 py-1.5"
                                            >
                                                {ingredient}
                                            </motion.span>
                                        ))}
                                    </div>
                                </motion.section>

                                <motion.section variants={REVEAL_VARIANTS} className="mt-8">
                                    <h3 className="font-sans text-xs uppercase tracking-[0.22em] text-stone-400">Guest Reviews</h3>
                                    <div className="space-y-3 mt-3">
                                        {activeReviews.map((review, index) => (
                                            <motion.article
                                                key={`${review.name}-${index}`}
                                                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                                                animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                                                transition={{ duration: FLUID.base, ease: FLUID.ease, delay: index * 0.05 }}
                                                className="rounded-xl border border-stone-800 bg-stone-900/60 p-4"
                                            >
                                                <p className="font-sans text-orange-300 text-sm">{stars(review.rating)}</p>
                                                <p className="font-sans text-stone-200 text-sm mt-1">{review.text}</p>
                                                <p className="font-sans text-stone-500 text-xs mt-2">{review.name}</p>
                                            </motion.article>
                                        ))}
                                    </div>
                                </motion.section>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Savor;
