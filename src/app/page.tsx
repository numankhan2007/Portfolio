import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Education } from "@/components/sections/Education";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { OpenSource } from "@/components/sections/OpenSource";
import { Certificates } from "@/components/sections/Certificates";
import { Contact } from "@/components/sections/Contact";
import { WorldEnvironment } from "@/components/ui/WorldEnvironment";

export default function Home() {
  return (
    <WorldEnvironment>
      <div className="relative z-10 flex flex-col">
        <Hero />
        
        {/* We remove the opaque background block here so the WorldEnvironment shines through */}
        <div className="relative z-20">
          <About />
          <Education />
          <Skills />
          <Projects />
          <OpenSource />
          <Certificates />
          <Contact />
        </div>
      </div>
    </WorldEnvironment>
  );
}
