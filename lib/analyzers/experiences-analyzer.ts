// Fungsi untuk menganalisis pengalaman
import { CategoryScore } from '../types/shape-types';
import { analyzeReflectiveAnswer } from './reflective-analyzer';

/**
 * Menganalisis jawaban kuesioner pengalaman
 * @param data Jawaban kuesioner
 * @param experiencesCategories Kategori pengalaman
 * @param experiencesQuestions Pertanyaan pengalaman
 * @returns Array skor kategori
 */
export function analyzeExperiences(
  data: any,
  experiencesCategories: Record<string, string>,
  experiencesQuestions: any[]
): CategoryScore[] {
  const results: CategoryScore[] = [];
  const textAnswers: Record<string, string> = {};
  const multipleChoiceAnswers: Record<string, string[]> = {};
  const allTextAnswers: string[] = [];

  // Check if data is in the new format (with raw_answers)
  const answers = data && typeof data === "object" && data.raw_answers ? data.raw_answers : data;

  // Process each answer
  Object.entries(answers || {}).forEach(([questionId, value]) => {
    const questionIdNum = Number.parseInt(questionId);
    const question = experiencesQuestions.find(q => q.id === questionIdNum);

    if (!question) return;

    // Process based on question type
    if (question.type === "open" && typeof value === "string" && value.trim()) {
      // Store open text answers
      textAnswers[questionId] = value;
      allTextAnswers.push(value);
    } else if (question.type === "multiple" && Array.isArray(value) && value.length > 0) {
      // Store multiple choice answers
      multipleChoiceAnswers[questionId] = value;
    }
  });

  // Process open text answers
  Object.entries(textAnswers).forEach(([questionId, answer]) => {
    const questionIdNum = Number.parseInt(questionId);
    const question = experiencesQuestions.find(q => q.id === questionIdNum);

    if (question && question.subcategory) {
      // Analyze the text
      const analysis = analyzeReflectiveAnswer(answer);

      // Add to results
      results.push({
        category: experiencesCategories[question.subcategory as keyof typeof experiencesCategories],
        content: answer,
        score: 5,
        percentage: 100,
        type: "open" as const,
        metadata: {
          themes: analysis.themes,
          keywords: analysis.keywords,
          sentiment: analysis.sentiment,
          length: analysis.length,
        },
      });

      // Add insights based on the analysis
      if (analysis.themes.length > 0) {
        results.push({
          category: `Insight: ${experiencesCategories[question.subcategory as keyof typeof experiencesCategories]}`,
          description: `Tema utama dalam jawaban Anda: ${analysis.themes.join(", ")}`,
          score: 4.5,
          percentage: 90,
          type: "insight" as const,
        });
      }

      // Add sentiment-based insights
      if (analysis.sentiment === "positive") {
        results.push({
          category: `Refleksi Positif: ${experiencesCategories[question.subcategory as keyof typeof experiencesCategories]}`,
          description: "Anda memiliki pandangan positif tentang pengalaman ini, yang menunjukkan kekuatan dan ketahanan.",
          score: 4.8,
          percentage: 96,
          type: "insight" as const,
        });
      } else if (analysis.sentiment === "negative") {
        results.push({
          category: `Area Pertumbuhan: ${experiencesCategories[question.subcategory as keyof typeof experiencesCategories]}`,
          description: "Pengalaman ini mungkin menantang, tetapi dapat menjadi sumber kekuatan dan kebijaksanaan.",
          score: 4.2,
          percentage: 84,
          type: "insight" as const,
        });
      }
    }
  });

  // Process multiple choice answers
  Object.entries(multipleChoiceAnswers).forEach(([questionId, choices]) => {
    const questionIdNum = Number.parseInt(questionId);
    const question = experiencesQuestions.find(q => q.id === questionIdNum);

    if (question && question.subcategory) {
      // Add to results
      results.push({
        category: experiencesCategories[question.subcategory as keyof typeof experiencesCategories],
        description: choices.join(", "),
        score: 4.5,
        percentage: 90,
        type: "multiple" as const,
      });

      // Add specific insights based on the question
      if (questionIdNum === 83) { // Professional experience
        results.push({
          category: "Insight: Pengalaman Profesional",
          description: `Pengalaman profesional Anda di bidang ${choices.join(", ")} dapat menjadi aset berharga dalam pelayanan.`,
          score: 4.3,
          percentage: 86,
          type: "insight" as const,
        });
      } else if (questionIdNum === 84) { // Leadership roles
        if (choices.includes("Tidak Ada")) {
          results.push({
            category: "Insight: Pengalaman Kepemimpinan",
            description: "Meskipun Anda belum memiliki pengalaman kepemimpinan formal, Anda dapat mengembangkan keterampilan ini melalui pelatihan dan mentoring.",
            score: 3.5,
            percentage: 70,
            type: "insight" as const,
          });
        } else {
          results.push({
            category: "Insight: Pengalaman Kepemimpinan",
            description: `Pengalaman kepemimpinan Anda sebagai ${choices.join(", ")} memberikan fondasi yang kuat untuk peran kepemimpinan di masa depan.`,
            score: 4.7,
            percentage: 94,
            type: "insight" as const,
          });
        }
      } else if (questionIdNum === 87) { // Ministry types
        results.push({
          category: "Insight: Jenis Pelayanan",
          description: `Pengalaman pelayanan Anda dalam ${choices.join(", ")} menunjukkan area di mana Anda dapat berkontribusi secara efektif.`,
          score: 4.6,
          percentage: 92,
          type: "insight" as const,
        });
      }
    }
  });

  // Analyze all text answers together for comprehensive insights
  if (allTextAnswers.length > 0) {
    const combinedText = allTextAnswers.join(" ");
    const combinedAnalysis = analyzeReflectiveAnswer(combinedText);

    // Add comprehensive insights
    results.push({
      category: "Wawasan Komprehensif Pengalaman",
      description: `Berdasarkan semua pengalaman Anda, tema utama yang muncul adalah ${combinedAnalysis.themes.join(", ")}. Pengalaman-pengalaman ini telah membentuk Anda dan mempersiapkan Anda untuk melayani dengan cara yang unik.`,
      score: 5,
      percentage: 100,
      type: "comprehensive" as const,
      metadata: {
        themes: combinedAnalysis.themes,
        keywords: combinedAnalysis.keywords,
        sentiment: combinedAnalysis.sentiment,
      },
    });

    // Add recommendations based on experiences
    results.push({
      category: "Rekomendasi Berdasarkan Pengalaman",
      description: "Berdasarkan pengalaman Anda, pertimbangkan untuk menggunakan kekuatan dan pelajaran dari masa lalu untuk melayani orang lain. Pengalaman hidup Anda adalah alat yang berharga untuk membantu orang lain yang mungkin menghadapi situasi serupa.",
      score: 4.8,
      percentage: 96,
      type: "recommendation" as const,
    });
  }

  return results;
}
