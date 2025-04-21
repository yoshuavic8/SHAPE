// Fungsi untuk menganalisis hasil terintegrasi dari semua komponen SHAPE
import { CategoryScore, ShapeProfile, ShapeRecommendations } from '../types/shape-types';
import { getIntegratedMinistryRecommendations, getIntegratedCareerRecommendations } from '../correlations';

/**
 * Mengintegrasikan hasil dari semua komponen SHAPE
 * @param spiritualGifts Hasil analisis karunia spiritual
 * @param heartDesire Hasil analisis hasrat hati
 * @param personality Hasil analisis kepribadian
 * @param experiences Hasil analisis pengalaman
 * @returns Profil SHAPE terintegrasi
 */
export function integrateShapeResults(
  spiritualGifts: CategoryScore[],
  heartDesire: CategoryScore[],
  personality: CategoryScore[],
  experiences: CategoryScore[]
): ShapeProfile {
  // Ekstrak tipe MBTI dari hasil kepribadian
  const mbtiTypeResult = personality.find(
    (item) => item.type === "personality" && item.category.includes("Tipe Kepribadian")
  );
  const mbtiType = mbtiTypeResult
    ? mbtiTypeResult.category.split(":")[1].trim()
    : "ISFJ"; // Default jika tidak ditemukan

  // Ekstrak analisis MBTI
  const mbtiAnalysis = personality.filter(
    (item) => item.type === "personality" && !item.category.includes("Tipe Kepribadian")
  );

  // Ekstrak kemampuan dari hasil kepribadian
  const abilities = personality.filter((item) => item.type === "ability");

  // Ekstrak wawasan reflektif dari hasrat hati
  const reflectiveInsights = heartDesire.filter(
    (item) => item.type === "reflection" || item.type === "open"
  );

  // Buat kode SHAPE
  const topSpiritualGift = spiritualGifts.length > 0 ? spiritualGifts[0].category.charAt(0) : "S";
  const topHeartDesire = heartDesire.filter(item => item.type === "scale").length > 0 
    ? heartDesire.filter(item => item.type === "scale")[0].category.charAt(0) 
    : "H";
  const personalityCode = mbtiType;
  const topAbility = abilities.length > 0 ? abilities[0].category.split(":")[0].charAt(0) : "A";
  const topExperience = experiences.filter(item => item.type === "open").length > 0
    ? "E"
    : "E";

  const shapeCode = `${topSpiritualGift}${topHeartDesire}${personalityCode}${topAbility}${topExperience}`;

  return {
    spiritualGifts: spiritualGifts
      .filter((item) => item.type === "scale")
      .map((item) => ({
        category: item.category,
        score: item.score,
        percentage: item.percentage,
      })),
    heartDesire: heartDesire
      .filter((item) => item.type === "scale")
      .map((item) => ({
        category: item.category,
        score: item.score,
        percentage: item.percentage,
      })),
    reflectiveInsights: reflectiveInsights.map((item) => ({
      category: item.category,
      description: item.description,
      metadata: item.metadata,
    })),
    personality: {
      type: mbtiType,
      analysis: mbtiAnalysis,
    },
    abilities: abilities.map((item) => ({
      category: item.category,
      score: item.score,
      percentage: item.percentage,
    })),
    experiences: experiences
      .filter((item) => item.type === "open" || item.type === "multiple")
      .map((item) => ({
        category: item.category,
        content: item.content,
        description: item.description,
      })),
    shapeCode,
  };
}

/**
 * Menghasilkan rekomendasi berdasarkan profil SHAPE
 * @param profile Profil SHAPE
 * @returns Rekomendasi SHAPE
 */
