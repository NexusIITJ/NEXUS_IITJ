import EarthScene from "../components/ISS/EarthScene"
import HUD from "../components/ISS/HUD"
import { ISSProvider } from "../components/ISS/ISSContext"

export default function ISSTracker() {
  return (
    <ISSProvider>
      <div className="relative h-screen w-screen bg-black overflow-hidden">
        <EarthScene />
        <HUD />
      </div>
    </ISSProvider>
  )
}