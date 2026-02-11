import * as React from 'react';
import { useState, useEffect } from 'react';
import { useContent, AppContent } from '../context/ContentContext';
import {
  Save, LogOut, Settings, Image as ImageIcon, Youtube, Type, AlertCircle,
  BarChart3, Facebook, Eye, EyeOff, CheckCircle, Layout, Code, ArrowLeft,
  Globe, Monitor, ChevronRight, LayoutDashboard, Users, MessageCircle,
  TrendingUp, ExternalLink, Clock, Plus, Trash2, HelpCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ImageUpload } from '../components/ImageUpload';

// Função aprimorada para extrair o ID e gerar o embed (YouTube)
const getSafeEmbedUrl = (url: string) => {
  if (!url) return '';
  const trimmedUrl = url.trim();
  if (trimmedUrl.includes('youtube.com/embed/') || trimmedUrl.includes('youtube-nocookie.com/embed/')) return trimmedUrl;
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = trimmedUrl.match(regExp);
  if (match && match[2].length === 11) return `https://www.youtube.com/embed/${match[2]}`;
  return trimmedUrl;
};

// ============ TABS ============
type AdminTab = 'dashboard' | 'conteudo' | 'depoimentos' | 'faq' | 'tracking' | 'aparencia';

interface TabItem {
  id: AdminTab;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const tabs: TabItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, description: 'Resumo e estatísticas' },
  { id: 'conteudo', label: 'Conteúdo', icon: <Type size={20} />, description: 'Textos e imagens' },
  { id: 'depoimentos', label: 'Depoimentos', icon: <MessageCircle size={20} />, description: 'Avaliações de clientes' },
  { id: 'faq', label: 'FAQ', icon: <HelpCircle size={20} />, description: 'Perguntas frequentes' },
  { id: 'tracking', label: 'Rastreamento', icon: <BarChart3 size={20} />, description: 'Pixel e Analytics' },
  { id: 'aparencia', label: 'Aparência', icon: <Layout size={20} />, description: 'Cores e estilo' },
];

// ============ COMPONENTS ============
const AdminInput: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  type?: string;
  rows?: number;
  hint?: string;
  mono?: boolean;
}> = ({ label, name, value, onChange, placeholder, type = 'text', rows, hint, mono }) => {
  const inputClasses = `w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 font-medium bg-white focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all shadow-sm hover:border-gray-300 ${mono ? 'font-mono text-sm uppercase tracking-wider' : ''}`;
  return (
    <div>
      <label className="block text-sm font-bold text-gray-800 mb-2">{label}</label>
      {rows ? (
        <textarea name={name} value={value} onChange={onChange} className={inputClasses} rows={rows} placeholder={placeholder} />
      ) : (
        <input type={type} name={name} value={value} onChange={onChange} className={inputClasses} placeholder={placeholder} />
      )}
      {hint && <p className="text-xs text-gray-500 mt-1.5">{hint}</p>}
    </div>
  );
};

const SectionCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  badge?: string;
  badgeColor?: string;
}> = ({ title, icon, children, badge, badgeColor = 'green' }) => (
  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden h-full">
    <div className="px-6 py-5 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 flex items-center justify-between">
      <h3 className="flex items-center gap-3 text-base font-bold text-brand-blue">
        <span className="bg-brand-blue/10 text-brand-blue p-2 rounded-lg">{icon}</span>
        {title}
      </h3>
      {badge && (
        <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${badgeColor === 'green' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
          }`}>{badge}</span>
      )}
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
);

const StatCard: React.FC<{
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  trend?: string;
}> = ({ label, value, icon, color, trend }) => (
  <div className={`bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all`}>
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
        {React.cloneElement(icon as React.ReactElement, { className: color.replace('bg-', 'text-') })}
      </div>
      {trend && (
        <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
          <TrendingUp size={12} /> {trend}
        </span>
      )}
    </div>
    <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
    <p className="text-3xl font-black text-brand-blue tracking-tight">{value}</p>
  </div>
);

// ============ MAIN ADMIN COMPONENT ============
export const Admin: React.FC = () => {
  const { content, updateContent } = useContent();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<AppContent>(content);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [hasChanges, setHasChanges] = useState(false);

  // Stats (simulated based on local clicks)
  const [waClicks, setWaClicks] = useState(0);

  useEffect(() => {
    // Load local stats
    const clicks = localStorage.getItem('wa_clicks_total') || '0';
    setWaClicks(parseInt(clicks));
  }, []);

  useEffect(() => {
    const changed = JSON.stringify(formData) !== JSON.stringify(content);
    setHasChanges(changed);
  }, [formData, content]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') setIsLoggedIn(true);
    else alert('Senha incorreta!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- Testimonials Handlers ---
  const addTestimonial = () => {
    setFormData(prev => ({
      ...prev,
      testimonials: [...(prev.testimonials || []), { id: Date.now().toString(), imageUrl: '' }]
    }));
  };

  const updateTestimonial = (id: string, imageUrl: string) => {
    setFormData(prev => ({
      ...prev,
      testimonials: prev.testimonials.map(t => t.id === id ? { ...t, imageUrl } : t)
    }));
  };

  const removeTestimonial = (id: string) => {
    if (window.confirm('Tem certeza que deseja remover este depoimento?')) {
      setFormData(prev => ({
        ...prev,
        testimonials: prev.testimonials.filter(t => t.id !== id)
      }));
    }
  };

  // --- FAQ Handlers ---
  const addFAQ = () => {
    setFormData(prev => ({
      ...prev,
      faq: [...(prev.faq || []), { id: Date.now().toString(), question: '', answer: '' }]
    }));
  };

  const updateFAQ = (id: string, field: 'question' | 'answer', value: string) => {
    setFormData(prev => ({
      ...prev,
      faq: prev.faq.map(f => f.id === id ? { ...f, [field]: value } : f)
    }));
  };

  const removeFAQ = (id: string) => {
    if (window.confirm('Tem certeza que deseja remover esta pergunta?')) {
      setFormData(prev => ({
        ...prev,
        faq: prev.faq.filter(f => f.id !== id)
      }));
    }
  };

  const handleSave = () => {
    setSaveStatus('saving');
    updateContent(formData);
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 500);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-blue via-[#0a1f4a] to-brand-blue flex items-center justify-center p-4">
        <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-2xl max-w-md w-full border border-gray-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-brand-blue rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
              <Settings className="w-8 h-8 text-brand-gold" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Painel Administrativo</h2>
            <p className="text-gray-500 text-sm mt-2">Gaúcha Indenizações</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Senha de Acesso</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-300 text-gray-900 font-medium bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all placeholder-gray-400 pr-12"
                  placeholder="Digite a senha..."
                  autoFocus
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <button type="submit" className="w-full bg-brand-blue text-brand-gold font-bold py-3.5 rounded-xl hover:bg-[#0a1f4a] transition-all shadow-md text-base">
              Entrar no Painel
            </button>
            <button type="button" onClick={() => navigate('/')} className="w-full text-gray-500 font-medium text-sm py-2 hover:text-brand-blue flex items-center justify-center gap-1">
              <ArrowLeft size={16} /> Voltar ao site
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-brand-blue text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="bg-brand-gold/20 p-1.5 rounded-lg border border-brand-gold/20">
              <Settings className="text-brand-gold" size={20} />
            </div>
            <div>
              <h1 className="font-bold text-base sm:text-lg leading-tight tracking-tight">Painel Admin</h1>
              <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest hidden sm:block">Gaúcha Indenizações</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button onClick={() => window.open('/', '_blank')} className="text-sm font-bold text-gray-300 hover:text-white flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-white/10 transition-all border border-transparent hover:border-gray-700">
              <Monitor size={16} /> <span className="hidden sm:inline">Ver Site</span>
            </button>
            <button onClick={() => setIsLoggedIn(false)} className="text-sm font-bold text-brand-gold hover:text-yellow-300 flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-white/10 transition-all">
              <LogOut size={16} /> <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          <aside className="lg:w-64 shrink-0">
            <nav className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden lg:sticky lg:top-24">
              <div className="p-4 border-b border-gray-100 bg-gray-50">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Menu de Gestão</p>
              </div>
              <div className="p-2 space-y-1">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all group ${activeTab === tab.id
                      ? 'bg-brand-blue text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    <span className={activeTab === tab.id ? 'text-brand-gold' : 'text-gray-400 group-hover:text-brand-blue'}>{tab.icon}</span>
                    <div className="flex-1 min-w-0">
                      <span className="block text-sm font-bold">{tab.label}</span>
                      <span className={`block text-[10px] truncate ${activeTab === tab.id ? 'text-gray-400' : 'text-gray-400'}`}>{tab.description}</span>
                    </div>
                  </button>
                ))}
              </div>
            </nav>
          </aside>

          <main className="flex-1 min-w-0 space-y-6 pb-24">
            {/* ##### TAB: DASHBOARD ##### */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <StatCard label="Conversões (WhatsApp)" value={waClicks} icon={<MessageCircle />} color="bg-green-500" trend="+12%" />
                  <StatCard label="Visitas Estimadas" value="---" icon={<Users />} color="bg-blue-500" />
                  <StatCard label="Tempo no Site (Média)" value="2:45" icon={<Clock />} color="bg-purple-500" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <SectionCard title="Caminho das Conversões" icon={<TrendingUp size={18} />} badge="Local">
                    <p className="text-sm text-gray-500 mb-6 font-medium">Estes dados mostram as "intenções de contato" registradas localmente no seu site.</p>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-100 text-green-700 rounded-lg"><MessageCircle size={18} /></div>
                          <span className="text-sm font-bold text-gray-700">Cliques no WhatsApp</span>
                        </div>
                        <span className="text-lg font-black text-brand-blue">{waClicks}</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 opacity-60">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 text-blue-700 rounded-lg"><Monitor size={18} /></div>
                          <span className="text-sm font-bold text-gray-700">Envios de Formulário</span>
                        </div>
                        <span className="text-lg font-black text-brand-blue">---</span>
                      </div>
                    </div>
                  </SectionCard>

                  <SectionCard title="Google Analytics 4" icon={<BarChart3 size={18} />} badge={formData.googleAnalyticsId ? 'Configurado' : 'Pendente'} badgeColor={formData.googleAnalyticsId ? 'green' : 'gray'}>
                    <div className="space-y-5">
                      <p className="text-sm text-gray-600 leading-relaxed font-medium">
                        Para ver dados detalhados como origem do tráfego (Google Ads, Facebook Ads) e localização dos usuários, acesse o painel oficial.
                      </p>

                      {formData.googleAnalyticsId ? (
                        <div className="space-y-4">
                          <div className="p-4 bg-brand-blue/5 border border-brand-blue/10 rounded-xl">
                            <p className="text-xs font-bold text-brand-blue uppercase mb-1">ID Conectado</p>
                            <p className="text-sm font-mono font-bold text-brand-blue">{formData.googleAnalyticsId}</p>
                          </div>
                          <button
                            onClick={() => window.open(`https://analytics.google.com/analytics/web/`, '_blank')}
                            className="w-full bg-brand-blue text-brand-gold font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#0a1f4a] transition-all shadow-md group"
                          >
                            Abrir Google Analytics <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </button>
                          <p className="text-[10px] text-gray-400 text-center font-bold uppercase tracking-widest">Acesse "Tempo Real" para ver visitas agora</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-6 text-center">
                          <div className="p-4 bg-gray-100 rounded-full mb-4 text-gray-400"><BarChart3 size={32} /></div>
                          <p className="text-sm font-bold text-gray-500 mb-4">Google Analytics não configurado</p>
                          <button onClick={() => setActiveTab('tracking')} className="text-sm font-bold text-brand-blue hover:underline">Configurar ID agora →</button>
                        </div>
                      )}
                    </div>
                  </SectionCard>
                </div>
              </div>
            )}

            {/* ##### TAB: CONTEÚDO ##### */}
            {activeTab === 'conteudo' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <SectionCard title="Seção Inicial (Topo)" icon={<Type size={18} />}>
                  <AdminInput label="Título Principal (Headline)" name="heroHeadline" value={formData.heroHeadline} onChange={handleChange} rows={2} />
                  <AdminInput label="Subtítulo (Valor em destaque)" name="heroSubheadline" value={formData.heroSubheadline} onChange={handleChange} />
                </SectionCard>

                <SectionCard title="Vídeo de Apresentação" icon={<Youtube size={18} />}>
                  <AdminInput label="Link do Vídeo do YouTube" name="videoUrl" value={formData.videoUrl} onChange={handleChange} placeholder="Ex: https://www.youtube.com/watch?v=..." hint="Qualquer link do YouTube funciona." />
                  {formData.videoUrl && (
                    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-gray-200 aspect-video max-w-lg mt-4">
                      <iframe className="w-full h-full" src={getSafeEmbedUrl(formData.videoUrl)} title="Preview" frameBorder="0" allowFullScreen></iframe>
                    </div>
                  )}
                </SectionCard>

                <SectionCard title="Quem Somos" icon={<ImageIcon size={18} />}>
                  <div className="mb-6">
                    <ImageUpload
                      label="Foto dos Sócios"
                      currentImage={formData.partnersTogetherImage}
                      onImageUploaded={(url) => setFormData(prev => ({ ...prev, partnersTogetherImage: url }))}
                      helperText="Recomendado: 800x600px ou maior."
                    />
                  </div>
                  <AdminInput label="Apresentação 1" name="aboutText1" value={formData.aboutText1} onChange={handleChange} rows={4} />
                  <AdminInput label="Apresentação 2" name="aboutText2" value={formData.aboutText2} onChange={handleChange} rows={4} />
                </SectionCard>
              </div>
            )}

            {/* ##### TAB: DEPOIMENTOS ##### */}
            {activeTab === 'depoimentos' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Gerenciar Depoimentos</h3>
                  <button onClick={addTestimonial} className="bg-brand-blue text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-brand-blue/90 transition-all shadow-md">
                    <Plus size={16} /> Adicionar Novo
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {formData.testimonials?.map((testimonial) => (
                    <div key={testimonial.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm relative group">
                      <button
                        onClick={() => removeTestimonial(testimonial.id)}
                        className="absolute top-3 right-3 p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors opacity-0 group-hover:opacity-100"
                        title="Remover"
                      >
                        <Trash2 size={16} />
                      </button>

                      <ImageUpload
                        label={`Depoimento #${testimonial.id.slice(-4)}`}
                        currentImage={testimonial.imageUrl}
                        onImageUploaded={(url) => updateTestimonial(testimonial.id, url)}
                      />
                    </div>
                  ))}

                  {(!formData.testimonials || formData.testimonials.length === 0) && (
                    <div className="col-span-full py-12 text-center text-gray-400 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                      <MessageCircle size={48} className="mx-auto mb-3 opacity-20" />
                      <p>Nenhum depoimento cadastrado ainda.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ##### TAB: FAQ ##### */}
            {activeTab === 'faq' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Perguntas Frequentes</h3>
                  <button onClick={addFAQ} className="bg-brand-blue text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-brand-blue/90 transition-all shadow-md">
                    <Plus size={16} /> Adicionar Pergunta
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.faq?.map((item, index) => (
                    <div key={item.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm transition-all hover:shadow-md">
                      <div className="flex justify-between items-start mb-4">
                        <span className="bg-gray-100 text-gray-500 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">Pergunta #{index + 1}</span>
                        <button
                          onClick={() => removeFAQ(item.id)}
                          className="text-red-400 hover:text-red-600 p-1 rounded-md hover:bg-red-50 transition-colors"
                          title="Remover"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Pergunta</label>
                          <input
                            type="text"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
                            value={item.question}
                            onChange={(e) => updateFAQ(item.id, 'question', e.target.value)}
                            placeholder="Ex: Como funciona o processo?"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Resposta</label>
                          <textarea
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
                            rows={3}
                            value={item.answer}
                            onChange={(e) => updateFAQ(item.id, 'answer', e.target.value)}
                            placeholder="Digite a resposta aqui..."
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  {(!formData.faq || formData.faq.length === 0) && (
                    <div className="py-12 text-center text-gray-400 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                      <HelpCircle size={48} className="mx-auto mb-3 opacity-20" />
                      <p>Nenhuma pergunta cadastrada.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ##### TAB: RASTREAMENTO ##### */}
            {activeTab === 'tracking' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <SectionCard title="Meta Pixel (Facebook)" icon={<Facebook size={18} />} badge={formData.facebookPixelId ? 'Ativo' : 'Inativo'}>
                  <AdminInput label="ID do Pixel" name="facebookPixelId" value={formData.facebookPixelId} onChange={handleChange} placeholder="Apenas o número do ID" mono />
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 text-sm text-blue-800 font-medium">
                    <CheckCircle size={18} className="text-blue-500 shrink-0" />
                    <span>Rastreie visitantes e otimize seus anúncios no Facebook e Instagram.</span>
                  </div>
                </SectionCard>

                <SectionCard title="Google Analytics 4" icon={<BarChart3 size={18} />} badge={formData.googleAnalyticsId ? 'Ativo' : 'Inativo'}>
                  <AdminInput label="ID de Medição GA4" name="googleAnalyticsId" value={formData.googleAnalyticsId} onChange={handleChange} placeholder="G-XXXXXXXXXX" mono />
                  <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 flex gap-3 text-sm text-purple-800 font-medium">
                    <Globe size={18} className="text-purple-500 shrink-0" />
                    <span>Meça o desempenho do tráfego orgânico e pago em tempo real.</span>
                  </div>
                </SectionCard>
              </div>
            )}

            {/* ##### TAB: APARÊNCIA ##### */}
            {activeTab === 'aparencia' && (
              <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center animate-in fade-in slide-in-from-bottom-2 duration-500">
                <Layout className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                <h3 className="text-xl font-black text-brand-blue mb-2">Opções de Design</h3>
                <p className="text-gray-400 text-sm max-w-sm mx-auto font-medium">Em breve você poderá mudar cores e fontes do site diretamente por aqui.</p>
              </div>
            )}
          </main>
        </div>
      </div>

      <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 z-50 ${hasChanges ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full animate-pulse"></div>
            <p className="text-sm font-bold text-gray-700">Alterações pendentes</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setFormData(content)} className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-500 font-bold text-sm hover:bg-gray-50 transition-all">Descartar</button>
            <button onClick={handleSave} disabled={saveStatus === 'saving'} className={`px-8 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-md ${saveStatus === 'saved' ? 'bg-green-500 text-white' : 'bg-brand-blue text-brand-gold hover:shadow-lg'}`}>
              {saveStatus === 'saving' ? 'Salvando...' : saveStatus === 'saved' ? 'Salvo!' : <><Save size={18} /> Salvar Alterações</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
