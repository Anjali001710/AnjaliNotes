import React from 'react';
import { useLanguage } from '../lib/i18n';
import { ShieldIcon, EditIcon, ThumbsUpIcon, SupportIcon } from './Icons';

interface VisionCardProps {
  icon: React.ReactNode;
  titleKey: 'vision1Title' | 'vision2Title' | 'vision3Title' | 'vision4Title';
  descriptionKey: 'vision1Desc' | 'vision2Desc' | 'vision3Desc' | 'vision4Desc';
}

const VisionCard: React.FC<VisionCardProps> = ({ icon, titleKey, descriptionKey }) => {
    const { t } = useLanguage();
    return (
        <div className="bg-white p-6 rounded-lg text-center transition-all duration-300 shadow-md hover:shadow-xl border border-gray-200">
            <div className="text-blue-600 w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-blue-100 mx-auto">{icon}</div>
            <h3 className="text-lg font-bold mb-2 text-gray-800">{t(titleKey)}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{t(descriptionKey)}</p>
        </div>
    );
};

const Vision: React.FC = () => {
    const { t } = useLanguage();

    return (
        <section className="py-20 bg-gray-100" id="vision">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800">{t('visionTitle')}</h2>
                     <div className="w-24 h-1 bg-blue-600 mx-auto mt-3 rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <VisionCard icon={<ShieldIcon className="w-8 h-8" />} titleKey="vision1Title" descriptionKey="vision1Desc" />
                    <VisionCard icon={<EditIcon className="w-8 h-8" />} titleKey="vision2Title" descriptionKey="vision2Desc" />
                    <VisionCard icon={<ThumbsUpIcon className="w-8 h-8" />} titleKey="vision3Title" descriptionKey="vision3Desc" />
                    <VisionCard icon={<SupportIcon className="w-8 h-8" />} titleKey="vision4Title" descriptionKey="vision4Desc" />
                </div>
            </div>
        </section>
    );
};

export default Vision;