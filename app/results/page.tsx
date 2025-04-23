import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"
import Link from "next/link"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { ShapeResultsTabs } from "@/components/shape-results-tabs"
import { PDFExportButton } from "@/components/pdf-export-button"
import { analyzeSpiritualGifts, analyzeHeartDesire, analyzePersonality, analyzeExperiences, generateShapeProfile } from "@/lib/shape-analyzer-adapter"
import { generateShapeRecommendations } from "@/lib/analyzers/integrated-analyzer"

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
      <div className="flex flex-col items-center justify-center space-y-6 py-12 px-4 sm:px-6 lg:px-8">
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
      <div className="flex flex-col items-center justify-center space-y-6 py-12 px-4 sm:px-6 lg:px-8">
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
  const spiritualGifts = analyzeSpiritualGifts(results.spiritual_gifts)
  const heartDesire = analyzeHeartDesire(results.heart_desire)
  const personality = analyzePersonality(results.personality)
  const experiences = analyzeExperiences(results.experiences)

  // Generate SHAPE profile
  const shapeProfile = generateShapeProfile(spiritualGifts, heartDesire, personality, experiences)

  // Get SHAPE code
  const shapeCode = shapeProfile.shapeCode

  // Generate recommendations using the integrated analyzer
  const recommendations = generateShapeRecommendations(shapeProfile)

  // Format completion date
  const completedDate = new Date(results.updated_at).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Hasil SHAPE-E Anda</h2>
          <p className="text-muted-foreground">
            Selesai pada {completedDate}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <a href="/dashboard">
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
              Back to Dashboard
            </a>
          </Button>
          {/* Tombol Export PDF dinonaktifkan sementara
          <PDFExportButton
            userName={userName}
            spiritualGifts={spiritualGifts}
            heartDesire={heartDesire}
            personality={personality}
            experiences={experiences}
            shapeCode={shapeCode}
            recommendations={recommendations}
            completedDate={completedDate}
          /> */}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>SHAPE Code: {shapeCode}</CardTitle>
          <CardDescription>
            Kode unik yang merangkum profil SHAPE-E Anda
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <p>
            {recommendations.purposeStatement}
          </p>
          <div className="text-xs text-muted-foreground italic bg-muted/30 p-3 rounded-md">
            <p className="font-medium mb-1">Disclaimer:</p>
            <p>Hasil asesmen SHAPE-E ini dirancang sebagai alat bantu untuk menemukan aspek tujuan hidup Anda, namun tidak bersifat mutlak. Hasil dapat bervariasi dan tidak menggantikan proses pencarian kehendak Tuhan melalui doa, pembimbingan rohani, dan pengalaman pribadi dengan-Nya. Gunakan hasil ini sebagai titik awal refleksi dalam perjalanan iman Anda.</p>
          </div>
        </CardContent>
      </Card>

      <ShapeResultsTabs
        spiritualGifts={spiritualGifts}
        heartDesire={heartDesire}
        personality={personality}
        experiences={experiences}
        recommendations={recommendations}
      />
    </div>
  )
}
