import Navbar from "@/components/navbar";
import Hero from "@/components/hero";

import { getPortfolioContent } from "@/lib/portfolio-content";
import WorkSection from "@/components/work-section";
import PriorWork from "@/components/prior-work";
import ResumeContact from "@/components/resume-contact";

export default function Home() {
  const content = getPortfolioContent();

  return (
    <main>
      <Navbar />

      <Hero content={content} />

      <WorkSection content={content} />

      <PriorWork content={content} />

      <ResumeContact content={content} />
    </main>
  );
}