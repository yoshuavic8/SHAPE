import { MBTIAnalysis } from './mbti-analysis-data';

// Analisis MBTI untuk ESTP (The Entrepreneur)
const estp: MBTIAnalysis = {
  type: "ESTP",
  title: "The Entrepreneur",
  description: {
    general: "Energik, pragmatis, berorientasi pada aksi, dan adaptif.",
    coreValues: "Kebebasan, pengalaman langsung, dan hasil nyata.",
    slogan: "Jangan hanya bicara tentang itu, lakukan sekarang!",
  },
  strengths: {
    dominantAbilities: [
      {
        title: "Pemecahan Masalah Praktis",
        description: "Kemampuan menemukan solusi cepat dan efektif untuk masalah nyata.",
        examples: "Mengatasi krisis, memperbaiki fasilitas gereja, menyelesaikan masalah logistik.",
      },
      {
        title: "Negosiasi dan Persuasi",
        description: "Mampu meyakinkan orang lain dan mencapai kesepakatan yang menguntungkan.",
        examples: "Penggalangan dana, negosiasi kontrak, memobilisasi relawan.",
      },
      {
        title: "Adaptabilitas Cepat",
        description: "Kemampuan beradaptasi dengan perubahan situasi dan memanfaatkan peluang.",
        examples: "Menangani keadaan darurat, mengubah rencana dengan cepat, improvisasi.",
      },
    ],
    technicalSkills: [
      "Manajemen krisis", 
      "Negosiasi", 
      "Keterampilan teknis", 
      "Olahraga"
    ],
    learningStyle: "Belajar melalui pengalaman langsung, trial and error, dan aplikasi praktis.",
  },
  weaknesses: [
    {
      title: "Kurang Perencanaan Jangka Panjang",
      description: "Bisa terlalu fokus pada hasil jangka pendek dan kurang mempertimbangkan konsekuensi jangka panjang.",
    },
    {
      title: "Tidak Sabar",
      description: "Kadang frustrasi dengan proses yang lambat atau diskusi teoretis yang panjang.",
    },
    {
      title: "Mengambil Risiko Berlebihan",
      description: "Bisa terlalu berani mengambil risiko tanpa pertimbangan matang.",
    },
  ],
  recommendations: {
    ministry: [
      "Tim respons krisis", 
      "Koordinator proyek konstruksi", 
      "Pemimpin misi jangka pendek"
    ],
    specificExamples: [
      "Mengorganisir bantuan bencana",
      "Memimpin proyek perbaikan fasilitas gereja"
    ],
    career: [
      "Entrepreneur", 
      "Sales", 
      "Manajer proyek", 
      "Petugas penegak hukum"
    ],
  },
  developmentTips: [
    {
      title: "Kembangkan Visi Jangka Panjang",
      description: "Luangkan waktu untuk mempertimbangkan implikasi jangka panjang dari tindakan Anda.",
    },
    {
      title: "Praktikkan Kesabaran",
      description: "Belajar menghargai proses dan persiapan yang matang.",
    },
    {
      title: "Pertimbangkan Dampak Relasional",
      description: "Perhatikan bagaimana tindakan Anda mempengaruhi perasaan dan hubungan dengan orang lain.",
    },
  ],
  shapeIntegration: {
    spiritualGifts: "Karunia pertolongan + kepribadian ESTP → Respons cepat dan efektif dalam situasi krisis.",
    heartDesire: "Passion untuk aksi → Memimpin inisiatif pelayanan praktis di komunitas.",
    abilities: "Kemampuan teknis + ESTP → Membantu dengan perbaikan dan pemeliharaan fasilitas.",
    experiences: "Pengalaman mengatasi tantangan → Membimbing orang lain melalui situasi sulit dengan pendekatan praktis.",
  },
};

