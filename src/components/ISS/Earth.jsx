import { useLoader, useFrame } from "@react-three/fiber"
import { TextureLoader } from "three"
import { useRef } from "react"

export default function Earth() {
  const earthRef = useRef()
  const texture = useLoader(
    TextureLoader,
    "/textures/earth_daymap.jpg"
  )

  useFrame(() => {
    earthRef.current.rotation.y += 0.0008
  })

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}
