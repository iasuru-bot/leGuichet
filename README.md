# LeGuichet Frontend

## Description
LeGuichet est une application frontend développée avec Expo et React Native. Cette application permet aux utilisateurs de naviguer et d'interagir avec les annonces, les catégories, et les utilisateurs gérés par l'API backend Mon Annonce.

## Prérequis
- Node.js
- Expo CLI

## Installation

### Cloner le projet
```bash
git clone <URL> LeGuichet && cd LeGuichet
```

### Installer les dépendances
```bash
npm install
```

### Démarrer l'application
```bash
npx expo start
```
### Modifier l'url du back dans Other.ts
```bash
export const endpoint = "https://1ba2-2-12-123-124.ngrok-free.app";
```

Dans la sortie, vous trouverez des options pour ouvrir l'application dans un :

- [build de développement](https://docs.expo.dev/develop/development-builds/introduction/)
- [émulateur Android](https://docs.expo.dev/workflow/android-studio-emulator/)
- [simulateur iOS](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), un bac à sable limité pour essayer le développement d'applications avec Expo

Vous pouvez commencer à développer en éditant les fichiers à l'intérieur du répertoire **app**. Ce projet utilise le [routage basé sur les fichiers](https://docs.expo.dev/router/introduction).

## Structure du projet
```
LeGuichet/
├── .gitignore
├── app/
│   ├── HomePage.tsx
│   ├── LandingPage.tsx
│   ├── AnnoncePage.tsx
│   ├── ReportPage.tsx
│   ├── CreateAnnonce.tsx
│   ├── ProfileScreen.tsx
│   ├── SignUpPage.tsx
│   ├── LoginForm.tsx
│   ├── RequestPasswordResetForm.tsx
│   ├── ResetPasswordForm.tsx
│   ├── AdminHomePage.tsx
│   ├── AdminUsersPage.tsx
│   ├── AdminReportsPage.tsx
│   ├── AdminProfilePage.tsx
│   ├── _layout.tsx
│   └── index.tsx
├── components/
│   ├── Annonce.tsx
│   ├── Card.tsx
│   ├── CardList.tsx
│   ├── ReportForm.tsx
│   ├── ReportItem.tsx
│   ├── ReportList.tsx
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── InputMultiligne.tsx
│   ├── CustomBackButton.tsx
│   ├── CustomReportButton.tsx
│   ├── Navbar.tsx
│   ├── AdminNavbar.tsx
│   └── Loader.tsx
├── hooks/
│   ├── useThemeColor.ts
│   ├── fetchData.ts
│   └── useColorScheme.ts
├── assets/
│   ├── images/
│   │   └── logo.png
├── .gitignore
├── app.json
├── package.json
└── README.md
```

## Modes d'utilisation

### Mode Administrateur
Pour accéder au mode administrateur, vous devez vous connecter avec un compte administrateur. Une fois connecté en tant qu'administrateur, vous aurez accès à des fonctionnalités supplémentaires telles que :
- Gestion des utilisateurs : visualiser, modifier et supprimer des utilisateurs.
- Gestion des signalements : visualiser, traiter et supprimer des signalements.
- Gestion des annonces : visualiser, approuver ou rejeter des annonces.

### Mode Utilisateur
En mode utilisateur, vous pouvez :
- Parcourir les annonces disponibles.
- Rechercher des annonces par catégorie ou mots-clés.
- Visualiser les détails des annonces.
- Créer une annonce
- Interaction avec d'autres utilisateurs


## En savoir plus

Pour en savoir plus sur le développement de votre projet avec Expo, consultez les ressources suivantes :

- [Documentation Expo](https://docs.expo.dev/): Apprenez les fondamentaux, ou explorez des sujets avancés avec nos [guides](https://docs.expo.dev/guides).
- [Tutoriel Expo](https://docs.expo.dev/tutorial/introduction/): Suivez un tutoriel étape par étape où vous créerez un projet qui fonctionne sur Android, iOS et le web.

