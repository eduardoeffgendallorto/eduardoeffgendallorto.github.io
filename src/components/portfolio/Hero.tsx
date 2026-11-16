import { useRef } from "react";
import { gsap, SplitText, Draggable, useGSAP } from "@/lib/gsap";
import { content, shared } from "@/data/content";
import { useLang } from "@/lib/lang";
import { asset, GithubIcon, LinkedinIcon, MagneticButton, scrollToId } from "./ui";
import portrait from "@/assets/eduardo-portrait.jpg";

export function Hero({ ready }: { ready: boolean }) {
  const { t, lang } = useLang();
  const root = useRef<HTMLElement>(null);
  const first = useRef(true);
  const h = content.hero;

  // Text animations — recreated on language change
  useGSAP(
    () => {
      if (!ready) return;
      const delay = first.current ? 0.1 : 0;
      first.current = false;
      const split = SplitText.create(".hero-title", { type: "words,chars", mask: "words" });
      const tl = gsap.timeline({ delay });
      tl.from(split.chars, { yPercent: 110, duration: 0.8, ease: "power4.out", stagger: 0.02 })
        .to(".hero-sub", { duration: 1, scrambleText: { text: t(h.subtitle), chars: "01<>/_{}", speed: 0.6 } }, "-=0.5")
        .from(".hero-fade", { y: 20, opacity: 0, stagger: 0.08, duration: 0.6, ease: "power3.out" }, "-=0.7");
      return () => split.revert();
    },
    { scope: root, dependencies: [ready, lang], revertOnUpdate: true },
  );

  // Photo: intro, parallax, draggable card
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        Draggable.create(".code-card", { bounds: root.current });
        return;
      }
      gsap.from(".hero-photo", { scale: 0.92, opacity: 0, duration: 1, ease: "power3.out", delay: 1.3 });
      gsap.to(".hero-photo-wrap", { yPercent: -12, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".hero-glow", { yPercent: 20, scale: 1.2, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
      Draggable.create(".code-card", { bounds: root.current, inertia: true, edgeResistance: 0.8 });

      if (!window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)").matches) return;
      const px = gsap.quickTo(".hero-photo", "x", { duration: 0.8, ease: "power3" });
      const py = gsap.quickTo(".hero-photo", "y", { duration: 0.8, ease: "power3" });
      const gx = gsap.quickTo(".hero-glow", "x", { duration: 1.2, ease: "power3" });
      const gy = gsap.quickTo(".hero-glow", "y", { duration: 1.2, ease: "power3" });
      const move = (e: MouseEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        px(nx * 14); py(ny * 14); gx(nx * -40); gy(ny * -40);
      };
      window.addEventListener("mousemove", move);
      return () => window.removeEventListener("mousemove", move);
    },
    { scope: root },
  );

  return (
    <section id="home" ref={root} aria-labelledby="home-title" className="relative flex min-h-svh items-center overflow-hidden pt-24 pb-16">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 md:grid-cols-[1.2fr_1fr]">
        <div className="order-2 md:order-1">
          <div className="hero-fade inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 font-mono text-xs text-muted-foreground">
            <span className="pulse-dot h-2 w-2 rounded-full bg-accent" />
            {t(h.badge)}
          </div>
          <h1 id="home-title" className="hero-title mt-6 [font-size:clamp(2.25rem,6vw+0.5rem,4.5rem)] text-foreground font-bold leading-[1.05] tracking-tight text-foreground">
            {shared.name}
          </h1>
          <p className="hero-sub mt-5 min-h-[1.5em] font-mono text-base text-accent sm:text-lg">{"\u00a0"}</p>
          <p className="hero-fade mt-3 max-w-md text-lg text-muted-foreground">{t(h.tagline)}</p>
          <div className="hero-fade mt-8 flex flex-wrap items-center gap-3">
            <MagneticButton href="#projects" onClick={(e) => { e.preventDefault(); scrollToId("projects"); }}>
              {t(h.ctaProjects)} <span aria-hidden>→</span>
            </MagneticButton>
            {shared.cvAvailable && (
              <MagneticButton variant="secondary" href={asset(shared.cv[lang])} download>
                {t(h.ctaCv)} <span aria-hidden>↓</span>
              </MagneticButton>
            )}
            {shared.github && (
              <a href={shared.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="inline-flex min-h-11 min-w-11 items-center justify-center text-muted-foreground hover:text-accent">
                <GithubIcon className="h-5 w-5" />
              </a>
            )}
            {shared.linkedin && (
              <a href={shared.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="inline-flex min-h-11 min-w-11 items-center justify-center text-muted-foreground hover:text-accent">
                <LinkedinIcon className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>

        <div className="hero-photo-wrap relative order-1 mx-auto w-full max-w-[280px] sm:max-w-sm md:order-2">
          <div className="hero-glow glow-blob absolute -inset-10 rounded-full" />
          <div className="hero-photo frame-gradient shadow-soft relative rounded-3xl p-[2px]">
            <img
              src={portrait}
              alt={t(h.photoAlt)}
              className="aspect-[4/5] w-full rounded-[calc(1.5rem-2px)] object-cover object-center"
              fetchPriority="high"
            />
          </div>
          <div className="code-card absolute -bottom-6 -left-6 cursor-grab touch-none select-none rounded-xl border border-border bg-card px-4 py-3 font-mono text-xs shadow-soft active:cursor-grabbing sm:-left-12">
            <div className="mb-2 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
              <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span className="ml-2 text-[10px] text-muted-foreground">{t(h.dragHint)}</span>
            </div>
            <code className="text-accent">{t(h.code)}</code>
          </div>
        </div>
      </div>
    </section>
  );
}
