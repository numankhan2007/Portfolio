import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Education } from "@/components/sections/Education";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { OpenSource } from "@/components/sections/OpenSource";
import { Certificates } from "@/components/sections/Certificates";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <div className="relative z-10 flex flex-col">
        <Hero />
        
        {/* We use a solid background for the content below the fold to hide the 3D scene */}
        <div className="bg-bg-dark border-t border-glass shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
          <About />
          <Education />
          <Skills />
          <Projects />
          <OpenSource />
          <Certificates />
          <Contact />
        </div>
      </div>
    </>
  );
}
