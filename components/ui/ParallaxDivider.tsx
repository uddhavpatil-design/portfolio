"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxDivider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(bgRef.current, {
      yPercent: 50,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      className="h-24 md:h-40 w-full overflow-hidden relative flex items-center justify-center"
    >
      <div 
        ref={bgRef} 
        className="absolute top-[-50%] left-0 w-full h-[200%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-background to-background opacity-60" 
      />
      <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px]" />
    </div>
  );
}
