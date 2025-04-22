// Fungsi untuk menganalisis jawaban reflektif
import { ReflectiveAnalysis, CategoryScore } from "../types/shape-types";

/**
 * Menganalisis jawaban reflektif untuk mendapatkan wawasan
 * @param answer Jawaban reflektif
 * @returns Hasil analisis
 */
export function analyzeReflectiveAnswer(answer: string): ReflectiveAnalysis {
  const result: ReflectiveAnalysis = {
    spheres: [],
    keywords: [],
    sentiment: "neutral",
    themes: [],
  };

  // Tambahkan analisis panjang teks
  if (answer.length < 100) {
    result.length = "short";
  } else if (answer.length < 300) {
    result.length = "medium";
  } else {
    result.length = "long";
  }

  // Kata kunci untuk setiap sphere (diperluas)
  const sphereKeywords: Record<string, string[]> = {
    religion: [
      "gereja",
      "iman",
      "rohani",
      "tuhan",
      "yesus",
      "alkitab",
      "doa",
      "ibadah",
      "spiritual",
      "agama",
      "kristus",
      "firman",
      "berkat",
      "kasih",
      "penginjilan",
      "keselamatan",
      "pemuridan",
      "komunitas iman",
      "jemaat",
      "pendeta",
    ],
    family: [
      "keluarga",
      "anak",
      "orang tua",
      "pernikahan",
      "rumah",
      "hubungan",
      "pasangan",
      "ayah",
      "ibu",
      "saudara",
      "kakek",
      "nenek",
      "cucu",
      "keturunan",
      "rumah tangga",
      "kasih sayang",
      "pengasuhan",
    ],
    education: [
      "pendidikan",
      "sekolah",
      "mengajar",
      "belajar",
      "pengetahuan",
      "kurikulum",
      "siswa",
      "murid",
      "guru",
      "dosen",
      "universitas",
      "kuliah",
      "pelatihan",
      "kursus",
      "pembelajaran",
      "mentor",
      "bimbingan",
      "penelitian",
    ],
    government: [
      "pemerintah",
      "politik",
      "kebijakan",
      "hukum",
      "keadilan",
      "masyarakat",
      "negara",
      "demokrasi",
      "parlemen",
      "legislatif",
      "eksekutif",
      "yudikatif",
      "konstitusi",
      "peraturan",
      "undang-undang",
      "reformasi",
    ],
    media: [
      "media",
      "komunikasi",
      "informasi",
      "berita",
      "sosial",
      "digital",
      "internet",
      "teknologi",
      "jurnalisme",
      "penyiaran",
      "publikasi",
      "platform",
      "jaringan",
      "podcast",
      "video",
      "blog",
    ],
    arts: [
      "seni",
      "musik",
      "film",
      "desain",
      "kreatif",
      "budaya",
      "hiburan",
      "artistik",
      "karya",
      "visual",
      "fotografi",
      "tari",
      "sastra",
      "puisi",
      "novel",
      "estetika",
      "ekspresi",
    ],
    business: [
      "bisnis",
      "ekonomi",
      "keuangan",
      "kerja",
      "karir",
      "perusahaan",
      "entrepreneur",
      "pasar",
      "investasi",
      "manajemen",
      "strategi",
      "inovasi",
      "produk",
      "layanan",
      "pelanggan",
      "pemasaran",
      "penjualan",
    ],
    helping: [
      "membantu",
      "menolong",
      "melayani",
      "sukarela",
      "donasi",
      "amal",
      "sosial",
      "kemanusiaan",
      "empati",
      "peduli",
      "berbagi",
      "mendukung",
      "bantuan",
      "kontribusi",
      "dampak",
      "perubahan",
      "komunitas",
    ],
  };

  // Kata kunci untuk tema umum (diperluas)
  const themeKeywords: Record<string, string[]> = {
    leadership: [
      "memimpin",
      "kepemimpinan",
      "mengarahkan",
      "visi",
      "pengaruh",
      "pemimpin",
      "motivasi",
      "inspirasi",
      "strategi",
      "keputusan",
      "otoritas",
      "delegasi",
      "manajemen",
      "koordinasi",
      "pemberdayaan",
      "mentor",
      "teladan",
    ],
    service: [
      "melayani",
      "membantu",
      "mendukung",
      "berkontribusi",
      "pelayanan",
      "pengabdian",
      "dedikasi",
      "altruisme",
      "kerelawanan",
      "bantuan",
      "dukungan",
      "kebaikan",
      "empati",
      "kepedulian",
    ],
    teaching: [
      "mengajar",
      "mendidik",
      "membimbing",
      "menjelaskan",
      "pelatihan",
      "instruksi",
      "kurikulum",
      "pelajaran",
      "fasilitasi",
      "pengembangan",
      "pemahaman",
      "keterampilan",
      "kompetensi",
      "edukasi",
      "pembelajaran",
    ],
    compassion: [
      "kasih",
      "empati",
      "peduli",
      "berbelas kasih",
      "perhatian",
      "simpati",
      "belas kasihan",
      "pengertian",
      "kebaikan",
      "kelembutan",
    ],
    innovation: [
      "inovasi",
      "kreativitas",
      "perubahan",
      "solusi baru",
      "ide",
      "terobosan",
      "penemuan",
      "pembaruan",
      "transformasi",
      "disrupsi",
    ],
    justice: [
      "keadilan",
      "kesetaraan",
      "hak",
      "membela",
      "advokasi",
      "kebenaran",
      "perlindungan",
      "kesamaan",
      "martabat",
      "integritas",
    ],
    community: [
      "komunitas",
      "masyarakat",
      "bersama",
      "kelompok",
      "tim",
      "kolaborasi",
      "kerjasama",
      "persekutuan",
      "persahabatan",
      "jaringan",
    ],
    growth: [
      "pertumbuhan",
      "perkembangan",
      "kemajuan",
      "transformasi",
      "peningkatan",
      "ekspansi",
      "evolusi",
      "pengembangan",
      "kemampuan",
      "potensi",
    ],
    spiritual: [
      "iman",
      "rohani",
      "spiritual",
      "tuhan",
      "doa",
      "ibadah",
      "meditasi",
      "refleksi",
      "keyakinan",
      "kepercayaan",
      "makna",
      "tujuan",
      "transenden",
      "pencerahan",
      "kebijaksanaan",
    ],
    resilience: [
      "ketahanan",
      "bertahan",
      "mengatasi",
      "tantangan",
      "kesulitan",
      "kegagalan",
      "bangkit",
      "ketekunan",
      "kegigihan",
      "adaptasi",
      "fleksibilitas",
      "kekuatan",
      "keberanian",
    ],
  };

  // Kata kunci sentimen positif dan negatif (diperluas)
  const positiveSentiment = [
    "senang",
    "sukacita",
    "bahagia",
    "puas",
    "berhasil",
    "bersemangat",
    "antusias",
    "optimis",
    "gembira",
    "ceria",
    "bangga",
    "bersyukur",
    "berterima kasih",
    "luar biasa",
    "menakjubkan",
    "hebat",
    "indah",
    "menyenangkan",
    "positif",
    "sukses",
  ];

  const negativeSentiment = [
    "sedih",
    "kecewa",
    "frustrasi",
    "marah",
    "gagal",
    "sulit",
    "masalah",
    "tantangan",
    "kesulitan",
    "hambatan",
    "rintangan",
    "kegagalan",
    "kehilangan",
    "menyesal",
    "takut",
    "cemas",
    "khawatir",
    "stres",
    "tertekan",
    "terbebani",
  ];

  // Konversi jawaban ke lowercase untuk memudahkan pencocokan
  const lowerAnswer = answer.toLowerCase();

  // Identifikasi sphere berdasarkan kata kunci dengan pendekatan yang lebih canggih
  Object.entries(sphereKeywords).forEach(([sphere, keywords]) => {
    // Hitung berapa banyak kata kunci yang cocok
    const matchCount = keywords.filter((keyword) =>
      lowerAnswer.includes(keyword)
    ).length;
    // Jika ada lebih dari 1 kata kunci yang cocok, tambahkan sphere ini
    if (matchCount >= 1) {
      result.spheres.push(sphere);
    }
  });

  // Identifikasi tema berdasarkan kata kunci dengan pendekatan yang lebih canggih
  Object.entries(themeKeywords).forEach(([theme, keywords]) => {
    // Hitung berapa banyak kata kunci yang cocok
    const matchCount = keywords.filter((keyword) =>
      lowerAnswer.includes(keyword)
    ).length;
    // Jika ada lebih dari 1 kata kunci yang cocok, tambahkan tema ini
    if (matchCount >= 1) {
      result.themes.push(theme);
    }
  });

  // Identifikasi sentimen dengan pendekatan yang lebih canggih
  const positiveCount = positiveSentiment.filter((word) =>
    lowerAnswer.includes(word)
  ).length;
  const negativeCount = negativeSentiment.filter((word) =>
    lowerAnswer.includes(word)
  ).length;

  // Tentukan sentimen berdasarkan perbandingan relatif
  const totalSentimentWords = positiveCount + negativeCount;
  if (totalSentimentWords > 0) {
    const positiveRatio = positiveCount / totalSentimentWords;
    if (positiveRatio > 0.6) {
      result.sentiment = "positive";
    } else if (positiveRatio < 0.4) {
      result.sentiment = "negative";
    } else {
      result.sentiment = "neutral";
    }
  }

  // Ekstrak kata kunci penting (kata benda dan kata kerja) dengan pendekatan yang lebih canggih
  const words = lowerAnswer.split(/\s+/);
  const stopWords = [
    "adalah",
    "dengan",
    "untuk",
    "yang",
    "dari",
    "akan",
    "dapat",
    "dalam",
    "dan",
    "ini",
    "itu",
    "saya",
    "mereka",
    "kita",
    "kami",
    "ada",
    "juga",
    "tidak",
    "bukan",
    "tapi",
    "tetapi",
    "namun",
    "atau",
    "jika",
    "maka",
    "karena",
    "sebab",
    "oleh",
    "pada",
    "kepada",
    "tentang",
    "seperti",
    "sebagai",
  ];

  // Filter kata-kata penting
  const importantWords = words.filter(
    (word) => word.length > 3 && !stopWords.includes(word)
  );

  // Hitung frekuensi kata
  const wordFrequency: Record<string, number> = {};
  importantWords.forEach((word) => {
    wordFrequency[word] = (wordFrequency[word] || 0) + 1;
  });

  // Urutkan kata berdasarkan frekuensi dan ambil 15 kata teratas
  result.keywords = Object.entries(wordFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([word]) => word);

  return result;
}

