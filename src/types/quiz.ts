export type ChoiceIndex = 0 | 1 | 2 | 3;

export type QuestionCategory =
  | "drone_types"
  | "fixed_wing"
  | "payload"
  | "lights";

type BaseQuestion = {
  id: string;
  category: QuestionCategory;
  question: string;
  definition: string;
  explanation: string;
  tip: string;
};

export type MultipleChoiceQuestion = BaseQuestion & {
  type: "multiple_choice";
  images: [string];
  choices: [string, string, string, string];
  correctAnswerIndex: ChoiceIndex;
};

export type ImageSelectionQuestion = BaseQuestion & {
  type: "image_selection";
  images: [string, string, string, string];
  correctAnswerIndex: ChoiceIndex;
};

export type Question = MultipleChoiceQuestion | ImageSelectionQuestion;

export type QuizSessionQuestion = Question;

export type QuizResult = {
  score: number;
  total: number;
  incorrectIds: string[];
};
