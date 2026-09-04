/* VocalFlow — comportements communs.
   Lien de réservation centralisé : les <a data-calendly> ont déjà l'URL en dur dans le HTML
   (fonctionne sans JS) ; modifier CALENDLY_URL ici suffit pour tout mettre à jour. */
(function () {
  'use strict';

  var CALENDLY_URL = 'https://calendly.com/contact-vocal-flow/audit-ia-vocale';
  document.querySelectorAll('a[data-calendly]').forEach(function (a) {
    a.setAttribute('href', CALENDLY_URL);
  });
})();
