# Cours enfants

Applis d'apprentissage pour les enfants, selon le programme sénégalais (Curriculum de l'Éducation de Base). Chaque appli s'installe sur le téléphone depuis Chrome et apparaît dans le menu des applis.

| Appli | Classe | État |
|---|---|---|
| `gs/` | Grande Section | Palier 1 : aventure à travers le Sénégal (Parler et lire, Compter, Découvrir) |
| `ci/` | Cours d'Initiation | Palier 1 : aventure à travers le Sénégal (Lire, Compter, Découvrir) |
| `ce2/` | CE2 | Palier 1 : carrière de footballeur (Français, Maths, Foot, Découvrir) |

Chaque appli est un jeu : une carte d'étapes, un mini-jeu par étape (pêche ou passes, ballons ou jongles, course de pirogues ou contre-attaque), un boss en fin de palier, des pièces pour la boutique du personnage, un album à compléter et une flamme des jours de suite.

Chaque appli a un espace parent (cadenas en haut à droite, code par défaut 1234) avec les progrès, l'historique, le temps passé et les réglages. Le temps d'écran se règle avec Google Family Link.

## Modifier les applis

Les trois applis partagent le même moteur de jeu et le même design (`source/modele.html`). Le contenu de chaque classe est dans `source/contenu-<classe>.js` ; un `habillage` dans ce fichier peut changer le voyage, les jeux et les récompenses (c'est le cas du football au CE2).

```
python3 source/construire.py   # fabrique ci/, gs/, ce2/
node source/icones.js          # redessine les icônes (si l'avatar ou la couleur change)
```

La progression des enfants est gardée sur leur téléphone.
