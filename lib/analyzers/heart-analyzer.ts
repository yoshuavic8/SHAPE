// Fungsi untuk menganalisis hasrat hati
import { CategoryScore } from '../types/shape-types';
import { analyzeReflectiveAnswer } from './reflective-analyzer';

/**
 * Menganalisis jawaban kuesioner hasrat hati
 * @param data Jawaban kuesioner
 * @param heartCategories Kategori hasrat hati
 * @param heartQuestions Pertanyaan hasrat hati
 * @returns Array skor kategori
 */
export function analyzeHeartDesire(
  data: any,
  heartCategories: Record<string, string>,
  heartQuestions: any[]
): CategoryScore[] {
  const scores: Record<string, { total: number; count: number }> = {};
  const textAnswers: Record<string, string> = {};
  const multipleChoiceAnswers: Record<
    string,
    { questionId: string; choices: string[] }
  > = {};
  const reflectiveInsights: Record<string, any> = {};
  const allReflectiveAnswers: string[] = [];

  // Initialize scores object for each sphere of influence
  const spheres = [
    "religion", // Religion/Spirituality
    "family", // Family
    "education", // Education
    "government", // Government
    "media", // Media
    "arts", // Arts & Entertainment
    "business", // Business/Economy
    "reflection", // Reflection
  ];

  spheres.forEach((sphere) => {
    scores[sphere] = { total: 0, count: 0 };
  });

  // Check if data is in the new format (with raw_answers)
  const answers = data && typeof data === "object" && data.raw_answers ? data.raw_answers : data;

  // Process each answer
  Object.entries(answers || {}).forEach(([questionId, value]) => {
    const questionIdNum = Number.parseInt(questionId);
    const question = heartQuestions.find((q) => q.id === questionIdNum);

    if (!question) return;

    const subcategory = question.subcategory;

    // Process based on question type
    if (typeof value === "number" && subcategory) {
      // Handle scale questions
      scores[subcategory].total += value;
      scores[subcategory].count += 1;
    } else if (typeof value === "string" && subcategory === "reflection") {
      // Store open text answers
      textAnswers[questionId] = value;
    } else if (Array.isArray(value) && subcategory) {
      // Store multiple choice answers with their subcategory
      multipleChoiceAnswers[questionId] = {
        questionId,
        choices: value,
      };

      // Also add to the score of the subcategory
      scores[subcategory].total += 5; // Give a high score for showing interest in this area
      scores[subcategory].count += 1;
    }
  });

  const maxPossibleScore = 5;
  let results: CategoryScore[] = [];

  // Process scale questions and calculate average scores for each sphere
  Object.entries(scores)
    .filter(([_, { count }]) => count > 0 && _ !== "reflection")
    .forEach(([sphere, { total, count }]) => {
      const score = total / count;
      results.push({
        category: heartCategories[sphere as keyof typeof heartCategories],
        score: Number.parseFloat(score.toFixed(1)),
        percentage: Number.parseFloat(
          ((score / maxPossibleScore) * 100).toFixed(1)
        ),
        type: "scale" as const,
        subcategory: sphere,
      });
    });

  // Sort results by score (highest first)
  results = results.sort((a, b) => b.score - a.score);

  // Proses jawaban reflektif
  Object.entries(textAnswers).forEach(([questionId, answer]) => {
    if (answer.trim()) {
      const questionIdNum = Number.parseInt(questionId);
      let questionText = "";

      if (questionIdNum === 42) {
        questionText = "Bidang yang paling dirasakan sebagai panggilan hidup";
      } else if (questionIdNum === 43) {
        questionText =
          "Perubahan yang ingin dibuat dengan sumber daya tak terbatas";
      }

      // Analisis jawaban
      const analysis = analyzeReflectiveAnswer(answer);
      reflectiveInsights[questionId] = {
        questionText,
        answer,
        analysis,
      };

      allReflectiveAnswers.push(answer);

      // Tambahkan hasil analisis ke results
      results.push({
        category: `Refleksi: ${questionText}`,
        content: answer,
        score: 5,
        percentage: 100,
        type: "open" as const,
        metadata: {
          spheres: analysis.spheres,
          themes: analysis.themes,
          sentiment: analysis.sentiment,
          keywords: analysis.keywords,
        },
      });
    }
  });

  // Jika ada jawaban reflektif, tambahkan wawasan terintegrasi
  if (Object.keys(reflectiveInsights).length > 0) {
    // Gabungkan semua jawaban reflektif untuk analisis menyeluruh
    const combinedAnswer = allReflectiveAnswers.join(" ");
    const combinedAnalysis = analyzeReflectiveAnswer(combinedAnswer);

    // Tambahkan wawasan terintegrasi ke results
    results.push({
      category: "Wawasan Terintegrasi",
      description: `Berdasarkan refleksi Anda, bidang ${
        combinedAnalysis.spheres.map((s) => heartCategories[s as keyof typeof heartCategories]).join(", ")
      } tampaknya paling penting bagi Anda. Tema utama yang muncul adalah ${
        combinedAnalysis.themes.join(", ")
      }.`,
      score: 5,
      percentage: 100,
      type: "reflection" as const,
      metadata: {
        spheres: combinedAnalysis.spheres,
        themes: combinedAnalysis.themes,
        sentiment: combinedAnalysis.sentiment,
        keywords: combinedAnalysis.keywords,
      },
    });
  }

  // Add insights from multiple choice answers
  Object.entries(multipleChoiceAnswers).forEach(([questionId, data]) => {
    if (data && data.choices && data.choices.length > 0) {
      const questionIdNum = Number.parseInt(questionId);
      const question = heartQuestions.find((q) => q.id === questionIdNum);
      
      if (question && question.subcategory) {
        const subcategoryName = heartCategories[question.subcategory as keyof typeof heartCategories];
        
        results.push({
          category: `${subcategoryName}: ${data.choices.join(", ")}`,
          score: 4.5,
          percentage: 90,
          type: "multiple" as const,
          subcategory: question.subcategory,
        });
      }
    }
  });

  return results;
}
