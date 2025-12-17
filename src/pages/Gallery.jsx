import { gallery } from '../data/gallery';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';


const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 50, damping: 20 }
    }
};

export default function Gallery() {
    const [selectedId, setSelectedId] = useState(null);

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 flex flex-col items-center">

            <div className="w-full max-w-7xl">
                <h1 className="text-4xl font-bold mb-2 text-white">
                    Image Data Archive
                </h1>
                <p className="text-[var(--text-muted)] font-mono mb-8">
                    /secure/gallery/public-access
                </p>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
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


function TiltCard({ item, onClick }) {
    const ref = useRef(null);


    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);


    const shineX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
    const shineY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

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
            ref={ref}
            variants={cardVariants}
            layoutId={`card-${item.id}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative break-inside-avoid mb-6 rounded-xl cursor-pointer group perspective-1000 z-0 hover:z-10"
        >
            <motion.div
                className="relative overflow-hidden bg-[var(--bg-card)] border border-[rgba(255,255,255,0.05)] rounded-xl shadow-2xl group-hover:border-[var(--accent-blue)] transition-colors duration-500"
                style={{ transformStyle: "preserve-3d" }}
            >
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                />


                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-40 pointer-events-none z-10"
                    style={{
                        background: `radial-gradient(circle at ${shineX} ${shineY}, rgba(255,255,255,0.2), transparent 60%)`
                    }}
                />


                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />


                <div
                    className="absolute inset-x-0 bottom-0 p-6 translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100"
                    style={{ transform: "translateZ(20px)" }}
                >
                    <p className="text-[var(--accent-blue)] font-mono text-xs mb-1 tracking-widest uppercase shadow-black drop-shadow-md">
                        {item.tag} // {item.source}
                    </p>
                    <h3 className="text-xl font-bold text-white mb-2 leading-tight drop-shadow-md">
                        {item.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 drop-shadow-md">
                        {item.description}
                    </p>
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
            onClick={onClose}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
        >
            <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
            >
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <motion.div
                layoutId={`card-${item.id}`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative max-w-5xl w-full bg-[var(--bg-card)] rounded-2xl overflow-hidden shadow-2xl border border-[rgba(255,255,255,0.1)]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="grid md:grid-cols-[1.5fr,1fr]">
                    <div className="bg-black/50 flex items-center justify-center p-2 relative overflow-hidden group">

                        <motion.img
                            src={item.image}
                            alt={item.title}
                            animate={{ scale: 1.05 }}
                            transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
                            className="max-h-[80vh] w-auto object-contain rounded-lg shadow-lg"
                        />
                    </div>

                    <div className="p-8 flex flex-col justify-center border-l border-[rgba(255,255,255,0.05)]">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="mb-6">
                                <span className="inline-block px-3 py-1 rounded-full bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] text-xs font-mono font-bold tracking-wider mb-4 border border-[var(--accent-blue)]/20">
                                    {item.tag}
                                </span>
                                <h2 className="text-3xl font-bold text-white mb-2">{item.title}</h2>
                                <p className="text-[var(--text-muted)] text-sm font-mono">Source: {item.source}</p>
                            </div>

                            <p className="text-gray-300 leading-relaxed mb-8">
                                {item.description}
                            </p>

                            <div className="flex gap-4 mt-auto">
                                <a
                                    href={item.image}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 bg-white text-black py-3 rounded-lg font-bold text-center hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                                >
                                    <span>HD Download</span>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
