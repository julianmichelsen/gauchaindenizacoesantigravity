import React from 'react';
import { Calendar, TrendingUp, Scale, Users } from 'lucide-react';

const stats = [
  { icon: <Calendar size={40} />, value: "12 ANOS", label: "De experiência no RS" },
  { icon: <TrendingUp size={40} />, value: "99,9%", label: "Taxa de sucesso" },
  { icon: <Scale size={40} />, value: "1.500+", label: "Processos conduzidos" },
  { icon: <Users size={40} />, value: "700+", label: "Clientes em todo RS" },
];

export const Stats: React.FC = () => {
  return (
    <section className="bg-brand-gray py-12 border-b border-gray-200">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-brand-blue mb-4 bg-blue-50 p-4 rounded-full">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-title font-bold text-gray-900 mb-2">{stat.value}</h3>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
