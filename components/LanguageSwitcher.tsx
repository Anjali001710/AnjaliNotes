import React from 'react';
import { useLanguage } from '../lib/i18n';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const buttonClasses = (lang: 'en' | 'hi') =>
    `px-3 py-1 text-sm font-medium rounded-md transition-colors duration-300 focus:outline-none ${
      language === lang
        ? 'text-blue-600 font-bold'
        : 'text-gray-600 hover:text-blue-600'
    }`;

  return (
    <div className="flex items-center space-x-1 bg-gray-100 rounded-full p-1">
      <button onClick={() => setLanguage('en')} className={buttonClasses('en')}>
        EN
      </button>
      <span className="text-gray-300">|</span>
      <button onClick={() => setLanguage('hi')} className={buttonClasses('hi')}>
        HI
      </button>
    </div>
  );
};

export default LanguageSwitcher;