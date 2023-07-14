import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { TrashIcon } from "react-native-heroicons/outline";
import { XCircleIcon } from "react-native-heroicons/solid";

export default function Favorite() {
  const [listFavorite, setListFavorite] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const getListFavorite = async () => {
    try {
      const listFavorite = await AsyncStorage.getItem("listFavorite");

      if (listFavorite) {
        const parseList = JSON.parse(listFavorite);
        const updateList = parseList.map((item) => ({
          ...item,
          isTopOfTheWeek: true,
        }));
        setListFavorite(updateList);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getListFavorite();
  }, [isFocused]);

  const clearAllItem = async () => {
    if (listFavorite) {
      await AsyncStorage.clear();
      setListFavorite([]);
    }
  };

  const deleteFavoriteItem = async (item) => {
    try {
      let favorites = [...listFavorite];
      if (item) {
        const updateList = favorites.filter((fav) => fav.id !== item.id);
        await AsyncStorage.setItem("listFavorite", JSON.stringify(updateList));
        setListFavorite(updateList);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  if (listFavorite.length === 0) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          style={{ width: "100%" }}
          source={require("../../../assets/empty-box.png")}
        />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Your list favorite is empty!
        </Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        {listFavorite && listFavorite.length > 0 && (
          <TouchableOpacity
            onPress={clearAllItem}
            style={{
              backgroundColor: "red",
              borderRadius: 30,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              height: 40,
              width: "50%",
              margin: 20,
            }}
          >
            <TrashIcon size={30} color={"white"} />
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
                marginLeft: 2,
              }}
            >
              Clear all item
            </Text>
          </TouchableOpacity>
        )}
        {listFavorite?.map((item) => {
          return (
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate("Detail", {
                  screen: "Detailsss",
                  params: { item },
                })
              }
              key={item.id}
            >
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "#CED5DD",
                  borderRadius: 20,
                  width: "90%",
                  height: 120,
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <Image
                  style={styles.image}
                  source={{
                    uri: item.image,
                  }}
                />
                <View style={{ marginLeft: 20 }}>
                  <Text
                    style={{ fontSize: 20, fontWeight: "800" }}
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={styles.ratingimg}
                      source={require("../../../assets/fullStar.png")}
                    />
                    <Text style={{ color: "green" }}>
                      {item.rating} out of the 5
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={{ width: 40, height: 40 }}
                    onPress={() => deleteFavoriteItem(item)}
                  >
                    <XCircleIcon size={40} color={"red"} />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: "",
  image: {
    height: 110,
    width: 110,
    borderRadius: 20,
  },

  ratingimg: {
    width: 20,
    height: 20,
    marginRight: 5,
    marginVertical: 10,
  },
});
