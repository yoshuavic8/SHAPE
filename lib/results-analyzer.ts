import { questionnaireCategories } from "./questionnaire-data";
import {
  getMBTIAnalysis,
  getMBTIMinistryRecommendations,
  getMBTICareerRecommendations,
} from "./mbti-analysis-complete";

export interface CategoryScore {
  category: string;
  score: number;
  percentage: number;
  type?: "scale" | "open" | "multiple" | "theme" | "personality" | "ability";
  content?: string; // Untuk jawaban esai
  description?: string; // Untuk deskripsi tambahan
}

export interface ShapeProfile {
  spiritualGifts: {
    category: string;
    score: number;
    percentage: number;
  }[];
  heartDesire: {
    category: string;
    score: number;
    percentage: number;
  }[];
  personality: {
    type: string; // Tipe MBTI
    analysis: any; // Analisis MBTI
  };
  abilities: {
    category: string;
    score: number;
    percentage: number;
  }[];
  experiences: {
    category: string;
    content?: string;
    description?: string;
  }[];
  shapeCode: string; // Kode SHAPE
}

export interface ShapeRecommendations {
  purposeStatement: string;
  ministryAreas: string[];
  learningPathways: string[];
  bibleVerse: string;
  personalizedAdvice: string | string[];
  strengthsWeaknesses: {
    strengths: string[];
    weaknesses: string[];
  };
  ministryRecommendations: string[];
  careerRecommendations: string[];
  developmentRecommendations: string[];
  shapeSynergy: string[];
  communityRoles: string[];
  shapeProfile?: ShapeProfile;
}

interface Answers {
  [questionId: string]: any;
}

interface Question {
  id: number;
  subcategory?: string;
  type?: string;
  text?: string;
}

const spiritualGiftsQuestions = [
  // Teaching (Mengajar) - 4 questions
  { id: 1, subcategory: "teaching" },
  { id: 2, subcategory: "teaching" },
  { id: 3, subcategory: "teaching" },
  { id: 4, subcategory: "teaching" },

  // Serving (Melayani) - 4 questions
  { id: 5, subcategory: "serving" },
  { id: 6, subcategory: "serving" },
  { id: 7, subcategory: "serving" },
  { id: 8, subcategory: "serving" },

  // Leadership (Memimpin) - 4 questions
  { id: 9, subcategory: "leadership" },
  { id: 10, subcategory: "leadership" },
  { id: 11, subcategory: "leadership" },
  { id: 12, subcategory: "leadership" },

  // Prophecy (Nubuat) - 4 questions
  { id: 13, subcategory: "prophecy" },
  { id: 14, subcategory: "prophecy" },
  { id: 15, subcategory: "prophecy" },
  { id: 16, subcategory: "prophecy" },

  // Giving (Memberi) - 4 questions
  { id: 17, subcategory: "giving" },
  { id: 18, subcategory: "giving" },
  { id: 19, subcategory: "giving" },
  { id: 20, subcategory: "giving" },

  // Mercy (Kemurahan) - 4 questions
  { id: 21, subcategory: "mercy" },
  { id: 22, subcategory: "mercy" },
  { id: 23, subcategory: "mercy" },
  { id: 24, subcategory: "mercy" },

  // Evangelism (Evangelisme) - 4 questions
  { id: 25, subcategory: "evangelism" },
  { id: 26, subcategory: "evangelism" },
  { id: 27, subcategory: "evangelism" },
  { id: 28, subcategory: "evangelism" },

  // Knowledge (Pengetahuan) - 4 questions
  { id: 29, subcategory: "knowledge" },
  { id: 30, subcategory: "knowledge" },
  { id: 31, subcategory: "knowledge" },
  { id: 32, subcategory: "knowledge" },

  // Wisdom (Hikmat) - 4 questions
  { id: 33, subcategory: "wisdom" },
  { id: 34, subcategory: "wisdom" },
  { id: 35, subcategory: "wisdom" },
  { id: 36, subcategory: "wisdom" },

  // Faith (Iman) - 4 questions
  { id: 37, subcategory: "faith" },
  { id: 38, subcategory: "faith" },
  { id: 39, subcategory: "faith" },
  { id: 40, subcategory: "faith" },

  // Healing (Penyembuhan) - 4 questions
  { id: 41, subcategory: "healing" },
  { id: 42, subcategory: "healing" },
  { id: 43, subcategory: "healing" },
  { id: 44, subcategory: "healing" },

  // Shepherding (Membimbing) - 4 questions
  { id: 45, subcategory: "shepherding" },
  { id: 46, subcategory: "shepherding" },
  { id: 47, subcategory: "shepherding" },
  { id: 48, subcategory: "shepherding" },

  // Administration (Administrasi) - 4 questions
  { id: 49, subcategory: "administration" },
  { id: 50, subcategory: "administration" },
  { id: 51, subcategory: "administration" },
  { id: 52, subcategory: "administration" },

  // Tongues (Bahasa Roh) - 4 questions
  { id: 53, subcategory: "tongues" },
  { id: 54, subcategory: "tongues" },
  { id: 55, subcategory: "tongues" },
  { id: 56, subcategory: "tongues" },

  // Interpretation (Menafsirkan Bahasa Roh) - 4 questions
  { id: 57, subcategory: "interpretation" },
  { id: 58, subcategory: "interpretation" },
  { id: 59, subcategory: "interpretation" },
  { id: 60, subcategory: "interpretation" },

  // Discernment (Membedakan Roh) - 4 questions
  { id: 61, subcategory: "discernment" },
  { id: 62, subcategory: "discernment" },
  { id: 63, subcategory: "discernment" },
  { id: 64, subcategory: "discernment" },
];

export function analyzeSpiritualGifts(data: any): CategoryScore[] {
  const scores: Record<string, { total: number; count: number }> = {};

  // Initialize scores object for each spiritual gift category
  Object.keys(questionnaireCategories.spiritual.subcategories).forEach(
    (subcategory) => {
      scores[subcategory] = { total: 0, count: 0 };
    }
  );

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

    // If categories are already calculated, we can use them directly
    if (data.categories && Object.keys(data.categories).length > 0) {
      const maxPossibleScore = 5; // Maximum rating value
      const results: CategoryScore[] = Object.entries(data.categories)
        .map(([subcategory, score]) => {
          return {
            category:
              questionnaireCategories.spiritual.subcategories[
                subcategory as keyof typeof questionnaireCategories.spiritual.subcategories
              ] || subcategory,
            score: Number(score),
            percentage: Number.parseFloat(
              ((Number(score) / maxPossibleScore) * 100).toFixed(1)
            ),
            type: "scale" as const,
          };
        })
        .sort((a, b) => b.score - a.score);

      return results;
    }
  } else if (data && typeof data === "object" && data.spiritual) {
    // Legacy format: data is just a number
    return [
      {
        category: "Spiritual",
        score: Number(data.spiritual),
        percentage: Number.parseFloat(
          ((Number(data.spiritual) / 5) * 100).toFixed(1)
        ),
        type: "scale" as const,
      },
    ];
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
          questionnaireCategories.spiritual.subcategories[
            subcategory as keyof typeof questionnaireCategories.spiritual.subcategories
          ],
        score: Number.parseFloat(score.toFixed(1)),
        percentage: Number.parseFloat(
          ((score / maxPossibleScore) * 100).toFixed(1)
        ),
        type: "scale" as const,
      };
    })
    .sort((a, b) => b.score - a.score);

  return results;
}

export function analyzeHeartDesire(answers: Answers): CategoryScore[] {
  const scores: Record<string, { total: number; count: number }> = {};
  const textAnswers: Record<string, string> = {};
  const multipleChoiceAnswers: Record<string, string[]> = {};

  // Initialize scores object for each category
  const categories = [
    "passion",
    "values",
    "emotions",
    "activities",
    "reflection",
  ];
  categories.forEach((category) => {
    scores[category] = { total: 0, count: 0 };
  });

  // Define heart questions
  const heartQuestions: Question[] = [
    // Passion questions
    { id: 21, subcategory: "passion", type: "scale" },
    { id: 22, subcategory: "passion", type: "scale" },
    { id: 23, subcategory: "passion", type: "scale" },
    { id: 24, subcategory: "passion", type: "multiple" },
    { id: 25, subcategory: "passion", type: "multiple" },
    // Values questions
    { id: 26, subcategory: "values", type: "scale" },
    { id: 27, subcategory: "values", type: "scale" },
    { id: 28, subcategory: "values", type: "scale" },
    // Emotions questions
    { id: 29, subcategory: "emotions", type: "scale" },
    { id: 30, subcategory: "emotions", type: "scale" },
    // Reflection questions
    {
      id: 31,
      subcategory: "reflection",
      type: "open",
      text: "Apa yang membuat Anda paling bersemangat dalam hidup?",
    },
    {
      id: 32,
      subcategory: "reflection",
      type: "open",
      text: "Apa nilai-nilai yang paling penting bagi Anda?",
    },
  ];

  // Process answers
  Object.entries(answers).forEach(([questionId, value]) => {
    const questionIdNum = Number.parseInt(questionId);
    const question = heartQuestions.find(
      (q: Question) => q.id === questionIdNum
    );

    if (!question) return;

    if (question.type === "scale" && typeof value === "number") {
      // Handle scale questions
      if (question.subcategory) {
        scores[question.subcategory].total += value;
        scores[question.subcategory].count += 1;
      }
    } else if (question.type === "open" && typeof value === "string") {
      // Store open text answers
      textAnswers[questionId] = value;
    } else if (question.type === "multiple" && Array.isArray(value)) {
      // Store multiple choice answers
      multipleChoiceAnswers[questionId] = value;
    }
  });

  const maxPossibleScore = 5;
  let results: CategoryScore[] = [];

  // Process scale questions
  Object.entries(scores)
    .filter(([_, { count }]) => count > 0)
    .forEach(([category, { total, count }]) => {
      const score = total / count;
      results.push({
        category: category,
        score: Number.parseFloat(score.toFixed(1)),
        percentage: Number.parseFloat(
          ((score / maxPossibleScore) * 100).toFixed(1)
        ),
        type: "scale" as const,
      });
    });

  // Process multiple choice answers
  Object.entries(multipleChoiceAnswers).forEach(([questionId, choices]) => {
    const question = heartQuestions.find(
      (q: Question) => q.id === Number.parseInt(questionId)
    );
    if (!question) return;

    // Add weight based on question type
    const weight = question.subcategory === "passion" ? 5 : 4;

    // Jika pertanyaan tentang pengurutan
    if (question.text?.includes("Urutkan")) {
      choices.forEach((choice, index) => {
        results.push({
          category: choice,
          score: 5 - index * 0.5, // Skor menurun berdasarkan urutan
          percentage: 100 - index * 10,
          type: "multiple" as const,
        });
      });
    }
    // Jika pertanyaan pilihan biasa
    else {
      choices.forEach((choice) => {
        results.push({
          category: choice,
          score: weight,
          percentage: (weight / maxPossibleScore) * 100,
          type: "multiple" as const,
        });
      });
    }
  });

  // Add insights from text answers
  Object.entries(textAnswers).forEach(([questionId, answer]) => {
    if (answer.trim()) {
      const question = heartQuestions.find(
        (q: Question) => q.id === Number.parseInt(questionId)
      );
      if (question?.subcategory === "reflection") {
        results.push({
          category: `Refleksi: ${question.text}`,
          content: answer,
          score: 5,
          percentage: 100,
          type: "open" as const,
        });
      }
    }
  });

  // Sort results by score
  results.sort((a, b) => b.score - a.score);

  return results;
}

