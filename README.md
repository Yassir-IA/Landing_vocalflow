# Landing — VocalFlow

Site statique (HTML / CSS / JS vanilla, **zéro build**) implémentant la maquette Claude Design
`design-source/reproduction-design-agentia/project/Landing VocalFlow.dc.html`. Prêt pour GitHub + Vercel.

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | La landing (12 sections : hero, chiffres, problème, démo en direct, infrastructure, chemin, offre, marque blanche, qui je suis, FAQ, CTA final, pied de page) |
| `styles.css` | Styles : jetons de couleur dans `:root`, `@font-face` Inter, animations, responsive, `prefers-reduced-motion`, pages légales et 404 |
| `main.js` | Veil d'ouverture, halo qui suit la souris, compteurs animés, widget de démo, accordéon FAQ, lien Calendly centralisé |
| `mentions-legales.html` | Mentions légales (obligatoires en France) |
| `politique-confidentialite.html` | Politique de confidentialité (RGPD) |
| `404.html` | Page introuvable (Vercel la sert automatiquement) |
| `assets/fonts/inter.woff2` | Inter variable (400–800, sous-ensemble latin) auto-hébergée, licence OFL jointe |
| `assets/vocalflow-logo*.png/webp` | Logo recadré au pixel près : 240 px (nav, veil, pied de page, en WebP + PNG) et 1600 px (JSON-LD, génération des icônes) |
| `assets/portrait*.webp/jpg` | Photo de Yassir (extraite de la maquette), 410 / 650 / 720 px |
| `assets/og.jpg` | Aperçu 1200×630 pour LinkedIn / WhatsApp |
| `assets/icons/`, `favicon.ico`, `site.webmanifest` | Favicon multi-tailles, icônes 192/512, apple-touch-icon |
| `vercel.json` | `cleanUrls`, en-têtes de sécurité (CSP, HSTS, Permissions-Policy…), cache des assets |
| `.vercelignore` | Exclut du déploiement `design-source/`, ce README et les fichiers Git |
| `robots.txt`, `sitemap.xml` | Indexation (domaine `vocal-flow.fr`, voir « Domaine ») |
| `design-source/` | Bundle Claude Design d'origine — référence, non déployée (voir son README) |

Tous les chemins sont absolus (`/styles.css`, `/assets/…`) : les pages fonctionnent à la racine comme en URL propre.

## Prévisualiser en local

Les chemins étant absolus, ouvrir `index.html` en double-clic ne charge pas les styles : il faut un petit serveur HTTP à la racine.

```bash
npx --yes serve .            # http://localhost:3000 — gère aussi les URL propres (/mentions-legales)
# ou
python -m http.server 8000   # http://localhost:8000 — utiliser /mentions-legales.html
```

## Mettre en ligne (GitHub → Vercel)

> ⚠️ Ce dossier est dans OneDrive. Git + OneDrive cohabitent mal (fichiers verrouillés, conflits de synchro sur `.git`).
> Recommandé : copier le projet **hors** de OneDrive avant de travailler avec Git, ou exclure le dossier de la synchro.

Dépôt GitHub : **https://github.com/Yassir-IA/Landing_vocalflow** (branche `main`, remote `origin`).

```bash
git add -A
git commit -m "Description du changement"
git push
```

