import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Calendar from '../components/Calendar';
import { Info, Loader2, ExternalLink } from 'lucide-react';

const CalendarPage = () => {
    const [apod, setApod] = useState(null);
    const [loading, setLoading] = useState(true);

    const getApodUrl = (dateStr) => {
        if (!dateStr) return '#';
        const [year, month, day] = dateStr.split('-');
        return `https://apod.nasa.gov/apod/ap${year.slice(2)}${month}${day}.html`;
    };

    useEffect(() => {
        const fetchApod = async () => {
            try {

                const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=KMRHAA1Isd3UMqM94xgzZckgDwmkqTHrEJFAtDiD');
                const data = await response.json();
                setApod(data);
            } catch (error) {
                console.error('Failed to fetch APOD:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchApod();
    }, []);

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-16">
                {/* Calendar Section */}
                <section>
                    <Calendar />
                </section>

                {/* Hero Section with APOD */}
                <section className="relative rounded-3xl overflow-hidden min-h-[400px] flex items-end border border-white/10 group">
                    <div className="absolute inset-0 z-0">
                        {loading ? (
                            <div className="w-full h-full bg-white/5 animate-pulse flex items-center justify-center">
                                <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
                            </div>
                        ) : (
                            <>
                                {apod?.media_type === 'image' ? (
                                    <img
                                        src={apod.url}
                                        alt={apod.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-black" />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a]/80 to-transparent" />
                            </>
                        )}
                    </div>

                    <div className="relative z-10 p-8 sm:p-12 w-full max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="px-3 py-1 rounded bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-mono uppercase tracking-widest backdrop-blur-sm">
                                    Picture of the Day
                                </div>
                                <div className="h-px bg-white/20 w-12"></div>
                            </div>

                            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-6 leading-tight font-sans tracking-tight">
                                {apod?.title || "Cosmic View"}
                            </h1>

                            <p className="text-gray-300 text-lg max-w-2xl line-clamp-3 mb-6 font-light leading-relaxed">
                                {apod?.explanation || "Explore the universe through the eyes of NASA."}
                            </p>

                            {apod && (
                                <div className="mb-8">
                                    <a
                                        href={getApodUrl(apod.date)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-sm font-medium transition-all group/btn"
                                    >
                                        Read Article
                                        <ExternalLink className="w-4 h-4 opacity-70 group-hover/btn:opacity-100 transition-opacity" />
                                    </a>
                                </div>
                            )}

                            {apod && (
                                <div className="flex items-center gap-2 text-xs text-gray-400 font-mono border-t border-white/10 pt-4 inline-flex">
                                    <Info className="w-4 h-4" />
                                    <span className="uppercase tracking-wider">CREDIT: {apod.copyright || "NASA"}</span>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default CalendarPage;
