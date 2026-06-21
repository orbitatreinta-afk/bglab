interface ObraSocial {
  name: string;
  logo: string;
  alt: string;
  whiteFilter: boolean;
}

const obrasSociales: ObraSocial[] = [
  {
    name: "PAMI",
    logo: "https://storage.readdy-site.link/project_files/2665f379-08af-4690-a680-8e39fb9e4183/b13b64ff-6921-4b51-ae60-5c7658dc83b4_logo_pami_azul.svg",
    alt: "PAMI",
    whiteFilter: true,
  },
  {
    name: "IAPOS",
    logo: "https://storage.readdy-site.link/project_files/2665f379-08af-4690-a680-8e39fb9e4183/10f32c67-f887-4a2b-852c-4cedf7fdf319_IAPOS-logo-blanco-sin-fondo.png",
    alt: "IAPOS",
    whiteFilter: false,
  },
  {
    name: "OSDE",
    logo: "https://storage.readdy-site.link/project_files/2665f379-08af-4690-a680-8e39fb9e4183/2455601a-ea82-4210-98ea-3df6d698bcd0_Logo-OSDE_white.svg",
    alt: "OSDE",
    whiteFilter: true,
  },
  {
    name: "SSGMP",
    logo: "https://storage.readdy-site.link/project_files/2665f379-08af-4690-a680-8e39fb9e4183/0eecbbd6-c3aa-4d90-abb9-05d8328e924f_logo_web_SSGMP-01.svg",
    alt: "SSGMP",
    whiteFilter: true,
  },
  {
    name: "Federada Salud",
    logo: "https://storage.readdy-site.link/project_files/2665f379-08af-4690-a680-8e39fb9e4183/0f67827f-ff6d-4144-afaa-60a6db06f131_Logo-Federada-Cobertura-Medica.svg",
    alt: "Federada Salud",
    whiteFilter: true,
  },
];

export default function ObrasSocialesCarousel() {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20">
      <div className="bg-ibta-dark/80 backdrop-blur-sm py-2 md:py-3 overflow-hidden">
        <div className="flex items-center gap-8 md:gap-10 lg:gap-12 animate-scroll-infinite whitespace-nowrap">
          {obrasSociales.map((obra) => (
            <div
              key={obra.name}
              className="flex-shrink-0 flex items-center justify-center h-8 md:h-10 lg:h-12"
            >
              <img
                src={obra.logo}
                alt={obra.alt}
                title={obra.name}
                className="h-full w-auto object-contain max-w-[100px] md:max-w-[130px] lg:max-w-[160px]"
                style={obra.whiteFilter ? { filter: "brightness(0) invert(1)" } : undefined}
                loading="lazy"
              />
            </div>
          ))}
          {obrasSociales.map((obra) => (
            <div
              key={`${obra.name}-dup`}
              className="flex-shrink-0 flex items-center justify-center h-8 md:h-10 lg:h-12"
            >
              <img
                src={obra.logo}
                alt={obra.alt}
                title={obra.name}
                className="h-full w-auto object-contain max-w-[100px] md:max-w-[130px] lg:max-w-[160px]"
                style={obra.whiteFilter ? { filter: "brightness(0) invert(1)" } : undefined}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scrollInfinite {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll-infinite {
          animation: scrollInfinite 35s linear infinite;
          display: inline-flex;
        }
        .animate-scroll-infinite:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}