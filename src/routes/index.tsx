import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { gsap, ScrollTrigger, registerGsap, useGSAP } from "@/lib/gsap";
import { LangProvider, useLang } from "@/lib/lang";
import { content } from "@/data/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useLenis } from "@/hooks/useLenis";
import { Preloader } from "@/components/portfolio/Preloader";
import { Navbar } from "@/components/portfolio/Navbar";
import { Cursor } from "@/components/portfolio/Cursor";
import { Hero } from "@/components/portfolio/Hero";
import { About, Projects, Stack } from "@/components/portfolio/Part2";
import { Journey } from "@/components/sections/Journey";
import { Process } from "@/components/sections/Process";
import { Beyond } from "@/components/sections/Beyond";
import { Contact } from "@/components/sections/Contact";

registerGsap();

const TITLE = "Eduardo Effgen Dall'Orto | Portfólio de Engenharia de Software";
const DESC_PT = "Portfólio de Eduardo Effgen Dall'Orto, estudante de Engenharia de Software na UVV: projetos em Python, MySQL e UX/UI. Disponível para estágio à tarde.";
const DESC_EN = "Portfolio of Eduardo Effgen Dall'Orto, Software Engineering student at UVV: Python, MySQL and UX/UI projects. Available for an afternoon internship.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: `${DESC_PT} | EN: ${DESC_EN}` },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC_PT },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:locale:alternate", content: "en_US" },
      { property: "og:url", content: "https://eduardoeffgen.com.br" },
      { property: "og:image", content: "https://eduardoeffgen.com.br/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Eduardo Effgen Dall'Orto, estudante de Engenharia de Software" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC_EN },
      { name: "twitter:image", content: "https://eduardoeffgen.com.br/og-image.png" },
      { name: "twitter:image:alt", content: "Eduardo Effgen Dall'Orto, estudante de Engenharia de Software" },
    ],
    links: [{ rel: "canonical", href: "https://eduardoeffgen.com.br" }],
  }),
  component: () => (
    <LangProvider>
      <Page />
    </LangProvider>
  ),
});

function Page() {
  const reduce = useReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const ready = loaded || reduce === true;
  const { lang, t } = useLang();
  useLenis(reduce === false);

  useEffect(() => {
    registerGsap();
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  useGSAP(
    () => {
      if (reduce === false)
        gsap.utils.toArray<HTMLElement>("section:not(#home) .reveal").forEach((el) =>
          gsap.from(el, { y: 30, opacity: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } }),
        );
      ScrollTrigger.refresh();
    },
    { dependencies: [lang, reduce], revertOnUpdate: true },
  );

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <a
        href="#main"
        className="sr-only z-[120] rounded-full bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {t(content.contact.skip)}
      </a>
      <div className="bg-grid pointer-events-none absolute inset-0 h-[140vh]" />
      {reduce !== true && <Preloader onDone={() => setLoaded(true)} />}
      <Cursor />
      <Navbar />
      <main id="main" tabIndex={-1} className="relative outline-none">
        <Hero ready={ready} />
        <About />
        <Projects />
        <Stack />
        <Journey />
        <Process />
        <Beyond />
        <Contact />
      </main>
    </div>
  );
}
