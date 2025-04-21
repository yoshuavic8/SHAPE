import { MBTIAnalysis } from './mbti-analysis-data';

// Analisis MBTI untuk ESFJ (The Consul)
const esfj: MBTIAnalysis = {
  type: "ESFJ",
  title: "The Consul",
  description: {
    general: "Kooperatif, hangat, terorganisir, dan berorientasi pada hubungan.",
    coreValues: "Harmoni, tradisi, dan pelayanan kepada orang lain.",
    slogan: "Saya ada untuk melayani dan memastikan kebutuhan semua orang terpenuhi.",
  },
  strengths: {
    dominantAbilities: [
      {
        title: "Membangun Komunitas",
        description: "Kemampuan menciptakan lingkungan yang hangat dan inklusif.",
        examples: "Mengkoordinasi kelompok kecil, mengorganisir acara komunitas, menyambut anggota baru.",
      },
      {
        title: "Perhatian pada Detail Praktis",
        description: "Mampu mengatur logistik dan detail untuk memastikan semua berjalan lancar.",
        examples: "Mengkoordinasi acara gereja, mengelola kebutuhan praktis jemaat, mengatur pelayanan.",
      },
      {
        title: "Dukungan Interpersonal",
        description: "Memberikan dukungan emosional dan praktis kepada orang lain.",
        examples: "Mengunjungi yang sakit, menyediakan makanan untuk keluarga yang berduka, mentoring.",
      },
    ],
    technicalSkills: [
      "Koordinasi acara", 
      "Manajemen hubungan", 
      "Pelayanan pelanggan", 
      "Administrasi"
    ],
    learningStyle: "Belajar melalui interaksi sosial, contoh praktis, dan aplikasi langsung.",
  },
  weaknesses: [
    {
      title: "Terlalu Bergantung pada Penerimaan",
      description: "Bisa terlalu khawatir tentang pendapat orang lain atau takut konflik.",
    },
    {
      title: "Kesulitan dengan Perubahan",
      description: "Kadang sulit beradaptasi dengan perubahan mendadak atau ide-ide non-tradisional.",
    },
    {
      title: "Terlalu Berkorban",
      description: "Bisa mengabaikan kebutuhan sendiri demi memenuhi kebutuhan orang lain.",
    },
  ],
  recommendations: {
    ministry: [
      "Koordinator pelayanan sosial", 
      "Pemimpin kelompok kecil", 
      "Tim penyambutan"
    ],
    specificExamples: [
      "Mengorganisir program bantuan untuk keluarga yang membutuhkan",
      "Mengkoordinasi acara-acara komunitas gereja"
    ],
    career: [
      "Pekerja sosial", 
      "Guru", 
      "Perawat", 
      "Manajer kantor"
    ],
  },
  developmentTips: [
    {
      title: "Tetapkan Batasan Sehat",
      description: "Belajar mengatakan 'tidak' dan memprioritaskan self-care.",
    },
    {
      title: "Terima Perubahan",
      description: "Latih fleksibilitas dan keterbukaan terhadap pendekatan baru.",
    },
    {
      title: "Hadapi Konflik",
      description: "Kembangkan keterampilan untuk menangani ketidaksetujuan dengan cara yang konstruktif.",
    },
  ],
  shapeIntegration: {
    spiritualGifts: "Karunia pelayanan + kepribadian ESFJ → Koordinasi pelayanan sosial yang efektif.",
    heartDesire: "Passion untuk komunitas → Membangun lingkungan gereja yang hangat dan inklusif.",
    abilities: "Kemampuan organisasi + ESFJ → Mengkoordinasi acara-acara gereja yang sukses.",
    experiences: "Pengalaman merawat orang lain → Membimbing program pelayanan untuk keluarga yang membutuhkan.",
  },
};

