"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface QuestionnaireBinaryProps {
  questionId: number
  options: Array<{ value: string; text: string }>
  value: string
  onChange: (value: string) => void
}

export function QuestionnaireBinary({ questionId, options, value, onChange }: QuestionnaireBinaryProps) {
  return (
    <RadioGroup
      value={value || ""}
      onValueChange={(val) => onChange(val)}
      className="space-y-4"
    >
      {options.map((option) => (
        <div key={option.value} className="flex items-start space-x-3">
          <RadioGroupItem
            value={option.value}
            id={`q${questionId}-${option.value}`}
            className="mt-1"
          />
          <Label
            htmlFor={`q${questionId}-${option.value}`}
            className="text-sm leading-relaxed"
          >
            {option.text}
          </Label>
        </div>
      ))}
    </RadioGroup>
  )
}
