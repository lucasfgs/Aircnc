import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from "react-native";
import { withNavigation } from "react-navigation";

import api from "../services/api";

function SpotList({ tech, navigation }) {
  const imagePath = "http://192.168.1.2:5000/files/";

  const [spots, setSpots] = useState([]);

  useEffect(() => {
    async function loadSpots() {
      const response = await api.get("spots", {
        params: { tech: "ReactJS" }
      });
      setSpots(response.data);
    }
    loadSpots();
  }, []);

  function handleNavigate(id) {
    navigation.navigate("Book", { id });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Empresas que usam <Text style={styles.bold}>{tech}</Text>
      </Text>

      <FlatList
        style={styles.list}
        data={spots}
        keyExtractor={spot => spot._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image
              style={styles.thumbnail}
              source={{ uri: imagePath + item.thumbnail }}
            />
            <Text style={styles.company}>{item.company}</Text>
            <Text style={styles.price}>
              {item.price ? `R$${item.price}` : "GRATUITO"}
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleNavigate(item._id)}
            >
              <Text style={styles.buttonText}>Solicitar Reserva</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30
  },
  title: {
    fontSize: 20,
    color: "#444",
    paddingHorizontal: 40,
    marginBottom: 15
  },
  bold: {
    fontWeight: "bold"
  },

  list: {
    paddingHorizontal: 20
  },

  listItem: {
    marginRight: 15
  },

  thumbnail: {
    width: 200,
    height: 120,
    resizeMode: "cover"
  },

  company: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10
  },

  price: {
    fontSize: 15,
    color: "#999",
    marginTop: 5
  },

  button: {
    height: 32,
    backgroundColor: "#f05a5b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    marginTop: 15
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15
  }
});

export default withNavigation(SpotList);
