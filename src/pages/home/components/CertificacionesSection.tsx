import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Definición de las 4 tarjetas con tus archivos .jpeg asignados
const cardsInfo = [
  {
    id: 1,
    titulo: "Solicitá extracción a domicilio aquí",
    descripcion: "Contamos con el servicio de extracción domiciliaria en tu casa particular, hogar o institución privada. Hacé click acá para coordinar tu turno por WhatsApp.",
    img: "/domicilio.jpeg",
    alt: "Atención domiciliaria"
  },
  {
    id: 2,
    titulo: "Obras Sociales",
    descripcion: "Trabajamos con la mayoría de las obras sociales y prepagas para brindar la mejor atención a nuestros pacientes. El propósito de nuestro laboratorio es  otorgar un servicio extensivo e inclusivo para todos.",
    img: "/historia.jpeg",
    alt: "Historia clínica digital"
  },
  {
    id: 3,
    titulo: "Solicitá tu resultado online, fácil y rápido",
    descripcion: "Si están completos y validados por un bioquímico, podés recibirlos por mail o Whatsapp, según tu preferencia. También podes acercarte a retirarlo por el laboratorio.",
    img: "/resultados.jpeg",
    alt: "Resultados en línea"
  },
  {
    id: 4,
    titulo: "Mis Autorizaciónes",
    descripcion: "Activamos el canal digital a través del cual podés gestionar las autorizaciones online de tus estudios de manera simple y sin salir de tu casa.",
    img: "/lab-completo.jpeg",
    alt: "Laboratorio completo"
  }
];

export default function BeneficiosSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Título principal con fade-in
      gsap.from(".beneficios-title", {
        y: -20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 95%", // Se activa apenas asoma el borde superior
          toggleActions: "play none none reverse",
        },
      });

      // Animación de las cards: Entran en simultáneo, igual que el texto
      gsap.from(".beneficio-card", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 95%", // Mismo punto de activación exacto que el título
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardClick = (id: number) => {
    if (id === 1) {
      window.open(
        "https://wa.me/5493413000000?text=Hola%2C%20me%20comunico%20para%20solicitar%20una%20extracci%C3%B3n%20a%20domicilio",
        "_blank"
      );
    }
  };

  return (
    <section
      ref={sectionRef}
      id="beneficios"
      className="relative w-full bg-[#f8f9fa] overflow-hidden px-4 md:px-8 lg:px-12 py-12 md:py-16 lg:py-20"
    >
      {/* Detalle decorativo de fondo sutil (red de partículas o nodos moleculares) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] z-0" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Título Principal de la sección adaptado al diseño común */}
        <div className="beneficios-title text-center mb-10 md:mb-14">
          <h2 className="text-ibta-dark text-xl md:text-2xl lg:text-3xl tracking-wider uppercase relative inline-block pb-3">
            <strong className="font-bold">Estamos para</strong> ayudarte
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-ibta-primary rounded-full"></span>
          </h2>
        </div>

        {/* Grilla de las 4 Cards Interactivas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {cardsInfo.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className="beneficio-card group relative h-[320px] md:h-[380px] w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              {/* Imagen de fondo de la tarjeta */}
              <img
                src={card.img}
                alt={card.alt}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out z-0"
              />

              {/* Capa de oscurecimiento (Overlay) para asegurar legibilidad del texto blanco */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/30 group-hover:from-black/90 group-hover:via-black/60 transition-colors duration-500 z-10" />

              {/* Contenido de la Tarjeta */}
              <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6 lg:p-7 z-20 text-center text-white">
                
                {/* Contenedor con altura fija para centrar títulos de 1 y 2 líneas de forma simétrica */}
                <div className="h-14 flex items-center justify-center mb-3">
                  <h3 className="text-lg md:text-xl font-bold tracking-wide leading-tight group-hover:text-ibta-lighter transition-colors">
                    {card.titulo}
                  </h3>
                </div>

                {/* Descripción */}
                <p className="text-gray-200 text-xs md:text-sm leading-relaxed font-light opacity-90 group-hover:opacity-100 transition-opacity">
                  {card.descripcion}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
