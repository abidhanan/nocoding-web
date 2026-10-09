import type { ReactNode } from "react";

export type IllustrationName =
  | "portfolio"
  | "landing"
  | "system"
  | "automation"
  | "audit"
  | "design"
  | "build"
  | "review"
  | "launch"
  | "price-small"
  | "price-big";

const scenes: Record<IllustrationName, ReactNode> = {
  // --- Services ---
  portfolio: (
    <>
      <rect x="78" y="34" width="164" height="112" rx="12" fill="#111f31" stroke="#26364c" />
      <circle cx="120" cy="74" r="20" fill="#22d3ee" />
      <rect x="152" y="62" width="74" height="12" rx="6" fill="#ffffff" opacity="0.9" />
      <rect x="152" y="82" width="50" height="8" rx="4" fill="#94a3b8" />
      <rect x="96" y="112" width="130" height="8" rx="4" fill="#94a3b8" opacity="0.7" />
      <rect x="96" y="126" width="98" height="8" rx="4" fill="#94a3b8" opacity="0.45" />
      <path d="M234 34l2.6 6.4 6.9.5-5.3 4.5 1.7 6.7-5.9-3.7-5.9 3.7 1.7-6.7-5.3-4.5 6.9-.5z" fill="#a3e635" />
    </>
  ),
  landing: (
    <>
      <rect x="54" y="34" width="212" height="112" rx="12" fill="#111f31" stroke="#26364c" />
      <rect x="54" y="34" width="212" height="22" rx="12" fill="#0d1726" />
      <circle cx="70" cy="45" r="3" fill="#fb7185" />
      <circle cx="82" cy="45" r="3" fill="#f59e0b" />
      <circle cx="94" cy="45" r="3" fill="#a3e635" />
      <rect x="70" y="70" width="110" height="40" rx="6" fill="#2563eb" opacity="0.4" />
      <rect x="70" y="118" width="60" height="14" rx="7" fill="#a3e635" />
      <rect x="196" y="70" width="54" height="12" rx="6" fill="#22d3ee" opacity="0.7" />
      <rect x="196" y="90" width="54" height="10" rx="5" fill="#94a3b8" opacity="0.55" />
      <rect x="196" y="106" width="40" height="10" rx="5" fill="#94a3b8" opacity="0.4" />
    </>
  ),
  system: (
    <>
      <rect x="44" y="34" width="232" height="112" rx="12" fill="#111f31" stroke="#26364c" />
      <rect x="44" y="34" width="52" height="112" rx="12" fill="#0d1726" />
      <rect x="56" y="50" width="28" height="7" rx="3.5" fill="#22d3ee" opacity="0.8" />
      <rect x="56" y="64" width="28" height="7" rx="3.5" fill="#94a3b8" opacity="0.5" />
      <rect x="56" y="78" width="28" height="7" rx="3.5" fill="#94a3b8" opacity="0.5" />
      <rect x="108" y="48" width="70" height="28" rx="6" fill="#0d1726" stroke="#26364c" />
      <rect x="186" y="48" width="78" height="28" rx="6" fill="#0d1726" stroke="#26364c" />
      <rect x="112" y="108" width="14" height="24" rx="2" fill="#2563eb" />
      <rect x="134" y="96" width="14" height="36" rx="2" fill="#22d3ee" />
      <rect x="156" y="112" width="14" height="20" rx="2" fill="#2dd4bf" />
      <rect x="178" y="88" width="14" height="44" rx="2" fill="#a3e635" />
      <rect x="200" y="104" width="14" height="28" rx="2" fill="#22d3ee" />
      <rect x="222" y="96" width="14" height="36" rx="2" fill="#2563eb" />
    </>
  ),
  automation: (
    <>
      <line x1="96" y1="90" x2="160" y2="58" stroke="#26364c" strokeWidth="3" />
      <line x1="96" y1="90" x2="160" y2="122" stroke="#26364c" strokeWidth="3" />
      <line x1="160" y1="58" x2="222" y2="90" stroke="#26364c" strokeWidth="3" />
      <line x1="160" y1="122" x2="222" y2="90" stroke="#26364c" strokeWidth="3" />
      <circle cx="96" cy="90" r="14" fill="#22d3ee" />
      <circle cx="160" cy="58" r="12" fill="#a3e635" />
      <circle cx="160" cy="122" r="12" fill="#2dd4bf" />
      <circle cx="222" cy="90" r="19" fill="#2563eb" />
      <circle cx="222" cy="90" r="7" fill="#07111f" />
      <rect x="218" y="66" width="8" height="10" rx="2" fill="#2563eb" />
      <rect x="218" y="104" width="8" height="10" rx="2" fill="#2563eb" />
      <rect x="198" y="86" width="10" height="8" rx="2" fill="#2563eb" />
      <rect x="236" y="86" width="10" height="8" rx="2" fill="#2563eb" />
    </>
  ),
  // --- Process ---
  audit: (
    <>
      <rect x="66" y="34" width="150" height="112" rx="10" fill="#111f31" stroke="#26364c" />
      <rect x="84" y="52" width="14" height="14" rx="3" fill="#a3e635" />
      <path d="M87 59l3 3 6-7" stroke="#07111f" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="106" y="55" width="92" height="8" rx="4" fill="#94a3b8" opacity="0.7" />
      <rect x="84" y="80" width="14" height="14" rx="3" fill="#a3e635" />
      <path d="M87 87l3 3 6-7" stroke="#07111f" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="106" y="83" width="78" height="8" rx="4" fill="#94a3b8" opacity="0.55" />
      <rect x="84" y="108" width="14" height="14" rx="3" fill="#26364c" />
      <rect x="106" y="111" width="86" height="8" rx="4" fill="#94a3b8" opacity="0.4" />
      <circle cx="212" cy="116" r="24" fill="#22d3ee" opacity="0.18" stroke="#22d3ee" strokeWidth="4" />
      <line x1="230" y1="134" x2="248" y2="152" stroke="#22d3ee" strokeWidth="6" strokeLinecap="round" />
    </>
  ),
  design: (
    <>
      <rect x="64" y="34" width="192" height="112" rx="10" fill="#111f31" stroke="#26364c" />
      <rect x="80" y="50" width="160" height="22" rx="4" fill="none" stroke="#22d3ee" strokeWidth="2" strokeDasharray="6 5" />
      <rect x="80" y="82" width="74" height="48" rx="4" fill="none" stroke="#2dd4bf" strokeWidth="2" strokeDasharray="6 5" />
      <rect x="166" y="82" width="74" height="22" rx="4" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6 5" />
      <rect x="166" y="112" width="74" height="18" rx="4" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6 5" />
      <circle cx="236" cy="44" r="16" fill="#a3e635" />
      <path d="M229 44l5 5 9-10" stroke="#07111f" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  build: (
    <>
      <rect x="58" y="34" width="204" height="112" rx="10" fill="#111f31" stroke="#26364c" />
      <rect x="58" y="34" width="204" height="20" rx="10" fill="#0d1726" />
      <circle cx="72" cy="44" r="3" fill="#fb7185" />
      <circle cx="84" cy="44" r="3" fill="#f59e0b" />
      <circle cx="96" cy="44" r="3" fill="#a3e635" />
      <path d="M120 72l-18 20 18 20" stroke="#22d3ee" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M200 72l18 20-18 20" stroke="#22d3ee" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M150 68l20 48" stroke="#a3e635" strokeWidth="6" fill="none" strokeLinecap="round" />
      <rect x="74" y="126" width="40" height="7" rx="3.5" fill="#94a3b8" opacity="0.5" />
      <rect x="120" y="126" width="60" height="7" rx="3.5" fill="#94a3b8" opacity="0.35" />
    </>
  ),
  review: (
    <>
      <rect x="78" y="34" width="164" height="100" rx="10" fill="#111f31" stroke="#26364c" />
      <rect x="152" y="134" width="16" height="10" fill="#26364c" />
      <rect x="120" y="146" width="80" height="6" rx="3" fill="#26364c" />
      <circle cx="160" cy="80" r="30" fill="#a3e635" opacity="0.18" stroke="#a3e635" strokeWidth="3" />
      <path d="M146 80l9 9 18-20" stroke="#a3e635" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  launch: (
    <>
      <path d="M160 40c16 10 24 30 24 52l-12 16h-24l-12-16c0-22 8-42 24-52z" fill="#22d3ee" />
      <circle cx="160" cy="84" r="9" fill="#07111f" />
      <path d="M148 96l-16 14 8 2 12-6z" fill="#2563eb" />
      <path d="M172 96l16 14-8 2-12-6z" fill="#2563eb" />
      <path d="M152 112h16l-8 28z" fill="#f59e0b" />
      <path d="M156 112h8l-4 16z" fill="#a3e635" />
      <circle cx="110" cy="58" r="3" fill="#ffffff" opacity="0.7" />
      <circle cx="214" cy="68" r="3" fill="#ffffff" opacity="0.6" />
      <circle cx="120" cy="122" r="2.5" fill="#ffffff" opacity="0.5" />
      <circle cx="206" cy="126" r="2.5" fill="#ffffff" opacity="0.5" />
    </>
  ),
  // --- Biaya ---
  "price-small": (
    <>
      <circle cx="142" cy="94" r="52" fill="#22d3ee" opacity="0.12" />
      <circle cx="142" cy="74" r="21" fill="#22d3ee" />
      <path d="M104 144c0-23 17-40 38-40s38 17 38 40z" fill="#2dd4bf" />
      <rect x="190" y="92" width="54" height="62" rx="8" fill="#0b1524" stroke="#26364c" />
      <circle cx="217" cy="110" r="9" fill="#a3e635" />
      <rect x="200" y="126" width="34" height="6" rx="3" fill="#94a3b8" opacity="0.6" />
      <rect x="200" y="138" width="26" height="6" rx="3" fill="#94a3b8" opacity="0.45" />
    </>
  ),
  "price-big": (
    <>
      <rect x="176" y="82" width="54" height="70" rx="6" fill="#2dd4bf" />
      <rect x="178" y="96" width="12" height="12" rx="2" fill="#0b1524" />
      <rect x="196" y="96" width="12" height="12" rx="2" fill="#0b1524" />
      <rect x="178" y="116" width="12" height="12" rx="2" fill="#0b1524" />
      <rect x="196" y="116" width="12" height="12" rx="2" fill="#a3e635" />
      <rect x="100" y="46" width="78" height="106" rx="6" fill="#22d3ee" />
      <g fill="#0b1524">
        <rect x="112" y="60" width="13" height="13" rx="2" />
        <rect x="132" y="60" width="13" height="13" rx="2" />
        <rect x="152" y="60" width="13" height="13" rx="2" />
        <rect x="112" y="82" width="13" height="13" rx="2" />
        <rect x="132" y="82" width="13" height="13" rx="2" />
        <rect x="152" y="82" width="13" height="13" rx="2" />
        <rect x="112" y="104" width="13" height="13" rx="2" />
        <rect x="152" y="104" width="13" height="13" rx="2" />
      </g>
      <rect x="132" y="104" width="13" height="13" rx="2" fill="#a3e635" />
      <rect x="128" y="130" width="22" height="22" rx="3" fill="#0b1524" />
      <rect x="138" y="34" width="3" height="14" fill="#a3e635" />
      <path d="M141 35h15l-4 5 4 5h-15z" fill="#a3e635" />
    </>
  ),
};

export function Illustration({
  name,
  className = "",
}: {
  name: IllustrationName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 320 180"
      className={className}
      role="img"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      {scenes[name]}
    </svg>
  );
}
