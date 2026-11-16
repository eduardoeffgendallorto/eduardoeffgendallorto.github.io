import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { DESKTOP_HOVER } from "@/hooks/useMagnetic";

/** Custom cursor follower — desktop with fine pointer only. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(DESKTOP_HOVER, () => {
      gsap.set([dot.current, ring.current], { display: "block", xPercent: -50, yPercent: -50 });
      const dx = gsap.quickTo(dot.current, "x", { duration: 0.1, ease: "power3" });
      const dy = gsap.quickTo(dot.current, "y", { duration: 0.1, ease: "power3" });
      const rx = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
      const ry = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });
      const move = (e: PointerEvent) => {
        dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
        const hot = (e.target as Element | null)?.closest("a, button");
        gsap.to(ring.current, { scale: hot ? 1.8 : 1, opacity: hot ? 0.6 : 1, duration: 0.3, overwrite: "auto" });
      };
      window.addEventListener("pointermove", move);
      return () => { window.removeEventListener("pointermove", move); gsap.set([dot.current, ring.current], { display: "none" }); };
    });
    return () => mm.revert();
  });
  return (
    <>
      <div ref={ring} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-9 w-9 rounded-full border border-accent/70" />
      <div ref={dot} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[91] hidden h-1.5 w-1.5 rounded-full bg-accent" />
    </>
  );
}
