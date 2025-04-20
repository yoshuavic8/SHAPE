"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { questionnaireSections } from "@/lib/questionnaire-data"
import { QuestionnaireProgress } from "@/components/questionnaire-progress"
import { QuestionnaireRating } from "@/components/questionnaire-rating"
import { QuestionnaireEssay } from "@/components/questionnaire-essay"
import { QuestionnaireMultiple } from "@/components/questionnaire-multiple"
import { QuestionnaireRanking } from "@/components/questionnaire-ranking"
import { supabase } from "@/lib/supabase/client"
import { useToast } from "@/components/ui/use-toast"

export default function ExperiencesQuestionnairePage() {
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [autoSaveTimer, setAutoSaveTimer] = useState<NodeJS.Timeout | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  const experiencesSection = questionnaireSections.find((section) => section.id === "experiences")
  const questions = experiencesSection?.questions || []

  useEffect(() => {
    // Load any existing answers
    const loadAnswers = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push("/auth/login")
        return
      }

      const { data } = await supabase
        .from("questionnaire_results")
        .select("experiences")
        .eq("user_id", session.user.id)
        .single()

      if (data?.experiences) {
        // Convert any keys to string keys if needed
        const convertedAnswers: Record<string, any> = {}
        Object.entries(data.experiences).forEach(([key, value]) => {
          convertedAnswers[key] = value
        })
        setAnswers(convertedAnswers)
      }
    }

    loadAnswers()

    // Setup auto-save timer
    const timer = setInterval(autoSaveAnswers, 10000) // Auto-save every 10 seconds
    setAutoSaveTimer(timer)

    // Cleanup timer on unmount
    return () => {
      if (autoSaveTimer) {
        clearInterval(autoSaveTimer)
      }
    }
  }, [router])

  // Auto-save function
  const autoSaveAnswers = async () => {
    if (Object.keys(answers).length === 0) return

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) return

      await supabase
        .from("questionnaire_results")
        .update({
          experiences: answers,
        })
        .eq("user_id", session.user.id)

      console.log("Auto-saved answers at", new Date().toLocaleTimeString())
    } catch (error) {
      console.error("Auto-save failed:", error)
    }
  }

  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1

  const handleAnswerChange = (value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }))
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    } else {
      // Go back to previous section
      router.push("/questionnaire/personality")
    }
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)

      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push("/auth/login")
        return
      }

      // Save raw answers to database
      // This preserves all answer types (text, multiple choice, etc.)
      const { error } = await supabase
        .from("questionnaire_results")
        .update({
          experiences: answers,
          is_completed: true, // Mark the entire questionnaire as completed
        })
        .eq("user_id", session.user.id)

      if (error) throw error

      toast({
        title: "Questionnaire completed!",
        description: "Your answers have been saved successfully. View your results now.",
      })

      router.push("/results")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save your answers",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const isAnswered = currentQuestion && answers[currentQuestion.id] !== undefined

  return (
    <div className="space-y-6 py-8">
      <QuestionnaireProgress
        currentSection={4}
        totalSections={4}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={questions.length}
      />

      <Card>
        <CardHeader>
          <CardTitle>Experiences (Pengalaman)</CardTitle>
          <CardDescription>
            Jawablah setiap pernyataan dengan skala 1-5, di mana 1 adalah "Sangat Tidak Setuju" dan 5 adalah "Sangat
            Setuju".
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentQuestion && (
            <div>
              <h3 className="text-lg font-medium mb-4">
                {currentQuestionIndex + 1}. {currentQuestion.text}
              </h3>

              {currentQuestion.type === "scale" && (
                <QuestionnaireRating
                  questionId={currentQuestion.id}
                  value={answers[currentQuestion.id] || 0}
                  onChange={handleAnswerChange}
                />
              )}

              {currentQuestion.type === "open" && (
                <QuestionnaireEssay
                  questionId={currentQuestion.id}
                  value={answers[currentQuestion.id] || ""}
                  onChange={handleAnswerChange}
                />
              )}

              {currentQuestion.type === "multiple" && currentQuestion.options && (
                <QuestionnaireMultiple
                  questionId={currentQuestion.id}
                  options={currentQuestion.options}
                  value={answers[currentQuestion.id] || (currentQuestion.text.includes("Urutkan") ? [] : "")}
                  onChange={handleAnswerChange}
                  multiSelect={currentQuestion.text.includes("Pilih") && !currentQuestion.text.includes("Urutkan")}
                />
              )}

              {currentQuestion.type === "multiple" && currentQuestion.options && currentQuestion.text.includes("Urutkan") && (
                <QuestionnaireRanking
                  questionId={currentQuestion.id}
                  options={currentQuestion.options}
                  value={answers[currentQuestion.id] || []}
                  onChange={handleAnswerChange}
                />
              )}
            </div>
          )}
          {!isAnswered && (
            <Alert variant="destructive">
              <AlertTitle>Required</AlertTitle>
              <AlertDescription>Please answer the question before proceeding.</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious}>
            Previous
          </Button>
          {isLastQuestion ? (
            <Button onClick={handleSubmit} disabled={!isAnswered || loading}>
              {loading ? "Saving..." : "Complete & View Results"}
            </Button>
          ) : (
            <Button onClick={handleNext} disabled={!isAnswered}>
              Next Question
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}