import React, { useState } from 'react';
import { useContent, AppContent } from '../context/ContentContext';
import { Save, LogOut, Settings, Image as ImageIcon, Youtube, Type, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Função aprimorada para extrair o ID e gerar o embed
const getSafeEmbedUrl = (url: string) => {
  if (!url) return '';
  const trimmedUrl = url.trim();

  if (trimmedUrl.includes('youtube.com/embed/') || trimmedUrl.includes('youtube-nocookie.com/embed/')) {
    return trimmedUrl;
  }

  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = trimmedUrl.match(regExp);

  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }
  
  return trimmedUrl;
};

export const Admin: React.FC = () => {
  const { content, updateContent } = useContent();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<AppContent>(content);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsLoggedIn(true);
    } else {
      alert('Senha incorreta!');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateContent(formData);
    alert('Conteúdo atualizado com sucesso! (Salvo no estado atual - para persistir precisa do Supabase)');
    navigate('/');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-brand-gray flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-200">
          <div className="text-center mb-8">
            <Settings className="w-12 h-12 text-brand-blue mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900">Acesso Restrito</h2>
            <p className="text-gray-600 text-sm mt-2 font-medium">Painel de Administração</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Senha de Acesso</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-400 text-gray-900 font-medium bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-colors placeholder-gray-500"
                placeholder="Digite a senha..."
              />
            </div>
            <button type="submit" className="w-full bg-brand-blue text-brand-gold font-bold py-3 rounded-lg hover:bg-blue-900 transition-colors shadow-md">
              Entrar no Painel
            </button>
            <button type="button" onClick={() => navigate('/')} className="w-full text-gray-600 font-medium text-sm py-2 hover:text-brand-blue hover:underline">
              Voltar ao site
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <header className="bg-brand-blue text-white py-4 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center max-w-5xl">
          <div className="flex items-center gap-3">
            <Settings className="text-brand-gold" />
            <h1 className="font-bold text-xl">Painel de Edição</h1>
          </div>
          <div className="flex gap-4">
            <button onClick={() => navigate('/')} className="text-sm font-medium text-gray-300 hover:text-white flex items-center gap-1">
              Ver Site
            </button>
            <button onClick={() => setIsLoggedIn(false)} className="text-sm font-medium text-brand-gold hover:text-yellow-300 flex items-center gap-1">
              <LogOut size={16} /> Sair
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 max-w-5xl mt-8">
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">Editar Conteúdo do Site</h2>

          <div className="space-y-12">
            {/* SEÇÃO HERO */}
            <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h3 className="flex items-center gap-2 text-lg font-bold text-brand-blue mb-6">
                <Type size={20} className="text-brand-gold" /> Seção Inicial (Topo)
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Título Principal (Headline)</label>
                  <textarea 
                    name="heroHeadline"
                    value={formData.heroHeadline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-400 text-gray-900 font-medium bg-white focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-colors shadow-sm"
                    rows={2}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Subtítulo (Valor em destaque)</label>
                  <input 
                    type="text"
                    name="heroSubheadline"
                    value={formData.heroSubheadline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-400 text-gray-900 font-medium bg-white focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-colors shadow-sm"
                  />
                </div>
              </div>
            </section>

            {/* SEÇÃO VÍDEO */}
            <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h3 className="flex items-center gap-2 text-lg font-bold text-brand-blue mb-6">
                <Youtube size={20} className="text-brand-gold" /> Vídeo de Apresentação
              </h3>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Link do Vídeo do YouTube</label>
                <input 
                  type="text"
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleChange}
                  placeholder="Ex: https://www.youtube.com/watch?v=aqz-KE-bpKQ"
                  className="w-full px-4 py-3 rounded-lg border border-gray-400 text-gray-900 font-medium bg-white focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-colors shadow-sm placeholder-gray-500"
                />
                
                <div className="mt-3 flex flex-col gap-2">
                  <p className="text-sm font-medium text-green-600 flex items-center gap-1">
                    ✅ Pode colar qualquer formato de link do YouTube.
                  </p>
                  <p className="text-xs font-medium text-orange-600 flex items-start gap-1 bg-orange-50 p-2 rounded border border-orange-200">
                    <AlertCircle size={14} className="shrink-0 mt-0.5" />
                    <span>Se o vídeo apresentar erro (como "Erro 150" ou "153"), significa que o <strong>dono do vídeo bloqueou a incorporação</strong> dele em outros sites. Tente outro vídeo ou altere as configurações do seu canal.</span>
                  </p>
                </div>

                {/* Video Preview */}
                {formData.videoUrl && (
                  <div className="mt-6 border border-gray-300 rounded-xl overflow-hidden shadow-sm bg-gray-200 aspect-video max-w-lg">
                    <iframe 
                      className="w-full h-full"
                      src={getSafeEmbedUrl(formData.videoUrl)} 
                      title="Preview" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen>
                    </iframe>
                  </div>
                )}
              </div>
            </section>

            {/* SEÇÃO SOBRE NÓS */}
            <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h3 className="flex items-center gap-2 text-lg font-bold text-brand-blue mb-6">
                <ImageIcon size={20} className="text-brand-gold" /> Quem Somos (Fotos e Textos)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Link da Foto (Thainá)</label>
                  <input 
                    type="text"
                    name="thainaImage"
                    value={formData.thainaImage}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-400 text-gray-900 font-medium bg-white focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-colors shadow-sm"
                  />
                  {formData.thainaImage && <img src={formData.thainaImage} alt="Preview Thainá" className="mt-3 h-24 rounded-md object-cover border border-gray-300 shadow-sm" />}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Link da Foto (Marlon)</label>
                  <input 
                    type="text"
                    name="marlonImage"
                    value={formData.marlonImage}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-400 text-gray-900 font-medium bg-white focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-colors shadow-sm"
                  />
                  {formData.marlonImage && <img src={formData.marlonImage} alt="Preview Marlon" className="mt-3 h-24 rounded-md object-cover border border-gray-300 shadow-sm" />}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Texto de Apresentação 1</label>
                  <textarea 
                    name="aboutText1"
                    value={formData.aboutText1}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-400 text-gray-900 font-medium bg-white focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-colors shadow-sm"
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Texto de Apresentação 2</label>
                  <textarea 
                    name="aboutText2"
                    value={formData.aboutText2}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-400 text-gray-900 font-medium bg-white focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-colors shadow-sm"
                    rows={4}
                  />
                </div>
              </div>
            </section>
          </div>

          <div className="mt-10 pt-6 border-t border-gray-200 flex justify-end">
            <button 
              onClick={handleSave}
              className="bg-[#25D366] text-white px-8 py-4 rounded-lg font-bold flex items-center gap-2 hover:bg-green-600 transition-colors shadow-lg hover:shadow-xl text-lg"
            >
              <Save size={24} /> Salvar Alterações
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
