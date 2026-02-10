export const projects = [
  {
    id: 1,
    title: "DebriSolver Competition",
    description: "Developed a Space Traffic Management system to predict collision risks for over 574,000 orbital objects. The solution features a dual-inference AI model combining PyTorch (FT-Transformer) and XGBoost/LightGBM, which achieved 1.0 precision on safety constraints through Optuna optimization. The system includes a scalable data pipeline and an interactive Streamlit dashboard.",
    image: "https://drive.google.com/file/d/1gFFcHPrONrNL9-DM7P-SFYCr6IC4WORx/view?usp=sharing",
    category: "International Competition",
    status: "Completed",
    team: ["Shiv Jee Yadav", "Princy","Chittanoor Sri Raghava","Pratham Karmakar"],
    date: "Sep 2025 - Jan 2026",
    technologies: ["PyTorch", "XGBoost", "LightGBM", "Optuna", "Streamlit", "Python", "SciPy"],
    links: {
      github: "https://github.com/NexusIITJ/Space_Traffic_Management_LEO_Orbit_XGBoost_LightGBM_FT-Transformer",
      documentation: "https://docs.google.com/document/d/1eAK1UUaP1YGiKEUos7zU81L_ALjUYWZn/edit?usp=sharing&ouid=115143563541440307530&rtpof=true&sd=true"
    }
  },
  {
    id: 2,
    title: "CANSAT'25 by IN-SPACe",
    description: "CANSAT by In-SPace is an educational initiative that challenges students to design, build, and operate miniature satellites to simulate real-world space missions. Our team built a CanSAT entirely from scratch, covering all domains including mechanical design, electronics, software, and payload integration. We successfully completed the Preliminary Design Review (PDR) and Critical Design Review (CDR), demonstrating our technical expertise and project management skills. Through dedication and innovation, we advanced to the finals, showcasing our ability to deliver a fully functional satellite system that met mission requirements and inspired future exploration.",
    image: "https://drive.google.com/file/d/15gy6eDFG6_oDD6h_no5JvJCtB9nDt-dF/view?usp=sharing",
    category: "National Competition",
    status: "Completed",
    team: ["Iha Goyal","Abhiroop Bhavsar","Arafat Ahmad Sheikh","Himay Patel","Nisarg Upaddhay","Om Kumar","Pujari Mayuri Rajesh","Shiv Jee Yadav","Tanmay Daga"],
    date: "July 2024 - Oct 2025",
    technologies: ["Mechanical & Structural Design","Avionics & Sensors","Communication Systems","Onboard Computing & Software" ,"Power Systems","Recovery" ,"Payload"],
    links: {
      // github: "#",
      // paper: "#"
    }
  },
  {
    id: 3,
    title: "CANSAT'24 by IN-SPACe",
    description: "CANSAT by In-SPace is an educational initiative that challenges students to design, build, and operate miniature satellites to simulate real-world space missions. Our team built a CanSAT entirely from scratch, covering all domains including mechanical design, electronics, software, and payload integration. We successfully completed the Preliminary Design Review (PDR) and Critical Design Review (CDR), demonstrating our technical expertise and project management skills. Through dedication and innovation, we advanced to the finals, showcasing our ability to deliver a fully functional satellite system that met mission requirements and inspired future exploration.",
    image: "https://drive.google.com/file/d/15gy6eDFG6_oDD6h_no5JvJCtB9nDt-dF/view?usp=sharing",
    category: "National Competition",
    status: "Completed",
    team: ["Somshuvra Basu","Pechetti Akhil","Lokesh Tanwar","Tale Sai Saathwik","Shubham Mishra","Sarvesh Baheti","Anupama Birman","Hrishikesh Makwana"],
    date: "July 2023 - Oct 2024",
    technologies: ["Mechanical & Structural Design","Avionics & Sensors","Communication Systems","Onboard Computing & Software" ,"Power Systems","Recovery" ,"Payload"],
    links: {
      // github: "#",
      // paper: "#"
    }
  },
  {
  id: 5,
  title: "Model Rocketry By IN-SPACe",
  description: "Model rocketry stands out as a unique educational and engineering pursuit because it transforms core principles of physics, chemistry, and aerodynamics into real-world flight. Our team designed, built, and launched rockets from scratch under the IN-SPACe CanSat and Model Rocketry initiative, mastering propulsion, stability, and recovery systems. By completing PDR and CDR phases and advancing to the finals, we demonstrated how model rocketry bridges classroom theory with practical aerospace innovation.",
  image: "https://drive.google.com/file/d/1bHt_IruP0ia-dagNTHxu9jPV4z0Wn0xa/view?usp=sharing",
  category: "National Competition",
  status: "Completed",
  team: ["Somshuvra Basu","Lokesh Tanwar","Vinay Tailor","Shubham Mishra","Vikash Kumar","Aaditya Kamble","Shubham Tamboli","Raghav Maliwal"],
  date: "July 2024 - Mar 2025",
  technologies: [ "Aerodynamics & Aviation Systems", "Propulsion Technologies", "Avionics & Control Systems", "Structural & Materials Engineering", "Recovery Mechanisms", "Systems Integration" ],
  links: {
      // github: "#",
      // paper: "#"
  }
}
,
  {
    id: 6,
    title: "Hunting for Exoplanets Using AI",
    description: "In the NASA Space Apps Challenge, we tackled the problem of detecting exoplanets from Kepler Space Telescope light curves. We engineered features using Gaussian filtering for signal smoothing, FFT for frequency-domain analysis, and SMOTE for dataset balancing. A bidirectional LSTM network was implemented for time-series classification and compared against a support vector classifier. The deep-learning model significantly outperformed the baseline, demonstrating a scalable approach for future exoplanet discovery from large datasets.",
    image: "https://drive.google.com/file/d/19pQJ4NjlUqbiAR_lq4wG8HSuvpbrpq_7/view?usp=sharing",
    category: "International Competition",
    status: "completed",
    team: ["Prushti Thumar","Prerna Chauhan","Adityaraj Bhure",],
    date: "Sep 2025 - Dec 2026",
    technologies: ["Gaussian Filtering", "FFT", "SMOTE", "Bidirectional LSTM", "Support Vector Classifier"],
    links: {
      // documentation: "#"
    }
  },
  {
    id: 7,
    title: "Direct Georeferencing of CanSat Aerial Imagery",
    description: "The team demonstrated that a compact CanSat called NexSat can produce accurately georeferenced aerial imagery without ground control points by integrating MEMS inertial sensors, a multi‑constellation GNSS receiver, and a calibrated OV2640 camera driven by an ESP32 to generate orthorectified mosaics and quantify performance with pixel‑level error metrics; NexSat flew a controlled descent using a dual‑parachute system and passive spring‑based fins to stabilize roll and maintain predictable imaging geometry, while GNSS timestamps synchronized to launchpad time and Madgwick‑filtered IMU quaternions provided time‑aligned position and attitude for each exposure. The processing chain corrected payload mounting offsets, converted coordinates from payload → NED → ECEF → geodetic frames, and used a photogrammetric collinearity model to form camera look vectors that were intersected with the WGS84 ellipsoid and then refined with a local DEM via ray tracing to produce per‑frame ground footprints and orthorectified frames. Hardware and calibration steps included multi‑constellation GNSS, a pressure altimeter for cross‑checks, PRNU/DSNU corrections using dark frames and flat fields, and an OV2640 sensor (1280×1024, 3.6 mm focal length, 66° FOV); results showed combined RMS georeferencing errors on the order of tens of pixels, with primary error sources traced to residual mechanical misalignments and timing/fusion inconsistencies, and recommended mitigations include tighter mechanical alignment, improved time synchronization, and more robust sensor‑fusion algorithms, enabling rapid, low‑cost localized mapping for environmental monitoring, disaster response, ISR, and potential adaptation to descent imagers or impact probes for planetary missions.",
    image: "https://drive.google.com/file/d/1jOXNLvA_kCb83BVqhgttTeBnKNHeRaxD/view?usp=sharing",
    category: "Research",
    status: "Completed",
    team: ["","Somshuvra Basu","Radha Krishna Kavuluru"],
    date: "Aug 2024 - May 2025",
    technologies: ["MEMS IMU (quaternions)", "Multi-constellation GNSS (GPS/GLONASS/BDS/Galileo)", "OV2640 image sensor", "ESP32 SoC", "Madgwick sensor-fusion filter", "Photogrammetric collinearity model", "Ray-tracing with DEM", "pymap3d"],
    links: {
      documentation: "https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=10983993"
    }
  }

];

export const categories = ["All","National Competition","International Competition" ,"Research", "Rocketry","DIY"];

export const categoryStyles = {
  Astrophysics: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Rocketry: "bg-red-500/20 text-red-400 border-red-500/30",
  Instrumentation: "bg-green-500/20 text-green-400 border-green-500/30",
  Software: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};
