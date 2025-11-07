import React, { useState } from 'react';
import { useLanguage } from '../lib/i18n';
import type { Submission } from '../App';

interface ContactPageProps {
  addSubmission: (submission: Omit<Submission, 'submittedAt'>) => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ addSubmission }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addSubmission(formData);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-6 max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">{t('contactFormTitle')}</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-3 rounded-full"></div>
          <p className="text-lg text-gray-600 mt-4">{t('contactDesc')}</p>
        </div>
        
        <div className="bg-gray-50 p-8 rounded-lg shadow-md border border-gray-200">
          {isSubmitted ? (
            <div className="text-center p-8 bg-green-100 text-green-800 rounded-md">
              <h3 className="text-xl font-semibold">{t('formSuccess')}</h3>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">{t('formName')}</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{t('formEmail')}</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">{t('formMessage')}</label>
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-md hover:bg-blue-700 transition-all duration-300 text-lg shadow-lg"
                >
                  {t('submit')}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;