import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../components/screen/Home";
import Favorite from "../components/screen/Favorite";
import { Ionicons } from "@expo/vector-icons";
import NaviDetail from "./NaviDetail";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Favorite") {
              iconName = "heart";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarLabel: () => null,
        })}
      >
        <Tab.Screen
          name="Detailss"
          component={NaviDetail}
          options={{ tabBarButton: () => null }}
        />
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Favorite" component={Favorite} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
