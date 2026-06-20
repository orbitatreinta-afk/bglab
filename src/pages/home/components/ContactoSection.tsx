import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-animate", {
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
      id="contacto"
      className="relative w-full bg-white overflow-hidden"
    >
      <div className="px-4 md:px-8 lg:px-12 py-10 md:py-14 lg:py-16">
        <div className="contact-animate mb-10">
          <h2 className="text-ibta-dark text-2xl md:text-3xl lg:text-4xl font-bold">
            Contacto
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Información de contacto - izquierda */}
          <div className="contact-animate flex-1">
            <div className="text-gray-700 text-sm md:text-base leading-relaxed space-y-4">
              <p>
                Comuníquese ahora con Laboratorio <strong className="text-ibta-dark">Baldomá-Gregorini</strong>, enviándonos su consulta o comentario y le responderemos a la brevedad. También puede visitarnos personalmente en nuestro Laboratorio situado en{" "}
                <strong>San Lorenzo, Provincia de Santa Fe</strong>. O bien telefónicamente al (03476){" "}
                <strong>123456 / 123457</strong>.
              </p>

              <div>
                <p className="font-bold text-ibta-dark mb-2">Horarios de atención</p>
                <p className="text-gray-600">
                  <i className="ri-arrow-right-s-line text-ibta-primary"></i>{" "}
                  Lunes a Viernes de 7 a 19 hs. Sábados: 7:30 a 13 hs.
                </p>
              </div>

              <div>
                <p className="font-bold text-ibta-dark mb-2">Horarios de extracciones</p>
                <p className="text-gray-600">
                  <i className="ri-arrow-right-s-line text-ibta-primary"></i>{" "}
                  Lunes a Viernes de 7 a 9:30 hs. Sábado de 7:30 a 9:30 hs.
                </p>
              </div>

              <div>
                <p className="font-bold text-ibta-dark mb-2">Por consultas</p>
                <p className="text-gray-600">
                  Llamá al 123456 de 7 a 19 hs o envíanos un WhatsApp al (03476) 123456.
                </p>
              </div>

              <div>
                <p className="font-bold text-ibta-dark mb-2">Autorización de órdenes</p>
                <p className="text-gray-600">
                  Para consultas sobre autorizaciones o transferencias llamá al 123456 de 7 a 19 hs. o mandanos tu orden por WhatsApp al 123456 y la enviamos a autorizar en el caso que lo requiera.
                </p>
              </div>

              <div>
                <p className="font-bold text-ibta-dark mb-2">Guardia pasiva para urgencias</p>
                <p className="text-gray-600">
                  Lunes a viernes, a partir de las 19 hs, sábado a partir de las 13 hs y domingo y feriados todo el día.
                  <br />
                  Teléfono: (03476) 123456.
                </p>
              </div>
            </div>
          </div>

          {/* Formulario - derecha */}
          <div className="contact-animate lg:w-[480px] flex-shrink-0">
            <form
              data-readdy-form
              action="https://readdy.ai/api/form/d87hie2gmnqsqcm2itvg"
              method="POST"
              className="space-y-4"
              onSubmit={(e) => {
                setFormStatus("sending");
                setTimeout(() => {
                  setFormStatus("sent");
                }, 1000);
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-ibta-primary transition-colors"
                />
                <input
                  type="text"
                  name="apellido"
                  placeholder="Apellido"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-ibta-primary transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="tel"
                  name="telefono"
                  placeholder="Teléfono"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-ibta-primary transition-colors"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-ibta-primary transition-colors"
                />
              </div>

              <textarea
                name="mensaje"
                placeholder="Mensaje"
                rows={5}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-ibta-primary transition-colors resize-none"
              ></textarea>

              {/* reCAPTCHA placeholder - visual only */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border-2 border-gray-300 rounded-sm"></div>
                  <span className="text-sm text-gray-600">No soy un robot</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={formStatus === "sending" || formStatus === "sent"}
                className="w-full md:w-auto px-8 py-4 bg-ibta-primary text-white font-bold text-base rounded-lg hover:bg-ibta-dark transition-colors disabled:opacity-70"
              >
                {formStatus === "sending"
                  ? "Enviando..."
                  : formStatus === "sent"
                  ? "Mensaje enviado"
                  : "Enviar"}
              </button>

              {formStatus === "sent" && (
                <p className="text-green-600 text-sm mt-2">
                  ¡Gracias por contactarnos! Le responderemos a la brevedad.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Mapa */}
      <div id="mapa" className="w-full h-64 md:h-80 lg:h-96 bg-gray-100">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.0!2d-60.7667!3d-32.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDQ1JzAwLjAiUyA2MMKwNDYnMDAuMCJX!5e0!3m2!1ses!2sar!4v1600000000000!5m2!1ses!2sar"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación Laboratorio IBTA"
        ></iframe>
      </div>
    </section>
  );
}