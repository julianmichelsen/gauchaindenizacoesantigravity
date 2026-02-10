import React, { createContext, useState, useContext, ReactNode } from 'react';

// Estrutura do nosso conteúdo editável
export interface AppContent {
  heroHeadline: string;
  heroSubheadline: string;
  videoUrl: string;
  thainaImage: string;
  marlonImage: string;
  aboutText1: string;
  aboutText2: string;
}

// Conteúdo padrão inicial (o que já estava no código)
const defaultContent: AppContent = {
  heroHeadline: "Você Trabalha ou Usa Uber, 99, iFood? Sofreu um Acidente nos Últimos 12 Meses?",
  heroSubheadline: "Você Pode Ter Direito a Até R$ 100 Mil",
  // Usando um vídeo de teste oficial aberto e garantido que funciona (Big Buck Bunny)
  videoUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
  thainaImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
  marlonImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
  aboutText1: "Iniciamos a Gaúcha Indenizações em 2014 com um propósito claro: oferecer um atendimento humanizado, ágil e transparente para quem mais precisa.",
  aboutText2: "Unimos nossa vivência profissional e pessoal para garantir que cada cliente seja tratado com respeito, proximidade e acompanhamento direto."
};

interface ContentContextType {
  content: AppContent;
  updateContent: (newContent: Partial<AppContent>) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<AppContent>(defaultContent);

  const updateContent = (newContent: Partial<AppContent>) => {
    setContent(prev => ({ ...prev, ...newContent }));
    // No futuro, aqui chamaremos a API do Supabase para salvar no banco de dados!
  };

  return (
    <ContentContext.Provider value={{ content, updateContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
};
