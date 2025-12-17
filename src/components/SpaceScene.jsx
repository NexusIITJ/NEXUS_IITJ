import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import Planet from "./Planet";
import { planets } from "../data/planets";
import StarsBackground from "./StarsBackground";
import Sun from "./Sun";
import sun from "/textures/sun.jpg";
import { MathUtils } from "three";

export default function SpaceScene({ isHome }) {
    const { camera } = useThree();
    const [scrollT, setScrollT] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const maxScroll =
                document.body.scrollHeight - window.innerHeight + 100;

            setScrollT(
                maxScroll > 0 ? window.scrollY / maxScroll : 0
            );
        };

        window.addEventListener("scroll", onScroll);
        onScroll();

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (!isHome) {
            camera.position.set(0, 0, 8);
            camera.lookAt(0, 0, 0);
        }
    }, [isHome, camera]);

    useFrame(() => {
        if (!isHome) return;

        const TOTAL_DISTANCE = 8 * (planets.length - 1);
        const targetZ = scrollT * TOTAL_DISTANCE + 15;

        camera.position.z = MathUtils.lerp(
            camera.position.z,
            targetZ,
            0.08
        );

        camera.lookAt(0, 0, camera.position.z - 1);
    });

    return (
        <>
            <StarsBackground />

            {isHome && (
                <>
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
            )}
        </>
    );
}
