import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import ProjectsTeaser from "@/components/sections/ProjectsTeaser";
import Work from "@/components/sections/Work";
import Skills from "@/components/sections/Skills";
import ClaudeStack from "@/components/sections/ClaudeStack";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main className="snap-container">
        <Hero />
        <About />
        <ProjectsTeaser />
        <Work />
        <Skills />
        <ClaudeStack />
        <Contact />
      </main>
    </>
  );
}
