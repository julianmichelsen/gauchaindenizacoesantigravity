import * as React from 'react';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isMenuOpen]);

    const navLinks = [
        { name: 'O que fazemos', href: '#especialistas' },
        { name: 'Processo', href: '#processo' },
        { name: 'Depoimentos', href: '#depoimentos' },
        { name: 'FAQ', href: '#faq' },
        { name: 'Localização', href: '#localizacao' },
    ];

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-brand-blue/95 backdrop-blur-md py-2.5 sm:py-3 shadow-lg'
                    : 'bg-brand-blue/20 backdrop-blur-sm lg:bg-transparent py-2 lg:py-5'
                    }`}
            >
                <div className="container mx-auto px-4 sm:px-6 max-w-7xl flex justify-between items-center">
                    {/* Logo */}
                    <a href="/" className="flex items-center">
                        <img
                            src="/Imagens/Logos/LOGO GAÚCHA INDENIZAÇÕES-7.png"
                            alt="Gaúcha Indenizações"
                            className={`transition-all duration-300 object-contain ${isScrolled ? 'h-8 md:h-10' : 'h-9 sm:h-10 md:h-14'}`}
                        />
                    </a>

                    {/* Desktop Menu */}
                    <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-white hover:text-brand-gold font-bold text-sm uppercase tracking-wider transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-brand-gold after:transition-all hover:after:w-full"
                            >
                                {link.name}
                            </a>
                        ))}
                        <a
                            href="#contato"
                            className="bg-brand-gold text-brand-blue px-6 py-2.5 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-white transition-all shadow-md hover:-translate-y-0.5"
                        >
                            Consulta Grátis
                        </a>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden text-white relative z-[100] p-1"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-[#05122e] z-[90] flex flex-col items-center justify-center gap-6 transition-all duration-300 lg:hidden ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
                    }`}
            >
                {navLinks.map((link, idx) => (
                    <a
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-white text-lg sm:text-xl font-bold uppercase tracking-widest hover:text-brand-gold transition-colors"
                        style={{ transitionDelay: isMenuOpen ? `${idx * 50}ms` : '0ms' }}
                    >
                        {link.name}
                    </a>
                ))}
                <a
                    href="#contato"
                    onClick={() => setIsMenuOpen(false)}
                    className="bg-brand-gold text-brand-blue px-10 py-4 rounded-full font-bold text-base sm:text-lg uppercase tracking-wider mt-4 hover:bg-white transition-all shadow-xl"
                >
                    Consulta Grátis
                </a>

                {/* Close Button */}
                <button
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white/40 hover:text-white uppercase text-xs tracking-widest mt-6 flex items-center gap-2 transition-colors"
                >
                    <X size={16} /> Fechar Menu
                </button>
            </div>
        </>
    );
};
