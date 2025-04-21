// Korelasi antara tipe MBTI dan hasrat hati

// Korelasi antara tipe MBTI dan hasrat hati
export const mbtiToHeartDesireCorrelations: Record<string, string[]> = {
  // Extraverted types
  "ESTJ": ["Organisasi", "Kepemimpinan", "Pendidikan"],
  "ESTP": ["Olahraga", "Petualangan", "Keadilan"],
  "ESFJ": ["Komunitas", "Keluarga", "Kesehatan"],
  "ESFP": ["Seni & Kreativitas", "Anak-anak", "Hiburan"],
  "ENTJ": ["Kepemimpinan", "Strategi", "Inovasi"],
  "ENTP": ["Inovasi", "Pengetahuan", "Pemecahan Masalah"],
  "ENFJ": ["Pengembangan Manusia", "Pendidikan", "Keadilan Sosial"],
  "ENFP": ["Kreativitas", "Keberagaman", "Pengembangan Manusia"],
  
  // Introverted types
  "ISTJ": ["Ketertiban", "Tradisi", "Keamanan"],
  "ISTP": ["Teknik", "Pemecahan Masalah", "Efisiensi"],
  "ISFJ": ["Pelayanan", "Keluarga", "Tradisi"],
  "ISFP": ["Seni", "Harmoni", "Alam"],
  "INTJ": ["Pengetahuan", "Sistem", "Inovasi"],
  "INTP": ["Pengetahuan", "Analisis", "Teori"],
  "INFJ": ["Makna", "Harmoni", "Keadilan Sosial"],
  "INFP": ["Nilai-nilai", "Kreativitas", "Pertumbuhan Pribadi"]
};

// Fungsi untuk mendapatkan korelasi hasrat hati berdasarkan tipe MBTI
export function getHeartDesireCorrelation(mbtiType: string): string[] {
  return mbtiToHeartDesireCorrelations[mbtiType] || [
    "Kepemimpinan", 
    "Pelayanan", 
    "Kreativitas"
  ];
}
