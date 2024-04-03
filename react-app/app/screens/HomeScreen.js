import React from "react";
import { View, Image, StyleSheet, Text, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      style={styles.screenContainer}
      source={require("../assets/imgs/bg.jpg")}
    >
      <View style={styles.cardContainer}>
        <View style={styles.licenseContainer}>
          <View style={styles.countryLabel}>
            <Image
              style={styles.countryIcon}
              source={require("../assets/imgs/flag-logo.png")}
            />
            <Text style={styles.countryCode}>PH</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.licenseText}>License Plate Generator</Text>
            <Text style={styles.subText}>Bato & Bernal</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f4",
  },
  cardContainer: {
    borderRadius: 12,
    backgroundColor: "#ffffff",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "90%",
  },
  licenseContainer: {
    flexDirection: "row",
    width: "100%",
    borderRadius: 12,
    borderWidth: 4,
    borderColor: "#000000",
    backgroundColor: "#facc15",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  countryLabel: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e40af",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    padding: 16,
    width: 80,
  },
  countryIcon: {
    height: 32,
    resizeMode: "contain",
    marginBottom: 4,
  },
  countryCode: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  licenseText: {
    fontFamily: "Inconsolata",
    fontSize: 30, // Adjusted font size to fit the width
    fontWeight: "bold",
    textAlign: "center",
  },
  subText: {
    fontFamily: "Inconsolata",
    fontSize: 20, // Smaller font size for the bottom text
    textAlign: "center",
    marginTop: 4, // Add space between the texts
  },
});

export default HomeScreen;
