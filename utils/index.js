import AsyncStorage from "@react-native-async-storage/async-storage";

export const checkItemExisting = async (item) => {
  const existingItem = await AsyncStorage.getItem("listFavorite");
  let favorite = [];

  if (existingItem) {
    favorite = JSON.parse(existingItem);
  }

  const isItemExistingList = favorite.some((fav) => fav.id === item.id);

  return isItemExistingList;
};
