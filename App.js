import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Audio } from "expo-av";
import { Camera } from "expo-camera";
import LoginScreen from "./Loginscreen";
const Stack = createStackNavigator();
const MainApp = () => {
    const [emotion, setEmotion] = useState("");
    const [sound, setSound] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);
    // ✅ Request camera permissions on mount
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);
    async function playMusic(emotion) {
        if (sound) {
            await sound.unloadAsync();
        }
        let musicFile = require("./assets/music/neutral.mp3");
        if (emotion === "Happy") {
            musicFile = require("./assets/music/happy.mp3");
        }
        else if (emotion === "Sad") {
            musicFile = require("./assets/music/sad.mp3");
        }
        try {
            const { sound: newSound } = await Audio.Sound.createAsync(musicFile);
            setSound(newSound);
            await newSound.playAsync();
        }
        catch (error) {
            console.error("Error playing music:", error);
        }
    }
    if (hasPermission === null) {
        return <Text>Requesting camera permission...</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (<View style={styles.container}>
      <Camera style={styles.camera} type={CameraType.back} onCameraReady={() => {
            // Add your camera ready logic here
        }}/>
      <Text style={styles.text}>Detected Emotion: {emotion}</Text>
      <Button title="Stop Music" onPress={() => sound?.stopAsync()}/>
    </View>);
};
export default function App() {
    return (<NavigationContainer>
      <Stack.Navigator id="mainStack" initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Emotion Detector" component={MainApp}/>
      </Stack.Navigator>
    </NavigationContainer>);
}
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    text: { fontSize: 20, margin: 10 },
    camera: { width: "100%", height: "70%" }, // ✅ Add styles for Camera
});