export function generateShapeRecommendations(
  profile: ShapeProfile
): ShapeRecommendations {
  // Ekstrak data yang diperlukan
  const topSpiritualGifts = profile.spiritualGifts
    .slice(0, 3)
    .map((item) => item.category);
  const topHeartDesires = profile.heartDesire
    .slice(0, 3)
    .map((item) => item.category);
  const mbtiType = profile.personality.type;
  const topAbilities = profile.abilities
    .slice(0, 3)
    .map((item) => item.category.split(":")[0].trim());

  // Buat pernyataan tujuan
  const purposeStatement = `Anda dipanggil untuk menggunakan karunia ${topSpiritualGifts[0]} dan ${topSpiritualGifts[1]} Anda, didorong oleh hasrat untuk ${topHeartDesires[0]}, dengan kepribadian ${mbtiType} yang unik dan kemampuan ${topAbilities[0]}, berdasarkan pengalaman hidup Anda yang berharga.`;

  // Dapatkan rekomendasi pelayanan terintegrasi
  const ministryRecommendations = getIntegratedMinistryRecommendations(
    mbtiType,
    topSpiritualGifts,
    topHeartDesires
  );

  // Dapatkan rekomendasi karir terintegrasi
  const careerRecommendations = getIntegratedCareerRecommendations(
    mbtiType,
    topAbilities
  );

  // Buat rekomendasi jalur pembelajaran
  const learningPathways = [
    `Pelajari lebih lanjut tentang karunia ${topSpiritualGifts[0]} melalui studi Alkitab dan buku-buku terkait.`,
    `Kembangkan kemampuan ${topAbilities[0]} melalui kursus atau pelatihan.`,
    `Pelajari lebih lanjut tentang tipe kepribadian ${mbtiType} Anda dan bagaimana mengoptimalkannya.`,
    `Cari mentor yang dapat membantu Anda mengembangkan hasrat untuk ${topHeartDesires[0]}.`,
  ];

  // Pilih ayat Alkitab yang relevan
  let bibleVerse = "";
  if (topSpiritualGifts[0].includes("Mengajar")) {
    bibleVerse = "2 Timotius 2:15 - Usahakanlah supaya engkau layak di hadapan Allah sebagai seorang pekerja yang tidak usah malu, yang berterus terang memberitakan perkataan kebenaran itu.";
  } else if (topSpiritualGifts[0].includes("Melayani")) {
    bibleVerse = "1 Petrus 4:10 - Layanilah seorang akan yang lain, sesuai dengan karunia yang telah diperoleh tiap-tiap orang sebagai pengurus yang baik dari kasih karunia Allah.";
  } else if (topSpiritualGifts[0].includes("Memimpin")) {
    bibleVerse = "Roma 12:8 - Jika karunia untuk memimpin, ia harus melakukannya dengan rajin.";
  } else if (topSpiritualGifts[0].includes("Nubuat")) {
    bibleVerse = "1 Korintus 14:3 - Tetapi siapa yang bernubuat, ia berkata-kata kepada manusia, ia membangun, menasihati dan menghibur.";
  } else if (topSpiritualGifts[0].includes("Memberi")) {
    bibleVerse = "2 Korintus 9:7 - Hendaklah masing-masing memberikan menurut kerelaan hatinya, jangan dengan sedih hati atau karena paksaan, sebab Allah mengasihi orang yang memberi dengan sukacita.";
  } else {
    bibleVerse = "Roma 12:6-8 - Demikianlah kita mempunyai karunia yang berlain-lainan menurut kasih karunia yang dianugerahkan kepada kita.";
  }

  // Buat saran yang dipersonalisasi
  const personalizedAdvice = [
    `Fokus pada pengembangan karunia ${topSpiritualGifts[0]} Anda melalui latihan dan umpan balik.`,
    `Cari peluang untuk mengekspresikan hasrat Anda untuk ${topHeartDesires[0]} dalam pelayanan.`,
    `Manfaatkan kekuatan tipe kepribadian ${mbtiType} Anda, terutama dalam hal ${profile.personality.analysis[0]?.description?.substring(0, 50)}...`,
    `Gunakan kemampuan ${topAbilities[0]} Anda untuk melayani orang lain dengan cara yang unik.`,
    `Bagikan pengalaman hidup Anda untuk menginspirasi dan membimbing orang lain yang mungkin menghadapi situasi serupa.`,
  ];

  // Identifikasi kekuatan dan kelemahan
  const strengths = [
    `Karunia ${topSpiritualGifts[0]} yang kuat`,
    `Hasrat yang jelas untuk ${topHeartDesires[0]}`,
    `Kemampuan ${topAbilities[0]} yang berkembang dengan baik`,
  ];

  const weaknesses = [
    `Mungkin perlu mengembangkan keseimbangan dengan karunia lain`,
    `Perlu belajar mengelola aspek ${mbtiType.includes("J") ? "fleksibilitas" : "struktur"} dalam kepribadian Anda`,
    `Mungkin perlu mengembangkan kemampuan di area yang kurang dominan`,
  ];

  // Buat rekomendasi pengembangan
  const developmentRecommendations = [
    `Ikuti kursus atau seminar tentang ${topSpiritualGifts[0]}`,
    `Cari mentor yang kuat dalam area ${topHeartDesires[0]}`,
    `Baca buku tentang tipe kepribadian ${mbtiType} dan bagaimana mengoptimalkannya`,
    `Latih kemampuan ${topAbilities[0]} melalui proyek praktis`,
    `Refleksikan pengalaman hidup Anda dan bagikan pelajaran yang dipetik`,
  ];

  // Identifikasi sinergi SHAPE
  const shapeSynergy = [
    `Karunia ${topSpiritualGifts[0]} Anda melengkapi hasrat Anda untuk ${topHeartDesires[0]}`,
    `Tipe kepribadian ${mbtiType} Anda mendukung pengembangan karunia ${topSpiritualGifts[0]}`,
    `Kemampuan ${topAbilities[0]} Anda memperkuat efektivitas karunia ${topSpiritualGifts[0]}`,
    `Pengalaman hidup Anda memberikan kredibilitas pada hasrat Anda untuk ${topHeartDesires[0]}`,
  ];

  // Identifikasi peran komunitas
  const communityRoles = [
    `${topSpiritualGifts[0].includes("Mengajar") ? "Pengajar atau mentor" : ""}`,
    `${topSpiritualGifts[0].includes("Melayani") ? "Pelayan di balik layar" : ""}`,
    `${topSpiritualGifts[0].includes("Memimpin") ? "Pemimpin tim atau kelompok" : ""}`,
    `${topSpiritualGifts[0].includes("Nubuat") ? "Pembicara atau penasihat" : ""}`,
    `${topSpiritualGifts[0].includes("Memberi") ? "Pendukung atau penyedia sumber daya" : ""}`,
    `${mbtiType.includes("E") ? "Fasilitator hubungan" : "Pemikir mendalam"}`,
    `${mbtiType.includes("S") ? "Pelaksana praktis" : "Pemikir visioner"}`,
    `${mbtiType.includes("T") ? "Analis atau pemecah masalah" : "Pendukung atau penengah"}`,
    `${mbtiType.includes("J") ? "Pengorganisir atau perencana" : "Adaptor atau inovator"}`,
  ].filter(role => role !== "");

  return {
    purposeStatement,
    ministryAreas: topHeartDesires,
    learningPathways,
    bibleVerse,
    personalizedAdvice,
    strengthsWeaknesses: {
      strengths,
      weaknesses,
    },
    ministryRecommendations,
    careerRecommendations,
    developmentRecommendations,
    shapeSynergy,
    communityRoles,
    shapeProfile: profile,
  };
}
