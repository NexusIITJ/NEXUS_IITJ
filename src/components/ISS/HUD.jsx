import { useISS } from "./ISSContext"

export default function HUD() {
  const iss = useISS()
  if (!iss) return null

  const alt = (iss.alt)
  const vel = (iss.vel)
  const lat = (iss.lat)
  const lng = (iss.lng)

  return (
    <div className="pointer-events-none absolute inset-0 text-white font-mono">
      <div className="
        absolute left-1/6 bottom-1/8
        backdrop-blur-md bg-white/5
        border border-cyan-400/30
        rounded-xl px-4 py-3
        text-xs sm:text-sm
        space-y-1
        drop-shadow-[0_0_12px_rgba(0,255,255,0.35)]
      ">
        <div className="text-cyan-400 font-bold text-sm mb-1">
          ISS LIVE
        </div>

        <Stat label="ALT" value={`${alt.toFixed(1)} km`} />
        <Stat label="VEL" value={`${vel.toFixed(0)} km/h`} />
        <Stat label="LAT" value={`${lat.toFixed(2)}°`} />
        <Stat label="LNG" value={`${lng.toFixed(2)}°`} />
      </div>

    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-cyan-400">{label}</span>
      <span>{value}</span>
    </div>
  )
}
