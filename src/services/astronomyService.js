import astronomyEvents from '../data/astronomyEvents.json';

// Base URL for USNO API
const BASE_URL = 'https://aa.usno.navy.mil/api';

const formatDate = (year, month, day) => {
    const pad = n => n < 10 ? '0' + n : n;
    return `${year}-${pad(month)}-${pad(day)}`;
};

/**
 * Fetches Moon Phases for a given year.
 * @param {number} year 
 * @returns {Promise<Array>} List of moon phase events
 */
const fetchMoonPhases = async (year) => {
    try {
        const response = await fetch(`${BASE_URL}/moon/phases/year?year=${year}`);
        const data = await response.json();

        // Data format: { phasedata: [ { day: 1, month: 1, year: 2025, phase: "New Moon", time: "12:00" }, ... ] }
        if (!data.phasedata) return [];

        return data.phasedata.map(item => {
            const dateStr = formatDate(item.year, item.month, item.day);
            let desc = `Moon Phase: ${item.phase}`;
            const timeStr = item.time; // API usually returns HH:MM

            if (item.phase === 'New Moon') {
                desc = `The Moon will be located on the same side of the Earth as the Sun and will not be visible in the night sky. This phase occurs at ${timeStr} UTC. This is the best time of the month to observe faint objects such as galaxies and star clusters because there is no moonlight to interfere.`;
            } else if (item.phase === 'Full Moon') {
                desc = `The Moon will be located on the opposite side of the Earth as the Sun and its face will be fully illuminated. This phase occurs at ${timeStr} UTC.`;
            }

            return {
                date: dateStr,
                title: item.phase,
                type: 'moon-phase',
                description: desc,
                intensity: item.phase === 'Full Moon' ? 'High' : (item.phase === 'New Moon' ? 'Low' : 'Medium')
            };
        });
    } catch (error) {
        console.error("Error fetching moon phases:", error);
        return [];
    }
};

/**
 * Fetches Earth's Seasons for a given year.
 * @param {number} year 
 * @returns {Promise<Array>} List of season events
 */
const fetchSeasons = async (year) => {
    try {
        const response = await fetch(`${BASE_URL}/seasons?year=${year}`);
        const data = await response.json();

        // Data format: { data: [ { phenom: "Equinox", day: 20, month: 3, year: 2025 ... }, ... ] }
        if (!data.data) return [];

        return data.data.map(item => {
            const dateStr = formatDate(item.year, item.month, item.day);
            let title = item.phenom;
            let desc = `Astronomical Event: ${item.phenom}`;

            if (item.phenom === 'Equinox') {
                if (item.month < 7) { // March
                    title = 'March Equinox';
                    desc = `The Sun will shine directly on the equator and there will be nearly equal amounts of day and night throughout the world. This is also the first day of spring (vernal equinox) in the Northern Hemisphere and the first day of fall (autumnal equinox) in the Southern Hemisphere.`;
                } else { // September
                    title = 'September Equinox';
                    desc = `The Sun will shine directly on the equator and there will be nearly equal amounts of day and night throughout the world. This is also the first day of fall (autumnal equinox) in the Northern Hemisphere and the first day of spring (vernal equinox) in the Southern Hemisphere.`;
                }
            } else if (item.phenom === 'Solstice') {
                if (item.month < 7) { // June
                    title = 'June Solstice';
                    desc = `The North Pole of the earth will be tilted toward the Sun, which will have reached its northernmost position in the sky and will be directly over the Tropic of Cancer. This is the first day of summer (summer solstice) in the Northern Hemisphere and the first day of winter (winter solstice) in the Southern Hemisphere.`;
                } else { // December
                    title = 'December Solstice';
                    desc = `The South Pole of the earth will be tilted toward the Sun, which will have reached its southernmost position in the sky and will be directly over the Tropic of Capricorn. This is the first day of winter (winter solstice) in the Northern Hemisphere and the first day of summer (summer solstice) in the Southern Hemisphere.`;
                }
            } else if (item.phenom === 'Perihelion') {
                desc = `Earth reaches the closest point to the Sun in its yearly orbit. This slightly increases the Sun’s apparent size and the amount of sunlight Earth receives overall.`;
            } else if (item.phenom === 'Aphelion') {
                desc = `Earth reaches the farthest point from the Sun in its yearly orbit. The Sun appears a tiny bit smaller and Earth receives slightly less sunlight compared to perihelion.`;
            } else {
                // Fallback for others
                desc = `${item.phenom} occurs at ${item.time} UTC.`;
            }

            return {
                date: dateStr,
                title: title,
                type: 'celestial-event',
                description: desc,
                intensity: 'Medium'
            };
        });
    } catch (error) {
        console.error("Error fetching seasons:", error);
        return [];
    }
};

