import { motion, useReducedMotion } from "framer-motion";
import { label } from "framer-motion/client";
import { FaLinkedinIn, FaInstagram, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const iconVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (reduced) => ({
    opacity: 1,
    y: 0,
    transition: reduced
      ? { duration: 0.2 }
      : { type: "spring", stiffness: 120, damping: 12 },
  }),
};

const TeamFooter = ({ links }) => {
  const reduced = useReducedMotion();

  return (
    <footer className="mt-10 border-t border-white/10 text-center">
      {/* Glow divider */}
      <div className="mx-auto mb-10 h-px w-40 bg-gradient-to-r from-transparent via-blue-400 to-transparent
                      shadow-[0_0_14px_rgba(59,130,246,0.9)]" />

      {/* Social icons */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex justify-center gap-8 mb-10"
      >
        {[
          { icon: FaLinkedinIn, href: "https://www.linkedin.com/company/nexus-iit-jodhpur", label: "LinkedIn" },
          { icon: FaInstagram, href:"https://www.instagram.com/nexus__iitj/", label: "Instagram" },
          { icon: FaGithub, href: "https://github.com/NexusIITJ", label: "GitHub" },
        ].map(({ icon: Icon, href, label }, i) => (
          <motion.a
            key={label}
            variants={iconVariants}
            custom={reduced}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="
              p-4 rounded-full border border-white/15
              text-white/80 hover:text-blue-400
              hover:border-blue-400/60
              shadow-[0_0_0px_rgba(59,130,246,0)]
              hover:shadow-[0_0_20px_rgba(59,130,246,0.7)]
              transition-all duration-300
            "
          >
            <Icon size={22} />
          </motion.a>
        ))}
      </motion.div>

      {/* Contact button */}
      <motion.div
        variants={iconVariants}
        custom={reduced}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Link
          to="/contact"
          className="
            inline-block px-8 py-3 rounded-full
            font-semibold tracking-wide
            bg-gradient-to-r from-blue-500 to-indigo-500
            text-white
            shadow-[0_0_25px_rgba(59,130,246,0.6)]
            hover:shadow-[0_0_40px_rgba(99,102,241,0.9)]
            hover:scale-105
            transition-all duration-300
          "
        >
          Contact Us
        </Link>
      </motion.div>

      {/* Tiny footer text */}
      <p className="mt-5 text-sm text-white/40">
        © {new Date().getFullYear()} • Built with love for space ✨
      </p>
    </footer>
  );
};

export default TeamFooter;