/**
 * Mengintegrasikan wawasan reflektif dengan komponen SHAPE lainnya
 * @param reflectiveAnalysis Hasil analisis reflektif
 * @param spiritualGifts Karunia spiritual
 * @param heartDesires Hasrat hati
 * @param personalityType Tipe kepribadian
 * @returns Wawasan terintegrasi
 */
export function integrateReflectiveInsights(
  reflectiveAnalysis: ReflectiveAnalysis,
  spiritualGifts: CategoryScore[],
  heartDesires: CategoryScore[],
  personalityType: string
): string {
  let insights = "";

  // Korelasi dengan karunia spiritual
  const topGifts = spiritualGifts.slice(0, 3).map((g) => g.category);
  const giftThemes = reflectiveAnalysis.themes.filter(
    (theme) =>
      (theme === "teaching" && topGifts.some((g) => g.includes("Mengajar"))) ||
      (theme === "leadership" &&
        topGifts.some((g) => g.includes("Memimpin"))) ||
      (theme === "service" && topGifts.some((g) => g.includes("Melayani")))
  );

  if (giftThemes.length > 0) {
    insights += `Refleksi Anda menunjukkan keselarasan dengan karunia spiritual ${topGifts.join(
      ", "
    )} melalui tema ${giftThemes.join(", ")}. `;
  }

  // Korelasi dengan hasrat hati
  const topSpheres = heartDesires
    .filter((h) => h.type === "scale")
    .slice(0, 3)
    .map((h) => h.subcategory || "");

  const reflectiveSpheres = reflectiveAnalysis.spheres.filter((s) =>
    topSpheres.includes(s)
  );

  if (reflectiveSpheres.length > 0) {
    insights += `Refleksi Anda menegaskan hasrat hati Anda untuk bidang ${reflectiveSpheres
      .map((s) =>
        s === "religion"
          ? "Agama/Spiritualitas"
          : s === "family"
          ? "Keluarga"
          : s === "education"
          ? "Pendidikan"
          : s === "government"
          ? "Pemerintahan"
          : s === "media"
          ? "Media"
          : s === "arts"
          ? "Seni & Hiburan"
          : s === "business"
          ? "Bisnis/Ekonomi"
          : s
      )
      .join(", ")}. `;
  }

  // Korelasi dengan kepribadian
  if (
    personalityType.includes("E") &&
    reflectiveAnalysis.keywords.some((k) =>
      ["bersama", "kelompok", "tim", "komunitas"].includes(k)
    )
  ) {
    insights += `Sebagai tipe ${personalityType} dengan preferensi Ekstrovert, refleksi Anda menunjukkan kecenderungan untuk terhubung dan bekerja dengan orang lain. `;
  } else if (
    personalityType.includes("I") &&
    reflectiveAnalysis.keywords.some((k) =>
      ["sendiri", "pribadi", "refleksi", "mendalam"].includes(k)
    )
  ) {
    insights += `Sebagai tipe ${personalityType} dengan preferensi Introvert, refleksi Anda menunjukkan kecenderungan untuk pemikiran mendalam dan refleksi pribadi. `;
  }

  if (
    personalityType.includes("N") &&
    reflectiveAnalysis.keywords.some((k) =>
      ["visi", "masa depan", "kemungkinan", "inovasi"].includes(k)
    )
  ) {
    insights += `Preferensi Intuition Anda tercermin dalam fokus pada visi dan kemungkinan masa depan dalam refleksi Anda. `;
  } else if (
    personalityType.includes("S") &&
    reflectiveAnalysis.keywords.some((k) =>
      ["praktis", "konkret", "langkah", "detail"].includes(k)
    )
  ) {
    insights += `Preferensi Sensing Anda tercermin dalam fokus pada aspek praktis dan konkret dalam refleksi Anda. `;
  }

  return (
    insights ||
    "Refleksi Anda memberikan wawasan tambahan tentang hasrat hati dan panggilan Anda yang unik."
  );
}

