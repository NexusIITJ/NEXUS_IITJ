import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";

export default function Planet({ texture, index, x, y, r=2.5 }) {
  const mesh = useRef();
  const map = useLoader(THREE.TextureLoader, texture);
  const [zDistance,setZDistance]=useState(0);

  useFrame(({ camera }) => {
    const zDistance = camera.position.z - mesh.current.position.z;
    setZDistance(zDistance);

    const scale = THREE.MathUtils.clamp(
      1 - zDistance / 50,
      0,
      1
    );
    mesh.current.scale.setScalar(scale);

    mesh.current.material.opacity = scale;
    mesh.current.material.transparent = false;
    mesh.current.rotation.y += 0.002;
  });

  return (
    <mesh ref={mesh} position={[x+(x>0 ? zDistance/3 : -zDistance/3), y+(y>0 ? zDistance/15 : -zDistance/15), (index+1) * 8]}>
      <sphereGeometry args={[r, 64, 64]} />
      <meshStandardMaterial map={map} />
    </mesh>
  );
}
