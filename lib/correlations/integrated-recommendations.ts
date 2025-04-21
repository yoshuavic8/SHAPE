// Fungsi untuk rekomendasi terintegrasi berdasarkan kombinasi komponen SHAPE

import { mbtiToSpiritualGiftsCorrelations } from './mbti-spiritual-correlations';

// Fungsi untuk mendapatkan rekomendasi pelayanan berdasarkan kombinasi MBTI dan karunia spiritual
export function getIntegratedMinistryRecommendations(
  mbtiType: string,
  topSpiritualGifts: string[],
  topHeartDesires: string[]
): string[] {
  const mbtiRecommendations = mbtiToSpiritualGiftsCorrelations[mbtiType] || [];
  
  // Gabungkan rekomendasi dari MBTI dan karunia spiritual
  const combinedRecommendations = new Set<string>();
  
  // Tambahkan rekomendasi berdasarkan MBTI
  mbtiRecommendations.forEach(rec => combinedRecommendations.add(rec));
  
  // Tambahkan rekomendasi berdasarkan karunia spiritual
  topSpiritualGifts.forEach(gift => {
    if (gift === "Mengajar") {
      combinedRecommendations.add("Guru Sekolah Minggu");
      combinedRecommendations.add("Pemimpin Kelompok Kecil");
      combinedRecommendations.add("Pengajar Alkitab");
    } else if (gift === "Melayani") {
      combinedRecommendations.add("Tim Penyambut");
      combinedRecommendations.add("Pelayanan Praktis");
      combinedRecommendations.add("Kunjungan Rumah Sakit");
    } else if (gift === "Memimpin") {
      combinedRecommendations.add("Pemimpin Departemen");
      combinedRecommendations.add("Koordinator Acara");
      combinedRecommendations.add("Mentor");
    } else if (gift === "Nubuat") {
      combinedRecommendations.add("Pengkhotbah");
      combinedRecommendations.add("Penulis Renungan");
      combinedRecommendations.add("Konselor Alkitabiah");
    } else if (gift === "Memberi") {
      combinedRecommendations.add("Pelayanan Sosial");
      combinedRecommendations.add("Penggalangan Dana");
      combinedRecommendations.add("Sponsor Program");
    } else if (gift === "Kemurahan") {
      combinedRecommendations.add("Konseling Krisis");
      combinedRecommendations.add("Pelayanan Penghiburan");
      combinedRecommendations.add("Kunjungan Rumah Sakit");
    } else if (gift === "Evangelisme") {
      combinedRecommendations.add("Tim Penginjilan");
      combinedRecommendations.add("Pelayanan Media Sosial");
      combinedRecommendations.add("Misi Jangka Pendek");
    } else if (gift === "Pengetahuan") {
      combinedRecommendations.add("Peneliti Alkitab");
      combinedRecommendations.add("Pengembang Kurikulum");
      combinedRecommendations.add("Perpustakaan Gereja");
    } else if (gift === "Hikmat") {
      combinedRecommendations.add("Konselor");
      combinedRecommendations.add("Penatua");
      combinedRecommendations.add("Mediator Konflik");
    } else if (gift === "Iman") {
      combinedRecommendations.add("Tim Doa");
      combinedRecommendations.add("Perintis Pelayanan");
      combinedRecommendations.add("Pendukung Misionaris");
    } else if (gift === "Penyembuhan") {
      combinedRecommendations.add("Tim Doa Kesembuhan");
      combinedRecommendations.add("Pelayanan Kesehatan");
      combinedRecommendations.add("Konseling Pemulihan");
    } else if (gift === "Membimbing") {
      combinedRecommendations.add("Mentor");
      combinedRecommendations.add("Pemimpin Kelompok Kecil");
      combinedRecommendations.add("Konselor Pemuridan");
    } else if (gift === "Administrasi") {
      combinedRecommendations.add("Koordinator Acara");
      combinedRecommendations.add("Administrator Gereja");
      combinedRecommendations.add("Manajer Proyek Pelayanan");
    }
  });
  
  // Tambahkan rekomendasi berdasarkan hasrat hati
  topHeartDesires.forEach(desire => {
    if (desire.includes("Anak")) {
      combinedRecommendations.add("Pelayanan Anak");
      combinedRecommendations.add("Guru Sekolah Minggu");
    } else if (desire.includes("Lansia")) {
      combinedRecommendations.add("Pelayanan Lansia");
      combinedRecommendations.add("Kunjungan Rumah Jompo");
    } else if (desire.includes("Pendidikan")) {
      combinedRecommendations.add("Guru Sekolah Minggu");
      combinedRecommendations.add("Pengembang Kurikulum");
    } else if (desire.includes("Kesehatan")) {
      combinedRecommendations.add("Pelayanan Kesehatan");
      combinedRecommendations.add("Kunjungan Rumah Sakit");
    } else if (desire.includes("Keadilan")) {
      combinedRecommendations.add("Advokasi Sosial");
      combinedRecommendations.add("Pelayanan Kemanusiaan");
    } else if (desire.includes("Seni") || desire.includes("Kreativitas")) {
      combinedRecommendations.add("Tim Pujian");
      combinedRecommendations.add("Desain Media");
      combinedRecommendations.add("Drama/Teater");
    } else if (desire.includes("Teknologi")) {
      combinedRecommendations.add("Tim Media");
      combinedRecommendations.add("Pelayanan Online");
      combinedRecommendations.add("Dukungan Teknis");
    }
  });
  
  // Konversi Set ke Array dan batasi jumlah rekomendasi
  return Array.from(combinedRecommendations).slice(0, 7);
}

