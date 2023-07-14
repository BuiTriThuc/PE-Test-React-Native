import Categorie from "../categories/Categorie";
import ItemCategories from "../categories/ItemCategories";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";

import { Categories } from "../data/db";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkItemExisting } from "../../../utils";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

export default function Home() {
  const [items, setItems] = useState([]);
  const [firstItem, setFirstItem] = useState(null);
  const [listFavorite, setListFavorite] = useState([]);
  const isFocused = useIsFocused();

  const handleGetItems = (item) => {
    setItems(item.items);
    getFavouriteList();
  };

  const getFavouriteList = async () => {
    try {
      // Get favorites from AsyncStorage
      const favorites = await AsyncStorage.getItem("listFavorite");
      if (favorites) {
        // Parse the favorites from AsyncStorage
        const parsedFavorites = JSON.parse(favorites);
        // Update the listFavourite state
        setListFavorite(parsedFavorites);
      } else {
        setListFavorite([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFavouriteList();
  }, [isFocused]);

  const handleItemFavorite = async (item) => {
    try {
      let favorite = [...listFavorite];

      const isItemExisting = await checkItemExisting(item);

      if (isItemExisting) {
        const updatedList = favorite.filter((fav) => fav.id !== item.id);
        await AsyncStorage.setItem("listFavorite", JSON.stringify(updatedList));
        setListFavorite(updatedList);
      } else {
        favorite.push(item);
        await AsyncStorage.setItem("listFavorite", JSON.stringify(favorite));
        setListFavorite(favorite);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    if (Categories.length > 0) {
      setFirstItem(Categories[0].items);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const updatedList = async () => {
        const updatedData = items?.map((item) => ({
          ...item,
          isTopOfTheWeek: listFavorite.some((fav) => fav.id === item.id),
        }));
        setItems(updatedData);
      };

      const updateListFirstItem = async () => {
        const updateData = firstItem.map((item) => ({
          ...item,
          isTopOfTheWeek: listFavorite.some((fav) => fav.id === item.id),
        }));
        setFirstItem(updateData);
      };

      updatedList();
      updateListFirstItem();
    }, [listFavorite])
  );

  const clearStorage = async () => {
    await AsyncStorage.clear();
  };

  return (
    <SafeAreaView>
      <Categorie handleGetItems={handleGetItems} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 10,
              marginLeft: 10,
            }}
          >
            List orchid
          </Text>

          {items && items.length > 0
            ? items?.map((item) => {
                return (
                  <ItemCategories
                    key={item.id}
                    item={item}
                    onPressFavorite={() => handleItemFavorite(item)}
                    isFavorite={item.isTopOfTheWeek}
                  />
                );
              })
            : firstItem?.map((item) => {
                return (
                  <ItemCategories
                    key={item.id}
                    item={item}
                    onPressFavorite={() => handleItemFavorite(item)}
                    isFavorite={item.isTopOfTheWeek}
                  />
                );
              })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