// Fungsi analyzeAbilities digabungkan ke dalam analyzePersonality

export function analyzePersonality(answers: Answers): CategoryScore[] {
  const scores: Record<string, { total: number; count: number }> = {};
  const textAnswers: Record<string, string> = {};
  const multipleChoiceAnswers: Record<string, string[]> = {};

  // Initialize scores object for MBTI dimensions and abilities
  const dimensions = [
    // MBTI dimensions
    "ekstrovert",
    "introvert",
    "sensing",
    "intuition",
    "thinking",
    "feeling",
    "judging",
    "perceiving",
    "reflection",
    // Abilities categories
    "natural_talent",
    "technical_skills",
    "achievements",
    "development_potential",
    "problem_solving",
    // Specific abilities
    "menulis",
    "public speaking",
    "seni",
    "musik",
    "organisasi",
    "analitis",
    "teknologi",
    "interpersonal",
    "kreativitas",
  ];
  dimensions.forEach((dimension) => {
    scores[dimension] = { total: 0, count: 0 };
  });

  // Process answers
  Object.entries(answers).forEach(([questionId, value]) => {
    const questionIdNum = Number.parseInt(questionId);

    // Handle scale questions (MBTI dimensions)
    if (
      typeof value === "number" &&
      questionIdNum >= 46 &&
      questionIdNum <= 69
    ) {
      // Map question IDs to their respective subcategories based on the new structure
      let subcategory = "";

      // Extraversion vs. Introversion questions (46-51)
      if (questionIdNum >= 46 && questionIdNum <= 51) {
        if (questionIdNum === 49) {
          subcategory = "introvert"; // Question 49 measures introversion
        } else {
          subcategory = "ekstrovert"; // Questions 46-48, 50-51 measure extraversion
        }
      }
      // Sensing vs. Intuition questions (52-57)
      else if (questionIdNum >= 52 && questionIdNum <= 57) {
        if (
          questionIdNum === 52 ||
          questionIdNum === 54 ||
          questionIdNum === 56
        ) {
          subcategory = "sensing"; // Questions 52, 54, 56 measure sensing
        } else {
          subcategory = "intuition"; // Questions 53, 55, 57 measure intuition
        }
      }
      // Thinking vs. Feeling questions (58-63)
      else if (questionIdNum >= 58 && questionIdNum <= 63) {
        if (
          questionIdNum === 58 ||
          questionIdNum === 60 ||
          questionIdNum === 62
        ) {
          subcategory = "thinking"; // Questions 58, 60, 62 measure thinking
        } else {
          subcategory = "feeling"; // Questions 59, 61, 63 measure feeling
        }
      }
      // Judging vs. Perceiving questions (64-69)
      else if (questionIdNum >= 64 && questionIdNum <= 69) {
        if (
          questionIdNum === 64 ||
          questionIdNum === 66 ||
          questionIdNum === 68
        ) {
          subcategory = "judging"; // Questions 64, 66, 68 measure judging
        } else {
          subcategory = "perceiving"; // Questions 65, 67, 69 measure perceiving
        }
      }

      if (subcategory) {
        scores[subcategory].total += value;
        scores[subcategory].count += 1;
      }
    }
    // Handle open text questions (reflection and abilities)
    else if (
      typeof value === "string" &&
      ((questionIdNum >= 70 && questionIdNum <= 73) || // MBTI reflection questions
        (questionIdNum >= 75 && questionIdNum <= 77) || // Abilities open questions
        questionIdNum === 79) // Problem solving question
    ) {
      textAnswers[questionId] = value;
    }
    // Handle multiple choice questions (abilities)
    else if (
      Array.isArray(value) &&
      (questionIdNum === 74 || questionIdNum === 76 || questionIdNum === 78)
    ) {
      multipleChoiceAnswers[questionId] = value;

      // Process natural talents (question 74)
      if (questionIdNum === 74) {
        value.forEach((choice) => {
          if (choice.includes("Analitis")) {
            scores["analitis"].total += 5;
            scores["analitis"].count += 1;
          }
          if (choice.includes("Artistik")) {
            scores["seni"].total += 5;
            scores["seni"].count += 1;
            scores["kreativitas"].total += 5;
            scores["kreativitas"].count += 1;
          }
          if (choice.includes("Kinestetik")) {
            scores["natural_talent"].total += 5;
            scores["natural_talent"].count += 1;
          }
          if (choice.includes("Sosial")) {
            scores["interpersonal"].total += 5;
            scores["interpersonal"].count += 1;
          }
          if (choice.includes("Linguistik")) {
            scores["menulis"].total += 5;
            scores["menulis"].count += 1;
            scores["public speaking"].total += 5;
            scores["public speaking"].count += 1;
          }
        });
      }

      // Process technical skills (question 76)
      if (questionIdNum === 76) {
        value.forEach((choice) => {
          if (choice.includes("Teknologi")) {
            scores["teknologi"].total += 5;
            scores["teknologi"].count += 1;
          }
          if (choice.includes("Seni")) {
            scores["seni"].total += 5;
            scores["seni"].count += 1;
          }
          if (choice.includes("Komunikasi")) {
            scores["menulis"].total += 5;
            scores["menulis"].count += 1;
            scores["public speaking"].total += 5;
            scores["public speaking"].count += 1;
          }
          if (choice.includes("Analisis")) {
            scores["analitis"].total += 5;
            scores["analitis"].count += 1;
          }
          if (choice.includes("Interpersonal")) {
            scores["interpersonal"].total += 5;
            scores["interpersonal"].count += 1;
          }
          if (choice.includes("Organisasi")) {
            scores["organisasi"].total += 5;
            scores["organisasi"].count += 1;
          }
          if (choice.includes("Kreativitas")) {
            scores["kreativitas"].total += 5;
            scores["kreativitas"].count += 1;
          }
        });
      }

      // Process development potential (question 78)
      if (questionIdNum === 78) {
        value.forEach((choice) => {
          if (choice.includes("Teknologi")) {
            scores["development_potential"].total += 5;
            scores["development_potential"].count += 1;
            scores["teknologi"].total += 3;
            scores["teknologi"].count += 1;
          }
          if (choice.includes("Kewirausahaan")) {
            scores["development_potential"].total += 5;
            scores["development_potential"].count += 1;
          }
          if (choice.includes("Seni")) {
            scores["development_potential"].total += 5;
            scores["development_potential"].count += 1;
            scores["seni"].total += 3;
            scores["seni"].count += 1;
          }
          if (choice.includes("Konseling")) {
            scores["development_potential"].total += 5;
            scores["development_potential"].count += 1;
            scores["interpersonal"].total += 3;
            scores["interpersonal"].count += 1;
          }
          if (choice.includes("Pengembangan komunitas")) {
            scores["development_potential"].total += 5;
            scores["development_potential"].count += 1;
            scores["organisasi"].total += 3;
            scores["organisasi"].count += 1;
          }
          if (choice.includes("Kepemimpinan")) {
            scores["development_potential"].total += 5;
            scores["development_potential"].count += 1;
          }
          if (choice.includes("Penelitian")) {
            scores["development_potential"].total += 5;
            scores["development_potential"].count += 1;
            scores["analitis"].total += 3;
            scores["analitis"].count += 1;
          }
        });
      }
    }
  });

  // Calculate average scores for each dimension
  const maxPossibleScore = 5; // Maximum rating value
  const results: CategoryScore[] = [];

  // Add dimension scores to results
  Object.entries(scores)
    .filter(([dimension, { count }]) => count > 0 && dimension !== "reflection")
    .forEach(([dimension, { total, count }]) => {
      const score = total / count;
      results.push({
        category:
          questionnaireCategories.personality.subcategories[
            dimension as keyof typeof questionnaireCategories.personality.subcategories
          ],
        score: Number.parseFloat(score.toFixed(1)),
        percentage: Number.parseFloat(
          ((score / maxPossibleScore) * 100).toFixed(1)
        ),
        type: "scale" as const,
      });
    });

  // Determine personality type (MBTI approach)
  const introvertScore =
    scores["introvert"].total / (scores["introvert"].count || 1);
  const extrovertScore =
    scores["ekstrovert"].total / (scores["ekstrovert"].count || 1);
  const sensingScore = scores["sensing"].total / (scores["sensing"].count || 1);
  const intuitionScore =
    scores["intuition"].total / (scores["intuition"].count || 1);
  const thinkingScore =
    scores["thinking"].total / (scores["thinking"].count || 1);
  const feelingScore = scores["feeling"].total / (scores["feeling"].count || 1);
  const judgingScore = scores["judging"].total / (scores["judging"].count || 1);
  const perceivingScore =
    scores["perceiving"].total / (scores["perceiving"].count || 1);

  // Generate MBTI type
  const personalityType = [
    extrovertScore > introvertScore ? "E" : "I",
    intuitionScore > sensingScore ? "N" : "S",
    thinkingScore > feelingScore ? "T" : "F",
    judgingScore > perceivingScore ? "J" : "P",
  ].join("");

  // Add personality type to results
  results.push({
    category: `Tipe Kepribadian: ${personalityType}`,
    score: 5,
    percentage: 100,
    type: "personality" as const,
  });

  // Get MBTI analysis from our comprehensive data
  const mbtiAnalysis = getMBTIAnalysis(personalityType);

  // Add MBTI description if available
  if (mbtiAnalysis) {
    // Add title and general description
    results.push({
      category: `Deskripsi: ${mbtiAnalysis.title}`,
      description: mbtiAnalysis.description.general,
      score: 5,
      percentage: 100,
      type: "personality" as const,
    });

    // Add core values
    results.push({
      category: `Nilai Inti`,
      description: mbtiAnalysis.description.coreValues,
      score: 5,
      percentage: 100,
      type: "personality" as const,
    });

    // Add dominant abilities
    mbtiAnalysis.strengths.dominantAbilities.forEach((ability, index) => {
      results.push({
        category: `Kemampuan: ${ability.title}`,
        description: ability.description,
        score: 5 - index * 0.5, // Slightly decrease score for each subsequent ability
        percentage: 100 - index * 10,
        type: "ability" as const,
      });
    });

    // Add weaknesses
    mbtiAnalysis.weaknesses.forEach((weakness, index) => {
      if (index < 2) {
        // Only show top 2 weaknesses
        results.push({
          category: `Area Pengembangan: ${weakness.title}`,
          description: weakness.description,
          score: 3,
          percentage: 60,
          type: "personality" as const,
        });
      }
    });

    // Add ministry recommendations
    mbtiAnalysis.recommendations.ministry.forEach((ministry, index) => {
      if (index < 3) {
        // Only show top 3 recommendations
        results.push({
          category: `Rekomendasi Pelayanan: ${ministry}`,
          score: 4.5 - index * 0.3,
          percentage: 90 - index * 6,
          type: "personality" as const,
        });
      }
    });

    // Add career recommendations
    mbtiAnalysis.recommendations.career.forEach((career, index) => {
      if (index < 3) {
        // Only show top 3 recommendations
        results.push({
          category: `Rekomendasi Karir: ${career}`,
          score: 4.5 - index * 0.3,
          percentage: 90 - index * 6,
          type: "personality" as const,
        });
      }
    });
  }

  // Add insights from text answers
  Object.entries(textAnswers).forEach(([questionId, text]) => {
    if (text && text.trim() !== "") {
      let category = "";
      let subcategory = "";

      switch (questionId) {
        // MBTI reflection questions
        case "70":
          category = "Situasi Otentik";
          break;
        case "71":
          category = "Kebiasaan/Sifat Menonjol";
          break;
        case "72":
          category = "Respons Terhadap Tekanan";
          break;
        case "73":
          category = "Area Pengembangan Diri";
          break;

        // Abilities questions
        case "75":
          category = "Keterampilan yang Dipuji";
          subcategory = "technical_skills";
          // Analyze text for skills
          const lowerText = text.toLowerCase();
          if (lowerText.includes("menulis") || lowerText.includes("tulis")) {
            scores["menulis"].total += 5;
            scores["menulis"].count += 1;
          }
          if (
            lowerText.includes("bicara") ||
            lowerText.includes("presentasi") ||
            lowerText.includes("komunikasi")
          ) {
            scores["public speaking"].total += 5;
            scores["public speaking"].count += 1;
          }
          if (
            lowerText.includes("seni") ||
            lowerText.includes("desain") ||
            lowerText.includes("gambar")
          ) {
            scores["seni"].total += 5;
            scores["seni"].count += 1;
          }
          if (
            lowerText.includes("musik") ||
            lowerText.includes("nyanyi") ||
            lowerText.includes("alat musik")
          ) {
            scores["musik"].total += 5;
            scores["musik"].count += 1;
          }
          if (
            lowerText.includes("organisasi") ||
            lowerText.includes("mengatur") ||
            lowerText.includes("manajemen")
          ) {
            scores["organisasi"].total += 5;
            scores["organisasi"].count += 1;
          }
          if (
            lowerText.includes("analisis") ||
            lowerText.includes("logika") ||
            lowerText.includes("pemecahan masalah")
          ) {
            scores["analitis"].total += 5;
            scores["analitis"].count += 1;
          }
          if (
            lowerText.includes("teknologi") ||
            lowerText.includes("komputer") ||
            lowerText.includes("program")
          ) {
            scores["teknologi"].total += 5;
            scores["teknologi"].count += 1;
          }
          break;
        case "77":
          category = "Pencapaian Terbesar";
          subcategory = "achievements";
          break;
        case "79":
          category = "Pendekatan Pemecahan Masalah";
          subcategory = "problem_solving";
          // Analyze problem solving approach
          const problemSolvingText = text.toLowerCase();
          if (
            problemSolvingText.includes("analisis") ||
            problemSolvingText.includes("logis") ||
            problemSolvingText.includes("sistematis")
          ) {
            if (personalityType.includes("T")) {
              results.push({
                category:
                  "Insight: Pendekatan analitis Anda konsisten dengan preferensi Thinking (T)",
                score: 4.5,
                percentage: 90,
              });
            }
          }
          if (
            problemSolvingText.includes("intuisi") ||
            problemSolvingText.includes("kreatif") ||
            problemSolvingText.includes("pola")
          ) {
            if (personalityType.includes("N")) {
              results.push({
                category:
                  "Insight: Pendekatan intuitif Anda konsisten dengan preferensi Intuition (N)",
                score: 4.5,
                percentage: 90,
              });
            }
          }
          if (
            problemSolvingText.includes("diskusi") ||
            problemSolvingText.includes("kolaborasi") ||
            problemSolvingText.includes("orang lain")
          ) {
            if (
              personalityType.includes("E") &&
              personalityType.includes("F")
            ) {
              results.push({
                category:
                  "Insight: Pendekatan kolaboratif Anda konsisten dengan preferensi Extraversion (E) dan Feeling (F)",
                score: 4.5,
                percentage: 90,
              });
            }
          }
          if (
            problemSolvingText.includes("praktis") ||
            problemSolvingText.includes("langsung") ||
            problemSolvingText.includes("konkret")
          ) {
            if (personalityType.includes("S")) {
              results.push({
                category:
                  "Insight: Pendekatan praktis Anda konsisten dengan preferensi Sensing (S)",
                score: 4.5,
                percentage: 90,
              });
            }
          }
          break;
      }

      if (category) {
        results.push({
          category,
          content: text,
          score: 5,
          percentage: 100,
          type: "open" as const,
        });

        // Add subcategory score if applicable
        if (subcategory) {
          scores[subcategory].total += 5;
          scores[subcategory].count += 1;
        }
      }
    }
  });

  // Add insights from multiple choice answers
  Object.entries(multipleChoiceAnswers).forEach(([questionId, choices]) => {
    if (choices && choices.length > 0) {
      let category = "";

      switch (questionId) {
        case "74":
          category = "Bakat Alami";
          break;
        case "76":
          category = "Keterampilan Teknis";
          break;
        case "78":
          category = "Potensi Pengembangan";
          break;
      }

      if (category) {
        results.push({
          category: `${category}: ${choices.join(", ")}`,
          score: 4.5,
          percentage: 90,
          type: "multiple" as const,
        });
      }
    }
  });

  // Add abilities scores to results
  Object.entries(scores)
    .filter(
      ([dimension, { count }]) =>
        count > 0 &&
        ![
          "ekstrovert",
          "introvert",
          "sensing",
          "intuition",
          "thinking",
          "feeling",
          "judging",
          "perceiving",
          "reflection",
        ].includes(dimension)
    )
    .forEach(([dimension, { total, count }]) => {
      const score = total / count;
      let categoryName = dimension;

      // Map dimension to readable category name
      switch (dimension) {
        case "natural_talent":
          categoryName = "Bakat Alami";
          break;
        case "technical_skills":
          categoryName = "Keterampilan Teknis";
          break;
        case "achievements":
          categoryName = "Pencapaian";
          break;
        case "development_potential":
          categoryName = "Potensi Pengembangan";
          break;
        case "problem_solving":
          categoryName = "Pemecahan Masalah";
          break;
        case "menulis":
          categoryName = "Kemampuan Menulis";
          break;
        case "public speaking":
          categoryName = "Public Speaking";
          break;
        case "seni":
          categoryName = "Seni & Desain";
          break;
        case "musik":
          categoryName = "Musik";
          break;
        case "organisasi":
          categoryName = "Organisasi & Manajemen";
          break;
        case "analitis":
          categoryName = "Analitis & Logika";
          break;
        case "teknologi":
          categoryName = "Teknologi";
          break;
        case "interpersonal":
          categoryName = "Interpersonal";
          break;
        case "kreativitas":
          categoryName = "Kreativitas";
          break;
      }

      results.push({
        category: `Kemampuan: ${categoryName}`,
        score: Number.parseFloat(score.toFixed(1)),
        percentage: Number.parseFloat(((score / 5) * 100).toFixed(1)),
        type: "ability" as const,
      });
    });

  // Add MBTI-Abilities integration insights
  if (personalityType) {
    // Add insights based on MBTI type and abilities
    if (
      personalityType.includes("I") &&
      personalityType.includes("N") &&
      (scores["menulis"].count > 0 || scores["analitis"].count > 0)
    ) {
      results.push({
        category:
          "Insight: Tipe MBTI Anda (I dan N) mendukung kemampuan menulis dan analitis Anda",
        score: 4.5,
        percentage: 90,
        type: "personality" as const,
      });
    }

    if (
      personalityType.includes("E") &&
      personalityType.includes("F") &&
      (scores["interpersonal"].count > 0 || scores["public speaking"].count > 0)
    ) {
      results.push({
        category:
          "Insight: Tipe MBTI Anda (E dan F) mendukung kemampuan interpersonal dan public speaking Anda",
        score: 4.5,
        percentage: 90,
        type: "personality" as const,
      });
    }

    if (
      personalityType.includes("S") &&
      personalityType.includes("J") &&
      scores["organisasi"].count > 0
    ) {
      results.push({
        category:
          "Insight: Tipe MBTI Anda (S dan J) mendukung kemampuan organisasi dan manajemen Anda",
        score: 4.5,
        percentage: 90,
        type: "personality" as const,
      });
    }

    if (
      personalityType.includes("N") &&
      personalityType.includes("P") &&
      (scores["kreativitas"].count > 0 || scores["seni"].count > 0)
    ) {
      results.push({
        category:
          "Insight: Tipe MBTI Anda (N dan P) mendukung kemampuan kreatif dan artistik Anda",
        score: 4.5,
        percentage: 90,
        type: "personality" as const,
      });
    }

    if (
      personalityType.includes("T") &&
      (scores["teknologi"].count > 0 || scores["analitis"].count > 0)
    ) {
      results.push({
        category:
          "Insight: Tipe MBTI Anda (T) mendukung kemampuan teknologi dan analitis Anda",
        score: 4.5,
        percentage: 90,
        type: "personality" as const,
      });
    }
  }

  // Sort results by score
  results.sort((a, b) => {
    // Always put personality type at the top
    if (a.category.includes("Tipe Kepribadian")) return -1;
    if (b.category.includes("Tipe Kepribadian")) return 1;
    // Then description
    if (a.category.includes("Deskripsi")) return -1;
    if (b.category.includes("Deskripsi")) return 1;
    // Then sort by score
    return b.score - a.score;
  });

  return results;
}

