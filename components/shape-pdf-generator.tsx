"use client"

import jsPDF from "jspdf"
import type { CategoryScore, ShapeRecommendations } from "@/lib/shape-analyzer-adapter"

interface ShapePDFGeneratorProps {
  userName: string
  spiritualGifts: CategoryScore[]
  heartDesire: CategoryScore[]
  personality: CategoryScore[]
  experiences: CategoryScore[]
  shapeCode: string
  recommendations: ShapeRecommendations
  completedDate: string
}

// Fungsi helper untuk mendapatkan penjelasan untuk spiritual gifts
const getGiftExplanation = (giftName: string): string => {
  const explanations: Record<string, string> = {
    "Administrasi": "Kemampuan untuk mengatur, mengelola, dan mengkoordinasikan sumber daya dan orang untuk mencapai tujuan pelayanan secara efektif.",
    "Kepemimpinan": "Kemampuan untuk memimpin, menginspirasi, dan memotivasi orang lain untuk mencapai visi bersama dalam pelayanan.",
    "Pengajaran": "Kemampuan untuk menjelaskan dan mengkomunikasikan kebenaran Alkitab dengan cara yang mudah dipahami dan diterapkan.",
    "Kebijaksanaan": "Kemampuan untuk menerapkan kebenaran spiritual pada situasi spesifik dengan wawasan yang mendalam.",
    "Pengetahuan": "Kemampuan untuk memahami, menganalisis, dan menjelaskan kebenaran Alkitab secara mendalam.",
    "Iman": "Kemampuan untuk percaya pada Tuhan dengan keyakinan luar biasa bahkan dalam situasi yang tampaknya mustahil.",
    "Penginjilan": "Kemampuan untuk membagikan Injil dengan efektif sehingga orang-orang merespons dengan iman.",
    "Pelayanan": "Kemampuan untuk mengidentifikasi dan memenuhi kebutuhan praktis orang lain dengan sukacita.",
    "Belas Kasihan": "Kemampuan untuk merasakan dan merespons dengan empati terhadap penderitaan orang lain.",
    "Memberi": "Kemampuan untuk memberikan sumber daya dengan murah hati untuk pekerjaan Tuhan.",
    "Keramahtamahan": "Kemampuan untuk menyambut dan melayani orang lain dengan hangat dan tulus.",
    "Doa": "Kemampuan untuk berdoa dengan tekun dan melihat jawaban doa yang luar biasa.",
    "Penyembuhan": "Kemampuan untuk menjadi saluran kuasa penyembuhan Tuhan bagi orang lain.",
    "Mujizat": "Kemampuan untuk menjadi saluran kuasa supernatural Tuhan yang mengatasi hukum alam.",
    "Bernubuat": "Kemampuan untuk menyampaikan pesan Tuhan dengan keberanian dan kejelasan.",
    "Membedakan Roh": "Kemampuan untuk membedakan antara kebenaran dan kesalahan, antara yang berasal dari Tuhan dan yang tidak.",
    "Bahasa Roh": "Kemampuan untuk berbicara dalam bahasa yang tidak dipelajari sebagai bentuk doa dan pujian.",
    "Menafsirkan Bahasa Roh": "Kemampuan untuk menjelaskan makna pesan yang disampaikan dalam bahasa roh.",
    "Kreativitas": "Kemampuan untuk menggunakan seni, musik, tulisan, atau bentuk ekspresi kreatif lainnya untuk kemuliaan Tuhan.",
    "Konseling": "Kemampuan untuk mendengarkan, memahami, dan memberikan nasihat yang bijaksana berdasarkan kebenaran Alkitab.",
    "Mendorong": "Kemampuan untuk memberikan motivasi, penghiburan, dan dorongan kepada orang lain dalam perjalanan iman mereka."
  };

  return explanations[giftName] || `${giftName} adalah karunia rohani yang Tuhan berikan untuk melayani dan membangun tubuh Kristus.`;
};

// Fungsi helper untuk mendapatkan penjelasan untuk heart desire
const getHeartExplanation = (heartName: string): string => {
  const explanations: Record<string, string> = {
    "Keluarga": "Anda memiliki hasrat yang kuat untuk melayani dan memperkuat keluarga, baik keluarga Anda sendiri maupun keluarga lain dalam komunitas.",
    "Pendidikan": "Anda memiliki hasrat untuk mengajar, melatih, dan membantu orang lain bertumbuh dalam pengetahuan dan keterampilan.",
    "Bisnis": "Anda memiliki hasrat untuk menggunakan prinsip-prinsip bisnis dan kewirausahaan untuk membawa perubahan positif.",
    "Pemerintahan": "Anda memiliki hasrat untuk terlibat dalam proses pembuatan kebijakan dan kepemimpinan publik untuk kebaikan bersama.",
    "Media": "Anda memiliki hasrat untuk menggunakan berbagai bentuk media untuk menyampaikan pesan yang membangun dan menginspirasi.",
    "Seni & Hiburan": "Anda memiliki hasrat untuk mengekspresikan kreativitas melalui seni dan hiburan yang memperkaya jiwa.",
    "Agama": "Anda memiliki hasrat untuk melayani dalam konteks keagamaan dan membantu orang lain bertumbuh dalam iman mereka.",
    "Kesehatan": "Anda memiliki hasrat untuk meningkatkan kesejahteraan fisik, mental, dan emosional orang lain.",
    "Sosial": "Anda memiliki hasrat untuk mengatasi masalah sosial dan membantu mereka yang kurang beruntung.",
    "Lingkungan": "Anda memiliki hasrat untuk melestarikan dan meningkatkan kualitas lingkungan alam.",
    "Teknologi": "Anda memiliki hasrat untuk menggunakan dan mengembangkan teknologi untuk meningkatkan kehidupan orang lain.",
    "Internasional": "Anda memiliki hasrat untuk terlibat dalam isu-isu global dan melayani orang-orang dari berbagai budaya."
  };

  return explanations[heartName] || `${heartName} adalah area di mana Anda memiliki hasrat dan motivasi yang kuat untuk melayani.`;
};

