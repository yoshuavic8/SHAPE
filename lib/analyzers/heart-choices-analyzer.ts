// Fungsi-fungsi untuk menganalisis pilihan dari pertanyaan multiple choice di bagian Heart Desire

// Fungsi untuk menganalisis pilihan area pelayanan rohani
export function analyzeReligiousServiceChoices(choices: string[]): string {
  // Kelompokkan pilihan berdasarkan kategori
  const teachingChoices = choices.filter(choice => 
    ["Pengajaran Alkitab", "Pelayanan Pendidikan"].includes(choice));
  
  const worshipChoices = choices.filter(choice => 
    ["Doa dan Penyembahan", "Pelayanan Musik/Seni"].includes(choice));
  
  const pastoralChoices = choices.filter(choice => 
    ["Pelayanan Pastoral", "Konseling Rohani", "Pelayanan Kesehatan"].includes(choice));
  
  const missionChoices = choices.filter(choice => 
    ["Misi dan Penginjilan", "Pelayanan Sosial/Kemanusiaan"].includes(choice));
  
  const leadershipChoices = choices.filter(choice => 
    ["Kepemimpinan Gereja", "Pelayanan Media/Digital"].includes(choice));
  
  const youthChoices = choices.filter(choice => 
    ["Pelayanan Anak/Remaja"].includes(choice));
  
  // Buat analisis berdasarkan kombinasi pilihan
  let analysis = "Berdasarkan pilihan Anda, ";
  
  if (choices.length >= 4) {
    analysis += "Anda memiliki minat yang luas dalam pelayanan rohani. ";
  }
  
  if (teachingChoices.length > 0) {
    analysis += "Anda memiliki hasrat untuk mengajar dan membagikan pengetahuan Alkitab kepada orang lain. ";
  }
  
  if (worshipChoices.length > 0) {
    analysis += "Anda memiliki kerinduan untuk terlibat dalam ibadah dan menciptakan pengalaman rohani yang mendalam. ";
  }
  
  if (pastoralChoices.length > 0) {
    analysis += "Anda memiliki hati untuk merawat dan mendampingi orang lain dalam perjalanan rohani mereka. ";
  }
  
  if (missionChoices.length > 0) {
    analysis += "Anda memiliki semangat untuk menjangkau orang lain dan membagikan kasih Kristus melalui tindakan nyata. ";
  }
  
  if (leadershipChoices.length > 0) {
    analysis += "Anda memiliki potensi kepemimpinan dan keinginan untuk mempengaruhi arah pelayanan. ";
  }
  
  if (youthChoices.length > 0) {
    analysis += "Anda memiliki kepedulian khusus untuk generasi muda dan masa depan gereja. ";
  }
  
  // Tambahkan rekomendasi
  analysis += "\n\nRekomendasi: Pertimbangkan untuk terlibat dalam ";
  
  if (choices.length > 0) {
    const primaryChoice = choices[0];
    analysis += `pelayanan ${primaryChoice} sebagai fokus utama, `;
    
    if (choices.length > 1) {
      const secondaryChoice = choices[1];
      analysis += `dengan ${secondaryChoice} sebagai area pendukung. `;
    } else {
      analysis += "dan cari mentor yang berpengalaman di bidang ini. ";
    }
  } else {
    analysis += "berbagai pelayanan untuk menemukan area yang paling sesuai dengan hasrat hati Anda. ";
  }
  
  return analysis;
}