export function analyzeExperiences(answers: Answers): CategoryScore[] {
  const textAnswers: Record<string, string> = {};
  const multipleChoiceAnswers: Record<string, string[]> = {};
  const results: CategoryScore[] = [];
  const experienceThemes: Record<string, number> = {
    leadership: 0,
    teaching: 0,
    helping: 0,
    creativity: 0,
    analytical: 0,
    resilience: 0,
    spiritual: 0,
    relational: 0,
  };

  // Process answers
  Object.entries(answers).forEach(([questionId, value]) => {
    const questionIdNum = Number.parseInt(questionId);

    if (questionIdNum >= 74 && questionIdNum <= 86) {
      // Updated range to include new questions
      if (typeof value === "string") {
        // Handle open text questions
        textAnswers[questionId] = value;

        // Analyze text for themes
        const text = value.toLowerCase();

        // Leadership theme
        if (
          text.includes("memimpin") ||
          text.includes("koordinasi") ||
          text.includes("mengarahkan") ||
          text.includes("inisiatif") ||
          text.includes("tanggung jawab")
        ) {
          experienceThemes.leadership += 2;
        }

        // Teaching theme
        if (
          text.includes("mengajar") ||
          text.includes("menjelaskan") ||
          text.includes("membimbing") ||
          text.includes("pelatihan") ||
          text.includes("pendidikan")
        ) {
          experienceThemes.teaching += 2;
        }

        // Helping theme
        if (
          text.includes("membantu") ||
          text.includes("melayani") ||
          text.includes("menolong") ||
          text.includes("mendukung") ||
          text.includes("peduli")
        ) {
          experienceThemes.helping += 2;
        }

        // Creativity theme
        if (
          text.includes("kreatif") ||
          text.includes("seni") ||
          text.includes("inovasi") ||
          text.includes("desain") ||
          text.includes("menciptakan")
        ) {
          experienceThemes.creativity += 2;
        }

        // Analytical theme
        if (
          text.includes("analisis") ||
          text.includes("penelitian") ||
          text.includes("strategi") ||
          text.includes("pemecahan masalah") ||
          text.includes("logika")
        ) {
          experienceThemes.analytical += 2;
        }

        // Resilience theme
        if (
          text.includes("tantangan") ||
          text.includes("kesulitan") ||
          text.includes("bertahan") ||
          text.includes("bangkit") ||
          text.includes("kegagalan")
        ) {
          experienceThemes.resilience += 2;
        }

        // Spiritual theme
        if (
          text.includes("tuhan") ||
          text.includes("iman") ||
          text.includes("rohani") ||
          text.includes("doa") ||
          text.includes("gereja")
        ) {
          experienceThemes.spiritual += 2;
        }

        // Relational theme
        if (
          text.includes("hubungan") ||
          text.includes("keluarga") ||
          text.includes("teman") ||
          text.includes("komunitas") ||
          text.includes("sosial")
        ) {
          experienceThemes.relational += 2;
        }
      } else if (Array.isArray(value)) {
        // Handle multiple choice questions
        multipleChoiceAnswers[questionId] = value;

        // Analyze multiple choice answers for themes
        if (questionId === "75") {
          // Transformative experiences
          value.forEach((choice) => {
            const choiceLower = choice.toLowerCase();

            if (
              choiceLower.includes("karir") ||
              choiceLower.includes("pekerjaan")
            ) {
              experienceThemes.leadership += 1;
            }

            if (choiceLower.includes("pendidikan")) {
              experienceThemes.teaching += 1;
            }

            if (
              choiceLower.includes("pelayanan") ||
              choiceLower.includes("membantu")
            ) {
              experienceThemes.helping += 1;
            }

            if (
              choiceLower.includes("spiritual") ||
              choiceLower.includes("rohani")
            ) {
              experienceThemes.spiritual += 1;
            }

            if (
              choiceLower.includes("keluarga") ||
              choiceLower.includes("pernikahan")
            ) {
              experienceThemes.relational += 1;
            }

            if (
              choiceLower.includes("tantangan") ||
              choiceLower.includes("kesehatan") ||
              choiceLower.includes("kehilangan")
            ) {
              experienceThemes.resilience += 1;
            }
          });
        }
      }
    }
  });

  // Add insights from multiple choice answers
  if (
    multipleChoiceAnswers["75"] &&
    Array.isArray(multipleChoiceAnswers["75"])
  ) {
    multipleChoiceAnswers["75"].forEach((choice) => {
      results.push({
        category: choice,
        score: 5, // Give top score to explicitly chosen experiences
        percentage: 100,
        type: "multiple" as const,
      });
    });
  }

  // Add text answers as categories with more detailed analysis
  Object.entries(textAnswers).forEach(([questionId, text]) => {
    if (text && text.trim() !== "") {
      let category = "";
      let insight = "";

      switch (questionId) {
        case "74":
          category = "Pengalaman Berkesan";
          break;
        case "76":
          category = "Pelajaran dari Kesulitan";
          insight = "Menunjukkan ketahanan dan kemampuan adaptasi";
          experienceThemes.resilience += 3;
          break;
        case "77":
          category = "Pengaruh pada Tujuan Hidup";
          insight = "Membantu menentukan arah dan prioritas";
          break;
        case "78":
          category = "Pengalaman Pelayanan";
          insight = "Menunjukkan hati untuk melayani orang lain";
          experienceThemes.helping += 3;
          experienceThemes.spiritual += 2;
          break;
        case "79":
          category = "Pengaruh Pendidikan";
          insight = "Membentuk pola pikir dan keterampilan analitis";
          experienceThemes.teaching += 2;
          experienceThemes.analytical += 2;
          break;
        case "80":
          category = "Pengalaman Kerja";
          insight = "Mengembangkan keterampilan profesional";
          break;
        case "81":
          category = "Nilai dari Keluarga";
          insight = "Membentuk fondasi nilai dan hubungan";
          experienceThemes.relational += 3;
          break;
        case "82":
          category = "Kedekatan dengan Tuhan";
          insight = "Memperdalam hubungan spiritual";
          experienceThemes.spiritual += 3;
          break;
        case "83":
          category = "Membantu Orang Lain";
          insight = "Menunjukkan kemampuan empati dan pelayanan";
          experienceThemes.helping += 3;
          break;
        case "84":
          category = "Pengalaman Traumatis";
          insight = "Menunjukkan ketahanan dan pertumbuhan pasca-trauma";
          experienceThemes.resilience += 3;
          break;
        case "85":
          category = "Pengalaman Lintas Budaya";
          insight = "Memperluas perspektif dan adaptabilitas";
          experienceThemes.relational += 2;
          break;
        case "86":
          category = "Momen Penting";
          insight = "Menandai titik balik dalam perjalanan hidup";
          break;
      }

      if (category) {
        results.push({
          category,
          content: text,
          score: 5,
          percentage: 100,
          type: "open" as const,
        });

        // Add insight if available
        if (insight) {
          results.push({
            category: `Insight: ${insight}`,
            description: insight,
            score: 4,
            percentage: 80,
            type: "theme" as const,
          });
        }
      }
    }
  });

  // Add experience themes analysis
  const themeEntries = Object.entries(experienceThemes)
    .filter(([_, score]) => score > 0)
    .sort((a, b) => b[1] - a[1]);

  // Add top 3 themes to results
  themeEntries.slice(0, 3).forEach(([theme, _], index) => {
    let themeLabel = "";
    let themeDescription = "";

    switch (theme) {
      case "leadership":
        themeLabel = "Tema Pengalaman: Kepemimpinan";
        themeDescription =
          "Pengalaman Anda menunjukkan kemampuan memimpin dan mengarahkan";
        break;
      case "teaching":
        themeLabel = "Tema Pengalaman: Pengajaran";
        themeDescription =
          "Pengalaman Anda menunjukkan kemampuan mengajar dan membimbing";
        break;
      case "helping":
        themeLabel = "Tema Pengalaman: Pelayanan";
        themeDescription =
          "Pengalaman Anda menunjukkan hati untuk membantu orang lain";
        break;
      case "creativity":
        themeLabel = "Tema Pengalaman: Kreativitas";
        themeDescription =
          "Pengalaman Anda menunjukkan kemampuan berpikir kreatif";
        break;
      case "analytical":
        themeLabel = "Tema Pengalaman: Analitis";
        themeDescription =
          "Pengalaman Anda menunjukkan kemampuan analisis dan pemecahan masalah";
        break;
      case "resilience":
        themeLabel = "Tema Pengalaman: Ketahanan";
        themeDescription =
          "Pengalaman Anda menunjukkan ketahanan dalam menghadapi tantangan";
        break;
      case "spiritual":
        themeLabel = "Tema Pengalaman: Spiritual";
        themeDescription =
          "Pengalaman Anda menunjukkan pertumbuhan dan kedewasaan spiritual";
        break;
      case "relational":
        themeLabel = "Tema Pengalaman: Relasional";
        themeDescription =
          "Pengalaman Anda menunjukkan kemampuan membangun hubungan";
        break;
    }

    if (themeLabel) {
      results.push({
        category: themeLabel,
        score: 5 - index * 0.5,
        percentage: 100 - index * 10,
        type: "theme" as const,
      });

      results.push({
        category: themeDescription,
        description: themeDescription,
        score: 4.5 - index * 0.5,
        percentage: 90 - index * 10,
        type: "theme" as const,
      });
    }
  });

  // Add integration with other SHAPE components
  results.push({
    category:
      "Integrasi: Pengalaman Anda memperkuat karunia dan kemampuan alami Anda",
    score: 5,
    percentage: 100,
    type: "theme" as const,
  });

  return results;
}

