import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

import { RootStackParamList } from "../navigation/types";
import { useAppState } from "../state/AppStateContext";

type Props = NativeStackScreenProps<RootStackParamList, "Settings">;

export const SettingsScreen = (_props: Props) => {
  const { resetProgress } = useAppState();

  const onReset = () => {
    Alert.alert("Reset Progress", "Clear all local progress and missed-question history?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Reset",
        style: "destructive",
        onPress: () => {
          void resetProgress();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Pressable style={styles.dangerButton} onPress={onReset}>
        <Text style={styles.dangerButtonText}>Reset Progress</Text>
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
    fontSize: 26,
    fontWeight: "800",
    color: "#102A43",
  },
  dangerButton: {
    marginTop: 8,
    backgroundColor: "#C53030",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  dangerButtonText: {
    color: "#FFF5F5",
    fontWeight: "800",
    fontSize: 16,
  },
});
