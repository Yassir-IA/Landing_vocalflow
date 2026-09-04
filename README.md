# Landing — VocalFlow

Site statique (HTML / CSS / JS vanilla, **zéro build**) destiné à implémenter la maquette Claude Design
`design-source/Landing VocalFlow.dc.html`. Prêt pour GitHub + Vercel.

> **État actuel : socle prêt, landing en attente de la maquette.**
> La maquette n'a pas pu être importée depuis Claude Design (autorisation absente dans la session).
> Voir [`design-source/README.md`](design-source/README.md) pour la récupérer. En attendant, `index.html`
> est une page d'accueil provisoire (`noindex`) reprenant logo, promesse et lien de réservation.

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Page d'accueil — **provisoire**, à remplacer par l'implémentation de la maquette |
| `styles.css` | Jetons de couleur (variables CSS), boutons, nav, pied de page, pages légales, 404. Les jetons de `:root` seront alignés sur la maquette |
| `main.js` | Lien Calendly centralisé (`CALENDLY_URL`) ; accueillera les comportements de la landing (FAQ, animations…) |
| `mentions-legales.html` | Mentions légales (obligatoires en France) — identité de l'éditeur reprise de l'ancienne landing |
| `politique-confidentialite.html` | Politique de confidentialité (RGPD) — reprise de l'ancienne landing |
| `404.html` | Page introuvable (Vercel la sert automatiquement) |
| `assets/vocalflow-logo.png` / `.webp` | Logo (1600 px, fond transparent) — chemin référencé par la maquette |
| `assets/vocalflow-logo-480.*` | Logo réduit pour la nav et le pied de page |
| `assets/og.jpg` | Aperçu 1200×630 pour LinkedIn / WhatsApp (logo sur fond bleu nuit) |
| `assets/icons/`, `favicon.ico`, `site.webmanifest` | Favicon multi-tailles, icônes 192/512, apple-touch-icon |
| `vercel.json` | `cleanUrls`, en-têtes de sécurité (CSP, HSTS, nosniff…), cache des assets |
| `.vercelignore` | Exclut du déploiement `design-source/`, ce README et les fichiers Git |
| `robots.txt`, `sitemap.xml` | Indexation (domaine `vocal-flow.fr`, voir « Domaine ») |
| `design-source/` | Maquette d'origine + runtime `support.js` — référence, non déployée |

Tous les chemins sont absolus (`/styles.css`, `/assets/…`) : les pages fonctionnent aussi bien à la racine
qu'en URL propre (`/mentions-legales`).

## Mettre en ligne (GitHub → Vercel)

> ⚠️ Ce dossier est dans OneDrive. Git + OneDrive cohabitent mal (fichiers verrouillés, conflits de synchro sur `.git`).
> Recommandé : copier le projet **hors** de OneDrive avant de travailler avec Git, ou exclure le dossier de la synchro.

Le dépôt Git est déjà initialisé (branche `main`, premier commit fait). Il reste à créer le dépôt distant :

```bash
# Option A — avec le CLI GitHub (à installer : https://cli.github.com)
gh repo create vocalflow-landing --private --source=. --push

# Option B — sans CLI : créer un dépôt vide sur github.com, puis
git remote add origin https://github.com/<compte>/vocalflow-landing.git
git push -u origin main
```

Puis sur [vercel.com](https://vercel.com) → **Add New… → Project** → importer le dépôt GitHub.
Framework Preset : **Other**, aucune commande de build, Output Directory vide (racine). Déployer.
Chaque `git push` sur `main` redéploie automatiquement ; chaque branche/PR a son URL de prévisualisation.

Ancienne landing (à remplacer par ce dépôt sur Vercel) : `github.com/Yassir-IA/Vocalflow_landing`.

Après le premier déploiement, vérifier (Git Bash) :

```bash
curl -sI https://<domaine>/ | grep -i content-security-policy        # attendu : la CSP de vercel.json
curl -sI https://<domaine>/assets/og.jpg | grep -i cache-control      # attendu : max-age=2592000
curl -sI https://<domaine>/mentions-legales | head -1                 # attendu : HTTP/2 200 (cleanUrls)
```

## Prévisualiser en local

Les chemins étant absolus (`/styles.css`), ouvrir `index.html` en double-clic ne charge pas les styles :
il faut un petit serveur HTTP à la racine du projet.

```bash
# Node (déjà installé)
npx --yes serve .            # http://localhost:3000 — gère aussi les URL propres (/mentions-legales)

# ou Python
python -m http.server 8000   # http://localhost:8000 — utiliser /mentions-legales.html
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

- **Lien de réservation** : `CALENDLY_URL` dans `main.js` (`https://calendly.com/contact-vocal-flow/audit-ia-vocale`, repris de l'ancienne landing). Les `<a data-calendly>` ont aussi l'URL en dur, pour fonctionner sans JS.
- **Numéro de démonstration** : `+33 1 89 31 60 89` (repris de l'ancienne landing) dans `index.html`.
- **Identité légale** (SIRET, adresse, TVA) : `mentions-legales.html` et `politique-confidentialite.html`.
- **Remplacer une image** (`assets/`) : renommer le fichier (les assets sont mis en cache 30 jours, les polices 1 an).

## Sécurité / vie privée

- La CSP de `vercel.json` n'autorise que le site lui-même + les iframes Calendly. **Tout nouveau script, police
  ou iframe externe** (Google Fonts, vidéo Gumlet/YouTube, webhook n8n, chat…) doit y être ajouté, sinon il sera bloqué
  silencieusement. Préférer les polices auto-hébergées dans `assets/fonts/` (RGPD, pas d'appel à Google).
- Vercel Web Analytics (sans cookie) est compatible avec la CSP actuelle (`script-src 'self'` / `connect-src 'self'`) ;
  la politique de confidentialité le mentionne déjà.
- Les iframes Calendly posent leurs propres cookies : mentionné dans la politique de confidentialité.

## Prochaine étape

1. Récupérer `Landing VocalFlow.dc.html` (+ `image-slot.js`) dans `design-source/` — voir `design-source/README.md`.
2. Implémenter la maquette dans `index.html` / `styles.css` / `main.js`, retirer la balise `noindex` d'`index.html`,
   aligner les jetons de `:root`, ajouter les polices dans `assets/fonts/` et compléter la CSP si besoin.
