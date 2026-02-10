
import * as React from 'react';
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// Estrutura do nosso conteúdo editável
export interface AppContent {
  id?: number; // Added for database reference (singleton row)
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
  heroHeadline: "Você Trabalha ou Usa\nUber, 99, iFood?\nSofreu um Acidente\nnos Últimos 12 Meses?",
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
  isLoading: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<AppContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch content from Supabase on mount
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data, error } = await supabase
          .from('site_content')
          .select('*')
          .limit(1)
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            // NO DATA FOUND - This is expected on first run.
            // We will try to seed usage of default content.
            console.log('No content found in Supabase. Using defaults.');
          } else {
            console.error('Error fetching content:', error);
          }
        } else if (data) {
          // Merge with defaults to ensure all fields exist
          setContent({ ...defaultContent, ...data });
        }
      } catch (err) {
        console.error('Unexpected error fetching content:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  const updateContent = async (newContent: Partial<AppContent>) => {
    // 1. Optimistic UI Update (update local state immediately)
    setContent(prev => ({ ...prev, ...newContent }));

    try {
      // 2. Persist to Supabase
      // We upsert using a fixed ID of 1 to ensure a singleton row pattern
      const mergedContent = { ...content, ...newContent };
      const { error } = await supabase
        .from('site_content')
        .upsert({
          id: 1,
          ...mergedContent
        })
        .select();

      if (error) {
        console.error('Error saving to Supabase:', error);
        alert('Erro ao salvar no banco de dados. Verifique o console.');
      } else {
        console.log('Saved to Supabase successfully');
      }
    } catch (err) {
      console.error('Unexpected error saving content:', err);
    }
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, isLoading }}>
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
