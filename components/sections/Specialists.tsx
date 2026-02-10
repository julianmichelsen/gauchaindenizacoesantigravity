import React from 'react';
import { Car, Bike, Users } from 'lucide-react';
import { generateWhatsAppLink } from '../../constants';

export const Specialists: React.FC = () => {
  return (
    <section className="py-20 bg-brand-blue text-white relative">
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-title font-bold text-brand-gold mb-6">
            Especialistas em Acidentes com Uber, 99, iFood e Rappi
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Esse é o tipo de caso que MAIS atendemos.<br/><br/>
            Plataformas de transporte e delivery possuem seguro que cobre motoristas, entregadores E passageiros durante a viagem ou entrega. O problema? Pouca gente sabe disso.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Card 1 */}
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 text-center hover:-translate-y-2 transition-transform">
            <div className="bg-brand-gold w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Car className="text-brand-blue" size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-4">MOTORISTAS</h3>
            <p className="text-brand-gold font-medium mb-2">Uber, 99 Táxi, 99 Moto</p>
            <p className="text-gray-300">Cobertura total durante corridas ativas para você e seu veículo.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 text-center hover:-translate-y-2 transition-transform">
            <div className="bg-brand-gold w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Bike className="text-brand-blue" size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-4">ENTREGADORES</h3>
            <p className="text-brand-gold font-medium mb-2">iFood, Rappi, Zé Delivery</p>
            <p className="text-gray-300">Cobertura protegida durante todo o processo de coleta e entrega.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 text-center hover:-translate-y-2 transition-transform">
            <div className="bg-brand-gold w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Users className="text-brand-blue" size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-4">PASSAGEIROS</h3>
            <p className="text-brand-gold font-medium mb-2">Uber, 99</p>
            <p className="text-gray-300">Você também está totalmente coberto em caso de acidente durante a viagem.</p>
          </div>
        </div>

        <div className="text-center">
          <a 
            href={generateWhatsAppLink("Olá! Trabalho com App (ou era passageiro) e sofri um acidente. Quero saber meus direitos.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-brand-gold text-brand-blue font-bold text-lg sm:text-xl py-4 px-8 rounded-lg shadow-[0_0_20px_rgba(241,214,160,0.4)] hover:shadow-[0_0_30px_rgba(241,214,160,0.6)] hover:bg-yellow-400 transition-all min-h-[44px]"
          >
            Trabalho com App e Sofri Acidente - Quero Saber Meus Direitos ⚡
          </a>
        </div>
      </div>
    </section>
  );
};