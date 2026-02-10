import React from 'react';
import { useContent } from '../../context/ContentContext';

// Função aprimorada para extrair o ID e gerar o embed
const getSafeEmbedUrl = (url: string) => {
  if (!url) return '';
  const trimmedUrl = url.trim();

  // Se já for um link de embed válido, retorna ele mesmo
  if (trimmedUrl.includes('youtube.com/embed/') || trimmedUrl.includes('youtube-nocookie.com/embed/')) {
    return trimmedUrl;
  }

  // Regex abrangente para pegar o ID de praticamente qualquer formato de link do YouTube
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = trimmedUrl.match(regExp);

  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }

  return trimmedUrl; // Retorna original se falhar
};

export const VideoAbout: React.FC = () => {
  const { content } = useContent();

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">

        {/* VÍDEO SECTION */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">Quem Somos</span>
          <h2 className="text-3xl sm:text-4xl font-title font-bold text-brand-blue mb-8 sm:mb-10">
            Conheça Quem Está do Seu Lado
          </h2>

          <div className="relative w-full overflow-hidden rounded-2xl shadow-xl aspect-video bg-gray-200 mb-6 sm:mb-8 border-4 border-brand-gray">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={getSafeEmbedUrl(content.videoUrl)}
              title="Apresentação Gaúcha Indenizações"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen>
            </iframe>
          </div>

          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto italic font-medium leading-relaxed">
            "Somos Thainá e Marlon, sócios na vida e nos negócios, com mais de 10 anos de experiência no ramo de indenizações. Nossa missão: transformar a dor da burocracia em solução real para vítimas de acidentes. Aqui, cada cliente é tratado com respeito, proximidade e acompanhamento direto com um de nós."
          </p>
        </div>

        {/* PROPRIETÁRIOS SECTION */}
        <div className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-gray-200">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-title font-bold text-brand-blue text-center mb-10 sm:mb-12">
            Thainá e Marlon - Mais de 10 Anos Lutando Pelos Seus Direitos
          </h2>

          <div className="flex justify-center mb-10 sm:mb-12">
            <div className="rounded-2xl overflow-hidden shadow-lg aspect-auto bg-gray-100 relative max-w-2xl border-4 border-white w-full">
              <img
                src={content.partnersTogetherImage}
                alt="Thainá e Marlon - Gaúcha Indenizações"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-brand-blue to-transparent p-4 sm:p-6 pt-16 sm:pt-20">
                <h3 className="text-white font-bold text-xl sm:text-2xl">Thainá e Marlon</h3>
                <p className="text-brand-gold text-sm sm:text-base">Sócios Fundadores - Especialistas em Indenizações</p>
              </div>
            </div>
          </div>

          <div className="bg-brand-gray p-6 sm:p-8 md:p-12 rounded-2xl text-center">
            <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed mb-5 sm:mb-6">
              {content.aboutText1}
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed mb-5 sm:mb-6">
              {content.aboutText2}
            </p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-brand-blue">
              🤝 Estamos aqui para que sua indenização seja uma conquista, e não uma preocupação.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
