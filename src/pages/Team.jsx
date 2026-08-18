import {
  motion,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { useState } from "react";

import {
  coordinators,
  coreTeam,
  Faculty,
  socialLinks,
  webTeam,
} from "../data/team";

import { pastTeam2025_2026 } from "../data/teamPast";

import TeamCard from "../components/Team/TeamCard";
import CoreTeamCard from "../components/Team/CoreTeamCard";
import FacultyCoordinatorCard from "../components/Team/FacultyCoordinatorCard";
import { sortByImage } from "../utils/imageUtils";
import TeamFooter from "../components/TeamFooter";

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
      : {
          type: "spring",
          stiffness: 60,
          damping: 14,
        },
  }),
};

/*
 * Sub-group heading
 * Used inside Team 2025-2026.
 * Same visual language as the main section headings,
 * but slightly more subtle.
 */
const SubGroupTitle = ({ children, reduced }) => (
  <motion.div
    initial={
      reduced
        ? { opacity: 0 }
        : {
            opacity: 0,
            y: 20,
          }
    }
    animate={{
      opacity: 1,
      y: 0,
    }}
    transition={
      reduced
        ? { duration: 0.2 }
        : {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }
    }
    className="
      flex
      items-center
      justify-center
      gap-4
      mt-16
      mb-10
    "
  >
    {/* Left glow line */}
    <div
      className="
        h-px
        w-32
        md:w-48
        bg-gradient-to-r
        from-transparent
        via-blue-400/60
        to-transparent
        shadow-[0_0_8px_rgba(59,130,246,0.45)]
      "
    />

    {/* Title */}
    <h3
      className="
        text-xl
        md:text-2xl
        font-semibold
        text-white
        whitespace-nowrap
      "
    >
      {children}
    </h3>

    {/* Right glow line */}
    <div
      className="
        h-px
        w-32
        md:w-48
        bg-gradient-to-r
        from-transparent
        via-blue-400/60
        to-transparent
        shadow-[0_0_8px_rgba(59,130,246,0.45)]
      "
    />
  </motion.div>
);

