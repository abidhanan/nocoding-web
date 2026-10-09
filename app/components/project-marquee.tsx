"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useLocalizedText } from "./i18n";
import { LocalizedText } from "./localized-text";
import { createProjectConsultHref, projects, type Project } from "./projects-data";

/**
 * Interactive shell for the projects marquee. The cards themselves are rendered
 * on the server and handed in as `children`, so they never hydrate as client
 * components — only this shell (auto-scroll, drag, click delegation, overlay)
 * runs on the client.
 */
export default function ProjectMarquee({ children }: { children: ReactNode }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const loopWidthRef = useRef(0);
  const blockCardClickRef = useRef(false);
  const isPointerOverRef = useRef(false);
  const dragStateRef = useRef({
    hasCaptured: false,
    isDragging: false,
    pointerId: 0,
    scrollLeft: 0,
    startX: 0,
  });

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

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return undefined;
    }

    // Cache the loop width instead of reading `scrollWidth` every frame, which
    // forces a synchronous layout (reflow) on each tick. This is the reflow fix;
    // the loop itself always runs (the browser already pauses rAF for hidden
    // tabs) so the marquee reliably scrolls from right to left.
    const measureLoopWidth = () => {
      loopWidthRef.current = viewport.scrollWidth / 2;
    };

    measureLoopWidth();

    let lastTime = 0;

    const tick = () => {
      const time = window.performance.now();
      const previousTime = lastTime || time;
      const deltaTime = Math.min(time - previousTime, 64);
      const loopWidth = loopWidthRef.current;

      lastTime = time;

      if (!dragStateRef.current.isDragging && !isPointerOverRef.current && loopWidth > 0) {
        let nextScrollLeft = viewport.scrollLeft + deltaTime * 0.05;

        if (nextScrollLeft >= loopWidth) {
          nextScrollLeft -= loopWidth;
        }

        viewport.scrollLeft = nextScrollLeft;
      }
    };

    const intervalId = window.setInterval(tick, 16);
    const resizeObserver = new ResizeObserver(measureLoopWidth);
    resizeObserver.observe(viewport);

    return () => {
      window.clearInterval(intervalId);
      resizeObserver.disconnect();
    };
  }, []);

  const startDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    dragStateRef.current = {
      hasCaptured: false,
      isDragging: true,
      pointerId: event.pointerId,
      scrollLeft: viewport.scrollLeft,
      startX: event.clientX,
    };
  };

  const moveDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    const dragState = dragStateRef.current;

    if (!viewport || !dragState.isDragging || dragState.pointerId !== event.pointerId) {
      return;
    }

    const distance = event.clientX - dragState.startX;

    if (Math.abs(distance) > 5) {
      blockCardClickRef.current = true;

      if (!dragState.hasCaptured) {
        viewport.setPointerCapture(event.pointerId);
        dragState.hasCaptured = true;
      }
    }

    const loopWidth = loopWidthRef.current;
    let nextScrollLeft = dragState.scrollLeft - distance;

    if (loopWidth > 0) {
      if (nextScrollLeft < 0) {
        nextScrollLeft += loopWidth;
      } else if (nextScrollLeft >= loopWidth) {
        nextScrollLeft -= loopWidth;
      }
    }

    viewport.scrollLeft = nextScrollLeft;
  };

  const stopDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    const dragState = dragStateRef.current;

    if (event.type === "pointerleave") {
      isPointerOverRef.current = false;
    }

    if (!viewport || dragState.pointerId !== event.pointerId) {
      return;
    }

    dragStateRef.current.isDragging = false;

    if (dragState.hasCaptured && viewport.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }

    window.setTimeout(() => {
      blockCardClickRef.current = false;
    }, 80);
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const isHorizontalIntent = Math.abs(event.deltaX) > Math.abs(event.deltaY) * 1.25;
    const delta = event.shiftKey ? event.deltaY : event.deltaX;

    if (!event.shiftKey && !isHorizontalIntent) {
      return;
    }

    if (Math.abs(delta) < 1) {
      return;
    }

    event.preventDefault();
    const loopWidth = loopWidthRef.current;
    let nextScrollLeft = viewport.scrollLeft + delta;

    if (loopWidth > 0) {
      if (nextScrollLeft < 0) {
        nextScrollLeft += loopWidth;
      } else if (nextScrollLeft >= loopWidth) {
        nextScrollLeft -= loopWidth;
      }
    }

    viewport.scrollLeft = nextScrollLeft;
  };

  // A single delegated handler opens the overlay for whichever server-rendered
  // card button was activated (mouse or keyboard), unless a drag just happened.
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (blockCardClickRef.current) {
      return;
    }

    const button = (event.target as HTMLElement).closest<HTMLElement>("[data-project-index]");

    if (!button) {
      return;
    }

    const project = projects[Number(button.dataset.projectIndex)];

    if (project) {
      setSelectedProject(project);
    }
  };

  return (
    <>
      <div
        ref={viewportRef}
        className="project-marquee mt-8"
        aria-label="Daftar project sebelumnya yang bergerak dari kanan ke kiri"
        onPointerDown={startDrag}
        onPointerEnter={() => {
          isPointerOverRef.current = true;
        }}
        onPointerCancel={stopDrag}
        onPointerLeave={stopDrag}
        onPointerMove={moveDrag}
        onPointerUp={stopDrag}
        onLostPointerCapture={stopDrag}
        onWheel={handleWheel}
        onClick={handleClick}
      >
        {children}
      </div>
      <ProjectOverlay project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
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
      className="project-detail-overlay fixed inset-0 z-[80] flex min-h-[100dvh] items-start justify-center overscroll-contain bg-brand-dark/88 px-3 py-3 backdrop-blur-xl sm:grid sm:place-items-center sm:px-6"
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
        className="project-detail-dialog relative my-auto w-full max-w-3xl rounded-lg border border-white/10 bg-brand-night p-2.5 pb-5 shadow-2xl shadow-black/50 sm:max-h-[calc(100dvh-1.5rem)] sm:max-w-[38rem] sm:overflow-hidden sm:p-2.5 sm:pb-2.5"
      >
        <div className="mb-2 flex items-center justify-between gap-4 sm:mb-1.5">
          <span className="text-[0.68rem] font-black uppercase text-slate-400">
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

        <div className="grid gap-3 sm:gap-2.5">
          <ProjectMedia key={project.name} project={project} />

          <div className="text-left">
            <p className="inline-flex rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-2.5 py-0.5 text-[0.7rem] font-bold text-brand-cyan sm:px-2 sm:text-[0.66rem]">
              <LocalizedText id={project.categoryId}>{project.category}</LocalizedText>
            </p>
            <h3 id="project-detail-title" className="mt-2 text-2xl font-black leading-tight text-white sm:mt-1.5 sm:text-xl">
              {project.name}
            </h3>
            <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-300 sm:mt-1.5 sm:text-[0.82rem] sm:leading-5">
              <LocalizedText id={project.descriptionId}>{project.description}</LocalizedText>
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-2 sm:gap-1">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[0.7rem] font-bold text-slate-300 sm:px-2 sm:py-0.5 sm:text-[0.64rem]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-5 flex justify-end pb-6 sm:mt-2 sm:-translate-y-3 sm:pb-0">
              <a
                href={createProjectConsultHref(project.name)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-9 items-center justify-center rounded-full bg-brand-cyan px-4 py-2 text-xs font-bold text-brand-dark transition hover:bg-brand-lime focus:outline-none focus:ring-2 focus:ring-brand-lime focus:ring-offset-2 focus:ring-offset-brand-night sm:min-h-8 sm:px-3.5 sm:py-1.5 sm:text-[0.72rem]"
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
  const mediaTrackRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const positionRef = useRef(0);
  const targetPositionRef = useRef(0);
  const dragStateRef = useRef({
    isDragging: false,
    hasMoved: false,
    lastX: 0,
    pointerId: 0,
    previousTime: 0,
    previousX: 0,
    startIndex: 0,
    startPosition: 0,
    startX: 0,
    velocityX: 0,
  });
  const wheelSnapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wheelOffsetRef = useRef(0);
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
      fallbackSrc: video.fallbackSrc,
    })) ?? []),
  ];
  const hasMultipleMedia = mediaItems.length > 1;

  const clampMediaIndex = (index: number) => {
    return Math.min(mediaItems.length - 1, Math.max(0, index));
  };

  const getSlidePosition = (index: number, offset = 0) => {
    const viewport = mediaViewportRef.current;

    return viewport ? -index * viewport.clientWidth + offset : 0;
  };

  const applyTrackPosition = (position: number) => {
    const track = mediaTrackRef.current;

    if (!track) {
      return;
    }

    track.style.transform = `translateX(${position}px)`;
  };

  const prepareVideoForMobile = useCallback((video: HTMLVideoElement, shouldRestart = true) => {
    video.muted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.preload = "auto";

    if (shouldRestart) {
      try {
        video.currentTime = 0;
      } catch {
        // Video metadata may not be ready yet; autoplay will still begin from the start.
      }
    }

    if (video.readyState === 0) {
      video.load();
    }

    void video.play().catch(() => undefined);
  }, []);

  const playMediaVideo = useCallback((index: number, shouldRestart = true) => {
    const video = mediaViewportRef.current?.querySelector<HTMLVideoElement>(
      `video[data-media-index="${index}"]`,
    );

    if (!video) {
      return;
    }

    prepareVideoForMobile(video, shouldRestart);
  }, [prepareVideoForMobile]);

  const stopTrackAnimation = () => {
    if (!animationFrameRef.current) {
      return;
    }

    window.cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = null;
  };

  const animateTrack = () => {
    const currentPosition = positionRef.current;
    const targetPosition = targetPositionRef.current;
    const distance = targetPosition - currentPosition;

    if (Math.abs(distance) < 0.22) {
      positionRef.current = targetPosition;
      applyTrackPosition(targetPosition);
      animationFrameRef.current = null;
      return;
    }

    const ease = dragStateRef.current.isDragging ? 0.46 : 0.22;
    const nextPosition = currentPosition + distance * ease;

    positionRef.current = nextPosition;
    applyTrackPosition(nextPosition);
    animationFrameRef.current = window.requestAnimationFrame(animateTrack);
  };

  const setTrackTarget = (position: number, immediate = false) => {
    targetPositionRef.current = position;

    if (immediate) {
      stopTrackAnimation();
      positionRef.current = position;
      applyTrackPosition(position);
      return;
    }

    if (!animationFrameRef.current) {
      animationFrameRef.current = window.requestAnimationFrame(animateTrack);
    }
  };

  const activateMediaIndex = (index: number, immediate = false) => {
    const nextIndex = clampMediaIndex(index);

    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
    setTrackTarget(getSlidePosition(nextIndex), immediate);

    if (mediaItems[nextIndex]?.type === "video") {
      playMediaVideo(nextIndex);
    }
  };

  useEffect(() => {
    const videos = mediaViewportRef.current?.querySelectorAll("video") ?? [];

    videos.forEach((video) => {
      const isActive = Number(video.dataset.mediaIndex) === activeIndex;

      video.muted = true;
      video.playsInline = true;
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
      video.preload = "auto";

      if (isActive) {
        window.setTimeout(() => {
          prepareVideoForMobile(video);
        }, 80);
      } else {
        video.pause();

        try {
          video.currentTime = 0;
        } catch {
          // Ignore videos that are not ready yet.
        }
      }
    });
  }, [activeIndex, prepareVideoForMobile]);

  useEffect(() => {
    return () => {
      if (wheelSnapTimeoutRef.current) {
        clearTimeout(wheelSnapTimeoutRef.current);
      }

      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const viewport = mediaViewportRef.current;

    if (!viewport) {
      return;
    }

    const syncPosition = () => {
      const track = mediaTrackRef.current;
      const position = -activeIndexRef.current * viewport.clientWidth;

      targetPositionRef.current = position;
      positionRef.current = position;

      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      if (track) {
        track.style.transform = `translateX(${position}px)`;
      }
    };

    syncPosition();

    const resizeObserver = new ResizeObserver(syncPosition);
    resizeObserver.observe(viewport);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const scrollToMedia = (index: number) => {
    activateMediaIndex(index);
  };

  const startDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const viewport = mediaViewportRef.current;

    if (!viewport || !hasMultipleMedia) {
      return;
    }

    event.preventDefault();
    const startX = event.clientX;
    const startTime = window.performance.now();

    dragStateRef.current = {
      isDragging: true,
      hasMoved: false,
      lastX: startX,
      pointerId: event.pointerId,
      previousTime: startTime,
      previousX: startX,
      startIndex: activeIndexRef.current,
      startPosition: getSlidePosition(activeIndexRef.current),
      startX,
      velocityX: 0,
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
    const distance = event.clientX - dragState.startX;
    const now = window.performance.now();
    const elapsed = Math.max(now - dragState.previousTime, 1);

    dragState.velocityX = (event.clientX - dragState.previousX) / elapsed;
    dragState.lastX = event.clientX;
    dragState.previousTime = now;
    dragState.previousX = event.clientX;

    if (Math.abs(distance) > 2) {
      dragState.hasMoved = true;
    }

    const isPullingPastStart = dragState.startIndex === 0 && distance > 0;
    const isPullingPastEnd = dragState.startIndex === mediaItems.length - 1 && distance < 0;
    const easedDistance = isPullingPastStart || isPullingPastEnd ? distance * 0.32 : distance;

    setTrackTarget(dragState.startPosition + easedDistance);
  };

  const stopDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const viewport = mediaViewportRef.current;
    const dragState = dragStateRef.current;

    if (!viewport || !dragState.isDragging || dragState.pointerId !== event.pointerId) {
      return;
    }

    dragStateRef.current.isDragging = false;

    if (viewport.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }

    if (dragState.hasMoved) {
      const dragDistance = dragState.lastX - dragState.startX;
      const slideThreshold = viewport.clientWidth * 0.11;
      const velocityThreshold = 0.34;
      let nextIndex = dragState.startIndex;

      if (Math.abs(dragDistance) >= slideThreshold || Math.abs(dragState.velocityX) >= velocityThreshold) {
        const direction = dragDistance < 0 ? 1 : -1;
        nextIndex = clampMediaIndex(dragState.startIndex + direction);
      }

      activateMediaIndex(nextIndex);
      return;
    }

    setTrackTarget(getSlidePosition(activeIndexRef.current));
  };

  const scrollMediaWithWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const viewport = mediaViewportRef.current;

    if (!viewport || !hasMultipleMedia) {
      return;
    }

    const isHorizontalIntent = Math.abs(event.deltaX) > Math.abs(event.deltaY) * 1.25;

    if (!isHorizontalIntent || Math.abs(event.deltaX) < 1) {
      return;
    }

    event.preventDefault();
    wheelOffsetRef.current += event.deltaX;

    const maxOffset = viewport.clientWidth * 0.38;
    const easedOffset =
      -Math.sign(wheelOffsetRef.current) *
      Math.min(Math.abs(wheelOffsetRef.current) * 0.82, maxOffset);

    setTrackTarget(getSlidePosition(activeIndexRef.current, easedOffset));

    if (wheelSnapTimeoutRef.current) {
      clearTimeout(wheelSnapTimeoutRef.current);
    }

    wheelSnapTimeoutRef.current = setTimeout(() => {
      const wheelThreshold = viewport.clientWidth * 0.1;
      let nextIndex = activeIndexRef.current;

      if (Math.abs(wheelOffsetRef.current) >= wheelThreshold) {
        nextIndex = clampMediaIndex(activeIndexRef.current + (wheelOffsetRef.current > 0 ? 1 : -1));
      }

      wheelOffsetRef.current = 0;
      activateMediaIndex(nextIndex);
    }, 120);
  };

  return (
    <div className="project-detail-media-card mx-auto w-full max-w-[38rem] overflow-hidden rounded-lg bg-brand-dark sm:max-w-[26rem]">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-brand-surface px-3 py-2 sm:px-2.5 sm:py-1.5">
        <span className="text-xs font-black uppercase text-brand-cyan sm:text-[0.68rem]">
          <LocalizedText id={mediaItems[activeIndex].labelId}>{mediaItems[activeIndex].label}</LocalizedText>
        </span>
        {hasMultipleMedia ? (
          <span className="text-xs font-bold text-slate-400 sm:text-[0.68rem]">
            {activeIndex + 1} / {mediaItems.length}
          </span>
        ) : null}
      </div>

      <div className="relative aspect-[1.774] overflow-hidden bg-brand-dark">
        <div
          ref={mediaViewportRef}
          className="project-detail-media__viewport h-full overflow-hidden"
          onPointerDown={startDrag}
          onPointerCancel={stopDrag}
          onPointerMove={moveDrag}
          onPointerUp={stopDrag}
          onLostPointerCapture={stopDrag}
          onWheel={scrollMediaWithWheel}
        >
          <div ref={mediaTrackRef} className="project-detail-media__track flex h-full">
            {mediaItems.map((item, index) => (
              <div
                key={`${item.type}-${item.src}`}
                data-project-media-slide
                className="relative grid h-full min-w-full place-items-center bg-brand-dark"
              >
                {item.type === "image" ? (
                  <Image
                    src={item.src}
                    alt={project.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 38rem, 92vw"
                    className="pointer-events-none select-none bg-white object-contain"
                    draggable={false}
                    loading="eager"
                  />
                ) : (
                  <video
                    className="project-detail-media__video pointer-events-none h-full w-full bg-brand-dark object-contain"
                    autoPlay={index === activeIndex}
                    data-media-index={index}
                    disablePictureInPicture
                    loop
                    muted
                    playsInline
                    poster={project.image}
                    preload="auto"
                    onCanPlay={(event) => {
                      if (index === activeIndexRef.current) {
                        prepareVideoForMobile(event.currentTarget, false);
                      }
                    }}
                    onLoadedData={(event) => {
                      if (index === activeIndexRef.current) {
                        prepareVideoForMobile(event.currentTarget, false);
                      }
                    }}
                    controlsList="nofullscreen nodownload noremoteplayback"
                  >
                    <source src={item.src} type="video/webm" />
                    <source src={item.fallbackSrc} type="video/mp4" />
                    Browser Anda tidak mendukung pemutaran video.
                  </video>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {hasMultipleMedia ? (
        <div className="flex items-center justify-center gap-2 bg-brand-dark px-3 py-3 sm:py-2">
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
