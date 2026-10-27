# BusDirect

Application web pour gérer les réservations de places d'un autocar sur la ligne **Safi → Marrakech** (20 places).

J'ai réalisé ce projet avec HTML, Tailwind CSS et JavaScript.

## Liens

- Site en ligne : https://bus-direct-iota.vercel.app/
- Dépôt GitHub : https://github.com/yassinedafali/Bus-Direct

## Ce que fait l'application

- Afficher les 20 sièges (libre en blanc, occupé en rouge)
- Réserver une place avec le nom du passager
- Choisir un siège dans la liste, sinon le premier siège libre est pris automatiquement
- Modifier le nom et/ou le siège d'un passager
- Annuler une réservation (le siège redevient libre)
- Vérifier que le nom est obligatoire et qu'il n'y a pas de doublon
- Afficher un message qui disparaît après 3 secondes
- Calculer les places disponibles et la recette (80 DH par place)
- Garder les données après l'actualisation avec localStorage
- Page Billets : liste des passagers avec leur siège et le tarif
- Cliquer directement sur un siège pour le sélectionner dans le formulaire
- Affichage adapté au mobile, à la tablette et au desktop

## Technologies

HTML5, Tailwind CSS, JavaScript, Font Awesome, Git et GitHub, Vercel

## Structure du projet

```
Bus-Direct/
├── index.html        page des réservations
├── billetes.html     page des billets
├── js/
│   ├── file.js       logique de la page des réservations
│   └── billets.js    affichage de la liste des billets
├── img/
│   └── logo.jpg
└── README.md
```

## Comment j'ai organisé mon code

Toutes les données sont dans un tableau `seats` de 20 éléments :

```js
{ number: 5, passenger: null }   // siège libre
{ number: 5, passenger: "Ali" }  // siège occupé
```

Quand je réserve, modifie ou annule, je change le tableau, puis la fonction `render()` affiche de nouveau les sièges, les listes et les chiffres, et enregistre dans localStorage.

## Lancer le projet

1. Cloner le dépôt :
   ```bash
   git clone https://github.com/yassinedafali/Bus-Direct.git
   ```
2. Ouvrir le dossier dans VS Code
3. Lancer `index.html` avec Live Server

## Planification des tâches

| Étape | Travail | État |
|---|---|---|
| 1 | Dépôt Git, structure HTML et Tailwind (en-tête, légende, grille des sièges, 3 formulaires) | Terminé |
| 2 | Sélection du DOM, listes déroulantes, compteurs, recette, réservation (siège choisi ou automatique) | Terminé |
| 3 | Modifier, annuler, validation (nom obligatoire, pas de doublon), messages de 3 secondes | Terminé |
| 4 | Sauvegarde avec localStorage | Terminé |
| 4 | Responsive (mobile, tablette, desktop) et tests des cas d'erreur | Terminé |
| 5 | Bonus : page Billets, clic direct sur un siège | Terminé |
| 5 | Bonus non réalisés : Drag & Drop, recherche de passager, mini ticket | Non réalisé |

## Tests effectués

- Nom vide : message d'erreur
- Nom déjà utilisé : message d'erreur
- Bus complet (20 réservations) : message d'erreur
- Annulation d'un passager inexistant : message d'erreur
- Actualisation de la page : les données sont conservées
- Affichage testé en 375 px, 768 px, 1024 px et 1280 px

## Auteur

Yassine Dafali