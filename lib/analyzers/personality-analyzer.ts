// Fungsi untuk menganalisis kepribadian dan kemampuan
import { CategoryScore } from '../types/shape-types';
import { getMBTIAnalysis } from '../mbti';
import { getSpiritualGiftsCorrelation, getHeartDesireCorrelation } from '../correlations';

/**
 * Mendapatkan kejelasan preferensi
 * @param strength Kekuatan preferensi (0-100)
 * @returns Kejelasan preferensi (Slight, Moderate, Clear, Very Clear)
 */
function getPreferenceClarity(strength: number): string {
  if (strength < 25) return "Slight";
  if (strength < 50) return "Moderate";
  if (strength < 75) return "Clear";
  return "Very Clear";
}

/**
 * Menganalisis jawaban kuesioner kepribadian dan kemampuan
 * @param data Jawaban kuesioner
 * @param personalityCategories Kategori kepribadian
 * @param personalityQuestions Pertanyaan kepribadian
 * @returns Array skor kategori
 */
export function analyzePersonality(
  data: any,
  personalityCategories: Record<string, string>,
  personalityQuestions: any[]
): CategoryScore[] {
  const scores: Record<string, { total: number; count: number }> = {};
  const textAnswers: Record<string, string> = {};
  const multipleChoiceAnswers: Record<string, string[]> = {};

  // Initialize scores for MBTI dimensions
  const mbtiDimensions = [
    "e", "i", // Extraversion vs Introversion
    "s", "n", // Sensing vs Intuition
    "t", "f", // Thinking vs Feeling
    "j", "p", // Judging vs Perceiving
  ];

  // Initialize scores for abilities categories
  const abilitiesCategories = [
    "natural_talent",
    "technical_skills",
    "achievements",
    "development_potential",
    "problem_solving",
    "reflection",
    // Specific abilities
    "menulis",
    "public speaking",
    "seni",
    "musik",
    "organisasi",
    "analitis",
    "teknologi",
    "interpersonal",
    "kepemimpinan",
    "kreatif",
    "mengajar",
    "konseling",
  ];

  // Initialize all scores
  [...mbtiDimensions, ...abilitiesCategories].forEach(category => {
    scores[category] = { total: 0, count: 0 };
  });

  // Check if data is in the new format (with raw_answers)
  const answers = data && typeof data === "object" && data.raw_answers ? data.raw_answers : data;

  // Process each answer
  Object.entries(answers || {}).forEach(([questionId, value]) => {
    const questionIdNum = Number.parseInt(questionId);
    const question = personalityQuestions.find(q => q.id === questionIdNum);

    if (!question) return;

    // Process based on question type
    if (question.type === "binary" && typeof value === "string") {
      // Handle binary questions (MBTI)
      const dimension = value.toLowerCase();
      if (mbtiDimensions.includes(dimension)) {
        scores[dimension].total += 1;
        scores[dimension].count += 1;

        // Also increment the opposite dimension's count (but not total)
        // This helps calculate the percentage later
        const oppositeDimension = {
          e: "i", i: "e",
          s: "n", n: "s",
          t: "f", f: "t",
          j: "p", p: "j"
        }[dimension];
        
        if (oppositeDimension) {
          scores[oppositeDimension].count += 1;
        }
      }
    } else if (question.type === "open" && typeof value === "string") {
      // Handle open text questions
      textAnswers[questionId] = value;
    } else if (question.type === "multiple" && Array.isArray(value)) {
      // Handle multiple choice questions
      multipleChoiceAnswers[questionId] = value;

      // Process abilities based on selected options
      if (question.subcategory) {
        scores[question.subcategory].total += 5; // Give a high score for this category
        scores[question.subcategory].count += 1;

        // Process specific abilities
        value.forEach(option => {
          const lowerOption = option.toLowerCase();
          
          // Map options to specific abilities
          if (lowerOption.includes("menulis") || lowerOption.includes("linguistik")) {
            scores["menulis"].total += 5;
            scores["menulis"].count += 1;
          }
          if (lowerOption.includes("public speaking") || lowerOption.includes("berbicara")) {
            scores["public speaking"].total += 5;
            scores["public speaking"].count += 1;
          }
          if (lowerOption.includes("seni") || lowerOption.includes("artistik") || lowerOption.includes("desain")) {
            scores["seni"].total += 5;
            scores["seni"].count += 1;
          }
          if (lowerOption.includes("musik")) {
            scores["musik"].total += 5;
            scores["musik"].count += 1;
          }
          if (lowerOption.includes("organisasi") || lowerOption.includes("administrasi")) {
            scores["organisasi"].total += 5;
            scores["organisasi"].count += 1;
          }
          if (lowerOption.includes("analitis") || lowerOption.includes("analisis")) {
            scores["analitis"].total += 5;
            scores["analitis"].count += 1;
          }
          if (lowerOption.includes("teknologi") || lowerOption.includes("komputer")) {
            scores["teknologi"].total += 5;
            scores["teknologi"].count += 1;
          }
          if (lowerOption.includes("sosial") || lowerOption.includes("interpersonal")) {
            scores["interpersonal"].total += 5;
            scores["interpersonal"].count += 1;
          }
          if (lowerOption.includes("kepemimpinan") || lowerOption.includes("memimpin")) {
            scores["kepemimpinan"].total += 5;
            scores["kepemimpinan"].count += 1;
          }
          if (lowerOption.includes("kreatif") || lowerOption.includes("kreativitas")) {
            scores["kreatif"].total += 5;
            scores["kreatif"].count += 1;
          }
          if (lowerOption.includes("mengajar") || lowerOption.includes("melatih")) {
            scores["mengajar"].total += 5;
            scores["mengajar"].count += 1;
          }
          if (lowerOption.includes("konseling") || lowerOption.includes("mentoring")) {
            scores["konseling"].total += 5;
            scores["konseling"].count += 1;
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
      // Skip MBTI dimensions for now, we'll handle them separately
      if (mbtiDimensions.includes(dimension)) return;

      // For abilities, calculate the score as a percentage of the maximum
      const score = total / count;
      results.push({
        category: personalityCategories[dimension as keyof typeof personalityCategories] || dimension,
        score: Number.parseFloat(score.toFixed(1)),
        percentage: Number.parseFloat(((score / maxPossibleScore) * 100).toFixed(1)),
        type: "scale" as const,
      });
    });

  // Determine personality type (MBTI approach)
  const iScore = scores["i"].total || 0;
  const eScore = scores["e"].total || 0;
  const sScore = scores["s"].total || 0;
  const nScore = scores["n"].total || 0;
  const tScore = scores["t"].total || 0;
  const fScore = scores["f"].total || 0;
  const jScore = scores["j"].total || 0;
  const pScore = scores["p"].total || 0;

  // Calculate total questions for each dimension
  const eiTotal = scores["e"].count + scores["i"].count || 1;
  const snTotal = scores["s"].count + scores["n"].count || 1;
  const tfTotal = scores["t"].count + scores["f"].count || 1;
  const jpTotal = scores["j"].count + scores["p"].count || 1;

  // Calculate strength of preference as a percentage
  const eiStrength = Math.abs((eScore - iScore) / eiTotal) * 100;
  const snStrength = Math.abs((sScore - nScore) / snTotal) * 100;
  const tfStrength = Math.abs((tScore - fScore) / tfTotal) * 100;
  const jpStrength = Math.abs((jScore - pScore) / jpTotal) * 100;

  // Determine clarity of preference
  const eiClarity = getPreferenceClarity(eiStrength);
  const snClarity = getPreferenceClarity(snStrength);
  const tfClarity = getPreferenceClarity(tfStrength);
  const jpClarity = getPreferenceClarity(jpStrength);

  // Generate MBTI type
  const personalityType = [
    eScore > iScore ? "E" : "I",
    nScore > sScore ? "N" : "S",
    tScore > fScore ? "T" : "F",
    jScore > pScore ? "J" : "P",
  ].join("");

  // Add personality type to results
  results.push({
    category: `Tipe Kepribadian: ${personalityType}`,
    score: 5,
    percentage: 100,
    type: "personality" as const,
  });

  // Add dimension preferences to results
  results.push({
    category: eScore > iScore ? "Ekstrovert (E)" : "Introvert (I)",
    description: `${eiClarity} preference (${Math.round(eiStrength)}%)`,
    score: 5,
    percentage: eiStrength,
    type: "personality" as const,
  });

  results.push({
    category: nScore > sScore ? "Intuition (N)" : "Sensing (S)",
    description: `${snClarity} preference (${Math.round(snStrength)}%)`,
    score: 5,
    percentage: snStrength,
    type: "personality" as const,
  });

  results.push({
    category: tScore > fScore ? "Thinking (T)" : "Feeling (F)",
    description: `${tfClarity} preference (${Math.round(tfStrength)}%)`,
    score: 5,
    percentage: tfStrength,
    type: "personality" as const,
  });

  results.push({
    category: jScore > pScore ? "Judging (J)" : "Perceiving (P)",
    description: `${jpClarity} preference (${Math.round(jpStrength)}%)`,
    score: 5,
    percentage: jpStrength,
    type: "personality" as const,
  });

  // Get MBTI analysis if available
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

    // Add MBTI correlations with other SHAPE components
    const spiritualGiftsCorrelation = getSpiritualGiftsCorrelation(personalityType);
    results.push({
      category: "Korelasi MBTI dengan Karunia Spiritual",
      description: `Tipe kepribadian ${personalityType} Anda sering berkorelasi dengan karunia spiritual berikut: ${spiritualGiftsCorrelation.join(", ")}`,
      score: 4.2,
      percentage: 84,
      type: "personality" as const,
    });

    const heartDesireCorrelation = getHeartDesireCorrelation(personalityType);
    results.push({
      category: "Korelasi MBTI dengan Hasrat Hati",
      description: `Tipe kepribadian ${personalityType} Anda sering berkorelasi dengan hasrat hati berikut: ${heartDesireCorrelation.join(", ")}`,
      score: 4.2,
      percentage: 84,
      type: "personality" as const,
    });
  }

  // Process abilities from multiple choice answers
  Object.entries(multipleChoiceAnswers).forEach(([questionId, choices]) => {
    const questionIdNum = Number.parseInt(questionId);
    const question = personalityQuestions.find(q => q.id === questionIdNum);

    if (question && question.subcategory && choices.length > 0) {
      // Add the selected abilities to results
      results.push({
        category: `${personalityCategories[question.subcategory as keyof typeof personalityCategories]}: ${choices.join(", ")}`,
        score: 4.5,
        percentage: 90,
        type: "ability" as const,
      });
    }
  });

  // Process reflective answers
  Object.entries(textAnswers).forEach(([questionId, answer]) => {
    if (answer.trim()) {
      const questionIdNum = Number.parseInt(questionId);
      const question = personalityQuestions.find(q => q.id === questionIdNum);

      if (question) {
        results.push({
          category: `Refleksi: ${question.text}`,
          content: answer,
          score: 4,
          percentage: 80,
          type: "reflection" as const,
        });
      }
    }
  });

  // Add MBTI-Abilities integration insights
  if (personalityType) {
    // Add insights based on MBTI type and abilities
    if (personalityType.includes("I") && personalityType.includes("N") && (scores["menulis"].count > 0 || scores["analitis"].count > 0)) {
      results.push({
        category: "Insight: Tipe MBTI Anda (I dan N) mendukung kemampuan menulis dan analitis Anda",
        score: 4.5,
        percentage: 90,
        type: "personality" as const,
      });
    }

    if (personalityType.includes("E") && personalityType.includes("F") && (scores["interpersonal"].count > 0 || scores["public speaking"].count > 0)) {
      results.push({
        category: "Insight: Tipe MBTI Anda (E dan F) mendukung kemampuan interpersonal dan public speaking Anda",
        score: 4.5,
        percentage: 90,
        type: "personality" as const,
      });
    }

    if (personalityType.includes("S") && personalityType.includes("J") && (scores["organisasi"].count > 0 || scores["teknologi"].count > 0)) {
      results.push({
        category: "Insight: Tipe MBTI Anda (S dan J) mendukung kemampuan organisasi dan teknologi Anda",
        score: 4.5,
        percentage: 90,
        type: "personality" as const,
      });
    }

    if (personalityType.includes("N") && personalityType.includes("P") && (scores["kreatif"].count > 0 || scores["seni"].count > 0)) {
      results.push({
        category: "Insight: Tipe MBTI Anda (N dan P) mendukung kemampuan kreatif dan seni Anda",
        score: 4.5,
        percentage: 90,
        type: "personality" as const,
      });
    }
  }

  return results;
}
