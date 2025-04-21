// Data analisis MBTI lengkap untuk semua 16 tipe kepribadian
// Terintegrasi dengan kemampuan (abilities) dan rekomendasi pelayanan

export interface MBTIAnalysis {
  type: string;
  title: string;
  description: {
    general: string;
    coreValues: string;
    slogan: string;
  };
  strengths: {
    dominantAbilities: {
      title: string;
      description: string;
      examples: string;
    }[];
    technicalSkills: string[];
    learningStyle: string;
  };
  weaknesses: {
    title: string;
    description: string;
  }[];
  recommendations: {
    ministry: string[];
    specificExamples: string[];
    career: string[];
  };
  developmentTips: {
    title: string;
    description: string;
  }[];
  shapeIntegration: {
    spiritualGifts: string;
    heartDesire: string;
    abilities: string;
    experiences: string;
  };
}

// Analisis MBTI untuk ENFJ (The Protagonist)
const enfj: MBTIAnalysis = {
  type: "ENFJ",
  title: "The Protagonist",
  description: {
    general: "Visioner, empatik, inspiratif, dan terorganisir.",
    coreValues: "Harmoni, pertumbuhan orang lain, dan tujuan yang bermakna.",
    slogan: "Saya ada untuk membantu Anda menemukan potensi terbaik Anda.",
  },
  strengths: {
    dominantAbilities: [
      {
        title: "Kepemimpinan Transformasional",
        description: "Mampu menginspirasi dan memotivasi kelompok dengan visi yang jelas.",
        examples: "Memimpin retret pemuda, mengkoordinasi proyek komunitas.",
      },
      {
        title: "Komunikasi Empatik",
        description: "Mendengarkan aktif dan merespons dengan kata-kata yang membangun.",
        examples: "Konseling, mediasi konflik, atau public speaking.",
      },
      {
        title: "Perencanaan Strategis",
        description: "Menyusun rencana terstruktur untuk mencapai tujuan sosial/spiritual.",
        examples: "Merancang program pengembangan gereja atau LSM.",
      },
    ],
    technicalSkills: [
      "Pelatihan pengembangan diri", 
      "Manajemen tim", 
      "Menulis inspiratif"
    ],
    learningStyle: "Lebih efektif melalui diskusi kelompok dan refleksi pribadi.",
  },
  weaknesses: [
    {
      title: "Terlalu Idealistis",
      description: "Bisa frustrasi jika realitas tidak sesuai harapan.",
    },
    {
      title: "Mengabaikan Diri Sendiri",
      description: "Terlalu fokus pada kebutuhan orang lain hingga lupa self-care.",
    },
    {
      title: "Menghindari Konflik",
      description: "Menghindari konflik untuk menjaga harmoni, meski perlu dihadapi.",
    },
  ],
  recommendations: {
    ministry: [
      "Pemimpin pemuridan", 
      "Koordinator acara gereja", 
      "Konselor keluarga"
    ],
    specificExamples: [
      "Membangun program mentoring untuk remaja",
      "Menjadi pembicara di seminar pengembangan karakter"
    ],
    career: [
      "HRD", 
      "Pelatih kehidupan (life coach)", 
      "Penulis buku motivasi"
    ],
  },
  developmentTips: [
    {
      title: "Belajar Delegasi",
      description: "Latih kepercayaan pada orang lain untuk menghindari burnout.",
    },
    {
      title: "Boundaries yang Sehat",
      description: "Jadwalkan waktu khusus untuk recharging (misalnya: retreat pribadi).",
    },
    {
      title: "Hadapi Konflik",
      description: "Ikuti kursus manajemen konflik atau baca buku 'Crucial Conversations'.",
    },
  ],
  shapeIntegration: {
    spiritualGifts: "Jika memiliki karunia mengajar atau memimpin, ENFJ cocok menjadi guru SM atau pemimpin kelompok sel.",
    heartDesire: "Passion di bidang pendidikan atau keadilan sosial → Kombinasikan dengan kemampuan komunikasi untuk kampanye edukasi.",
    abilities: "Skill public speaking + kepribadian ENFJ → Jadi host podcast rohani.",
    experiences: "Pengalaman pahit dalam hubungan → Dijadikan materi konseling untuk membantu orang lain.",
  },
};

