import Image from "next/image";
import { LocalizedText } from "./localized-text";
import ProjectMarquee from "./project-marquee";
import { marqueeProjects, projects, type Project } from "./projects-data";

/**
 * Server component. The section shell and every project card are rendered on the
 * server and passed into the client <ProjectMarquee> as children, so the cards
 * never hydrate as client components — only the marquee shell runs on the client.
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

      <ProjectMarquee>
        <div className="project-marquee__track">
          {[0, 1].map((groupIndex) => (
            <div
              key={groupIndex}
              aria-hidden={groupIndex === 1 || undefined}
              className="project-marquee__group"
            >
              {marqueeProjects.map((project, projectIndex) => (
                <ProjectCard
                  key={`${project.name}-${groupIndex}-${projectIndex}`}
                  isDuplicate={groupIndex === 1 || projectIndex >= projects.length}
                  project={project}
                  projectIndex={projectIndex % projects.length}
                />
              ))}
            </div>
          ))}
        </div>
      </ProjectMarquee>
    </section>
  );
}

function ProjectCard({
  isDuplicate,
  project,
  projectIndex,
}: {
  isDuplicate: boolean;
  project: Project;
  projectIndex: number;
}) {
  return (
    <article className="project-marquee__item">
      <button
        type="button"
        aria-label={`Buka detail project ${project.name}`}
        tabIndex={isDuplicate ? -1 : 0}
        data-project-index={projectIndex}
        className="group flex h-full w-full flex-col rounded-lg border border-white/10 bg-brand-dark p-4 text-left shadow-[0_18px_45px_rgba(0,0,0,0.24)] transition hover:-translate-y-1 hover:border-brand-cyan/60 hover:bg-brand-surface focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:ring-offset-2 focus:ring-offset-brand-night"
      >
        <span className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/10 bg-white/5">
          <Image
            src={project.image}
            alt={project.imageAlt}
            width={1200}
            height={896}
            sizes="(min-width: 1024px) 21rem, (min-width: 640px) 18rem, 16rem"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </span>
        <span className="flex grow flex-col pt-4">
          <span className="inline-flex w-fit rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-3 py-1 text-xs font-bold text-brand-cyan">
            <LocalizedText id={project.categoryId}>{project.category}</LocalizedText>
          </span>
          <span className="mt-3 block text-lg font-black leading-tight text-white">
            {project.name}
          </span>
          <span className="mt-2 block text-sm leading-6 text-slate-400">
            <LocalizedText id={project.descriptionId}>{project.description}</LocalizedText>
          </span>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-lime">
            <LocalizedText id="project.view">Lihat detail</LocalizedText>
            <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </span>
        </span>
      </button>
    </article>
  );
}
