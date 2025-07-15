import React from 'react';
import { useTranslation } from 'react-i18next';

const TermsOfService = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Conditions Générales d'Utilisation</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Objet</h2>
        <p className="text-gray-700 leading-relaxed">
          Les présentes conditions générales d'utilisation (dites « CGU ») ont pour objet l'encadrement juridique des modalités de mise à disposition du site et des services par LM Intelligence et de définir les conditions d’accès et d’utilisation des services par « l'Utilisateur ».
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Accès au site</h2>
        <p className="text-gray-700 leading-relaxed">
          Le site LM Intelligence est accessible gratuitement en tout lieu à tout Utilisateur ayant un accès à Internet. Tous les frais supportés par l'Utilisateur pour accéder au service (matériel informatique, logiciels, connexion Internet, etc.) sont à sa charge.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Propriété intellectuelle</h2>
        <p className="text-gray-700 leading-relaxed">
          Toutes les marques, photographies, textes, commentaires, illustrations, images animées ou non, séquences vidéo, sons, ainsi que toutes les applications informatiques qui pourraient être utilisées pour faire fonctionner ce site et plus généralement tous les éléments reproduits ou utilisés sur le site sont protégés par les lois en vigueur au titre de la propriété intellectuelle.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Liens hypertextes</h2>
        <p className="text-gray-700 leading-relaxed">
          Le site peut contenir des liens hypertextes vers d’autres sites web. LM Intelligence ne peut être tenu pour responsable des informations diffusées sur ces sites.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Responsabilité</h2>
        <p className="text-gray-700 leading-relaxed">
          La responsabilité de LM Intelligence ne peut être engagée en cas de défaillance, panne, difficulté ou interruption de fonctionnement, empêchant l'accès au site ou à une de ses fonctionnalités.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Droit applicable</h2>
        <p className="text-gray-700 leading-relaxed">
          Les présentes conditions d'utilisation du site sont régies par la loi française et soumises à la compétence des tribunaux de Cannes, sous réserve d'une attribution de compétence spécifique découlant d'un texte de loi ou réglementaire particulier.
        </p>
      </section>

      <p className="text-sm text-gray-500 text-center mt-12">
        Date de mise à jour : 26 juin 2025.
      </p>
    </div>
  );
};

export default TermsOfService;
