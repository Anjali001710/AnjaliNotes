import React from 'react';
import { useLanguage } from '../lib/i18n';
import type { Page } from '../App';

interface ServicesProps {
    navigate: (page: Page) => void;
}

interface ServiceCardProps {
  number: string;
  titleKey: 'service1Title' | 'service2Title' | 'service3Title';
  descriptionKey: 'service1Desc' | 'service2Desc' | 'service3Desc';
  onClick?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ number, titleKey, descriptionKey, onClick }) => {
    const { t } = useLanguage();
    return (
        <div className="bg-white p-8 rounded-lg text-center transition-all duration-300 shadow-md hover:shadow-xl border border-gray-200">
            <div className="mx-auto mb-6 w-16 h-16 flex items-center justify-center text-blue-600 text-2xl font-bold rounded-full bg-blue-100 border-2 border-blue-200">
                {number}
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">{t(titleKey)}</h3>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">{t(descriptionKey)}</p>
            <button onClick={onClick} className="font-semibold text-white bg-gray-800 hover:bg-black transition-colors py-2 px-6 rounded">
                {t('clickHere')}
            </button>
        </div>
    );
};

const Services: React.FC<ServicesProps> = ({ navigate }) => {
    const { t } = useLanguage();

    return (
        <section className="py-20 bg-gray-100" id="services">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800">{t('servicesTitle')}</h2>
                    <div className="w-24 h-1 bg-blue-600 mx-auto mt-3 rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <ServiceCard number="01" titleKey="service1Title" descriptionKey="service1Desc" onClick={() => navigate('notes')} />
                    <ServiceCard number="02" titleKey="service2Title" descriptionKey="service2Desc" onClick={() => navigate('ppts')} />
                    <ServiceCard number="03" titleKey="service3Title" descriptionKey="service3Desc" onClick={() => navigate('programs')} />
                </div>
            </div>
        </section>
    );
};

export default Services;