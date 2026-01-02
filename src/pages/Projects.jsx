import { motion } from 'framer-motion';
import { useState } from 'react';
import { ExternalLink, Github, Calendar, Users, ChevronRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "Radio Telescope Development",
    description: "Building a low-frequency radio telescope array to detect cosmic radio emissions and study pulsars, solar activity, and the Milky Way.",
    image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800",
    category: "Instrumentation",
    status: "ongoing",
    team: ["Astrophysics Team", "Electronics Club"],
    date: "2025 - Present",
    technologies: ["RF Engineering", "Signal Processing", "Python"],
    links: {
      github: "#",
      documentation: "#"
    }
  },
  {
    id: 2,
    title: "Exoplanet Detection Analysis",
    description: "Analyzing light curves from TESS data to identify potential exoplanets using transit photometry and machine learning algorithms.",
    image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800",
    category: "Research",
    status: "ongoing",
    team: ["Data Science Team"],
    date: "2024 - Present",
    technologies: ["Python", "TensorFlow", "Astropy"],
    links: {
      github: "#",
      paper: "#"
    }
  },
  {
    id: 3,
    title: "Rocket Propulsion Lab",
    description: "Designing and testing hybrid rocket engines for potential sounding rocket launches. Focus on fuel efficiency and thrust optimization.",
    image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=800",
    category: "Rocketry",
    status: "ongoing",
    team: ["Propulsion Team"],
    date: "2025 - Present",
    technologies: ["CFD Analysis", "CAD Design", "Combustion Testing"],
    links: {
      documentation: "#"
    }
  },
  {
    id: 4,
    title: "Deep Sky Astrophotography",
    description: "Capturing stunning images of nebulae, galaxies, and star clusters using our 8-inch telescope and CCD camera setup.",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800",
    category: "Observation",
    status: "ongoing",
    team: ["Imaging Team"],
    date: "2023 - Present",
    technologies: ["Astrophotography", "Image Stacking", "PixInsight"],
    links: {
      gallery: "/gallery"
    }
  },
  {
    id: 5,
    title: "Meteor Observation Network",
    description: "Established a network of cameras to track and analyze meteor trajectories, contributing to global meteor databases.",
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800",
    category: "Observation",
    status: "completed",
    team: ["Observation Team"],
    date: "2023 - 2024",
    technologies: ["Computer Vision", "Trajectory Analysis"],
    links: {
      documentation: "#"
    }
  },
  {
    id: 6,
    title: "Solar Activity Monitoring",
    description: "Daily monitoring and documentation of sunspots, solar flares, and coronal mass ejections to study solar cycles.",
    image: "https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=800",
    category: "Research",
    status: "ongoing",
    team: ["Solar Team"],
    date: "2024 - Present",
    technologies: ["H-alpha Telescopes", "Time-series Analysis"],
    links: {
      documentation: "#"
    }
  },
  {
    id: 7,
    title: "Satellite Tracking System",
    description: "Real-time tracking and visualization of satellites including ISS, communication satellites, and space debris.",
    image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800",
    category: "Software",
    status: "completed",
    team: ["Development Team"],
    date: "2024",
    technologies: ["React", "Three.js", "TLE Data"],
    links: {
      github: "#",
      live: "/ISSTracker"
    }
  },
  {
    id: 8,
    title: "Astronomy Event Predictor",
    description: "Web application providing accurate predictions of celestial events including eclipses, planetary alignments, and meteor showers.",
    image: "https://images.unsplash.com/photo-1534996858221-380b92700493?w=800",
    category: "Software",
    status: "completed",
    team: ["Development Team"],
    date: "2024",
    technologies: ["React", "USNO API", "NASA APIs"],
    links: {
      github: "#",
      live: "/calendar"
    }
  }
];

const categories = ["All", "Research", "Instrumentation", "Rocketry", "Observation", "Software"];
const statuses = ["All", "Ongoing", "Completed"];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const filteredProjects = projects.filter(project => {
    const categoryMatch = selectedCategory === "All" || project.category === selectedCategory;
    const statusMatch = selectedStatus === "All" || project.status === selectedStatus.toLowerCase();
    return categoryMatch && statusMatch;
  });

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
            <span className="text-white">OUR </span>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500">
              PROJECTS
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Explore our diverse range of projects spanning astrophysics research, 
            instrumentation, rocketry, and software development
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-12 space-y-6"
        >
          {/* Category Filter */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Category
            </h3>
            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Status
            </h3>
            <div className="flex flex-wrap gap-3">
              {statuses.map(status => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedStatus === status
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Projects Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-8"
        >
          <p className="text-gray-400 text-sm">
            Showing <span className="text-white font-semibold">{filteredProjects.length}</span> {filteredProjects.length === 1 ? 'project' : 'projects'}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    project.status === 'ongoing'
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  }`}>
                    {project.status === 'ongoing' ? 'Ongoing' : 'Completed'}
                  </span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white backdrop-blur-sm border border-white/20">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Meta Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{project.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>{project.team.join(", ")}</span>
                  </div>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>Code</span>
                    </a>
                  )}
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                  )}
                  {project.links.documentation && (
                    <a
                      href={project.links.documentation}
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                      <span>Documentation</span>
                    </a>
                  )}
                  {project.links.paper && (
                    <a
                      href={project.links.paper}
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Research Paper</span>
                    </a>
                  )}
                  {project.links.gallery && (
                    <a
                      href={project.links.gallery}
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                      <span>View Gallery</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-400 text-lg">
              No projects found matching the selected filters.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
