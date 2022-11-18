import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './datapolicystyles.scss';
import MobileNav from '../Header/MobileNav/MobileNav';

function DataPolicy() {
  const type = localStorage.getItem('type');
  return (
    <div className="datapolicy-styles">
      <Header
        type={type}
      />
      <div>
        <div>
          <h1>Mentions légales</h1>
          <p>En vigueur au 17/11/2022</p>
        </div>
        <div className="datapolicy-content">
          <p>
            Conformément aux dispositions des Articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 pour la Confiance dans
            l’économie numérique, dite L.C.E.N., il est porté à la connaissance des utilisateurs et visiteurs, ci-après l’Utilisateur",
            du site mhumain.fr , ci-après le "Site", les présentes mentions légales.

          </p>

          <p>
            La connexion et la navigation sur le Site par l’Utilisateur implique acceptation intégrale et sans réserve
            des présentes mentions légales.

          </p>

          <p>Ces dernières sont accessibles sur le Site à la rubrique « Mentions légales ».</p>

          <h2>ARTICLE 1 - L'EDITEUR</h2>

          <p>L’édition et la direction de la publication du Site est assurée par les Mhumains.</p>
          <p>ci-après l'"Editeur".</p>

          <h2>ARTICLE 2 - L'HEBERGEUR</h2>

          <p>
            L'hébergeur du Site est la société _______________, dont le siège social est situé au _______________ ,
            avec le numéro de téléphone : _______________ + adresse mail de contact

          </p>

          <h2>ARTICLE 3 - ACCES AU SITE</h2>

          <p>
            Le Site est accessible en tout endroit, 7j/7, 24h/24 sauf cas de force majeure, interruption
            programmée ou non et pouvant découlant d’une nécessité de maintenance.

          </p>

          <p>En cas de modification, interruption ou suspension du Site, l'Editeur ne saurait être tenu responsable.</p>

          <h2>ARTICLE 4 - COLLECTE DES DONNEES</h2>

          <p>
            Le site est exempté de déclaration à la Commission Nationale Informatique et Libertés (CNIL) dans la mesure où il ne
            collecte aucune donnée concernant les utilisateurs.

          </p>

          <p>
            Toute utilisation, reproduction, diffusion, commercialisation, modification de toute ou partie du Site,
            sans autorisation de l’Editeur est prohibée et pourra entraînée des actions et poursuites judiciaires telles que notamment prévues
            par le Code de la propriété intellectuelle et le Code civil.

          </p>
        </div>

      </div>
      <Footer />
      <MobileNav
        type={type}
      />
    </div>
  );
}

export default React.memo(DataPolicy);
