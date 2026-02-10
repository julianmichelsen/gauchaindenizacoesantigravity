import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    q: "Seguro só paga se eu morrer?",
    a: "❌ Não! Invalidez parcial (até mesmo uma fratura simples) já pode gerar direito a indenização considerável."
  },
  {
    q: "Só tenho DPVAT?",
    a: "Provavelmente não. A maioria das pessoas tem seguros que nem sabe: seguro de vida do banco, seguro de grupo da empresa, seguro da plataforma de app. Nós investigamos e descobrimos TODOS."
  },
  {
    q: "Já faz mais de 1 ano do acidente. Perdi o prazo?",
    a: "Depende. Para responsabilidade civil (contra quem causou), você tem até 3 anos. Para seguro de vida, até 1 ano APÓS o fim do tratamento médico (alta). Consulte-nos gratuitamente para avaliar seu caso."
  },
  {
    q: "Quanto custa a consultoria?",
    a: "A consulta e análise são 100% gratuitas. Só cobramos honorários se você ganhar, e você recebe o valor integral primeiro na sua conta antes de nos repassar a nossa parte."
  },
  {
    q: "Quanto tempo demora para receber?",
    a: "Varia de 3 meses a 2 anos dependendo da complexidade do caso e da seguradora. Mantemos você informado de forma proativa em cada etapa do processo."
  },
  {
    q: "Preciso ir até o escritório?",
    a: "Não! Atendemos de forma 100% online em todo o Rio Grande do Sul. Mas se preferir um café, nosso escritório físico fica no Centro Histórico de Porto Alegre."
  },
  {
    q: "Trabalho com Uber/99. Tenho direito mesmo?",
    a: "SIM! Motoristas, entregadores E passageiros têm cobertura garantida pelas plataformas durante viagens e entregas ativas."
  },
  {
    q: "Meu acidente foi 'leve'. Não vale a pena?",
    a: "Não subestime! Até fraturas simples (como um dedo ou punho) podem gerar indenizações significativas. A única forma de saber o valor exato é fazendo uma análise gratuita conosco."
  },
  {
    q: "A seguradora já negou meu pedido. E agora?",
    a: "Você tem o direito de saber o motivo da negativa por escrito e pode solicitar reanálise com documentação complementar, ou via judicial. Nós somos especialistas em reverter negativas. Podemos ajudar!"
  },
  {
    q: "O que acontece se o DPVAT acabou?",
    a: "Quem sofreu acidente até 14/11/2023 ainda pode solicitar o DPVAT antigo. Além disso, mesmo sem DPVAT, existem outros seguros (vida, apps, empresa) que continuam ativos e pagam muito mais."
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-title font-bold text-brand-blue text-center mb-12">
          Dúvidas Frequentes
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'shadow-md border-brand-blue/30 ring-1 ring-brand-blue/30' : 'hover:border-gray-300'}`}
            >
              <button
                className="w-full px-6 py-5 text-left flex justify-between items-center bg-white focus:outline-none"
                onClick={() => toggle(index)}
                aria-expanded={openIndex === index}
              >
                <span className="font-bold text-lg text-brand-blue pr-8">{faq.q}</span>
                {openIndex === index ? (
                  <ChevronUp className="text-brand-gold shrink-0" size={24} />
                ) : (
                  <ChevronDown className="text-gray-400 shrink-0" size={24} />
                )}
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out bg-brand-gray/50 ${openIndex === index ? 'max-h-96 py-5 opacity-100' : 'max-h-0 py-0 opacity-0'}`}
              >
                <p className="text-gray-700 leading-relaxed text-lg">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
