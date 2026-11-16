import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { shared } from "@/data/content";

export function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);
  useGSAP(
    () => {
      const counter = { v: 0 };
      const num = root.current!.querySelector(".pl-num")!;
      gsap
        .timeline({ onComplete: () => { setGone(true); onDone(); } })
        .from(".pl-mono", { yPercent: 100, opacity: 0, duration: 0.4, ease: "power3.out" })
        .to(counter, {
          v: 100, duration: 0.9, ease: "power2.inOut",
          onUpdate: () => { num.textContent = String(Math.round(counter.v)).padStart(3, "0"); },
        }, 0)
        .to(".pl-inner", { opacity: 0, y: -20, duration: 0.25 })
        .to(root.current, { yPercent: -100, duration: 0.6, ease: "power4.inOut" }, "-=0.05");
    },
    { scope: root },
  );
  if (gone) return null;
  return (
    <div ref={root} className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <div className="pl-inner flex flex-col items-center gap-4">
        <div className="overflow-hidden">
          <span className="pl-mono block text-6xl font-bold tracking-tighter glow-text">{shared.monogram}</span>
        </div>
        <span className="pl-num font-mono text-sm text-accent">000</span>
      </div>
    </div>
  );
}
