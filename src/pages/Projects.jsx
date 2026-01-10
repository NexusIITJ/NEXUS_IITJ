import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ExternalLink, Github, Calendar, Users, ChevronRight } from 'lucide-react';
import { projects, categories, categoryStyles } from "../data/projects"
import ProjectCard from '../components/Project/ProjectCard';
import DetailedProjectCard from '../components/Project/DetailedProjectCard';

// const statuses = ["All", "Ongoing", "Completed"];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeProject, setActiveProject] = useState(null);

  const filteredProjects = projects.filter(project => {
    const categoryMatch = selectedCategory === "All" || project.category === selectedCategory;
    // const statusMatch = selectedStatus === "All" || project.status === selectedStatus.toLowerCase();
    return categoryMatch;
  });

  useEffect(() => {
    if (filteredProjects.length > 0) {
      setActiveProject(filteredProjects[0]);
    }
  }, [selectedCategory]);

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
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category
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
          {/* <div>
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
          </div> */}
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
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 h-[calc(100vh-7rem)]">
          <div className="overflow-y-auto hide-scrollbar pr-2 space-y-4">
            {filteredProjects.map((project) => {
              const isActive = activeProject?.id === project.id;
              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isActive={isActive}
                  setActiveProject={setActiveProject}
                />
              );
            })}
          </div>

          <div className="h-full">
            {activeProject ? (
              <DetailedProjectCard activeProject={activeProject} />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                Select a project to view details
              </div>
            )}
          </div>
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
