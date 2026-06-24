import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
        body: "Engineering and fabrication of a large-scale, heavy-duty industrial roller designed for long-term operational durability.",
      },
      {
        heading: "Pneumatic lift for prosthetic legs.",
        body: "Custom-made pneumatic lift, mountable to robot arm as an end effector. The lift uses suction cups designed for optimal grip on the prosthetic legs designed by the client. ",
      },
      {
        heading: "Pneumatic vacuum lift.",
        body: "Design of a pneumatic vacuum lift for safe handling of heavy metal sheets in an industrial environment.",
      },
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

function Index() {
  const [active, setActive] = useState<ServiceKey | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border px-6 py-4 grid grid-cols-3 items-center">
        <button
          type="button"
          onClick={() => {
            setActive(null);
            setImageIndex(0);
            setDisplayedIndex(0);
            setIsExiting(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
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
        <div className="hidden md:block" />
      </nav>

      <main>
        {/* Hero */}
        <header className="relative px-6 pt-24 pb-24 border-b border-border overflow-hidden">
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
        </header>

        {/* Services — clickable */}
        <section
          id="services"
          className={`grid md:grid-cols-2 border-b ${active ? "border-black" : "border-border"}`}
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
                  if (next) {
                    requestAnimationFrame(() => {
                      requestAnimationFrame(() => {
                        document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "center" });
                      });
                    });
                  }
                }}
                aria-pressed={isActive}
                className={`relative text-left p-6 border-b md:border-b-0 border-border transition-colors cursor-pointer focus:outline-none focus-visible:bg-card ${
                  i < 2 ? "md:border-r" : ""
                } ${isActive ? "bg-black text-white" : "hover:bg-card"} flex flex-col min-h-[28vh]`}
              >
                <span
                  className={`block font-montserrat text-[10px] self-start ${isActive ? "text-background/70" : "text-muted-foreground"}`}
                >
                  {s.tag}
                </span>
                <div className="flex-1 flex flex-col items-center justify-center w-full">
                  <h3 className="font-montserrat font-medium text-3xl md:text-4xl tracking-tighter text-center">{s.title}</h3>
                  {s.body && <p className={`text-sm mt-2 ${isActive ? "text-background/70" : "text-muted-foreground"}`}>{s.body}</p>}
                </div>
                <span
                  className={`absolute bottom-6 right-6 font-montserrat text-[10px] uppercase tracking-widest ${
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
        <section id="work" className="p-6 md:p-12 scroll-mt-20 bg-black text-white">
            <div key={active} className="grid md:grid-cols-2 gap-8 animate-reveal">
              <div className="relative w-full aspect-square max-h-[75vh] bg-black px-[15%] pb-[5%] mx-auto">
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
                    {activeService.imageTexts?.[displayedIndex]?.heading}
                  </h3>
                  <p className="text-base text-background/70 text-pretty max-w-[50ch]">
                    {activeService.imageTexts?.[displayedIndex]?.body}
                  </p>
                  {active === "design" && (
                    <table className="w-full max-w-[50ch] mt-6 text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-background/20">
                          <th
                            colSpan={2}
                            className="py-2 text-center text-background/90 font-medium uppercase tracking-wider text-xs"
                          >
                            Technical specifications
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-background/20">
                          <td className="py-2 pr-4 text-background/90 font-medium">Tolerances</td>
                          <td className="py-2 text-background/70">Cylindricity 1 cm</td>
                        </tr>
                        <tr className="border-b border-background/20">
                          <td className="py-2 pr-4 text-background/90 font-medium">Length</td>
                          <td className="py-2 text-background/70">12m</td>
                        </tr>
                        <tr className="border-b border-background/20">
                          <td className="py-2 pr-4 text-background/90 font-medium">Diameter</td>
                          <td className="py-2 text-background/70">2m</td>
                        </tr>
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Contact */}
        <footer id="contact" className="px-6 py-24 border-t border-border">
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
