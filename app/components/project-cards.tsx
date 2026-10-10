"use client";

import Image from "next/image";
import { LocalizedText } from "./localized-text";
import { projects, type Project } from "./projects-data";

/**
 * The marquee track. It is loaded lazily (see <ProjectMarquee>) so the project
 * cards are not part of the initial HTML / RSC payload. Two groups are rendered
 * so the loop can wrap seamlessly; the second one is hidden from assistive tech.
 */
export default function ProjectCards() {
  return (
    <div className="project-marquee__track">
      <div className="project-marquee__group">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
      <div aria-hidden="true" inert className="project-marquee__group">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-marquee__item">
      <div className="flex h-full w-full flex-col rounded-lg border border-white/10 bg-brand-dark p-4 text-left shadow-[0_18px_45px_rgba(0,0,0,0.24)]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/10 bg-white/5">
          <Image
            src={project.image}
            alt={project.imageAlt}
            width={1200}
            height={896}
            sizes="(min-width: 1024px) 21rem, (min-width: 640px) 18rem, 16rem"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex grow flex-col pt-4">
          <div className="flex items-center gap-3">
            <span
              className={`grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-lg ${
                project.logo
                  ? `${project.logoOnDark ? "bg-brand-night" : "bg-white"} p-1.5`
                  : "border border-brand-cyan/30 bg-brand-cyan/10 text-base font-black text-brand-cyan"
              }`}
            >
              {project.logo ? (
                <Image
                  src={project.logo}
                  alt=""
                  width={40}
                  height={40}
                  unoptimized
                  className="h-full w-full object-contain"
                />
              ) : (
                project.name.charAt(0)
              )}
            </span>
            <h3 className="text-lg font-black leading-tight text-white">{project.name}</h3>
          </div>
          <p className="mb-4 mt-2 text-sm leading-6 text-slate-400">
            <LocalizedText id={project.descriptionId}>{project.description}</LocalizedText>
          </p>
          <span className="mt-auto inline-flex w-fit rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-3 py-1 text-xs font-bold text-brand-cyan">
            <LocalizedText id={project.categoryId}>{project.category}</LocalizedText>
          </span>
        </div>
      </div>
    </article>
  );
}
