import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [expandedMobileDropdown, setExpandedMobileDropdown] = useState(null);
    const location = useLocation();

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const navItems = [
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
        { name: "Events", path: "/events" },
        { name: "Gallery", path: "/gallery" },
        { name: "About Us", path: "/about" },
        { name: "Team", path: "/team" },
        {
            name: "More",
            path: "#",
            dropdown: [
                { name: "Astronomy Calendar", path: "/calendar" },
                { name: "Competitions", path: "/competitions" },
                { name: "Live ISS Tracker", path: "/ISSTracker" }
            ]
        }
    ];

    return (
        <>
            <nav
                className="fixed top-0 left-0 w-full z-50 border-b border-white/10 transition-all duration-300"
            >
                {/* Glass Background Layer */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm -z-10" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link to="/" className="flex-shrink-0 font-bold text-3xl text-white tracking-wider">
                            NEXUS
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {navItems.map((item) => (
                                    <div key={item.name} className="relative group">
                                        {item.dropdown ? (
                                            <button className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 group">
                                                {item.name}
                                                <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                                            </button>
                                        ) : (
                                            <Link
                                                to={item.path}
                                                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                            >
                                                {item.name}
                                            </Link>
                                        )}

                                        {/* Dropdown Menu */}
                                        {item.dropdown && (
                                            <div
                                                className="absolute left-0 mt-4 w-48 rounded-md shadow-lg bg-black/50 transition-all duration-200 transform origin-top-left -translate-y-2 group-hover:translate-y-0 invisible group-hover:visible opacity-0 group-hover:opacity-100 ring-1 ring-black ring-opacity-0 focus:outline-none"
                                                style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
                                            >
                                                <div className="py-1">
                                                    {item.dropdown.map((subItem) => (
                                                        <Link
                                                            key={subItem.name}
                                                            to={subItem.path}
                                                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                                                        >
                                                            {subItem.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none transition-colors"
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div
                className={`md:hidden fixed top-16 left-0 w-full z-40 bg-black/50 border-t border-white/10 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
                    }`}
                style={{ backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
            >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {navItems.map((item) => (
                        <div key={item.name}>
                            {item.dropdown ? (
                                <div className="space-y-1">
                                    <button
                                        onClick={() => setExpandedMobileDropdown(expandedMobileDropdown === item.name ? null : item.name)}
                                        className="w-full text-left text-gray-300 px-3 py-2 text-base font-medium flex items-center justify-between hover:text-white transition-colors"
                                    >
                                        {item.name}
                                        <ChevronDown
                                            size={16}
                                            className={`transition-transform duration-300 ${expandedMobileDropdown === item.name ? "rotate-180" : ""}`}
                                        />
                                    </button>
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedMobileDropdown === item.name ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                                            }`}
                                    >
                                        <div className="pl-6 space-y-1 border-l border-white/10 ml-3">
                                            {item.dropdown.map((subItem) => (
                                                <Link
                                                    key={subItem.name}
                                                    to={subItem.path}
                                                    className="text-gray-400 hover:text-white block px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                                >
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    to={item.path}
                                    className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
                                >
                                    {item.name}
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
