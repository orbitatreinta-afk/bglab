import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const indicacionesIzquierda = [
  { 
    titulo: "Deoxipiridinolina", 
    subtitulo: "orina 2 hs.", 
    info: [
      "• En ayunas a las 8:00 hs de la mañana puntualmente orine en el inodoro **NO RECOLECTE**.",
      "• **INMEDIATAMENTE** después de orinar tome 2 vasos de agua.",
      "• A las 10:00 hs **PUNTUALMENTE** higienícese, orine y recolecte todo el volumen de orina en el recipiente entregado.",
      "• Remita la muestra al laboratorio dentro de las 2 hs de recolectada.",
      "",
      "**⚠️ NOTA:** NO se deben recolectar estas muestras después de las 10 de la mañana porque estas sustancias tienen un ritmo circadiano que produce variaciones de los resultados."
    ]
  },
  { 
    titulo: "Espermograma y/o Espermocultivo", 
    subtitulo: "Semen / Orina", 
    info: [
      "⏱️ **Recepción de muestras:** de lunes a viernes de 7:00 hs. a 10:00 hs.",
      "📌 **Importante:** Por favor, identifique los frascos con nombre y apellido.",
      "",
      "**Instrucciones Generales:**",
      "• Las muestras deberán tomarse por **masturbación**.",
      "• Se deberá recoger el esperma, **TODO EL VOLUMEN EYACULADO**, en un frasco estéril.",
      "• Se deberá tener **abstinencia sexual** no menor a dos (2) días y no mayor a siete (7) días.",
      "• Remitir la muestra al laboratorio en forma **inmediata (máximo 40 minutos de recolectada)**, protegiéndola de temperaturas extremas (no menos de 20°C, ni más de 37°C).",
      "• Los frascos estériles deberán ser destapados **en el momento de la recolección**.",
      "• Al llegar al laboratorio comunique a la administrativa que tiene una muestra para entregar enseguida, entréguela y luego espere su turno.",
      "",
      "**🔬 En caso de ESPERMOCULTIVO:**",
      "Se le entregarán en el laboratorio 2 frascos estériles (para esperma y para orina).",
      "1. Higienizar la zona genital con agua y jabón nuevo, enjuagar con agua y secar con toalla limpia.",
      "2. Recolectar el **primer chorro de orina** en el frasco estéril, descartando la orina restante.",
      "3. Luego deberá juntar la muestra de semen por masturbación en el otro frasco entregado."
    ]
  },
  { 
    titulo: "Análisis de sangre", 
    subtitulo: "Determinación de antígeno prostático (PSA)", 
    info: [
      "• **No mantenga relaciones sexuales** 48 horas antes del análisis.",
      "• **No ande en bicicleta** ni realice ejercicios físicos 48 horas antes del análisis.",
      "• Concurra al Laboratorio manteniendo un periodo de **ayuno de 8 a 14 horas**.",
      "• Cene de manera habitual y cuente las horas de ayuno a partir de finalizada la cena. **No supere las 14 horas de ayuno**.",
      "• **No fume, ni beba café, té o mate** durante el periodo de ayuno. Si desea puede beber agua.",
      "• Informe al Laboratorio los medicamentos que recibe o ha recibido últimamente.",
      "",
      "**⚠️ NOTAS IMPORTANTES:**",
      "• Si se ha realizado un **tacto rectal**, espere **1 semana** para realizarse el análisis.",
      "• Si se ha realizado una **biopsia rectal, una cirugía de próstata**, o ha padecido de alguna **infección urinaria**, espere de **3 a 6 semanas** antes de realizar el análisis."
    ]
  },
  { 
    titulo: "Análisis de sangre", 
    subtitulo: "Con triglicéridos", 
    info: [
      "• Concurra al Laboratorio manteniendo un período de **ayuno de 12 a 14 horas**.",
      "• Cene de manera habitual y cuente las horas de ayuno a partir de finalizada la cena. **No supere las 14 horas de ayuno**.",
      "• **No fume, ni beba café, té o mate** durante el período del ayuno. Si lo desea puede beber agua.",
      "• **No realice ejercicios físicos** antes del análisis.",
      "• Informe al Laboratorio los medicamentos que recibe o ha recibido últimamente.",
      "",
      "**⚠️ NOTA IMPORTANTE:**",
      "• Si sus análisis incluyen la determinación de T4 libre **TOME la Levotiroxina DESPUÉS** de haberse realizado la extracción de sangre y **NO antes**.",
      "",
      "⏱️ Se recomienda concurrir al laboratorio entre las **7:00 y las 9:30 horas**."
    ]
  },
  { 
    titulo: "Análisis de sangre", 
    subtitulo: "Determinación de prolactina y macroprolactina", 
    info: [
      "⏱️ Concurra al Laboratorio entre las **7:00 y las 8:30 horas** de la mañana.",
      "",
      "**Instrucciones:**",
      "• Mantenga un período de **ayuno de 8 a 14 horas**.",
      "• Cene de manera habitual y cuente las horas de ayuno a partir de finalizada la cena. **No supere las 14 horas de ayuno**.",
      "• **No fume, ni beba café, té o mate** durante el período del ayuno. Si lo desea puede beber agua.",
      "• **No mantenga relaciones sexuales** 48 horas antes del análisis.",
      "• **No realice ejercicios físicos** 24 horas antes del análisis.",
      "• Informe al Laboratorio los medicamentos que recibe o ha recibido últimamente.",
      "",
      "**👩 Mujeres:**",
      "• Concurra al laboratorio entre el **3° y 5° día del ciclo**.",
      "",
      "**⚠️ NOTA:** Antes de la extracción de sangre, usted deberá permanecer en el laboratorio entre **20 y 30 minutos en reposo**."
    ]
  },
  { 
    titulo: "Orina completa", 
    subtitulo: "", 
    info: [
      "• Recolecte la **primera orina de la mañana** en el recipiente entregado por el laboratorio, o una orina de otro momento del día con una **retención previa mínima de 3 horas**.",
      "• **Elimine el primer chorro** en el inodoro y recolecte la **porción media** de la orina.",
      "• Cierre cuidadosamente el recipiente.",
      "• Remita al laboratorio **dentro de las 2 horas** de finalizada la recolección (transcurrido ese tiempo, muchos elementos formes se destruyen).",
      "",
      "**⚠️ NOTA:** Se recomienda **no recolectar** muestras de orina durante el **período menstrual**."
    ]
  },
  { 
    titulo: "Orina de 24 hs.", 
    subtitulo: "", 
    info: [
      "🧼 Antes de recolectar cada muestra, efectúe una **cuidadosa higiene de la zona genital**.",
      "",
      "**Pasos para la recolección:**",
      "1. A las **08:00 horas** (o la hora que elija) **PUNTUALMENTE orine en el inodoro y NO RECOLECTE**. Las 24 hs se cuentan desde este momento.",
      "2. A partir de ahí, **cada vez que desee orinar**, recolecte todo el volumen en un recipiente de boca ancha limpio y seco, y transvase **TODO** el volumen al recipiente grande entregado por el Laboratorio.",
      "3. Al día siguiente, a las **08:00 horas** (o la hora elegida) **PUNTUALMENTE vacíe totalmente la vejiga** en el recipiente de boca ancha y transvase el volumen al recipiente grande.",
      "",
      "**📌 IMPORTANTE:**",
      "• Cumpla estrictamente los horarios y recoja **TODO** el volumen de orina.",
      "• Remita al laboratorio **dentro de las 2 horas** de finalizada la recolección. Por excepción, mantenga en heladera como máximo 2 horas.",
      "• Si el estudio es **Microalbuminuria**, evite realizar actividad física intensa.",
      "• Se recomienda **NO recolectar** en el **períero menstrual**.",
      "",
      "📝 **REGISTRE al entregar:** Peso y Altura del paciente."
    ]
  },
  { 
    titulo: "Orina de 24 hs.", 
    subtitulo: "Con primera orina de la mañana", 
    info: [
      "**Pasos para la recolección:**",
      "1. A las **08:00 horas** (o la hora que elija) **PUNTUALMENTE orine en el inodoro y NO RECOLECTE**. Las 24 hs se cuentan desde este momento.",
      "2. A partir de ahí, **cada vez que desee orinar**, recolecte todo el volumen en un recipiente de boca ancha limpio y seco, y transvase **TODO** al recipiente grande de 24 hs.",
      "3. Al día siguiente, **trate de no orinar 3 horas antes** del horario final.",
      "4. A la hora elegida **PUNTUALMENTE vacíe la vejiga de la siguiente manera**:",
      "   • El **1er chorro** en el recipiente de boca ancha y transváselo al recipiente grande de 24 hs.",
      "   • El **resto de la orina** directamente en el recipiente **pequeño estéril** (si este se llena, siga orinando en el de boca ancha y páselo al grande).",
      "",
      "**📌 IMPORTANTE:**",
      "• Cumpla estrictamente los horarios y recoja **TODO** el volumen.",
      "• Remita dentro de las **2 horas** de finalizada la recolección. (Excepción: heladera máximo 2 horas).",
      "• Si el estudio es **Microalbuminuria**, evite realizar actividad física intensa.",
      "• Se recomienda **NO recolectar** en el **período menstrual**.",
      "",
      "📝 **REGISTRE al entregar:** Peso y Altura del paciente."
    ]
  },
  { 
    titulo: "Orina diurna y nocturna", 
    subtitulo: "Proteinuria ortostática", 
    info: [
      "📦 Esta recolección requiere juntar orina en **dos bidones separados**, uno identificado como **\"DIURNA\"** y otro como **\"NOCTURNA\"**.",
      "🧼 Efectúe una cuidadosa higiene de la zona genital antes de cada muestra. Use un recipiente de boca ancha limpio y seco para trasvasar.",
      "",
      "**Cronograma Estricto:**",
      "• **7:00 hs PUNTUALMENTE:** Vacíe la vejiga por completo en el inodoro (**NO RECOLECTE**).",
      "• **Durante el día:** Cada vez que desee orinar, recolecte todo el volumen en el bidón **\"DIURNA\"**.",
      "• **21:00 hs EXACTAS:** Acuéstese y permanezca en la cama hasta las 23 horas.",
      "• **23:00 hs PUNTUALMENTE:** Levántese, orine y recolecte en el bidón **\"DIURNA\"** (aunque no tenga ganas y sea muy poco).",
      "• **De noche:** Vuélvase a acostar y permanezca en reposo (duerma) hasta las 7:00 hs. *(Si no puede retener en este lapso, puede orinar en el recipiente **\"NOCTURNA\"**)*.",
      "• **Siguiente día - 7:00 hs PUNTUALMENTE:** Levántese, orine y recolecte en el recipiente **\"NOCTURNA\"** (obligatorio, aunque sea poco).",
      "",
      "**📌 IMPORTANTE:** Cumpla estrictamente los horarios. Remita al laboratorio **dentro de las 2 horas** (o heladera el menor tiempo posible). No recolectar en el **período menstrual**."
    ]
  },
];

