import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { Github, Linkedin, Instagram } from "lucide-react";
import { useRef } from "react";

const placeholderImage = "/placeholder.png";

const CoreTeamCard = ({ member = {} }) => {
  const {
    name = "",
    image,
    role,
    links = {},
  } = member;
  const ref = useRef(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 180, damping: 18 });
  const springY = useSpring(y, { stiffness: 180, damping: 18 });

  const handleMove = (e) => {
    if (reduced || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.12);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.12);
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
            scale: 1.05,
            boxShadow: "0 0 30px rgba(34,211,238,0.6)",
          }
      }
      className="
        relative rounded-2xl overflow-hidden
        bg-gradient-to-b from-blue-600/20 to-cyan-400/10
        backdrop-blur-lg
        border border-cyan-400/30
      "
    >
      {/* IMAGE */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={member.image || placeholderImage}
          alt={member.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

        {/* CORE BADGE */}
        {/* <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold
                         bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 backdrop-blur">
          Core Team
        </span> */}
      </div>

      {/* CONTENT */}
      <div className="p-6 text-center">
        <h3 className="text-xl font-semibold text-white mb-1">
          {member.name}
        </h3>

        {member.role && (
          <p className="text-sm text-cyan-300 mb-5">
            {member.role}
          </p>
        )}

        {/* SOCIAL LINKS */}
        <div className="flex justify-center gap-4">
          {member.links?.linkedin && (
            <a
              href={member.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-300
                         hover:text-cyan-300 hover:border-cyan-400/40
                         hover:shadow-lg hover:shadow-cyan-400/30
                         transition-all"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          )}

          {member.links?.instagram && (
            <a
              href={member.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-300
                         hover:text-pink-400 hover:border-pink-400/40
                         hover:shadow-lg hover:shadow-pink-500/20
                         transition-all"
            >
              <Instagram className="w-5 h-5" />
            </a>
          )}

          {member.links?.github && (
            <a
              href={member.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-300
                         hover:text-white hover:border-white/40
                         hover:shadow-lg hover:shadow-white/20
                         transition-all"
            >
              <Github className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CoreTeamCard;
