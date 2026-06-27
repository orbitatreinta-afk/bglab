import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PoliticaCalidadProps {
  onOpenChat: (message: string) => void;
}

export default function PoliticaCalidadSection({ onOpenChat }: PoliticaCalidadProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".pol-animate", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
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

  const handleAbrirChat = () => {
    onOpenChat("Trabajan con (insertá tu obra social), ¿cuales son los requisitos?");
  };

  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/5493413000000?text=Hola%2C%20me%20quiero%20atender%20como%20particular%2C%20me%20podes%20mandar%20el%20presupuesto%20para%20realizarme%20los%20siguientes%20an%C3%A1lisis%3A%20-DETALLE%20EL%20ANALISIS%20QUE%20DESEA%20REALIZARSE",
      "_blank"
    );
  };

  return (
    <section
      ref={sectionRef}
      id="politica-de-calidad"
      className="relative w-full bg-white overflow-hidden"
    >
      <div className="px-4 md:px-8 lg:px-16 py-8 md:py-12 lg:py-16">
        {/* Título horizontal con el detalle de la línea azul en el pie */}
        <div className="pol-animate mb-8">
          <h2 className="text-ibta-dark font-bold text-xl md:text-2xl lg:text-3xl tracking-wider uppercase relative inline-block pb-3">
            Obras sociales
            <span className="absolute bottom-0 left-0 w-12 h-1 bg-ibta-primary rounded-full"></span>
          </h2>
        </div>

        {/* Contenido */}
        <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="flex-1">
            <div className="pol-animate max-w-3xl">
              <div className="text-gray-700 text-sm md:text-base leading-relaxed space-y-4">
                <p>
                  En el <strong className="text-ibta-dark">Laboratorio Baldomá-Gregorini</strong> trabajamos con las Obras Sociales mas frecuentes para que puedas atenderte con toda la tranquilidad que te merece:
                </p>

                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <i className="ri-check-line text-ibta-primary mt-0.5"></i>
                    <span>Atención particular.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-check-line text-ibta-primary mt-0.5"></i>
                    <span>PAMI - IAPOS Santa Fé.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-check-line text-ibta-primary mt-0.5"></i>
                    <span>OSDE - Swiss Medical - Medifé.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-check-line text-ibta-primary mt-0.5"></i>
                    <span>OSECAC - OSDEPYM - OSPEDYC - IOMA.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-check-line text-ibta-primary mt-0.5"></i>
                    <span>Sancor Salud - Galeno - Accord.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-check-line text-ibta-primary mt-0.5"></i>
                    <span>Avalian - Federada Salud - Jerárquicos Salud.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-check-line text-ibta-primary mt-0.5"></i>
                    <span>Si tu Obra Social no fue mencionada, consultanos.</span>
                  </li>
                </ul>

                <div className="pt-6">
                  <p className="font-bold text-ibta-dark text-lg">
                    Administration
                  </p>
                  <p className="text-gray-500 text-sm">Aguardamos tu message</p>
                  <p className="text-gray-400 text-xs mt-1">Versión 04 - 11/Jun/2026</p>
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  {/* Abre el chatbot de Dify */}
                  <button
                    onClick={handleAbrirChat}
                    className="px-6 py-3 bg-ibta-primary text-white text-sm font-semibold rounded hover:bg-ibta-dark transition-colors"
                  >
                    Consulta rápida
                  </button>

                  {/* Redirige a WhatsApp */}
                  <button
                    onClick={handleWhatsApp}
                    className="px-6 py-3 bg-ibta-primary text-white text-sm font-semibold rounded hover:bg-ibta-dark transition-colors flex items-center gap-2"
                  >
                    <i className="ri-whatsapp-line"></i>
                    Solicitar presupuesto particular
                  </button>

                  <button className="px-6 py-3 bg-white border-2 border-ibta-primary text-ibta-primary text-sm font-semibold rounded hover:bg-ibta-lighter transition-colors flex items-center gap-2">
                    <i className="ri-checkbox-line"></i>
                    Encuestas de <strong>Satisfacción</strong>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Imagen indicaciones */}
          <div className="pol-animate w-full lg:w-[500px] flex-shrink-0 flex items-end justify-end">
            <img
              src="/papel.png"
              alt="Indicaciones en papel"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}