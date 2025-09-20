"use client";

import { useState } from "react";

export default function Projects() {
  // BiteBit section removed per user request
  return null;
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