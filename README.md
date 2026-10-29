# Cours enfants

Applis d'apprentissage pour les enfants, selon le programme sénégalais (Curriculum de l'Éducation de Base). Chaque appli s'installe sur le téléphone depuis Chrome et apparaît dans le menu des applis.

| Appli | Classe | État |
|---|---|---|
| `ci/` | Cours d'Initiation | Palier 1 : Lire, Compter, Découvrir |
| `gs/` | Grande Section | À venir |
| `ce2/` | CE2 | À venir |

Chaque appli a un espace parent (cadenas en haut à droite, code par défaut 1234) avec les progrès, l'historique, le temps passé et les réglages. Le temps d'écran se règle avec Google Family Link.

## Modifier les applis

Les trois applis partagent le même moteur et le même design (`source/modele.html`). Le contenu de chaque classe est dans `source/contenu-<classe>.js`.

```
python3 source/construire.py   # fabrique ci/, gs/, ce2/
node source/icones.js          # redessine les icônes (si l'avatar ou la couleur change)
```

La progression des enfants est gardée sur leur téléphone.
