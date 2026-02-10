import React from 'react';
import { MapPin, Phone, Mail, Clock, Globe, Building } from 'lucide-react';
import { CONTACT_INFO } from '../../constants';

export const Location: React.FC = () => {
  return (
    <section className="py-20 bg-brand-gray">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-title font-bold text-brand-blue text-center mb-16">
          Atendimento Online em Todo RS ou Presencial em Porto Alegre
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          
          {/* MAP */}
          <div className="h-[400px] lg:h-auto w-full bg-gray-200 relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.9458994793836!2d-51.22941072350722!3d-30.038379274925766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x951979062de3c467%3A0xc4a3cb7afc4ddb36!2sAv.%20Ot%C3%A1vio%20Rocha%2C%20115%20-%20Centro%20Hist%C3%B3rico%2C%20Porto%20Alegre%20-%20RS%2C%2090020-090!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
              title="Localização Gaúcha Indenizações"
            ></iframe>
          </div>

          {/* INFO */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-brand-blue mb-8 border-b border-gray-200 pb-4">Informações de Contato</h3>
            
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="text-brand-gold shrink-0 mt-1" size={24} />
                <div>
                  <p className="font-bold text-gray-900">Endereço Presencial</p>
                  <p className="text-gray-600">{CONTACT_INFO.address}</p>
                </div>
              </li>
              
              <li className="flex items-start gap-4">
                <Phone className="text-brand-gold shrink-0 mt-1" size={24} />
                <div>
                  <p className="font-bold text-gray-900">Telefone / WhatsApp</p>
                  <p className="text-gray-600">{CONTACT_INFO.phone}</p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <Mail className="text-brand-gold shrink-0 mt-1" size={24} />
                <div>
                  <p className="font-bold text-gray-900">E-mail</p>
                  <p className="text-gray-600">{CONTACT_INFO.email}</p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <Clock className="text-brand-gold shrink-0 mt-1" size={24} />
                <div>
                  <p className="font-bold text-gray-900">Horário de Atendimento</p>
                  <p className="text-gray-600">Segunda a Sexta: 9h-12h | 13h-17h</p>
                  <p className="text-green-600 font-medium text-sm mt-1">⚡ Resposta no WhatsApp em até 5 minutos</p>
                </div>
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-brand-gray p-4 rounded-lg flex items-center gap-3">
                <Globe className="text-brand-blue" size={20} />
                <span className="text-sm font-bold text-gray-800">Atendimento Online:<br/><span className="font-normal">Todo o RS</span></span>
              </div>
              <div className="bg-brand-gray p-4 rounded-lg flex items-center gap-3">
                <Building className="text-brand-blue" size={20} />
                <span className="text-sm font-bold text-gray-800">Presencial:<br/><span className="font-normal">POA e Região</span></span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
