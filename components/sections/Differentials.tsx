import React from 'react';
import { Shield, Target, Layers, Wallet, Clock, Trophy, Car, MapPin, HeartHandshake } from 'lucide-react';

const differentials = [
  { icon: <Shield size={28} />, title: "TRANSPARÊNCIA TOTAL", text: "Sem letra miúda. Você recebe o valor integral primeiro, repassa nossa parte depois." },
  { icon: <Target size={28} />, title: "ANÁLISE HONESTA", text: "99,9% de sucesso porque só aceitamos casos que temos certeza absoluta de ganhar." },
  { icon: <Layers size={28} />, title: "MÚLTIPLOS SEGUROS", text: "Descobrimos TODOS os seguros que você tem direito - banco, empresa, apps, INSS." },
  { icon: <Wallet size={28} />, title: "ZERO CUSTO ANTECIPADO", text: "Consulta e análise 100% gratuitas. Só cobramos honorários se você ganhar a causa." },
  { icon: <Clock size={28} />, title: "RESPOSTA EM 5 MINUTOS", text: "Sem deixar você no vácuo. Atendimento ágil e prestativo no horário comercial." },
  { icon: <Trophy size={28} />, title: "12 ANOS DE EXPERIÊNCIA", text: "Desde 2014 ajudando exclusivamente vítimas de acidentes no Rio Grande do Sul." },
  { icon: <Car size={28} />, title: "ESPECIALISTAS EM APPS", text: "Maior volume de casos: Uber, 99, iFood, Rappi. Conhecemos todas as coberturas." },
  { icon: <MapPin size={28} />, title: "ATENDIMENTO GAÚCHO", text: "Escritório no Centro Histórico de Porto Alegre, e atendimento online em todo RS." },
  { icon: <HeartHandshake size={28} />, title: "SEM JURIDIQUÊS", text: "Explicamos tudo de forma simples e direta. Você entende cada etapa do seu processo." },
];

export const Differentials: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-brand-blue text-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block bg-brand-gold/20 text-brand-gold text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">Nossos Diferenciais</span>
          <h2 className="text-3xl sm:text-4xl font-title font-bold">
            Por Que Mais de <span className="text-brand-gold">700 Gaúchos</span> Confiaram em Nós?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {differentials.map((item, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 group">
              <div className="text-brand-gold mb-5 bg-brand-gold/10 inline-block p-3.5 rounded-xl group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};