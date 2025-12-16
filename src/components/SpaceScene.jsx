import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import Planet from "./Planet";
import { planets } from "../data/planets";
import StarsBackground from "./StarsBackground";
import Sun from "./Sun";
import stars from "/textures/stars.jpg";
import stars2 from "/textures/stars2.jpg";
import stars3 from "/textures/stars3.jpg";
import sun from "/textures/sun.jpg";
import { MathUtils } from "three";
import * as THREE from "three";

export default function SpaceScene() {
  const { camera } = useThree();
  const [scrollT, setScrollT] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const maxScroll =
        document.body.scrollHeight - window.innerHeight+100;

      setScrollT(
        maxScroll > 0 ? window.scrollY / maxScroll : 0
      );
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame(() => {
    const TOTAL_DISTANCE = 8 * (planets.length - 1);
    const targetZ = scrollT * TOTAL_DISTANCE +15;

    camera.position.z = MathUtils.lerp(
      camera.position.z,
      targetZ,
      0.08
    );

    camera.lookAt(0, 0, camera.position.z - 1);
  });

  // const { scene } = useThree();

  // useEffect(() => {
  //   const loader = new THREE.TextureLoader();
  //   loader.load(stars3, (texture) => {
  //     texture.colorSpace = THREE.SRGBColorSpace;
  //     scene.background = texture;
  //   });
  // }, [scene]);

  return (
    <>
      <StarsBackground texture={stars} />

      <Sun texture={sun} />

      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} />

      {planets.map((planet, i) => (
        <Planet
          key={i}
          index={i}
          texture={planet.texture}
          ringTexture={planet.ringTexture}
          hasRings={planet.hasRings}
          x={planet.x}
          y={planet.y}
          r={planet.r}
        />
      ))}
    </>
  );
}
