import { Section } from '@/components/layout/section/section';
import { ProjectCard } from '@/components/projects/project-card/project-card';
import { SectionHeading } from '@/components/ui/section-heading/section-heading';
import { featuredProjects } from '@/content/featured-projects';

export function FeaturedWorkSection() {
  return (
    <Section id="work" labelledBy="work-heading">
      <SectionHeading
        id="work-heading"
        eyebrow="01 / Selected work"
        title="Built around real needs."
        description="Personal projects across music, mobile, and community. A glimpse at what I build and the part I play."
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {featuredProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
}
