export default function NASAEyes() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black">
      <div className="w-full max-w-6xl aspect-video border border-white/10 rounded-xl overflow-hidden">
        <iframe
          src="https://eyes.nasa.gov/apps/solar-system/#/?embed=true"
          title="NASA Eyes Solar System"
          className="w-full h-full"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
}