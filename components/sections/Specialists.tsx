import * as React from 'react';
import { Car, Bike, Users } from 'lucide-react';
import { generateWhatsAppLink } from '../../constants';

export const Specialists: React.FC = () => {
  return (
    <section id="especialistas" className="py-16 sm:py-20 bg-brand-blue text-white relative">
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block bg-brand-gold/20 text-brand-gold text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">Nosso Foco Principal</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-title font-bold text-brand-gold mb-6">
            Especialistas em Acidentes com Uber, 99, iFood e Rappi
          </h2>
          <p className="text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Esse é o tipo de caso que MAIS atendemos.<br /><br />
            Plataformas de transporte e delivery possuem seguro que cobre motoristas, entregadores E passageiros durante a viagem ou entrega. O problema? Pouca gente sabe disso.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 mb-12">
          {/* Card 1 */}
          <div className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/20 text-center hover:-translate-y-2 transition-all duration-300 group">
            <div className="bg-brand-gold w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform">
              <Car className="text-brand-blue" size={36} />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3">MOTORISTAS</h3>
            <p className="text-brand-gold font-medium mb-2 text-sm sm:text-base">Uber, 99 Táxi, 99 Moto</p>
            <p className="text-gray-300 text-sm sm:text-base">Cobertura total durante corridas ativas para você e seu veículo.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/20 text-center hover:-translate-y-2 transition-all duration-300 group">
            <div className="bg-brand-gold w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform">
              <Bike className="text-brand-blue" size={36} />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3">ENTREGADORES</h3>
            <p className="text-brand-gold font-medium mb-2 text-sm sm:text-base">iFood, Rappi, Zé Delivery</p>
            <p className="text-gray-300 text-sm sm:text-base">Cobertura protegida durante todo o processo de coleta e entrega.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/20 text-center hover:-translate-y-2 transition-all duration-300 group">
            <div className="bg-brand-gold w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform">
              <Users className="text-brand-blue" size={36} />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3">PASSAGEIROS</h3>
            <p className="text-brand-gold font-medium mb-2 text-sm sm:text-base">Uber, 99</p>
            <p className="text-gray-300 text-sm sm:text-base">Você também está totalmente coberto em caso de acidente durante a viagem.</p>
          </div>
        </div>

        <div className="text-center">
          <a
            href={generateWhatsAppLink("Olá! Trabalho com App (ou era passageiro) e sofri um acidente. Quero saber meus direitos.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-brand-gold text-brand-blue font-bold text-base sm:text-lg py-4 px-8 rounded-xl shadow-[0_0_20px_rgba(241,214,160,0.4)] hover:shadow-[0_0_30px_rgba(241,214,160,0.6)] hover:bg-yellow-400 hover:-translate-y-0.5 transition-all min-h-[52px]"
          >
            Trabalho com App e Sofri Acidente - Quero Saber Meus Direitos ⚡
          </a>
        </div>
      </div>
    </section>
  );
};