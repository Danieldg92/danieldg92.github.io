import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

function ScrollRevealBox({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`border border-white p-8 text-white text-base leading-relaxed transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}
import vaakumlyft from "@/assets/vaakumlyft.png";
import manasi from "@/assets/manasi.png";
import boursin from "@/assets/boursin.jpg";

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
    image: string;
    alt: string;
    detailHeading: string;
    detailBody: string;
    bullets: { label: string; value: string }[];
  }
> = {
  design: {
    tag: "01/DESIGN",
    title: "Tekniska lösningar",
    body: "Parametrisk CAD modellering med toleranser enligt ISO-standard.",
    image: vaakumlyft,
    alt: "Vakuumlyft – teknisk lösning för materialhantering",
    detailHeading: "From sketch to manufacturable file.",
    detailBody:
      "Vi förvandlar idéer till produktions-redo CAD. Varje del är designad parametriskt, och dokumenterade med toleranser för direkt produktion.",
    bullets: [
      { label: "Parametric CAD", value: "SolidWorks · Fusion 360 · Onshape" },
      { label: "Output", value: "STEP-filer · 2D ritningar · BOM" },
    ],
  },
  cnc: {
    tag: "02/MANUFACTURE",
    title: "Design och formgivning",
    body: "Vi skapar funktion, känsla och estetik som passar in på er vision.",
    image: manasi,
    alt: "Manasi – design och formgivning av parfymflaska",
    detailHeading: "Med kreativt samarbete.",
    detailBody: "Skapar vi funktion, känsla och estetik som passar in på er vision.",
    bullets: [
      { label: "Material", value: "Jasmonite" },
      { label: "Tolerans", value: "±0.1 mm" },
      { label: "Metod", value: "Gjutning" },
    ],
  },
  mould: {
    tag: "03/FORM",
    title: "Företagsevent",
    body: "Vi hjälper dig framhäva ditt varumärke med design och konstruktion för events.",
    image: boursin,
    alt: "Boursin – företagsevent med skräddarsydd installation",
    detailHeading: "Bridge tooling, production feel.",
    detailBody: "Vi hjälper dig framhäva ditt varumärke med hjälp av design och konstruktion för events.",
    bullets: [
      { label: "Process", value: "Koncept · Konstruktion · Produktion" },
      { label: "Finish", value: "Skräddarsytt · Varumärkesanpassat" },
      { label: "Lead time", value: "5 — 10 dagar" },
    ],
  },
};

const SERVICE_ORDER: ServiceKey[] = ["design", "cnc", "mould"];

function Index() {
  const [active, setActive] = useState<ServiceKey | null>(null);
  const activeService = active ? SERVICES[active] : null;

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
          <a href="#work" className="hover:text-primary transition-colors">
            02. Capabilities
          </a>
          <a href="#contact" className="hover:text-primary transition-colors">
            03. Kontakt
          </a>
        </div>
        <div className="text-[10px] font-mono text-primary">[ STATUS: ACTIVE ]</div>
      </nav>

      <main>
        {/* Hero */}
        <header className="px-6 pt-24 pb-24 border-b border-border">
          <div className="max-w-6xl">
            <div className="flex gap-8 md:gap-12 items-stretch animate-reveal [animation-delay:100ms]">
              <h1 className="text-7xl md:text-[10vw] font-display font-extrabold leading-[0.9] tracking-tighter text-balance flex flex-col gap-2 md:gap-4">
                <span>FRÅN</span>
                <span className="text-muted-foreground">IDÉ</span>
                <span>TILL</span>
                <span className="text-muted-foreground">PRODUKT</span>
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
              <div className="relative w-full aspect-square bg-foreground p-[5%]">
                <img
                  src={activeService.image}
                  alt={activeService.alt}
                  width={1024}
                  height={1024}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
                <ScrollRevealBox className="hidden md:block absolute left-full top-1/2 -translate-y-1/2 ml-8 w-72 z-10 bg-foreground">
                  {activeService.detailBody}
                </ScrollRevealBox>
              </div>
              <div className="flex flex-col justify-between gap-8">
                <div>
                  <h3 className="font-display font-extrabold text-3xl md:text-4xl tracking-tighter leading-tight mb-6">
                    {activeService.detailHeading}
                  </h3>
                  <p className="text-base text-background/70 text-pretty max-w-[50ch]">{activeService.detailBody}</p>
                </div>
                <dl className="border-t border-white/10 divide-y divide-white/10">
                  {activeService.bullets.map((b) => (
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

        {/* Process */}
        <section className="px-6 py-24 bg-foreground text-background">
          <div className="grid md:grid-cols-2 gap-24 max-w-7xl mx-auto">
            <div>
              <h2 className="font-display font-extrabold text-5xl tracking-tighter leading-none mb-8 italic">
                "The difference is felt in the radius."
              </h2>
              <p className="text-muted-foreground max-w-sm mb-12">
                Our workshop operates at the intersection of traditional machining and algorithmic design. We don't just
                manufacture; we refine.
              </p>
              <div className="space-y-6">
                {[
                  {
                    n: "01",
                    title: "Material Integrity",
                    body: "Certified aerospace-grade alloys and chemical-resistant polymers.",
                  },
                  {
                    n: "02",
                    title: "Rapid Tooling",
                    body: "Bridge production for testing before full-scale manufacturing.",
                  },
                  {
                    n: "03",
                    title: "Quality Verification",
                    body: "Micrometer-level inspection against the master CAD file.",
                  },
                ].map((s) => (
                  <div key={s.n} className="flex gap-4 border-t border-white/10 pt-4">
                    <span className="text-primary font-mono text-xs">{s.n}</span>
                    <div>
                      <h4 className="font-display font-extrabold text-lg uppercase">{s.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full aspect-[3/4] bg-white/5 border border-white/10 overflow-hidden">
              <img
                src={vaakumlyft}
                alt="Vakuumlyft – teknisk lösning"
                width={1024}
                height={1408}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Contact */}
        <footer id="contact" className="px-6 py-24 border-t border-border">
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-8">Start a project</p>
            <a
              href="mailto:hello@vormfabric.studio"
              className="font-display font-extrabold text-4xl md:text-7xl tracking-tighter hover:text-primary transition-colors underline decoration-border decoration-1 underline-offset-8 break-all"
            >
              hello@vormfabric.studio
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
