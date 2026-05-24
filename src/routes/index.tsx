import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import partCnc from "@/assets/part-cnc.jpg";
import partMould from "@/assets/part-mould.jpg";
import workshop from "@/assets/workshop.jpg";
import serviceDesign from "@/assets/service-design.jpg";
import serviceLaser from "@/assets/service-laser.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

type ServiceKey = "design" | "cnc" | "mould" | "laser";

const SERVICES: Record<ServiceKey, {
  tag: string;
  title: string;
  body: string;
  image: string;
  alt: string;
  detailHeading: string;
  detailBody: string;
  bullets: { label: string; value: string }[];
}> = {
  design: {
    tag: "01/DESIGN",
    title: "Technical solutions",
    body: "Parametric CAD modeling and FEA stress testing for complex assemblies.",
    image: serviceDesign,
    alt: "Parametric CAD model with dimensional tolerances on a workstation",
    detailHeading: "From sketch to manufacturable file.",
    detailBody:
      "We translate ideas into production-ready CAD. Every part is modeled parametrically, stress-tested against real loads, and documented with the tolerances your shop floor actually needs.",
    bullets: [
      { label: "Parametric CAD", value: "SolidWorks · Fusion 360" },
      { label: "Simulation", value: "FEA · Tolerance stacks" },
      { label: "Output", value: "STEP · 2D drawings · BOM" },
    ],
  },
  cnc: {
    tag: "02/MANUFACTURE",
    title: "Design och formgivning",
    body: "High-precision milling in aluminum, titanium, and engineering plastics.",
    image: partCnc,
    alt: "Black and white marbled cylindrical product design",
    detailHeading: "Cut once. Cut right.",
    detailBody:
      "Our 5-axis cells handle complex geometries in a single setup — from one-off prototypes to short-run production. Surface finishes inspected against the master file before they leave the shop.",
    bullets: [
      { label: "Materials", value: "Al · Ti · Steel · POM · PEEK" },
      { label: "Tolerance", value: "±0.01 mm" },
      { label: "Volume", value: "1 — 5,000 units" },
    ],
  },
  mould: {
    tag: "03/FORM",
    title: "Moulding & Tooling",
    body: "Custom silicone moulding and low-volume polyurethane casting.",
    image: partMould,
    alt: "Clear polyurethane cast enclosure for optic module",
    detailHeading: "Bridge tooling, production feel.",
    detailBody:
      "Silicone tools and vacuum-cast polyurethane parts deliver injection-grade aesthetics in days, not months. Perfect for validation runs, investor samples, and pilot batches before committing to steel.",
    bullets: [
      { label: "Process", value: "Silicone · PU casting" },
      { label: "Finish", value: "Optical clear · Soft-touch" },
      { label: "Lead time", value: "5 — 10 days" },
    ],
  },
  laser: {
    tag: "04/DETAIL",
    title: "Laser Engraving",
    body: "Fiber laser marking for permanent serialization and cosmetic branding.",
    image: serviceLaser,
    alt: "Fiber laser engraving a serial number into a brushed metal plate",
    detailHeading: "Marks that outlive the part.",
    detailBody:
      "Permanent, high-contrast marking on metals and engineered plastics. Logos, serial numbers, data-matrix codes — engraved to a depth that survives anodizing, abrasion, and chemical exposure.",
    bullets: [
      { label: "Source", value: "20 W fiber laser" },
      { label: "Substrates", value: "Metals · Anodized Al · Plastics" },
      { label: "Resolution", value: "0.02 mm line width" },
    ],
  },
};

const SERVICE_ORDER: ServiceKey[] = ["design", "cnc", "mould", "laser"];

