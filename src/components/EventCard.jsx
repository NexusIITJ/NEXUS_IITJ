import { motion, AnimatePresence } from 'framer-motion';
import { getRenderableImageUrl } from '../utils/imageUtils';

export default function EventCard({ event, index }) {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px", amount: 0.1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${isEven ? '' : 'md:flex-row-reverse'}`}
        >

            <div className="w-full md:w-1/2 group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-purple)] rounded-2xl opacity-20 group-hover:opacity-40 blur transition-opacity duration-500" />
                <div className="relative rounded-2xl overflow-hidden glass-panel border-[var(--glass-border)] aspect-video">
                    <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-10 mix-blend-overlay z-10 pointer-events-none" />
                    <img
                        src={getRenderableImageUrl(event.image)}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-90 group-hover:brightness-110"
                    />


                    {/* <div className="absolute top-4 left-4 z-20 flex gap-2">
                        <span className={`
                            px-2 py-1 text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md rounded border
                            ${event.status === 'upcoming' ? 'bg-blue-500/20 text-blue-200 border-blue-500/30' :
                                event.status === 'past' ? 'bg-gray-500/20 text-gray-300 border-gray-500/30' :
                                    'bg-green-500/20 text-green-200 border-green-500/30'}
                        `}>
                            Condition: {event.status}
                        </span>
                    </div> */}
                </div>
            </div>


            <div className={`w-full md:w-1/2 flex flex-col ${isEven ? 'md:items-start text-left' : 'md:items-end md:text-right'}`}>
                <div className="flex items-center gap-3 mb-2 opacity-70">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent-blue)] animate-pulse" />
                    <span className="font-mono text-blue-100 text-sm tracking-widest">
                        {event.date}
                    </span>
                </div>

                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight group-hover:text-glow transition-all duration-300">
                    {event.title}
                </h2>

                <p className="text-amber-50 leading-relaxed mb-8 max-w-md">
                    {event.description}
                </p>

                <div className="flex flex-col gap-2 font-mono text-sm text-blue-200">
                    <div className={`flex items-center gap-2 ${isEven ? 'justify-start' : 'md:justify-end'}`}>
                        <span className="text-[var(--accent-purple)]">LOC //</span>
                        <span>{event.location}</span>
                    </div>
                </div>

                {/* <button className="mt-8 px-8 py-3 rounded-none border border-[var(--accent-blue)] text-[var(--accent-blue)] font-mono text-sm tracking-widest hover:bg-[var(--accent-blue)] hover:text-white transition-all duration-300 uppercase relative group/btn overflow-hidden">
                    <span className="relative z-10">Initiate Sequence</span>
                    <div className="absolute inset-0 bg-[var(--accent-blue)] transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300" />
                </button> */}
            </div>
        </motion.div>
    );
}