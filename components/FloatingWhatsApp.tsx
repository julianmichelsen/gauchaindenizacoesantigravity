import React from 'react';
import { MessageCircle } from 'lucide-react';
import { generateWhatsAppLink } from '../constants';

export const FloatingWhatsApp: React.FC = () => {
  const defaultMessage = "Olá! Vim pelo site e gostaria de uma consulta gratuita sobre indenização.";
  const link = generateWhatsAppLink(defaultMessage);

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-green-600 hover:scale-110 transition-transform flex items-center justify-center group"
      aria-label="Falar pelo WhatsApp"
    >
      <MessageCircle size={28} />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out ml-0 group-hover:ml-2 font-bold">
        Fale Conosco
      </span>
    </a>
  );
};