// Fungsi helper untuk mendapatkan penjelasan untuk abilities
const getAbilityExplanation = (abilityName: string): string => {
  const explanations: Record<string, string> = {
    "Analitis": "Kemampuan untuk memeriksa fakta, data, dan situasi secara logis dan sistematis untuk mengidentifikasi pola dan solusi.",
    "Artistik": "Kemampuan untuk mengekspresikan ide dan emosi melalui berbagai bentuk seni visual, musik, atau pertunjukan.",
    "Atletik": "Kemampuan fisik yang baik, koordinasi, dan keterampilan dalam aktivitas olahraga dan fisik.",
    "Komunikasi": "Kemampuan untuk menyampaikan informasi dan ide secara jelas dan efektif kepada berbagai audiens.",
    "Kreatif": "Kemampuan untuk menghasilkan ide-ide baru, pendekatan inovatif, dan solusi orisinal untuk masalah.",
    "Kritis": "Kemampuan untuk mengevaluasi informasi, argumen, dan situasi secara objektif untuk membuat penilaian yang tepat.",
    "Detail": "Kemampuan untuk memperhatikan dan mengelola detail-detail kecil dengan teliti dan akurat.",
    "Diplomatis": "Kemampuan untuk berinteraksi dengan orang lain dengan taktis, sensitif, dan penuh pertimbangan.",
    "Fasilitasi": "Kemampuan untuk membantu kelompok bekerja sama secara efektif untuk mencapai tujuan bersama.",
    "Interpersonal": "Kemampuan untuk memahami, berinteraksi, dan membangun hubungan yang positif dengan orang lain.",
    "Linguistik": "Kemampuan untuk memahami, menggunakan, dan belajar bahasa dengan mudah dan efektif.",
    "Logis": "Kemampuan untuk berpikir secara rasional, mengidentifikasi hubungan sebab-akibat, dan menarik kesimpulan yang valid.",
    "Manajerial": "Kemampuan untuk mengelola sumber daya, proyek, dan orang secara efektif untuk mencapai tujuan.",
    "Matematis": "Kemampuan untuk memahami, menganalisis, dan menyelesaikan masalah yang melibatkan angka dan konsep matematika.",
    "Mekanis": "Kemampuan untuk memahami, memperbaiki, dan bekerja dengan mesin, alat, dan sistem mekanis.",
    "Memori": "Kemampuan untuk mengingat informasi, fakta, dan pengalaman dengan akurat dan dalam jangka waktu yang lama.",
    "Mengajar": "Kemampuan untuk menjelaskan konsep, mentransfer pengetahuan, dan membantu orang lain belajar secara efektif.",
    "Mengelola Konflik": "Kemampuan untuk menangani dan menyelesaikan perselisihan atau ketegangan antara individu atau kelompok.",
    "Menulis": "Kemampuan untuk mengekspresikan ide, informasi, dan cerita secara tertulis dengan jelas dan menarik.",
    "Musikal": "Kemampuan untuk memahami, menciptakan, dan mengapresiasi musik, termasuk ritme, melodi, dan harmoni.",
    "Organisasi": "Kemampuan untuk menyusun, mengelola, dan mengkoordinasikan tugas, informasi, dan sumber daya secara efisien.",
    "Penelitian": "Kemampuan untuk mengumpulkan, menganalisis, dan mensintesis informasi dari berbagai sumber untuk menjawab pertanyaan atau memecahkan masalah.",
    "Persuasif": "Kemampuan untuk mempengaruhi pendapat, sikap, atau tindakan orang lain melalui argumen dan komunikasi yang efektif.",
    "Problem Solving": "Kemampuan untuk mengidentifikasi masalah, menganalisis penyebabnya, dan menemukan solusi yang efektif.",
    "Public Speaking": "Kemampuan untuk berbicara di depan umum dengan percaya diri, jelas, dan menarik.",
    "Strategis": "Kemampuan untuk melihat gambaran besar, merencanakan ke depan, dan mengembangkan pendekatan jangka panjang untuk mencapai tujuan.",
    "Teknis": "Kemampuan untuk memahami dan bekerja dengan sistem, perangkat, atau proses yang kompleks dan khusus.",
    "Teknologi": "Kemampuan untuk menggunakan, memahami, dan beradaptasi dengan berbagai jenis teknologi dan perangkat digital."
  };

  return explanations[abilityName] || `${abilityName} adalah kemampuan yang Anda miliki yang dapat digunakan untuk melayani dan berkontribusi secara efektif.`;
};

