import { AboutSection } from '@/components/sections/about-section/about-section';
import { ContactSection } from '@/components/sections/contact-section/contact-section';
import { ExperienceSection } from '@/components/sections/experience-section/experience-section';
import { FeaturedWorkSection } from '@/components/sections/featured-work-section/featured-work-section';
import { HarmonicStageHero } from '@/components/hero/harmonic-stage-hero/harmonic-stage-hero';
import { MusicLabSection } from '@/components/sections/music-lab-section/music-lab-section';
import { SkillsSection } from '@/components/sections/skills-section/skills-section';

export default function Home() {
  return (
    <>
      <HarmonicStageHero />
      <FeaturedWorkSection />
      <MusicLabSection />
      <ExperienceSection />
      <SkillsSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