// Fungsi untuk mendapatkan rekomendasi karir berdasarkan kombinasi MBTI dan kemampuan
export function getIntegratedCareerRecommendations(
  mbtiType: string,
  abilities: string[]
): string[] {
  const careerRecommendations = new Set<string>();
  
  // Rekomendasi karir berdasarkan MBTI
  if (mbtiType === "ESTJ") {
    careerRecommendations.add("Manajer");
    careerRecommendations.add("Administrator");
    careerRecommendations.add("Supervisor");
  } else if (mbtiType === "ESTP") {
    careerRecommendations.add("Entrepreneur");
    careerRecommendations.add("Sales");
    careerRecommendations.add("Negosiator");
  } else if (mbtiType === "ESFJ") {
    careerRecommendations.add("Perawat");
    careerRecommendations.add("Guru");
    careerRecommendations.add("Konselor");
  } else if (mbtiType === "ESFP") {
    careerRecommendations.add("Entertainer");
    careerRecommendations.add("Event Planner");
    careerRecommendations.add("Customer Service");
  } else if (mbtiType === "ENTJ") {
    careerRecommendations.add("Eksekutif");
    careerRecommendations.add("Konsultan");
    careerRecommendations.add("Pengacara");
  } else if (mbtiType === "ENTP") {
    careerRecommendations.add("Entrepreneur");
    careerRecommendations.add("Konsultan");
    careerRecommendations.add("Pengembang Produk");
  } else if (mbtiType === "ENFJ") {
    careerRecommendations.add("Konselor");
    careerRecommendations.add("Pelatih");
    careerRecommendations.add("HR Manager");
  } else if (mbtiType === "ENFP") {
    careerRecommendations.add("Konselor");
    careerRecommendations.add("Penulis");
    careerRecommendations.add("Pengajar");
  } else if (mbtiType === "ISTJ") {
    careerRecommendations.add("Akuntan");
    careerRecommendations.add("Auditor");
    careerRecommendations.add("Analis Data");
  } else if (mbtiType === "ISTP") {
    careerRecommendations.add("Teknisi");
    careerRecommendations.add("Insinyur");
    careerRecommendations.add("Analis Sistem");
  } else if (mbtiType === "ISFJ") {
    careerRecommendations.add("Perawat");
    careerRecommendations.add("Administrator");
    careerRecommendations.add("Asisten Eksekutif");
  } else if (mbtiType === "ISFP") {
    careerRecommendations.add("Seniman");
    careerRecommendations.add("Desainer");
    careerRecommendations.add("Terapis");
  } else if (mbtiType === "INTJ") {
    careerRecommendations.add("Ilmuwan");
    careerRecommendations.add("Arsitek");
    careerRecommendations.add("Perencana Strategis");
  } else if (mbtiType === "INTP") {
    careerRecommendations.add("Peneliti");
    careerRecommendations.add("Programmer");
    careerRecommendations.add("Analis");
  } else if (mbtiType === "INFJ") {
    careerRecommendations.add("Konselor");
    careerRecommendations.add("Penulis");
    careerRecommendations.add("Terapis");
  } else if (mbtiType === "INFP") {
    careerRecommendations.add("Penulis");
    careerRecommendations.add("Konselor");
    careerRecommendations.add("Seniman");
  }
  
  // Tambahkan rekomendasi berdasarkan kemampuan
  abilities.forEach(ability => {
    if (ability.includes("Analitis")) {
      careerRecommendations.add("Analis Data");
      careerRecommendations.add("Peneliti");
      careerRecommendations.add("Konsultan");
    } else if (ability.includes("Artistik") || ability.includes("Seni")) {
      careerRecommendations.add("Desainer");
      careerRecommendations.add("Seniman");
      careerRecommendations.add("Arsitek");
    } else if (ability.includes("Kinestetik")) {
      careerRecommendations.add("Pelatih Fisik");
      careerRecommendations.add("Terapis Fisik");
      careerRecommendations.add("Instruktur");
    } else if (ability.includes("Sosial") || ability.includes("Interpersonal")) {
      careerRecommendations.add("Konselor");
      careerRecommendations.add("HR Manager");
      careerRecommendations.add("Pelatih");
    } else if (ability.includes("Linguistik") || ability.includes("Menulis")) {
      careerRecommendations.add("Penulis");
      careerRecommendations.add("Editor");
      careerRecommendations.add("Penerjemah");
    } else if (ability.includes("Teknologi")) {
      careerRecommendations.add("Pengembang Software");
      careerRecommendations.add("Analis Sistem");
      careerRecommendations.add("Spesialis IT");
    } else if (ability.includes("Organisasi")) {
      careerRecommendations.add("Manajer Proyek");
      careerRecommendations.add("Administrator");
      careerRecommendations.add("Koordinator");
    } else if (ability.includes("Kreativitas")) {
      careerRecommendations.add("Desainer");
      careerRecommendations.add("Pengembang Produk");
      careerRecommendations.add("Penulis Kreatif");
    }
  });
  
  // Konversi Set ke Array dan batasi jumlah rekomendasi
  return Array.from(careerRecommendations).slice(0, 7);
}
