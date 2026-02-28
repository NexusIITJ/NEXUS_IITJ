import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { lazy, Suspense, useState, useEffect, useMemo } from "react"; 
import { Canvas } from "@react-three/fiber";
import SpaceScene from "./components/SpaceScene";
import { shouldRender3D } from "./utils/webglDetection";


const Home = lazy(() => import("./pages/Home"));
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
const Contact = lazy(() => import("./pages/Contact"));


const generateSpace = (count) => {
  let value = '';
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 100);
    const y = Math.floor(Math.random() * 100);
    value += `${x}vw ${y}vh #FFF${i < count - 1 ? ',' : ''}`;
  }
  return value;
};

function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [use3D, setUse3D] = useState(false);

  useEffect(() => {
   
    const check3D = () => setUse3D(shouldRender3D());
    check3D();

    window.addEventListener('resize', check3D);
    return () => window.removeEventListener('resize', check3D);
  }, []);


  const smallStars = useMemo(() => generateSpace(1200), []);
  const mediumStars = useMemo(() => generateSpace(100), []);
  const largeStars = useMemo(() => generateSpace(25), []);

  return (
    <>
      <div className="fixed inset-0 -z-10 bg-black overflow-hidden">
      
        <div className="absolute inset-0">
            <div 
              
              className="absolute w-[1px] h-[1px] rounded-full bg-transparent animate-pulse"
              style={{ boxShadow: smallStars, animationDuration: '4s' }} 
            />
            <div 
            
              className="absolute w-[2px] h-[2px] rounded-full bg-transparent animate-pulse"
              style={{ boxShadow: mediumStars, animationDuration: '3s', opacity: 0.8 }} 
            />
            <div 
   
              className="absolute w-[3px] h-[3px] rounded-full bg-transparent animate-pulse"
              style={{ boxShadow: largeStars, animationDuration: '1.5s', opacity: 0.6 }} 
            />
        </div>

        {/*  Rotating Disc (The Sky) */}
     
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <img
            src="/textures/stars3.webp"
            alt="Voyager Golden Disc"
            className="w-[100vmin] h-[100vmin] animate-spin-slow opacity-60"
          />
          {/* <div className="absolute inset-0 bg-black/40"></div> */}
        </div>

       
        {use3D && (
          <div className="absolute inset-0 z-30">
            <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
              <Suspense fallback={null}>
                <SpaceScene isHome={isHome} />
              </Suspense>
            </Canvas>
          </div>
        )}
      </div>

      <Suspense fallback={null}>
        <Navbar use3D={use3D} setUse3D={setUse3D} />
      </Suspense>

      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen text-teal-700 text-2xl">
            From Earth to eternity: Voyager’s Golden Record…
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
          {/* <Route path="/ISSTracker" element={<ISSTracker/>} /> */}
          <Route path="/NASAEyes" element={<NASAEyes/>} />
          <Route path="/Contact" element={<Contact/>} />
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