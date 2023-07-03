import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Categories } from "../data/db";

export default function Category({ handleGetItems }) {
  let [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("1");

  useEffect(() => {
    setCategories(Categories);
  }, []);

  const handleChangeCategory = (item) => {
    handleGetItems(item.items);
    setActiveCategory(item.id);
  };
  return (
    <View>
      <View>
        <Text>Categories</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      >
        {categories.map((category, index) => {
          return (
            <View key={index}>
              <TouchableOpacity onPress={() => handleChangeCategory(category)}>
                <Image
                  style={styles.imageCat}
                  source={{ uri: category.imageCat }}
                />
              </TouchableOpacity>
              <Text>{category.name}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  imageCat: {
    height: 200,
    width: 200,
  },
});
