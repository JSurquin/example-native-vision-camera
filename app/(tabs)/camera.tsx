// Importation des hooks React nécessaires et des composants React Native
import { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, ScrollView, Alert } from "react-native";
// Importation des composants et types de react-native-vision-camera
import {
  Camera,
  useCameraDevices,
  useCameraDevice,
  PhotoFile,
} from "react-native-vision-camera";
import { CameraPermissionStatus } from "react-native-vision-camera";

// Composant principal de la page caméra
const Page = () => {
  // Récupération des périphériques de caméra disponibles
  const devices = useCameraDevices();
  // Sélection spécifique de la caméra arrière
  const device = useCameraDevice("back");
  // Référence vers l'instance de la caméra
  const camera = useRef<Camera>(null);
  // État pour gérer le statut des permissions
  const [permission, setPermission] = useState<CameraPermissionStatus | null>(
    null
  );
  // État pour stocker la photo capturée
  const [photoFile, setPhotoFile] = useState<PhotoFile | null>(null);

  // Vérification des permissions au montage du composant
  useEffect(() => {
    checkPermissions();
  }, []);

  // Fonction asynchrone pour vérifier et demander les permissions nécessaires
  const checkPermissions = async () => {
    try {
      // Demande des permissions pour la caméra et le microphone
      const cameraPermission = await Camera.requestCameraPermission();
      const microphonePermission = await Camera.requestMicrophonePermission();

      // Vérification si les deux permissions sont accordées
      if (
        cameraPermission === "granted" &&
        microphonePermission === "granted"
      ) {
        setPermission("granted");
      } else {
        // Affichage d'une alerte si les permissions ne sont pas accordées
        Alert.alert(
          "Permission requise",
          "L'application nécessite l'accès à la caméra et au microphone",
          [{ text: "OK", onPress: () => checkPermissions() }]
        );
      }
    } catch (error) {
      console.error("Erreur de permission:", error);
    }
  };

  // Fonction pour gérer la capture de photo
  const handleCapture = async () => {
    if (camera.current) {
      try {
        // Capture de la photo avec flash activé
        const photo = await camera.current.takePhoto({
          flash: "on",
        });
        // Mise à jour de l'état avec la nouvelle photo
        setPhotoFile(photo);
        console.log("Photo prise:", photo.path);
        // Note: Emplacement pour ajouter la logique de traitement de la photo
      } catch (error) {
        console.error("Erreur lors de la capture:", error);
        Alert.alert("Erreur", "Impossible de prendre la photo");
      }
    }
  };

  // Rendu conditionnel si les permissions ne sont pas accordées
  if (!permission || permission !== "granted") {
    return <Text>Autorisation requise pour accéder à la caméra</Text>;
  }

  // Rendu conditionnel si aucun périphérique de caméra n'est disponible
  if (!device) {
    return <Text>Pas de caméra disponible</Text>;
  }

  // Rendu principal du composant caméra
  return (
    <ScrollView style={styles.container}>
      {/* Composant Caméra avec ses propriétés configurées */}
      <Camera
        ref={camera}
        device={device}
        isActive={true}
        photo={true}
        style={styles.camera}
      />
      {/* Bouton de capture avec émoji appareil photo */}
      <TouchableOpacity onPress={handleCapture} style={styles.captureButton}>
        <Text style={styles.captureText}>📸</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Styles pour le composant
const styles = {
  // Style du conteneur principal
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  // Style du composant caméra
  camera: {
    flex: 1,
    aspectRatio: 3 / 4,
    width: "100%" as const,
  },
  // Style du bouton de capture
  captureButton: {
    position: "absolute" as const,
    bottom: "5%" as const,
    left: "50%" as const,
    transform: [{ translateX: -30 }], // Centrage horizontal du bouton
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 20,
    borderRadius: 50,
    // Propriétés d'ombre pour un effet de profondeur
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  // Style du texte du bouton de capture
  captureText: {
    fontSize: 24,
  },
};

// Exportation du composant
export default Page;
