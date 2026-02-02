import { useRef, useState} from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { getRenderableImageUrl } from '../utils/imageUtils';

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 40, damping: 15 }
    }
};

export default function TiltCard({ item, onClick }) {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);


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

    const [loaded, setLoaded] = useState(false);

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

                <div className="relative overflow-hidden">

                    <img
                        src={getRenderableImageUrl(item.image)}
                        alt={item.title}
                        loading="lazy"
                        onLoad={() => setLoaded(true)}
                        className={`
                            w-full h-auto object-cover
                            transition-all duration-700
                            ${loaded ? "opacity-100 scale-105" : "opacity-0 scale-100"}
                        `}
                    />

                    <div className="absolute top-0 left-0 w-full h-[2px] bg-[var(--accent-cyan)] opacity-0 group-hover:opacity-100 group-hover:animate-scan shadow-[0_0_10px_var(--accent-cyan)] pointer-events-none" />
                </div>


                <motion.div
                    className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-tr from-transparent via-white to-transparent"
                    style={{
                        opacity: shineOpacity,
                        x: shineX,
                        rotate: "45deg",
                        width: "200%",
                    }}
                />


                <div
    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent
               flex flex-col justify-end p-6
               opacity-100 md:opacity-0 md:group-hover:opacity-100
               transition-opacity duration-300"
    style={{ transform: "translateZ(30px)" }}
>
    <div className="space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">

        {/* Title */}
        <h3 className="text-xl font-bold text-white leading-tight">
            {item.title}
        </h3>

        {/* Download button */}
        <a
            href={item.image}
            download
            onClick={(e) => e.stopPropagation()}
            className="
                inline-block mt-2
                px-4 py-2
                rounded-lg
                border border-white/30
                bg-white/10 backdrop-blur-md
                text-white text-xs font-mono tracking-widest uppercase
                transition-all duration-300
                hover:bg-white/20 hover:scale-105
                active:scale-95
            "
        >
            Download
        </a>
    </div>
</div>
            </motion.div>
        </motion.div>
    );
}