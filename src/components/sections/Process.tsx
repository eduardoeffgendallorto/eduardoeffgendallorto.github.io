import { useRef } from "react";
import { content } from "@/data/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { useLang } from "@/hooks/useLang";
import { SectionHeading } from "@/components/portfolio/ui";

const PATH = "M0 20 Q125 2 250 20 T500 20 T750 20 T1000 20";

export function Process() {
  const { t, lang } = useLang();
  const p = content.process;
  const ref = useRef<HTMLElement>(null);
  const total = String(p.steps.length).padStart(2, "0");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = ref.current!.querySelector<HTMLElement>(".proc-track")!;
        const counter = ref.current!.querySelector<HTMLElement>(".proc-count")!;
        const dist = () => track.scrollWidth - window.innerWidth;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: ".proc-pin", start: "top top", end: () => `+=${dist()}`,
            pin: true, scrub: 0.6, invalidateOnRefresh: true,
            onUpdate: (s) => {
              const n = Math.min(p.steps.length, Math.floor(s.progress * p.steps.length) + 1);
              counter.textContent = String(n).padStart(2, "0");
            },
          },
        });
        tl.to(track, { x: () => -dist() }, 0)
          .fromTo("#proc-path", { drawSVG: "0%" }, { drawSVG: "100%" }, 0)
          .to(".proc-dot", { motionPath: { path: "#proc-path", align: "#proc-path", alignOrigin: [0.5, 0.5] } }, 0);
      });
      mm.add("(max-width: 1023px), (prefers-reduced-motion: reduce)", () => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        gsap.utils.toArray<HTMLElement>(".proc-panel").forEach((el) =>
          gsap.from(el, { y: 30, opacity: 0, duration: 0.5, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } }),
        );
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [lang], revertOnUpdate: true },
  );

  return (
    <section id="process" ref={ref} aria-labelledby="process-title" className="relative">
      <div className="proc-pin relative flex flex-col justify-center py-24 sm:py-32 lg:h-svh lg:overflow-hidden lg:py-0">
        <div className="mx-auto w-full max-w-6xl px-5">
          <div className="flex items-end justify-between gap-6">
            <SectionHeading id="process-title" label={t(p.label)} title={t(p.title)} />
            <p className="mb-12 hidden font-mono text-sm text-muted-foreground lg:block" aria-hidden>
              <span className="proc-count text-2xl font-bold text-accent">01</span> / {total}
            </p>
          </div>
          <svg viewBox="0 0 1000 40" className="mb-10 hidden w-full overflow-visible lg:block" aria-hidden>
            <path d={PATH} fill="none" stroke="var(--border)" strokeWidth="2" />
            <path id="proc-path" d={PATH} fill="none" stroke="var(--accent)" strokeWidth="2" />
            <circle className="proc-dot" r="7" fill="var(--accent)" style={{ filter: "drop-shadow(0 0 8px var(--glow))" }} />
          </svg>
        </div>
        <ol className="proc-track mx-auto flex w-full max-w-6xl flex-col gap-5 px-5 lg:mx-0 lg:w-max lg:max-w-none lg:flex-row lg:gap-8 lg:pl-[max(1.25rem,calc((100vw-72rem)/2+1.25rem))] lg:pr-[20vw]">
          {p.steps.map((s, i) => (
            <li key={s.title.pt} className="proc-panel rounded-3xl border border-border bg-card p-7 lg:flex lg:h-[44vh] lg:w-[min(36rem,60vw)] lg:flex-col lg:justify-between lg:p-10">
              <span className="font-mono text-5xl font-bold text-accent/80 glow-text lg:text-7xl">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="mt-4 text-2xl font-bold lg:text-4xl">{t(s.title)}</h3>
                <p className="mt-3 max-w-md text-muted-foreground lg:text-lg">{t(s.text)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
