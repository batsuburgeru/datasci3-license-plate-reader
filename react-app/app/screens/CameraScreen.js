import React, { useState, useEffect, useRef } from "react";
import { View, Text } from "react-native";
import { Camera } from "expo-camera";
import axios from "axios";
import Svg, { Rect } from "react-native-svg";

export default function CameraScreen() {
  const cameraRef = useRef(null); // Reference to the camera component
  const [isCameraScreenVisible, setIsCameraScreenVisible] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const sendFrame = async () => {
    console.log("Sending frame...");
    if (cameraRef.current) {
      try {
        const options = { quality: 0.5, base64: true, height: 800, width: 600 }; // Adjust image quality for faster processing
        const data = await cameraRef.current.takePictureAsync(options);
        console.log("Data object:", data);

        // Construct request data with base64 image string
        const requestData = {
          frame: data.base64,
        };

        // Debugging: Log request data
        console.log("Data sent to server:", requestData);

        // Send request with potential customizations
        const response = await axios.post(
          "http://192.168.1.55:5000/predict",
          requestData,
          {
            headers: {
              "Content-Type": "application/json",
            },
            timeout: 10000, // Optional: Set a timeout in milliseconds
          }
        );

        console.log("Backend response:", response.data); // Log received response

        setPredictionResult(response.data);
        console.log("predictionResult", predictionResult);

        // No changes needed here, assumes response has 'predictions' key
        if (response.data.hasOwnProperty("predictions")) {
          const predictions = response.data.predictions;
        } else {
          console.error("Error: 'predictions' missing in server response");
        }
      } catch (error) {
        console.error("Error sending frame:", error); // Log the error object for debugging
      }
    } else {
      console.warn("cameraRef is not ready yet");
    }
  };

  useEffect(() => {
    console.log("predictionResult", predictionResult);
    // Perform any actions with predictionResult here
  }, [predictionResult]);

  useEffect(() => {
    const intervalId = setInterval(sendFrame, 1000); // Send frame every 1 second (adjust as needed)
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [cameraRef]); // Run after cameraRef changes

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        ref={cameraRef}
        style={{ flex: 1 }}
        type={Camera.Constants.Type.back} // Choose back or front camera
        onCameraReady={() => console.log("Camera ready")}
        onMountError={(error) => console.error("Camera mount error:", error)}
      />
    </View>
  );
}
