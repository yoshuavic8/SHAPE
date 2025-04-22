// File ini adalah adapter untuk memastikan kompatibilitas dengan kode lama
// yang menggunakan lib/results-analyzer.ts

import {
  analyzeSpiritualGifts as analyzeSpiritualGiftsInternal,
  analyzeHeartDesire as analyzeHeartDesireInternal,
  analyzePersonality as analyzePersonalityInternal,
  analyzeExperiences as analyzeExperiencesInternal,
  integrateShapeResults,
  generateShapeRecommendations,
  CategoryScore,
  ShapeProfile,
  ShapeRecommendations,
} from "./analyzers";

import { questionnaire_data } from "./questionnaire-data";

// Ekspor tipe dan interface yang sama dengan results-analyzer.ts
export type { CategoryScore, ShapeProfile, ShapeRecommendations };

// Fungsi-fungsi yang diekspor oleh results-analyzer.ts
export function analyzeSpiritualGifts(data: any): CategoryScore[] {
  if (!data) return [];

  const spiritualGiftsQuestions = questionnaire_data.filter(
    (q) => q.category === "spiritual"
  );
  const spiritualGiftsCategories: Record<string, string> = {
    teaching: "Mengajar (Teaching)",
    serving: "Melayani (Serving)",
    leadership: "Memimpin (Leadership)",
    prophecy: "Nubuat (Prophecy)",
    giving: "Memberi (Giving)",
    mercy: "Kemurahan (Mercy)",
    evangelism: "Evangelisme (Evangelism)",
    knowledge: "Pengetahuan (Knowledge)",
    wisdom: "Hikmat (Wisdom)",
    faith: "Iman (Faith)",
    healing: "Penyembuhan (Healing)",
    shepherding: "Membimbing (Shepherding)",
    administration: "Administrasi (Administration)",
    tongues: "Bahasa Roh (Tongues)",
    interpretation: "Menafsirkan Bahasa Roh (Interpretation)",
    discernment: "Membedakan Roh (Discernment)",
  };

  return analyzeSpiritualGiftsInternal(
    data,
    spiritualGiftsCategories,
    spiritualGiftsQuestions
  );
}

export function analyzeHeartDesire(data: any): CategoryScore[] {
  if (!data) return [];

  const heartQuestions = questionnaire_data.filter(
    (q) => q.category === "heart"
  );
  const heartCategories: Record<string, string> = {
    religion: "Religion/Spirituality (Agama/Spiritualitas)",
    family: "Family (Keluarga)",
    education: "Education (Pendidikan)",
    government: "Government (Pemerintahan)",
    media: "Media (Media)",
    arts: "Arts & Entertainment (Seni & Hiburan)",
    business: "Business/Economy (Bisnis/Ekonomi)",
    reflection: "Reflection (Refleksi)",
  };

  return analyzeHeartDesireInternal(data, heartCategories, heartQuestions);
}

export function analyzePersonality(data: any): CategoryScore[] {
  if (!data) return [];

  const personalityQuestions = questionnaire_data.filter(
    (q) => q.category === "personality"
  );
  const personalityCategories: Record<string, string> = {
    // MBTI Dimensions
    introvert: "Introvert (I)",
    ekstrovert: "Ekstrovert (E)",
    judging: "Judging (J)",
    perceiving: "Perceiving (P)",
    thinking: "Thinking (T)",
    feeling: "Feeling (F)",
    sensing: "Sensing (S)",
    intuition: "Intuition (N)",
    reflection: "Refleksi Diri",
    // Abilities Categories
    natural_talent: "Bakat Alami",
    technical_skills: "Keterampilan Teknis",
    achievements: "Pencapaian",
    development_potential: "Potensi Pengembangan",
    problem_solving: "Pemecahan Masalah",
    // Specific Abilities
    menulis: "Menulis",
    "public speaking": "Public Speaking",
    seni: "Seni",
    musik: "Musik",
    organisasi: "Organisasi",
    analitis: "Analitis",
    teknologi: "Teknologi",
    interpersonal: "Interpersonal",
    kepemimpinan: "Kepemimpinan",
    kreatif: "Kreatif",
    mengajar: "Mengajar",
    konseling: "Konseling",
  };

  return analyzePersonalityInternal(
    data,
    personalityCategories,
    personalityQuestions
  );
}

