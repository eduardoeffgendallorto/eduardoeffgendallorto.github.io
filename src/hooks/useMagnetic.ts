import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export const DESKTOP_HOVER = "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

/** Magnetic pull towards the pointer — desktop with a fine pointer only. */
export function useMagnetic<E extends HTMLElement>(ref: RefObject<E | null>, strength = 0.3) {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(DESKTOP_HOVER, () => {
      const el = ref.current;
      if (!el) return;
      const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });
      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * strength);
        yTo((e.clientY - r.top - r.height / 2) * strength);
      };
      const leave = () => { xTo(0); yTo(0); };
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      return () => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); };
    });
    return () => mm.revert();
  });
}
