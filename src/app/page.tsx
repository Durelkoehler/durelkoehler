import React from "react";
import CanvasContainer from "@/canvas/canvas-container";
import Navbar from "@/sections/navbar";
import HeroSection from "@/sections/hero";
import IntroSection from "@/sections/intro";
import ProjectsSection from "@/sections/projects";
import ExperienceSection from "@/sections/experience";
import StatsSection from "@/sections/stats";
import ContactSection from "@/sections/contact";
import Footer from "@/sections/footer";

export default function Home(): React.JSX.Element {
  return (
    <main id="main-content" className="relative min-h-screen text-white">
      {/* Film grain texture overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Cinematic scrollytelling canvas (fixed bg) */}
      <CanvasContainer />

      {/* Navigation */}
      <Navbar />

      {/* Page sections */}
      <HeroSection />
      <IntroSection />
      <ProjectsSection />
      <ExperienceSection />
      <StatsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
