# Milaghaiba Cinematic — Accueil Modèle 04

Nouvelle base **indépendante** de `abab508/newhadith`.

## Lancer

```bash
npm install
npm run dev
```

## Construction

- React 19 + Vite + Motion pour les transitions UI.
- `SceneLayers` : photographie architecturale conservée, fichiers transparents indépendants (`moon.png`, `lantern.png`, `clouds.png`, `stars.png`). Chaque calque est animé et peut être masqué sans masquer le fond.
- `ChapterCard` : huit images d'origine **sans texte**, huit médaillons séparés, titres et langues contrôlés par React, zone cliquable et effet transparent par thème.
- `SubthemePanel` : sous-thèmes réactifs et traduits FR / AR / EN.
- Audio activable manuellement, coupé par défaut, déclenché uniquement lorsque « Purification » est active.
- Contrôles d'affichage des calques et d'animation, `prefers-reduced-motion` respecté.

## Limites assumées de cette première version

Les calques transparents de lune, nuages et lanterne sont **extraits de la composition originale** et peuvent présenter des contours de détourage à peaufiner. Les étoiles et l'éclairage utilisent des effets légers; les objets comme l'eau, la balance ou les fleurs ne sont **pas encore de véritables rendus vidéo After Effects / 3D**. Ceux-ci seront fournis comme vidéos alpha dans une étape ultérieure, après validation de l'architecture.

Les cartes possèdent leurs propres contours dorés dans les images; aucun deuxième cadre n'est ajouté au repos. Pas d'anciennes pages importées et aucun hadith inventé. La navigation vers les chapitres complets est volontairement désactivée pour cette première version.

Cette branche ne crée ni ne modifie le service Render du site existant.
