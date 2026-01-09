import { motion, useReducedMotion } from "framer-motion";
import { coordinators, coreTeam } from "../data/team";
import TeamCard from "../components/Team/TeamCard";
import CoreTeamCard from "../components/Team/CoreTeamCard"

const container = {
  hidden: { opacity: 0 },
  visible: (reduced) => ({
    opacity: 1,
    transition: {
      staggerChildren: reduced ? 0 : 0.12,
      delayChildren: reduced ? 0 : 0.15,
    },
  }),
};

const item = {
  hidden: { opacity: 0, y: 40 },
  visible: (reduced) => ({
    opacity: 1,
    y: 0,
    transition: reduced
      ? { duration: 0.2 }
      : { type: "spring", stiffness: 60, damping: 14 },
  }),
};

const Team = () => {
  const reduced = useReducedMotion();

  return (
    <motion.section
      className="
        min-h-screen px-6 py-20 text-white max-w-6xl mx-auto
      "
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
        className="text-4xl md:text-5xl font-extrabold text-center mb-14"
      >
        Meet Our Team
      </motion.h1>

      {/* Coordinators */}
      <motion.div
        variants={container}
        custom={reduced}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
      >
        {coordinators.map((member) => (
          <TeamCard key={member.id} member={member} />
        ))}
      </motion.div>

      {/* Core Team */}
      <motion.h2
        variants={item}
        custom={reduced}
        className="text-3xl md:text-4xl font-bold text-center mt-20 mb-10"
      >
        Core Team
      </motion.h2>

      <motion.div
        variants={container}
        custom={reduced}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
      >
        {coreTeam.map((member) => (
          <CoreTeamCard key={member.id} member={member} />
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Team;
