import React from 'react';
import { useTranslation } from 'react-i18next';

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Politique de confidentialité et de protection des données</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Responsable du traitement</h2>
        <p className="text-gray-700 leading-relaxed">
          Le site LM Intelligence (ci-après « le Site »), édité par la société LM Intelligence, dont le siège social est situé à Cannes, immatriculée au RCS de Cannes sous le numéro 988085205, est responsable du traitement des données personnelles collectées sur ce Site.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Données collectées</h2>
        <p className="text-gray-700 leading-relaxed">
          Les données personnelles suivantes peuvent être collectées :
        </p>
        <ul className="list-disc list-inside ml-4 text-gray-700 leading-relaxed">
          <li>Via le formulaire de contact : prénom, nom, adresse e-mail, message.</li>
          <li>Via le formulaire de demande de devis : nom, prénom, adresse e-mail, message, services demandés.</li>
          <li>Cookies techniques : un cookie nommé <code className="font-mono">lm_intelligence_cookie_consent</code> mémorise votre choix de consentement à l’usage des cookies.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Finalités du traitement</h2>
        <p className="text-gray-700 leading-relaxed">
          Les données sont utilisées pour :
        </p>
        <ul className="list-disc list-inside ml-4 text-gray-700 leading-relaxed">
          <li>Répondre à vos demandes de contact et de devis.</li>
          <li>Assurer le suivi de la relation client, la facturation et l’archivage.</li>
          <li>Gérer votre consentement aux cookies et optimiser votre expérience de navigation.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Bases légales</h2>
        <p className="text-gray-700 leading-relaxed">
          Le traitement repose sur :
        </p>
        <ul className="list-disc list-inside ml-4 text-gray-700 leading-relaxed">
          <li>Votre consentement (cookies).</li>
          <li>L’exécution d’un contrat ou la mise en œuvre de mesures précontractuelles à votre demande (devis, contact).</li>
          <li>Les intérêts légitimes de LM Intelligence pour assurer la sécurité de son Site et la qualité de service.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Destinataires des données</h2>
        <p className="text-gray-700 leading-relaxed">
          Les données collectées sont destinées exclusivement à :
        </p>
        <ul className="list-disc list-inside ml-4 text-gray-700 leading-relaxed">
          <li>LM Intelligence et ses services internes (commercial, technique).</li>
          <li>Le prestataire de formulaire Web3Forms (pour la transmission sécurisée des messages).</li>
        </ul>
        <p className="text-gray-700 leading-relaxed mt-2">
          Aucun transfert de données hors Union européenne n’est opéré.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Durée de conservation</h2>
        <ul className="list-disc list-inside ml-4 text-gray-700 leading-relaxed">
          <li>Formulaires de contact et devis : vos données sont conservées pendant 3 ans à compter de la dernière prise de contact, conformément aux obligations légales.</li>
          <li>Cookies de consentement : jusqu’à expiration du cookie (365 jours) ou jusqu’au retrait de votre consentement.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Sécurité</h2>
        <p className="text-gray-700 leading-relaxed">
          Nous mettons en œuvre des mesures techniques et organisationnelles adaptées (chiffrement TLS, accès restreint, pare-feu) pour protéger vos données contre toute divulgation ou altération non autorisée.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">8. Vos droits</h2>
        <p className="text-gray-700 leading-relaxed">
          Conformément à la réglementation (RGPD), vous disposez des droits suivants :
        </p>
        <ul className="list-disc list-inside ml-4 text-gray-700 leading-relaxed">
          <li>Droit d’accès, de rectification, d’effacement.</li>
          <li>Droit à la limitation du traitement et à la portabilité.</li>
          <li>Droit d’opposition et de retrait du consentement à tout moment (notamment pour les cookies).</li>
        </ul>
        <p className="text-gray-700 leading-relaxed mt-2">
          Pour exercer ces droits, envoyez un message à : <a href="mailto:contact@lmintelligence.fr" className="text-blue-600 hover:underline">contact@lmintelligence.fr</a>
        </p>
        <p className="text-gray-700 leading-relaxed mt-2">
          Vous pouvez également déposer une réclamation auprès de la CNIL.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">9. Cookies</h2>
        <p className="text-gray-700 leading-relaxed">
          Le Site utilise uniquement des cookies strictement nécessaires au fonctionnement de la bannière de consentement. Aucun cookie de traçage, statistique ou publicitaire n’est installé sans votre accord.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">10. Évolution de la politique</h2>
        <p className="text-gray-700 leading-relaxed">
          Cette politique peut être mise à jour. Toute nouvelle version sera publiée sur : <a href="https://lmintelligence.fr/privacy-policy.html" className="text-blue-600 hover:underline">https://lmintelligence.fr/privacy-policy.html</a> et signalée lors de votre prochaine visite.
        </p>
      </section>

      <p className="text-sm text-gray-500 text-center mt-12">
        Date de mise à jour : 14 juillet 2025.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
