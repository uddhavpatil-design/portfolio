"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/lib/portfolio-data";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, CheckCircle2, Send, Mail, MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useGSAP(() => {
    gsap.from(".contact-content > *", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out",
    });
  }, { scope: containerRef });

  const copyEmail = () => {
    navigator.clipboard.writeText(portfolioData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate sending
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => setSent(false), 3000);
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <section id="contact" ref={containerRef} className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -z-10" />

      <div className="container px-4 md:px-6">
        <div className="contact-content grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          <div className="flex flex-col space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50">extraordinary.</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Currently available for freelance projects and open to full-time opportunities.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Drop me a line</p>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-medium">{portfolioData.email}</p>
                    <Button variant="ghost" size="icon" onClick={copyEmail} className="h-8 w-8">
                      {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="text-lg font-medium">San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-xl relative overflow-hidden">
            {/* Top highlight line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent" />
            
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <Input id="name" required placeholder="John Doe" className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input id="email" type="email" required placeholder="john@example.com" className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <Textarea id="message" required placeholder="How can I help you?" className="min-h-[150px] bg-background/50 border-border/50 focus:border-primary/50 transition-colors resize-none" />
                </div>
                
                <Button type="submit" className="w-full" size="lg" disabled={sending || sent}>
                  {sent ? (
                    <><CheckCircle2 className="w-5 h-5 mr-2 text-green-400" /> Message Sent</>
                  ) : sending ? (
                    <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <><Send className="w-5 h-5 mr-2" /> Send Message</>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          
        </div>
      </div>
    </section>
  );
}
