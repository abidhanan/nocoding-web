"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { LocalizedText, useLocalizedText } from "./i18n";

type Project = {
  name: string;
  category: string;
  categoryId: string;
  description: string;
  descriptionId: string;
  image: string;
  imageAlt: string;
  videos?: Array<{
    label: string;
    labelId: string;
    src: string;
  }>;
  tags: string[];
};

const projects = [
  {
    name: "Ecoswap",
    category: "Website jual beli barang bekas",
    categoryId: "project.category.ecoswap",
    description:
      "Marketplace pre-loved yang membantu pengguna menjual dan membeli barang bekas dengan tampilan modern, pesan brand yang jelas, dan pengalaman responsif.",
    descriptionId: "project.description.ecoswap",
    image: "/projects/ecoswap-website-jual-beli-barang-bekas.jpeg",
    imageAlt: "Mockup website Ecoswap di laptop dan ponsel",
    videos: [
      {
        label: "Landing page Ecoswap",
        labelId: "project.media.ecoswap.landing",
        src: "/projects/ecoswap-landing-page.mp4",
      },
      {
        label: "Isi website Ecoswap",
        labelId: "project.media.ecoswap.content",
        src: "/projects/ecoswap-isi.mp4",
      },
    ],
    tags: ["Marketplace", "Pre-loved", "Video walkthrough", "Responsive website"],
  },
  {
    name: "Wiboost Store",
    category: "Website layanan digital",
    categoryId: "project.category.wiboost",
    description:
      "Website layanan suntik sosmed, top up game, isi paket data, dan aplikasi premium dengan tampilan ringan, ramah mobile, dan alur pembelian yang langsung jelas.",
    descriptionId: "project.description.wiboost",
    image: "/projects/wiboost-store-website-layanan-digital.jpeg",
    imageAlt: "Mockup website Wiboost Store di laptop dan ponsel",
    videos: [
      {
        label: "Landing page Wiboost Store",
        labelId: "project.media.wiboost.landing",
        src: "/projects/wiboost-store-landing-page.mp4",
      },
      {
        label: "Isi website Wiboost Store",
        labelId: "project.media.wiboost.content",
        src: "/projects/wiboost-store-isi-website.mp4",
      },
    ],
    tags: ["Suntik sosmed", "Top up game", "Paket data", "Aplikasi premium"],
  },
  {
    name: "AHAWI Portfolio",
    category: "Website portofolio",
    categoryId: "project.category.ahawi",
    description:
      "Website portofolio personal untuk menampilkan profil profesional, pengalaman, aktivitas, sertifikat, dan kontak dalam tampilan visual yang responsif.",
    descriptionId: "project.description.ahawi",
    image: "/projects/ahawi-portfolio-website-portofolio.jpeg",
    imageAlt: "Mockup website portofolio AHAWI di laptop dan ponsel",
    videos: [
      {
        label: "Video AHAWI Portfolio",
        labelId: "project.media.ahawi.video",
        src: "/projects/ahawi-portfolio-video.mp4",
      },
    ],
    tags: ["Personal branding", "Portfolio", "Responsive website"],
  },
  {
    name: "Abdi Dalem Keraton Kasunanan Surakarta Hadiningrat",
    category: "Website manajemen database",
    categoryId: "project.category.abdi",
    description:
      "Portal manajemen database abdi dalem untuk pendaftaran, pengelolaan biodata, verifikasi, dan pencetakan ID Card dengan tampilan resmi dan mudah digunakan.",
    descriptionId: "project.description.abdi",
    image: "/projects/abdi-dalem-keraton-kasunanan-surakarta-hadiningrat.jpeg",
    imageAlt:
      "Mockup website manajemen database Abdi Dalem Keraton Kasunanan Surakarta Hadiningrat di laptop dan ponsel",
    videos: [
      {
        label: "Landing page Abdi Dalem",
        labelId: "project.media.abdi.landing",
        src: "/projects/abdi-dalem-landing-page.mp4",
      },
      {
        label: "Isi website Abdi Dalem",
        labelId: "project.media.abdi.content",
        src: "/projects/abdi-dalem-isi-website.mp4",
      },
    ],
    tags: ["Database", "Pendaftaran", "Verifikasi", "ID Card"],
  },
] satisfies Project[];

const marqueeProjects = Array.from({ length: 4 }, () => projects).flat();
const contactEmail = "nocodingindonesia@gmail.com";

