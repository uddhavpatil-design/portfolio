"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/lib/portfolio-data";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Coffee, Code2, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);
  const countersRef = useRef<HTMLSpanElement[]>([]);

  useGSAP(() => {
    // Bento cards stagger reveal
    gsap.from(".bento-card", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
    });

    // Number counter animation
    countersRef.current.forEach((counter) => {
      if (!counter) return;
      const target = parseFloat(counter.getAttribute("data-target") || "0");
      
      gsap.to(counter, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        innerHTML: target,
        duration: 2,
        ease: "power2.out",
        snap: { innerHTML: 1 },
      });
    });
  }, { scope: containerRef });

  return (
    <section id="about" ref={containerRef} className="py-24 relative">
      <div className="container px-4 md:px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">About Me</h2>
          <div className="w-20 h-1 bg-primary rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Bio Card */}
          <Card className="bento-card md:col-span-2 bg-card border-border/50 shadow-sm overflow-hidden">
            <CardContent className="p-8 h-full flex flex-col justify-center">
              <Sparkles className="w-8 h-8 text-primary mb-6" />
              <h3 className="text-2xl font-semibold mb-4">My Journey</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {portfolioData.bio}
              </p>
            </CardContent>
          </Card>

          {/* Location & Quick Info Card */}
          <Card className="bento-card bg-card border-border/50 shadow-sm overflow-hidden flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Location</h3>
            <p className="text-muted-foreground">San Francisco, CA</p>
            <p className="text-sm text-muted-foreground mt-2">Working remotely globally</p>
          </Card>

          {/* Metrics Cards */}
          {portfolioData.metrics.map((metric, i) => (
            <Card key={i} className="bento-card bg-card border-border/50 shadow-sm">
              <CardContent className="p-8 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">{metric.label}</p>
                  <p className="text-4xl font-bold text-foreground">
                    <span 
                      ref={el => { if(el) countersRef.current[i] = el; }} 
                      data-target={metric.value}
                    >
                      0
                    </span>
                    <span className="text-primary">+</span>
                  </p>
                </div>
                {i === 0 ? <Code2 className="w-10 h-10 text-muted-foreground/30" /> : 
                 i === 1 ? <Sparkles className="w-10 h-10 text-muted-foreground/30" /> : 
                 <Coffee className="w-10 h-10 text-muted-foreground/30" />}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
