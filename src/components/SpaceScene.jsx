import StarsBackground from "./StarsBackground";
// import Sun from "./Sun"; // Uncomment if Sun should be restored
// import Planet from "./Planet"; // Reference for future restoration

export default function SpaceScene({ isHome }) {
    return (
        <>
            <StarsBackground />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
        </>
    );
}
