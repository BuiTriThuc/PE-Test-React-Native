import React, { useState } from "react";
import { Text, View } from "react-native";
import Categorie from "../categories/Categorie";
import ItemCategories from "../categories/ItemCategories";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native";

export default function Home() {
  const [items, setItems] = useState([]);

  const handleGetItems = (item) => {
    setItems(item);
  };
  return (
    <SafeAreaView>
      <Categorie handleGetItems={handleGetItems} />

      {/* Content */}
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
          {items?.map((item) => {
            return <ItemCategories key={item.id} item={item} />;
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
