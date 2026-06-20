export default function Footer() {
  return (
    <footer className="w-full bg-ibta-dark text-white">
      <div className="w-full px-4 md:px-8 lg:px-12 py-6 md:py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left text-sm text-white/80">
            <p>
              Copyright © <strong className="text-white">Laboratorio Baldomá-Gregorini Analisis Bioquímicos</strong>.
            </p>
            <p>Todos los derechos reservados.</p>
          </div>
          <div className="text-sm text-white/60">
            Desarrollado por{" "}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors"
            >
              Osmosis
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}