// Fungsi helper untuk mendapatkan penjelasan untuk experiences
const getExperienceExplanation = (experienceName: string): string => {
  const explanations: Record<string, string> = {
    "Pendidikan": "Pengalaman pendidikan Anda telah membentuk cara Anda belajar, berpikir, dan mengajar orang lain. Ini dapat menjadi dasar untuk melayani dalam bidang pendidikan dan pelatihan.",
    "Karir": "Pengalaman karir Anda telah mengembangkan keterampilan profesional dan pengetahuan industri yang dapat digunakan untuk melayani orang lain dalam konteks pekerjaan dan bisnis.",
    "Keluarga": "Pengalaman keluarga Anda telah membentuk nilai-nilai, hubungan, dan pemahaman Anda tentang dinamika keluarga, yang dapat membantu Anda melayani keluarga lain.",
    "Pelayanan": "Pengalaman pelayanan Anda telah mengembangkan hati untuk melayani dan memahami kebutuhan orang lain, yang dapat menjadi dasar untuk pelayanan yang lebih dalam.",
    "Kesulitan": "Pengalaman kesulitan Anda telah mengembangkan ketahanan, empati, dan kebijaksanaan yang dapat membantu Anda mendukung orang lain yang menghadapi tantangan serupa.",
    "Sukses": "Pengalaman sukses Anda telah mengembangkan kepercayaan diri, keterampilan, dan pengetahuan yang dapat Anda bagikan untuk membantu orang lain mencapai tujuan mereka.",
    "Kegagalan": "Pengalaman kegagalan Anda telah mengajarkan pelajaran berharga dan mengembangkan karakter yang dapat membantu Anda membimbing orang lain melalui kegagalan mereka sendiri.",
    "Perjalanan": "Pengalaman perjalanan Anda telah memperluas wawasan, pemahaman budaya, dan adaptabilitas Anda, yang dapat membantu Anda melayani dalam konteks lintas budaya.",
    "Hubungan": "Pengalaman hubungan Anda telah mengembangkan keterampilan interpersonal dan pemahaman tentang dinamika hubungan, yang dapat membantu Anda melayani dalam konseling dan mentoring.",
    "Spiritual": "Pengalaman spiritual Anda telah memperdalam iman dan pemahaman Anda tentang Tuhan, yang dapat membantu Anda membimbing orang lain dalam perjalanan spiritual mereka.",
    "Kesehatan": "Pengalaman kesehatan Anda telah mengembangkan pemahaman tentang kesejahteraan fisik dan mental, yang dapat membantu Anda melayani orang lain dalam konteks kesehatan.",
    "Keuangan": "Pengalaman keuangan Anda telah mengembangkan pemahaman tentang pengelolaan sumber daya, yang dapat membantu Anda membimbing orang lain dalam pengelolaan keuangan mereka."
  };

  return explanations[experienceName] || `${experienceName} adalah pengalaman hidup yang telah membentuk Anda dan mempersiapkan Anda untuk melayani orang lain dengan cara yang unik.`;
};

// Fungsi helper untuk mendapatkan penjelasan untuk tipe kepribadian MBTI
const getPersonalityExplanation = (mbtiType: string): string => {
  const explanations: Record<string, string> = {
    "ISTJ": "Anda adalah orang yang praktis, faktual, dan dapat diandalkan. Anda memiliki pendekatan yang sistematis dan terorganisir dalam hidup dan pekerjaan Anda. Anda menghargai tradisi, keamanan, dan stabilitas.",
    "ISFJ": "Anda adalah orang yang penuh perhatian, teliti, dan setia. Anda memiliki ingatan yang kuat untuk detail dan bekerja keras untuk memenuhi tanggung jawab Anda. Anda menghargai harmoni dan keamanan.",
    "INFJ": "Anda adalah orang yang reflektif, idealis, dan penuh perhatian. Anda memiliki visi yang kuat tentang bagaimana segala sesuatu bisa menjadi lebih baik dan bekerja diam-diam untuk mewujudkannya. Anda menghargai kedalaman dan otentisitas dalam hubungan.",
    "INTJ": "Anda adalah orang yang mandiri, analitis, dan strategis. Anda memiliki visi jangka panjang dan kemampuan untuk melihat pola dan koneksi yang tidak dilihat orang lain. Anda menghargai pengetahuan, kompetensi, dan perbaikan terus-menerus.",
    "ISTP": "Anda adalah orang yang logis, praktis, dan spontan. Anda memiliki keterampilan teknis yang kuat dan menikmati memecahkan masalah praktis. Anda menghargai efisiensi, kebebasan, dan pengalaman langsung.",
    "ISFP": "Anda adalah orang yang sensitif, kreatif, dan harmonis. Anda memiliki apresiasi yang kuat terhadap keindahan dan pengalaman indrawi. Anda menghargai kebebasan, keotentikan, dan mengekspresikan diri melalui tindakan.",
    "INFP": "Anda adalah orang yang idealis, empatik, dan autentik. Anda memiliki nilai-nilai yang kuat dan didorong oleh keinginan untuk membantu orang lain. Anda menghargai keharmonisan, pertumbuhan pribadi, dan mencari makna dalam hidup.",
    "INTP": "Anda adalah orang yang logis, konseptual, dan ingin tahu. Anda memiliki pemikiran yang tajam dan menikmati menganalisis masalah kompleks. Anda menghargai pengetahuan, inovasi, dan pemahaman mendalam tentang bagaimana segala sesuatu bekerja.",
    "ESTP": "Anda adalah orang yang energik, pragmatis, dan spontan. Anda memiliki keterampilan pemecahan masalah yang kuat dan menikmati mengambil risiko. Anda menghargai kebebasan, pengalaman, dan hidup di saat ini.",
    "ESFP": "Anda adalah orang yang ramah, antusias, dan spontan. Anda memiliki keterampilan sosial yang kuat dan menikmati membuat orang lain bahagia. Anda menghargai kesenangan, pengalaman, dan koneksi dengan orang lain.",
    "ENFP": "Anda adalah orang yang antusias, kreatif, dan penuh perhatian. Anda memiliki imajinasi yang kuat dan kemampuan untuk menginspirasi orang lain. Anda menghargai koneksi, pertumbuhan, dan kemungkinan baru.",
    "ENTP": "Anda adalah orang yang inovatif, cerdas, dan adaptif. Anda memiliki kemampuan untuk melihat kemungkinan dan menikmati tantangan intelektual. Anda menghargai pengetahuan, kreativitas, dan perdebatan yang merangsang.",
    "ESTJ": "Anda adalah orang yang terorganisir, praktis, dan tegas. Anda memiliki keterampilan administratif yang kuat dan berorientasi pada hasil. Anda menghargai struktur, keandalan, dan efisiensi.",
    "ESFJ": "Anda adalah orang yang hangat, kooperatif, dan bertanggung jawab. Anda memiliki keterampilan interpersonal yang kuat dan bekerja keras untuk memenuhi kebutuhan orang lain. Anda menghargai harmoni, tradisi, dan rasa memiliki.",
    "ENFJ": "Anda adalah orang yang karismatik, empatik, dan berorientasi pada orang. Anda memiliki kemampuan untuk menginspirasi dan membantu orang lain mencapai potensi mereka. Anda menghargai koneksi, pertumbuhan, dan kontribusi positif.",
    "ENTJ": "Anda adalah orang yang tegas, logis, dan strategis. Anda memiliki kemampuan kepemimpinan yang kuat dan dorongan untuk mencapai tujuan. Anda menghargai kompetensi, efisiensi, dan pencapaian."
  };

  return explanations[mbtiType] || `${mbtiType} adalah tipe kepribadian Anda yang memengaruhi bagaimana Anda berinteraksi dengan dunia dan orang lain.`;
};

