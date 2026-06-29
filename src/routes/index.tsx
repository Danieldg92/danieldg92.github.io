import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";

import cylinder from "@/assets/Cylinder.jpg";
import vakuumprotes from "@/assets/VakuumprotesRENDER.png";
import vaakumlyft from "@/assets/vaakumlyft.png";
import manasi from "@/assets/manasi.png";
import ninja from "@/assets/Ninja.jpg";
import designF2 from "@/assets/DesignF2.png";
import boursin from "@/assets/boursin.jpg";

import hm from "@/assets/HM.jpg";

import logga from "@/assets/dgd-logo.png";
import loggaJpg from "@/assets/Logga.jpg";
import hmClean from "@/assets/HMclean.png";

const HERO_SLIDESHOW = [logga, manasi, hmClean, boursin, cylinder, vakuumprotes, vaakumlyft, designF2];

export const Route = createFileRoute("/")({
  component: Index,
});

type ServiceKey = "design" | "cnc";

const SERVICES: Record<
  ServiceKey,
  {
    title: string;
    body?: string;
    images: string[];
    imageCaptions: string[];
    imageBullets?: { label: string; value: string }[][];
    imageTexts?: { heading: string; body: string }[];
    imageTables: { label: string; value: string }[][];
  }
> = {
  design: {
    title: "Technical solutions",
    images: [cylinder, vakuumprotes, vaakumlyft],
    imageCaptions: [
      "Large scale poster roller",
      "Pneumatic lift for prosthetic legs",
      "Pneumatic vacuum lift for metal sheets",
    ],
    imageTexts: [
      {
        heading: "Large scale poster roller.",
        body: "Engineering and fabrication of a largescale, heavy-duty industrial roller designed for 24/7 operation. Minimal service required. Turnkey project from concept to deliverable. Only the axial bearings are stock items.",
      },
      {
        heading: "Pneumatic lift for prosthetic legs.",
        body: "Custom-made pneumatic lift, mountable to robot arm as an end effector. The lift uses suction cups designed for optimal grip on the curved carbon fibre prosthetic leg component. Includes vacuum-controller with low vacuum alarm and self flushing system in case of accidental water infusion.",
      },
      {
        heading: "Pneumatic vacuum lift.",
        body: "Design of a pneumatic vacuum lift for safe handling of heavy metal sheets in an industrial environment.",
      },
    ],
    imageTables: [
      [
        { label: "—", value: "—" },
        { label: "—", value: "—" },
        { label: "—", value: "—" },
      ],
      [
        { label: "—", value: "—" },
        { label: "—", value: "—" },
        { label: "—", value: "—" },
      ],
      [
        { label: "—", value: "—" },
        { label: "—", value: "—" },
        { label: "—", value: "—" },
      ],
    ],
  },
  cnc: {
    title: "Design and company events",
    images: [manasi, hm, loggaJpg, boursin, designF2, ninja],
    imageCaptions: [
      "Perfume bottle cap",
      "Large scale 3D-print for showroom",
      "Glow-in-the-dark representation of company logo",
      "Wheel of fortune for company event",
      "NIKE CUP CLASH, a prestigious trophy",
      "Wheel of fortune and booth for company event",
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
        heading: "Perfume bottle cap.",
        body: "Design and manufacturing of bottle cap for a cosmetics company.",
      },
      {
        heading: "Showroom piece.",
        body: "Form design for manufacturability of a larger 3D-piece with hollowness to allow for internal lighting.",
      },
      {
        heading: "Large scale logo representation.",
        body: "Glow-in-the-dark representation of logo for company event with focus on visual aesthetics.",
      },
      {
        heading: "Wheel of fortune.",
        body: "Design and construction of a wheel of fortune, sheated with textiles printed with company design visuals. Laser engraved wooden blanks for price winnings.",
      },
      {
        heading: "Medal for company event.",
        body: "A prestigious trophy designed for the sharpest of gamers, awarded to the top players in a company computer game tournament.",
      },
      {
        heading: "Wheel of fortune and booth.",
        body: "Design and construction of a wheel of fortune, sheated with textiles printed with company design visuals.",
      },
    ],
  },
};

const SERVICE_ORDER: ServiceKey[] = ["design", "cnc"];

