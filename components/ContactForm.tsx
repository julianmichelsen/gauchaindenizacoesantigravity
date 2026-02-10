import React, { useState } from 'react';
import { generateWhatsAppLink } from '../constants';
import { ShieldCheck, Lock } from 'lucide-react';

interface ContactFormProps {
  buttonText?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ buttonText = "DESCOBRIR MEUS DIREITOS AGORA ⚡" }) => {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    type: '',
    when: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Olá! Gostaria de descobrir meus direitos.\n\n*Nome:* ${formData.name}\n*Tipo de Acidente:* ${formData.type}\n*Quando ocorreu:* ${formData.when}`;
    window.open(generateWhatsAppLink(message), '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl flex flex-col gap-5 w-full max-w-md mx-auto relative z-10 border border-gray-100">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 border border-green-200">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Consulta Gratuita
        </div>
        <h3 className="text-xl sm:text-2xl font-title text-brand-blue font-bold leading-tight">
          Descubra Seus Direitos Agora
        </h3>
        <p className="text-sm text-gray-500 mt-1">Preencha o formulário para uma análise rápida e gratuita.</p>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">Nome completo</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all bg-gray-50 hover:bg-white text-gray-900"
          placeholder="Seu nome"
        />
      </div>

      <div>
        <label htmlFor="whatsapp" className="block text-sm font-semibold text-gray-700 mb-1.5">WhatsApp (com DDD)</label>
        <input
          type="tel"
          id="whatsapp"
          name="whatsapp"
          required
          value={formData.whatsapp}
          onChange={handleChange}
          className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all bg-gray-50 hover:bg-white text-gray-900"
          placeholder="(00) 00000-0000"
        />
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-1.5">Tipo de acidente</label>
        <select
          id="type"
          name="type"
          required
          value={formData.type}
          onChange={handleChange}
          className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all bg-gray-50 hover:bg-white appearance-none text-gray-900"
        >
          <option value="" disabled>Selecione uma opção</option>
          <option value="Uber/99">Uber / 99</option>
          <option value="iFood/Rappi">iFood / Rappi</option>
          <option value="Trânsito Geral">Trânsito (Geral)</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Outro">Outro</option>
        </select>
      </div>

      <div>
        <label htmlFor="when" className="block text-sm font-semibold text-gray-700 mb-1.5">Quando aconteceu?</label>
        <select
          id="when"
          name="when"
          required
          value={formData.when}
          onChange={handleChange}
          className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all bg-gray-50 hover:bg-white appearance-none text-gray-900"
        >
          <option value="" disabled>Selecione uma opção</option>
          <option value="Últimos 3 meses">Últimos 3 meses</option>
          <option value="3-6 meses">3 a 6 meses</option>
          <option value="6-12 meses">6 a 12 meses</option>
          <option value="Mais de 1 ano">Mais de 1 ano</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-brand-gold text-brand-blue font-bold py-4 px-6 rounded-xl shadow-md hover:bg-yellow-400 hover:shadow-lg hover:-translate-y-0.5 transition-all min-h-[52px] mt-1 text-base sm:text-lg"
      >
        {buttonText}
      </button>

      <a
        href={generateWhatsAppLink("Olá! Gostaria de falar direto pelo WhatsApp para uma análise rápida.")}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-[#25D366] text-white font-bold py-3.5 px-6 rounded-xl shadow-md hover:bg-green-600 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 min-h-[48px] text-center text-sm sm:text-base"
      >
        💬 Falar Direto pelo WhatsApp
      </a>

      {/* Trust micro-badges */}
      <div className="flex items-center justify-center gap-4 text-xs text-gray-400 pt-1">
        <span className="flex items-center gap-1"><Lock size={12} /> Dados seguros</span>
        <span className="flex items-center gap-1"><ShieldCheck size={12} /> 100% gratuito</span>
      </div>
    </form>
  );
};
