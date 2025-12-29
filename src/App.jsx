import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import SpaceScene from "./components/SpaceScene";
const Website = lazy(() => import("./components/Website"));
const Navbar = lazy(() => import("./components/Navbar"));
const PlaceholderPage = lazy(() => import("./components/PlaceholderPage"));
const Events = lazy(() => import("./pages/Events"));
const Gallery = lazy(() => import("./pages/Gallery"));
const About = lazy(() => import("./pages/About"));
const Team = lazy(() => import("./pages/Team"));
const CalendarPage = lazy(() => import("./pages/CalendarPage"));

function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <div className="fixed inset-0 -z-10">
        <div
          className="
            absolute inset-0
            bg-cover bg-center
            bg-no-repeat
          "
          style={{
            backgroundImage: "url(/textures/stars3.jpg)",
          }}
        />

        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <Suspense fallback={null}>
            <SpaceScene isHome={isHome} />
          </Suspense>
        </Canvas>
      </div>

      <Suspense fallback={null}>
        <Navbar />
      </Suspense>

      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen text-white">
            Loading…
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Website />} />
          <Route path="/projects" element={<PlaceholderPage title="Projects" />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />

          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/competitions" element={<PlaceholderPage title="Competitions" />} />
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
