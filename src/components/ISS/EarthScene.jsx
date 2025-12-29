import { Canvas } from "@react-three/fiber"
import { Stars, OrbitControls } from "@react-three/drei"
import Earth from "./Earth"
import ISS from "./ISS"
import EarthAtmosphere from "./EarthAtmosphere"

export default function EarthScene() {
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.2} />
            <directionalLight position={[5, 3, 5]} intensity={1} />

            <Stars radius={300} depth={60} count={20000} factor={7} />

            <Earth />
            <EarthAtmosphere />
            <ISS />

            <OrbitControls enablePan={false} />
        </Canvas>
    )
}