// Fungsi helper untuk mendapatkan kekuatan untuk tipe kepribadian MBTI
const getPersonalityStrengths = (mbtiType: string): string => {
  const strengths: Record<string, string> = {
    "ISTJ": "Dapat diandalkan, teliti, logis, terorganisir, berkomitmen pada tugas, praktis, dan bertanggung jawab.",
    "ISFJ": "Setia, penuh perhatian, teliti, bertanggung jawab, praktis, dan memiliki ingatan yang kuat untuk detail.",
    "INFJ": "Insightful, penuh perhatian, kreatif, berdedikasi, idealis, dan memiliki visi jangka panjang.",
    "INTJ": "Strategis, mandiri, analitis, objektif, konseptual, dan memiliki standar tinggi.",
    "ISTP": "Adaptif, logis, praktis, observatif, efisien, dan memiliki keterampilan teknis yang kuat.",
    "ISFP": "Sensitif, kreatif, loyal, adaptif, penuh perhatian, dan memiliki apresiasi yang kuat terhadap keindahan.",
    "INFP": "Idealis, autentik, penuh perhatian, kreatif, adaptif, dan memiliki nilai-nilai yang kuat.",
    "INTP": "Analitis, logis, objektif, kritis, inovatif, dan memiliki pemikiran yang tajam.",
    "ESTP": "Energik, adaptif, pragmatis, persuasif, spontan, dan berorientasi pada tindakan.",
    "ESFP": "Antusias, ramah, spontan, ekspresif, menyenangkan, dan berorientasi pada orang.",
    "ENFP": "Antusias, kreatif, spontan, optimis, fleksibel, dan penuh perhatian.",
    "ENTP": "Inovatif, cerdas, antusias, adaptif, strategis, dan berorientasi pada kemungkinan.",
    "ESTJ": "Terorganisir, tegas, praktis, logis, efisien, dan berorientasi pada hasil.",
    "ESFJ": "Kooperatif, loyal, hangat, terorganisir, praktis, dan berorientasi pada orang.",
    "ENFJ": "Empatik, karismatik, persuasif, terorganisir, diplomatik, dan berorientasi pada orang.",
    "ENTJ": "Tegas, logis, efisien, strategis, objektif, dan memiliki kemampuan kepemimpinan yang kuat."
  };

  return strengths[mbtiType] || "";
};

// Fungsi helper untuk mendapatkan kelemahan untuk tipe kepribadian MBTI
const getPersonalityWeaknesses = (mbtiType: string): string => {
  const weaknesses: Record<string, string> = {
    "ISTJ": "Dapat terlalu kaku, menghindari perubahan, terlalu fokus pada detail, kurang spontan, dan kadang-kadang kurang peka terhadap perasaan orang lain.",
    "ISFJ": "Dapat terlalu self-sacrificing, menghindari konflik, terlalu tradisional, dan kadang-kadang kesulitan beradaptasi dengan perubahan.",
    "INFJ": "Dapat terlalu perfeksionis, terlalu idealis, sensitif terhadap kritik, dan kadang-kadang kesulitan mengekspresikan kebutuhan mereka sendiri.",
    "INTJ": "Dapat terlalu kritis, terlalu mandiri, kurang sabar dengan orang lain, dan kadang-kadang kesulitan mengekspresikan emosi.",
    "ISTP": "Dapat terlalu independen, menghindari komitmen, kurang ekspresif secara emosional, dan kadang-kadang mengambil risiko yang tidak perlu.",
    "ISFP": "Dapat terlalu sensitif, menghindari konflik, kurang asertif, dan kadang-kadang kesulitan dengan perencanaan jangka panjang.",
    "INFP": "Dapat terlalu idealis, self-critical, menghindari konflik, dan kadang-kadang kesulitan dengan detail praktis dan pengambilan keputusan.",
    "INTP": "Dapat terlalu analitis, kurang praktis, menunda-nunda, dan kadang-kadang kesulitan dengan interaksi sosial dan ekspresi emosional.",
    "ESTP": "Dapat terlalu impulsif, kurang sabar, menghindari komitmen, dan kadang-kadang kurang peka terhadap perasaan orang lain.",
    "ESFP": "Dapat terlalu spontan, menghindari konflik, kurang disiplin, dan kadang-kadang kesulitan dengan perencanaan jangka panjang.",
    "ENFP": "Dapat terlalu optimis, menghindari konflik, kurang fokus, dan kadang-kadang kesulitan dengan detail dan penyelesaian proyek.",
    "ENTP": "Dapat terlalu argumentatif, kurang sabar, menunda-nunda, dan kadang-kadang kesulitan dengan penyelesaian proyek dan detail.",
    "ESTJ": "Dapat terlalu kaku, terlalu fokus pada aturan, kurang fleksibel, dan kadang-kadang kurang peka terhadap perasaan orang lain.",
    "ESFJ": "Dapat terlalu people-pleasing, menghindari konflik, terlalu tradisional, dan kadang-kadang terlalu sensitif terhadap kritik.",
    "ENFJ": "Dapat terlalu idealis, terlalu self-sacrificing, menghindari konflik, dan kadang-kadang terlalu sensitif terhadap kritik.",
    "ENTJ": "Dapat terlalu dominan, tidak sabar, terlalu kritis, dan kadang-kadang kurang peka terhadap perasaan orang lain."
  };

  return weaknesses[mbtiType] || "";
};

