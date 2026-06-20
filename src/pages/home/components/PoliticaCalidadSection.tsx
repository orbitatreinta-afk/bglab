import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PoliticaCalidadSection() {
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
    // Abre la burbuja del chatbot de Dify
    const btn = document.getElementById("dify-chatbot-bubble-button");
    if (btn) {
      btn.click();
    }
  };

  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/5493413000000?text=Hola%2C%20quiero%20consultar%20sobre%20mi%20obra%20social",
      "_blank"
    );
  };

  return (
    <section
      ref={sectionRef}
      id="politica-de-calidad"
      className="relative w-full bg-white overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar azul con título vertical */}
        <div className="w-full lg:w-20 bg-ibta-primary flex items-center justify-center py-3 lg:py-12 flex-shrink-0">
          <h2 className="text-white font-bold text-sm md:text-sm lg:text-base lg:writing-mode-vertical lg:-rotate-180 whitespace-nowrap tracking-wider uppercase lg:py-8">
            Obras sociales
          </h2>
        </div>

        {/* Contenido */}
        <div className="flex-1 flex flex-col lg:flex-row">
          <div className="flex-1 px-4 md:px-8 lg:px-12 py-8 md:py-10 lg:py-14">
            <div className="pol-animate max-w-3xl">
              <div className="text-gray-700 text-sm md:text-base leading-relaxed space-y-4">
                <p>
                  En el <strong className="text-ibta-dark">Laboratorio Baldomá-Gregorini</strong> trabajamos con las Obras Sociales mas frecuentes para que puedas atenderte con toda la tranquilidad que te merece:
                </p>

                <ul className="space-y-2 text-sm">
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
                    Administración
                  </p>
                  <p className="text-gray-500 text-sm">Aguardamos tu mensaje</p>
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
                    WhatsApp
                  </button>

                  <button className="px-6 py-3 bg-white border-2 border-ibta-primary text-ibta-primary text-sm font-semibold rounded hover:bg-ibta-lighter transition-colors flex items-center gap-2">
                    <i className="ri-checkbox-line"></i>
                    Encuestas de <strong>Satisfacción</strong>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Imagen microscopio */}
          <div className="pol-animate w-full lg:w-[360px] flex-shrink-0 flex items-end justify-end">
            <img
              src="https://www.ibta.com.ar/img/imagenCalidad.png"
              alt="Microscopio profesional"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>

      <style>{`
        .lg\\:writing-mode-vertical {
          writing-mode: vertical-rl;
        }
      `}</style>
    </section>
  );
}
