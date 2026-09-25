"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import { Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import { Button, buttonVariants } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

gsap.registerPlugin(ScrollToPlugin);

export default function Navbar() {
  const { setTheme, theme } = useTheme();
  const navRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Initial entry animation
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.2,
    });
  }, []);

  const scrollTo = (id: string) => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: id, offsetY: 80 },
      ease: "power3.inOut",
    });
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav 
      ref={navRef}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-6 py-3 rounded-full border bg-background/70 backdrop-blur-md shadow-sm"
    >
      <div className="flex items-center gap-1 md:gap-4 mr-2 md:mr-6">
        {navLinks.map((link) => (
          <button
            key={link.name}
            onClick={() => scrollTo(link.href)}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden md:block"
          >
            {link.name}
          </button>
        ))}
        {/* Mobile simple nav icon */}
        <button
          onClick={() => scrollTo("#about")}
          className="p-2 md:hidden text-muted-foreground hover:text-foreground"
        >
          <User className="w-5 h-5" />
        </button>
      </div>

      <div className="h-4 w-px bg-border mx-2"></div>

      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger 
            className={buttonVariants({ variant: "ghost", size: "icon", className: "rounded-full h-8 w-8" })}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </TooltipTrigger>
          <TooltipContent>Toggle Theme</TooltipContent>
        </Tooltip>

        <Button 
          className="rounded-full h-8 px-4 text-xs font-semibold"
          onClick={() => scrollTo("#contact")}
        >
          Hire Me
        </Button>
      </div>
    </nav>
  );
}
