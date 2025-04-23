import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { redirect } from "next/navigation"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { ResultsButton } from "@/components/results-button"

export default async function Dashboard() {
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

  // Get questionnaire completion status
  const { data: results } = await supabase
    .from("questionnaire_results")
    .select("is_completed")
    .eq("user_id", session.user.id)
    .single()

  const isCompleted = results?.is_completed || false
  const userName = session.user.user_metadata.full_name || "User"

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back, {userName}! Discover your SHAPE and understand your gifts.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your SHAPE Journey</CardTitle>
            <CardDescription>
              {isCompleted
                ? "You have completed the SHAPE questionnaire."
                : "Start or continue your SHAPE questionnaire."}
            </CardDescription>
            {isCompleted && (
              <div className="mt-2 pt-2 border-t border-dashed border-slate-200">
                <p className="text-xs text-muted-foreground italic">
                  <span className="font-medium">Disclaimer:</span> Hasil asesmen SHAPE-E ini dirancang sebagai alat bantu untuk menemukan aspek tujuan hidup Anda, namun tidak bersifat mutlak. Hasil dapat bervariasi dan tidak menggantikan proses pencarian kehendak Tuhan melalui doa, pembimbingan rohani, dan pengalaman pribadi dengan-Nya.
                </p>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {isCompleted ? (
              <ResultsButton />
            ) : (
              <Link href="/questionnaire">
                <Button>Take Questionnaire</Button>
              </Link>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>About SHAPE</CardTitle>
            <CardDescription>Understanding what SHAPE is and why it matters.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              SHAPE is an acronym that stands for Spiritual gifts, Heart desire, Abilities, and Personality. This
              assessment helps you understand how you're uniquely designed to serve and contribute.
            </p>

          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Spiritual Gifts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-10">
              <svg
                className="w-6 h-6 text-green-600 dark:text-green-400"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="m7 10 3 3 7-7" />
              </svg>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Heart Desire</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-10">
              <svg
                className="w-6 h-6 text-red-600 dark:text-red-400"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Abilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-10">
              <svg
                className="w-6 h-6 text-blue-600 dark:text-blue-400"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 22v-5" />
                <path d="M9 8V2" />
                <path d="M15 8V2" />
                <path d="M12 8v8" />
                <path d="M12 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
                <path d="M9 22h6" />
              </svg>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Personality</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-10">
              <svg
                className="w-6 h-6 text-purple-600 dark:text-purple-400"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" x2="9.01" y1="9" y2="9" />
                <line x1="15" x2="15.01" y1="9" y2="9" />
              </svg>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
