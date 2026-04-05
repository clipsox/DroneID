import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { QUESTIONS } from "../data/questions";
import { RootStackParamList } from "../navigation/types";
import { buildQuizSession } from "../quiz/session";
import { useAppState } from "../state/AppStateContext";
import { ChoiceIndex, QuizSessionQuestion } from "../types/quiz";

type Props = NativeStackScreenProps<RootStackParamList, "Quiz">;

export const QuizScreen = ({ navigation, route }: Props) => {
  const { missedQuestionIds, recordAnswer, completeSession } = useAppState();
  const [session, setSession] = useState<QuizSessionQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

  const scoreRef = useRef(0);
  const incorrectIdsRef = useRef<string[]>([]);

  useEffect(() => {
    const params = route.params;
    const options =
      params.source === "category"
        ? { category: params.category }
        : params.source === "retry"
          ? { questionIds: params.questionIds }
          : params.source === "missed"
            ? { questionIds: missedQuestionIds }
            : {};

    const nextSession = buildQuizSession(QUESTIONS, options);
    setSession(nextSession);
    setIndex(0);
    setSelectedIndex(null);
    setAnswered(false);
    setIsCorrect(false);
    setScore(0);
    scoreRef.current = 0;
    incorrectIdsRef.current = [];
  }, [route.params, missedQuestionIds]);

  const currentQuestion = session[index];

  const progressLabel = useMemo(() => {
    if (session.length === 0) {
      return "No questions available for this mode yet.";
    }
    return `Question ${index + 1} of ${session.length}`;
  }, [index, session.length]);

  if (!currentQuestion) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{progressLabel}</Text>
        <Pressable style={styles.homeButton} onPress={() => navigation.replace("Home")}>
          <Text style={styles.homeButtonText}>Return Home</Text>
        </Pressable>
      </View>
    );
  }

  const submitAnswer = (answerIndex: number) => {
    if (answered) {
      return;
    }

    const correct = answerIndex === currentQuestion.correctAnswerIndex;
    setSelectedIndex(answerIndex);
    setAnswered(true);
    setIsCorrect(correct);

    if (correct) {
      scoreRef.current += 1;
      setScore(scoreRef.current);
    } else {
      incorrectIdsRef.current = [...incorrectIdsRef.current, currentQuestion.id];
    }

    recordAnswer(currentQuestion.id, correct);
  };

  const goNext = () => {
    if (index + 1 >= session.length) {
      completeSession();
      navigation.replace("Results", {
        score: scoreRef.current,
        total: session.length,
        incorrectIds: incorrectIdsRef.current,
      });
      return;
    }

    setIndex((prev) => prev + 1);
    setSelectedIndex(null);
    setAnswered(false);
    setIsCorrect(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.progress}>{progressLabel}</Text>
        <Text style={styles.score}>Score: {score}</Text>
      </View>

      <Text style={styles.question}>{currentQuestion.question}</Text>

      {currentQuestion.type === "multiple_choice" ? (
        <Image source={{ uri: currentQuestion.images[0] }} style={styles.heroImage} />
      ) : (
        <View style={styles.grid}>
          {currentQuestion.images.map((imageUri, imageIndex) => {
            const selected = selectedIndex === imageIndex;
            const correct = imageIndex === currentQuestion.correctAnswerIndex;

            return (
              <Pressable
                key={`${currentQuestion.id}-${imageUri}`}
                style={[
                  styles.imageOption,
                  selected && styles.imageOptionSelected,
                  answered && correct && styles.correctBorder,
                ]}
                onPress={() => submitAnswer(imageIndex)}
              >
                <Image source={{ uri: imageUri }} style={styles.gridImage} />
              </Pressable>
            );
          })}
        </View>
      )}

      {currentQuestion.type === "multiple_choice" ? (
        <View style={styles.answersWrap}>
          {currentQuestion.choices.map((choice, choiceIndex) => {
            const selected = selectedIndex === choiceIndex;
            const correct = choiceIndex === currentQuestion.correctAnswerIndex;
            const wrongSelected = selected && answered && !correct;

            return (
              <Pressable
                key={`${currentQuestion.id}-${choice}`}
                style={[
                  styles.answerButton,
                  selected && styles.answerButtonSelected,
                  answered && correct && styles.correctAnswer,
                  wrongSelected && styles.wrongAnswer,
                ]}
                onPress={() => submitAnswer(choiceIndex as ChoiceIndex)}
              >
                <Text style={styles.answerButtonText}>{choice}</Text>
              </Pressable>
            );
          })}
        </View>
      ) : null}

      {answered ? (
        <View style={[styles.feedbackCard, isCorrect ? styles.feedbackCorrect : styles.feedbackWrong]}>
          <Text style={styles.feedbackHeadline}>{isCorrect ? "Correct" : "Incorrect"}</Text>
          {!isCorrect ? (
            <Text style={styles.feedbackText}>
              Correct option: {currentQuestion.correctAnswerIndex + 1}
            </Text>
          ) : null}
          <Text style={styles.feedbackText}>Definition: {currentQuestion.definition}</Text>
          <Text style={styles.feedbackText}>Explanation: {currentQuestion.explanation}</Text>
          <Text style={styles.feedbackText}>Tip: {currentQuestion.tip}</Text>

          <Pressable style={styles.nextButton} onPress={goNext}>
            <Text style={styles.nextButtonText}>{index + 1 === session.length ? "Finish" : "Next Question"}</Text>
          </Pressable>
        </View>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 14,
    gap: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    gap: 12,
  },
  emptyText: {
    fontSize: 16,
    color: "#334E68",
    textAlign: "center",
  },
  homeButton: {
    backgroundColor: "#102A43",
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  homeButtonText: {
    color: "#F0F4F8",
    fontWeight: "700",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progress: {
    color: "#243B53",
    fontSize: 15,
    fontWeight: "700",
  },
  score: {
    color: "#102A43",
    fontSize: 15,
    fontWeight: "700",
  },
  question: {
    color: "#102A43",
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "800",
  },
  heroImage: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    backgroundColor: "#BCCCDC",
  },
  answersWrap: {
    gap: 10,
  },
  answerButton: {
    borderWidth: 1,
    borderColor: "#829AB1",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: "#F0F4F8",
  },
  answerButtonSelected: {
    borderColor: "#486581",
  },
  answerButtonText: {
    color: "#102A43",
    fontSize: 16,
    fontWeight: "700",
  },
  correctAnswer: {
    borderColor: "#2F855A",
    backgroundColor: "#E6FFFA",
  },
  wrongAnswer: {
    borderColor: "#C53030",
    backgroundColor: "#FFF5F5",
  },
  feedbackCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    gap: 8,
  },
  feedbackCorrect: {
    borderColor: "#2F855A",
    backgroundColor: "#E6FFFA",
  },
  feedbackWrong: {
    borderColor: "#C53030",
    backgroundColor: "#FFF5F5",
  },
  feedbackHeadline: {
    fontSize: 19,
    fontWeight: "800",
    color: "#102A43",
  },
  feedbackText: {
    color: "#243B53",
    fontSize: 14,
    lineHeight: 20,
  },
  nextButton: {
    marginTop: 4,
    backgroundColor: "#102A43",
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 12,
  },
  nextButtonText: {
    color: "#F0F4F8",
    fontSize: 15,
    fontWeight: "700",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  imageOption: {
    width: "48.5%",
    borderWidth: 2,
    borderColor: "#BCCCDC",
    borderRadius: 10,
    overflow: "hidden",
  },
  imageOptionSelected: {
    borderColor: "#486581",
  },
  correctBorder: {
    borderColor: "#2F855A",
  },
  gridImage: {
    width: "100%",
    aspectRatio: 1.25,
    backgroundColor: "#D9E2EC",
  },
});
