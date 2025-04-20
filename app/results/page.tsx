import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"
import Link from "next/link"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { ShapeResultsTabs } from "@/components/shape-results-tabs"
import { ResultsPDFEnhanced } from "@/components/results-pdf-enhanced"
import { analyzeResults, generateShapeCode } from "@/lib/results-analyzer"

export default async function ResultsPage() {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async getAll() {
          const cookieList = cookieStore.getAll();
          return cookieList.map((cookie) => ({
            name: cookie.name,
            value: cookie.value,
          }));
        },
        async setAll(newCookies) {
          for (const cookie of newCookies) {
            cookieStore.set(cookie);
          }
        },
      },
    }
  )

  const { data } = await supabase.auth.getSession()
  const session = data.session

  if (!session) {
    redirect("/auth/login")
  }

  // Get questionnaire results
  const { data: results } = await supabase
    .from("questionnaire_results")
    .select("*")
    .eq("user_id", session.user.id)
    .single()

  // Get user profile regardless of questionnaire completion
  const { data: userProfile } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", session.user.id)
    .single()

  const userName = userProfile?.full_name || session.user.user_metadata.full_name || "User"

  // Check if results exist and are completed
  if (!results) {
    // No results found at all - show empty state
    return (
      <div className="flex flex-col items-center justify-center space-y-6 py-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold tracking-tight">Belum Ada Hasil</h2>
          <p className="text-muted-foreground max-w-md">
            Anda belum memulai kuesioner SHAPE-E. Selesaikan kuesioner untuk melihat hasil Anda.
          </p>
        </div>

        <div className="w-full max-w-md p-8 border rounded-lg bg-muted/50 text-center space-y-4">
          <div className="flex justify-center">
            <svg
              className="w-16 h-16 text-muted-foreground"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2v4" />
              <path d="m4.93 7.93 2.83 2.83" />
              <path d="M2 16h4" />
              <path d="m7.93 19.07 2.83-2.83" />
              <path d="M16 2v4" />
              <path d="m19.07 7.93-2.83 2.83" />
              <path d="M22 16h-4" />
              <path d="m16.07 19.07-2.83-2.83" />
              <path d="m9 16 3-8 3 8" />
              <path d="M10 13h4" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold">Temukan SHAPE-E Anda</h3>
          <p className="text-sm text-muted-foreground">
            SHAPE-E adalah singkatan dari Spiritual gifts, Heart desire, Abilities, Personality, dan Experiences.
            Kuesioner ini akan membantu Anda menemukan bagaimana Anda dirancang secara unik.
          </p>
          <Link href="/questionnaire">
            <Button className="w-full">Mulai Kuesioner</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Results exist but not completed
  if (!results.is_completed) {
    // Calculate progress
    const sections = ['spiritual_gifts', 'heart_desire', 'personality', 'experiences']
    const completedSections = sections.filter(section =>
      results[section] && Object.keys(results[section]).length > 0
    )
    const progress = Math.round((completedSections.length / sections.length) * 100)

    return (
      <div className="flex flex-col items-center justify-center space-y-6 py-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold tracking-tight">Kuesioner Belum Selesai</h2>
          <p className="text-muted-foreground max-w-md">
            Anda telah memulai kuesioner SHAPE-E tetapi belum menyelesaikannya. Lanjutkan untuk melihat hasil Anda.
          </p>
        </div>

        <div className="w-full max-w-md p-8 border rounded-lg bg-muted/50 text-center space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-4">Lanjutkan Kuesioner</h3>
          <p className="text-sm text-muted-foreground">
            Anda telah menyelesaikan {completedSections.length} dari {sections.length} bagian.
            Lanjutkan untuk mendapatkan hasil lengkap SHAPE-E Anda.
          </p>

          <Link href="/questionnaire">
            <Button className="w-full">Lanjutkan Kuesioner</Button>
          </Link>
        </div>
      </div>
    )
  }

  // User profile and userName already fetched above

  // Analyze results
  const spiritualGifts = analyzeResults(results.spiritual_gifts)
  const heartDesire = analyzeResults(results.heart_desire)
  const personality = analyzeResults(results.personality)
  const experiences = analyzeResults(results.experiences)

  // Generate SHAPE code
  const shapeCode = generateShapeCode(spiritualGifts, heartDesire, personality, experiences)

  // Generate recommendations
  const recommendations = {
    purposeStatement: `Berdasarkan profil SHAPE-E Anda, Anda dirancang secara unik untuk melayani dengan ${spiritualGifts[0]?.category || "karunia"} Anda, didorong oleh hasrat untuk ${heartDesire[0]?.category || "melayani"}, dengan kepribadian ${personality[0]?.category || "yang unik"} dan pengalaman hidup yang berharga.`,
    ministryAreas: [
      "Pelayanan Pemuridan",
      "Pelayanan Pengajaran",
      "Pelayanan Konseling",
      "Pelayanan Misi",
      "Pelayanan Musik",
    ],
    learningPathways: [
      "Kursus Kepemimpinan",
      "Pelatihan Konseling",
      "Studi Alkitab Mendalam",
      "Pengembangan Keterampilan Komunikasi",
    ],
    bibleVerse: "Sebab kita ini buatan Allah, diciptakan dalam Kristus Yesus untuk melakukan pekerjaan baik, yang dipersiapkan Allah sebelumnya. Ia mau, supaya kita hidup di dalamnya. - Efesus 2:10",
    personalizedAdvice: `Dengan kombinasi karunia ${spiritualGifts[0]?.category || "spiritual"} dan hasrat untuk ${heartDesire[0]?.category || "melayani"}, Anda memiliki potensi besar untuk membuat dampak dalam pelayanan. Teruslah mengembangkan keterampilan Anda dan carilah kesempatan untuk menggunakan karunia Anda.`,
    strengthsWeaknesses: {
      strengths: [
        `Karunia utama dalam ${spiritualGifts[0]?.category || "pelayanan"} yang dapat digunakan untuk membangun tubuh Kristus`,
        `Hasrat yang kuat untuk ${heartDesire[0]?.category || "melayani"}`,
        `Kepribadian ${personality[0]?.category || "yang unik"} yang membawa perspektif berharga`,
      ],
      weaknesses: [
        "Mungkin perlu mengembangkan keterampilan komunikasi",
        "Perlu keseimbangan antara melayani dan istirahat",
        "Bisa terlalu fokus pada satu area pelayanan",
      ],
    },
  }

  // Format completion date
  const completedDate = new Date(results.updated_at).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Hasil SHAPE-E Anda</h2>
          <p className="text-muted-foreground">
            Selesai pada {completedDate}
          </p>
        </div>
        <ResultsPDFEnhanced
          userName={userName}
          spiritualGifts={spiritualGifts}
          heartDesire={heartDesire}
          personality={personality}
          experiences={experiences}
          shapeCode={shapeCode}
          recommendations={recommendations}
          completedDate={completedDate}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>SHAPE Code: {shapeCode}</CardTitle>
          <CardDescription>
            Kode unik yang merangkum profil SHAPE-E Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            {recommendations.purposeStatement}
          </p>
        </CardContent>
      </Card>

      <div id="results-container">
        <ShapeResultsTabs
          spiritualGifts={spiritualGifts}
          heartDesire={heartDesire}
          personality={personality}
          experiences={experiences}
          recommendations={recommendations}
        />
      </div>
    </div>
  )
}
