"use client";

import { useState } from "react";

export default function Projects() {
  return (
    <section
      id="bitebit"
      className="relative min-h-screen py-20 px-6 bg-black text-white"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
        BiteBit
      </h2>

      <div className="max-w-3xl mx-auto space-y-6">
        <ExpandableCard title="Story">
          <p>
            BiteBit was born from the struggle of tracking calories accurately.
            I wanted something more reliable than estimates — so I used AI
            vision models to turn photos into nutritional breakdowns.
          </p>
        </ExpandableCard>

        <ExpandableCard title="Technical Challenges">
          <p>
            Built using FastAPI, YOLOv8, and MiDaS depth estimation for precise
            volume detection. Biggest hurdle was keeping inference fast while
            integrating with a React frontend.
          </p>
        </ExpandableCard>

        <ExpandableCard title="Impact">
          <p>
            Early demo hit 5,000+ users in one month. BiteBit proved that calorie
            tracking can be reimagined with computer vision and AI.
          </p>
        </ExpandableCard>
      </div>
    </section>
  );
}

function ExpandableCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden shadow-lg 
                 transition-all duration-500"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-6 py-4 text-left text-lg font-semibold 
                   hover:bg-white/10 transition-colors"
      >
        {title}
        <span>{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="px-6 pb-6 text-gray-300 text-base leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}