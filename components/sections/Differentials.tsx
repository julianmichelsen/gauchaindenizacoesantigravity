import React from 'react';
import { Shield, Target, Layers, Wallet, Clock, Trophy, Car, MapPin, HeartHandshake } from 'lucide-react';

const differentials = [
  { icon: <Shield size={32} />, title: "TRANSPARÊNCIA TOTAL", text: "Sem letra miúda. Você recebe o valor integral primeiro, repassa nossa parte depois." },
  { icon: <Target size={32} />, title: "ANÁLISE HONESTA", text: "99,9% de sucesso porque só aceitamos casos que temos certeza absoluta de ganhar." },
  { icon: <Layers size={32} />, title: "MÚLTIPLOS SEGUROS", text: "Descobrimos TODOS os seguros que você tem direito - banco, empresa, apps, INSS." },
  { icon: <Wallet size={32} />, title: "ZERO CUSTO ANTECIPADO", text: "Consulta e análise 100% gratuitas. Só cobramos honorários se você ganhar a causa." },
  { icon: <Clock size={32} />, title: "RESPOSTA EM 5 MINUTOS", text: "Sem deixar você no vácuo. Atendimento ágil e prestativo no horário comercial." },
  { icon: <Trophy size={32} />, title: "12 ANOS DE EXPERIÊNCIA", text: "Desde 2014 ajudando exclusivamente vítimas de acidentes no Rio Grande do Sul." },
  { icon: <Car size={32} />, title: "ESPECIALISTAS EM APPS", text: "Maior volume de casos: Uber, 99, iFood, Rappi. Conhecemos todas as coberturas." },
  { icon: <MapPin size={32} />, title: "ATENDIMENTO GAÚCHO", text: "Escritório no Centro Histórico de Porto Alegre, e atendimento online em todo RS." },
  { icon: <HeartHandshake size={32} />, title: "SEM JURIDIQUÊS", text: "Explicamos tudo de forma simples e direta. Você entende cada etapa do seu processo." },
];

export const Differentials: React.FC = () => {
  return (
    <section className="py-20 bg-brand-blue text-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-title font-bold text-center mb-16">
          Por Que Mais de <span className="text-brand-gold">700 Gaúchos</span> Confiaram em Nós?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentials.map((item, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors">
              <div className="text-brand-gold mb-6 bg-brand-gold/10 inline-block p-4 rounded-xl">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-300 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};