"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface QuestionnaireMultipleChoiceProps {
  questionId: number
  options: string[]
  value: string[]
  onChange: (value: string[]) => void
  maxSelections?: number
}

export function QuestionnaireMultipleChoice({
  questionId,
  options,
  value = [],
  onChange,
  maxSelections = 3,
}: QuestionnaireMultipleChoiceProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(value || [])

  const handleOptionChange = (option: string, checked: boolean) => {
    let newSelectedOptions: string[]

    if (checked) {
      // If we're at the max selections, remove the first item before adding the new one
      if (selectedOptions.length >= maxSelections) {
        newSelectedOptions = [...selectedOptions.slice(1), option]
      } else {
        newSelectedOptions = [...selectedOptions, option]
      }
    } else {
      newSelectedOptions = selectedOptions.filter((item) => item !== option)
    }

    setSelectedOptions(newSelectedOptions)
    onChange(newSelectedOptions)
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Pilih maksimal {maxSelections} opsi</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Checkbox
              id={`option-${questionId}-${index}`}
              checked={selectedOptions.includes(option)}
              onCheckedChange={(checked) => handleOptionChange(option, checked === true)}
              disabled={!selectedOptions.includes(option) && selectedOptions.length >= maxSelections}
            />
            <Label htmlFor={`option-${questionId}-${index}`} className="text-sm font-normal">
              {option}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}
