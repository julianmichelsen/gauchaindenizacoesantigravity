import React from 'react';
import { Star } from 'lucide-react';

const reviews = [
  {
    initials: "M.S.",
    role: "Entregador iFood, Porto Alegre",
    text: "Eu nem sabia que tinha direito a indenização do iFood. A Gaúcha descobriu 3 seguros diferentes que eu tinha! Recebi mais de R$ 80 mil."
  },
  {
    initials: "J.L.",
    role: "Motorista Uber, Canoas",
    text: "Atendimento rápido e sem enrolação. Eles explicaram tudo de forma clara e cuidaram de toda burocracia. Recomendo fortemente!"
  },
  {
    initials: "R.F.",
    role: "Cliente, Porto Alegre",
    text: "Depois de um acidente de moto, pensei que não tinha direito a nada porque não tinha DPVAT. A Gaúcha me mostrou que eu tinha seguro do banco que nem lembrava!"
  },
  {
    initials: "Guilherme J.",
    role: "Avaliação Google",
    text: "Experiência boa, menos de 2 mês já tava com a indenização em mãos."
  },
  {
    initials: "Bruno G.",
    role: "Avaliação Google",
    text: "Índico, pessoal especializado na área que atua, atendimento muito profissional."
  },
  {
    initials: "Ricardo F.",
    role: "Avaliação Google",
    text: "Atendimento top, Super recomendo, e muito rápido a conclusão do processo."
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-brand-gray">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-title font-bold text-brand-blue mb-4">
            Veja O Que Nossos Clientes Dizem
          </h2>
          <p className="text-xl text-gray-600">Histórias reais de pessoas que recuperaram seus direitos com a nossa ajuda.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-yellow-400" size={20} />
                ))}
              </div>
              <p className="text-gray-700 text-lg mb-8 flex-grow italic">"{review.text}"</p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 bg-brand-blue text-brand-gold rounded-full flex items-center justify-center font-bold text-lg">
                  {review.initials.substring(0,2).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{review.initials}</h4>
                  <p className="text-sm text-gray-500">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Placeholder for actual screenshot uploads if needed in the future */}
        <div className="mt-12 text-center text-sm text-gray-500">
          * Avaliações reais retiradas do nosso perfil no Google Meu Negócio.
        </div>
      </div>
    </section>
  );
};
