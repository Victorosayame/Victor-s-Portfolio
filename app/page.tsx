import Navbar from "@/components/navbar";
import Hero from "@/components/hero";

import { getPortfolioContent, PortfolioContent } from "@/lib/portfolio-content";
import WorkSection from "@/components/work-section";
import ResumeContact from "@/components/resume-contact";
import { getPublicProfile } from "@/lib/portfolio/get-public-profile";
import HeroTechStack from "@/components/hero-tech-stack";
import Footer from "@/components/footer";

export default async function Home() {
  const content = getPortfolioContent();
  const profile = await getPublicProfile();

  const publicContent: PortfolioContent = profile
    ? {
        ...content,
        profile: {
          ...content.profile,
          preferredName: profile.preferredName,
          fullName: profile.fullName,
          headline: profile.headline,
          shortBio: profile.bio,
          location: profile.location,
          availability: profile.availability ?? content.profile.availability,
          portraitAsset: profile.photoUrl ?? undefined,
        },
      }
    : content;

  return (
    <main>
      <Navbar
        preferredName={publicContent.profile.preferredName}
      />

      <Hero content={publicContent} />

      <HeroTechStack />

      <WorkSection />
      {/* this section is for prior work, but I have commented it out for now because I don't have any prior work to show yet. I will add this section back in once I have some prior work to showcase. but we will have to add that to admin and CMS first,a future improvement */}
      {/* {<PriorWork content={publicContent} />} */}

      <ResumeContact />
      <Footer />
    </main>
  );
}