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
        <div className="min-h-screen pt-24 pb-12 px-4 flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-4xl"
            >
                <h1 className="text-4xl font-bold mb-8 text-white border-b border-[rgba(255,255,255,0.1)] pb-4">
                    Mission Control: Events
                </h1>


                <div className="sticky top-4 z-50 bg-[var(--bg-dark)]/90 backdrop-blur-md p-2 rounded-xl border border-[var(--border-subtle)] mb-8 flex gap-2 w-fit mx-auto">
                    {['upcoming', 'ongoing', 'past'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 capitalize ${filter === f
                                ? 'bg-[var(--accent-blue)] text-white shadow-lg'
                                : 'text-[var(--text-gray)] hover:text-white hover:bg-[var(--bg-card)]'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>


                <motion.div layout className="space-y-6">
                    <AnimatePresence mode="popLayout">
                        {filteredEvents.length > 0 ? (
                            filteredEvents.map((event) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    key={event.id}
                                    className="group relative bg-[var(--bg-card)] rounded-xl border border-[var(--border-subtle)] overflow-hidden hover:border-[var(--accent-blue)] transition-colors duration-300 hover:shadow-xl"
                                >
                                    <div className="md:flex h-full">
                                        <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                                            <img
                                                src={event.image}
                                                alt={event.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>


                                        <div className="p-6 md:w-2/3 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className={`px-2 py-0.5 rounded text-xs uppercase tracking-wider font-bold ${event.status === 'upcoming' ? 'bg-blue-500/20 text-blue-300' :
                                                        event.status === 'past' ? 'bg-gray-700/50 text-gray-400' :
                                                            'bg-green-500/20 text-green-300'
                                                        }`}>
                                                        {event.status}
                                                    </span>
                                                    <span className="text-[var(--text-muted)] text-sm font-mono">
                                                        {new Date(event.date).toLocaleDateString(undefined, {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}
                                                    </span>
                                                </div>

                                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[var(--accent-blue)] transition-colors">
                                                    {event.title}
                                                </h3>
                                                <p className="text-[var(--text-gray)] text-sm leading-relaxed mb-4">
                                                    {event.description}
                                                </p>
                                            </div>

                                            <div className="flex items-center text-sm text-[var(--accent-blue)] font-mono">
                                                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13 21.293a1 1 0 01-1.414 0l-4.657-4.656A8 8 0 010 10.938C0 5.438 4.438 0 10 0s10 4.438 10 10.938a8 8 0 01-2.343 5.719z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                {event.location}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center py-20 text-[var(--text-muted)]"
                            >
                                <p className="text-lg">No events found in this category.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </div>
    );
}