// Fungsi untuk menganalisis pilihan area pelayanan keluarga
export function analyzeFamilyServiceChoices(choices: string[]): string {
  // Kelompokkan pilihan berdasarkan kategori
  const marriageChoices = choices.filter(choice => 
    ["Konseling Pernikahan", "Keluarga dan Spiritualitas"].includes(choice));
  
  const parentingChoices = choices.filter(choice => 
    ["Pendampingan Orang Tua", "Pendidikan Keluarga", "Keluarga dan Teknologi"].includes(choice));
  
  const childrenChoices = choices.filter(choice => 
    ["Pelayanan Anak", "Pelayanan Remaja"].includes(choice));
  
  const elderlyChoices = choices.filter(choice => 
    ["Pelayanan Lansia"].includes(choice));
  
  const healingChoices = choices.filter(choice => 
    ["Pemulihan Keluarga", "Keluarga dalam Krisis", "Keluarga dan Kesehatan Mental"].includes(choice));
  
  const resourceChoices = choices.filter(choice => 
    ["Keluarga dan Keuangan"].includes(choice));
  
  // Buat analisis berdasarkan kombinasi pilihan
  let analysis = "Berdasarkan pilihan Anda, ";
  
  if (choices.length >= 4) {
    analysis += "Anda memiliki minat yang luas dalam pelayanan keluarga. ";
  }
  
  if (marriageChoices.length > 0) {
    analysis += "Anda memiliki hasrat untuk memperkuat fondasi pernikahan dan membantu pasangan membangun hubungan yang sehat. ";
  }
  
  if (parentingChoices.length > 0) {
    analysis += "Anda peduli dengan tantangan pengasuhan anak dan ingin membantu orang tua mengembangkan keterampilan yang efektif. ";
  }
  
  if (childrenChoices.length > 0) {
    analysis += "Anda memiliki hati untuk anak-anak dan remaja, ingin membantu mereka bertumbuh dengan nilai-nilai yang kuat. ";
  }
  
  if (elderlyChoices.length > 0) {
    analysis += "Anda memiliki kepedulian khusus untuk lansia dan tantangan yang mereka hadapi. ";
  }
  
  if (healingChoices.length > 0) {
    analysis += "Anda memiliki kepekaan terhadap keluarga yang mengalami krisis dan ingin membantu proses pemulihan. ";
  }
  
  if (resourceChoices.length > 0) {
    analysis += "Anda memahami pentingnya pengelolaan sumber daya dalam keluarga. ";
  }
  
  // Tambahkan rekomendasi
  analysis += "\n\nRekomendasi: Pertimbangkan untuk terlibat dalam ";
  
  if (choices.length > 0) {
    const primaryChoice = choices[0];
    analysis += `pelayanan ${primaryChoice} sebagai fokus utama, `;
    
    if (choices.length > 1) {
      const secondaryChoice = choices[1];
      analysis += `dengan ${secondaryChoice} sebagai area pendukung. `;
    } else {
      analysis += "dan cari pelatihan atau sertifikasi yang relevan di bidang ini. ";
    }
  } else {
    analysis += "berbagai pelayanan keluarga untuk menemukan area yang paling sesuai dengan hasrat hati Anda. ";
  }
  
  return analysis;
}

// Fungsi untuk menganalisis pilihan area pendidikan
export function analyzeEducationChoices(choices: string[]): string {
  // Kelompokkan pilihan berdasarkan kategori
  const earlyEducationChoices = choices.filter(choice => 
    ["Pendidikan Anak Usia Dini", "Pendidikan Karakter"].includes(choice));
  
  const k12Choices = choices.filter(choice => 
    ["Pendidikan Dasar/Menengah", "Pendidikan Khusus/Inklusif"].includes(choice));
  
  const higherEducationChoices = choices.filter(choice => 
    ["Pendidikan Tinggi", "Penelitian Pendidikan"].includes(choice));
  
  const vocationalChoices = choices.filter(choice => 
    ["Pendidikan Vokasi/Keterampilan"].includes(choice));
  
  const curriculumChoices = choices.filter(choice => 
    ["Pengembangan Kurikulum", "Teknologi Pendidikan"].includes(choice));
  
  const specializedChoices = choices.filter(choice => 
    ["Pendidikan Agama", "Pendidikan Seni dan Budaya", "Pendidikan Kesehatan", "Pendidikan Lingkungan"].includes(choice));
  
  const policyChoices = choices.filter(choice => 
    ["Kebijakan Pendidikan"].includes(choice));
  
  // Buat analisis berdasarkan kombinasi pilihan
  let analysis = "Berdasarkan pilihan Anda, ";
  
  if (choices.length >= 4) {
    analysis += "Anda memiliki minat yang luas dalam dunia pendidikan. ";
  }
  
  if (earlyEducationChoices.length > 0) {
    analysis += "Anda memiliki hasrat untuk membentuk fondasi awal dan karakter anak-anak. ";
  }
  
  if (k12Choices.length > 0) {
    analysis += "Anda peduli dengan pendidikan dasar dan menengah yang berkualitas dan inklusif. ";
  }
  
  if (higherEducationChoices.length > 0) {
    analysis += "Anda tertarik pada pendidikan tinggi dan pengembangan pengetahuan melalui penelitian. ";
  }
  
  if (vocationalChoices.length > 0) {
    analysis += "Anda melihat pentingnya pendidikan praktis dan keterampilan yang relevan dengan dunia kerja. ";
  }
  
  if (curriculumChoices.length > 0) {
    analysis += "Anda memiliki minat dalam pengembangan konten dan metode pembelajaran yang efektif. ";
  }
  
  if (specializedChoices.length > 0) {
    analysis += "Anda tertarik pada bidang pendidikan khusus yang dapat membentuk nilai dan kesadaran tertentu. ";
  }
  
  if (policyChoices.length > 0) {
    analysis += "Anda memiliki kepedulian terhadap kebijakan dan sistem yang membentuk pendidikan secara luas. ";
  }
  
  // Tambahkan rekomendasi
  analysis += "\n\nRekomendasi: Pertimbangkan untuk terlibat dalam ";
  
  if (choices.length > 0) {
    const primaryChoice = choices[0];
    analysis += `bidang ${primaryChoice} sebagai fokus utama, `;
    
    if (choices.length > 1) {
      const secondaryChoice = choices[1];
      analysis += `dengan ${secondaryChoice} sebagai area pendukung. `;
    } else {
      analysis += "dan terus mengembangkan keahlian Anda di bidang ini. ";
    }
  } else {
    analysis += "berbagai aspek pendidikan untuk menemukan area yang paling sesuai dengan hasrat hati Anda. ";
  }
  
  return analysis;
}

