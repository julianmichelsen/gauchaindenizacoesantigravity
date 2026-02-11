import { useContent } from '../../context/ContentContext';
import { Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const { content } = useContent();
  const evaluationImages = content.testimonials || [];

  return (
    <section id="depoimentos" className="py-16 sm:py-20 bg-brand-gray">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">Prova Social</span>
          <h2 className="text-3xl sm:text-4xl font-title font-bold text-brand-blue mb-4">
            Veja O Que Nossos Clientes Dizem
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">Histórias reais de pessoas que recuperaram seus direitos com a nossa ajuda.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
          {evaluationImages.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-3 sm:p-4 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100/80 transform hover:scale-[1.01] transition-all duration-300 group">
              <img
                src={testimonial.imageUrl}
                alt={`Depoimento`}
                className="w-full h-auto rounded-xl object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-white px-6 py-3.5 rounded-full border border-gray-200 shadow-sm">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="text-yellow-400 fill-yellow-400" size={18} />
              ))}
            </div>
            <span className="font-bold text-brand-blue text-sm sm:text-base">4.9/5 estrelas no Google</span>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            * Avaliações reais e verificadas de clientes atendidos no RS.
          </p>
        </div>
      </div>
    </section>
  );
};
