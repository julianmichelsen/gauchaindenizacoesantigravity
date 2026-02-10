import React from 'react';
import { Calendar, TrendingUp, Scale, Users } from 'lucide-react';

const stats = [
  { icon: <Calendar size={36} />, value: "12 ANOS", label: "De experiência no RS" },
  { icon: <TrendingUp size={36} />, value: "99,9%", label: "Taxa de sucesso" },
  { icon: <Scale size={36} />, value: "1.500+", label: "Processos conduzidos" },
  { icon: <Users size={36} />, value: "700+", label: "Clientes em todo RS" },
];

export const Stats: React.FC = () => {
  return (
    <section className="bg-brand-gray py-10 sm:py-12 border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-4 sm:p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
              <div className="text-brand-blue mb-3 bg-blue-50 p-3 sm:p-4 rounded-full">
                {stat.icon}
              </div>
              <h3 className="text-2xl sm:text-3xl font-title font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 font-medium text-xs sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