// Analisis MBTI untuk ISTJ (The Logistician)
const istj: MBTIAnalysis = {
  type: "ISTJ",
  title: "The Logistician",
  description: {
    general: "Praktis, bertanggung jawab, detail-oriented, dan menghargai tradisi.",
    coreValues: "Keandalan, ketertiban, dan integritas.",
    slogan: "Jika ingin sesuatu dikerjakan dengan benar, saya siap melakukannya.",
  },
  strengths: {
    dominantAbilities: [
      {
        title: "Manajemen Administratif",
        description: "Kemampuan mengatur, mengklasifikasi, dan mengelola informasi dengan presisi.",
        examples: "Mengelola database anggota gereja, mengatur arsip, mengelola keuangan.",
      },
      {
        title: "Analisis Logis",
        description: "Mampu menganalisis situasi secara objektif dan membuat keputusan berdasarkan fakta.",
        examples: "Audit keuangan, evaluasi program, pemecahan masalah sistematis.",
      },
      {
        title: "Ketelitian dan Konsistensi",
        description: "Memperhatikan detail dan menjaga konsistensi dalam pekerjaan.",
        examples: "Memeriksa laporan, memastikan kepatuhan terhadap prosedur, menjaga kualitas.",
      },
    ],
    technicalSkills: [
      "Akuntansi", 
      "Manajemen proyek", 
      "Dokumentasi", 
      "Analisis data"
    ],
    learningStyle: "Belajar melalui instruksi yang jelas, langkah demi langkah, dan latihan praktis.",
  },
  weaknesses: [
    {
      title: "Kurang Fleksibel",
      description: "Kadang sulit beradaptasi dengan perubahan mendadak atau ide-ide baru.",
    },
    {
      title: "Terlalu Kritis",
      description: "Bisa terlalu fokus pada kesalahan dan kurang memberikan apresiasi.",
    },
    {
      title: "Kesulitan Mengekspresikan Emosi",
      description: "Cenderung menyimpan perasaan dan kurang ekspresif secara emosional.",
    },
  ],
  recommendations: {
    ministry: [
      "Bendahara gereja", 
      "Tim logistik acara", 
      "Administrator database jemaat"
    ],
    specificExamples: [
      "Mengelola inventaris dan aset gereja",
      "Mengembangkan sistem untuk pelacakan anggota dan kehadiran"
    ],
    career: [
      "Auditor", 
      "Arsiparis", 
      "Insinyur sipil", 
      "Manajer operasional"
    ],
  },
  developmentTips: [
    {
      title: "Latih Fleksibilitas",
      description: "Cobalah sesekali keluar dari rutinitas dan bereksperimen dengan pendekatan baru.",
    },
    {
      title: "Kembangkan Kecerdasan Emosional",
      description: "Luangkan waktu untuk mengenali dan mengekspresikan perasaan Anda.",
    },
    {
      title: "Apresiasi Perspektif Berbeda",
      description: "Dengarkan ide-ide inovatif dari orang lain meski terdengar tidak konvensional.",
    },
  ],
  shapeIntegration: {
    spiritualGifts: "Karunia administrasi + kepribadian ISTJ → Pengelolaan sumber daya gereja yang efektif.",
    heartDesire: "Passion untuk keteraturan → Menciptakan sistem yang membantu pelayanan berjalan lancar.",
    abilities: "Kemampuan analitis + ISTJ → Evaluasi program pelayanan untuk peningkatan efektivitas.",
    experiences: "Pengalaman di bidang keuangan → Menjadi mentor bagi jemaat dalam pengelolaan keuangan.",
  },
};

