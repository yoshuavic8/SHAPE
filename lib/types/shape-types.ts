// Tipe dan interface untuk SHAPE-E

export interface CategoryScore {
  category: string;
  score: number;
  percentage: number;
  type?:
    | "scale"
    | "open"
    | "multiple"
    | "theme"
    | "personality"
    | "ability"
    | "summary"
    | "reflection"
    | "insight"
    | "comprehensive"
    | "recommendation";
  content?: string; // Untuk jawaban esai
  description?: string; // Untuk deskripsi tambahan
  subcategory?: string; // Untuk menyimpan subcategory
  metadata?: {
    spheres?: string[];
    themes?: string[];
    sentiment?: "positive" | "neutral" | "negative";
    keywords?: string[];
    length?: "short" | "medium" | "long";
  }; // Untuk menyimpan metadata analisis reflektif
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
  reflectiveInsights?: {
    category: string;
    description?: string;
    metadata?: {
      spheres?: string[];
      themes?: string[];
      sentiment?: "positive" | "neutral" | "negative";
      keywords?: string[];
    };
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

export interface ReflectiveAnalysis {
  spheres: string[];
  keywords: string[];
  sentiment: "positive" | "neutral" | "negative";
  themes: string[];
  length?: "short" | "medium" | "long";
}

export interface Question {
  id: number;
  text?: string;
  category?: string;
  subcategory?: string;
  type?: string;
  options?: string[] | Array<{value: string; text: string}>;
}

export interface Answers {
  [questionId: string]: any;
}