export function generateShapeProfile(
  spiritualGifts: CategoryScore[],
  heartDesire: CategoryScore[],
  personality: CategoryScore[],
  experiences: CategoryScore[]
): ShapeProfile {
  // Dapatkan top spiritual gifts
  const topSpiritual = spiritualGifts
    .filter((gift) => gift.type === "scale")
    .slice(0, 3)
    .map((gift) => ({
      category: gift.category,
      score: gift.score,
      percentage: gift.percentage,
    }));

  // Dapatkan top heart desires
  const topHeart = heartDesire
    .filter((heart) => heart.type === "scale" || heart.type === "multiple")
    .slice(0, 3)
    .map((heart) => ({
      category: heart.category,
      score: heart.score,
      percentage: heart.percentage,
    }));

  // Dapatkan tipe MBTI dan analisisnya
  const personalityType =
    personality
      .find((p) => p.category.includes("Tipe Kepribadian"))
      ?.category.split(": ")[1] || "";

  const mbtiAnalysis = getMBTIAnalysis(personalityType);

  // Dapatkan top abilities
  const topAbilities = personality
    .filter((item) => item.type === "ability")
    .slice(0, 3)
    .map((ability) => ({
      category: ability.category.replace("Kemampuan: ", ""),
      score: ability.score,
      percentage: ability.percentage,
    }));

  // Dapatkan pengalaman berharga
  const valuableExperiences = experiences
    .filter((exp) => exp.type === "open" || exp.type === "theme")
    .map((exp) => ({
      category: exp.category,
      content: exp.content,
      description: exp.description,
    }));

  // Generate SHAPE code
  const shapeCode = `S-${topSpiritual[0]?.category || ""} | H-${
    topHeart[0]?.category || ""
  } | A-${topAbilities[0]?.category || ""} | P-${personalityType} | E-${
    valuableExperiences[0]?.category || ""
  }`;

  // Buat profil SHAPE
  return {
    spiritualGifts: topSpiritual,
    heartDesire: topHeart,
    personality: {
      type: personalityType,
      analysis: mbtiAnalysis,
    },
    abilities: topAbilities,
    experiences: valuableExperiences,
    shapeCode,
  };
}

