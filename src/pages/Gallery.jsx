import { gallery } from '../data/gallery';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 40, damping: 15 }
    }
};

export default function Gallery() {
    const [selectedId, setSelectedId] = useState(null);

    return (
        <div className="min-h-screen pt-28 pb-20 px-4 flex flex-col items-center relative z-10">
            {/* Gallery Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-7xl mb-12 flex justify-between items-end border-b border-[var(--border-subtle)] pb-8"
            >
                <div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tight">
                        VISUAL <span className="text-[var(--accent-cyan)] text-glow">ARCHIVE</span>
                    </h1>
                    <p className="text-[var(--text-gray)] font-mono text-xs md:text-sm tracking-[0.3em] uppercase opacity-70">
                        // Deep Space Imagery // Source: Club Telescopes
                    </p>
                </div>
                <div className="hidden md:block font-mono text-[var(--text-muted)] text-right">
                    <div className="text-2xl font-bold">{gallery.length}</div>
                    <div className="text-[10px] tracking-wider uppercase">Entries Loaded</div>
                </div>
            </motion.div>

            {/* Masonry-style Grid */}
            <div className="w-full max-w-7xl">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
                >
                    {gallery.map((item) => (
                        <TiltCard
                            key={item.id}
                            item={item}
                            onClick={() => setSelectedId(item.id)}
                        />
                    ))}
                </motion.div>
            </div>

            {/* Immersive Lightbox */}
            <AnimatePresence>
                {selectedId && (
                    <Lightbox
                        item={gallery.find(i => i.id === selectedId)}
                        onClose={() => setSelectedId(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}


function TiltCard({ item, onClick }) {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

    // Holographic shine effect
    const shineX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "200%"]);
    const shineOpacity = useTransform(mouseXSpring, [-0.5, 0.5], [0, 0.4]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            variants={cardVariants}
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative break-inside-avoid cursor-pointer group perspective-1000"
        >
            <motion.div
                className="relative overflow-hidden rounded-xl bg-[var(--bg-card)] border border-[var(--glass-border)] group-hover:border-[var(--accent-cyan)] transition-colors duration-500 shadow-2xl"
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Image */}
                <div className="relative overflow-hidden">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                    />

                    {/* Scanner Line Effect */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-[var(--accent-cyan)] opacity-0 group-hover:opacity-100 group-hover:animate-scan shadow-[0_0_10px_var(--accent-cyan)] pointer-events-none" />
                </div>

                {/* Holographic Shine Gradient */}
                <motion.div
                    className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-tr from-transparent via-white to-transparent"
                    style={{
                        opacity: shineOpacity,
                        x: shineX,
                        rotate: "45deg",
                        width: "200%",
                    }}
                />

                {/* Overlay Metadata */}
                <div
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
                    style={{ transform: "translateZ(30px)" }}
                >
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-[var(--accent-cyan)] font-mono text-[10px] tracking-widest uppercase mb-1">
                            {item.tag} // ID: {item.id.toString().padStart(4, '0')}
                        </p>
                        <h3 className="text-xl font-bold text-white leading-tight">
                            {item.title}
                        </h3>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

function Lightbox({ item, onClose }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-10"
            onClick={onClose}
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 z-50 p-2 rounded-full hover:bg-white/10 transition-colors group"
            >
                <svg className="w-8 h-8 text-[var(--text-gray)] group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <motion.div
                layoutId={`card-${item.id}`}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-6xl max-h-full grid grid-cols-1 md:grid-cols-3 gap-0 bg-[var(--bg-darker)] rounded-2xl overflow-hidden border border-[var(--border-subtle)] shadow-[0_0_50px_rgba(0,0,0,0.8)] relative"
            >
                {/* Image Section */}
                <div className="md:col-span-2 relative bg-black flex items-center justify-center p-4">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="max-w-full max-h-[80vh] w-auto h-auto object-contain"
                    />
                    <div className="absolute bottom-4 left-4 font-mono text-[10px] text-white/30">
                        RES: HD // {item.source}
                    </div>
                </div>

                {/* Details Panel */}
                <div className="md:col-span-1 p-8 md:p-10 flex flex-col bg-[var(--bg-card)] border-t md:border-t-0 md:border-l border-[var(--border-subtle)] relative overflow-hidden">
                    {/* Background Detail */}
                    <div className="absolute top-0 right-0 p-32 bg-[var(--accent-cyan)] opacity-5 blur-[100px] pointer-events-none" />

                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)]" />
                            <span className="font-mono text-[10px] text-[var(--accent-cyan)] tracking-widest uppercase">
                                System Data
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2 leading-none">{item.title}</h2>
                        <div className="w-12 h-1 bg-[var(--accent-cyan)] mt-4 mb-6 rounded-full opacity-50" />

                        <p className="text-[var(--text-muted)] leading-relaxed text-sm">
                            {item.description}
                        </p>
                    </div>

                    <div className="mt-auto space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-xs font-mono text-[var(--text-gray)]">
                            <div className="p-3 rounded border border-[var(--border-subtle)] bg-white/5">
                                <div className="uppercase opacity-50 mb-1">Source</div>
                                <div className="text-white">{item.source}</div>
                            </div>
                            <div className="p-3 rounded border border-[var(--border-subtle)] bg-white/5">
                                <div className="uppercase opacity-50 mb-1">Category</div>
                                <div className="text-[var(--accent-cyan)]">{item.tag}</div>
                            </div>
                        </div>

                        <a
                            href={item.image}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full py-4 bg-white text-black font-bold text-center uppercase tracking-widest text-xs hover:bg-[var(--accent-cyan)] transition-colors duration-300"
                        >
                            Download High-Res
                        </a>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// Add this into your global CSS or inside a style tag
/* 
@keyframes scan {
    0% { top: 0%; opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { top: 100%; opacity: 0; }
}
*/
