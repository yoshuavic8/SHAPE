// File ini adalah titik masuk utama untuk semua fungsi analisis SHAPE
// File ini menggantikan lib/results-analyzer.ts

import {
  analyzeSpiritualGifts,
  analyzeHeartDesire,
  analyzePersonality,
  analyzeExperiences,
  integrateShapeResults,
  generateShapeRecommendations,
  CategoryScore,
  ShapeProfile,
  ShapeRecommendations
} from './analyzers';

import { questionnaire_data } from './questionnaire-data';

/**
 * Menganalisis hasil kuesioner SHAPE
 * @param data Data kuesioner
 * @returns Hasil analisis
 */
export function analyzeResults(data: any): {
  spiritual: CategoryScore[];
  heart: CategoryScore[];
  personality: CategoryScore[];
  experiences: CategoryScore[];
  integrated: ShapeProfile;
  recommendations: ShapeRecommendations;
} {
  // Ekstrak pertanyaan dan kategori untuk setiap komponen SHAPE
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

  const experiencesQuestions = questionnaire_data.filter(
    (q) => q.category === "experiences"
  );
  const experiencesCategories: Record<string, string> = {
    formative: "Pengalaman Formatif",
    challenges: "Tantangan",
    ministry: "Pengalaman Pelayanan",
    professional: "Pengalaman Profesional",
    leadership: "Pengalaman Kepemimpinan",
    education: "Pendidikan",
    education_field: "Bidang Pendidikan",
    ministry_type: "Jenis Pelayanan",
    ministry_duration: "Durasi Pelayanan",
    reflection_enjoyment: "Refleksi Kesenangan",
    reflection_preparation: "Refleksi Persiapan",
  };

  // Analisis setiap komponen SHAPE
  const spiritual = analyzeSpiritualGifts(
    data.spiritual_gifts,
    spiritualGiftsCategories,
    spiritualGiftsQuestions
  );
  const heart = analyzeHeartDesire(
    data.heart_desire,
    heartCategories,
    heartQuestions
  );
  const personality = analyzePersonality(
    data.personality,
    personalityCategories,
    personalityQuestions
  );
  const experiences = analyzeExperiences(
    data.experiences,
    experiencesCategories,
    experiencesQuestions
  );

  // Integrasi hasil
  const integrated = integrateShapeResults(
    spiritual,
    heart,
    personality,
    experiences
  );

  // Hasilkan rekomendasi
  const recommendations = generateShapeRecommendations(integrated);

  return {
    spiritual,
    heart,
    personality,
    experiences,
    integrated,
    recommendations,
  };
}

// Ekspor tipe dan interface
export type {
  CategoryScore,
  ShapeProfile,
  ShapeRecommendations
};
