import { useEffect, useRef, useState } from "react";
import ObrasSocialesCarousel from "./ObrasSocialesCarousel";

// Estructura limpia de ítems según tus nuevos requerimientos
const navItems = [
  { label: "QUIENES SOMOS", href: "#quienes-somos" },
  { label: "NUESTRO SERVICIO", href: "#certificaciones" }, // Redirige a CertificacionesSection
  { label: "INFORMACIÓN SOBRE AYUNOS", href: "#informacion" }, // Redirige a InformacionSection (Sin submenú)
  { label: "OBRAS SOCIALES", href: "#politica-de-calidad" }, // Redirige a PoliticaCalidadSection
  { label: "CONTACTO", href: "#contacto" },
];

// Se agrega '?v=1' para forzar al navegador a descargar la nueva versión
const VIDEO_URL = "https://res.cloudinary.com/dmxs0ezrj/video/upload/v1781208166/Laboratory_details_montage_online-video-cutter.com_x23pm4.mp4?v=1";

const VIDEO_START = 0;
const VIDEO_END = 8;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Listener para controlar el scroll y darle sombreado a la navbar fija
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Forzado estricto por código para reproducir sin sonido obligatoriamente
    video.muted = true;

    const handleLoadedMetadata = () => {
      video.currentTime = VIDEO_START;
      setVideoLoaded(true);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    const intervalId = setInterval(() => {
      if (video.currentTime >= VIDEO_END) {
        video.currentTime = VIDEO_START;
      }
    }, 100);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      clearInterval(intervalId);
    };
  }, []);

  const scrollToSection = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header ref={headerRef} className="relative z-50 w-full">
      {/* Navbar - sticky siempre */}
      <div
        className={`w-full bg-white transition-all duration-300 sticky top-0 left-0 z-50 ${
          scrolled ? "shadow-lg py-2" : "py-3"
        }`}
      >
        <div className="relative w-full px-4 md:px-8 lg:px-12 flex items-center justify-between min-h-[56px]">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex-shrink-0 z-10 flex items-center gap-3"
          >
            <img
              src="https://static.readdy.ai/image/48e472ba5dcad71b4d28888607365c41/9395b06c8e950ff806db7bb8c5e1e9ac.jpeg"
              alt="Laboratorio Baldomá-Gregorini"
              className="h-10 md:h-12 w-auto object-contain rounded"
            />
            <span className="hidden md:block text-ibta-dark font-bold text-xs lg:text-sm leading-tight">
              Laboratorio<br/>Baldomá-Gregorini
            </span>
          </a>

          {/* Navegación desktop (Centrada) */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center z-10">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-gray-700 hover:text-ibta-primary transition-colors whitespace-nowrap flex items-center gap-1"
                >
                  {item.label}
                </a>
              </div>
            ))}
          </nav>

          {/* Hamburguesa móvil */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-gray-700 z-10"
          >
            <i className={`ri-${mobileMenuOpen ? "close" : "menu"}-line text-xl`}></i>
          </button>
        </div>

        {/* Menú móvil */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 z-50">
            {navItems.map((item) => (
              <div key={item.label}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="block py-2.5 text-sm font-semibold text-gray-700 hover:text-ibta-primary"
                >
                  {item.label}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hero con altura fija */}
      <div className="relative w-full bg-white h-[580px] md:h-[760px] overflow-hidden -mt-[72px]">
        {/* Video de fondo del hero */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            key={VIDEO_URL}
            ref={videoRef}
            src={VIDEO_URL}
            autoPlay
            muted={true}
            playsInline
            preload="auto"
            loop
            className="w-full h-full object-cover origin-top scale-100"
          />
        </div>

        {/* Contenido del hero */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 md:px-8 lg:px-12 pt-[72px] pb-10 md:pb-14">
        </div>

        {/* Carrusel de Obras Sociales en la parte inferior del hero */}
        <ObrasSocialesCarousel />
      </div>
    </header>
  );
}

