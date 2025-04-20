"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Save } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface QuestionnaireNavigationProps {
  currentSection: number
  totalSections: number
  onSave: () => Promise<void>
  onNext: () => void
  onPrevious: () => void
  canProceed: boolean
  isLastSection?: boolean
}

export function QuestionnaireNavigation({
  currentSection,
  totalSections,
  onSave,
  onNext,
  onPrevious,
  canProceed,
  isLastSection = false,
}: QuestionnaireNavigationProps) {
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()
  
  const handleSave = async () => {
    setSaving(true)
    try {
      await onSave()
      toast({
        title: "Progress saved",
        description: "Your answers have been saved successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save your answers. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }
  
  return (
    <div className="flex justify-between items-center mt-6">
      <Button 
        variant="outline" 
        onClick={onPrevious} 
        disabled={currentSection === 1}
      >
        <ChevronLeft className="mr-2 h-4 w-4" /> Previous
      </Button>
      
      <Button 
        variant="secondary" 
        onClick={handleSave} 
        disabled={saving}
      >
        <Save className="mr-2 h-4 w-4" />
        {saving ? "Saving..." : "Save Progress"}
      </Button>
      
      <Button 
        onClick={onNext} 
        disabled={!canProceed}
      >
        {isLastSection ? "Complete Questionnaire" : "Next"} 
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}
