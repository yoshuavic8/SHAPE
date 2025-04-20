"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface QuestionnaireRatingProps {
  questionId: number
  value: number
  onChange: (value: number) => void
}

export function QuestionnaireRating({ questionId, value, onChange }: QuestionnaireRatingProps) {
  return (
    <RadioGroup
      value={value?.toString() || ""}
      onValueChange={(val) => onChange(Number.parseInt(val))}
      className="flex justify-between space-x-1 py-2"
    >
      {[1, 2, 3, 4, 5].map((rating) => (
        <div key={rating} className="flex flex-col items-center">
          <RadioGroupItem value={rating.toString()} id={`rating-${questionId}-${rating}`} className="sr-only" />
          <Label
            htmlFor={`rating-${questionId}-${rating}`}
            className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 ${
              value === rating
                ? "border-primary bg-primary text-primary-foreground"
                : "border-muted-foreground/20 hover:border-muted-foreground/40 hover:bg-muted"
            }`}
          >
            {rating}
          </Label>
          <span className="mt-1 text-xs text-muted-foreground">
            {rating === 1
              ? "Strongly Disagree"
              : rating === 2
                ? "Disagree"
                : rating === 3
                  ? "Neutral"
                  : rating === 4
                    ? "Agree"
                    : "Strongly Agree"}
          </span>
        </div>
      ))}
    </RadioGroup>
  )
}
