import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { questionnaireSections } from "@/lib/questionnaire-data"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function QuestionnairePage() {
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
  );

  const { data } = await supabase.auth.getSession();
  const session = data.session;

  if (!session) {
    redirect("/auth/login")
  }

  // Check if we already have a questionnaire in progress
  const { data: existingQuestionnaire, error: fetchError } = await supabase
    .from("questionnaire_results")
    .select("*")
    .eq("user_id", session.user.id)
    .single()

  // If not, create a new entry
  if (!existingQuestionnaire) {
    console.log("No existing questionnaire found for user ID:", session.user.id)
    console.log("Creating new questionnaire entry...")

    const { data: newEntry, error: insertError } = await supabase
      .from("questionnaire_results")
      .insert({
        user_id: session.user.id,
        spiritual_gifts: {},
        heart_desire: {},
        personality: {}, // Now includes abilities
        experiences: {},
        is_completed: false,
      })
      .select()

    if (insertError) {
      console.error("Error creating questionnaire entry:", insertError)
    } else {
      console.log("New questionnaire entry created:", newEntry)
    }
  } else {
    console.log("Existing questionnaire found for user ID:", session.user.id)
  }

  if (fetchError && fetchError.code !== "PGRST116") { // PGRST116 is the error code for "no rows returned"
    console.error("Error fetching questionnaire:", fetchError)
  }

  return (
    <div className="space-y-6 py-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Kuesioner SHAPE-E</h2>
        <p className="text-muted-foreground">
          Temukan profil SHAPE-E unik Anda dengan menjawab pertanyaan-pertanyaan ini.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Petunjuk</CardTitle>
          <CardDescription>Harap baca sebelum memulai kuesioner.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium">Apa itu SHAPE-E?</h3>
            <p className="text-sm text-muted-foreground mt-1">
              SHAPE-E adalah singkatan dari Spiritual gifts (Karunia rohani), Heart desire (Keinginan hati), Abilities
              (Kemampuan), Personality (Kepribadian), dan Experiences (Pengalaman hidup). Penilaian ini akan membantu
              Anda menemukan bagaimana Anda dirancang secara unik.
            </p>
          </div>
          <div>
            <h3 className="font-medium">Cara Menjawab</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Untuk setiap pernyataan, nilai seberapa kuat Anda setuju atau tidak setuju pada skala 1-5, di mana 1
              adalah "Sangat Tidak Setuju" dan 5 adalah "Sangat Setuju". Beberapa pertanyaan memerlukan jawaban tertulis
              atau pilihan ganda.
            </p>
          </div>
          <div>
            <h3 className="font-medium">Bagian Kuesioner</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground mt-1 space-y-1">
              {questionnaireSections.map((section) => (
                <li key={section.id}>
                  <strong>{section.title}</strong>: {section.description}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium">Waktu yang Diperlukan</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Kuesioner ini akan memakan waktu sekitar 25-30 menit untuk diselesaikan.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/questionnaire/spiritual" className="w-full">
            <Button className="w-full">Mulai Kuesioner</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
