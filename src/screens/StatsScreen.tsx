import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { RootStackParamList } from "../navigation/types";
import { useAppState } from "../state/AppStateContext";

type Props = NativeStackScreenProps<RootStackParamList, "Stats">;

export const StatsScreen = (_props: Props) => {
  const { stats, missedQuestionIds } = useAppState();
  const accuracy = stats.attempts > 0 ? Math.round((stats.correct / stats.attempts) * 100) : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progress / Stats</Text>
      <Text style={styles.item}>Total attempts: {stats.attempts}</Text>
      <Text style={styles.item}>Correct answers: {stats.correct}</Text>
      <Text style={styles.item}>Accuracy: {accuracy}%</Text>
      <Text style={styles.item}>Completed sessions: {stats.completedSessions}</Text>
      <Text style={styles.item}>Missed question pool: {missedQuestionIds.length}</Text>
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
    fontSize: 26,
    fontWeight: "800",
    color: "#102A43",
  },
  item: {
    fontSize: 18,
    fontWeight: "600",
    color: "#243B53",
  },
});