// Fungsi helper untuk mendapatkan korelasi antara tipe kepribadian MBTI dan hasrat hati
const getHeartMBTICorrelation = (mbtiType: string): string => {
  const correlations: Record<string, string> = {
    // Extroverted types
    "ESTJ": "struktur, ketertiban, dan efisiensi",
    "ESTP": "aksi, kebebasan, dan pemecahan masalah praktis",
    "ESFJ": "pelayanan, harmoni, dan keluarga",
    "ESFP": "kesenangan, pengalaman, dan koneksi sosial",
    "ENTJ": "kepemimpinan, pencapaian, dan sistem",
    "ENTP": "inovasi, kemungkinan, dan tantangan intelektual",
    "ENFJ": "pengembangan orang, harmoni, dan kontribusi sosial",
    "ENFP": "kreativitas, kemungkinan, dan koneksi dengan orang lain",

    // Introverted types
    "ISTJ": "ketertiban, tradisi, dan keamanan",
    "ISTP": "teknik, pemecahan masalah, dan efisiensi",
    "ISFJ": "pelayanan, keluarga, dan tradisi",
    "ISFP": "seni, harmoni, dan alam",
    "INTJ": "pengetahuan, sistem, dan inovasi",
    "INTP": "pengetahuan, analisis, dan teori",
    "INFJ": "makna, harmoni, dan keadilan sosial",
    "INFP": "nilai-nilai, kreativitas, dan pertumbuhan pribadi"
  };

  return correlations[mbtiType] || "kepemimpinan, pelayanan, dan kreativitas";
};

