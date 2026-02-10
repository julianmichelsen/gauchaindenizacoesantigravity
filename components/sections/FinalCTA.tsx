import React from 'react';
import { ContactForm } from '../ContactForm';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { generateWhatsAppLink } from '../../constants';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-brand-blue text-white relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-brand-gold blur-[100px] -translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
        {/* Urgency Bar */}
        <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 sm:p-5 mb-10 sm:mb-12 flex items-center justify-center gap-3 text-center">
          <AlertTriangle className="text-red-400 shrink-0 hidden sm:block" size={24} />
          <p className="text-sm sm:text-base font-medium text-red-100">
            ⚠️ <strong>Atenção:</strong> Prazos para solicitar indenização podem expirar. Não deixe para depois!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">

          <div className="flex flex-col gap-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-title font-bold leading-tight text-center lg:text-left">
              Não Deixe Seus Direitos Para <span className="text-brand-gold">Depois</span>
            </h2>

            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed text-center lg:text-left">
              Cada dia que passa pode significar perda de prazo ou documentos cruciais.
              <br /><br />
              Descubra <strong className="text-brand-gold">GRATUITAMENTE</strong> se você tem direito a indenização e quanto pode receber.
            </p>

            <ul className="space-y-3 sm:space-y-4 mt-2">
              {[
                "Consulta 100% gratuita",
                "Resposta em até 5 minutos",
                "Totalmente sem compromisso",
                "Atendimento humanizado e direto"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-base sm:text-lg">
                  <CheckCircle className="text-green-400 shrink-0" size={22} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Mobile-only quick CTA */}
            <a
              href={generateWhatsAppLink("Olá! Gostaria de falar direto pelo WhatsApp para uma análise rápida.")}
              target="_blank"
              rel="noopener noreferrer"
              className="lg:hidden w-full bg-[#25D366] text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:bg-green-600 transition-all flex items-center justify-center gap-2 text-lg mt-2"
            >
              💬 Falar no WhatsApp Agora
            </a>
          </div>

          <div className="relative">
            {/* Decorative border behind form */}
            <div className="absolute inset-0 bg-brand-gold rounded-2xl transform translate-x-2 translate-y-2 opacity-30 hidden sm:block"></div>
            <ContactForm buttonText="QUERO DESCOBRIR MEUS DIREITOS AGORA ⚡" />
          </div>

        </div>
      </div>
    </section>
  );
};
