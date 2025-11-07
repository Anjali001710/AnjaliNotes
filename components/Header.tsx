import React, { useState, useEffect } from 'react';
import { useLanguage } from '../lib/i18n';
import type { Page } from '../App';

interface HeaderProps {
    navigate: (page: Page, params?: {}, anchor?: string | null) => void;
    isAdmin: boolean;
}

const Header: React.FC<HeaderProps> = ({ navigate, isAdmin }) => {
    const { t } = useLanguage();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const handleNavClick = (page: Page, anchor: string | null = null, isMobile: boolean = false) => {
      navigate(page, {}, anchor);
      if (isMobile) {
          setIsMenuOpen(false);
      }
    };

    const navLinks: { key: Parameters<typeof t>[0], page: Page, anchor?: string }[] = [
        { key: 'navHome', page: 'home' },
        { key: 'navAbout', page: 'home', anchor: 'about' },
        { key: 'navPrograms', page: 'programs' },
        { key: 'navNotes', page: 'notes' },
        { key: 'navPPTs', page: 'ppts' },
        { key: 'navContact', page: 'contact' },
    ];
    
    const NavLinkButtons: React.FC<{isMobile?: boolean}> = ({ isMobile = false }) => (
        <>
            {navLinks.map(link => (
                <button 
                  key={link.key} 
                  onClick={() => handleNavClick(link.page, link.anchor, isMobile)}
                  className="font-semibold text-gray-600 hover:text-blue-600 transition-colors duration-300"
                >
                    {t(link.key)}
                </button>
            ))}
            {isAdmin && (
               <button 
                  onClick={() => handleNavClick('submissions', null, isMobile)}
                  className="font-semibold text-white bg-blue-600 px-3 py-1 rounded-md hover:bg-blue-700 transition-colors duration-300"
                >
                    {t('navSubmissions')}
                </button>
            )}
        </>
    );

    return (
        <header className={`sticky top-0 left-0 w-full z-50 transition-shadow duration-300 ${isScrolled ? 'shadow-md bg-white/95 backdrop-blur-sm' : 'bg-white'}`}>
            <div className="container mx-auto flex justify-between items-center p-4">
                <button onClick={() => handleNavClick('home')} className="text-2xl font-black tracking-wider text-gray-800">
                    {t('appTitle')}
                </button>
                <nav className="hidden md:flex items-center space-x-8">
                    <NavLinkButtons />
                </nav>
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-white py-4">
                    <nav className="flex flex-col items-center space-y-4">
                         <NavLinkButtons isMobile={true} />
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;