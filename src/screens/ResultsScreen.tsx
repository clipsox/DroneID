import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Results">;

export const ResultsScreen = ({ navigation, route }: Props) => {
  const { score, total, incorrectIds } = route.params;
  const accuracy = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Session Complete</Text>
      <Text style={styles.metric}>Score: {score} / {total}</Text>
      <Text style={styles.metric}>Accuracy: {accuracy}%</Text>
      <Text style={styles.metric}>Incorrect: {incorrectIds.length}</Text>

      {incorrectIds.length > 0 ? (
        <Pressable
          style={styles.primaryButton}
          onPress={() => navigation.replace("Quiz", { source: "retry", questionIds: incorrectIds })}
        >
          <Text style={styles.primaryButtonText}>Retry Incorrect Questions</Text>
        </Pressable>
      ) : null}

      <Pressable style={styles.secondaryButton} onPress={() => navigation.replace("Home")}>
        <Text style={styles.secondaryButtonText}>Return Home</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#102A43",
    marginBottom: 10,
  },
  metric: {
    fontSize: 18,
    color: "#243B53",
    fontWeight: "700",
  },
  primaryButton: {
    marginTop: 10,
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
    marginTop: 4,
    borderWidth: 1,
    borderColor: "#829AB1",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#102A43",
    fontSize: 16,
    fontWeight: "700",
  },
});
