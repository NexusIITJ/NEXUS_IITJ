import { motion, useReducedMotion } from "framer-motion";
import { FaEnvelope, FaPaperPlane } from "react-icons/fa";
import { socialLinks } from "../data/team";
import { FaLinkedinIn, FaInstagram, FaGithub } from "react-icons/fa";

const container = {
  hidden: { opacity: 0 },
  visible: (reduced) => ({
    opacity: 1,
    transition: {
      staggerChildren: reduced ? 0 : 0.12,
    },
  }),
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: (reduced) => ({
    opacity: 1,
    y: 0,
    transition: reduced
      ? { duration: 0.2 }
      : { type: "spring", stiffness: 70, damping: 14 },
  }),
};

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

const Contact = () => {
  const reduced = useReducedMotion();

  const handleSubmit = (e) => {
    e.preventDefault();
    // connect EmailJS / backend here
  };

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="visible"
      custom={reduced}
      className="min-h-screen px-6 py-24 text-white max-w-4xl mx-auto"
    >
      {/* Title */}
      <motion.h1
        variants={item}
        custom={reduced}
        className="text-4xl md:text-5xl font-extrabold text-center mb-6"
      >
        Contact Us
      </motion.h1>

      <div className="mx-auto mb-14 h-px w-32 bg-gradient-to-r from-transparent via-blue-400 to-transparent
                      shadow-[0_0_16px_rgba(59,130,246,0.9)]" />

      <motion.p
        variants={item}
        custom={reduced}
        className="text-center text-white/70 max-w-xl mx-auto mb-16"
      >
        Have a question, collaboration idea, or just want to say hi?
        Drop us a message and we'll get back to you 🚀
      </motion.p>

      {/* Contact Form */}
      <motion.form
        variants={item}
        custom={reduced}
        onSubmit={handleSubmit}
        className="
          bg-white/5 backdrop-blur-md
          border border-white/10
          rounded-2xl p-10
          shadow-[0_0_40px_rgba(59,130,246,0.25)]
          space-y-6
        "
      >
        {/* Name */}
        <div>
          <label className="block mb-2 text-sm text-white/60">
            Your Name
          </label>
          <input
            type="text"
            required
            className="
              w-full rounded-lg px-4 py-3
              bg-black/30 border border-white/10
              text-white placeholder-white/40
              focus:outline-none focus:border-blue-400
              focus:shadow-[0_0_15px_rgba(59,130,246,0.6)]
              transition
            "
            placeholder="Jane Doe"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 text-sm text-white/60">
            Email Address
          </label>
          <input
            type="email"
            required
            className="
              w-full rounded-lg px-4 py-3
              bg-black/30 border border-white/10
              text-white placeholder-white/40
              focus:outline-none focus:border-blue-400
              focus:shadow-[0_0_15px_rgba(59,130,246,0.6)]
              transition
            "
            placeholder="you@example.com"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block mb-2 text-sm text-white/60">
            Message
          </label>
          <textarea
            rows="5"
            required
            className="
              w-full rounded-lg px-4 py-3
              bg-black/30 border border-white/10
              text-white placeholder-white/40
              focus:outline-none focus:border-blue-400
              focus:shadow-[0_0_15px_rgba(59,130,246,0.6)]
              transition resize-none
            "
            placeholder="Tell us what’s on your mind..."
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="
            group w-full flex items-center justify-center gap-3
            px-6 py-3 rounded-full font-semibold
            bg-gradient-to-r from-blue-500 to-indigo-500
            text-white
            shadow-[0_0_25px_rgba(59,130,246,0.6)]
            hover:shadow-[0_0_40px_rgba(99,102,241,0.9)]
            hover:scale-[1.02]
            transition-all duration-300
          "
        >
          <FaPaperPlane className="group-hover:translate-x-1 transition" />
          Send Message
        </button>
      </motion.form>
      <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex justify-center gap-8 mt-10"
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
    </motion.section>
  );
};

export default Contact;