/**
 * Fetches Solar Eclipses for a given year.
 * @param {number} year 
 * @returns {Promise<Array>} List of solar eclipse events
 */
const fetchSolarEclipses = async (year) => {
    try {
        const response = await fetch(`${BASE_URL}/eclipses/solar/year?year=${year}`);
        const data = await response.json();

        // Data format: { eclipses_in_year: [ { event: "...", day: 29, month: 3, year: 2025 }, ... ] }
        if (!data.eclipses_in_year) return [];

        const LAT = 26.4669;
        const LON = 73.1147;

        const events = await Promise.all(data.eclipses_in_year.map(async (eclipse) => {

            const dateStr = formatDate(eclipse.year, eclipse.month, eclipse.day);

            try {
                // api uses date=YYYY-MM-DD
                const localResp = await fetch(`${BASE_URL}/eclipses/solar/date?date=${dateStr}&coords=${LAT},${LON}&height=0`);
                const localData = await localResp.json();

                let desc = `A solar eclipse occurs when the Moon passes between Earth and the Sun and casts its shadow on Earth. Depending on the alignment, observers may see a partial eclipse, an annular “ring of fire,” or a total eclipse with the Sun’s corona visible.`;

                if (!localData.error && localData.description) {
                    desc += ` Local visibility: ${localData.description}`;
                } else if (localData.error && localData.error.includes('not visible')) {
                    desc += ` Note: Not visible from your location (${LAT}, ${LON}).`;
                }

                return {
                    date: dateStr,
                    title: 'Solar Eclipse',
                    type: 'solar-eclipse',
                    description: desc,
                    intensity: 'High'
                };

            } catch (err) {
                // Fallback to generic
                return {
                    date: dateStr,
                    title: `Solar Eclipse`,
                    type: 'solar-eclipse',
                    description: `A solar eclipse occurs when the Moon passes between Earth and the Sun and casts its shadow on Earth. Depending on the alignment, observers may see a partial eclipse, an annular “ring of fire,” or a total eclipse with the Sun’s corona visible.`,
                    intensity: 'High'
                };
            }
        }));

        return events.filter(e => e !== null);

    } catch (error) {
        console.error("Error fetching solar eclipses:", error);
        return [];
    }
};

/**
 * Retrieves pre-calculated planetary events (Lunar Eclipses, Elongations, Oppositions) from src/data/astronomyEvents.json.
 * @param {number} year 
 */
const getPlanetaryEvents = (year) => {
    // Filter events for the requested year
    // astronomyEvents dates are "YYYY-MM-DD"
    const prefix = `${year}`;
    return astronomyEvents.filter(e => e.date.startsWith(prefix));
};

/**
 * Aggregates all astronomical events for the year.
 */
export const getAstronomyEvents = async (year) => {
    const [moon, seasons, solar] = await Promise.all([
        fetchMoonPhases(year),
        fetchSeasons(year),
        fetchSolarEclipses(year)
    ]);

    const planetary = getPlanetaryEvents(year);

    return [
        ...moon,
        ...seasons,
        ...solar,
        ...planetary
    ].sort((a, b) => a.date.localeCompare(b.date));
};
