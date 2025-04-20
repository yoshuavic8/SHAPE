"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface QuestionnaireMultipleProps {
  questionId: number
  options: string[]
  value: string | string[]
  onChange: (value: string | string[]) => void
  multiSelect?: boolean
}

export function QuestionnaireMultiple({
  questionId,
  options,
  value,
  onChange,
  multiSelect = false
}: QuestionnaireMultipleProps) {
  const [selected, setSelected] = useState<string | string[]>(value || (multiSelect ? [] : ""))

  const handleSingleSelect = (value: string) => {
    setSelected(value)
    onChange(value)
  }

  const handleMultiSelect = (option: string) => {
    const currentSelected = Array.isArray(selected) ? [...selected] : []
    
    if (currentSelected.includes(option)) {
      const newSelected = currentSelected.filter(item => item !== option)
      setSelected(newSelected)
      onChange(newSelected)
    } else {
      const newSelected = [...currentSelected, option]
      setSelected(newSelected)
      onChange(newSelected)
    }
  }

  if (multiSelect) {
    return (
      <div className="space-y-3">
        {options.map((option, index) => (
          <div key={`${questionId}-${index}`} className="flex items-center space-x-2">
            <Checkbox
              id={`${questionId}-${index}`}
              checked={Array.isArray(selected) && selected.includes(option)}
              onCheckedChange={() => handleMultiSelect(option)}
            />
            <Label
              htmlFor={`${questionId}-${index}`}
              className="text-sm font-normal"
            >
              {option}
            </Label>
          </div>
        ))}
      </div>
    )
  }

  return (
    <RadioGroup
      value={selected as string}
      onValueChange={handleSingleSelect}
      className="space-y-3"
    >
      {options.map((option, index) => (
        <div key={`${questionId}-${index}`} className="flex items-center space-x-2">
          <RadioGroupItem
            value={option}
            id={`${questionId}-${index}`}
          />
          <Label
            htmlFor={`${questionId}-${index}`}
            className="text-sm font-normal"
          >
            {option}
          </Label>
        </div>
      ))}
    </RadioGroup>
  )
}
