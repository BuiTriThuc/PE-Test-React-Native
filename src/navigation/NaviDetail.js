import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Detail from "../components/screen/Detail";
import Home from "../components/screen/Home";

const Stack = createNativeStackNavigator();

export default function NaviDetail() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Thuc" component={Home} />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
}
