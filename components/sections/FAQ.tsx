import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

export const FAQ: React.FC = () => {
  const { content } = useContent();
  const faqs = content.faq || [];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <div className="text-center mb-10 sm:mb-12">
          <span className="inline-block bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">Tire Suas Dúvidas</span>
          <h2 className="text-3xl sm:text-4xl font-title font-bold text-brand-blue">
            Dúvidas Frequentes
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border rounded-xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'shadow-md border-brand-blue/20 bg-white ring-1 ring-brand-blue/10' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
            >
              <button
                className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left flex justify-between items-center focus:outline-none gap-4"
                onClick={() => toggle(index)}
                aria-expanded={openIndex === index}
              >
                <span className="font-bold text-base sm:text-lg text-brand-blue leading-snug">{faq.question}</span>
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openIndex === index ? 'bg-brand-blue text-white' : 'bg-gray-100 text-gray-400'}`}>
                  {openIndex === index ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </div>
              </button>

              <div
                className={`px-5 sm:px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 py-4 sm:py-5 opacity-100 border-t border-gray-100' : 'max-h-0 py-0 opacity-0'}`}
              >
                <p className="text-gray-700 leading-relaxed text-base sm:text-lg">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
