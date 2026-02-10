import React from 'react';
import { XCircle, CheckCircle } from 'lucide-react';

const myths = [
  {
    myth: "Seguro só paga se eu morrer",
    truth: "Invalidez parcial (até fratura!) já gera direito a indenização."
  },
  {
    myth: "Só tenho DPVAT",
    truth: "Você pode ter seguros do banco, da empresa e dos apps ativos."
  },
  {
    myth: "Só cobre se for culpa do outro",
    truth: "Seus próprios seguros cobrem o acidente mesmo sem culpa!"
  },
  {
    myth: "Já faz tempo, perdi o prazo",
    truth: "Você pode ter até 3 anos ou mais para solicitar - depende do caso."
  }
];

export const Myths: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-title font-bold text-brand-blue mb-6">
            A Maioria das Pessoas <span className="text-red-600 underline decoration-red-200">NÃO Sabe</span> Que Tem Direito a Indenização
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Todos os dias atendemos pessoas que dizem a mesma coisa: <span className="italic font-medium">"Eu nem sabia que tinha direito."</span> Veja os mitos que impedem você de receber o que é seu:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myths.map((item, idx) => (
            <div key={idx} className="bg-brand-gray p-6 sm:p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-brand-blue transition-all group-hover:w-2"></div>
              
              <div className="flex items-start gap-4 mb-4">
                <XCircle className="text-red-500 shrink-0 mt-1" size={28} />
                <p className="text-lg font-bold text-gray-800 line-through decoration-red-300 opacity-80">"{item.myth}"</p>
              </div>
              
              <div className="flex items-start gap-4">
                <CheckCircle className="text-green-600 shrink-0 mt-1" size={28} />
                <p className="text-lg font-bold text-brand-blue">{item.truth}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
