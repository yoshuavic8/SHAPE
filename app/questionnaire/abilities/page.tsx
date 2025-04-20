"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AbilitiesPage() {
  const router = useRouter()

  // Redirect to personality page since abilities are now integrated with personality
  useEffect(() => {
    router.replace("/questionnaire/personality")
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-muted-foreground">Redirecting to personality questionnaire...</p>
    </div>
  )
}