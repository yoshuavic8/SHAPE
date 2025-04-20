import { Progress } from "@/components/ui/progress"

interface QuestionnaireProgressProps {
  currentSection: number
  totalSections: number
  currentQuestion: number
  totalQuestions: number
}

export function QuestionnaireProgress({
  currentSection,
  totalSections,
  currentQuestion,
  totalQuestions,
}: QuestionnaireProgressProps) {
  const sectionProgress = Math.round((currentSection / totalSections) * 100)
  const questionProgress = Math.round((currentQuestion / totalQuestions) * 100)

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>
          Section {currentSection} of {totalSections}
        </span>
        <span>{sectionProgress}% Complete</span>
      </div>
      <Progress value={sectionProgress} className="h-2" />
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>
          Question {currentQuestion} of {totalQuestions}
        </span>
        <span>{questionProgress}% Complete</span>
      </div>
      <Progress value={questionProgress} className="h-1" />
    </div>
  )
}
