// Fungsi untuk menganalisis pengalaman
import { CategoryScore } from "../types/shape-types";
import { analyzeReflectiveAnswer } from "./reflective-analyzer";

/**
 * Menganalisis jawaban kuesioner pengalaman
 * @param data Jawaban kuesioner
 * @param experiencesCategories Kategori pengalaman
 * @param experiencesQuestions Pertanyaan pengalaman
 * @returns Array skor kategori
 */
export function analyzeExperiences(
  data: any,
  experiencesCategories: Record<string, string>,
  experiencesQuestions: any[]
): CategoryScore[] {
  const results: CategoryScore[] = [];
  const textAnswers: Record<string, string> = {};
  const multipleChoiceAnswers: Record<string, string[]> = {};
  const allTextAnswers: string[] = [];

  // Check if data is in the new format (with raw_answers)
  const answers =
    data && typeof data === "object" && data.raw_answers
      ? data.raw_answers
      : data;

  // Process each answer
  Object.entries(answers || {}).forEach(([questionId, value]) => {
    const questionIdNum = Number.parseInt(questionId);
    const question = experiencesQuestions.find((q) => q.id === questionIdNum);

    if (!question) return;

    // Process based on question type
    if (question.type === "open" && typeof value === "string" && value.trim()) {
      // Store open text answers
      textAnswers[questionId] = value;
      allTextAnswers.push(value);
    } else if (
      question.type === "multiple" &&
      Array.isArray(value) &&
      value.length > 0
    ) {
      // Store multiple choice answers
      multipleChoiceAnswers[questionId] = value;
    }
  });

  // Process open text answers
  Object.entries(textAnswers).forEach(([questionId, answer]) => {
    const questionIdNum = Number.parseInt(questionId);
    const question = experiencesQuestions.find((q) => q.id === questionIdNum);

    if (question && question.subcategory) {
      // Analyze the text
      const analysis = analyzeReflectiveAnswer(answer);

      // Add to results
      results.push({
        category:
          experiencesCategories[
            question.subcategory as keyof typeof experiencesCategories
          ],
        content: answer,
        score: 5,
        percentage: 100,
        type: "open" as const,
        metadata: {
          themes: analysis.themes,
          keywords: analysis.keywords,
          sentiment: analysis.sentiment,
          length: analysis.length,
        },
      });

      // Add insights based on the analysis
      if (analysis.themes.length > 0) {
        results.push({
          category: `Insight: ${
            experiencesCategories[
              question.subcategory as keyof typeof experiencesCategories
            ]
          }`,
          description: `Tema utama dalam jawaban Anda: ${analysis.themes.join(
            ", "
          )}`,
          score: 4.5,
          percentage: 90,
          type: "insight" as const,
        });
      }

      // Add sentiment-based insights
      if (analysis.sentiment === "positive") {
        results.push({
          category: `Refleksi Positif: ${
            experiencesCategories[
              question.subcategory as keyof typeof experiencesCategories
            ]
          }`,
          description:
            "Anda memiliki pandangan positif tentang pengalaman ini, yang menunjukkan kekuatan dan ketahanan.",
          score: 4.8,
          percentage: 96,
          type: "insight" as const,
        });
      } else if (analysis.sentiment === "negative") {
        results.push({
          category: `Area Pertumbuhan: ${
            experiencesCategories[
              question.subcategory as keyof typeof experiencesCategories
            ]
          }`,
          description:
            "Pengalaman ini mungkin menantang, tetapi dapat menjadi sumber kekuatan dan kebijaksanaan.",
          score: 4.2,
          percentage: 84,
          type: "insight" as const,
        });
      }
    }
  });

  // Process multiple choice answers
  Object.entries(multipleChoiceAnswers).forEach(([questionId, choices]) => {
    const questionIdNum = Number.parseInt(questionId);
    const question = experiencesQuestions.find((q) => q.id === questionIdNum);

    if (question && question.subcategory) {
      // Add to results
      results.push({
        category:
          experiencesCategories[
            question.subcategory as keyof typeof experiencesCategories
          ],
        description: choices.join(", "),
        score: 4.5,
        percentage: 90,
        type: "multiple" as const,
      });

      // Add specific insights based on the question
      if (questionIdNum === 83) {
        // Professional experience
        results.push({
          category: "Insight: Pengalaman Profesional",
          description: `Pengalaman profesional Anda di bidang ${choices.join(
            ", "
          )} dapat menjadi aset berharga dalam pelayanan.`,
          score: 4.3,
          percentage: 86,
          type: "insight" as const,
        });
      } else if (questionIdNum === 84) {
        // Leadership roles
        if (choices.includes("Tidak Ada")) {
          results.push({
            category: "Insight: Pengalaman Kepemimpinan",
            description:
              "Meskipun Anda belum memiliki pengalaman kepemimpinan formal, Anda dapat mengembangkan keterampilan ini melalui pelatihan dan mentoring.",
            score: 3.5,
            percentage: 70,
            type: "insight" as const,
          });
        } else {
          results.push({
            category: "Insight: Pengalaman Kepemimpinan",
            description: `Pengalaman kepemimpinan Anda sebagai ${choices.join(
              ", "
            )} memberikan fondasi yang kuat untuk peran kepemimpinan di masa depan.`,
            score: 4.7,
            percentage: 94,
            type: "insight" as const,
          });
        }
      } else if (questionIdNum === 87) {
        // Ministry types
        results.push({
          category: "Insight: Jenis Pelayanan",
          description: `Pengalaman pelayanan Anda dalam ${choices.join(
            ", "
          )} menunjukkan area di mana Anda dapat berkontribusi secara efektif.`,
          score: 4.6,
          percentage: 92,
          type: "insight" as const,
        });
      }
    }
  });

  // Analyze all text answers together for comprehensive insights
  if (allTextAnswers.length > 0) {
    const combinedText = allTextAnswers.join(" ");
    const combinedAnalysis = analyzeReflectiveAnswer(combinedText);

    // Generate personalized comprehensive insights based on themes and spheres
    let insightDescription = "";

    // Insights based on themes
    if (combinedAnalysis.themes.length > 0) {
      // Personalized insight based on dominant themes
      if (combinedAnalysis.themes.includes("leadership")) {
        insightDescription +=
          "Pengalaman kepemimpinan Anda telah membentuk kemampuan Anda untuk mengarahkan dan mempengaruhi orang lain dengan bijaksana. ";
      }
      if (combinedAnalysis.themes.includes("service")) {
        insightDescription +=
          "Anda memiliki sejarah melayani orang lain, yang menunjukkan hati yang peduli dan keinginan untuk membuat perbedaan positif dalam kehidupan mereka. ";
      }
      if (combinedAnalysis.themes.includes("teaching")) {
        insightDescription +=
          "Pengalaman mengajar dan membimbing orang lain telah mengembangkan kemampuan Anda untuk menjelaskan konsep dengan jelas dan membantu orang lain bertumbuh. ";
      }
      if (combinedAnalysis.themes.includes("resilience")) {
        insightDescription +=
          "Anda telah menunjukkan ketahanan yang luar biasa dalam menghadapi tantangan, yang memberi Anda kredibilitas saat membantu orang lain melalui kesulitan mereka sendiri. ";
      }
      if (combinedAnalysis.themes.includes("spiritual")) {
        insightDescription +=
          "Perjalanan spiritual Anda telah memperdalam pemahaman Anda tentang iman dan hubungan dengan Tuhan, memberikan fondasi kuat untuk pelayanan Anda. ";
      }
      if (combinedAnalysis.themes.includes("growth")) {
        insightDescription +=
          "Anda memiliki pola pertumbuhan dan pengembangan diri yang konsisten, yang menunjukkan komitmen untuk terus belajar dan berkembang sepanjang hidup Anda. ";
      }
      if (combinedAnalysis.themes.includes("compassion")) {
        insightDescription +=
          "Belas kasihan dan empati adalah tema yang menonjol dalam pengalaman Anda, menunjukkan hati yang peka terhadap kebutuhan dan penderitaan orang lain. ";
      }
      if (combinedAnalysis.themes.includes("innovation")) {
        insightDescription +=
          "Anda memiliki sejarah berpikir kreatif dan inovatif, yang memungkinkan Anda melihat solusi segar untuk masalah yang mungkin tidak dilihat orang lain. ";
      }
      if (combinedAnalysis.themes.includes("community")) {
        insightDescription +=
          "Pengalaman Anda dalam membangun dan memelihara komunitas menunjukkan kemampuan untuk menghubungkan orang dan menciptakan rasa kebersamaan. ";
      }
      if (combinedAnalysis.themes.includes("justice")) {
        insightDescription +=
          "Kepedulian Anda terhadap keadilan dan kesetaraan menunjukkan komitmen untuk membela mereka yang terpinggirkan dan memperjuangkan perubahan positif. ";
      }
    }

    // Add insights based on spheres of influence
    if (combinedAnalysis.spheres.length > 0) {
      if (combinedAnalysis.spheres.includes("religion")) {
        insightDescription +=
          "Pengalaman Anda dalam konteks keagamaan telah membentuk pemahaman spiritual Anda dan memberikan dasar untuk pelayanan berbasis iman. ";
      }
      if (combinedAnalysis.spheres.includes("family")) {
        insightDescription +=
          "Pengalaman keluarga Anda telah membentuk nilai-nilai inti dan memberikan wawasan tentang dinamika hubungan yang dapat Anda terapkan dalam pelayanan. ";
      }
      if (combinedAnalysis.spheres.includes("education")) {
        insightDescription +=
          "Latar belakang pendidikan Anda telah mengembangkan kemampuan analitis dan keterampilan komunikasi yang berharga dalam berbagai konteks pelayanan. ";
      }
      if (combinedAnalysis.spheres.includes("government")) {
        insightDescription +=
          "Pengalaman Anda terkait dengan pemerintahan atau kebijakan publik memberikan perspektif unik tentang bagaimana perubahan sistemik dapat terjadi. ";
      }
      if (combinedAnalysis.spheres.includes("media")) {
        insightDescription +=
          "Pengalaman Anda dengan media dan komunikasi telah mengembangkan kemampuan Anda untuk menyampaikan pesan dengan efektif dan menjangkau audiens yang lebih luas. ";
      }
      if (combinedAnalysis.spheres.includes("arts")) {
        insightDescription +=
          "Keterlibatan Anda dengan seni dan kreativitas telah mengembangkan kemampuan Anda untuk mengekspresikan kebenaran dengan cara yang menarik dan menyentuh hati. ";
      }
      if (combinedAnalysis.spheres.includes("business")) {
        insightDescription +=
          "Pengalaman bisnis Anda telah mengembangkan keterampilan organisasi dan strategis yang dapat meningkatkan efektivitas pelayanan Anda. ";
      }
      if (combinedAnalysis.spheres.includes("helping")) {
        insightDescription +=
          "Sejarah Anda dalam membantu orang lain menunjukkan komitmen untuk membuat perbedaan praktis dalam kehidupan mereka yang membutuhkan. ";
      }
    }

    // Add insights based on sentiment
    if (combinedAnalysis.sentiment === "positive") {
      insightDescription +=
        "Pandangan positif Anda terhadap pengalaman hidup mencerminkan sikap optimis yang dapat menginspirasi orang lain dalam perjalanan mereka sendiri. ";
    } else if (combinedAnalysis.sentiment === "negative") {
      insightDescription +=
        "Kemampuan Anda untuk menavigasi pengalaman yang menantang telah membangun ketahanan dan kebijaksanaan yang dapat membantu orang lain menghadapi kesulitan serupa. ";
    }

    // Add insights based on keywords if we have them
    if (combinedAnalysis.keywords && combinedAnalysis.keywords.length > 0) {
      // Select a few keywords that might be meaningful
      const significantKeywords = combinedAnalysis.keywords
        .filter((word) => word.length > 5) // Focus on longer, potentially more meaningful words
        .slice(0, 3); // Take just a few

      if (significantKeywords.length > 0) {
        insightDescription += `Kata-kata kunci seperti "${significantKeywords.join(
          '", "'
        )}" dalam refleksi Anda menunjukkan area fokus dan nilai yang penting bagi Anda. `;
      }
    }

    // Add default text if no specific themes were identified
    if (!insightDescription) {
      insightDescription = `Berdasarkan semua pengalaman Anda, tema utama yang muncul adalah ${combinedAnalysis.themes.join(
        ", "
      )}. `;
    }

    // Add general conclusion
    insightDescription +=
      "Pengalaman-pengalaman ini telah membentuk Anda secara unik dan mempersiapkan Anda untuk melayani dengan cara yang otentik dan bermakna.";

    // Add comprehensive insights
    results.push({
      category: "Wawasan Komprehensif Pengalaman",
      description: insightDescription,
      score: 5,
      percentage: 100,
      type: "comprehensive" as const,
      metadata: {
        themes: combinedAnalysis.themes,
        keywords: combinedAnalysis.keywords,
        sentiment: combinedAnalysis.sentiment,
      },
    });

    // Generate personalized recommendations based on sentiment, themes, and spheres
    let recommendationDescription = "";

    // Recommendations based on sentiment
    if (combinedAnalysis.sentiment === "positive") {
      recommendationDescription +=
        "Energi positif dalam refleksi Anda menunjukkan antusiasme yang dapat menjadi kekuatan dalam pelayanan Anda. Gunakan optimisme ini untuk menginspirasi dan memotivasi orang lain. ";
    } else if (combinedAnalysis.sentiment === "negative") {
      recommendationDescription +=
        "Tantangan yang Anda alami telah memberikan kebijaksanaan yang berharga yang dapat membantu orang lain menghadapi kesulitan serupa. Pertimbangkan untuk berbagi cerita transformasi Anda untuk memberikan harapan kepada mereka yang berjuang. ";
    } else {
      recommendationDescription +=
        "Perspektif seimbang Anda memungkinkan Anda untuk melihat situasi dari berbagai sudut pandang. Gunakan kemampuan ini untuk membantu orang lain melihat gambaran yang lebih lengkap dalam situasi kompleks. ";
    }

    // Recommendations based on themes
    if (combinedAnalysis.themes.includes("leadership")) {
      recommendationDescription +=
        "Pertimbangkan peran kepemimpinan di mana Anda dapat membimbing dan menginspirasi orang lain. Anda dapat memimpin kelompok kecil, proyek pelayanan, atau inisiatif yang selaras dengan hasrat hati Anda. ";
    }
    if (combinedAnalysis.themes.includes("teaching")) {
      recommendationDescription +=
        "Cari kesempatan untuk berbagi pengetahuan dan wawasan Anda melalui mengajar atau mentoring. Pertimbangkan untuk mengembangkan kursus, workshop, atau sesi pelatihan dalam area keahlian Anda. ";
    }
    if (combinedAnalysis.themes.includes("service")) {
      recommendationDescription +=
        "Teruslah mencari cara untuk melayani orang lain dengan menggunakan kekuatan dan hasrat Anda. Identifikasi kebutuhan spesifik di komunitas Anda dan kembangkan cara kreatif untuk memenuhinya. ";
    }
    if (combinedAnalysis.themes.includes("spiritual")) {
      recommendationDescription +=
        "Bagikan perjalanan spiritual Anda untuk membimbing orang lain dalam pertumbuhan iman mereka. Pertimbangkan untuk memfasilitasi kelompok studi Alkitab, kelompok doa, atau retret spiritual. ";
    }
    if (combinedAnalysis.themes.includes("compassion")) {
      recommendationDescription +=
        "Gunakan empati dan belas kasihan Anda untuk mendukung mereka yang mengalami kesulitan. Pertimbangkan pelayanan konseling, pendampingan, atau dukungan krisis. ";
    }
    if (combinedAnalysis.themes.includes("innovation")) {
      recommendationDescription +=
        "Manfaatkan kreativitas dan inovasi Anda untuk mengembangkan pendekatan baru dalam pelayanan. Jangan takut untuk mencoba ide-ide segar yang dapat menjangkau orang dengan cara yang belum pernah dilakukan sebelumnya. ";
    }
    if (combinedAnalysis.themes.includes("community")) {
      recommendationDescription +=
        "Gunakan kemampuan Anda dalam membangun komunitas untuk menciptakan lingkungan yang inklusif dan mendukung. Pertimbangkan untuk memfasilitasi kelompok koneksi atau acara yang memperkuat hubungan antar anggota komunitas. ";
    }
    if (combinedAnalysis.themes.includes("justice")) {
      recommendationDescription +=
        "Saluran kepedulian Anda terhadap keadilan ke dalam advokasi dan aksi sosial. Identifikasi isu-isu di komunitas Anda di mana Anda dapat membuat perbedaan dan bekerja untuk perubahan positif. ";
    }
    if (combinedAnalysis.themes.includes("resilience")) {
      recommendationDescription +=
        "Bagikan kisah ketahanan Anda untuk menginspirasi orang lain yang menghadapi kesulitan. Pertimbangkan untuk menjadi mentor bagi mereka yang sedang dalam masa sulit dan membutuhkan panduan. ";
    }
    if (combinedAnalysis.themes.includes("growth")) {
      recommendationDescription +=
        "Dorong pertumbuhan dalam diri orang lain dengan berbagi perjalanan pengembangan pribadi Anda. Pertimbangkan untuk memfasilitasi kelompok atau program yang berfokus pada pertumbuhan holistik. ";
    }

    // Recommendations based on spheres of influence
    if (combinedAnalysis.spheres.includes("religion")) {
      recommendationDescription +=
        "Pertimbangkan pelayanan dalam konteks gereja atau organisasi berbasis iman yang selaras dengan karunia dan hasrat Anda. ";
    }
    if (combinedAnalysis.spheres.includes("family")) {
      recommendationDescription +=
        "Gunakan wawasan Anda tentang dinamika keluarga untuk mendukung dan memperkuat keluarga lain melalui mentoring, konseling, atau program pendidikan. ";
    }
    if (combinedAnalysis.spheres.includes("education")) {
      recommendationDescription +=
        "Pertimbangkan peran dalam pendidikan formal atau informal di mana Anda dapat membagikan pengetahuan dan membentuk generasi berikutnya. ";
    }
    if (combinedAnalysis.spheres.includes("government")) {
      recommendationDescription +=
        "Gunakan pemahaman Anda tentang sistem dan kebijakan untuk advokasi atau pelayanan masyarakat yang mempromosikan kebaikan bersama. ";
    }
    if (combinedAnalysis.spheres.includes("media")) {
      recommendationDescription +=
        "Pertimbangkan untuk menggunakan platform media untuk menyebarkan pesan positif dan nilai-nilai yang Anda yakini. ";
    }
    if (combinedAnalysis.spheres.includes("arts")) {
      recommendationDescription +=
        "Gunakan kreativitas artistik Anda untuk mengekspresikan kebenaran dan nilai-nilai dengan cara yang menyentuh hati dan pikiran. ";
    }
    if (combinedAnalysis.spheres.includes("business")) {
      recommendationDescription +=
        "Pertimbangkan bagaimana prinsip bisnis dan keterampilan organisasi Anda dapat diterapkan untuk meningkatkan efektivitas pelayanan atau organisasi nirlaba. ";
    }
    if (combinedAnalysis.spheres.includes("helping")) {
      recommendationDescription +=
        "Teruslah mengembangkan keterampilan Anda dalam membantu orang lain dan cari peluang untuk melayani mereka yang paling membutuhkan. ";
    }

    // Add general recommendation
    recommendationDescription +=
      "Pengalaman hidup Anda adalah alat yang berharga untuk membantu orang lain yang mungkin menghadapi situasi serupa. Gunakan cerita dan pelajaran dari pengalaman Anda untuk membuat dampak positif dan bermakna dalam kehidupan orang lain.";

    // Add recommendations
    results.push({
      category: "Rekomendasi Berdasarkan Pengalaman",
      description: recommendationDescription,
      score: 4.8,
      percentage: 96,
      type: "recommendation" as const,
      metadata: {
        themes: combinedAnalysis.themes,
        sentiment: combinedAnalysis.sentiment,
      },
    });
  }

  return results;
}
