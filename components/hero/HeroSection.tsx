"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { portfolioData } from "@/lib/portfolio-data";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code } from "lucide-react";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(ScrollToPlugin);

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(".hero-badge", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      delay: 0.5,
    })
    .from(".hero-title-line", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
    }, "-=0.3")
    .from(".hero-desc", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.5")
    .from(".hero-btns", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    }, "-=0.4")
    .from(".hero-visual", {
      scale: 0.9,
      opacity: 0,
      duration: 1,
      ease: "elastic.out(1, 0.5)",
    }, "-=0.8");

    // Float animation for the visual element
    gsap.to(".hero-visual", {
      y: -15,
      duration: 2.5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
  }, { scope: containerRef });

  const scrollTo = (id: string) => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: id, offsetY: 80 },
      ease: "power3.inOut",
    });
  };

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center pt-24 pb-12 relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] opacity-50 -z-10" />

      <div className="container px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col items-start space-y-6 text-left">
          <Badge variant="outline" className="hero-badge px-4 py-1.5 rounded-full border-primary/30 bg-primary/10 text-primary">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            Available for new opportunities
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
            <div className="overflow-hidden"><div className="hero-title-line">Building</div></div>
            <div className="overflow-hidden"><div className="hero-title-line text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50">Digital</div></div>
            <div className="overflow-hidden"><div className="hero-title-line">Experiences.</div></div>
          </h1>
          
          <p className="hero-desc text-xl text-muted-foreground max-w-[600px] leading-relaxed">
            Hi, I'm <strong className="text-foreground">{portfolioData.name}</strong>. {portfolioData.role}. 
            Crafting fluid, high-performance web applications that leave a lasting impression.
          </p>
          
          <div className="hero-btns flex flex-wrap gap-4 pt-4">
            <Button size="lg" className="rounded-full group" onClick={() => scrollTo("#projects")}>
              View Work
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full" onClick={() => scrollTo("#contact")}>
              Contact Me
            </Button>
          </div>
        </div>

        <div className="hidden lg:flex justify-center items-center relative perspective-[1000px]">
          <div className="hero-visual relative w-[400px] h-[400px] bg-gradient-to-br from-primary/20 to-background border border-border/50 rounded-3xl shadow-2xl backdrop-blur-sm flex items-center justify-center rotate-y-[-10deg] rotate-x-[10deg]">
            <div className="absolute inset-2 border border-border/30 rounded-2xl border-dashed" />
            <Code className="w-32 h-32 text-primary/40" />
            
            {/* Floating decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-background border border-border rounded-xl shadow-lg flex items-center justify-center font-mono text-xs">
              <span className="text-primary">{'</>'}</span>
            </div>
            <div className="absolute -bottom-8 -left-8 px-6 py-4 bg-background border border-border rounded-xl shadow-lg flex items-center justify-center font-mono text-sm">
              <span className="text-green-500 mr-2">✔</span> All tests passed
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
