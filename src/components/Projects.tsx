"use client";

import React from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { ChevronRight, Play } from 'lucide-react';
import { Card, Button, Text, Heading, Box, Flex } from "@radix-ui/themes";

const ProjectCard = () => {
  const [openSections, setOpenSections] = React.useState({
    story: false,
    technical: false,
    impact: false
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-8 bg-black">
      <Card
        size="4"
        style={{
          width: '800px',
          background: 'linear-gradient(145deg, #0a0f1f 0%, #0f172a 100%)',
          border: '1px solid rgba(120, 144, 255, 0.3)',
          borderRadius: '20px',
          padding: '0',
          overflow: 'hidden',
          boxShadow: '0 0 30px rgba(120, 144, 255, 0.3), 0 0 60px rgba(180, 70, 255, 0.2)'
        }}
      >
        {/* Main Content Section */}
        <Box style={{ padding: '32px', display: 'flex', gap: '32px', alignItems: 'stretch' }}>
          {/* Left Side - Information Section */}
          <Box style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
            {/* Title and Description */}
            <Box style={{ marginBottom: '24px' }}>
              <Heading
                size="7"
                weight="bold"
                style={{
                  color: 'rgb(220, 230, 255)',
                  marginBottom: '12px',
                  fontSize: '36px',
                  textShadow: '0 0 20px rgba(120, 144, 255, 0.6)'
                }}
              >
                BiteBit
              </Heading>
              <Text
                size="4"
                style={{
                  color: 'rgb(160, 170, 200)',
                  lineHeight: '1.6',
                  fontSize: '18px'
                }}
              >
                AI-powered calorie-tracking and nutrition-insights app
              </Text>
            </Box>

            {/* Expandable Sections */}
            <Flex direction="column" gap="0" style={{ flex: '1' }}>
              {[
                { key: 'story', label: 'Story' },
                { key: 'technical', label: 'Technical Challenges' },
                { key: 'impact', label: 'Impact' }
              ].map((section) => (
                <Collapsible.Root
                  key={section.key}
                  open={openSections[section.key as keyof typeof openSections]}
                  onOpenChange={() => toggleSection(section.key as keyof typeof openSections)}
                >
                  <Collapsible.Trigger asChild>
                    <Button
                      variant="ghost"
                      style={{
                        width: '100%',
                        height: '56px',
                        padding: '0 16px',
                        backgroundColor: 'transparent',
                        color: 'rgb(220,230,255)',
                        justifyContent: 'space-between',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        borderBottom: '1px solid rgba(120, 144, 255, 0.3)',
                        margin: '0 -16px',
                        transition: 'background 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(120, 144, 255, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <Text size="4" weight="medium" style={{ color: 'rgb(220,230,255)' }}>
                        {section.label}
                      </Text>
                      <ChevronRight
                        size={20}
                        color="rgb(160, 170, 200)"
                        style={{
                          transform: openSections[section.key as keyof typeof openSections]
                            ? 'rotate(90deg)'
                            : 'rotate(0deg)',
                          transition: 'transform 0.2s ease'
                        }}
                      />
                    </Button>
                  </Collapsible.Trigger>
                  <Collapsible.Content>
                    <Box style={{ padding: '16px 0', margin: '0 -16px 0 -16px' }}>
                      <Text
                        size="3"
                        style={{ color: 'rgb(200, 210, 240)', lineHeight: '1.6' }}
                      >
                        {/* Content will be added later */}
                      </Text>
                    </Box>
                  </Collapsible.Content>
                </Collapsible.Root>
              ))}
            </Flex>
          </Box>

          {/* Right Side - Video Section */}
          <Box
            style={{
              position: 'relative',
              width: '280px',
              height: '100%',
              minHeight: '400px',
              background: 'radial-gradient(circle at center, rgba(50, 70, 120, 0.5), rgba(15, 23, 42, 0.9))',
              borderRadius: '16px',
              border: '1px solid rgba(120, 144, 255, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              flexShrink: 0
            }}
          >
            <video
              src="/bitebitMe.mp4"
              autoPlay
              loop
              muted
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            <Button
              variant="soft"
              style={{
                position: 'absolute',
                width: '60px',
                height: '60px',
                background: 'rgba(120, 144, 255, 0.2)',
                borderRadius: '50%',
                border: '1px solid rgba(180, 70, 255, 0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 0 20px rgba(120, 144, 255, 0.6)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(120, 144, 255, 0.4)';
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(180, 70, 255, 0.7)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(120, 144, 255, 0.2)';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(120, 144, 255, 0.6)';
              }}
            >
              <Play size={24} color="rgb(220, 230, 255)" />
            </Button>
          </Box>
        </Box>
      </Card>
    </div>
  );
};

export default ProjectCard;
