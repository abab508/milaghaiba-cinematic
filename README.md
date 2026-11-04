# Milaghaiba Cinematic — refonte B, scènes indépendantes

Prototype React/Vite de **sept vues**, couvrant les six écrans de la maquette (accueil, thèmes, signes de la fin des temps, lecture, navigation des chapitres, index A–Z) et les recueils.

## Changements

- Les captures de maquette `/assets/reference/*` ne sont plus utilisées comme fonds.
- La totalité des titres, textes, boutons, onglets et zones cliquables est rendue par React.
- Les neuf cartes de thèmes utilisent huit ressources graphiques indépendantes **sans texte incrusté** ; halos non rectangulaires.
- Décors distincts `/assets/scenes/` sans texte ni boutons, mises en page responsive.
- FR / AR / EN, navigation, lecteur de livre démonstratif et contrôles d'animations / audio.
- Les hadiths et statistiques non vérifiés ne sont pas inventés.

## Qualité d'image — transparence

Les fonds actuels sont des **plaques provisoires 1920×1080 recomposées à partir d'une source utilisateur 1672×941**. Ce ne sont **pas** des photographies 4K natives. L'export 3840×2160 par simple interpolation serait trompeur. Pour une finition 4K cinéma, chaque plaque doit être remplacée par une création 3840×2160 réellement détaillée, sans incrustation de texte. Les cartes historiques ont elles aussi une résolution native plus modeste : conserver des tailles d'affichage adaptées ou remplacer leurs sources par des images HD.

## Lancement

```bash
npm install
npm run dev
npm run build
```

## Isolation

Projet exclusivement `abab508/milaghaiba-cinematic` ; `newhadith` ne doit pas être modifié.
