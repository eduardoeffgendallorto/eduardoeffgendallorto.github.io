import { useRef, type ReactNode } from "react";
import { ArrowUp, Mail, MessageCircle } from "lucide-react";
import { content, shared } from "@/data/content";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { useLang } from "@/hooks/useLang";
import { useMagnetic } from "@/hooks/useMagnetic";
import { asset, GithubIcon, LinkedinIcon, MagneticButton, scrollToId } from "@/components/portfolio/ui";

function MagLink({ href, icon, label, value }: { href: string; icon: ReactNode; label: string; value: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  useMagnetic(ref, 0.25);
  const ext = !href.startsWith("mailto:");
  return (
    <a
      ref={ref}
      href={href}
      {...(ext ? { target: "_blank", rel: "noreferrer" } : {})}
      className="contact-link flex min-h-11 items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-[box-shadow,border-color] hover:border-accent/50 hover:shadow-[0_0_30px_var(--glow)]"
    >
      <span className="rounded-xl border border-border bg-background p-2.5 text-accent">{icon}</span>
      <span className="min-w-0">
        <span className="block font-mono text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
        <span className="block truncate text-foreground">{value}</span>
      </span>
    </a>
  );
}

export function Contact() {
  const { t, lang } = useLang();
  const c = content.contact;
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(".contact-title", { type: "words,chars", mask: "words" });
        const tl = gsap.timeline({ scrollTrigger: { trigger: ".contact-title", start: "top 85%" } });
        tl.from(split.chars, { yPercent: 110, stagger: 0.03, duration: 0.9, ease: "expo.out" })
          .from(".contact-fade", { y: 20, opacity: 0, stagger: 0.08, duration: 0.6, ease: "power3.out" }, "-=0.5")
          .from(".contact-link", { y: 24, opacity: 0, stagger: 0.08, duration: 0.6, ease: "back.out(1.6)" }, "-=0.4");
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [lang], revertOnUpdate: true },
  );

  return (
    <section id="contact" ref={ref} aria-labelledby="contact-title" className="relative mx-auto max-w-6xl px-5 pt-24 sm:pt-32">
      <div className="glow-blob pointer-events-none absolute left-1/4 top-10 h-64 w-96" />
      <p className="contact-fade relative font-mono text-xs uppercase tracking-[0.2em] text-accent">{t(c.label)}</p>
      <h2 id="contact-title" key={lang} className="contact-title relative mt-3 [font-size:clamp(2.5rem,8vw+0.5rem,6rem)] text-foreground font-bold leading-[1.02] tracking-tight glow-text">
        {t(c.title)}
      </h2>
      <p className="contact-fade relative mt-5 max-w-xl text-lg text-muted-foreground">{t(c.text)}</p>
      <div className="relative mt-10 grid gap-4 sm:grid-cols-2">
        <MagLink href={`mailto:${shared.email}`} icon={<Mail className="h-5 w-5" aria-hidden />} label={t(c.email)} value={shared.email} />
        <MagLink href={shared.whatsapp.url} icon={<MessageCircle className="h-5 w-5" aria-hidden />} label={t(c.whatsapp)} value={shared.whatsapp.label} />
        <MagLink href={shared.linkedin} icon={<LinkedinIcon className="h-5 w-5" />} label="LinkedIn" value="eduardo-effgen-dall-orto" />
        <MagLink href={shared.github} icon={<GithubIcon className="h-5 w-5" />} label="GitHub" value="eduardoeffgendallorto" />
      </div>
      <div className="contact-fade relative mt-10 flex flex-wrap gap-3">
        {shared.cvAvailable && (
          <MagneticButton href={asset(shared.cv[lang])} download>
            {t(content.hero.ctaCv)} <span aria-hidden>↓</span>
          </MagneticButton>
        )}
        <MagneticButton variant="secondary" href="#home" onClick={(e) => { e.preventDefault(); scrollToId("top"); }}>
          <ArrowUp className="h-4 w-4" aria-hidden /> {t(c.backToTop)}
        </MagneticButton>
      </div>
      <footer className="mt-24 border-t border-border py-6 font-mono text-xs text-muted-foreground">
        © {new Date().getFullYear()} {shared.name}
      </footer>
    </section>
  );
}
