import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function EarthAtmosphere() {
  const meshRef = useRef()

  useFrame(() => {
    meshRef.current.rotation.y += 0.0006
  })

  return (
    <mesh ref={meshRef} scale={[1.03, 1.03, 1.03]}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <shaderMaterial
        transparent
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
        uniforms={{
          glowColor: { value: new THREE.Color(0x00b3ff) },
          intensity: { value: 1.2 },
        }}
        vertexShader={`
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 glowColor;
          uniform float intensity;
          varying vec3 vNormal;

          void main() {
            float glow = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            gl_FragColor = vec4(glowColor, glow * intensity);
          }
        `}
      />
    </mesh>
  )
}
