// Questionnaire data for each SHAPE component

export interface Question {
  id: number;
  text: string;
  category: "spiritual" | "heart" | "abilities" | "personality" | "experiences";
  subcategory?: string;
  type?: "scale" | "open" | "multiple" | "binary";
  options?: string[] | Array<{ value: string; text: string }>;
}

export interface QuestionnaireSection {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

// Perbarui spiritualGiftsQuestions dengan pertanyaan baru
export const spiritualGiftsQuestions: Question[] = [
  // 1. Karunia Mengajar (Teaching)
  {
    id: 1,
    text: "Saya senang menjelaskan konsep Alkitab yang rumit dengan cara sederhana.",
    category: "spiritual",
    subcategory: "teaching",
    type: "scale",
  },
  {
    id: 2,
    text: "Orang sering meminta saya menjelaskan ayat atau doktrin Kristen.",
    category: "spiritual",
    subcategory: "teaching",
    type: "scale",
  },
  {
    id: 3,
    text: "Saya merasa bersemangat saat mempersiapkan materi pengajaran.",
    category: "spiritual",
    subcategory: "teaching",
    type: "scale",
  },
  {
    id: 4,
    text: "Saya menekankan kedalaman dan keakuratan ketika berbagi pengetahuan.",
    category: "spiritual",
    subcategory: "teaching",
    type: "scale",
  },

  // 2. Karunia Melayani (Serving)
  {
    id: 5,
    text: "Saya merasa puas saat membantu orang dalam tugas praktis (misalnya: logistik, administrasi).",
    category: "spiritual",
    subcategory: "serving",
    type: "scale",
  },
  {
    id: 6,
    text: "Saya lebih suka bekerja di belakang layar daripada menjadi pusat perhatian.",
    category: "spiritual",
    subcategory: "serving",
    type: "scale",
  },
  {
    id: 7,
    text: "Saya sering memperhatikan kebutuhan praktis orang lain dan ingin memenuhinya.",
    category: "spiritual",
    subcategory: "serving",
    type: "scale",
  },
  {
    id: 8,
    text: "Saya merasa lelah jika tidak bisa membantu secara langsung.",
    category: "spiritual",
    subcategory: "serving",
    type: "scale",
  },

  // 3. Karunia Memimpin (Leadership)
  {
    id: 9,
    text: "Saya bisa membagikan visi dan menginspirasi orang lain untuk mengikutinya.",
    category: "spiritual",
    subcategory: "leadership",
    type: "scale",
  },
  {
    id: 10,
    text: "Saya nyaman mengambil keputusan sulit untuk kebaikan bersama.",
    category: "spiritual",
    subcategory: "leadership",
    type: "scale",
  },
  {
    id: 11,
    text: "Orang sering memandang saya sebagai pemimpin alami dalam kelompok.",
    category: "spiritual",
    subcategory: "leadership",
    type: "scale",
  },
  {
    id: 12,
    text: "Saya ahli dalam mendelegasikan tugas sesuai keahlian orang.",
    category: "spiritual",
    subcategory: "leadership",
    type: "scale",
  },

  // 4. Karunia Nubuat (Prophecy)
  {
    id: 13,
    text: "Saya merasa terdorong untuk menyampaikan kebenaran dalam situasi sulit.",
    category: "spiritual",
    subcategory: "prophecy",
    type: "scale",
  },
  {
    id: 14,
    text: 'Saya sering mendapat "pencerahan" tentang kehendak Tuhan untuk suatu situasi.',
    category: "spiritual",
    subcategory: "prophecy",
    type: "scale",
  },
  {
    id: 15,
    text: "Orang lain mengatakan bahwa perkataan saya sering mengena seperti firman Tuhan.",
    category: "spiritual",
    subcategory: "prophecy",
    type: "scale",
  },
  {
    id: 16,
    text: "Saya tidak takut menegur ketidakadilan atau dosa yang saya lihat.",
    category: "spiritual",
    subcategory: "prophecy",
    type: "scale",
  },

  // 5. Karunia Memberi (Giving)
  {
    id: 17,
    text: "Saya dengan senang hati memberi lebih dari yang diharapkan.",
    category: "spiritual",
    subcategory: "giving",
    type: "scale",
  },
  {
    id: 18,
    text: "Saya percaya memberi adalah bentuk penyembahan kepada Tuhan.",
    category: "spiritual",
    subcategory: "giving",
    type: "scale",
  },
  {
    id: 19,
    text: "Saya aktif mencari kesempatan untuk mendanai pelayanan atau orang yang membutuhkan.",
    category: "spiritual",
    subcategory: "giving",
    type: "scale",
  },
  {
    id: 20,
    text: "Saya yakin Tuhan akan mencukupi kebutuhan saya sehingga saya bisa memberi.",
    category: "spiritual",
    subcategory: "giving",
    type: "scale",
  },

  // 6. Karunia Kemurahan (Mercy)
  {
    id: 21,
    text: "Saya mudah merasakan penderitaan orang lain dan ingin meringankannya.",
    category: "spiritual",
    subcategory: "mercy",
    type: "scale",
  },
  {
    id: 22,
    text: "Saya tertarik terlibat dalam pelayanan untuk kaum marginal (difabel, yatim piatu, dll).",
    category: "spiritual",
    subcategory: "mercy",
    type: "scale",
  },
  {
    id: 23,
    text: "Saya bisa mendengarkan orang yang sedang sedih tanpa buru-buru memberi solusi.",
    category: "spiritual",
    subcategory: "mercy",
    type: "scale",
  },
  {
    id: 24,
    text: "Saya sering memaafkan bahkan ketika orang lain tidak meminta maaf.",
    category: "spiritual",
    subcategory: "mercy",
    type: "scale",
  },

  // 7. Karunia Evangelisme (Evangelism)
  {
    id: 25,
    text: "Saya mudah menjalin hubungan dengan orang yang belum percaya.",
    category: "spiritual",
    subcategory: "evangelism",
    type: "scale",
  },
  {
    id: 26,
    text: "Saya merasa urgensi untuk membagikan Injil kepada non-Kristen.",
    category: "spiritual",
    subcategory: "evangelism",
    type: "scale",
  },
  {
    id: 27,
    text: "Saya menyesuaikan cara berbagi iman sesuai latar belakang orang.",
    category: "spiritual",
    subcategory: "evangelism",
    type: "scale",
  },
  {
    id: 28,
    text: "Saya bersukacita ketika melihat orang menerima Yesus.",
    category: "spiritual",
    subcategory: "evangelism",
    type: "scale",
  },

  // 8. Karunia Pengetahuan (Knowledge)
  {
    id: 29,
    text: "Saya suka meneliti dan membagikan fakta Alkitab yang mendalam.",
    category: "spiritual",
    subcategory: "knowledge",
    type: "scale",
  },
  {
    id: 30,
    text: "Saya ingat detail ayat dan konteks historisnya dengan baik.",
    category: "spiritual",
    subcategory: "knowledge",
    type: "scale",
  },
  {
    id: 31,
    text: "Saya senang menghubungkan bagian-bagian Alkitab untuk mengungkap kebenaran.",
    category: "spiritual",
    subcategory: "knowledge",
    type: "scale",
  },
  {
    id: 32,
    text: 'Orang sering menyebut saya "ensiklopedia Alkitab berjalan".',
    category: "spiritual",
    subcategory: "knowledge",
    type: "scale",
  },

  // 9. Karunia Hikmat (Wisdom)
  {
    id: 33,
    text: "Orang sering meminta nasihat saya untuk masalah kehidupan yang kompleks.",
    category: "spiritual",
    subcategory: "wisdom",
    type: "scale",
  },
  {
    id: 34,
    text: "Saya bisa melihat akar masalah dengan cepat.",
    category: "spiritual",
    subcategory: "wisdom",
    type: "scale",
  },
  {
    id: 35,
    text: "Saya membantu orang menerapkan prinsip Alkitab dalam situasi praktis.",
    category: "spiritual",
    subcategory: "wisdom",
    type: "scale",
  },
  {
    id: 36,
    text: "Saya lebih mengutamakan perspektif Tuhan daripada solusi duniawi.",
    category: "spiritual",
    subcategory: "wisdom",
    type: "scale",
  },

  // 10. Karunia Iman (Faith)
  {
    id: 37,
    text: "Saya percaya janji Tuhan bahkan dalam situasi yang mustahil.",
    category: "spiritual",
    subcategory: "faith",
    type: "scale",
  },
  {
    id: 38,
    text: "Saya mendorong orang lain untuk mengambil langkah iman.",
    category: "spiritual",
    subcategory: "faith",
    type: "scale",
  },
  {
    id: 39,
    text: "Saya tidak goyah dalam krisis karena yakin Tuhan berkuasa.",
    category: "spiritual",
    subcategory: "faith",
    type: "scale",
  },
  {
    id: 40,
    text: "Saya berdoa untuk mukjizat dengan keyakinan penuh.",
    category: "spiritual",
    subcategory: "faith",
    type: "scale",
  },

  // 11. Karunia Penyembuhan (Healing)
  {
    id: 41,
    text: "Saya berani berdoa untuk kesembuhan fisik/emosional.",
    category: "spiritual",
    subcategory: "healing",
    type: "scale",
  },
  {
    id: 42,
    text: "Saya percaya Tuhan memakai saya sebagai saluran kesembuhan.",
    category: "spiritual",
    subcategory: "healing",
    type: "scale",
  },
  {
    id: 43,
    text: "Saya merasa beban untuk melihat orang dipulihkan seutuhnya.",
    category: "spiritual",
    subcategory: "healing",
    type: "scale",
  },
  {
    id: 44,
    text: "Orang pernah sembuh setelah saya mendoakan mereka.",
    category: "spiritual",
    subcategory: "healing",
    type: "scale",
  },

  // 12. Karunia Membimbing (Shepherding)
  {
    id: 45,
    text: "Saya merasa bertanggung jawab untuk mendampingi pertumbuhan rohani orang.",
    category: "spiritual",
    subcategory: "shepherding",
    type: "scale",
  },
  {
    id: 46,
    text: "Saya rutin menanyakan kabar orang yang saya bimbing.",
    category: "spiritual",
    subcategory: "shepherding",
    type: "scale",
  },
  {
    id: 47,
    text: "Saya melindungi dan menasihati orang melalui tantangan hidup.",
    category: "spiritual",
    subcategory: "shepherding",
    type: "scale",
  },
  {
    id: 48,
    text: "Saya menikmati perjalanan panjang bersama orang, bukan hanya saat krisis.",
    category: "spiritual",
    subcategory: "shepherding",
    type: "scale",
  },

  // 13. Karunia Administrasi (Administration)
  {
    id: 49,
    text: "Saya ahli mengorganisir acara, sistem, atau alur kerja.",
    category: "spiritual",
    subcategory: "administration",
    type: "scale",
  },
  {
    id: 50,
    text: "Saya frustrasi jika proyek tidak terstruktur dengan jelas.",
    category: "spiritual",
    subcategory: "administration",
    type: "scale",
  },
  {
    id: 51,
    text: "Saya mampu mengatur detail logistik dengan efisien.",
    category: "spiritual",
    subcategory: "administration",
    type: "scale",
  },
  {
    id: 52,
    text: "Saya dapat mengkoordinasikan banyak tugas sekaligus dengan baik.",
    category: "spiritual",
    subcategory: "administration",
    type: "scale",
  },

  // 14. Karunia Bahasa Roh (Tongues)
  {
    id: 53,
    text: "Saya kadang berdoa dalam bahasa yang tidak saya pelajari secara alami.",
    category: "spiritual",
    subcategory: "tongues",
    type: "scale",
  },
  {
    id: 54,
    text: "Saya merasa lebih dekat dengan Tuhan saat berdoa dalam bahasa roh.",
    category: "spiritual",
    subcategory: "tongues",
    type: "scale",
  },
  {
    id: 55,
    text: "Saya percaya bahasa roh adalah karunia yang masih relevan saat ini.",
    category: "spiritual",
    subcategory: "tongues",
    type: "scale",
  },
  {
    id: 56,
    text: "Saya pernah mengalami momen di mana saya berbicara dalam bahasa yang tidak saya kenal.",
    category: "spiritual",
    subcategory: "tongues",
    type: "scale",
  },

  // 15. Karunia Menafsirkan Bahasa Roh (Interpretation)
  {
    id: 57,
    text: "Saya bisa memahami makna dari bahasa roh meski saya tidak mengerti bahasanya.",
    category: "spiritual",
    subcategory: "interpretation",
    type: "scale",
  },
  {
    id: 58,
    text: "Orang lain mengakui kemampuan saya menafsirkan pesan dalam bahasa roh.",
    category: "spiritual",
    subcategory: "interpretation",
    type: "scale",
  },
  {
    id: 59,
    text: "Saya sering mendapat pengertian tentang makna dari bahasa roh yang diucapkan.",
    category: "spiritual",
    subcategory: "interpretation",
    type: "scale",
  },
  {
    id: 60,
    text: "Saya bisa menjelaskan arti dari bahasa roh untuk membangun jemaat.",
    category: "spiritual",
    subcategory: "interpretation",
    type: "scale",
  },

  // 16. Karunia Membedakan Roh (Discernment)
  {
    id: 61,
    text: "Saya bisa membedakan apakah sesuatu berasal dari Tuhan, manusia, atau roh jahat.",
    category: "spiritual",
    subcategory: "discernment",
    type: "scale",
  },
  {
    id: 62,
    text: "Saya sering merasakan ketidakberesan spiritual dalam situasi atau pengajaran.",
    category: "spiritual",
    subcategory: "discernment",
    type: "scale",
  },
  {
    id: 63,
    text: "Orang mencari nasihat saya untuk menilai apakah suatu pengalaman spiritual asli.",
    category: "spiritual",
    subcategory: "discernment",
    type: "scale",
  },
  {
    id: 64,
    text: "Saya bisa mendeteksi motivasi tersembunyi di balik tindakan atau perkataan.",
    category: "spiritual",
    subcategory: "discernment",
    type: "scale",
  },
];

export const heartQuestions: Question[] = [
  // 1. Religion/Spirituality
  {
    id: 21,
    text: "Seberapa besar hasrat Anda untuk terlibat dalam pelayanan rohani atau kegiatan keagamaan?",
    category: "heart",
    subcategory: "religion",
    type: "scale",
  },
  {
    id: 22,
    text: "Seberapa penting bagi Anda untuk mempengaruhi orang lain dalam pertumbuhan rohani mereka?",
    category: "heart",
    subcategory: "religion",
    type: "scale",
  },
  {
    id: 23,
    text: "Pilih area pelayanan rohani yang paling menarik bagi Anda:",
    category: "heart",
    subcategory: "religion",
    type: "multiple",
    options: [
      "Pengajaran Alkitab",
      "Doa dan Penyembahan",
      "Pelayanan Pastoral",
      "Misi dan Penginjilan",
      "Pelayanan Anak/Remaja",
      "Konseling Rohani",
      "Pelayanan Media/Digital",
      "Kepemimpinan Gereja",
      "Pelayanan Sosial/Kemanusiaan",
      "Pelayanan Musik/Seni",
      "Pelayanan Kesehatan",
      "Pelayanan Pendidikan",
    ],
  },

  // 2. Family
  {
    id: 24,
    text: "Seberapa besar hasrat Anda untuk mempengaruhi dan memperkuat kehidupan keluarga?",
    category: "heart",
    subcategory: "family",
    type: "scale",
  },
  {
    id: 25,
    text: "Seberapa penting bagi Anda untuk terlibat dalam pelayanan yang berfokus pada keluarga?",
    category: "heart",
    subcategory: "family",
    type: "scale",
  },
  {
    id: 26,
    text: "Pilih area pelayanan keluarga yang paling menarik bagi Anda:",
    category: "heart",
    subcategory: "family",
    type: "multiple",
    options: [
      "Konseling Pernikahan",
      "Pendampingan Orang Tua",
      "Pelayanan Anak",
      "Pelayanan Remaja",
      "Pelayanan Lansia",
      "Pemulihan Keluarga",
      "Pendidikan Keluarga",
      "Keluarga dan Teknologi",
      "Keluarga dan Kesehatan Mental",
      "Keluarga dan Keuangan",
      "Keluarga dan Spiritualitas",
      "Keluarga dalam Krisis",
    ],
  },

  // 3. Education
  {
    id: 27,
    text: "Seberapa besar hasrat Anda untuk terlibat dalam dunia pendidikan?",
    category: "heart",
    subcategory: "education",
    type: "scale",
  },
  {
    id: 28,
    text: "Seberapa penting bagi Anda untuk mempengaruhi sistem pendidikan atau mengajar orang lain?",
    category: "heart",
    subcategory: "education",
    type: "scale",
  },
  {
    id: 29,
    text: "Pilih area pendidikan yang paling menarik bagi Anda:",
    category: "heart",
    subcategory: "education",
    type: "multiple",
    options: [
      "Pendidikan Anak Usia Dini",
      "Pendidikan Dasar/Menengah",
      "Pendidikan Tinggi",
      "Pendidikan Vokasi/Keterampilan",
      "Pendidikan Khusus/Inklusif",
      "Pengembangan Kurikulum",
      "Teknologi Pendidikan",
      "Pendidikan Karakter",
      "Pendidikan Agama",
      "Pendidikan Seni dan Budaya",
      "Pendidikan Kesehatan",
      "Pendidikan Lingkungan",
      "Kebijakan Pendidikan",
      "Penelitian Pendidikan",
    ],
  },

  // 4. Government
  {
    id: 30,
    text: "Seberapa besar hasrat Anda untuk terlibat dalam pemerintahan atau kebijakan publik?",
    category: "heart",
    subcategory: "government",
    type: "scale",
  },
  {
    id: 31,
    text: "Seberapa penting bagi Anda untuk mempengaruhi kebijakan atau sistem pemerintahan?",
    category: "heart",
    subcategory: "government",
    type: "scale",
  },
  {
    id: 32,
    text: "Pilih area pemerintahan yang paling menarik bagi Anda:",
    category: "heart",
    subcategory: "government",
    type: "multiple",
    options: [
      "Kebijakan Publik",
      "Hukum dan Keadilan",
      "Pelayanan Masyarakat",
      "Advokasi dan HAM",
      "Politik Lokal/Nasional",
      "Hubungan Internasional",
      "Pemerintahan Daerah",
      "Administrasi Publik",
      "Keamanan dan Pertahanan",
      "Kesejahteraan Sosial",
      "Pembangunan Ekonomi",
      "Lingkungan dan Keberlanjutan",
      "Kesehatan Masyarakat",
      "Pendidikan Publik",
      "Etika Pemerintahan",
    ],
  },

  // 5. Media
  {
    id: 33,
    text: "Seberapa besar hasrat Anda untuk terlibat dalam dunia media dan komunikasi?",
    category: "heart",
    subcategory: "media",
    type: "scale",
  },
  {
    id: 34,
    text: "Seberapa penting bagi Anda untuk mempengaruhi opini publik melalui media?",
    category: "heart",
    subcategory: "media",
    type: "scale",
  },
  {
    id: 35,
    text: "Pilih area media yang paling menarik bagi Anda:",
    category: "heart",
    subcategory: "media",
    type: "multiple",
    options: [
      "Jurnalisme",
      "Media Sosial",
      "Produksi Video/Film",
      "Penyiaran (Radio/TV)",
      "Penulisan/Penerbitan",
      "Media Digital",
      "Fotografi",
      "Podcast/Audio",
      "Desain Grafis",
      "Animasi",
      "Media Pendidikan",
      "Media Keagamaan",
      "Pemasaran Digital",
      "Analisis Media",
      "Etika Media",
      "Teknologi Media Baru",
    ],
  },

  // 6. Arts & Entertainment
  {
    id: 36,
    text: "Seberapa besar hasrat Anda untuk terlibat dalam dunia seni dan hiburan?",
    category: "heart",
    subcategory: "arts",
    type: "scale",
  },
  {
    id: 37,
    text: "Seberapa penting bagi Anda untuk mempengaruhi budaya melalui seni dan hiburan?",
    category: "heart",
    subcategory: "arts",
    type: "scale",
  },
  {
    id: 38,
    text: "Pilih area seni dan hiburan yang paling menarik bagi Anda:",
    category: "heart",
    subcategory: "arts",
    type: "multiple",
    options: [
      "Musik",
      "Seni Visual",
      "Teater/Drama",
      "Tari",
      "Film/Animasi",
      "Desain/Fotografi",
      "Seni Digital",
      "Fotografi Artistik",
      "Kerajinan Tangan",
      "Seni Kuliner",
      "Seni Pertunjukan",
      "Seni Instalasi",
      "Seni Tradisional",
      "Seni Kontemporer",
      "Seni Keagamaan",
      "Pendidikan Seni",
      "Terapi Seni",
    ],
  },

  // 7. Business/Economy
  {
    id: 39,
    text: "Seberapa besar hasrat Anda untuk terlibat dalam dunia bisnis dan ekonomi?",
    category: "heart",
    subcategory: "business",
    type: "scale",
  },
  {
    id: 40,
    text: "Seberapa penting bagi Anda untuk mempengaruhi dunia bisnis atau ekonomi?",
    category: "heart",
    subcategory: "business",
    type: "scale",
  },
  {
    id: 41,
    text: "Pilih area bisnis dan ekonomi yang paling menarik bagi Anda:",
    category: "heart",
    subcategory: "business",
    type: "multiple",
    options: [
      "Kewirausahaan",
      "Keuangan/Investasi",
      "Manajemen/Kepemimpinan",
      "Pemasaran/Penjualan",
      "Teknologi/Inovasi",
      "Bisnis Sosial/Berkelanjutan",
      "E-commerce/Bisnis Digital",
      "Konsultasi Bisnis",
      "Pengembangan Organisasi",
      "Ekonomi Kreatif",
      "Perdagangan Internasional",
      "Industri Manufaktur",
      "Retail/Ritel",
      "Agribisnis",
      "Properti/Real Estate",
      "Pariwisata/Hospitality",
      "Ekonomi Syariah",
    ],
  },

  // Pertanyaan Refleksi Terbuka
  {
    id: 42,
    text: "Dari 7 bidang di atas (Agama, Keluarga, Pendidikan, Pemerintahan, Media, Seni, Bisnis), bidang mana yang paling Anda rasakan sebagai panggilan hidup Anda? Jelaskan mengapa.",
    category: "heart",
    subcategory: "reflection",
    type: "open",
  },
  {
    id: 43,
    text: "Jika Anda memiliki sumber daya tak terbatas, perubahan apa yang ingin Anda buat dalam salah satu dari 7 bidang tersebut?",
    category: "heart",
    subcategory: "reflection",
    type: "open",
  },
];

// Kuesioner abilities diintegrasikan ke dalam personalityAbilitiesQuestions

export const personalityAbilitiesQuestions: Question[] = [
  // BAGIAN 1: MBTI ASSESSMENT
  // 1. Extraversion (E) vs. Introversion (I)
  {
    id: 46,
    text: "Saya cenderung mendapatkan energi dari:",
    category: "personality",
    subcategory: "ei",
    type: "binary",
    options: [
      {
        value: "e",
        text: "Berinteraksi dengan banyak orang dan lingkungan yang ramai (Ekstrovert)",
      },
      {
        value: "i",
        text: "Menghabiskan waktu sendiri atau dengan beberapa teman dekat (Introvert)",
      },
    ],
  },
  {
    id: 47,
    text: "Ketika menghadapi masalah, saya lebih suka:",
    category: "personality",
    subcategory: "ei",
    type: "binary",
    options: [
      {
        value: "e",
        text: "Mendiskusikannya dengan orang lain untuk mendapatkan ide dan umpan balik",
      },
      {
        value: "i",
        text: "Memikirkannya sendiri terlebih dahulu sebelum berbagi dengan orang lain",
      },
    ],
  },
  {
    id: 48,
    text: "Dalam situasi sosial, saya biasanya:",
    category: "personality",
    subcategory: "ei",
    type: "binary",
    options: [
      {
        value: "e",
        text: "Berbicara dengan banyak orang dan memulai percakapan dengan mudah",
      },
      {
        value: "i",
        text: "Berbicara dengan beberapa orang yang sudah saya kenal atau mengamati dari pinggir",
      },
    ],
  },

  // 2. Sensing (S) vs. Intuition (N)
  {
    id: 49,
    text: "Ketika belajar sesuatu yang baru, saya lebih suka:",
    category: "personality",
    subcategory: "sn",
    type: "binary",
    options: [
      {
        value: "s",
        text: "Informasi konkret dan contoh praktis yang dapat saya terapkan langsung",
      },
      {
        value: "n",
        text: "Konsep dan teori yang menjelaskan prinsip dasar dan kemungkinan pengembangannya",
      },
    ],
  },
  {
    id: 50,
    text: "Saat memecahkan masalah, saya lebih mengandalkan:",
    category: "personality",
    subcategory: "sn",
    type: "binary",
    options: [
      { value: "s", text: "Pengalaman dan fakta yang sudah terbukti" },
      {
        value: "n",
        text: "Intuisi dan kemampuan melihat pola atau kemungkinan baru",
      },
    ],
  },
  {
    id: 51,
    text: "Saya lebih tertarik pada:",
    category: "personality",
    subcategory: "sn",
    type: "binary",
    options: [
      { value: "s", text: "Realitas saat ini dan detail praktis" },
      { value: "n", text: "Kemungkinan masa depan dan gambaran besar" },
    ],
  },

  // 3. Thinking (T) vs. Feeling (F)
  {
    id: 52,
    text: "Ketika membuat keputusan penting, saya lebih mengandalkan:",
    category: "personality",
    subcategory: "tf",
    type: "binary",
    options: [
      { value: "t", text: "Logika, analisis, dan pertimbangan objektif" },
      {
        value: "f",
        text: "Nilai-nilai personal dan dampaknya terhadap orang lain",
      },
    ],
  },
  {
    id: 53,
    text: "Dalam situasi konflik, saya cenderung:",
    category: "personality",
    subcategory: "tf",
    type: "binary",
    options: [
      {
        value: "t",
        text: "Fokus pada menemukan solusi yang paling logis dan adil",
      },
      {
        value: "f",
        text: "Mempertimbangkan perasaan semua pihak dan mencari harmoni",
      },
    ],
  },
  {
    id: 54,
    text: "Saya lebih menghargai seseorang yang:",
    category: "personality",
    subcategory: "tf",
    type: "binary",
    options: [
      { value: "t", text: "Jujur dan langsung, meskipun kadang menyakitkan" },
      {
        value: "f",
        text: "Penuh perhatian dan suportif, meskipun kadang kurang tegas",
      },
    ],
  },

  // 4. Judging (J) vs. Perceiving (P)
  {
    id: 55,
    text: "Dalam menjalani kehidupan sehari-hari, saya lebih suka:",
    category: "personality",
    subcategory: "jp",
    type: "binary",
    options: [
      { value: "j", text: "Memiliki jadwal dan rencana yang terstruktur" },
      { value: "p", text: "Bersikap fleksibel dan beradaptasi sesuai situasi" },
    ],
  },
  {
    id: 56,
    text: "Saat mengerjakan proyek, saya cenderung:",
    category: "personality",
    subcategory: "jp",
    type: "binary",
    options: [
      { value: "j", text: "Menyelesaikannya jauh sebelum tenggat waktu" },
      { value: "p", text: "Bekerja dengan semangat menjelang tenggat waktu" },
    ],
  },
  {
    id: 57,
    text: "Saya merasa lebih nyaman ketika:",
    category: "personality",
    subcategory: "jp",
    type: "binary",
    options: [
      { value: "j", text: "Hal-hal sudah diputuskan dan terselesaikan" },
      { value: "p", text: "Pilihan tetap terbuka dan belum final" },
    ],
  },

  // Pertanyaan tambahan untuk E vs I
  {
    id: 58,
    text: "Dalam situasi baru, saya biasanya:",
    category: "personality",
    subcategory: "ei",
    type: "binary",
    options: [
      {
        value: "e",
        text: "Langsung berinteraksi dan mencari tahu dengan bertanya",
      },
      {
        value: "i",
        text: "Mengamati terlebih dahulu dan memproses informasi sendiri",
      },
    ],
  },
  {
    id: 59,
    text: "Saat akhir pekan, saya lebih memilih:",
    category: "personality",
    subcategory: "ei",
    type: "binary",
    options: [
      { value: "e", text: "Menghadiri acara sosial atau bertemu banyak orang" },
      {
        value: "i",
        text: "Menghabiskan waktu sendiri atau dengan beberapa teman dekat",
      },
    ],
  },
  {
    id: 60,
    text: "Saya mendapatkan ide terbaik saya ketika:",
    category: "personality",
    subcategory: "ei",
    type: "binary",
    options: [
      { value: "e", text: "Berdiskusi dan bertukar pikiran dengan orang lain" },
      { value: "i", text: "Merenung dan memikirkannya sendiri" },
    ],
  },

  // Pertanyaan tambahan untuk S vs N
  {
    id: 61,
    text: "Saat membaca, saya lebih tertarik pada:",
    category: "personality",
    subcategory: "sn",
    type: "binary",
    options: [
      { value: "s", text: "Deskripsi detail dan fakta spesifik" },
      { value: "n", text: "Tema, simbolisme, dan makna tersembunyi" },
    ],
  },
  {
    id: 62,
    text: "Saat menceritakan pengalaman, saya cenderung:",
    category: "personality",
    subcategory: "sn",
    type: "binary",
    options: [
      {
        value: "s",
        text: "Menjelaskan secara kronologis dengan detail spesifik",
      },
      {
        value: "n",
        text: "Fokus pada kesan umum dan hubungan dengan hal lain",
      },
    ],
  },
  {
    id: 63,
    text: "Saya lebih menghargai orang yang:",
    category: "personality",
    subcategory: "sn",
    type: "binary",
    options: [
      { value: "s", text: "Praktis dan realistis dalam pendekatan mereka" },
      { value: "n", text: "Inovatif dan visioner dalam pemikiran mereka" },
    ],
  },

  // Pertanyaan tambahan untuk T vs F
  {
    id: 64,
    text: "Saat memberikan umpan balik, saya cenderung:",
    category: "personality",
    subcategory: "tf",
    type: "binary",
    options: [
      { value: "t", text: "Jujur dan langsung, fokus pada perbaikan" },
      { value: "f", text: "Penuh perhatian dan suportif, menjaga perasaan" },
    ],
  },
  {
    id: 65,
    text: "Dalam diskusi, saya lebih menghargai:",
    category: "personality",
    subcategory: "tf",
    type: "binary",
    options: [
      { value: "t", text: "Argumen logis dan analisis objektif" },
      { value: "f", text: "Harmoni dan mempertimbangkan nilai-nilai personal" },
    ],
  },
  {
    id: 66,
    text: "Saat menghadapi ketidakadilan, reaksi pertama saya adalah:",
    category: "personality",
    subcategory: "tf",
    type: "binary",
    options: [
      { value: "t", text: "Menganalisis situasi dan mencari solusi rasional" },
      {
        value: "f",
        text: "Merasakan empati dan ingin membantu pihak yang dirugikan",
      },
    ],
  },

  // Pertanyaan tambahan untuk J vs P
  {
    id: 67,
    text: "Dalam hal pengambilan keputusan, saya lebih suka:",
    category: "personality",
    subcategory: "jp",
    type: "binary",
    options: [
      { value: "j", text: "Membuat keputusan cepat dan menyelesaikan masalah" },
      {
        value: "p",
        text: "Menunda keputusan untuk menjelajahi lebih banyak opsi",
      },
    ],
  },
  {
    id: 68,
    text: "Ruang kerja atau kamar saya biasanya:",
    category: "personality",
    subcategory: "jp",
    type: "binary",
    options: [
      { value: "j", text: "Terorganisir dengan baik dengan sistem yang jelas" },
      {
        value: "p",
        text: "Kreatif berantakan dengan barang-barang yang mudah diakses",
      },
    ],
  },
  {
    id: 69,
    text: "Saat merencanakan liburan, saya lebih suka:",
    category: "personality",
    subcategory: "jp",
    type: "binary",
    options: [
      {
        value: "j",
        text: "Memiliki itinerary terperinci dan reservasi yang pasti",
      },
      {
        value: "p",
        text: "Memiliki ide umum dan membiarkan banyak hal terjadi secara spontan",
      },
    ],
  },

  // Pertanyaan Terbuka untuk Refleksi
  {
    id: 70,
    text: "Ceritakan situasi di mana Anda merasa paling 'menjadi diri sendiri'.",
    category: "personality",
    subcategory: "reflection",
    type: "open",
  },
  {
    id: 71,
    text: "Apa kebiasaan atau sifat Anda yang sering dikomentari orang lain?",
    category: "personality",
    subcategory: "reflection",
    type: "open",
  },
  {
    id: 72,
    text: "Bagaimana Anda biasanya merespons tekanan atau konflik?",
    category: "personality",
    subcategory: "reflection",
    type: "open",
  },
  {
    id: 73,
    text: "Jika bisa mengubah satu hal tentang kepribadian Anda, apa itu?",
    category: "personality",
    subcategory: "reflection",
    type: "open",
  },

  // BAGIAN 2: ABILITIES ASSESSMENT (Pertanyaan Kunci)
  // Kemampuan Alami & Keterampilan Teknis
  {
    id: 74,
    text: "Bidang alami mana yang paling mendeskripsikan Anda?",
    category: "personality",
    subcategory: "natural_talent",
    type: "multiple",
    options: [
      "Analitis (memecahkan masalah, logika)",
      "Artistik (seni, desain, kreativitas)",
      "Kinestetik (olahraga, kerajinan tangan)",
      "Sosial (memimpin, berkomunikasi, empati)",
      "Linguistik (bahasa, menulis, berbicara)",
    ],
  },
  {
    id: 75,
    text: "Keterampilan apa yang paling sering dipuji orang lain?",
    category: "personality",
    subcategory: "technical_skills",
    type: "open",
  },
  {
    id: 76,
    text: "Seberapa mahir Anda dalam bidang berikut (pilih hingga 3):",
    category: "personality",
    subcategory: "technical_skills",
    type: "multiple",
    options: [
      "Teknologi (pemrograman, desain web)",
      "Seni (musik, desain, fotografi)",
      "Komunikasi (menulis, public speaking)",
      "Analisis (penelitian, pemecahan masalah)",
      "Interpersonal (konseling, mediasi)",
      "Organisasi (manajemen, administrasi)",
      "Kreativitas (inovasi, pemikiran lateral)",
    ],
  },

  // BAGIAN 3: VALIDASI MBTI-ABILITIES
  {
    id: 77,
    text: "Ceritakan pencapaian terbesar Anda yang melibatkan keterampilan atau bakat alami.",
    category: "personality",
    subcategory: "achievements",
    type: "open",
  },
  {
    id: 78,
    text: "Bidang apa yang ingin Anda pelajari atau kembangkan dalam 5 tahun ke depan?",
    category: "personality",
    subcategory: "development_potential",
    type: "multiple",
    options: [
      "Teknologi AI",
      "Kewirausahaan sosial",
      "Seni digital",
      "Konseling/Mentoring",
      "Pengembangan komunitas",
      "Kepemimpinan",
      "Penelitian/Analisis",
    ],
  },
  {
    id: 79,
    text: "Bagaimana Anda biasanya menyelesaikan masalah kompleks?",
    category: "personality",
    subcategory: "problem_solving",
    type: "multiple",
    options: [
      "Analisis logis dan sistematis",
      "Intuisi dan pemikiran kreatif",
      "Diskusi dan kolaborasi dengan orang lain",
      "Mencari pola dan koneksi",
      "Pendekatan praktis dan langsung",
    ],
  },
];

export const experiencesQuestions: Question[] = [
  {
    id: 74,
    text: "Ceritakan pengalaman paling berkesan dalam hidup Anda.",
    category: "experiences",
    subcategory: "formative",
    type: "open",
  },
  {
    id: 75,
    text: "Pilih pengalaman yang paling membentuk Anda:",
    category: "experiences",
    subcategory: "transformative",
    type: "multiple",
    options: [
      "Kehilangan orang tercinta",
      "Kesuksesan karir",
      "Kegagalan besar",
      "Perjalanan spiritual",
      "Pindah ke tempat baru",
      "Perubahan karir",
      "Pengalaman pelayanan",
      "Pendidikan formal",
      "Pernikahan/keluarga",
      "Tantangan kesehatan",
      "Momen pencerahan spiritual",
      "Pengalaman lintas budaya",
      "Menghadapi ketakutan",
      "Keputusan hidup sulit",
      "Pengalaman kepemimpinan",
      "Bimbingan mentor",
      "Pengalaman mengajar",
      "Ujian iman",
      "Pelayanan misi",
      "Pemulihan dari trauma",
      "Pencarian tujuan hidup",
      "Sukses setelah kegagalan",
      "Momen pertobatan",
      "Pengalaman komunitas",
      "Keajaiban/jawaban doa",
    ],
  },
  {
    id: 76,
    text: "Apa pelajaran terpenting yang Anda dapatkan dari pengalaman sulit?",
    category: "experiences",
    subcategory: "lessons",
    type: "open",
  },
  {
    id: 77,
    text: "Bagaimana pengalaman masa lalu Anda mempengaruhi tujuan hidup Anda saat ini?",
    category: "experiences",
    subcategory: "purpose",
    type: "open",
  },
  {
    id: 78,
    text: "Pengalaman pelayanan apa yang paling bermakna bagi Anda?",
    category: "experiences",
    subcategory: "ministry",
    type: "open",
  },
  {
    id: 79,
    text: "Bagaimana pengalaman pendidikan Anda membentuk siapa Anda sekarang?",
    category: "experiences",
    subcategory: "education",
    type: "open",
  },
  {
    id: 80,
    text: "Pengalaman kerja apa yang paling mengembangkan keterampilan Anda?",
    category: "experiences",
    subcategory: "work",
    type: "open",
  },
  {
    id: 81,
    text: "Bagaimana pengalaman dalam keluarga membentuk nilai-nilai Anda?",
    category: "experiences",
    subcategory: "family",
    type: "open",
  },
  {
    id: 82,
    text: "Pengalaman apa yang membuat Anda merasa paling dekat dengan Tuhan?",
    category: "experiences",
    subcategory: "spiritual",
    type: "open",
  },
  {
    id: 83,
    text: "Bagaimana Anda telah menggunakan pengalaman masa lalu untuk membantu orang lain?",
    category: "experiences",
    subcategory: "helping",
    type: "open",
  },
  // Pertanyaan tambahan untuk pengalaman traumatis
  {
    id: 84,
    text: "Bagaimana pengalaman traumatis dalam hidup Anda telah membentuk pandangan dan nilai Anda?",
    category: "experiences",
    subcategory: "trauma",
    type: "open",
  },
  // Pertanyaan tambahan untuk pengalaman lintas budaya
  {
    id: 85,
    text: "Ceritakan pengalaman lintas budaya yang mengubah perspektif Anda.",
    category: "experiences",
    subcategory: "crosscultural",
    type: "open",
  },
  // Pertanyaan tambahan untuk momen penting
  {
    id: 86,
    text: "Momen apa dalam hidup Anda yang mengubah arah hidup Anda secara signifikan?",
    category: "experiences",
    subcategory: "pivotal",
    type: "open",
  },
];

export const questionnaireSections: QuestionnaireSection[] = [
  {
    id: "spiritual",
    title: "Spiritual Gifts (Karunia Rohani)",
    description:
      "Temukan karunia rohani unik yang Tuhan berikan kepada Anda untuk melayani orang lain.",
    questions: spiritualGiftsQuestions,
  },
  {
    id: "heart",
    title: "Heart Desire (Keinginan Hati)",
    description:
      "Pahami apa yang menjadi passion Anda dan apa yang memotivasi Anda.",
    questions: heartQuestions,
  },
  {
    id: "personality",
    title: "Personality & Abilities (Kepribadian & Kemampuan)",
    description:
      "Pelajari tentang tipe kepribadian Anda, kemampuan alami, dan bagaimana keduanya saling melengkapi.",
    questions: personalityAbilitiesQuestions,
  },
  {
    id: "experiences",
    title: "Experiences (Pengalaman Hidup)",
    description:
      "Refleksikan peristiwa hidup yang membentuk karakter dan tujuan Anda.",
    questions: experiencesQuestions,
  },
];

// Gabungkan semua pertanyaan untuk digunakan di analyzer
export const questionnaire_data: Question[] = [
  ...spiritualGiftsQuestions,
  ...heartQuestions,
  ...personalityAbilitiesQuestions,
  ...experiencesQuestions,
];

// Perbarui questionnaireCategories.spiritual.subcategories
export const questionnaireCategories = {
  spiritual: {
    title: "Spiritual Gifts (Karunia Rohani)",
    subcategories: {
      teaching: "Mengajar (Teaching)",
      serving: "Melayani (Serving)",
      leadership: "Memimpin (Leadership)",
      prophecy: "Nubuat (Prophecy)",
      giving: "Memberi (Giving)",
      mercy: "Kemurahan (Mercy)",
      evangelism: "Evangelisme (Evangelism)",
      knowledge: "Pengetahuan (Knowledge)",
      wisdom: "Hikmat (Wisdom)",
      faith: "Iman (Faith)",
      healing: "Penyembuhan (Healing)",
      shepherding: "Membimbing (Shepherding)",
      administration: "Administrasi (Administration)",
      tongues: "Bahasa Roh (Tongues)",
      interpretation: "Menafsirkan Bahasa Roh (Interpretation)",
      discernment: "Membedakan Roh (Discernment)",
    },
  },
  heart: {
    title: "Heart Desire (Keinginan Hati)",
    subcategories: {
      religion: "Religion/Spirituality (Agama/Spiritualitas)",
      family: "Family (Keluarga)",
      education: "Education (Pendidikan)",
      government: "Government (Pemerintahan)",
      media: "Media (Media)",
      arts: "Arts & Entertainment (Seni & Hiburan)",
      business: "Business/Economy (Bisnis/Ekonomi)",
      reflection: "Reflection (Refleksi)",
    },
  },

  personality: {
    title: "Personality & Abilities (Kepribadian & Kemampuan)",
    subcategories: {
      // MBTI Dimensions
      introvert: "Introvert (I)",
      ekstrovert: "Ekstrovert (E)",
      judging: "Judging (J)",
      perceiving: "Perceiving (P)",
      thinking: "Thinking (T)",
      feeling: "Feeling (F)",
      sensing: "Sensing (S)",
      intuition: "Intuition (N)",
      reflection: "Refleksi Diri",
      // Abilities Categories
      natural_talent: "Bakat Alami",
      technical_skills: "Keterampilan Teknis",
      achievements: "Pencapaian",
      development_potential: "Potensi Pengembangan",
      problem_solving: "Pemecahan Masalah",
      // Specific Abilities
      menulis: "Menulis",
      "public speaking": "Public Speaking",
      seni: "Seni",
      musik: "Musik",
      organisasi: "Organisasi",
      analitis: "Analitis",
      teknologi: "Teknologi",
      interpersonal: "Interpersonal",
      kreativitas: "Kreativitas",
    },
  },
  experiences: {
    title: "Experiences (Pengalaman Hidup)",
    subcategories: {
      formative: "Pengalaman Formatif",
      transformative: "Pengalaman Transformatif",
      lessons: "Pelajaran Hidup",
      purpose: "Tujuan Hidup",
      ministry: "Pelayanan",
      education: "Pendidikan",
      work: "Pekerjaan",
      family: "Keluarga",
      spiritual: "Spiritual",
      helping: "Membantu Orang Lain",
      trauma: "Pengalaman Traumatis",
      crosscultural: "Pengalaman Lintas Budaya",
      pivotal: "Momen Penting",
    },
  },
};
