import React, { useState } from 'react';
import { generateWhatsAppLink } from '../constants';

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
    <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl flex flex-col gap-4 w-full max-w-md mx-auto relative z-10 border border-gray-100">
      <h3 className="text-xl font-title text-brand-blue font-bold text-center mb-2">
        Descubra Seus Direitos Agora - Consulta Gratuita
      </h3>
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome completo</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-colors"
          placeholder="Seu nome"
        />
      </div>

      <div>
        <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">WhatsApp (com DDD)</label>
        <input 
          type="tel" 
          id="whatsapp" 
          name="whatsapp" 
          required
          value={formData.whatsapp}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-colors"
          placeholder="(00) 00000-0000"
        />
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Tipo de acidente</label>
        <select 
          id="type" 
          name="type" 
          required
          value={formData.type}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-colors bg-white"
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
        <label htmlFor="when" className="block text-sm font-medium text-gray-700 mb-1">Quando aconteceu?</label>
        <select 
          id="when" 
          name="when" 
          required
          value={formData.when}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-colors bg-white"
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
        className="w-full bg-brand-gold text-brand-blue font-bold py-4 px-6 rounded-lg shadow-md hover:bg-yellow-500 hover:shadow-lg transition-all min-h-[44px] mt-2 text-lg"
      >
        {buttonText}
      </button>

      <a 
        href={generateWhatsAppLink("Olá! Gostaria de falar direto pelo WhatsApp para uma análise rápida.")}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-[#25D366] text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg transition-all flex items-center justify-center gap-2 min-h-[44px] text-center text-sm sm:text-base"
      >
        💬 Falar Direto pelo WhatsApp
      </a>
      <p className="text-xs text-center text-gray-500 mt-1">Resposta em 5min no horário comercial</p>
    </form>
  );
};
