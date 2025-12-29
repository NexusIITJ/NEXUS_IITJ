import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Grid, List as ListIcon, Loader2 } from 'lucide-react';
import { getAstronomyEvents } from '../services/astronomyService';
import { MoonIcon } from './MoonIcon';

//Calendar Images
import fullMoonImg from '../assets/pics_calender/FullMoon_cal.png';
import newMoonImg from '../assets/pics_calender/NewMoon_cal.png';
import lunarEclipseImg from '../assets/pics_calender/LunarEcl_cal.png';
import solarEclipseImg from '../assets/pics_calender/SolarEcl_cal.png';
import sunCalImg from '../assets/pics_calender/SUN_cal.png';
import mercuryImg from '../assets/pics_calender/mercury_cal.png';
import venusImg from '../assets/pics_calender/venus_cal.png';
import marsImg from '../assets/pics_calender/mars_cal.png';
import jupiterImg from '../assets/pics_calender/jupiter_cal.png';
import saturnImg from '../assets/pics_calender/saturn_cal.png';
import uranusImg from '../assets/pics_calender/uranus_cal.png';
import neptuneImg from '../assets/pics_calender/neptune_cal.png';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [viewMode, setViewMode] = useState('month'); // 'month' | 'list'
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch events when year changes
    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
                const year = currentDate.getFullYear();
                const fetchedEvents = await getAstronomyEvents(year);
                setEvents(fetchedEvents.filter(e => e.title !== 'First Quarter' && e.title !== 'Last Quarter'));
            } catch (error) {
                console.error("Failed to fetch astronomy events", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, [currentDate.getFullYear()]);

    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const traverseMonth = (direction) => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
    };

    const formatMonth = (date) => {
        return date.toLocaleString('default', { month: 'long', year: 'numeric' }).toUpperCase();
    };

    const getEventsForDay = (day) => {
        const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        // Adjust for timezone offset
        const offset = checkDate.getTimezoneOffset();
        const localDate = new Date(checkDate.getTime() - (offset * 60 * 1000));
        const dateString = localDate.toISOString().split('T')[0];
        return events.filter(event => event.date === dateString);
    };

    const currentMonthEvents = useMemo(() => {
        const m = currentDate.getMonth() + 1; // 1-12
        const y = currentDate.getFullYear();
        const prefix = `${y}-${m < 10 ? '0' + m : m}`;
        return events.filter(e => e.date.startsWith(prefix));
    }, [events, currentDate]);

    const getEventImage = (evt) => {
        if (!evt) return null;

        const title = evt.title.toLowerCase();
        const type = evt.type.toLowerCase();


        if (title.includes('full moon')) return fullMoonImg;
        if (title.includes('new moon')) return newMoonImg;
        if (type.includes('solar-eclipse')) return solarEclipseImg;
        if (type.includes('lunar-eclipse')) return lunarEclipseImg;

        // Sun Events (equinoxes, solstices, perhelions, aphelions)
        if (title.includes('equinox') || title.includes('solstice') || title.includes('perihelion') || title.includes('aphelion')) {
            return sunCalImg;
        }

        // Planet Events (oppositions and greatest elongations)
        if (title.includes('mercury')) return mercuryImg;
        if (title.includes('venus')) return venusImg;
        if (title.includes('mars')) return marsImg;
        if (title.includes('jupiter')) return jupiterImg;
        if (title.includes('saturn')) return saturnImg;
        if (title.includes('uranus')) return uranusImg;
        if (title.includes('neptune')) return neptuneImg;

        return null;
    };

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blanks = Array.from({ length: firstDay }, (_, i) => i);

    if (loading && events.length === 0) {
        return (
            <div className="w-full h-96 flex items-center justify-center text-blue-400">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="w-full max-w-5xl mx-auto p-4 sm:p-8">
            {/* Header Section */}
            <div className="text-center mb-12">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full max-w-6xl mb-12 flex flex-col items-center text-center z-10"
                >
                    <h1 className="text-5xl md:text-5xl font-bold mb-4 tracking-tighter text-white">
                        ASTRONOMY <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-purple)] text-glow">CALENDER</span>
                    </h1>

                </motion.div>
            </div>

            {/* Calendar Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4 sm:gap-0 bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm">

                {/* View Toggles */}
                <div className="flex items-center gap-2 bg-black/20 p-1 rounded-lg">
                    <button
                        onClick={() => setViewMode('month')}
                        className={`p-2 rounded-md transition-colors ${viewMode === 'month' ? 'bg-blue-500/20 text-blue-400' : 'text-gray-500 hover:text-gray-300'}`}
                        title="Month View"
                    >
                        <Grid className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-blue-500/20 text-blue-400' : 'text-gray-500 hover:text-gray-300'}`}
                        title="List View"
                    >
                        <ListIcon className="w-5 h-5" />
                    </button>
                </div>

                {/* Month Navigation */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => traverseMonth(-1)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-blue-400 hover:text-blue-300"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <h2 className="text-2xl font-mono font-bold text-white tracking-widest min-w-[200px] text-center">
                        {formatMonth(currentDate)}
                    </h2>

                    <button
                        onClick={() => traverseMonth(1)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-blue-400 hover:text-blue-300"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>


                <div className="w-[88px] hidden sm:block"></div>
            </div>

            {/* Content Area */}
            <AnimatePresence mode="wait">
                {viewMode === 'month' ? (
                    <motion.div
                        key="month-view"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="relative"
                    >
                        {/* Loading screen for month transition*/}
                        {loading && (
                            <div className="absolute inset-0 bg-black/50 z-20 flex items-center justify-center rounded-lg backdrop-blur-sm">
                                <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
                            </div>
                        )}

                        {/* Grid */}
                        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-4">
                            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                                <div key={day} className="text-center text-blue-500/60 font-mono text-xs py-2 tracking-wider">
                                    {day}
                                </div>
                            ))}

                            {blanks.map((_, i) => (
                                <div key={`blank-${i}`} className="aspect-square bg-transparent" />
                            ))}

                            {days.map(day => {
                                const dayEvents = getEventsForDay(day);
                                const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();


                                const moonPhaseEvent = dayEvents.find(e => e.type === 'moon-phase');
                                const showMoonIcon = !!moonPhaseEvent;

                                // Determine phase for icon (0 for New, 4 for Full)
                                const phaseForIcon = moonPhaseEvent?.title?.toLowerCase().includes('new moon') ? 0
                                    : moonPhaseEvent?.title?.toLowerCase().includes('full moon') ? 4
                                        : -1;

                                // Get images for events
                                const eventImages = dayEvents
                                    .map(evt => getEventImage(evt))
                                    .filter(img => img !== null);
                                const uniqueImages = [...new Set(eventImages)];

                                return (
                                    <motion.div
                                        key={day}
                                        whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.08)' }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => dayEvents.length > 0 && setSelectedEvent(dayEvents)}
                                        className={`aspect-square p-2 rounded-lg border flex flex-col justify-between relative cursor-pointer transition-all duration-300 group overflow-hidden backdrop-blur-md
                            ${isToday ? 'bg-blue-900/80 border-blue-500' : 'bg-[#0b0b14]/90 border-blue-500/20 hover:border-blue-500/40'}
                            ${dayEvents.length > 0 ? 'shadow-[0_0_15px_rgba(59,130,246,0.1)]' : ''}
                          `}
                                    >
                                        {/* Background Images */}
                                        {uniqueImages.length > 0 && (
                                            <div className="absolute inset-0 z-0 flex opacity-40 pointer-events-none">
                                                {uniqueImages.slice(0, 2).map((img, i) => (
                                                    <div key={i} className={`${uniqueImages.length > 1 ? 'w-1/2' : 'w-full'} h-full relative`}>
                                                        <img
                                                            src={img}
                                                            alt=""
                                                            className="w-full h-full object-cover"
                                                        />
                                                        {/* Gradient overlay for better text readability */}
                                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b14] via-transparent to-transparent opacity-90" />
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div className="relative z-10 flex justify-between items-start mb-1 h-5">
                                            <span className={`text-sm font-mono leading-none ${isToday ? 'text-blue-400' : (dayEvents.length > 0 ? 'text-white' : 'text-gray-400')}`}>
                                                {day.toString().padStart(2, '0')}
                                            </span>

                                            {/* Moon Phase Icon*/}
                                            {showMoonIcon && (
                                                <div title={moonPhaseEvent.title}>
                                                    <MoonIcon phase={phaseForIcon} className="w-3 h-3 opacity-80 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Event Descriptions */}
                                        <div className="relative z-10 flex flex-col gap-1 overflow-hidden h-full justify-end">
                                            {dayEvents.slice(0, 3).map((evt, i) => (
                                                <div key={i} className="hidden sm:block text-[9px] text-blue-300 truncate font-mono bg-black/40 px-1 rounded border border-blue-500/30 leading-tight backdrop-blur-[2px]">
                                                    {evt.title}
                                                </div>
                                            ))}
                                            {dayEvents.length > 3 && (
                                                <div className="hidden sm:block text-[9px] text-gray-400 text-center leading-none">
                                                    +{dayEvents.length - 3} more
                                                </div>
                                            )}

                                            {/* Mobile View Dots */}
                                            <div className="sm:hidden flex gap-0.5 justify-center flex-wrap">
                                                {dayEvents.map((_, i) => (
                                                    <div key={i} className="w-1 h-1 rounded-full bg-blue-400" />
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="list-view"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col gap-4"
                    >

                        {currentMonthEvents.length === 0 ? (
                            <div className="text-center py-12 text-gray-500 font-mono">
                                NO MISSION LOGS DETECTED FOR THIS SECTOR.
                            </div>
                        ) : (
                            currentMonthEvents.map((event, index) => (
                                <motion.div
                                    key={`${event.date}-${index}`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => setSelectedEvent([event])}
                                    className="bg-[#0b0b14] border border-white/5 hover:border-blue-500/30 p-4 rounded-xl flex items-center gap-6 cursor-pointer hover:bg-white/5 transition-all group"
                                >
                                    {/* Date Block */}
                                    <div className="flex flex-col items-center bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 min-w-[80px]">
                                        <span className="text-xs font-mono text-blue-400 uppercase">
                                            {new Date(event.date).toLocaleDateString('default', { month: 'short' })}
                                        </span>
                                        <span className="text-2xl font-bold text-white">
                                            {new Date(event.date).getDate()}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                                                {event.title}
                                            </h3>
                                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/10 font-mono uppercase">
                                                {event.type.replace('-', ' ')}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-400 line-clamp-2">
                                            {event.description}
                                        </p>
                                    </div>

                                    <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-blue-500 transition-colors" />
                                </motion.div>
                            ))
                        )}
                    </motion.div>
                )}
            </AnimatePresence>


            <AnimatePresence>
                {selectedEvent && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setSelectedEvent(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={e => e.stopPropagation()}
                            className="w-full max-w-3xl bg-[#0a0a12] border border-blue-500/30 rounded-xl overflow-hidden shadow-2xl max-h-[85vh] flex flex-col"
                        >
                            {/* Modal Header */}
                            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-white/10 bg-gradient-to-r from-blue-900/20 to-transparent shrink-0">
                                <div className="font-mono text-blue-400 text-xs sm:text-sm tracking-widest flex items-center gap-2">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                                    TRANSMISSION RECEIVED ({selectedEvent.length})
                                </div>
                                <button onClick={() => setSelectedEvent(null)} className="text-gray-400 hover:text-white transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                                {/*event list*/}
                                <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 custom-scrollbar">
                                    {selectedEvent.map((evt, idx) => (
                                        <div key={idx} className={`${idx > 0 ? 'pt-8 border-t border-white/10' : ''}`}>
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="font-mono text-xs text-blue-500 px-2 py-1 border border-blue-500/30 rounded bg-blue-500/5">
                                                    {new Date(evt.date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }).toUpperCase()}
                                                </div>
                                                <div className="h-px flex-1 bg-white/10"></div>
                                            </div>

                                            <div className="flex flex-col sm:flex-row gap-6 items-start">
                                                {getEventImage(evt) && (
                                                    <div className="shrink-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/5 rounded-lg border border-white/10 p-2 flex items-center justify-center">
                                                        <img
                                                            src={getEventImage(evt)}
                                                            alt={evt.title}
                                                            className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(59,130,246,0.2)]"
                                                        />
                                                    </div>
                                                )}
                                                <div className="flex-1">
                                                    <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">
                                                        {evt.title}
                                                    </h2>
                                                    <p className="text-gray-400 leading-relaxed mb-6 text-sm sm:text-base">
                                                        {evt.description}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-3 font-mono text-[10px] sm:text-xs">
                                                <div className="px-3 py-1.5 rounded bg-white/5 border border-white/10 text-gray-400">
                                                    TYPE: <span className="text-white uppercase">{evt.type.replace('-', ' ')}</span>
                                                </div>
                                                {evt.intensity && (
                                                    <div className="px-3 py-1.5 rounded bg-white/5 border border-white/10 text-gray-400">
                                                        INTENSITY: <span className={`uppercase font-bold ${evt.intensity === 'High' ? 'text-green-400' :
                                                            evt.intensity === 'Medium' ? 'text-yellow-400' : 'text-gray-300'
                                                            }`}>{evt.intensity}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Calendar;
