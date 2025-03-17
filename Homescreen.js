import React, { useEffect, useState } from "react";
import { View, FlatList, ScrollView, Image, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { Card, Text, Avatar, Button, ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const categories = [
  { name: "Good Song" }, { name: "Relax Song" },
  { name: "Vibe Mix" }, { name: "Chill Song" },
  { name: "Kpop" }, { name: "Pop Song" }
];

const Homescreen = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get("http://your-api-url/api/songs")
      .then(response => setSongs(response.data))
      .catch(error => console.error("Axios error:", error.message))
      .finally(() => setLoading(false));
  }, []);

  // Handle logout
  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    Alert.alert("Logged out", "You have been logged out.");
    navigation.replace("Loginscreen");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Avatar.Icon size={40} icon="account" />
        <Text style={styles.title}>Music App</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Avatar.Icon size={40} icon="logout" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Category Buttons */}
        <View style={styles.categoryContainer}>
          {categories.map((category, index) => (
            <Button key={index} mode="outlined" style={styles.categoryButton}>
              {category.name}
            </Button>
          ))}
        </View>

        {/* Top Mixes */}
        <Text style={styles.sectionTitle}>Top Mixes</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.topMixes}>
          {songs.slice(0, 5).map((mix, index) => (
            <Card key={index} style={styles.mixCard}>
              <Card.Cover 
                source={{ uri: mix.image || "https://via.placeholder.com/100" }} 
                style={styles.mixImage} 
              />
              <Card.Content>
                <Text numberOfLines={1} style={styles.songTitle}>{mix.title}</Text>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>

        {/* Latest Songs */}
        <Text style={styles.sectionTitle}>Latest Songs</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#6200ea" style={styles.loader} />
        ) : (
          <View style={{ marginBottom: 80 }}>
            <FlatList
              data={songs}
              renderItem={({ item }) => (
                <Card style={styles.songCard} mode="outlined">
                  <Card.Title
                    title={item.title}
                    subtitle={item.artist}
                    left={props => <Avatar.Icon {...props} icon="music" />}
                  />
                </Card>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 10,
  },
  categoryButton: {
    margin: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 15,
    marginTop: 20,
  },
  topMixes: {
    padding: 10,
  },
  mixCard: {
    marginRight: 10,
    width: 120,
  },
  mixImage: {
    height: 100,
  },
  songTitle: {
    fontWeight: "bold",
    textAlign: "center",
  },
  loader: {
    marginTop: 20,
  },
  songCard: {
    margin: 20,
    padding: 10,
    borderRadius: 10,
  },
});

export default Homescreen;
