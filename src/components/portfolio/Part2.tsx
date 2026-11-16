import { useEffect, useRef, useState } from "react";
import { Code2, Cpu, Database, ExternalLink, ImageOff, Maximize2, TrendingUp, Wrench, X } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { content } from "@/data/content";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import { Flip } from "gsap/Flip";
import { useLang } from "@/lib/lang";
import { GithubIcon, SectionHeading } from "./ui";
import pythonImg from "@/assets/projetos/python.png";
import figmaImg from "@/assets/projetos/figma.png";
import mysqlImg from "@/assets/projetos/mysql.png";
import robosumoImg from "@/assets/projetos/robosumo.jpg";

const wrap = "relative mx-auto max-w-6xl px-5 py-24 sm:py-32";
type Project = (typeof content.projects.items)[number];

const images: Record<Project["image"], { src: string; cls: string; box?: string }> = {
  python: { src: pythonImg, cls: "object-cover object-[center_18%]" },
  figma: { src: figmaImg, cls: "object-cover object-center" },
  mysql: { src: mysqlImg, cls: "object-contain object-center", box: "bg-[oklch(1_0_0)]" },
  robosumo: { src: robosumoImg, cls: "object-cover object-[center_70%]" },
};

export const stackCount = content.stack.groups.filter((g) => !g.interest).reduce((n, g) => n + g.items.length, 0);

