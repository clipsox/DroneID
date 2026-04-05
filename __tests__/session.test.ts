import { QUESTIONS } from "../src/data/questions";
import { buildQuizSession } from "../src/quiz/session";

describe("buildQuizSession", () => {
  it("builds a full randomized session", () => {
    const session = buildQuizSession(QUESTIONS);
    expect(session).toHaveLength(QUESTIONS.length);

    session.forEach((question) => {
      expect(question.definition.length).toBeGreaterThan(0);
      expect(question.explanation.length).toBeGreaterThan(0);
      expect(question.tip.length).toBeGreaterThan(0);
      expect(question.correctAnswerIndex).toBeGreaterThanOrEqual(0);
      expect(question.correctAnswerIndex).toBeLessThanOrEqual(3);
    });
  });

  it("filters by category", () => {
    const session = buildQuizSession(QUESTIONS, { category: "payload" });
    expect(session).toHaveLength(2);
    expect(session.every((question) => question.category === "payload")).toBe(true);
  });

  it("filters by explicit ids", () => {
    const session = buildQuizSession(QUESTIONS, { questionIds: ["q3", "q9"] });
    const ids = session.map((question) => question.id).sort();
    expect(ids).toEqual(["q3", "q9"]);
  });
});
