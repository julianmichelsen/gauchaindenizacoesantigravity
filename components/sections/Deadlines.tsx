import React from 'react';
import { Clock, AlertCircle } from 'lucide-react';

export const Deadlines: React.FC = () => {
  return (
    <section className="py-20 bg-brand-blue text-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12 flex flex-col items-center">
          <Clock size={64} className="text-brand-gold mb-6 animate-pulse" />
          <h2 className="text-3xl md:text-5xl font-title font-bold text-white mb-4">
            Atenção aos Prazos! Não Perca Seus Direitos
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-red-900/40 border border-red-500/30 p-8 rounded-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-4 h-4 bg-red-500 rounded-full animate-ping absolute"></div>
              <div className="w-4 h-4 bg-red-500 rounded-full relative"></div>
              <h3 className="text-2xl font-bold text-red-100">RESPONSABILIDADE CIVIL</h3>
            </div>
            <p className="text-xl text-gray-200">
              Até <strong className="text-white text-2xl">3 anos</strong> para reclamar contra quem causou o acidente.
            </p>
          </div>

          <div className="bg-blue-900/40 border border-blue-400/30 p-8 rounded-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-4 h-4 bg-blue-400 rounded-full animate-ping absolute"></div>
              <div className="w-4 h-4 bg-blue-400 rounded-full relative"></div>
              <h3 className="text-2xl font-bold text-blue-100">SEGURO DE VIDA/ACIDENTES</h3>
            </div>
            <p className="text-xl text-gray-200">
              Até <strong className="text-white text-2xl">1 ano APÓS</strong> o término do tratamento médico ou laudo definitivo.
              <span className="block mt-2 text-brand-gold text-sm uppercase tracking-wider font-bold">(Não é 1 ano a partir da data do acidente!)</span>
            </p>
          </div>
        </div>

        <div className="bg-brand-gold text-brand-blue p-6 md:p-8 rounded-2xl flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-xl">
          <AlertCircle size={40} className="shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-xl mb-2">💡 Não Desista Antes de Tentar!</h4>
            <p className="text-lg font-medium leading-relaxed">
              Mesmo que o acidente tenha sido há algum tempo, a contagem dos prazos pode ser complexa. Você ainda pode ter direito! Consulte-nos gratuitamente e descubra a real situação do seu caso.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
