import React from "react";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { Text, View } from "react-native";
const Detail = ({ navigation, route }) => {
  const { item } = route.params;
  return (
    <View>
      <Image style={styles.imageDetail} source={{ uri: item.image }} />
      <Text>{item.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  imageDetail: {
    width: 100,
    height: 100,
  },
});

export default Detail;