// Analisis MBTI untuk ISTP (The Virtuoso)
const istp: MBTIAnalysis = {
  type: "ISTP",
  title: "The Virtuoso",
  description: {
    general: "Pragmatis, logis, spontan, dan terampil secara teknis.",
    coreValues: "Efisiensi, kebebasan, dan penguasaan keterampilan.",
    slogan: "Saya akan menemukan cara untuk membuat ini berfungsi.",
  },
  strengths: {
    dominantAbilities: [
      {
        title: "Pemecahan Masalah Teknis",
        description: "Kemampuan mendiagnosis dan memperbaiki masalah teknis dengan efisien.",
        examples: "Memperbaiki peralatan audio/video gereja, mengatasi masalah teknis, pemeliharaan fasilitas.",
      },
      {
        title: "Analisis Logis",
        description: "Mampu menganalisis situasi secara objektif dan menemukan solusi praktis.",
        examples: "Evaluasi sistem, pemecahan masalah logistik, pengambilan keputusan berbasis data.",
      },
      {
        title: "Keterampilan Praktis",
        description: "Menguasai berbagai keterampilan teknis dan manual.",
        examples: "Konstruksi, perbaikan, operasi peralatan teknis, pembuatan alat peraga.",
      },
    ],
    technicalSkills: [
      "Mekanik", 
      "Elektronik", 
      "Komputer", 
      "Konstruksi"
    ],
    learningStyle: "Belajar melalui pengalaman hands-on, trial and error, dan pemahaman sistem.",
  },
  weaknesses: [
    {
      title: "Kesulitan Mengekspresikan Emosi",
      description: "Bisa tampak dingin atau tidak terhubung secara emosional.",
    },
    {
      title: "Kurang Komitmen Jangka Panjang",
      description: "Kadang sulit berkomitmen pada proyek atau hubungan jangka panjang.",
    },
    {
      title: "Terlalu Independen",
      description: "Bisa terlalu mandiri dan enggan meminta bantuan atau bekerja dalam tim.",
    },
  ],
  recommendations: {
    ministry: [
      "Tim teknis audiovisual", 
      "Pemeliharaan fasilitas", 
      "Koordinator transportasi"
    ],
    specificExamples: [
      "Mengelola sistem suara dan multimedia untuk ibadah",
      "Memimpin proyek renovasi atau perbaikan"
    ],
    career: [
      "Teknisi", 
      "Mekanik", 
      "Programmer", 
      "Insinyur"
    ],
  },
  developmentTips: [
    {
      title: "Kembangkan Kecerdasan Emosional",
      description: "Latih diri untuk mengenali dan mengekspresikan perasaan Anda dan orang lain.",
    },
    {
      title: "Bangun Komitmen",
      description: "Temukan nilai dalam keterlibatan jangka panjang dan pengembangan hubungan.",
    },
    {
      title: "Tingkatkan Kerja Tim",
      description: "Belajar menghargai kontribusi orang lain dan berbagi tanggung jawab.",
    },
  ],
  shapeIntegration: {
    spiritualGifts: "Karunia pertolongan + kepribadian ISTP → Pelayanan teknis yang efektif dan dapat diandalkan.",
    heartDesire: "Passion untuk pemecahan masalah → Mengatasi hambatan teknis dalam pelayanan.",
    abilities: "Kemampuan teknis + ISTP → Memastikan aspek teknis pelayanan berjalan lancar.",
    experiences: "Pengalaman mengatasi tantangan teknis → Melatih orang lain dalam keterampilan praktis.",
  },
};

// Analisis MBTI untuk INFJ (The Advocate)
const infj: MBTIAnalysis = {
  type: "INFJ",
  title: "The Advocate",
  description: {
    general: "Visioner, idealis, dan peka terhadap kebutuhan orang lain.",
    coreValues: "Integritas, pertumbuhan pribadi, dan makna mendalam.",
    slogan: "Saya melihat potensi dalam setiap orang dan bekerja untuk mewujudkannya.",
  },
  strengths: {
    dominantAbilities: [
      {
        title: "Wawasan Mendalam",
        description: "Kemampuan memahami motivasi dan dinamika manusia dengan mendalam.",
        examples: "Konseling, mentoring spiritual, memahami konflik interpersonal.",
      },
      {
        title: "Visi Transformatif",
        description: "Mampu membayangkan masa depan yang lebih baik dan menginspirasi perubahan.",
        examples: "Mengembangkan visi pelayanan, menulis renungan inspiratif, memimpin perubahan.",
      },
      {
        title: "Mendengarkan Empatik",
        description: "Kemampuan mendengarkan dengan penuh perhatian dan memahami kebutuhan tersembunyi.",
        examples: "Konseling krisis, pendampingan spiritual, mediasi konflik.",
      },
    ],
    technicalSkills: [
      "Penulisan reflektif", 
      "Konseling dasar", 
      "Fasilitasi kelompok", 
      "Pengembangan kurikulum"
    ],
    learningStyle: "Belajar melalui refleksi mendalam, koneksi konseptual, dan aplikasi yang bermakna.",
  },
  weaknesses: [
    {
      title: "Perfeksionis",
      description: "Bisa terlalu idealistis dan kecewa ketika realitas tidak sesuai harapan.",
    },
    {
      title: "Burnout",
      description: "Rentan terhadap kelelahan emosional karena terlalu berempati dan berkomitmen.",
    },
    {
      title: "Terlalu Privat",
      description: "Kadang sulit membuka diri dan berbagi kebutuhan pribadi.",
    },
  ],
  recommendations: {
    ministry: [
      "Konselor spiritual", 
      "Penulis renungan", 
      "Pemimpin retret"
    ],
    specificExamples: [
      "Mengembangkan program mentoring yang transformatif",
      "Menulis materi refleksi spiritual yang mendalam"
    ],
    career: [
      "Konselor", 
      "Penulis", 
      "Pendidik", 
      "Pekerja sosial"
    ],
  },
  developmentTips: [
    {
      title: "Tetapkan Batasan Realistis",
      description: "Terima ketidaksempurnaan dan fokus pada kemajuan bertahap.",
    },
    {
      title: "Praktikkan Self-Care",
      description: "Prioritaskan waktu untuk pemulihan dan pengisian ulang energi spiritual.",
    },
    {
      title: "Bagikan Kebutuhan Anda",
      description: "Belajar mengkomunikasikan kebutuhan dan batasan Anda dengan jelas.",
    },
  ],
  shapeIntegration: {
    spiritualGifts: "Karunia kebijaksanaan + kepribadian INFJ → Konseling spiritual yang mendalam dan transformatif.",
    heartDesire: "Passion untuk pertumbuhan → Membantu orang menemukan tujuan dan makna hidup mereka.",
    abilities: "Kemampuan menulis + INFJ → Menciptakan materi reflektif yang membantu orang tumbuh secara spiritual.",
    experiences: "Pengalaman perjuangan pribadi → Membimbing orang lain melalui transformasi spiritual mereka sendiri.",
  },
};

