import { motion, useReducedMotion } from "framer-motion";
import { coordinators, coreTeam, Faculty, socialLinks } from "../data/team";
import { pastTeam2025_2026 } from "../data/teamPast_2025";
import TeamCard from "../components/Team/TeamCard";
import CoreTeamCard from "../components/Team/CoreTeamCard";
import FacultyCoordinatorCard from "../components/Team/FacultyCoordinatorCard";
import { sortByImage } from "../utils/imageUtils";
import TeamFooter from "../components/TeamFooter";
import DropDown from "../utils/dropdown";

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
        min-h-screen px-6 pb-20 text-white max-w-6xl mx-auto
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
        className="text-4xl md:text-5xl font-extrabold text-center my-14"
      >
        Meet Our Space Enthusiasts
      </motion.h1>

      {/* Coordinators */}
      <div className="flex items-center justify-center gap-4 mt-20 mb-10">
        <div
          className="h-px w-84 bg-gradient-to-r from-transparent via-blue-400 to-transparent
                  shadow-[0_0_10px_rgba(59,130,246,0.8)]"
        />

        <motion.h2
          variants={item}
          custom={reduced}
          className="text-3xl md:text-4xl font-bold text-white"
        >
          Coordinators
        </motion.h2>

        <div
          className="h-px w-84 bg-gradient-to-r from-transparent via-blue-400 to-transparent
                  shadow-[0_0_10px_rgba(59,130,246,0.8)]"
        />
      </div>
      <motion.div
        variants={container}
        custom={reduced}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-50 gap-y-10 justify-items-center"
      >
        {sortByImage(coordinators).map((member) => (
          <TeamCard key={member.id} member={member} />
        ))}
      </motion.div>

      {/* Core Team */}
      <div className="flex items-center justify-center gap-4 mt-20 mb-10">
        <div
          className="h-px w-84 bg-gradient-to-r from-transparent via-blue-400 to-transparent
                  shadow-[0_0_10px_rgba(59,130,246,0.8)]"
        />

        <motion.h2
          variants={item}
          custom={reduced}
          className="text-3xl md:text-4xl font-bold text-white"
        >
          Core Team
        </motion.h2>

        <div
          className="h-px w-84 bg-gradient-to-r from-transparent via-blue-400 to-transparent
                  shadow-[0_0_10px_rgba(59,130,246,0.8)]"
        />
      </div>

      <motion.div
        variants={container}
        custom={reduced}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-0 gap-y-10 justify-items-center"
      >
        {sortByImage(coreTeam).map((member) => (
          <CoreTeamCard key={member.id} member={member} />
        ))}
      </motion.div>

      {/* Faculty Advisor */}
      <div className="flex items-center justify-center gap-4 mt-20 mb-10">
        <div
          className="h-px w-84 bg-gradient-to-r from-transparent via-blue-400 to-transparent
                  shadow-[0_0_10px_rgba(59,130,246,0.8)]"
        />

        <motion.h2
          variants={item}
          custom={reduced}
          className="text-3xl md:text-4xl font-bold text-white"
        >
          Our Faculty Advisor
        </motion.h2>

        <div
          className="h-px w-84 bg-gradient-to-r from-transparent via-blue-400 to-transparent
                  shadow-[0_0_10px_rgba(59,130,246,0.8)]"
        />
      </div>

      <motion.div variants={item} custom={reduced}>
        <FacultyCoordinatorCard coordinator={Faculty} />
      </motion.div>

      {/* Team 2025-2026 */}
      <DropDown title="Team 2025-2026">
        <div className="flex items-center justify-center gap-4 mt-20 mb-10">
          <div className="h-px w-84 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_10px_rgba(59,130,246,0.8)]" />

          <motion.h2
            variants={item}
            custom={reduced}
            className="text-3xl md:text-4xl font-bold text-white"
          >
            Team 2025-2026
          </motion.h2>

          <div className="h-px w-84 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          custom={reduced}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-40 gap-y-10 justify-items-center"
        >
          {sortByImage(pastTeam2025_2026).map((member) => (
            <CoreTeamCard key={member.id} member={member} />
          ))}
        </motion.div>
      </DropDown>

      <TeamFooter links={socialLinks} />
    </motion.section>
  );
};

export default Team;
