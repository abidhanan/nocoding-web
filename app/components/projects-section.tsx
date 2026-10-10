import { LocalizedText } from "./localized-text";
import ProjectMarquee from "./project-marquee";
import { projects } from "./projects-data";

/**
 * Server component for the section shell. The scrolling cards are rendered on the
 * client only once the section approaches the viewport (see <ProjectMarquee>), so
 * they do not weigh down the initial HTML. A plain list of the projects stays in
 * the markup for search engines and assistive technology.
 */
export default function ProjectsSection() {
  return (
    <section id="project" aria-labelledby="project-title" className="flex min-h-[calc(100svh-4rem)] flex-col justify-center overflow-hidden border-y border-white/10 bg-brand-night py-8 sm:py-10">
      <div className="mx-auto w-full max-w-[21.5rem] px-6 text-center sm:max-w-3xl">
        <h2 id="project-title" className="text-sm font-bold uppercase text-brand-cyan">
          <LocalizedText id="projects.eyebrow">Project sebelumnya</LocalizedText>
        </h2>
        <p className="mt-4 leading-8 text-slate-400">
          <LocalizedText id="projects.description">
            Setiap project dirancang untuk menyampaikan pesan bisnis dengan jelas, tampil responsif di semua perangkat, dan memudahkan pengguna mengambil tindakan.
          </LocalizedText>
        </p>
      </div>

      <ProjectMarquee />

      <ul className="sr-only">
        {projects.map((project) => (
          <li key={project.name}>
            {project.name}: {project.description}
          </li>
        ))}
      </ul>
    </section>
  );
}
