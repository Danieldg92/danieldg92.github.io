import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import cylinder from "@/assets/Cylinder.jpg";
import vakuumprotes from "@/assets/Vakuumprotes.jpg";
import vaakumlyft from "@/assets/vaakumlyft.png";
import manasi from "@/assets/manasi.png";
import designF2 from "@/assets/DesignF2.png";
import boursin from "@/assets/boursin.jpg";
import hm from "@/assets/HM.jpg";
import logga from "@/assets/Logga.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

type ServiceKey = "design" | "cnc" | "mould";

const SERVICES: Record<
  ServiceKey,
  {
    tag: string;
    title: string;
    body: string;
    images: string[];
    imageCaptions: string[];
    alt: string;
    detailHeading: string;
    detailBody: string;
    bullets: { label: string; value: string }[];
    imageBullets?: { label: string; value: string }[][];
    imageTexts?: { heading: string; body: string }[];
  }
> = {
  design: {
    tag: "01/DESIGN",
    title: "Tekniska lösningar",
    body: "Parametrisk CAD modellering med toleranser enligt ISO-standard.",
    images: [cylinder, vakuumprotes, vaakumlyft],
    imageCaptions: [
      "Cylinder – teknisk lösning",
      "Vakuumprotes – teknisk lösning",
      "Pneumatisk vakuumsug för lyft av metallskivor",
    ],
    alt: "Tekniska lösningar – CAD och produktutveckling",
    detailHeading: "From sketch to manufacturable file.",
    detailBody:
      "Vi förvandlar idéer till produktions-redo CAD. Varje del är designad parametriskt, och dokumenterade med toleranser för direkt produktion.",
    bullets: [
      { label: "Parametric CAD", value: "SolidWorks · Fusion 360 · Onshape" },
      { label: "Output", value: "STEP-filer · 2D ritningar · BOM" },
    ],
    imageTexts: [
      {
        heading: "Cylinder – teknisk lösning.",
        body: "Parametrisk CAD-modell av en kundanpassad cylinder, dokumenterad med toleranser för direkt produktion.",
      },
      {
        heading: "Vakuumprotes – teknisk lösning.",
        body: "Skräddarsydd protes utvecklad i nära samarbete med användaren, från koncept till produktionsfärdig fil.",
      },
      {
        heading: "Pneumatisk vakuumsug.",
        body: "Konstruktion av ett pneumatiskt vakuumsuglyft för säker hantering av tunga metallskivor i industrimiljö.",
      },
    ],
  },
  cnc: {
    tag: "02/MANUFACTURE",
    title: "Design och formgivning",
    body: "Vi skapar funktion, känsla och estetik som passar in på er vision.",
    images: [manasi, hm, logga, designF2],
    imageCaptions: [
      "Manasi 7, ett samarbete med Manasi för att få fram deras vision",
      "HM – design och formgivning",
      "Logga – design och formgivning",
      "NIKE CUP CLASH, en prestigefylld trofé för de skarpaste av gejmers",
    ],
    alt: "Manasi – design och formgivning av parfymflaska",
    detailHeading: "Med kreativt samarbete.",
    detailBody: "Skapar vi funktion, känsla och estetik som passar in på er vision.",
    bullets: [
      { label: "Material", value: "Jasmonite" },
      { label: "Tolerans", value: "±0.1 mm" },
      { label: "Metod", value: "Gjutning" },
    ],
    imageBullets: [
      [
        { label: "Material", value: "Jasmonite" },
        { label: "Tolerans", value: "±0.1 mm" },
        { label: "Metod", value: "Gjutning" },
      ],
      [
        { label: "Material", value: "PLA" },
        { label: "DESIGN", value: "BLENDER" },
        { label: "Metod", value: "3D-print" },
      ],
    ],
    imageTexts: [
      {
        heading: "Manasi 7 – ett kreativt samarbete.",
        body: "Tillsammans med Manasi formgav vi en parfymflaska som fångar varumärkets vision i varje detalj.",
      },
      {
        heading: "HM – design och formgivning.",
        body: "Form och funktion i samspel — ett designprojekt där estetik och tillverkning möts.",
      },
      {
        heading: "Logga – grafisk identitet.",
        body: "Vi formger visuella identiteter som lever från skiss till färdig produkt.",
      },
      {
        heading: "NIKE Cup Clash.",
        body: "En prestigefylld trofé designad för de skarpaste av gejmers — kraftfull form, precis tillverkning.",
      },
    ],
  },
  mould: {
    tag: "03/FORM",
    title: "Företagsevent",
    body: "Vi hjälper dig framhäva ditt varumärke med design och konstruktion för events.",
    images: [boursin],
    imageCaptions: ["Vi hjälper dig framhäva ditt varumärke med design och konstruktion för events."],
    alt: "Boursin – företagsevent med skräddarsydd installation",
    detailHeading: "Bridge tooling, production feel.",
    detailBody: "Vi hjälper dig framhäva ditt varumärke med hjälp av design och konstruktion för events.",
    bullets: [
      { label: "Process", value: "Koncept · Konstruktion · Produktion" },
      { label: "Finish", value: "Skräddarsytt · Varumärkesanpassat" },
      { label: "Lead time", value: "5 — 10 dagar" },
    ],
    imageTexts: [
      {
        heading: "Boursin – företagsevent.",
        body: "En skräddarsydd installation som lyfter varumärket och skapar minnesvärda upplevelser för besökarna.",
      },
    ],
  },
};

