
import React from 'react';

export const MoonIcon = ({ phase, className = "w-3 h-3" }) => {
    // Normalize phase input to handle both numeric and string values consistently
    // Phase: 0 = New, 4 = Full. 
    
    // Check for New Moon (0 or string check)
    if (phase === 0 || (typeof phase === 'string' && phase.toLowerCase().includes('new')))
        return (
            <div 
                className={`${className} rounded-full border border-slate-600 bg-slate-900/50 shadow-[0_0_5px_rgba(255,255,255,0.1)] ring-1 ring-slate-700/50`} 
                title="New Moon" 
            />
        );

    // Check for Full Moon (4 or string check)
    if (phase === 4 || (typeof phase === 'string' && phase.toLowerCase().includes('full')))
        return (
            <div 
                className={`${className} bg-slate-200 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] ring-2 ring-white/20`} 
                title="Full Moon" 
            />
        );

    // Quarter/Gibbous fallback (if we decide to show them) - Generic Icon
    return (
        <div className={`${className} rounded-full overflow-hidden border border-slate-600 bg-slate-900 relative`} title={`Phase ${phase}`}>
            <div className="absolute inset-y-0 right-0 w-1/2 bg-slate-300 opacity-50" />
        </div>
    );
};
