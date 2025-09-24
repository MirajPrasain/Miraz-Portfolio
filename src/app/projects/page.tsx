"use client";

import { useState } from "react";

// Accordion component for expandable sections
function AccordionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-blue-400/20 rounded-xl bg-gray-900/50 backdrop-blur-sm overflow-hidden mb-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-lg font-semibold text-blue-300 flex justify-between items-center cursor-pointer px-4 py-3 w-full text-left hover:bg-blue-400/5 transition-colors duration-200"
        role="button"
        aria-expanded={isExpanded}
        aria-controls={`accordion-content-${title.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <span>{title}</span>
        <span className="text-xl font-bold">
          {isExpanded ? "−" : "+"}
        </span>
      </button>
      <div
        id={`accordion-content-${title.replace(/\s+/g, '-').toLowerCase()}`}
        className={`transition-all ease-in-out duration-500 overflow-hidden ${
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="text-gray-300 px-4 pb-4 leading-relaxed animate-in fade-in duration-300">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="max-w-3xl mx-auto">
        {/* Main container with glowing border */}
        <div className="bg-black border border-blue-400/30 shadow-[0_0_25px_rgba(96,165,250,0.3)] rounded-2xl p-8 md:p-12">
          {/* Header */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
            BiteBit
          </h1>
          
          {/* Accordion sections */}
          <div className="space-y-4">
            <AccordionCard title="About / Story">
              <p>
                BiteBit was born out of my personal struggle with calorie tracking. Traditional apps required 
                tedious manual input and often provided inaccurate nutritional information. I envisioned a 
                solution that could instantly analyze food portions and provide precise calorie counts using 
                AI-powered computer vision. BiteBit transforms the way people track their nutrition by simply 
                taking a photo of their meal, making healthy eating accessible and effortless for everyone.
              </p>
            </AccordionCard>

            <AccordionCard title="Technical Implementation">
              <p>
                BiteBit leverages cutting-edge technology to deliver accurate food analysis. The backend is 
                built with <strong>FastAPI</strong> for high-performance API endpoints, integrated with 
                <strong>YOLOv8</strong> for real-time object detection to identify food items. 
                <strong>MiDaS depth estimation</strong> calculates portion sizes from 2D images, while our 
                custom-trained models provide nutritional analysis. The frontend uses <strong>React/Next.js</strong> 
                for a seamless user experience, with the entire system deployed on cloud infrastructure 
                for scalability and reliability.
              </p>
            </AccordionCard>

            <AccordionCard title="Impact">
              <p>
                BiteBit has gained significant early traction with over <strong>2,000+ early users</strong> 
                actively testing the platform. Our growth strategy includes targeted influencer marketing 
                campaigns and viral content on <strong>TikTok and Instagram</strong>, showcasing the app's 
                ease of use and accuracy. The positive user feedback and organic growth demonstrate the 
                strong market demand for AI-powered nutrition tracking solutions.
              </p>
            </AccordionCard>
          </div>
        </div>
      </div>
    </div>
  );
}
