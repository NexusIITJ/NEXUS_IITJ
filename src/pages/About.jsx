import { aboutData } from "../data/about";

const About = () => {
  return (
    <section className="min-h-screen px-6 py-20 text-white max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">
        About Us
      </h1>

      <p className="text-gray-300 text-lg leading-relaxed text-center mb-10">
        {aboutData.description}
      </p>

      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Our Vision
        </h2>
        <p className="text-gray-300 text-center">
          {aboutData.vision}
        </p>
      </div>

      <h2 className="text-2xl font-semibold mb-6 text-center">
        What We Do
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {aboutData.highlights.map((item, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:scale-105 transition"
          >
            <p className="text-lg">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
