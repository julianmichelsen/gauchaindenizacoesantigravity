import React from 'react';
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#030a1a] text-gray-300 py-16 border-t border-white/10">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 mb-12">
          
          {/* Col 1: About */}
          <div>
            <h3 className="text-brand-gold font-title font-bold text-2xl mb-4 tracking-wider">GAÚCHA<br/><span className="text-sm font-normal tracking-[0.2em] text-white">INDENIZAÇÕES</span></h3>
            <p className="leading-relaxed text-sm">
              Há 12 anos garantindo direitos de vítimas de acidentes no Rio Grande do Sul com transparência, agilidade e atendimento humanizado.
            </p>
          </div>

          {/* Col 2: Contact */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4 uppercase tracking-wider">Contato</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-brand-gold shrink-0 mt-0.5" size={18} />
                <span>{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-brand-gold shrink-0" size={18} />
                <span>{CONTACT_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-brand-gold shrink-0" size={18} />
                <span>{CONTACT_INFO.email}</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Social */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4 uppercase tracking-wider">Redes Sociais</h4>
            <div className="flex gap-4">
              <a href={CONTACT_INFO.instagram} target="_blank" rel="noopener noreferrer" className="bg-white/5 p-3 rounded-full hover:bg-brand-gold hover:text-brand-blue transition-colors">
                <Instagram size={24} />
              </a>
              <a href={CONTACT_INFO.facebook} target="_blank" rel="noopener noreferrer" className="bg-white/5 p-3 rounded-full hover:bg-brand-gold hover:text-brand-blue transition-colors">
                <Facebook size={24} />
              </a>
              <a href={CONTACT_INFO.youtube} target="_blank" rel="noopener noreferrer" className="bg-white/5 p-3 rounded-full hover:bg-brand-gold hover:text-brand-blue transition-colors">
                <Youtube size={24} />
              </a>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 text-center text-xs text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {currentYear > 2026 ? currentYear : 2026} Gaúcha Indenizações | CNPJ: 36.142.449/0001-31 | Todos os direitos reservados</p>
          <p className="flex items-center gap-2">
            Desenvolvido com foco em alta conversão 
            <span className="text-gray-700">|</span>
            <Link to="/admin" className="text-gray-700 hover:text-brand-gold transition-colors">Admin</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};
