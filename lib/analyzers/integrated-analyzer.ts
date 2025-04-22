// Fungsi untuk menganalisis hasil terintegrasi dari semua komponen SHAPE
import {
  CategoryScore,
  ShapeProfile,
  ShapeRecommendations,
} from "../types/shape-types";
import {
  getIntegratedMinistryRecommendations,
  getIntegratedCareerRecommendations,
} from "../correlations";

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
    (item) =>
      item.type === "personality" && item.category.includes("Tipe Kepribadian")
  );
  const mbtiType = mbtiTypeResult
    ? mbtiTypeResult.category.split(":")[1].trim()
    : "ISFJ"; // Default jika tidak ditemukan

  // Ekstrak analisis MBTI
  const mbtiAnalysis = personality.filter(
    (item) =>
      item.type === "personality" && !item.category.includes("Tipe Kepribadian")
  );

  // Ekstrak kemampuan dari hasil kepribadian
  const abilities = personality.filter((item) => item.type === "ability");

  // Ekstrak wawasan reflektif dari hasrat hati
  const reflectiveInsights = heartDesire.filter(
    (item) => item.type === "reflection" || item.type === "open"
  );

  // Buat kode SHAPE
  const topSpiritualGift =
    spiritualGifts.length > 0 ? spiritualGifts[0].category.charAt(0) : "S";
  const topHeartDesire =
    heartDesire.filter((item) => item.type === "scale").length > 0
      ? heartDesire
          .filter((item) => item.type === "scale")[0]
          .category.charAt(0)
      : "H";
  const personalityCode = mbtiType;
  const topAbility =
    abilities.length > 0 ? abilities[0].category.split(":")[0].charAt(0) : "A";
  const topExperience =
    experiences.filter((item) => item.type === "open").length > 0 ? "E" : "E";

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

  // Buat pernyataan tujuan yang lebih personal dan terintegrasi
  let purposeStatement = "";

  // Dapatkan karunia spiritual utama
  const primaryGift = topSpiritualGifts[0] || "spiritual";
  const secondaryGift = topSpiritualGifts[1] || "pelayanan";

  // Dapatkan hasrat hati utama
  const primaryDesire = topHeartDesires[0] || "melayani";

  // Dapatkan kemampuan utama
  const primaryAbility = topAbilities[0] || "interpersonal";

  // Buat pernyataan tujuan berdasarkan kombinasi komponen
  if (mbtiType.includes("E")) {
    // Untuk tipe ekstrovert
    purposeStatement = `Anda memiliki panggilan unik untuk menggunakan karunia ${primaryGift} Anda dalam konteks komunitas, didorong oleh hasrat mendalam untuk ${primaryDesire}. Dengan kepribadian ${mbtiType} yang ekstrovert dan kemampuan ${primaryAbility} yang kuat, Anda dapat membawa dampak transformatif melalui interaksi langsung dengan orang lain, memanfaatkan pengalaman hidup Anda yang berharga untuk membimbing dan menginspirasi.`;
  } else {
    // Untuk tipe introvert
    purposeStatement = `Anda memiliki panggilan unik untuk menggunakan karunia ${primaryGift} Anda dengan cara yang mendalam dan reflektif, didorong oleh hasrat untuk ${primaryDesire}. Dengan kepribadian ${mbtiType} yang introvert dan kemampuan ${primaryAbility} yang kuat, Anda dapat membawa dampak transformatif melalui pemikiran mendalam dan karya yang bermakna, memanfaatkan pengalaman hidup Anda yang berharga untuk memberikan wawasan dan perspektif yang unik.`;
  }

  // Tambahkan elemen karunia sekunder
  purposeStatement += ` Karunia ${secondaryGift} Anda melengkapi dan memperkuat efektivitas Anda dalam memenuhi tujuan ini.`;

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

  // Pilih ayat Alkitab yang relevan berdasarkan kombinasi profil SHAPE
  let bibleVerse = "";
  let additionalVerse = "";

  // Ayat berdasarkan karunia spiritual
  if (primaryGift.toLowerCase().includes("mengajar")) {
    bibleVerse =
      "2 Timotius 2:15 - Usahakanlah supaya engkau layak di hadapan Allah sebagai seorang pekerja yang tidak usah malu, yang berterus terang memberitakan perkataan kebenaran itu.";
  } else if (primaryGift.toLowerCase().includes("melayani")) {
    bibleVerse =
      "1 Petrus 4:10 - Layanilah seorang akan yang lain, sesuai dengan karunia yang telah diperoleh tiap-tiap orang sebagai pengurus yang baik dari kasih karunia Allah.";
  } else if (primaryGift.toLowerCase().includes("memimpin")) {
    bibleVerse =
      "Roma 12:8 - Jika karunia untuk memimpin, ia harus melakukannya dengan rajin.";
  } else if (primaryGift.toLowerCase().includes("nubuat")) {
    bibleVerse =
      "1 Korintus 14:3 - Tetapi siapa yang bernubuat, ia berkata-kata kepada manusia, ia membangun, menasihati dan menghibur.";
  } else if (primaryGift.toLowerCase().includes("memberi")) {
    bibleVerse =
      "2 Korintus 9:7 - Hendaklah masing-masing memberikan menurut kerelaan hatinya, jangan dengan sedih hati atau karena paksaan, sebab Allah mengasihi orang yang memberi dengan sukacita.";
  } else if (primaryGift.toLowerCase().includes("belas kasihan")) {
    bibleVerse =
      "Matius 5:7 - Berbahagialah orang yang murah hatinya, karena mereka akan beroleh kemurahan.";
  } else if (primaryGift.toLowerCase().includes("pengetahuan")) {
    bibleVerse =
      "Kolose 2:2-3 - Supaya hati mereka terhibur dan mereka bersatu dalam kasih, sehingga mereka memperoleh segala kekayaan dan keyakinan pengertian, dan mengenal rahasia Allah, yaitu Kristus, yang di dalam-Nya tersembunyi segala harta hikmat dan pengetahuan.";
  } else {
    bibleVerse =
      "Roma 12:6-8 - Demikianlah kita mempunyai karunia yang berlain-lainan menurut kasih karunia yang dianugerahkan kepada kita.";
  }

  // Ayat tambahan berdasarkan tipe kepribadian atau hasrat hati
  if (mbtiType.includes("I") && mbtiType.includes("N")) {
    additionalVerse =
      "Mazmur 139:23-24 - Selidikilah aku, ya Allah, dan kenallah hatiku, ujilah aku dan kenallah pikiran-pikiranku; lihatlah, apakah jalanku serong, dan tuntunlah aku di jalan yang kekal!";
  } else if (mbtiType.includes("E") && mbtiType.includes("S")) {
    additionalVerse =
      "Yakobus 1:22 - Tetapi hendaklah kamu menjadi pelaku firman dan bukan hanya pendengar saja; sebab jika tidak demikian kamu menipu diri sendiri.";
  } else if (mbtiType.includes("F")) {
    additionalVerse =
      "Filipi 2:4 - Dan janganlah tiap-tiap orang hanya memperhatikan kepentingannya sendiri, tetapi kepentingan orang lain juga.";
  } else if (mbtiType.includes("T")) {
    additionalVerse =
      "Amsal 2:6 - Karena Tuhanlah yang memberikan hikmat, dari mulut-Nya datang pengetahuan dan kepandaian.";
  }

  // Ayat tambahan berdasarkan hasrat hati
  if (primaryDesire.toLowerCase().includes("pendidikan")) {
    if (additionalVerse === "") {
      additionalVerse =
        "Amsal 9:9 - Berilah orang bijak nasihat, maka ia akan menjadi lebih bijak, ajarilah orang benar, maka pengetahuannya akan bertambah.";
    }
  } else if (primaryDesire.toLowerCase().includes("keadilan")) {
    if (additionalVerse === "") {
      additionalVerse =
        "Mikha 6:8 - Hai manusia, telah diberitahukan kepadamu apa yang baik. Dan apakah yang dituntut TUHAN dari padamu: selain berlaku adil, mencintai kesetiaan, dan hidup dengan rendah hati di hadapan Allahmu?";
    }
  } else if (primaryDesire.toLowerCase().includes("keluarga")) {
    if (additionalVerse === "") {
      additionalVerse =
        "Ulangan 6:6-7 - Apa yang kuperintahkan kepadamu pada hari ini haruslah engkau perhatikan, haruslah engkau mengajarkannya berulang-ulang kepada anak-anakmu dan membicarakannya apabila engkau duduk di rumahmu, apabila engkau sedang dalam perjalanan, apabila engkau berbaring dan apabila engkau bangun.";
    }
  }

  // Gabungkan ayat-ayat jika ada tambahan
  if (additionalVerse !== "") {
    bibleVerse = bibleVerse + "\n\n" + additionalVerse;
  }

  // Buat saran yang dipersonalisasi
  const personalizedAdvice = [
    `Fokus pada pengembangan karunia ${topSpiritualGifts[0]} Anda melalui latihan dan umpan balik.`,
    `Cari peluang untuk mengekspresikan hasrat Anda untuk ${topHeartDesires[0]} dalam pelayanan.`,
    `Manfaatkan kekuatan tipe kepribadian ${mbtiType} Anda, terutama dalam hal ${profile.personality.analysis[0]?.description?.substring(
      0,
      50
    )}...`,
    `Gunakan kemampuan ${topAbilities[0]} Anda untuk melayani orang lain dengan cara yang unik.`,
    `Bagikan pengalaman hidup Anda untuk menginspirasi dan membimbing orang lain yang mungkin menghadapi situasi serupa.`,
  ];

  // Identifikasi kekuatan dan kelemahan yang lebih spesifik dan terintegrasi
  const strengths = [];
  const weaknesses = [];

  // Kekuatan berdasarkan karunia spiritual
  if (primaryGift.toLowerCase().includes("mengajar")) {
    strengths.push(
      `Kemampuan luar biasa untuk menjelaskan konsep kompleks dengan cara yang mudah dipahami melalui karunia ${primaryGift} Anda`
    );
  } else if (primaryGift.toLowerCase().includes("melayani")) {
    strengths.push(
      `Kemampuan untuk melihat kebutuhan praktis dan merespons dengan tindakan nyata melalui karunia ${primaryGift} Anda`
    );
  } else if (primaryGift.toLowerCase().includes("memimpin")) {
    strengths.push(
      `Kemampuan untuk menginspirasi dan memobilisasi orang lain menuju tujuan bersama melalui karunia ${primaryGift} Anda`
    );
  } else {
    strengths.push(
      `Karunia spiritual yang kuat dalam ${primaryGift} yang memberi Anda perspektif dan kemampuan unik`
    );
  }

  // Kekuatan berdasarkan hasrat hati
  if (primaryDesire.toLowerCase().includes("pendidikan")) {
    strengths.push(
      `Komitmen mendalam untuk mengembangkan potensi orang lain melalui hasrat Anda untuk ${primaryDesire}`
    );
  } else if (primaryDesire.toLowerCase().includes("keadilan")) {
    strengths.push(
      `Kepekaan terhadap ketidakadilan dan dorongan untuk membela mereka yang terpinggirkan melalui hasrat Anda untuk ${primaryDesire}`
    );
  } else if (primaryDesire.toLowerCase().includes("keluarga")) {
    strengths.push(
      `Dedikasi untuk membangun hubungan yang sehat dan mendukung melalui hasrat Anda untuk ${primaryDesire}`
    );
  } else {
    strengths.push(
      `Hasrat yang jelas dan konsisten untuk ${primaryDesire} yang memberi Anda motivasi dan arah`
    );
  }

  // Kekuatan berdasarkan tipe kepribadian
  if (mbtiType.includes("N")) {
    strengths.push(
      `Kemampuan untuk melihat gambaran besar dan pola yang mungkin tidak terlihat oleh orang lain melalui tipe kepribadian ${mbtiType} Anda`
    );
  } else if (mbtiType.includes("S")) {
    strengths.push(
      `Perhatian terhadap detail dan kemampuan praktis yang kuat melalui tipe kepribadian ${mbtiType} Anda`
    );
  }

  if (mbtiType.includes("T")) {
    strengths.push(
      `Kemampuan analitis dan pengambilan keputusan objektif melalui tipe kepribadian ${mbtiType} Anda`
    );
  } else if (mbtiType.includes("F")) {
    strengths.push(
      `Empati dan pemahaman mendalam tentang nilai-nilai dan kebutuhan orang lain melalui tipe kepribadian ${mbtiType} Anda`
    );
  }

  // Kekuatan berdasarkan kemampuan
  strengths.push(
    `Kemampuan yang kuat dalam ${primaryAbility} yang meningkatkan efektivitas Anda dalam berbagai konteks`
  );

  // Kelemahan berdasarkan karunia spiritual
  if (primaryGift.toLowerCase().includes("mengajar")) {
    weaknesses.push(
      `Kecenderungan untuk terlalu teoretis dan kurang aplikasi praktis ketika menggunakan karunia ${primaryGift} Anda`
    );
  } else if (primaryGift.toLowerCase().includes("melayani")) {
    weaknesses.push(
      `Risiko kelelahan dan mengabaikan kebutuhan diri sendiri karena terlalu fokus pada melayani orang lain melalui karunia ${primaryGift} Anda`
    );
  } else if (primaryGift.toLowerCase().includes("memimpin")) {
    weaknesses.push(
      `Tantangan dalam mendelegasikan dan memberdayakan orang lain karena keinginan untuk memastikan hasil yang sempurna melalui karunia ${primaryGift} Anda`
    );
  } else {
    weaknesses.push(
      `Mungkin terlalu bergantung pada karunia ${primaryGift} dan perlu mengembangkan area lain untuk keseimbangan`
    );
  }

  // Kelemahan berdasarkan tipe kepribadian
  if (mbtiType.includes("E")) {
    weaknesses.push(
      `Mungkin kesulitan dengan refleksi mendalam dan waktu sendirian yang diperlukan untuk pertumbuhan spiritual karena kecenderungan ekstrovert Anda`
    );
  } else if (mbtiType.includes("I")) {
    weaknesses.push(
      `Mungkin kesulitan dalam membangun jaringan dan hubungan yang diperlukan untuk pelayanan efektif karena kecenderungan introvert Anda`
    );
  }

  if (mbtiType.includes("J")) {
    weaknesses.push(
      `Kecenderungan untuk terlalu kaku dan kurang fleksibel dalam pendekatan Anda, yang dapat membatasi adaptabilitas`
    );
  } else if (mbtiType.includes("P")) {
    weaknesses.push(
      `Tantangan dalam menyelesaikan proyek dan mempertahankan fokus jangka panjang, yang dapat menghambat konsistensi`
    );
  }

  // Kelemahan berdasarkan kemampuan
  weaknesses.push(
    `Perlu mengembangkan kemampuan di luar ${primaryAbility} untuk pendekatan yang lebih seimbang dan komprehensif`
  );

  // Buat rekomendasi pengembangan yang lebih spesifik, actionable, dan informatif
  const developmentRecommendations = [];

  // Rekomendasi berdasarkan karunia spiritual
  if (primaryGift.toLowerCase().includes("mengajar")) {
    developmentRecommendations.push(
      `Kembangkan karunia ${primaryGift} Anda melalui pelatihan formal dan praktik yang terstruktur. Ikuti kursus pengembangan kurikulum atau metode pengajaran untuk mempelajari teknik baru dalam menyampaikan kebenaran dengan lebih efektif. Langkah-langkah praktis yang dapat Anda ambil: (1) Daftarkan diri dalam seminar atau kursus online tentang metode pengajaran, (2) Minta umpan balik dari pendengar Anda untuk mengidentifikasi area yang perlu ditingkatkan, (3) Pelajari gaya belajar yang berbeda dan sesuaikan pendekatan Anda, (4) Latih kemampuan bercerita dan penggunaan ilustrasi, dan (5) Rekam dan evaluasi pengajaran Anda untuk perbaikan berkelanjutan. Pengembangan karunia ini akan meningkatkan kemampuan Anda untuk menjelaskan kebenaran kompleks dengan cara yang mudah dipahami dan diingat oleh berbagai jenis pembelajar.`
    );
  } else if (primaryGift.toLowerCase().includes("melayani")) {
    developmentRecommendations.push(
      `Perkuat karunia ${primaryGift} Anda melalui pendekatan yang seimbang dan berkelanjutan. Ikuti pelatihan tentang pelayanan holistik untuk belajar bagaimana melayani dengan cara yang efektif tanpa mengalami kelelahan. Langkah-langkah praktis yang dapat Anda ambil: (1) Identifikasi area pelayanan yang paling sesuai dengan keterampilan dan minat Anda, (2) Tetapkan batasan yang sehat untuk mencegah kelelahan, (3) Kembangkan sistem dukungan dengan rekan pelayan lainnya, (4) Pelajari teknik manajemen waktu dan prioritas, dan (5) Latih kemampuan untuk mendelegasikan dan memberdayakan orang lain. Pengembangan karunia ini akan memungkinkan Anda untuk memberikan dampak jangka panjang yang lebih besar melalui pelayanan yang konsisten dan berkelanjutan.`
    );
  } else if (primaryGift.toLowerCase().includes("memimpin")) {
    developmentRecommendations.push(
      `Tingkatkan karunia ${primaryGift} Anda melalui pengembangan keterampilan kepemimpinan yang komprehensif. Ikuti program pengembangan kepemimpinan dengan fokus khusus pada pemberdayaan tim dan pendelegasian yang efektif. Langkah-langkah praktis yang dapat Anda ambil: (1) Cari mentor yang merupakan pemimpin berpengalaman, (2) Baca buku-buku tentang kepemimpinan alkitabiah dan transformasional, (3) Ambil tanggung jawab kepemimpinan kecil dan minta umpan balik, (4) Kembangkan visi yang jelas dan kemampuan komunikasi yang efektif, dan (5) Latih kemampuan untuk mengidentifikasi dan mengembangkan potensi dalam diri orang lain. Pengembangan karunia ini akan meningkatkan kemampuan Anda untuk memobilisasi dan memberdayakan orang lain menuju tujuan bersama dengan cara yang menghormati dan menghargai kontribusi unik setiap individu.`
    );
  } else {
    developmentRecommendations.push(
      `Maksimalkan karunia ${primaryGift} Anda melalui pendidikan, latihan, dan penerapan yang konsisten. Ikuti kursus atau seminar yang berfokus pada pengembangan karunia ini untuk meningkatkan efektivitas pelayanan Anda. Langkah-langkah praktis yang dapat Anda ambil: (1) Pelajari dasar-dasar alkitabiah tentang karunia spiritual Anda, (2) Identifikasi model peran yang memiliki karunia serupa dan pelajari dari mereka, (3) Cari kesempatan untuk menggunakan karunia Anda dalam konteks yang berbeda, (4) Minta umpan balik dari pemimpin rohani dan rekan pelayan, dan (5) Tetapkan tujuan pengembangan spesifik untuk karunia Anda. Pengembangan karunia ini akan memungkinkan Anda untuk melayani dengan lebih efektif dan menemukan sukacita yang lebih besar dalam menggunakan kemampuan yang Tuhan berikan kepada Anda.`
    );
  }

  // Rekomendasi berdasarkan hasrat hati
  if (primaryDesire.toLowerCase().includes("pendidikan")) {
    developmentRecommendations.push(
      `Perluas dan perdalam hasrat Anda untuk ${primaryDesire} melalui pengalaman dan pembelajaran yang terarah. Cari mentor yang berpengalaman dalam bidang pendidikan untuk membimbing Anda dalam mengembangkan hasrat ini dengan cara yang transformatif. Langkah-langkah praktis yang dapat Anda ambil: (1) Identifikasi aspek spesifik dari pendidikan yang paling menarik bagi Anda (misalnya, pendidikan anak usia dini, pendidikan orang dewasa, metode inovatif), (2) Observasi dan wawancarai pendidik yang efektif, (3) Ikuti seminar atau kursus tentang filosofi dan metode pendidikan, (4) Mulai dengan proyek pendidikan kecil untuk menguji dan mengembangkan keterampilan Anda, dan (5) Bergabunglah dengan komunitas pendidik untuk berbagi ide dan sumber daya. Pengembangan hasrat ini akan memungkinkan Anda untuk membuat dampak yang lebih besar dalam membantu orang lain bertumbuh dan mengembangkan potensi mereka sepenuhnya.`
    );
  } else if (primaryDesire.toLowerCase().includes("keadilan")) {
    developmentRecommendations.push(
      `Kembangkan hasrat Anda untuk ${primaryDesire} melalui pendidikan, keterlibatan, dan advokasi yang terarah. Bergabunglah dengan kelompok advokasi atau organisasi yang berfokus pada keadilan sosial untuk memperdalam pemahaman dan memperluas dampak hasrat Anda. Langkah-langkah praktis yang dapat Anda ambil: (1) Pelajari prinsip-prinsip alkitabiah tentang keadilan dan pembelaan bagi yang tertindas, (2) Edukasi diri Anda tentang isu-isu keadilan sosial kontemporer, (3) Dengarkan cerita dan pengalaman dari mereka yang terpinggirkan, (4) Identifikasi area spesifik di mana Anda dapat membuat perbedaan, dan (5) Kembangkan keterampilan advokasi yang efektif dan penuh kasih. Pengembangan hasrat ini akan memungkinkan Anda untuk menjadi suara bagi mereka yang tidak memiliki suara dan bekerja menuju masyarakat yang lebih adil dan merata yang mencerminkan nilai-nilai Kerajaan Allah.`
    );
  } else {
    developmentRecommendations.push(
      `Eksplorasi dan artikulasikan hasrat Anda untuk ${primaryDesire} dengan lebih jelas dan mendalam. Cari mentor yang memiliki hasrat serupa yang dapat membimbing Anda dalam mengembangkan dan mengekspresikan hasrat ini dengan cara yang bermakna. Langkah-langkah praktis yang dapat Anda ambil: (1) Refleksikan asal-usul dan perkembangan hasrat ini dalam hidup Anda, (2) Identifikasi nilai-nilai inti yang mendasari hasrat ini, (3) Pelajari bagaimana orang lain telah mengekspresikan hasrat serupa dalam pelayanan mereka, (4) Cari kesempatan kecil untuk mengekspresikan hasrat ini dalam tindakan nyata, dan (5) Kembangkan rencana jangka panjang untuk menumbuhkan hasrat ini. Pengembangan hasrat ini akan memberikan arah dan motivasi yang lebih kuat untuk pelayanan Anda, memungkinkan Anda untuk melayani dengan sukacita dan otentisitas yang lebih besar.`
    );
  }

  // Rekomendasi berdasarkan tipe kepribadian yang lebih komprehensif
  if (mbtiType.includes("I")) {
    developmentRecommendations.push(
      `Optimalkan kekuatan tipe kepribadian ${mbtiType} Anda sambil mengembangkan area yang menantang dalam konteks pelayanan dan kehidupan rohani. Sebagai seorang introvert, Anda memiliki kemampuan alami untuk berpikir mendalam, menganalisis situasi secara menyeluruh, dan memberikan wawasan yang bermakna. Kecenderungan Anda untuk merefleksikan dan memproses informasi secara internal sebelum merespons memberikan kedalaman pada interaksi Anda dengan orang lain. Namun, dalam konteks pelayanan, kemampuan membangun jaringan dan berkolaborasi dengan orang lain juga penting untuk memperluas dampak pelayanan Anda. Baca buku dan sumber daya tentang tipe kepribadian Anda untuk memahami bagaimana introvert dapat berkontribusi secara unik dalam kepemimpinan dan pelayanan. Pelajari strategi dari pemimpin introvert yang efektif dan latih keterampilan membangun jaringan dalam kelompok kecil yang nyaman untuk mengimbangi kecenderungan introvert Anda tanpa mengorbankan keaslian Anda.

Langkah-langkah praktis yang dapat Anda ambil: (1) Jadwalkan waktu pemulihan yang cukup setelah interaksi sosial yang intens untuk mengisi ulang energi Anda dan mencegah kelelahan emosional, (2) Kembangkan strategi untuk berkontribusi dalam diskusi kelompok dengan cara yang sesuai dengan gaya Anda, seperti mempersiapkan pemikiran Anda sebelumnya atau meminta waktu untuk merenungkan sebelum memberikan tanggapan, (3) Latih keterampilan mendengarkan aktif dan bertanya yang efektif, yang merupakan kekuatan alami bagi banyak introvert dan dapat membuka pintu untuk percakapan yang lebih bermakna, (4) Mulai dengan membangun hubungan satu-per-satu sebelum bergabung dengan kelompok yang lebih besar, menciptakan jaringan dukungan yang solid yang dapat membantu Anda merasa lebih nyaman dalam situasi sosial yang lebih luas, dan (5) Gunakan kekuatan refleksi dan pemikiran mendalam Anda untuk memberikan wawasan berharga dalam percakapan, diskusi kelompok, dan pengajaran, menawarkan perspektif yang mungkin tidak terlihat oleh orang lain.

Pengembangan aspek kepribadian ini akan memungkinkan Anda untuk membangun jaringan yang diperlukan untuk pelayanan efektif sambil tetap menghormati kebutuhan intrinsik Anda akan refleksi dan kedalaman. Anda akan menemukan bahwa dengan menghargai kecenderungan introvert Anda sambil secara strategis mengembangkan keterampilan sosial, Anda dapat menciptakan pendekatan pelayanan yang otentik dan berkelanjutan yang memanfaatkan kekuatan unik Anda. Ingatlah bahwa Tuhan menciptakan Anda dengan sengaja sebagai seorang introvert, dan perspektif Anda sangat diperlukan dalam Tubuh Kristus yang membutuhkan keseimbangan antara tindakan dan refleksi, antara berbicara dan mendengarkan.`
    );
  } else if (mbtiType.includes("E")) {
    developmentRecommendations.push(
      `Manfaatkan energi ekstrovert tipe kepribadian ${mbtiType} Anda sambil mengembangkan dimensi reflektif yang lebih dalam untuk memperkaya pelayanan dan kehidupan rohani Anda. Sebagai seorang ekstrovert, Anda memiliki kemampuan alami untuk terhubung dengan orang lain, membangun jaringan dengan cepat, dan membawa energi positif ke dalam situasi kelompok. Kecenderungan Anda untuk berpikir sambil berbicara dan berinteraksi dengan dunia luar memungkinkan Anda untuk memobilisasi orang lain dan menciptakan momentum dalam inisiatif pelayanan. Namun, untuk pertumbuhan rohani yang seimbang dan pelayanan yang berkelanjutan, mengembangkan kehidupan batin yang kaya juga sangat penting. Baca buku dan sumber daya tentang tipe kepribadian Anda untuk memahami bagaimana ekstrovert dapat mengembangkan kedisiplinan spiritual yang bermakna. Pelajari dari pemimpin ekstrovert yang telah berhasil mengintegrasikan aktivitas dan refleksi dalam kehidupan mereka, dan kembangkan disiplin refleksi dan keheningan untuk memperdalam dimensi spiritual Anda.

Langkah-langkah praktis yang dapat Anda ambil: (1) Jadwalkan waktu hening yang teratur untuk refleksi dan doa pribadi, mungkin dimulai dengan periode yang lebih singkat dan secara bertahap memperpanjangnya seiring waktu untuk membangun toleransi terhadap keheningan, (2) Kembangkan praktik jurnal untuk memproses pemikiran dan pengalaman Anda, yang dapat membantu Anda memperlambat proses berpikir dan menggali lebih dalam ke dalam wawasan yang mungkin terlewatkan dalam interaksi sehari-hari, (3) Latih mendengarkan dengan penuh perhatian tanpa segera merespons, memberikan ruang bagi orang lain untuk berbagi dan bagi Anda untuk benar-benar menyerap apa yang mereka katakan sebelum merumuskan tanggapan Anda, (4) Cari mentor spiritual yang dapat membimbing Anda dalam praktik kontemplasi dan membantu Anda mengembangkan kedisiplinan spiritual yang sesuai dengan kepribadian Anda, dan (5) Temukan keseimbangan antara aktivitas sosial dan waktu untuk pembaruan batin, mungkin dengan mengintegrasikan kedua elemen ini melalui retret kelompok kecil atau diskusi spiritual yang bermakna dengan teman-teman dekat.

Pengembangan aspek kepribadian ini akan memperkaya pelayanan Anda dengan kedalaman spiritual dan kebijaksanaan yang muncul dari refleksi yang bermakna, sambil tetap memanfaatkan kekuatan alami Anda dalam membangun hubungan dan memobilisasi orang lain. Anda akan menemukan bahwa dengan menambahkan dimensi reflektif ke energi ekstrovert Anda, pesan dan kepemimpinan Anda akan memiliki dampak yang lebih besar dan lebih berkelanjutan. Ingatlah bahwa Tuhan menciptakan Anda dengan sengaja sebagai seorang ekstrovert, dan kemampuan Anda untuk terhubung dan memobilisasi orang lain adalah karunia berharga bagi Tubuh Kristus yang membutuhkan pemimpin yang dapat menginspirasi dan menggerakkan orang lain menuju visi bersama.`
    );
  } else {
    // Untuk kasus di mana tidak ada informasi I/E yang jelas
    developmentRecommendations.push(
      `Pelajari dan terapkan wawasan dari tipe kepribadian ${mbtiType} Anda untuk pengembangan pribadi dan pelayanan yang lebih efektif dalam konteks panggilan unik Anda. Memahami preferensi kognitif dan interaksi sosial Anda dapat memberikan wawasan berharga tentang bagaimana Anda memproses informasi, membuat keputusan, dan berinteraksi dengan orang lain. Tipe kepribadian bukanlah kotak yang membatasi, melainkan alat untuk memahami kecenderungan alami dan area potensial untuk pertumbuhan. Dengan memahami preferensi Anda dalam dimensi Sensing/Intuition (bagaimana Anda mengumpulkan informasi), Thinking/Feeling (bagaimana Anda membuat keputusan), dan Judging/Perceiving (bagaimana Anda berinteraksi dengan dunia luar), Anda dapat mengidentifikasi strategi yang efektif untuk pertumbuhan pribadi dan pelayanan. Baca buku dan sumber daya tentang tipe kepribadian Anda dan identifikasi strategi spesifik untuk mengoptimalkan kekuatan dan mengatasi tantangan tipe Anda dalam konteks pelayanan Kristen.

Langkah-langkah praktis yang dapat Anda ambil: (1) Lakukan asesmen kepribadian yang lebih mendalam untuk memahami nuansa tipe Anda, termasuk bagaimana fungsi kognitif Anda berinteraksi dan berkembang seiring waktu, (2) Identifikasi situasi di mana preferensi kepribadian Anda mungkin membantu atau menghambat efektivitas Anda dalam pelayanan, dan kembangkan kesadaran tentang kapan Anda perlu beradaptasi atau memanfaatkan kekuatan alami Anda, (3) Kembangkan strategi untuk beradaptasi dalam situasi yang menantang preferensi alami Anda, seperti teknik khusus untuk mengelola energi, memproses informasi, atau berinteraksi dengan orang yang memiliki gaya yang sangat berbeda, (4) Cari peran dan tanggung jawab dalam pelayanan yang sesuai dengan kekuatan kepribadian Anda, memungkinkan Anda untuk berkontribusi dengan cara yang paling otentik dan efektif, dan (5) Bangun tim dengan tipe kepribadian yang beragam untuk melengkapi kekuatan dan kelemahan Anda, menciptakan sinergi yang memanfaatkan berbagai perspektif dan pendekatan.

Pengembangan aspek kepribadian ini akan memungkinkan Anda untuk melayani dengan otentisitas yang lebih besar dan efektivitas yang ditingkatkan, sambil terus bertumbuh dalam fleksibilitas dan adaptabilitas. Anda akan menemukan bahwa dengan menghargai desain unik Anda sambil secara strategis mengembangkan area yang menantang, Anda dapat mencapai keseimbangan yang sehat antara memanfaatkan kekuatan alami dan memperluas kapasitas Anda. Ingatlah bahwa keragaman kepribadian dalam Tubuh Kristus adalah bagian dari rencana Tuhan, memungkinkan komunitas iman untuk berfungsi dengan berbagai karunia, perspektif, dan pendekatan yang saling melengkapi.`
    );
  }

  // Rekomendasi berdasarkan kemampuan
  const abilityProject = primaryAbility.toLowerCase().includes("analitis")
    ? "menganalisis kebutuhan pelayanan di komunitas Anda dan mengembangkan solusi berbasis data"
    : primaryAbility.toLowerCase().includes("kreatif")
    ? "merancang materi pengajaran inovatif yang menggabungkan berbagai media dan pendekatan"
    : primaryAbility.toLowerCase().includes("interpersonal")
    ? "mengembangkan program mentoring yang memanfaatkan keterampilan hubungan Anda"
    : primaryAbility.toLowerCase().includes("verbal")
    ? "menciptakan konten komunikasi yang efektif untuk berbagai platform dan audiens"
    : "proyek yang sesuai dengan kemampuan spesifik Anda";

  developmentRecommendations.push(
    `Tingkatkan kemampuan ${primaryAbility} Anda melalui latihan yang terstruktur dan penerapan praktis dalam konteks pelayanan. Latih kemampuan ini melalui proyek praktis yang menantang, seperti ${abilityProject}. Langkah-langkah praktis yang dapat Anda ambil: (1) Identifikasi aspek spesifik dari kemampuan ini yang ingin Anda kembangkan lebih lanjut, (2) Cari pelatihan atau kursus yang berfokus pada pengembangan keterampilan tersebut, (3) Temukan mentor yang mahir dalam kemampuan ini, (4) Tetapkan tujuan pengembangan yang spesifik dan terukur, dan (5) Cari kesempatan untuk menerapkan kemampuan ini dalam konteks yang berbeda untuk meningkatkan fleksibilitas dan adaptabilitas Anda. Pengembangan kemampuan ini akan meningkatkan efektivitas Anda dalam berbagai konteks pelayanan dan memungkinkan Anda untuk memberikan kontribusi unik berdasarkan bakat yang Tuhan berikan kepada Anda.`
  );

  // Rekomendasi berdasarkan pengalaman
  developmentRecommendations.push(
    `Manfaatkan kekayaan pengalaman hidup Anda sebagai sumber kebijaksanaan dan kredibilitas dalam pelayanan Anda. Jadwalkan waktu secara teratur untuk merefleksikan pengalaman hidup Anda, mencatat pelajaran yang dipetik, dan mengidentifikasi cara spesifik untuk membagikan kebijaksanaan ini dengan orang lain. Langkah-langkah praktis yang dapat Anda ambil: (1) Buat jurnal refleksi untuk mendokumentasikan perjalanan dan pelajaran hidup Anda, (2) Identifikasi tema dan pola dalam pengalaman Anda yang mungkin bermanfaat bagi orang lain, (3) Kembangkan kemampuan untuk membagikan cerita Anda dengan cara yang otentik dan berdampak, (4) Cari kesempatan untuk mentoring di mana Anda dapat membagikan kebijaksanaan dari pengalaman Anda, dan (5) Gunakan pengalaman Anda sebagai lensa untuk menginterpretasikan dan menerapkan kebenaran alkitabiah dalam konteks kontemporer. Pengembangan aspek ini akan memperkaya pelayanan Anda dengan otentisitas, relevansi, dan kebijaksanaan praktis yang berakar dalam pengalaman nyata, memungkinkan Anda untuk terhubung dengan orang lain pada tingkat yang lebih dalam dan bermakna.`
  );

  // Identifikasi sinergi SHAPE dengan lebih spesifik dan terintegrasi
  const shapeSynergy = [];

  // Sinergi Spiritual Gifts + Heart Desire
  if (
    primaryGift.toLowerCase().includes("mengajar") &&
    primaryDesire.toLowerCase().includes("pendidikan")
  ) {
    shapeSynergy.push(
      `Karunia ${primaryGift} Anda bersinergi sempurna dengan hasrat Anda untuk ${primaryDesire}, memungkinkan Anda untuk mentransfer pengetahuan dengan cara yang menginspirasi dan transformatif.`
    );
  } else if (
    primaryGift.toLowerCase().includes("melayani") &&
    primaryDesire.toLowerCase().includes("keadilan")
  ) {
    shapeSynergy.push(
      `Karunia ${primaryGift} Anda diperkuat oleh hasrat Anda untuk ${primaryDesire}, memungkinkan Anda untuk melayani dengan fokus pada kesetaraan dan keadilan sosial.`
    );
  } else {
    shapeSynergy.push(
      `Karunia ${primaryGift} Anda bekerja harmonis dengan hasrat Anda untuk ${primaryDesire}, menciptakan fondasi kuat untuk pelayanan yang bermakna dan berkelanjutan.`
    );
  }

  // Sinergi Personality + Spiritual Gifts
  if (mbtiType.includes("N") && primaryGift.toLowerCase().includes("nubuat")) {
    shapeSynergy.push(
      `Tipe kepribadian ${mbtiType} Anda yang intuitif sangat mendukung karunia ${primaryGift}, memungkinkan Anda untuk melihat pola dan implikasi yang mungkin tidak terlihat oleh orang lain.`
    );
  } else if (
    mbtiType.includes("F") &&
    primaryGift.toLowerCase().includes("belas kasihan")
  ) {
    shapeSynergy.push(
      `Tipe kepribadian ${mbtiType} Anda yang berorientasi pada perasaan memperkuat karunia ${primaryGift}, memungkinkan Anda untuk terhubung secara emosional dengan mereka yang Anda layani.`
    );
  } else if (
    mbtiType.includes("T") &&
    primaryGift.toLowerCase().includes("pengetahuan")
  ) {
    shapeSynergy.push(
      `Tipe kepribadian ${mbtiType} Anda yang analitis sangat melengkapi karunia ${primaryGift}, memungkinkan Anda untuk meneliti dan mengkomunikasikan kebenaran dengan kejelasan dan presisi.`
    );
  } else {
    shapeSynergy.push(
      `Tipe kepribadian ${mbtiType} Anda memberikan keunikan pada bagaimana Anda mengekspresikan karunia ${primaryGift}, menciptakan pendekatan yang otentik dan efektif.`
    );
  }

  // Sinergi Abilities + Spiritual Gifts
  if (
    primaryAbility.toLowerCase().includes("analitis") &&
    primaryGift.toLowerCase().includes("pengetahuan")
  ) {
    shapeSynergy.push(
      `Kemampuan ${primaryAbility} Anda sangat memperkuat karunia ${primaryGift}, memungkinkan Anda untuk menggali kebenaran dengan kedalaman dan ketelitian yang luar biasa.`
    );
  } else if (
    primaryAbility.toLowerCase().includes("kreatif") &&
    primaryGift.toLowerCase().includes("mengajar")
  ) {
    shapeSynergy.push(
      `Kemampuan ${primaryAbility} Anda memperkaya karunia ${primaryGift}, memungkinkan Anda untuk menyampaikan kebenaran dengan cara yang inovatif dan mudah diingat.`
    );
  } else {
    shapeSynergy.push(
      `Kemampuan ${primaryAbility} Anda memperkuat efektivitas karunia ${primaryGift}, menciptakan kombinasi unik yang meningkatkan dampak pelayanan Anda.`
    );
  }

  // Sinergi Experiences + Heart Desire
  shapeSynergy.push(
    `Pengalaman hidup Anda memberikan kredibilitas dan kedalaman pada hasrat Anda untuk ${primaryDesire}, memungkinkan Anda untuk terhubung dengan orang lain melalui pemahaman yang diperoleh dari pengalaman nyata.`
  );

  // Identifikasi peran komunitas
  const communityRoles = [
    `${
      topSpiritualGifts[0].includes("Mengajar") ? "Pengajar atau mentor" : ""
    }`,
    `${
      topSpiritualGifts[0].includes("Melayani") ? "Pelayan di balik layar" : ""
    }`,
    `${
      topSpiritualGifts[0].includes("Memimpin")
        ? "Pemimpin tim atau kelompok"
        : ""
    }`,
    `${
      topSpiritualGifts[0].includes("Nubuat") ? "Pembicara atau penasihat" : ""
    }`,
    `${
      topSpiritualGifts[0].includes("Memberi")
        ? "Pendukung atau penyedia sumber daya"
        : ""
    }`,
    `${mbtiType.includes("E") ? "Fasilitator hubungan" : "Pemikir mendalam"}`,
    `${mbtiType.includes("S") ? "Pelaksana praktis" : "Pemikir visioner"}`,
    `${
      mbtiType.includes("T")
        ? "Analis atau pemecah masalah"
        : "Pendukung atau penengah"
    }`,
    `${
      mbtiType.includes("J")
        ? "Pengorganisir atau perencana"
        : "Adaptor atau inovator"
    }`,
  ].filter((role) => role !== "");

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
