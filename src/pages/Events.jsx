import { useState } from 'react';
import { events } from '../data/events';
import { motion, AnimatePresence } from 'framer-motion';

export default function Events() {
    const [filter, setFilter] = useState('upcoming');

    const filteredEvents = events.filter(event => {
        if (filter === 'all') return true;
        return event.status === filter;
    });

    return (
        <div className="min-h-screen pt-28 pb-20 px-4 md:px-8 flex flex-col items-center relative overflow-hidden">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-6xl mb-12 flex flex-col items-center text-center z-10"
            >
                <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter text-white">
                    MISSION <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-purple)] text-glow">LOGS</span>
                </h1>
                <p className="text-[var(--text-gray)] font-mono text-sm tracking-[0.2em] uppercase opacity-80">
                    // Sector: Campus Activities // Status: Active
                </p>
            </motion.div>

            {/* Filter Control Board */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="glass-panel rounded-full p-1.5 mb-16 flex gap-1 relative z-10"
            >
                {['upcoming', 'ongoing', 'past'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`
                            relative px-6 py-2.5 rounded-full text-sm font-bold tracking-wide uppercase transition-all duration-300
                            ${filter === f ? 'text-white' : 'text-[var(--text-muted)] hover:text-white'}
                        `}
                    >
                        {filter === f && (
                            <motion.div
                                layoutId="activeFilter"
                                className="absolute inset-0 bg-[var(--accent-blue)] rounded-full mix-blend-overlay opacity-30"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        {filter === f && (
                            <motion.div
                                layoutId="activeFilterBorder"
                                className="absolute inset-0 border border-[var(--accent-blue)] rounded-full shadow-[0_0_15px_rgba(96,165,250,0.4)]"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        {f}
                    </button>
                ))}
            </motion.div>

            {/* Timeline / Event Stream */}
            <motion.div layout className="w-full max-w-5xl space-y-24 relative z-10">
                <AnimatePresence mode="popLayout">
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map((event, index) => (
                            <EventCard key={event.id} event={event} index={index} />
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center py-20"
                        >
                            <p className="text-[var(--text-muted)] font-mono text-lg tracking-widest">
                                &lt; NO_DATA_FOUND_IN_SECTOR /&gt;
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}

function EventCard({ event, index }) {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${isEven ? '' : 'md:flex-row-reverse'}`}
        >
            {/* Holographic Image Container */}
            <div className="w-full md:w-1/2 group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-purple)] rounded-2xl opacity-20 group-hover:opacity-40 blur transition-opacity duration-500" />
                <div className="relative rounded-2xl overflow-hidden glass-panel border-[var(--glass-border)] aspect-video">
                    <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-10 mix-blend-overlay z-10 pointer-events-none" />
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-90 group-hover:brightness-110"
                    />

                    {/* HUD Overlay details on image */}
                    <div className="absolute top-4 left-4 z-20 flex gap-2">
                        <span className={`
                            px-2 py-1 text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md rounded border
                            ${event.status === 'upcoming' ? 'bg-blue-500/20 text-blue-200 border-blue-500/30' :
                                event.status === 'past' ? 'bg-gray-500/20 text-gray-300 border-gray-500/30' :
                                    'bg-green-500/20 text-green-200 border-green-500/30'}
                        `}>
                            Condition: {event.status}
                        </span>
                    </div>
                </div>
            </div>

            {/* Data Readout */}
            <div className={`w-full md:w-1/2 flex flex-col ${isEven ? 'md:items-start text-left' : 'md:items-end md:text-right'}`}>
                <div className="flex items-center gap-3 mb-2 opacity-70">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent-blue)] animate-pulse" />
                    <span className="font-mono text-[var(--accent-blue)] text-sm tracking-widest">
                        {event.date}
                    </span>
                </div>

                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight group-hover:text-glow transition-all duration-300">
                    {event.title}
                </h2>

                <p className="text-[var(--text-gray)] leading-relaxed mb-8 max-w-md">
                    {event.description}
                </p>

                <div className="flex flex-col gap-2 font-mono text-sm text-[var(--text-muted)]">
                    <div className={`flex items-center gap-2 ${isEven ? 'justify-start' : 'md:justify-end'}`}>
                        <span className="text-[var(--accent-purple)]">LOC //</span>
                        <span>{event.location}</span>
                    </div>
                </div>

                <button className="mt-8 px-8 py-3 rounded-none border border-[var(--accent-blue)] text-[var(--accent-blue)] font-mono text-sm tracking-widest hover:bg-[var(--accent-blue)] hover:text-white transition-all duration-300 uppercase relative group/btn overflow-hidden">
                    <span className="relative z-10">Initiate Sequence</span>
                    <div className="absolute inset-0 bg-[var(--accent-blue)] transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300" />
                </button>
            </div>
        </motion.div>
    );
}
