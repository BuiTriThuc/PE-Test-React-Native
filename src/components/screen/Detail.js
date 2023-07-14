import { StyleSheet, TouchableOpacity } from "react-native";
import { View, Text, Image, ScrollView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkItemExisting } from "../../../utils/index";
const Detail = ({ navigation, route }) => {
  const [isItemFavorite, setIsItemFavorite] = useState(false);
  const [listFavorite, setListFavorite] = useState([]);

  const { params } = useRoute();
  let { image, name, rating } = params?.item;
  let { item } = params;

  const getFavouriteList = async () => {
    try {
      const favorites = await AsyncStorage.getItem("listFavorite");
      if (favorites) {
        const parsedFavorites = JSON.parse(favorites);
        setListFavorite(parsedFavorites);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.item) {
      let { isTopOfTheWeek } = params.item;
      setIsItemFavorite(isTopOfTheWeek || false);
    }
  }, [params.item]);

  console.log("Check item", item);

  const handleItemFavorite = async () => {
    try {
      let favorite = [...listFavorite];

      const isItemExisting = await checkItemExisting(item);

      if (isItemExisting) {
        const updatedList = favorite.filter((fav) => fav.id !== item.id);
        await AsyncStorage.setItem("listFavorite", JSON.stringify(updatedList));
        setListFavorite(updatedList);
        setIsItemFavorite(false);
      } else {
        favorite.push(item);
        await AsyncStorage.setItem("listFavorite", JSON.stringify(favorite));
        setListFavorite(favorite);
        setIsItemFavorite(true);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const updateList = async () => {
        await getFavouriteList();
      };

      updateList();
    }, [])
  );

  console.log("Check list", listFavorite);

  return (
    <View showsVerticalScrollIndicator={false}>
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
        <View style={{ marginLeft: 100, marginTop: -20 }}></View>
      </View>
      <TouchableOpacity onPress={handleItemFavorite}>
        <View
          style={{
            backgroundColor: "#2A6D86",
            width: "50%",
            height: 40,
            marginLeft: 100,
            marginTop: 60,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
          }}
        >
          <Text style={{ fontWeight: "bold", color: "white" }}>
            {isItemFavorite
              ? "Remove from list favorite"
              : "Add to list favorite"}
          </Text>
        </View>
      </TouchableOpacity>
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
