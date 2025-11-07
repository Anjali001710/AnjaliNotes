import React from 'react';
import { useLanguage } from '../lib/i18n';
import { LinkedInIcon } from './Icons';
import type { Page } from '../App';

interface FooterProps {
    navigate: (page: Page, params?: {}, anchor?: string | null) => void;
}

const Footer: React.FC<FooterProps> = ({ navigate }) => {
    const { t } = useLanguage();

    return (
        <footer className="pt-16 pb-8 bg-gray-800 text-gray-300" id="contact-footer">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-center md:text-left">
                    {/* Column 1: Brand & Social */}
                    <div className="md:col-span-2">
                        <h3 className="text-2xl font-bold text-white mb-3">{t('appTitle')}</h3>
                        <p className="text-sm text-gray-400 mb-4 max-w-md mx-auto md:mx-0">{t('heroSubtitle')}</p>
                        <div className="flex space-x-4 mt-4 justify-center md:justify-start">
                            <a href="https://www.linkedin.com/feed/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors">
                                <LinkedInIcon className="h-6 w-6" />
                            </a>
                        </div>
                    </div>
                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4 tracking-wider">{t('quickLinks')}</h3>
                        <ul className="space-y-2 text-sm">
                            <li><button onClick={() => navigate('home')} className="hover:text-white hover:underline">{t('navHome')}</button></li>
                            <li><button onClick={() => navigate('home', {}, 'about')} className="hover:text-white hover:underline">{t('navAbout')}</button></li>
                            <li><button onClick={() => navigate('programs')} className="hover:text-white hover:underline">{t('navPrograms')}</button></li>
                        </ul>
                    </div>
                    {/* Column 3: Contact Us */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4 tracking-wider">{t('contactUs')}</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center justify-center md:justify-start">
                                <span className="mr-3">&#x1F4CD;</span>
                                <span>{t('footerAddress')}</span>
                            </li>
                            <li className="flex items-center justify-center md:justify-start">
                                <span className="mr-3">&#x1F4E7;</span>
                                <span>{t('footerEmail')}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-700 pt-6 mt-6 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} {t('appTitle')}. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;