function createProjectConsultHref(projectName: string) {
  const subject = encodeURIComponent(`Konsultasi Project Serupa - ${projectName}`);
  const body = encodeURIComponent(
    `Halo Nocoding,\n\nSaya tertarik konsultasi project serupa dengan ${projectName}. Mohon info langkah berikutnya.\n\nTerima kasih.`,
  );

  return `https://mail.google.com/mail/?view=cm&fs=1&to=${contactEmail}&su=${subject}&body=${body}`;
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!selectedProject) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    const scrollKeys = new Set([
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "End",
      "Home",
      "PageDown",
      "PageUp",
      " ",
    ]);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
        return;
      }

      if (scrollKeys.has(event.key)) {
        event.preventDefault();
      }
    };

    document.body.style.setProperty("overflow", "hidden", "important");
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedProject]);

  return (
    <>
      <section id="project" className="flex min-h-[calc(100svh-4rem)] flex-col justify-center overflow-hidden border-y border-white/10 bg-brand-night py-8 sm:py-10">
        <div className="mx-auto w-full max-w-[21.5rem] px-6 text-center sm:max-w-3xl">
          <p className="text-sm font-bold uppercase text-brand-cyan">
            <LocalizedText id="projects.eyebrow">Project sebelumnya</LocalizedText>
          </p>
          <p className="mt-4 leading-8 text-slate-400">
            <LocalizedText id="projects.description">
              Setiap project dibuat untuk membawa pesan bisnis ke halaman yang lebih jelas, lebih siap dibuka di semua perangkat, dan lebih mudah ditindaklanjuti pengguna.
            </LocalizedText>
          </p>
        </div>

        <div className="project-marquee mt-8" aria-label="Daftar project sebelumnya yang bergerak dari kanan ke kiri">
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
                    onSelect={setSelectedProject}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
      <ProjectOverlay
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}

function ProjectCard({
  isDuplicate,
  onSelect,
  project,
}: {
  isDuplicate: boolean;
  onSelect: (project: Project) => void;
  project: Project;
}) {
  const viewDetailLabel = useLocalizedText("project.view", "Lihat detail");

  return (
    <article className="project-marquee__item">
      <button
        type="button"
        aria-label={`Buka detail project ${project.name}`}
        tabIndex={isDuplicate ? -1 : 0}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onSelect(project);
        }}
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
            {viewDetailLabel}
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

