import React from 'react';
import { useLanguage } from '../lib/i18n';

const About: React.FC = () => {
    const { t } = useLanguage();

    const subjects = [
        t('subjectDataStructures'),
        t('subjectCompNetworks'),
        t('subjectOS'),
        t('subjectDBMS'),
        t('subjectSoftwareEng'),
        t('subjectWebDev')
    ];

    return (
        <section className="py-20 bg-white" id="about">
            <div className="container mx-auto px-6">
                 <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800">{t('aboutTitle')}</h2>
                    <div className="w-24 h-1 bg-blue-600 mx-auto mt-3 rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                     <div className="prose prose-lg max-w-none text-gray-600">
                        <p>{t('aboutDesc1')}</p>
                        <p>{t('aboutDesc2')}</p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-4">{t('subjectsTaught')}</h3>
                        <div className="space-y-3">
                            {subjects.map((subject, index) => (
                                <div key={index} className="bg-gray-100 p-3 rounded-md shadow-sm">
                                    <p className="font-medium text-gray-700">{subject}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;