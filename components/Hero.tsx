import React from 'react';
import { useLanguage } from '../lib/i18n';
import type { Page } from '../App';

interface HeroProps {
    navigate: (page: Page) => void;
}

const Hero: React.FC<HeroProps> = ({ navigate }) => {
    const { t } = useLanguage();

    return (
        <section 
            id="home" 
            className="relative min-h-[60vh] md:min-h-screen flex items-center justify-center text-center bg-cover bg-center"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2940&auto=format&fit=crop)' }}
        >
            <div className="absolute inset-0 bg-white/50"></div>
            <div className="relative z-10 px-6 container mx-auto">
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">{t('heroTitle')}</h1>
                <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">{t('heroSubtitle')}</p>
                <button 
                    onClick={() => navigate('notes')}
                    className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-md hover:bg-blue-700 transition-all duration-300 text-lg shadow-lg"
                >
                    {t('getStarted')}
                </button>
            </div>
        </section>
    );
};

export default Hero;