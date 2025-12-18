import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import SpaceScene from "./components/SpaceScene";
import Website from "./components/Website";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Navbar from "./components/Navbar";
import PlaceholderPage from "./components/PlaceholderPage";

function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <Navbar />

      <div className="fixed inset-0 -z-10 bg-[var(--bg-dark)]">
        {/* FIXED 3D BACKGROUND */}
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <SpaceScene isHome={isHome} />
        </Canvas>
      </div>

      <Routes>
        <Route path="/" element={<Website />} />

        {/* Core Pages (Implemented) */}
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />

        {/* Project Routes */}
        <Route path="/projects" element={<PlaceholderPage title="All Projects" />} />
        <Route path="/projects/past" element={<PlaceholderPage title="Past Projects" />} />
        <Route path="/projects/ongoing" element={<PlaceholderPage title="Ongoing Projects" />} />
        <Route path="/projects/upcoming" element={<PlaceholderPage title="Upcoming Projects" />} />

        {/* Other Routes (Placeholders) */}
        <Route path="/about" element={<PlaceholderPage title="About Us" />} />
        <Route path="/team" element={<PlaceholderPage title="Team" />} />
        <Route path="/calendar" element={<PlaceholderPage title="Astronomy Calendar" />} />
        <Route path="/competitions" element={<PlaceholderPage title="Competitions" />} />

        {/* Fallback for sub-routes if needed */}
        <Route path="/events/*" element={<Events />} />
      </Routes>
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
