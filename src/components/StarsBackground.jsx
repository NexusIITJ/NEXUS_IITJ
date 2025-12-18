import { useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";

export default function StarsBackground({ texture }) {
    const mesh = useRef();
    const map = useLoader(THREE.TextureLoader, texture);
    const { camera } = useThree();

    // Improve texture quality
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 8;

    useFrame((state, delta) => {
        if (!mesh.current) return;

        mesh.current.position.copy(camera.position);

        mesh.current.rotation.y += delta * 0.005;
        mesh.current.rotation.x += delta * 0.001;
        // Animate texture offset for a drifting effect
        map.offset.x += delta * 0.00002;
        map.offset.y += delta * 0.00001;
        // Subtle pulsing opacity
        mesh.current.material.opacity =
            0.9 + Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    });

    return (
        <mesh ref={mesh}>
            <sphereGeometry args={[100, 64, 64]} />
            <meshBasicMaterial
                map={map}
                side={THREE.BackSide}
                toneMapped={false}
                transparent={true}
            />
        </mesh>
    );
}
