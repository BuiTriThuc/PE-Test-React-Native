import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { Text, View } from "react-native";
import { HeartIcon as HeartIconOutline } from "react-native-heroicons/outline";
import { HeartIcon as HeartIconSolid } from "react-native-heroicons/solid";
const Detail = ({ navigation, route }) => {
  const { item } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <View>
      <Image style={styles.imageDetail} source={{ uri: item.image }} />
      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.rating}>
        <Text style={styles.title}>Rating: </Text>
        <Text>{item.rating}</Text>
        <Image
          style={{ width: 20, height: 20, marginLeft: 5 }}
          source={require("../../../assets/fullStar.png")}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.detail}>
          <View style={styles.detailBottom}>
            <Text style={styles.title}>Price: </Text>
            <Text>{item.price}</Text>
          </View>
          <View style={styles.detailBottom}>
            <Text style={styles.title}>Weight:</Text>
            <Text>{item.weight}</Text>
          </View>
          <View style={styles.detailBottom}>
            <Text style={styles.title}>Color: </Text>
            <Text>{item.color}</Text>
          </View>
          <View style={styles.detailBottom}>
            <Text style={styles.title}>Bonus: </Text>
            <Text>{item.bonus}</Text>
          </View>
          <View style={styles.detailBottom}>
            <Text style={styles.title}>Origin: </Text>
            <Text>{item.origin}</Text>
          </View>
        </View>
        <View style={{ marginLeft: 100, marginTop: -20 }}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  imageDetail: {
    width: "100%",
    height: 300,
  },
  name: {
    fontSize: 30,
    margin: 10,
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  rating: {
    marginLeft: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  detail: {
    marginLeft: 10,
  },
  detailBottom: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Detail;
