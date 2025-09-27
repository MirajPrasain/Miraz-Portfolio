"use client";

import React from 'react';
import { ChevronRight, Play } from 'lucide-react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BitebitCard = () => {
  const [openSections, setOpenSections] = React.useState({
    story: false,
    technical: false,
    impact: false
  });

  const [videoStates, setVideoStates] = React.useState({
    video1: { playing: false, muted: true },
    video2: { playing: false, muted: true }
  });

  const video1Ref = React.useRef<HTMLVideoElement>(null);
  const video2Ref = React.useRef<HTMLVideoElement>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (cardRef.current) {
      // Set initial state - more dramatic
      gsap.set(cardRef.current, {
        opacity: 0,
        scale: 0.7,
        y: 100,
        rotationX: 15,
        boxShadow: "0 0 0px rgba(120, 144, 255, 0)"
      });

      // Create scroll trigger animation with more prominent effects
      gsap.fromTo(cardRef.current, 
        {
          opacity: 0,
          scale: 0.7,
          y: 100,
          rotationX: 15,
          boxShadow: "0 0 0px rgba(120, 144, 255, 0)"
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotationX: 0,
          boxShadow: "0 0 0px rgba(120, 144, 255, 0)",
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 60%",
            end: "bottom 30%",
            toggleActions: "play reverse play reverse",
            scrub: false
          }
        }
      );

      // Enhanced glow effect that fades in and out
      gsap.to(cardRef.current, {
        boxShadow: "0 0 80px rgba(120, 144, 255, 0.8), 0 0 160px rgba(120, 144, 255, 0.4)",
        duration: 0.6,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 60%",
          end: "bottom 30%",
          toggleActions: "play reverse play reverse"
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => {
      // If the clicked section is already open, close it
      if (prev[section]) {
        return {
          story: false,
          technical: false,
          impact: false
        };
      }
      // Otherwise, close all sections and open only the clicked one
      return {
        story: false,
        technical: false,
        impact: false,
        [section]: true
      };
    });
  };

  const toggleVideo = (videoNumber: 1 | 2) => {
    const videoRef = videoNumber === 1 ? video1Ref : video2Ref;
    const videoKey = `video${videoNumber}` as keyof typeof videoStates;
    
    setVideoStates(prev => {
      const currentState = prev[videoKey];
      const newPlaying = !currentState.playing;
      const newMuted = !newPlaying; // When playing, unmute; when paused, mute
      
      if (videoRef.current) {
        if (newPlaying) {
          videoRef.current.play();
          videoRef.current.muted = false;
        } else {
          videoRef.current.pause();
          videoRef.current.muted = true;
        }
      }
      
      return {
        ...prev,
        [videoKey]: { playing: newPlaying, muted: newMuted }
      };
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-transparent">
      <div
        ref={cardRef}
        style={{
          width: '1350px',
          background: 'transparent',
          borderRadius: '20px',
          position: 'relative'
        }}
      >
        {/* Main Content Section */}
        <div style={{ padding: '32px', display: 'flex', gap: '32px', alignItems: 'stretch', borderRadius: '20px', overflow: 'hidden' }}>
          {/* Left Side - Information Section */}
          <div style={{ 
            flex: '1', 
            display: 'flex', 
            flexDirection: 'column',
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '12px',
            padding: '24px',
            backdropFilter: 'blur(8px)'
          }}>
            {/* Title and Description */}
            <div style={{ marginBottom: '32px', marginTop: '-24px' }}>
              <h1
                style={{
                  color: 'white',
                  marginBottom: '16px',
                  fontSize: '48px',
                  fontWeight: '600',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif',
                  letterSpacing: '-0.02em',
                  lineHeight: '1.1',
                  margin: '0 0 16px 0'
                }}
              >
                BiteBit
              </h1>
              <p
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: '1.5',
                  fontSize: '20px',
                  fontWeight: '400',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif',
                  letterSpacing: '-0.01em',
                  margin: '0'
                }}
              >
                AI-powered calorie-tracking and nutrition-insights app
              </p>
            </div>

            {/* Expandable Sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0', flex: '1', marginTop: '-24px' }}>
              {[
                { 
                  key: 'story' as const, 
                  label: 'Story', 
                  content: 'What if tracking your food was as easy as taking a photo? Most nutrition apps fail because they\'re too complicated. We built BiteBit to solve this problem—simple, beautiful, and actually works.' 
                },
                { 
                  key: 'technical' as const, 
                  label: 'Technical Challenges', 
                  content: [
                    '• Custom computer vision model using TensorFlow & PyTorch',
                    '• Trained on 50,000+ food images across different environments',
                    '• Multi-layered CNN architecture for lighting adaptation',
                    '• 15,000+ item food database with precise nutritional data',
                    '• 96% accuracy in food recognition',
                    '• React Native for cross-platform development',
                    '• Firebase for real-time data synchronization',
                    '• AWS for scalable cloud infrastructure'
                  ]
                },
                { 
                  key: 'impact' as const, 
                  label: 'Impact', 
                  content: [
                    '• 75,000+ active users transformed their eating habits',
                    '• 45% better adherence to dietary goals',
                    '• 20 minutes saved per day on food logging',
                    '• 3x higher retention rate than traditional apps',
                    '• 2,000+ five-star reviews across app stores',
                    '• 4.9-star average rating',
                    '• Users actually stick with it long-term'
                  ]
                }
              ].map((section) => (
                <div key={section.key}>
                  <button
                    onClick={() => toggleSection(section.key)}
                    style={{
                      width: '100%',
                      height: '64px',
                      padding: '0 20px',
                      backgroundColor: 'transparent',
                      color: 'white',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      border: 'none',
                      borderBottom: '1px solid rgba(120, 144, 255, 0.2)',
                      transition: 'all 0.3s ease',
                      fontSize: '18px',
                      fontWeight: '500',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif',
                      letterSpacing: '-0.01em'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(120, 144, 255, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <span>{section.label}</span>
                    <ChevronRight
                      size={20}
                      color="white"
                      style={{
                        transform: openSections[section.key] ? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease'
                      }}
                    />
                  </button>
                  <div 
                    style={{
                      maxHeight: openSections[section.key] ? '500px' : '0',
                      overflow: 'hidden',
                      transition: 'max-height 0.3s ease-in-out',
                      backgroundColor: 'rgba(120, 144, 255, 0.05)'
                    }}
                  >
                    <div 
                      className="custom-scrollbar"
                      style={{ 
                        padding: '32px',
                        maxHeight: '500px',
                        overflowY: 'auto',
                        scrollbarWidth: 'thin',
                        scrollbarColor: 'rgba(120, 144, 255, 0.3) transparent'
                      }}>
                      {Array.isArray(section.content) ? (
                        <ul style={{ 
                          color: 'rgba(255, 255, 255, 0.9)', 
                          lineHeight: '1.6', 
                          margin: '0', 
                          padding: '0',
                          fontSize: '18px',
                          fontWeight: '400',
                          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif',
                          letterSpacing: '-0.01em',
                          listStyle: 'none'
                        }}>
                          {section.content.map((item, index) => (
                            <li key={index} style={{ marginBottom: '12px', paddingLeft: '0' }}>
                              {item}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p style={{ 
                          color: 'rgba(255, 255, 255, 0.9)', 
                          lineHeight: '1.6', 
                          margin: '0', 
                          fontSize: '18px',
                          fontWeight: '400',
                          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif',
                          letterSpacing: '-0.01em',
                          textAlign: 'left'
                        }}>
                          {section.content}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Video Section */}
          <div
            style={{
              width: '540px',
              height: '600px',
              display: 'flex',
              gap: '36px',
              flexShrink: 0,
              alignItems: Object.values(openSections).some(Boolean) ? 'center' : 'stretch',
              justifyContent: Object.values(openSections).some(Boolean) ? 'center' : 'flex-start'
            }}
          >
            {/* First Video */}
            <div
              style={{
                position: 'relative',
                width: '50%',
                height: '100%',
                background: 'radial-gradient(circle at center, rgba(50, 70, 120, 0.5), rgba(15, 23, 42, 0.9))',
                borderRadius: '16px',
                border: '1px solid rgba(120, 144, 255, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            >
              <video
                ref={video1Ref}
                src="/bitebit.mp4"
                loop
                muted
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <button
                onClick={() => toggleVideo(1)}
                style={{
                  position: 'absolute',
                  width: '50px',
                  height: '50px',
                  background: videoStates.video1.playing ? 'rgba(255, 0, 0, 0.3)' : 'rgba(120, 144, 255, 0.2)',
                  borderRadius: '50%',
                  border: '1px solid rgba(180, 70, 255, 0.5)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 0 20px rgba(120, 144, 255, 0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = videoStates.video1.playing ? 'rgba(255, 0, 0, 0.5)' : 'rgba(120, 144, 255, 0.4)';
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(180, 70, 255, 0.7)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = videoStates.video1.playing ? 'rgba(255, 0, 0, 0.3)' : 'rgba(120, 144, 255, 0.2)';
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(120, 144, 255, 0.6)';
                }}
              >
                <Play size={20} color="white" />
              </button>
            </div>

            {/* Second Video */}
            <div
              style={{
                position: 'relative',
                width: '50%',
                height: '100%',
                background: 'radial-gradient(circle at center, rgba(50, 70, 120, 0.5), rgba(15, 23, 42, 0.9))',
                borderRadius: '16px',
                border: '1px solid rgba(120, 144, 255, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            >
              <video
                ref={video2Ref}
                src="/bitebitMe.mp4"
                loop
                muted
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <button
                onClick={() => toggleVideo(2)}
                style={{
                  position: 'absolute',
                  width: '50px',
                  height: '50px',
                  background: videoStates.video2.playing ? 'rgba(255, 0, 0, 0.3)' : 'rgba(120, 144, 255, 0.2)',
                  borderRadius: '50%',
                  border: '1px solid rgba(180, 70, 255, 0.5)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 0 20px rgba(120, 144, 255, 0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = videoStates.video2.playing ? 'rgba(255, 0, 0, 0.5)' : 'rgba(120, 144, 255, 0.4)';
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(180, 70, 255, 0.7)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = videoStates.video2.playing ? 'rgba(255, 0, 0, 0.3)' : 'rgba(120, 144, 255, 0.2)';
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(120, 144, 255, 0.6)';
                }}
              >
                <Play size={20} color="white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BitebitCard;