// Fungsi untuk menganalisis pilihan area pemerintahan
export function analyzeGovernmentChoices(choices: string[]): string {
  // Kelompokkan pilihan berdasarkan kategori
  const policyChoices = choices.filter(choice => 
    ["Kebijakan Publik", "Administrasi Publik", "Etika Pemerintahan"].includes(choice));
  
  const legalChoices = choices.filter(choice => 
    ["Hukum dan Keadilan", "Advokasi dan HAM"].includes(choice));
  
  const serviceChoices = choices.filter(choice => 
    ["Pelayanan Masyarakat", "Kesejahteraan Sosial", "Kesehatan Masyarakat", "Pendidikan Publik"].includes(choice));
  
  const politicalChoices = choices.filter(choice => 
    ["Politik Lokal/Nasional", "Pemerintahan Daerah"].includes(choice));
  
  const internationalChoices = choices.filter(choice => 
    ["Hubungan Internasional"].includes(choice));
  
  const securityChoices = choices.filter(choice => 
    ["Keamanan dan Pertahanan"].includes(choice));
  
  const economicChoices = choices.filter(choice => 
    ["Pembangunan Ekonomi", "Lingkungan dan Keberlanjutan"].includes(choice));
  
  // Buat analisis berdasarkan kombinasi pilihan
  let analysis = "Berdasarkan pilihan Anda, ";
  
  if (choices.length >= 4) {
    analysis += "Anda memiliki minat yang luas dalam bidang pemerintahan dan kebijakan publik. ";
  }
  
  if (policyChoices.length > 0) {
    analysis += "Anda memiliki hasrat untuk terlibat dalam perumusan dan implementasi kebijakan yang efektif dan etis. ";
  }
  
  if (legalChoices.length > 0) {
    analysis += "Anda peduli dengan keadilan, hukum, dan perlindungan hak asasi manusia. ";
  }
  
  if (serviceChoices.length > 0) {
    analysis += "Anda memiliki hati untuk melayani masyarakat dan meningkatkan kualitas hidup warga. ";
  }
  
  if (politicalChoices.length > 0) {
    analysis += "Anda tertarik pada proses politik dan tata kelola pemerintahan. ";
  }
  
  if (internationalChoices.length > 0) {
    analysis += "Anda memiliki wawasan global dan minat dalam hubungan antar negara. ";
  }
  
  if (securityChoices.length > 0) {
    analysis += "Anda memiliki kepedulian terhadap keamanan dan pertahanan. ";
  }
  
  if (economicChoices.length > 0) {
    analysis += "Anda tertarik pada pembangunan ekonomi dan keberlanjutan lingkungan. ";
  }
  
  // Tambahkan rekomendasi
  analysis += "\n\nRekomendasi: Pertimbangkan untuk terlibat dalam ";
  
  if (choices.length > 0) {
    const primaryChoice = choices[0];
    analysis += `bidang ${primaryChoice} sebagai fokus utama, `;
    
    if (choices.length > 1) {
      const secondaryChoice = choices[1];
      analysis += `dengan ${secondaryChoice} sebagai area pendukung. `;
    } else {
      analysis += "dan cari kesempatan magang atau pelatihan di institusi terkait. ";
    }
  } else {
    analysis += "berbagai aspek pemerintahan untuk menemukan area yang paling sesuai dengan hasrat hati Anda. ";
  }
  
  return analysis;
}

