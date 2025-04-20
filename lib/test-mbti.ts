// File pengujian untuk analisis MBTI

import { getMBTIAnalysis, getMBTIMinistryRecommendations, getMBTICareerRecommendations } from './mbti-analysis-complete';

// Fungsi untuk menguji analisis MBTI
function testMBTIAnalysis() {
  // Uji semua 16 tipe MBTI
  const mbtiTypes = [
    'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
    'ISTP', 'ISFP', 'INFP', 'INTP',
    'ESTP', 'ESFP', 'ENFP', 'ENTP',
    'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
  ];

  console.log('=== PENGUJIAN ANALISIS MBTI ===');
  
  // Uji setiap tipe MBTI
  mbtiTypes.forEach(type => {
    const analysis = getMBTIAnalysis(type);
    
    if (analysis) {
      console.log(`\n--- ${type}: ${analysis.title} ---`);
      console.log(`Deskripsi: ${analysis.description.general}`);
      console.log(`Nilai Inti: ${analysis.description.coreValues}`);
      
      console.log('\nKemampuan Dominan:');
      analysis.strengths.dominantAbilities.forEach((ability, index) => {
        console.log(`${index + 1}. ${ability.title}: ${ability.description}`);
      });
      
      console.log('\nRekomendasi Pelayanan:');
      analysis.recommendations.ministry.forEach((ministry, index) => {
        console.log(`${index + 1}. ${ministry}`);
      });
      
      console.log('\nRekomendasi Karir:');
      analysis.recommendations.career.forEach((career, index) => {
        console.log(`${index + 1}. ${career}`);
      });
    } else {
      console.error(`ERROR: Tidak ada analisis untuk tipe ${type}`);
    }
  });
}

// Fungsi untuk menguji rekomendasi pelayanan
function testMinistryRecommendations() {
  console.log('\n=== PENGUJIAN REKOMENDASI PELAYANAN ===');
  
  const enfj = getMBTIMinistryRecommendations('ENFJ');
  console.log('Rekomendasi Pelayanan untuk ENFJ:');
  enfj.forEach((rec, index) => console.log(`${index + 1}. ${rec}`));
  
  const istj = getMBTIMinistryRecommendations('ISTJ');
  console.log('\nRekomendasi Pelayanan untuk ISTJ:');
  istj.forEach((rec, index) => console.log(`${index + 1}. ${rec}`));
}

// Fungsi untuk menguji rekomendasi karir
function testCareerRecommendations() {
  console.log('\n=== PENGUJIAN REKOMENDASI KARIR ===');
  
  const enfj = getMBTICareerRecommendations('ENFJ');
  console.log('Rekomendasi Karir untuk ENFJ:');
  enfj.forEach((rec, index) => console.log(`${index + 1}. ${rec}`));
  
  const istj = getMBTICareerRecommendations('ISTJ');
  console.log('\nRekomendasi Karir untuk ISTJ:');
  istj.forEach((rec, index) => console.log(`${index + 1}. ${rec}`));
}

// Jalankan pengujian
console.log('Memulai pengujian analisis MBTI...\n');
testMBTIAnalysis();
testMinistryRecommendations();
testCareerRecommendations();
console.log('\nPengujian selesai!');
