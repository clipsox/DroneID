import {
  ChoiceIndex,
  ImageSelectionQuestion,
  MultipleChoiceQuestion,
  Question,
  QuestionCategory,
  QuizSessionQuestion,
} from "../types/quiz";

type BuildSessionOptions = {
  category?: QuestionCategory;
  questionIds?: string[];
};

export const shuffle = <T>(items: T[]): T[] => {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j]!, next[i]!];
  }
  return next;
};

const shuffleMultipleChoice = (question: MultipleChoiceQuestion): MultipleChoiceQuestion => {
  const indexed = question.choices.map((choice, index) => ({
    choice,
    originalIndex: index as ChoiceIndex,
  }));
  const shuffled = shuffle(indexed);
  const newCorrectAnswerIndex = shuffled.findIndex(
    (item) => item.originalIndex === question.correctAnswerIndex,
  ) as ChoiceIndex;

  return {
    ...question,
    choices: shuffled.map((item) => item.choice) as [string, string, string, string],
    correctAnswerIndex: newCorrectAnswerIndex,
  };
};

const shuffleImageSelection = (question: ImageSelectionQuestion): ImageSelectionQuestion => {
  const indexed = question.images.map((image, index) => ({
    image,
    originalIndex: index as ChoiceIndex,
  }));
  const shuffled = shuffle(indexed);
  const newCorrectAnswerIndex = shuffled.findIndex(
    (item) => item.originalIndex === question.correctAnswerIndex,
  ) as ChoiceIndex;

  return {
    ...question,
    images: shuffled.map((item) => item.image) as [string, string, string, string],
    correctAnswerIndex: newCorrectAnswerIndex,
  };
};

const randomizeQuestion = (question: Question): QuizSessionQuestion => {
  if (question.type === "multiple_choice") {
    return shuffleMultipleChoice(question);
  }
  return shuffleImageSelection(question);
};

export const buildQuizSession = (
  questions: Question[],
  options: BuildSessionOptions = {},
): QuizSessionQuestion[] => {
  const { category, questionIds } = options;

  let pool = questions;

  if (category) {
    pool = pool.filter((question) => question.category === category);
  }

  if (questionIds && questionIds.length > 0) {
    const ids = new Set(questionIds);
    pool = pool.filter((question) => ids.has(question.id));
  }

  const randomizedQuestions = shuffle(pool).map((question) => randomizeQuestion(question));

  return randomizedQuestions;
};
