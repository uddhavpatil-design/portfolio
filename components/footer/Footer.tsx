"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/lib/portfolio-data";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export default function Footer() {
  const [time, setTime] = useState<string>("");
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { timeZone: "America/Los_Angeles", hour12: true, hour: '2-digit', minute:'2-digit' }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    gsap.from(".footer-title", {
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%",
      },
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
    });
  }, { scope: footerRef });

  const scrollToTop = () => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: 0 },
      ease: "expo.inOut",
    });
  };

  return (
    <footer ref={footerRef} className="relative pt-32 pb-8 bg-background overflow-hidden border-t border-border/50">
      {/* Background glowing orb */}
      <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[80vw] h-[500px] bg-primary/20 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center">
        
        {/* Massive Call to Action */}
        <div className="text-center mb-24 overflow-hidden">
          <h2 className="footer-title text-[15vw] md:text-[8vw] font-black leading-none tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/30">
            Let's Talk
          </h2>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-white/10">
          
          <div className="flex flex-col items-center md:items-start">
            <p className="font-semibold text-xl tracking-tight">{portfolioData.name}</p>
            <p className="text-sm text-muted-foreground mt-1">
              &copy; {new Date().getFullYear()} — Built with Next.js & GSAP.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a href={portfolioData.socials.github} target="_blank" rel="noreferrer" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              GITHUB
            </a>
            <a href={portfolioData.socials.linkedin} target="_blank" rel="noreferrer" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              LINKEDIN
            </a>
            <a href={portfolioData.socials.twitter} target="_blank" rel="noreferrer" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              TWITTER
            </a>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex flex-col items-end">
              <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Local Time</p>
              <p className="text-sm font-medium">{time} PST</p>
            </div>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={scrollToTop} 
              className="rounded-full w-12 h-12 border-white/20 hover:border-white/80 hover:bg-white/10 transition-all duration-300 group"
            >
              <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </div>
          
        </div>
      </div>
    </footer>
  );
}
