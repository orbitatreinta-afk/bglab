"use client";

import { useState } from "react";
import Header from "@/components/feature/Header";
import Footer from "@/components/feature/Footer";
import QuienesSomosSection from "./components/QuienesSomosSection";
import CertificacionesSection from "./components/CertificacionesSection";
import LaboratorioSection from "./components/LaboratorioSection";
import InformacionSection from "./components/InformacionSection";
import PoliticaCalidadSection from "./components/PoliticaCalidadSection";
import InformeAlacSection from "./components/InformeAlacSection";
import InfoInteresSection from "./components/InfoInteresSection";
import ContactoSection from "./components/ContactoSection";
import DifyChatWidget from "@/components/feature/DifyChatWidget";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [initialChatMessage, setInitialChatMessage] = useState("");

  const abrirChatConMensaje = (mensaje: string) => {
    setInitialChatMessage(mensaje);
    setIsChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>

        {/* ID para Nuestro Servicio (apunta al componente Certificaciones) */}
        <section id="certificaciones">
          <CertificacionesSection />
        </section>

        {/* ID para Obras Sociales (apunta a PoliticaCalidadSection según pediste) */}
        <section id="politica-de-calidad">
          <PoliticaCalidadSection onOpenChat={abrirChatConMensaje} />
        </section>

        {/* ID para Información sobre Ayunos */}
        <section id="informacion">
          <InformacionSection />
        </section>

        {/* ID para Quiénes Somos */}
        <section id="quienes-somos">
          <QuienesSomosSection />
        </section>

        {/* Dejamos LaboratorioSection por si tiene contenido visual intermedio, 
            pero recordar que ya no se accede directo desde la Navbar */}
        <LaboratorioSection />

        {/* Secciones secundarias que complementan el contenido */}
        <InformeAlacSection />
        <InfoInteresSection />

        {/* ID para Contacto */}
        <section id="contacto">
          <ContactoSection />
        </section>
      </main>
      <Footer />

      {/* Widget del Chatbot conectado al estado global */}
      <DifyChatWidget 
        isOpenExternal={isChatOpen} 
        setIsOpenExternal={setIsChatOpen} 
        initialMessage={initialChatMessage}
      />
    </div>
  );
}