// Analisis MBTI untuk ISFJ (The Defender)
const isfj: MBTIAnalysis = {
  type: "ISFJ",
  title: "The Defender",
  description: {
    general: "Pelindung, loyal, peduli pada detail, dan bertanggung jawab.",
    coreValues: "Keandalan, tradisi, dan melayani dengan kesetiaan.",
    slogan: "Saya akan selalu ada untuk Anda, dengan cara yang dapat diandalkan dan konsisten.",
  },
  strengths: {
    dominantAbilities: [
      {
        title: "Perhatian pada Detail",
        description: "Kemampuan memperhatikan dan mengingat detail penting tentang orang dan situasi.",
        examples: "Mengelola database jemaat, mengingat kebutuhan khusus anggota, administrasi yang teliti.",
      },
      {
        title: "Pelayanan yang Konsisten",
        description: "Memberikan dukungan yang dapat diandalkan dan konsisten dari waktu ke waktu.",
        examples: "Pelayanan jangka panjang, pendampingan pastoral, pemeliharaan fasilitas.",
      },
      {
        title: "Kepedulian Praktis",
        description: "Mengidentifikasi dan memenuhi kebutuhan praktis orang lain.",
        examples: "Menyediakan makanan, mengunjungi yang sakit, membantu dengan kebutuhan sehari-hari.",
      },
    ],
    technicalSkills: [
      "Administrasi", 
      "Perawatan", 
      "Manajemen rumah tangga", 
      "Dokumentasi"
    ],
    learningStyle: "Belajar melalui instruksi langkah demi langkah, pengalaman praktis, dan pengulangan.",
  },
  weaknesses: [
    {
      title: "Kesulitan Mengatakan Tidak",
      description: "Bisa terlalu berkorban dan mengambil terlalu banyak tanggung jawab.",
    },
    {
      title: "Resistensi terhadap Perubahan",
      description: "Kadang terlalu melekat pada cara tradisional dan sulit menerima pendekatan baru.",
    },
    {
      title: "Terlalu Kritis pada Diri Sendiri",
      description: "Bisa terlalu keras pada diri sendiri ketika membuat kesalahan.",
    },
  ],
  recommendations: {
    ministry: [
      "Administrator gereja", 
      "Pelayanan kunjungan", 
      "Pemeliharaan fasilitas"
    ],
    specificExamples: [
      "Mengelola program bantuan makanan",
      "Mengkoordinasi pelayanan untuk lansia atau yang sakit"
    ],
    career: [
      "Perawat", 
      "Administrator", 
      "Akuntan", 
      "Guru sekolah dasar"
    ],
  },
  developmentTips: [
    {
      title: "Tetapkan Batasan",
      description: "Belajar mengatakan 'tidak' dan mendelegasikan tanggung jawab.",
    },
    {
      title: "Terima Perubahan",
      description: "Cobalah pendekatan baru dan lihat nilai dalam inovasi.",
    },
    {
      title: "Praktikkan Self-Compassion",
      description: "Perlakukan diri sendiri dengan kelembutan yang sama seperti Anda memperlakukan orang lain.",
    },
  ],
  shapeIntegration: {
    spiritualGifts: "Karunia pelayanan + kepribadian ISFJ → Pelayanan jangka panjang yang konsisten dan dapat diandalkan.",
    heartDesire: "Passion untuk membantu → Mengidentifikasi dan memenuhi kebutuhan praktis dalam komunitas.",
    abilities: "Kemampuan administratif + ISFJ → Mengelola program pelayanan dengan efisien dan teliti.",
    experiences: "Pengalaman merawat orang lain → Membimbing program pelayanan untuk yang membutuhkan.",
  },
};

// Analisis MBTI untuk ESFP (The Entertainer)
const esfp: MBTIAnalysis = {
  type: "ESFP",
  title: "The Entertainer",
  description: {
    general: "Spontan, energik, antusias, dan berorientasi pada pengalaman.",
    coreValues: "Kegembiraan, koneksi sosial, dan hidup di saat ini.",
    slogan: "Hidup terlalu singkat untuk tidak dinikmati dan dibagikan dengan orang lain.",
  },
  strengths: {
    dominantAbilities: [
      {
        title: "Membangun Antusiasme",
        description: "Kemampuan menciptakan energi positif dan semangat dalam kelompok.",
        examples: "Memimpin pujian yang energik, mengkoordinasi acara pemuda, memfasilitasi retreat yang menyenangkan.",
      },
      {
        title: "Adaptabilitas Sosial",
        description: "Mampu terhubung dengan berbagai orang dan menciptakan suasana yang ramah.",
        examples: "Menyambut pendatang baru, memfasilitasi perkenalan, mencairkan suasana.",
      },
      {
        title: "Kreativitas Praktis",
        description: "Menggunakan kreativitas untuk menyelesaikan masalah praktis dengan cara yang menyenangkan.",
        examples: "Merancang aktivitas interaktif, menciptakan dekorasi acara, mengembangkan program yang menarik.",
      },
    ],
    technicalSkills: [
      "Presentasi", 
      "Koordinasi acara", 
      "Seni pertunjukan", 
      "Fasilitasi kelompok"
    ],
    learningStyle: "Belajar melalui pengalaman langsung, aktivitas hands-on, dan interaksi sosial.",
  },
  weaknesses: [
    {
      title: "Kesulitan dengan Komitmen Jangka Panjang",
      description: "Bisa cepat bosan dengan rutinitas atau proyek yang membutuhkan fokus berkelanjutan.",
    },
    {
      title: "Kurang Perencanaan",
      description: "Kadang terlalu spontan dan kurang mempersiapkan detail penting.",
    },
    {
      title: "Menghindari Konflik",
      description: "Bisa menghindari masalah sulit demi menjaga suasana tetap menyenangkan.",
    },
  ],
  recommendations: {
    ministry: [
      "Pemimpin pelayanan pemuda", 
      "Tim pujian", 
      "Koordinator acara khusus"
    ],
    specificExamples: [
      "Mengembangkan program outreach yang kreatif",
      "Memimpin kelompok drama atau seni untuk ibadah"
    ],
    career: [
      "Event planner", 
      "Sales", 
      "Guru seni", 
      "Pekerja hospitality"
    ],
  },
  developmentTips: [
    {
      title: "Kembangkan Disiplin",
      description: "Tetapkan rutinitas dan struktur untuk menyelesaikan proyek jangka panjang.",
    },
    {
      title: "Tingkatkan Perencanaan",
      description: "Luangkan waktu untuk merencanakan detail sebelum memulai proyek baru.",
    },
    {
      title: "Hadapi Masalah Sulit",
      description: "Belajar menghadapi konflik dan diskusi sulit dengan keberanian.",
    },
  ],
  shapeIntegration: {
    spiritualGifts: "Karunia penginjilan + kepribadian ESFP → Pendekatan yang menarik dan relasional untuk berbagi iman.",
    heartDesire: "Passion untuk kegembiraan → Menciptakan lingkungan gereja yang menyambut dan hidup.",
    abilities: "Kemampuan performatif + ESFP → Menggunakan drama atau musik untuk menyampaikan kebenaran spiritual.",
    experiences: "Pengalaman membangun hubungan → Menjangkau komunitas dengan cara yang otentik dan menarik.",
  },
};