function Index() {
  const [active, setActive] = useState<ServiceKey>("design");
  const activeService = SERVICES[active];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="size-6 bg-foreground flex items-center justify-center">
            <div className="size-2 bg-primary" />
          </div>
          <span className="font-display text-lg tracking-tighter uppercase font-extrabold">
            Vorm-Fabric
          </span>
        </div>
        <div className="hidden md:flex gap-8 text-[10px] font-mono uppercase tracking-widest">
          <a href="#services" className="hover:text-primary transition-colors">01. Services</a>
          <a href="#work" className="hover:text-primary transition-colors">02. Capabilities</a>
          <a href="#contact" className="hover:text-primary transition-colors">03. Inquiry</a>
        </div>
        <div className="text-[10px] font-mono text-primary">[ STATUS: ACTIVE ]</div>
      </nav>

      <main>
        {/* Hero */}
        <header className="px-6 pt-24 pb-12 border-b border-border">
          <div className="max-w-6xl">
            <div className="inline-block px-2 py-1 bg-foreground text-background font-mono text-[10px] mb-8 animate-reveal">
              PROTOTYPE TO PRODUCTION STUDIO
            </div>
            <h1 className="text-7xl md:text-[10vw] font-display font-extrabold leading-[0.9] tracking-tighter text-balance mb-12 animate-reveal [animation-delay:100ms]">
              TOLERANCE <br />
              <span className="text-muted-foreground">IS NOT</span> <br />
              NEGOTIABLE.
            </h1>
            <div className="grid md:grid-cols-2 gap-12 animate-reveal [animation-delay:200ms]">
              <p className="text-lg text-pretty max-w-[45ch]">
                Vorm-Fabric is a specialized development shop bridging the gap between digital design
                and physical reality. We engineer parts that feel as good as they perform.
              </p>
              <div className="flex flex-col justify-end gap-2 font-mono text-[11px] text-muted-foreground uppercase tracking-tighter">
                <span>Available for Q4 2026 Commissioning</span>
                <span>ISO 9001:2015 Standards Observed</span>
              </div>
            </div>
          </div>
        </header>

        {/* Services — clickable */}
        <section id="services" className="grid md:grid-cols-4 border-b border-border">
          {SERVICE_ORDER.map((key, i) => {
            const s = SERVICES[key];
            const isActive = key === active;
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setActive(key);
                  document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                aria-pressed={isActive}
                className={`text-left p-6 border-b md:border-b-0 border-border transition-colors cursor-pointer focus:outline-none focus-visible:bg-card ${
                  i < 3 ? "md:border-r" : ""
                } ${isActive ? "bg-foreground text-background" : "hover:bg-card"}`}
              >
                <span
                  className={`block font-mono text-[10px] mb-12 ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {s.tag}
                </span>
                <h3 className="font-display font-extrabold text-2xl tracking-tighter mb-4">
                  {s.title}
                </h3>
                <p
                  className={`text-sm ${
                    isActive ? "text-background/70" : "text-muted-foreground"
                  }`}
                >
                  {s.body}
                </p>
                <span
                  className={`mt-6 inline-block font-mono text-[10px] uppercase tracking-widest ${
                    isActive ? "text-primary" : "text-foreground"
                  }`}
                >
                  {isActive ? "[ Viewing ]" : "View →"}
                </span>
              </button>
            );
          })}
        </section>

        {/* Service detail (reactive to selected service) */}
        <section id="work" className="p-6 md:p-12 scroll-mt-20">
          <div className="flex justify-between items-end mb-12">
            <h2 className="font-display font-extrabold text-4xl tracking-tighter uppercase">
              {activeService.title}
            </h2>
            <span className="font-mono text-[10px] text-muted-foreground hidden md:block">
              [ {activeService.tag} ]
            </span>
          </div>

          <div key={active} className="grid md:grid-cols-2 gap-8 animate-reveal">
            <div className="w-full aspect-square bg-card border border-border overflow-hidden">
              <img
                src={activeService.image}
                alt={activeService.alt}
                width={1024}
                height={1024}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col justify-between gap-8">
              <div>
                <h3 className="font-display font-extrabold text-3xl md:text-4xl tracking-tighter leading-tight mb-6">
                  {activeService.detailHeading}
                </h3>
                <p className="text-base text-muted-foreground text-pretty max-w-[50ch]">
                  {activeService.detailBody}
                </p>
              </div>
              <dl className="border-t border-border divide-y divide-border">
                {activeService.bullets.map((b) => (
                  <div key={b.label} className="grid grid-cols-2 gap-4 py-4 font-mono text-[11px] uppercase tracking-tighter">
                    <dt className="text-muted-foreground">{b.label}</dt>
                    <dd>{b.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>


        {/* Process */}
        <section className="px-6 py-24 bg-foreground text-background">
          <div className="grid md:grid-cols-2 gap-24 max-w-7xl mx-auto">
            <div>
              <h2 className="font-display font-extrabold text-5xl tracking-tighter leading-none mb-8 italic">
                "The difference is felt in the radius."
              </h2>
              <p className="text-muted-foreground max-w-sm mb-12">
                Our workshop operates at the intersection of traditional machining and algorithmic
                design. We don't just manufacture; we refine.
              </p>
              <div className="space-y-6">
                {[
                  { n: "01", title: "Material Integrity", body: "Certified aerospace-grade alloys and chemical-resistant polymers." },
                  { n: "02", title: "Rapid Tooling", body: "Bridge production for testing before full-scale manufacturing." },
                  { n: "03", title: "Quality Verification", body: "Micrometer-level inspection against the master CAD file." },
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
                src={workshop}
                alt="CNC machine spindle and tool changer in the workshop"
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
            <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-8">
              Start a project
            </p>
            <a
              href="mailto:hello@vormfabric.studio"
              className="font-display font-extrabold text-4xl md:text-7xl tracking-tighter hover:text-primary transition-colors underline decoration-border decoration-1 underline-offset-8 break-all"
            >
              hello@vormfabric.studio
            </a>
            <div className="grid md:grid-cols-3 gap-12 mt-24 text-[10px] font-mono uppercase tracking-tighter text-muted-foreground text-left">
              <div>
                <p className="text-foreground mb-2">Studio</p>
                <p>42 Industrial Way<br />Ste 200, Brooklyn, NY</p>
              </div>
              <div>
                <p className="text-foreground mb-2">Digital</p>
                <p>Instagram: @vorm_fab<br />LinkedIn: /vorm-fabric</p>
              </div>
              <div>
                <p className="text-foreground mb-2">Capacity</p>
                <p>Current: 85% Load<br />Next Open: Dec 2026</p>
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
