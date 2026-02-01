import { gallery, imageSubmissionForm } from '../data/gallery';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState } from 'react';
import Lightbox from '../components/Lightbox';
import TiltCard from '../components/TiltCard';

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

export default function Gallery() {
    const [selectedId, setSelectedId] = useState(null);

    return (
        <div className="min-h-screen pt-28 pb-20 px-4 flex flex-col items-center relative z-10">

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
                <div className='ml-30 lg:ml-70'>
                    <a
                        href={imageSubmissionForm}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            inline-block
                            px-6 py-3
                            rounded-xl
                            border border-white/30
                            bg-white/20
                            backdrop-blur-md
                            text-white font-semibold
                            shadow-lg
                            transition-all duration-300 ease-out
                            hover:scale-105
                            hover:bg-white/30
                            hover:shadow-xl
                            active:scale-95
                        "
                    >
                        Submit your image
                    </a>
                </div>
                <div className="hidden md:block font-mono text-[var(--text-muted)] text-right">
                    <div className="text-2xl font-bold">{gallery.length}</div>
                    <div className="text-[10px] tracking-wider uppercase">Entries Loaded</div>
                </div>
            </motion.div>


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