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
      <View>
        <TouchableOpacity onPress={() => handlePress(item)}>
          <Image
            style={styles.imageItem}
            source={{
              uri: item.image,
            }}
          />

          <Text numberOfLines={1}>{item.name}</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 30, height: 30, marginRight: 5 }}
              source={require("../../../assets/fullStar.png")}
            />
            <Text>{item.rating} out of the 5</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
          {isFavorite ? (
            <HeartIconSolid size={35} color={"red"} />
          ) : (
            <HeartIconOutline size={35} color={"red"} />
          )}
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  imageItem: {
    width: 100,
    height: 100,
  },
});
