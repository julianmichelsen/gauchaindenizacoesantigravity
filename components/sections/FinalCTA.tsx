import React from 'react';
import { ContactForm } from '../ContactForm';
import { CheckCircle } from 'lucide-react';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-20 bg-brand-blue text-white relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-brand-gold blur-[100px] -translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl md:text-5xl font-title font-bold leading-tight">
              Não Deixe Seus Direitos Para <span className="text-brand-gold">Depois</span>
            </h2>
            
            <p className="text-xl text-gray-300 leading-relaxed">
              Cada dia que passa pode significar perda de prazo ou documentos cruciais. 
              <br/><br/>
              Descubra <strong className="text-brand-gold">GRATUITAMENTE</strong> se você tem direito a indenização e quanto pode receber.
            </p>

            <ul className="space-y-4 mt-4">
              {[
                "Consulta 100% gratuita",
                "Resposta em até 5 minutos",
                "Totalmente sem compromisso",
                "Atendimento humanizado e direto"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-lg">
                  <CheckCircle className="text-green-400 shrink-0" size={24} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            {/* Decorative border behind form */}
            <div className="absolute inset-0 bg-brand-gold rounded-xl transform translate-x-2 translate-y-2 opacity-50 hidden sm:block"></div>
            <ContactForm buttonText="QUERO DESCOBRIR MEUS DIREITOS AGORA ⚡" />
          </div>

        </div>
      </div>
    </section>
  );
};
