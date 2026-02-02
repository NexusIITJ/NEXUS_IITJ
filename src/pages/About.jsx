import { motion, useReducedMotion } from "framer-motion";
import { aboutData } from "../data/about";
import Team from "./Team";

const container = {
  hidden: { opacity: 0 },
  visible: (reduced) => ({
    opacity: 1,
    transition: {
      staggerChildren: reduced ? 0 : 0.15,
      delayChildren: reduced ? 0 : 0.1,
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
      : { type: "spring", stiffness: 60, damping: 16 },
  }),
};

const About = () => {
  const reduced = useReducedMotion();

  return (
    <motion.section
      className="min-h-screen px-6 pt-20 text-white max-w-6xl mx-auto"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      custom={reduced}
    >
      {/* Title */}
      <motion.h1
        variants={item}
        custom={reduced}
        className="text-4xl md:text-5xl font-bold text-center mb-8"
      >
        About Us
      </motion.h1>

      {/* Description */}
      <motion.p
        variants={item}
        custom={reduced}
        className="text-gray-300 text-lg leading-relaxed text-center mb-12"
      >
        {aboutData.description}
      </motion.p>

      {/* Vision */}
      {/* <motion.div
        variants={item}
        custom={reduced}
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 mb-16"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Our Vision
        </h2>
        <p className="text-gray-300 text-center">
          {aboutData.vision}
        </p>
      </motion.div> */}

      {/* Highlights Title */}
      {/* <motion.h2
        variants={item}
        custom={reduced}
        className="text-2xl font-semibold mb-8 text-center"
      >
        What We Do
      </motion.h2> */}

      {/* Highlights Grid */}
      {/* <motion.div
        variants={container}
        custom={reduced}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {aboutData.highlights.map((itemText, index) => (
          <motion.div
            key={index}
            variants={item}
            custom={reduced}
            whileHover={
              reduced
                ? {}
                : { y: -6, scale: 1.03 }
            }
            className="
              bg-white/10 backdrop-blur-md border border-white/20
              rounded-xl p-6 transition-transform
            "
          >
            <p className="text-lg text-gray-200">
              {itemText}
            </p>
          </motion.div>
        ))}
      </motion.div> */}
      <Team/>
    </motion.section>
  );
};

export default About;
