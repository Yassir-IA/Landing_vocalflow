# design-source/ — maquette Claude Design (référence, non déployée)

Ce dossier contient le bundle exporté depuis Claude Design. Il est exclu du déploiement Vercel par
`.vercelignore` mais conservé dans Git comme référence.

Projet Claude Design : https://claude.ai/design/p/abb2c831-3675-422e-83d5-17e1c4adf299?file=Landing+VocalFlow.dc.html

## Contenu du bundle `reproduction-design-agentia/`

| Chemin | Rôle |
|---|---|
| `project/Landing VocalFlow.dc.html` | **La maquette implémentée** (12 sections + script de comportement) |
| `project/support.js`, `project/image-slot.js` | Runtime Claude Design : rendent la maquette dans un navigateur |
| `project/assets/vocalflow-logo.png` | Logo utilisé par la maquette (400 × 400, glyphe centré) |
| `project/.image-slots.state.json` | Contenu des emplacements d'images (photo Yassir, en base64) → extraite dans `/assets/portrait.*` |
| `project/_ref/design-notes.md` | Notes de conception (palette, typographie, structure) |
| `project/_ref/archive/` | Version précédente de la maquette (copy placeholder Agentia), pour mémoire |
| `project/uploads/`, `project/.thumbnail`, `project/_ref/*.jpg` | Captures de référence et vignettes (non utilisées par la page) — présentes sur le disque mais **exclues de Git** (`.gitignore`, ≈ 6 Mo) |

## Prévisualiser la maquette en local

```bash
# Depuis la racine du projet (Node ≥ 18)
npx --yes serve "design-source/reproduction-design-agentia/project"
# puis ouvrir http://localhost:3000/Landing%20VocalFlow.dc.html
```

Le `.dc.html` charge `./support.js` et `./image-slot.js` ; ils doivent être servis par HTTP (pas en `file://`).

## Correspondance maquette → site

| Maquette | Site |
|---|---|
| `<helmet>` (title, meta, Google Fonts Inter) | `index.html` `<head>` ; Inter auto-hébergée dans `assets/fonts/` |
| Styles inline + `style-hover` | Classes dans `styles.css` (jetons dans `:root`) |
| Script `DCLogic` (veil, halo, compteurs, démo, FAQ) | `main.js` |
| Props `widgetOffset` / `widgetWindow` / `widgetHeight` / `widgetAutoExpand` | `--widget-offset` / `--widget-window` / `--widget-height` dans `styles.css`, `WIDGET_AUTO_EXPAND` dans `main.js` |
| `<image-slot id="photo-yassir">` | `<picture>` → `assets/portrait*.webp/jpg` |
| Liens `#top` du pied de page (placeholders) | `/mentions-legales`, `/politique-confidentialite` |
| Bouton « Devenir partenaire » (`#top`, placeholder) | `mailto:contact@vocal-flow.fr` (à remplacer par un formulaire ou une page si besoin) |
| CTA final « Réserver mon diagnostic » (`#diagnostic`, placeholder) | Lien Calendly (`CALENDLY_URL` dans `main.js`) |
