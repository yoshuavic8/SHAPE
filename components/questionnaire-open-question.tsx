"use client"

import type React from "react"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"

interface QuestionnaireOpenQuestionProps {
  questionId: number
  value: string
  onChange: (value: string) => void
}

export function QuestionnaireOpenQuestion({ questionId, value, onChange }: QuestionnaireOpenQuestionProps) {
  const [text, setText] = useState(value || "")

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setText(newValue)
    onChange(newValue)
  }

  return (
    <div className="space-y-2">
      <Textarea
        id={`question-${questionId}`}
        value={text}
        onChange={handleChange}
        placeholder="Ketik jawaban Anda di sini..."
        className="min-h-[120px]"
      />
    </div>
  )
}
