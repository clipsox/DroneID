import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { CategorySelectScreen } from "./src/screens/CategorySelectScreen";
import { HomeScreen } from "./src/screens/HomeScreen";
import { QuizScreen } from "./src/screens/QuizScreen";
import { ResultsScreen } from "./src/screens/ResultsScreen";
import { SettingsScreen } from "./src/screens/SettingsScreen";
import { StatsScreen } from "./src/screens/StatsScreen";
import { AppStateProvider } from "./src/state/AppStateContext";
import { RootStackParamList } from "./src/navigation/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <AppStateProvider>
        <NavigationContainer>
          <StatusBar style="dark" />
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: "#102A43" },
              headerTintColor: "#F0F4F8",
              contentStyle: { backgroundColor: "#F0F4F8" },
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: "DroneID" }} />
            <Stack.Screen
              name="CategorySelect"
              component={CategorySelectScreen}
              options={{ title: "Practice by Category" }}
            />
            <Stack.Screen name="Quiz" component={QuizScreen} options={{ title: "Quiz" }} />
            <Stack.Screen name="Results" component={ResultsScreen} options={{ title: "Session Results" }} />
            <Stack.Screen name="Stats" component={StatsScreen} options={{ title: "Progress" }} />
            <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: "Settings" }} />
          </Stack.Navigator>
        </NavigationContainer>
      </AppStateProvider>
    </SafeAreaProvider>
  );
}
