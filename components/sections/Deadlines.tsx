import React from 'react';
import { Clock, AlertCircle } from 'lucide-react';

export const Deadlines: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-brand-blue text-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <div className="text-center mb-10 sm:mb-12 flex flex-col items-center">
          <div className="bg-brand-gold/20 p-4 rounded-full mb-5">
            <Clock size={48} className="text-brand-gold animate-pulse" />
          </div>
          <span className="inline-block bg-red-500/20 text-red-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border border-red-500/30">Não Perca Seus Prazos</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-title font-bold text-white mb-4">
            Atenção aos Prazos! Não Perca Seus Direitos
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8 mb-10 sm:mb-12">
          <div className="bg-red-900/40 border border-red-500/30 p-6 sm:p-8 rounded-2xl">
            <div className="flex items-center gap-3 sm:gap-4 mb-4">
              <div className="relative">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full animate-ping absolute"></div>
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full relative"></div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-red-100">RESPONSABILIDADE CIVIL</h3>
            </div>
            <p className="text-lg sm:text-xl text-gray-200">
              Até <strong className="text-white text-xl sm:text-2xl">3 anos</strong> para reclamar contra quem causou o acidente.
            </p>
          </div>

          <div className="bg-blue-900/40 border border-blue-400/30 p-6 sm:p-8 rounded-2xl">
            <div className="flex items-center gap-3 sm:gap-4 mb-4">
              <div className="relative">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-400 rounded-full animate-ping absolute"></div>
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-400 rounded-full relative"></div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-blue-100">SEGURO DE VIDA/ACIDENTES</h3>
            </div>
            <p className="text-lg sm:text-xl text-gray-200">
              Até <strong className="text-white text-xl sm:text-2xl">1 ano APÓS</strong> o término do tratamento médico ou laudo definitivo.
              <span className="block mt-2 text-brand-gold text-xs sm:text-sm uppercase tracking-wider font-bold">(Não é 1 ano a partir da data do acidente!)</span>
            </p>
          </div>
        </div>

        <div className="bg-brand-gold text-brand-blue p-5 sm:p-6 md:p-8 rounded-2xl flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 shadow-xl">
          <AlertCircle size={36} className="shrink-0" />
          <div className="text-center sm:text-left">
            <h4 className="font-bold text-lg sm:text-xl mb-2">💡 Não Desista Antes de Tentar!</h4>
            <p className="text-base sm:text-lg font-medium leading-relaxed">
              Mesmo que o acidente tenha sido há algum tempo, a contagem dos prazos pode ser complexa. Você ainda pode ter direito! Consulte-nos gratuitamente e descubra a real situação do seu caso.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
