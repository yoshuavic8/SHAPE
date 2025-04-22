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
import { getMBTIData } from "@/lib/mbti/mbti-helper"
import { useEffect, useState } from "react"
import { LayoutDashboard, Flame, Heart, User, BookOpen, Lightbulb } from "lucide-react"

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
  // State to track screen size
  const [isMobile, setIsMobile] = useState(false)

  // Effect to detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768) // 768px is a common breakpoint for mobile
    }

    // Initial check
    checkScreenSize()

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize)

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Get abilities from personality results
  const abilities = personality.filter(item => item.category.includes("Kemampuan:"))

  // Get personality type results
  const personalityTypes = personality.filter(item => !item.category.includes("Kemampuan:"))

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-6">
        <TabsTrigger value="overview">
          {isMobile ? <LayoutDashboard className="h-5 w-5" /> : "Overview"}
        </TabsTrigger>
        <TabsTrigger value="spiritual">
          {isMobile ? <Flame className="h-5 w-5" /> : "Spiritual"}
        </TabsTrigger>
        <TabsTrigger value="heart">
          {isMobile ? <Heart className="h-5 w-5" /> : "Heart"}
        </TabsTrigger>
        <TabsTrigger value="personality">
          {isMobile ? <User className="h-5 w-5" /> : "Personality"}
        </TabsTrigger>
        <TabsTrigger value="experiences">
          {isMobile ? <BookOpen className="h-5 w-5" /> : "Experiences"}
        </TabsTrigger>
        <TabsTrigger value="development">
          {isMobile ? <Lightbulb className="h-5 w-5" /> : "Development"}
        </TabsTrigger>
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

            {(() => {
              // Get MBTI data using our helper function
              const mbtiData = getMBTIData(personalityTypes);
              const personalityType = recommendations.shapeProfile?.personality?.type || (mbtiData ? mbtiData.type : "");

              // Get MBTI data for overview

              if (mbtiData?.shapeIntegration) {
                return (
                  <div className="mt-4 border-t pt-4">
                    <h4 className="font-medium mb-2">Integrasi SHAPE Berdasarkan Tipe Kepribadian</h4>
                    <div className="space-y-3 text-sm">
                      {mbtiData.shapeIntegration.spiritualGifts && (
                        <p>
                          <span className="font-semibold">Spiritual Gifts + {personalityType}:</span>{' '}
                          {mbtiData.shapeIntegration.spiritualGifts}
                        </p>
                      )}
                      {mbtiData.shapeIntegration.heartDesire && (
                        <p>
                          <span className="font-semibold">Heart Desire + {personalityType}:</span>{' '}
                          {mbtiData.shapeIntegration.heartDesire}
                        </p>
                      )}
                      {mbtiData.shapeIntegration.abilities && (
                        <p>
                          <span className="font-semibold">Abilities + {personalityType}:</span>{' '}
                          {mbtiData.shapeIntegration.abilities}
                        </p>
                      )}
                      {mbtiData.shapeIntegration.experiences && (
                        <p>
                          <span className="font-semibold">Experiences + {personalityType}:</span>{' '}
                          {mbtiData.shapeIntegration.experiences}
                        </p>
                      )}
                    </div>
                  </div>
                );
              }
              return null;
            })()}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-5 border border-green-100">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-700" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-green-800">Kekuatan Anda</h3>
                </div>
                <div className="space-y-3">
                  {recommendations.strengthsWeaknesses.strengths.map((strength: string, index: number) => (
                    <div key={index} className="flex items-start">
                      <div className="mt-1 mr-2 text-green-600">•</div>
                      <p className="text-green-800">{strength}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-5 border border-amber-100">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-700" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-amber-800">Area Pengembangan</h3>
                </div>
                <div className="space-y-3">
                  {recommendations.strengthsWeaknesses.weaknesses.map((weakness: string, index: number) => (
                    <div key={index} className="flex items-start">
                      <div className="mt-1 mr-2 text-amber-600">•</div>
                      <p className="text-amber-800">{weakness}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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

            {(() => {
              // Get MBTI data using our helper function
              const mbtiData = getMBTIData(personalityTypes);

              // Get MBTI data for development

              if (mbtiData?.recommendations) {
                return (
                  <div className="mt-4 border-t pt-4">
                    <h4 className="font-medium mb-2">Rekomendasi Berdasarkan Tipe Kepribadian</h4>

                    <div className="space-y-4">
                      {mbtiData.recommendations.ministry && (
                        <div>
                          <h5 className="text-sm font-medium">Pelayanan yang Direkomendasikan:</h5>
                          <ul className="list-disc list-inside text-sm text-muted-foreground mt-1">
                            {mbtiData.recommendations.ministry.map((ministry, idx) => (
                              <li key={idx}>{ministry}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {mbtiData.recommendations.specificExamples && (
                        <div>
                          <h5 className="text-sm font-medium">Contoh Spesifik:</h5>
                          <ul className="list-disc list-inside text-sm text-muted-foreground mt-1">
                            {mbtiData.recommendations.specificExamples.map((example, idx) => (
                              <li key={idx}>{example}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {mbtiData.recommendations.career && (
                        <div>
                          <h5 className="text-sm font-medium">Karir yang Cocok:</h5>
                          <ul className="list-disc list-inside text-sm text-muted-foreground mt-1">
                            {mbtiData.recommendations.career.map((career, idx) => (
                              <li key={idx}>{career}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                );
              }
              return null;
            })()}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Development Recommendations</CardTitle>
            <CardDescription>Rekomendasi pengembangan diri berdasarkan profil SHAPE Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.developmentRecommendations.map((rec: string, index: number) => (
                <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 border-b border-gray-200">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                        <span className="text-blue-700 text-sm font-medium">{index + 1}</span>
                      </div>
                      <h4 className="font-medium text-blue-800">
                        {index === 0 ? 'Pengembangan Karunia Spiritual' :
                         index === 1 ? 'Pengembangan Hasrat Hati' :
                         index === 2 ? 'Pengembangan Kepribadian' :
                         index === 3 ? 'Pengembangan Kemampuan' :
                         index === 4 ? 'Pengembangan Pengalaman' :
                         `Rekomendasi ${index + 1}`}
                      </h4>
                    </div>
                  </div>
                  <div className="p-4">
                    {/* Memisahkan teks rekomendasi menjadi beberapa bagian */}
                    {(() => {
                      // Pisahkan teks berdasarkan "Langkah-langkah praktis" dan "Pengembangan"
                      const parts = rec.split("Langkah-langkah praktis yang dapat Anda ambil:");
                      const introPart = parts[0];

                      let stepsPart = "";
                      let benefitsPart = "";

                      if (parts.length > 1) {
                        const remainingText = parts[1];
                        const benefitsSplit = remainingText.split("Pengembangan");

                        stepsPart = benefitsSplit[0];
                        if (benefitsSplit.length > 1) {
                          benefitsPart = "Pengembangan" + benefitsSplit[1];
                        }
                      }

                      return (
                        <div className="space-y-4">
                          {/* Bagian Pengantar */}
                          <p className="text-gray-700 leading-relaxed">{introPart}</p>

                          {/* Bagian Langkah-langkah */}
                          {stepsPart && (
                            <div className="bg-blue-50 p-4 rounded-lg">
                              <h5 className="font-medium text-blue-800 mb-2">Langkah-langkah praktis yang dapat Anda ambil:</h5>
                              <div className="space-y-2">
                                {stepsPart.split(/\(\d+\)/).filter(step => step.trim()).map((step, idx) => (
                                  <div key={idx} className="flex items-start">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                                      <span className="text-blue-700 text-sm font-medium">{idx + 1}</span>
                                    </div>
                                    <p className="text-gray-700">{step.trim().replace(/^[,\s]+|[,\s]+$/g, '')}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Bagian Manfaat */}
                          {benefitsPart && (
                            <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50 rounded-r-lg">
                              <p className="text-gray-700 italic">{benefitsPart}</p>
                            </div>
                          )}
                        </div>
                      );
                    })()}

                    <div className="mt-4 pt-3 border-t border-dashed border-gray-200">
                      <div className="flex items-center text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>
                          {index === 0 ? 'Fokus pada pengembangan karunia utama Anda' :
                           index === 1 ? 'Eksplorasi dan pendalaman hasrat hati' :
                           index === 2 ? 'Optimalisasi tipe kepribadian Anda' :
                           index === 3 ? 'Penguatan kemampuan praktis' :
                           index === 4 ? 'Refleksi dan aplikasi pengalaman' :
                           'Langkah pengembangan'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {(() => {
              // Get MBTI data using our helper function
              const mbtiData = getMBTIData(personalityTypes);

              // Get MBTI data for development tips

              if (mbtiData?.developmentTips) {
                return (
                  <div className="mt-4 border-t pt-4">
                    <h4 className="font-medium mb-2">Tips Pengembangan Berdasarkan Tipe Kepribadian</h4>
                    <div className="space-y-3">
                      {mbtiData.developmentTips.map((tip, index) => (
                        <div key={index} className="ml-2">
                          <p className="font-medium text-sm">{tip.title || 'Tip ' + (index + 1)}</p>
                          <p className="text-sm text-muted-foreground">{tip.description || 'Tidak ada deskripsi'}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
              return null;
            })()}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bible Verse</CardTitle>
            <CardDescription>Ayat Alkitab yang relevan dengan profil SHAPE Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-6 border border-blue-100">
              <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full text-blue-700" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
              </div>

              <div className="relative z-10">
                {recommendations.bibleVerse.split('\n\n').map((verse, index) => (
                  <div key={index} className={index > 0 ? 'mt-6 pt-6 border-t border-blue-100' : ''}>
                    <p className="italic text-blue-800 font-serif text-lg mb-2">"{verse}"</p>
                    <div className="flex items-center mt-3">
                      <div className="h-px flex-grow bg-blue-200"></div>
                      <p className="text-xs text-blue-600 mx-2">{index === 0 ? 'Ayat Utama' : 'Ayat Tambahan'}</p>
                      <div className="h-px flex-grow bg-blue-200"></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-sm text-blue-700">
                <p>Renungkan ayat ini dalam konteks profil SHAPE Anda dan bagaimana Tuhan mungkin berbicara kepada Anda melaluinya.</p>
              </div>
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
            <ResultsChart data={spiritualGifts.filter(g => g.type !== "insight")} title="" colorClass="bg-green-500" />

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
                {heartDesire.slice(0, 3).map((heart, index) => {
                  // Cari pilihan multiple choice yang terkait dengan kategori ini
                  const relatedChoices = heartDesire.filter(h =>
                    h.type === "multiple" &&
                    h.subcategory === heart.subcategory
                  );

                  return (
                    <div key={index} className="p-4 border rounded-lg">
                      <h5 className="font-bold">{heart.category}</h5>
                      <p className="text-sm text-muted-foreground mt-1">
                        {getHeartDesireDescription(heart.category)}
                      </p>

                      {/* Tampilkan pilihan yang dipilih pengguna jika ada */}
                      {relatedChoices.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-dashed border-slate-200">
                          <p className="text-xs font-medium text-slate-700">Pilihan Anda dalam kategori ini:</p>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {relatedChoices.map((choice, choiceIndex) => {
                              // Ekstrak pilihan dari kategori (format: "Kategori: Pilihan1, Pilihan2, ...")
                              const choicesText = choice.category.split(":")[1]?.trim() || "";
                              const choicesArray = choicesText.split(", ");

                              return choicesArray.map((choiceItem, itemIndex) => (
                                <div key={`${choiceIndex}-${itemIndex}`} className="text-xs bg-amber-50 px-2 py-1 rounded-full">
                                  {choiceItem}
                                </div>
                              ));
                            })}
                          </div>
                        </div>
                      )}

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
                  );
                })}
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
                Tipe kepribadian Anda adalah pola unik dari cara Anda berpikir, merasa, dan berperilaku. Memahami tipe kepribadian Anda
                dapat membantu Anda mengenali kekuatan alami Anda, area potensial untuk pertumbuhan, dan bagaimana Anda dapat
                berkontribusi secara unik dalam pelayanan dan kehidupan sehari-hari.
              </p>

              {personalityTypes.length > 0 && (
                <div className="p-4 border rounded-lg mt-4 space-y-4">
                  <div>
                    <h5 className="font-bold">{personalityTypes[0].category}</h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      {getPersonalityDescription(personalityTypes[0].category)}
                    </p>
                  </div>

                  {(() => {
                    // Get MBTI data using our helper function
                    const mbtiData = getMBTIData(personalityTypes);
                    // Get MBTI data for personality

                    if (mbtiData && mbtiData.description && mbtiData.description.general) {
                      return (
                        <>
                          <div className="border-t pt-3">
                            <h5 className="font-bold text-sm">{mbtiData.title}</h5>
                            <p className="text-sm text-muted-foreground mt-1">
                              {mbtiData.description.general}
                            </p>
                          </div>

                          <div>
                            <h5 className="font-bold text-sm">Slogan</h5>
                            <p className="text-sm text-muted-foreground mt-1 italic">
                              "{mbtiData.description.slogan}"
                            </p>
                          </div>

                          <div>
                            <h5 className="font-bold text-sm">Nilai Inti</h5>
                            <p className="text-sm text-muted-foreground mt-1">
                              {mbtiData.description.coreValues}
                            </p>
                          </div>

                          <div>
                            <h5 className="font-bold text-sm">Kemampuan Dominan</h5>
                            <ul className="text-sm text-muted-foreground mt-1 space-y-2">
                              {mbtiData.strengths.dominantAbilities.map((ability: any, idx: number) => (
                                <li key={idx} className="ml-4">
                                  <span className="font-medium">{ability.title}:</span> {ability.description}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h5 className="font-bold text-sm">Keterampilan Teknis</h5>
                            <ul className="text-sm text-muted-foreground mt-1 list-disc list-inside">
                              {mbtiData.strengths.technicalSkills.map((skill: string, idx: number) => (
                                <li key={idx}>{skill}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h5 className="font-bold text-sm">Gaya Belajar</h5>
                            <p className="text-sm text-muted-foreground mt-1">
                              {mbtiData.strengths.learningStyle}
                            </p>
                          </div>
                        </>
                      );
                    }
                    return null;
                  })()}
                </div>
              )}

              <h4 className="text-lg font-bold mt-6 mb-2">Your Top Abilities</h4>
              <p className="text-muted-foreground mb-4">
                Kemampuan Anda adalah bakat alami dan keterampilan yang telah Anda kembangkan. Kemampuan ini merupakan bagian penting dari
                bagaimana Tuhan telah melengkapi Anda secara unik untuk berkontribusi dalam tubuh Kristus dan dunia. Menggunakan kemampuan
                ini dalam pelayanan akan membawa sukacita dan efektivitas dalam melayani orang lain.
              </p>
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
                {/* Tampilkan pengalaman tipe "open" terlebih dahulu */}
                {experiences
                  .filter(exp => exp.type === "open")
                  .slice(0, 3)
                  .map((exp, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h5 className="font-bold">{exp.category}</h5>
                      {exp.content && (
                        <div className="mt-1 p-2 bg-slate-50 rounded text-sm italic">
                          "{exp.content}"
                        </div>
                      )}
                      <p className="text-sm text-muted-foreground mt-2">
                        {getExperienceDescription(exp.category)}
                      </p>

                      {/* Tampilkan tema yang terdeteksi jika ada */}
                      {exp.metadata && exp.metadata.themes && exp.metadata.themes.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {exp.metadata.themes.map((theme, themeIndex) => (
                            <span key={themeIndex} className="text-xs bg-amber-50 px-2 py-1 rounded-full">
                              {theme}
                            </span>
                          ))}
                        </div>
                      )}

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

                {/* Tampilkan pengalaman tipe "multiple" */}
                {experiences
                  .filter(exp => exp.type === "multiple")
                  .slice(0, 2)
                  .map((exp, index) => (
                    <div key={`multiple-${index}`} className="p-4 border rounded-lg">
                      <h5 className="font-bold">{exp.category}</h5>
                      {exp.description && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {exp.description.split(", ").map((item, itemIndex) => (
                            <span key={itemIndex} className="text-xs bg-blue-50 px-2 py-1 rounded-full">
                              {item}
                            </span>
                          ))}
                        </div>
                      )}
                      <p className="text-sm text-muted-foreground mt-2">
                        {getExperienceDescription(exp.category)}
                      </p>
                    </div>
                  ))}
              </div>

              {/* Wawasan Komprehensif dan Rekomendasi */}
              <div className="mt-6 space-y-4">
                {experiences
                  .filter(exp => exp.type === "comprehensive" || exp.type === "recommendation")
                  .map((exp, index) => (
                    <div key={`insight-${index}`} className="p-4 border rounded-lg bg-slate-50">
                      <h5 className="font-bold text-sm">{exp.category}</h5>
                      <p className="text-sm mt-1">{exp.description}</p>

                      {/* Tampilkan tema yang terdeteksi jika ada */}
                      {exp.metadata && exp.metadata.themes && exp.metadata.themes.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {exp.metadata.themes.map((theme, themeIndex) => (
                            <span key={themeIndex} className="text-xs bg-amber-50 px-2 py-1 rounded-full">
                              {theme}
                            </span>
                          ))}
                        </div>
                      )}
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
    "ISTJ": "Anda adalah 'The Logistician' - pendiam, serius, dan bertanggung jawab. Anda praktis, berdasarkan fakta, dan realistis, menghargai tradisi dan kesetiaan. Dalam pelayanan, Anda dapat diandalkan untuk menyelesaikan tugas dengan teliti dan tepat waktu. Anda memiliki kemampuan luar biasa dalam mengorganisir detail dan memastikan segala sesuatu berjalan sesuai rencana. Nilai-nilai inti Anda meliputi keandalan, ketertiban, dan integritas.",

    "ISFJ": "Anda adalah 'The Defender' - pendiam, ramah, dan teliti. Anda berkomitmen untuk memenuhi kewajiban dan melayani orang lain dengan bantuan praktis. Dalam pelayanan, Anda memiliki kemampuan luar biasa untuk memperhatikan kebutuhan orang lain dan memberikan dukungan yang tepat. Anda bekerja dengan tekun di balik layar, sering kali tanpa mencari pengakuan. Nilai-nilai inti Anda meliputi kesetiaan, tradisi, dan kepedulian terhadap orang lain.",

    "INFJ": "Anda adalah 'The Advocate' - idealis, terorganisir, dan berwawasan. Anda mencari makna dan koneksi, berkomitmen pada nilai-nilai Anda dan untuk membantu orang lain. Dalam pelayanan, Anda memiliki kemampuan unik untuk memahami motivasi dan kebutuhan terdalam orang lain. Anda sering menjadi sumber inspirasi dan bimbingan bagi mereka yang mencari tujuan hidup. Nilai-nilai inti Anda meliputi integritas, pertumbuhan pribadi, dan dampak positif pada dunia.",

    "INTJ": "Anda adalah 'The Architect' - mandiri, analitis, dan tegas. Anda memiliki standar tinggi dan didorong untuk mengimplementasikan ide-ide Anda dan mencapai tujuan Anda. Dalam pelayanan, Anda unggul dalam mengembangkan sistem dan strategi yang efektif. Anda memiliki kemampuan untuk melihat gambaran besar dan merencanakan langkah-langkah konkret untuk mencapai visi. Nilai-nilai inti Anda meliputi pengetahuan, kompetensi, dan perbaikan berkelanjutan.",

    "ISTP": "Anda adalah 'The Virtuoso' - toleran, fleksibel, dan observan. Anda tertarik pada bagaimana dan mengapa sesuatu bekerja dan dapat dengan cepat memecahkan masalah praktis. Dalam pelayanan, Anda unggul dalam situasi yang membutuhkan respons cepat dan solusi praktis. Anda memiliki keterampilan teknis yang luar biasa dan kemampuan untuk beradaptasi dengan situasi yang berubah. Nilai-nilai inti Anda meliputi efisiensi, kebebasan, dan penguasaan keterampilan.",

    "ISFP": "Anda adalah 'The Adventurer' - pendiam, ramah, dan sensitif. Anda menikmati momen sekarang dan apa yang terjadi di sekitar Anda, menghargai kebebasan pribadi. Dalam pelayanan, Anda membawa sentuhan artistik dan kepekaan yang mendalam. Anda memiliki kemampuan untuk melihat keindahan dalam hal-hal sederhana dan menciptakan pengalaman yang bermakna bagi orang lain. Nilai-nilai inti Anda meliputi autentisitas, harmoni, dan ekspresi kreatif.",

    "INFP": "Anda adalah 'The Mediator' - idealis, setia, dan ingin tahu. Anda berusaha memahami orang dan membantu mereka memenuhi potensi mereka. Dalam pelayanan, Anda memiliki kemampuan luar biasa untuk mendengarkan dengan empati dan memberikan dukungan emosional. Anda sering menjadi pendukung bagi mereka yang terpinggirkan atau tidak didengar. Nilai-nilai inti Anda meliputi autentisitas, kedalaman hubungan, dan makna hidup.",

    "INTP": "Anda adalah 'The Logician' - logis, orisinal, dan ingin tahu. Anda berusaha mengembangkan penjelasan logis untuk segala sesuatu yang menarik bagi Anda. Dalam pelayanan, Anda unggul dalam menganalisis masalah kompleks dan menemukan solusi inovatif. Anda memiliki kemampuan untuk melihat pola dan koneksi yang tidak terlihat oleh orang lain. Nilai-nilai inti Anda meliputi pengetahuan, logika, dan pemahaman mendalam.",

    "ESTP": "Anda adalah 'The Entrepreneur' - fleksibel, toleran, dan spontan. Anda fokus pada hasil langsung, menikmati kenyamanan material dan belajar melalui pengalaman langsung. Dalam pelayanan, Anda membawa energi dan antusiasme yang menular. Anda unggul dalam situasi yang membutuhkan tindakan cepat dan kemampuan beradaptasi. Nilai-nilai inti Anda meliputi kebebasan, pengalaman, dan kesenangan dalam hidup.",

    "ESFP": "Anda adalah 'The Entertainer' - terbuka, ramah, dan menerima. Anda senang bekerja dengan orang lain untuk membuat sesuatu terjadi dan membawa pendekatan praktis ke pekerjaan Anda. Dalam pelayanan, Anda memiliki kemampuan untuk menciptakan suasana yang menyenangkan dan inklusif. Anda membawa sukacita dan semangat yang menginspirasi orang lain untuk berpartisipasi. Nilai-nilai inti Anda meliputi kegembiraan, koneksi sosial, dan hidup di saat ini.",

    "ENFP": "Anda adalah 'The Campaigner' - antusias, kreatif, dan ramah. Anda melihat kemungkinan di mana-mana dan menghubungkan orang dengan ide dan satu sama lain. Dalam pelayanan, Anda unggul dalam menginspirasi orang lain dan menghasilkan ide-ide inovatif. Anda memiliki kemampuan untuk melihat potensi dalam setiap orang dan situasi. Nilai-nilai inti Anda meliputi kreativitas, koneksi interpersonal, dan pertumbuhan.",

    "ENTP": "Anda adalah 'The Debater' - cepat, cerdas, dan terus terang. Anda menikmati tantangan intelektual dan melihat koneksi antara konsep. Dalam pelayanan, Anda unggul dalam menghasilkan ide-ide baru dan menantang status quo. Anda memiliki kemampuan untuk melihat kemungkinan yang tidak terpikirkan oleh orang lain dan mendorong inovasi. Nilai-nilai inti Anda meliputi kreativitas, stimulasi intelektual, dan kemungkinan baru.",

    "ESTJ": "Anda adalah 'The Executive' - praktis, realistis, dan tegas. Anda fokus pada mendapatkan hasil dengan cara yang paling efisien. Dalam pelayanan, Anda unggul dalam mengorganisir orang dan sumber daya untuk mencapai tujuan yang jelas. Anda memiliki kemampuan untuk membuat keputusan tegas dan memastikan tugas diselesaikan tepat waktu. Nilai-nilai inti Anda meliputi tanggung jawab, tradisi, dan ketertiban.",

    "ESFJ": "Anda adalah 'The Consul' - berhati hangat, teliti, dan kooperatif. Anda menghargai harmoni dan bekerja untuk menciptakannya, memperhatikan kebutuhan orang lain. Dalam pelayanan, Anda unggul dalam menciptakan lingkungan yang mendukung dan inklusif. Anda memiliki kemampuan untuk memperhatikan kebutuhan praktis orang lain dan memberikan bantuan yang tepat. Nilai-nilai inti Anda meliputi kebersamaan, tradisi, dan kepedulian.",

    "ENFJ": "Anda adalah 'The Protagonist' - hangat, empatik, dan bertanggung jawab. Anda peka terhadap kebutuhan orang lain dan membantu orang lain memenuhi potensi mereka. Dalam pelayanan, Anda unggul dalam menginspirasi dan membimbing orang lain menuju pertumbuhan pribadi. Anda memiliki kemampuan untuk melihat potensi dalam setiap orang dan membantu mereka mengembangkannya. Nilai-nilai inti Anda meliputi harmoni, pertumbuhan orang lain, dan tujuan yang bermakna.",

    "ENTJ": "Anda adalah 'The Commander' - jujur, tegas, dan strategis. Anda dengan cepat melihat inefisiensi dan mengorganisir orang dan sistem untuk mencapai tujuan. Dalam pelayanan, Anda unggul dalam memimpin inisiatif besar dan menciptakan perubahan sistemik. Anda memiliki kemampuan untuk mengembangkan visi yang jelas dan memobilisasi orang untuk mewujudkannya. Nilai-nilai inti Anda meliputi efisiensi, kompetensi, dan pencapaian tujuan."
  }

  return descriptions[mbtiType] || "Ciri-ciri kepribadian Anda memengaruhi bagaimana Anda berinteraksi dengan orang lain dan menangani tugas. Memahami tipe kepribadian Anda dapat membantu Anda mengenali kekuatan alami Anda, area potensial untuk pertumbuhan, dan bagaimana Anda dapat berkontribusi secara unik dalam pelayanan dan kehidupan sehari-hari."
}

function getAbilityDescription(ability: string): string {
  // Extract the ability name from the category
  const abilityName = ability.replace("Kemampuan: ", "")

  const descriptions: Record<string, string> = {
    // Kemampuan dasar yang sudah ada
    "Menulis": "Anda memiliki bakat untuk mengekspresikan ide dengan jelas dan kreatif melalui komunikasi tertulis. Kemampuan ini memungkinkan Anda menyampaikan pemikiran kompleks, menginspirasi orang lain, dan mendokumentasikan wawasan penting.",
    "Public Speaking": "Anda memiliki kemampuan untuk berkomunikasi secara efektif kepada kelompok, menjaga perhatian mereka dan menyampaikan informasi dengan jelas. Kemampuan ini memungkinkan Anda menginspirasi, mengajar, dan mempengaruhi orang lain melalui presentasi yang menarik dan persuasif.",
    "Seni": "Anda memiliki bakat kreatif dalam seni visual, mampu mengekspresikan ide dan emosi melalui media artistik. Kemampuan ini memungkinkan Anda menciptakan karya yang menyentuh hati, menyampaikan kebenaran spiritual, dan memperkaya pengalaman ibadah.",
    "Musik": "Anda memiliki kemampuan musikal, baik instrumental, vokal, atau komposisi, yang dapat menginspirasi dan menggerakkan orang lain. Kemampuan ini memungkinkan Anda menciptakan pengalaman ibadah yang mendalam, mengekspresikan pujian, dan menyentuh hati melalui harmoni dan melodi.",
    "Organisasi": "Anda memiliki bakat untuk menciptakan keteraturan dari kekacauan, menyusun tugas, dan mengelola detail secara efektif. Kemampuan ini memungkinkan Anda mengkoordinasikan proyek kompleks, memastikan semua berjalan lancar, dan memaksimalkan efisiensi dalam pelayanan.",
    "Analitis": "Anda memiliki kemampuan untuk memeriksa informasi secara kritis, mengidentifikasi pola, dan memecahkan masalah kompleks. Kemampuan ini memungkinkan Anda mengevaluasi situasi secara objektif, membuat keputusan berdasarkan data, dan menemukan solusi inovatif untuk tantangan.",
    "Teknologi": "Anda memiliki keterampilan dalam memahami dan memanfaatkan teknologi untuk menyelesaikan tugas dan memecahkan masalah. Kemampuan ini memungkinkan Anda menggunakan alat digital untuk memperluas jangkauan pelayanan, meningkatkan efisiensi, dan mengkomunikasikan pesan dengan cara yang relevan di era digital.",
    "Interpersonal": "Anda memiliki kemampuan untuk terhubung dengan orang lain, memahami kebutuhan mereka, dan membangun hubungan yang bermakna. Kemampuan ini memungkinkan Anda menciptakan lingkungan yang aman dan mendukung, mendengarkan dengan empati, dan membantu orang lain merasa dihargai dan dipahami.",
    "Kreativitas": "Anda memiliki kemampuan untuk menghasilkan ide-ide orisinal dan mendekati masalah dari perspektif unik. Kemampuan ini memungkinkan Anda menemukan solusi inovatif, menciptakan pendekatan baru untuk pelayanan, dan melihat kemungkinan yang tidak terlihat oleh orang lain.",
    "Kepemimpinan": "Anda memiliki kemampuan untuk menginspirasi dan membimbing orang lain menuju pencapaian tujuan bersama. Kemampuan ini memungkinkan Anda memotivasi tim, mengkomunikasikan visi dengan jelas, dan membantu orang lain mengembangkan potensi mereka sepenuhnya.",

    // Kemampuan dari analisis MBTI yang perlu ditambahkan
    "Analisis Konseptual": "Anda memiliki kemampuan untuk memahami dan menganalisis ide-ide kompleks dan abstrak. Kemampuan ini memungkinkan Anda mendalami konsep teologis, mengembangkan pemahaman yang mendalam tentang kebenaran spiritual, dan menghubungkan berbagai ide untuk membentuk kerangka pemikiran yang koheren.",
    "Inovasi Sistemik": "Anda memiliki kemampuan untuk mengidentifikasi peluang perbaikan dalam sistem yang ada dan mengembangkan solusi inovatif. Kemampuan ini memungkinkan Anda merancang proses yang lebih efisien, menciptakan pendekatan baru untuk pelayanan, dan membantu organisasi beradaptasi dengan perubahan.",
    "Pemikiran Kritis": "Anda memiliki kemampuan untuk mengevaluasi informasi secara objektif, mengidentifikasi asumsi yang mendasari, dan membuat penilaian berdasarkan bukti. Kemampuan ini memungkinkan Anda menguji ide-ide dengan cermat, mengajukan pertanyaan yang tepat, dan membantu orang lain mengembangkan pemahaman yang lebih dalam.",
    "Kepemimpinan Transformasional": "Anda memiliki kemampuan untuk menginspirasi perubahan positif dan pertumbuhan dalam diri orang lain dan organisasi. Kemampuan ini memungkinkan Anda memotivasi orang untuk melampaui ekspektasi mereka, menciptakan visi bersama yang menarik, dan memfasilitasi transformasi pribadi dan kolektif.",
    "Komunikasi Empatik": "Anda memiliki kemampuan untuk mendengarkan dengan penuh perhatian dan merespons dengan cara yang menunjukkan pemahaman dan kepedulian yang tulus. Kemampuan ini memungkinkan Anda membangun kepercayaan, memberikan dukungan emosional, dan menciptakan ruang aman bagi orang lain untuk berbagi.",
    "Perencanaan Strategis": "Anda memiliki kemampuan untuk mengembangkan rencana jangka panjang yang efektif dengan mempertimbangkan berbagai faktor dan kemungkinan. Kemampuan ini memungkinkan Anda menetapkan tujuan yang jelas, mengantisipasi tantangan, dan mengalokasikan sumber daya dengan bijak untuk mencapai hasil yang optimal.",
    "Kepemimpinan Direktif": "Anda memiliki kemampuan untuk memberikan arahan yang jelas dan membuat keputusan tegas saat diperlukan. Kemampuan ini memungkinkan Anda memimpin dengan percaya diri dalam situasi yang membutuhkan tindakan cepat, menetapkan ekspektasi yang jelas, dan memastikan tugas diselesaikan dengan efisien.",
    "Pengambilan Keputusan": "Anda memiliki kemampuan untuk menganalisis situasi dan membuat pilihan yang tepat dengan percaya diri. Kemampuan ini memungkinkan Anda menimbang berbagai opsi, mempertimbangkan konsekuensi jangka pendek dan jangka panjang, dan bertindak dengan tegas saat diperlukan.",
    "Mobilisasi Tim": "Anda memiliki kemampuan untuk mengorganisir dan memotivasi sekelompok orang untuk bekerja sama mencapai tujuan bersama. Kemampuan ini memungkinkan Anda mengidentifikasi kekuatan individu, mendelegasikan tugas secara efektif, dan menciptakan sinergi yang menghasilkan dampak lebih besar daripada yang bisa dicapai secara individual.",
    "Pemikiran Inovatif": "Anda memiliki kemampuan untuk menghasilkan ide-ide baru dan melihat kemungkinan yang tidak terpikirkan oleh orang lain. Kemampuan ini memungkinkan Anda menemukan solusi kreatif untuk masalah yang sudah lama ada, mengembangkan pendekatan segar untuk pelayanan, dan membantu organisasi tetap relevan dalam lingkungan yang terus berubah.",
    "Debat Konstruktif": "Anda memiliki kemampuan untuk mengartikulasikan dan mendiskusikan ide-ide kompleks dengan jelas dan persuasif. Kemampuan ini memungkinkan Anda mempresentasikan argumen yang kuat, merespons keberatan dengan bijak, dan memfasilitasi diskusi yang mengarah pada pemahaman yang lebih dalam.",
    "Adaptabilitas Cepat": "Anda memiliki kemampuan untuk menyesuaikan diri dengan situasi baru dan merespons tantangan dengan cepat dan efektif. Kemampuan ini memungkinkan Anda tetap tenang di bawah tekanan, menemukan solusi kreatif untuk masalah yang tidak terduga, dan membantu orang lain menavigasi perubahan dengan percaya diri.",
    "Manajemen Administratif": "Anda memiliki kemampuan untuk mengatur, mengklasifikasi, dan mengelola informasi dan sumber daya dengan presisi. Kemampuan ini memungkinkan Anda menciptakan sistem yang efisien, memastikan detail penting tidak terlewatkan, dan memfasilitasi operasi yang lancar dalam organisasi.",
    "Analisis Logis": "Anda memiliki kemampuan untuk memecah masalah kompleks menjadi komponen-komponennya dan menganalisisnya secara sistematis. Kemampuan ini memungkinkan Anda mengidentifikasi akar masalah, mengevaluasi solusi potensial secara objektif, dan membuat keputusan berdasarkan penalaran yang kuat.",
    "Ketelitian dan Konsistensi": "Anda memiliki kemampuan untuk memperhatikan detail dan menjaga standar kualitas yang tinggi secara konsisten. Kemampuan ini memungkinkan Anda menghasilkan pekerjaan yang akurat, membangun kepercayaan melalui keandalan, dan menciptakan fondasi yang solid untuk inisiatif yang lebih besar.",

    // Kemampuan tambahan yang mungkin muncul
    "Fasilitasi": "Anda memiliki kemampuan untuk membantu kelompok bekerja sama secara efektif untuk mencapai tujuan bersama. Kemampuan ini memungkinkan Anda memfasilitasi diskusi yang produktif, membantu menyelesaikan konflik, dan memastikan semua suara didengar dalam proses pengambilan keputusan.",
    "Mentoring": "Anda memiliki kemampuan untuk membimbing dan mendukung perkembangan orang lain. Kemampuan ini memungkinkan Anda berbagi pengetahuan dan pengalaman, memberikan umpan balik yang konstruktif, dan membantu orang lain mengembangkan keterampilan dan kepercayaan diri mereka.",
    "Pemecahan Masalah": "Anda memiliki kemampuan untuk mengidentifikasi akar masalah dan mengembangkan solusi yang efektif. Kemampuan ini memungkinkan Anda menganalisis situasi kompleks, mempertimbangkan berbagai perspektif, dan menemukan pendekatan yang mengatasi tantangan dengan cara yang kreatif dan praktis.",
    "Komunikasi Visual": "Anda memiliki kemampuan untuk menyampaikan informasi dan ide melalui elemen visual. Kemampuan ini memungkinkan Anda menciptakan presentasi yang menarik, merancang infografis yang informatif, dan menggunakan gambar untuk memperkuat pesan Anda.",
    "Storytelling": "Anda memiliki kemampuan untuk menyampaikan pesan melalui narasi yang menarik dan berkesan. Kemampuan ini memungkinkan Anda menghubungkan dengan audiens pada tingkat emosional, membuat konsep abstrak menjadi konkret, dan menginspirasi orang melalui kekuatan cerita.",
    "Negosiasi": "Anda memiliki kemampuan untuk mencapai kesepakatan yang saling menguntungkan melalui diskusi dan kompromi. Kemampuan ini memungkinkan Anda memahami berbagai perspektif, mengidentifikasi kepentingan bersama, dan menemukan solusi yang memenuhi kebutuhan semua pihak.",
    "Manajemen Proyek": "Anda memiliki kemampuan untuk merencanakan, mengorganisir, dan mengelola sumber daya untuk mencapai tujuan proyek. Kemampuan ini memungkinkan Anda menetapkan jadwal yang realistis, mengkoordinasikan berbagai tugas, dan memastikan proyek selesai tepat waktu dan sesuai anggaran.",
    "Penelitian": "Anda memiliki kemampuan untuk mengumpulkan, menganalisis, dan menginterpretasikan informasi secara sistematis. Kemampuan ini memungkinkan Anda mendalami topik dengan cermat, menemukan wawasan berharga, dan mengembangkan pemahaman yang komprehensif tentang subjek yang kompleks."
  }

  return descriptions[abilityName] || "Bakat alami atau keterampilan yang dipelajari yang dapat Anda gunakan untuk melayani orang lain dan memenuhi tujuan Anda. Kemampuan ini merupakan bagian penting dari bagaimana Tuhan telah melengkapi Anda secara unik untuk berkontribusi dalam tubuh Kristus dan dunia."
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
      "Kepemimpinan": "Pengalaman kepemimpinan Anda telah membekali Anda dengan keterampilan dalam membimbing orang lain, membuat keputusan, dan mengambil tanggung jawab. Kemampuan ini sangat berharga dalam konteks pelayanan di mana kepemimpinan yang efektif dapat memberdayakan orang lain untuk menemukan dan menggunakan karunia mereka sendiri.",
      "Pengajaran": "Pengalaman mengajar Anda telah mengembangkan kemampuan Anda untuk mengkomunikasikan pengetahuan dan membantu orang lain belajar dan bertumbuh. Kemampuan ini memungkinkan Anda untuk membagikan wawasan dan kebijaksanaan dengan cara yang dapat dipahami dan diterapkan oleh orang lain dalam kehidupan mereka.",
      "Pelayanan": "Pengalaman pelayanan Anda telah menumbuhkan hati untuk memenuhi kebutuhan dan mendukung orang lain dengan cara praktis. Sikap melayani ini mencerminkan teladan Kristus dan memungkinkan Anda untuk melihat kebutuhan yang mungkin tidak disadari oleh orang lain.",
      "Kreativitas": "Pengalaman kreatif Anda telah memupuk kemampuan Anda untuk berpikir di luar kotak dan mengekspresikan ide dengan cara unik. Kreativitas ini dapat membawa perspektif segar dalam pelayanan dan memungkinkan Anda untuk menemukan solusi inovatif untuk tantangan yang dihadapi.",
      "Analitis": "Pengalaman analitis Anda telah mempertajam pemikiran kritis dan kemampuan pemecahan masalah Anda. Keterampilan ini memungkinkan Anda untuk melihat masalah dari berbagai sudut pandang, mengidentifikasi akar penyebab, dan mengembangkan solusi yang efektif dan berkelanjutan.",
      "Ketahanan": "Pengalaman Anda dengan kesulitan telah membangun ketahanan dan kemampuan untuk bertahan melalui tantangan. Ketahanan ini tidak hanya memperkuat karakter Anda tetapi juga memberi Anda kredibilitas dan empati saat membantu orang lain yang menghadapi kesulitan serupa.",
      "Spiritual": "Pengalaman spiritual Anda telah memperdalam iman dan pemahaman Anda tentang karya Tuhan dalam hidup Anda. Perjalanan spiritual ini memberikan fondasi yang kuat untuk pelayanan Anda dan memungkinkan Anda untuk membimbing orang lain dalam perjalanan iman mereka sendiri.",
      "Relasional": "Pengalaman relasional Anda telah mengembangkan kemampuan Anda untuk terhubung dengan orang lain dan membangun hubungan yang bermakna. Keterampilan ini sangat penting dalam pelayanan karena hubungan yang otentik membuka pintu untuk pengaruh dan dampak yang lebih dalam.",
    }

    return themeDescriptions[theme] || "Pola pengalaman yang telah membentuk karakter dan kemampuan Anda."
  }

  // Descriptions for specific experience categories
  const categoryDescriptions: Record<string, string> = {
    "Pengalaman Formatif": "Pengalaman formatif adalah momen-momen penting yang telah membentuk identitas, nilai, dan pandangan dunia Anda. Pengalaman ini sering terjadi di masa muda dan memiliki dampak jangka panjang pada bagaimana Anda melihat diri sendiri dan dunia di sekitar Anda.",
    "Pengalaman Transformatif": "Pengalaman transformatif adalah peristiwa atau periode yang secara signifikan mengubah arah hidup, perspektif, atau nilai-nilai Anda. Pengalaman ini sering menjadi titik balik yang membawa perubahan mendalam dan tahan lama dalam hidup Anda.",
    "Pelajaran Hidup": "Pelajaran hidup yang Anda bagikan mencerminkan kebijaksanaan yang telah Anda peroleh melalui pengalaman. Wawasan ini dapat menjadi sumber berharga bagi orang lain yang mungkin menghadapi situasi serupa dalam hidup mereka.",
    "Tujuan Hidup": "Refleksi Anda tentang tujuan hidup menunjukkan kesadaran akan panggilan dan arah yang lebih besar. Pemahaman ini dapat membantu Anda membuat keputusan yang selaras dengan nilai-nilai dan tujuan jangka panjang Anda.",
    "Pelayanan": "Pengalaman pelayanan Anda telah mengembangkan hati untuk melayani dan memenuhi kebutuhan orang lain. Pengalaman ini membangun empati, kerendahan hati, dan kemampuan untuk melihat dan merespons kebutuhan di sekitar Anda.",
    "Pendidikan": "Perjalanan pendidikan Anda telah membentuk cara Anda berpikir, menganalisis informasi, dan memahami dunia. Pengetahuan dan keterampilan yang Anda peroleh dapat menjadi alat berharga dalam pelayanan dan kehidupan sehari-hari.",
    "Pekerjaan": "Pengalaman profesional Anda telah mengembangkan keterampilan, etika kerja, dan keahlian yang dapat ditransfer ke berbagai konteks pelayanan. Pengalaman ini juga dapat memberikan wawasan tentang bagaimana mengintegrasikan iman dalam lingkungan kerja.",
    "Keluarga": "Pengalaman keluarga Anda telah membentuk nilai-nilai, pola relasi, dan pemahaman Anda tentang komunitas. Pengalaman ini dapat memberikan fondasi untuk pelayanan yang berfokus pada memperkuat hubungan keluarga dan membangun komunitas yang sehat.",
    "Spiritual": "Perjalanan spiritual Anda mencerminkan hubungan yang berkembang dengan Tuhan dan pemahaman yang lebih dalam tentang iman. Pengalaman ini memberikan otentisitas dan kedalaman pada pelayanan Anda saat Anda membagikan apa yang telah Anda pelajari dalam perjalanan Anda sendiri.",
    "Membantu Orang Lain": "Pengalaman Anda dalam membantu orang lain telah mengembangkan empati, keterampilan praktis, dan pemahaman tentang kebutuhan manusia. Pengalaman ini mempersiapkan Anda untuk pelayanan yang berdampak dan bermakna.",
    "Pengalaman Traumatis": "Meskipun sulit, pengalaman traumatis yang telah Anda lalui dapat menjadi sumber kekuatan, ketahanan, dan empati yang mendalam. Penyembuhan dan pertumbuhan Anda dari pengalaman ini dapat memberikan harapan dan bimbingan bagi orang lain yang menghadapi trauma serupa.",
    "Pengalaman Lintas Budaya": "Pengalaman lintas budaya Anda telah memperluas perspektif, meningkatkan kesadaran budaya, dan mengembangkan kemampuan adaptasi. Pengalaman ini sangat berharga dalam dunia yang semakin terhubung dan beragam.",
    "Momen Penting": "Momen-momen penting yang Anda bagikan mewakili titik balik atau realisasi yang telah membentuk arah hidup Anda. Refleksi pada momen-momen ini dapat memberikan wawasan tentang bagaimana Tuhan telah bekerja dalam hidup Anda.",
    "Kepemimpinan": "Pengalaman kepemimpinan Anda telah mengembangkan kemampuan untuk mengarahkan, mempengaruhi, dan memberdayakan orang lain. Keterampilan ini sangat berharga dalam konteks pelayanan di mana Anda dapat membantu orang lain menemukan dan menggunakan potensi mereka sepenuhnya.",
    "Mentoring": "Hubungan mentoring yang telah Anda alami telah membentuk perkembangan pribadi dan profesional Anda. Kebijaksanaan dan bimbingan yang Anda terima dapat sekarang Anda bagikan kepada orang lain yang berada di tahap awal perjalanan mereka.",
    "Mengajar": "Pengalaman mengajar Anda telah mengembangkan kemampuan untuk menyampaikan pengetahuan, menginspirasi pembelajaran, dan membimbing pertumbuhan orang lain. Keterampilan ini dapat diterapkan dalam berbagai konteks pelayanan pendidikan dan pemuridan.",
    "Iman": "Perjalanan iman Anda mencerminkan perkembangan hubungan Anda dengan Tuhan melalui berbagai musim kehidupan. Pengalaman ini memberikan kedalaman dan otentisitas pada kesaksian Anda dan memungkinkan Anda untuk membimbing orang lain dalam perjalanan spiritual mereka.",
    "Misi": "Pengalaman misi Anda telah memperluas visi Anda tentang pekerjaan Tuhan di dunia dan mengembangkan kemampuan Anda untuk melintasi batas-batas budaya, sosial, dan geografis. Pengalaman ini dapat menginspirasi dan membekali Anda untuk pelayanan lintas budaya yang efektif.",
    "Pemulihan": "Perjalanan pemulihan Anda menunjukkan kekuatan, ketahanan, dan anugerah Tuhan yang memulihkan. Pengalaman ini memberikan Anda perspektif unik dan empati yang mendalam untuk mendampingi orang lain dalam proses penyembuhan dan pemulihan mereka sendiri.",
    "Komunitas": "Pengalaman Anda dalam komunitas telah mengembangkan pemahaman tentang pentingnya hubungan, dukungan bersama, dan pertumbuhan kolektif. Pengalaman ini membekali Anda untuk membangun dan memelihara komunitas yang sehat di mana orang dapat bertumbuh bersama dalam iman dan kehidupan.",
    "Keajaiban": "Pengalaman keajaiban atau jawaban doa yang Anda alami telah memperdalam iman dan pemahaman Anda tentang kuasa dan kehadiran Tuhan. Kesaksian ini dapat menguatkan iman orang lain dan membuka mata mereka terhadap realitas spiritual yang melampaui pengalaman sehari-hari.",
  };

  return categoryDescriptions[experience] || "Pengalaman yang telah berkontribusi pada pertumbuhan Anda dan mempersiapkan Anda untuk tujuan Anda. Setiap pengalaman, baik positif maupun menantang, dapat digunakan oleh Tuhan untuk membentuk karakter Anda dan mempersiapkan Anda untuk pelayanan yang unik.";
}
