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
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categorie handleGetItems={handleGetItems} />

        {/* Content */}
        <View>
          <Text>List orchid</Text>
          {items?.map((item) => {
            return <ItemCategories key={item.id} item={item} />;
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}