export function generateShapeCode(
  spiritualGifts: CategoryScore[],
  heartDesire: CategoryScore[],
  personality: CategoryScore[], // Now includes abilities
  experiences: CategoryScore[]
): string {
  // Get top categories from each section
  const topSpiritual =
    spiritualGifts.length > 0 ? spiritualGifts[0].category : "Tidak Ada";
  const topHeart =
    heartDesire.length > 0 ? heartDesire[0].category : "Tidak Ada";
  // Get top abilities from personality results
  const topAbility =
    personality
      .filter((item) => item.category.includes("Kemampuan:"))
      .slice(0, 1)
      .map((item) => item.category.replace("Kemampuan: ", ""))[0] ||
    "Tidak Ada";

  // Get personality type
  const personalityType =
    personality
      .find((p) => p.category.includes("Tipe Kepribadian"))
      ?.category.split(": ")[1] || "Tidak Ada";

  // Get top experience
  const topExperience =
    experiences.length > 0 ? experiences[0].category : "Tidak Ada";

  // Generate SHAPE code
  return `S-${topSpiritual} | H-${topHeart} | A-${topAbility} | P-${personalityType} | E-${topExperience}`;
}

export interface ShapeRecommendations {
  purposeStatement: string;
  ministryAreas: string[];
  ministryRecommendations: string[];
  careerRecommendations: string[];
  developmentRecommendations: string[];
  bibleVerse: string;
  shapeSynergy: string[];
  personalizedAdvice: string | string[];
  strengthsWeaknesses: {
    strengths: string[];
    weaknesses: string[];
  };
  learningPathways: string[];
  communityRoles: string[];
  shapeProfile?: ShapeProfile;
}

