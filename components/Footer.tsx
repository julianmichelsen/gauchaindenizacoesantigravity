import * as React from 'react';
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#030a1a] text-gray-300 pt-16 pb-28 sm:pb-20 md:pb-16 border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 lg:gap-12 mb-12">

          {/* Col 1: About */}
          <div>
            <img
              src="/Imagens/Logos/LOGO GAÚCHA INDENIZAÇÕES-7.png"
              alt="Gaúcha Indenizações"
              className="h-14 sm:h-16 mb-5 grayscale brightness-200"
            />
            <p className="leading-relaxed text-sm text-gray-400">
              Há 12 anos garantindo direitos de vítimas de acidentes no Rio Grande do Sul com transparência, agilidade e atendimento humanizado.
            </p>
          </div>

          {/* Col 2: Contact */}
          <div>
            <h4 className="text-white font-bold text-base sm:text-lg mb-5 uppercase tracking-wider">Contato</h4>
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
            <h4 className="text-white font-bold text-base sm:text-lg mb-5 uppercase tracking-wider">Redes Sociais</h4>
            <div className="flex gap-3">
              <a href={CONTACT_INFO.instagram} target="_blank" rel="noopener noreferrer" className="bg-white/5 p-3 rounded-xl hover:bg-brand-gold hover:text-brand-blue transition-all duration-300 hover:scale-110">
                <Instagram size={22} />
              </a>
              <a href={CONTACT_INFO.facebook} target="_blank" rel="noopener noreferrer" className="bg-white/5 p-3 rounded-xl hover:bg-brand-gold hover:text-brand-blue transition-all duration-300 hover:scale-110">
                <Facebook size={22} />
              </a>
              <a href={CONTACT_INFO.youtube} target="_blank" rel="noopener noreferrer" className="bg-white/5 p-3 rounded-xl hover:bg-brand-gold hover:text-brand-blue transition-all duration-300 hover:scale-110">
                <Youtube size={22} />
              </a>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 text-center text-xs text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-3">
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
