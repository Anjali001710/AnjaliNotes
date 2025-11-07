import React from 'react';
import { useLanguage } from '../lib/i18n';
import { ChevronLeftIcon } from './Icons';
import type { Page, Submission } from '../App';

interface SubmissionsPageProps {
  submissions: Submission[];
  navigate: (page: Page) => void;
}

const SubmissionsPage: React.FC<SubmissionsPageProps> = ({ submissions, navigate }) => {
  const { t } = useLanguage();

  const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(new Date(timestamp));
  };

  return (
    <section className="py-20 bg-gray-50 min-h-full">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">{t('submissionsTitle')}</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-3 rounded-full"></div>
        </div>

        <div className="space-y-6">
          {submissions.length > 0 ? (
            submissions.map((submission, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{submission.name}</h3>
                    <a href={`mailto:${submission.email}`} className="text-sm text-blue-600 hover:underline">{submission.email}</a>
                  </div>
                  <span className="text-xs text-gray-500">{t('submittedOn')} {formatDate(submission.submittedAt)}</span>
                </div>
                <p className="text-gray-600 whitespace-pre-wrap">{submission.message}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-md border border-gray-200">
              <p className="text-gray-500">{t('noSubmissions')}</p>
            </div>
          )}
        </div>

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

export default SubmissionsPage;