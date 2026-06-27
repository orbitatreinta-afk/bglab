import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const areasTrabajo = [
  "Bacteriología",
  "Endocrinología y Química clínica",
  "Hematología",
  "Hemostasia",
  "Orinas",
  "Parasitología",
  "Serología",
];

// Estructura de datos real del laboratorio
const directores = [
  { nombre: "Bioq. Silvina Nilda Baldomá", mp: "MP XXXX" },
  { nombre: "Bioq. Eduardo Rodolfo Gregorini", mp: "MP XXXX" },
];

const plantelProfesional = [
  { nombre: "Bioq. Laura", mp: "MP XXXX", puesto: "Bioquímica de Planta" },
];

const administracionYRecepcion = [
  { nombre: "Pablo", puesto: "Administración y Admisión de Pacientes" },
  { nombre: "Nombre y Apellido", puesto: "Recepción y Admisión de Pacientes" }, // Reemplazar con el dato del personal adicional
];

export default function QuienesSomosSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<"acerca" | "responsables">("acerca");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".qs-animate", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
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
      id="quienes-somos"
      className="relative w-full bg-white overflow-hidden"
    >
      <div className="px-4 md:px-8 lg:px-16 py-8 md:py-12 lg:py-16">
        {/* Título horizontal con el detalle de la línea azul en el pie */}
        <div className="qs-animate mb-8">
          <h2 className="text-ibta-dark font-bold text-xl md:text-2xl lg:text-3xl tracking-wider uppercase relative inline-block pb-3">
            Quienes Somos
            <span className="absolute bottom-0 left-0 w-12 h-1 bg-ibta-primary rounded-full"></span>
          </h2>
        </div>

        {/* Selectores de Tabs */}
        <div className="qs-animate flex flex-col sm:flex-row gap-3 mb-8">
          <button
            onClick={() => setActiveTab("acerca")}
            className={`px-5 py-2.5 text-sm font-semibold transition-all whitespace-nowrap rounded ${
              activeTab === "acerca"
                ? "bg-ibta-primary text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <strong>Acerca de</strong> Nosotros
          </button>
          <button
            onClick={() => setActiveTab("responsables")}
            className={`px-5 py-2.5 text-sm font-semibold transition-all whitespace-nowrap rounded ${
              activeTab === "responsables"
                ? "bg-ibta-primary text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <strong>Responsables</strong> Por Área
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Texto */}
          <div className="qs-animate flex-1">
            {activeTab === "acerca" ? (
              <div className="text-gray-700 text-sm md:text-base leading-relaxed space-y-4">
                <p>
                  El Laboratorio <strong>Baldomá-Gregorini</strong> inició sus actividades en el año 1977, en la localidad de Tres Arroyos, Provincia de Buenos Aires y desde la fecha, ininterrumpidamente, ha asumido el compromiso de ejercer la profesión Bioquímica con los mayores niveles posibles de excelencia y calidad, en beneficio de la comunidad para la cuál presta sus servicios.
                </p>

                <div>
                  <h3 className="font-bold text-ibta-dark text-base mb-4">
                    Áreas de Trabajo
                  </h3>
                  <ul className="space-y-3">
                    {areasTrabajo.map((area, i) => (
                      <li
                        key={area}
                        className="flex items-center gap-3 text-gray-700 text-sm md:text-base hover:text-ibta-primary transition-colors cursor-default group"
                      >
                        <span className="w-6 h-6 flex items-center justify-center bg-ibta-primary/20 rounded-full text-xs font-bold group-hover:bg-ibta-primary group-hover:text-white transition-all flex-shrink-0">
                          {i + 1}
                        </span>
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                {/* Columna Izquierda: Profesionales Médicos */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-ibta-dark text-base mb-3 border-b-2 border-ibta-primary pb-1">Dirección</h3>
                    <div className="space-y-3 text-gray-700">
                      {directores.map((d) => (
                        <p key={d.nombre}>
                          <strong>{d.nombre}</strong>
                          <br />
                          <span className="text-gray-500 text-xs">Bioquímico Director | {d.mp}</span>
                        </p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-ibta-dark text-base mb-3 border-b-2 border-ibta-primary pb-1">Plantel Profesional</h3>
                    <div className="space-y-3 text-gray-700">
                      {plantelProfesional.map((p) => (
                        <p key={p.nombre}>
                          <strong>{p.nombre}</strong>
                          <br />
                          <span className="text-gray-500 text-xs">{p.puesto} | {p.mp}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Columna Derecha: Administración y Recepción */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-ibta-dark text-base mb-3 border-b-2 border-ibta-primary pb-1">Administración y Atención</h3>
                    <div className="space-y-3 text-gray-700">
                      {administracionYRecepcion.map((a) => (
                        <p key={a.nombre}>
                          <strong>{a.nombre}</strong>
                          <br />
                          <span className="text-gray-500 text-xs">{a.puesto}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Imagen a la derecha */}
          <div className="qs-animate w-full lg:w-[500px] flex-shrink-0">
            <img 
              src="/petri.jpeg" 
              alt="Personal de laboratorio" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