// Analisis MBTI untuk ENFP (The Campaigner)
const enfp: MBTIAnalysis = {
  type: "ENFP",
  title: "The Campaigner",
  description: {
    general: "Antusias, kreatif, sosial, dan penuh ide.",
    coreValues: "Autentisitas, koneksi manusia, dan kemungkinan baru.",
    slogan: "Hidup penuh kemungkinan yang menakjubkan untuk dieksplorasi bersama!",
  },
  strengths: {
    dominantAbilities: [
      {
        title: "Inspirasi dan Motivasi",
        description: "Kemampuan menginspirasi orang lain dengan antusiasme dan energi positif.",
        examples: "Memotivasi tim, berbagi visi dengan cara yang menarik, membangun semangat kelompok.",
      },
      {
        title: "Kreativitas Inovatif",
        description: "Mampu menghasilkan ide-ide segar dan pendekatan baru yang tidak konvensional.",
        examples: "Mengembangkan program outreach kreatif, merancang pengalaman ibadah yang unik.",
      },
      {
        title: "Membangun Koneksi",
        description: "Kemampuan menghubungkan orang dan ide dengan cara yang bermakna.",
        examples: "Memfasilitasi perkenalan, membangun jaringan, menghubungkan kelompok berbeda.",
      },
    ],
    technicalSkills: [
      "Public speaking", 
      "Storytelling", 
      "Fasilitasi kelompok", 
      "Pengembangan ide kreatif"
    ],
    learningStyle: "Belajar melalui diskusi interaktif, eksplorasi kreatif, dan koneksi dengan orang lain.",
  },
  weaknesses: [
    {
      title: "Kesulitan Menyelesaikan Proyek",
      description: "Bisa cepat teralihkan oleh ide baru sebelum menyelesaikan yang sebelumnya.",
    },
    {
      title: "Kurang Perhatian pada Detail",
      description: "Kadang mengabaikan detail penting karena terlalu fokus pada gambaran besar.",
    },
    {
      title: "Terlalu Menyenangkan Orang Lain",
      description: "Bisa terlalu khawatir tentang penerimaan dan menghindari konflik yang diperlukan.",
    },
  ],
  recommendations: {
    ministry: [
      "Pemimpin kelompok pemuda", 
      "Koordinator outreach kreatif", 
      "Fasilitator retret"
    ],
    specificExamples: [
      "Mengembangkan program mentoring yang inovatif",
      "Memimpin kelompok diskusi yang dinamis dan interaktif"
    ],
    career: [
      "Pelatih kehidupan", 
      "Pengembang program", 
      "Konsultan kreatif", 
      "Pendidik"
    ],
  },
  developmentTips: [
    {
      title: "Kembangkan Disiplin",
      description: "Tetapkan sistem untuk menyelesaikan proyek sebelum beralih ke ide baru.",
    },
    {
      title: "Perhatikan Detail",
      description: "Kembangkan rutinitas untuk memastikan detail penting tidak terlewatkan.",
    },
    {
      title: "Tetapkan Batasan Sehat",
      description: "Belajar mengatakan 'tidak' dan memprioritaskan komitmen yang paling penting.",
    },
  ],
  shapeIntegration: {
    spiritualGifts: "Karunia penginjilan + kepribadian ENFP → Pendekatan kreatif dan relasional untuk berbagi iman.",
    heartDesire: "Passion untuk koneksi → Menciptakan komunitas yang inklusif dan penuh semangat.",
    abilities: "Kemampuan komunikasi + ENFP → Menyampaikan kebenaran spiritual dengan cara yang menarik dan relevan.",
    experiences: "Pengalaman menemukan makna → Membantu orang lain menemukan tujuan dan passion mereka.",
  },
};

// Ekspor semua analisis MBTI
export const mbtiAnalysisData4 = {
  ESTP: estp,
  ISTP: istp,
  INFJ: infj,
  ENFP: enfp,
};
