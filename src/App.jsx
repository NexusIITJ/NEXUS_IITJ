import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { lazy, Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import SpaceScene from "./components/SpaceScene";
import { shouldRender3D } from "./utils/webglDetection";
const Home = lazy(() => import("./pages/Home"));
// const Website = lazy(() => import("./components/Website"));
const Navbar = lazy(() => import("./components/Navbar"));
const PlaceholderPage = lazy(() => import("./components/PlaceholderPage"));
const Events = lazy(() => import("./pages/Events"));
const Gallery = lazy(() => import("./pages/Gallery"));
const About = lazy(() => import("./pages/About"));
const Team = lazy(() => import("./pages/Team"));
const CalendarPage = lazy(() => import("./pages/CalendarPage"));
const ISSTracker = lazy(() => import("./pages/ISSTracker"));
const NASAEyes = lazy(() => import("./pages/NASAEyes"));
const Projects = lazy(() => import("./pages/Projects"));

function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [use3D, setUse3D] = useState(false);

  useEffect(() => {
    // Check if 3D should be rendered on mount and window resize
    const check3D = () => setUse3D(shouldRender3D());
    check3D();

    window.addEventListener('resize', check3D);
    return () => window.removeEventListener('resize', check3D);
  }, []);

  return (
    <>
      <div className="fixed inset-0 -z-10">
        {/* Fallback static background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/textures/stars3.jpg)",
          }}
        />

        {/* 3D Canvas - only render if WebGL available and not mobile */}
        {use3D && (
          <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
            <Suspense fallback={null}>
              <SpaceScene isHome={isHome} />
            </Suspense>
          </Canvas>
        )}
      </div>

      <Suspense fallback={null}>
        <Navbar use3D={use3D} setUse3D={setUse3D} />
      </Suspense>

      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen text-white">
            Loading…
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />

          <Route path="/about" element={<About />} />
          {/* <Route path="/team" element={<Team />} /> */}
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/ISSTracker" element={<ISSTracker/>} />
          <Route path="/NASAEyes" element={<NASAEyes/>} />
        </Routes>
      </Suspense>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
