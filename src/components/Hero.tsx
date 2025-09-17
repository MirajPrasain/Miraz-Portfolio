"use client";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useState, useRef } from "react";
import { loadSlim } from "@tsparticles/slim";
import { motion } from "framer-motion";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";

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
      className="relative h-screen flex items-center justify-center overflow-hidden bg-black"
    >
    
      {/* Cosmic background layer */}
      {ready && (
        <Particles
          id="cosmic-particles"
          options={{
            background: { color: "#000000" },
            particles: {
              number: { value: 120 },
              color: {
                value: ["#8b5cf6", "#a78bfa", "#f472b6", "#fb7185", "#c084fc"]
              },
              shape: {
                type: ["circle", "star"],
              },
              size: {
                value: { min: 1.5, max: 4 },
                animation: {
                  enable: true,
                  speed: 1,
                  sync: false,
                  startValue: "min",
                  destroy: "max"
                }
              },
              opacity: {
                value: { min: 0.4, max: 0.9 },
                animation: {
                  enable: true,
                  speed: 0.25,
                  sync: false
                }
              },
              move: {
                enable: true,
                speed: 0.35,
                direction: "none",
                random: true,
                straight: false,
                outModes: { default: "out" },
                trail: {
                  enable: true,
                  length: 8,
                  fill: { color: "#000000cc" }
                }
              },
              life: {
                duration: {
                  value: 6
                },
                count: 1
              }
            },
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: "bubble"
                }
              },
              modes: {
                bubble: {
                  distance: 200,
                  duration: 2.5,
                  opacity: 1,
                  size: 6,
                  color: {
                    value: ["#a855f7", "#d946ef", "#f97316"]
                  }
                }
              }
            }
          }}
          className="absolute inset-0"
        />
      )}

      {/* Original fog-to-fuel particles layer */}
      {ready && (
        <Particles
          id="tsparticles"
          options={{
            background: { color: "#000000" },
            particles: {
              number: { value: 60 },
              size: { value: { min: 1.5, max: 4 } },
              move: {
                enable: true,
                speed: 0.6 + (1 - clarity) * 1.2, // faster when foggy
                random: clarity < 0.5, // more random at low clarity
              },
              opacity: { value: 0.25 + 0.35 * (1 - clarity) }, // more opaque when foggy
              links: {
                enable: true,
                distance: 120 + 70 * (1 - clarity), // more spread when foggy
                color: clarity < 0.5 ? "#6366f1" : "#8b5cf6",
                opacity: 0.25 + 0.25 * (1 - clarity),
              },
              color: { value: clarity < 0.5 ? "#a78bfa" : "#c4b5fd" },
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

      {/* Enhanced spotlight halo behind text for maximum illumination */}
      <motion.div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="w-[50%] h-[50%] rounded-full bg-[radial-gradient(circle,rgba(199,178,255,0.25),rgba(255,255,255,0.05)_50%,transparent_80%)] blur-3xl" />
      </motion.div>

      <motion.div
        className="relative z-50 text-center px-6 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1
          className="text-6xl md:text-8xl lg:text-9xl 
                     font-extrabold tracking-tight 
                     text-transparent bg-gradient-to-b from-white to-gray-200 bg-clip-text 
                     drop-shadow-[0_4px_40px_rgba(255,255,255,0.6)] 
                     leading-[0.9] mb-6"
        >
          Miraj Prasain
        </h1>

        <p className="text-xl md:text-3xl lg:text-4xl font-medium text-gray-200 leading-tight
                      drop-shadow-[0_0_40px_rgba(255,255,255,0.7)] max-w-3xl mx-auto">
          Creation is about <span className="text-white font-semibold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">connecting the dots.</span>
        </p>
        <div className="mt-12 flex items-center justify-center gap-6 relative z-20">
          <LiquidGlassButton 
            className="text-white font-semibold text-lg bg-white/15 border-white/25 backdrop-blur-3xl
            shadow-[0_0_4rem_rgba(255,255,255,0.4),0_0_2rem_rgba(199,178,255,0.6)] 
            hover:shadow-[0_0_6rem_rgba(255,255,255,0.6),0_0_3rem_rgba(199,178,255,0.8)] 
            hover:bg-white/25 hover:scale-105 transition-all duration-300 px-8 py-4"
            onClick={() => document.getElementById('bitebit')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View My Work
          </LiquidGlassButton>
          
          <LiquidGlassButton 
            className="text-white font-semibold text-lg bg-purple-500/20 border-purple-300/35 backdrop-blur-3xl
            shadow-[0_0_3rem_rgba(147,51,234,0.6),0_0_1.5rem_rgba(168,85,247,0.4)] 
            hover:shadow-[0_0_4rem_rgba(147,51,234,0.8),0_0_2.5rem_rgba(168,85,247,0.6)] 
            hover:bg-purple-500/30 hover:scale-105 transition-all duration-300 px-8 py-4"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Contact
          </LiquidGlassButton>
        </div>
      </motion.div>

      {/* Cosmic background layers */}
      <div className="pointer-events-none absolute inset-0">
        {/* Deep universe vignette - much darker */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.2)_5%,rgba(0,0,0,0.95)_150%)]" />
        
        {/* Cosmic nebula layers - darker but visible */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_0%,rgba(79,70,229,0.12),transparent_60%)]" /> {/* Deep indigo nebula top */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_85%,rgba(139,69,19,0.08),transparent_55%)]" /> {/* Dark amber bottom right */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_90%,rgba(147,51,234,0.1),transparent_65%)]" /> {/* Deep purple bottom left */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(30,41,59,0.15),transparent_50%)]" /> {/* Dark slate core */}
        
        {/* Enhanced star clusters - more visible */}
        <div className="absolute inset-0 opacity-[0.12] mix-blend-screen bg-[radial-gradient(circle_at_30%_20%,rgba(165,180,252,1),transparent_1%),radial-gradient(circle_at_70%_60%,rgba(196,181,253,0.8),transparent_0.5%),radial-gradient(circle_at_40%_80%,rgba(129,140,248,1),transparent_1%),radial-gradient(circle_at_80%_40%,rgba(167,139,250,0.7),transparent_0.5%)]" />

        {/* Deep space atmospheric glow */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(30,41,59,0.08),transparent_45%)]" />
        
        {/* Additional depth layer */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.6)_100%)]" />
      </div>
    </section>
  );
}
// ...existing code...
