import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const papers = [
  {
    id: 1,
    titulo:
      "Distribución de tipos capsulares y susceptibilidad antimicrobiana de Streptococcus agalactiae causante de infecciones en Argentina.",
    autores: "Pérez J, Limansky A, Toresani I, Gregorini E, Sutich EG, et al.",
    revista: "Rev Argent Microbiol. 2004;36(2):63-7.",
    pmid: "15473046",
    url: "https://pubmed.ncbi.nlm.nih.gov/15473046/",
    keywords: "bacteriología clínica · resistencia antimicrobiana · microbiología diagnóstica",
  },
  {
    id: 2,
    titulo:
      "Osteomielitis por Scedosporium spp.: reporte de caso clínico en paciente inmunocomprometido.",
    autores:
      "Colombo LGR, Gregorini ER, Dalmaso H, Podestá MV, Luque A, Lerman Tenenbaum D, et al.",
    revista: "Rev Argent Microbiol. 2020;52(1):19-21.",
    pmid: "31204057",
    url: "https://pubmed.ncbi.nlm.nih.gov/31204057/",
    keywords: "micología clínica · infecciones fúngicas · diagnóstico microbiológico",
  },
  {
    id: 3,
    titulo:
      "Bacteriemia por Bacillus cereus en paciente con herida abdominal penetrante: reporte de caso.",
    autores:
      "Acosta Pedemonte NB, Rocchetti NS, Villalba J, Colombo LG, Gregorini ER, Bagilet DH, et al.",
    revista: "Rev Argent Microbiol. 2020;52(2):115-117.",
    pmid: "31791818",
    url: "https://pubmed.ncbi.nlm.nih.gov/31791818/",
    keywords: "bacteriemia · microbiología clínica · laboratorio de urgencias",
  },
  {
    id: 4,
    titulo:
      "Tinción con naranja de acridina en el diagnóstico de infecciones del torrente sanguíneo asociadas a catéter.",
    autores: "Quintana R, Prieto MF, Bagilet DH, Dalman MC, Gregorini E.",
    revista: "Med Intensiva. 2008;32(4):168-71.",
    pmid: "18413121",
    url: "https://pubmed.ncbi.nlm.nih.gov/18413121/",
    keywords: "diagnóstico rápido · infección asociada a dispositivos · UCI",
  },
];

export default function InformeAlacSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".alac-animate", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="publicaciones-cientificas"
      aria-label="Publicaciones científicas del Laboratorio Baldomá-Gregorini en PubMed"
      className="relative w-full bg-ibta-primary overflow-hidden"
    >
      {/* Fondo decorativo sutil */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 50%, #ffffff 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-14 md:py-20 flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

        {/* Columna izquierda — identidad y SEO */}
        <div className="alac-animate flex-shrink-0 lg:w-64 flex flex-col gap-4">
          {/* Encabezado visual igual al original */}
          <div>

            <h2 className="text-white font-black text-4xl md:text-5xl leading-none tracking-tight">
              CIENCIA &<br />EVIDENCIA
            </h2>
            <p className="text-white/70 font-semibold text-sm tracking-widest uppercase mt-1">
              PUBLICACIONES CIENTÍFICAS
            </p>
          </div>

          <div className="w-10 h-0.5 bg-white/30 mt-2" />

          {/* Bloque SEO — descripción del laboratorio */}
          <p className="text-white/75 text-sm leading-relaxed">
            El <strong className="text-white">Laboratorio Baldomá-Gregorini</strong> en Rosario, Santa Fe, combina atención de calidad con producción científica indexada en{" "}
            <span className="text-white font-semibold">PubMed / MEDLINE</span>.
            Especialidades: microbiología clínica, bacteriología, micología y diagnóstico de infecciones.
          </p>

          <a
            href="https://pubmed.ncbi.nlm.nih.gov/?term=Gregorini+E%5BAuthor%5D"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver todos los trabajos de E. Gregorini y ER. Gregorini en PubMed"
            className="inline-flex items-center gap-2 mt-2 px-5 py-3 bg-white text-ibta-primary text-sm font-bold rounded hover:bg-ibta-lighter transition-colors w-fit"
          >
            <i className="ri-external-link-line" aria-hidden="true" />
            Ver en PubMed
          </a>
        </div>

        {/* Columna derecha — lista de papers */}
        <div className="flex-1 flex flex-col gap-5">
          <p className="alac-animate text-white/60 text-xs font-semibold tracking-widest uppercase">
            Trabajos publicados · E. Gregorini / ER. Gregorini
          </p>

          {papers.map((paper) => (
            <article
              key={paper.id}
              className="alac-animate group flex gap-4 items-start"
              itemScope
              itemType="https://schema.org/ScholarlyArticle"
            >
              {/* Número */}
              <span
                className="flex-shrink-0 w-7 h-7 rounded-full border border-white/30 text-white/50 text-xs font-bold flex items-center justify-center mt-0.5 group-hover:border-white group-hover:text-white transition-colors"
                aria-hidden="true"
              >
                {paper.id}
              </span>

              {/* Contenido */}
              <div className="flex flex-col gap-1">
                <a
                  href={paper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Leer paper: ${paper.titulo} en PubMed`}
                  className="text-white font-semibold text-sm md:text-base leading-snug hover:underline underline-offset-2"
                  itemProp="name"
                >
                  {paper.titulo}
                </a>
                <p
                  className="text-white/60 text-xs leading-relaxed"
                  itemProp="author"
                >
                  {paper.autores}
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-0.5">
                  <span
                    className="text-white/50 text-xs italic"
                    itemProp="isPartOf"
                  >
                    {paper.revista}
                  </span>
                  <a
                    href={paper.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 text-xs hover:text-white/70 transition-colors"
                    aria-label={`PMID ${paper.pmid} en PubMed`}
                  >
                    PMID: {paper.pmid}
                  </a>
                </div>
                {/* Keywords para SEO on-page */}
                <p className="text-white/30 text-xs mt-0.5 italic">
                  {paper.keywords}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Schema.org estructurado para SEO — oculto visualmente */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Publicaciones científicas del Laboratorio Baldomá-Gregorini",
            description:
              "Trabajos de microbiología clínica, bacteriología y diagnóstico indexados en PubMed por E. Gregorini y ER. Gregorini del Laboratorio Baldomá-Gregorini, Rosario, Santa Fe, Argentina.",
            itemListElement: papers.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "ScholarlyArticle",
                name: p.titulo,
                author: p.autores,
                isPartOf: p.revista,
                url: p.url,
                identifier: `PMID:${p.pmid}`,
              },
            })),
          }),
        }}
      />
    </section>
  );
}
