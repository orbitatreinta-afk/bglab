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
      className="relative w-full bg-gray-50 overflow-hidden"
    >
      <div className="relative px-4 md:px-8 lg:px-12 py-10 md:py-14 lg:py-16">
        {/* Imagen decorativa en la parte superior */}
        <div className="interes-animate mb-8 flex justify-center lg:justify-start">
          <img
            src="https://www.ibta.com.ar/img/info-interes.svg"
            alt="Información de interés"
            className="h-16 md:h-20"
          />
        </div>

        {/* Título y descripción */}
        <div className="interes-animate mb-10 md:mb-14 max-w-3xl">
          <h2 className="text-ibta-dark text-2xl md:text-3xl font-light mb-4">
            <strong className="font-bold">Información</strong> de interés
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl">
            Focalizados en brindar información de relevancia en temáticas de interés sobre bioquímica y salud, desarrollamos diferentes contenidos para descargar dirigidos a pacientes.
          </p>
        </div>

        {/* Lista de descargas */}
        <div className="interes-animate grid grid-cols-1 md:grid-cols-2 gap-3">
          {descargas.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-white p-3 md:p-4 rounded-lg border border-gray-100 hover:border-ibta-primary/30 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-8 h-8 flex items-center justify-center bg-ibta-primary/10 rounded group-hover:bg-ibta-primary/20 transition-colors flex-shrink-0">
                <i className="ri-download-line text-ibta-primary text-sm"></i>
              </div>
              <span className="text-gray-700 text-sm font-medium group-hover:text-ibta-primary transition-colors">
                {item.label}
              </span>
              <div className="ml-auto w-5 h-5 flex items-center justify-center text-gray-400 group-hover:text-ibta-primary transition-colors">
                <i className="ri-arrow-right-s-line"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}