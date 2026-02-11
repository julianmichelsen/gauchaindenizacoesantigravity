
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
  // Dynamic Content (JSONB in DB)
  testimonials: Testimonial[];
  faq: FAQItem[];
  // Tracking & Analytics
  facebookPixelId: string;
  googleAnalyticsId: string;
}

export interface Testimonial {
  id: string;
  imageUrl: string;
  name?: string; // Optional for now as current design is just images
  text?: string;
  role?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

// Conteúdo padrão inicial (o que já estava no código)
const defaultContent: AppContent = {
  heroHeadline: "Você trabalha ou usa\nUber, 99, iFood?\nSofreu um acidente\nnos últimos 12 meses?",
  heroSubheadline: "Você Pode Ter Direito a Até R$ 100 Mil",
  videoUrl: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
  partnersTogetherImage: "/Imagens/socios-juntos.JPG",
  aboutText1: "Iniciamos a Gaúcha Indenizações em 2014 com um propósito claro: oferecer um atendimento humanizado, ágil e transparente para quem mais precisa.",
  aboutText2: "Unimos nossa vivência profissional e pessoal para garantir que cada cliente seja tratado com respeito, proximidade e acompanhamento direto.",
  testimonials: [
    { id: '1', imageUrl: "/Imagens/Avaliacoes/IMG_9732.PNG" },
    { id: '2', imageUrl: "/Imagens/Avaliacoes/IMG_9734.PNG" },
    { id: '3', imageUrl: "/Imagens/Avaliacoes/IMG_9735.PNG" },
    { id: '4', imageUrl: "/Imagens/Avaliacoes/IMG_9736.PNG" },
    { id: '5', imageUrl: "/Imagens/Avaliacoes/IMG_9737.PNG" },
    { id: '6', imageUrl: "/Imagens/Avaliacoes/IMG_9737(1).PNG" },
  ],
  faq: [
    { id: '1', question: "Seguro só paga se eu morrer?", answer: "❌ Não! Invalidez parcial (até mesmo uma fratura simples) já pode gerar direito a indenização considerável." },
    { id: '2', question: "Só tenho DPVAT?", answer: "Provavelmente não. A maioria das pessoas tem seguros que nem sabe: seguro de vida do banco, seguro de grupo da empresa, seguro da plataforma de app. Nós investigamos e descobrimos TODOS." },
    { id: '3', question: "Já faz mais de 1 ano do acidente. Perdi o prazo?", answer: "Depende. Para responsabilidade civil (contra quem causou), você tem até 3 anos. Para seguro de vida, até 1 ano APÓS o fim do tratamento médico (alta). Consulte-nos gratuitamente para avaliar seu caso." },
    { id: '4', question: "Quanto custa a consultoria?", answer: "A consulta e análise são 100% gratuitas. Só cobramos honorários se você ganhar, e você recebe o valor integral primeiro na sua conta antes de nos repassar a nossa parte." },
    { id: '5', question: "Quanto tempo demora para receber?", answer: "Varia de 3 meses a 2 anos dependendo da complexidade do caso e da seguradora. Mantemos você informado de forma proativa em cada etapa do processo." },
    { id: '6', question: "Preciso ir até o escritório?", answer: "Não! Atendemos de forma 100% online em todo o Rio Grande do Sul. Mas se preferir um café, nosso escritório físico fica no Centro Histórico de Porto Alegre." },
    { id: '7', question: "Trabalho com Uber/99. Tenho direito mesmo?", answer: "SIM! Motoristas, entregadores E passageiros têm cobertura garantida pelas plataformas durante viagens e entregas ativas." },
    { id: '8', question: "Meu acidente foi 'leve'. Não vale a pena?", answer: "Não subestime! Até fraturas simples (como um dedo ou punho) podem gerar indenizações significativas. A única forma de saber o valor exato é fazendo uma análise gratuita conosco." },
    { id: '9', question: "A seguradora já negou meu pedido. E agora?", answer: "Você tem o direito de saber o motivo da negativa por escrito e pode solicitar reanálise com documentação complementar, ou via judicial. Nós somos especialistas em reverter negativas. Podemos ajudar!" },
    { id: '10', question: "O que acontece se o DPVAT acabou?", answer: "Quem sofreu acidente até 14/11/2023 ainda pode solicitar o DPVAT antigo. Além disso, mesmo sem DPVAT, existem outros seguros (vida, apps, empresa) que continuam ativos e pagam muito mais." },
  ],
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