// Fungsi untuk menganalisis pilihan area media
export function analyzeMediaChoices(choices: string[]): string {
  // Kelompokkan pilihan berdasarkan kategori
  const journalismChoices = choices.filter(choice => 
    ["Jurnalisme", "Penulisan/Penerbitan", "Analisis Media"].includes(choice));
  
  const digitalChoices = choices.filter(choice => 
    ["Media Sosial", "Media Digital", "Pemasaran Digital", "Teknologi Media Baru"].includes(choice));
  
  const visualChoices = choices.filter(choice => 
    ["Produksi Video/Film", "Fotografi", "Animasi", "Desain Grafis"].includes(choice));
  
  const broadcastChoices = choices.filter(choice => 
    ["Penyiaran (Radio/TV)", "Podcast/Audio"].includes(choice));
  
  const specializedChoices = choices.filter(choice => 
    ["Media Pendidikan", "Media Keagamaan", "Etika Media"].includes(choice));
  
  // Buat analisis berdasarkan kombinasi pilihan
  let analysis = "Berdasarkan pilihan Anda, ";
  
  if (choices.length >= 4) {
    analysis += "Anda memiliki minat yang luas dalam dunia media dan komunikasi. ";
  }
  
  if (journalismChoices.length > 0) {
    analysis += "Anda memiliki hasrat untuk menulis, melaporkan, dan menganalisis informasi. ";
  }
  
  if (digitalChoices.length > 0) {
    analysis += "Anda tertarik pada media digital dan platform online yang terus berkembang. ";
  }
  
  if (visualChoices.length > 0) {
    analysis += "Anda memiliki minat dalam komunikasi visual dan bercerita melalui gambar. ";
  }
  
  if (broadcastChoices.length > 0) {
    analysis += "Anda tertarik pada media penyiaran dan format audio. ";
  }
  
  if (specializedChoices.length > 0) {
    analysis += "Anda memiliki kepedulian terhadap penggunaan media untuk tujuan khusus seperti pendidikan atau nilai-nilai agama. ";
  }
  
  // Tambahkan rekomendasi
  analysis += "\n\nRekomendasi: Pertimbangkan untuk terlibat dalam ";
  
  if (choices.length > 0) {
    const primaryChoice = choices[0];
    analysis += `bidang ${primaryChoice} sebagai fokus utama, `;
    
    if (choices.length > 1) {
      const secondaryChoice = choices[1];
      analysis += `dengan ${secondaryChoice} sebagai area pendukung. `;
    } else {
      analysis += "dan bangun portofolio atau proyek yang menunjukkan keahlian Anda. ";
    }
  } else {
    analysis += "berbagai aspek media untuk menemukan area yang paling sesuai dengan hasrat hati Anda. ";
  }
  
  return analysis;
}

// Fungsi untuk menganalisis pilihan area seni dan hiburan
export function analyzeArtsChoices(choices: string[]): string {
  // Kelompokkan pilihan berdasarkan kategori
  const musicChoices = choices.filter(choice => 
    ["Musik"].includes(choice));
  
  const visualArtsChoices = choices.filter(choice => 
    ["Seni Visual", "Fotografi Artistik", "Seni Digital", "Seni Instalasi"].includes(choice));
  
  const performingArtsChoices = choices.filter(choice => 
    ["Teater/Drama", "Tari", "Seni Pertunjukan"].includes(choice));
  
  const mediaArtsChoices = choices.filter(choice => 
    ["Film/Animasi", "Desain/Fotografi"].includes(choice));
  
  const writingChoices = choices.filter(choice => 
    ["Penulisan Kreatif"].includes(choice));
  
  const traditionalChoices = choices.filter(choice => 
    ["Seni Tradisional", "Kerajinan Tangan"].includes(choice));
  
  const specializedChoices = choices.filter(choice => 
    ["Seni Kontemporer", "Seni Keagamaan", "Seni Kuliner", "Pendidikan Seni", "Terapi Seni"].includes(choice));
  
  // Buat analisis berdasarkan kombinasi pilihan
  let analysis = "Berdasarkan pilihan Anda, ";
  
  if (choices.length >= 4) {
    analysis += "Anda memiliki minat yang luas dalam dunia seni dan hiburan. ";
  }
  
  if (musicChoices.length > 0) {
    analysis += "Anda memiliki hasrat untuk musik dan ekspresi melalui suara. ";
  }
  
  if (visualArtsChoices.length > 0) {
    analysis += "Anda tertarik pada seni visual dan ekspresi melalui gambar dan bentuk. ";
  }
  
  if (performingArtsChoices.length > 0) {
    analysis += "Anda memiliki minat dalam seni pertunjukan dan ekspresi melalui gerakan dan akting. ";
  }
  
  if (mediaArtsChoices.length > 0) {
    analysis += "Anda tertarik pada seni media dan bercerita melalui film atau fotografi. ";
  }
  
  if (writingChoices.length > 0) {
    analysis += "Anda memiliki hasrat untuk menulis dan bercerita melalui kata-kata. ";
  }
  
  if (traditionalChoices.length > 0) {
    analysis += "Anda menghargai seni tradisional dan kerajinan tangan. ";
  }
  
  if (specializedChoices.length > 0) {
    analysis += "Anda tertarik pada bentuk seni khusus atau aplikasi seni untuk tujuan tertentu. ";
  }
  
  // Tambahkan rekomendasi
  analysis += "\n\nRekomendasi: Pertimbangkan untuk terlibat dalam ";
  
  if (choices.length > 0) {
    const primaryChoice = choices[0];
    analysis += `bidang ${primaryChoice} sebagai fokus utama, `;
    
    if (choices.length > 1) {
      const secondaryChoice = choices[1];
      analysis += `dengan ${secondaryChoice} sebagai area pendukung. `;
    } else {
      analysis += "dan terus mengembangkan keterampilan dan gaya unik Anda. ";
    }
  } else {
    analysis += "berbagai bentuk seni untuk menemukan area yang paling sesuai dengan hasrat hati Anda. ";
  }
  
  return analysis;
}

