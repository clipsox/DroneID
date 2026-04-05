import { QuestionCategory } from "../types/quiz";

export type RootStackParamList = {
  Home: undefined;
  CategorySelect: undefined;
  Quiz:
    | {
        source: "all" | "missed";
      }
    | {
        source: "category";
        category: QuestionCategory;
      }
    | {
        source: "retry";
        questionIds: string[];
      };
  Results: {
    score: number;
    total: number;
    incorrectIds: string[];
  };
  Stats: undefined;
  Settings: undefined;
};