// Analisis MBTI untuk ISFP (The Adventurer)
const isfp: MBTIAnalysis = {
  type: "ISFP",
  title: "The Adventurer",
  description: {
    general: "Artistik, sensitif, fleksibel, dan autentik.",
    coreValues: "Kebebasan, keindahan, dan ekspresi personal.",
    slogan: "Hidup adalah kanvas untuk mengekspresikan nilai-nilai terdalam saya.",
  },
  strengths: {
    dominantAbilities: [
      {
        title: "Kreativitas Estetis",
        description: "Kemampuan menciptakan keindahan dan makna melalui berbagai bentuk seni.",
        examples: "Desain visual untuk ibadah, fotografi, musik, dekorasi ruang ibadah.",
      },
      {
        title: "Empati yang Dalam",
        description: "Mampu merasakan dan merespons perasaan orang lain dengan tulus.",
        examples: "Pendampingan krisis, mendengarkan aktif, menciptakan lingkungan yang aman.",
      },
      {
        title: "Adaptabilitas",
        description: "Kemampuan menyesuaikan diri dengan situasi dan kebutuhan yang berubah.",
        examples: "Pelayanan lintas budaya, bekerja dengan berbagai kelompok umur, improvisasi.",
      },
    ],
    technicalSkills: [
      "Seni visual", 
      "Musik", 
      "Desain", 
      "Fotografi"
    ],
    learningStyle: "Belajar melalui pengalaman hands-on, eksplorasi kreatif, dan koneksi personal.",
  },
  weaknesses: [
    {
      title: "Kesulitan dengan Konfrontasi",
      description: "Bisa menghindari konflik atau situasi yang membutuhkan ketegasan.",
    },
    {
      title: "Kurang Terstruktur",
      description: "Kadang kesulitan dengan perencanaan jangka panjang atau tugas-tugas terstruktur.",
    },
    {
      title: "Terlalu Sensitif",
      description: "Bisa terlalu terpengaruh oleh kritik atau energi negatif.",
    },
  ],
  recommendations: {
    ministry: [
      "Tim kreatif worship", 
      "Pelayanan seni", 
      "Mentor one-on-one"
    ],
    specificExamples: [
      "Menciptakan instalasi seni untuk momen spiritual",
      "Mengembangkan retreat yang fokus pada ekspresi kreatif"
    ],
    career: [
      "Seniman", 
      "Desainer", 
      "Terapis seni", 
      "Pekerja sosial"
    ],
  },
  developmentTips: [
    {
      title: "Kembangkan Ketegasan",
      description: "Latih diri untuk mengekspresikan kebutuhan dan batasan dengan jelas.",
    },
    {
      title: "Tingkatkan Struktur",
      description: "Kembangkan sistem sederhana untuk mengelola proyek dan tanggung jawab.",
    },
    {
      title: "Jaga Keseimbangan Emosional",
      description: "Temukan cara sehat untuk memproses emosi dan menjaga energi.",
    },
  ],
  shapeIntegration: {
    spiritualGifts: "Karunia kreativitas + kepribadian ISFP → Menciptakan pengalaman ibadah yang mendalam melalui seni.",
    heartDesire: "Passion untuk keindahan → Menggunakan seni untuk mengekspresikan kebenaran spiritual.",
    abilities: "Kemampuan artistik + ISFP → Menciptakan karya yang membantu orang terhubung dengan Tuhan.",
    experiences: "Pengalaman perjuangan personal → Menggunakan seni untuk membantu orang lain menyembuhkan luka batin.",
  },
};

// Ekspor semua analisis MBTI
export const mbtiAnalysisData3 = {
  ESFJ: esfj,
  ISFJ: isfj,
  ESFP: esfp,
  ISFP: isfp,
};
