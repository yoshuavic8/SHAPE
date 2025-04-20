"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { supabase } from "@/lib/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { questionnaireSections } from "@/lib/questionnaire-data"

export default function ContinueQuestionnairePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState<{
    spiritual_gifts: boolean
    heart_desire: boolean
    personality: boolean
    experiences: boolean
  }>({ spiritual_gifts: false, heart_desire: false, personality: false, experiences: false })

  useEffect(() => {
    const checkProgress = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
          router.push("/auth/login")
          return
        }

        const { data, error } = await supabase
          .from("questionnaire_results")
          .select("*")
          .eq("user_id", session.user.id)
          .single()

        if (error) throw error

        if (data) {
          // Check which sections have data
          setProgress({
            spiritual_gifts: Object.keys(data.spiritual_gifts || {}).length > 0,
            heart_desire: Object.keys(data.heart_desire || {}).length > 0,
            personality: Object.keys(data.personality || {}).length > 0,
            experiences: Object.keys(data.experiences || {}).length > 0,
          })
        }
      } catch (error) {
        console.error("Error checking progress:", error)
        toast({
          title: "Error",
          description: "Failed to load your progress. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    checkProgress()
  }, [router, toast])

  const getNextSection = () => {
    if (!progress.spiritual_gifts) return "/questionnaire/spiritual"
    if (!progress.heart_desire) return "/questionnaire/heart"
    if (!progress.personality) return "/questionnaire/personality"
    if (!progress.experiences) return "/questionnaire/experiences"
    return "/results"
  }

  const handleContinue = () => {
    const nextSection = getNextSection()
    router.push(nextSection)
  }

  return (
    <div className="space-y-6 py-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Continue Your Questionnaire</h2>
        <p className="text-muted-foreground">
          You can continue from where you left off or restart any section.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
          <CardDescription>Here's what you've completed so far.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ) : (
            <div className="space-y-4">
              {questionnaireSections.map((section) => {
                const isCompleted = progress[section.id as keyof typeof progress]
                return (
                  <div key={section.id} className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{section.title}</h3>
                      <p className="text-sm text-muted-foreground">{section.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`h-3 w-3 rounded-full ${isCompleted ? "bg-green-500" : "bg-gray-300"}`}
                      />
                      <span className="text-sm">{isCompleted ? "Completed" : "Not started"}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/questionnaire/${section.id}`)}
                      >
                        {isCompleted ? "Edit" : "Start"}
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleContinue} disabled={loading} className="w-full">
            Continue from Where You Left Off
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}