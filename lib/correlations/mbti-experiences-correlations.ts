// Korelasi antara tipe MBTI dan pengalaman

// Korelasi antara tipe MBTI dan pengalaman yang berharga
export const mbtiToExperiencesCorrelations: Record<string, string[]> = {
  // Extraverted types
  "ESTJ": ["Kepemimpinan Organisasi", "Manajemen Proyek", "Pengalaman Militer/Ketertiban"],
  "ESTP": ["Olahraga Kompetitif", "Kewirausahaan", "Manajemen Krisis"],
  "ESFJ": ["Pelayanan Komunitas", "Pengorganisasian Acara", "Pengalaman Keluarga"],
  "ESFP": ["Seni Pertunjukan", "Pengalaman Sosial", "Pelayanan Pelanggan"],
  "ENTJ": ["Kepemimpinan Strategis", "Pengembangan Organisasi", "Negosiasi"],
  "ENTP": ["Inovasi", "Debat/Diskusi", "Pemecahan Masalah Kreatif"],
  "ENFJ": ["Mentoring", "Fasilitasi Kelompok", "Advokasi"],
  "ENFP": ["Pengalaman Lintas Budaya", "Kreativitas Kolaboratif", "Pengajaran Inovatif"],
  
  // Introverted types
  "ISTJ": ["Manajemen Data", "Pengalaman Prosedural", "Penelitian Mendalam"],
  "ISTP": ["Pemecahan Masalah Teknis", "Kerajinan Tangan", "Analisis Sistem"],
  "ISFJ": ["Perawatan Jangka Panjang", "Dukungan di Balik Layar", "Pelestarian Tradisi"],
  "ISFP": ["Ekspresi Artistik", "Pengalaman Alam", "Pelayanan Satu-satu"],
  "INTJ": ["Perencanaan Strategis", "Penelitian Independen", "Pengembangan Sistem"],
  "INTP": ["Analisis Teoretis", "Pemecahan Masalah Kompleks", "Pengembangan Konsep"],
  "INFJ": ["Wawasan Mendalam", "Penulisan Reflektif", "Advokasi Diam-diam"],
  "INFP": ["Eksplorasi Nilai", "Ekspresi Kreatif", "Pertumbuhan Pribadi"]
};

// Fungsi untuk mendapatkan korelasi pengalaman berdasarkan tipe MBTI
export function getExperiencesCorrelation(mbtiType: string): string[] {
  return mbtiToExperiencesCorrelations[mbtiType] || [
    "Kepemimpinan Organisasi", 
    "Pelayanan Komunitas", 
    "Pengembangan Pribadi"
  ];
}