const indicacionesDerecha = [
  { 
    titulo: "Urocultivo", 
    subtitulo: "Recuento de colonias en mujeres y niñas", 
    info: [
      "🚫 **SIN tratamiento antibiótico** desde 72 hs. antes o más (salvo indicación médica). Si tomó recientemente, traiga nombre y fecha de fin.",
      "⏱️ **Retención mínima:** Por lo menos 3 horas o la máxima retención posible.",
      "",
      "**Higienización y Recolección:**",
      "1. Lávese prolijamente con abundante agua y jabón nuevo.",
      "2. **El lavado debe hacerse desde adelante hacia atrás, NUNCA en sentido contrario**. Enjuague con abundante agua.",
      "3. **Elimine el primer chorro** de orina en el inodoro.",
      "4. Recolecte la **porción media** en el recipiente estéril entregado (manténgalo tapado hasta el momento de usar).",
      "",
      "**📌 ENVÍO:** Remita al laboratorio **dentro de las 2 horas**. *Excepción:* Si debe recolectar fuera de hora para iniciar un antibiótico urgente, mantenga en heladera hasta llevarla."
    ]
  },
  { 
    titulo: "Urocultivo", 
    subtitulo: "Recuento de colonias en varones", 
    info: [
      "🚫 **SIN tratamiento antibiótico** desde 72 hs. antes o más (salvo indicación médica). Si tomó recientemente, traiga nombre y fecha de fin.",
      "⏱️ **Retención mínima:** Por lo menos 3 horas o la máxima retención posible.",
      "",
      "**Higienización y Recolección:**",
      "1. Realice una cuidadosa higiene del pene con abundante agua y jabón nuevo, **con retracción de la piel (prepucio)**. Enjuague con abundante agua.",
      "2. **Orine el primer chorro** en el inodoro.",
      "3. Recoja la **segunda porción** de la orina en el recipiente estéril (manténgalo tapado hasta el momento de la recolección).",
      "",
      "**📌 ENVÍO:** Remita al laboratorio **dentro de las 2 horas**. *Excepción:* Si debe recolectar fuera de hora para iniciar un antibiótico urgente, mantenga en heladera hasta llevarla."
    ]
  },
  { 
    titulo: "Coprocultivos", 
    subtitulo: "Materia fecal", 
    info: [
      "🚫 **Restricciones:** SIN antibióticos ni antidiarreicos (carbón, bismuto, etc.) desde 72 hs antes. Traiga nombres y fechas si estuvo en tratamiento.",
      "🧼 Lávese la piel de la zona genital con agua y jabón blanco.",
      "",
      "**Formas de Recolección:**",
      "• **Opción General:** Recolecte la muestra directamente en un recipiente estéril y remita dentro de las 2 horas.",
      "• **Con tubo de transporte e hisopo:** Defecar en un recipiente limpio y seco. Con el hisopo **recoger muestra de materia fecal, pasándolo principalmente por zonas donde se vea moco o sangre** y colocar el mismo dentro del tubo.",
      "• Mantener el medio a temperatura ambiente y remitir al laboratorio dentro de las 2 hs siguientes.",
      "",
      "**💡 Datos Clave:** Las muestras óptimas para cultivo son las que presentan filamentos de moco (o moco y sangre) o deposiciones líquidas. El estudio de heces sólidas formadas **SÓLO** tiene validez en búsqueda de portadores."
    ]
  },
  { 
    titulo: "Exámenes micológicos", 
    subtitulo: "", 
    info: [
      "• **7 días antes:** NO tome antimicóticos NI se coloque cremas, soluciones o aerosoles antimicóticos.",
      "• **3 días antes:** NO se coloque cremas humectantes, talco, antisépticos, etc.",
      "",
      "**Según la zona a analizar:**",
      "• **Piel y/o cuero cabelludo:** Inmediatamente antes de concurrir al Laboratorio hágase una higiene con agua y jabón blanco y enjuáguese con abundante agua.",
      "• **Uñas:** 7 días antes de concurrir al Laboratorio NO recorte las uñas afectadas y quite el esmalte, si las tuviera pintadas.",
      "• 3 días antes, cepille 3 veces por día con agua y jabón.",
      "",
      "**👣 NOTA ESPECIAL (PIES):** Si los afectados son los PIES (uñas, piel de planta y/o espacios interdigitales) **1 hora previa** al análisis sumérjalos en **agua con sal durante 10 minutos** e inmediatamente **COLÓQUESE** medias de algodón para concurrir al laboratorio."
    ]
  },
  { 
    titulo: "Exámen de flujo vaginal o Endocervical", 
    subtitulo: "", 
    info: [
      "• Concurrir al laboratorio **sin realizar higiene previa**.",
      "• Si ha sido revisada ginecológicamente, deje transcurrir **48 hs** para su atención en el laboratorio.",
      "• Debe estar **alejado de la menstruación** (ausencia de secreciones amarronadas o pérdidas).",
      "",
      "**Tres días antes del estudio:**",
      "1. **No mantener relaciones sexuales**.",
      "2. No colocarse óvulos, pomadas, antisépticos vaginales ni talcos.",
      "3. **No tomar antibióticos**. *(Traer nombre y fecha si tomó medicamentos recientemente)*.",
      "",
      "⏱️ **Horario recomendado:** Lunes a viernes de 7:00 a 14:15 hs."
    ]
  },
  { 
    titulo: "Exámen parasitológico seriado y Test de Graham", 
    subtitulo: "Materia fecal", 
    info: [
      "💩 **EXAMEN PARASITOLOGICO SERIADO (Consta de 2 frascos):**",
      "• **1° Frasco (Con líquido conservante):** Colocar diariamente la cantidad de materia fecal equivalente a una cucharadita de café en el frasco durante **7 días consecutivos**.",
      "• **2° Frasco (Frasco vacío):** Colocar en el frasco sin conservantes **sólo el último día** una parte de materia fecal y remitir inmediatamente al laboratorio.",
      "• No preocuparse si algún día falta la evacuación, en tal caso se prolongará la recolección de las muestras hasta 10 días para intentar completar las 7 muestras.",
      "",
      "🧻 **TEST DE GRAHAM (Un frasco que contiene líquido conservante):**",
      "• A la mañana **antes de levantarse**, pasar una gasa por los bordes del ano y colocarla en el frasco, mezclando con el líquido contenido en él. Repetir la operación durante **7 días consecutivos**.",
      "",
      "**⚠️ ALERTAS:**",
      "• El líquido contenido en los recipientes es un conservante: **mantenga fuera del alcance de los niños y NO DEBE VOLCAR EL LIQUIDO DE LOS FRASCOS**.",
      "• **NO USAR TALCO** mientras recogen las muestras."
    ]
  },
  { 
    titulo: "Recuento de levaduras", 
    subtitulo: "Materia fecal", 
    info: [
      "• **15 días antes:** NO tomar antibióticos ni corticoides.",
      "• **3 días antes:** NO tomar vaselina ni otros laxantes.",
      "• Recolectar la materia fecal en el recipiente estéril entregado.",
      "• Remitir al laboratorio **dentro de las 2 horas** de finalizada la recolección.",
      "",
      "⏱️ **Horario de recepción:** Lunes a viernes de 7:00 a 16:00 hs."
    ]
  },
  { 
    titulo: "Exudados faríngeos", 
    subtitulo: "", 
    info: [
      "🚫 **SIN tratamiento de antibiótico** hasta 72 horas antes o más (salvo expresa indicación médica).",
      "👉 Si estuvo recientemente en tratamiento traer el nombre del medicamento y la fecha en que dejó de recibirlo.",
      "",
      "• Concurrir al laboratorio **en ayunas, o sin haber ingerido líquidos ni sólidos desde 3 horas antes** de la toma faríngea."
    ]
  },
  { 
    titulo: "Análisis de saliva", 
    subtitulo: "", 
    info: [
      "• Mantenga un **ayuno de 3 horas como mínimo**.",
      "• **No realice ejercicios físicos** 12 horas antes de la recolección de saliva.",
      "• Realice 3 ó 4 enjuagues bucales con agua, **sin cepillarse los dientes**.",
      "• **No realice la recolección** si tiene heridas sangrantes en la boca.",
      "• Recolecte la muestra de saliva en el recipiente entregado por el laboratorio.",
      "• Remita la muestra **de inmediato** al Laboratorio. Si no fuera posible, manténgala en la heladera no más de 12 horas.",
      "• Informe al Laboratorio el nombre de los medicamentos que recibe o ha recibido recientemente.",
      "",
      "**⚠️ NOTA:** La determinación de **Cortisol en saliva** se realiza a las **8 horas de la mañana o a las 23 horas** según lo requiera el médico, respetando las instrucciones generales."
    ]
  },
];

