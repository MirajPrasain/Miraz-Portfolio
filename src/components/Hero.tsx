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

      
      {/* Background glow effect */}
      <div className="absolute inset-0 z-5 flex items-center justify-center">
        <div className="w-[800px] h-[600px] rounded-full opacity-30"
             style={{
               background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 40%, transparent 70%)',
               filter: 'blur(60px)'
             }}
        />
        <div className="absolute w-[600px] h-[400px] rounded-full opacity-20"
             style={{
               background: 'radial-gradient(circle, rgba(196,181,253,0.12) 0%, rgba(196,181,253,0.06) 50%, transparent 80%)',
               filter: 'blur(40px)'
             }}
        />
      </div>

      <motion.div
  className="relative z-10 px-8 text-center w-full"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1.2, ease: "easeOut" }}
>
  {/* Headline */}
  <motion.h1 
    className="text-[6rem] font-black text-white leading-[1]"
    style={{
      textShadow: `
        0 0 20px rgba(255, 255, 255, 0.4),
        0 0 40px rgba(255, 255, 255, 0.3),
        0 0 60px rgba(255, 255, 255, 0.2),
        0 0 80px rgba(255, 255, 255, 0.1),
        0 1px 0 rgba(255, 255, 255, 0.8),
        0 2px 0 rgba(255, 255, 255, 0.6)
      `,
      WebkitTextStroke: '0.5px rgba(255, 255, 255, 0.3)',
      textStroke: '0.5px rgba(255, 255, 255, 0.3)'
    }}
    initial={{ opacity: 0, y: 60 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
  >
    Miraj Prasain
  </motion.h1>

  {/* Spacer */}
  <div className="h-32"></div>

  {/* Subtitle */}
  <motion.p 
    className="text-[1.75rem] font-light text-white/90 leading-snug max-w-4xl mx-auto"
    style={{
      textShadow: `
        0 0 15px rgba(255, 255, 255, 0.3),
        0 0 30px rgba(255, 255, 255, 0.2),
        0 0 45px rgba(255, 255, 255, 0.1),
        0 1px 0 rgba(255, 255, 255, 0.6)
      `,
      WebkitTextStroke: '0.3px rgba(255, 255, 255, 0.2)',
      textStroke: '0.3px rgba(255, 255, 255, 0.2)'
    }}
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
  >
      {["Creation is about connecting the dots"].join("").split(" ").map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 0.4, 
            ease: "easeOut", 
            delay: 0.7 + index * 0.05 // words stagger in from left
          }}
          style={{ display: "inline-block", marginRight: "0.5rem" }}
        >
          {word}
        </motion.span>
      ))}
   

  </motion.p>

  {/* Spacer */}
  <div className="h-24"></div>

  {/* Buttons */}
   <motion.div 
     className="flex flex-row gap-16 justify-center items-center gap-8"
     initial={{ opacity: 0, y: 50 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 1.0, delay: 0.8, ease: "easeOut" }}
   >
      {/* Projects Button */}
      <button 
        className="min-w-[140px] h-[56px] px-8 py-4
                   rounded-full border-2 border-white/70
                   bg-white/10 backdrop-blur-md
                   text-white font-semibold text-xl
                   transition-all duration-300 ease-out
                   hover:bg-white hover:text-black hover:border-white
                   hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]
                   active:scale-95"
      >
        Projects
      </button>

      {/* Links Button */}
      <button 
        className="min-w-[140px] h-[56px] px-8 py-4
                   rounded-full border-2 border-white/70
                   bg-white/10 backdrop-blur-md
                   text-white font-semibold text-xl
                   transition-all duration-300 ease-out
                   hover:bg-white hover:text-black hover:border-white
                   hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]
                   active:scale-95"
      >
        Links
      </button>
   </motion.div>

</motion.div>

</section>

  );
}