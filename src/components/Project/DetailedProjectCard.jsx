import { motion } from 'framer-motion';
import { ExternalLink, Github, Calendar, Users, ChevronRight } from 'lucide-react';
import { getRenderableImageUrl } from '../../utils/imageUtils';

export default function DetailedProjectCard({ activeProject }) {
  return (
    <motion.div
      key={activeProject.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-80 overflow-hidden">
        <img
          src={getRenderableImageUrl(activeProject.image)}
          alt={activeProject.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-8">
        <h2 className="text-4xl font-bold text-white mb-4">
          {activeProject.title}
        </h2>

        <p className="text-amber-50 mb-6">
          {activeProject.description}
        </p>

        {/* Meta */}
        <div className="flex flex-wrap gap-6 mb-6 text-sm text-gray-400">
  
  {/* Date */}
  <span className="flex items-center gap-2">
    <Calendar className="w-4 h-4" />
    {activeProject.date}
  </span>

  {/* Team */}
  <div className="flex flex-col gap-2">
    <div className="flex items-center gap-2">
      <Users className="w-4 h-4" />
      <span className="text-gray-300 font-medium">Team | Collaborator </span>
    </div>

    <div className="flex flex-wrap gap-2">
      {/* Team Lead */}
      <span className="px-3 py-1 rounded-full bg-indigo-500/40 text-gray-300 border border-indigo-500/30">
        {activeProject.team[0]} <span className="ml-1 text-m">(Lead)</span>
      </span>

      {/* Other Members */}
      {activeProject.team.slice(1).map((member, idx) => (
        <span
          key={idx}
          className="px-3 py-1 rounded-full bg-indigo-500/20 text-gray-300 border border-gray-600"
        >
          {member}
        </span>
      ))}
    </div>
  </div>

</div>


        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {activeProject.technologies.map((tech, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded text-xs bg-blue-500/10 text-blue-200 border border-blue-500/30"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
          {activeProject.links.github && (
            <a href={activeProject.links.github} className="flex items-center gap-2 text-gray-400 hover:text-white">
              <Github className="w-4 h-4" />
              Code
            </a>
          )}
          {activeProject.links.live && (
            <a href={activeProject.links.live} className="flex items-center gap-2 text-gray-400 hover:text-white">
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          )}
        </div>
      </div>
 <motion.div
  className="lg:hidden text-center text-xs text-gray-400 pb-4"
  initial={{ opacity: 0 }}
  animate={{ opacity: [0.4, 0.8, 0.4] }}
  transition={{
    delay: 0.8,
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  }}
>
  ← Swipe right to go back
</motion.div>

    </motion.div>
  )
}