function ProjectOverlay({
  onClose,
  project,
}: {
  onClose: () => void;
  project: Project | null;
}) {
  const closeLabel = useLocalizedText("project.close", "Tutup detail project");

  if (!project || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      data-project-overlay-scroll
      className="fixed inset-0 z-[80] flex min-h-[100dvh] items-start justify-center overflow-y-auto overscroll-contain bg-brand-dark/88 px-3 py-3 backdrop-blur-xl sm:grid sm:place-items-center sm:px-6"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-detail-title"
        className="relative my-auto w-full max-w-3xl overflow-y-auto overscroll-contain rounded-lg border border-white/10 bg-brand-night p-2.5 pb-8 shadow-2xl shadow-black/50 sm:max-h-[calc(100dvh-2rem)] sm:p-3 sm:pb-10"
      >
        <div className="mb-2 flex items-center justify-between gap-4">
          <span className="text-[0.68rem] font-black uppercase text-slate-500">
            <LocalizedText id="project.detail">Project detail</LocalizedText>
          </span>
          <button
            type="button"
            aria-label={closeLabel}
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full border border-white/10 text-xs font-black text-white transition hover:border-brand-cyan hover:text-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan"
          >
            X
          </button>
        </div>

        <div className="grid gap-3">
          <ProjectMedia key={project.name} project={project} />

          <div className="text-left">
            <p className="inline-flex rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-2.5 py-0.5 text-[0.7rem] font-bold text-brand-cyan">
              <LocalizedText id={project.categoryId}>{project.category}</LocalizedText>
            </p>
            <h3 id="project-detail-title" className="mt-2 text-2xl font-black leading-tight text-white">
              {project.name}
            </h3>
            <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-300">
              <LocalizedText id={project.descriptionId}>{project.description}</LocalizedText>
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[0.7rem] font-bold text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-3 flex justify-end pb-4 sm:pb-6">
              <a
                href={createProjectConsultHref(project.name)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-9 items-center justify-center rounded-full bg-brand-cyan px-4 py-2 text-xs font-bold text-brand-dark transition hover:bg-brand-lime focus:outline-none focus:ring-2 focus:ring-brand-lime focus:ring-offset-2 focus:ring-offset-brand-night"
              >
                <LocalizedText id="project.consult">Konsultasi project serupa</LocalizedText>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function ProjectMedia({ project }: { project: Project }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const mediaViewportRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef({
    isDragging: false,
    pointerId: 0,
    scrollLeft: 0,
    startX: 0,
  });
  const mediaItems = [
    {
      label: "Foto mockup",
      labelId: "project.media.mockup",
      type: "image" as const,
      src: project.image,
    },
    ...(project.videos?.map((video) => ({
      label: video.label,
      labelId: video.labelId,
      type: "video" as const,
      src: video.src,
    })) ?? []),
  ];
  const hasMultipleMedia = mediaItems.length > 1;

  useEffect(() => {
    const videos = mediaViewportRef.current?.querySelectorAll("video") ?? [];

    videos.forEach((video) => {
      const isActive = Number(video.dataset.mediaIndex) === activeIndex;

      try {
        video.currentTime = 0;
      } catch {
        // Video metadata may not be ready yet; autoplay will still begin from the start.
      }

      if (isActive) {
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    });
  }, [activeIndex]);

  const syncActiveMedia = () => {
    const viewport = mediaViewportRef.current;

    if (!viewport) {
      return;
    }

    const slides = Array.from(
      viewport.querySelectorAll<HTMLElement>("[data-project-media-slide]"),
    );

    if (!slides.length) {
      return;
    }

    const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    slides.forEach((slide, index) => {
      const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
      const distance = Math.abs(slideCenter - viewportCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex((currentIndex) =>
      currentIndex === closestIndex ? currentIndex : closestIndex,
    );
  };

  const scrollToMedia = (index: number) => {
    const viewport = mediaViewportRef.current;
    const slide = viewport?.querySelectorAll<HTMLElement>("[data-project-media-slide]")[index];

    if (!viewport || !slide) {
      return;
    }

    viewport.scrollTo({ behavior: "smooth", left: slide.offsetLeft });
    setActiveIndex(index);
  };

  const startDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const viewport = mediaViewportRef.current;

    if (!viewport) {
      return;
    }

    dragStateRef.current = {
      isDragging: true,
      pointerId: event.pointerId,
      scrollLeft: viewport.scrollLeft,
      startX: event.clientX,
    };
    viewport.setPointerCapture(event.pointerId);
  };

  const moveDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const viewport = mediaViewportRef.current;
    const dragState = dragStateRef.current;

    if (!viewport || !dragState.isDragging || dragState.pointerId !== event.pointerId) {
      return;
    }

    event.preventDefault();
    viewport.scrollLeft = dragState.scrollLeft - (event.clientX - dragState.startX);
  };

  const stopDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const viewport = mediaViewportRef.current;
    const dragState = dragStateRef.current;

    if (!viewport || dragState.pointerId !== event.pointerId) {
      return;
    }

    dragStateRef.current.isDragging = false;

    if (viewport.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }

    syncActiveMedia();
  };

  return (
    <div className="mx-auto w-full max-w-[38rem] overflow-hidden rounded-lg bg-brand-dark">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-brand-surface px-3 py-2">
        <span className="text-xs font-black uppercase text-brand-cyan">
          <LocalizedText id={mediaItems[activeIndex].labelId}>{mediaItems[activeIndex].label}</LocalizedText>
        </span>
        {hasMultipleMedia ? (
          <span className="text-xs font-bold text-slate-500">
            {activeIndex + 1} / {mediaItems.length}
          </span>
        ) : null}
      </div>

      <div className="relative aspect-[1.774] overflow-hidden bg-brand-dark">
        <div
          ref={mediaViewportRef}
          className="project-detail-media__viewport flex h-full snap-x snap-mandatory overflow-x-auto"
          onPointerDown={startDrag}
          onPointerLeave={stopDrag}
          onPointerMove={moveDrag}
          onPointerUp={stopDrag}
          onScroll={syncActiveMedia}
        >
          {mediaItems.map((item, index) => (
            <div
              key={`${item.type}-${item.src}`}
              data-project-media-slide
              className="relative grid h-full min-w-full snap-center place-items-center bg-brand-dark"
            >
              {item.type === "image" ? (
                <Image
                  src={item.src}
                  alt={project.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 38rem, 92vw"
                  className="bg-white object-contain"
                  priority
                />
              ) : (
                <video
                  className="pointer-events-none h-full w-full bg-brand-dark object-contain"
                  autoPlay={index === activeIndex}
                  data-media-index={index}
                  disablePictureInPicture
                  loop
                  muted
                  playsInline
                  poster={project.image}
                  preload="metadata"
                  controlsList="nofullscreen nodownload noremoteplayback"
                >
                  <source src={item.src} type="video/mp4" />
                  Browser Anda tidak mendukung pemutar video.
                </video>
              )}
            </div>
          ))}
        </div>
      </div>
      {hasMultipleMedia ? (
        <div className="flex items-center justify-center gap-2 bg-brand-dark px-3 py-3">
          {mediaItems.map((item, index) => (
            <button
              key={`${item.type}-${item.src}-dot`}
              type="button"
              aria-label={`Tampilkan ${item.label}`}
              aria-current={activeIndex === index ? "true" : undefined}
              onClick={() => scrollToMedia(index)}
              className="h-2.5 w-2.5 rounded-full border border-brand-cyan/60 bg-transparent transition hover:border-brand-lime focus:outline-none focus:ring-2 focus:ring-brand-cyan data-[active=true]:w-7 data-[active=true]:border-brand-cyan data-[active=true]:bg-brand-cyan"
              data-active={activeIndex === index}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
