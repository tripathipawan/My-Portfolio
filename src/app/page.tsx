"use client";
import { useState } from "react";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Skills from "@/components/sections/Skills";
import Certifications from "@/components/sections/Certifications";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Loader from "@/components/ui/Loader";

export default function Home() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <Loader onDone={() => setReady(true)} />
      <Navbar ready={ready} />
      <main className="flex flex-col">
        {/* ScrollyCanvas acts as the Hero section at the top */}
        <ScrollyCanvas />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Certifications />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
