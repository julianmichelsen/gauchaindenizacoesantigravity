import * as React from 'react';
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
    <section id="processo" className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">Passo a Passo</span>
          <h2 className="text-3xl sm:text-4xl font-title font-bold text-brand-blue mb-4">
            Como Funciona? Simples, Rápido e Sem Burocracia
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">Um processo transparente onde você não tira dinheiro do bolso.</p>
        </div>

        <div className="relative border-l-4 border-brand-gold/30 ml-6 sm:ml-8 pl-8 sm:pl-12 space-y-10 sm:space-y-12">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline dot/icon */}
              <div className="absolute -left-[46px] sm:-left-[54px] md:-left-[62px] bg-brand-blue text-brand-gold w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border-4 border-white shadow-lg group-hover:scale-110 transition-transform">
                {step.icon}
              </div>

              <div className="bg-brand-gray p-5 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-brand-blue mb-2">{step.title}</h3>
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