const SERVICE_ORDER: ServiceKey[] = ["design", "cnc", "mould"];

function Index() {
  const [active, setActive] = useState<ServiceKey | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const activeService = active ? SERVICES[active] : null;

  useEffect(() => {
    if (imageIndex === displayedIndex) return;
    setIsExiting(true);
    const t = setTimeout(() => {
      setDisplayedIndex(imageIndex);
      setIsExiting(false);
    }, 220);
    return () => clearTimeout(t);
  }, [imageIndex, displayedIndex]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="size-6 bg-foreground flex items-center justify-center">
            <div className="size-2 bg-primary" />
          </div>
          <span className="font-display text-lg tracking-tighter uppercase font-extrabold">DG Development</span>
        </div>
        <div className="hidden md:flex gap-8 text-[10px] font-mono uppercase tracking-widest">
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
            className="hover:text-primary transition-colors"
          >
            01. Tjänster
          </a>
          <a href="#contact" className="hover:text-primary transition-colors">
            02. Kontakt
          </a>
        </div>
        <div className="hidden md:block w-[140px]" />
      </nav>

      <main>
        {/* Hero */}
        <header className="px-6 pt-24 pb-24 border-b border-border">
          <div className="max-w-6xl">
            <div className="flex gap-8 md:gap-12 items-stretch animate-reveal [animation-delay:100ms]">
              <h1 className="text-7xl md:text-[10vw] font-display font-extrabold leading-[0.9] tracking-tighter text-balance flex flex-col gap-2 md:gap-4">
                <span className="text-muted-foreground">FRÅN</span>
                <span>IDÉ</span>
                <span className="text-muted-foreground">TILL</span>
                <span>PRODUKT</span>
              </h1>
              <div className="self-stretch w-px bg-foreground" />
              <div className="flex flex-col gap-6 justify-center">
                <h2 className="text-4xl md:text-[5vw] font-display font-extrabold leading-[0.9] tracking-tighter text-balance">
                  DG Development
                </h2>
                <p className="text-lg text-pretty max-w-[45ch]">
                  DG development är ett specialiserat design- och produktutvecklingsföretag som minskar klyftan mellan
                  digital design och verkliga produkter, med mål att nå just era specifika visioner.
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Services — clickable */}
        <section id="services" className={`grid md:grid-cols-3 border-b ${active ? "border-foreground" : "border-border"}`}>
          {SERVICE_ORDER.map((key, i) => {
            const s = SERVICES[key];
            const isActive = key === active;
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  const next = isActive ? null : key;
                  setActive(next);
                  setImageIndex(0);
                  setDisplayedIndex(0);
                  setIsExiting(false);
                  if (next) {
                    document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                aria-pressed={isActive}
                className={`text-left p-6 border-b md:border-b-0 border-border transition-colors cursor-pointer focus:outline-none focus-visible:bg-card ${
                  i < 2 ? "md:border-r" : ""
                } ${isActive ? "bg-foreground text-background" : "hover:bg-card"}`}
              >
                <span
                  className={`block font-mono text-[10px] mb-12 ${isActive ? "text-background/70" : "text-muted-foreground"}`}
                >
                  {s.tag}
                </span>
                <h3 className="font-display font-extrabold text-2xl tracking-tighter mb-4">{s.title}</h3>
                <p className={`text-sm ${isActive ? "text-background/70" : "text-muted-foreground"}`}>{s.body}</p>
                <span
                  className={`mt-6 inline-block font-mono text-[10px] uppercase tracking-widest ${
                    isActive ? "text-background/70" : "text-foreground"
                  }`}
                >
                  {isActive ? "[ Viewing ]" : "View →"}
                </span>
              </button>
            );
          })}
        </section>

        {/* Service detail (reactive to selected service) */}
        {activeService && (
          <section id="work" className="p-6 md:p-12 scroll-mt-20 bg-foreground text-background">
            <div className="flex justify-between items-end mb-12">
              <span className="font-mono text-[10px] text-background/70 hidden md:block">[ {activeService.tag} ]</span>
            </div>

            <div key={active} className="grid md:grid-cols-2 gap-8 animate-reveal">
              <div className="relative w-full aspect-square bg-foreground px-[15%] pb-[5%]">
                <img
                  src={activeService.images[imageIndex] ?? activeService.images[0]}
                  alt={activeService.alt}
                  width={1024}
                  height={1024}
                  className="w-full h-full object-contain rounded-lg"
                  loading="lazy"
                />
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={() => {
                    if (activeService.images.length < 2) return;
                    setImageIndex((i) => (i - 1 + activeService.images.length) % activeService.images.length);
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-background/90 transition-all duration-200 hover:scale-125 focus:outline-none"
                >
                  <ChevronLeft className="size-14" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={() => {
                    if (activeService.images.length < 2) return;
                    setImageIndex((i) => (i + 1) % activeService.images.length);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-background/90 transition-all duration-200 hover:scale-125 focus:outline-none"
                >
                  <ChevronRight className="size-14" strokeWidth={1.5} />
                </button>
              </div>
              <div className="flex flex-col justify-between gap-8">
                <div
                  key={displayedIndex}
                  className={`transition-all duration-300 ease-out ${
                    isExiting ? "opacity-0 translate-x-6" : "opacity-100 translate-x-0 animate-fade-in-right"
                  }`}
                >
                  <h3 className="font-display font-extrabold text-3xl md:text-4xl tracking-tighter leading-tight mb-6">
                    {activeService.imageTexts?.[displayedIndex]?.heading ?? activeService.detailHeading}
                  </h3>
                  <p className="text-base text-background/70 text-pretty max-w-[50ch]">
                    {activeService.imageTexts?.[displayedIndex]?.body ?? activeService.detailBody}
                  </p>
                </div>
                <dl
                  key={`bullets-${displayedIndex}`}
                  className={`border-t border-white/10 divide-y divide-white/10 transition-opacity duration-200 ${
                    isExiting ? "opacity-0" : "opacity-100"
                  }`}
                >
                  {(activeService.imageBullets?.[displayedIndex] ?? activeService.bullets).map((b) => (
                    <div
                      key={b.label}
                      className="grid grid-cols-2 gap-4 py-4 font-mono text-[11px] uppercase tracking-tighter"
                    >
                      <dt className="text-background/70">{b.label}</dt>
                      <dd>{b.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </section>
        )}


        {/* Contact */}
        <footer id="contact" className="px-6 py-24 border-t border-border">
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-8">Kontakta oss</p>
            <a
              href="mailto:info@dgd.solutions"
              className="font-display font-extrabold text-4xl md:text-7xl tracking-tighter hover:text-primary transition-colors underline decoration-border decoration-1 underline-offset-8 break-all"
            >
              info@dgd.solutions
            </a>
            <div className="grid md:grid-cols-3 gap-12 mt-24 text-[10px] font-mono uppercase tracking-tighter text-muted-foreground text-left">
              <div>
                <p className="text-foreground mb-2">Studio</p>
                <p>
                  42 Industrial Way
                  <br />
                  Ste 200, Brooklyn, NY
                </p>
              </div>
              <div>
                <p className="text-foreground mb-2">Digital</p>
                <p>
                  Instagram: @vorm_fab
                  <br />
                  LinkedIn: /vorm-fabric
                </p>
              </div>
              <div>
                <p className="text-foreground mb-2">Capacity</p>
                <p>
                  Current: 85% Load
                  <br />
                  Next Open: Dec 2026
                </p>
              </div>
            </div>
            <div className="mt-16 pt-8 border-t border-border text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              © 2026 Vorm-Fabric Studio. All tolerances reserved.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
