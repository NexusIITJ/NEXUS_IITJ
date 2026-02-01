import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { Github, Linkedin, Instagram } from "lucide-react";
import { useRef } from "react";
import { getRenderableImageUrl } from "../../utils/imageUtils";

const placeholderImage = "/placeholder.png";

const TeamCard = ({ member = {} }) => {
  const {
    name = "",
    role = "",
    image,
    links = {},
  } = member;

  const ref = useRef(null);
  const reduced = useReducedMotion();

  // ORIGINAL TEAM CARD MAGNET VALUES ✅
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMove = (e) => {
    if (reduced || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.15);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.15);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        x: reduced ? 0 : springX,
        y: reduced ? 0 : springY,
      }}
      whileHover={
        reduced
          ? {}
          : {
              scale: 1.04,
              boxShadow: "0 0 10px rgba(34,211,238,0.35)",
            }
      }
      className="
        relative rounded-2xl overflow-hidden
        bg-gradient-to-b from-blue-600/20 to-cyan-400/10
        backdrop-blur-lg
        border border-cyan-400/30 w-64 sm:w-72
      "
    >
      {/* IMAGE */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={getRenderableImageUrl(image) || placeholderImage}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="p-6 text-center">
        <h3 className="text-lg font-semibold text-white mb-1">
          {name}
        </h3>

        {role && (
          <p className="text-sm text-cyan-300 mb-5">
            {role}
          </p>
        )}

        {/* SOCIAL LINKS */}
        <div className="flex justify-center gap-4">
          {links.linkedin && (
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="
                p-2 rounded-full bg-white/5 border border-white/10
                text-gray-300 hover:text-cyan-300
                hover:border-cyan-400/40
                hover:shadow-lg hover:shadow-cyan-400/30
                transition-all
              "
            >
              <Linkedin className="w-5 h-5" />
            </a>
          )}

          {links.instagram && (
            <a
              href={links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="
                p-2 rounded-full bg-white/5 border border-white/10
                text-gray-300 hover:text-pink-400
                hover:border-pink-400/40
                hover:shadow-lg hover:shadow-pink-500/20
                transition-all
              "
            >
              <Instagram className="w-5 h-5" />
            </a>
          )}

          {links.github && (
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="
                p-2 rounded-full bg-white/5 border border-white/10
                text-gray-300 hover:text-white
                hover:border-white/40
                hover:shadow-lg hover:shadow-white/20
                transition-all
              "
            >
              <Github className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TeamCard;
