import { motion, useReducedMotion } from "framer-motion";
import { getRenderableImageUrl } from "../../utils/imageUtils";

const placeholderImage = "/placeholder.png";

const GoogleScholarIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 13.09L5.47 12 12 8.91 18.53 12 12 16.09z" />
  </svg>
);

const FacultyCoordinatorCard = ({ coordinator = {} }) => {
    const {
        name = "",
        position = "",
        description = "",
        image,
        scholar,
    } = coordinator;

    const reduced = useReducedMotion();

    return (
        <motion.div
            whileHover={
                reduced
                    ? {}
                    : {
                        boxShadow: "0 0 12px rgba(34,211,238,0.35)",
                    }
            }
            className="
                max-w-255 mx-auto sm:ml-11 sm:mr-0
                flex flex-col sm:flex-row
                rounded-2xl overflow-hidden
                bg-gradient-to-b from-blue-600/20 to-cyan-400/10
                backdrop-blur-lg
                border border-cyan-400/30 w-full
                "

        >
            {/* IMAGE SECTION */}
            <div className="relative w-full sm:w-64 h-64 sm:h-auto shrink-0">
                <img
                    src={getRenderableImageUrl(image) || placeholderImage}
                    alt={name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/20 to-transparent" />
            </div>

            {/* CONTENT SECTION */}
            <div className="flex flex-col justify-center p-6 sm:p-8 text-center sm:text-left">
                <h2 className="text-2xl font-semibold text-white mb-1">
                    {name}
                </h2>

                {position && (
                    <h3 className="text-base font-medium text-cyan-300 mb-4">
                        {position}
                    </h3>
                )}

                {description && (
                    <p className="text-sm text-gray-300 leading-relaxed max-w-3xl">
                        {description}
                    </p>
                )}

                {scholar && (
                    <div className="mt-5">
                        <a
                            href={scholar}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                inline-flex items-center gap-2
                                px-4 py-2 rounded-full
                                bg-white/5 border border-white/10
                                text-gray-300 hover:text-cyan-300
                                hover:border-cyan-400/40
                                hover:shadow-lg hover:shadow-cyan-400/30
                                transition-all text-sm
                            "
                        >
                            <GoogleScholarIcon className="w-4 h-4" />
                            Google Scholar
                        </a>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default FacultyCoordinatorCard;