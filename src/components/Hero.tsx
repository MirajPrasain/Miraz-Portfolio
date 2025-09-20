"use client";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useState, useRef } from "react";
import { loadSlim } from "@tsparticles/slim";
import { motion } from "framer-motion";

export default function Hero() {
  const [ready, setReady] = useState(false);
  // clarity: 0 = foggy/chaotic, 1 = clear/attract
  const [clarity, setClarity] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);


  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  // Scroll effect: clarity increases as user scrolls past 30% of hero
  useEffect(() => {
    function handleScroll() {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      // How much of the hero is scrolled past (0 = top, 1 = bottom out of view)
      const scrolled = Math.min(Math.max((windowH - rect.top) / rect.height, 0), 1);
      // Start transition after 30% scrolled, finish by 90%
      const t = Math.max(0, Math.min(1, (scrolled - 0.3) / 0.6));
      setClarity(t);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
   <section
  ref={sectionRef}
  className="relative h-screen flex items-center justify-center overflow-hidden bg-black text-white"
>
  
      {/* Original fog-to-fuel particles layer */}
      {ready && (
        <Particles
          id="tsparticles"
          options={{
            background: { color: "#030308" }, // Matching darker universe-black background
            particles: {
              number: { value: 85 }, // Slight increase for more particles
              size: { value: { min: 0.9, max: 3.2 } }, // Adjusted size range
              move: {
                enable: true,
                speed: 0.5 + (1 - clarity) * 1.1, // Slightly slower base speed for more depth
                random: clarity < 0.5, // more random at low clarity
              },
              opacity: { value: 0.14 + 0.22 * (1 - clarity) }, // Slightly less opaque for more depth
              links: {
                enable: true,
                distance: 130 + 70 * (1 - clarity), // Slightly more spread
                color: clarity < 0.5 ? "#8a7f9d" : "#c4bcdb", // Darker link colors
                opacity: 0.20 + 0.2 * (1 - clarity), // Slightly reduced base opacity
              },
              color: { value: clarity < 0.5 ? "#d8d8e0" : "#fff" }, // Slightly dimmer particles
            },
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: clarity < 0.5 ? ["repulse"] : ["attract"],
                },
                onClick: { enable: true, mode: "push" },
              },
              modes: {
                repulse: { distance: 100 + 60 * (1 - clarity), duration: 0.4 },
                attract: { distance: 120 + 60 * clarity, duration: 0.4 },
                push: { quantity: 3 },
              },
            },
          }}
          className="absolute inset-0"
        />
      )}
      
      
  <motion.div
    className="relative z-10 px-6 text-center"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
  >
    <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
      Miraj Prasain
    </h1>
    <p className="mt-5 text-lg md:text-2xl">
      Creation is about connecting the dots 
    </p>

  </motion.div>
</section>

  );
}
// ...existing code...
