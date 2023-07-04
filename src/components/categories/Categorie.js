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
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginLeft: 10,
            marginBottom: 10,
          }}
        >
          Categories
        </Text>
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
            <View key={index} style={styles.cardCate}>
              <TouchableOpacity
                style={styles.category}
                onPress={() => handleChangeCategory(category)}
              >
                <Image
                  style={styles.imageCat}
                  source={{ uri: category.imageCat }}
                />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    paddingTop: 5,
                  }}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  cardCate: {
    marginRight: 30,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: "white",
    marginBottom: 20,
  },
  category: {
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  imageCat: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    height: 100,
    width: 100,
  },
});
