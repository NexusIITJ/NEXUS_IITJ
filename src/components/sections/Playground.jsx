import React, { useEffect, useRef, useState } from "react";

const Playground = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        threshold: 0.3,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full overflow-x-auto space-y-6">
      <div
        className={`
          text-6xl font-bold text-amber-50 text-center
          transition-all duration-700 ease-out mb-10
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
      >
        Playground
      </div>

      {/* Solar System Scope */}
      <div
        ref={sectionRef}
        className="
        h-185
          min-w-[500px]
          min-h-[400px]
          mx-auto
          border-2
          border-[#0f5c6e]
        "
      >
        <iframe
          src="https://www.solarsystemscope.com/iframe"
          title="Solar System Scope"
          className="w-full h-full"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default Playground;