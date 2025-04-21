"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ShapeRadarChart } from "@/components/shape-radar-chart"
import { ResultsChart } from "@/components/results-chart"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { ReflectiveInsightsSection } from "@/components/reflective-insights-section"
import { ReflectiveOverviewSection } from "@/components/reflective-overview-section"
import type { CategoryScore, ShapeRecommendations } from "@/lib/shape-analyzer-adapter"

interface ShapeResultsTabsProps {
  spiritualGifts: CategoryScore[]
  heartDesire: CategoryScore[]
  personality: CategoryScore[]
  experiences: CategoryScore[]
  recommendations: ShapeRecommendations
}

export function ShapeResultsTabs({
  spiritualGifts,
  heartDesire,
  personality,
  experiences,
  recommendations,
}: ShapeResultsTabsProps) {
  // Get abilities from personality results
  const abilities = personality.filter(item => item.category.includes("Kemampuan:"))

  // Get personality type results
  const personalityTypes = personality.filter(item => !item.category.includes("Kemampuan:"))

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-6">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="spiritual">Spiritual</TabsTrigger>
        <TabsTrigger value="heart">Heart</TabsTrigger>
        <TabsTrigger value="personality">Personality</TabsTrigger>
        <TabsTrigger value="experiences">Experiences</TabsTrigger>
        <TabsTrigger value="development">Development</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Your SHAPE Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <ShapeRadarChart
              spiritualGifts={spiritualGifts}
              heartDesire={heartDesire}
              personality={personality}
              experiences={experiences}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Purpose Statement</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">{recommendations.purposeStatement}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SHAPE Synergy</CardTitle>
            <CardDescription>Bagaimana komponen SHAPE Anda saling melengkapi</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {recommendations.shapeSynergy.map((synergy: string, index: number) => (
                <li key={index}>{synergy}</li>
              ))}
            </ul>

            {recommendations.shapeProfile?.personality?.analysis && recommendations.shapeProfile.personality.analysis.shapeIntegration && (
              <div className="mt-4 border-t pt-4">
                <h4 className="font-medium mb-2">Integrasi SHAPE Berdasarkan Tipe Kepribadian</h4>
                <div className="space-y-3 text-sm">
                  {recommendations.shapeProfile.personality.analysis.shapeIntegration.spiritualGifts && (
                    <p>
                      <span className="font-semibold">Spiritual Gifts + {recommendations.shapeProfile.personality.type}:</span>{' '}
                      {recommendations.shapeProfile.personality.analysis.shapeIntegration.spiritualGifts}
                    </p>
                  )}
                  {recommendations.shapeProfile.personality.analysis.shapeIntegration.heartDesire && (
                    <p>
                      <span className="font-semibold">Heart Desire + {recommendations.shapeProfile.personality.type}:</span>{' '}
                      {recommendations.shapeProfile.personality.analysis.shapeIntegration.heartDesire}
                    </p>
                  )}
                  {recommendations.shapeProfile.personality.analysis.shapeIntegration.abilities && (
                    <p>
                      <span className="font-semibold">Abilities + {recommendations.shapeProfile.personality.type}:</span>{' '}
                      {recommendations.shapeProfile.personality.analysis.shapeIntegration.abilities}
                    </p>
                  )}
                  {recommendations.shapeProfile.personality.analysis.shapeIntegration.experiences && (
                    <p>
                      <span className="font-semibold">Experiences + {recommendations.shapeProfile.personality.type}:</span>{' '}
                      {recommendations.shapeProfile.personality.analysis.shapeIntegration.experiences}
                    </p>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Saran Pribadi</CardTitle>
            <CardDescription>Saran khusus berdasarkan profil SHAPE Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {Array.isArray(recommendations.personalizedAdvice)
                ? recommendations.personalizedAdvice.map((advice: string, index: number) => (
                    <li key={index}>{advice}</li>
                  ))
                : <li>{recommendations.personalizedAdvice}</li>
              }
            </ul>
          </CardContent>
        </Card>

        {recommendations.shapeProfile?.reflectiveInsights && (
          <ReflectiveOverviewSection reflectiveInsights={recommendations.shapeProfile.reflectiveInsights} />
        )}
      </TabsContent>

      <TabsContent value="development" className="p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Strengths & Weaknesses</CardTitle>
            <CardDescription>Kekuatan dan area pengembangan berdasarkan profil SHAPE Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="strengths">
                <AccordionTrigger>
                  <div className="flex items-center">
                    <Badge variant="outline" className="bg-green-50 text-green-700 mr-2">Strengths</Badge>
                    <span>Kekuatan Anda</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc list-inside space-y-2">
                    {recommendations.strengthsWeaknesses.strengths.map((strength: string, index: number) => (
                      <li key={index}>{strength}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="weaknesses">
                <AccordionTrigger>
                  <div className="flex items-center">
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 mr-2">Growth Areas</Badge>
                    <span>Area Pengembangan Anda</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc list-inside space-y-2">
                    {recommendations.strengthsWeaknesses.weaknesses.map((weakness: string, index: number) => (
                      <li key={index}>{weakness}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Learning Pathways</CardTitle>
            <CardDescription>Jalur pembelajaran yang direkomendasikan untuk mengembangkan potensi Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {recommendations.learningPathways.map((pathway: string, index: number) => (
                <li key={index}>{pathway}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Community Roles</CardTitle>
            <CardDescription>Peran yang cocok untuk Anda dalam komunitas berdasarkan profil SHAPE</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {recommendations.communityRoles.map((role: string, index: number) => (
                <li key={index}>{role}</li>
              ))}
            </ul>

            {recommendations.shapeProfile?.personality?.analysis?.recommendations && (
              <div className="mt-4 border-t pt-4">
                <h4 className="font-medium mb-2">Rekomendasi Berdasarkan Tipe Kepribadian</h4>

                <div className="space-y-4">
                  {recommendations.shapeProfile.personality.analysis.recommendations.ministry && (
                    <div>
                      <h5 className="text-sm font-medium">Pelayanan yang Direkomendasikan:</h5>
                      <ul className="list-disc list-inside text-sm text-muted-foreground mt-1">
                        {recommendations.shapeProfile.personality.analysis.recommendations.ministry.map((ministry, idx) => (
                          <li key={idx}>{ministry}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {recommendations.shapeProfile.personality.analysis.recommendations.specificExamples && (
                    <div>
                      <h5 className="text-sm font-medium">Contoh Spesifik:</h5>
                      <ul className="list-disc list-inside text-sm text-muted-foreground mt-1">
                        {recommendations.shapeProfile.personality.analysis.recommendations.specificExamples.map((example, idx) => (
                          <li key={idx}>{example}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {recommendations.shapeProfile.personality.analysis.recommendations.career && (
                    <div>
                      <h5 className="text-sm font-medium">Karir yang Cocok:</h5>
                      <ul className="list-disc list-inside text-sm text-muted-foreground mt-1">
                        {recommendations.shapeProfile.personality.analysis.recommendations.career.map((career, idx) => (
                          <li key={idx}>{career}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Development Recommendations</CardTitle>
            <CardDescription>Rekomendasi pengembangan diri berdasarkan profil SHAPE Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {recommendations.developmentRecommendations.map((rec: string, index: number) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>

            {recommendations.shapeProfile?.personality?.analysis?.developmentTips && (
              <div className="mt-4 border-t pt-4">
                <h4 className="font-medium mb-2">Tips Pengembangan Berdasarkan Tipe Kepribadian</h4>
                <div className="space-y-3">
                  {recommendations.shapeProfile.personality.analysis.developmentTips.map((tip, index) => (
                    <div key={index} className="ml-2">
                      <p className="font-medium text-sm">{tip.title || 'Tip ' + (index + 1)}</p>
                      <p className="text-sm text-muted-foreground">{tip.description || 'Tidak ada deskripsi'}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bible Verse</CardTitle>
            <CardDescription>Ayat Alkitab yang relevan dengan profil SHAPE Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 border rounded-lg bg-slate-50">
              <p className="italic text-center">"{recommendations.bibleVerse}"</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="spiritual" className="p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Spiritual Gifts</CardTitle>
          </CardHeader>
          <CardContent>
            <ResultsChart data={spiritualGifts} title="" colorClass="bg-green-500" />

            <div className="mt-6">
              <h4 className="text-lg font-bold mb-2">What are Spiritual Gifts?</h4>
              <p className="text-muted-foreground">
                Karunia rohani adalah kemampuan ilahi yang diberikan oleh Tuhan untuk melayani orang lain dan membangun gereja.
                Karunia ini dimaksudkan untuk digunakan bagi kebaikan bersama dan untuk memuliakan Tuhan.
              </p>

              <div className="mt-3 p-3 bg-slate-50 rounded-md">
                <p className="text-sm text-slate-700">
                  Alkitab menyebutkan berbagai karunia rohani dalam 1 Korintus 12, Roma 12, Efesus 4, dan 1 Petrus 4.
                  Karunia-karunia ini diberikan oleh Roh Kudus kepada setiap orang percaya untuk digunakan dalam pelayanan
                  dan untuk membangun tubuh Kristus. Penting untuk diingat bahwa karunia rohani berbeda dengan bakat alami,
                  meskipun keduanya dapat saling melengkapi.
                </p>
              </div>

              <h4 className="text-lg font-bold mt-4 mb-2">Your Top Spiritual Gifts</h4>
              <div className="space-y-4">
                {spiritualGifts.slice(0, 3).map((gift, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h5 className="font-bold">{gift.category}</h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      {getSpiritualGiftDescription(gift.category)}
                    </p>
                    <div className="mt-2 pt-2 border-t border-dashed border-slate-200">
                      <p className="text-xs text-slate-600">
                        <span className="font-medium">Bagaimana mengembangkan karunia ini: </span>
                        {gift.category.includes("Mengajar") ? "Pelajari Alkitab secara mendalam, ikuti kursus hermeneutika, dan cari kesempatan untuk mengajar dalam kelompok kecil. Kembangkan kemampuan komunikasi dan gunakan berbagai metode pengajaran untuk menjangkau berbagai gaya belajar." :
                        gift.category.includes("Melayani") ? "Identifikasi kebutuhan praktis di sekitar Anda, tawarkan bantuan tanpa diminta, dan kembangkan keterampilan praktis yang berguna. Bergabunglah dengan tim pelayanan di gereja dan belajar untuk melayani dengan sukacita tanpa mengharapkan pengakuan." :
                        gift.category.includes("Memimpin") ? "Pelajari prinsip kepemimpinan alkitabiah, cari mentor, dan ambil tanggung jawab kecil untuk memimpin. Kembangkan visi yang jelas, belajar mendelegasikan, dan latih kemampuan untuk memotivasi dan memberdayakan orang lain." :
                        gift.category.includes("Nubuat") ? "Pelajari Alkitab secara mendalam, kembangkan kepekaan terhadap Roh Kudus, dan latih keberanian untuk berbicara kebenaran. Belajar menyampaikan pesan dengan kasih dan pada waktu yang tepat, serta terbuka untuk koreksi dan bimbingan." :
                        gift.category.includes("Memberi") ? "Kembangkan pengelolaan keuangan yang bijak, pelajari tentang kebutuhan pelayanan, dan latih kemurahan hati secara konsisten. Tetapkan anggaran untuk memberi, cari informasi tentang pelayanan yang efektif, dan beri dengan sukacita dan tanpa pamrih." :
                        gift.category.includes("Kemurahan") ? "Kembangkan empati, pelajari tentang penderitaan manusia, dan cari kesempatan untuk melayani yang menderita. Latih keterampilan mendengarkan aktif, belajar tentang trauma dan pemulihan, dan jaga keseimbangan emosional Anda sendiri." :
                        gift.category.includes("Evangelisme") ? "Pelajari cara berbagi iman dengan efektif, kembangkan kepekaan terhadap peluang, dan latih mendengarkan aktif. Hafalkan ayat-ayat kunci, persiapkan kesaksian pribadi Anda, dan belajar menjawab pertanyaan umum tentang iman." :
                        gift.category.includes("Pengetahuan") ? "Pelajari Alkitab secara sistematis, ikuti kursus teologi, dan kembangkan disiplin penelitian. Bangun perpustakaan sumber daya yang baik, catat wawasan yang Anda peroleh, dan belajar cara membagikan pengetahuan dengan cara yang dapat diakses." :
                        gift.category.includes("Hikmat") ? "Pelajari Alkitab terutama kitab Amsal, kembangkan kebiasaan refleksi dan doa, dan carilah mentor yang bijaksana. Latih kemampuan untuk mendengarkan dengan seksama, tunda penilaian cepat, dan belajar dari pengalaman hidup Anda dan orang lain." :
                        gift.category.includes("Iman") ? "Latih kepercayaan pada Tuhan dalam hal-hal kecil, pelajari janji-janji Tuhan, dan catat kesaksian iman dalam hidup Anda. Kelilingi diri Anda dengan orang-orang beriman, ambil risiko iman yang dipimpin Tuhan, dan belajar dari tokoh-tokoh iman dalam Alkitab." :
                        gift.category.includes("Penyembuhan") ? "Kembangkan kehidupan doa yang mendalam, pelajari tentang penyembuhan holistik, dan latih kepekaan terhadap pimpinan Roh Kudus. Belajar tentang berbagai aspek kesehatan (fisik, emosional, spiritual), dan selalu berikan semua kemuliaan kepada Tuhan." :
                        gift.category.includes("Membimbing") ? "Pelajari prinsip pemuridan, kembangkan keterampilan mendengarkan, dan investasikan waktu dalam hubungan mentoring. Belajar tentang tahapan pertumbuhan rohani, kembangkan kesabaran, dan jadilah teladan dalam perjalanan iman Anda sendiri." :
                        gift.category.includes("Administrasi") ? "Kembangkan keterampilan organisasi, pelajari manajemen proyek, dan latih kemampuan delegasi yang efektif. Pelajari alat dan sistem yang meningkatkan efisiensi, kembangkan kemampuan komunikasi yang jelas, dan fokus pada melayani visi yang lebih besar." :
                        gift.category.includes("Bahasa") ? "Kembangkan disiplin doa pribadi, pelajari tentang karunia bahasa roh dalam Alkitab (1 Korintus 12-14), dan carilah komunitas yang mendukung penggunaan karunia ini. Gunakan karunia ini terutama dalam doa pribadi dan dengan bijaksana dalam ibadah bersama sesuai pedoman alkitabiah." :
                        gift.category.includes("Menafsirkan") ? "Kembangkan kepekaan terhadap Roh Kudus, pelajari konteks alkitabiah tentang penafsiran bahasa roh, dan latih dalam komunitas yang mendukung. Belajar membedakan antara pemahaman manusiawi dan penyingkapan ilahi, dan selalu uji penafsiran dengan Firman Tuhan." :
                        gift.category.includes("Membedakan") ? "Pelajari Alkitab secara mendalam, kembangkan kepekaan spiritual, dan latih kemampuan untuk menguji segala sesuatu berdasarkan Firman Tuhan. Belajar tentang doktrin yang sehat, kembangkan kerendahan hati, dan selalu cari konfirmasi dari pemimpin rohani yang dewasa." :
                        "Pelajari Alkitab untuk memahami karunia rohani, cari komunitas yang dapat membantu Anda mengembangkan karunia ini, dan mulailah dengan langkah-langkah kecil untuk menggunakan karunia Anda dalam pelayanan. Mintalah bimbingan dari pemimpin rohani yang dewasa dan teruslah bertumbuh melalui latihan dan penerapan praktis."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="heart" className="p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Heart Desire</CardTitle>
          </CardHeader>
          <CardContent>
            <ResultsChart data={heartDesire.filter(h => h.type === "scale" || h.type === "multiple")} title="" colorClass="bg-red-500" />

            <div className="mt-6">
              <h4 className="text-lg font-bold mb-2">What is Heart Desire?</h4>
              <p className="text-muted-foreground">
                Keinginan hati Anda mengungkapkan apa yang Anda cintai dan apa yang memotivasi Anda. Ini mewakili
                penyebab dan kelompok orang yang secara alami Anda pedulikan dan Anda bersemangat untuk layani.
              </p>

              <div className="mt-3 p-3 bg-slate-50 rounded-md">
                <p className="text-sm text-slate-700">
                  Alkitab mengatakan dalam Mazmur 37:4, "Bergembiralah karena TUHAN; maka Ia akan memberikan kepadamu
                  apa yang diinginkan hatimu." Keinginan hati yang selaras dengan kehendak Tuhan sering menjadi
                  petunjuk tentang bagaimana Anda dirancang untuk melayani. Hasrat dan minat Anda bukanlah kebetulan,
                  tetapi merupakan bagian dari rencana Tuhan untuk hidup Anda.
                </p>
              </div>

              <h4 className="text-lg font-bold mt-4 mb-2">Your Top Heart Desires</h4>
              <div className="space-y-4">
                {heartDesire.slice(0, 3).map((heart, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h5 className="font-bold">{heart.category}</h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      {getHeartDesireDescription(heart.category)}
                    </p>
                    <div className="mt-2 pt-2 border-t border-dashed border-slate-200">
                      <p className="text-xs text-slate-600">
                        <span className="font-medium">Cara mengembangkan hasrat ini: </span>
                        {heart.category === "Anak-anak" ? "Ikuti pelatihan pengembangan anak, baca buku tentang psikologi anak, dan mulai dengan melayani di sekolah minggu atau program anak. Kembangkan keterampilan bercerita yang menarik, pelajari cara berkomunikasi pada level anak, dan bangun hubungan dengan orang tua untuk mendukung pertumbuhan anak secara holistik." :
                        heart.category === "Remaja" ? "Pelajari tentang perkembangan remaja, bangun hubungan mentoring dengan beberapa remaja, dan libatkan diri dalam program pemuda. Jadilah pendengar yang baik, tetap update dengan tren dan tantangan yang dihadapi remaja saat ini, dan ciptakan lingkungan yang aman bagi mereka untuk mengeksplorasi iman mereka." :
                        heart.category === "Keluarga" ? "Ikuti seminar tentang keluarga, pelajari prinsip-prinsip alkitabiah tentang keluarga, dan tawarkan dukungan praktis untuk keluarga yang membutuhkan. Kembangkan program untuk memperkuat pernikahan, dukung orang tua tunggal, dan ciptakan kesempatan bagi keluarga untuk tumbuh bersama dalam iman." :
                        heart.category === "Lansia" ? "Luangkan waktu dengan lansia untuk belajar dari kebijaksanaan mereka, pelajari tentang tantangan yang dihadapi lansia, dan cari cara untuk menghormati dan melibatkan mereka. Bantu mereka merekam kisah hidup mereka, fasilitasi program antar generasi, dan dukung mereka dalam menghadapi perubahan hidup di masa tua." :
                        heart.category === "Pendidikan" ? "Kembangkan keterampilan mengajar, pelajari metode pendidikan yang efektif, dan cari kesempatan untuk berbagi pengetahuan Anda. Ciptakan sumber daya pendidikan yang dapat diakses oleh semua, mentori siswa yang membutuhkan bantuan tambahan, dan advokasi untuk pendidikan berkualitas bagi semua anak." :
                        heart.category === "Misi" ? "Pelajari tentang budaya dan kebutuhan kelompok yang ingin Anda jangkau, ikuti pelatihan misi, dan mulai dengan misi jangka pendek. Kembangkan keterampilan bahasa, bangun hubungan dengan misionaris berpengalaman, dan dukung misi melalui doa, pemberian, dan partisipasi langsung." :
                        heart.category === "Pelayanan Sosial" ? "Identifikasi kebutuhan di komunitas Anda, kembangkan keterampilan praktis yang relevan, dan mulai dengan proyek pelayanan kecil. Jalin kemitraan dengan organisasi yang sudah ada, libatkan orang lain dalam pelayanan, dan fokus pada solusi jangka panjang yang memberdayakan, bukan hanya bantuan sementara." :
                        heart.category === "Konseling" ? "Ikuti pelatihan dasar konseling, kembangkan keterampilan mendengarkan aktif, dan cari mentor yang berpengalaman dalam konseling. Pelajari tentang trauma dan pemulihan, bangun jaringan rujukan untuk kebutuhan di luar keahlian Anda, dan jaga kesehatan emosional Anda sendiri melalui supervisi dan refleksi." :
                        heart.category === "Seni" ? "Kembangkan keterampilan artistik Anda, pelajari bagaimana seni dapat digunakan dalam ibadah dan pelayanan, dan cari komunitas seniman Kristen. Gunakan seni untuk menyampaikan kebenaran alkitabiah, ciptakan karya yang mengundang refleksi spiritual, dan mentori seniman muda yang ingin menggunakan bakat mereka untuk Tuhan." :
                        heart.category === "Teknologi" ? "Tetap update dengan perkembangan teknologi terbaru, pelajari bagaimana teknologi dapat digunakan untuk pelayanan, dan mulai dengan proyek teknologi sederhana untuk gereja atau organisasi Kristen. Bantu organisasi pelayanan meningkatkan kehadiran online mereka, kembangkan aplikasi atau alat yang mendukung pertumbuhan rohani, dan gunakan media sosial untuk menyebarkan pesan positif." :
                        heart.category === "Kesehatan" ? "Pelajari tentang pendekatan holistik terhadap kesehatan, kembangkan keterampilan dalam bidang kesehatan yang Anda minati, dan cari cara untuk melayani melalui pelayanan kesehatan. Edukasi komunitas tentang gaya hidup sehat, dukung mereka yang menghadapi tantangan kesehatan kronis, dan integrasikan kesehatan spiritual dengan kesehatan fisik dan mental." :
                        heart.category === "Kemiskinan" ? "Pelajari tentang akar penyebab kemiskinan, kembangkan keterampilan praktis untuk membantu orang keluar dari kemiskinan, dan libatkan diri dalam program pengentasan kemiskinan. Fokus pada pemberdayaan ekonomi, advokasi untuk keadilan sosial, dan bangun hubungan yang bermartabat dengan mereka yang Anda layani." :
                        heart.category === "Pemuridan" ? "Pelajari prinsip-prinsip pemuridan alkitabiah, kembangkan keterampilan mentoring, dan mulai dengan membimbing satu atau dua orang dalam perjalanan iman mereka. Ciptakan lingkungan yang aman untuk pertanyaan dan keraguan, kembangkan sumber daya untuk pertumbuhan rohani, dan modelkan kehidupan yang konsisten dengan ajaran Kristus." :
                        heart.category === "passion" ? "Identifikasi apa yang membuat Anda bersemangat dan energik, luangkan waktu untuk mengeksplorasi minat ini lebih dalam, dan cari cara untuk mengintegrasikannya dengan pelayanan. Kembangkan keterampilan terkait, bergabung dengan komunitas yang memiliki minat serupa, dan gunakan hasrat Anda untuk melayani orang lain dan memuliakan Tuhan." :
                        "Identifikasi apa yang benar-benar Anda pedulikan, kembangkan keterampilan terkait, dan cari kesempatan untuk menggunakan hasrat Anda dalam pelayanan. Bergabunglah dengan komunitas yang memiliki minat serupa, teruslah belajar dan bertumbuh dalam bidang ini, dan carilah cara untuk mengintegrasikan hasrat Anda dengan iman Anda."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <ReflectiveInsightsSection heartDesire={heartDesire} />
      </TabsContent>

      <TabsContent value="personality" className="p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Personality & Abilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <ResultsChart data={personalityTypes} title="Personality Type" colorClass="bg-purple-500" />
              <ResultsChart data={abilities} title="Abilities" colorClass="bg-blue-500" />
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-bold mb-2">Your Personality Type</h4>
              <p className="text-muted-foreground">
                Ciri-ciri kepribadian Anda memengaruhi bagaimana Anda berinteraksi dengan orang lain dan menangani tugas.
                Memahami kepribadian Anda membantu Anda menemukan peran yang cocok untuk Anda.
              </p>

              {personalityTypes.length > 0 && personalityTypes[0].category.includes("Tipe Kepribadian") && (
                <div className="p-4 border rounded-lg mt-4 space-y-4">
                  <div>
                    <h5 className="font-bold">{personalityTypes[0].category}</h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      {getPersonalityDescription(personalityTypes[0].category)}
                    </p>
                  </div>

                  {recommendations.shapeProfile?.personality?.analysis && (
                    <>
                      <div className="border-t pt-3">
                        <h5 className="font-bold text-sm">{recommendations.shapeProfile.personality.analysis.title}</h5>
                        <p className="text-sm text-muted-foreground mt-1">
                          {recommendations.shapeProfile.personality.analysis.description.general}
                        </p>
                      </div>

                      <div>
                        <h5 className="font-bold text-sm">Nilai Inti</h5>
                        <p className="text-sm text-muted-foreground mt-1">
                          {recommendations.shapeProfile.personality.analysis.description.coreValues}
                        </p>
                      </div>

                      <div>
                        <h5 className="font-bold text-sm">Kemampuan Dominan</h5>
                        <ul className="text-sm text-muted-foreground mt-1 space-y-2">
                          {recommendations.shapeProfile.personality.analysis.strengths.dominantAbilities.map((ability, idx) => (
                            <li key={idx} className="ml-4">
                              <span className="font-medium">{ability.title}:</span> {ability.description}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              )}

              <h4 className="text-lg font-bold mt-6 mb-2">Your Top Abilities</h4>
              <div className="space-y-4">
                {abilities.slice(0, 3).map((ability, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h5 className="font-bold">{ability.category}</h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      {getAbilityDescription(ability.category)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="experiences" className="p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Experiences</CardTitle>
          </CardHeader>
          <CardContent>
            <ResultsChart data={experiences} title="" colorClass="bg-amber-500" />

            <div className="mt-6">
              <h4 className="text-lg font-bold mb-2">What are Experiences?</h4>
              <p className="text-muted-foreground">
                Pengalaman Anda membentuk siapa Anda dan memberikan wawasan berharga untuk masa depan Anda.
                Baik pengalaman positif maupun yang menantang dapat digunakan untuk membantu orang lain.
              </p>

              <div className="mt-3 p-3 bg-slate-50 rounded-md">
                <p className="text-sm text-slate-700">
                  Dalam Roma 8:28, Alkitab mengatakan, "Kita tahu sekarang, bahwa Allah turut bekerja dalam segala sesuatu
                  untuk mendatangkan kebaikan bagi mereka yang mengasihi Dia." Tuhan dapat menggunakan semua pengalaman
                  hidup Anda—baik yang menyenangkan maupun yang menyakitkan—untuk tujuan yang lebih besar. Pengalaman
                  hidup Anda memberikan kredibilitas dan wawasan unik yang tidak dapat diperoleh melalui cara lain.
                </p>
              </div>

              <h4 className="text-lg font-bold mt-4 mb-2">Your Key Experiences</h4>
              <div className="space-y-4">
                {experiences.slice(0, 3).map((exp, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h5 className="font-bold">{exp.category}</h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      {getExperienceDescription(exp.category)}
                    </p>
                    <div className="mt-2 pt-2 border-t border-dashed border-slate-200">
                      <p className="text-xs text-slate-600">
                        <span className="font-medium">Bagaimana memanfaatkan pengalaman ini: </span>
                        {exp.category && typeof exp.category === 'string' && exp.category.includes("Kepemimpinan") && "Bagikan pelajaran kepemimpinan yang Anda peroleh, mentori pemimpin muda, dan gunakan pengalaman Anda untuk memimpin dengan lebih efektif."}
                        {exp.category && typeof exp.category === 'string' && exp.category.includes("Pengajaran") && "Kembangkan metode pengajaran yang efektif berdasarkan pengalaman Anda, bagikan studi kasus dari pengalaman nyata, dan mentori guru baru."}
                        {exp.category && typeof exp.category === 'string' && exp.category.includes("Pelayanan") && "Gunakan pengalaman pelayanan Anda untuk mengidentifikasi kebutuhan yang belum terpenuhi, latih orang lain dalam pelayanan, dan kembangkan program pelayanan baru."}
                        {exp.category && typeof exp.category === 'string' && exp.category.includes("Kreativitas") && "Gunakan kreativitas Anda untuk menginspirasi orang lain, kembangkan solusi inovatif untuk masalah, dan ajarkan teknik kreatif kepada orang lain."}
                        {exp.category && typeof exp.category === 'string' && exp.category.includes("Analitis") && "Terapkan keterampilan analitis Anda untuk memecahkan masalah kompleks, bantu organisasi dengan perencanaan strategis, dan mentori orang lain dalam pemikiran kritis."}
                        {exp.category && typeof exp.category === 'string' && exp.category.includes("Ketahanan") && "Bagikan kisah ketahanan Anda untuk menginspirasi orang lain, mentori mereka yang menghadapi kesulitan serupa, dan kembangkan program untuk membangun ketahanan."}
                        {exp.category && typeof exp.category === 'string' && exp.category.includes("Spiritual") && "Gunakan pengalaman spiritual Anda untuk membimbing orang lain dalam perjalanan iman mereka, bagikan wawasan dari pengalaman Anda, dan kembangkan materi untuk pertumbuhan rohani."}
                        {exp.category && typeof exp.category === 'string' && exp.category.includes("Relasional") && "Gunakan keterampilan relasional Anda untuk membangun jembatan antar kelompok, mentori orang lain dalam keterampilan interpersonal, dan fasilitasi resolusi konflik."}
                        {exp.category && typeof exp.category === 'string' && !exp.category.includes("Tema") && "Refleksikan pelajaran yang Anda peroleh dari pengalaman ini, identifikasi bagaimana Tuhan telah menggunakannya dalam hidup Anda, dan carilah cara untuk membagikan wawasan Anda dengan orang lain."}
                        {(!exp.category || typeof exp.category !== 'string') && "Refleksikan pelajaran yang Anda peroleh dari pengalaman ini, identifikasi bagaimana Tuhan telah menggunakannya dalam hidup Anda, dan carilah cara untuk membagikan wawasan Anda dengan orang lain."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

// Helper functions to get descriptions
function getSpiritualGiftDescription(gift: string): string {
  const descriptions: Record<string, string> = {
    "Mengajar": "Kemampuan untuk menjelaskan Alkitab dan prinsip-prinsip rohani dengan cara yang jelas dan relevan, membantu orang lain belajar dan bertumbuh dalam iman mereka.",
    "Melayani": "Kemampuan untuk mengidentifikasi dan memenuhi kebutuhan praktis, sering kali di balik layar, dengan semangat kerendahan hati dan keceriaan.",
    "Memimpin": "Kemampuan untuk memberikan visi, memotivasi, dan membimbing orang menuju pencapaian tujuan yang selaras dengan tujuan Tuhan.",
    "Nubuat": "Kemampuan untuk menyampaikan kebenaran Tuhan dengan berani dengan cara yang menantang, mengoreksi, atau mendorong orang lain.",
    "Memberi": "Kemampuan untuk menyumbangkan sumber daya material dengan sukacita dan kesederhanaan untuk memajukan pekerjaan Tuhan.",
    "Kemurahan": "Kemampuan untuk berempati dengan mereka yang menderita dan memberikan perawatan dan dukungan yang penuh kasih.",
    "Evangelisme": "Kemampuan untuk mengkomunikasikan Injil secara efektif kepada orang-orang yang belum percaya dengan cara yang menarik mereka kepada Kristus.",
    "Pengetahuan": "Kemampuan untuk menemukan, menganalisis, dan mensistematisasi kebenaran untuk kepentingan orang lain.",
    "Hikmat": "Kemampuan untuk menerapkan wawasan rohani pada situasi kompleks dan memberikan bimbingan yang saleh.",
    "Iman": "Kemampuan untuk mempercayai Tuhan dengan yakin dalam keadaan yang menantang dan menginspirasi orang lain untuk melakukan hal yang sama.",
    "Penyembuhan": "Kemampuan untuk digunakan oleh Tuhan untuk memulihkan kesehatan orang sakit melalui doa dan iman.",
    "Membimbing": "Kemampuan untuk membimbing dan memelihara orang lain menuju kedewasaan rohani.",
    "Administrasi": "Kemampuan untuk mengorganisir orang dan sumber daya secara efektif untuk mencapai tujuan.",
    "Bahasa": "Kemampuan untuk berbicara dalam bahasa yang tidak dipelajari secara alami, sebagai sarana komunikasi spiritual dengan Tuhan dan kadang-kadang sebagai pesan untuk jemaat.",
    "Menafsirkan": "Kemampuan untuk mengungkapkan makna dari pesan yang disampaikan dalam bahasa roh, sehingga seluruh jemaat dapat memahami dan mendapat manfaat.",
    "Membedakan": "Kemampuan untuk membedakan apakah suatu pengajaran, pesan, atau tindakan berasal dari Tuhan, dari manusia, atau dari roh jahat.",
    "spiritual": "Karunia rohani adalah kemampuan khusus yang diberikan oleh Roh Kudus kepada setiap orang percaya untuk melayani tubuh Kristus. Karunia ini memungkinkan Anda untuk melayani dengan efektivitas dan sukacita dalam bidang tertentu.",
  }

  // Extract the gift name from the category (which might include a score)
  const giftName = gift.split(" ")[0]

  return descriptions[giftName] || "Kemampuan ilahi yang diberikan oleh Tuhan untuk melayani orang lain dan membangun gereja. Karunia ini memungkinkan Anda untuk berkontribusi secara unik dalam tubuh Kristus sesuai dengan rancangan Tuhan."
}

function getHeartDesireDescription(heart: string): string {
  const descriptions: Record<string, string> = {
    "Anak-anak": "Anda memiliki hasrat untuk mengasuh dan mengembangkan anak-anak, membantu mereka bertumbuh secara rohani, emosional, dan intelektual. Anda melihat potensi besar dalam setiap anak dan ingin membantu mereka menemukan identitas mereka dalam Kristus.",
    "Remaja": "Anda memiliki hati untuk membimbing remaja melalui tahun-tahun formatif mereka, membantu mereka menghadapi tantangan dan mengembangkan identitas mereka dalam Kristus. Anda memahami pergumulan unik yang dihadapi remaja dan ingin menjadi mentor yang dapat dipercaya.",
    "Keluarga": "Anda bersemangat untuk memperkuat unit keluarga, mempromosikan hubungan yang sehat, dan mendukung orang tua dalam membesarkan anak-anak yang saleh. Anda percaya bahwa keluarga yang sehat adalah fondasi bagi masyarakat dan gereja yang sehat.",
    "Lansia": "Anda sangat peduli dengan lansia, ingin menghormati, mendukung, dan belajar dari kebijaksanaan dan pengalaman mereka. Anda menghargai kontribusi mereka dan ingin memastikan mereka tetap terhubung dan dihargai dalam komunitas.",
    "Pendidikan": "Anda bersemangat tentang mengajar dan belajar, percaya pada kekuatan transformatif pendidikan. Anda melihat pendidikan sebagai alat untuk memberdayakan orang dan membuka pintu kesempatan bagi mereka yang kurang beruntung.",
    "Misi": "Anda memiliki hati untuk menjangkau kelompok orang yang belum terjangkau dengan Injil dan mendukung pelayanan lintas budaya. Anda terdorong oleh Amanat Agung dan ingin melihat semua orang mendengar kabar baik tentang Yesus.",
    "Pelayanan Sosial": "Anda terdorong untuk memenuhi kebutuhan praktis di komunitas Anda dan menunjukkan kasih Tuhan melalui tindakan pelayanan yang nyata. Anda percaya bahwa iman harus diwujudkan dalam tindakan dan ingin menjadi tangan dan kaki Kristus di dunia.",
    "Konseling": "Anda memiliki hasrat untuk mendampingi orang melalui perjuangan mereka dan membantu mereka menemukan kesembuhan dan harapan. Anda memiliki kemampuan untuk mendengarkan dengan empati dan memberikan dukungan emosional yang dibutuhkan orang dalam masa-masa sulit.",
    "Seni": "Anda suka mengekspresikan iman melalui seni kreatif dan menggunakan karunia artistik untuk memuliakan Tuhan dan menginspirasi orang lain. Anda melihat keindahan sebagai refleksi dari karakter Tuhan dan ingin menggunakan kreativitas untuk menyampaikan kebenaran spiritual.",
    "Teknologi": "Anda bersemangat tentang memanfaatkan teknologi untuk memajukan kerajaan Tuhan dan menjangkau orang di era digital. Anda melihat potensi besar dalam alat-alat digital untuk menyebarkan Injil dan membangun komunitas iman yang lebih luas.",
    "Kesehatan": "Anda memiliki kepedulian mendalam terhadap kesejahteraan fisik, mental, dan spiritual orang lain. Anda percaya bahwa tubuh adalah bait Roh Kudus dan ingin membantu orang hidup sehat secara holistik sesuai dengan prinsip-prinsip alkitabiah.",
    "Kemiskinan": "Anda memiliki beban khusus untuk mereka yang hidup dalam kemiskinan dan ketidakadilan. Anda terdorong oleh panggilan alkitabiah untuk membela yang lemah dan ingin mencari solusi jangka panjang untuk masalah kemiskinan struktural.",
    "Pemuridan": "Anda memiliki hasrat untuk membantu orang bertumbuh dalam kedewasaan rohani dan menjadi pengikut Kristus yang setia. Anda menghargai proses pertumbuhan jangka panjang dan ingin berinvestasi dalam kehidupan orang lain untuk jangka waktu yang panjang.",
    "passion": "Hasrat adalah dorongan hati yang kuat yang Tuhan tanamkan dalam diri Anda. Ini mencerminkan apa yang Anda pedulikan secara mendalam dan apa yang membuat Anda bersemangat. Hasrat ini sering menjadi petunjuk tentang bagaimana Tuhan ingin Anda melayani dalam kerajaan-Nya.",
  }

  return descriptions[heart] || "Area hasrat yang memotivasi Anda untuk melayani orang lain dengan cara tertentu. Hasrat ini merefleksikan apa yang Tuhan letakkan dalam hati Anda sebagai bagian dari tujuan unik Anda. Dengan mengikuti hasrat ini, Anda akan menemukan sukacita dan kepuasan dalam pelayanan Anda."
}

function getPersonalityDescription(personality: string): string {
  // Extract the MBTI type from the category
  const mbtiType = personality.split(": ")[1]

  const descriptions: Record<string, string> = {
    "ISTJ": "Pendiam, serius, dan bertanggung jawab. Anda praktis, berdasarkan fakta, dan realistis, menghargai tradisi dan kesetiaan.",
    "ISFJ": "Pendiam, ramah, dan teliti. Anda berkomitmen untuk memenuhi kewajiban dan melayani orang lain dengan bantuan praktis.",
    "INFJ": "Idealis, terorganisir, dan berwawasan. Anda mencari makna dan koneksi, berkomitmen pada nilai-nilai Anda dan untuk membantu orang lain.",
    "INTJ": "Mandiri, analitis, dan tegas. Anda memiliki standar tinggi dan didorong untuk mengimplementasikan ide-ide Anda dan mencapai tujuan Anda.",
    "ISTP": "Toleran, fleksibel, dan observan. Anda tertarik pada bagaimana dan mengapa sesuatu bekerja dan dapat dengan cepat memecahkan masalah praktis.",
    "ISFP": "Pendiam, ramah, dan sensitif. Anda menikmati momen sekarang dan apa yang terjadi di sekitar Anda, menghargai kebebasan pribadi.",
    "INFP": "Idealis, setia, dan ingin tahu. Anda berusaha memahami orang dan membantu mereka memenuhi potensi mereka.",
    "INTP": "Logis, orisinal, dan ingin tahu. Anda berusaha mengembangkan penjelasan logis untuk segala sesuatu yang menarik bagi Anda.",
    "ESTP": "Fleksibel, toleran, dan spontan. Anda fokus pada hasil langsung, menikmati kenyamanan material dan belajar melalui pengalaman langsung.",
    "ESFP": "Terbuka, ramah, dan menerima. Anda senang bekerja dengan orang lain untuk membuat sesuatu terjadi dan membawa pendekatan praktis ke pekerjaan Anda.",
    "ENFP": "Antusias, kreatif, dan ramah. Anda melihat kemungkinan di mana-mana dan menghubungkan orang dengan ide dan satu sama lain.",
    "ENTP": "Cepat, cerdas, dan terus terang. Anda menikmati tantangan intelektual dan melihat koneksi antara konsep.",
    "ESTJ": "Praktis, realistis, dan tegas. Anda fokus pada mendapatkan hasil dengan cara yang paling efisien.",
    "ESFJ": "Berhati hangat, teliti, dan kooperatif. Anda menghargai harmoni dan bekerja untuk menciptakannya, memperhatikan kebutuhan orang lain.",
    "ENFJ": "Hangat, empatik, dan bertanggung jawab. Anda peka terhadap kebutuhan orang lain dan membantu orang lain memenuhi potensi mereka.",
    "ENTJ": "Jujur, tegas, dan strategis. Anda dengan cepat melihat inefisiensi dan mengorganisir orang dan sistem untuk mencapai tujuan.",
  }

  return descriptions[mbtiType] || "Ciri-ciri kepribadian Anda memengaruhi bagaimana Anda berinteraksi dengan orang lain dan menangani tugas."
}

function getAbilityDescription(ability: string): string {
  // Extract the ability name from the category
  const abilityName = ability.replace("Kemampuan: ", "")

  const descriptions: Record<string, string> = {
    "Menulis": "Anda memiliki bakat untuk mengekspresikan ide dengan jelas dan kreatif melalui komunikasi tertulis.",
    "Public Speaking": "Anda memiliki kemampuan untuk berkomunikasi secara efektif kepada kelompok, menjaga perhatian mereka dan menyampaikan informasi dengan jelas.",
    "Seni": "Anda memiliki bakat kreatif dalam seni visual, mampu mengekspresikan ide dan emosi melalui media artistik.",
    "Musik": "Anda memiliki kemampuan musikal, baik instrumental, vokal, atau komposisi, yang dapat menginspirasi dan menggerakkan orang lain.",
    "Organisasi": "Anda memiliki bakat untuk menciptakan keteraturan dari kekacauan, menyusun tugas, dan mengelola detail secara efektif.",
    "Analitis": "Anda memiliki kemampuan untuk memeriksa informasi secara kritis, mengidentifikasi pola, dan memecahkan masalah kompleks.",
    "Teknologi": "Anda memiliki keterampilan dalam memahami dan memanfaatkan teknologi untuk menyelesaikan tugas dan memecahkan masalah.",
    "Interpersonal": "Anda memiliki kemampuan untuk terhubung dengan orang lain, memahami kebutuhan mereka, dan membangun hubungan yang bermakna.",
    "Kreativitas": "Anda memiliki kemampuan untuk menghasilkan ide-ide orisinal dan mendekati masalah dari perspektif unik.",
    "Kepemimpinan": "Anda memiliki kemampuan untuk menginspirasi dan membimbing orang lain menuju pencapaian tujuan bersama.",
  }

  return descriptions[abilityName] || "Bakat alami atau keterampilan yang dipelajari yang dapat Anda gunakan untuk melayani orang lain dan memenuhi tujuan Anda."
}

function getExperienceDescription(experience: string): string {
  // Check if experience is undefined or null
  if (!experience) {
    return "Pengalaman yang telah berkontribusi pada pertumbuhan Anda dan mempersiapkan Anda untuk tujuan Anda.";
  }

  // Check if it's a theme experience
  if (typeof experience === 'string' && experience.includes("Tema Pengalaman:")) {
    const theme = experience.replace("Tema Pengalaman: ", "")

    const themeDescriptions: Record<string, string> = {
      "Kepemimpinan": "Pengalaman kepemimpinan Anda telah membekali Anda dengan keterampilan dalam membimbing orang lain, membuat keputusan, dan mengambil tanggung jawab.",
      "Pengajaran": "Pengalaman mengajar Anda telah mengembangkan kemampuan Anda untuk mengkomunikasikan pengetahuan dan membantu orang lain belajar dan bertumbuh.",
      "Pelayanan": "Pengalaman pelayanan Anda telah menumbuhkan hati untuk memenuhi kebutuhan dan mendukung orang lain dengan cara praktis.",
      "Kreativitas": "Pengalaman kreatif Anda telah memupuk kemampuan Anda untuk berpikir di luar kotak dan mengekspresikan ide dengan cara unik.",
      "Analitis": "Pengalaman analitis Anda telah mempertajam pemikiran kritis dan kemampuan pemecahan masalah Anda.",
      "Ketahanan": "Pengalaman Anda dengan kesulitan telah membangun ketahanan dan kemampuan untuk bertahan melalui tantangan.",
      "Spiritual": "Pengalaman spiritual Anda telah memperdalam iman dan pemahaman Anda tentang karya Tuhan dalam hidup Anda.",
      "Relasional": "Pengalaman relasional Anda telah mengembangkan kemampuan Anda untuk terhubung dengan orang lain dan membangun hubungan yang bermakna.",
    }

    return themeDescriptions[theme] || "Pola pengalaman yang telah membentuk karakter dan kemampuan Anda."
  }

  return "Pengalaman yang telah berkontribusi pada pertumbuhan Anda dan mempersiapkan Anda untuk tujuan Anda."
}
