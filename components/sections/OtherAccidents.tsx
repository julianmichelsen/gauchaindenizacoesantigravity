import React from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

export const OtherAccidents: React.FC = () => {
  const types = [
    "Trânsito (carro, moto, bicicleta, pedestre)",
    "Trabalho e trajeto casa-trabalho",
    "Acidentes domésticos graves",
    "Acidentes esportivos e lazer",
    "Benefícios INSS (Auxílio-Acidente, Aposentadoria por Invalidez)"
  ];

  return (
    <section className="py-20 bg-brand-gray">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-title font-bold text-brand-blue text-center mb-10">
          Atendemos <span className="text-brand-gold bg-brand-blue px-2 rounded">Todos</span> os Tipos de Acidentes
        </h2>

        <div className="bg-white rounded-2xl shadow-md p-8 md:p-12">
          <ul className="space-y-4 mb-10">
            {types.map((type, idx) => (
              <li key={idx} className="flex items-center gap-4 text-lg md:text-xl text-gray-800 font-medium pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <CheckCircle2 className="text-green-500 shrink-0" size={28} />
                {type}
              </li>
            ))}
          </ul>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg flex gap-4 items-start">
            <AlertTriangle className="text-yellow-600 shrink-0 mt-1" size={28} />
            <div>
              <h4 className="font-bold text-yellow-800 text-lg mb-1">💡 IMPORTANTE:</h4>
              <p className="text-yellow-900 leading-relaxed">
                O DPVAT acabou em 31/12/2024, mas quem sofreu acidente <strong>até 14/11/2023 ainda pode solicitar!</strong> Não perca esse direito.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