/* ---------------- ABOUT ---------------- */
export function About() {
  const { t, lang } = useLang();
  const a = content.about;
  const ref = useRef<HTMLElement>(null);
  const stats = [
    { n: content.projects.items.length, label: a.stats.projects },
    { n: content.certificates.length, label: a.stats.certificates },
    { n: stackCount, label: a.stats.stack },
  ].filter((s) => s.n > 0);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const split = new SplitText(".about-text", { type: "words" });
      if (!reduce)
        gsap.fromTo(split.words, { opacity: 0.2 }, {
          opacity: 1, stagger: 0.05, ease: "none",
          scrollTrigger: { trigger: ".about-text", start: "top 80%", end: "bottom 55%", scrub: true },
        });
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const target = Number(el.dataset["n"]);
        const o = { v: 0 };
        gsap.to(o, {
          v: target, duration: reduce ? 0 : 1.6, ease: "power2.out",
          onUpdate: () => { el.textContent = String(Math.round(o.v)); },
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });
      return () => split.revert();
    },
    { scope: ref, dependencies: [lang], revertOnUpdate: true },
  );

  return (
    <section id="about" ref={ref} aria-labelledby="about-title" className={wrap}>
      <SectionHeading id="about-title" label={t(a.label)} title={t(a.title)} />
      <div className="grid gap-12 lg:grid-cols-[1fr_260px]">
        <div key={lang} className="about-text max-w-3xl space-y-5 text-lg leading-relaxed text-foreground sm:text-xl">
          {a.paragraphs.map((p, i) => <p key={i}>{t(p)}</p>)}
        </div>
        <div className="grid grid-cols-3 gap-4 self-start lg:grid-cols-1">
          {stats.map((s) => (
            <div key={s.label.pt} className="rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-[0_0_30px_var(--glow)]">
              <p className="stat-num font-mono text-4xl font-bold text-accent glow-text" data-n={s.n}>0</p>
              <p className="mt-1 text-sm text-muted-foreground">{t(s.label)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PROJECTS ---------------- */
function Thumb({ p, onOpen }: { p: Project; onOpen: () => void }) {
  const { t } = useLang();
  const [failed, setFailed] = useState(false);
  const img = images[p.image];
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${t(content.projects.zoom)}: ${t(p.alt)}`}
      className={`group/thumb relative block aspect-[16/10] w-full overflow-hidden rounded-xl border border-border ${img.box ?? "bg-muted"}`}
    >
      {failed ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-muted text-muted-foreground">
          <ImageOff className="h-8 w-8" />
          <span className="font-mono text-xs">{p.tags[0]}</span>
        </div>
      ) : (
        <img
          src={img.src}
          alt={t(p.alt)}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className={`proj-img h-full w-full transition-transform duration-500 ease-out ${img.cls}`}
        />
      )}
      <span className="absolute right-3 top-3 rounded-full border border-border bg-background/80 p-2 text-foreground opacity-0 transition-opacity group-hover/thumb:opacity-100 group-focus-visible/thumb:opacity-100">
        <Maximize2 className="h-4 w-4" />
      </span>
    </button>
  );
}

function Lightbox({ p, onClose }: { p: Project | null; onClose: () => void }) {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!p) return;
    const id = requestAnimationFrame(() => {
      if (ref.current) gsap.fromTo(ref.current, { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" });
    });
    return () => cancelAnimationFrame(id);
  }, [p]);
  const img = p ? images[p.image] : null;
  return (
    <Dialog open={!!p} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-5xl gap-3 border-border bg-card p-4 [&>button:last-child]:hidden">
        {p && img && (
          <>
            <div ref={ref} className="grid gap-3">
              <DialogTitle className="sr-only">{t(p.title)}</DialogTitle>
              <div className={`max-h-[85vh] overflow-auto rounded-lg ${img.box ?? ""}`}>
                <img src={img.src} alt={t(p.alt)} className="mx-auto max-h-[85vh] w-auto object-contain max-sm:max-h-none max-sm:w-full" />
              </div>
              <DialogDescription className="pr-10 text-sm text-muted-foreground">{t(p.alt)}</DialogDescription>
            </div>
            <DialogClose className="absolute right-3 top-3 rounded-full border border-border bg-background/90 p-2 text-foreground hover:text-accent" aria-label={t(content.projects.close)}>
              <X className="h-4 w-4" />
            </DialogClose>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function tilt(el: HTMLElement) {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return () => {};
  const img = el.querySelector<HTMLElement>(".proj-img");
  const rx = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power3" });
  const ry = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power3" });
  const move = (e: MouseEvent) => {
    const r = el.getBoundingClientRect();
    ry(((e.clientX - r.left) / r.width - 0.5) * 8);
    rx(-((e.clientY - r.top) / r.height - 0.5) * 8);
  };
  const enter = () => img && gsap.to(img, { scale: 1.04, duration: 0.5 });
  const leave = () => { rx(0); ry(0); if (img) gsap.to(img, { scale: 1, duration: 0.5 }); };
  el.addEventListener("mousemove", move);
  el.addEventListener("mouseenter", enter);
  el.addEventListener("mouseleave", leave);
  return () => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseenter", enter); el.removeEventListener("mouseleave", leave); };
}

export function Projects() {
  const { t, lang } = useLang();
  const p = content.projects;
  const ref = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState<Project | null>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".proj-card");
      gsap.set(cards, { opacity: 0, y: 40 });
      ScrollTrigger.batch(cards, {
        start: "top 90%", once: true,
        onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: "power3.out" }),
      });
      const offs = cards.map(tilt);
      return () => offs.forEach((f) => f());
    },
    { scope: ref, dependencies: [lang], revertOnUpdate: true },
  );

  const apply = (id: string) => {
    setFilter(id);
    const cards = gsap.utils.toArray<HTMLElement>(".proj-card", gridRef.current);
    const state = Flip.getState(cards);
    cards.forEach((c) => { c.style.display = id === "all" || c.dataset["cat"] === id ? "" : "none"; });
    Flip.from(state, {
      duration: 0.5, ease: "power2.inOut", absolute: true, scale: true,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4 }),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.9, duration: 0.3 }),
      onComplete: () => ScrollTrigger.refresh(),
    });
  };

  return (
    <section id="projects" ref={ref} aria-labelledby="projects-title" className={wrap}>
      <SectionHeading id="projects-title" label={t(p.label)} title={t(p.title)} />
      <div role="group" aria-label={t(p.title)} className="mb-8 flex flex-wrap gap-2">
        {p.filters.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => apply(f.id)}
            className={`min-h-11 rounded-full border px-4 py-1.5 font-mono text-xs transition-colors ${
              filter === f.id ? "border-accent bg-accent text-accent-foreground shadow-[0_0_20px_var(--glow)]" : "border-border bg-card text-muted-foreground hover:border-accent/50 hover:text-accent"
            }`}
          >
            {t(f.label)}
          </button>
        ))}
      </div>
      <div ref={gridRef} className="grid gap-6 [perspective:1200px] md:grid-cols-2">
        {p.items.map((it) => (
          <article
            key={it.image}
            data-cat={it.category}
            className="proj-card flex flex-col rounded-2xl border border-border bg-card p-4 transition-[box-shadow,border-color] [transform-style:preserve-3d] hover:border-accent/50 hover:shadow-[0_0_40px_var(--glow)]"
          >
            <Thumb p={it} onOpen={() => setOpen(it)} />
            <div className="flex flex-1 flex-col p-2 pt-5">
              {it.badge && <span className="mb-2 self-start rounded-full bg-accent/15 px-2.5 py-1 font-mono text-[11px] text-accent">{t(it.badge)}</span>}
              <h3 className="text-xl font-semibold">{t(it.title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(it.description)}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {it.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-border px-2.5 py-1 font-mono text-xs text-accent">{tag}</span>
                ))}
              </div>
              {it.link && (
                <a href={it.link.url} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 self-start rounded-full border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-accent/60 hover:text-accent">
                  {it.link.kind === "github" ? <GithubIcon className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
                  {t(it.link.kind === "github" ? p.github : p.figma)}
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
      <Lightbox p={open} onClose={() => setOpen(null)} />
    </section>
  );
}

/* ---------------- STACK ---------------- */
const icons = { code: Code2, database: Database, wrench: Wrench, cpu: Cpu, trending: TrendingUp };

export function Stack() {
  const { t, lang } = useLang();
  const s = content.stack;
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".stack-card");
      gsap.set(cards, { opacity: 0, y: 30 });
      gsap.set(".stack-chip", { opacity: 0, y: 8 });
      ScrollTrigger.batch(cards, {
        start: "top 90%", once: true,
        onEnter: (b) => {
          gsap.to(b, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power3.out" });
          b.forEach((c, i) => gsap.to(c.querySelectorAll(".stack-chip"), { opacity: 1, y: 0, stagger: 0.05, delay: 0.2 + i * 0.1, duration: 0.4 }));
        },
      });
    },
    { scope: ref, dependencies: [lang], revertOnUpdate: true },
  );
  return (
    <>
      <section id="stack" ref={ref} aria-labelledby="stack-title" className={wrap}>
        <SectionHeading id="stack-title" label={t(s.label)} title={t(s.title)} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {s.groups.map((g) => {
            const Icon = icons[g.icon];
            return (
              <div key={g.icon} className="stack-card rounded-2xl border border-border bg-card p-6 transition-[box-shadow,border-color] hover:border-accent/50 hover:shadow-[0_0_36px_var(--glow)]">
                <div className="mb-4 flex items-center gap-3">
                  <span className="rounded-lg border border-border bg-background p-2 text-accent"><Icon className="h-5 w-5" /></span>
                  <h3 className="font-semibold">{t(g.title)}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((x) => (
                    <span key={x.pt} className="stack-chip rounded-lg border border-border bg-background px-3 py-1.5 font-mono text-xs text-foreground">{t(x)}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <Marquee items={s.marquee} />
    </>
  );
}

function Marquee({ items }: { items: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const tw = gsap.to(".marquee-track", { xPercent: -50, duration: 30, ease: "none", repeat: -1 });
      const el = ref.current!;
      const pause = () => tw.pause();
      const play = () => tw.play();
      el.addEventListener("mouseenter", pause);
      el.addEventListener("mouseleave", play);
      return () => { el.removeEventListener("mouseenter", pause); el.removeEventListener("mouseleave", play); };
    },
    { scope: ref },
  );
  const row = [...items, ...items];
  return (
    <div ref={ref} aria-hidden className="relative overflow-hidden border-y border-border bg-card/50 py-6 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
        {row.map((x, i) => (
          <span key={i} className="flex items-center gap-10 font-mono text-2xl text-muted-foreground transition-colors hover:text-accent sm:text-3xl">
            {x}<span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
