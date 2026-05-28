import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import cylinder from "@/assets/Cylinder.jpg";
import vakuumprotes from "@/assets/Vakuumprotes.jpg";
import vaakumlyft from "@/assets/vaakumlyft.png";
import manasi from "@/assets/manasi.png";
import designF2 from "@/assets/DesignF2.png";
import boursin from "@/assets/boursin.jpg";
import ninja from "@/assets/Ninja.jpg";
import hm from "@/assets/HM.jpg";
import logga from "@/assets/Logga.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

type ServiceKey = "design" | "cnc";

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
    title: "Technical solutions",
    body: "Parametric CAD modeling with tolerances according to ISO standards.",
    images: [cylinder, vakuumprotes, vaakumlyft],
    imageCaptions: [
      "Cylinder – technical solution",
      "Vacuum prosthesis – technical solution",
      "Pneumatic vacuum lift for metal sheets",
    ],
    alt: "Technical solutions – CAD and product development",
    detailHeading: "From sketch to manufacturable file.",
    detailBody:
      "We turn ideas into production-ready CAD. Every part is designed parametrically and documented with tolerances for direct manufacturing.",
    bullets: [
      { label: "Parametric CAD", value: "SolidWorks · Fusion 360 · Onshape" },
      { label: "Output", value: "STEP files · 2D drawings · BOM" },
    ],
    imageTexts: [
      {
        heading: "Cylinder – technical solution.",
        body: "Parametric CAD model of a custom cylinder, documented with tolerances for direct production.",
      },
      {
        heading: "Vacuum prosthesis – technical solution.",
        body: "Custom-made prosthesis developed in close collaboration with the user, from concept to production-ready file.",
      },
      {
        heading: "Pneumatic vacuum lift.",
        body: "Design of a pneumatic vacuum lift for safe handling of heavy metal sheets in an industrial environment.",
      },
    ],
  },
  cnc: {
    tag: "02/DESIGN",
    title: "Design and form",
    body: "We create function, feeling, and aesthetics that fit your vision.",
    images: [manasi, hm, logga, boursin, designF2, ninja],
    imageCaptions: [
      "Manasi 7, a collaboration with Manasi to bring out their vision",
      "HM – design and form",
      "Logo – design and form",
      "Boursin – corporate event",
      "NIKE CUP CLASH, a prestigious trophy",
      "Ninja Casino – event and installation",
    ],
    alt: "Manasi – design and form of a perfume bottle",
    detailHeading: "Through creative collaboration.",
    detailBody: "We create function, feeling, and aesthetics that fit your vision.",
    bullets: [
      { label: "Material", value: "Jasmonite" },
      { label: "Tolerance", value: "±0.1 mm" },
      { label: "Method", value: "Casting" },
    ],
    imageBullets: [
      [
        { label: "Material", value: "Jasmonite" },
        { label: "Tolerance", value: "±0.1 mm" },
        { label: "Method", value: "Casting" },
      ],
      [
        { label: "Material", value: "PLA" },
        { label: "Design", value: "Blender" },
        { label: "Method", value: "3D printing" },
      ],
      [
        { label: "Process", value: "Concept · Construction · Production" },
        { label: "Finish", value: "Custom · Brand-adapted" },
        { label: "Lead time", value: "5 — 10 days" },
      ],
    ],
    imageTexts: [
      {
        heading: "Manasi 7 – a creative collaboration.",
        body: "Together with Manasi we shaped a perfume bottle that captures the brand's vision in every detail.",
      },
      {
        heading: "HM – design and form.",
        body: "Form and function in harmony — a design project where aesthetics and manufacturing meet.",
      },
      {
        heading: "Logo – visual identity.",
        body: "We design visual identities that live from sketch to finished product.",
      },
      {
        heading: "Boursin – corporate event.",
        body: "A custom installation that elevates the brand and creates memorable experiences for visitors.",
      },
      {
        heading: "NIKE Cup Clash.",
        body: "A prestigious trophy designed for the sharpest of gamers — powerful form, precise manufacturing.",
      },
      {
        heading: "Ninja Casino – event and installation.",
        body: "An eye-catching event solution with a tent, spinning wheel, and graphics that capture attention and engage visitors.",
      },
    ],
  },
};

const SERVICE_ORDER: ServiceKey[] = ["design", "cnc"];

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
            01. Services
          </a>
          <a href="#contact" className="hover:text-primary transition-colors">
            02. Contact
          </a>
        </div>
        <div className="hidden md:block w-[140px]" />
      </nav>

      <main>
        {/* Hero */}
        <header className="px-6 pt-24 pb-24 border-b border-border">
          <div className="flex items-stretch animate-reveal [animation-delay:100ms]">
            <div className="w-1/2 flex justify-end pr-8 md:pr-12">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold leading-[0.9] tracking-tighter text-balance flex flex-col gap-2 md:gap-4">
                <span className="text-muted-foreground">FROM</span>
                <span>IDEA</span>
                <span className="text-muted-foreground">TO</span>
                <span>PRODUCT</span>
              </h1>
            </div>
            <div className="self-stretch w-px bg-foreground" />
            <div className="w-1/2 flex flex-col gap-2 justify-center items-center pl-8 md:pl-12">
              <h2 className="text-4xl md:text-[5vw] font-display font-extrabold leading-[0.9] tracking-tighter text-balance text-center">
                DG Development
              </h2>
              <p className="text-lg text-pretty max-w-[45ch] text-center">
                Designed for Use. Developed for Experience.
              </p>
            </div>
          </div>
        </header>


        {/* Services — clickable */}
        <section id="services" className={`grid md:grid-cols-2 border-b ${active ? "border-foreground" : "border-border"}`}>
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
                    requestAnimationFrame(() => {
                      requestAnimationFrame(() => {
                        document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "center" });
                      });
                    });
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
              <div className="relative w-full aspect-square max-h-[75vh] bg-foreground px-[15%] pb-[5%] mx-auto">
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
              <div className="flex flex-col justify-center gap-8">
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
              </div>
            </div>
          </section>
        )}


        {/* Contact */}
        <footer id="contact" className="px-6 py-24 border-t border-border">
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-8">Contact us</p>
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
