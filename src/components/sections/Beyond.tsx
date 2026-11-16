import { useRef } from "react";
import { Cpu, Lightbulb, TrendingUp, Trophy } from "lucide-react";
import { content } from "@/data/content";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import { useLang } from "@/hooks/useLang";
import { DESKTOP_HOVER } from "@/hooks/useMagnetic";
import { asset } from "@/components/portfolio/ui";

const icons = { football: Trophy, market: TrendingUp, tech: Lightbulb, os: Cpu };

export function Beyond() {
  const { t, lang } = useLang();
  const b = content.beyond;
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(".beyond-title", { type: "words,chars", mask: "words" });
        gsap.from(split.chars, { yPercent: 110, stagger: 0.025, duration: 0.8, ease: "power4.out", scrollTrigger: { trigger: ".beyond-title", start: "top 85%" } });
        gsap.from(".beyond-intro", { y: 20, opacity: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: ".beyond-intro", start: "top 88%" } });
        const cards = gsap.utils.toArray<HTMLElement>(".beyond-card");
        gsap.set(cards, { opacity: 0, y: 40 });
        ScrollTrigger.batch(cards, {
          start: "top 90%", once: true,
          onEnter: (els) => {
            gsap.to(els, { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: "power3.out" });
            gsap.from(els.map((e) => e.querySelector(".beyond-icon")), { scale: 0, rotate: -45, stagger: 0.12, duration: 0.6, delay: 0.2, ease: "back.out(2.5)" });
          },
        });
        return () => split.revert();
      });
      mm.add(DESKTOP_HOVER, () => {
        const offs = gsap.utils.toArray<HTMLElement>(".beyond-card").map((el) => {
          const rx = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power3" });
          const ry = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power3" });
          const move = (e: MouseEvent) => {
            const r = el.getBoundingClientRect();
            ry(((e.clientX - r.left) / r.width - 0.5) * 8);
            rx(-((e.clientY - r.top) / r.height - 0.5) * 8);
          };
          const leave = () => { rx(0); ry(0); };
          el.addEventListener("mousemove", move);
          el.addEventListener("mouseleave", leave);
          return () => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); };
        });
        return () => offs.forEach((f) => f());
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [lang], revertOnUpdate: true },
  );

  return (
    <section id="beyond" ref={ref} aria-labelledby="beyond-title" className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <h2 id="beyond-title" key={lang} className="beyond-title [font-size:clamp(2rem,5vw+0.5rem,3.25rem)] text-foreground font-bold leading-tight tracking-tight glow-text">
        {t(b.title)}
      </h2>
      <p className="beyond-intro mt-5 max-w-2xl text-lg text-muted-foreground">{t(b.intro)}</p>
      <div className="mt-12 grid gap-6 [perspective:1200px] md:grid-cols-2">
        {b.cards.map((c) => {
          const Icon = icons[c.icon];
          return (
            <article
              key={c.icon}
              className="beyond-card rounded-2xl border border-border bg-card p-6 transition-[box-shadow,border-color,translate] duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_0_40px_var(--glow)]"
            >
              {c.image && <img src={asset(c.image)} alt={t(c.title)} loading="lazy" className="mb-5 aspect-video w-full rounded-xl object-cover" />}
              <span className="beyond-icon inline-flex rounded-xl border border-border bg-background p-3 text-accent">
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <h3 className="mt-4 text-xl font-semibold">{t(c.title)}</h3>
              <p className="mt-2 text-muted-foreground">{t(c.text)}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
