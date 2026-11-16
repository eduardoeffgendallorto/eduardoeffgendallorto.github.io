import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { content, shared } from "@/data/content";
import { useLang } from "@/lib/lang";
import { asset, scrollToId } from "./ui";
import { cn } from "@/lib/utils";

export const SECTIONS = ["home", "about", "projects", "stack", "journey", "process", "contact"] as const;

function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex items-center gap-1 font-mono text-xs" role="group" aria-label={lang === "pt" ? "Idioma" : "Language"}>
      {(["pt", "en"] as const).map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i === 1 && <span className="text-muted-foreground">|</span>}
          <button
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            aria-label={l === "pt" ? "Português" : "English"}
            className={cn("min-h-11 min-w-9 px-1 uppercase transition-colors", lang === l ? "text-accent" : "text-muted-foreground hover:text-foreground")}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );
}

export function Navbar() {
  const { t, lang } = useLang();
  const nav = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>(null);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useGSAP(() => {
    gsap.to(".nav-progress", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });
    ScrollTrigger.create({
      start: 0, end: "max",
      onUpdate: (s) => gsap.to(nav.current, { yPercent: s.direction === 1 && s.scroll() > 120 ? -100 : 0, duration: 0.35, ease: "power2.out", overwrite: true }),
    });
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) ScrollTrigger.create({ trigger: el, start: "top 50%", end: "bottom 50%", onToggle: (s) => s.isActive && setActive(id) });
    });
    tl.current = gsap
      .timeline({ paused: true })
      .set(menu.current, { display: "flex" })
      .fromTo(menu.current, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.5, ease: "power3.inOut" })
      .from(".m-link", { y: 40, opacity: 0, stagger: 0.06, duration: 0.4, ease: "power3.out" }, "-=0.15");
  });

  const toggle = (v: boolean) => {
    setOpen(v);
    if (v) tl.current?.play(); else tl.current?.reverse();
  };
  const go = (id: string) => { toggle(false); scrollToId(id); };
  const cvHref = asset(shared.cv[lang]);

  return (
    <>
      <div className="nav-progress fixed inset-x-0 top-0 z-[60] h-0.5 origin-left scale-x-0 bg-accent" />
      <header ref={nav} className="glass fixed inset-x-0 top-0 z-50 border-b border-border">
        <nav aria-label={t(content.nav.menu)} className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <button onClick={() => go("home")} aria-label={shared.name} className="min-h-11 font-mono text-sm font-bold text-foreground">
            {shared.monogram}<span className="text-accent">.</span>
          </button>
          <ul className="hidden items-center gap-6 md:flex">
            {SECTIONS.map((id) => (
              <li key={id}>
                <button
                  onClick={() => go(id)}
                  className={cn("min-h-11 text-sm transition-colors", active === id ? "text-accent" : "text-muted-foreground hover:text-foreground")}
                >
                  {t(content.nav[id])}
                </button>
              </li>
            ))}
          </ul>
          <div className="hidden items-center gap-4 md:flex">
            <LangSwitch />
            {shared.cvAvailable && (
              <a href={cvHref} download className="rounded-full border border-accent/40 px-4 py-1.5 text-sm text-accent hover:bg-primary/20">
                {t(content.nav.cv)}
              </a>
            )}
          </div>
          <button
            className="relative z-[70] flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label={t(content.nav.menu)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => toggle(!open)}
          >
            <span className={cn("h-0.5 w-6 bg-foreground transition-transform", open && "translate-y-1 rotate-45")} />
            <span className={cn("h-0.5 w-6 bg-foreground transition-transform", open && "-translate-y-1 -rotate-45")} />
          </button>
        </nav>
      </header>
      <div ref={menu} id="mobile-menu" className="fixed inset-0 z-[55] hidden flex-col justify-center gap-6 bg-background px-8 md:hidden">
        {SECTIONS.map((id) => (
          <button key={id} onClick={() => go(id)} className={cn("m-link min-h-11 text-left [font-size:clamp(2rem,9vw,2.75rem)] text-foreground font-bold", active === id ? "text-accent" : "text-foreground")}>
            {t(content.nav[id])}
          </button>
        ))}
        <div className="m-link mt-6 flex items-center gap-6">
          <LangSwitch />
          {shared.cvAvailable && <a href={cvHref} download className="text-accent">{t(content.nav.cv)}</a>}
        </div>
      </div>
    </>
  );
}
