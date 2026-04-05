import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { RootStackParamList } from "../navigation/types";
import { useAppState } from "../state/AppStateContext";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export const HomeScreen = ({ navigation }: Props) => {
  const { missedQuestionIds, stats } = useAppState();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Drone Recognition Trainer</Text>
      <Text style={styles.subtitle}>Learn drones vs aircraft with fast, visual practice.</Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Quick Stats</Text>
        <Text style={styles.cardValue}>Attempts: {stats.attempts}</Text>
        <Text style={styles.cardValue}>Correct: {stats.correct}</Text>
        <Text style={styles.cardValue}>Missed Pool: {missedQuestionIds.length}</Text>
      </View>

      <Pressable style={styles.primaryButton} onPress={() => navigation.navigate("Quiz", { source: "all" })}>
        <Text style={styles.primaryButtonText}>Start Quiz</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={() => navigation.navigate("CategorySelect")}>
        <Text style={styles.secondaryButtonText}>Practice by Category</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={() => navigation.navigate("Quiz", { source: "missed" })}>
        <Text style={styles.secondaryButtonText}>Review Missed Questions</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={() => navigation.navigate("Stats")}>
        <Text style={styles.secondaryButtonText}>Progress / Stats</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={() => navigation.navigate("Settings")}>
        <Text style={styles.secondaryButtonText}>Settings</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#102A43",
  },
  subtitle: {
    color: "#334E68",
    fontSize: 16,
    marginBottom: 8,
  },
  card: {
    backgroundColor: "#D9E2EC",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#BCCCDC",
  },
  cardLabel: {
    fontWeight: "700",
    color: "#102A43",
    marginBottom: 8,
  },
  cardValue: {
    color: "#243B53",
    fontSize: 15,
  },
  primaryButton: {
    backgroundColor: "#102A43",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#F0F4F8",
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryButton: {
    backgroundColor: "#F0F4F8",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#9FB3C8",
  },
  secondaryButtonText: {
    color: "#102A43",
    fontSize: 16,
    fontWeight: "700",
  },
});
