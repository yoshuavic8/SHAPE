// Korelasi antara tipe MBTI dan karunia spiritual

// Korelasi antara tipe MBTI dan karunia spiritual
export const mbtiToSpiritualGiftsCorrelations: Record<string, string[]> = {
  // Extraverted types
  "ESTJ": ["Administrasi", "Memimpin", "Mengajar"],
  "ESTP": ["Melayani", "Evangelisme", "Membimbing"],
  "ESFJ": ["Kemurahan", "Membimbing", "Melayani"],
  "ESFP": ["Kemurahan", "Melayani", "Evangelisme"],
  "ENTJ": ["Memimpin", "Administrasi", "Nubuat"],
  "ENTP": ["Nubuat", "Pengetahuan", "Hikmat"],
  "ENFJ": ["Membimbing", "Mengajar", "Kemurahan"],
  "ENFP": ["Evangelisme", "Kemurahan", "Membimbing"],
  
  // Introverted types
  "ISTJ": ["Administrasi", "Melayani", "Memberi"],
  "ISTP": ["Melayani", "Membedakan Roh", "Administrasi"],
  "ISFJ": ["Melayani", "Kemurahan", "Membimbing"],
  "ISFP": ["Kemurahan", "Melayani", "Penyembuhan"],
  "INTJ": ["Pengetahuan", "Hikmat", "Administrasi"],
  "INTP": ["Pengetahuan", "Hikmat", "Mengajar"],
  "INFJ": ["Nubuat", "Membedakan Roh", "Hikmat"],
  "INFP": ["Kemurahan", "Iman", "Penyembuhan"]
};

// Fungsi untuk mendapatkan korelasi karunia spiritual berdasarkan tipe MBTI
export function getSpiritualGiftsCorrelation(mbtiType: string): string[] {
  return mbtiToSpiritualGiftsCorrelations[mbtiType] || [
    "Mengajar", 
    "Melayani", 
    "Memimpin"
  ];
}
