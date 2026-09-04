# Notes design — recreation Agentia (agentia.limova.ai)

Réf: 13 captures dans uploads/ (1→13). Palette d'origine: brun très sombre + accents orange/ambre.
Palette appliquée ici (demande client): bleu/violet SaaS IA — base #0a0a1c, gradient #5b8cff→#8b5cf6, texte accent #a78bfa, gris corps #b8b6cf, Trustpilot #00b67a conservé.
Fonte: Inter 400–800, titres 800 tracking -0.02em.

## Structure (ordre exact de la page de réf)
1. Nav sticky blur: logo gauche, pill CTA "Réserver" droite.
2. Hero centré: pill Trustpilot (étoiles vertes) → 3 avatars ronds → "N agents IA à votre service" → H1 (span accent) → sous-texte → 2 CTA (gradient + sombre) → "DÉCOUVREZ NOS AGENTS ▾".
   Fond: grille fine + glows radiaux.
3. Équipe: eyebrow + H2, cartes agents accordéon (ouverte = bordure accent, avatar 74, tagline accent, desc, 3 ✓; fermées = compactes).
4. Presse: eyebrow "ILS PARLENT DE NOUS", marquee de cartes blanches (logos), fondu latéral. Puis duo CTA.
5. Collab: eyebrow + point vert, rangée logos (marque × partenaire), paragraphe, grande carte vidéo 16:9 avec play orange→violet. Duo CTA (variante outline).
6. Avis: H2, carte résumé Trustpilot, 2 rangées marquee sens opposés de cartes avis (étoiles + TRUSTPILOT, titre, « quote », auteur · rôle). Duo CTA.
7. Tarifs (#tarifs): H2 2 lignes (2e gradient), sous-texte, toggle Annuel -25%/Mensuel -10%, 3 cartes (centrale accent + CTA gradient; autres sombres), chip "7 JOURS GRATUITS", "Pour 5 utilisateurs", encart code promo, add-ons ✗ barrés/✓, libellé "CE QUI EST INCLUS/TOUT LE PLAN X ET :", features ✓.
8. Étapes: eyebrow, H2 "… : 3 étapes.", 3 cartes (badge rond gradient 01 + numéro fantôme), connecteurs fins; carte stats 3 compteurs animés (count-up au scroll). Duo CTA.
9. FAQ: eyebrow, H2, accordéon (+ → ×).
10. CTA final (#demo): 2 colonnes — H2 gauche + sous-texte + 3 ✓; boutons à droite (outline + sombre).
11. Footer: petit logo + ©, lien Mentions légales.

## Fichier
Landing VocalFlow.dc.html — copy = PLACEHOLDER (agents Nova/Léo/Mia, avis génériques, prix 79/149€) en attente du copy réel du client (arrive au prochain message). Logo: assets/vocalflow-logo.png. Slots images: avatars (av-nova/leo/mia), presse press-1..5, partner-logo, video-poster.
Tweaks: showCollab, showPromos.
