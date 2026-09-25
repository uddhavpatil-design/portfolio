"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/lib/portfolio-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ExternalLink, Code, Layers } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const containerRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    // Project cards stagger reveal
    gsap.from(".project-card", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, { scope: containerRef });

  return (
    <section id="projects" ref={containerRef} className="py-32 relative">
      {/* Background glow decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="container px-4 md:px-6">
        <div className="mb-16 flex items-center gap-4">
          <div>
            <h2 className="text-4xl font-bold tracking-tight mb-4">Featured Work</h2>
            <div className="w-20 h-1 bg-primary rounded-full" />
          </div>
          <Layers className="w-12 h-12 text-primary/20 ml-auto" />
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[350px]">
          {portfolioData.projects.map((project, index) => {
            // First project spans 2x2, others 2x1
            const isFeatured = index === 0;
            return (
              <ProjectCard 
                key={project.id} 
                project={project} 
                className={isFeatured ? "md:col-span-4 lg:col-span-2 lg:row-span-2" : "md:col-span-2"}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, className = "" }: { project: any, className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Interactive 3D tilt effect on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    
    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1200,
      ease: "power1.out",
      duration: 0.4
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      ease: "elastic.out(1, 0.4)",
      duration: 1
    });
  };

  return (
    <Card 
      ref={cardRef}
      className={`project-card group bg-card overflow-hidden border-border/50 hover:border-white/40 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all shadow-sm flex flex-col ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="relative flex-grow overflow-hidden bg-muted">
        <img
          src={project.image}
          alt={project.title}
          className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80" />
        
        <div className="absolute inset-0 bg-background/90 md:bg-background/40 md:group-hover:bg-background/80 transition-all duration-300 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 backdrop-blur-sm">
          <div className="flex gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300" style={{ transformStyle: "preserve-3d", transform: "translateZ(50px)" }}>
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className={buttonVariants({ variant: "default", size: "sm" })}>
              <ExternalLink className="w-4 h-4 mr-2" /> Live
            </a>
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className={buttonVariants({ variant: "secondary", size: "sm" })}>
              <Code className="w-4 h-4 mr-2" /> Source
            </a>
          </div>
        </div>
      </div>
      
      <CardContent className="p-6 relative bg-card border-t border-white/5" style={{ transformStyle: "preserve-3d", transform: "translateZ(30px)" }}>
        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag: string) => (
            <Badge key={tag} variant="outline" className="bg-background/50 border-white/10">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
