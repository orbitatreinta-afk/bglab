import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PLACE_ID = "ChIJj83aJOVbtpUR9xb_W5RgWn4";
const GOOGLE_RATING = 4.7;
const GOOGLE_TOTAL = 31;

interface Review {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  profile_photo_url?: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3.5 h-3.5 ${star <= rating ? "text-amber-400" : "text-neutral-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// Configuración estética con colores sólidamente planos y clínicos
const DESIGN_STYLES = [
  { card: "bg-white border-slate-200 text-slate-800" },                        // Blanco Puro
  { card: "bg-teal-50 border-teal-200/80 text-teal-950" },                     // Verde Quirófano Claro
  { card: "bg-slate-900 border-slate-800 text-slate-100" },                    // Azul Tecnológico Oscuro
  { card: "bg-sky-50 border-sky-200/80 text-sky-950" },                       // Azul Sanitizante Claro
  { card: "bg-slate-100 border-slate-200/80 text-slate-900" }                 // Gris Instrumental Claro
];

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const initials = review.author_name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const styleConfig = DESIGN_STYLES[index % DESIGN_STYLES.length];
  const isDarkBg = styleConfig.card.includes("bg-slate-900");

  // Alternancia de alineación en zigzag
  const sideClass = index % 2 === 0 ? "mr-auto md:ml-12" : "ml-auto md:mr-12";

  return (
    <div className={`relative w-full max-w-sm ${sideClass}`}>
      {/* BURBUJA DE OPINIÓN ESTILIZADA SOLIDA */}
      <div 
        className={`
          relative border rounded-2xl p-6 flex flex-col gap-4 
          shadow-[0_15px_35px_rgba(0,0,0,0.08),0_5px_15px_rgba(0,0,0,0.03)]
          transition-all duration-400 ease-out transform group/card
          hover:-translate-y-2 hover:scale-[1.03] hover:z-40 
          hover:shadow-[0_25px_50px_rgba(0,0,0,0.2)] cursor-pointer
          ${styleConfig.card}
        `}
      >
        {/* Numeración limpia */}
        <span className="absolute top-4 right-5 text-sm font-sans font-bold tracking-tight opacity-15 italic">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="flex items-center gap-3 mt-1">
          {review.profile_photo_url ? (
            <img
              src={review.profile_photo_url}
              alt={review.author_name}
              className="w-9 h-9 rounded-full object-cover flex-shrink-0 border border-black/5"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${isDarkBg ? 'bg-white/10' : 'bg-slate-200'}`}>
              <span className={`text-xs font-bold ${isDarkBg ? 'text-white' : 'text-slate-700'}`}>{initials}</span>
            </div>
          )}
          <div className="min-w-0">
            <p className="text-sm font-bold truncate pr-6 tracking-tight">{review.author_name}</p>
            <p className={`text-xs ${isDarkBg ? 'text-slate-400' : 'text-slate-500'}`}>{review.relative_time_description}</p>
          </div>
        </div>
        
        <StarRating rating={review.rating} />
        
        {/* Expansión al posar el cursor */}
        <p className={`text-xs md:text-sm leading-relaxed transition-all duration-300 line-clamp-4 group-hover/card:line-clamp-none ${isDarkBg ? 'text-slate-300' : 'text-slate-600'}`}>
          "{review.text}"
        </p>
      </div>
    </div>
  );
}

export default function LaboratorioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`/api/google-reviews?place_id=${PLACE_ID}`);
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        const withText: Review[] = (data.reviews ?? []).filter(
          (r: Review) => r.text && r.text.trim().length > 0
        );
        setReviews(withText.slice(0, 5));
      } catch {
        setReviews([
          {
            author_name: "Maria De Los Angeles Peralta",
            rating: 5,
            text: "Muy buena atención!",
            relative_time_description: "hace 4 meses",
          },
          {
            author_name: "Rita Blanco",
            rating: 5,
            text: "Es un lugar q esta siempre impecable, atención rápida y la bioquímica tiene una mano barbara para las extracciones",
            relative_time_description: "hace 4 meses",
          },
          {
            author_name: "Paciente",
            rating: 5,
            text: "Siempre muy amables, muy buena atención... y rápida. Lo que más me gusta que tratan a los abuelos con mucho amor, cosa que no en todos los lugares atienden así.",
            relative_time_description: "hace unos meses",
          },
          {
            author_name: "Paciente",
            rating: 5,
            text: "Excelente atención, poca espera.",
            relative_time_description: "hace unos meses",
          },
          {
            author_name: "Paciente",
            rating: 5,
            text: "Excelente atención y muy rápido 😊",
            relative_time_description: "hace unos meses",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".lab-animate", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="laboratorio"
      className="relative w-full bg-ibta-dark py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* COLUMNA IZQUIERDA (Sticky): Título y Score de Google */}
          <div className="lg:col-span-5 space-y-8 min-w-0 w-full lg:sticky lg:top-28 z-20">
            <div className="lab-animate space-y-4">
              <h3 className="text-white text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
                La confianza de nuestros pacientes.
              </h3>
              <p className="text-white/70 text-sm md:text-base max-w-xl">
                La excelencia médica y la calidez humana nos definen. Conocé las opiniones reales de quienes nos eligen a diario a través de un canal independiente.
              </p>
            </div>

            {/* Score Badge de Google */}
            <div className="lab-animate inline-flex items-center gap-5 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-white text-3xl font-black tracking-tight leading-none">{GOOGLE_RATING}</span>
                  <span className="text-white/50 text-xs">/5</span>
                </div>
                <div className="mt-1">
                  <StarRating rating={Math.round(GOOGLE_RATING)} />
                </div>
                <span className="text-white/50 text-[11px] mt-1">{GOOGLE_TOTAL} opiniones en Google</span>
              </div>
              <div className="h-12 w-px bg-white/10"></div>
              <div className="flex flex-col items-center gap-1">
                <img
                  src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                  alt="Google"
                  className="h-4 brightness-0 invert opacity-80"
                />
                <span className="text-[9px] text-white/40 tracking-widest uppercase font-bold">Reseñas</span>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: Listado vertical en Zigzag */}
          <div className="lg:col-span-7 relative w-full z-10 px-2 sm:px-6">
            
            {/* Línea segmentada de fondo */}
            <div className="absolute top-16 bottom-16 left-1/2 -translate-x-1/2 w-0.5 border-l-2 border-dashed border-white/10 pointer-events-none hidden md:block" />

            <div className="lab-animate space-y-10 md:space-y-6 relative">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className={`w-full max-w-sm h-40 bg-white/5 rounded-2xl animate-pulse border border-white/10 ${i % 2 === 0 ? 'mr-auto' : 'ml-auto'}`} />
                ))
              ) : (
                reviews.map((review, i) => (
                  <ReviewCard key={i} review={review} index={i} />
                ))
              )}
            </div>

          </div>

        </div>
      </div>

      <style>{`
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
