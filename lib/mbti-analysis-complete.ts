import { MBTIAnalysis, mbtiAnalysisData } from "./mbti-analysis-data";
import { mbtiAnalysisData2 } from "./mbti-analysis-data-2";
import { mbtiAnalysisData3 } from "./mbti-analysis-data-3";
import { mbtiAnalysisData4 } from "./mbti-analysis-data-4";

// Gabungkan semua data analisis MBTI
export const completeMBTIAnalysis: Record<string, MBTIAnalysis> = {
    ...mbtiAnalysisData,
    ...mbtiAnalysisData2,
    ...mbtiAnalysisData3,
    ...mbtiAnalysisData4,
};

// Fungsi untuk mendapatkan analisis MBTI berdasarkan tipe
export function getMBTIAnalysis(type: string): MBTIAnalysis | null {
    const mbtiType = type.toUpperCase();
    return completeMBTIAnalysis[mbtiType] || null;
}

// Fungsi untuk mendapatkan rekomendasi pelayanan berdasarkan tipe MBTI
export function getMBTIMinistryRecommendations(type: string): string[] {
    const analysis = getMBTIAnalysis(type);
    return analysis ? analysis.recommendations.ministry : [];
}

// Fungsi untuk mendapatkan rekomendasi karir berdasarkan tipe MBTI
export function getMBTICareerRecommendations(type: string): string[] {
    const analysis = getMBTIAnalysis(type);
    return analysis ? analysis.recommendations.career : [];
}

// Fungsi untuk mendapatkan kekuatan utama berdasarkan tipe MBTI
export function getMBTIStrengths(
    type: string
): { title: string; description: string }[] {
    const analysis = getMBTIAnalysis(type);
    return analysis
        ? analysis.strengths.dominantAbilities.map((ability) => ({
              title: ability.title,
              description: ability.description,
          }))
        : [];
}

// Fungsi untuk mendapatkan integrasi SHAPE berdasarkan tipe MBTI
export function getMBTIShapeIntegration(
    type: string
): Record<string, string> | null {
    const analysis = getMBTIAnalysis(type);
    return analysis ? analysis.shapeIntegration : null;
}

// Ekspor tipe dan interface
export type { MBTIAnalysis };
