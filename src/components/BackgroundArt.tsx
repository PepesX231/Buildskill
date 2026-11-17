"use client";
import { useEffect, type ReactNode } from "react";

type Variant = "hero" | "roadmap" | "support" | "showcase" | "pricing";

export function BackgroundChapter({ variant, children }: { variant: Variant; children: ReactNode }) {
  return <div className={`art-chapter art-chapter-${variant}`}>
    <div className="art-canvas" aria-hidden="true">
      <svg className="art-wave art-wave-far" viewBox="0 0 1600 1000" preserveAspectRatio="none">
        <path d="M-180 70C220-100 260 200 80 370S-40 720 220 810L-180 1080Z" fill="var(--art-wash)" />
        <path d="M1780-80C1270 30 1550 360 1440 510S1280 780 1780 1070Z" fill="var(--art-wash-right)" />
      </svg>
      <svg className="art-wave art-wave-mid" viewBox="0 0 1600 1000" preserveAspectRatio="none">
        <path d="M-180 90C100 40 160 240 35 420S-5 690 120 765L-100 920C-250 540 120 360-180 90Z" fill="var(--art-cobalt)" />
        <path d="M1770 250C1430 170 1340 380 1520 550S1660 780 1400 900L1580 1090C1900 800 1430 550 1770 250Z" fill="var(--art-coral)" />
      </svg>
      <div className="art-paper art-paper-left" /><div className="art-paper art-paper-right" />
    </div>
    {children}
  </div>;
}

export function BackgroundMotion() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".art-chapter"));
    const active = new Set<HTMLElement>();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const small = window.matchMedia("(max-width:900px)");
    let frame = 0;
    const paint = () => {
      frame = 0;
      if (reduced.matches || small.matches) { nodes.forEach(node => node.style.setProperty("--art-drift", "0px")); return; }
      const measurements = Array.from(active).map(node => ({ node, top: node.getBoundingClientRect().top }));
      measurements.forEach(({ node, top }) => node.style.setProperty("--art-drift", Math.max(-38, Math.min(38, (window.innerHeight * .4 - top) * .055)).toFixed(2) + "px"));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint); };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) active.add(entry.target as HTMLElement); else active.delete(entry.target as HTMLElement); });
      schedule();
    }, { rootMargin: "120px" });
    nodes.forEach(node => observer.observe(node));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduced.addEventListener("change", schedule);
    small.addEventListener("change", schedule);
    return () => {
      observer.disconnect(); cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule);
      reduced.removeEventListener("change", schedule); small.removeEventListener("change", schedule);
    };
  }, []);
  return null;
}
