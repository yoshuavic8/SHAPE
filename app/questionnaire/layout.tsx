import type React from "react"
import { redirect } from "next/navigation"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

interface QuestionnaireLayoutProps {
  children: React.ReactNode
}

export default async function QuestionnaireLayout({ children }: QuestionnaireLayoutProps) {
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

  // Check if the user has already completed the questionnaire
  const { data: questionnaire } = await supabase
    .from("questionnaire_results")
    .select("is_completed")
    .eq("user_id", session.user.id)
    .single()

  if (questionnaire?.is_completed) {
    redirect("/results")
  }

  return <div className="max-w-4xl mx-auto">{children}</div>
}
