import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ContentProvider } from './context/ContentContext';

import { Hero } from './components/sections/Hero';
import { Stats } from './components/sections/Stats';
import { Myths } from './components/sections/Myths';
import { Specialists } from './components/sections/Specialists';
import { OtherAccidents } from './components/sections/OtherAccidents';
import { Process } from './components/sections/Process';
import { Differentials } from './components/sections/Differentials';
import { VideoAbout } from './components/sections/VideoAbout';
import { Testimonials } from './components/sections/Testimonials';
import { FAQ } from './components/sections/FAQ';
import { Deadlines } from './components/sections/Deadlines';
import { Location } from './components/sections/Location';
import { FinalCTA } from './components/sections/FinalCTA';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

import { Admin } from './pages/Admin';

const LandingPage: React.FC = () => (
  <div className="min-h-screen bg-white font-body selection:bg-brand-gold selection:text-brand-blue">
    <main>
      <Hero />
      <Stats />
      <Myths />
      <Specialists />
      <OtherAccidents />
      <Process />
      <Differentials />
      <VideoAbout />
      <Testimonials />
      <FAQ />
      <Deadlines />
      <Location />
      <FinalCTA />
    </main>
    <Footer />
    <FloatingWhatsApp />
  </div>
);

const App: React.FC = () => {
  return (
    <ContentProvider>
      <BrowserRouter>
        <Routes>
          {/* Rota Pública (Landing Page) */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Rota Privada (Painel Administrativo) */}
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </ContentProvider>
  );
};

export default App;