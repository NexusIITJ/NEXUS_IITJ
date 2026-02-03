import { useState } from 'react';
import { events } from '../data/events';
import { motion, AnimatePresence } from 'framer-motion';
import EventCard from '../components/EventCard';

export default function Events() {
    const [filter, setFilter] = useState('upcoming');

    // const filteredEvents = events.filter(event => {
    //     if (filter === 'all') return true;
    //     return event.status === filter;
    // });

    return (
        <div className="min-h-screen pt-28 pb-20 px-4 md:px-8 flex flex-col items-center relative overflow-hidden">

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


            {/* <motion.div
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
            </motion.div> */}


            <motion.div className="w-full max-w-5xl space-y-24 relative z-10">
                <AnimatePresence>
                    {events.length > 0 ? (
                        events.map((event, index) => (
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