/**
 * Menghasilkan rekomendasi berdasarkan refleksi
 * @param reflectiveAnalysis Hasil analisis reflektif
 * @param mbtiType Tipe kepribadian MBTI
 * @returns Array rekomendasi
 */
export function generateReflectionBasedRecommendations(
  reflectiveAnalysis: ReflectiveAnalysis,
  mbtiType: string
): string[] {
  const recommendations: string[] = [];

  // Rekomendasi berdasarkan sphere
  if (reflectiveAnalysis.spheres.includes("religion")) {
    recommendations.push(
      "Pertimbangkan untuk terlibat lebih dalam di komunitas iman Anda melalui pelayanan yang sesuai dengan karunia spiritual Anda."
    );
  }

  if (reflectiveAnalysis.spheres.includes("family")) {
    recommendations.push(
      "Eksplorasi cara untuk menggunakan kekuatan SHAPE Anda dalam konteks keluarga dan hubungan dekat."
    );
  }

  if (reflectiveAnalysis.spheres.includes("education")) {
    recommendations.push(
      "Pertimbangkan peran mentoring atau pengajaran yang memungkinkan Anda berbagi pengetahuan dan wawasan Anda dengan orang lain."
    );
  }

  if (reflectiveAnalysis.spheres.includes("government")) {
    recommendations.push(
      "Eksplorasi cara untuk terlibat dalam advokasi kebijakan atau pelayanan masyarakat yang sesuai dengan nilai-nilai Anda."
    );
  }

  if (reflectiveAnalysis.spheres.includes("media")) {
    recommendations.push(
      "Pertimbangkan untuk menggunakan platform media untuk menyebarkan pesan positif dan nilai-nilai yang Anda yakini."
    );
  }

  if (reflectiveAnalysis.spheres.includes("arts")) {
    recommendations.push(
      "Eksplorasi cara untuk mengekspresikan kreativitas Anda melalui seni dan budaya untuk memengaruhi orang lain secara positif."
    );
  }

  if (reflectiveAnalysis.spheres.includes("business")) {
    recommendations.push(
      "Pertimbangkan cara untuk mengintegrasikan nilai-nilai Anda dalam konteks bisnis atau karir Anda."
    );
  }

  // Rekomendasi berdasarkan tema
  if (reflectiveAnalysis.themes.includes("leadership")) {
    if (mbtiType.includes("E") && mbtiType.includes("J")) {
      recommendations.push(
        "Dengan kecenderungan ekstrovert dan terstruktur, Anda dapat memimpin dengan memberikan arahan yang jelas dan membangun tim yang solid."
      );
    } else if (mbtiType.includes("I") && mbtiType.includes("N")) {
      recommendations.push(
        "Dengan kecenderungan introvert dan intuitif, Anda dapat memimpin dengan visi yang jelas dan pemikiran strategis yang mendalam."
      );
    } else {
      recommendations.push(
        "Kembangkan gaya kepemimpinan yang sesuai dengan kepribadian unik Anda dan fokus pada kekuatan alami Anda."
      );
    }
  }

  if (reflectiveAnalysis.themes.includes("service")) {
    recommendations.push(
      "Temukan cara untuk melayani orang lain yang sesuai dengan hasrat hati dan karunia spiritual Anda."
    );
  }

  if (reflectiveAnalysis.themes.includes("teaching")) {
    recommendations.push(
      "Eksplorasi peluang untuk berbagi pengetahuan dan wawasan Anda melalui pengajaran atau mentoring."
    );
  }

  // Rekomendasi berdasarkan sentimen
  if (reflectiveAnalysis.sentiment === "positive") {
    recommendations.push(
      "Energi positif dalam refleksi Anda menunjukkan antusiasme yang dapat menjadi kekuatan dalam mengejar panggilan Anda."
    );
  } else if (reflectiveAnalysis.sentiment === "negative") {
    recommendations.push(
      "Perhatikan area yang menimbulkan ketidakpuasan dalam refleksi Anda - ini mungkin menunjukkan bidang yang perlu ditransformasi atau diubah dalam hidup Anda."
    );
  }

  return recommendations;
}
