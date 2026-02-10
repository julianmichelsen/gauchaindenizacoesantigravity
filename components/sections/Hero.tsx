import * as React from 'react';
import { ContactForm } from '../ContactForm';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

export const Hero: React.FC = () => {
  const { content } = useContent();

  return (
    <section id="inicio" className="relative bg-brand-blue text-white pt-32 pb-12 sm:pt-40 sm:pb-16 lg:pt-48 lg:pb-24 overflow-hidden">
      {/* Background abstract shapes */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-brand-gold blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-64 h-64 rounded-full bg-blue-500 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* Trust badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 text-xs sm:text-sm font-bold text-brand-gold uppercase tracking-wider">
              <span className="flex items-center gap-1.5 bg-brand-gold/10 px-3 py-1.5 rounded-full border border-brand-gold/20"><ShieldCheck size={16} /> 12 ANOS DE EXP</span>
              <span className="flex items-center gap-1.5 bg-brand-gold/10 px-3 py-1.5 rounded-full border border-brand-gold/20">✅ 99,9% SUCESSO</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[3.5rem] font-title font-bold leading-[1.15] tracking-wide lg:tracking-widest text-center lg:text-left">
              {content.heroHeadline.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < content.heroHeadline.split('\n').length - 1 && <br className="hidden lg:block" />}
                </React.Fragment>
              ))}
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl font-light text-gray-200 text-center lg:text-left leading-relaxed">
              <strong className="text-brand-gold font-bold">{content.heroSubheadline}</strong>
            </p>

            <div className="bg-white/10 p-5 sm:p-6 rounded-xl border border-white/20 mt-1 backdrop-blur-sm">
              <p className="text-base sm:text-lg mb-4 leading-relaxed text-center lg:text-left">
                Motoristas, entregadores e passageiros de aplicativos têm direito a indenização em caso de acidentes com lesões. <br className="block sm:hidden" /><strong className="text-brand-gold">Pouca gente sabe disso.</strong>
              </p>

              <ul className="space-y-3 flex flex-col items-start">
                {[
                  "Fraturas, luxações, rupturas de ligamentos",
                  "Acidentes durante corrida, entrega ou coleta",
                  "Cobertura 24h - não importa se você estava trabalhando"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 w-full">
                    <CheckCircle2 className="text-brand-gold shrink-0 mt-0.5" size={22} />
                    <span className="text-gray-100 text-base sm:text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3 items-center text-sm text-gray-300 font-medium">
              <span className="bg-brand-blue border border-brand-gold/50 px-4 py-2 rounded-full">📊 1.500+ Processos</span>
              <span className="bg-brand-blue border border-brand-gold/50 px-4 py-2 rounded-full">👥 700+ Clientes RS</span>
            </div>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-28" id="contato">
            <ContactForm />
          </div>

        </div>
      </div>
    </section>
  );
};