type Mode = 0 | 1 | 2 | 3; // 0 hero, 1 services, 2 servicesActive, 3 contact

function Index() {
  const [active, setActive] = useState<ServiceKey | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const [mode, setMode] = useState<Mode>(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroSlide((i) => (i + 1) % HERO_SLIDESHOW.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Hide native scrollbar and disable wheel/touch scrolling — arrow keys drive navigation
  useEffect(() => {
    const prevent = (e: Event) => e.preventDefault();
    window.addEventListener("wheel", prevent, { passive: false });
    window.addEventListener("touchmove", prevent, { passive: false });
    document.documentElement.classList.add("no-scrollbar");
    return () => {
      window.removeEventListener("wheel", prevent);
      window.removeEventListener("touchmove", prevent);
      document.documentElement.classList.remove("no-scrollbar");
    };
  }, []);

  // Smooth scroll helper with longer duration and ease-out-expo easing
  const smoothScrollTo = (targetY: number, duration = 1200) => {
    const startY = window.scrollY;
    const diff = targetY - startY;
    const startTime = performance.now();
    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + diff * easeOutExpo(progress));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  // When mode changes, sync active service and scroll the corresponding section into view
  useEffect(() => {
    if (mode === 2) {
      setActive((a) => a ?? "design");
      setImageIndex(0);
      setDisplayedIndex(0);
      setIsExiting(false);
    } else {
      setActive(null);
    }
    const id = mode === 0 ? null : mode === 1 ? "services" : mode === 2 ? "work" : "contact";
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (id === null) {
          smoothScrollTo(0);
        } else {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            const targetY = window.scrollY + rect.top - window.innerHeight / 2 + rect.height / 2;
            smoothScrollTo(targetY);
          }
        }
      });
    });
  }, [mode]);

  // Keyboard navigation: ArrowUp/Down switch modes (skipping mode 2 unless reached via click).
  // ArrowLeft/Right cycle service images only when in mode 2.
  useEffect(() => {
    const nextMode = (m: Mode): Mode => {
      if (m === 0) return 1;
      if (m === 1) return 3;
      if (m === 2) return 3;
      return 3;
    };
    const prevMode = (m: Mode): Mode => {
      if (m === 3) return 1;
      if (m === 2) return 1;
      if (m === 1) return 0;
      return 0;
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setMode((m) => nextMode(m));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setMode((m) => prevMode(m));
      } else if (mode === 2 && activeService && activeService.images.length > 1) {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          setImageIndex((i) => (i - 1 + activeService.images.length) % activeService.images.length);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          setImageIndex((i) => (i + 1) % activeService.images.length);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mode, activeService]);


  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border px-6 py-4 grid grid-cols-3 items-center">
        <button
          type="button"
          onClick={() => setMode(0)}
          className="flex items-center gap-3 focus:outline-none cursor-pointer"
        >
          <img src={logga} alt="DG Development logo" className="h-8 w-auto" />
          <span className="font-display text-lg tracking-tighter uppercase font-extrabold">DG Development</span>
        </button>
        <div className="hidden md:flex gap-8 text-[10px] font-montserrat uppercase tracking-widest justify-self-center">
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              setMode(1);
            }}
            className="hover:text-primary transition-colors"
          >
            01. Services
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              setMode(3);
            }}
            className="hover:text-primary transition-colors"
          >
            02. Contact
          </a>
        </div>
        <div className="hidden md:block" />
      </nav>

      <main>
        {/* Hero */}
        <header className={`relative px-6 pt-24 pb-24 border-b border-border overflow-hidden flex flex-col justify-center min-h-[calc(100svh-65px)] ${mode === 0 ? "z-[60]" : ""}`}>

          <div aria-hidden className="absolute inset-0 pointer-events-none">
            {HERO_SLIDESHOW.map((src, i) => (
              <img
                key={src}
                src={src}
                alt=""
                className={`absolute inset-0 w-full h-full transition-opacity duration-[1500ms] ease-in-out ${
                  src === logga || src === designF2 ? "object-contain scale-125" : "object-cover"
                } ${i === heroSlide ? "opacity-20" : "opacity-0"} ${src === hmClean ? "object-[15%_center]" : ""}`}
              />
            ))}
          </div>
          <div className="@container relative">
            <div className="relative flex items-stretch animate-reveal [animation-delay:100ms]">
              <div className="w-1/2 flex justify-end pr-[3cqi]">
                <h1 className="text-[clamp(2.5rem,6cqi,12rem)] font-display font-extrabold leading-[0.9] tracking-tighter text-balance flex flex-col gap-[1cqi]">
                  <span className="text-muted-foreground">FROM</span>
                  <span>IDEA</span>
                  <span className="text-muted-foreground">TO</span>
                  <span>PRODUCT</span>
                </h1>
              </div>
              <div className="self-stretch w-[clamp(1px,0.1cqi,2.5px)] bg-foreground" />
              <div className="w-1/2 flex justify-center items-center pl-[3cqi]">
                <h2 className="text-[clamp(2rem,5cqi,10rem)] font-display font-extrabold leading-[0.9] tracking-tighter text-balance text-center">
                  DG Development
                </h2>
              </div>
            </div>
          </div>
          <button
            type="button"
            aria-label="Scroll to services"
            onClick={() => setMode(1)}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 focus:outline-none cursor-pointer"
          >
            <ChevronDown
              size={56}
              className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-125"
              strokeWidth={2.5}
              absoluteStrokeWidth
              strokeLinecap="butt"
              strokeLinejoin="miter"
            />
          </button>
        </header>


        {/* Services — clickable */}
        <section
          id="services"
          className={`relative grid md:grid-cols-2 border-b border-border ${mode === 1 ? "z-[60]" : ""}`}
        >
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
                  setMode(next ? 2 : 1);
                }}
                aria-pressed={isActive}
                className={`relative text-left p-6 border-b md:border-b-0 border-border transition-colors cursor-pointer focus:outline-none group ${
                  i < 2 ? "md:border-r" : ""
                } bg-background hover:text-primary flex flex-col min-h-[28vh]`}
              >
                <div className="flex-1 flex flex-col items-center justify-center w-full">
                  <h3 className="font-montserrat font-light text-3xl md:text-4xl tracking-tighter text-center group-hover:text-primary">{s.title}</h3>
                  {s.body && <p className="text-sm mt-2 text-muted-foreground">{s.body}</p>}
                </div>
                <span
                  className={`absolute bottom-6 right-6 font-montserrat text-[10px] uppercase tracking-widest ${
                    isActive ? "text-primary" : "text-foreground group-hover:text-primary"
                  }`}
                >
                  {isActive ? "[ Viewing ]" : "View →"}
                </span>
              </button>
            );
          })}
        </section>

        {/* Tinted glass blur overlay — highlights the focused section in every mode except hero */}
        <div
          className={`fixed inset-0 z-50 bg-foreground/40 backdrop-blur-md transition-opacity duration-1000 pointer-events-none ${mode === 0 ? "opacity-0" : "opacity-100"}`}
          aria-hidden="true"
        />

        {/* Fixed mode navigation arrows (above the blur overlay) */}
        {mode === 1 && (
          <>
            <button
              type="button"
              aria-label="Back to hero"
              onClick={() => setMode(0)}
              className="fixed top-4 left-1/2 -translate-x-1/2 z-[70] focus:outline-none cursor-pointer"
            >
              <ChevronUp
                size={56}
                className="text-background hover:text-background/80 transition-all duration-300 hover:scale-125"
                strokeWidth={2.5}
                absoluteStrokeWidth
                strokeLinecap="butt"
                strokeLinejoin="miter"
              />
            </button>
            <button
              type="button"
              aria-label="Go to contact"
              onClick={() => setMode(3)}
              className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[70] focus:outline-none cursor-pointer"
            >
              <ChevronDown
                size={56}
                className="text-background hover:text-background/80 transition-all duration-300 hover:scale-125"
                strokeWidth={2.5}
                absoluteStrokeWidth
                strokeLinecap="butt"
                strokeLinejoin="miter"
              />
            </button>
          </>
        )}
        {mode === 2 && (
          <>
            <button
              type="button"
              aria-label="Back to services"
              onClick={() => setMode(1)}
              className="fixed top-4 left-1/2 -translate-x-1/2 z-[70] focus:outline-none cursor-pointer"
            >
              <ChevronUp
                size={56}
                className="text-background hover:text-background/80 transition-all duration-300 hover:scale-125"
                strokeWidth={2.5}
                absoluteStrokeWidth
                strokeLinecap="butt"
                strokeLinejoin="miter"
              />
            </button>
            <button
              type="button"
              aria-label="Go to contact"
              onClick={() => setMode(3)}
              className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[70] focus:outline-none cursor-pointer"
            >
              <ChevronDown
                size={56}
                className="text-background hover:text-background/80 transition-all duration-300 hover:scale-125"
                strokeWidth={2.5}
                absoluteStrokeWidth
                strokeLinecap="butt"
                strokeLinejoin="miter"
              />
            </button>
          </>
        )}

        {/* Service detail (reactive to selected service) */}
        {activeService && (
        <section id="work" className={`p-6 md:p-12 scroll-mt-20 bg-background text-foreground relative ${mode === 2 ? "z-[60]" : ""}`}>

            <div key={active} className="grid md:grid-cols-2 gap-8 animate-reveal">
              <div className="relative w-full aspect-square max-h-[55vh] bg-background px-[15%] pb-[5%] mx-auto">
                <img
                  src={activeService.images[imageIndex] ?? activeService.images[0]}
                  alt={activeService.imageCaptions[imageIndex] ?? activeService.title}
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
                  className="fixed left-4 top-1/2 -translate-y-1/2 z-[70] text-muted-foreground hover:text-foreground/90 transition-all duration-200 hover:scale-125 focus:outline-none"
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
                  className="fixed right-4 top-1/2 -translate-y-1/2 z-[70] text-muted-foreground hover:text-foreground/90 transition-all duration-200 hover:scale-125 focus:outline-none"
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
                    {activeService.imageTexts?.[displayedIndex]?.heading}
                  </h3>
                  <p className="text-base text-foreground/70 text-pretty max-w-[50ch]">
                    {activeService.imageTexts?.[displayedIndex]?.body}
                  </p>
                  {active === "design" && displayedIndex === 0 && (
                    <table className="w-full max-w-[50ch] mt-6 text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-foreground/20">
                          <th
                            colSpan={2}
                            className="py-2 text-center text-foreground/90 font-medium uppercase tracking-wider text-xs"
                          >
                            Technical specifications
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-foreground/20">
                          <td className="py-2 pr-4 text-foreground/90 font-medium">Length</td>
                          <td className="py-2 text-foreground/70">10.5m</td>
                        </tr>
                        <tr className="border-b border-foreground/20">
                          <td className="py-2 pr-4 text-foreground/90 font-medium">Tolerance</td>
                          <td className="py-2 text-foreground/70">{"Radial: < +/- 1mm"}</td>
                        </tr>
                        <tr className="border-b border-foreground/20">
                          <td className="py-2 pr-4 text-foreground/90 font-medium">Diameter</td>
                          <td className="py-2 text-foreground/70">2.1m</td>
                        </tr>
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {mode === 3 && (
          <button
            type="button"
            aria-label="Back to services"
            onClick={() => setMode(1)}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[70] focus:outline-none cursor-pointer"
          >
            <ChevronUp
              size={56}
              className="text-background hover:text-background/80 transition-all duration-300 hover:scale-125"
              strokeWidth={2.5}
              absoluteStrokeWidth
              strokeLinecap="butt"
              strokeLinejoin="miter"
            />
          </button>
        )}

        {/* Contact */}
        <footer id="contact" className={`relative px-6 py-24 border-t border-border bg-background ${mode === 3 ? "z-[60]" : ""}`}>
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-montserrat text-[10px] uppercase tracking-widest text-primary mb-8">Contact us</p>
            <a
              href="mailto:info@dgd.solutions"
              className="font-display font-extrabold text-4xl md:text-7xl tracking-tighter hover:text-primary transition-colors underline decoration-border decoration-1 underline-offset-8 break-all"
            >
              info@dgd.solutions
            </a>
            <div className="mt-16 pt-8 border-t border-border text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              © 2026 DG Development. All tolerances reserved.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
