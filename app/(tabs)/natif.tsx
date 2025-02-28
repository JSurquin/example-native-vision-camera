import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from "react-native";
import Airplay from "@/modules/airplay";

export default function NativeScreen() {
  const [isAirplayEnabled, setIsAirplayEnabled] = useState(false);
  const [isChromecastEnabled, setIsChromecastEnabled] = useState(false);

  useEffect(() => {
    const checkAirplayStatus = async () => {
      if (Platform.OS === "ios") {
        const available = await Airplay.isAirplayAvailable();
        setIsAirplayEnabled(available);
      } else if (Platform.OS === "android") {
        const available = await Airplay.isChromecastAvailable();
        setIsChromecastEnabled(available);
      }
    };

    checkAirplayStatus();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {Platform.OS === "ios" && (
          <View>
            {isAirplayEnabled ? (
              <TouchableOpacity
                style={styles.button}
                onPress={() => Airplay.startAirplay()}
              >
                <Text style={styles.buttonText}>Démarrer Airplay</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.message}>Airplay n'est pas disponible</Text>
            )}
          </View>
        )}

        {Platform.OS === "android" && (
          <View>
            {isChromecastEnabled ? (
              <TouchableOpacity
                style={styles.button}
                onPress={() => Airplay.startChromecast("media_url_here")}
              >
                <Text style={styles.buttonText}>Démarrer Chromecast</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.message}>
                Chromecast n'est pas disponible
              </Text>
            )}
          </View>
        )}

        {Platform.OS === "web" && (
          <Text style={styles.message}>Non disponible sur le web</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  button: {
    backgroundColor: "#4ECDC4",
    padding: 15,
    borderRadius: 10,
    minWidth: 200,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  message: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});
