import React, { useEffect, useState } from "react";
import { View, FlatList, ScrollView, Image } from "react-native";
import { Card, Text, Avatar, Button, ActivityIndicator } from "react-native-paper";
import axios from "axios";

const categories = [
  { name: "Good Song" }, { name: "Relax Song" },
  { name: "Vibe Mix" }, { name: "Chill Song" },
  { name: "Kpop" }, { name: "Pop Song" }
];

const Homescreen = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://your-api-url/api/songs")
      .then(response => setSongs(response.data))
      .catch(error => console.error("Axios error:", error.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
      
      
      <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 15 }}>
        <Avatar.Icon size={40} icon="account" />
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>Music App</Text>
        <Avatar.Icon size={40} icon="dots-vertical" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

     
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
          {categories.map((category, index) => (
            <Button key={index} mode="outlined" style={{ margin: 5 }}>
              {category.name}
            </Button>
          ))}
        </View>

      
        <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 15, marginTop: 20 }}>
          Top Mixes
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ padding: 10 }}>
          {songs.slice(0, 5).map((mix, index) => (
            <Card key={index} style={{ marginRight: 10, width: 120 }}>
              <Card.Cover source={{ uri: mix.image }} style={{ height: 100 }} />
              <Card.Content>
                <Text numberOfLines={1} style={{ fontWeight: "bold" }}>{mix.title}</Text>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>

       
        <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 15, marginTop: 10 }}>
          Latest Songs
        </Text>
        {loading ? (
          <ActivityIndicator size="large" color="#6200ea" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={songs}
            renderItem={({ item }) => (
              <Card style={{ margin: 20, padding: 10, borderRadius: 10 }} mode="outlined">
                <Card.Title
                  title={item.title}
                  subtitle={item.artist}
                  left={props => <Avatar.Icon {...props} icon="music" />}
                />
              </Card>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default Homescreen;
