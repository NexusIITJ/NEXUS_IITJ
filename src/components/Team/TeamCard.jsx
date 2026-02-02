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
          boxShadow: "0 0 14px rgba(34,211,238,0.45)",
        }
  }
  className="
    relative w-64 sm:w-72 h-[22rem]
    rounded-2xl overflow-hidden
    border border-cyan-400/30
    group
  "
>
  {/* Background image */}
  <img
    src={getRenderableImageUrl(image) || placeholderImage}
    alt={name}
    className="
      absolute inset-0 w-full h-full object-cover
      scale-105 group-hover:scale-110
      transition-transform duration-700
    "
  />

  {/* Dark gradient for readability */}
  <div className="
    absolute inset-0
    bg-gradient-to-t
    from-black/85 via-black/40 to-black/10
  " />

  {/* Cyan glow overlay */}
  <div className="
    absolute inset-0
    bg-gradient-to-br
    from-cyan-400/10 via-transparent to-transparent
  " />

  {/* Content */}
  <div className="
    relative z-10 h-full
    flex flex-col justify-end
    p-6 text-center
  ">
    <h3 className="text-lg font-semibold text-white leading-tight">
      {name}
    </h3>

    {role && (
      <p className="text-sm text-cyan-300 mt-1 mb-4">
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
            p-2 rounded-full
            bg-black/40 backdrop-blur-md
            border border-white/10
            text-gray-200
            hover:text-cyan-300
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
            p-2 rounded-full
            bg-black/40 backdrop-blur-md
            border border-white/10
            text-gray-200
            hover:text-pink-400
            hover:border-pink-400/40
            hover:shadow-lg hover:shadow-pink-500/30
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
            p-2 rounded-full
            bg-black/40 backdrop-blur-md
            border border-white/10
            text-gray-200
            hover:text-white
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
