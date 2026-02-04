import { motion } from 'framer-motion';
import { categoryStyles } from "../../data/projects"
import { getRenderableImageUrl } from '../../utils/imageUtils';

const ProjectCard = ({ project, isActive, setActiveProject }) => {

    const truncate = (text, length = 200) =>
        text.length > length ? text.slice(0, length) + "…" : text;
    return (
        <motion.button
            key={project.id}
            onClick={() => setActiveProject(project)}
            whileHover={{ x: 6 }}
            className={`w-full text-left text-xl rounded-xl overflow-hidden border transition-all ${isActive
                ? "bg-blue-500/30 border-blue-500/40 shadow-lg shadow-blue-500/10"
                : "bg-white/15 border-white/20 hover:bg-white/20"
                }`}
        >

            {isActive && (
                <motion.div
                    layoutId="activeProject"
                    className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r"
                />
            )}

            <div className="flex gap-4 p-4">
                {/* Thumbnail */}
                <div className="relative w-35 h-35 shrink-0 rounded-lg overflow-hidden">
                    <img
                        src={getRenderableImageUrl(project.image)}
                        alt={project.title}
                        className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 bg-black/30" />

                    {/* CATEGORY TAG */}
                    <span
                        className={`absolute top-1 left-1 px-2 py-0.5 rounded text-[10px] font-semibold border backdrop-blur-sm
      ${categoryStyles[project.category] ?? "bg-white/10 text-white border-white/20"}
    `}
                    >
                        {project.category}
                    </span>
                </div>

                {/* Text */}
                <div className="flex-1">
                    <h4
                        className={`font-semibold mb-1 transition-colors ${isActive ? "text-white" : "text-gray-200"
                            }`}
                    >
                        {project.title}
                    </h4>

                    <p className="text-xs text-amber-50 leading-relaxed">
                        {truncate(project.description)}
                    </p>
                </div>
            </div>
        </motion.button>
    );
}

export default ProjectCard