Sur [vercel.com](https://vercel.com) → **Add New… → Project** → importer le dépôt `Yassir-IA/Landing_vocalflow`.
Framework Preset : **Other**, aucune commande de build, Output Directory vide (racine). Déployer.
Chaque `git push` sur `main` redéploie automatiquement ; chaque branche/PR a son URL de prévisualisation.

Ancienne landing (à remplacer par ce dépôt sur Vercel) : `github.com/Yassir-IA/Vocalflow_landing`.

Après le premier déploiement, vérifier (Git Bash) :

```bash
curl -sI https://<domaine>/ | grep -i content-security-policy        # attendu : la CSP de vercel.json
curl -sI https://<domaine>/assets/fonts/inter.woff2 | grep -i cache   # attendu : max-age=31536000, immutable
curl -sI https://<domaine>/mentions-legales | head -1                 # attendu : HTTP/2 200 (cleanUrls)
```

## Domaine

Les URLs absolues supposent **https://vocal-flow.fr** (déduit de l'adresse `contact@vocal-flow.fr` — **à confirmer**).
Si le domaine est différent : remplacer `vocal-flow.fr` dans `index.html` (canonical, `og:url`, `og:image`, JSON-LD),
`mentions-legales.html`, `politique-confidentialite.html` (canonical), `robots.txt` et `sitemap.xml`.

```bash
grep -rl "vocal-flow.fr" --include=*.html --include=*.txt --include=*.xml .
```

Dans Vercel : *Settings → Domains* → ajouter le domaine ; Vercel gère HTTPS et la redirection www/apex.
Pour rediriger l'URL `*.vercel.app` vers le domaine, ajouter dans `vercel.json` :

```json
"redirects": [
  { "source": "/(.*)", "has": [{ "type": "host", "value": "<projet>.vercel.app" }],
    "destination": "https://vocal-flow.fr/$1", "permanent": true }
]
```

## À personnaliser

- **Lien de réservation** : `CALENDLY_URL` dans `main.js` (`https://calendly.com/contact-vocal-flow/audit-ia-vocale`). Dans la maquette, les boutons « Réserver mon diagnostic » de la nav, du hero et de l'offre mènent à la section finale `#diagnostic` ; seul le bouton de cette section ouvre Calendly (nouvel onglet). Le `<a data-calendly>` a aussi l'URL en dur, pour fonctionner sans JS.
- **Widget de démo** (section « La preuve, en direct ») : iframe `app.vocal-flow.fr/agent-test-public?token=…&agentId=…`, chargée uniquement au clic sur « Tester l'IA en direct ». Le cadre ne montre que le bouton d'appel : hauteurs dans `styles.css` (`--widget-window: 89px`, `--widget-offset: 409px`, `--widget-height: 630px`, valeurs de la maquette). Si l'interface du widget change, ajuster `--widget-offset`. `WIDGET_AUTO_EXPAND` (`main.js`) agrandit le cadre au démarrage de l'appel (désactivé, comme la maquette).
- **Bouton « Devenir partenaire »** (marque blanche) : la maquette n'avait pas de cible ; il ouvre un e-mail vers `contact@vocal-flow.fr` avec l'objet pré-rempli (`data-partner` dans `index.html`).
- **Compteurs** : `data-count` / `data-prefix` / `data-suffix` sur les `.stat__num` d'`index.html` (100 000 appels, 75 %).
- **Photo** : `assets/portrait*.webp/jpg`. Pour la remplacer : mêmes noms de fichiers ou renommer et mettre à jour le `<picture>` (les assets sont mis en cache 30 jours).
- **Durée de l'intro** : veil `1.85s` (`.veil`), nav à `1.55s`, hero de `0.88s` à `1.36s` (`.rise` dans `styles.css`). Mouvement réduit activé sur le système : pas de veil ni de halo, entrées en fondu seul.
- **Identité légale** (SIRET, adresse, TVA) : `mentions-legales.html` et `politique-confidentialite.html`.
- **Logo** : la maquette affiche un PNG 400 × 400 dont le glyphe occupe 54,5 % de la hauteur ; le site utilise un PNG recadré,
  donc les hauteurs CSS valent 0,545 × celles de la maquette (74 → 40 px dans le veil, 38 → 21 px dans la nav, 24 → 13 px au pied de page).

## Écarts assumés avec la maquette

Vérifiés par une revue croisée (fidélité, JS, responsive, accessibilité, sécurité, performance) ; tout le reste est au pixel sur desktop.

- **Responsive** : la maquette est desktop uniquement ; en dessous de 1200 px les grilles se replient, les titres sont équilibrés
  (`text-wrap: balance`), la nav devient compacte, et sous 480 px le widget de démo est affiché en entier (son recadrage n'est fiable
  qu'à partir de 360 px de large).
- **CTA de l'offre** : la maquette ne renforce pas son ombre au survol, contrairement aux deux autres CTA identiques ; le site garde
  le même survol pour les trois (incohérence de maquette, un ajout de `.offer .btn--primary:hover { box-shadow: var(--shadow-btn); }` la rétablirait).
- **Contraste** : les gris de la maquette `#77748f` / `#6d6a85` (petits textes secondaires) et le blanc sur le dégradé des boutons
  sont sous le seuil AA 4,5:1. Conservés par fidélité ; alternatives testées : `--muted-3: #8a87a3`, `--muted-4: #807d9a`,
  `--grad-btn: linear-gradient(93deg, #3d6fe6, #6f3fe0)`.
- **Accessibilité ajoutée** : focus déplacé à la révélation de la démo, annonce « En ligne maintenant » (`role="status"`),
  mention « s'ouvre dans un nouvel onglet » lue par les lecteurs d'écran sur le CTA Calendly, `role="list"` sur les listes stylées.

## Sécurité / vie privée

- La CSP de `vercel.json` n'autorise que le site lui-même + les iframes `app.vocal-flow.fr` (widget de démo) et `calendly.com`.
  **Tout nouveau script, police ou iframe externe** (analytics, vidéo, chat…) doit y être ajouté, sinon il sera bloqué silencieusement.
  Pas de style inline dans le HTML (`style-src 'self'`) : les styles dynamiques passent par des classes ou `element.style` en JS.
- `Permissions-Policy` refuse caméra, géolocalisation, paiement et USB ; le micro est délégué uniquement à `app.vocal-flow.fr` (nécessaire pour parler à l'agent).
- HSTS est envoyé sans `preload` : ce jeton engage tout le domaine et ses sous-domaines de façon quasi irréversible. À ajouter
  seulement après confirmation du domaine et inscription volontaire sur hstspreload.org.
- Inter est servie depuis le site (plus d'appel à Google Fonts → RGPD).
- Le widget de démo et l'iframe Calendly posent leurs propres cookies : mentionné dans la politique de confidentialité.
- Vercel Web Analytics (sans cookie) est compatible avec la CSP actuelle ; la politique de confidentialité le mentionne déjà.
