import * as React from 'react';
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Estrutura do nosso conteúdo editável
export interface AppContent {
  heroHeadline: string;
  heroSubheadline: string;
  videoUrl: string;
  partnersTogetherImage: string;
  aboutText1: string;
  aboutText2: string;
  // Tracking & Analytics
  facebookPixelId: string;
  googleAnalyticsId: string;
}

// Conteúdo padrão inicial (o que já estava no código)
const defaultContent: AppContent = {
  heroHeadline: "Você Trabalha ou Usa Uber, 99, iFood? Sofreu um Acidente nos Últimos 12 Meses?",
  heroSubheadline: "Você Pode Ter Direito a Até R$ 100 Mil",
  videoUrl: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
  partnersTogetherImage: "/Imagens/socios-juntos.JPG",
  aboutText1: "Iniciamos a Gaúcha Indenizações em 2014 com um propósito claro: oferecer um atendimento humanizado, ágil e transparente para quem mais precisa.",
  aboutText2: "Unimos nossa vivência profissional e pessoal para garantir que cada cliente seja tratado com respeito, proximidade e acompanhamento direto.",
  facebookPixelId: "1426646388899981",
  googleAnalyticsId: "",
};

interface ContentContextType {
  content: AppContent;
  updateContent: (newContent: Partial<AppContent>) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<AppContent>(() => {
    const savedContent = localStorage.getItem('app_content');
    if (savedContent) {
      // Merge saved content with defaults to ensure new fields exist
      return { ...defaultContent, ...JSON.parse(savedContent) };
    }
    return defaultContent;
  });

  const updateContent = (newContent: Partial<AppContent>) => {
    setContent(prev => {
      const updated = { ...prev, ...newContent };
      localStorage.setItem('app_content', JSON.stringify(updated));
      return updated;
    });
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
