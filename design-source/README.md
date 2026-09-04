# design-source/ — maquette Claude Design (référence, non déployée)

Ce dossier contient la maquette d'origine et son runtime de prévisualisation. Il est exclu du déploiement
Vercel par `.vercelignore` mais conservé dans Git.

## Fichiers attendus

| Fichier | Rôle | État |
|---|---|---|
| `Landing VocalFlow.dc.html` | La maquette Claude Design à implémenter | **manquant : à récupérer** (voir ci-dessous) |
| `support.js` | Runtime Claude Design (`dc-runtime`) : rend le `.dc.html` dans un navigateur | présent (copie du projet Landing Yassir Larabi ; remplacer par la version du projet VocalFlow si elle diffère) |
| `image-slot.js` | Helper Claude Design pour les emplacements d'images | manquant |
| `assets/vocalflow-logo.png` | Logo référencé par la maquette | présent à la racine du site (`/assets/vocalflow-logo.png`) |

## Récupérer la maquette

Projet Claude Design : https://claude.ai/design/p/abb2c831-3675-422e-83d5-17e1c4adf299?file=Landing+VocalFlow.dc.html

Deux façons :

1. **Autoriser Claude Code** (une seule fois, depuis une session interactive sur ce PC) : lancer `/design-login`,
   puis relancer la demande d'implémentation. Les sessions suivantes (y compris non interactives) réutilisent l'autorisation.
2. **Copier les fichiers à la main** : dans Claude Design, exporter / télécharger `Landing VocalFlow.dc.html`,
   `image-slot.js` et `support.js`, et les déposer dans ce dossier.

## Prévisualiser la maquette en local

```bash
# Depuis la racine du projet (Node ≥ 18)
npx --yes serve design-source
# puis ouvrir http://localhost:3000/Landing%20VocalFlow.dc.html
```

Le `.dc.html` charge `./support.js` et attend `React`/`ReactDOM` globaux : le runtime les injecte lui-même
lorsqu'il est servi par HTTP (pas en `file://`).
