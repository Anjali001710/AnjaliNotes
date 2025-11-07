import React from 'react';
import { useLanguage } from '../lib/i18n';
import { DocumentTextIcon } from './Icons';

interface NoteCardProps {
    titleKey: 'subjectDataStructures' | 'subjectCompNetworks' | 'subjectOS' | 'subjectDBMS';
}

const NoteCard: React.FC<NoteCardProps> = ({ titleKey }) => {
    const { t } = useLanguage();
    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col items-center text-center">
            <DocumentTextIcon className="w-12 h-12 text-blue-500 mb-4"/>
            <h3 className="text-lg font-bold text-gray-800 flex-grow">{t(titleKey)}</h3>
            <a href="#" className="mt-4 font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors py-2 px-5 rounded-md text-sm">
                {t('downloadPdf')}
            </a>
        </div>
    );
}

const NotesSection: React.FC = () => {
    const { t } = useLanguage();

    return (
        <section className="py-20 bg-white" id="notes">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800">{t('notesSectionTitle')}</h2>
                    <div className="w-24 h-1 bg-blue-600 mx-auto mt-3 rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <NoteCard titleKey="subjectDataStructures" />
                    <NoteCard titleKey="subjectCompNetworks" />
                    <NoteCard titleKey="subjectOS" />
                    <NoteCard titleKey="subjectDBMS" />
                </div>
            </div>
        </section>
    );
};

export default NotesSection;