export const generateShapePDF = ({
  userName,
  spiritualGifts,
  heartDesire,
  personality,
  experiences,
  shapeCode,
  recommendations,
  completedDate,
}: ShapePDFGeneratorProps): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      // Get abilities from personality results
      const abilities = personality.filter(item => item.category.includes("Kemampuan:"))

      // Get personality type results
      const personalityTypes = personality.filter(item => !item.category.includes("Kemampuan:"))

      // Create PDF document - use portrait for better readability on A4
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      // Page dimensions and margins
      const pageWidth = pdf.internal.pageSize.getWidth() // 210mm in portrait
      const pageHeight = pdf.internal.pageSize.getHeight() // 297mm in portrait
      const marginTop = 20
      const marginBottom = 20
      const marginLeft = 15
      const marginRight = 15
      const contentWidth = pageWidth - (marginLeft + marginRight)
      const lineHeight = 6 // Default line height

      // Define colors for styling
      const colors = {
        primary: { r: 41, g: 98, b: 255 },       // Blue
        secondary: { r: 94, g: 53, b: 177 },     // Purple
        accent1: { r: 46, g: 125, b: 50 },       // Green
        accent2: { r: 183, g: 28, b: 28 },       // Red
        accent3: { r: 255, g: 152, b: 0 },       // Orange
        dark: { r: 33, g: 33, b: 33 },           // Dark Gray
        text: { r: 51, g: 51, b: 51 }            // Darker Text Gray for better contrast
      }

      // Function to add footer to each page
      let pageNumber = 1
      const totalPages = 10 // Perkiraan total halaman

      const addFooter = () => {
        pdf.setDrawColor(41, 98, 255, 0.3) // Light blue line
        pdf.setLineWidth(0.5)
        pdf.line(marginLeft, pageHeight - marginBottom, pageWidth - marginRight, pageHeight - marginBottom)

        pdf.setFontSize(9)
        pdf.setTextColor(41, 98, 255) // Blue text for consistency
        pdf.text(
          `SHAPE Discovery Results - ${userName} - ${completedDate}`,
          pageWidth / 2,
          pageHeight - (marginBottom / 2),
          { align: "center" }
        )

        // Add logo text in footer
        pdf.setFont('helvetica', 'bold')
        pdf.text("SHAPE", marginLeft, pageHeight - (marginBottom / 2))

        // Add page number
        pdf.text(`Halaman ${pageNumber} dari ${totalPages}`, pageWidth - marginRight, pageHeight - (marginBottom / 2), { align: "right" })
        pageNumber++ // Increment page number for next page

        pdf.setFont('helvetica', 'normal')
        pdf.setTextColor(0, 0, 0) // Reset text color
      }

      // Helper functions for modular content
      let currentY = marginTop

      // Function to check if we need a new page
      const checkNewPage = (heightNeeded = lineHeight) => {
        if (currentY + heightNeeded > pageHeight - marginBottom) {
          addFooter()
          pdf.addPage()
          currentY = marginTop
          return true
        }
        return false
      }

      // Function to force a new page
      const addNewPage = () => {
        addFooter()
        pdf.addPage()
        currentY = marginTop
      }

      // Function to add page title
      const addPageTitle = (title: string, color = colors.primary) => {
        checkNewPage(15)
        pdf.setFontSize(16)
        pdf.setFont("helvetica", "bold")
        pdf.setTextColor(color.r, color.g, color.b)
        pdf.text(title, pageWidth / 2, currentY, { align: "center" })
        currentY += 5
        pdf.setLineWidth(0.5)
        pdf.line(marginLeft, currentY, pageWidth - marginRight, currentY)
        currentY += 10
      }

      // Function to add section title
      const addSectionTitle = (title: string, color = colors.primary) => {
        checkNewPage(10)
        pdf.setFontSize(14)
        pdf.setFont("helvetica", "bold")
        pdf.setTextColor(color.r, color.g, color.b)
        pdf.text(title, marginLeft, currentY)
        currentY += 5
      }

      // Function to add text with auto page break
      const addTextAutoBreak = (text: string, fontSize = 10, color = colors.text, indent = 0) => {
        checkNewPage()
        pdf.setFontSize(fontSize)
        pdf.setFont("helvetica", "normal")
        pdf.setTextColor(color.r, color.g, color.b)

        const lines = pdf.splitTextToSize(text, contentWidth - indent)
        lines.forEach((line: string) => {
          checkNewPage()
          pdf.text(line, marginLeft + indent, currentY)
          currentY += lineHeight
        })
        currentY += 2 // Add a little extra space after paragraph
      }

      // Function to add bullet point
      const addBulletPoint = (text: string, fontSize = 10, color = colors.text, indent = 3) => {
        checkNewPage()
        pdf.setFontSize(fontSize)
        pdf.setFont("helvetica", "normal")
        pdf.setTextColor(color.r, color.g, color.b)

        const lines = pdf.splitTextToSize(text, contentWidth - (indent + 3))
        pdf.text("•", marginLeft + indent - 3, currentY)
        pdf.text(lines[0], marginLeft + indent, currentY)
        currentY += lineHeight

        // Handle multi-line bullet points
        if (lines.length > 1) {
          for (let i = 1; i < lines.length; i++) {
            checkNewPage()
            pdf.text(lines[i], marginLeft + indent, currentY)
            currentY += lineHeight
          }
        }

        currentY += 2 // Add a little extra space after bullet point
      }

      // Add header with title
      pdf.setFillColor(41, 98, 255, 0.8) // Slightly transparent blue
      pdf.rect(0, 0, pageWidth, 20, 'F')
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(16)
      pdf.text("SHAPE Discovery Results", marginLeft, 13)

      // Add user info with better spacing - turunkan posisi data diri agar tidak bertabrakan dengan header
      currentY = marginTop + 10 // Tambahkan 10 unit untuk menurunkan posisi data diri
      pdf.setTextColor(0, 0, 0)
      pdf.setFontSize(12)
      pdf.text(`Nama: ${userName}`, marginLeft, currentY)
      currentY += 5
      pdf.text(`SHAPE Code: ${shapeCode}`, marginLeft, currentY)
      currentY += 5
      pdf.text(`Tanggal: ${completedDate}`, marginLeft, currentY)
      currentY += 10

      // HALAMAN 1: TUJUAN HIDUP
      addPageTitle("Tujuan Hidup", colors.primary)
      addSectionTitle("Tujuan Hidup:", colors.primary)
      addTextAutoBreak(recommendations.purposeStatement || "", 10, colors.text, 3)

      // Add footer and start new page
      addNewPage()

      // HALAMAN 2: SPIRITUAL GIFTS
      addPageTitle("Spiritual Gifts", colors.accent1)
      addSectionTitle("Spiritual Gifts:", colors.accent1)
      addTextAutoBreak("Karunia rohani adalah kemampuan khusus yang diberikan oleh Roh Kudus untuk melayani dan membangun tubuh Kristus.", 10, colors.text, 3)

      // Penjelasan lebih detail tentang spiritual gifts
      addTextAutoBreak("Karunia rohani menunjukkan bagaimana Anda dapat berkontribusi secara efektif dalam pelayanan. Berikut adalah tiga karunia rohani teratas Anda:", 10, colors.text, 3)
      currentY += 2

      // Hanya tampilkan 3 spiritual gifts teratas
      const topSpiritualGifts = [...spiritualGifts].sort((a, b) => b.score - a.score).slice(0, 3)
      topSpiritualGifts.forEach(gift => {
        addBulletPoint(`${gift.category} (${gift.score}/5)`, 10, colors.text, 3)

        // Tambahkan penjelasan singkat untuk setiap karunia
        const giftExplanation = getGiftExplanation(gift.category)
        if (giftExplanation) {
          addTextAutoBreak(giftExplanation, 9, colors.text, 6)
        }
      })

      // Add footer and start new page
      addNewPage()

      // HALAMAN 3: HEART DESIRE
      addPageTitle("Heart Desire", colors.accent2)
      addSectionTitle("Heart Desire:", colors.accent2)
      addTextAutoBreak("Hasrat hati adalah keinginan dan motivasi yang mendorong Anda untuk melayani dalam bidang tertentu. Ini menunjukkan di mana Anda paling bersemangat untuk melayani.", 10, colors.text, 3)

      // Penjelasan lebih detail tentang heart desire
      addTextAutoBreak("Hasrat hati Anda menunjukkan bidang-bidang di mana Anda memiliki motivasi dan semangat terbesar. Berikut adalah tiga hasrat hati teratas Anda:", 10, colors.text, 3)
      currentY += 2

      // Hanya tampilkan 3 heart desire teratas
      const topHeartDesire = [...heartDesire].sort((a, b) => b.score - a.score).slice(0, 3)
      topHeartDesire.forEach(heart => {
        addBulletPoint(`${heart.category} (${heart.score}/5)`, 10, colors.text, 3)

        // Tambahkan penjelasan singkat untuk setiap hasrat hati
        const heartExplanation = getHeartExplanation(heart.category)
        if (heartExplanation) {
          addTextAutoBreak(heartExplanation, 9, colors.text, 6)
        }
      })

      // Tambahkan reflektif insight untuk heart desire
      currentY += 5
      addSectionTitle("Reflektif Insight:", colors.accent2)

      // Cari reflective insights dari heart desire
      const heartReflections = heartDesire.filter(item => item.type === "reflection" || item.type === "open")

      if (heartReflections.length > 0) {
        // Tampilkan reflective insights
        heartReflections.forEach(reflection => {
          if (reflection.description) {
            addTextAutoBreak(reflection.description, 10, colors.text, 3)
          } else if (reflection.content) {
            // Jika ada content (jawaban terbuka), tampilkan sebagai kutipan
            addTextAutoBreak(`"${reflection.content}"`, 10, colors.text, 3)
          }
          currentY += 2
        })
      } else {
        // Jika tidak ada reflective insights, tampilkan pesan default
        addTextAutoBreak("Refleksi Anda tentang hasrat hati menunjukkan motivasi dan keinginan yang mendorong Anda untuk melayani dalam bidang tertentu. Ini membantu Anda memahami di mana Anda paling bersemangat untuk berkontribusi.", 10, colors.text, 3)
      }

      // Tambahkan insight berdasarkan tipe kepribadian MBTI
      const heartPersonalityType = personality.find(p => p.category.includes("Tipe Kepribadian"))
      if (heartPersonalityType) {
        const mbtiType = heartPersonalityType.category.split(": ")[1]
        const heartCorrelation = getHeartMBTICorrelation(mbtiType)
        if (heartCorrelation) {
          currentY += 3
          addTextAutoBreak(`Berdasarkan tipe kepribadian ${mbtiType} Anda, Anda cenderung memiliki hasrat hati yang terkait dengan ${heartCorrelation}. Ini dapat membantu Anda memahami motivasi dan keinginan Anda lebih dalam.`, 10, colors.text, 3)
        }
      }

      // Add footer and start new page
      addNewPage()

      // HALAMAN 4: PERSONALITY
      addPageTitle("Personality", colors.secondary)
      addSectionTitle("Personality:", colors.secondary)
      addTextAutoBreak("Kepribadian adalah cara unik Anda berinteraksi dengan dunia dan orang lain. Ini memengaruhi bagaimana Anda melayani dan bekerja sama dengan orang lain.", 10, colors.text, 3)

      const mbtiPersonalityType = personalityTypes.find(p => p.category.includes("Tipe Kepribadian"))
      if (mbtiPersonalityType) {
        const mbtiType = mbtiPersonalityType.category.split(": ")[1]
        addBulletPoint(`${mbtiType}`, 10, colors.text, 3)

        // Tambahkan penjelasan untuk tipe kepribadian
        const personalityExplanation = getPersonalityExplanation(mbtiType)
        if (personalityExplanation) {
          addTextAutoBreak(personalityExplanation, 9, colors.text, 6)
        }

        // Tambahkan kekuatan dan kelemahan
        const strengths = getPersonalityStrengths(mbtiType)
        if (strengths) {
          addTextAutoBreak("Kekuatan:", 9, colors.accent1, 6)
          addTextAutoBreak(strengths, 9, colors.text, 9)
        }

        const weaknesses = getPersonalityWeaknesses(mbtiType)
        if (weaknesses) {
          addTextAutoBreak("Area Pengembangan:", 9, colors.accent2, 6)
          addTextAutoBreak(weaknesses, 9, colors.text, 9)
        }
      }

      // Add footer and start new page
      addNewPage()

      // HALAMAN 5: ABILITIES
      addPageTitle("Abilities", colors.primary)
      addSectionTitle("Abilities:", colors.primary)
      addTextAutoBreak("Kemampuan adalah bakat alami dan keterampilan yang telah Anda kembangkan. Ini menunjukkan di mana Anda dapat berkontribusi secara efektif.", 10, colors.text, 3)

      // Penjelasan lebih detail tentang abilities
      addTextAutoBreak("Kemampuan Anda menunjukkan area di mana Anda memiliki bakat alami dan keterampilan yang telah Anda kembangkan. Berikut adalah tiga kemampuan teratas Anda:", 10, colors.text, 3)
      currentY += 2

      // Hanya tampilkan 3 abilities teratas
      const topAbilities = [...abilities].sort((a, b) => b.score - a.score).slice(0, 3)
      topAbilities.forEach(ability => {
        addBulletPoint(`${ability.category.replace("Kemampuan: ", "")} (${ability.score}/5)`, 10, colors.text, 3)

        // Tambahkan penjelasan singkat untuk setiap kemampuan
        const abilityName = ability.category.replace("Kemampuan: ", "")
        const abilityExplanation = getAbilityExplanation(abilityName)
        if (abilityExplanation) {
          addTextAutoBreak(abilityExplanation, 9, colors.text, 6)
        }
      })

      // Add footer and start new page
      addNewPage()

      // HALAMAN 6: EXPERIENCES
      addPageTitle("Experiences", colors.accent3)
      addSectionTitle("Experiences:", colors.accent3)
      addTextAutoBreak("Pengalaman hidup Anda, baik positif maupun negatif, telah membentuk Anda dan mempersiapkan Anda untuk melayani orang lain dengan cara yang unik.", 10, colors.text, 3)

      // Penjelasan lebih detail tentang experiences
      addTextAutoBreak("Pengalaman hidup Anda telah membentuk siapa Anda dan bagaimana Anda dapat melayani orang lain. Berikut adalah tiga pengalaman teratas Anda:", 10, colors.text, 3)
      currentY += 2

      // Hanya tampilkan 3 experiences teratas
      const topExperiences = [...experiences].sort((a, b) => b.score - a.score).slice(0, 3)
      topExperiences.forEach(exp => {
        addBulletPoint(`${exp.category} (${exp.score}/5)`, 10, colors.text, 3)

        // Tambahkan penjelasan singkat untuk setiap pengalaman
        const experienceExplanation = getExperienceExplanation(exp.category)
        if (experienceExplanation) {
          addTextAutoBreak(experienceExplanation, 9, colors.text, 6)
        }
      })

      // Tambahkan reflektif insight untuk experiences
      currentY += 5
      addSectionTitle("Reflektif Insight:", colors.accent3)

      // Cari reflective insights dari experiences
      const experienceReflections = experiences.filter(item => item.type === "insight" || item.type === "open")

      if (experienceReflections.length > 0) {
        // Tampilkan reflective insights
        experienceReflections.forEach(reflection => {
          if (reflection.description) {
            addTextAutoBreak(reflection.description, 10, colors.text, 3)
          } else if (reflection.content) {
            // Jika ada content (jawaban terbuka), tampilkan sebagai kutipan
            addTextAutoBreak(`"${reflection.content}"`, 10, colors.text, 3)
          }
          currentY += 2
        })
      } else {
        // Jika tidak ada reflective insights, tampilkan pesan default
        addTextAutoBreak("Refleksi Anda tentang pengalaman hidup menunjukkan bagaimana pengalaman tersebut telah membentuk Anda dan mempersiapkan Anda untuk melayani orang lain dengan cara yang unik. Pengalaman ini dapat menjadi sumber kekuatan, kebijaksanaan, dan empati dalam pelayanan Anda.", 10, colors.text, 3)
      }

      // Tambahkan insight tentang bagaimana pengalaman dapat digunakan dalam pelayanan
      currentY += 3
      addTextAutoBreak("Pengalaman hidup Anda dapat digunakan untuk:", 10, colors.text, 3)
      addBulletPoint("Membantu orang lain yang melalui situasi serupa dengan apa yang pernah Anda alami", 10, colors.text, 3)
      addBulletPoint("Memberikan perspektif unik dalam pelayanan dan pekerjaan Anda", 10, colors.text, 3)
      addBulletPoint("Mengembangkan empati dan pemahaman yang lebih dalam terhadap orang lain", 10, colors.text, 3)
      addBulletPoint("Menjadi sumber kebijaksanaan dan wawasan dalam menghadapi tantangan", 10, colors.text, 3)

      // Add footer and start new page
      addNewPage()

      // HALAMAN 7: SHAPE SYNERGY
      addPageTitle("SHAPE Synergy", colors.secondary)
      addSectionTitle("SHAPE Synergy:", colors.secondary)
      addTextAutoBreak("SHAPE Synergy menunjukkan bagaimana semua elemen SHAPE Anda bekerja bersama untuk membentuk profil pelayanan yang unik dan efektif.", 10, colors.text, 3)

      if (recommendations.shapeSynergy && recommendations.shapeSynergy.length > 0) {
        recommendations.shapeSynergy.forEach(synergy => {
          addBulletPoint(synergy, 10, colors.text, 3)
        })
      }

      // Add footer and start new page
      addNewPage()

      // HALAMAN 8: REKOMENDASI
      addPageTitle("Rekomendasi", colors.primary)
      addSectionTitle("Rekomendasi:", colors.primary)
      addTextAutoBreak("Berdasarkan profil SHAPE Anda, berikut adalah rekomendasi bidang pelayanan dan karir yang mungkin cocok dengan Anda.", 10, colors.text, 3)

      // Ministry Recommendations
      addSectionTitle("Pelayanan:", colors.accent1)
      recommendations.ministryRecommendations.forEach(rec => {
        addBulletPoint(rec, 10, colors.text, 3)
      })

      // Career Recommendations
      addSectionTitle("Karir:", colors.primary)
      recommendations.careerRecommendations.forEach(rec => {
        addBulletPoint(rec, 10, colors.text, 3)
      })

      // Add footer and start new page
      addNewPage()

      // HALAMAN 9: KEKUATAN & AREA PENGEMBANGAN
      addPageTitle("Kekuatan & Area Pengembangan", colors.primary)

      // Strengths
      if (recommendations.strengthsWeaknesses.strengths.length > 0) {
        addSectionTitle("Kekuatan:", colors.accent1)
        recommendations.strengthsWeaknesses.strengths.forEach(strength => {
          addBulletPoint(strength, 10, colors.text, 3)
        })
      }

      // Weaknesses
      if (recommendations.strengthsWeaknesses.weaknesses.length > 0) {
        addSectionTitle("Area Pengembangan:", colors.accent2)
        recommendations.strengthsWeaknesses.weaknesses.forEach(weakness => {
          addBulletPoint(weakness, 10, colors.text, 3)
        })
      }

      // Bible verse if available
      if (recommendations.bibleVerse) {
        // Check if we need a new page
        if (currentY > pageHeight - 80) {
          addNewPage()
          addPageTitle("Ayat Alkitab yang Relevan", colors.primary)
        } else {
          currentY += 10
          addSectionTitle("Ayat Alkitab yang Relevan:", colors.primary)
        }

        pdf.setFontSize(10)
        pdf.setFont("helvetica", "italic")
        pdf.setTextColor(colors.text.r, colors.text.g, colors.text.b)
        addTextAutoBreak(recommendations.bibleVerse, 10, colors.text, 3)
      }

      // Add footer and start new page
      addNewPage()

      // HALAMAN TERAKHIR: DISCLAIMER
      addPageTitle("Disclaimer", colors.dark)
      addSectionTitle("Disclaimer:", colors.dark)
      addTextAutoBreak("Hasil SHAPE Discovery ini adalah alat untuk membantu Anda menemukan potensi pelayanan dan karir yang sesuai dengan profil Anda. Hasil ini tidak bersifat mutlak dan sebaiknya didiskusikan dengan mentor atau pemimpin rohani Anda. Tuhan dapat menggunakan Anda dalam berbagai cara yang mungkin tidak tercakup dalam hasil ini. Teruslah bertumbuh dan mengembangkan karunia Anda untuk kemuliaan Tuhan.", 10, colors.text, 0)

      // Add footer to the last page
      addFooter()

      // Save the PDF
      const fileName = `SHAPE-Results-${userName.replace(/\\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`
      pdf.save(fileName)

      resolve(fileName)
    } catch (error) {
      console.error("PDF generation error:", error)
      reject(error)
    }
  })
}
