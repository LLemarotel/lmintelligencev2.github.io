import React from 'react';
import { useTranslation } from 'react-i18next';

const UserDataDeletion = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
        {t('userDataDeletion.title')}
      </h1>

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <p className="text-lg text-gray-700 mb-6">
          {t('userDataDeletion.intro')}
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {t('userDataDeletion.howToRequestTitle')}
        </h2>
        <p className="text-gray-700 mb-4">
          {t('userDataDeletion.howToRequest')}
        </p>
        <p className="text-gray-700 mb-6">
          {t('userDataDeletion.contactEmail')}: <a href="mailto:contact@lmintelligence.fr" className="text-blue-600 hover:underline">contact@lmintelligence.fr</a>
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {t('userDataDeletion.processTitle')}
        </h2>
        <p className="text-gray-700 mb-6">
          {t('userDataDeletion.processDescription')}
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {t('userDataDeletion.importantNotesTitle')}
        </h2>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
          <li>{t('userDataDeletion.note1')}</li>
          <li>{t('userDataDeletion.note2')}</li>
          <li>{t('userDataDeletion.note3')}</li>
        </ul>

        <p className="text-gray-700 text-sm italic">
          {t('userDataDeletion.lastUpdated')}: July 14, 2025
        </p>
      </div>
    </div>
  );
};

export default UserDataDeletion;
