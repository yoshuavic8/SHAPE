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
import { QuestionnaireBinary } from "@/components/questionnaire-binary"
import { supabase } from "@/lib/supabase/client"
import { useToast } from "@/components/ui/use-toast"

export default function PersonalityQuestionnairePage() {
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const personalitySection = questionnaireSections.find((section) => section.id === "personality")
  const questions = personalitySection?.questions || []

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
        .select("personality")
        .eq("user_id", session.user.id)
        .single()

      if (data?.personality) {
        // Convert any keys to string keys if needed
        const convertedAnswers: Record<string, any> = {}
        Object.entries(data.personality).forEach(([key, value]) => {
          convertedAnswers[key] = value
        })
        setAnswers(convertedAnswers)
      }
    }

    loadAnswers()
  }, [router])

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
      router.push("/questionnaire/heart")
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

      // Simpan jawaban mentah
      const rawAnswers = { ...answers }

      // Save to database
      const { error } = await supabase
        .from("questionnaire_results")
        .update({
          personality: rawAnswers,
        })
        .eq("user_id", session.user.id)

      if (error) throw error

      toast({
        title: "Progress saved",
        description: "Your answers have been saved successfully",
      })

      router.push("/questionnaire/experiences")
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
        currentSection={3}
        totalSections={4}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={questions.length}
      />

      <Card>
        <CardHeader>
          <CardTitle>Personality (Kepribadian)</CardTitle>
          <CardDescription>
            Jawablah setiap pertanyaan sesuai dengan jenisnya. Bagian ini berisi pertanyaan biner (pilih salah satu dari dua opsi) untuk menentukan tipe kepribadian Anda, serta pertanyaan skala untuk mengukur kemampuan Anda.
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

              {currentQuestion.type === "binary" && Array.isArray(currentQuestion.options) && (
                <QuestionnaireBinary
                  questionId={currentQuestion.id}
                  options={currentQuestion.options as Array<{value: string; text: string}>}
                  value={answers[currentQuestion.id] || ""}
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
                  options={currentQuestion.options as string[]}
                  value={answers[currentQuestion.id] || ""}
                  onChange={handleAnswerChange}
                  multiSelect={currentQuestion.text.toLowerCase().includes("pilih") || currentQuestion.id === 76 || currentQuestion.id === 78 || currentQuestion.id === 79}
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
              {loading ? "Saving..." : "Continue to Next Section"}
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