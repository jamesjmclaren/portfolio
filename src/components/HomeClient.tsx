"use client";

import { useDesign } from "@/context/DesignContext";
import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import ProjectsTeaser from "@/components/sections/ProjectsTeaser";
import Work from "@/components/sections/Work";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import D2HomePage from "@/components/design2/D2HomePage";

export default function HomeClient() {
  const { design } = useDesign();

  if (design === 2) return <D2HomePage />;

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <ProjectsTeaser />
        <Work />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