// Fungsi untuk menganalisis pilihan area bisnis dan ekonomi
export function analyzeBusinessChoices(choices: string[]): string {
  // Kelompokkan pilihan berdasarkan kategori
  const entrepreneurshipChoices = choices.filter(choice => 
    ["Kewirausahaan", "E-commerce/Bisnis Digital", "Ekonomi Kreatif"].includes(choice));
  
  const financeChoices = choices.filter(choice => 
    ["Keuangan/Investasi", "Ekonomi Syariah"].includes(choice));
  
  const managementChoices = choices.filter(choice => 
    ["Manajemen/Kepemimpinan", "Pengembangan Organisasi", "Konsultasi Bisnis"].includes(choice));
  
  const marketingChoices = choices.filter(choice => 
    ["Pemasaran/Penjualan", "Retail/Ritel"].includes(choice));
  
  const techChoices = choices.filter(choice => 
    ["Teknologi/Inovasi"].includes(choice));
  
  const socialChoices = choices.filter(choice => 
    ["Bisnis Sosial/Berkelanjutan"].includes(choice));
  
  const industryChoices = choices.filter(choice => 
    ["Industri Manufaktur", "Agribisnis", "Properti/Real Estate", "Pariwisata/Hospitality", "Perdagangan Internasional"].includes(choice));
  
  // Buat analisis berdasarkan kombinasi pilihan
  let analysis = "Berdasarkan pilihan Anda, ";
  
  if (choices.length >= 4) {
    analysis += "Anda memiliki minat yang luas dalam dunia bisnis dan ekonomi. ";
  }
  
  if (entrepreneurshipChoices.length > 0) {
    analysis += "Anda memiliki jiwa kewirausahaan dan keinginan untuk menciptakan bisnis atau inovasi baru. ";
  }
  
  if (financeChoices.length > 0) {
    analysis += "Anda tertarik pada aspek keuangan dan investasi dalam bisnis. ";
  }
  
  if (managementChoices.length > 0) {
    analysis += "Anda memiliki bakat kepemimpinan dan minat dalam mengelola organisasi. ";
  }
  
  if (marketingChoices.length > 0) {
    analysis += "Anda tertarik pada strategi pemasaran dan penjualan. ";
  }
  
  if (techChoices.length > 0) {
    analysis += "Anda memiliki minat dalam teknologi dan inovasi bisnis. ";
  }
  
  if (socialChoices.length > 0) {
    analysis += "Anda peduli dengan dampak sosial dan keberlanjutan dalam bisnis. ";
  }
  
  if (industryChoices.length > 0) {
    analysis += "Anda tertarik pada industri atau sektor bisnis tertentu. ";
  }
  
  // Tambahkan rekomendasi
  analysis += "\n\nRekomendasi: Pertimbangkan untuk terlibat dalam ";
  
  if (choices.length > 0) {
    const primaryChoice = choices[0];
    analysis += `bidang ${primaryChoice} sebagai fokus utama, `;
    
    if (choices.length > 1) {
      const secondaryChoice = choices[1];
      analysis += `dengan ${secondaryChoice} sebagai area pendukung. `;
    } else {
      analysis += "dan cari mentor atau pelatihan yang dapat mempercepat perkembangan Anda di bidang ini. ";
    }
  } else {
    analysis += "berbagai aspek bisnis untuk menemukan area yang paling sesuai dengan hasrat hati Anda. ";
  }
  
  return analysis;
}
