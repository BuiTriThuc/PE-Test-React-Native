import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { HeartIcon as HeartIconOutline } from "react-native-heroicons/outline";
import { HeartIcon as HeartIconSolid } from "react-native-heroicons/solid";

export default function ItemCategories({ item }) {
  const navigation = useNavigation(item);
  const handlePress = (item) => {
    navigation.navigate("Detail", { item });
  };
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => handlePress(item)}>
          <Image
            style={styles.imageItem}
            source={{
              uri: item.image,
            }}
          />
        </TouchableOpacity>
        <View style={styles.containerItem}>
          <TouchableOpacity onPress={() => handlePress(item)}>
            <Text style={styles.name} numberOfLines={2}>
              {item.name}
            </Text>
            <View style={styles.rating}>
              <Image
                style={styles.star}
                source={require("../../../assets/fullStar.png")}
              />
              <Text style={styles.ratingText}>{item.rating} out of the 5</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.heart}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            {isFavorite ? (
              <HeartIconSolid size={30} color={"red"} />
            ) : (
              <HeartIconOutline size={30} color={"#0D1117"} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 20,
    marginHorizontal: 4,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: "white",
    marginBottom: 20,
  },
  containerItem: {
    marginLeft: 10,
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },

  star: {
    width: 20,
    height: 20,
  },
  rating: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
  },
  ratingText: {
    fontSize: 15,
  },

  imageItem: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    width: 150,
    height: 120,
  },
});
