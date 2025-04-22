// Fungsi untuk menganalisis karunia spiritual
import { CategoryScore } from "../types/shape-types";

/**
 * Menganalisis jawaban kuesioner karunia spiritual
 * @param data Jawaban kuesioner
 * @param spiritualGiftsCategories Kategori karunia spiritual
 * @param spiritualGiftsQuestions Pertanyaan karunia spiritual
 * @returns Array skor kategori
 */
export function analyzeSpiritualGifts(
  data: any,
  spiritualGiftsCategories: Record<string, string>,
  spiritualGiftsQuestions: any[]
): CategoryScore[] {
  const scores: Record<string, { total: number; count: number }> = {};

  // Initialize scores object for each spiritual gift category
  Object.keys(spiritualGiftsCategories).forEach((subcategory) => {
    scores[subcategory] = { total: 0, count: 0 };
  });

  // Group questions by subcategory
  const questionsBySubcategory: Record<string, number[]> = {};
  spiritualGiftsQuestions.forEach((question) => {
    if (!questionsBySubcategory[question.subcategory || ""]) {
      questionsBySubcategory[question.subcategory || ""] = [];
    }
    questionsBySubcategory[question.subcategory || ""].push(question.id);
  });

  // Check if data is in the new format (with raw_answers and categories)
  if (data && typeof data === "object" && data.raw_answers) {
    // Use the raw answers for detailed analysis
    const answers = data.raw_answers;

    // Sum up scores for each subcategory
    Object.entries(answers).forEach(([questionId, value]) => {
      if (typeof value !== "number") return;

      const questionIdNum = Number.parseInt(questionId);
      const question = spiritualGiftsQuestions.find(
        (q) => q.id === questionIdNum
      );

      if (question && question.subcategory) {
        scores[question.subcategory].total += value;
        scores[question.subcategory].count += 1;
      }
    });
  } else if (data && typeof data === "object" && data.spiritual) {
    // Legacy format: data is just a number
    // Instead of just returning "Spiritual", return the top spiritual gifts
    // based on the subcategories in spiritualGiftsCategories
    const topGifts = Object.entries(spiritualGiftsCategories)
      .slice(0, 3) // Get top 3 gifts
      .map(([_, name]) => ({
        category: name,
        score: Number(data.spiritual),
        percentage: Number.parseFloat(
          ((Number(data.spiritual) / 5) * 100).toFixed(1)
        ),
        type: "scale" as const,
      }));

    return topGifts;
  } else {
    // Treat data as the raw answers
    const answers = data;

    // Sum up scores for each subcategory
    Object.entries(answers).forEach(([questionId, value]) => {
      if (typeof value !== "number") return;

      const questionIdNum = Number.parseInt(questionId);
      const question = spiritualGiftsQuestions.find(
        (q) => q.id === questionIdNum
      );

      if (question && question.subcategory) {
        scores[question.subcategory].total += value;
        scores[question.subcategory].count += 1;
      }
    });
  }

  // Calculate average scores
  const maxPossibleScore = 5; // Maximum rating value
  const results: CategoryScore[] = Object.entries(scores)
    .filter(([_, { count }]) => count > 0)
    .map(([subcategory, { total, count }]) => {
      const score = total / count;
      return {
        category:
          spiritualGiftsCategories[
            subcategory as keyof typeof spiritualGiftsCategories
          ],
        score: Number.parseFloat(score.toFixed(1)),
        percentage: Number.parseFloat(
          ((score / maxPossibleScore) * 100).toFixed(1)
        ),
        type: "scale" as const,
        subcategory: subcategory,
      };
    })
    .sort((a, b) => b.score - a.score);

  return results;
}
