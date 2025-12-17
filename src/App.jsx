import { Canvas } from "@react-three/fiber";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import SpaceScene from "./components/SpaceScene";
import Website from "./components/Website";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";

function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-gradient-to-b from-[var(--bg-dark)] to-transparent pointer-events-none">
        <Link to="/" className="text-2xl font-bold text-white pointer-events-auto hover:text-[var(--accent-blue)] transition-colors">NEXUS</Link>
        <div className="flex gap-6 pointer-events-auto">
          <Link to="/" className="text-[var(--text-gray)] hover:text-white transition-colors">Home</Link>
          <Link to="/events" className="text-[var(--text-gray)] hover:text-white transition-colors">Events</Link>
          <Link to="/gallery" className="text-[var(--text-gray)] hover:text-white transition-colors">Gallery</Link>
        </div>
      </nav>

      <div className="fixed inset-0 -z-10 bg-[var(--bg-dark)]">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <SpaceScene isHome={isHome} />
        </Canvas>
      </div>

      <Routes>
        <Route path="/" element={<Website />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
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