const Team = () => {
  const reduced = useReducedMotion();

  // Controls whether the historical team is rendered.
  const [showPastTeam, setShowPastTeam] = useState(false);

  /*
   * Group past team members by role.
   *
   * We keep the original data structure untouched and
   * derive the visual groups here.
   */

  const pastCoordinators = pastTeam2025_2026.filter(
    (member) => member.role === "Coordinator"
  );

  const pastCoreTeam = pastTeam2025_2026.filter(
    (member) =>
      member.role === "Core Member" ||
      member.role === "Core Team"
  );

  const pastWebTeam = pastTeam2025_2026.filter(
    (member) =>
      member.role === "Web Team" ||
      member.role === "UI/UX Developer" ||
      member.role === "Team Lead"
  );

  const togglePastTeam = () => {
    setShowPastTeam((prev) => !prev);
  };

  return (
    <motion.section
      className="
        min-h-screen
        px-6
        pb-20
        text-white
        max-w-6xl
        mx-auto
      "
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        margin: "-80px",
      }}
      custom={reduced}
    >
      {/* =====================================================
          MAIN TITLE
      ====================================================== */}

      <motion.h1
        variants={item}
        custom={reduced}
        className="
          text-4xl
          md:text-5xl
          font-extrabold
          text-center
          my-14
        "
      >
        Meet Our Space Enthusiasts
      </motion.h1>

      {/* =====================================================
          CURRENT TEAM - COORDINATORS
      ====================================================== */}

      <div className="flex items-center justify-center gap-4 mt-20 mb-10">
        <div
          className="
            h-px
            w-84
            bg-gradient-to-r
            from-transparent
            via-blue-400
            to-transparent
            shadow-[0_0_10px_rgba(59,130,246,0.8)]
          "
        />

        <motion.h2
          variants={item}
          custom={reduced}
          className="
            text-3xl
            md:text-4xl
            font-bold
            text-white
            whitespace-nowrap
          "
        >
          Coordinators
        </motion.h2>

        <div
          className="
            h-px
            w-84
            bg-gradient-to-r
            from-transparent
            via-blue-400
            to-transparent
            shadow-[0_0_10px_rgba(59,130,246,0.8)]
          "
        />
      </div>

      <motion.div
        variants={container}
        custom={reduced}
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          gap-x-0
          gap-y-10
          justify-items-center
        "
      >
        {coordinators.map((member) => (
          <TeamCard
            key={member.id}
            member={member}
          />
        ))}
      </motion.div>

      {/* =====================================================
          CURRENT TEAM - CORE TEAM
      ====================================================== */}

      <div className="flex items-center justify-center gap-4 mt-20 mb-10">
        <div
          className="
            h-px
            w-84
            bg-gradient-to-r
            from-transparent
            via-blue-400
            to-transparent
            shadow-[0_0_10px_rgba(59,130,246,0.8)]
          "
        />

        <motion.h2
          variants={item}
          custom={reduced}
          className="
            text-3xl
            md:text-4xl
            font-bold
            text-white
            whitespace-nowrap
          "
        >
          Core Team
        </motion.h2>

        <div
          className="
            h-px
            w-84
            bg-gradient-to-r
            from-transparent
            via-blue-400
            to-transparent
            shadow-[0_0_10px_rgba(59,130,246,0.8)]
          "
        />
      </div>

      <motion.div
        variants={container}
        custom={reduced}
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          gap-x-0
          gap-y-10
          justify-items-center
        "
      >
        {sortByImage(coreTeam).map((member) => (
          <CoreTeamCard
            key={member.id}
            member={member}
          />
        ))}
      </motion.div>

      {/* =====================================================
          FACULTY ADVISOR
      ====================================================== */}

      <div className="flex items-center justify-center gap-4 mt-20 mb-10">
        <div
          className="
            h-px
            w-84
            bg-gradient-to-r
            from-transparent
            via-blue-400
            to-transparent
            shadow-[0_0_10px_rgba(59,130,246,0.8)]
          "
        />

        <motion.h2
          variants={item}
          custom={reduced}
          className="
            text-3xl
            md:text-4xl
            font-bold
            text-white
            whitespace-nowrap
          "
        >
          Our Faculty Advisor
        </motion.h2>

        <div
          className="
            h-px
            w-84
            bg-gradient-to-r
            from-transparent
            via-blue-400
            to-transparent
            shadow-[0_0_10px_rgba(59,130,246,0.8)]
          "
        />
      </div>

      <motion.div
        variants={item}
        custom={reduced}
      >
        <FacultyCoordinatorCard
          coordinator={Faculty}
        />
      </motion.div>

      {/* =====================================================
          PAST TEAM TOGGLE
      ====================================================== */}

      <motion.button
        type="button"
        variants={item}
        custom={reduced}
        onClick={togglePastTeam}
        aria-expanded={showPastTeam}
        aria-controls="past-team-content"
        className="
          group
          w-full
          mt-24
          mb-8
          flex
          items-center
          justify-center
          gap-4
          cursor-pointer
          outline-none
        "
      >
        {/* Left glow line */}
        <div
          className="
            h-px
            flex-1
            max-w-84
            bg-gradient-to-r
            from-transparent
            via-blue-400
            to-transparent
            shadow-[0_0_10px_rgba(59,130,246,0.7)]
            transition-all
            duration-500
            group-hover:shadow-[0_0_16px_rgba(59,130,246,0.9)]
          "
        />

        {/* Title + Arrow */}
        <div className="flex items-center gap-3">
          <h2
            className="
              text-3xl
              md:text-4xl
              font-bold
              text-white
              whitespace-nowrap
              transition-colors
              duration-300
              group-hover:text-blue-100
            "
          >
            Team 2025-2026
          </h2>

          {/* Animated arrow */}
          <motion.span
            animate={{
              rotate: showPastTeam ? 180 : 0,
            }}
            transition={{
              duration: reduced ? 0 : 0.3,
            }}
            className="
              text-2xl
              text-blue-300
              leading-none
            "
          >
            ↓
          </motion.span>
        </div>

        {/* Right glow line */}
        <div
          className="
            h-px
            flex-1
            max-w-84
            bg-gradient-to-r
            from-transparent
            via-blue-400
            to-transparent
            shadow-[0_0_10px_rgba(59,130,246,0.7)]
            transition-all
            duration-500
            group-hover:shadow-[0_0_16px_rgba(59,130,246,0.9)]
          "
        />
      </motion.button>

      {/* =====================================================
          PAST TEAM HINT
      ====================================================== */}

      <motion.button
        type="button"
        variants={item}
        custom={reduced}
        onClick={togglePastTeam}
        className="
          block
          mx-auto
          text-sm
          text-gray-500
          hover:text-gray-300
          transition-colors
          duration-300
          cursor-pointer
          mb-6
        "
      >
        {showPastTeam
          ? "Click to hide the 2025–2026 team"
          : "Click to view the 2025–2026 team"}
      </motion.button>

      {/* =====================================================
          PAST TEAM CONTENT
          
          IMPORTANT:
          This entire section is conditionally rendered.
          CoreTeamCard components do NOT exist in the DOM
          until the user opens this section.
      ====================================================== */}

      <AnimatePresence initial={false}>
        {showPastTeam && (
          <motion.div
            id="past-team-content"
            key="past-team"
            variants={container}
            initial={
              reduced
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    height: 0,
                    y: -20,
                  }
            }
            animate={
              reduced
                ? { opacity: 1 }
                : {
                    opacity: 1,
                    height: "auto",
                    y: 0,
                  }
            }
            exit={
              reduced
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    height: 0,
                    y: -20,
                  }
            }
            transition={
              reduced
                ? { duration: 0.2 }
                : {
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }
            }
            className="overflow-hidden"
          >
            {/* =================================================
                PAST TEAM - COORDINATORS
            ================================================== */}

            {pastCoordinators.length > 0 && (
              <>
                <SubGroupTitle reduced={reduced}>
                  Coordinators
                </SubGroupTitle>

                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="visible"
                  custom={reduced}
                  className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    gap-x-0
                    gap-y-10
                    justify-items-center
                  "
                >
                  {sortByImage(pastCoordinators).map(
                    (member) => (
                      <CoreTeamCard
                        key={member.id}
                        member={member}
                      />
                    )
                  )}
                </motion.div>
              </>
            )}

            {/* =================================================
                PAST TEAM - CORE TEAM
            ================================================== */}

            {pastCoreTeam.length > 0 && (
              <>
                <SubGroupTitle reduced={reduced}>
                  Core Team
                </SubGroupTitle>

                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="visible"
                  custom={reduced}
                  className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    gap-x-0
                    gap-y-10
                    justify-items-center
                  "
                >
                  {sortByImage(pastCoreTeam).map(
                    (member) => (
                      <CoreTeamCard
                        key={member.id}
                        member={member}
                      />
                    )
                  )}
                </motion.div>
              </>
            )}

            {/* =================================================
                PAST TEAM - WEB TEAM
            ================================================== */}

            {pastWebTeam.length > 0 && (
              <>
                <SubGroupTitle reduced={reduced}>
                  Web Team
                </SubGroupTitle>

                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="visible"
                  custom={reduced}
                  className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    gap-x-0
                    gap-y-10
                    justify-items-center
                  "
                >
                  {sortByImage(pastWebTeam).map(
                    (member) => (
                      <CoreTeamCard
                        key={member.id}
                        member={member}
                      />
                    )
                  )}
                </motion.div>
              </>
            )}

            {/* Bottom spacing */}
            <div className="h-8" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          TEAM FOOTER
      ====================================================== */}

      <TeamFooter links={socialLinks} />
    </motion.section>
  );
};

export default Team;