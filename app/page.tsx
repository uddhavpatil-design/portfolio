import Navbar from "@/components/navbar/Navbar";
import HeroSection from "@/components/hero/HeroSection";
import AboutSection from "@/components/about/AboutSection";
import SkillsSection from "@/components/skills/SkillsSection";
import ProjectsSection from "@/components/projects/ProjectsSection";
import ContactSection from "@/components/contact/ContactSection";
import Footer from "@/components/footer/Footer";
import ParallaxDivider from "@/components/ui/ParallaxDivider";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />
      
      <HeroSection />
      <ParallaxDivider />
      
      <AboutSection />
      <ParallaxDivider />
      
      <SkillsSection />
      <ParallaxDivider />
      
      <ProjectsSection />
      <ParallaxDivider />
      
      <ContactSection />
      
      <Footer />
    </main>
  );
}