export function analyzeExperiences(data: any): CategoryScore[] {
  if (!data) return [];

  const experiencesQuestions = questionnaire_data.filter(
    (q) => q.category === "experiences"
  );
  const experiencesCategories: Record<string, string> = {
    formative: "Pengalaman Formatif",
    transformative: "Pengalaman Transformatif",
    lessons: "Pelajaran Hidup",
    purpose: "Tujuan Hidup",
    ministry: "Pelayanan",
    education: "Pendidikan",
    work: "Pekerjaan",
    family: "Keluarga",
    spiritual: "Spiritual",
    helping: "Membantu Orang Lain",
    trauma: "Pengalaman Traumatis",
    crosscultural: "Pengalaman Lintas Budaya",
    pivotal: "Momen Penting",
    leadership: "Kepemimpinan",
    mentorship: "Mentoring",
    teaching: "Mengajar",
    faith: "Iman",
    mission: "Misi",
    recovery: "Pemulihan",
    community: "Komunitas",
    miracle: "Keajaiban",
  };

  return analyzeExperiencesInternal(
    data,
    experiencesCategories,
    experiencesQuestions
  );
}

export function generateShapeProfile(
  spiritualGifts: CategoryScore[],
  heartDesire: CategoryScore[],
  personality: CategoryScore[],
  experiences: CategoryScore[]
): ShapeProfile {
  return integrateShapeResults(
    spiritualGifts,
    heartDesire,
    personality,
    experiences
  );
}

export function generateRecommendations(
  spiritualGifts: CategoryScore[],
  heartDesire: CategoryScore[],
  personality: CategoryScore[],
  experiences: CategoryScore[]
): ShapeRecommendations {
  const profile = integrateShapeResults(
    spiritualGifts,
    heartDesire,
    personality,
    experiences
  );
  return generateShapeRecommendations(profile);
}

export function analyzeResults(data: any): {
  spiritualGifts: CategoryScore[];
  heartDesire: CategoryScore[];
  personality: CategoryScore[];
  experiences: CategoryScore[];
  shapeProfile: ShapeProfile;
  recommendations: ShapeRecommendations;
} {
  if (!data) {
    return {
      spiritualGifts: [],
      heartDesire: [],
      personality: [],
      experiences: [],
      shapeProfile: {
        spiritualGifts: [],
        heartDesire: [],
        personality: { type: "ISFJ", analysis: [] },
        abilities: [],
        experiences: [],
        shapeCode: "SHAPE",
      },
      recommendations: {
        purposeStatement: "",
        ministryAreas: [],
        learningPathways: [],
        bibleVerse: "",
        personalizedAdvice: "",
        strengthsWeaknesses: { strengths: [], weaknesses: [] },
        ministryRecommendations: [],
        careerRecommendations: [],
        developmentRecommendations: [],
        shapeSynergy: [],
        communityRoles: [],
      },
    };
  }

  const spiritualGifts = analyzeSpiritualGifts(data.spiritual_gifts);
  const heartDesire = analyzeHeartDesire(data.heart_desire);
  const personality = analyzePersonality(data.personality);
  const experiences = analyzeExperiences(data.experiences);

  const shapeProfile = integrateShapeResults(
    spiritualGifts,
    heartDesire,
    personality,
    experiences
  );

  const recommendations = generateShapeRecommendations(shapeProfile);

  return {
    spiritualGifts,
    heartDesire,
    personality,
    experiences,
    shapeProfile,
    recommendations,
  };
}
