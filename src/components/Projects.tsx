"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink, Github, Sparkles, Zap, Target } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const projects = [
    {
      id: "bitebit",
      title: "BiteBit",
      subtitle: "AI-Powered Food Recognition & Nutrition Analysis",
      description: "Revolutionary mobile application that transforms how people understand their food through advanced computer vision and machine learning.",
      status: "Featured Project",
      gradient: "from-blue-500 via-purple-500 to-pink-500",
      glowColor: "shadow-[0_0_60px_rgba(59,130,246,0.3)]",
      icon: Sparkles,
      sections: {
        about: {
          title: "About",
          content: "BiteBit represents the future of nutritional awareness, combining cutting-edge AI technology with intuitive user experience design. The app uses advanced computer vision algorithms to instantly identify food items from photos, providing detailed nutritional breakdowns, allergen warnings, and personalized dietary recommendations."
        },
        technical: {
          title: "Technical Implementation",
          content: "Built with React Native and Expo for cross-platform compatibility, featuring TensorFlow Lite integration for on-device machine learning. The backend utilizes Python with FastAPI, PostgreSQL for data persistence, and AWS services for scalable image processing. Implements custom CNN models trained on extensive food datasets for 95%+ accuracy in food recognition."
        },
        impact: {
          title: "Impact",
          content: "Successfully launched with 10,000+ downloads in the first month, achieving 4.8/5 App Store rating. Users report 40% improvement in dietary awareness and 25% reduction in food waste. Featured in TechCrunch and nominated for 'Best Health App' at Mobile World Congress 2024."
        }
      },
      links: {
        live: "https://bitebit.app",
        github: "https://github.com/mirajprasai/bitebit"
      },
      technologies: ["React Native", "TensorFlow Lite", "Python", "FastAPI", "PostgreSQL", "AWS", "Expo"]
    }
  ];

  return (
    <section id="projects" className="relative min-h-screen py-32 px-8 overflow-hidden">
      {/* Background - ensuring it doesn't interfere with Hero particles */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030308]/30 to-[#030308]/80 pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <motion.h2 
            className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight"
            style={{
              textShadow: `
                0 0 30px rgba(255, 255, 255, 0.2),
                0 0 60px rgba(255, 255, 255, 0.1),
                0 1px 0 rgba(255, 255, 255, 0.5)
              `,
              WebkitTextStroke: '0.5px rgba(255, 255, 255, 0.1)'
            }}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Projects
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed font-light"
            style={{
              textShadow: '0 0 20px rgba(255, 255, 255, 0.1)'
            }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Crafting digital experiences that push the boundaries of innovation
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-16">
          {projects.map((project, index) => {
            const IconComponent = project.icon;
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Cosmic Container */}
                <div className={`
                  relative rounded-3xl overflow-hidden
                  bg-gradient-to-br from-white/8 via-white/4 to-white/8
                  backdrop-blur-2xl border border-white/15
                  ${project.glowColor}
                  transition-all duration-700 ease-out
                  hover:scale-[1.02] hover:shadow-[0_0_100px_rgba(59,130,246,0.5)]
                  ${hoveredProject === project.id ? 'shadow-[0_0_120px_rgba(59,130,246,0.6)]' : ''}
                `}>
                  {/* Enhanced Gradient Border Effect */}
                  <div className={`
                    absolute inset-0 rounded-3xl p-[3px]
                    bg-gradient-to-r ${project.gradient}
                    opacity-25
                    ${hoveredProject === project.id ? 'opacity-50' : ''}
                    transition-all duration-500
                  `}>
                    <div className="w-full h-full rounded-3xl bg-[#030308]/95 backdrop-blur-sm" />
                  </div>
                  
                  {/* Inner Glow Ring */}
                  <div className={`
                    absolute inset-2 rounded-3xl
                    bg-gradient-to-r from-transparent via-white/5 to-transparent
                    opacity-30
                    ${hoveredProject === project.id ? 'opacity-50' : ''}
                    transition-opacity duration-500
                  `} />

                  {/* Content */}
                  <div className="relative z-10 p-8 md:p-12">
                    {/* Project Header */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10">
                            <IconComponent className="w-8 h-8 text-blue-400" />
                          </div>
                          <Badge variant="secondary" className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-400/30">
                            {project.status}
                          </Badge>
                        </div>
                        
                        <motion.h3 
                          className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 tracking-tight"
                          style={{
                            textShadow: `
                              0 0 30px rgba(255, 255, 255, 0.3),
                              0 0 60px rgba(255, 255, 255, 0.2),
                              0 1px 0 rgba(255, 255, 255, 0.6)
                            `,
                            WebkitTextStroke: '0.5px rgba(255, 255, 255, 0.2)'
                          }}
                          initial={{ opacity: 0, x: -30, scale: 0.95 }}
                          whileInView={{ opacity: 1, x: 0, scale: 1 }}
                          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                          viewport={{ once: true }}
                        >
                          {project.title}
                        </motion.h3>
                        
                        <motion.p 
                          className="text-2xl md:text-3xl text-white/85 mb-8 leading-relaxed font-light"
                          style={{
                            textShadow: '0 0 20px rgba(255, 255, 255, 0.15)'
                          }}
                          initial={{ opacity: 0, x: -20, y: 10 }}
                          whileInView={{ opacity: 1, x: 0, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                          viewport={{ once: true }}
                        >
                          {project.subtitle}
                        </motion.p>
                        
                        <motion.p 
                          className="text-lg text-white/60 leading-relaxed max-w-3xl"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                          viewport={{ once: true }}
                        >
                          {project.description}
                        </motion.p>
                      </div>

                      {/* Action Links */}
                      <motion.div 
                        className="flex gap-4 mt-6 md:mt-0 md:ml-8"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                      >
                        <motion.a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold text-lg hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                          style={{
                            boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)'
                          }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink className="w-5 h-5" />
                          Live Demo
                        </motion.a>
                        <motion.a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/25 text-white font-semibold text-lg hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                          style={{
                            boxShadow: '0 0 15px rgba(255, 255, 255, 0.1)'
                          }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Github className="w-5 h-5" />
                          Code
                        </motion.a>
                      </motion.div>
                    </div>

                    {/* Technologies */}
                    <motion.div 
                      className="mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex flex-wrap gap-3">
                        {project.technologies.map((tech, techIndex) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.6 + techIndex * 0.1 }}
                            viewport={{ once: true }}
                            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 text-sm font-medium backdrop-blur-sm hover:bg-white/10 transition-colors duration-300"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>

                    {/* Detailed Sections Accordion */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.7 }}
                      viewport={{ once: true }}
                    >
                      <Accordion type="single" collapsible className="space-y-6">
                        {Object.entries(project.sections).map(([key, section], sectionIndex) => (
                          <AccordionItem 
                            key={key} 
                            value={key}
                            className="border border-white/15 rounded-3xl bg-white/8 backdrop-blur-xl overflow-hidden hover:bg-white/10 transition-all duration-300"
                            style={{
                              boxShadow: '0 0 20px rgba(255, 255, 255, 0.05)'
                            }}
                          >
                            <AccordionTrigger className="px-8 py-6 text-left hover:bg-white/5 transition-all duration-300 group">
                              <div className="flex items-center gap-4">
                                <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 group-hover:border-white/20 transition-colors duration-300">
                                  {key === 'about' && <Sparkles className="w-6 h-6 text-blue-400" />}
                                  {key === 'technical' && <Zap className="w-6 h-6 text-purple-400" />}
                                  {key === 'impact' && <Target className="w-6 h-6 text-pink-400" />}
                                </div>
                                <span className="text-xl font-bold text-white">{section.title}</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-8 pb-8">
                              <motion.p 
                                className="text-white/75 leading-relaxed text-lg font-light"
                                style={{
                                  textShadow: '0 0 10px rgba(255, 255, 255, 0.1)'
                                }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                              >
                                {section.content}
                              </motion.p>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Coming Soon Projects */}
        <motion.div 
          className="text-center mt-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <Sparkles className="w-5 h-5 text-white/60" />
            <span className="text-white/60 text-lg">More projects coming soon...</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}