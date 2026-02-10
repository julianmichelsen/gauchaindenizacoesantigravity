import React from 'react';
import { ContactForm } from '../ContactForm';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

export const Hero: React.FC = () => {
  const { content } = useContent();

  return (
    <section className="relative bg-brand-blue text-white py-16 lg:py-24 overflow-hidden">
      {/* Background abstract shapes */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-brand-gold blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-64 h-64 rounded-full bg-blue-500 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex flex-wrap gap-2 text-xs sm:text-sm font-bold text-brand-gold uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1"><ShieldCheck size={16} /> 12 ANOS DE EXP</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">✅ 99,9% SUCESSO</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-title font-bold leading-tight">
              {/* O texto virá do painel administrativo */}
              {content.heroHeadline}
            </h1>
            
            <p className="text-xl sm:text-2xl font-light text-gray-200">
              <strong className="text-brand-gold font-bold">{content.heroSubheadline}</strong>
            </p>

            <div className="bg-white/10 p-6 rounded-xl border border-white/20 mt-4 backdrop-blur-sm">
              <p className="text-lg mb-4 leading-relaxed">
                Motoristas, entregadores e passageiros de aplicativos têm direito a indenização em caso de acidentes com lesões. <strong className="text-brand-gold">Pouca gente sabe disso.</strong>
              </p>
              
              <ul className="space-y-3">
                {[
                  "Fraturas, luxações, rupturas de ligamentos",
                  "Acidentes durante corrida, entrega ou coleta",
                  "Cobertura 24h - não importa se você estava trabalhando"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="text-brand-gold shrink-0 mt-0.5" size={24} />
                    <span className="text-gray-100 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-4 items-center mt-2 text-sm text-gray-300 font-medium">
              <span className="bg-brand-blue border border-brand-gold/50 px-3 py-1.5 rounded-full">📊 1.500+ Processos</span>
              <span className="bg-brand-blue border border-brand-gold/50 px-3 py-1.5 rounded-full">👥 700+ Clientes RS</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <ContactForm />
          </div>

        </div>
      </div>
    </section>
  );
};
