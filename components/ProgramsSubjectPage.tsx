import React, {useState} from 'react';
import { useLanguage } from '../lib/i18n';
import { ChevronLeftIcon, CodeBracketIcon, PlusIcon, TrashIcon } from './Icons';
import type { Page, Subject, File } from '../App';

interface ProgramsSubjectPageProps {
  navigate: (page: Page) => void;
  subject: Subject | undefined;
  files: File[];
  addFile: (name: string, dataUrl: string) => void;
  deleteFile: (id: string) => void;
  isAdmin: boolean;
}

const AddFileForm: React.FC<{ onAdd: (name: string, dataUrl: string) => void }> = ({ onAdd }) => {
  const { t } = useLanguage();
  const [file, setFile] = useState<globalThis.File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      const reader = new FileReader();
      reader.onload = (upload) => {
        if (upload.target?.result) {
          onAdd(file.name, upload.target.result as string);
          setFile(null);
          (e.target as HTMLFormElement).reset();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 p-4 bg-gray-100 rounded-lg border border-gray-200 flex items-center gap-4">
       <input
        type="file"
        onChange={handleFileChange}
        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        required
      />
      <button type="submit" className="flex items-center justify-center px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400" disabled={!file}>
        <PlusIcon className="w-5 h-5 mr-2" />
        {t('addFile')}
      </button>
    </form>
  );
};

const ProgramsSubjectPage: React.FC<ProgramsSubjectPageProps> = ({ navigate, subject, files, addFile, deleteFile, isAdmin }) => {
  const { t } = useLanguage();

  if (!subject) {
    return (
      <div className="py-20 text-center">
        <p>Subject not found.</p>
        <button onClick={() => navigate('programs')} className="text-blue-600 mt-4">Back to subjects</button>
      </div>
    );
  }

  return (
    <section className="py-20 bg-white min-h-full">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">{subject.name}</h2>
          <p className="text-lg text-gray-600 mt-2">{t('programsFor')} {subject.name}</p>
        </div>
        
        <div className="space-y-4">
          {files.map((file) => (
            <div key={file.id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 flex justify-between items-center">
              <div className="flex items-center">
                <CodeBracketIcon className="w-6 h-6 text-blue-500 mr-4" />
                <span className="font-medium text-gray-700">{file.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <a href={file.dataUrl} download={file.name} className={`font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors py-2 px-5 rounded-md text-sm ${!file.dataUrl ? 'opacity-50 pointer-events-none' : ''}`}>
                  {t('downloadProgram')}
                </a>
                {isAdmin && (
                  <button onClick={() => deleteFile(file.id)} className="p-2.5 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors" aria-label="Delete file">
                    <TrashIcon className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
          {files.length === 0 && <p className="text-center text-gray-500 py-4">No programs found for this subject.</p>}
        </div>

        {isAdmin && <AddFileForm onAdd={addFile} />}

        <div className="text-center mt-12">
           <button onClick={() => navigate('programs')} className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                <ChevronLeftIcon className="w-5 h-5 mr-2" />
                {t('backToSubjects')}
            </button>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSubjectPage;