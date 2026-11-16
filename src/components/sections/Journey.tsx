import { useRef } from "react";
import { Award, ExternalLink, GraduationCap } from "lucide-react";
import { content, type T } from "@/data/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { useLang } from "@/hooks/useLang";
import { asset, SectionHeading } from "@/components/portfolio/ui";
import { cn } from "@/lib/utils";

type Item = { kind: "edu" | "cert"; title: T; period: T; place: string; hours?: number; file?: string };

export function Journey() {
  const { t, lang } = useLang();
  const j = content.journey;
  const ref = useRef<HTMLElement>(null);
  const items: Item[] = [
    ...j.education.map((e) => ({ kind: "edu" as const, title: e.title, period: e.period, place: e.place })),
    ...content.certificates.map((c) => ({ kind: "cert" as const, title: c.title, period: c.period, place: c.issuer, hours: c.hours, file: c.file })),
  ];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        { reduce: "(prefers-reduced-motion: reduce)", desktop: "(min-width: 768px)" },
        (ctx) => {
          const { reduce, desktop } = ctx.conditions as { reduce: boolean; desktop: boolean };
          if (reduce) return;
          gsap.fromTo(".tl-line", { scaleY: 0 }, {
            scaleY: 1, ease: "none",
            scrollTrigger: { trigger: ".tl-list", start: "top 75%", end: "bottom 60%", scrub: true },
          });
          gsap.utils.toArray<HTMLElement>(".tl-item").forEach((el, i) => {
            const fromX = desktop ? (i % 2 === 0 ? -50 : 50) : 30;
            gsap.from(el, {
              x: fromX, opacity: 0, duration: desktop ? 0.8 : 0.5, ease: "expo.out",
              scrollTrigger: { trigger: el, start: "top 85%" },
            });
            gsap.from(el.querySelector(".tl-dot"), { scale: 0, duration: 0.5, ease: "back.out(3)", scrollTrigger: { trigger: el, start: "top 85%" } });
          });
        },
      );
      return () => mm.revert();
    },
    { scope: ref, dependencies: [lang], revertOnUpdate: true },
  );

  return (
    <section id="journey" ref={ref} aria-labelledby="journey-title" className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <SectionHeading id="journey-title" label={t(j.label)} title={t(j.title)} />
      <div className="tl-list relative">
        <span aria-hidden className="absolute bottom-0 left-3 top-0 w-px bg-border md:left-1/2" />
        <span aria-hidden className="tl-line absolute bottom-0 left-3 top-0 w-px origin-top bg-accent shadow-[0_0_12px_var(--glow)] md:left-1/2" />
        <ol className="space-y-8">
          {items.map((it, i) => {
            const left = i % 2 === 0;
            const firstCert = it.kind === "cert" && items[i - 1]?.kind === "edu";
            return (
              <li key={it.title.pt} className="relative">
                {(i === 0 || firstCert) && (
                  <p className="mb-4 pl-10 font-mono text-xs uppercase tracking-[0.2em] text-accent md:pl-0 md:text-center">
                    {t(i === 0 ? j.educationLabel : j.coursesLabel)}
                  </p>
                )}
                <div className={cn("tl-item relative pl-10 md:w-1/2 md:pl-0", left ? "md:pr-12" : "md:ml-auto md:pl-12")}>
                  <span
                    aria-hidden
                    className={cn(
                      "tl-dot absolute left-3 top-6 h-3 w-3 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_14px_var(--glow)]",
                      left ? "md:left-auto md:right-0 md:translate-x-1/2" : "md:left-0",
                    )}
                  />
                  <article className="rounded-2xl border border-border bg-card p-5 transition-[box-shadow,border-color] hover:border-accent/50 hover:shadow-[0_0_30px_var(--glow)]">
                    <div className="flex items-center gap-2 font-mono text-xs text-accent">
                      {it.kind === "edu" ? <GraduationCap className="h-4 w-4" aria-hidden /> : <Award className="h-4 w-4" aria-hidden />}
                      <span>{t(it.period)}</span>
                      {it.hours ? <span className="text-muted-foreground">· {it.hours} {t(j.hours)}</span> : null}
                    </div>
                    <h3 className="mt-2 text-lg font-semibold sm:text-xl">{t(it.title)}</h3>
                    {it.place && <p className="text-sm text-muted-foreground">{it.place}</p>}
                    {it.file && (
                      <a
                        href={asset(it.file)}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-4 text-sm text-foreground transition-colors hover:border-accent/60 hover:text-accent"
                      >
                        <ExternalLink className="h-4 w-4" aria-hidden />
                        {t(j.viewCert)}
                        <span className="sr-only">: {t(it.title)} ({t(j.newTab)})</span>
                      </a>
                    )}
                  </article>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
