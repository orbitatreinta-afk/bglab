import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const descargas = [
  { label: "Marcadores Tumorales" },
  { label: "Dislipemias" },
  { label: "Dengue" },
  { label: "Tiroides" },
  { label: "Hepatitis" },
  { label: "Cáncer" },
  { label: "Hepatitis (Info adicional)" },
  { label: "Celiaquía" },
  { label: "Corazón, dislipemias y salud" },
  { label: "Hemoglobina Glicosilada" },
];

export default function InfoInteresSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".interes-animate", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="informacion-de-interes"
      className="relative w-full bg-ibta-primary overflow-hidden"
    >
      {/* Fondo decorativo sutil (Fusión estética idéntica a la sección anterior) */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 50%, #ffffff 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-14 md:py-20">
        
        {/* Título y descripción adaptados al bloque de Ciencia */}
        <div className="interes-animate mb-10 md:mb-14 max-w-3xl">
          <h2 className="text-white text-2xl md:text-3xl font-light mb-4">
            <strong className="font-bold">Información</strong> de interés
          </h2>
          <div className="w-10 h-0.5 bg-white/30 mb-4" />
          <p className="text-white/75 text-sm md:text-base leading-relaxed max-w-2xl">
            Focalizados en brindar información de relevancia en temáticas de interés sobre bioquímica y salud, desarrollamos diferentes contenidos para descargar dirigidos a pacientes.
          </p>
        </div>

        {/* Lista de descargas adaptada al fondo de color oscuro */}
        <div className="interes-animate grid grid-cols-1 md:grid-cols-2 gap-3">
          {descargas.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-white/10 p-3 md:p-4 rounded-lg border border-white/10 hover:border-white/30 hover:bg-white/15 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-8 h-8 flex items-center justify-center bg-white/10 rounded group-hover:bg-white text-white group-hover:text-ibta-primary transition-colors flex-shrink-0">
                <i className="ri-download-line text-sm"></i>
              </div>
              <span className="text-white/90 text-sm font-medium group-hover:text-white transition-colors">
                {item.label}
              </span>
              <div className="ml-auto w-5 h-5 flex items-center justify-center text-white/40 group-hover:text-white/80 transition-colors">
                <i className="ri-arrow-right-s-line"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
