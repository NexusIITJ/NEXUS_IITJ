import { coordinators, coreTeam } from "../data/team";
import TeamCard from "../components/Team/TeamCard";

const Team = () => {
  return (
    <section className="min-h-screen px-6 py-20 text-white max-w-6xl mx-auto">

      {/* Title */}
      <h1 className="text-4xl font-bold text-center mb-12">
        Meet Our Team
      </h1>

      {/* Coordinators + Featured team */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {coordinators.map((member) => (
          <TeamCard key={member.id} member={member} />
        ))}
      </div>

      {/* Core Team */}
      <h2 className="text-3xl font-bold text-center mt-16 mb-10">
        Core Team
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {coreTeam.map((name, index) => (
          <div
            key={index}
            className="rounded-xl px-4 py-3 text-center bg-gradient-to-r from-blue-700 to-cyan-400 text-white font-medium"
          >
            {name}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
