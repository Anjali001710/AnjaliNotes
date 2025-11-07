import React, { useState } from 'react';
import { useLanguage } from '../lib/i18n';
import { BookOpenIcon, ChevronLeftIcon, PlusIcon, TrashIcon } from './Icons';
import type { Page, Subject } from '../App';

interface NotesPageProps {
  navigate: (page: Page, params?: { subjectId: string }) => void;
  subjects: Subject[];
  addSubject: (name: string) => void;
  deleteSubject: (id: string) => void;
  isAdmin: boolean;
}

const SubjectCard: React.FC<{ title: string; onClick: () => void; onDelete: () => void; isAdmin: boolean; }> = ({ title, onClick, onDelete, isAdmin }) => {
  return (
    <div className="relative group bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {isAdmin && (
        <button onClick={onDelete} className="absolute top-2 right-2 p-1.5 bg-red-100 text-red-600 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-200 transition-opacity" aria-label="Delete Subject">
          <TrashIcon className="w-4 h-4" />
        </button>
      )}
      <button onClick={onClick} className="w-full h-full flex flex-col items-center">
        <BookOpenIcon className="w-12 h-12 text-blue-500 mb-4" />
        <h3 className="text-lg font-bold text-gray-800 flex-grow">{title}</h3>
      </button>
    </div>
  );
};

const AddSubjectForm: React.FC<{ onAdd: (name: string) => void }> = ({ onAdd }) => {
  const { t } = useLanguage();
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim());
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 p-6 bg-gray-100 rounded-lg border border-gray-200 max-w-md mx-auto flex items-center gap-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={t('newSubjectName')}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        required
      />
      <button type="submit" className="flex items-center justify-center px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
        <PlusIcon className="w-5 h-5 mr-2" />
        {t('addSubject')}
      </button>
    </form>
  );
};


const NotesPage: React.FC<NotesPageProps> = ({ navigate, subjects, addSubject, deleteSubject, isAdmin }) => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gray-50 min-h-full">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">{t('notesSectionTitle')}</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-3 rounded-full"></div>
           <p className="text-lg text-gray-600 mt-4">{t('chooseSubject')}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {subjects.map(subject => (
            <SubjectCard
              key={subject.id}
              title={subject.name}
              onClick={() => navigate('notes_subject', { subjectId: subject.id })}
              onDelete={(e?: React.MouseEvent) => {
                e?.stopPropagation();
                deleteSubject(subject.id);
              }}
              isAdmin={isAdmin}
            />
          ))}
        </div>
        {isAdmin && <AddSubjectForm onAdd={addSubject} />}
        <div className="text-center mt-12">
           <button onClick={() => navigate('home')} className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                <ChevronLeftIcon className="w-5 h-5 mr-2" />
                Back to Home
            </button>
        </div>
      </div>
    </section>
  );
};

export default NotesPage;