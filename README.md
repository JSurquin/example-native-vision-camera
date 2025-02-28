# Application React Native avec Vision Camera 📸

Cette application utilise React Native avec la bibliothèque `react-native-vision-camera` pour accéder aux fonctionnalités avancées de la caméra. En raison des besoins spécifiques de cette bibliothèque, nous avons quitté le workflow Expo classique pour utiliser un prebuild.

## Prérequis 📋

- Node.js (version 14 ou supérieure)
- Xcode (pour iOS)
- Android Studio (pour Android)
- CocoaPods (pour iOS)

## Configuration initiale 🚀

1. Installer les dépendances :

```bash
npm install
```

2. Installer les pods pour iOS :

```bash
cd ios && pod install && cd ..
```

## Lancement de l'application 🎯

### iOS

```bash
npm run ios
```

### Android

```bash
npm run android
```

## À propos du Prebuild Expo 🔄

Cette application a été initialement créée avec Expo mais a été "prebuilt" pour supporter react-native-vision-camera. Le prebuild était nécessaire car :

- `react-native-vision-camera` nécessite un accès natif aux API de la caméra
- Les fonctionnalités avancées de la caméra ne sont pas disponibles dans Expo Go
- Nous avons besoin d'un contrôle plus précis sur les configurations natives

## Structure du Projet 📁

- `/app` - Contient les composants et la logique de l'application
- `/ios` - Configuration native iOS
- `/android` - Configuration native Android

## Permissions 🔐

L'application nécessite les permissions suivantes :

- Accès à la caméra
- Accès au microphone

Ces permissions sont gérées automatiquement dans le code, mais doivent être acceptées par l'utilisateur lors du premier lancement.

Elles peuvent être gérées dans le fichier `app.json` !! Votre tête de projet !!

## Développement 💻

Pour modifier l'application, vous pouvez éditer les fichiers dans le dossier `/app`. Les principaux fichiers sont :

- `app/(tabs)/camera.tsx` - Composant principal de la caméra
- Autres composants et configurations...

## Notes importantes ⚠️

- Cette application ne peut plus être exécutée dans Expo Go !!
- Toutes les modifications natives nécessitent une recompilation de l'application !!
- Assurez-vous d'avoir les dernières versions des SDK iOS et Android installées !!

## Support et Ressources 📚

- [Documentation React Native Vision Camera](https://mrousavy.com/react-native-vision-camera/)
- [Documentation React Native](https://reactnative.dev/)
- [Guide de développement natif avec Expo](https://docs.expo.dev/workflow/customizing/)