// Analisis MBTI untuk INFP (The Mediator)
const infp: MBTIAnalysis = {
  type: "INFP",
  title: "The Mediator",
  description: {
    general: "Idealistis, kreatif, peka, dan berkomitmen pada nilai-nilai pribadi.",
    coreValues: "Autentisitas, kedalaman hubungan, dan makna hidup.",
    slogan: "Saya percaya setiap orang memiliki cerita unik yang layak didengar.",
  },
  strengths: {
    dominantAbilities: [
      {
        title: "Kreativitas dan Imajinasi",
        description: "Mampu menghasilkan ide-ide orisinal dan melihat kemungkinan baru.",
        examples: "Menulis renungan, menciptakan karya seni untuk ibadah, merancang program kreatif.",
      },
      {
        title: "Empati Mendalam",
        description: "Kemampuan memahami perasaan dan perspektif orang lain dengan mendalam.",
        examples: "Konseling krisis, mendampingi yang berduka, membantu resolusi konflik.",
      },
      {
        title: "Komunikasi Autentik",
        description: "Berbagi pemikiran dan perasaan dengan jujur dan tulus.",
        examples: "Menulis blog reflektif, berbagi kesaksian personal, diskusi kelompok kecil.",
      },
    ],
    technicalSkills: [
      "Penulisan kreatif", 
      "Seni visual", 
      "Musik", 
      "Konseling dasar"
    ],
    learningStyle: "Belajar melalui refleksi pribadi, eksplorasi mandiri, dan koneksi emosional dengan materi.",
  },
  weaknesses: [
    {
      title: "Perfeksionis",
      description: "Standar tinggi yang kadang sulit dipenuhi, menyebabkan penundaan atau kekecewaan.",
    },
    {
      title: "Terlalu Sensitif",
      description: "Bisa terlalu terpengaruh oleh kritik atau konflik.",
    },
    {
      title: "Kesulitan dengan Detail Praktis",
      description: "Kadang mengabaikan hal-hal praktis karena terlalu fokus pada visi ideal.",
    },
  ],
  recommendations: {
    ministry: [
      "Penulis renungan", 
      "Tim kreatif worship", 
      "Mentor spiritual"
    ],
    specificExamples: [
      "Memimpin kelompok penulisan jurnal spiritual",
      "Menciptakan seni untuk ruang ibadah atau retreat"
    ],
    career: [
      "Konselor seni", 
      "Penulis", 
      "Desainer", 
      "Pekerja sosial"
    ],
  },
  developmentTips: [
    {
      title: "Tetapkan Batasan Realistis",
      description: "Belajar menerima 'cukup baik' daripada mengejar kesempurnaan.",
    },
    {
      title: "Kembangkan Keterampilan Praktis",
      description: "Latih manajemen waktu dan keterampilan organisasi untuk mewujudkan ide-ide kreatif.",
    },
    {
      title: "Jaga Keseimbangan",
      description: "Seimbangkan waktu untuk refleksi dengan tindakan konkret dan interaksi sosial.",
    },
  ],
  shapeIntegration: {
    spiritualGifts: "Karunia penghiburan + kepribadian INFP → Pelayanan pendampingan bagi yang berduka.",
    heartDesire: "Passion untuk seni → Menciptakan karya seni yang menyampaikan kebenaran spiritual.",
    abilities: "Kemampuan menulis + INFP → Menulis buku devosi yang mendalam dan reflektif.",
    experiences: "Pengalaman perjuangan pribadi → Berbagi dengan cara yang membantu orang lain menemukan harapan.",
  },
};

// Ekspor semua analisis MBTI
export const mbtiAnalysisData: Record<string, MBTIAnalysis> = {
  ENFJ: enfj,
  ISTJ: istj,
  INFP: infp,
  // Tipe lainnya akan ditambahkan di file terpisah
};
