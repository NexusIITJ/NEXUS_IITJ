export const projects = [
  {
    id: 1,
    title: "DebriSolver Competition",
    description: "Developed a Space Traffic Management system to predict collision risks for over 574,000 orbital objects. The solution features a dual-inference AI model combining PyTorch (FT-Transformer) and XGBoost/LightGBM, which achieved 1.0 precision on safety constraints through Optuna optimization. The system includes a scalable data pipeline and an interactive Streamlit dashboard.",
    image: "https://drive.google.com/file/d/1gFFcHPrONrNL9-DM7P-SFYCr6IC4WORx/view?usp=sharing",
    category: "AI & Space Tech",
    status: "Finalist",
    team: ["Shiv Jee Yadav", "Electronics Club"],
    date: "Oct 2025 - Jan 2026",
    technologies: ["PyTorch", "XGBoost", "LightGBM", "Optuna", "Streamlit", "Python", "SciPy"],
    links: {
      github: "https://github.com/NexusIITJ/Space_Traffic_Management_LEO_Orbit_XGBoost_LightGBM_FT-Transformer",
      documentation: "https://docs.google.com/document/d/1eAK1UUaP1YGiKEUos7zU81L_ALjUYWZn/edit?usp=sharing&ouid=115143563541440307530&rtpof=true&sd=true"
    }
  },
  {
    id: 2,
    title: "Exoplanet Detection Analysis",
    description: "Analyzing light curves from TESS data to identify potential exoplanets using transit photometry and machine learning algorithms.",
    image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800",
    category: "Research",
    status: "ongoing",
    team: ["Data Science Team"],
    date: "2024 - Present",
    technologies: ["Python", "TensorFlow", "Astropy"],
    links: {
      github: "#",
      paper: "#"
    }
  },
  {
    id: 3,
    title: "Rocket Propulsion Lab",
    description: "Designing and testing hybrid rocket engines for potential sounding rocket launches. Focus on fuel efficiency and thrust optimization.",
    image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=800",
    category: "Rocketry",
    status: "ongoing",
    team: ["Propulsion Team"],
    date: "2025 - Present",
    technologies: ["CFD Analysis", "CAD Design", "Combustion Testing"],
    links: {
      documentation: "#"
    }
  },
  {
    id: 4,
    title: "Deep Sky Astrophotography",
    description: "Capturing stunning images of nebulae, galaxies, and star clusters using our 8-inch telescope and CCD camera setup.",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800",
    category: "Observation",
    status: "ongoing",
    team: ["Imaging Team"],
    date: "2023 - Present",
    technologies: ["Astrophotography", "Image Stacking", "PixInsight"],
    links: {
      gallery: "/gallery"
    }
  },
  {
    id: 5,
    title: "Meteor Observation Network",
    description: "Established a network of cameras to track and analyze meteor trajectories, contributing to global meteor databases.",
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800",
    category: "Observation",
    status: "completed",
    team: ["Observation Team"],
    date: "2023 - 2024",
    technologies: ["Computer Vision", "Trajectory Analysis"],
    links: {
      documentation: "#"
    }
  },
  {
    id: 6,
    title: "Solar Activity Monitoring",
    description: "Daily monitoring and documentation of sunspots, solar flares, and coronal mass ejections to study solar cycles.",
    image: "https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=800",
    category: "Research",
    status: "ongoing",
    team: ["Solar Team"],
    date: "2024 - Present",
    technologies: ["H-alpha Telescopes", "Time-series Analysis"],
    links: {
      documentation: "#"
    }
  },
  {
    id: 7,
    title: "Satellite Tracking System",
    description: "Real-time tracking and visualization of satellites including ISS, communication satellites, and space debris.",
    image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800",
    category: "Software",
    status: "completed",
    team: ["Development Team"],
    date: "2024",
    technologies: ["React", "Three.js", "TLE Data"],
    links: {
      github: "#",
      live: "/ISSTracker"
    }
  },
  {
    id: 8,
    title: "Astronomy Event Predictor",
    description: "Web application providing accurate predictions of celestial events including eclipses, planetary alignments, and meteor showers.",
    image: "https://images.unsplash.com/photo-1534996858221-380b92700493?w=800",
    category: "Software",
    status: "completed",
    team: ["Development Team"],
    date: "2024",
    technologies: ["React", "USNO API", "NASA APIs"],
    links: {
      github: "#",
      live: "/calendar"
    }
  }
];

export const categories = ["All", "Research", "Instrumentation", "Rocketry", "Observation", "Software"];

export const categoryStyles = {
  Astrophysics: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Rocketry: "bg-red-500/20 text-red-400 border-red-500/30",
  Instrumentation: "bg-green-500/20 text-green-400 border-green-500/30",
  Software: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};
