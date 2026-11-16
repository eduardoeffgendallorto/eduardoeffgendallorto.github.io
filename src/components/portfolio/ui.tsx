import { useRef, type ReactNode, type AnchorHTMLAttributes } from "react";
import { gsap } from "@/lib/gsap";
import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";
import Lenis from "lenis";

export const lenisRef: { current: Lenis | null } = { current: null };

export function scrollToId(id: string) {
  const el = id === "top" ? 0 : document.getElementById(id);
  if (el === null) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (lenisRef.current) lenisRef.current.scrollTo(el, { offset: el === 0 ? 0 : -64 });
  else gsap.to(window, { duration: reduce ? 0 : 0.8, ease: "power3.inOut", scrollTo: { y: el, offsetY: el === 0 ? 0 : 64 } });
  if (el !== 0) { el.setAttribute("tabindex", "-1"); el.focus({ preventScroll: true }); }
}

export const asset = (p: string) => `${import.meta.env.BASE_URL}${p}`;

type MagProps = AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: "primary" | "secondary"; children: ReactNode };

export function MagneticButton({ variant = "primary", className, children, ...rest }: MagProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  useMagnetic(ref);
  return (
    <a
      ref={ref}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-ring",
        variant === "primary"
          ? "bg-primary text-primary-foreground shadow-[0_0_30px_var(--glow)] hover:bg-primary/85"
          : "border border-border bg-card text-foreground hover:border-accent/50 hover:text-accent",
        className,
      )}
      {...rest}
    >
      {children}
    </a>
  );
}

export function SectionHeading({ id, label, title }: { id?: string; label: string; title: string }) {
  return (
    <div className="relative mb-12">
      <div className="glow-blob pointer-events-none absolute -left-10 -top-10 h-40 w-64" />
      <p className="reveal relative font-mono text-xs uppercase tracking-[0.2em] text-accent">{label}</p>
      <h2 id={id} className="reveal relative mt-3 [font-size:clamp(2rem,5vw+0.5rem,3.25rem)] text-foreground font-bold leading-tight tracking-tight glow-text">{title}</h2>
    </div>
  );
}

export const GithubIcon = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={p.className} aria-hidden>
    <path d="M12 .5C5.7.5.5 5.7.5 12a11.5 11.5 0 0 0 7.9 10.9c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12C23.5 5.7 18.3.5 12 .5Z" />
  </svg>
);
export const LinkedinIcon = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={p.className} aria-hidden>
    <path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2ZM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2Zm1.8 13.1H3.5V9h3.6v11.5ZM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0Z" />
  </svg>
);
