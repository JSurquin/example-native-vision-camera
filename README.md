# Application React Native avec Vision Camera et Modules Natifs 📸

Cette application utilise React Native avec la bibliothèque `react-native-vision-camera` et des modules natifs personnalisés pour accéder aux fonctionnalités avancées de la caméra et du casting d'écran. En raison des besoins spécifiques de ces fonctionnalités, nous avons quitté le workflow Expo classique pour utiliser un prebuild.

## Prérequis 📋

- Node.js (version 14 ou supérieure)
- Xcode (pour iOS)
- Android Studio (pour Android)
- CocoaPods (pour iOS)
- Un appareil compatible Airplay (pour iOS)
- Un appareil compatible Chromecast (pour Android)

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

## Fonctionnalités Natives 🔌

### Module de Casting

L'application inclut un module natif personnalisé pour la diffusion de contenu :

- **iOS** : Support Airplay

  - Vérification de la disponibilité d'Airplay
  - Lancement de la diffusion Airplay

- **Android** : Support Chromecast
  - Vérification de la disponibilité du Chromecast
  - Lancement de la diffusion Chromecast

Le code pour ces fonctionnalités se trouve dans `app/(tabs)/natif.tsx`.

## À propos du Prebuild Expo 🔄

Cette application a été initialement créée avec Expo mais a été "prebuilt" pour supporter :

- `react-native-vision-camera` pour l'accès aux API de la caméra
- Les modules natifs personnalisés pour Airplay/Chromecast
- D'autres fonctionnalités nécessitant un accès natif

## Structure du Projet 📁

- `/app` - Contient les composants et la logique de l'application
  - `/(tabs)/camera.tsx` - Composant principal de la caméra
  - `/(tabs)/natif.tsx` - Gestion des fonctionnalités natives (Airplay/Chromecast)
- `/ios` - Configuration native iOS
- `/android` - Configuration native Android
- `/modules` - Modules natifs personnalisés

## Permissions 🔐

L'application nécessite les permissions suivantes :

- Accès à la caméra
- Accès au microphone
- Accès au réseau local (pour Airplay/Chromecast)

Ces permissions sont gérées automatiquement dans le code, mais doivent être acceptées par l'utilisateur lors du premier lancement.

Elles peuvent être gérées dans le fichier `app.json` !! Votre tête de projet !!

## Développement 💻

Pour modifier l'application, vous pouvez éditer les fichiers dans le dossier `/app`. Les principaux fichiers sont :

- `app/(tabs)/camera.tsx` - Composant principal de la caméra
- `app/(tabs)/natif.tsx` - Gestion des fonctionnalités de casting
- Autres composants et configurations...

## Notes importantes ⚠️

- Cette application ne peut plus être exécutée dans Expo Go !!
- Toutes les modifications natives nécessitent une recompilation de l'application !!
- Assurez-vous d'avoir les dernières versions des SDK iOS et Android installées !!
- Pour tester Airplay/Chromecast, assurez-vous d'être sur le même réseau que les appareils de diffusion

## Support et Ressources 📚

- [Documentation React Native Vision Camera](https://mrousavy.com/react-native-vision-camera/)
- [Documentation React Native](https://reactnative.dev/)
- [Guide de développement natif avec Expo](https://docs.expo.dev/workflow/customizing/)
- [Documentation Airplay](https://developer.apple.com/documentation/avfoundation/airplay_2)
- [Documentation Google Cast](https://developers.google.com/cast)
