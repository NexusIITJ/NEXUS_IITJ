import MercurySection from "./sections/MercurySection";
import VenusSection from "./sections/VenusSection";
import EarthSection from "./sections/EarthSection";
import MarsSection from "./sections/MarsSection";
import JupiterSection from "./sections/JupiterSection";
import SaturnSection from "./sections/SaturnSection";
import UranusSection from "./sections/UranusSection";
import NeptuneSection from "./sections/NeptuneSection";
import Playground from "./sections/Playground";

export default function Website() {
  return (
    <main className="relative z-10 text-white bg-transparent">
      <MercurySection />
      <VenusSection />
      <EarthSection />
      <MarsSection />
      <JupiterSection />
      <SaturnSection />
      <UranusSection />
      <NeptuneSection />
      <Playground />
    </main>
  );
}
