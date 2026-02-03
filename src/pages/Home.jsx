import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Users, Image, Rocket, Telescope, ExternalLink } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: <Telescope className="w-8 h-8" />,
      title: "Stargazing Sessions",
      description: "Regular observation nights with our telescopes to explore the cosmos"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Space Projects",
      description: "Hands-on projects in astrophysics, rocketry, and space technology"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Astronomy Calendar",
      description: "Track celestial events, eclipses, and planetary alignments"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Workshops & Talks",
      description: "Guest lectures, competitions, and collaborative learning"
    }
  ];

  const quickLinks = [
    { name: "Events", path: "/events", icon: <Calendar className="w-5 h-5" /> },
    { name: "Gallery", path: "/gallery", icon: <Image className="w-5 h-5" /> },
<<<<<<< HEAD
    { name: "ISS Tracker", path: "/ISSTracker", icon: <Rocket className="w-5 h-5" /> },
    // { name: "Team", path: "/team", icon: <Users className="w-5 h-5" /> }
=======
    { name: "Calendar", path: "/calendar", icon: <Calendar className="w-5 h-5" /> },
    { name: "ISS Tracker", path: "/ISSTracker", icon: <Rocket className="w-5 h-5" /> }
>>>>>>> c64e276 (Bug fixes)
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-8"
            >
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tight">
                <span className="text-white">NEXUS</span>
              </h1>
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-px bg-linear-to-r from-transparent via-blue-500 to-transparent w-24"></div>
                <p className="text-blue-400 text-xl sm:text-2xl md:text-3xl font-light tracking-wider">
                  Astronomy and Space-Tech Club
                </p>
                <div className="h-px bg-linear-to-r from-transparent via-blue-500 to-transparent w-24"></div>
              </div>
              <p className="text-gray-400 text-sm sm:text-base tracking-widest uppercase">
                Indian Institute of Technology Jodhpur
              </p>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-gray-300 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              Look up, learn more, launch ideas — your cosmic journey starts here.  
              Join a club that makes the universe feel within reach.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <Link
                to="/projects"
                className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50 w-full sm:w-auto"
              >
                <span className="flex items-center justify-center gap-2">
                  Explore Projects
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 border-2 border-white/30 hover:border-white/60 text-white rounded-lg font-semibold transition-all duration-300 hover:bg-white/10 w-full sm:w-auto"
              >
                About Us
              </Link>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              {quickLinks.map((link, index) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="group flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/30 rounded-full text-gray-300 hover:text-white transition-all duration-300"
                >
                  {link.icon}
                  <span className="text-sm font-medium">{link.name}</span>
                </Link>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/60 rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              What We Do
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Explore what NEXUS offers at your own pace — quiet stargazing, practical workshops, and chances to learn and grow.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "50+", label: "Members" },
              { number: "10+", label: "Events" },
              { number: "10+", label: "Projects" },
              { number: "10+", label: "Years Active" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl font-bold text-blue-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm sm:text-base uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-linear-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-3xl p-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Explore?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Join NEXUS and be part of a community that shares your passion for the cosmos
            </p>
            <Link
              to="/about"
              className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50"
            >
              Meet the Team
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
