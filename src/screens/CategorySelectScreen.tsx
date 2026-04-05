import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { RootStackParamList } from "../navigation/types";
import { QuestionCategory } from "../types/quiz";

type Props = NativeStackScreenProps<RootStackParamList, "CategorySelect">;

const categories: { key: QuestionCategory; label: string }[] = [
  { key: "drone_types", label: "Drone Types" },
  { key: "fixed_wing", label: "Fixed-Wing Systems" },
  { key: "payload", label: "Payload Recognition" },
  { key: "lights", label: "Lights: Aircraft vs Drone" },
];

export const CategorySelectScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a category</Text>
      {categories.map((category) => (
        <Pressable
          key={category.key}
          style={styles.button}
          onPress={() => navigation.navigate("Quiz", { source: "category", category: category.key })}
        >
          <Text style={styles.buttonText}>{category.label}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#102A43",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#102A43",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#F0F4F8",
    fontSize: 16,
    fontWeight: "700",
  },
});
