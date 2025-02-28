import { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import {
  Camera,
  useCameraDevices,
  useCameraDevice,
  PhotoFile,
} from "react-native-vision-camera";
import { CameraPermissionStatus } from "react-native-vision-camera";

const Page = () => {
  const devices = useCameraDevices();
  const device = useCameraDevice("back");
  const camera = useRef<Camera>(null);
  const [permission, setPermission] = useState<CameraPermissionStatus | null>(
    null
  );
  const [photoFile, setPhotoFile] = useState<PhotoFile | null>(null);

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    try {
      const cameraPermission = await Camera.requestCameraPermission();
      const microphonePermission = await Camera.requestMicrophonePermission();

      if (
        cameraPermission === "granted" &&
        microphonePermission === "granted"
      ) {
        setPermission("granted");
      } else {
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

  const handleCapture = async () => {
    if (camera.current) {
      try {
        const photo = await camera.current.takePhoto({
          flash: "on",
        });
        setPhotoFile(photo);
        console.log("Photo prise:", photo.path);
        // Ici vous pouvez ajouter votre logique pour sauvegarder/traiter la photo
      } catch (error) {
        console.error("Erreur lors de la capture:", error);
        Alert.alert("Erreur", "Impossible de prendre la photo");
      }
    }
  };

  if (!permission || permission !== "granted") {
    return <Text>Autorisation requise pour accéder à la caméra</Text>;
  }

  if (!device) {
    return <Text>Pas de caméra disponible</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Camera
        ref={camera}
        device={device}
        isActive={true}
        photo={true}
        style={styles.camera}
      />
      <TouchableOpacity onPress={handleCapture} style={styles.captureButton}>
        <Text style={styles.captureText}>📸</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
    aspectRatio: 3 / 4,
    width: "100%" as const,
  },
  captureButton: {
    position: "absolute" as const,
    bottom: "5%" as const,
    left: "50%" as const,
    transform: [{ translateX: -30 }],
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 20,
    borderRadius: 50,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  captureText: {
    fontSize: 24,
  },
};

export default Page;