interface Indicacion {
  titulo: string;
  subtitulo: string;
  info: string[];
}

export default function InformacionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedIndicacion, setSelectedIndicacion] = useState<Indicacion | null>(null);
  const [activeData, setActiveData] = useState<Indicacion | null>(null);

  useEffect(() => {
    if (selectedIndicacion) {
      setActiveData(selectedIndicacion);
    }
  }, [selectedIndicacion]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".info-animate", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
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

  // Función para convertir los asteriscos **texto** en elementos HTML <strong> reales de React
  const renderTextoConFormato = (linea: string) => {
    if (!linea) return <div className="h-2" />; // Si es línea vacía, hace de separador de párrafo

    const partes = linea.split(/(\*\*.*?\*\*)/g);
    return (
      <p className="mb-1 text-gray-700 text-sm leading-relaxed">
        {partes.map((parte, index) => {
          if (parte.startsWith("**") && parte.endsWith("**")) {
            return <strong key={index} className="font-bold text-gray-900">{parte.slice(2, -2)}</strong>;
          }
          return parte;
        })}
      </p>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="informacion"
      className="relative w-full bg-ibta-dark overflow-hidden"
    >
      {/* Imagen decorativa derecha */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-20 md:w-32 lg:w-44 pointer-events-none z-0 hidden md:block select-none">
        <img
          src="https://www.ibta.com.ar/img/info-pacientes-derecha.svg"
          alt=""
          className="w-full h-auto opacity-75 mix-blend-screen object-contain img-render-edge" 
        />
      </div>

      <div className="relative z-10 px-4 md:px-8 lg:px-12 py-10 md:py-14 lg:py-16">
        {/* Título principal con la misma tipografía y detalle inferior */}
        <div className="info-animate mb-8 md:mb-10">
          <h2 className="text-white text-xl md:text-2xl lg:text-3xl tracking-wider uppercase relative inline-block pb-3">
            <strong className="font-bold">Información</strong> para pacientes
            <span className="absolute bottom-0 left-0 w-12 h-1 bg-ibta-primary rounded-full"></span>
          </h2>
        </div>

        {/* Subtítulo */}
        <div className="info-animate mb-8">
          <h3 className="text-white text-lg md:text-xl font-semibold">
            <strong>HACÉ CLICK</strong> en el estudio que te vas a realizar.
          </h3>
        </div>

        {/* Listas en dos columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Columna Izquierda */}
          <div className="info-animate space-y-3">
            {indicacionesIzquierda.map((item, i) => (
              <div
                key={`left-${i}`}
                onClick={() => setSelectedIndicacion(item)}
                className="flex items-start gap-3 cursor-pointer group"
              >
                <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                  <i className="ri-checkbox-circle-line text-ibta-light text-lg group-hover:text-white transition-colors"></i>
                </div>
                <div className="flex-1">
                  <p className="text-white/90 text-sm group-hover:text-white transition-colors">
                    <strong>{item.titulo}</strong>
                    {item.subtitulo && (
                      <span className="text-white/60"> | {item.subtitulo}</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Columna Derecha */}
          <div className="info-animate space-y-3">
            {indicacionesDerecha.map((item, i) => (
              <div
                key={`right-${i}`}
                onClick={() => setSelectedIndicacion(item)}
                className="flex items-start gap-3 cursor-pointer group"
              >
                <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                  <i className="ri-checkbox-circle-line text-ibta-light text-lg group-hover:text-white transition-colors"></i>
                </div>
                <div className="flex-1">
                  <p className="text-white/90 text-sm group-hover:text-white transition-colors">
                    <strong>{item.titulo}</strong>
                    {item.subtitulo && (
                      <span className="text-white/60"> | {item.subtitulo}</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RECUADRO FLOTANTE CON TRANSICIÓN SUAVE */}
      <div 
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-all duration-300 ease-out ${
          selectedIndicacion 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSelectedIndicacion(null)}
      >
        {/* Tarjeta blanca contenedora */}
        <div 
          className={`bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 relative transition-all duration-300 ease-out transform ${
            selectedIndicacion 
              ? "scale-100 opacity-100" 
              : "scale-95 opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botón cruz de cierre */}
          <button 
            onClick={() => setSelectedIndicacion(null)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl transition-colors"
          >
            <i className="ri-close-line"></i>
          </button>

          {activeData && (
            <>
              {/* Encabezado del modal */}
              <div className="border-b border-gray-100 pb-3 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-ibta-light bg-blue-50 px-2.5 py-1 rounded">
                  Indicaciones Médicas
                </span>
                <h4 className="text-xl font-bold text-gray-950 mt-2">
                  {activeData.titulo}
                </h4>
                {activeData.subtitulo && (
                  <p className="text-sm text-gray-500 font-medium mt-0.5">
                    Muestra: {activeData.subtitulo}
                  </p>
                )}
              </div>

              {/* Renderizado dinámico línea por línea interpretando las negritas */}
              <div className="max-h-[60vh] overflow-y-auto pr-1 text-left">
                {activeData.info.map((linea, index) => (
                  <div key={index}>{renderTextoConFormato(linea)}</div>
                ))}
              </div>
            </>
          )}

          {/* Botón inferior para cerrar */}
          <div className="mt-6 flex justify-end">
            <button 
              onClick={() => setSelectedIndicacion(null)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-sm"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
