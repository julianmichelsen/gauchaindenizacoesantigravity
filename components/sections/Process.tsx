import React from 'react';
import { MessageSquareText, FileSearch, Search, FileText, BadgeDollarSign } from 'lucide-react';

const steps = [
  {
    icon: <MessageSquareText size={24} />,
    title: "1. FALE CONOSCO",
    desc: "Resposta em até 5 minutos no horário comercial. Atendimento humanizado via WhatsApp."
  },
  {
    icon: <FileSearch size={24} />,
    title: "2. ANÁLISE GRATUITA E RIGOROSA",
    desc: "Avaliamos seu caso sem custo. Só aceitamos processos que temos certeza de ganhar (99,9% de sucesso)."
  },
  {
    icon: <Search size={24} />,
    title: "3. DESCOBRIMOS TODOS OS SEGUROS",
    desc: "Investigamos apólices ocultas: banco, empresa, plataformas de app e INSS que você nem sabia que tinha."
  },
  {
    icon: <FileText size={24} />,
    title: "4. CUIDAMOS DE TODA A BUROCRACIA",
    desc: "Documentação, laudos médicos, aberturas de sinistro - nós resolvemos tudo. Você só precisa assinar."
  },
  {
    icon: <BadgeDollarSign size={24} />,
    title: "5. VOCÊ RECEBE PRIMEIRO",
    desc: "A seguradora paga o valor integral direto na SUA conta. Somente depois você repassa os nossos honorários."
  }
];

export const Process: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-title font-bold text-brand-blue mb-4">
            Como Funciona? Simples, Rápido e Sem Burocracia
          </h2>
          <p className="text-xl text-gray-600">Um processo transparente onde você não tira dinheiro do bolso.</p>
        </div>

        <div className="relative border-l-4 border-brand-gold/30 ml-4 md:ml-8 pl-8 md:pl-12 space-y-12">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              {/* Timeline dot/icon */}
              <div className="absolute -left-[54px] md:-left-[70px] bg-brand-blue text-brand-gold w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                {step.icon}
              </div>
              
              <div className="bg-brand-gray p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl md:text-2xl font-bold text-brand-blue mb-2">{step.title}</h3>
                <p className="text-gray-700 text-lg leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
