"use client"

import { useState, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface QuestionnaireEssayProps {
  questionId: number
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function QuestionnaireEssay({
  questionId,
  value,
  onChange,
  placeholder = "Tulis jawaban Anda di sini..."
}: QuestionnaireEssayProps) {
  const [text, setText] = useState(value || "")

  // Update text state when questionId or value changes
  useEffect(() => {
    setText(value || "")
  }, [questionId, value])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setText(newValue)
    onChange(newValue)
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={`question-${questionId}`}>Jawaban Anda</Label>
      <Textarea
        id={`question-${questionId}`}
        placeholder={placeholder}
        value={text}
        onChange={handleChange}
        className="min-h-[150px]"
      />
    </div>
  )
}
