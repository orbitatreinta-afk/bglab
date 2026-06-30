import { useEffect, useRef, useState } from "react";
import ObrasSocialesCarousel from "./ObrasSocialesCarousel";

const navItems = [
  { label: "QUIENES SOMOS", href: "#quienes-somos" },
  { label: "NUESTRO SERVICIO", href: "#certificaciones" }, 
  { label: "INFORMACIÓN SOBRE AYUNOS", href: "#informacion" }, 
  { label: "OBRAS SOCIALES", href: "#politica-de-calidad" }, 
  { label: "CONTACTO", href: "#contacto" },
];

const VIDEO_URL = "https://res.cloudinary.com/dmxs0ezrj/video/upload/v1781208166/Laboratory_details_montage_online-video-cutter.com_x23pm4.mp4?v=1";
const VIDEO_START = 0;
const VIDEO_END = 8;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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

    video.muted = true;
    video.playsInline = true;

    const playVideo = async () => {
      try {
        await video.play();
      } catch (err) {
        console.log("Reproducción automática prevenida (modo ahorro de energía u otra restricción).");
      }
    };
    playVideo();

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
      {/* Navbar fixed */}
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

          {/* Navegación desktop */}
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

      {/* Hero con altura adaptativa (Arreglado para iPhone X/móviles chicos) */}
      <div className="relative w-full bg-slate-900 h-auto min-h-[680px] lg:h-[780px] overflow-hidden -mt-[72px]">
        {/* Video de fondo */}
        <div className="absolute inset-0 overflow-hidden bg-slate-900">
          <video
            key={VIDEO_URL}
            ref={videoRef}
            src={VIDEO_URL}
            autoPlay
            muted
            playsInline
            preload="auto"
            loop
            className="w-full h-full object-cover origin-top scale-100 pointer-events-none"
          />
          <div className="absolute inset-0 bg-slate-950/25 backdrop-blur-[0.5px]" />
        </div>

        {/* Contenido del hero centrado y flexible */}
        <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-24 pb-32 lg:py-24 flex flex-col justify-center min-h-[680px] lg:min-h-0">
          
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8 items-center w-full">
            
            {/* TEXTOS PRINCIPALES (Izquierda) */}
            <div className="w-full lg:col-span-7 text-left space-y-4 lg:space-y-6">
              <div className="inline-block">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/90 drop-shadow-md font-sans block">
                  San Lorenzo
                </span>
              </div>
              
              <h1 className="text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] drop-shadow-md">
                LABORATORIO DE<br/>
                <span>ANÁLISIS BIOQUÍMICOS</span>
              </h1>
              
              <p className="text-white font-normal max-w-xl leading-relaxed drop-shadow-sm text-xs sm:text-sm md:text-lg opacity-90">
                Más de 50 años cuidando la salud de nuestros pacientes con atención personalizada, resultados confiables y excelencia profesional.
              </p>
            </div>

            {/* HORARIOS DE ATENCIÓN MODULARES (Derecha - Cambiado a flex-row fluido) */}
            <div className="w-full lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 justify-start sm:justify-between lg:justify-end lg:items-end">
              
              {/* Tarjeta Horario de Atención */}
              <div className="w-full sm:w-[48%] lg:w-full max-w-sm bg-slate-950/40 border border-white/20 rounded-2xl p-4 lg:p-5 backdrop-blur-md shadow-2xl transition-transform duration-300 hover:scale-[1.01]">
                <div className="flex items-center gap-3.5 mb-2 lg:mb-3">
                  <svg className="w-4 h-4 text-white flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                  </svg>
                  <h3 className="text-white font-bold text-[11px] lg:text-xs tracking-wider uppercase">Horarios de Atención</h3>
                </div>
                <div className="space-y-1.5 lg:space-y-2 text-xs text-white font-medium pl-7">
                  <div className="flex justify-between border-b border-white/10 pb-1">
                    <span className="opacity-80">Lunes a Viernes:</span>
                    <span className="font-bold">07:00 a 16:00 hs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-80">Sábados:</span>
                    <span className="font-bold">08:00 a 11:30 hs</span>
                  </div>
                </div>
              </div>

              {/* Tarjeta Horario de Extracción */}
              <div className="w-full sm:w-[48%] lg:w-full max-w-sm bg-slate-950/40 border border-white/20 rounded-2xl p-4 lg:p-5 backdrop-blur-md shadow-2xl transition-transform duration-300 hover:scale-[1.01]">
                <div className="flex items-center gap-3.5 mb-2 lg:mb-3">
                  <svg className="w-4 h-4 text-white flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6M10 3v6.172a2 2 0 01-.586 1.414l-4.828 4.828A2 2 0 006 18.828h12a2 2 0 001.414-3.414l-4.828-4.828A2 2 0 0114 9.172V3" />
                    <path d="M7.5 14.5h9" opacity="0.3" stroke="currentColor" />
                  </svg>
                  <h3 className="text-white font-bold text-[11px] lg:text-xs tracking-wider uppercase">Horarios de Extracción</h3>
                </div>
                <div className="space-y-1.5 lg:space-y-2 text-xs text-white font-medium pl-7">
                  <div className="flex justify-between border-b border-white/10 pb-1">
                    <span className="opacity-80">Lunes a Viernes:</span>
                    <span className="font-bold">07:00 a 11:00 hs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-80">Sábados:</span>
                    <span className="font-bold">08:00 a 10:00 hs</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Carrusel inferior */}
        <ObrasSocialesCarousel />
      </div>
    </header>
  );
}