export function generateRecommendations(
  spiritualGifts: CategoryScore[],
  heartDesire: CategoryScore[],
  personality: CategoryScore[], // Now includes abilities
  experiences: CategoryScore[]
): ShapeRecommendations {
  // Get top categories
  const topSpiritual = spiritualGifts.slice(0, 3).map((item) => item.category);
  const topHeart = heartDesire.slice(0, 3).map((item) => item.category);
  // Get top abilities from personality results
  const topAbility = personality
    .filter((item) => item.category.includes("Kemampuan:"))
    .slice(0, 3)
    .map((item) => item.category.replace("Kemampuan: ", ""));
  const personalityType =
    personality
      .find((p) => p.category.includes("Tipe Kepribadian"))
      ?.category.split(": ")[1] || "";
  const topExperience = experiences.slice(0, 3).map((item) => item.category);

  // Extract experience themes
  const experienceThemes = experiences
    .filter((exp) => exp.category.includes("Tema Pengalaman:"))
    .map((exp) => exp.category.replace("Tema Pengalaman: ", ""));

  // Generate more comprehensive purpose statement
  let purposeStatement = `Tujuan Anda adalah menggunakan karunia ${
    topSpiritual[0] || ""
  } `;

  // Add heart desire if available
  if (topHeart.length > 0) {
    purposeStatement += `dan passion di bidang ${topHeart[0] || ""} `;
  }

  // Add abilities if available
  if (topAbility.length > 0) {
    purposeStatement += `dengan kemampuan ${topAbility[0] || ""} `;
  }

  // Add personality type if available
  if (personalityType) {
    const mbtiAnalysis = getMBTIAnalysis(personalityType);
    if (mbtiAnalysis) {
      purposeStatement += `sesuai dengan kepribadian ${personalityType} (${mbtiAnalysis.title}) Anda `;
    } else {
      purposeStatement += `sesuai dengan kepribadian ${personalityType} Anda `;
    }
  }

  // Add experience theme if available
  if (experienceThemes.length > 0) {
    purposeStatement += `yang diperkuat oleh pengalaman Anda dalam bidang ${experienceThemes[0]}`;
  }

  purposeStatement += ".";

  // Generate ministry recommendations based on spiritual gifts and MBTI type
  let ministryRecommendations: string[] = [];

  // Add MBTI-based ministry recommendations
  if (personalityType) {
    const mbtiMinistryRecs = getMBTIMinistryRecommendations(personalityType);
    if (mbtiMinistryRecs && mbtiMinistryRecs.length > 0) {
      ministryRecommendations = [...mbtiMinistryRecs];
    }
  }

  // Spiritual gift based recommendations
  if (topSpiritual.some((gift) => gift.includes("Mengajar"))) {
    ministryRecommendations.push(
      "Guru Sekolah Minggu",
      "Pembuat Materi Pendidikan Kristen"
    );
  }
  if (topSpiritual.some((gift) => gift.includes("Melayani"))) {
    ministryRecommendations.push("Tim Pelayanan Praktis", "Tim Logistik Acara");
  }
  if (topSpiritual.some((gift) => gift.includes("Memimpin"))) {
    ministryRecommendations.push(
      "Pemimpin Kelompok Kecil",
      "Koordinator Pelayanan"
    );
  }
  if (topSpiritual.some((gift) => gift.includes("Nubuat"))) {
    ministryRecommendations.push("Pengkhotbah", "Pembicara Seminar");
  }
  if (topSpiritual.some((gift) => gift.includes("Memberi"))) {
    ministryRecommendations.push(
      "Pengelola Dana Pelayanan",
      "Koordinator Bantuan Sosial"
    );
  }
  if (topSpiritual.some((gift) => gift.includes("Kemurahan"))) {
    ministryRecommendations.push("Pelayanan Kunjungan", "Konselor Pastoral");
  }
  if (topSpiritual.some((gift) => gift.includes("Evangelisme"))) {
    ministryRecommendations.push("Tim Penginjilan", "Koordinator Outreach");
  }
  if (topSpiritual.some((gift) => gift.includes("Pengetahuan"))) {
    ministryRecommendations.push("Pengajar Alkitab", "Peneliti Teologi");
  }
  if (topSpiritual.some((gift) => gift.includes("Hikmat"))) {
    ministryRecommendations.push("Konselor", "Mentor");
  }
  if (topSpiritual.some((gift) => gift.includes("Iman"))) {
    ministryRecommendations.push("Pemimpin Doa", "Perintis Pelayanan Baru");
  }
  if (topSpiritual.some((gift) => gift.includes("Penyembuhan"))) {
    ministryRecommendations.push("Tim Doa Kesembuhan", "Pelayanan Pemulihan");
  }
  if (topSpiritual.some((gift) => gift.includes("Membimbing"))) {
    ministryRecommendations.push("Pemimpin Kelompok Kecil", "Mentor Rohani");
  }
  if (topSpiritual.some((gift) => gift.includes("Administrasi"))) {
    ministryRecommendations.push("Koordinator Acara", "Administrator Gereja");
  }

  // Heart desire based recommendations
  if (topHeart.includes("Anak-anak")) {
    ministryRecommendations.push("Pelayanan Anak", "Mentor Anak");
  }
  if (topHeart.includes("Misi")) {
    ministryRecommendations.push(
      "Tim Misi Jangka Pendek",
      "Pendukung Misionaris"
    );
  }

  // Abilities based recommendations
  if (topAbility.includes("Musik")) {
    ministryRecommendations.push("Tim Pujian", "Pengajar Musik");
  }
  if (topAbility.includes("Teknologi")) {
    ministryRecommendations.push(
      "Tim Multimedia",
      "Pengelola Media Sosial Gereja"
    );
  }

  // Remove duplicates from ministry recommendations
  ministryRecommendations = [...new Set(ministryRecommendations)];

  // Career recommendations
  let careerRecommendations: string[] = [];

  // Add MBTI-based career recommendations
  if (personalityType) {
    const mbtiCareerRecs = getMBTICareerRecommendations(personalityType);
    if (mbtiCareerRecs && mbtiCareerRecs.length > 0) {
      careerRecommendations = [...mbtiCareerRecs];
    }
  }

  // Combine spiritual gifts with abilities for career recommendations
  if (topSpiritual.some((gift) => gift.includes("Mengajar"))) {
    if (topAbility.includes("Menulis")) {
      careerRecommendations.push("Penulis", "Editor", "Guru");
    } else if (topAbility.includes("Public Speaking")) {
      careerRecommendations.push("Dosen", "Pelatih", "Pembicara");
    } else {
      careerRecommendations.push("Guru", "Pelatih", "Mentor");
    }
  }

  if (topSpiritual.some((gift) => gift.includes("Memimpin"))) {
    if (topAbility.includes("Organisasi")) {
      careerRecommendations.push("Manajer", "Direktur", "Administrator");
    } else if (topAbility.includes("Kepemimpinan")) {
      careerRecommendations.push(
        "CEO",
        "Pemimpin Organisasi",
        "Konsultan Kepemimpinan"
      );
    } else {
      careerRecommendations.push("Manajer", "Supervisor", "Koordinator");
    }
  }

  if (topSpiritual.some((gift) => gift.includes("Administrasi"))) {
    careerRecommendations.push(
      "Administrator",
      "Manajer Proyek",
      "Koordinator Acara"
    );
  }

  if (topSpiritual.some((gift) => gift.includes("Kemurahan"))) {
    careerRecommendations.push("Pekerja Sosial", "Konselor", "Perawat");
  }

  if (topSpiritual.some((gift) => gift.includes("Hikmat"))) {
    careerRecommendations.push("Konsultan", "Mediator", "Konselor");
  }

  // Remove duplicates from career recommendations
  careerRecommendations = [...new Set(careerRecommendations)];

  // Add additional personality based career recommendations if needed
  if (careerRecommendations.length < 3) {
    if (personalityType.includes("E") && personalityType.includes("F")) {
      careerRecommendations.push("Konselor", "Pekerja Sosial", "Pelatih");
    }
    if (personalityType.includes("I") && personalityType.includes("T")) {
      careerRecommendations.push("Peneliti", "Analis", "Programmer");
    }
  }

  // Reuse experience themes for career recommendations

  if (experienceThemes.length > 0) {
    if (experienceThemes.includes("Kepemimpinan")) {
      careerRecommendations.push(
        "Manajer Proyek",
        "Direktur Eksekutif",
        "Konsultan Kepemimpinan"
      );
    }
    if (experienceThemes.includes("Pengajaran")) {
      careerRecommendations.push(
        "Guru",
        "Pelatih",
        "Penulis Materi Pendidikan"
      );
    }
    if (experienceThemes.includes("Pelayanan")) {
      careerRecommendations.push(
        "Pekerja Sosial",
        "Konselor",
        "Koordinator Relawan"
      );
    }
    if (experienceThemes.includes("Kreativitas")) {
      careerRecommendations.push(
        "Desainer",
        "Penulis Kreatif",
        "Pengembang Konten"
      );
    }
    if (experienceThemes.includes("Analitis")) {
      careerRecommendations.push(
        "Analis Data",
        "Peneliti",
        "Konsultan Strategi"
      );
    }
    if (experienceThemes.includes("Ketahanan")) {
      careerRecommendations.push(
        "Coach Kehidupan",
        "Konselor Krisis",
        "Manajer Perubahan"
      );
    }
    if (experienceThemes.includes("Spiritual")) {
      careerRecommendations.push(
        "Pemimpin Rohani",
        "Penulis Spiritual",
        "Konselor Pastoral"
      );
    }
    if (experienceThemes.includes("Relasional")) {
      careerRecommendations.push(
        "HR Manager",
        "Mediator",
        "Community Organizer"
      );
    }
  }

  // Development recommendations
  const developmentRecommendations = [];

  // Based on top spiritual gifts
  topSpiritual.forEach((gift) => {
    const giftName = gift.split(" (")[0]; // Extract just the name part

    if (gift.includes("Mengajar")) {
      developmentRecommendations.push("Kursus metode pengajaran efektif");
    } else if (gift.includes("Memimpin")) {
      developmentRecommendations.push("Pelatihan kepemimpinan");
    } else if (gift.includes("Nubuat")) {
      developmentRecommendations.push("Studi mendalam tentang kitab para nabi");
    } else if (gift.includes("Evangelisme")) {
      developmentRecommendations.push("Pelatihan penginjilan kontekstual");
    } else if (gift.includes("Pengetahuan")) {
      developmentRecommendations.push("Studi teologi sistematis");
    } else if (gift.includes("Hikmat")) {
      developmentRecommendations.push("Studi kitab Amsal dan literatur hikmat");
    } else if (gift.includes("Penyembuhan")) {
      developmentRecommendations.push("Seminar doa kesembuhan");
    } else if (gift.includes("Membimbing")) {
      developmentRecommendations.push("Pelatihan mentoring dan pemuridan");
    } else if (gift.includes("Administrasi")) {
      developmentRecommendations.push("Kursus manajemen proyek");
    } else {
      developmentRecommendations.push(`Pengembangan karunia ${giftName}`);
    }
  });

  // Based on top abilities
  topAbility.forEach((ability) => {
    developmentRecommendations.push(`Kursus lanjutan dalam bidang ${ability}`);
  });

  // Integrate personality with abilities for development recommendations
  if (personalityType) {
    const mbtiAnalysis = getMBTIAnalysis(personalityType);
    if (mbtiAnalysis) {
      // Get technical skills from MBTI analysis
      mbtiAnalysis.strengths.technicalSkills.forEach((skill, index) => {
        if (index < 2) {
          // Only add top 2 skills
          developmentRecommendations.push(
            `Pengembangan keterampilan ${skill} (sesuai tipe kepribadian ${personalityType})`
          );
        }
      });

      // Get learning style from MBTI analysis
      if (mbtiAnalysis.strengths.learningStyle) {
        developmentRecommendations.push(
          `Tip Belajar: ${mbtiAnalysis.strengths.learningStyle}`
        );
      }
    }
  }

  // Based on experiences
  if (topExperience.includes("Pengalaman Pelayanan")) {
    developmentRecommendations.push("Pelatihan kepemimpinan pelayanan");
  }

  // Based on personality
  if (personalityType) {
    // Get MBTI analysis
    const mbtiAnalysis = getMBTIAnalysis(personalityType);
    if (mbtiAnalysis) {
      // Add development tips from MBTI analysis
      mbtiAnalysis.developmentTips.forEach((tip, index) => {
        if (index < 2) {
          // Only add top 2 tips
          developmentRecommendations.push(`${tip.title}: ${tip.description}`);
        }
      });
    } else {
      // Fallback to basic recommendations if no MBTI analysis available
      if (personalityType.includes("I")) {
        developmentRecommendations.push("Pelatihan public speaking");
      }
      if (personalityType.includes("P")) {
        developmentRecommendations.push("Kursus manajemen waktu");
      }
    }
  }

  // Bible verses based on spiritual gifts
  let bibleVerse = "";

  if (topSpiritual.some((gift) => gift.includes("Mengajar"))) {
    bibleVerse =
      '2 Timotius 2:15 - "Usahakanlah supaya engkau layak di hadapan Allah sebagai seorang pekerja yang tidak usah malu, yang berterus terang memberitakan perkataan kebenaran itu."';
  } else if (topSpiritual.some((gift) => gift.includes("Melayani"))) {
    bibleVerse =
      '1 Petrus 4:10 - "Layanilah seorang akan yang lain, sesuai dengan karunia yang telah diperoleh tiap-tiap orang sebagai pengurus yang baik dari kasih karunia Allah."';
  } else if (topSpiritual.some((gift) => gift.includes("Memimpin"))) {
    bibleVerse =
      '1 Timotius 3:2 - "Karena itu penilik jemaat haruslah seorang yang tak bercacat, suami dari satu isteri, dapat menahan diri, bijaksana, sopan, suka memberi tumpangan, cakap mengajar."';
  } else if (topSpiritual.some((gift) => gift.includes("Nubuat"))) {
    bibleVerse =
      '1 Korintus 14:3 - "Tetapi siapa yang bernubuat, ia berkata-kata kepada manusia, ia membangun, menasihati dan menghibur."';
  } else if (topSpiritual.some((gift) => gift.includes("Memberi"))) {
    bibleVerse =
      '2 Korintus 9:7 - "Hendaklah masing-masing memberikan menurut kerelaan hatinya, jangan dengan sedih hati atau karena paksaan, sebab Allah mengasihi orang yang memberi dengan sukacita."';
  } else if (topSpiritual.some((gift) => gift.includes("Kemurahan"))) {
    bibleVerse =
      'Matius 5:7 - "Berbahagialah orang yang murah hatinya, karena mereka akan beroleh kemurahan."';
  } else if (topSpiritual.some((gift) => gift.includes("Evangelisme"))) {
    bibleVerse =
      'Markus 16:15 - "Lalu Ia berkata kepada mereka: Pergilah ke seluruh dunia, beritakanlah Injil kepada segala makhluk."';
  } else if (topSpiritual.some((gift) => gift.includes("Iman"))) {
    bibleVerse =
      'Ibrani 11:1 - "Iman adalah dasar dari segala sesuatu yang kita harapkan dan bukti dari segala sesuatu yang tidak kita lihat."';
  } else {
    bibleVerse =
      'Yeremia 29:11 - "Sebab Aku ini mengetahui rancangan-rancangan apa yang ada pada-Ku mengenai kamu, demikianlah firman TUHAN, yaitu rancangan damai sejahtera dan bukan rancangan kecelakaan, untuk memberikan kepadamu hari depan yang penuh harapan."';
  }

  // Create integrated SHAPE profile
  const shapeProfileData = generateShapeProfile(
    spiritualGifts.filter((gift) => gift.type === "scale").slice(0, 5),
    heartDesire
      .filter((heart) => heart.type === "scale" || heart.type === "multiple")
      .slice(0, 5),
    personality,
    experiences
      .filter((exp) => exp.type === "open" || exp.type === "theme")
      .slice(0, 5)
  );

  // Generate SHAPE synergy insights
  const shapeSynergy = [];

  // Spiritual + Personality synergy
  if (topSpiritual.length > 0 && personalityType) {
    const mbtiAnalysis = getMBTIAnalysis(personalityType);
    if (mbtiAnalysis && mbtiAnalysis.shapeIntegration) {
      shapeSynergy.push(mbtiAnalysis.shapeIntegration.spiritualGifts);
    } else {
      // Fallback if no specific integration data
      if (
        topSpiritual.some((gift) => gift.includes("Mengajar")) &&
        personalityType.includes("J")
      ) {
        shapeSynergy.push(
          `Karunia mengajar Anda diperkuat oleh kepribadian terstruktur, membantu Anda menyampaikan materi dengan sistematis.`
        );
      }

      if (
        topSpiritual.some((gift) => gift.includes("Memimpin")) &&
        personalityType.includes("E")
      ) {
        shapeSynergy.push(
          `Karunia memimpin Anda diperkuat oleh kepribadian ekstrovert, membantu Anda menginspirasi dan memotivasi orang lain.`
        );
      }

      if (
        topSpiritual.some((gift) => gift.includes("Kemurahan")) &&
        personalityType.includes("F")
      ) {
        shapeSynergy.push(
          `Karunia kemurahan Anda diperkuat oleh kepribadian yang berorientasi perasaan, membantu Anda berempati dengan orang lain.`
        );
      }
    }
  }

  // Heart + Abilities synergy
  if (topHeart.length > 0 && topAbility.length > 0) {
    if (topHeart.includes("Anak-anak") && topAbility.includes("Kreativitas")) {
      shapeSynergy.push(
        `Passion Anda untuk anak-anak dikombinasikan dengan kemampuan kreatif memungkinkan Anda mengembangkan program anak yang menarik dan efektif.`
      );
    }

    if (topHeart.includes("Misi") && topAbility.includes("Public Speaking")) {
      shapeSynergy.push(
        `Passion Anda untuk misi dikombinasikan dengan kemampuan berbicara di depan umum membuat Anda efektif dalam mengkomunikasikan visi dan memobilisasi orang lain.`
      );
    }

    if (topHeart.includes("Pendidikan") && topAbility.includes("Menulis")) {
      shapeSynergy.push(
        `Passion Anda untuk pendidikan dikombinasikan dengan kemampuan menulis memungkinkan Anda mengembangkan materi pendidikan yang berdampak.`
      );
    }

    if (topHeart.includes("Teknologi") && topAbility.includes("Analitis")) {
      shapeSynergy.push(
        `Passion Anda untuk teknologi dikombinasikan dengan kemampuan analitis memungkinkan Anda mengembangkan solusi teknologi yang efektif untuk masalah nyata.`
      );
    }

    if (
      topAbility.includes("Musik") &&
      topHeart.some((heart) => heart.includes("Seni"))
    ) {
      shapeSynergy.push(
        "Kemampuan musik Anda selaras dengan passion untuk seni, menciptakan potensi untuk pelayanan kreatif yang kuat."
      );
    }
  }

  // Abilities + Experiences synergy
  if (topAbility.length > 0 && experienceThemes.length > 0) {
    if (
      topAbility.includes("Kepemimpinan") &&
      experienceThemes.includes("Kepemimpinan")
    ) {
      shapeSynergy.push(
        `Kemampuan kepemimpinan Anda telah diperkuat melalui pengalaman memimpin, memberikan Anda kredibilitas dan kebijaksanaan praktis.`
      );
    }

    if (
      topAbility.includes("Menulis") &&
      experienceThemes.includes("Kreativitas")
    ) {
      shapeSynergy.push(
        `Kemampuan menulis Anda diperkaya oleh pengalaman kreatif, memungkinkan Anda menghasilkan konten yang mendalam dan menarik.`
      );
    }

    if (
      topAbility.includes("Analitis") &&
      experienceThemes.includes("Analitis")
    ) {
      shapeSynergy.push(
        `Kemampuan analitis Anda telah dipertajam melalui pengalaman pemecahan masalah, memungkinkan Anda melihat pola dan solusi yang tidak terlihat oleh orang lain.`
      );
    }

    if (
      topAbility.includes("Interpersonal") &&
      experienceThemes.includes("Relasional")
    ) {
      shapeSynergy.push(
        `Kemampuan interpersonal Anda telah diperdalam melalui pengalaman membangun hubungan, memungkinkan Anda terhubung dengan orang lain dengan otentik dan efektif.`
      );
    }
  }

  // Spiritual + Heart synergy
  if (topSpiritual.length > 0 && topHeart.length > 0) {
    if (
      topSpiritual.some((gift) => gift.includes("Mengajar")) &&
      topHeart.includes("Pendidikan")
    ) {
      shapeSynergy.push(
        `Karunia mengajar Anda dikombinasikan dengan passion untuk pendidikan membuat Anda sangat efektif dalam mengembangkan program pendidikan rohani.`
      );
    }

    if (
      topSpiritual.some((gift) => gift.includes("Kemurahan")) &&
      topHeart.includes("Pelayanan Sosial")
    ) {
      shapeSynergy.push(
        `Karunia kemurahan Anda dikombinasikan dengan passion untuk pelayanan sosial membuat Anda sangat efektif dalam melayani mereka yang membutuhkan dengan kasih dan empati.`
      );
    }

    if (
      topSpiritual.some((gift) => gift.includes("Evangelisme")) &&
      topHeart.includes("Misi")
    ) {
      shapeSynergy.push(
        `Karunia evangelisme Anda dikombinasikan dengan passion untuk misi membuat Anda sangat efektif dalam menjangkau orang-orang dengan Injil di berbagai konteks budaya.`
      );
    }

    if (
      topSpiritual.some((gift) => gift.includes("Hikmat")) &&
      topHeart.includes("Konseling")
    ) {
      shapeSynergy.push(
        `Karunia hikmat Anda dikombinasikan dengan passion untuk konseling membuat Anda sangat efektif dalam memberikan nasihat yang bijaksana dan membantu orang lain menemukan solusi.`
      );
    }
  }

  // Personality + Experiences synergy
  if (personalityType && experienceThemes.length > 0) {
    const mbtiAnalysis = getMBTIAnalysis(personalityType);
    if (mbtiAnalysis && mbtiAnalysis.shapeIntegration) {
      shapeSynergy.push(mbtiAnalysis.shapeIntegration.experiences);
    } else {
      // Fallback if no specific integration data
      if (
        personalityType.includes("I") &&
        experienceThemes.includes("Ketahanan")
      ) {
        shapeSynergy.push(
          `Kepribadian introspektif Anda dikombinasikan dengan pengalaman ketahanan membuat Anda mampu membantu orang lain menemukan kekuatan dalam diri mereka sendiri.`
        );
      }

      if (
        personalityType.includes("E") &&
        experienceThemes.includes("Kepemimpinan")
      ) {
        shapeSynergy.push(
          `Kepribadian ekstrovert Anda dikombinasikan dengan pengalaman kepemimpinan membuat Anda mampu memobilisasi dan menginspirasi kelompok dengan efektif.`
        );
      }

      if (
        personalityType.includes("N") &&
        experienceThemes.includes("Kreativitas")
      ) {
        shapeSynergy.push(
          `Kepribadian intuitif Anda dikombinasikan dengan pengalaman kreatif membuat Anda mampu melihat kemungkinan baru dan solusi inovatif.`
        );
      }

      if (
        personalityType.includes("F") &&
        experienceThemes.includes("Relasional")
      ) {
        shapeSynergy.push(
          `Kepribadian yang berorientasi perasaan dikombinasikan dengan pengalaman relasional membuat Anda mampu terhubung dengan orang lain pada tingkat emosional yang mendalam.`
        );
      }
    }
  }

  // Add at least one synergy insight if none were generated
  if (shapeSynergy.length === 0) {
    shapeSynergy.push(
      "Kombinasi unik dari karunia, passion, kemampuan, kepribadian, dan pengalaman Anda menciptakan profil SHAPE yang khas untuk pelayanan."
    );
  }

  // Generate personalized advice based on SHAPE profile
  const personalizedAdvice: string[] = [];

  // Add advice based on personality type
  if (personalityType) {
    const mbtiAnalysis = getMBTIAnalysis(personalityType);
    if (mbtiAnalysis) {
      // Add learning style advice
      if (mbtiAnalysis.strengths.learningStyle) {
        personalizedAdvice.push(
          `Gaya Belajar: ${mbtiAnalysis.strengths.learningStyle}`
        );
      }

      // Add development tips
      mbtiAnalysis.developmentTips.forEach((tip, index) => {
        if (index < 3) {
          // Include top 3 tips
          personalizedAdvice.push(
            `Tip Pengembangan: ${tip.title} - ${tip.description}`
          );
        }
      });
    }
  }

  // Add advice based on spiritual gifts
  if (topSpiritual.length > 0) {
    if (topSpiritual.some((gift) => gift.includes("Mengajar"))) {
      personalizedAdvice.push(
        "Pertimbangkan untuk mengembangkan keterampilan komunikasi dan pengetahuan Alkitab Anda untuk memaksimalkan karunia mengajar."
      );
    }

    if (topSpiritual.some((gift) => gift.includes("Memimpin"))) {
      personalizedAdvice.push(
        "Investasikan waktu untuk mengembangkan keterampilan kepemimpinan dan membangun tim yang efektif."
      );
    }

    if (topSpiritual.some((gift) => gift.includes("Melayani"))) {
      personalizedAdvice.push(
        "Carilah kesempatan untuk melayani di balik layar dan mengembangkan keterampilan praktis yang dapat membantu orang lain."
      );
    }
  }

  // Add advice based on heart desires
  if (topHeart.length > 0) {
    if (topHeart.includes("Anak-anak")) {
      personalizedAdvice.push(
        "Pertimbangkan untuk mengambil kursus atau pelatihan tentang perkembangan anak dan pendidikan anak."
      );
    }

    if (topHeart.includes("Misi")) {
      personalizedAdvice.push(
        "Mulailah dengan mempelajari budaya dan bahasa dari kelompok yang ingin Anda jangkau."
      );
    }

    if (topHeart.includes("Teknologi")) {
      personalizedAdvice.push(
        "Tetap update dengan perkembangan teknologi terbaru dan bagaimana teknologi dapat digunakan untuk tujuan pelayanan."
      );
    }
  }

  // Strengths and weaknesses based on SHAPE profile
  const strengthsWeaknesses = {
    strengths: [] as string[],
    weaknesses: [] as string[],
  };

  // Add strengths based on MBTI
  if (personalityType) {
    const mbtiAnalysis = getMBTIAnalysis(personalityType);
    if (mbtiAnalysis) {
      // Add strengths from MBTI analysis
      mbtiAnalysis.strengths.dominantAbilities.forEach((ability) => {
        strengthsWeaknesses.strengths.push(
          `${ability.title}: ${ability.description}`
        );
      });

      // Add weaknesses from MBTI analysis
      mbtiAnalysis.weaknesses.forEach((weakness) => {
        strengthsWeaknesses.weaknesses.push(
          `${weakness.title}: ${weakness.description}`
        );
      });
    }
  }

  // Add strengths based on spiritual gifts
  topSpiritual.forEach((gift) => {
    const giftName = gift.split(" (")[0]; // Extract just the name part
    strengthsWeaknesses.strengths.push(
      `Karunia ${giftName}: Anda memiliki kemampuan alami dalam bidang ini yang dapat digunakan untuk melayani orang lain.`
    );
  });

  // Add strengths based on abilities
  topAbility.forEach((ability) => {
    strengthsWeaknesses.strengths.push(
      `Kemampuan ${ability}: Anda memiliki keterampilan yang dapat dikembangkan dan digunakan untuk melayani.`
    );
  });

  // Learning pathways based on SHAPE profile
  const learningPathways: string[] = [];

  // Add learning pathways based on spiritual gifts and abilities
  if (
    topSpiritual.some((gift) => gift.includes("Mengajar")) &&
    topAbility.includes("Public Speaking")
  ) {
    learningPathways.push("Kursus komunikasi publik dan teknik mengajar");
    learningPathways.push(
      "Studi Alkitab mendalam untuk memperkaya materi pengajaran"
    );
  }

  if (
    topSpiritual.some((gift) => gift.includes("Memimpin")) &&
    topAbility.includes("Kepemimpinan")
  ) {
    learningPathways.push("Program pengembangan kepemimpinan");
    learningPathways.push("Mentoring dengan pemimpin berpengalaman");
  }

  if (
    topSpiritual.some((gift) => gift.includes("Administrasi")) &&
    topAbility.includes("Organisasi")
  ) {
    learningPathways.push("Kursus manajemen proyek");
    learningPathways.push("Pelatihan software produktivitas dan organisasi");
  }

  // Add learning pathways based on personality type
  if (personalityType) {
    if (personalityType.includes("I")) {
      learningPathways.push(
        "Kursus komunikasi interpersonal untuk meningkatkan keterampilan sosial"
      );
    }

    if (personalityType.includes("E")) {
      learningPathways.push("Pelatihan manajemen energi dan refleksi diri");
    }

    if (personalityType.includes("N")) {
      learningPathways.push(
        "Kursus pemikiran strategis dan perencanaan jangka panjang"
      );
    }

    if (personalityType.includes("S")) {
      learningPathways.push("Pelatihan pemikiran inovatif dan kreativitas");
    }
  }

  // Community roles based on SHAPE profile
  const communityRoles: string[] = [];

  // Add community roles based on spiritual gifts
  if (topSpiritual.some((gift) => gift.includes("Mengajar"))) {
    communityRoles.push("Fasilitator kelompok studi Alkitab");
    communityRoles.push("Mentor untuk orang baru");
  }

  if (topSpiritual.some((gift) => gift.includes("Melayani"))) {
    communityRoles.push("Koordinator tim pelayanan praktis");
    communityRoles.push("Sukarelawan untuk kebutuhan komunitas");
  }

  if (topSpiritual.some((gift) => gift.includes("Kemurahan"))) {
    communityRoles.push("Anggota tim pelayanan kunjungan");
    communityRoles.push(
      "Pendamping untuk orang yang sedang mengalami kesulitan"
    );
  }

  // Add community roles based on heart desires
  if (topHeart.includes("Anak-anak")) {
    communityRoles.push("Guru sekolah minggu");
    communityRoles.push("Mentor anak-anak");
  }

  if (topHeart.includes("Lansia")) {
    communityRoles.push("Pendamping lansia");
    communityRoles.push("Koordinator program lansia");
  }

  if (topHeart.includes("Misi")) {
    communityRoles.push("Anggota tim misi jangka pendek");
    communityRoles.push("Pendukung misionaris");
  }

  // Create ministry areas from ministry recommendations
  const ministryAreas = [
    "Pelayanan Pemuridan",
    "Pelayanan Pengajaran",
    "Pelayanan Konseling",
    "Pelayanan Misi",
    "Pelayanan Musik",
  ];

  return {
    purposeStatement,
    ministryAreas,
    ministryRecommendations: ministryRecommendations.slice(0, 5),
    careerRecommendations: careerRecommendations.slice(0, 5),
    developmentRecommendations: developmentRecommendations.slice(0, 5),
    bibleVerse,
    shapeProfile: shapeProfileData,
    shapeSynergy,
    personalizedAdvice,
    strengthsWeaknesses,
    learningPathways,
    communityRoles,
  };
}

export interface AnalysisResults {
  spiritualGifts: CategoryScore[];
  heartDesire: CategoryScore[];
  personality: CategoryScore[]; // Now includes abilities
  experiences: CategoryScore[];
  shapeCode: string;
  recommendations: any;
}

export function analyzeResults(_answers: Answers): CategoryScore[] {
  // Fungsi ini dipertahankan untuk kompatibilitas dengan kode lama
  // Gunakan fungsi spesifik seperti analyzeSpiritualGifts, analyzeHeartDesire, dll.
  return [];
}
