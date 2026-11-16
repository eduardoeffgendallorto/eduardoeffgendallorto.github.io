import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { lenisRef } from "@/components/portfolio/ui";

/** Smooth scroll synced with ScrollTrigger. Disabled when `enabled` is false (reduced motion). */
export function useLenis(enabled: boolean | null) {
  useEffect(() => {
    if (!enabled) return;
    const lenis = new Lenis();
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(tick); lenis.destroy(); lenisRef.current = null; };
  }, [enabled]);
}
