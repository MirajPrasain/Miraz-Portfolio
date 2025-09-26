"use client";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useState, useRef } from "react";
import { loadSlim } from "@tsparticles/slim";
import { motion } from "framer-motion";
import { Button, Text, Heading } from "@radix-ui/themes";


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
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
  >
    <Heading 
      size="9" 
      weight="bold"
      style={{
        fontSize: '6rem',
        lineHeight: '1',
        color: 'white',
        textShadow: `
          0 0 20px rgba(255, 255, 255, 0.4),
          0 0 40px rgba(255, 255, 255, 0.3),
          0 0 60px rgba(255, 255, 255, 0.2),
          0 0 80px rgba(255, 255, 255, 0.1),
          0 1px 0 rgba(255, 255, 255, 0.8),
          0 2px 0 rgba(255, 255, 255, 0.6)
        `,
        WebkitTextStroke: '0.5px rgba(255, 255, 255, 0.3)'
      }}
    >
      Miraj Prasain
    </Heading>
  </motion.div>

  {/* Spacer */}
  <div className="h-32"></div>

  {/* Subtitle */}
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
  >
    <Text 
      size="7" 
      weight="light"
      style={{
        fontSize: '1.75rem',
        lineHeight: '1.375',
        color: 'rgba(255, 255, 255, 0.9)',
        maxWidth: '64rem',
        margin: '0 auto',
        textShadow: `
          0 0 15px rgba(255, 255, 255, 0.3),
          0 0 30px rgba(255, 255, 255, 0.2),
          0 0 45px rgba(255, 255, 255, 0.1),
          0 1px 0 rgba(255, 255, 255, 0.6)
        `,
        WebkitTextStroke: '0.3px rgba(255, 255, 255, 0.2)'
      }}
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
    </Text>
  </motion.div>

  {/* Spacer */}
  <div className="h-24"></div>

  {/* Buttons */}
   <motion.div 
     className="flex flex-row justify-center items-center"
     initial={{ opacity: 0, y: 50 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 1.0, delay: 0.8, ease: "easeOut" }}
   >
      {/* Projects Button */}
      <Button
        size="4"
        variant="soft"
        style={{
          minWidth: '140px',
          height: '56px',
          padding: '0 32px',
          marginRight: '48px',
          borderRadius: '9999px',
          border: '2px solid rgba(255, 255, 255, 0.7)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          color: 'white',
          fontWeight: '600',
          fontSize: '1.25rem',
          transition: 'all 300ms ease-out',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'white';
          e.currentTarget.style.color = 'black';
          e.currentTarget.style.borderColor = 'white';
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 0 30px rgba(255,255,255,0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          e.currentTarget.style.color = 'white';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.7)';
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = 'none';
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = 'scale(0.95)';
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
      >
        Projects
      </Button>

      {/* Links Button */}
      <Button
        size="4"
        variant="soft"
        style={{
          minWidth: '140px',
          height: '56px',
          padding: '0 32px',
          borderRadius: '9999px',
          border: '2px solid rgba(255, 255, 255, 0.7)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          color: 'white',
          fontWeight: '600',
          fontSize: '1.25rem',
          transition: 'all 300ms ease-out',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'white';
          e.currentTarget.style.color = 'black';
          e.currentTarget.style.borderColor = 'white';
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 0 30px rgba(255,255,255,0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          e.currentTarget.style.color = 'white';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.7)';
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = 'none';
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = 'scale(0.95)';
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
      >
        Links
      </Button>
   </motion.div>

</motion.div>

</section>

  );
}