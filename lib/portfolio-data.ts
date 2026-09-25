export const portfolioData = {
  name: "Uddhav Patil",
  role: "Full Stack Developer",
  bio: "I am a passionate Full Stack Developer focused on creating intuitive, high-performance web applications. I enjoy transforming complex problems into elegant, scalable solutions using modern technologies and fluid animations.",
  email: "hello@uddhavpatil.com",
  socials: {
    github: "https://github.com/uddhavpatil",
    linkedin: "https://linkedin.com/in/uddhavpatil",
    twitter: "https://twitter.com/uddhavpatil",
  },
  metrics: [
    { label: "Years Experience", value: 3 },
    { label: "Projects Completed", value: 15 },
    { label: "Happy Clients", value: 8 }
  ],
  skills: {
    frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Redux"],
    backend: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Prisma", "REST APIs"],
    tools: ["Git", "Docker", "AWS", "Vercel", "Figma", "Postman"]
  },
  projects: [
    {
      id: 1,
      title: "Nova Dashboard",
      description: "A modern analytics dashboard with real-time data visualization and customizable widgets.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000",
      tags: ["Next.js", "Tailwind", "Recharts"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 2,
      title: "E-Commerce Storefront",
      description: "Headless e-commerce platform with seamless checkout and inventory management.",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=2000",
      tags: ["React", "Stripe", "Supabase"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 3,
      title: "AI Chat Interface",
      description: "Minimalist chat application integrating multiple LLM APIs for developer productivity.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2000",
      tags: ["TypeScript", "OpenAI", "GSAP"],
      liveUrl: "#",
      githubUrl: "#"
    }
  ]
};
