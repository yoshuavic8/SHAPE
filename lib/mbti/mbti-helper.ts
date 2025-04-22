import { getMBTIAnalysis } from "./mbti-analysis";

// Fungsi untuk mendeteksi tipe MBTI dari data personalityTypes
export function detectMBTIType(personalityTypes: any[]): string {
  if (!personalityTypes || personalityTypes.length === 0) {
    return "";
  }

  // Check if there's a description category that contains "The Logician" or similar
  const descriptionItem = personalityTypes.find(
    (item) => item.category && item.category.includes("Deskripsi:")
  );

  if (descriptionItem) {
    if (descriptionItem.category.includes("The Logician")) return "INTP";
    if (descriptionItem.category.includes("The Architect")) return "INTJ";
    if (descriptionItem.category.includes("The Mediator")) return "INFP";
    if (descriptionItem.category.includes("The Advocate")) return "INFJ";
    if (descriptionItem.category.includes("The Virtuoso")) return "ISTP";
    if (descriptionItem.category.includes("The Adventurer")) return "ISFP";
    if (descriptionItem.category.includes("The Logistician")) return "ISTJ";
    if (descriptionItem.category.includes("The Defender")) return "ISFJ";
    if (descriptionItem.category.includes("The Entrepreneur")) return "ESTP";
    if (descriptionItem.category.includes("The Entertainer")) return "ESFP";
    if (descriptionItem.category.includes("The Executive")) return "ESTJ";
    if (descriptionItem.category.includes("The Consul")) return "ESFJ";
    if (descriptionItem.category.includes("The Campaigner")) return "ENFP";
    if (descriptionItem.category.includes("The Protagonist")) return "ENFJ";
    if (descriptionItem.category.includes("The Debater")) return "ENTP";
    if (descriptionItem.category.includes("The Commander")) return "ENTJ";
  }

  // If we can't find a description, try to construct the MBTI type from the individual preferences
  const i = personalityTypes.find((item) => item.category === "Introvert (I)");
  const e = personalityTypes.find((item) => item.category === "Extrovert (E)");
  const n = personalityTypes.find((item) => item.category === "Intuition (N)");
  const s = personalityTypes.find((item) => item.category === "Sensing (S)");
  const t = personalityTypes.find((item) => item.category === "Thinking (T)");
  const f = personalityTypes.find((item) => item.category === "Feeling (F)");
  const j = personalityTypes.find((item) => item.category === "Judging (J)");
  const p = personalityTypes.find((item) => item.category === "Perceiving (P)");

  const ie = i && i.score >= (e?.score || 0) ? "I" : "E";
  const ns = n && n.score >= (s?.score || 0) ? "N" : "S";
  const tf = t && t.score >= (f?.score || 0) ? "T" : "F";
  const jp = j && j.score >= (p?.score || 0) ? "J" : "P";

  if (ie && ns && tf && jp) {
    return ie + ns + tf + jp;
  }

  return "";
}

// Fungsi untuk mendapatkan data MBTI lengkap
export function getMBTIData(personalityTypes: any[]) {
  const mbtiType = detectMBTIType(personalityTypes);

  if (!mbtiType) {
    return null;
  }

  const mbtiData = getMBTIAnalysis(mbtiType);

  return mbtiData;
}
