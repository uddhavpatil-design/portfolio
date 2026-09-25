"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/lib/portfolio-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Terminal, Server, Wrench, Code2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function SkillsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const marquee1Ref = useRef<HTMLDivElement>(null);
  const marquee2Ref = useRef<HTMLDivElement>(null);

  // Flatten all skills for marquee
  const allSkills = [
    ...portfolioData.skills.frontend,
    ...portfolioData.skills.backend,
    ...portfolioData.skills.tools,
  ];

  useGSAP(() => {
    // Reveal section
    gsap.from(".skills-header", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
    });

    // Infinite Marquee Animations
    const m1 = marquee1Ref.current;
    const m2 = marquee2Ref.current;

    if (m1 && m2) {
      gsap.to(m1, {
        xPercent: -50,
        ease: "none",
        duration: 15,
        repeat: -1,
      });

      gsap.to(m2, {
        xPercent: 50,
        ease: "none",
        duration: 20,
        repeat: -1,
        modifiers: {
          xPercent: gsap.utils.wrap(-50, 0)
        }
      });
    }

    // Tabs fade in
    gsap.from(".skills-tabs", {
      scrollTrigger: {
        trigger: ".skills-tabs",
        start: "top 85%",
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  }, { scope: containerRef });

  const GlowingCard = ({ children, icon: Icon }: { children: React.ReactNode, icon: any }) => (
    <div className="flex items-center gap-3 px-6 py-4 bg-card rounded-xl font-medium cursor-default transition-all duration-300 border border-white/10 hover:border-white/80 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
      <Icon className="w-5 h-5 text-primary" />
      <span>{children}</span>
    </div>
  );

  return (
    <section id="skills" ref={containerRef} className="py-32 bg-muted/20 overflow-hidden relative border-y border-border/50">
      <div className="container px-4 md:px-6 mb-16 skills-header">
        <h2 className="text-4xl font-bold tracking-tight mb-4 text-center">Tech Stack</h2>
        <div className="w-20 h-1 bg-primary rounded-full mx-auto" />
      </div>

      {/* Marquees */}
      <div className="flex flex-col gap-6 mb-24 rotate-[-2deg] scale-105">
        <div className="flex w-[200%] overflow-hidden" ref={marquee1Ref}>
          <div className="flex gap-4 px-2">
            {[...allSkills, ...allSkills].map((skill, i) => (
              <Badge key={i} variant="secondary" className="px-6 py-3 text-lg whitespace-nowrap bg-background border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                <Code2 className="w-4 h-4 mr-2 opacity-50" />
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex w-[200%] overflow-hidden ml-[-100%]" ref={marquee2Ref}>
          <div className="flex gap-4 px-2">
            {[...allSkills, ...allSkills].reverse().map((skill, i) => (
              <Badge key={`rev-${i}`} variant="outline" className="px-6 py-3 text-lg whitespace-nowrap bg-background/50 border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                <Code2 className="w-4 h-4 mr-2 opacity-50" />
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="container px-4 md:px-6 skills-tabs max-w-4xl mx-auto">
        <Tabs defaultValue="frontend" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-10 h-14 rounded-xl bg-background/50 border border-white/10 p-1">
            <TabsTrigger value="frontend" className="rounded-lg text-base">Frontend</TabsTrigger>
            <TabsTrigger value="backend" className="rounded-lg text-base">Backend</TabsTrigger>
            <TabsTrigger value="tools" className="rounded-lg text-base">Tools</TabsTrigger>
          </TabsList>
          
          <TabsContent value="frontend" className="mt-4">
            <div className="flex flex-wrap gap-4 justify-center">
              {portfolioData.skills.frontend.map((skill) => (
                <GlowingCard key={skill} icon={Terminal}>{skill}</GlowingCard>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="backend" className="mt-4">
            <div className="flex flex-wrap gap-4 justify-center">
              {portfolioData.skills.backend.map((skill) => (
                <GlowingCard key={skill} icon={Server}>{skill}</GlowingCard>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="tools" className="mt-4">
            <div className="flex flex-wrap gap-4 justify-center">
              {portfolioData.skills.tools.map((skill) => (
                <GlowingCard key={skill} icon={Wrench}>{skill}</GlowingCard>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
