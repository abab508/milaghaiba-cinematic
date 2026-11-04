# Milaghaiba Cinematic — La Lumière des Hadiths

Nouvelle interface distincte de l'ancien site Milaghaiba.

## État du développement (4 novembre 2026)

- Accueil panoramique inspiré de la **première vignette** de la référence utilisateur.
- Ciel, lune, nuages et lanterne en calques d'images distincts, avec animations CSS et option de réduction des effets.
- Contenus FR / EN / AR, avec sens RTL pour l'arabe.
- Navigation accueil → thèmes.
- Neuf thèmes ; les huit premières cartes réemploient les illustrations locales déjà présentes dans `public/assets/chapters/`, la neuvième utilise provisoirement le fond.
- Recherche locale parmi les titres des thèmes.
- Ambiance sonore synthétique activable manuellement (pas encore un véritable son de lanterne ou de paysage).
- Contrôle de build via GitHub Actions.

## Démarrage

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```

## Réserves importantes

**La correspondance pixel par pixel avec l'image de référence n'est pas encore validée.** Les illustrations originales ne sont pas toutes découpées en véritables calques propres, certaines commandes de navigation détaillée restent des prototypes, les hadiths et leurs sources ne sont pas encore branchés.

Le dépôt historique Milaghaiba n'a pas été modifié. Le code de l'ancienne interface du dépôt *cinematic* a été remplacé sur `main` ; les ressources graphiques existantes ont été préservées pour éviter leur perte.

## Étapes suivantes

1. Prévisualisation navigateur réelle, comparaison avec la référence desktop et mobile.
2. Reconstruction fidèle des lanternes, du logo et de la typographie.
3. Extraction / remplacement des calques visuels pour rendre les objets indépendants.
4. Connexion progressive aux thèmes, recueils, chapitres et hadiths vérifiés.
